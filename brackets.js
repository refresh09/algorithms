/**
 * generate all possible valid combinations of n pairs of brackets
 * 3, output: ["((()))","(()())","(())()","()(())","()()()"]
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
    let results = [];
    
    test('', 0, 0);
    
    function test(cur, open, close) {
        //console.log(`cur ${cur}`);
        
        //full target length, then add to results
        if (cur.length == n * 2) {
            results.push(cur);
            return;
        }
        
        if (open < n) {
            //opening count < n, add one more opening ( and evaluate
            let tmp = cur + '(';
            test(tmp, open + 1, close);
        }
        if (close < open) {
            //closing count < opening count, add one more closing ) and evaluate
            let tmp = cur + ')';
            test(tmp, open, close + 1);
        }
    }
    
    return results;
};

/**
 * expand string, optional letters in format {a,b,c} - return all combinations
 * "{a,b}{z,x,y}", output ["ax","ay","az","bx","by","bz"]
 * @param {string} S
 * @return {string[]}
 */
var expand = function(S) {
    let results = [];
    
    test('', S);
    
    function test(str, remaining) {
        let idxStart = remaining.indexOf('{');
        
        //opening brace
        //1. append prefix to result string, from start to { 
        //2. parse options between curly braces, recursive call adding each optional letter
        if (idxStart !== -1) {
            let pre = str + remaining.substring(0, idxStart);
            let idxEnd = remaining.indexOf('}');
            
            //sort options, so final results are sorted as well
            let options = remaining.substring(idxStart + 1, idxEnd).split(',').sort();
            
            for (let i=0; i<options.length; ++i) {
                test(pre + options[i], remaining.substring(idxEnd + 1));
            }
        } else {
            //no more optional letters, append rest of string and add to results
            results.push(str + remaining);
        }
    }
    
    return results;
};

console.log(matchBrackets(">>"));
console.log(matchBrackets("<<><"));
/**
 * given string of brackets, add opening and closing brackets to make the string valid
 * ">>", output "<<>>"
 * "<<><", output "<<><>>"
 * @param {string} s 
 */
function matchBrackets(s) {
    let result = [];
    let open = 0;
    let close = 0;

    for (let i=0; i<s.length; ++i) {
        if (s[i] == '<') {
            open++;
        }
        else if (s[i] == '>') {
            if (open == 0) {
                //find prev closing brackets, add opening bracket to innermost one
                let count = 0;
                while (result[result.length - 1] == '>') {
                    count++;
                    result.pop();
                }

                //add opening bracket, then re-add closing brackets
                result.push('<');
                for (let j=0; j<count; ++j) {
                    result.push('>');
                }
            } else {
                //closes a pair
                open--;
            }
        }

        //add current to result stack
        result.push(s[i]);
    }

    //close remaining opened brackets
    for (let k=0; k<open; ++k) {
        result.push('>');
    }

    return result.join('');
}
