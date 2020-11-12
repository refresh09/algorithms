/*
    /  1  /  2  /  3  /
            abc   def 
    /  4  /  5  /  6  /
      ghi   jkl   mno
    /  7  /  8  /  9  /
     pqrs   tuv  wxyz 
*/

let map = [ 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 9, 9, 9, 9 ];

let words = ["foo", "bar", "baz", "foobar", "emo", "cap", "car", "cat", "mac", "cpr"];
let phoneNumber = "3662277";

class TrieNode {
    value: number;
    children: TrieNode[] = new Array<TrieNode>(10);

    constructor(val: number) {
        this.value = val;
    }

    addWord(word: number[], charIndex: number) {
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
solve(phoneNumber, words);

//find words (phone pad representation) that are contained in a given phone number
//linear time
function solve(phoneNumber: string, words: string[]) {
    //represent phone number as trie
    //O(m), m=length of phone number
    let trie = new TrieNode(0);
    let phoneNumbers: number[] = new Array<number>(phoneNumber.length);
    for (let i=0; i<phoneNumber.length; ++i) {
        phoneNumbers[i] = +phoneNumber[i];
    }
    
    //create trie with phone number - can support multiple phone number inputs
    //O(m), m=length of phone number
    trie.addWord(phoneNumbers, 0);

    //iterate all words, for each one traverse trie with phone number
    //O(nm), n=number of words, m=length of phone number
    for (let j=0; j<words.length; ++j) {
        let word = words[j];

        //map word to array of numbers
        let wordNumbers: number[] = mapToNumbers(word);

        //search for word in trie
        let found = search(trie, wordNumbers, 0);

        console.log(word);
        console.log(found);
    }
}

/* 
 * search for word - BFS
 */
function search(root: TrieNode, word: number[], charIndex: number): boolean {
    //base case - all letters found
    if (charIndex == word.length)
        return true;
    
    let found: boolean = false;
    let queue: TrieNode[] = [];

    for (let i=0; i<root.children.length; ++i) {
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
function mapToNumbers(word: string): number[] {
    //let characters: string[] = [...word];
    let numbers: number[] = new Array<number>(word.length);
    let a = "a".charCodeAt(0);
    for (let i=0; i<word.length; ++i) {
        numbers[i] = map[word.charCodeAt(i) - a];
    }
    return numbers;
}
