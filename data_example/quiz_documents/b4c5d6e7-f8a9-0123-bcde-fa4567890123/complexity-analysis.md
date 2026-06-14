# Complexity Analysis

## Big-O Notation

Big-O notation describes the **asymptotic upper bound** of an algorithm's growth rate. It answers: *as input size $n$ grows, how does resource usage (time or space) scale?*

$$f(n) = O(g(n)) \iff \exists\, c > 0,\, n_0 : f(n) \leq c \cdot g(n) \;\forall\, n > n_0$$

## Common Complexity Classes

| Notation | Name | Example |
|----------|------|---------|
| $O(1)$ | Constant | Array index lookup |
| $O(\log n)$ | Logarithmic | Binary search |
| $O(n)$ | Linear | Linear scan |
| $O(n \log n)$ | Linearithmic | Merge sort |
| $O(n^2)$ | Quadratic | Bubble sort |
| $O(2^n)$ | Exponential | Brute-force subset enumeration |
| $O(n!)$ | Factorial | Permutation generation |

## Amortised Analysis

Some operations are occasionally expensive but cheap on average. A classic example is the dynamic array (e.g. Python `list`): most `append` calls are $O(1)$, but doubling the capacity is $O(n)$. Averaged over $n$ appends, each costs $O(1)$ amortised.

## Space Complexity

Space complexity counts **extra memory** used beyond the input. An in-place sort like heapsort uses $O(1)$ extra space; merge sort needs $O(n)$ for the merge buffer.

## Recurrence Relations

Divide-and-conquer algorithms often have recurrences. **Master theorem** solves $T(n) = aT(n/b) + f(n)$:

- If $f(n) = O(n^{\log_b a - \epsilon})$ → $T(n) = \Theta(n^{\log_b a})$
- If $f(n) = \Theta(n^{\log_b a})$ → $T(n) = \Theta(n^{\log_b a} \log n)$
- If $f(n) = \Omega(n^{\log_b a + \epsilon})$ → $T(n) = \Theta(f(n))$

**Example**: Merge sort has $a=2$, $b=2$, $f(n)=O(n)$, so $T(n) = \Theta(n \log n)$.
