/**
 * remove k digits from the number so new number is smallest possible
 * "1432219", k=3, output="1219"
 * "10200", k=1, output="200"
 * @param {string} num
 * @param {number} k
 * @return {string}
 */
var removeKdigits = function(num, k) {
    //remove numbers starting from the front - numbers at front have higher base power
    //at each index, if previous number is bigger, remove those first 
    //if numbers are increasing, they will not be removed - remove k digits from the end
    let stack = [num[0]];
    for (let i=1; i<num.length; ++i) {
        //remove up to k numbers that are bigger than the current number
        while (k > 0 && stack[stack.length - 1] > num[i]) {
            stack.pop();
            k--;
        }
        
        stack.push(num[i]);
    }
    
    //remove digits from the end, up to k
    for (let remaining=0; remaining<k; ++remaining) {
        stack.pop();
    }
    
    //if result is empty, return 0
    if (stack.length === 0) {
        return '0';
    } else {
        //remove leading zeros
        let zeros = 0;
        for (let j=0; j<stack.length; ++j) {
            if (stack[j] == 0) zeros++;
            else break;
        }
        if (zeros === stack.length) return '0';
        else
            return stack.join('').substring(zeros);
    }
};

/**
 * sort in place, array of 0/1/2, flag colors
 * [2,0,2,1,1,0]
 * [2,0,1]
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function(nums) {
    let left = 0;
    let right = nums.length - 1;
    let cur = 0;
    
    while (cur <= right) {
        if (nums[cur] === 0) {
            //swap 0 to left, move left pointer up
            swap(nums, cur, left);
            left++;
            cur++;
        } else if (nums[cur] === 2) {
            //swap 2 to right, keep current pointer in place to evaluate again
            swap(nums, cur, right);
            right--;
        } else {
            cur++;
        }
    }
};

function swap(nums, a, b) {
    let temp = nums[a];
    nums[a] = nums[b];
    nums[b] = temp;
}

/**
 * number of unique numbers less than n that can be generated from digit array 
 * ["1", "3", "5", "7"], n=100, output=20
 * ["1","2","3","4","5","6","7","8"], n=8363065, output=2221640
 * ["1","2","3","4","5","6","7","8"], n=940860624, output=
 * @param {string[]} digits
 * @param {number} n
 * @return {number}
 */
var atMostNGivenDigitSet = function(digits, n) {
    let count = 0;
    let maxLength = n.toString().length;
    let nums = [...n.toString()];
    
    //index=length of number, value=number of possibilities
    let possible = [];
    possible[maxLength] = 0;
    
    for (let length=1; length<maxLength; ++length) {
        possible[length] = Math.pow(digits.length, length);
    }
    
    //for max length number - each digit that is < the same index in n, add all possibilities of length-1
    //if equal, process next number - do not add anything for current index
    let index = 0;
    let processNext = true;
    while (processNext) {
        let numLength = maxLength - index;
        processNext = false;
        
        for (let i=0; i<digits.length; ++i) {
            if (+digits[i] < nums[index]) {
                possible[numLength] += Math.pow(digits.length, numLength - 1);
            } else if (+digits[i] == nums[index]) {
                processNext = true;
                if (index == maxLength - 1) possible[numLength] += 1;
                index++;
                break;
            }
        }
    }
    
    count += possible.reduce((sum, cur) => { return sum+cur; });
    
//     let stack = [];
//     stack.push('');
//     while (stack.length > 0) {
//         let cur = stack.pop();
//         let value = Number(cur);
//         if (value <= n) {
//             if (value > 0)
//                 count++;

//             if (cur.length <= maxLength) {
//                 for (let i=0; i<digits.length; ++i) {
//                     let digit = digits[i];

//                     let newNum = cur + digits[i];
//                     stack.push(newNum);
//                 }
//             }
//         }
//     }
    return count;
};


/**
 * "eceba", output 3
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstringTwoDistinct = function(s) {
    //map of (letter, count) 
    //iterate chars, pointers at left and right
    //count unique chars, if 3 then move left position until a unique char removed
    //decrement count in map, then if map count is 0, decrement unique count
    
    let max = 0;
    let map = new Map();
    let left = 0, right = 0;
    let unique = 0;
    let chars = [...s];
    let subst = '';
    
    for (let i=0; i<chars.length; ++i) {
        subst += chars[i];
        
        //update map
        if (!map.has(chars[i])) {
            map.set(chars[i], 1);
            unique++;
        } else {
            let curCount = map.get(chars[i]);
            if (curCount === 0) unique++;
            map.set(chars[i], curCount + 1);
        }
        
        //check unique
        while (unique > 2) {
            let leftCharCount = map.get(chars[left]);
            if (leftCharCount === 1) {
                map.set(chars[left], 0);
                unique--;
            } else {
                map.set(chars[left], leftCharCount - 1);
            }
            
            subst = subst.substring(1);
            left++;
        }
        max = Math.max(max, subst.length);
        right++;
    }
    
    return max;
};


/**
 * find valid words formed using the provided chars
 * @param {string[]} words
 * @param {string} chars
 * @return {number}
 */
var countCharacters = function(words, chars) {
    let good = [];
    let available = new Map();
    
    //populate unique valid chars
    let arrChars = [...chars];
    for (let c of arrChars) {
        if (available.has(c)) {
            available.set(c, available.get(c) + 1);
        } else {
            available.set(c, 1);
        }
    }
    
    for (let i=0; i<words.length; ++i) {
        let word = words[i];
        let map = {};
        let valid = true;
        
        for (let letter of word) {
            if (!!map[letter]) {
                map[letter] = map[letter] + 1;    
            } else {
                map[letter] = 1;
            }
            
            //if not a valid char or number of occurrences exceed available chars
            if (!available.has(letter) || map[letter] > available.get(letter)) {
                valid = false;
                break;
            }
        }
        
        if (valid)
            good.push(word);
    }
    
    let totalLength = 0;
    for (let g=0; g<good.length; ++g) {
        totalLength += good[g].length;
    }
    return totalLength;
};


/**
 * @param {string} paragraph
 * @param {string[]} banned
 * @return {string}
 */
var mostCommonWord = function(paragraph, banned) {
    //map of (word, word count)
    //words from paragraph - to lower, remove punctuation [!?',;.']
    //answer is unique - there should not be multiple words with same occurrence count
    
    let map = {};
    let words = paragraph.split(' ');
    let regex = new RegExp('[A-Za-z]+');
    
    //set of banned words
    let ban = new Set();
    for (let b=0; b<banned.length; ++b) {
        ban.add(banned[b]);
    }
    
    //count of each word
    for (let i=0; i<words.length; ++i) {
        let match = words[i].match(regex);
        if (!match) continue;
        let w = match[0].toLowerCase();
        
        if (ban.has(w))
            continue;
        
        if (!map[w]) {
            map[w] = 1;
        } else {
            map[w] = map[w] + 1;
        }
    }
    
    //find largest count 
    let maxCount = 0;
    let word = '';
    for (let w in map) {
        if (map[w] > maxCount) {
            maxCount = map[w];
            word = w;
        }
    }
    
    return word;
};


/**
Cut all trees, 1 means walkable path, 0 means cannot pass, >1 means tree height
Find min steps needed to cut all trees in order of tree height
Input: 
[
 [1,2,3],
 [0,0,4],
 [7,6,5]
]
Output: 6

 * @param {number[][]} forest
 * @return {number}
 */
let locationSteps;

var cutOffTree = function(forest) {
    //at each non-zero location, track min steps needed to get there
    locationSteps = new Array(forest[0].length * forest.length + 1).fill(0);
    let result = walk(forest, 0, 0, 0);   
    console.log(locationSteps);
};

//find all neighbors and process them, calculating distance travelled
//if current node is the 
function walk(forest, x, y, steps) {
    console.log('x ' + x + ' y ' + y);
    if (x > forest[0].length - 1 || y > forest.length - 1)
        return;
    
    let location = (x+1)*(y+1);
    
    if (forest[y][x] > 0) {
        let cur = locationSteps[location];
        if (cur === 0 || cur > steps + 1)
            locationSteps[location] = steps + 1;
    } else {
        locationSteps[location] = -1;
    }
    
    //walk right
    if (x < forest[0].length - 1) {
        let rVisited = locationSteps[(x+2)*(y)] > 0;
        if (!rVisited) {
            walk(forest, x+1, y, steps + 1);
        }
    }
    
    //walk left
    if (x > 0) {
        let lVisited = locationSteps[(x)*(y)] > 0;
        if (!lVisited) {
            walk(forest, x-1, y, steps + 1);
        }
    }
    
    //walk down 
    if (y < forest.length - 1) {
        walk(forest, x, y+1, steps + 1);
    }
    
    //walk up
    if (y > 0) {
        walk(forest, x, y-1, steps + 1);
    }
}


/*
public int bfs(List<List<Integer>> forest, int sr, int sc, int tr, int tc) {
    int R = forest.size(), C = forest.get(0).size();
    Queue<int[]> queue = new LinkedList();
    queue.add(new int[]{sr, sc, 0});
    boolean[][] seen = new boolean[R][C];
    seen[sr][sc] = true;
    while (!queue.isEmpty()) {
        int[] cur = queue.poll();
        if (cur[0] == tr && cur[1] == tc) return cur[2];
        for (int di = 0; di < 4; ++di) {
            int r = cur[0] + dr[di];
            int c = cur[1] + dc[di];
            if (0 <= r && r < R && 0 <= c && c < C &&
                    !seen[r][c] && forest.get(r).get(c) > 0) {
                seen[r][c] = true;
                queue.add(new int[]{r, c, cur[2]+1});
            }
        }
    }
    return -1;
}
*/


