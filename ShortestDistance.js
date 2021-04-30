/**
* 1 When visiting a new node we pick the node with the smallest known distance 
*   to visit first.
* 2 Once we've moved to the closest node, we look at each of its neighbors.
* 3 For each neighboring node, we calculate the distance by summing the total
*   edges that lead to the node we're checking _from the starting node_.
* 4 If the new total distance to a node is less than the previous total, we store
*   the new shorter distance for that node.
*/

class WeightedGraph {
    constructor() {
        this.adjacencyList = {};
    }
    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
    }
    addEdge(vertex1, vertex2, weight) {
        this.adjacencyList[vertex1].push({node:vertex2, weight});
        this.adjacencyList[vertex2].push({node: vertex1, weight});
    }
    Dijkstra(start, finish) {
        const nodes = new PriorityQueue();
        const distances = {}; // current distances
        const previous = {}; // store previous distances
        let path = []; // return at end
        let smallest;

        // build up initial state
        for(let vertex in this.adjacencyList) {
            // set starting node distance to zero
            if (vertex === start) {
                distances[vertex] = 0;
                nodes.enqueue(vertex, 0);
            } else {
                // set all unknown distances to Infinity (will update later)
                distances[vertex] = Infinity;
                nodes.enqueue(vertex, Infinity);
            }
            // set all previous vertices to null (will update later)
            previous[vertex] = null;
        }

        // as long as there is someting to visit
        while(nodes.values.length) {
            smallest = nodes.dequeue().val;
            if (smallest === finish) {
                // We're done
                // Build up path to return
                while(previous[smallest]){
                    path.push(smallest);
                    smallest = previous[smallest];
                }
                break;
            }
            if (smallest || distances[smallest] !== Infinity) {
                for (let neighbor in this.adjacencyList[smallest]) {
                    // find neighboring node
                    let nextNode = this.adjacencyList[smallest][neighbor];
                    // calculate new distance to neighboring node
                    let candidate = distances[smallest] + nextNode.weight;
                    let nextNeighbor = nextNode.node;
                    if (candidate < distances[nextNeighbor]) {
                        // updating new smallest distance to neighbor
                        distances[nextNeighbor] = candidate;
                        // updating previous (how we got to neighbor)
                        previous[nextNeighbor] = smallest;
                        //enqueue in priority queue with new priority
                        nodes.enqueue(nextNeighbor, candidate);
                    }
                }
            }
        }
        return path.concat(smallest).reverse();
    }
}

class PriorityQueue {
    constructor(){
        this.values = [];
    }
    enqueue(val, priority){
        let newNode = new Node(val, priority);
        this.values.push(newNode);
        this.bubbleUp();
    }
    bubbleUp(){
        let idx = this.values.length - 1;
        const element = this.values[idx];
        while(idx > 0){
            let parentIdx = Math.floor((idx - 1)/2);
            let parent = this.values[parentIdx];
            if(element.priority >= parent.priority) break;
            this.values[parentIdx] = element;
            this.values[idx] = parent;
            idx = parentIdx;
        }
    }
    dequeue(){
        const min = this.values[0];
        const end = this.values.pop();
        if(this.values.length > 0){
            this.values[0] = end;
            this.sinkDown();
        }
        return min;
    }
    sinkDown(){
        let idx = 0;
        const length = this.values.length;
        const element = this.values[0];
        while(true){
            let leftChildIdx = 2 * idx + 1;
            let rightChildIdx = 2 * idx + 2;
            let leftChild,rightChild;
            let swap = null;

            if(leftChildIdx < length){
                leftChild = this.values[leftChildIdx];
                if(leftChild.priority < element.priority) {
                    swap = leftChildIdx;
                }
            }
            if(rightChildIdx < length){
                rightChild = this.values[rightChildIdx];
                if(
                    (swap === null && rightChild.priority < element.priority) || 
                    (swap !== null && rightChild.priority < leftChild.priority)
                ) {
                   swap = rightChildIdx;
                }
            }
            if(swap === null) break;
            this.values[idx] = this.values[swap];
            this.values[swap] = element;
            idx = swap;
        }
    }
}

class Node {
    constructor(val, priority){
        this.val = val;
        this.priority = priority;
    }
}


// let g = new WeightedGraph();
// g.addVertex('A');
// g.addVertex('B');
// g.addVertex('C');
// g.addVertex('D');
// g.addVertex('E');
// g.addVertex('F');
// g.addEdge('A', 'B', 4);
// g.addEdge('A', 'C', 2);
// g.addEdge('B', 'E', 3);
// g.addEdge('C', 'D', 2);
// g.addEdge('C', 'F', 4);
// g.addEdge('D', 'E', 3);
// g.addEdge('D', 'F', 1);
// g.addEdge('E', 'F', 1);
// g.Dijkstra('A', 'E');

// output: ["A", "C", "D", "F", "E"]