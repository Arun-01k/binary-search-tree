class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.tree = this.buildTreeRecur(array);
  }

  #buildTree(array, start, end) {
    if (start > end) return null;
    const mid = Math.floor((start + end) / 2);
    const root = new Node(array[mid]);

    root.left = this.#buildTree(array, start, mid - 1);
    root.right = this.#buildTree(array, mid + 1, end);
    return root;
  }

  buildTreeRecur(array) {
    array = [...new Set([...array].sort((a, b) => a - b))];
    return this.#buildTree(array, 0, array.length - 1);
  }

  prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null || node === undefined) {
      return;
    }

    this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  };

  includes(value) {
    let current = this.tree;

    while (current !== null) {
      if (current.data === value) return true;

      if (value < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return false;
  }

  insert(value) {
    let current = this.tree;
    let parent = null;

    while (current !== null) {
      if (current.data === value) return;
      parent = current;

      if (value < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    const newNode = new Node(value);

    if (value < parent.data) {
      parent.left = newNode;
    } else {
      parent.right = newNode;
    }
  }

  deleteItem(value) {
    let current = this.tree;
    let parent = null;

    while (current !== null && current.data !== value) {
      parent = current;
      if (value < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    if (current === null) return;

    //one child or leaf node
    if (current.left === null || current.right === null) {
      const grandChild = current.right !== null ? current.right : current.left;

      if (parent === null) {
        this.tree = grandChild;
      } else if (parent.right === current) {
        parent.right = grandChild;
      } else {
        parent.left = grandChild;
      }
      return;
    }

    // two child
    let successorParent = current;
    let successor = current.right;
    while (successor.left !== null) {
      successorParent = successor;
      successor = successor.left;
    }

    current.data = successor.data;
    if (successorParent.left === successor) {
      successorParent.left = successor.right;
    } else {
      successorParent.right = successor.right;
    }
  }

  levelOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new error("A callback function is required");
    }

    const queue = [this.tree];

    while (queue.length > 0) {
      const current = queue.shift();

      callback(current.data);

      if (current.left !== null) {
        queue.push(current.left);
      }
      if (current.right !== null) {
        queue.push(current.right);
      }
    }
  }

  inOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required");
    }
    function traverse(node) {
      if (node === null) return;
      traverse(node.left);
      callback(node.data);
      traverse(node.right);
    }
    traverse(this.tree);
  }

  preOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required");
    }

    function traverse(node) {
      if (node === null) return;

      callback(node.data); // Root
      traverse(node.left); // Left
      traverse(node.right); // Right
    }

    traverse(this.tree);
  }

  postOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required");
    }

    function traverse(node) {
      if (node === null) return;

      traverse(node.left); // Left
      traverse(node.right); // Right
      callback(node.data); // Root
    }

    traverse(this.tree);
  }

  height(value) {
    let current = this.tree;

    while (current !== null) {
      if (current.data === value) {
        return this.calculateHeight(current);
      }

      if (value < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    // Value was not found
    return undefined;
  }

  calculateHeight(node) {
    if (node === null) {
      return -1;
    }

    const leftHeight = this.calculateHeight(node.left);
    const rightHeight = this.calculateHeight(node.right);

    return 1 + Math.max(leftHeight, rightHeight);
  }

  depth(value) {
    let current = this.tree;
    let depth = 0;

    while (current !== null) {
      if (current.data === value) {
        return depth;
      }

      if (value < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }

      depth++;
    }

    return undefined;
  }

  isBalanced() {
    const checkBalance = (node) => {
      if (node === null) return true;

      const leftHeight = this.calculateHeight(node.left);
      const rightHeight = this.calculateHeight(node.right);

      if (Math.abs(leftHeight - rightHeight) > 1) {
        return false;
      }

      return checkBalance(node.left) && checkBalance(node.right);
    };
    return checkBalance(this.tree);
  }

  rebalance() {
    const values = [];

    this.inOrderForEach((value) => {
      values.push(value);
    });

    this.tree = this.buildTreeRecur(values);
  }
}

const bst = new Tree([1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345]);
bst.prettyPrint(bst.tree);
console.log(bst.height(5));
console.log(bst.isBalanced());

module.exports = { Tree, Node };
