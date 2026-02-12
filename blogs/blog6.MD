Scikit-learn Essentials: Why to use Scikit-Learn and How to use?
Dhruv Panchal
Dhruv Panchal
5 min read
·
Aug 31, 2025





Your First Steps with Scikit-learn

When you start with Machine Learning (ML) in Python, you quickly notice a problem:

NumPy is great for arrays,
Pandas is great for tabular data,
Matplotlib is great for plotting…
But when you want to train a model, scale features, encode categories, or evaluate performance, do you write everything from scratch?

That’s where Scikit-learn comes in.

What is Scikit-learn?
Scikit-learn (also known as sklearn) is an open-source machine learning library for Python.

It provides:

Ready-to-use ML algorithms (classification, regression, clustering, etc.).
Tools for data preprocessing (scaling, encoding, imputing missing values).
Functions for model evaluation (accuracy, confusion matrix, cross-validation).
Utilities to build pipelines (so preprocessing + training = one workflow).
Why the name “Scikit-learn”?
The name comes from SciPy + Toolkit → “scikit”.

SciPy is the scientific computing ecosystem in Python.
Scikit-learn started as a “toolkit” for ML built on top of NumPy, SciPy, and Matplotlib.
Features of Scikit-learn
Preprocessing: Handle missing values, scale features, encode categories.
Supervised learning: Logistic regression, SVM, Random Forest, Gradient Boosting.
Unsupervised learning: Clustering (KMeans, DBSCAN), Dimensionality Reduction (PCA).
Model selection: Cross-validation, hyperparameter tuning.
Pipelines: Automate end-to-end workflows.
Utilities: Train-test split, feature extraction, metrics.
The Consistent API in Scikit-learn
Scikit-learn treats everything, whether it’s a model (estimator), a data transformer, or a pipeline, in a unified way.
This means: once you learn .fit, .predict, .score, .transform, you can use any algorithm in the library.

1). .fit(x_train, y_train) -> Learning from Data

The fit method is where your estimator (model or transformer) learns from the data.

For models (like Logistic Regression, Random Forest), it means finding the best parameters or weights.
For transformers (like StandardScaler, OneHotEncoder), it means computing statistics (mean, variance, categories) needed to later transform the data.
from sklearn.linear_model import LogisticRegression

model = LogisticRegression()
model.fit(X_train, y_train)   # learns parameters from training data
from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()
scaler.fit(X_train)   # learns mean & std of features
2). .predict(x_test) -> Making Predictions

Once a model is fitted, you can use it to predict outputs on new, unseen data.

Available only for predictive models (not for transformers).
Input: features X. Output: labels or values.
y_pred = model.predict(X_test)
print(y_pred[:5])  # predicted labels for first 5 samples
3). .score(X_test, Y_test) -> Evaluating Performance

Scikit-learn makes quick evaluation super convenient with .score

For classifiers, it returns accuracy by default.
For regressors, it returns the R² score by default.
Press enter or click to view image in full size

https://inria.github.io/scikit-learn-mooc/python_scripts/02_numerical_pipeline_introduction.html
accuracy = model.score(X_test, y_test)
print("Accuracy:", accuracy)
4). .transform(x_test) -> Transforming Data

Transformers in Scikit-learn don’t predict labels -instead, they transform the input data into a new representation.

Scalers -> Standardize/normalize values.
Encoders -> Convert categories into numbers.
PCA -> Reduce dimensionality.
X_scaled = scaler.transform(X_test)
print(X_scaled[:5])  # now features are standardized
5). .fit_transform(X_train) -> Fit + Transform in One Step

A handy shortcut for transformers: fit the data and immediately transform it.
X_train_scaled = scaler.fit_transform(X_train)
Data Preprocessing with Scikit-learn
Before going deep into a Preprocessing let’s first see Why Preprocessing Matters -
Raw data is messy. In real-world machine learning projects, you’ll rarely get a perfectly clean dataset. Instead, you’ll face:

Missing values.
Categorical (text) variables that models can’t handle directly.
Features on different scales (age in years vs. income in lakhs).
If you feed this raw data straight into a model, performance will suffer. That’s why data preprocessing is the foundation of any ML pipeline.

Become a member
Scikit-learn makes preprocessing simple and consistent with its API. Let’s explore the key steps.

-Step 1: Loading a Dataset

We’ll use the Titanic dataset (a classic for preprocessing practice).

import seaborn as sns
import pandas as pd

# Load Titanic dataset
df = sns.load_dataset("titanic")

# Select a few columns
df = df[["survived", "pclass", "sex", "age", "fare", "embarked"]]
print(df.head())
-Step 2: Handling Missing Values

Missing values can break your model training.

Scikit-learn provides the simple imputer to fill them with:

Mean/median (for numerical columns).
Most frequent value (for categorical columns).
Constant (custom fill).
from sklearn.impute import SimpleImputer

# Separate features and target
X = df.drop("survived", axis=1)
y = df["survived"]

# Impute age with mean
num_imputer = SimpleImputer(strategy="mean")
X["age"] = num_imputer.fit_transform(X[["age"]])

# Impute embarked with most frequent value
cat_imputer = SimpleImputer(strategy="most_frequent")
X["embarked"] = cat_imputer.fit_transform(X[["embarked"]])

print(X.isnull().sum())  # check if missing values are handled
-Step 3: Encoding Categorical Variables

ML models work with numbers, not text.

So we need to convert categories like “Male”, “Female”, “C”, “Q”, “S” into numeric form.

But not all encodings are the same.
The encoding you choose can affect model performance, interpretability, and efficiency.

Let’s explore few encoding techniques that are widely used in this ML Era

Label Encoding
One Hot Encoding
Ordinal Encoding
Label Encoding

What it does: Converts each unique category into an integer.

“Male” — 0, “Female” — 1

“Q” — 0, “S” — 1, “C” — 2

It is good for: Ordinal variables (where categories have natural order, like Low < Medium < High)

Not best fit for: Nominal variables (no natural order), because the model may think 2 > 1 > 0 has meaning.

from sklearn.preprocessing import LabelEncoder

le = LabelEncoder()
df["sex_encoded"] = le.fit_transform(df["sex"])
print(df[["sex", "sex_encoded"]].head())
One-Hot Encoding

What it does: Creates a new binary column for each category.

"sex" with values ["male", "female"] → sex_male, sex_female.
"embarked" with values ["C", "Q", "S"] → 3 new columns.
Good for: Nominal variables (no order).
Bad for: High cardinality features (hundreds/thousands of categories → too many columns).

from sklearn.preprocessing import OneHotEncoder
import pandas as pd

encoder = OneHotEncoder(sparse=False, drop="first")  
encoded = encoder.fit_transform(df[["embarked"]])

encoded_df = pd.DataFrame(encoded, columns=encoder.get_feature_names_out(["embarked"]))
print(encoded_df.head())
Ordinal Encoding

What it does: Similar to Label Encoding, but you define the order.

Example: "Low" → 1, "Medium" → 2, "High" → 3

Good for: Ordered categories where numeric meaning matters (education level, risk categories).
Bad for: Unordered categories.

-Step 4: Feature Scaling

Features on very different scales can confuse many models (especially those based on distance like KNN, or gradient-based methods like Logistic Regression, SVM).

StandardScaler → Transforms features to mean = 0, std = 1.
MinMaxScaler → Scales features to range [0, 1].
from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

print(X_scaled[:5])
-Step 5: Train-Test Split

Before modeling, we split data into training and testing sets using train_test_split.

from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(
    X_scaled, y, test_size=0.2, random_state=42
)

print("Train shape:", X_train.shape)
print("Test shape:", X_test.shape)
-Step 6: Putting It All Together with Pipelines

Instead of doing these steps separately, we can use Scikit-learn’s Pipeline + ColumnTransformer to automate preprocessing

from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer

num_features = ["age", "fare", "pclass"]
cat_features = ["sex", "embarked"]

# Define numeric and categorical transformers
num_transformer = Pipeline(steps=[
    ("imputer", SimpleImputer(strategy="mean")),
    ("scaler", StandardScaler())
])

cat_transformer = Pipeline(steps=[
    ("imputer", SimpleImputer(strategy="most_frequent")),
    ("encoder", OneHotEncoder(drop="first"))
])

# Combine with ColumnTransformer
preprocessor = ColumnTransformer(
    transformers=[
        ("num", num_transformer, num_features),
        ("cat", cat_transformer, cat_features)
    ]
)

X_processed = preprocessor.fit_transform(df.drop("survived", axis=1))
print(X_processed[:5])
That’s all for this blog, read and try.

In the next blog, we’ll dive into Supervised Learning with Scikit-learn — training classifiers and regressors, and evaluating their performance with metrics.

The beauty of Scikit-learn lies in its simplicity. By standardizing the API across models, transformers, and pipelines, it allows us to focus more on ideas and less on syntax.

