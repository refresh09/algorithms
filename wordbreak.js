Input: s = "applepenapple", wordDict = ["apple", "pen"]

var wordBreak = function(s, wordDict) {
    let pass = breakk(s, wordDict, 0);
    return pass;
};

function breakk(s, dict, startIndex) {
    let queue = [];
    queue.push(startIndex);
    
    let visited = Array(s.length).fill(0);
    let dictSet = new Set(dict);
    
    while (queue.length > 0) {
        let start = queue.shift();
        if (visited[start] == 0) {
            for (let i=start + 1; i<=s.length; ++i) {
                if (dictSet.has(s.substring(start, i))) {
                    queue.push(i);
                    if (i == s.length) {
                        return true;
                    }
                } 
            }
            visited[start] = 1;
        }
    }
    return false;
}