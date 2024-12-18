/*
class BPlusTreeNode {
    constructor(isLeaf) {
      this.isLeaf = isLeaf;
      this.keys = [];
      this.values = [];
      this.children = [];
      this.next = null;
    }
  }
  
  // B+ Tree Class
  class BPlusTree {
    constructor(order) {
      this.order = order;
      this.root = new BPlusTreeNode(true);
    }
  
    findLeafNode(key) {
      let current = this.root;
      while (!current.isLeaf) {
        let i = 0;
        while (i < current.keys.length && key > current.keys[i]) {
          i++;
        }
        current = current.children[i];
      }
      return current;
    }
  
    splitChild(parent, index) {
      const nodeToSplit = parent.children[index];
      const midIndex = Math.floor(this.order / 2);
  
      const newNode = new BPlusTreeNode(nodeToSplit.isLeaf);
      newNode.keys = nodeToSplit.keys.splice(midIndex);
      
      if (nodeToSplit.isLeaf) {
        newNode.values = nodeToSplit.values.splice(midIndex);
        newNode.next = nodeToSplit.next;
        nodeToSplit.next = newNode;
      } else {
        newNode.children = nodeToSplit.children.splice(midIndex + 1);
      }
  
      const promoteKey = nodeToSplit.isLeaf ? newNode.keys[0] : nodeToSplit.keys.pop();
      parent.keys.splice(index, 0, promoteKey);
      parent.children.splice(index + 1, 0, newNode);
    }
  
    insertInternal(key, value) {
      const leaf = this.findLeafNode(key);
      let pos = leaf.keys.findIndex(k => k > key);
      if (pos === -1) pos = leaf.keys.length;
      leaf.keys.splice(pos, 0, key);
      leaf.values.splice(pos, 0, value);
  
      if (leaf.keys.length >= this.order) {
        if (leaf === this.root) {
          const newRoot = new BPlusTreeNode(false);
          newRoot.children.push(this.root);
          this.splitChild(newRoot, 0);
          this.root = newRoot;
        } else {
          const parent = this.findParent(this.root, leaf);
          const index = parent.children.indexOf(leaf);
          this.splitChild(parent, index);
        }
      }
    }
  
    findParent(current, child) {
      if (current.isLeaf || !current.children.length) return null;
  
      for (let i = 0; i < current.children.length; i++) {
        if (current.children[i] === child) return current;
        const parent = this.findParent(current.children[i], child);
        if (parent) return parent;
      }
      return null;
    }
  
    insert(key, value) {
      this.insertInternal(key, value);
    }
  
    search(key) {
      const leaf = this.findLeafNode(key);
      const index = leaf.keys.indexOf(key);
      if (index !== -1) {
        return leaf.values[index];
      }
      return "Word not found";
    }
  
    displayNode(node) {
      if (!node) return;
      console.log('Keys:', node.keys);
      if (!node.isLeaf) {
        for (const child of node.children) {
          this.displayNode(child);
        }
      }
    }
  
    display() {
      this.displayNode(this.root);
    }
  }
  
  // Function to load dictionary data from a CSV file
  const fs = require('fs');
  
  function loadDictionary(filePath, tree) {
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      const lines = data.split('\n');
  
      lines.forEach(line => {
        const [word, meaning] = line.split(',');
        if (word && meaning) {
          tree.insert(word.trim(), meaning.trim());
        }
      });
    } catch (error) {
      console.error('Failed to open file:', filePath);
    }
  }
  
  // Main execution
  const readline = require('readline');
  
  const tree = new BPlusTree(4);
  loadDictionary('./Dictionary.csv', tree);
  
  console.log('Dictionary loaded. Testing search:');
  
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  function promptSearch() {
    rl.question('Enter a word to search: ', (word) => {
      const meaning = tree.search(word);
      console.log('Meaning:', meaning);
      promptSearch();
    });
  }
  
  promptSearch(); 
*/