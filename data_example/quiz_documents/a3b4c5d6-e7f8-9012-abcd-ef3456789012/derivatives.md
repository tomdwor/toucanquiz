# Derivatives

## Definition

The **derivative** of $f$ at $x$ is the instantaneous rate of change:

$$f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$$

Geometrically, $f'(x_0)$ is the **slope of the tangent line** to $y = f(x)$ at $x = x_0$.

## Basic Differentiation Rules

| Rule | Formula |
|------|---------|
| Constant | $(c)' = 0$ |
| Power | $(x^n)' = nx^{n-1}$ |
| Sum | $(f + g)' = f' + g'$ |
| Product | $(fg)' = f'g + fg'$ |
| Quotient | $(f/g)' = \frac{f'g - fg'}{g^2}$ |
| Chain | $(f(g(x)))' = f'(g(x)) \cdot g'(x)$ |

## Common Derivatives

$$(\sin x)' = \cos x \qquad (\cos x)' = -\sin x$$

$$(\ln x)' = \frac{1}{x} \qquad (e^x)' = e^x$$

$$(a^x)' = a^x \ln a \qquad (\arctan x)' = \frac{1}{1+x^2}$$

## Higher-Order Derivatives

The **second derivative** $f''(x)$ measures the rate of change of $f'$, i.e. concavity:

- $f''(x) > 0$ → $f$ is **concave up** (local minimum candidate)
- $f''(x) < 0$ → $f$ is **concave down** (local maximum candidate)

## Applications

### Critical Points

$f'(x_0) = 0$ or $f'(x_0)$ undefined → $x_0$ is a **critical point**.

Use the **second derivative test**: if $f'(x_0) = 0$ and $f''(x_0) > 0$, then $x_0$ is a local minimum.

### L'Hôpital's Rule

For indeterminate forms $\frac{0}{0}$ or $\frac{\infty}{\infty}$:

$$\lim_{x \to a} \frac{f(x)}{g(x)} = \lim_{x \to a} \frac{f'(x)}{g'(x)}$$
