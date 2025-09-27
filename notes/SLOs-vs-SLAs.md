# **📊 SLOs vs SLAs**

These terms are **closely related** but serve different purposes in **service reliability and contracts**.

---

## **1️⃣ SLA – Service Level Agreement**

**Definition:**

> SLA is a **formal contract** between a service provider and a customer that defines the **expected level of service**.

**Key Points:**

* Legal/business contract.
* Specifies metrics like uptime, response time, support availability.
* Often includes **penalties** if not met.

**Example:**

* Cloud provider SLA: “99.9% uptime per month. If below, customer gets 10% credit.”

**Formula for uptime SLA:**

```
Uptime SLA = (Total Time – Downtime) / Total Time * 100%
```

---

## **2️⃣ SLO – Service Level Objective**

**Definition:**

> SLO is an **internal target or goal** for the service provider to meet the SLA.

**Key Points:**

* Focused on **specific measurable metrics**.
* Helps **track and maintain SLA compliance**.
* Usually **internal to teams**, not a contract.

**Example:**

* API service SLO: “99.95% of requests respond within 200ms per week.”
* Helps operations team stay within SLA targets.

---

## **3️⃣ Relationship Between SLA & SLO**

```
SLA (Contract) → defines customer-facing expectation
SLO (Objective) → defines internal target to meet SLA
```

* **SLOs** are like checkpoints to ensure you meet the SLA.
* Example:

| Component        | SLA (Customer-facing) | SLO (Internal Target) |
| ---------------- | --------------------- | --------------------- |
| API Availability | 99.9% uptime/month    | 99.95% uptime/week    |
| Response Time    | 200ms per request     | 190ms 95th percentile |
| Error Rate       | <1%                   | <0.8%                 |

---

## **4️⃣ Benefits**

* **SLA:** Protects customers, sets expectations, defines recourse.
* **SLO:** Helps engineering teams **monitor, improve, and prevent SLA violations**.
* **Together:** Drive **reliability and accountability** in services.

---

💡 **Analogy:**

* SLA = “Doctor promises patient a 99% recovery rate.”
* SLO = “Doctor aims to give each patient daily checkups and proper medication to achieve 99% recovery.”

---
