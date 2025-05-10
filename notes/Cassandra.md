### **What is Cassandra?**

> **Apache Cassandra** is a **distributed NoSQL database** designed to handle **large amounts of data** across **many servers** with **high availability** and **no single point of failure**.

In short —
It is a **highly scalable**, **fault-tolerant**, **distributed database** that is good at **handling huge writes and reads**, especially when the system cannot afford downtime.

---

### Why do people use Cassandra?

| **Reason**                     | **What it means**                                                   |
| ------------------------------ | ------------------------------------------------------------------- |
| **Scales horizontally**        | You can add more machines easily, and it automatically spreads data |
| **No single point of failure** | Even if some machines fail, database keeps running                  |
| **High write performance**     | Handles massive incoming data (IoT, logs, analytics, etc.)          |
| **Distributed by default**     | Data is automatically replicated to multiple nodes                  |

---

### Where is Cassandra used?

* Applications with **huge datasets**
  (e.g., Netflix, Facebook, Instagram, Uber)

* Use cases like:

  * Logging and monitoring systems
  * Recommendation engines
  * Time-series data (IoT sensors)
  * Real-time analytics

---

### How is Cassandra different from SQL DB?

| **Cassandra (NoSQL)**               | **SQL DB (like MySQL)**                   |
| ----------------------------------- | ----------------------------------------- |
| Schema-less (flexible columns)      | Fixed schema (tables with strict columns) |
| No JOINs                            | Supports JOINs                            |
| Horizontally scalable (add servers) | Vertical scaling (bigger server)          |
| Optimized for writes                | Balanced reads + writes                   |
| Tunable consistency                 | Strong consistency                        |

---

### Tiny Example (what data looks like)

```sql
CREATE TABLE users (
    user_id UUID PRIMARY KEY,
    name text,
    email text
);
```

In Cassandra, each **row** is identified by a **primary key**, and data is **distributed** across nodes based on the key.

---

### In short (crisp)

> **Cassandra** is a **NoSQL distributed database** that handles **big, fast-growing data** with **high availability** and **no downtime**, by **spreading data automatically** across many machines.

---

### **If Cassandra is so good… why not just always use Cassandra instead of MongoDB?**

→ Because **Cassandra and MongoDB solve slightly different problems** and have **different trade-offs**.

Here’s a clean comparison —

| **Feature**               | **Cassandra**                                                                          | **MongoDB**                                                       |
| ------------------------- | -------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| **Best for**              | Huge write-heavy workloads (logs, metrics, IoT, time-series)                           | Flexible schema apps, general-purpose apps (CMS, product catalog) |
| **Data model**            | Wide-column store (table with flexible columns per row)                                | Document store (JSON-like documents)                              |
| **Query model**           | Simple key-value + range queries (optimized for known queries)                         | Rich queries (filters, aggregation, secondary indexes)            |
| **Joins?**                | No joins                                                                               | No joins, but supports embedded documents (denormalized data)     |
| **Consistency**           | Tunable (AP model in CAP theorem — highly available, eventually consistent by default) | Tunable (default is strong consistency for single document)       |
| **Ease of use**           | Complex data model (you need to design carefully up front)                             | Easy to get started (store documents as-is, flexible schema)      |
| **Scaling**               | Designed from day 1 for distributed, massive scaling                                   | Sharding available but not as seamless as Cassandra               |
| **Community / Ecosystem** | Smaller developer ecosystem, more infra-focused                                        | Huge developer ecosystem, rich tooling (charts, queries, etc.)    |

---

### **In short:**

* **Use Cassandra** → If you have **huge writes**, predictable access patterns, need **scale + uptime**, and can tolerate **eventual consistency** (analytics, metrics, IoT, etc.)
* **Use MongoDB** → If you want **flexibility**, rich queries, document-like data, moderate scale, **developer-friendly**, and can live with **slightly less write throughput**

---

### **Real world analogy**

| **Cassandra**                                                                              | **MongoDB**                                                                  |
| ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| Like a **race car** — built for **speed and scale**, but harder to drive and less flexible | Like an **SUV** — easier to drive, more flexible, works for general purposes |

---

### Final Thought (Interview answer tip)

> **There is no one-size-fits-all database.**
> Cassandra and MongoDB have **different strengths**, so we choose based on **use case** — not hype.

---

### **Quick recap: What is CAP theorem?**

> In distributed systems, you can only guarantee **2 out of 3** at a time:

| **C**                                        | **A**                              | **P**                                                                              |
| -------------------------------------------- | ---------------------------------- | ---------------------------------------------------------------------------------- |
| **Consistency**                              | **Availability**                   | **Partition Tolerance**                                                            |
| All nodes see the same data at the same time | System is always up and responsive | System continues to work even if network is split (nodes can't talk to each other) |

In **distributed systems**, **Partition Tolerance (P)** is a must (networks *can* fail).
So systems choose between:

* **CP** (Consistency + Partition tolerance)
* **AP** (Availability + Partition tolerance)

---

### **Cassandra vs MongoDB in CAP**

| **Database**                 | **CAP Choice**                              | **What it means in practice?**                                                                 |
| ---------------------------- | ------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| **Cassandra**                | **AP** (Availability + Partition Tolerance) | Always available, but data **might be stale (eventually consistent)** during network partition |
| **MongoDB (default config)** | **CP** (Consistency + Partition Tolerance)  | Always consistent, but **might reject requests** (less available) during partition             |

---

### **But wait! Both are tunable**

| **Cassandra** | You can **tune** consistency level:<br> `ONE`, `QUORUM`, `ALL` (You control trade-off per query)                                                                  |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **MongoDB**   | **Replica sets** ensure strong consistency (single document writes are consistent).<br> You can also **tune read/write concerns** for more availability if needed |

---

### **Simple example**

* **Cassandra AP**
  Even if 1 node can't talk to others, it still accepts writes → syncs later → data might be stale briefly

* **MongoDB CP**
  If a primary node is down or partitioned, it **blocks writes** until a new primary is elected → no stale data, but some downtime

---

### **In short**

| **Database** | **Default CAP stance** | **Tunable?**             | **Good for**                                                             |
| ------------ | ---------------------- | ------------------------ | ------------------------------------------------------------------------ |
| Cassandra    | AP                     | Yes (per-query)          | Massive writes, uptime critical (logs, IoT)                              |
| MongoDB      | CP                     | Yes (replica set tuning) | General apps where consistency is more important (user data, e-commerce) |

---

### **Interview ready one-liner**

> **Cassandra** prioritizes **Availability + Partition Tolerance** (AP)
> **MongoDB** prioritizes **Consistency + Partition Tolerance** (CP)
> Both allow **tuning** consistency/availability based on use case.
