/**
* Big O of HashTable
_hash method: O(1)
set method:   O(1)
get method:   O(1)
*/

class HashTable {
    constructor(size = 7) {
        this.dataMap = new Array(size);
    }
    /**
    * Setup address space
    */
    _hash(key) {
        let hash = 0;

        // length is the length of key string
        for (let i = 0; i < key.length; i++) { 
            hash = (hash + key.charCodeAt(i) * 23) % this.dataMap.length;
        }
        return hash;
    }
    set(key, value) {
        let index = this._hash(key);

        // check if array already exists in the address space
        if (!this.dataMap[index]) { 
            this.dataMap[index] = [];    
        }
        this.dataMap[index].push([key,value]);
        return this;
    }
    /**
    * Return the value for a giving key
    */
    get(key) {
        // calculate the address
        let index = this._hash(key); 

        // check if there's anything at that address
        if (this.dataMap[index]) { 
            // the length is the length of the array at the address space
            for (let i = 0; i < this.dataMap[index].length; i++) { 
                // index is the address, i is the key value pair array, 
                // 0 is the first value in that array (the key)
                if (this.dataMap[index][i][0] === key) {
                    // return the value
                    return this.dataMap[index][i][1];
                }
            }
        }
        return undefined;
    }
    /**
    * Return all keys
    */
    keys() {
        let allKeys = [];
        // loop through address spaces
        for (let i = 0; i < this.dataMap.length; i++) {
            // loop through array in address space if one exists
            if (this.dataMap[i]) {
                // push keys to allKeys array
                for (let j = 0; j < this.dataMap[i].length; j++) {
                    allKeys.push(this.dataMap[i][j][0]);
                }   
            }
        }
        return allKeys;
    }
}

// let myHashTable = new HashTable();
// myHashTable.set('bolts', 1400);
// myHashTable.set('washers', 50);