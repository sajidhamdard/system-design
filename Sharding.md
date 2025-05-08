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
