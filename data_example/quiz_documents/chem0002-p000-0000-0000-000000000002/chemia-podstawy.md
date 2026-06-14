# Podstawy Chemii Organicznej

## Notacja chemiczna (mhchem)

Wzory chemiczne używają rozszerzenia **mhchem** do KaTeX:
- Związki: $\ce{H2O}$, $\ce{CO2}$, $\ce{NaCl}$, $\ce{H2SO4}$
- Jony: $\ce{Na+}$, $\ce{Cl-}$, $\ce{SO4^{2-}}$
- Reakcje: $\ce{A + B -> C}$, $\ce{A <=> B}$

### Popularne wzory

| Związek | Wzór | Typ wiązania |
|---------|------|--------------|
| Woda | $\ce{H2O}$ | Kowalencyjne |
| Dwutlenek węgla | $\ce{CO2}$ | Kowalencyjne |
| Chlorek sodu | $\ce{NaCl}$ | Jonowe |
| Kwas siarkowy | $\ce{H2SO4}$ | Kowalencyjne |
| Etanol | $\ce{C2H5OH}$ | Kowalencyjne |

---

## Diagramy cząsteczkowe (SMILES)

Diagramy 2D cząsteczek używają notacji **SMILES** w blokach kodu.

### Metan

```smiles
C
```

$\ce{CH4}$ — najprostszy węglowodór.

### Etan

```smiles
CC
```

$\ce{C2H6}$ — dwa atomy węgla połączone wiązaniem pojedynczym.

### Etanol

```smiles
CCO
```

$\ce{C2H5OH}$ — dwa węgle i tlen z grupą $\ce{-OH}$.

### Benzen

```smiles
c1ccccc1
```

$\ce{C6H6}$ — najprostszy węglowodór aromatyczny (pierścień aromatyczny).

### Kwas octowy

```smiles
CC(=O)O
```

$\ce{CH3COOH}$ — zawiera grupę karboksylową $\ce{-COOH}$.

---

## Węglowodory

Węglowodory to związki zbudowane wyłącznie z atomów węgla i wodoru.

### Alkany (nasycone)

Wzór ogólny: $\ce{C_nH_{2n+2}}$

| Nazwa | Wzór | SMILES |
|-------|------|--------|
| Metan | $\ce{CH4}$ | `C` |
| Etan | $\ce{C2H6}$ | `CC` |
| Propan | $\ce{C3H8}$ | `CCC` |
| Butan | $\ce{C4H10}$ | `CCCC` |

### Węglowodory aromatyczne

Benzen i pochodne — zawierają pierścień aromatyczny z 6 elektronami $\pi$:

$$\ce{C6H6}$$

---

## Grupy funkcyjne

| Grupa | Wzór | Klasa związków | Przykład |
|-------|------|---------------|---------|
| Hydroksylowa | $\ce{-OH}$ | Alkohole | $\ce{C2H5OH}$ |
| Karboksylowa | $\ce{-COOH}$ | Kwasy karboksylowe | $\ce{CH3COOH}$ |
| Karbonylowa (keton) | $\ce{C=O}$ | Ketony | Aceton `CC(=O)C` |
| Aldehydowa | $\ce{-CHO}$ | Aldehydy | Formaldehyd `C=O` |
| Aminowa | $\ce{-NH2}$ | Aminy | Metyloamina `CN` |

---

## Alkohole

Alkohole zawierają grupę **hydroksylową** ($\ce{-OH}$) przyłączoną do węgla nienasyconego:

| Nazwa | Wzór | Zastosowanie |
|-------|------|-------------|
| Metanol | $\ce{CH3OH}$ | Rozpuszczalnik (toksyczny) |
| Etanol | $\ce{C2H5OH}$ | Napoje alkoholowe, dezynfekcja |
| Propanol | $\ce{C3H7OH}$ | Dezodoranty, kosmetyki |
| Glicerol | $\ce{C3H8O3}$ | Mydła, kosmetyki |

---

## Kwasy i zasady

| Właściwość | Kwas | Zasada |
|------------|------|--------|
| pH | < 7 | > 7 |
| Oddaje | $\ce{H+}$ | $\ce{OH-}$ |
| Przykład | $\ce{HCl}$, $\ce{H2SO4}$ | $\ce{NaOH}$, $\ce{Ca(OH)2}$ |

### Reakcja neutralizacji

Kwas + zasada → sól + woda:

$$\ce{HCl + NaOH -> NaCl + H2O}$$

$$\ce{H2SO4 + 2NaOH -> Na2SO4 + 2H2O}$$

### Autojonizacja wody

$$\ce{H2O <=> H+ + OH-}$$

Przy 25°C: $[\ce{H+}] = [\ce{OH-}] = 10^{-7}$ mol/L, pH = 7 (obojętne).
