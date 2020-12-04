//n=number of steps, can jump 1,2,3 steps - number of ways to reach top
//3 steps = 4, [1,1,1], [1,2], [2,1], [3]

let result = steps(20);
console.log(result);

function steps(n) {
    let dp = new Array(n+1).fill(0);
    dp[1] = 1;
    dp[2] = 2;
    dp[3] = 4;
    
    for (let i=4; i<=n; ++i) {
        for (let j=1; j<=3; ++j) {
            if (j > i) break;
            dp[i] += dp[i-j];
        }
    }
    console.log(dp);
    return (dp[n]);
}

/**
 * can partition array of numbers into two subarrays of equal sum
 * [1,5,11,5], output=true, [1,5,5] and [11]
 * [1,2,3,5], output=false
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function(nums) {
    if (nums.length == 0)
        return false;
    
    //find sum of all nums
    let totalSum = 0;
    for (let n=0; n<nums.length; ++n) {
        totalSum += nums[n];
    }
    
    //target sum is half of total
    //if odd, nums cannot be partitioned into 2 equal sum subsets
    if (totalSum % 2 !== 0) 
        return false;
    
    let target = totalSum / 2;
    let dp = new Array(target + 1).fill(false);
    
    dp[0] = true;
    for (let i=0; i<nums.length; ++i) {
        let num = nums[i];
        for (let j=target; j>=num; --j) {
            //i iterates all nums, j iterates possible sums between num and target
            //dp[sum] true if sum already found previously (dp[j]) or diff already found (dp[j-num], other numbers + current num = sum j)
            dp[j] = dp[j] || dp[j-num];
        }
    }
    
    return dp[target] === true;
};
