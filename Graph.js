/**
* Big O of Graph - Adjacency List
* Space complexity:  O(|V| + |E|)
* Time complexity:   O(1)
* Setting edges:     O(1)
* Removing edges:    O(|E|)
* Removing vertices: O(|V| + |E|)
*/

class Graph {
  constructor() {
      this.adjacencyList = {}
  }
  addVertex(vertex) {
      // check if vertex exists
      if (!this.adjacencyList[vertex]) {
          this.adjacencyList[vertex] = [];   
          return true;
      }
      return false;
  }
  addEdge(vertex1, vertex2) {
      // check if vertices exist
      if (this.adjacencyList[vertex1] && this.adjacencyList[vertex2]) {
          this.adjacencyList[vertex1].push(vertex2);
          this.adjacencyList[vertex2].push(vertex1);
          return true;
      }
      return false;
  }
  removeEdge(vertex1, vertex2) {
      // check if vertex1 and vertex2 exist
      if (this.adjacencyList[vertex1] && this.adjacencyList[vertex2]) {
          // return everything in the array that !== vertex2
          this.adjacencyList[vertex1] = this.adjacencyList[vertex1]
              .filter(v => v !== vertex2);

          // return everything in the array that !== vertex1
          this.adjacencyList[vertex2] = this.adjacencyList[vertex2]
              .filter(v => v !== vertex1);
          return true;
      }
      return false;
  }
  removeVertex(vertex) {
      // check if vertex exists
      if (!this.adjacencyList[vertex]) return undefined;

      // loop through array of vertex we're removing
      // while the length of array !== 0
      while(this.adjacencyList[vertex].length) {
          let temp = this.adjacencyList[vertex].pop();
          this.removeEdge(vertex, temp);
      }
      // once temp array is empty delete temp (vertex)
      delete this.adjacencyList[vertex];
      return this;
  }
}

// let myGraph = new Graph();
// myGraph.addVertex('A');
// myGraph.addVertex('B');
// myGraph.addVertex('C');
// myGraph.addVertex('D');
// myGraph.addEdge('A','B');
// myGraph.addEdge('A','C');
// myGraph.addEdge('A','D');
// myGraph.addEdge('B','D');
// myGraph.addEdge('C','D');
// // myGraph.removeEdge('D');
// myGraph;