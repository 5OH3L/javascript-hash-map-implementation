# JavaScript HashMap and HashSet Implementations

A lightweight, high-performance **HashMap** and **HashSet** written in modern JavaScript (ES6), implemented from scratch without relying on the built-in `Map` or `Set`.

Both use **separate chaining** for collision handling and **automatic resizing** when the load factor is exceeded.

> **__NOTE:__**
> Both HashMap and HashSet implementations accept only string keys.


## Features

### HashMap

- `set(key, value)` — Add or update a key-value pair
- `get(key)` — Retrieve value for a given key
- `has(key)` — Check if a key exists
- `remove(key)` — Remove a key-value pair
- `length` _(getter)_ — Current number of entries
- `keys` _(getter)_ — Array of all keys
- `values` _(getter)_ — Array of all values
- `entries` _(getter)_ — Array of `[key, value]` pairs
- `clear()` — Remove all entries but keep capacity
- **Auto-resizing** and **separate chaining** for efficient performance

### HashSet

- `add(key)` — Add a string key (returns `false` if duplicate)
- `has(key)` — Check if a key exists
- `remove(key)` — Remove a key
- `size` _(getter)_ — Number of entries
- `keys` _(getter)_ — Array of all keys
- `clear()` — Remove all keys but keep capacity
- **Auto-resizing** and **separate chaining**

## API usage

### HashMap

| Method / Getter      | Parameters              | Returns           | Description                                                     |
| -------------------- | ----------------------- | ----------------- | --------------------------------------------------------------- |
| `set(key, value)`    | `string key, any value` | `void`            | Add or update a key–value pair. Overwrites value if key exists. |
| `get(key)`           | `string key`            | `any \| null`     | Retrieve value for a given key, or `null` if not found.         |
| `has(key)`           | `string key`            | `boolean`         | Check if the map contains the given key.                        |
| `remove(key)`        | `string key`            | `boolean`         | Remove entry by key. Returns `true` if found and removed.       |
| `length` _(getter)_  | —                       | `number`          | Number of entries in the map.                                   |
| `keys` _(getter)_    | —                       | `string[]`        | Array of all keys in the map.                                   |
| `values` _(getter)_  | —                       | `any[]`           | Array of all values in the map.                                 |
| `entries` _(getter)_ | —                       | `[string, any][]` | Array of `[key, value]` pairs.                                  |
| `clear()`            | —                       | `void`            | Remove all entries but keep capacity unchanged.                 |
| `capacity`           | —                       | `number`          | Current internal bucket size (mainly for debugging).            |

### HashSet

| Method / Getter   | Parameters   | Returns    | Description                                                    |
| ----------------- | ------------ | ---------- | -------------------------------------------------------------- |
| `add(key)`        | `string key` | `boolean`  | Add new key to the set. Returns `false` if key already exists. |
| `has(key)`        | `string key` | `boolean`  | Check if the given key exists in the set.                      |
| `remove(key)`     | `string key` | `boolean`  | Remove key from the set. Returns `true` if removed.            |
| `size` _(getter)_ | —            | `number`   | Number of keys in the set.                                     |
| `keys` _(getter)_ | —            | `string[]` | Array of all keys in the set.                                  |
| `clear()`         | —            | `void`     | Remove all keys but keep capacity unchanged.                   |
| `capacity`        | —            | `number`   | Current internal bucket size (mainly for debugging).           |