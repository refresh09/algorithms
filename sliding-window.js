//highest sum of k consecutive elements
let input = [1, 5, 2, 3, 7, 1];
let k = 3;

let sum = highestSum(input, k);
console.log('highest sum');
console.log(sum);

function highestSum(input, k) {
    let highest = -1;
    if (input.length < k)
        return -1;

    //compute first sum 
    let sum = input.slice(0, k).reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
    });

    //sliding window
    //for each remaining set of k values, drop first element and add last element
    for (let i=0; i<input.length - k; ++i) {
        sum = sum - input[i] + input[i+k];
        highest = Math.max(highest, sum);
    }

    return highest;
}

//longest substring without duplicate characters
let s = 'pwwkew';
let longest = longestUniqueSubstring(s);
console.log('longest unique substring');
console.log(longest);

function longestUniqueSubstring(s) {
    let longest = -1;
    let n = s.length;
    
    if (n === 0)
        return 0;

    let left = 0, right = 0;
    let window = new Map();

    while (right < n) {
        //slide window to the right
        let rightChar = s.charAt(right);
        if (!window.has(rightChar)) {
            window.set(rightChar, 0);
        }
        window.set(rightChar, window.get(rightChar) + 1);
        right++;

        //duplicate character appears in the window, drop from left until valid
        while (window.get(rightChar) > 1) {
            let leftChar = s.charAt(left);
            window.set(leftChar, window.get(leftChar) - 1);
            left += 1;
        }
        longest = Math.max(longest, right - left);
    }
    return longest;
}
