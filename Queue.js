/*
Big O of Queue
Insertion/Removal   - O(1)
Searching/Accessing - O(N)
*/


class Node {
  constructor(value) {
      this.value = value;
      this.next = null;
  }
}

class Queue {
  constructor() {
      this.first = null;
      this.last = null;
      this.size = 0;
  }
  enqueue(value) {
      const newNode = new Node(value);
      if (!this.first) {
          this.first = newNode;
          this.last = newNode;
      } else {
          this.last.next = newNode;
          this.last = newNode;
      }
      return ++this.size;
  }
  dequeue() {
      if (!this.first) return null;
      let temp = this.first;
      if (this.first === this.last) {
          this.last = null;
      }
      this.first = this.first.next;
      this.size--;
      return temp.value;
  }
}

/*
Using an Array as a Queue
Use unshift() and pop() to avoid re-indexing

const q = [];
q.unshift('First');
q.unshift('Second');
q.unshift('Third');
q.pop();
q.pop();
q.pop();
*/