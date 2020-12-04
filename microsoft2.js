/*
Arrays A=[0,1,1,2,4], B[1,2,3,3,2], node in A one way path going to same index in B
- find min number of paths that should be reversed to visit all nodes
*/
let visited = [];
class City {
    value;
    reverse;
    children;

    constructor(val, rev) {
        this.value = val;
        this.reverse = rev === true;
        this.children = new Map();
    }

    addPaths(source, dest, reverseDirection) {
        for (let i=0; i<dest.length; ++i) {
            let sourceNode, destNode;
    
            //source node
            if (this.children.has(source[i])) {
                sourceNode = this.children.get(source[i]);
            } else {
                sourceNode = new City(source[i]);
                this.children.set(source[i], sourceNode);
                visited[source[i]] = false;
            }
    
            //dest node
            if (sourceNode.children.has(dest[i])) {
                destNode = sourceNode.children.get(dest[i]);
            } else {
                destNode = new City(dest[i], reverseDirection);
                sourceNode.children.set(dest[i], destNode);
            }
        }
    }
}

let a = [0, 1, 1, 2, 4];
let b = [1, 2, 3, 3, 2];
let cityCount = 0;
solve(a, b);

function solve(A, B) {
    //build tree
    let t = tree(A, B);
    console.log(t);

    //traverse tree until all nodes visited
    let cost = traverse(t);
    console.log(cost);
    console.log(visited);
}

function tree(source, dest) {
    let tree = new City(-1);
    tree.addPaths(source, dest, false);
    tree.addPaths(dest, source, true);
    return tree;
}

function traverse(node) {
    let cost = 0;
    if (node.value !== -1) {
        if (node.reverse === true && visited[node.value] !== true)
            cost++;
        visited[node.value] = true;
    }
    
    if (node.children.size > 0) {
        for (const c of node.children.entries()) {
            let tmp = traverse(c[1]);
            if (tmp > -1) {
                cost += tmp;
            }
        }
    }

    let allVisited = true;
    for(let i=0; i<visited.length; ++i) {
        if (visited[i] !== true) {
            allVisited = false;
            break;
        } 
    }

    if (allVisited)
        return cost;
    else 
        return -1;
}
