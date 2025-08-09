import HashMap from "./hash-map.js";

const map = HashMap();

// Basic set/get
map.set('a', 1);
map.set('b', 2);
map.set('c', 3);

console.assert(map.get('b') === 2, "get() failed");

// Overwrite test
map.set('a', 42);
console.assert(map.get('a') === 42, "set() overwrite failed");

// Length check
console.assert(map.length() === 3, "length() failed");

// Deletion test
map.remove('b');
console.assert(map.has('b') === false, "remove() failed");
console.assert(map.length() === 2, "length after remove() failed");

// Resizing and collision test
for (let i = 0; i < 100; i++) {
  map.set('key' + i, i);
}
console.assert(map.get('key50') === 50, "set/get with many entries failed");
console.assert(map.length() === 102, "length after bulk insert failed");

// Iterators
const keys = map.keys();
console.assert(keys.includes('key99'), 'keys() failed');
const vals = map.values();
console.assert(vals.includes(99), 'values() failed');
const entries = map.entries();
console.assert(entries.some(([k, v]) => k === 'key88' && v === 88), "entries() failed");

// Clear test
map.clear();
console.assert(map.length() === 0, "clear() failed");
console.log("All tests passed!");