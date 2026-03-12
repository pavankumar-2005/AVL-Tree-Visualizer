public class AVLTree {
    class Node {
        int key, height;
        Node left, right;

        Node(int d) {
            key = d;
            height = 1;
        }
    }

    Node root;

    // Utility: get height
    int height(Node n) {
        if (n == null) return 0;
        return n.height;
    }

    // Utility: get balance factor
    int getBalance(Node n) {
        if (n == null) return 0;
        return height(n.left) - height(n.right);
    }

    // Utility: right rotate
    Node rightRotate(Node y) {
        Node x = y.left;
        Node T2 = x.right;

        // Perform rotation
        x.right = y;
        y.left = T2;

        // Update heights
        y.height = Math.max(height(y.left), height(y.right)) + 1;
        x.height = Math.max(height(x.left), height(x.right)) + 1;

        // Return new root
        return x;
    }

    // Utility: left rotate
    Node leftRotate(Node x) {
        Node y = x.right;
        Node T2 = y.left;

        // Perform rotation
        y.left = x;
        x.right = T2;

        // Update heights
        x.height = Math.max(height(x.left), height(x.right)) + 1;
        y.height = Math.max(height(y.left), height(y.right)) + 1;

        // Return new root
        return y;
    }

    // Insert a key
    Node insert(Node node, int key) {
        // Normal BST insertion
        if (node == null) return new Node(key);

        if (key < node.key)
            node.left = insert(node.left, key);
        else if (key > node.key)
            node.right = insert(node.right, key);
        else
            return node; // Duplicate keys not allowed

        // Update height
        node.height = 1 + Math.max(height(node.left), height(node.right));

        // Get balance factor
        int balance = getBalance(node);

        // Case 1: Left Left
        if (balance > 1 && key < node.left.key)
            return rightRotate(node);

        // Case 2: Right Right
        if (balance < -1 && key > node.right.key)
            return leftRotate(node);

        // Case 3: Left Right
        if (balance > 1 && key > node.left.key) {
            node.left = leftRotate(node.left);
            return rightRotate(node);
        }

        // Case 4: Right Left
        if (balance < -1 && key < node.right.key) {
            node.right = rightRotate(node.right);
            return leftRotate(node);
        }

        return node;
    }

    // Wrapper for insert
    public void insert(int key) {
        root = insert(root, key);
    }

    // Inorder traversal (for testing)
    void inorder(Node node) {
        if (node != null) {
            inorder(node.left);
            System.out.print(node.key + " ");
            inorder(node.right);
        }
    }

    public void inorderTraversal() {
        inorder(root);
        System.out.println();
    }

    // Main method for quick test
    public static void main(String[] args) {
        AVLTree tree = new AVLTree();
        tree.insert(10);
        tree.insert(20);
        tree.insert(30);
        tree.insert(40);
        tree.insert(50);
        tree.insert(25);

        System.out.println("Inorder traversal of constructed AVL tree:");
        tree.inorderTraversal();
    }
}

