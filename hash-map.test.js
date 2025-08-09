import assert from 'assert';
import HashMap from './hash-map.js';

function runHashMapTests() {
  console.log('--- Testing HashMap ---');

  const map = HashMap();

  // Initial state
  assert.strictEqual(map.length, 0, 'Initial length should be 0');

  // Basic set/get
  map.set('apple', 'red');
  map.set('banana', 'yellow');
  assert.strictEqual(map.get('apple'), 'red', 'get() failed for apple');
  assert.strictEqual(map.get('banana'), 'yellow', 'get() failed for banana');
  assert.strictEqual(map.has('apple'), true, 'has() failed for apple');
  assert.strictEqual(map.has('cherry'), false, 'has() should be false for missing key');
  assert.strictEqual(map.length, 2, 'Length should be 2 after adding entries');

  // Overwrite value
  map.set('apple', 'green');
  assert.strictEqual(map.get('apple'), 'green', 'Overwriting value failed');
  assert.strictEqual(map.length, 2, 'Length should not change on overwrite');

  // Remove existing key
  assert.strictEqual(map.remove('banana'), true, 'remove() should return true for existing key');
  assert.strictEqual(map.has('banana'), false, 'banana should be removed');
  assert.strictEqual(map.length, 1, 'Length should decrease after removal');

  // Remove missing key
  assert.strictEqual(map.remove('banana'), false, 'Removing non-existing should return false');
  assert.strictEqual(map.length, 1, 'Length should remain same for missing key removal');

  // keys, values, entries
  map.set('cat', 'meow');
  map.set('dog', 'bark');

  const keys = map.keys;
  assert.deepStrictEqual(new Set(keys), new Set(['apple', 'cat', 'dog']), 'keys getter incorrect');

  const values = map.values;
  assert.deepStrictEqual(new Set(values), new Set(['green', 'meow', 'bark']), 'values getter incorrect');

  const entries = map.entries;
  assert(entries.some(([k, v]) => k === 'apple' && v === 'green'), 'entries getter missing apple:green');

  // Clear & retain capacity
  const oldCap = map.capacity;
  map.clear();
  assert.strictEqual(map.length, 0, 'Length should be 0 after clear()');
  assert.strictEqual(map.capacity, oldCap, 'Capacity should not change after clear()');

  // Auto-resize after loadFactor exceeded
  const initialCap = map.capacity;
  const loadLimit = Math.floor(initialCap * map.loadFactor);
  for (let i = 0; i <= loadLimit; i++) {
    map.set(`key${i}`, i);
  }
  assert(map.capacity > initialCap, 'Capacity should grow after exceeding load factor');
  assert.strictEqual(map.length, loadLimit + 1, 'Length should match inserted count');

  // Collision test
  const smallMap = HashMap(4, 0.75);
  smallMap.set('ab', 'first');
  smallMap.set('b`', 'second'); // likely forces collision
  assert.strictEqual(smallMap.has('ab'), true, 'Collision key 1 not found');
  assert.strictEqual(smallMap.has('b`'), true, 'Collision key 2 not found');
  assert.strictEqual(smallMap.get('ab'), 'first', 'Value mismatch on collision key 1');
  assert.strictEqual(smallMap.get('b`'), 'second', 'Value mismatch on collision key 2');

  console.log('✅ All HashMap tests passed!');
}

runHashMapTests();