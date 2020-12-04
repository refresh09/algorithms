/**
 * dynamic programming - dice rolls, coin change
 * @param {number} d
 * @param {number} f
 * @param {number} target
 * @return {number}
 */
var numRollsToTarget = function(d, f, target) {
    //array, number of dice + 1 (so index = dice number)
    //value at each index is array, inner array index = sum and value = count of combinations
    let dp = new Array(d+1);
    
    //initialize inner arrays with 0 for each sum
    for (let i = 0; i < dp.length; i++) {
        dp[i] = new Array(d*f + 1).fill(0);
    }
    
    let mod = Math.pow(10, 9) + 7;
    
    //sum greater than number of dice * faces, no combos possible
    if (target > d*f)
        return 0;
    
    //with only 1 dice, there is 1 way to get each face value
    for (let i = 1; i <= f; i++)
        dp[1][i] = 1;

    //loop number of dice, starting with 2 (single one handled earlier)
    for (let i = 2; i <= d;i++) {
        //loop each possible sum, number of dice * faces
        for (let j = i; j <= i*f; j++) {
            //loop each face value
            for (let k = 1; k <= f;k++) {
                //if face value already >= sum, do not need to process bigger face values
                if (k >= j)
                    break;
                
                //dp[dice][sum] += dp[other dice][sum - current face value]
                //target sum - current value = remainder, add number of combos of other dice adding up to remainder
                dp[i][j] += dp[i-1][j-k];    
            }
            //finished check face values, process modulus for each sum
            dp[i][j] = dp[i][j] % mod;
        }
    }
    
    return dp[d][target];
};