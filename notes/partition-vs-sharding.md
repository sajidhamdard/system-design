## **Partitioning**

* **Definition:** Splitting data of a single database/table into smaller, more manageable parts called **partitions**.
* **Where it applies:** Within a **single database system**.
* **Goal:** Improve performance, manageability, and query efficiency.

### Types of Partitioning

1. **Horizontal Partitioning** (most common)

   * Rows are divided across partitions.
   * Example: A `Users` table partitioned by `region` → Asia users in one partition, Europe users in another.

2. **Vertical Partitioning**

   * Columns are divided.
   * Example: Put frequently accessed columns in one table, and rarely accessed (but large) columns in another.

3. **Range, List, Hash Partitioning**

   * Based on value ranges, lists, or hashing of a key.

👉 Example (Partitioning a `Transactions` table by year):

* `Transactions_2023`
* `Transactions_2024`
* `Transactions_2025`

Here, all partitions are **inside one database server**.

---

## **Sharding**

* **Definition:** Splitting data across **multiple database instances/servers** (shards). Each shard holds a subset of data.
* **Where it applies:** **Distributed databases**.
* **Goal:** Scalability (handle huge data and high traffic by adding more servers).

### How it works:

* Each shard is like a mini database with its own storage and compute.
* A **shard key** decides where data goes.
* Requires a **shard router/coordinator** to direct queries to the right shard.

👉 Example (Sharding a `Users` table by `user_id`):

* Shard 1 → users with IDs 1–1M
* Shard 2 → users with IDs 1M+1–2M
* Shard 3 → users with IDs 2M+1–3M

Here, data is split **across different physical servers**.

---

## **Key Differences**

| Aspect             | Partitioning                             | Sharding                                      |
| ------------------ | ---------------------------------------- | --------------------------------------------- |
| **Scope**          | Within a single database                 | Across multiple databases/servers             |
| **Purpose**        | Manageability + query optimization       | Scalability + distribute load                 |
| **Complexity**     | Handled internally by the DB engine      | Needs shard key, router, and cluster setup    |
| **Performance**    | Faster queries on subsets of data        | Handle very large datasets + high concurrency |
| **Failure impact** | One DB → risk of single point of failure | Each shard independent → higher availability  |

---

✅ **Simple way to remember:**

* **Partitioning** = cutting your data into slices **within one kitchen (DB server)**.
* **Sharding** = spreading your data across **multiple kitchens (DB servers)**, each cooking a slice.

---

Partitioning is *not* about correctness — it’s about **performance, manageability, scalability**.

---

# ✅ Why do we partition a table instead of just adding a region column?

Because **partitioning changes how the database stores and processes data internally**.

A normal table:

* All rows are stored in the **same physical space**
* Searching/filtering has to scan more data
* Indexes become huge → slower

A partitioned table:

* Data is physically split into smaller chunks called **partitions**
* Each partition can be scanned, indexed, locked, and maintained **independently**

---

# ✅ Example: Users partitioned by region

### Without partitioning (single table)

```
Users (20 million rows)
Columns: user_id, name, region, email, ...
```

A query like:

```sql
SELECT * FROM users WHERE region = 'Asia';
```

The DB:

* Checks the index on `region`
* Still needs to fetch rows from a **huge table**

Indexes on 20M rows are big, slow, expensive.

---

# With partitioning (Asia partition, Europe partition)

## Query:

```sql
SELECT * FROM users WHERE region = 'Asia';
```

DB **skips all other partitions**
Only scans the **Asia partition** (maybe 3–4 million rows)

This is called **partition pruning**.

---

# 🌟 Key Advantages of Partitioning

## **1. Faster queries due to partition pruning**

Only relevant partitions are scanned.

## **2. Smaller indexes**

Each partition has its own index → much smaller → faster.

## **3. Better maintenance**

Want to delete all Europe users?
Instead of:

```sql
DELETE FROM users WHERE region='Europe';
```

…which is slow and causes massive locking and logging,

You can do:

```sql
ALTER TABLE users DROP PARTITION europe;
```

**Instant**. No huge delete cost.

## **4. Better Data Distribution & Parallelism**

Databases run partitions **in parallel**, boosting performance.

## **5. High availability / easier backups**

You can backup/restore only one partition.

## **6. Avoiding “hotspot” problems**

If 90% users are from Asia, you can distribute **read/write load** better.

---

# ❗️Then why not partition everything?

Partitioning is useful **only for very large tables** (millions of rows).

For small tables: partitioning = unnecessary overhead.

---

# 🔥 Summary (super simple)

| Without Partitioning           | With Partitioning                |
| ------------------------------ | -------------------------------- |
| One big table                  | Table split physically           |
| Slow queries on large datasets | Faster due to partition pruning  |
| Huge indexes                   | Small partition-specific indexes |
| Hard to delete large data sets | Drop partition instantly         |
| More locking                   | Less locking                     |

---

# 🎯 Final Answer

Yes, you **can** have a single table with a `region` column.
But partitioning is used because:

👉 Queries get faster
👉 Indexes get smaller
👉 Maintenance becomes easier
👉 Data is parallelized and distributed
👉 Deletes / archiving become instant

Partitioning is a **performance + scalability optimization**, not a correctness requirement.

---

# ✅ How to create partitions

It depends on the type of database (Oracle, MySQL, PostgreSQL, etc.) but the concept is the same.

---

## 1️⃣ **Range Partitioning**

You divide data into ranges (like dates, numeric values, or region codes).

Example: Users table partitioned by region in **MySQL**:

```sql
CREATE TABLE users (
    user_id INT,
    name VARCHAR(100),
    region VARCHAR(50)
)
PARTITION BY LIST COLUMNS(region) (
    PARTITION p_asia VALUES IN ('Asia'),
    PARTITION p_europe VALUES IN ('Europe'),
    PARTITION p_america VALUES IN ('America')
);
```

* **One table** `users`
* Database internally stores **3 partitions**: `p_asia`, `p_europe`, `p_america`
* Query like:

```sql
SELECT * FROM users WHERE region='Asia';
```

→ DB **scans only `p_asia`** (partition pruning)

---

## 2️⃣ **Range Partitioning by Date**

Sometimes you partition by dates (common for logs, transactions):

```sql
CREATE TABLE orders (
    order_id INT,
    order_date DATE,
    amount DECIMAL(10,2)
)
PARTITION BY RANGE (YEAR(order_date)) (
    PARTITION p2023 VALUES LESS THAN (2024),
    PARTITION p2024 VALUES LESS THAN (2025)
);
```

* Old partitions can be **archived or dropped easily**.

---

## 3️⃣ **Hash Partitioning**

Used when data is **uniformly distributed** but you don’t have natural ranges:

```sql
CREATE TABLE users (
    user_id INT,
    name VARCHAR(100)
)
PARTITION BY HASH(user_id)
PARTITIONS 4;
```

* Database distributes rows across **4 partitions automatically**
* Good for **load balancing**

---

## 4️⃣ **Key Points**

* You **don’t create multiple tables manually**.
* Partitioning is **part of table definition**.
* Queries still see **one logical table**.
* DB handles **storage, pruning, and indexing** internally.

---

### ⚡ Advantages over separate tables

| Separate tables                      | Partitioned table                               |
| ------------------------------------ | ----------------------------------------------- |
| Manual joins if you need all regions | Single table query works naturally              |
| Hard to manage schema changes        | Schema change applied to all partitions at once |
| Hard to maintain indexes             | Each partition has its own smaller index        |
| Manual archiving                     | Can drop/archive partitions easily              |

---
