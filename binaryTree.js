/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * build binary tree from preorder and inorder traversal
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
    let inMap = new Map();
    if (preorder.length == 1) return root;
    let idxPre = 0;
    
    //put inorder in map for easier lookup
    for (let i=0; i<inorder.length; ++i) {
        inMap.set(inorder[i], i);
    }
    
    let build = (left, right) => {
        if (left == right)
            return null;
        
        let root = new TreeNode(preorder[idxPre]);
        
        //find inorder index
        let idxIn = inMap.get(preorder[idxPre]);
        
        idxPre++;
        root.left = build(left, idxIn);
        root.right = build(idxIn+1, right);
        
        return root;
    };
    
    return build(0, preorder.length);
};

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * build binary tree from preorder and postorder traversal
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function(inorder, postorder) {
    //last item in postorder is root
    let idxPost = postorder.length - 1;
    
    let map = new Map();
    for (let i=0; i<inorder.length; ++i) {
        map.set(inorder[i], i);
    }
    
    let build = (left, right) => {
        if (left > right || idxPost < 0) return null;
        
        //create node
        let root = new TreeNode(postorder[idxPost]);
        let idxIn = map.get(postorder[idxPost]);
            
        idxPost--;
        root.right = build(idxIn + 1, right);
        root.left = build(left, idxIn - 1);
        
        return root;
    };
    
    return build(0, inorder.length - 1);
};


/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * given root of binary search tree, rearrange tree in-order so leftmost is new root and every node has only right child
 * since this is binary search tree, in-order will produce result in asc order
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var increasingBST = function(root) {
    let tree = new TreeNode(-1);
    let cur = tree;
    
    //recursive - in-order so left then cur then right, track current node 
    //alternative - do dfs and populate array in-order, then loop and build tree after
    let dfs = (node) => {
        if (!node) return;
        
        dfs(node.left);
        cur.right = new TreeNode(node.val);
        cur = cur.right;
        dfs(node.right);
    };
    
    dfs(root);
    
    return tree.right;
};


