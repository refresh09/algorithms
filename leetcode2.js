/**
 * "3[a]2[bc4[d]e]"
 * aaabcddddebcdddde
 * @param {string} s
 * @return {string}
 */
var decodeString = function(s) {
    let result = '';
    let stack = [];
    
    for (let c of s) {
        //process group when closing bracket found 
        if (c === ']') {
            //work backwards until opening bracket and repeat count are found
            let group = '';
            let repeatTimes = '';
            let complete = false;
            while (stack.length > 0) {
                let current = stack.pop();
                
                if (complete) {
                    if (!isNaN(current)) {
                        repeatTimes = current + repeatTimes;
                    } else {
                        //char not part of this group, add it back to stack
                        stack.push(current);
                        break;
                    }
                } else {
                    if (current === '[') {
                        complete = true;
                    } else {
                        group = current + group;
                    }
                }
            }
            
            for (let i=0; i<+repeatTimes; ++i) {
                stack.push(group);
            }
        } else {
            //push char to stack
            stack.push(c);
        }
    }
    return stack.join('');
};

