class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}

class AVLTree {
    constructor() { this.root = null; }

    getHeight(node) { return node ? node.height : 0; }

    getBalance(node) { return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0; }

    rightRotate(y) {
        let x = y.left;
        let T2 = x.right;
        x.right = y;
        y.left = T2;
        y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
        x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
        return x;
    }

    leftRotate(x) {
        let y = x.right;
        let T2 = y.left;
        y.left = x;
        x.right = T2;
        x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
        y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
        return y;
    }

    insert(node, value) {
        if (!node) return new Node(value);
        if (value < node.value) node.left = this.insert(node.left, value);
        else if (value > node.value) node.right = this.insert(node.right, value);
        else return node;

        node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
        let balance = this.getBalance(node);

        if (balance > 1 && value < node.left.value) return this.rightRotate(node);
        if (balance < -1 && value > node.right.value) return this.leftRotate(node);
        if (balance > 1 && value > node.left.value) {
            node.left = this.leftRotate(node.left);
            return this.rightRotate(node);
        }
        if (balance < -1 && value < node.right.value) {
            node.right = this.rightRotate(node.right);
            return this.leftRotate(node);
        }
        return node;
    }

    minValueNode(node) {
        let current = node;
        while (current.left !== null) current = current.left;
        return current;
    }

    delete(node, value) {
        if (!node) return node;
        if (value < node.value) node.left = this.delete(node.left, value);
        else if (value > node.value) node.right = this.delete(node.right, value);
        else {
            if (!node.left || !node.right) {
                node = node.left ? node.left : node.right;
            } else {
                let temp = this.minValueNode(node.right);
                node.value = temp.value;
                node.right = this.delete(node.right, temp.value);
            }
        }
        if (!node) return node;

        node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
        let balance = this.getBalance(node);

        if (balance > 1 && this.getBalance(node.left) >= 0) return this.rightRotate(node);
        if (balance > 1 && this.getBalance(node.left) < 0) {
            node.left = this.leftRotate(node.left);
            return this.rightRotate(node);
        }
        if (balance < -1 && this.getBalance(node.right) <= 0) return this.leftRotate(node);
        if (balance < -1 && this.getBalance(node.right) > 0) {
            node.right = this.rightRotate(node.right);
            return this.leftRotate(node);
        }
        return node;
    }
}

const tree = new AVLTree();
const svg = document.getElementById('tree-svg');

function drawTree() {
    svg.innerHTML = '';
    if (tree.root) {
        renderNode(tree.root, 400, 50, 200);
    }
}

function renderNode(node, x, y, offset) {
    if (node.left) {
        const lx = x - offset;
        const ly = y + 70;
        line(x, y, lx, ly);
        renderNode(node.left, lx, ly, offset / 1.8);
    }
    if (node.right) {
        const rx = x + offset;
        const ry = y + 70;
        line(x, y, rx, ry);
        renderNode(node.right, rx, ry, offset / 1.8);
    }

    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.classList.add('node');
    
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", 20);
    
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", x);
    text.setAttribute("y", y);
    text.textContent = node.value;

    g.appendChild(circle);
    g.appendChild(text);
    svg.appendChild(g);
}

function line(x1, y1, x2, y2) {
    const l = document.createElementNS("http://www.w3.org/2000/svg", "line");
    l.setAttribute("x1", x1);
    l.setAttribute("y1", y1);
    l.setAttribute("x2", x2);
    l.setAttribute("y2", y2);
    l.classList.add('link');
    svg.appendChild(l);
}

function handleInsert() {
    const val = parseInt(document.getElementById('nodeValue').value);
    if (!isNaN(val)) {
        tree.root = tree.insert(tree.root, val);
        drawTree();
    }
}

function handleDelete() {
    const val = parseInt(document.getElementById('nodeValue').value);
    if (!isNaN(val)) {
        tree.root = tree.delete(tree.root, val);
        drawTree();
    }
}

function handleClear() {
    tree.root = null;
    drawTree();
}