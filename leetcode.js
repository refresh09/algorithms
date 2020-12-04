
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * reverse linked list
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    // //recursive
    // let recurse = (node) => {
    //     if (node == null || node.next == null)
    //         return node;
    //     let n = recurse(node.next);
    //     node.next.next = node;
    //     node.next = null;
    //     return n;
    // };
    // return recurse(head);
    
    //iterative
    let prev = null;
    let cur = head;
    while (cur != null) {
        let tmp = cur.next;
        cur.next = prev;
        prev = cur;
        cur = tmp;
    }
    return prev;
};

/**
 * Given an array of integers nums and an integer k, return the total number of continuous subarrays whose sum equals to k.
 * [1,1,1] k=2, output 2
 * [1,2,3] k=3, output 2
 * [-1,1,0] k=0, output 3
 * [0,0] k=0, output 3
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function(nums, k) {
    let count = 0;
    
    //continuous subarrays - does not matter if sorted
    //subarray can be single element
    //numbers and sum can be negative
    let map = new Map();
    let sum = 0;
    map.set(0, 1);
    
    //sum of index A - sum of index B = sum of numbers between A and B
    //map - iterate numbers and track sum at each number
    //at current index i, if current sum-k count exists in map, it means there are that many subarrays with sum k (since sum[current] - sum[map index] = k)
    for (let i=0; i<nums.length; ++i) {
        sum += nums[i];
        if (map.has(sum - k))
            count += map.get(sum-k);
        
        let currentSum = map.has(sum) ? map.get(sum) : 0;
        map.set(sum, currentSum + 1);
    }
    
    ////brute force
    //for (let i=0; i<nums.length; ++i) {
    //    let sum = 0;
    //    for (let j=i; j<nums.length; ++j) {
    //        sum += nums[j];
    //        if (sum === k) {
    //            count++;
    //        }
    //    }
    //}
    
    return count;
};

/**
 * array of intervals, remove a specified interval
 * intervals = [[-5,-4],[-3,-2],[1,2],[3,5],[8,9]], toBeRemoved = [-1,4], output=[[-5,-4],[-3,-2],[4,5],[8,9]]
 * intervals = [[0,5]], toBeRemoved = [2,3], output=[[0,2],[3,5]]
 * intervals = [[0,2],[3,4],[5,7]], toBeRemoved = [1,6], output=[[0,1],[6,7]]
 * @param {number[][]} intervals
 * @param {number[]} toBeRemoved
 * @return {number[][]}
 */
var removeInterval = function(intervals, toBeRemoved) {
    let removeStart = toBeRemoved[0];
    let removeEnd = toBeRemoved[1];
    let result = [];
    
    //loop each interval
    for (let i=0; i<intervals.length; ++i) {
        let interval = intervals[i];
        let a = interval[0];
        let b = interval[1];
        
        //interval end is < remove start or interval start > remove end, there is no overlap - add original interval
        if (b < removeStart || a > removeEnd) {
            result.push([a, b]);
            continue;
        } 
        
        //new interval should end at remove start [original start..remove start]
        if (a < removeStart) {
            result.push([a, removeStart]);
        }
        
        //new interval should start at remove end [remove end..original end]
        if (b > removeEnd) {
            result.push([removeEnd, b]);
        }
    }
    return result;
};


/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * range sum of BST
 * root = [10,5,15,3,7,13,18,1,null,6], low = 6, high = 10, output=23
 * root = [10,5,15,3,7,null,18], low = 7, high = 15, output=32
 * @param {TreeNode} root
 * @param {number} low
 * @param {number} high
 * @return {number}
 */
var rangeSumBST = function(root, low, high) {
    //traverse tree and sum nodes
    //inclusive of low and high values
    return traverse(root, low, high);
};

function traverse(root, low, high) {
    let sum = 0;
    let stack = [];
    
    stack.push(root);
    
    while (stack.length > 0) {
        let current = stack.pop();
        console.log('node', current.val);
        
        //current node in range, add to sum
        if (current.val >= low && current.val <= high) {
            sum += current.val;
        }
        
        if (!!current.left && current.val >= low) {
            stack.push(current.left);
        }
        
        if (!!current.right && current.val <= high) {
            stack.push(current.right);
        }
    }
    
    return sum;
}

