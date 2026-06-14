# Sorting Algorithms

## Overview

| Algorithm | Best | Average | Worst | Space | Stable |
|-----------|------|---------|-------|-------|--------|
| Bubble Sort | $O(n)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | Yes |
| Selection Sort | $O(n^2)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | No |
| Insertion Sort | $O(n)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | Yes |
| Merge Sort | $O(n \log n)$ | $O(n \log n)$ | $O(n \log n)$ | $O(n)$ | Yes |
| Quick Sort | $O(n \log n)$ | $O(n \log n)$ | $O(n^2)$ | $O(\log n)$ | No |
| Heap Sort | $O(n \log n)$ | $O(n \log n)$ | $O(n \log n)$ | $O(1)$ | No |

## Merge Sort

Merge sort is a **divide-and-conquer** algorithm. It recursively splits the array in half, sorts each half, then merges the two sorted halves.

```python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i]); i += 1
        else:
            result.append(right[j]); j += 1
    return result + left[i:] + right[j:]
```

## Quick Sort

Quick sort selects a **pivot**, partitions elements into those less than / greater than the pivot, and recurses. Its average case is $O(n \log n)$ but degrades to $O(n^2)$ on already-sorted input with a naive pivot (mitigated by randomised pivot selection).

## Counting Sort

For integer keys in range $[0, k)$, **counting sort** runs in $O(n + k)$ — faster than comparison-based lower bound $\Omega(n \log n)$ because it doesn't compare elements.

## Stability

A sort is **stable** if equal elements retain their original relative order. Stability matters when sorting by multiple keys (e.g. sort by last name, then by first name).
