// import {performance} from "perf_hooks";
/*
    /  1  /  2  /  3  /
            abc   def
    /  4  /  5  /  6  /
      ghi   jkl   mno
    /  7  /  8  /  9  /
     pqrs   tuv  wxyz
*/
let map = [2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 9, 9, 9, 9];
let words = ["foo", "bar", "baz", "foobar", "emo", "cap", "car", "cat", "mac", "cpr"];
let phoneNumbers = ["3662277", "3664908", '1862273'];
class TrieNode {
    constructor(val) {
        this.children = new Array(10);
        this.value = val;
    }
    addWord(word, charIndex) {
        //base case - all letters added
        if (charIndex == word.length)
            return;
        let char = word[charIndex];
        if (!this.children[char]) {
            this.children[char] = new TrieNode(char);
        }
        this.children[char].addWord(word, ++charIndex);
    }
}
//main entry
let start = process.hrtime();
for (let x=0; x<10000; ++x) {
    solveControl(phoneNumbers, words);
    //solve(phoneNumbers, words);
}
let end = process.hrtime(start);
console.log((end[0] * 1000) + (end[1] / 1000000) + 'ms');

//find words (phone pad representation) that are contained in a given phone number
//linear time
function solve(phoneNumbers, words) {
    //represent phone number as trie
    //O(m), m=length of phone number
    let trie = new TrieNode(0);
    let start = process.hrtime();
    for (let k=0; k<phoneNumbers.length; ++k) {
    
    let phoneNumberss = new Array(phoneNumbers[k].length);
    for (let i = 0; i < phoneNumbers[k].length; ++i) {
        phoneNumberss[i] = +phoneNumbers[k][i];
    }
    //create trie with phone number - can support multiple phone number inputs
    //O(m), m=length of phone number
    // let start = performance.now(); //end - start in milliseconds
    
    trie.addWord(phoneNumberss, 0);
}
    //iterate all words, for each one traverse trie with phone number
    //O(nm), n=number of words, m=length of phone number
    for (let j = 0; j < words.length; ++j) {
        let word = words[j];
        //map word to array of numbers
        let wordNumbers = mapToNumbers(word);
        //search for word in trie
        let found = search(trie, wordNumbers, 0);
        console.log(word);
        console.log(found);
    }
    let end = process.hrtime(start);
    console.log((end[0] * 1000) + (end[1] / 1000000) + 'ms');
}
function solveControl(phoneNumbers, words) {
    let start = process.hrtime();
    for (let j = 0; j < words.length; ++j) {
        let word = words[j];
        //map word to array of numbers
        let wordNumbers = mapToNumbers(word);
        let numberString = wordNumbers.join("");
        let found = false;
        for (let k=0; k<phoneNumbers.length;++k) {
            found = found || phoneNumbers[k].includes(numberString);
        }
        console.log(word);
        console.log(found);
    }
    let end = process.hrtime(start);
    console.log((end[0] * 1000) + (end[1] / 1000000) + 'ms');
}
/*
 * search for word - BFS
 */
function search(root, word, charIndex) {
    //base case - all letters found
    if (charIndex == word.length)
        return true;
    let found = false;
    let queue = [];
    for (let i = 0; i < root.children.length; ++i) {
        if (!!root.children[i])
            queue.push(root.children[i]);
    }
    while (queue.length > 0) {
        let node = queue.shift();
        //if letter matched, then try to match next letter - else continue looking for current letter
        if (!!node) {
            let nextIndex = node.value === word[charIndex] ? charIndex + 1 : charIndex;
            found = search(node, word, nextIndex);
        }
    }
    return found;
}
/*
 * map each letter to corresponding number on phone pad
 */
function mapToNumbers(word) {
    //let characters: string[] = [...word];
    let numbers = new Array(word.length);
    let a = "a".charCodeAt(0);
    for (let i = 0; i < word.length; ++i) {
        numbers[i] = map[word.charCodeAt(i) - a];
    }
    return numbers;
}
//# sourceMappingURL=phone.js.map