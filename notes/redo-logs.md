## 🔹 What are Redo Logs?

**Redo Logs** are a mechanism used by databases to **ensure durability and recoverability**.

* They record **all changes made to the database** so that in case of a crash, the database can **redo** the changes and recover to a consistent state.
* Conceptually, they are very similar to **Write-Ahead Logs (WAL)**.

---

## 🔹 How Redo Logs Work

1. **Transaction begins** → changes are made in memory (buffer/cache).
2. **Changes are written to redo log first** (sequentially).
3. **Actual database files** are updated later (asynchronously).
4. On **crash recovery**:

   * Database reads redo logs.
   * Re-applies all committed changes to bring database back to a consistent state.

---

### 🔹 Example

Suppose you execute an `UPDATE accounts SET balance = balance - 100 WHERE id=1;`

```
Step 1: Append to redo log
[Redo Log] UPDATE accounts SET balance = balance - 100 WHERE id=1;

Step 2: Update in-memory database buffer
[Buffer] balance = balance - 100

Step 3: Flush buffer to disk (DB file)

Crash happens? Recovery reads redo log:
- Re-applies update → ensures transaction is not lost
```

---

## 🔹 Key Properties

1. **Durability (ACID)** ✅

   * Once transaction is written to redo log, it’s considered durable.

2. **Crash Recovery** 🔄

   * Redo logs allow database to **replay committed changes** after a crash.

3. **Sequential Writes** 📄

   * Writing to redo log is sequential → faster than random disk writes.

4. **Buffering Optimization**

   * Database can flush multiple redo log entries together → improves performance.

---

## 🔹 Redo Log vs WAL

| Feature     | Redo Log                         | WAL (Write-Ahead Log)                  |
| ----------- | -------------------------------- | -------------------------------------- |
| Purpose     | Recover committed changes        | Recover committed changes              |
| Write Order | Log written **before** data file | Same: log written **before** data file |
| Typical Use | MySQL (InnoDB), Oracle           | PostgreSQL, SQLite, MongoDB (journal)  |
| Granularity | Usually at transaction level     | Transaction or statement level         |
| Storage     | Usually fixed-size circular logs | Append-only sequential logs            |

---

### 🔹 Usage in Databases

* **MySQL (InnoDB)** → Uses **redo logs** to implement durability.
* **Oracle** → Redo logs are core to transaction recovery.
* **PostgreSQL / SQLite** → Equivalent concept via **WAL**.
* **MongoDB** → Journaling acts like redo logs.

---

💡 **Summary:**

* **Redo Log = sequential log of all changes that lets DB recover committed transactions after a crash.**
* It’s basically the **implementation of WAL** in databases like MySQL/Oracle.

---
