//from https://hackernoon.com/how-to-implement-dijkstras-algorithm-in-javascript-abdfd1702d04

const graph = {
    start: {A: 5, B: 2},
    A: {C: 4, D: 2},
    B: {A: 8, D: 7},
    C: {D: 6, finish: 3},
    D: {finish: 1},
    finish: {}
  };
  
  const findLowestCostNode = (costs, processed) => {
    const knownNodes = Object.keys(costs)
    
    const lowestCostNode = knownNodes.reduce((lowest, node) => {
        if (lowest === null && !processed.includes(node)) {
          lowest = node;
        }
        if (costs[node] < costs[lowest] && !processed.includes(node)) {
          lowest = node;
        }
        return lowest;
    }, null);
  
    return lowestCostNode
  };
  
  // function that returns the minimum cost and path to reach Finish
  const dijkstra = (graph) => {
    console.log('Graph: ')
    console.log(graph)
  
    // track lowest cost to reach each node
    const trackedCosts = Object.assign({finish: Infinity}, graph.start);
    console.log('Initial `costs`: ')
    console.log(trackedCosts)
  
    // track paths
    const trackedParents = {finish: null};
    for (let child in graph.start) {
      trackedParents[child] = 'start';
    }
    console.log('Initial `parents`: ')
    console.log(trackedParents)
  
    // track nodes that have already been processed
    const processedNodes = [];
  
    // Set initial node. Pick lowest cost node.
    let node = findLowestCostNode(trackedCosts, processedNodes);
    console.log('Initial `node`: ', node)
  
    console.log('while loop starts: ')
    while (node) {
      console.log(`***** 'currentNode': ${node} *****`)
      let costToReachNode = trackedCosts[node];
      let childrenOfNode = graph[node];
    
      for (let child in childrenOfNode) {
        let costFromNodetoChild = childrenOfNode[child]
        let costToChild = costToReachNode + costFromNodetoChild;
    
        if (!trackedCosts[child] || trackedCosts[child] > costToChild) {
          trackedCosts[child] = costToChild;
          trackedParents[child] = node;
        }
  
        console.log('`trackedCosts`', trackedCosts)
        console.log('`trackedParents`', trackedParents)
        console.log('----------------')
      }
    
      processedNodes.push(node);
  
      node = findLowestCostNode(trackedCosts, processedNodes);
    }
    console.log('while loop ends: ')
  
    let optimalPath = ['finish'];
    let parent = trackedParents.finish;
    while (parent) {
      optimalPath.push(parent);
      parent = trackedParents[parent];
    }
    optimalPath.reverse();
  
    const results = {
      distance: trackedCosts.finish,
      path: optimalPath
    };
  
    return results;
  };
  
  console.log('dijkstra', dijkstra(graph));




  /**
 * Implementation of Dijkstra Algorithm using adjacency matrix.
 * This returns an array containing the length of the shortest path from the start node to each other node.
 * It is only guaranteed to return correct results if there are no negative edges in the graph. Positive cycles are fine.
 * This has a runtime of O(|V|^2) (|V| = number of Nodes), for a faster implementation see @see ../fast/Dijkstra.java (using adjacency lists)
 *
 * @param graph an adjacency-matrix-representation of the graph where (x,y) is the weight of the edge or 0 if there is no edge.
 * @param start the node to start from.
 * @return an array containing the shortest distances from the given start node to each other node
 */
const dijkstra = function (graph, start) {

  //This contains the distances from the start node to all other nodes
  var distances = [];
  //Initializing with a distance of "Infinity"
  for (var i = 0; i < graph.length; i++) distances[i] = Number.MAX_VALUE;
  //The distance from the start node to itself is of course 0
  distances[start] = 0;

  //This contains whether a node was already visited
  var visited = [];

  //While there are nodes left to visit...
  while (true) {
      // ... find the node with the currently shortest distance from the start node...
      var shortestDistance = Number.MAX_VALUE;
      var shortestIndex = -1;
      for (var i = 0; i < graph.length; i++) {
          //... by going through all nodes that haven't been visited yet
          if (distances[i] < shortestDistance && !visited[i]) {
              shortestDistance = distances[i];
              shortestIndex = i;
          }
      }

      console.log("Visiting node " + shortestDistance + " with current distance " + shortestDistance);

      if (shortestIndex === -1) {
          // There was no node not yet visited --> We are done
          return distances;
      }

      //...then, for all neighboring nodes....
      for (var i = 0; i < graph[shortestIndex].length; i++) {
          //...if the path over this edge is shorter...
          if (graph[shortestIndex][i] !== 0 && distances[i] > distances[shortestIndex] + graph[shortestIndex][i]) {
              //...Save this path as new shortest path.
              distances[i] = distances[shortestIndex] + graph[shortestIndex][i];
              console.log("Updating distance of node " + i + " to " + distances[i]);
          }
      }
      // Lastly, note that we are finished with this node.
      visited[shortestIndex] = true;
      console.log("Visited nodes: " + visited);
      console.log("Currently lowest distances: " + distances);

  }
};

module.exports = {dijkstra};


