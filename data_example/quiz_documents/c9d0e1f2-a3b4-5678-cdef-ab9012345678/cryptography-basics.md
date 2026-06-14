# Cryptography Basics

## Symmetric Encryption

Both parties share the **same secret key** for encryption and decryption.

$$C = E_k(P), \qquad P = D_k(C)$$

| Algorithm | Key size | Notes |
|-----------|----------|-------|
| AES-128 | 128 bits | Current standard, fast in hardware |
| AES-256 | 256 bits | Higher security margin |
| ChaCha20 | 256 bits | Fast in software, used in TLS 1.3 |

The main challenge is **key distribution** — how do two parties securely share a key?

## Asymmetric (Public-Key) Encryption

Each party has a **key pair**: a public key (freely shared) and a private key (kept secret).

- **Encryption**: sender uses recipient's *public key*
- **Decryption**: recipient uses their *private key*

### RSA

Security relies on the difficulty of factoring large integers. For primes $p$ and $q$:

$$n = pq, \quad \phi(n) = (p-1)(q-1)$$

Choose $e$ coprime to $\phi(n)$, compute $d \equiv e^{-1} \pmod{\phi(n)}$.

- Public key: $(n, e)$
- Private key: $(n, d)$
- Encrypt: $C = M^e \bmod n$
- Decrypt: $M = C^d \bmod n$

## Diffie-Hellman Key Exchange

Allows two parties to establish a shared secret over a public channel, without transmitting the secret itself. Security relies on the **discrete logarithm problem**.

## Hash Functions

A **cryptographic hash** $H(m)$ maps arbitrary-length input to a fixed-length digest. Properties:

1. **Pre-image resistance**: given $h$, hard to find $m$ with $H(m) = h$
2. **Second pre-image resistance**: given $m$, hard to find $m' \neq m$ with $H(m') = H(m)$
3. **Collision resistance**: hard to find any pair $(m, m')$ with $H(m) = H(m')$

| Algorithm | Output size | Status |
|-----------|------------|--------|
| MD5 | 128 bits | Broken (collisions found) |
| SHA-1 | 160 bits | Deprecated (collisions demonstrated) |
| SHA-256 | 256 bits | Current standard |
| SHA-3 (Keccak) | 256/512 bits | Alternative standard |

## Digital Signatures

Combine hashing and asymmetric cryptography:
1. Signer computes $h = H(m)$ and signs: $\sigma = \text{Sign}_{sk}(h)$
2. Verifier checks: $\text{Verify}_{pk}(h, \sigma) \stackrel{?}{=} \text{true}$

Provides **authentication** (message came from key holder) and **integrity** (message was not altered).
