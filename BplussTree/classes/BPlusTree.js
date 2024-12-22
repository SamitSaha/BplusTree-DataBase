const BPlusTreeNode  = require('./Node.js');
const fs = require('fs');
const path = require('path');

class BPlusTree {
    constructor(order) {
        this.order = order;
        this.root = new BPlusTreeNode(true);
    }

/*-----------------------------------------*/
/*--------------- SEARCH -----------------*/
/*---------------------------------------*/
    search(key) {
        const leaf = this.findLeafNode(key);
        const index = leaf.keys.indexOf(key);
        if (index !== -1) {
            return leaf.values[index];
        }
        return "Word not found";
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

/*-----------------------------------------*/
/*--------------- INSERT -----------------*/
/*---------------------------------------*/
    insert(key, value) {
        this.insertInternal(key, value);
        //this.updateCSV();
    }

    insertInternal(key, value) {
        const leaf = this.findLeafNode(key);
        let pos = leaf.keys.findIndex(k => key < k);
        pos = pos === -1 ? leaf.keys.length : pos;

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

    findParent(current, child) {
        if (current.isLeaf) return null;
        for (const subChild of current.children) {
            if (subChild === child) return current;
            const parent = this.findParent(subChild, child);
            if (parent) return parent;
        }
        return null;
    }
/*------------------------------------------*/
/*--------------- DISPLAY -----------------*/
/*----------------------------------------*/
    display() {
        this.displayNode(this.root);
    }

    displayNode(node) {
        if (!node) return;
        console.log(node.keys);
        if (!node.isLeaf) {
            for (const child of node.children) {
                this.displayNode(child);
            }
        }
    }
/*-----------------------------------------*/
/*--------------- DELETE -----------------*/
/*---------------------------------------*/
    delete(key) {
        const leaf = this.findLeafNode(key);
        const index = leaf.keys.indexOf(key);
    
        if (index !== -1) {
            leaf.keys.splice(index, 1);
            leaf.values.splice(index, 1);
            console.log(`Deleted key "${key}"`);
            //this.updateCSV();
    
            // Handle underflow (optional)
            if (leaf.keys.length < Math.ceil(this.order / 2) && leaf !== this.root) {
                this.handleUnderflow(leaf);
            }
        } else {
            console.log(`Key "${key}" not found.`);
        }
    }

    handleUnderflow(node) {
        const parent = this.findParent(this.root, node);
        const index = parent.children.indexOf(node);
    
        if (index > 0) {
            const leftSibling = parent.children[index - 1];
            if (leftSibling.keys.length > Math.ceil(this.order / 2)) {
                // Borrow from left sibling
                const borrowedKey = leftSibling.keys.pop();
                const borrowedValue = leftSibling.values.pop();
                node.keys.unshift(borrowedKey);
                node.values.unshift(borrowedValue);
            } else {
                // Merge with left sibling
                leftSibling.keys = leftSibling.keys.concat(node.keys);
                leftSibling.values = leftSibling.values.concat(node.values);
                leftSibling.next = node.next;
                parent.children.splice(index, 1); // Remove the node
            }
        } else if (index < parent.children.length - 1) {
            const rightSibling = parent.children[index + 1];
            if (rightSibling.keys.length > Math.ceil(this.order / 2)) {
                // Borrow from right sibling
                const borrowedKey = rightSibling.keys.shift();
                const borrowedValue = rightSibling.values.shift();
                node.keys.push(borrowedKey);
                node.values.push(borrowedValue);
            } else {
                // Merge with right sibling
                node.keys = node.keys.concat(rightSibling.keys);
                node.values = node.values.concat(rightSibling.values);
                node.next = rightSibling.next;
                parent.children.splice(index + 1, 1); // Remove the right sibling
            }
        }
    }
/*-----------------------------------------*/
/*--------------- UPDATE -----------------*/
/*---------------------------------------*/
    update(key, newValue) {
        const leaf = this.findLeafNode(key);
        const index = leaf.keys.indexOf(key);
        if (index !== -1) {
            leaf.values[index] = newValue;
            console.log(`Updated "${key}" with new value: "${newValue}"`);
        } else {
            console.log(`Key "${key}" not found. Consider using insert() to add it.`);
        }
    }

    // Helper function to save changes back to the CSV file
    updateCSV() {
        const filePath = path.join(__dirname, './Dictionary.csv');
        const data = this.getAllData();
        const csvContent = data.map(([word, meaning]) => `${word},${meaning}`).join('\n');
        
        fs.writeFileSync(filePath, csvContent, 'utf8');
        console.log('CSV file updated successfully.');
    }

    // Helper function to collect all key-value pairs from the tree
    getAllData() {
        const result = [];
        let current = this.root;
        while (!current.isLeaf) {
            current = current.children[0];
        }
        while (current) {
            for (let i = 0; i < current.keys.length; i++) {
                result.push([current.keys[i], current.values[i]]);
            }
            current = current.next;
        }
        return result;
    }
}

module.exports = BPlusTree;