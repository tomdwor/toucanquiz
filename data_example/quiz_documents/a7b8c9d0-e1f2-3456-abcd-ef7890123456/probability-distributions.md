# Probability Distributions

## Discrete Distributions

### Bernoulli

A single trial with probability $p$ of success:

$$P(X = 1) = p, \quad P(X = 0) = 1-p$$

$$E[X] = p, \quad \text{Var}(X) = p(1-p)$$

### Binomial

Number of successes in $n$ independent Bernoulli trials:

$$P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}$$

$$E[X] = np, \quad \text{Var}(X) = np(1-p)$$

### Poisson

Number of events in a fixed interval, given average rate $\lambda$:

$$P(X = k) = \frac{\lambda^k e^{-\lambda}}{k!}$$

$$E[X] = \lambda, \quad \text{Var}(X) = \lambda$$

## Continuous Distributions

### Uniform

Every value in $[a, b]$ is equally likely:

$$f(x) = \frac{1}{b-a}, \quad E[X] = \frac{a+b}{2}, \quad \text{Var}(X) = \frac{(b-a)^2}{12}$$

### Normal (Gaussian)

The bell curve, parameterised by mean $\mu$ and standard deviation $\sigma$:

$$f(x) = \frac{1}{\sigma\sqrt{2\pi}} \exp\!\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)$$

The **68-95-99.7 rule**: 68% of values fall within $1\sigma$, 95% within $2\sigma$, 99.7% within $3\sigma$ of the mean.

### Exponential

Models time between events in a Poisson process (rate $\lambda$):

$$f(x) = \lambda e^{-\lambda x}, \quad E[X] = \frac{1}{\lambda}, \quad \text{Var}(X) = \frac{1}{\lambda^2}$$

## Central Limit Theorem

For $n$ i.i.d. random variables with mean $\mu$ and variance $\sigma^2$, the sample mean $\bar{X}$ is approximately normal for large $n$:

$$\bar{X} \sim \mathcal{N}\!\left(\mu,\, \frac{\sigma^2}{n}\right)$$

This underpins hypothesis testing and confidence intervals.
