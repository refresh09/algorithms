/**
 * Given an array of integers and a value, 
 * determine if there are any two integers in the array whose sum is equal to the given value.
 */
let aa = [5, 7, 1, 3, 8, 4, 9];
let aaExpected = 11;

console.log('find sum of two integers');
let aaResult = aaSolve(aa, aaExpected);
console.log(aaResult);

function aaSolve(input, sum) {
    let set = new Set();
    for (let i = 0; i < input.length; ++i) {
        if (i > 0 && set.has(sum - input[i]))
            return true;
        set.add(input[i]);
    }
    return false;
}

/**
 * Given a two-dimensional array, if any element within is zero, make its whole row and column zero.
 */
let bb = [
    [1, 5, 45, 0, 81],
    [6, 7, 2, 82, 8],
    [20, 22, 49, 5, 5],
    [0, 23, 50, 4, 92],
];
console.log('2D array, make whole row/column zero');
bbSolve(bb);

function bbSolve(matrix) {
    if (!matrix || matrix.length === 0)
        return;

    let zero_rows = new Set();
    let zero_cols = new Set();

    let rows = matrix.length;
    let cols = matrix[0].length;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (matrix[i][j] === 0) {
                if (!zero_rows.has(i)) {
                    zero_rows.add(i);
                }
                if (!zero_cols.has(j)) {
                    zero_cols.add(j);
                }
            }
        }
    }

    zero_rows.forEach(function (r) {
        for (let c = 0; c < cols; c++) {
            matrix[r][c] = 0;
        }
    });

    zero_cols.forEach(function (c) {
        for (let r = 0; r < rows; r++) {
            matrix[r][c] = 0;
        }
    });

    console.log(matrix);
}

/**
 * Reverse words in a sentence
 * "Hello World" to "World Hello"
 * - write to new array of words in reverse order
 * - flip words, starting from center
 */

 /**
  * check if string is a palindrome
  */
 var isPalindrome = function(s) {
    let ss = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    for (let l=0, r=ss.length - 1; l<r; ++l, --r) {
        if (l < r && ss[l] !== ss[r])
            return false;
    }
    return true;
};

/**
 * Find missing number in series 1...n
 */
let find_missing = function(input) {
    //  calculate sum of all integers
    //  in input list

    let actual_sum = 0;
    for (let i in input) {
        actual_sum += input[i];
    }
    //  There is exactly 1 number missing
    let n = input.length + 1;
    let sum_of_n = Math.floor((n * (n + 1)) / 2);
    return sum_of_n - actual_sum;
};



/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
//[8,2,6,3]
//13
let gc, gt;
var combinationSum = function(candidates, target) {
    gc = candidates.sort();
    gt = target;
    let toReturn = [];
    for (let i=0; i<gc.length; ++i) {
        let nums = [];
        let result = dfs(gc[i], 0, nums);
        
        if (!!result && result.length > 0) {
            if (Array.isArray(result[0])) {
                toReturn = toReturn.concat(result);
            } else {
                toReturn.push(result);
            }
        }
    }
    
    return toReturn;
};

function dfs(candidate, sum) {
    var newSum = sum + candidate;
    if (newSum > gt) return null;
    else if (newSum === gt) return [candidate];
    
    let stack = [];
    
    for (let i=gc.length - 1; i>=0; --i) {
        let c = gc[i];
        //only process bigger nodes since the smaller one already done [1,2] vs [2,1]
        //when processing root 1 node, will already traverse 1 and 2 children
        //next when processing root 2 node, can skip 1 child
        if (c >= candidate)
            stack.push(c);
    }
    
    let paths = [];
    while (stack.length > 0) {
        let c = stack.pop();
        let result = dfs(c, newSum);
        
        //candidate c produces path to the target sum
        if (!!result && result.length > 0) {
            let currentPathLength = paths.length;
            let resultLength = result.length;
            for (let j=0; j<resultLength; ++j) {
                if (Array.isArray(result[j])) {
                    let p = result[j];
                    p.push(candidate);
                    if (paths.length === 0 || Array.isArray(paths[0])) {
                        paths.push(p);
                    } else {
                        paths = [paths, p];
                    }
                } else {
                    if (currentPathLength > 0) {
                        result.push(candidate);
                        if (Array.isArray(paths[0])) {
                            paths.push(result);
                        } else {
                            paths = [paths, result];
                        }
                        break;
                    } else {
                        paths.push(result[j]);
                        if (j === 0) paths.push(candidate);
                    }
                }
            }
        }
    }
    
    if (paths.length > 0) {
        return paths;
    } 
    return null;
}

