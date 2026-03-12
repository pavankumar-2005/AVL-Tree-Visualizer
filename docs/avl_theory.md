"# Basic AVL Tree Theory" 
"# Basic AVL Tree Theory" 
# AVL Trees - Basic Theory

An AVL tree is a self-balancing Binary Search Tree (BST).
It ensures that the height difference (balance factor) between
the left and right subtrees of any node is at most 1.

## Why AVL Trees?
- Normal BSTs can become skewed (like a linked list).
- AVL trees rebalance themselves to maintain O(log n) operations.

## Balance Factor
Balance Factor = Height(left subtree) - Height(right subtree)

Allowed values: -1, 0, +1  
If outside this range, rotations are performed to restore balance.
