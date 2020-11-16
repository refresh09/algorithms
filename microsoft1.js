let input = [54, 17, 62, 27, 1233, 44]; //8:106, 9:1287

// let result = solve(input);
// console.log(result);

/**
 * brute force
 * - nested loop, calculate every sum and track the max
 * - map to store (number, digit sum) so digit sums only calculated once
 * - for each number, do not add itself, skip i==j
 * - for inner loop, start from index of outer loop, since preceding numbers already processed in previous iterations
 * - time O(n^2), nested loop
 * @param {int[]} input 
 */
function solve(input) {
    let maxSum = -1;
    let mapDigitSums = new Map();

    if (input.length < 2)
        return -1;

    for (let i=0; i<input.length; ++i) {
        for (let j=i; j<input.length; ++j) {
            if (i !== j) {
                let sum1, sum2;
                
                //calculate digit sum on left
                if (mapDigitSums.has(input[i])) {
                    sum1 = mapDigitSums.get(input[i]);
                } else {
                    sum1 = digitSum(input[i]);
                    mapDigitSums.set(input[i], sum1);
                }
                
                //calculate digit sum on right
                if (mapDigitSums.has(input[j])) {
                    sum2 = mapDigitSums.get(input[j]);
                } else {
                    sum2 = digitSum(input[j]);
                    mapDigitSums.set(input[j], sum2);
                }

                //digit sums match, store highest sum of the two numbers
                if (sum1 === sum2) {
                    maxSum = Math.max(input[i] + input[j], maxSum);
                }
            }
        }
    }

    return maxSum;
}

function digitSum(num) {
    let sum = 0;
    let numbers = [...num.toString()];
    for (let n=0; n<numbers.length; ++n) {
        sum += +numbers[n];
    }
    return sum;
}

/**
 * log linear
 * - calculate digit sums of each number, map to cache (number, digit sum)
 * - quick sort the array of numbers, with sorted array containing digit sums, not the original numbers
 * - use array of equal length to track which number is in each index of sorted array, track[index]=number
 * - loop sorted array, for each group with same digit sum, find two largest numbers and store in vars a and b
 * - keep iterating until the digit sums are not equal, that means previous group ended - process a+b, then reset and start new group
 * - time O(nlog(n)) for sort, O(n) for calculating digit sums, O(n) to loop sorted array
 * @param {int[]} input 
 */

let mapSortedIndex = new Map();
let result = solve2(input);
console.log(result);

function solve2(input) {
    let maxSum = -1;
    let mapDigitSums = new Map();
    let sorted = [];

    if (input.length < 2)
        return -1;

    //build new array with all the digit sums, not yet sorted
    for (let i=0; i<input.length; ++i) {
        let sum;
        if (mapDigitSums.has(input[i])) {
            sum = mapDigitSums.get(input[i]);
        } else {
            sum = digitSum(input[i]);
            mapDigitSums.set(input[i], sum);
        }
        sorted[i] = sum;
        mapSortedIndex.set(i, input[i]);
    }

    //sort array of digit sums, so we can compare all numbers without nested loop
    console.log('before', sorted);
    sorted = quicksort(sorted, 0, sorted.length - 1);
    console.log('after', sorted);

    //find max sum
    let a = mapSortedIndex.get(0), b = -1;
    for (let k=1; k<sorted.length; ++k) {
        if (sorted[k] === sorted[k-1]) {
            let num = mapSortedIndex.get(k);
            
            if (num > a && num <= b) {
                //greater than a only, replace a
                a = num;
            } else if (num > b && num <= a) {
                //greater than b only, replace b
                b = num;
            } else if (num > a && num > b) {
                //greater than both, keep larger number and replace other one
                a = Math.max(a, b);
                b = num;
            }
        }

        //different digit sum or last item reached AND at least two items found with that digit sum (a and b both set)
        if ((k == sorted.length - 1 || sorted[k] !== sorted[k-1]) && a > -1 && b > -1) {
            maxSum = Math.max(maxSum, a+b);
            a = mapSortedIndex.get(k);
            b = -1;
        }
    }

    return maxSum;
}

function quicksort(input, left, right) {
    if (input.length <= 1) return input;
    let index = sort(input, left, right);
    
    //keep sorting left
    if (left < index - 1) {
        quicksort(input, left, index - 1);
    }

    //keep sorting right
    if (index < right) {
        quicksort(input, index, right);
    }

    return input;
}

function sort(input, left, right) {
    let l = left; 
    let r = right;
    let pivot = input[Math.floor((right + left) / 2)];
    
    while (l < r) {
        while (input[l] < pivot) {
            l++;
        }
        while (input[r] > pivot) {
            r--;
        }

        if (l <= r) {
            swap(input, l, r);
            l++;
            r--;
        }
    }
    return l;
}

function swap(input, left, right) {
    let tmp = input[right];
    input[right] = input[left];
    input[left] = tmp;

    //update numbers in index map
    let a = mapSortedIndex.get(left);
    let b = mapSortedIndex.get(right);
    mapSortedIndex.set(left, b);
    mapSortedIndex.set(right, a);
}
