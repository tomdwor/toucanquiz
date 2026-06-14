# Biological Sequence Formats

## FASTA

The most common format for storing nucleotide or protein sequences. Each record has a header line starting with `>` followed by the sequence on subsequent lines.

```
>sp|P68871|HBB_HUMAN Hemoglobin subunit beta OS=Homo sapiens
MVHLTPEEKSAVTALWGKVNVDEVGGEALGRLLVVYPWTQRFFESFGDLSTPDAVMGNPK
VKAHGKKVLGAFSDGLAHLDNLKGTFATLSELHCDKLHVDPENFRLLGNVLVCVLAHHFG
```

### Key rules
- Header line begins with `>`
- Sequence can span multiple lines
- No limit on sequence length
- Whitespace in the sequence is ignored by most parsers

## FASTQ

Used for sequencing reads. Extends FASTA with **quality scores** for each base.

```
@SEQ_ID
GATTTGGGGTTCAAAGCAGTATCGATCAAATAGTAAATCC
+
!''*((((***+))%%%++)(%%%%).1***-+*''))**
```

The quality line encodes Phred scores: $Q = -10 \log_{10} P_e$, where $P_e$ is the probability of a base-calling error.

| Phred Score (Q) | Error Probability | ASCII character |
|-----------------|-------------------|-----------------|
| 10 | 1 in 10 (90% accuracy) | `+` |
| 20 | 1 in 100 (99% accuracy) | `5` |
| 30 | 1 in 1000 (99.9% accuracy) | `?` |
| 40 | 1 in 10000 (99.99% accuracy) | `I` |

## GenBank / EMBL

Rich annotated formats used in public databases. They include metadata (organism, gene name, publication references) alongside the sequence and feature annotations (CDS, exons, promoters).

```
LOCUS       NC_000913    4641652 bp    DNA     circular BCT
DEFINITION  Escherichia coli str. K-12 substr. MG1655, complete genome.
ACCESSION   NC_000913
...
FEATURES             Location/Qualifiers
     gene            190..255
                     /gene="thrL"
```

## SAM / BAM

**SAM** (Sequence Alignment Map) stores read alignments against a reference genome. **BAM** is the binary, compressed equivalent.

Each alignment line has 11 mandatory fields including chromosome, position, CIGAR string (describing matches and gaps), and the read sequence.
