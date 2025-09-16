import LinkedList from "./linkedlist.js";

export default class HashMap {
    loadFactor = 0.75;
    buckets = new Array(16);

    hash = (key) => {
        let hashCode = 0;

        const mod = Number.MAX_SAFE_INTEGER;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % mod;
        }

        return hashCode % this.buckets.length;
    }


    /* 
        set(key, value)
        place the bucket key:value or replace
        returns true if succesful
        
    */
    set = (key, value) => {
        // TODO: at the end, implement growing the bucket
        const index = this.hash(key);
        if (index < 0 || index >= this.buckets.length) throw new Error("Trying to access index out of bounds");

        // If adding a new node exceeds the capacity
        const timeToGrow = this.length() > Math.floor(this.buckets.length * this.loadFactor)
        if (timeToGrow) {
            // Grab all entries and push a new node
            // For each entry, set it
            const entries = this.entries();
            entries.push([key, value]);

            // Create a new bucket double the size
            const newBuckets = new Array(this.buckets.length * 2);
            this.buckets = newBuckets;

            entries.forEach(entry => {
                this.set(entry[0], entry[1]);
            })
            return true;
        }

        const bucket = this.buckets[index];
        if (bucket instanceof LinkedList) {
            // Check if node with the key already exist
            let node = bucket.findNodeByKey(key);
            if (node) {
                // update the node value
                node.value = value;
                return true;
            };

            bucket.append(key, value);
            return true;
        }


        // if its empty generate a linked list
        const bucketLinkedList = new LinkedList();
        bucketLinkedList.append(key, value);

        this.buckets[index] = bucketLinkedList;
        return true;
    }

    /* 
        get(key)
        returns the value if the key is found
        returns null if not
    */
    get = (key) => {
        const index = this.hash(key);
        if (index < 0 || index >= this.buckets.length) throw new Error("Trying to access index out of bounds");

        const bucket = this.buckets[index];
        if (!bucket) return null;

        const node = bucket.findNodeByKey(key);
        if (!node) return null;

        return node.value;

    }

    /* 
        has(key)
        returns true if the key is in the hashmap
        returns false
    */
    has = (key) => {
        const get = this.get(key);
        if (!get) return false;
        return true;
    }

    /* 
        remove(key)
        return true if the key is found and removed successfully
        return false if the key is not found or is not succesful
    */
    remove = (key) => {
        const index = this.hash(key);
        if (index < 0 || index >= this.buckets.length) throw new Error("Trying to access index out of bounds");

        const bucket = this.buckets[index];
        if (!bucket) return false;

        const isRemoved = bucket.removeByKey(key);
        if (!isRemoved) return false;

        return isRemoved;
    }

    /* 
        length()
        returns the number of stored keys in the hashmap
        number of stored keys = number of nodes
    */
    length = () => {
        // Loop using forEach in the Bucket array
        let count = 0;
        // If current element is a linked list
        this._forEachNode(node => count++);
        return count;
    }

    /* 
        clear()
        removes all entries in the hashmap
    */
    clear = () => {
        // create a new array and reference it as the bucket
        try {
            const emptyArray = new Array(this.buckets.length)
            this.buckets = emptyArray;
            return true;
        } catch (error) {
            throw new Error(`Hashmap clear method caused an error: ${error}`);
        }
    }

    /* 
        keys()
        returns an array containing all the keys inside the hashmap
    */
    keys = () => {
        // start an empty array and push every node.key found in it
        const keys = [];
        this._forEachNode(node => keys.push(node.key));
        return keys;
    }

    /* 
         values()
         returns all the values inside the hashmap
    */

    values = () => {
        const values = [];
        this._forEachNode(node => {
            values.push(node.value);
        })
        return values;
    }

    /* 
        entries()
        returns an array with arrays of key:value pairs
        [[key1, value1], [key2, value2], [key3, value3]...]
    */
    entries = () => {
        const entries = [];
        this._forEachNode(node => {
            entries.push([node.key, node.value]);
        })
        return entries;
    }

    _forEachNode = (callback) => {
        this.buckets.forEach(bucket => {
            if (bucket instanceof LinkedList) {
                let currentNode = bucket.linkedlistHead;
                while (currentNode) {
                    callback(currentNode);
                    currentNode = currentNode.nextNode;
                }
            }
        })
    }
}

const hashmap = new HashMap();

console.log(hashmap.hash('Sara'));
console.log(hashmap.hash('raSa'));;
hashmap.set('Sara', 'Geronimo');
hashmap.set('Sara', 'Lagero');
hashmap.set('Anotherone', 'Secondone');
hashmap.get('Sara');
console.log(hashmap.has('Sara'));
console.log(hashmap.has('Nosara'));
console.log(hashmap.length());
console.log(hashmap.keys());
console.log(hashmap.values());
console.log(hashmap.entries());
