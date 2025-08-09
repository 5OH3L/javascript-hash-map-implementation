# JavaScript HashMap Implementation

A high‑performance **HashMap** data structure implemented in pure JavaScript (ES6) with:

- **Separate chaining** for collision resolution
- **Automatic resizing** when load factor exceeds the threshold
- **Full ES6 `Map`-like API** (`set`, `get`, `has`, `remove`, `keys`, `values`, `entries`, `clear`, `length`)
- No third‑party dependencies

## Features

- **Efficient lookups, insertions, and deletions** with average O(1) complexity
- **Automatic table resizing** to maintain performance
- **Collision handling** using separate chaining (linked list buckets)
- Clean, minimal API familiar to JavaScript developers

## API Reference

| Method       | Description                                       |
|--------------|---------------------------------------------------|
| `set(k, v)`  | Add or update a key-value pair                    |
| `get(k)`     | Retrieve the value for the given key              |
| `has(k)`     | Check if a key exists                             |
| `remove(k)`  | Remove a key-value pair                           |
| `length()`   | Return the total number of entries                |
| `keys()`     | Return an array of all keys                       |
| `values()`   | Return an array of all values                     |
| `entries()`  | Return an array of `[key, value]` pairs           |
| `clear()`    | Remove all entries                                |
| `capacity`   | The current capacity of the internal storage table|