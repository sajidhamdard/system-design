## **1️⃣ What is TF-IDF?**

**TF-IDF (Term Frequency – Inverse Document Frequency)** is a **statistical measure** used in **information retrieval and text mining** to evaluate how important a word is to a document in a collection (corpus).

* Helps identify **keywords** that are **representative of a document**
* Widely used in **search engines, text ranking, recommendation systems, and NLP tasks**

---

## **2️⃣ Components of TF-IDF**

### **(a) TF – Term Frequency**

* Measures **how often a term appears in a document**.
* Formula (raw count):

[
TF(t, d) = \frac{\text{Number of times term t appears in document d}}{\text{Total number of terms in document d}}
]

* **Example:**
  Document: `"the cat sat on the mat"`
  Term `"cat"` → appears 1 time, total words = 6
  [
  TF(\text{"cat"}) = \frac{1}{6} \approx 0.167
  ]

---

### **(b) IDF – Inverse Document Frequency**

* Measures **how rare or common a term is across all documents**.
* Rare terms are more important than common terms like "the" or "and".

[
IDF(t, D) = \log\frac{N}{1 + DF(t)}
]

Where:

* (N) = total number of documents

* (DF(t)) = number of documents containing term (t)

* Adding 1 in denominator avoids division by zero

* **Example:**

  * Corpus: 1000 documents
  * Term `"cat"` appears in 10 documents
    [
    IDF(\text{"cat"}) = \log\frac{1000}{10} = \log(100) \approx 2
    ]

---

### **(c) TF-IDF Score**

[
\text{TF-IDF}(t, d, D) = TF(t, d) \times IDF(t, D)
]

* Combines **term frequency** and **rarity across corpus**
* High TF-IDF → important and unique term for that document

**Example:**

* TF(`"cat"`) = 0.167
* IDF(`"cat"`) = 2
* TF-IDF(`"cat"`) = 0.167 × 2 ≈ 0.334

---

## **3️⃣ Intuition**

* Words that appear **frequently in a document** but **rarely in other documents** → high TF-IDF → keyword
* Words that appear in **all documents** → low TF-IDF → common, not informative

---

## **4️⃣ Use Cases of TF-IDF**

1. **Search Engines**

   * Rank documents based on query terms
2. **Keyword Extraction**

   * Identify important words from text automatically
3. **Text Classification / NLP**

   * Convert text into numerical vectors for ML algorithms
4. **Document Similarity**

   * Compute cosine similarity between TF-IDF vectors

---

## **5️⃣ Example in Python (for clarity)**

```python
from sklearn.feature_extraction.text import TfidfVectorizer

corpus = [
    "the cat sat on the mat",
    "the dog chased the cat",
    "cats and dogs are friends"
]

vectorizer = TfidfVectorizer()
tfidf_matrix = vectorizer.fit_transform(corpus)
print(vectorizer.get_feature_names_out())
print(tfidf_matrix.toarray())
```

* Each row → document
* Each column → word
* Value → TF-IDF score

---

### **6️⃣ Quick Analogy**

* Imagine **each word is a “coin”**:

  * TF → How often you use that coin in your wallet
  * IDF → How rare that coin is across all wallets
  * TF-IDF → Weighted value showing **importance of coin in your wallet compared to all wallets**

---
