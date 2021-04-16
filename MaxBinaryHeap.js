/**
* Big O of Binary Heaps
* Insertion: O(log n);
* Removal:   O(log n);
* Search:    O(n);
*/

class MaxBinaryHeap {
  constructor() {
      this.values = [];   
  }
  insert(element) {
      this.values.push(element);
      this.bubbleUp();
  }
  bubbleUp() {
      let index = this.values.length - 1;
      const element = this.values[index];
      
      while(index > 0) {
          let parentIndex = Math.floor((index-1)/2);
          let parent = this.values[parentIndex];
          if (element <= parent) break;
          this.values[parentIndex] = element;
          this.values[index] = parent;
          index = parentIndex;
          
      }
  }
  extractMax() {
      const max = this.values[0];
      const end = this.values.pop();
      if (this.values.length > 0) {
          this.values[0] = end;
          this.trickleDown();    
      }
      return max;
  }
  trickleDown() {
      let index = 0;
      const length = this.values.length;
      const element = this.values[0];
      while(true) {
          let leftChildIndex = 2 * index + 1;
          let rightChildIndex = 2 * index + 2;
          let leftChild, rightChild;
          let swap = null;

          if (leftChildIndex < length) {
              leftChild = this.values[leftChildIndex];
              if (leftChild > element) {
                  swap = leftChildIndex
              }
          }
          if (rightChildIndex < length) {
              rightChild = this.values[rightChildIndex];
              if (
                  (swap === null && rightChild > element ) || 
                  (swap !== null && rightChild > leftChild)) {
                      swap = rightChildIndex;
              }
          }

          if (swap === null) break;
          this.values[index] = this.values[swap];
          this.values[swap] = element
          index = swap;
      }
  }
}

// let myHeap = new MaxBinaryHeap();
