const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }
  root() {
    return this.rootNode;
  }

  add(data) {
    this.rootNode = addNode(this.rootNode, data);

    function addNode(node, data) {
      if (!node) {
        return new Node(data);
      }
      if (node.data === data) {
        return node;
      }
      if (data < node.data) {
        if (!node.left) {
          node.left = new Node(data);
        }
        node.left = addNode(node.left, data);
      } else if (data > node.data) {
        if (!node.right) {
          node.right = new Node(data);
        }
        node.right = addNode(node.right, data);
      }
      return node;
    }
  }

  has(data) {
    let node = this.rootNode;
    
    while (node) {
      if (node.data === data) {
        return true;
      } else if (node.data > data) {
        node = node.left;
      } else if (node.data < data) {
        node = node.right;
      } 
    }
    return false;
  }

  find(data) {
    let node = this.rootNode;
    
    while (node) {
      if (node.data === data) {
        return node;
      } else if (node.data > data) {
        node = node.left;
      } else if (node.data < data) {
        node = node.right;
      } 
    }
    return null;
  }

  remove(data) {
    this.rootNode = removeNodeWithData(this.rootNode, data);

    function removeNodeWithData(node, data) {
      if (node === null) {
        return node;
      }
      if (node.data < data) {
        node.right = removeNodeWithData(node.right, data);
        return node;
      } else if (node.data > data) {
        node.left = removeNodeWithData(node.left, data);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        } else if (!node.left) {
          return node.right;
        } else if (!node.right) {
          return node.left;
        }
        node.data = findMinOfRight(node.right);
        node.right = removeNodeWithData(node.right, node.data);
      }
      return node;
    }
    function findMinOfRight(nodeEl) {
      while (nodeEl.left) {
        nodeEl = nodeEl.left;
      }
      return nodeEl.data;
    }
  }

  min() {
    let node = this.rootNode;
    
    while (node.left) {
      node = node.left;
    }
    return node.data;
  }

  max() {
    let node = this.rootNode;
    
    while (node.right) {
      node = node.right;
    }
    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};