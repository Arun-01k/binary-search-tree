class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTreeRecur(array);
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
}

module.exports = { Tree, buildTree };
