### **What is a hotspot in a database?**

> **Hotspot** = When **too many reads or writes** are concentrated on the **same key / row / partition / node**, causing **performance bottlenecks**.

Simple words:
→ One part of your database gets **“too hot”** (overloaded) while other parts are underused (cold).
→ Results in **slowness**, **lock contention**, **node crash**, or **imbalance**.

---

### **Small Example 1 — Relational DB (MySQL)**

You have a table:

```sql
post_id | likes_count
```

Every time a user likes a post, you run:

```sql
UPDATE posts SET likes_count = likes_count + 1 WHERE post_id = 123;
```

* If **post\_id = 123** is a **viral post**, millions of likes hit same row → **row-level lock** → **hotspot**

---

### **Small Example 2 — Cassandra**

You have a **time-series** table:

```sql
sensor_id | timestamp | reading
```

You store all data for `sensor_id = "temp_sensor_1"` in same partition.
If this sensor writes 1000 readings/sec → **that partition is hotspot** → that node struggles → imbalance.

---

### **Small Example 3 — Cache (Redis)**

You have a cache key:
`"trending_posts"`

If millions of users read/write same key → Redis instance gets overloaded → **hotspot in cache**

---

### **Summary table**

| **Hotspot type**      | **Where?**                 | **Why bad?**         |
| --------------------- | -------------------------- | -------------------- |
| **Row hotspot**       | SQL row updates            | Lock contention      |
| **Partition hotspot** | NoSQL (Cassandra, MongoDB) | One node overloaded  |
| **Key hotspot**       | Cache (Redis, Memcached)   | Latency spikes       |
| **Shard hotspot**     | Sharded DBs                | Imbalance of traffic |

---

### **How to fix hotspots?**

| **Technique**                  | **Idea**                                                          |
| ------------------------------ | ----------------------------------------------------------------- |
| **Data modeling**              | Spread writes/reads better (example: randomize keys, bucket data) |
| **Client-side load balancing** | Distribute requests evenly                                        |
| **Application-side batching**  | Reduce frequency of writes                                        |
| **Database tuning**            | Use partitioning, replication smartly                             |

---

### **In short (interview-ready)**

> **A hotspot happens when too many reads or writes hit the same DB row, key, partition, or node, causing imbalance and bottleneck. We fix it by redesigning data model or spreading traffic more evenly.**
