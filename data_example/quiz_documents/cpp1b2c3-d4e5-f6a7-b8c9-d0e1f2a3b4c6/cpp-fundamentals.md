# C++ Fundamentals

## Types and Variables

C++ is statically typed. Common fundamental types:

| Type | Size | Range (typical) |
|------|------|----------------|
| `int` | 4 bytes | $-2^{31}$ to $2^{31}-1$ |
| `long long` | 8 bytes | $-2^{63}$ to $2^{63}-1$ |
| `double` | 8 bytes | ~15 significant digits |
| `bool` | 1 byte | `true` / `false` |
| `char` | 1 byte | Single character |

```cpp
int x = 42;
double pi = 3.14159;
bool flag = true;
std::string name = "Alice"; // from <string>
```

## References and Pointers

A **reference** is an alias for an existing variable:

```cpp
int a = 10;
int& ref = a;   // ref is an alias for a
ref = 20;       // a is now 20
```

A **pointer** stores a memory address:

```cpp
int* ptr = &a;  // ptr holds address of a
*ptr = 30;      // dereference: a is now 30
```

Prefer references over pointers when the target is always valid.

## Functions

```cpp
// Pass by value — copy
int square(int n) { return n * n; }

// Pass by const reference — efficient, read-only
double norm(const std::vector<double>& v) {
    double sum = 0;
    for (double x : v) sum += x * x;
    return std::sqrt(sum);
}

// Pass by reference — allows modification
void increment(int& n) { n++; }
```

## Classes

```cpp
class Circle {
public:
    Circle(double radius) : radius_(radius) {}

    double area() const {
        return 3.14159 * radius_ * radius_;
    }

private:
    double radius_;
};

Circle c(5.0);
std::cout << c.area() << '\n';  // 78.539...
```

## `std::vector`

The standard resizable array:

```cpp
#include <vector>

std::vector<int> v = {1, 2, 3};
v.push_back(4);                   // append
v.emplace_back(5);                // construct in place
std::cout << v.size() << '\n';    // 5
std::cout << v[0] << '\n';        // 1

// Range-based for loop
for (int x : v) std::cout << x << ' ';
```

## Memory Management

C++ requires explicit memory management (unlike Java/Python):

```cpp
int* arr = new int[10];   // heap allocation
// ... use arr ...
delete[] arr;             // must free!
```

Prefer **RAII** wrappers: `std::vector`, `std::string`, `std::unique_ptr`, `std::shared_ptr`.
