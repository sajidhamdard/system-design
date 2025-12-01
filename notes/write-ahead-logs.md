## 🔹 What is Write-Ahead Logging (WAL)?

**Write-Ahead Log (WAL)** is a **technique used in databases to ensure durability and atomicity** (part of ACID properties).

* Before the database modifies the actual data on disk, it **first writes the changes to a log file**.
* Only after the log is safely written, the database applies changes to the main storage.

This ensures that **even if the system crashes**, the database can **recover to a consistent state**.

---

## 🔹 How WAL Works (Step by Step)

1. **Client issues a write** (e.g., insert/update).
2. Database writes the change to the **WAL** (append-only log).
3. Database applies the change to the **actual database file** (data pages).
4. On crash/restart:

   * The database reads the WAL.
   * Re-applies any committed changes that were not persisted to the main database.

---

### 🔹 Example

Suppose you insert a new order:

```
Step 1: Append to WAL
[WAL] INSERT INTO orders VALUES (123, 'Laptop', 1)

Step 2: Update database file
[DB FILE] orders table updated

Crash happens here? Recovery reads WAL:
Re-applies INSERT statement -> ensures order is not lost
```

---

## 🔹 Key Benefits

1. **Durability (part of ACID)** ✅

   * Once WAL is written, the transaction is considered durable even if DB crashes before writing to main storage.

2. **Crash Recovery** 🔄

   * WAL allows the database to **replay committed transactions** after a crash.

3. **Sequential Writes** 📄

   * Writing to a log is **sequential**, which is faster than random writes to data files.

4. **Atomicity**

   * Ensures **partial transactions don’t corrupt database**—only fully logged transactions are replayed.

---

## 🔹 Usage in Databases

* **PostgreSQL** → WAL is core for crash recovery.
* **SQLite** → WAL mode improves concurrent reads/writes.
* **MySQL (InnoDB)** → Uses redo logs, similar to WAL.
* **MongoDB** → Uses a journal, which is a WAL variant.

---

### 🔹 Summary

**Write-Ahead Log = log of all changes written before updating the database itself.**

* Guarantees **durability** and **crash recovery**.
* Enables **fast sequential writes** instead of random writes to main storage.

---

**WAL vs Redo/Undo logs** — the way professional DB engines implement them.

**WAL (Write-Ahead Logging)** is a *strategy / principle*.

**Redo & Undo logs** are *the actual log files* used by many databases to implement WAL.

So:

> **WAL = the rule**
> **Redo/Undo logs = the files used to follow the rule**

But depending on the database, WAL may contain only redo info or both.

---

# 🚀 **1. WAL (Write-Ahead Logging) — The Principle**

WAL means:

> **Before modifying the actual data file, write the change to a log on disk.**

Purpose:

* crash recovery
* durability
* atomic commit

WAL is **append-only**, very fast, and persisted immediately.

---

# 🚀 **2. Redo Log — “What should be reapplied after crash”**

Redo log stores **how to reapply committed changes**.

Contains:

* new value
* transaction ID
* page/row identifier
* commit markers

Used in **roll-forward** recovery:

### 💡 If DB crashes:

* Redo log is replayed
* All committed transactions are applied to data files

**Redo = reapply the work that was finished.**

---

# 🚀 **3. Undo Log — “How to reverse uncommitted changes”**

Undo log stores **how to undo/rollback partial work**.

Contains:

* old value
* row version before update
* transaction markers

Used in two situations:

### Case 1: Transaction does ROLLBACK

Undo log restores old values.

### Case 2: DB crashes, but transaction was not committed

Undo log is used during restart to undo incomplete operations.

**Undo = cancel the work that wasn’t finished.**

---

# ⭐ So what’s the difference?

| Feature                      | WAL                              | Redo Log               | Undo Log                  |
| ---------------------------- | -------------------------------- | ---------------------- | ------------------------- |
| Meaning                      | Principle: write log before data | Log of new values      | Log of old values         |
| Purpose                      | Ensure durability                | Recover committed txns | Rollback uncommitted txns |
| Used for                     | Crash recovery, durability       | Redo (roll forward)    | Undo (roll back)          |
| Contains                     | Depends on DB                    | New changes            | Old changes               |
| Required for crash recovery? | Yes                              | Yes (for committed)    | Yes (for uncommitted)     |

---

# ⭐ How different DB engines use WAL/Redo/Undo

### **PostgreSQL**

* WAL contains **only REDO info**
* No undo logs in WAL
* Undo is done using MVCC + old tuple versions in data pages

### **MySQL InnoDB**

* Uses WAL principle
* Has two logs:

  * **Redo log** → redo committed changes
  * **Undo log** → rollback uncommitted transactions

### **Oracle & SQL Server**

* Transaction Log contains **both redo and undo**
* Uses WAL internally
* Very advanced redo/undo system

### **MongoDB / Cassandra**

* Mongo → journal
* Cassandra → commit log
  (Both follow WAL strategy)

---

# ⭐ Final Summary (Best Version)

### ✔ WAL = The rule

"Write changes to log before writing to main data file."

### ✔ Redo Log = New data for crash recovery

(Used to reapply committed changes after crash)

### ✔ Undo Log = Old data for rollback

(Used to undo failed or uncommitted transactions)

### ✔ Many DBs combine these but the idea is the same:

* **Undo uncommitted**
* **Redo committed**

---

Whether **WAL (Write-Ahead Logging)** needs to be **enabled manually** or is **on by default** depends on the database:

---

### **1. PostgreSQL**

* **Enabled by default.**
* WAL is integral to PostgreSQL for durability and crash recovery.
* You don’t need to enable it manually.
* You **can configure** parameters like:

  * `wal_level` → minimal, replica, logical
  * `wal_buffers` → memory allocated for WAL writes
  * `archive_mode` → enable archiving WAL for backups

---

### **2. SQLite**

* By default, SQLite **does NOT use WAL mode**.
* It uses **rollback journal** mode by default.
* To use WAL, you **enable it manually**:

```sql
PRAGMA journal_mode=WAL;
```

---

### **3. MySQL (InnoDB)**

* InnoDB uses **redo logs** (similar to WAL).
* **Enabled by default**.
* You can configure log file size and flushing policy via:

```ini
innodb_log_file_size
innodb_flush_log_at_trx_commit
```

---

### **4. MongoDB**

* Journaling (WAL variant) is **enabled by default** in modern versions.
* Ensures durability in case of crash.
* Can be configured in `mongod.conf`.

---

### 🔹 Summary

| Database       | WAL / Journal | Enabled by Default? | Notes                |
| -------------- | ------------- | ------------------- | -------------------- |
| PostgreSQL     | WAL           | ✅ Yes               | Fully integrated     |
| SQLite         | WAL mode      | ❌ No                | Must enable manually |
| MySQL (InnoDB) | Redo log      | ✅ Yes               | Configurable         |
| MongoDB        | Journal (WAL) | ✅ Yes               | Configurable         |

---

💡 **Rule of Thumb:**

* Most **production-grade DBs** like PostgreSQL, MySQL, MongoDB have WAL/journaling enabled by default.
* Lightweight DBs like **SQLite** require **manual enabling** if you want WAL benefits.

---
