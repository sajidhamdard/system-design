### What is *sharding* in system design?

> **Sharding** is a technique used to horizontally partition data across multiple servers or databases (called **shards**) so that each shard contains only a subset of the total data.

Rather than putting *all* the data in one big database (which can get slow and hard to scale), we **split** it into smaller, more manageable pieces. Each shard handles a portion of the workload.

Think of it like cutting a big cake into slices — each person (or server) gets one slice (shard) to handle.

---

### Why do we shard?

* To **scale horizontally** (add more servers instead of buying bigger ones)
* To improve **performance** (queries run faster when there's less data per shard)
* To reduce **load** on a single server (less chance of bottleneck or failure)

---

### How is sharding used in databases?

Let’s take a simple example — suppose you have a `Users` table with **1 billion users**.

You could **shard** the `Users` table based on `user_id`.
Example sharding strategies:

| **Shard Key**            | **How data is split?**                                              |
| ------------------------ | ------------------------------------------------------------------- |
| **Range based sharding** | Users with ID 1–100M → Shard 1<br>Users with ID 100M–200M → Shard 2 |
| **Hash based sharding**  | `hash(user_id) % N` decides shard                                   |
| **Geo-based sharding**   | Users from India → Shard 1<br>Users from USA → Shard 2              |

---

### Where is sharding used?

* Large scale applications:
  Facebook, Twitter, YouTube — all use sharding to manage massive datasets.

* Distributed databases:
  MongoDB, Cassandra, Elasticsearch — built-in support for sharding.

---

### Trade-offs of sharding (important for interviews)

| **Pros**                                | **Cons**                                                  |
| --------------------------------------- | --------------------------------------------------------- |
| Scales easily (horizontal)              | Complex to implement and maintain                         |
| Faster queries (smaller data per shard) | Cross-shard queries are slow and tricky                   |
| Avoids single point of failure          | Rebalancing shards is hard if data distribution is uneven |
| Reduces contention and lock overhead    | Complex joins and transactions across shards              |

---

### How does the application know which shard to query?

Usually, there is a **shard routing layer** (shard manager or middleware) that takes care of:

* Mapping the request to the correct shard
* Handling retries / failover if a shard is down

---

### In short (crisp definition)

> **Sharding** = Horizontally splitting data across multiple machines, where each machine (shard) contains a **subset** of the data and handles a **subset** of the queries.

---


### **Example 1: SQL Database — Range-based sharding**

You have a **Users** table:
`user_id | name | email`

Let’s shard by `user_id` **range**:

| **Shard**   | **Data**                        |
| ----------- | ------------------------------- |
| **Shard 1** | Users with `user_id` 1 to 1M    |
| **Shard 2** | Users with `user_id` 1M+1 to 2M |

---

**How application works?**

If `user_id = 500000` → Query Shard 1
If `user_id = 1500000` → Query Shard 2

---

### **Example 2: MongoDB — Hash-based sharding**

You have a **Products** collection:
`{ product_id, name, price }`

You shard on `product_id` **using hash**:
`hash(product_id) % 3` → to divide data into **3 shards**

| **Shard**   | **Condition**             |
| ----------- | ------------------------- |
| **Shard 1** | hash(product\_id) % 3 = 0 |
| **Shard 2** | hash(product\_id) % 3 = 1 |
| **Shard 3** | hash(product\_id) % 3 = 2 |

---

**How application works?**

If `product_id = 12345`
→ Compute `hash(12345) % 3`
→ Route query to that shard

---

### **Summary of both examples**

| **Type**    | **How split?**        | **When to use?**                                      |
| ----------- | --------------------- | ----------------------------------------------------- |
| Range-based | Based on value ranges | When data grows linearly (e.g., user IDs, timestamps) |
| Hash-based  | Based on hash % N     | When you want **uniform** distribution                |

---


## ⚙️ What is Sharding?

**Definition:**

> **Sharding** is splitting a database or a dataset into **smaller, independent pieces called shards**, so that each shard holds a subset of the data.

**Goal:**

* Scale **writes and reads horizontally**
* Avoid **single shard overload (hot spots)**

---

## 🔄 What “Add Salt / Time-Bucket” Means

These are **techniques to distribute data evenly across shards** and prevent **hot keys**:

---

### 1️⃣ **Salting**

* **Problem:** Some keys are accessed much more frequently → hot shard
* **Solution:** Add a **random prefix / salt** to the key before sharding

**Example:**

* Original key: `user:123`

* Salted key: `3:user:123`, `7:user:123` (random prefix 0–9)

* When sharding by key hash → salted keys spread across multiple shards → **reduces hot keys**

**Use Case:**

* Redis caching for frequently accessed keys

---

### 2️⃣ **Time-Bucketing**

* **Problem:** Sequential writes can concentrate on a single shard → hot shard
* **Solution:** Partition data **based on time intervals** (time-buckets)

**Example:**

* Logs table → shard by day:

  * `logs_2025_10_10`
  * `logs_2025_10_11`
* Requests are distributed across different shards → prevents **all writes hitting the same shard**

**Use Case:**

* Event logs, metrics, time-series data

---

## ⚡ Why These Techniques Are Needed

* Many NoSQL / distributed databases **hash keys to shards**
* But if your keys are **sequential or skewed** → one shard becomes a **hotspot** → slows down system
* Salting / time-bucketing **evenly distributes load**

---

## 🧩 Analogy

1. **Salting:**

   * Like **adding a random prefix to your mailbox address** → letters are delivered to different postboxes instead of one overloaded box

2. **Time-Bucketing:**

   * Like **sorting letters by day of delivery** → distributes daily mail evenly across mail slots

---

✅ **Key Takeaways**

* Sharding = split data into multiple shards to scale
* Hot keys = some keys get **disproportionately high traffic**
* **Salting:** random prefix to spread hot keys
* **Time-bucketing:** partition by time to avoid sequential-write hotspots
* Both techniques **improve throughput and reduce contention**

---
