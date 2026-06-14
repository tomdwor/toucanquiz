# Python Syntax Guide

## Variables and Types

Python is dynamically typed — no type declaration needed:

```python
name = "Alice"        # str
age = 30              # int
height = 1.75         # float
is_active = True      # bool
scores = [95, 87, 92] # list
info = {"lang": "en"} # dict
```

Use `type()` to inspect, `isinstance()` to check:

```python
isinstance(42, int)    # True
isinstance("hi", str)  # True
```

## String Operations

```python
greeting = "Hello, World!"
print(greeting.upper())      # HELLO, WORLD!
print(greeting.replace("World", "Python"))  # Hello, Python!
print(len(greeting))         # 13

# f-strings (Python 3.6+)
name = "Alice"
print(f"Hi, {name}!")        # Hi, Alice!
print(f"2 + 2 = {2 + 2}")   # 2 + 2 = 4
```

## Lists

```python
fruits = ["apple", "banana", "cherry"]
fruits.append("date")         # add to end
fruits.insert(1, "avocado")   # insert at index
fruits.remove("banana")       # remove by value
print(fruits[0])              # "apple"
print(fruits[-1])             # last element
print(fruits[1:3])            # slice
```

## Dictionaries

```python
person = {"name": "Bob", "age": 25}
person["city"] = "Warsaw"     # add/update
print(person.get("name"))     # "Bob"
print(person.keys())          # dict_keys([...])

for key, value in person.items():
    print(f"{key}: {value}")
```

## Functions

```python
def add(a: int, b: int) -> int:
    return a + b

# Default arguments
def greet(name: str, greeting: str = "Hello") -> str:
    return f"{greeting}, {name}!"

# *args and **kwargs
def total(*numbers):
    return sum(numbers)

total(1, 2, 3, 4)  # 10
```

## List Comprehensions

```python
squares = [x**2 for x in range(10)]
evens   = [x for x in range(20) if x % 2 == 0]
words   = [w.upper() for w in ["hello", "world"]]
```

## Built-in Functions

| Function | Purpose |
|----------|---------|
| `len(x)` | Length of sequence |
| `range(n)` | Integer sequence 0..n-1 |
| `sorted(x)` | Returns sorted copy |
| `sum(x)` | Sum of iterable |
| `zip(a, b)` | Pairs elements from two iterables |
| `enumerate(x)` | Index-value pairs |
| `map(f, x)` | Apply f to each element |
