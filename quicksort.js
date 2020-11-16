let input = [54, 81, 13, 78, 74, 86, 42];

console.log(input);
quicksort(input, 0, input.length - 1);
console.log(input);

function swap(items, left, right) {
    let temp = items[right];
    items[right] = items[left];
    items[left] = temp;
}

function partition(items, left, right) {
    let l = left;
    let r = right;
    let pivot = items[Math.floor((right + left) / 2)];
    
    while (l <= r) {
        while (items[l] < pivot) {
            l++;
        }
        while (items[r] > pivot) {
            r--;
        }
        if (l <= r) {
            swap(items, l, r);
            l++;
            r--;
        }
    }
    return l;
}

function quicksort(items, left, right) {
    let index;
    if (items.length > 1) {
        index = partition(items, left, right);
        //more on left
        if (left < index - 1) {
            quicksort(items, left, index - 1);
        }
        
        //more on right
        if (index < right) {
            quicksort(items, index, right);
        }
    }
    return items;
}