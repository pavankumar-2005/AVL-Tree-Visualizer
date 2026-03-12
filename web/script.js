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

    ctx.beginPath();
    ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
    ctx.fillStyle = "#87CEEB";
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "black";
    ctx.font = "16px Arial";
    ctx.fillText(node.key, node.x - 8, node.y + 5);

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

function insertNode(root, key) {
    if (key < root.key) {
        if (!root.left) {
            root.left = new TreeNode(key, root.x - 100, root.y + 100);
        } else {
            insertNode(root.left, key);
        }
    } else {
        if (!root.right) {
            root.right = new TreeNode(key, root.x + 100, root.y + 100);
        } else {
            insertNode(root.right, key);
        }
    }
}

let root = null;

function addNode() {
    const canvas = document.getElementById("treeCanvas");
    const ctx = canvas.getContext("2d");
    const value = parseInt(document.getElementById("nodeValue").value);

    if (!root) {
        root = new TreeNode(value, 400, 100);
    } else {
        insertNode(root, value);
    }

    clearCanvas(ctx, canvas);
    drawNode(ctx, root);
}