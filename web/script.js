class TreeNode {
    constructor(key, x, y) {
        this.key = key;
        this.x = x;
        this.y = y;
        this.left = null;
        this.right = null;
    }
}

function drawNode(ctx, node) {
    if (!node) return;

    // Draw circle
    ctx.beginPath();
    ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
    ctx.fillStyle = "#87CEEB";
    ctx.fill();
    ctx.stroke();

    // Draw key
    ctx.fillStyle = "black";
    ctx.font = "16px Arial";
    ctx.fillText(node.key, node.x - 8, node.y + 5);

    // Draw edges
    if (node.left) {
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(node.left.x, node.left.y);
        ctx.stroke();
        drawNode(ctx, node.left);
    }
    if (node.right) {
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(node.right.x, node.right.y);
        ctx.stroke();
        drawNode(ctx, node.right);
    }
}

function clearCanvas(ctx, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function insertNode(root, key, depth = 1) {
    if (key < root.key) {
        if (!root.left) {
            root.left = new TreeNode(key, root.x - 100, root.y + 100);
        } else {
            insertNode(root.left, key, depth + 1);
        }
    } else {
        if (!root.right) {
            root.right = new TreeNode(key, root.x + 100, root.y + 100);
        } else {
            insertNode(root.right, key, depth + 1);
        }
    }
}

window.onload = function() {
    const canvas = document.getElementById("treeCanvas");
    const ctx = canvas.getContext("2d");

    // Root node
    let root = new TreeNode(30, 400, 100);

    // Example insertions
    insertNode(root, 20);
    insertNode(root, 40);
    insertNode(root, 10);
    insertNode(root, 25);
    insertNode(root, 35);
    insertNode(root, 50);

    clearCanvas(ctx, canvas);
    drawNode(ctx, root);
};