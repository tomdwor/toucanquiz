# Model Evaluation

## Classification Metrics

Given predictions and true labels, a **confusion matrix** summarises outcomes:

|  | Predicted Positive | Predicted Negative |
|--|-------------------|-------------------|
| **Actual Positive** | TP (True Positive) | FN (False Negative) |
| **Actual Negative** | FP (False Positive) | TN (True Negative) |

### Derived metrics

$$\text{Accuracy} = \frac{TP + TN}{TP + TN + FP + FN}$$

$$\text{Precision} = \frac{TP}{TP + FP}$$

$$\text{Recall} = \frac{TP}{TP + FN}$$

$$F_1 = 2 \cdot \frac{\text{Precision} \times \text{Recall}}{\text{Precision} + \text{Recall}}$$

Use **precision** when false positives are costly (e.g. spam filter). Use **recall** when false negatives are costly (e.g. cancer screening).

## ROC Curve and AUC

The **ROC curve** plots True Positive Rate vs. False Positive Rate at varying classification thresholds. **AUC** (Area Under the Curve) summarises performance in a single number — a perfect classifier has AUC = 1.0, random guessing gives AUC = 0.5.

## Regression Metrics

| Metric | Formula | Notes |
|--------|---------|-------|
| MSE | $\frac{1}{n}\sum(y_i - \hat{y}_i)^2$ | Penalises large errors heavily |
| RMSE | $\sqrt{\text{MSE}}$ | Same units as target |
| MAE | $\frac{1}{n}\sum|y_i - \hat{y}_i|$ | Robust to outliers |
| $R^2$ | $1 - \frac{\text{SS}_{res}}{\text{SS}_{tot}}$ | Proportion of variance explained |

## Cross-Validation

**$k$-fold cross-validation** splits data into $k$ folds. The model trains on $k-1$ folds and validates on the remaining one, rotating until every fold has been the validation set. The reported metric is the mean across all $k$ runs.

```python
from sklearn.model_selection import cross_val_score
from sklearn.linear_model import LogisticRegression

scores = cross_val_score(LogisticRegression(), X, y, cv=5, scoring='f1')
print(f"Mean F1: {scores.mean():.3f} ± {scores.std():.3f}")
```
