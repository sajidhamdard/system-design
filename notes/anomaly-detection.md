## ⚙️ What is Anomaly Detection?

**Definition:**

> **Anomaly Detection** is the process of identifying **unusual patterns, behaviors, or data points** that **do not conform to expected behavior**.

**Goal:**

* Detect **fraud, errors, security threats, or system failures** early.

---

## 🔄 Types of Anomalies

1. **Point Anomalies**

   * Single data point deviates significantly from the rest
   * Example: A sudden spike in CPU usage from 10% → 95%

2. **Contextual Anomalies**

   * A data point is anomalous **in a specific context**
   * Example: 30°C in winter may be abnormal, but 30°C in summer is normal

3. **Collective Anomalies**

   * A **sequence of data points** is anomalous, even if individual points look normal
   * Example: Unusual sequence of API calls indicating a DDoS attack

---

## 🔧 Techniques for Anomaly Detection

### 1️⃣ **Statistical Methods**

* Model normal behavior → detect deviations using metrics like mean, standard deviation, or z-score
* Example: `if value > mean + 3*std → anomaly`

### 2️⃣ **Machine Learning Methods**

| Method          | How it Works                               | Use Case                             |
| --------------- | ------------------------------------------ | ------------------------------------ |
| Supervised      | Train on labeled normal & anomaly data     | Fraud detection, intrusion detection |
| Unsupervised    | Learn normal patterns, detect deviations   | Network anomalies, server logs       |
| Semi-supervised | Train only on normal data, flag deviations | Rare-event detection                 |

**Examples:** Isolation Forest, One-Class SVM, Autoencoders

### 3️⃣ **Rule-Based Methods**

* Predefined thresholds or patterns trigger alerts
* Example: `CPU > 90% for 5 minutes → alert`

### 4️⃣ **Time-Series Methods**

* Detect anomalies over temporal data
* Techniques: ARIMA, LSTM, Prophet
* Example: Monitoring website traffic for unusual spikes

---

## ⚡ Applications

| Domain     | Example                                        |
| ---------- | ---------------------------------------------- |
| Security   | Intrusion detection, malware, suspicious login |
| Finance    | Credit card fraud, unusual transactions        |
| Operations | Server CPU spikes, application errors          |
| IoT        | Sensor failures, abnormal device behavior      |
| Healthcare | Vital signs outside safe range                 |

---

## 🧩 Analogy

* Normal behavior = **traffic flow on a highway**
* Anomaly = **a car driving in the wrong direction** or **sudden traffic spike**

---

## ✅ Key Takeaways

1. **Anomaly detection = identifying unusual patterns in data**
2. Types: **point, contextual, collective**
3. Techniques: **statistical, ML-based, rule-based, time-series**
4. Widely used in **security, finance, operations, IoT, healthcare**
5. Choice of method depends on **data type, labeling, and context**

---
