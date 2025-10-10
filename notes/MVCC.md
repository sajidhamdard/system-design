## ⚙️ What is MVCC?

**Definition:**

> MVCC is a **database concurrency control method** that allows **multiple transactions to access the database simultaneously** without blocking each other, by keeping **multiple versions of data**.

**Goal:**

* Provide **high concurrency**
* Avoid **locking conflicts**
* Maintain **transaction isolation**

---

## 🔄 How MVCC Works

1. **Multiple Versions**

   * Each row has a **version or timestamp**.
   * When a transaction updates a row, a **new version** is created instead of overwriting the old one.

2. **Transaction Timestamps**

   * Each transaction is assigned a **start timestamp** and possibly a **commit timestamp**.
   * A transaction **sees only versions valid at its start time** → ensures **consistent reads**.

3. **Read Operations**

   * **Non-blocking reads:** readers can access old versions without waiting for writers.

4. **Write Operations**

   * Writers create new versions → old versions still exist for other transactions until they commit or rollback.

---

## 🛠️ Example

| Version | Value | Valid From | Valid To |
| ------- | ----- | ---------- | -------- |
| 1       | 100   | T1         | T2       |
| 2       | 110   | T2         | NULL     |

* **T1 reads:** sees value 100
* **T2 reads after T1 commit:** sees value 110
* **No read locks are needed** → avoids blocking

---

## ⚡ Advantages of MVCC

1. **High concurrency**

   * Reads don’t block writes, writes don’t block reads

2. **Consistent snapshots**

   * Each transaction sees a consistent view of the database

3. **Reduced deadlocks**

   * No need for long-term locks

4. **Better performance for OLTP systems**

   * Optimized for heavy read/write workloads

---

## ⚠️ Disadvantages

1. **Storage overhead**

   * Multiple versions of rows consume more space

2. **Garbage collection needed**

   * Old versions must be cleaned up periodically (e.g., PostgreSQL `VACUUM`)

3. **Complexity**

   * Database engine needs to manage versions and timestamps efficiently

---

## 🧩 Real-world Example

* **PostgreSQL** → implements MVCC
* **MySQL (InnoDB)** → uses MVCC for transaction isolation (REPEATABLE READ)

**Scenario:**

* Transaction 1 reads account balance → sees 100
* Transaction 2 updates balance to 110 → creates new version
* Transaction 1 still sees 100 → consistent snapshot
* After T1 commits, T2 sees the latest version

---

## 🧭 Analogy

* MVCC = **photo album of a document**

  * Each update creates a **new photo**
  * Each person (transaction) looks at the **photo that existed when they started**
  * No one has to wait for someone else to finish editing

---

✅ **Key Takeaways**

* MVCC allows **non-blocking reads and writes**
* Each transaction works with a **consistent snapshot**
* Avoids deadlocks and improves concurrency
* Requires **version management** and **garbage collection**

---
