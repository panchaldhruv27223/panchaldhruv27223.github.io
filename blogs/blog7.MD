Supervised Learning with Scikit-learn
Dhruv Panchal
Dhruv Panchal
4 min read
·
Aug 31, 2025





Machine learning is often divided into two big families: Supervised and Unsupervised learning. In this blog, we’ll focus on Supervised Learning(Regression), the foundation for most practical machine learning tasks.

Previous Blog: https://dhruv-panchal.medium.com/scikit-learn-essentials-why-to-use-scikit-learn-and-how-to-use-e03e1aca258d

What is Supervised Learning?
In supervised learning:

We teach a model using labeled data.
The dataset contains input features (X) and target labels (y).
The model learns the mapping X → y, and then predicts labels for unseen data.
Examples in real life:
Predicting house prices (Regression).
Classifying emails as spam or not (Classification).
Predicting loan defaults (Classification).
Types of Supervised Learning
1. Classification

Output: Discrete categories.
Example: Will a tumor be benign or malignant?
Algorithms: Logistic Regression, Decision Trees, Random Forests, SVM, KNN.
2. Regression

Regression is a supervised learning technique where the goal is to predict a continuous numerical output given input features.

Output: Continuous values.
Example: Predicting house price in dollars.
Algorithms: Linear Regression, Ridge, Lasso, SVR, Random Forest Regressor.
Workflow of Supervised Learning in Scikit-learn
Scikit-learn follows a clear workflow for supervised learning:

Import a dataset (built-in or external).
Preprocessing Techniques (e.g. Scaling, Encoding, ...).
Split into train and test sets.
Choose a model (classifier/regressor).
Fit the model on training data.
Make predictions on test data.
Evaluate performance using metrics.
Let’s unravel the world of regression step by step using Scikit-learn
Types of Regression in Scikit-learn
1). Linear Regression

Assumes a linear relationship between input X and output y.

Example: Predicting house prices based on size, location, and number of rooms.
from sklearn.linear_model import LinearRegression
model = LinearRegression()
model.fit(X_train, y_train)
y_pred = model. Predict(X_test)
2). Ridge Regression (L2 Regularization)

Adds a penalty on large coefficients to avoid overfitting

from sklearn.linear_model import Ridge
ridge = Ridge(alpha=1.0)
ridge.fit(X_train, y_train)
3). Lasso Regression (L1 Regularization)

Encourages sparsity (some coefficients become exactly zero).

Become a member
Useful for feature selection.

from sklearn.linear_model import Lasso
lasso = Lasso(alpha=0.1)
lasso.fit(X_train, y_train)
4). Polynomial Regression

Extends linear regression by adding polynomial features.

Example: Predicting non-linear relationships (like growth curves).
from sklearn.preprocessing import PolynomialFeatures
from sklearn.pipeline import make_pipeline

poly_model = make_pipeline(PolynomialFeatures(3), LinearRegression())
poly_model.fit(X_train, y_train)
5). Support Vector Regression (SVR)

Based on Support Vector Machines.

Can model complex non-linear relationships using kernels.

from sklearn.svm import SVR
svr = SVR(kernel='rbf', C=100, gamma=0.1, epsilon=0.1)
svr.fit(X_train, y_train)
6). Tree-Based Methods (Decision Trees, Random Forests, Gradient Boosting)

Handle non-linear relationships very well.

Often outperform linear methods on real-world data.

from sklearn.ensemble import RandomForestRegressor
rf = RandomForestRegressor(n_estimators=100, random_state=42)
rf.fit(X_train, y_train)
Evaluation Metrics for Regression
When working with regression problems, measuring how well your model performs is just as important as building the model itself.

Unlike classification, regression deals with predicting continuous values, so it has its own set of evaluation metrics.

1. Mean Absolute Error (MAE)

MAE measures the average absolute difference between the predicted values and actual values.
It gives an idea of how far off predictions are, on average

Easy to interpret.
Treats all errors equally (doesn’t penalize large errors).
from sklearn.metrics import mean_absolute_error

y_true = [3, -0.5, 2, 7]
y_pred = [2.5, 0.0, 2, 8]

mae = mean_absolute_error(y_true, y_pred)
print("Mean Absolute Error (MAE):", mae)
2. Mean Squared Error (MSE)

MSE measures the average squared difference between predicted and actual values.
It penalizes larger errors more heavily (because of squaring).

Useful when large errors are undesirable.
Not as interpretable (since units are squared).
from sklearn.metrics import mean_squared_error

mse = mean_squared_error(y_true, y_pred)
print("Mean Squared Error (MSE):", mse)
3. Root Mean Squared Error (RMSE)

RMSE is simply the square root of MSE.
It brings the error back to the same units as the target variable, making it easier to interpret.

Same units as the target variable.
Still sensitive to outliers.
import numpy as np

rmse = np.sqrt(mse)
print("Root Mean Squared Error (RMSE):", rmse)
4. R² Score (Coefficient of Determination)

R² measures the proportion of variance in the dependent variable that is predictable from the independent variables.

Interpretable: closer to 1 -> better model
Can be misleading if used alone.
from sklearn.metrics import r2_score

r2 = r2_score(y_true, y_pred)
print("R² Score:", r2)
Putting It All Together
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import numpy as np

## Suppose it is true label
y_true = [3, -0.5, 2, 7]  
y_pred = [2.5, 0.0, 2, 8]  ## this is a predicted label

mae = mean_absolute_error(y_true, y_pred)    
mse = mean_squared_error(y_true, y_pred)
rmse = np.sqrt(mse)
r2 = r2_score(y_true, y_pred)

print(f"MAE: {mae}")
print(f"MSE: {mse}")
print(f"RMSE: {rmse}")
print(f"R² Score: {r2}")
I’ve put together a small demo so you can play around with regression on your own.

Dataset Link: https://raw.githubusercontent.com/panchaldhruv27223/datasets_for_ml_-csv-xlsl-/refs/heads/main/kc_house_data.csv

Collab .ipynb: https://colab.research.google.com/drive/1pOrhgfnK7bXOZixZTpSWUDbJSysSmEFh?usp=sharing

Today’s Motivation:

“Every great model starts with a single line of code, and every skill with a single step of practice. Stay consistent, stay curious — because progress in machine learning, like in life, comes from persistence.” -Dhruv Panchal

