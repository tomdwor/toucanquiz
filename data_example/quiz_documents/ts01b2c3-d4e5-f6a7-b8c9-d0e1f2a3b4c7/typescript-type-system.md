# TypeScript Type System

## Basic Annotations

TypeScript adds static types to JavaScript. Annotations follow variable or parameter names with `:`:

```typescript
let name: string = "Alice"
let age: number = 30
let active: boolean = true
let ids: number[] = [1, 2, 3]
let pair: [string, number] = ["hello", 42]  // tuple
```

## Interfaces and Type Aliases

```typescript
interface User {
  id: number
  name: string
  email?: string  // optional
}

type Status = "active" | "inactive" | "pending"  // union literal
```

Prefer `interface` for object shapes (supports declaration merging); use `type` for unions, intersections, and computed types.

## Union and Intersection Types

```typescript
// Union — one of several types
type ID = string | number

// Intersection — combines types
type AdminUser = User & { role: "admin" }
```

## Generics

Generics write type-safe code that works across multiple types:

```typescript
function identity<T>(value: T): T {
  return value
}

identity<string>("hello")  // type: string
identity<number>(42)       // type: number

// Generic interface
interface Repository<T> {
  findById(id: number): Promise<T>
  save(item: T): Promise<void>
}
```

## Utility Types

| Utility | Description |
|---------|------------|
| `Partial<T>` | All properties become optional |
| `Required<T>` | All properties become required |
| `Readonly<T>` | All properties become read-only |
| `Pick<T, K>` | Select a subset of properties |
| `Omit<T, K>` | Remove a subset of properties |
| `Record<K, V>` | Map type with keys `K` and values `V` |

```typescript
type UserPreview = Pick<User, "id" | "name">
type UserUpdate = Partial<Omit<User, "id">>
```

## Type Narrowing

TypeScript narrows types inside conditional branches:

```typescript
function process(value: string | number) {
  if (typeof value === "string") {
    return value.toUpperCase()  // TypeScript knows: string
  }
  return value * 2              // TypeScript knows: number
}
```

## `as const` and Literal Types

```typescript
const DIRECTIONS = ["north", "south", "east", "west"] as const
type Direction = typeof DIRECTIONS[number]  // "north" | "south" | "east" | "west"
```

## Optional Chaining and Nullish Coalescing

```typescript
const city = user?.address?.city       // undefined if any step is null/undefined
const label = user.name ?? "Anonymous" // "Anonymous" only if name is null/undefined
```
