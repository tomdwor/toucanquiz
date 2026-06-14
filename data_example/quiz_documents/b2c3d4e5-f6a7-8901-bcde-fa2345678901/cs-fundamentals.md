# Computer Science Fundamentals

## Data Types

Every value in a program has a **type** that determines what operations are valid on it.

| Category | Examples |
|----------|---------|
| Integer | `int`, `long`, `short` |
| Floating-point | `float`, `double` |
| Boolean | `true`, `false` |
| Character | `'a'`, `'Z'` |
| String | `"hello"` |

## Variables and Assignment

A **variable** is a named storage location. Assignment binds a name to a value:

```python
x = 42          # integer
name = "Alice"  # string
pi = 3.14159    # float
is_valid = True # boolean
```

## Control Flow

### Conditionals

```python
if temperature > 30:
    print("Hot day")
elif temperature > 15:
    print("Warm day")
else:
    print("Cool day")
```

### Loops

```python
# Count from 0 to 4
for i in range(5):
    print(i)

# Repeat while condition holds
total = 0
while total < 100:
    total += 10
```

## Functions

A **function** is a reusable block of code:

```python
def greet(name: str) -> str:
    return f"Hello, {name}!"

message = greet("Alice")  # "Hello, Alice!"
```

## Basic Data Structures

- **Array / List** — ordered sequence, indexed from 0
- **Stack** — Last-In-First-Out (LIFO)
- **Queue** — First-In-First-Out (FIFO)
- **Dictionary / Map** — key-value pairs
