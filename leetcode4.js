/**
 * given array of nums, find subarray of k length or greater with max average
 * within 10^-5 precision accepted, nums are +/- and not sorted
 * approach - binary search - guess an initial average, given min/max of nums
 * foreach num, calc num-avg, positive means will raise avg and negative means will lower avg
 * calc sum of first k nums, then with sliding window add from right, remove from left if <0, meaning will it lowers avg
 * at any point when sum > 0, return true, means larger avg can be found
 * if larger possible, make avg the new lower bound, calc new higher avg, and repeat
 */
var findMaxAverage = function(nums, k) {
    let lower = Math.min(...nums), upper = Math.max(...nums);

    while (Math.abs(upper - lower) > 0.00001) {
        let avg = (lower + upper) / 2;
        if (higherAvgPossible(nums, avg, k)) {
            lower = avg; 
        } else {
            upper = avg;
        }
    }
    
    return lower;
};

let higherAvgPossible = (nums, avg, k) => {
    let diff = [];
    let sum = 0, prev = 0;;

    for (let i=0; i<nums.length; ++i) {
        diff[i] = nums[i] - avg;
    }

    for (let i=0; i<k; ++i) {
        sum += diff[i];
    }

    if (sum >= 0) return true;

    for (let i=k; i<diff.length; ++i) {
        sum += diff[i];
        prev += diff[i-k];

        if (prev < 0) {
            sum -= prev;
            prev = 0;
        }
        if (sum > 0)
            return true;
    }
    return false;
};


/**
 * min operations to convert word1 to word2 (edit distance)
 * DP - if one word is empty, num=length of other word
 * foreach index i in word1, j in word2 - find min of 3 possible ops - horse/ros, 
 * 1) dist of prev index of word1
 * 2) dist of prev index of word2
 * 2) dist of prev indexes of both
 * represents prev num of edits + 1 op for inserting char at j to word1, or removing char from word1, or replace word1[i] with word2[j]
 * if chars at current indexes are equal use min count of prev, otherwise +1 for additional op
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function(word1, word2) {
    let n = word1.length;
    let m = word2.length; 
    let distances = new Array(n+1).fill().map(() => []);
    
    if (n == 0)
        return m;
    if (m == 0)
        return n;
    
    //DP
    for (let i=0; i<=n; i++) {
        for (let j=0; j<=m; j++) {
            if (i === 0) {
                distances[0][j] = j;
            } else if (j === 0) {
                distances[i][0] = i;
            } else {
                let prev1 = distances[i-1][j];
                let prev2 = distances[i][j-1];
                let prevBoth = distances[i-1][j-1];

                if (word1[i-1] === word2[j-1])
                    distances[i][j] = prevBoth;
                else
                    distances[i][j] = 1 + Math.min(prev1, prev2, prevBoth);
            }
        }
    }
    return distances[n][m];
};


/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param head The linked list's head.
        Note that the head is guaranteed to be not null, so it contains at least one node.
 * @param {ListNode} head
 */
let head;
var Solution = function(head) {
    this.head = head;
};

/**
 * Returns a random node's value.
 * reservoir sampling - size unknown
 * @return {number}
 */
Solution.prototype.getRandom = function() {
    let node = this.head;
    let size = 1;
    let selected = 0;
    while (node != null) {
        if (Math.random() < 1.0 / size) {
            selected = node.val;
        }
        size++;
        node = node.next;
    }
    return selected;
};

/** 
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(head)
 * var param_1 = obj.getRandom()
 */


