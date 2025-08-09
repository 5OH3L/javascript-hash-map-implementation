const HashSetPrototype = {
  Node(key) {
    return {
      key,
      nextNode: null,
    };
  },
  hash(key) {
    if (typeof key !== "string") throw new Error("The key must be a string");
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  },
  add(key) {
    if (typeof key !== "string") throw new Error("The key must be a string");
    const hashedKey = this.hash(key);
    if (hashedKey < 0 || hashedKey >= this.capacity) throw new Error("Trying to access index out of bounds");
    let currentNode = this.buckets[hashedKey];
    let lastNode = null;
    while (currentNode) {
      if (currentNode.key === key) return false;
      lastNode = currentNode;
      currentNode = currentNode.nextNode;
    }

    const node = this.Node(key);
    if (!lastNode) {
      this.buckets[hashedKey] = node;
    } else {
      lastNode.nextNode = node;
    }
    this.entryCount++;

    if (this.entryCount <= Math.floor(this.capacity * this.loadFactor)) return true;

    this.capacity *= 2;
    const newBuckets = new Array(this.capacity).fill(null);
    for (let i = 0; i < this.buckets.length; i++) {
      let currentNode = this.buckets[i];
      if (currentNode === null) continue;

      while (currentNode) {
        const newHashedKey = this.hash(currentNode.key);
        let newNode = { ...currentNode, nextNode: null };
        if (newBuckets[newHashedKey] === null) {
          newBuckets[newHashedKey] = newNode;
        } else {
          let tail = newBuckets[newHashedKey];
          while (tail.nextNode) tail = tail.nextNode;
          tail.nextNode = newNode;
        }
        currentNode = currentNode.nextNode;
      }
    }
    this.buckets = newBuckets;
    return true;
  },
  has(key) {
    if (typeof key !== "string") throw new Error("The key must be a string");
    const hashedKey = this.hash(key);
    let currentNode = this.buckets[hashedKey];
    if (!currentNode) return false;

    while (currentNode) {
      if (currentNode.key === key) return true;
      currentNode = currentNode.nextNode;
    }
    return false;
  },
  remove(key) {
    if (typeof key !== "string") throw new Error("The key must be a string");
    const hashedKey = this.hash(key);
    let currentNode = this.buckets[hashedKey];
    if (currentNode === null) return false;
    if (currentNode.key === key) {
      this.buckets[hashedKey] = currentNode.nextNode;
      this.entryCount--;
      return true;
    }
    let previousNode = currentNode;
    currentNode = previousNode.nextNode;

    while (currentNode) {
      if (currentNode.key === key) {
        previousNode.nextNode = currentNode.nextNode;
        this.entryCount--;
        return true;
      }
      previousNode = currentNode;
      currentNode = currentNode.nextNode;
    }
    return false;
  },
  get size() {
    return this.entryCount;
  },
  clear() {
    this.buckets = new Array(this.capacity).fill(null);
    this.entryCount = 0;
  },
  get keys() {
    const allKeys = [];
    const buckets = this.buckets;
    for (let i = 0; i < this.capacity; i++) {
      if (buckets[i] === null) continue;
      let currentNode = buckets[i];
      while (currentNode) {
        allKeys.push(currentNode.key);
        currentNode = currentNode.nextNode;
      }
    }
    return allKeys;
  },
};

function HashSet(capacity = 16, loadFactor = 0.75) {
  const HashSet = Object.create(HashSetPrototype);
  HashSet.capacity = capacity;
  HashSet.loadFactor = loadFactor;
  HashSet.entryCount = 0;
  HashSet.buckets = new Array(capacity).fill(null);
  return HashSet;
}
export default HashSet;