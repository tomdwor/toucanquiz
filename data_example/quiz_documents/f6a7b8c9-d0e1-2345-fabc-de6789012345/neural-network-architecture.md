# Neural Network Architecture

## The Neuron

A single artificial neuron computes a weighted sum of its inputs, adds a bias, and applies an **activation function**:

$$z = \sum_{i} w_i x_i + b, \qquad a = \sigma(z)$$

## Activation Functions

| Function | Formula | Range | Use case |
|----------|---------|-------|---------|
| Sigmoid | $\sigma(z) = \frac{1}{1+e^{-z}}$ | $(0, 1)$ | Binary output |
| Tanh | $\tanh(z)$ | $(-1, 1)$ | Hidden layers (historically) |
| ReLU | $\max(0, z)$ | $[0, \infty)$ | Default for deep networks |
| Softmax | $\frac{e^{z_i}}{\sum_j e^{z_j}}$ | $(0, 1)$, sums to 1 | Multiclass output |

## Feedforward Networks

A **fully-connected (dense) layer** connects every neuron in layer $l$ to every neuron in layer $l+1$. A network with $L$ layers computes:

$$\mathbf{a}^{(l)} = \sigma\!\left(\mathbf{W}^{(l)}\mathbf{a}^{(l-1)} + \mathbf{b}^{(l)}\right)$$

## Backpropagation

Training adjusts weights to minimise a **loss function** $\mathcal{L}$ using **gradient descent**:

$$w \leftarrow w - \eta \frac{\partial \mathcal{L}}{\partial w}$$

Gradients are computed via the **chain rule** propagated backwards through layers.

## Convolutional Neural Networks (CNNs)

CNNs use **convolutional layers** that apply learned filters across spatial dimensions. This exploits **translation invariance** — a feature detector useful at one location is useful everywhere.

Key layers:
- **Conv2D** — applies $K$ filters of size $F \times F$
- **MaxPooling** — downsamples by taking the max in each region
- **Flatten + Dense** — final classification head

## Common Architectures

| Architecture | Year | Key Innovation |
|-------------|------|---------------|
| LeNet-5 | 1998 | First practical CNN |
| AlexNet | 2012 | Deep CNN, GPU training, ReLU |
| ResNet | 2015 | Residual/skip connections |
| Transformer | 2017 | Self-attention, no recurrence |
