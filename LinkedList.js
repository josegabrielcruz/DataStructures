/*
Big 0 of Singly Linked List
Insertion - 0(1)
Removal   - removing from beginning =  O(1)
            removing from the end   =  O(N)
Searching - O(N)
Access    - O(N)
*/

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class SinglyLinkedList {
    constructor() {
        this.head = null;
        this.next = null;
        this.length = 0;
    }
    push(value) {
        var newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = this.head;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length++;
        return this;
    }
    pop() {
        if (!this.head) return undefined;
        let newTail = this.head;
        let current = this.head;
        while(current.next) {
            newTail = current;
            current = current.next;
        }
        this.tail = newTail;
        this.tail.next = null;
        this.length--;
        if (length === 0) {
            this.tail = null;
            this.head = null;
        }
        return current;
    }
    shift() {
        if (!this.head) return undefined;
        let currentHead = this.head;
        this.head = currentHead.next;
        this.length--;
        if (this.length === 0) {
            this.tail = null
        }
        return currentHead;
    }
    unshift(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = this.head;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }
        this.length++;
        return this;
    }
    get(index){
        if (index < 0 || index >= this.length) return null;
        let counter = 0;
        let current = this.head;
        while (counter !== index) {
            current = current.next;
            counter++;
        }
        return current;
    }
    set(index,value){
        let targetNode = this.get(index);
        if (targetNode) {
            targetNode.value = value;
            return true;
        }
        return false;
    }
    insert(index,value) {
        if (index < 0 || index > this.length) return false;
        if (index === this.length) return !!this.push(value);
        if (index === 0) return !!this.unshift(value);

        const newNode = new Node(value);
        const previous = this.get(index-1);
        const temp = previous.next;
        previous.next = newNode;
        newNode.next = temp.next;
        this.length++;
        return true;
    }
    remove(index) {
        if (index < 0 || index >= this.length) return undefined;
        if (index === this.length - 1) return this.pop();
        if (index === 0) return this.shift();

        const previous = this.get(index-1);
        const removed = previous.next;
        previous.next = removed.next;
        this.length--;
        return removed;
    }
    reverse() {
        let current = this.head;
        this.head = this.tail;
        this.tail = current;
        let next = current.next;
        let previous = null;

        for (let i = 0; i < this.length; i++) {
            next = current.next;
            current.next = previous;
            previous = current;
            current = next;
        }
        return this;
    }
}

// let list = new SinglyLinkedList();
// list.push('foo');
// list.push('bar');
// list.push('baz');