# Supervised Learning

## What is Supervised Learning?

In supervised learning, a model is trained on **labelled examples** — input-output pairs $(x_i, y_i)$. The goal is to learn a function $f$ such that $f(x) \approx y$ for new, unseen inputs.

## Types of Problems

| Problem type | Output | Example |
|-------------|--------|---------|
| **Classification** | Discrete class | Email → spam / not spam |
| **Regression** | Continuous value | House features → price |

## Training, Validation, and Test Sets

Data is split into three sets:

- **Training set** (~70%): used to fit model parameters
- **Validation set** (~15%): used to tune hyperparameters
- **Test set** (~15%): used once to estimate generalisation error

## Common Algorithms

### Linear Regression

Fits a hyperplane $\hat{y} = \mathbf{w}^T \mathbf{x} + b$ by minimising the **mean squared error**:

$$\text{MSE} = \frac{1}{n}\sum_{i=1}^{n}(y_i - \hat{y}_i)^2$$

### Logistic Regression

Maps a linear combination to a probability via the **sigmoid** function:

$$\sigma(z) = \frac{1}{1 + e^{-z}}$$

### Decision Trees

Partition the feature space by choosing splits that maximise **information gain** (or minimise **Gini impurity**).

### k-Nearest Neighbours (kNN)

Classifies a new point by majority vote among its $k$ closest training examples.

## Overfitting and Underfitting

- **Underfitting** (high bias): model is too simple, fails to capture patterns in training data
- **Overfitting** (high variance): model memorises training data, generalises poorly
- The **bias–variance trade-off** guides model complexity selection
