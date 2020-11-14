/**
 * Given an array of integers and a value, 
 * determine if there are any two integers in the array whose sum is equal to the given value.
 */
let aa = [5, 7, 1, 3, 8, 4, 9];
let aaExpected = 18;

console.log('find sum of two integers');
let aaResult = aaSolve(aa, aaExpected);
console.log(aaResult);

function aaSolve(input, sum) {
    let set = new Set();
    for (let i=0; i<input.length; ++i) {
        if (i > 0 && set.has(sum - input[i]))
            return true;
        set.add(input[i]);
    }
    return false;
}
