## ✅ What is **SLA (Service Level Agreement)?**

An **SLA** is a **formal agreement** between a **service provider** and a **client/user** that defines **expected performance levels** of a service.

---

### 📋 SLA includes key metrics like:

| Metric                    | Description                                                                         |
| ------------------------- | ----------------------------------------------------------------------------------- |
| **Availability**          | % of time the service must be operational (e.g., 99.9% uptime per year)             |
| **Latency**               | How fast a system responds (e.g., 99% of requests should return in <100ms)          |
| **Durability**            | Probability of **not losing data** over time (e.g., AWS S3 gives 11 9’s durability) |
| **Throughput**            | How much data the service can handle (e.g., requests per second)                    |
| **Error Rate**            | Max acceptable errors (e.g., <0.01% failed requests)                                |
| **Support/Response Time** | Time taken to respond to tickets/issues                                             |

---

#### 🔐 **Durability - “11 nines” (99.999999999%)**

* This is **not availability**, but **data durability** — how safe your data is.
* "11 nines" means **only a 0.0000000001% chance** of data loss.
* For example, **AWS S3** claims this level of durability for stored objects.

---

#### ⚡ **Latency Percentiles**

* You can use SLA-like terms for **latency** too.
* For example: **“three nines” latency of 100ms** means that **99.9% of requests** are served within 100ms.
* This is called a **latency percentile** metric.

---

#### ⏱️ **Availability Misconceptions**

The SLA number (like 99%) might sound good, but here’s how it converts to actual **downtime per year**:

| Availability | Downtime per Year  |
| ------------ | ------------------ |
| **99%**      | \~3.65 **days**    |
| **99.9%**    | \~8.76 **hours**   |
| **99.99%**   | \~52.6 **minutes** |
| **99.999%**  | \~5.26 **minutes** |
| **99.9999%** | \~31.5 **seconds** |

So even 99% might **not** be acceptable for systems needing **high availability** (e.g., banking, healthcare, etc.).

---

### 🧠 Interview Summary Answer

> “SLA stands for Service Level Agreement and defines the expected performance of a system, including availability, latency, and durability. For instance, an SLA of 99.999% availability means only 5 minutes of downtime per year. Similarly, S3 offers 11 nines of durability (99.999999999%) meaning near-zero risk of data loss. These SLAs are crucial in designing reliable, fault-tolerant distributed systems.”
