## 1️⃣ **Durable Databases (ACID-compliant)**

If you are using a database that supports **ACID transactions**:

* **A = Atomicity** → Either the whole transaction succeeds or none of it does
* **C = Consistency** → Database moves from one valid state to another
* **I = Isolation** → Transactions don’t interfere
* **D = Durability** → Once a transaction commits, it survives crashes

### Recovery Mechanisms:

1. **Write-Ahead Logging (WAL)**

   * Example: PostgreSQL, MySQL InnoDB
   * All changes are first written to a log on disk before applying to the data file
   * On crash → replay the log to **recover committed transactions**

2. **Checkpoints**

   * Periodically flush data to disk
   * Combined with WAL → can recover to last committed state efficiently

**Outcome:**

* **Records that were committed** before crash → recovered automatically
* **Uncommitted records** → rolled back

---

## 2️⃣ **Replication & Redundancy**

* **Multi-AZ / Multi-Region replication** ensures another copy exists if one system fails
* Example:

  * Redis Streams, Kafka, or databases like Cassandra/DynamoDB
* If primary fails → replicas have the data → system recovers without losing records

---

## 3️⃣ **Backups**

* Periodic **database backups** allow recovery of old records if corruption occurs
* Techniques:

  * Full backup
  * Incremental / differential backup
* Restore → recover lost data up to last backup

---

## 4️⃣ **Crash Recovery in In-Memory Systems**

* In-memory databases (e.g., Redis) require **persistence configuration**:

  1. **RDB snapshots** → periodic saves to disk
  2. **AOF (Append-Only File)** → logs every write operation
* On restart → replay AOF or load snapshot to **recover records**

---

## 5️⃣ **Application-Level Recovery**

* Some systems implement **idempotency** and **retries**:

  * If a failure occurs mid-operation → application retries safely without duplicating data
* Helps **recover transient failures** in distributed systems

---

## ✅ Key Takeaways

1. **Committed data in durable systems can be recovered** automatically after a crash.
2. **Uncommitted data is usually lost** unless special techniques are used.
3. **Replication and backups** improve resilience and reduce data loss.
4. **Crash recovery mechanisms** depend on:

   * Database type (ACID vs NoSQL)
   * Logging (WAL, AOF)
   * Replication (single vs multi-region)

---

💡 **Analogy:**

* Committed record = **money deposited in a bank** → survives a bank system crash
* Uncommitted record = **money on the counter before deposit** → lost if system fails

---
