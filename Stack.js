/*
Big O of Stacks
Insertion - O(1)
Removal   - O(1)
Searching - O(N)
Access    - O(N)
*/

class Node {
  constructor(value){
      this.value = value;
      this.next = null;
  }
}

class Stack {
  constructor() {
      this.first = null;
      this.last = null;
      this.size = 0;
  }
  push(value) {
      const newNode = new Node(value);
      if (!this.first) {
          this.first = newNode;
          this.last = newNode;
      } else {
          let temp = this.first;
          this.first = newNode;
          this.first.next = temp;
      }
      return ++this.size;
  }
  pop() {
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

// let myStack = new Stack();
// myStack.push(23);
// myStack.push(3);
// myStack.push(11);