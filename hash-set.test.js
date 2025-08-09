import assert from 'assert';
import HashSet from './hash-set.js';

function runHashSetTests() {
  console.log('--- Testing HashSet ---');

  const set = HashSet();

  // Initial state
  assert.strictEqual(set.size, 0, 'Initial size should be 0');

  // Basic add & has
  assert.strictEqual(set.add('apple'), true, 'add() should return true for new');
  assert.strictEqual(set.add('banana'), true, 'add() should return true for new key');
  assert.strictEqual(set.has('apple'), true, 'has() failed for existing key');
  assert.strictEqual(set.has('grape'), false, 'has() should be false for missing key');
  assert.strictEqual(set.size, 2, 'Size should be 2 after adding');

  // Duplicate add
  assert.strictEqual(set.add('apple'), false, 'Duplicate add should return false');
  assert.strictEqual(set.size, 2, 'Size should not increase on duplicate add');

  // Remove existing key
  assert.strictEqual(set.remove('banana'), true, 'remove() should return true when key exists');
  assert.strictEqual(set.has('banana'), false, 'Removed key should not be found');
  assert.strictEqual(set.size, 1, 'Size should decrease after removal');

  // Remove missing key
  assert.strictEqual(set.remove('banana'), false, 'remove() should return false if key does not exist');
  assert.strictEqual(set.size, 1, 'Size should not change when removing missing key');

  // Keys getter
  const keys = set.keys;
  assert.deepStrictEqual(new Set(keys), new Set(['apple']), 'keys getter returned wrong values');

  // Clear but keep capacity
  const oldCap = set.capacity;
  set.clear();
  assert.strictEqual(set.size, 0, 'Size should be 0 after clear()');
  assert.strictEqual(set.capacity, oldCap, 'Capacity should remain after clear()');

  // Auto-resize check
  const initialCap = set.capacity;
  const loadLimit = Math.floor(initialCap * set.loadFactor);
  for (let i = 0; i <= loadLimit; i++) {
    set.add(`key${i}`);
  }
  assert(set.capacity > initialCap, 'Capacity should grow after exceeding load factor');
  assert.strictEqual(set.size, loadLimit + 1, 'Size should match inserted count');

  // Collision handling
  const smallSet = HashSet(4, 0.75);
  smallSet.add('ab');
  smallSet.add('b`'); // collision on small capacity
  assert.strictEqual(smallSet.has('ab'), true, 'Collision key 1 missing');
  assert.strictEqual(smallSet.has('b`'), true, 'Collision key 2 missing');

  console.log('✅ All HashSet tests passed!');
}

runHashSetTests();