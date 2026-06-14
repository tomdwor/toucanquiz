# Integrals

## The Definite Integral

The **definite integral** of $f$ from $a$ to $b$ is the signed area under the curve:

$$\int_a^b f(x)\, dx = \lim_{n \to \infty} \sum_{i=1}^{n} f(x_i^*) \Delta x$$

## The Fundamental Theorem of Calculus

If $F$ is an antiderivative of $f$ (i.e. $F' = f$), then:

$$\int_a^b f(x)\, dx = F(b) - F(a)$$

This connects the two branches of calculus: differentiation and integration.

## Basic Integration Rules

| Rule | Formula |
|------|---------|
| Power | $\int x^n\, dx = \frac{x^{n+1}}{n+1} + C \quad (n \neq -1)$ |
| Reciprocal | $\int \frac{1}{x}\, dx = \ln|x| + C$ |
| Exponential | $\int e^x\, dx = e^x + C$ |
| Sine | $\int \sin x\, dx = -\cos x + C$ |
| Cosine | $\int \cos x\, dx = \sin x + C$ |
| Linearity | $\int [af(x) + bg(x)]\, dx = a\int f + b\int g$ |

## Integration Techniques

### Substitution

Reverse of the chain rule. Let $u = g(x)$, then $du = g'(x)\, dx$:

$$\int f(g(x))\, g'(x)\, dx = \int f(u)\, du$$

**Example**: $\int 2x e^{x^2} dx$. Let $u = x^2$, $du = 2x\, dx$:

$$\int e^u\, du = e^u + C = e^{x^2} + C$$

### Integration by Parts

Reverse of the product rule:

$$\int u\, dv = uv - \int v\, du$$

Mnemonic: **LIATE** (Logarithm, Inverse trig, Algebraic, Trig, Exponential) — choose $u$ as the first applicable type.

## Improper Integrals

When the interval is infinite or the integrand is unbounded, define the integral as a limit:

$$\int_1^{\infty} \frac{1}{x^2}\, dx = \lim_{b \to \infty} \left[-\frac{1}{x}\right]_1^b = 0 - (-1) = 1$$
