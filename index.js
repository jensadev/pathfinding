const tree = {
    10: {
        value: 10,
        left: 4,
        right: 17,
    },
    4: {
        value: 4,
        left: 1,
        right: 9,
    },
    17: {
        value: 17,
        left: 12,
        right: 18,
    },
    1: {
        value: 1,
        left: null,
        right: null,
    },
    9: {
        value: 9,
        left: null,
        right: null,
    },
    12: {
        value: 12,
        left: null,
        right: null,
    },
    18: {
        value: 18,
        left: null,
        right: null,
    },
};

const bfs = (tree, root, needle) => {
    let queue = [root];
    let path = [];
    // iterate over queue
    while (queue.length > 0) {
        // traverse nodes, return node if found
        // first in first out
        let current = queue.shift();
        console.log(`current: ${current.value}`);
        path.push(current.value);
        if (current.value === needle) {
            console.log('found');
            return path;
        }
        if (current.left) {
            queue.push(tree[current.left]);
        }
        if (current.right) {
            queue.push(tree[current.right]);
        }
    }
    // return null if not found
    console.log('not found');
};

let p = bfs(tree, tree[10], 12);

console.log(p)