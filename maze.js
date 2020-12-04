let input = [[0, 1, 0],
            [0, 0, 1],
            [0, 0, 0]]

//0 means passable, 1 is wall
//find number of paths from top left corner to bottom right
let result = solve(input);
console.log(result);

function solve(maze) {
    //contains count of paths to each point
    let paths = new Array(maze.length).fill(new Array(maze[0].length).fill(0));
    paths[0][0] = 1;

    for (let i=0; i<maze.length; ++i) {
        for (let j=0; j<maze[0].length; ++j) {
            //current is a wall or is initial starting point
            if (maze[i][j] == 1 || (i == 0 && j == 0)) 
                continue;

            let count = 0;
            //check paths from above
            if (i > 0)
                count += paths[i-1][j];
            
            //check paths from left
            if (j > 0)
                count += paths[i][j-1];
            
            paths[i][j] = count;
        }
    }
    
    return paths[maze.length-1][maze.length-1];
}
