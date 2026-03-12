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

window.onload = function() {
    const canvas = document.getElementById("treeCanvas");
    const ctx = canvas.getContext("2d");

    // Example static tree
    const root = new TreeNode(30, 400, 100);
    root.left = new TreeNode(20, 300, 200);
    root.right = new TreeNode(40, 500, 200);
    root.left.left = new TreeNode(10, 250, 300);
    root.left.right = new TreeNode(25, 350, 300);

    drawNode(ctx, root);
};
