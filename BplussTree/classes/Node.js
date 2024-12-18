class Node {
    constructor(isLeaf) {
        this.isLeaf = isLeaf;
        this.keys = [];
        this.values = [];
        this.children = [];
        this.next = null;
    }
}
module.exports = Node;