//courses, first has prerequisite of second - for number of courses n, find how many cannot be finished
//[0,1] and [1,0] is a cycle, so cannot be finished
//create adjacency matrix for edges and DFS to find cycles
console.log(solve(2, [[1,0], [0,1]]));
console.log(solve(3, [[1,0], [2,1]]));

function solve(numCourses, prerequisites) {
    //(course, [prereqs])
    let map = new Map();
    //[course, has cycle]
    let cache = [];

    //create adjacency map
    for (let i=0; i<prerequisites.length; ++i) {
        let prereq = prerequisites[i];
        if (map.has(prereq[0])) {
            map.get(prereq[0]).push(prereq[1]);
        } else {
            map.set(prereq[0], [prereq[1]]);
        }
    }
    console.log(map);

    //for each course, check for cycle
    for (let c=0; c<numCourses; ++c) {
        cache[c] = null;
        let cycle = hasCycle(map, c, new Set(), cache);
        if (cycle) return false;
    }

    return true;
}

function hasCycle(map, course, visited, cache) {
    //course already processed, return cached value
    if (cache[course] != null) {
        return cache[course];
    }

    let prereqs = map.get(course);

    //no prerequisites, return false - no cycle
    if (!map.has(course))
        return false;

    //current course already visited - there is a cycle
    if (visited.has(course))
        return true;

    visited.add(course);
    
    //recursively check for cycle 
    for (let i=0; i<prereqs.length; ++i) {
        let cycle = hasCycle(map, prereqs[i], visited, cache);
        if (cycle) {
            cache[course] = true;
            return true;
        }
    }
    cache[course] = false;
    return false;
}
