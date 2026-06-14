# BLAST Algorithm

## What is BLAST?

**BLAST** (Basic Local Alignment Search Tool) is the most widely used tool for comparing a query sequence against a database to find similar sequences. It uses a heuristic approach to achieve high speed while maintaining sensitivity.

## How BLAST Works

### Step 1 — Seeding

BLAST breaks the query into short overlapping **words** of length $W$ (default: 11 for nucleotides, 3 for proteins). It then finds all words in the database that score above a threshold $T$ when aligned to the query word.

### Step 2 — Extension

Matching word pairs are extended in both directions without gaps (ungapped extension) until the score drops below a threshold. Promising pairs are then extended with gaps using dynamic programming.

### Step 3 — Evaluation

Each alignment receives a **bit score** $S'$ and an **E-value**:

$$E = m \cdot n \cdot e^{-\lambda S'}$$

where $m$ is the query length, $n$ is the database size, and $\lambda$, $K$ are statistical parameters. A lower E-value means a more significant hit.

## Key BLAST Parameters

| Parameter | Default | Meaning |
|-----------|---------|---------|
| Word size ($W$) | 11 (nt) / 3 (aa) | Seed length |
| E-value cutoff | 10 | Max expected hits by chance |
| Gap open penalty | 11 | Cost to open a gap |
| Gap extend penalty | 1 | Cost per gap position |

## BLAST Variants

| Program | Query | Database |
|---------|-------|---------|
| `blastn` | Nucleotide | Nucleotide |
| `blastp` | Protein | Protein |
| `blastx` | Nucleotide (translated) | Protein |
| `tblastn` | Protein | Nucleotide (translated) |
| `tblastx` | Nucleotide (translated) | Nucleotide (translated) |

## Substitution Matrices

For protein BLAST, **BLOSUM62** is the default substitution matrix. It encodes the log-odds probability that two amino acids are aligned by homology rather than by chance, derived from alignments of sequences sharing ~62% identity.
