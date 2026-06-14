# Chemistry Basics

## Chemical Notation (mhchem)

Chemical formulas use the **mhchem** extension for KaTeX, enabling notation like:
- Compounds: $\ce{H2O}$, $\ce{CO2}$, $\ce{NaCl}$, $\ce{H2SO4}$
- Ions: $\ce{Na+}$, $\ce{Cl-}$, $\ce{SO4^{2-}}$
- Isotopes: $\ce{^{14}C}$, $\ce{^{235}U}$
- Reactions: $\ce{A + B -> C}$, $\ce{A <=> B}$

### Common Compounds

| Compound | Formula | Type |
|----------|---------|------|
| Water | $\ce{H2O}$ | Covalent |
| Carbon dioxide | $\ce{CO2}$ | Covalent |
| Sodium chloride | $\ce{NaCl}$ | Ionic |
| Sulfuric acid | $\ce{H2SO4}$ | Covalent |
| Ethanol | $\ce{C2H5OH}$ | Covalent |
| Ammonia | $\ce{NH3}$ | Covalent |

### Balancing Equations

The combustion of hydrogen:

$$\ce{2H2 + O2 -> 2H2O}$$

The combustion of methane:

$$\ce{CH4 + 2O2 -> CO2 + 2H2O}$$

The Haber process (ammonia synthesis):

$$\ce{N2 + 3H2 <=> 2NH3}$$

---

## Molecular Structures (SMILES)

2D molecular diagrams use **SMILES** (Simplified Molecular Input Line Entry System) notation in fenced code blocks.

### Water

```smiles
O
```

$\ce{H2O}$ — two implicit hydrogens fill the two remaining bonds on oxygen.

### Methane

```smiles
C
```

$\ce{CH4}$ — four implicit hydrogens fill the four bonds on carbon.

### Ethanol

```smiles
CCO
```

$\ce{C2H5OH}$ — two carbons followed by an oxygen atom (hydroxyl group).

### Benzene

```smiles
c1ccccc1
```

$\ce{C6H6}$ — aromatic ring (lowercase `c` = aromatic carbon). Benzene is the simplest aromatic hydrocarbon.

### Aspirin (Acetylsalicylic acid)

```smiles
CC(=O)Oc1ccccc1C(=O)O
```

$\ce{C9H8O4}$ — contains a benzene ring, an ester group, and a carboxylic acid group.

---

## Types of Chemical Bonds

| Bond type | How it forms | Example |
|-----------|-------------|---------|
| Ionic | Electron transfer (metal → non-metal) | $\ce{NaCl}$, $\ce{MgO}$ |
| Covalent | Electron sharing | $\ce{H2O}$, $\ce{CO2}$ |
| Hydrogen | Attraction to δ+ hydrogen | Water, DNA base pairs |
| Metallic | Delocalized electron sea | $\ce{Fe}$, $\ce{Cu}$ |

Ionic bond formation:

$$\ce{Na + Cl -> Na+ + Cl- -> NaCl}$$

---

## Acids and Bases

| Property | Acid | Base |
|----------|------|------|
| pH | < 7 | > 7 |
| $\ce{H+}$ ions | Releases | Accepts |
| Example | $\ce{HCl}$, $\ce{H2SO4}$ | $\ce{NaOH}$, $\ce{NH3}$ |

Water autoionization:

$$\ce{H2O <=> H+ + OH-}$$

Neutralization:

$$\ce{HCl + NaOH -> NaCl + H2O}$$

---

## Noble Gases (Group 18)

Noble gases have a completely filled outer electron shell — they are chemically inert under normal conditions:

| Element | Symbol | Atomic number |
|---------|--------|---------------|
| Helium | $\ce{He}$ | 2 |
| Neon | $\ce{Ne}$ | 10 |
| Argon | $\ce{Ar}$ | 18 |
| Krypton | $\ce{Kr}$ | 36 |
| Xenon | $\ce{Xe}$ | 54 |
| Radon | $\ce{Rn}$ | 86 |

---

## Functional Groups in Organic Chemistry

| Group | Structure | Name | Example |
|-------|-----------|------|---------|
| $\ce{-OH}$ | Hydroxyl | Alcohols | Ethanol (`CCO`) |
| $\ce{-COOH}$ | Carboxyl | Carboxylic acids | Acetic acid (`CC(=O)O`) |
| $\ce{-CHO}$ | Aldehyde | Aldehydes | Formaldehyde (`C=O`) |
| $\ce{-C=O}$ | Ketone | Ketones | Acetone (`CC(=O)C`) |
| $\ce{-NH2}$ | Amino | Amines | Methylamine (`CN`) |
| $\ce{-COOR}$ | Ester | Esters | Methyl acetate (`COC(=O)C`) |
