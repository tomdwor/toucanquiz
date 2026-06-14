# Function Types

## Linear Functions

A **linear function** has the form $f(x) = mx + b$, where $m$ is the slope and $b$ the y-intercept.

- Slope $m > 0$: increasing
- Slope $m < 0$: decreasing
- Slope $m = 0$: constant (horizontal line)

## Quadratic Functions

$$f(x) = ax^2 + bx + c, \quad a \neq 0$$

The graph is a **parabola**. Vertex at $x_v = -\frac{b}{2a}$, $y_v = f(x_v)$.

- $a > 0$: opens upward (minimum at vertex)
- $a < 0$: opens downward (maximum at vertex)

## Exponential Functions

$$f(x) = a \cdot b^x, \quad b > 0, b \neq 1$$

| $b > 1$ | Exponential **growth** |
| $0 < b < 1$ | Exponential **decay** |

The natural exponential $e^x$ satisfies $(e^x)' = e^x$ — it is its own derivative.

## Logarithmic Functions

The **logarithm** is the inverse of exponentiation:

$$y = \log_b x \iff b^y = x$$

Key identity: $\log_b(b^x) = x$ and $b^{\log_b x} = x$.

The natural logarithm $\ln x = \log_e x$ satisfies $(\ln x)' = 1/x$.

## Piecewise Functions

Defined by different formulas on different intervals. Example — the absolute value:

$$|x| = \begin{cases} x & x \geq 0 \\ -x & x < 0 \end{cases}$$

## Even and Odd Functions

- **Even**: $f(-x) = f(x)$ — symmetric about the y-axis (e.g. $\cos x$, $x^2$)
- **Odd**: $f(-x) = -f(x)$ — symmetric about the origin (e.g. $\sin x$, $x^3$)

## Function Composition

$(f \circ g)(x) = f(g(x))$ — apply $g$ first, then $f$.

**Example**: $f(x) = x^2$, $g(x) = x + 1$ → $(f \circ g)(x) = (x+1)^2$
