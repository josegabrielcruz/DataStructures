class Graph {
    constructor() {
        this.adjacencyList = {};
    }
    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
    }
    addEdge(vertex1,vertex2) {
        this.adjacencyList[vertex1].push(vertex2);
        this.adjacencyList[vertex2].push(vertex1);
    }
    removeEdge(vertex1,vertex2) {
        this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
        vertex1 => vertex1 !== vertex2);
        this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(
        vertex2 => vertex2 !== vertex1);
    }
    removeVertex(vertex) {
        while(this.adjacencyList[vertex].length) {
            const adjacentVertex = this.adjacencyList[vertex].pop();
            this.removeEdge(vertex, adjacentVertex);
        }
        delete this.adjacencyList[vertex];
    }
    DFS_recursive(vertex) {
        if (!this.adjacencyList[vertex]) return undefined;
        const result = [];
        const visited = {};
        const dfs = (vertex) => {
            if (!vertex) return null;
            visited[vertex] = true;
            result.push(vertex);
            this.adjacencyList[vertex].forEach(neighbor => {
                if (!visited[neighbor]){
                    return dfs(neighbor);
                }
            })
        }
        dfs(vertex);
        return result;
    }
    DFS_iterative(startVertex) {
        const stack = [startVertex];
        const result = [];
        const visited = {};
        let currentVertex;
        
        visited[startVertex] = true;

        while(stack.length) {
            currentVertex = stack.pop();
            result.push(currentVertex);

            this.adjacencyList[currentVertex].forEach(neighbor => {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    stack.push(neighbor);
                }  
            })
        }

        return result;    
    }
    BFS(startVertex) {
        const queue = [startVertex];
        const result = [];
        const visited = {};
        let currentVertex;
        
        visited[startVertex] = true;

        while(queue.length) {
            currentVertex = queue.shift();
            result.push(currentVertex);

            this.adjacencyList[currentVertex].forEach(neighbor => {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.push(neighbor);
                }  
            })
        }

        return result; 
    }
}

// let g = new Graph();
// g.addVertex('A');
// g.addVertex('B');
// g.addVertex('C');
// g.addVertex('D');
// g.addVertex('E');
// g.addVertex('F');
// g.addEdge('A', 'B');
// g.addEdge('A', 'C');
// g.addEdge('B', 'D');
// g.addEdge('C', 'E');
// g.addEdge('D', 'E');
// g.addEdge('D', 'F');
// g.addEdge('E', 'F');

//             A
//           /   \
//          B     C
//          |     |
//          D --- E
//          \     /
//             F 