// Create a class called LinkedList that has many functions
import Node from "./node.js";
export default class LinkedList {
    linkedlistHead;
    linkedlistTail;
    /* 
        Method: append(value)
        Add a new node until it finds an undefined
    */
    append = (key, value) => {
        if (this.linkedlistHead == undefined) {
            this.linkedlistHead = new Node(key, value);
            return this.linkedlistHead;
        }
        // Find the tail node with the next null
        const currentTail = this.tail();
        currentTail.nextNode = new Node(key, value);

        // Return the created node
        return currentTail.nextNode;
    }


    /* 
        Method: prepend(value)
        Adds a new node at the beginning
    */
    prepend = (key, value) => {
        if (!this.linkedlistHead instanceof Node) {
            this.linkedlistHead = new Node(key, value);
        }

        const newHead = new Node(key, value, this.linkedlistHead);

        this.linkedlistHead = newHead;
        return this.linkedlistHead;
    }

    /* 
        Method: size()
        Returns the number total nodes
        iterate a count until it reaches the end
    */
    size = () => {
        if (!this.linkedlistHead instanceof Node) throw new Error(`Head is not an instance of node or is missing.`);

        // Start counting from the head until it reaches the tail the node with no next
        let count = 0;
        let currentNode = this.linkedlistHead;
        while (currentNode != null && currentNode instanceof Node) {
            currentNode = currentNode.nextNode;
            count++;
        }

        return count;
    }

    /* 
        Method: head();
    */
    head = () => {
        if (!this.linkedlistHead instanceof Node) throw new Error(`Head is invalid or has not been set`);
        return this.linkedlistHead;
    }


    /* 
        Method: tail();
    */
    tail = () => {
        if (!this.linkedlistHead instanceof Node) throw new Error(`Tail cannot be found without a proper head`);
        if (this.linkedlistTail instanceof Node && this.linkedlistTail.nextNode == null) return this.linkedlistTail;

        // Find the tail if it doesn't exist yet
        let currentNode = this.linkedlistTail ?? this.linkedlistHead;
        while (currentNode.nextNode != null) {
            currentNode = currentNode.nextNode;
        }

        // Update/Set as tail
        this.linkedlistTail = currentNode;

        // Return the found tail
        return this.linkedlistTail;
    }

    /* 
        at(index) returns the node at that index
    */
    at = (index) => {
        // Starting from the head
        if (!this.linkedlistHead instanceof Node) throw new Error("No head exist to start index.");
        if (this.size() - 1 < index) throw new Error(`${index} exceeds the size of the linked list.`);

        // Loop until at the index
        let currentNode = this.linkedlistHead;
        let nodeIndex = 0;
        while (index != nodeIndex) {
            currentNode = currentNode.nextNode;
            nodeIndex++
        }

        return currentNode;

    }
    /* 
         pop method (relies on tail())
         removes the tail
         and updates the new tail
    */
    pop = () => {
        // If the head does not exist, there's nothing to pop
        if (!this.linkedlistHead instanceof Node) throw new Error(`No node to pop`);
        // If the head does not have nextNode, pop it
        if (this.linkedlistHead.nextNode == null) {
            const removedNode = this.linkedlistHead;
            this.linkedlistHead = null;
            return removedNode;
        }

        // Start at the second node since we check 
        // if head is the tail
        // Save the previous node and the current node
        let previousNode = this.linkedlistHead;
        let currentNode = this.linkedlistHead.nextNode;
        while (currentNode.nextNode != null) {
            previousNode = currentNode;
            currentNode = currentNode.nextNode;
        }


        previousNode.nextNode = null;
        this.linkedlistTail = previousNode;

        return currentNode;
    }

    /* 
        contains(value)
        returns true if the value is in the list
        false if not
    */
    contains = (value) => {
        if (!this.linkedlistHead instanceof Node) throw new Error("Linked List does not have a head to start searching.");
        // Loop through the linked list and check its value
        // Loop untils null
        let currentNode = this.linkedlistHead;
        while (currentNode != null) {
            if (currentNode.value == value) return true;
            currentNode = currentNode.nextNode;
        }

        return false;

    }

    /* 
        findNodeByKey(key)
        returns the node with matching key
        returns null if not 
    */
    findNodeByKey = (key) => {
        if (!this.linkedlistHead instanceof Node) throw new Error("Linked List does not have a head to start searching.");
        
        let currentNode = this.linkedlistHead;
        while (currentNode != null) {
            if (currentNode.key == key) return currentNode;
            currentNode = currentNode.nextNode;
        }

        return null;
    }


    /* 
        find(value)
        returns the index of a node that has that value
        returns null if not found
    */
    find = (value) => {
        if (!this.linkedlistHead instanceof Node) throw new Error("Linked List does not have a head to start searching.");

        let currentNode = this.linkedlistHead;
        let index = 0;
        while (currentNode != null) {
            if (currentNode.value == value) return index;
            currentNode = currentNode.nextNode;
            index++;
        }

        return null;
    }

    /* 
        removeByKey(key)
        remove a key entry and adjust the nextNodes
    */
    removeByKey = (key) => {
        if (!this.linkedlistHead instanceof Node) throw new Error(`Head is not an instance of node or does not exist.`);

        // If the key is found in the head, grab the nextNode and set it as head
        if (this.linkedlistHead.key == key) {
            const headNextNode = this.linkedlistHead.nextNode;
            this.linkedlistHead = headNextNode;
            return true;
        }

        let previousNode = currentNode;
        let currentNode = currentNode.nextNode;
        while (!isKeyFound && currentNode) {
            if (currentNode.key == key) {
                isKeyFound = true;
            }
            previousNode = currentNode;
            currentNode = currentNode.nextNode;
        }

        if (!isKeyFound) return false;

        // Remove reference to the node that contains the key but keep its nextNode property
        previousNode.nextNode = currentNode.nextNode;
        return true;
    }

    /* 
        toString prints objects the entire node as string
        format: ( value ) -> ( value ) -> ( value ) -> null
    */
    toString = () => {
        if (!this.linkedlistHead instanceof Node) throw new Error(`Head is an instance of Node or does not exist`);

        let currentNode = this.linkedlistHead;
        let result = ""
        while (currentNode != null) {
            result += `( ${currentNode.value} ) -> `;
            currentNode = currentNode.nextNode;
        }

        result += "null";
        return result;
    }

}
/* const linkedlist = new LinkedList();

linkedlist.append('node1');
linkedlist.append('node2');
linkedlist.append('node3');
console.log(`Head: ${linkedlist.linkedlistHead.value}`);
console.log(`Tail: ${linkedlist.tail().value}`);
console.log(`toString(): ${linkedlist.toString()}`);
console.log(`Popping: ${linkedlist.pop().value}`);
console.log(`Tail: ${linkedlist.tail().value}`);
console.log(`contains('node2')): ${linkedlist.contains('node2')}`);
console.log(`contains('node3')): ${linkedlist.contains('node3')}`);
console.log(`find('node3'): ${linkedlist.find('node3')}`); // null
console.log(`find('node2'): ${linkedlist.find('node2')}`); // 1
console.log(`toString(): ${linkedlist.toString()}`); */
