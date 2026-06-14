# Data Structures

## Arrays

A contiguous block of memory. Random access in $O(1)$; insertion/deletion in $O(n)$ (requires shifting).

## Linked Lists

Nodes connected by pointers. Insertion/deletion at known position: $O(1)$. Random access: $O(n)$.

| Operation | Array | Singly Linked List |
|-----------|-------|--------------------|
| Access by index | $O(1)$ | $O(n)$ |
| Insert at front | $O(n)$ | $O(1)$ |
| Insert at back | $O(1)$* | $O(n)$ or $O(1)$** |
| Delete at front | $O(n)$ | $O(1)$ |

\* amortised for dynamic arrays   \*\* with tail pointer

## Hash Tables

Store key-value pairs with $O(1)$ average-case insert, lookup, and delete via a **hash function** $h(k) \to [0, m)$.

**Collision resolution** strategies:
- **Chaining** — each bucket holds a linked list of entries
- **Open addressing** — probe for the next empty slot (linear, quadratic, or double hashing)

Load factor $\alpha = n/m$. Rehash when $\alpha$ exceeds a threshold (typically 0.75).

## Trees

### Binary Search Tree (BST)

For every node: left subtree values < node value < right subtree values. Search/insert/delete: $O(h)$ where $h$ is height. Worst case $O(n)$ for degenerate trees.

### Balanced BSTs

**AVL trees** and **Red-Black trees** maintain balance invariants, guaranteeing $h = O(\log n)$ and thus $O(\log n)$ operations.

### Heaps

A **max-heap** is a complete binary tree where every parent ≥ its children. Supports:
- `insert`: $O(\log n)$ (bubble up)
- `extract-max`: $O(\log n)$ (sink down)
- `build-heap` from array: $O(n)$ (not $O(n \log n)$)

## Graphs

Represent relationships between entities. Two primary representations:

- **Adjacency list** — $O(V + E)$ space, efficient for sparse graphs
- **Adjacency matrix** — $O(V^2)$ space, $O(1)$ edge lookup

```python
# Adjacency list representation
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D'],
    'C': ['A'],
    'D': ['B'],
}
```
