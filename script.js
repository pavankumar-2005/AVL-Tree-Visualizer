class TreeNode {
    constructor(key) {
        this.key = key;
        this.height = 1;
        this.left = null;
        this.right = null;
    }
}

// Utility functions
function height(node) {
    return node ? node.height : 0;
}

function getBalance(node) {
    return node ? height(node.left) - height(node.right) : 0;
}

function updateHeight(node) {
    node.height = 1 + Math.max(height(node.left), height(node.right));
}

// Rotations
function rightRotate(y) {
    let x = y.left;
    let T2 = x.right;

    x.right = y;
    y.left = T2;

    updateHeight(y);
    updateHeight(x);

    return x;
}

function leftRotate(x) {
    let y = x.right;
    let T2 = y.left;

    y.left = x;
    x.right = T2;

    updateHeight(x);
    updateHeight(y);

    return y;
}

// AVL Insert
function insert(node, key) {
    if (!node) return new TreeNode(key);

    if (key < node.key) {
        node.left = insert(node.left, key);
    } else if (key > node.key) {
        node.right = insert(node.right, key);
    } else {
        return node; // no duplicates
    }

    updateHeight(node);

    let balance = getBalance(node);

    // Left Left
    if (balance > 1 && key < node.left.key) return rightRotate(node);

    // Right Right
    if (balance < -1 && key > node.right.key) return leftRotate(node);

    // Left Right
    if (balance > 1 && key > node.left.key) {
        node.left = leftRotate(node.left);
        return rightRotate(node);
    }

    // Right Left
    if (balance < -1 && key < node.right.key) {
        node.right = rightRotate(node.right);
        return leftRotate(node);
    }

    return node;
}

// AVL Delete
function deleteNode(root, key) {
    if (!root) return root;

    if (key < root.key) {
        root.left = deleteNode(root.left, key);
    } else if (key > root.key) {
        root.right = deleteNode(root.right, key);
    } else {
        // Node with one child or no child
        if (!root.left || !root.right) {
            root = root.left ? root.left : root.right;
        } else {
            // Node with two children: inorder successor
            let temp = minValueNode(root.right);
            root.key = temp.key;
            root.right = deleteNode(root.right, temp.key);
        }
    }

    if (!root) return root;

    updateHeight(root);

    let balance = getBalance(root);

    // Balance cases
    if (balance > 1 && getBalance(root.left) >= 0) return rightRotate(root);
    if (balance > 1 && getBalance(root.left) < 0) {
        root.left = leftRotate(root.left);
        return rightRotate(root);
    }
    if (balance < -1 && getBalance(root.right) <= 0) return leftRotate(root);
    if (balance < -1 && getBalance(root.right) > 0) {
        root.right = rightRotate(root.right);
        return leftRotate(root);
    }

    return root;
}

function minValueNode(node) {
    let current = node;
    while (current.left) current = current.left;
    return current;
}

// Drawing functions
function drawTree(ctx, node, x, y, spacing) {
    if (!node) return;

    ctx.beginPath();
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.fillStyle = "#87CEEB";
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "black";
    ctx.font = "16px Arial";
    ctx.fillText(node.key, x - 8, y + 5);

    if (node.left) {
        ctx.moveTo(x, y);
        ctx.lineTo(x - spacing, y + 80);
        ctx.stroke();
        drawTree(ctx, node.left, x - spacing, y + 80, spacing / 1.5);
    }
    if (node.right) {
        ctx.moveTo(x, y);
        ctx.lineTo(x + spacing, y + 80);
        ctx.stroke();
        drawTree(ctx, node.right, x + spacing, y + 80, spacing / 1.5);
    }
}

function clearCanvas(ctx, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Global root
let root = null;

function addNode() {
    const canvas = document.getElementById("treeCanvas");
    const ctx = canvas.getContext("2d");
    const value = parseInt(document.getElementById("nodeValue").value);

    root = insert(root, value);

    clearCanvas(ctx, canvas);
    drawTree(ctx, root, canvas.width / 2, 50, 150);
}

function removeNode() {
    const canvas = document.getElementById("treeCanvas");
    const ctx = canvas.getContext("2d");
    const value = parseInt(document.getElementById("nodeValue").value);

    root = deleteNode(root, value);

    clearCanvas(ctx, canvas);
    drawTree(ctx, root, canvas.width / 2, 50, 150);
}