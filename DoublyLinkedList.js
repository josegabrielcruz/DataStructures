/*
Big O of Doubly Linked List
Insertion - O(1)
Removal - O(1)
Searching - O(N) ( O(N/2) )
Access - O(N)
*/


class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    push(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        this.length++;
        return this;
    }
    pop() {
        if (!this.head) return undefined;
        const temp = this.tail;
        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.tail = temp.prev;
            this.tail.next = null;
            temp.prev = null;
        }
        this.length--;
        return temp;
    }
    shift() {
        if (!this.head) return undefined;
        const temp = this.head;
        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = temp.next;
            this.head.prev = null;
            temp.next = null;
        }
        this.length--;
        return temp;
    }
    unshift(value) {
        const newNode = new Node(value);
        if (this.length === 0) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.head.prev = newNode;
            newNode.next = this.head;
            this.head = newNode;
        }
        this.length++;
        return this;
    }
    get(index) {
        if (index < 0 || index >= this.length) return undefined;
        let current = null;
        let count = null;
        if (index <= this.length/2) {
            count = 0;
            current = this.head;
            while(count != index) {
                current = current.next;
                count++;
            }    
        } else {
            count = this.length - 1;
            current = this.tail;
            while(count != index) {
                current = current.prev;
                count--;
            }
        }
        return current;
    }
    set(index, value) {
        const temp = this.get(index);
        if (temp) {
            temp.value = value;
            return true;
        } 
        return false;
    }
    insert(index, value) {
        if (index < 0 || index > this.length) return undefined;
        if (index === 0) return !!this.unshift(value);
        if (index === this.length) return !!this.push(value);

        const newNode = new Node(value);
        const prevNode = newNode.prev;
        const nextNode = prevNode.next;

        prevNode.next = newNode;
        newNode.prev = prevNode;
        newNode.next = nextNode;
        nextNode.prev = newNode;
        this.length++;
        return true;
    }
    remove(index) {
        if (index < 0 || index >= this.length) return undefined;
        if (index === 0) return this.shift();
        if (index === this.lengt - 1) return this.pop();

        const removedNode = this.get(index);
        const prevNode = removedNode.prev;
        const nextNode = removedNode.next;

        prevNode.next = nextNode;
        nextNode.prev = prevNode;
        removedNode.next = null;
        removedNode.prev = null;
        this.length--;
        return removedNode;
    }
}

