let graph = {
    start: { A: 5, B: 2 },
    A: { start: 1, C: 4, D: 2 },
    B: { A: 8, D: 7 },
    C: { D: 6, end: 3 },
    D: { end: 1 },
    end: {},
};

const shortestDistanceNode = (distances, visited) => {
    let shortest = null;
    for (let node in distances) {
        let currentIsShortest =
            shortest === null || distances[node] < distances[shortest];
        if (currentIsShortest && !visited.includes(node)) {
            shortest = node;
        }
    }
    return shortest;
};

const findShortestPath = (graph, startNode, endNode) => {
    // track distances from the start node
    let distances = {};
    distances[endNode] = Infinity;
    distances = Object.assign(distances, graph[startNode]);
    // track paths
    let parents = { endNode: null };
    for (let child in graph[startNode]) {
        parents[child] = startNode;
    }
    // collect visited nodes
    const visited = [];
    // find the nearest node
    let node = shortestDistanceNode(distances, visited);
    // for that node:
    while (node) {
        // find its distance from the start node & its child nodes
        const distance = distances[node];
        const children = graph[node];
        // for each of those child nodes:
        for (const child in children) {
            // make sure each child node is not the start node
            if (String(child) === String(startNode)) {
                console.log(`Don't return the start node`);
                continue;
            } else {
                console.log(`startNode: ${startNode}`);
                console.log(
                    `distance from node ${parents[node]} to node ${node}`
                );
                console.log(`previous distance: ${distances[node]}`);
                // save the distance from the start node to the child node
                let newDistance = distance + children[child];
                console.log(`new distance: ${newDistance}`);
                // if there's no recorded distance from the start node to the child node in the distances object
                // or if the recorded distance is shorter than the previously stored distance from the start node to the child node
                if (!distances[child] || distances[child] > newDistance) {
                    // save the distance to the object
                    distances[child] = newDistance;
                    // record the path
                    parents[child] = node;
                    console.log(`distance and parents updated`)
                } else {
                    console.log(`distance and parents not updated`)
                }
            }
        }
        // move the current node to the visited set
        visited.push(node);
        // move to the nearest neighbour node
        node = shortestDistanceNode(distances, visited);
    }
    // when the end node is reached, reverse the recorded path back to the start node
    let shortestPath = [endNode];
    let parent = parents[endNode];
    while (parent) {
        shortestPath.push(parent);
        parent = parents[parent];
    }
    shortestPath.reverse();
    //this is the shortest path
    let results = {
        distance: distances[endNode],
        path: shortestPath,
    };
    // return the shortest path & the end node's distance from the start node
    return results;
};

console.log(findShortestPath(graph, 'start', 'end'));
console.log(findShortestPath(graph, 'A', 'B'));
console.log(findShortestPath(graph, 'A', 'start'));
