# Vectors and Matrices

## Vectors

A **vector** $\mathbf{v} \in \mathbb{R}^n$ is an ordered list of $n$ real numbers. Geometrically it represents a direction and magnitude in $n$-dimensional space.

$$\mathbf{v} = \begin{pmatrix} v_1 \\ v_2 \\ \vdots \\ v_n \end{pmatrix}$$

### Dot Product

$$\mathbf{u} \cdot \mathbf{v} = \sum_{i=1}^n u_i v_i = \|\mathbf{u}\| \|\mathbf{v}\| \cos\theta$$

The dot product is zero if and only if the vectors are **orthogonal**.

### Norms

| Norm | Formula | Use |
|------|---------|-----|
| $L^1$ | $\sum_i |v_i|$ | Sparsity (LASSO) |
| $L^2$ (Euclidean) | $\sqrt{\sum_i v_i^2}$ | Distance, length |
| $L^\infty$ | $\max_i |v_i|$ | Worst-case error |

## Matrices

A **matrix** $\mathbf{A} \in \mathbb{R}^{m \times n}$ has $m$ rows and $n$ columns. It represents a linear transformation $\mathbb{R}^n \to \mathbb{R}^m$.

### Matrix Multiplication

$(\mathbf{AB})_{ij} = \sum_k A_{ik} B_{kj}$ — requires inner dimensions to match.

### Transpose

$(\mathbf{A}^T)_{ij} = A_{ji}$ — flips rows and columns.

### Inverse

$\mathbf{A}^{-1}$ exists iff $\mathbf{A}$ is square and $\det(\mathbf{A}) \neq 0$:

$$\mathbf{A}\mathbf{A}^{-1} = \mathbf{I}$$

## Eigenvalues and Eigenvectors

For square $\mathbf{A}$, vector $\mathbf{v} \neq \mathbf{0}$ and scalar $\lambda$ satisfying $\mathbf{A}\mathbf{v} = \lambda\mathbf{v}$ are an **eigenvector** and **eigenvalue** pair.

Eigenvalues are roots of the **characteristic polynomial**:

$$\det(\mathbf{A} - \lambda\mathbf{I}) = 0$$

Eigendecomposition powers many ML algorithms: PCA, spectral clustering, PageRank.

## Principal Component Analysis (PCA)

PCA finds directions of maximum variance in data:

1. Centre the data: $\tilde{\mathbf{X}} = \mathbf{X} - \bar{\mathbf{X}}$
2. Compute covariance matrix: $\mathbf{C} = \frac{1}{n}\tilde{\mathbf{X}}^T\tilde{\mathbf{X}}$
3. Eigendecompose $\mathbf{C} = \mathbf{V}\mathbf{\Lambda}\mathbf{V}^T$
4. Project onto top $k$ eigenvectors: $\mathbf{Z} = \tilde{\mathbf{X}}\mathbf{V}_k$
