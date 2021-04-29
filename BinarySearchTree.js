/**
 * Big O of BST
Insertion - O(log n);
Searchgin - O(log n);
(may vary depending on the tree configuration)
 */

class Node {
  constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
  }
}

class BST {
  constructor() {
      this.root = null;
  }
  insert(value) {
      const newNode = new Node(value);
      if (this.root === null) {
          this.root = newNode;
          return this;
      }
      let temp = this.root;
      while(true) {
          if (newNode.value === temp.value) return undefined;
          if (newNode.value < temp.value) {
              if (temp.left === null) {
                  temp.left = newNode;
                  return this;
              } else {
                  temp = temp.left;
              }
          } else {
              if (temp.right === null) {
                  temp.right = newNode;
                  return this;
              } else {
                  temp = temp.right;
              }
          }
      }
  }
  contains(value) {
      if (this.root === null) return false;
      let temp = this.root;
      while(temp) {
          if (value < temp.value) {
              temp = temp.left;
          } else if (value > temp.value) {
              temp = temp.right;
          } else {
              return true;
          }
      }
      return false;
  }
  BFS() {
      let node = this.root;
      let data = [];
      let queue = [];
      queue.push(node);

      while(queue.length) {
          node = queue.shift();
          data.push(node.value);
          if (node.left) queue.push(node.left);
          if (node.right) queue.push(node.right);
      }
      return data;
  }
  /* Good for cloning, or flattening */
  DFSPreOrder() {
      let data = [];
      let current = this.root;
      let traverse = (node) => {
          data.push(node.value);
          if (node.left) traverse(node.left); // search all left nodes
          if (node.right) traverse(node.right); // search all right nodes
      }
      traverse(current);
      return data;
  }
  DFSPostOrder() {
      let data = [];
      let current = this.root;
      let traverse = (node) => {
          if (node.left) traverse(node.left);
          if (node.right) traverse(node.right);
          data.push(node.value);
      }
      traverse(current);
      return data;
  }
  /* Side effect will be an ordered list of values */
  DFSInOrder() {
      let data = [];
      let current = this.root;
      let traverse = (node) => {
          if (node.left) traverse(node.left);
          data.push(node.value);
          if (node.right) traverse(node.right);
      }
      traverse(current);
      return data;
  }
}

// let myTree = new BST();
// myTree.insert(10)
// myTree.insert(6)
// myTree.insert(15)
// myTree.insert(3)
// myTree.insert(8)
// myTree.insert(20)