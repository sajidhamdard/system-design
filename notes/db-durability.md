**Durability is almost entirely implemented using WAL (Write-Ahead Logging)** in most modern databases.
---

# ✅ **1. DURABILITY — How DB ensures data is never lost**

Durability means:

> **Once a transaction is committed → data will never be lost even if the server crashes immediately.**

To achieve this, databases **do not trust RAM** (because RAM is volatile).
So they use a persistent mechanism: **WAL logs**.

---

# ⭐ 2. **Yes — WAL (Write-Ahead Log) is the main mechanism**

Before writing the actual data to data files, the DB first writes the change to the WAL.

### WAL contains:

* old value
* new value
* transaction ID
* redo/undo information
* commit record

### Why "write-ahead"?

Because the WAL is written **before** changes are applied to the main data files.

---

# ⭐ 3. **Crash happens — how recovery works**

### Event:

You book a ticket → DB commits → crash occurs.

### After restart, DB does:

### 🔄 **ROLL FORWARD (Redo Phase)**

DB replays **committed WAL entries** to restore all committed data.

### 🔄 **ROLL BACK (Undo Phase)**

DB undoes transactions that were not committed.

As a result:

✔ All committed data stays
❌ All uncommitted data is discarded

---

# ⭐ 4. Example flow

### Step 1: You run:

```sql
UPDATE account SET balance = balance - 100;
```

### Step 2: DB writes to WAL:

```
T100: old_balance=500, new_balance=400
T100: COMMIT
```

### Step 3: DB crashes BEFORE writing to final data file.

💥 Crash.

### Step 4: DB restarts

It reads WAL → sees **COMMITTED** entry → applies the change to the data file.

✔ **Your booking / update still exists** → durability upheld.

---

# ⭐ 5. Why does WAL guarantee durability?

Because WAL is stored on **disk**, not memory.
Even if:

* database crashes
* server crashes
* power outage
* OS crash

→ WAL file is already safely persisted.

WAL is **append-only**, so it's extremely fast and safe to write.

---

# ⭐ 6. All major databases use WAL

| DB             | Durability mechanism            |
| -------------- | ------------------------------- |
| PostgreSQL     | WAL                             |
| MySQL (InnoDB) | redo logs + undo logs           |
| Oracle         | redo logs + undo + archive logs |
| SQL Server     | transaction log                 |
| MongoDB        | journal / oplog                 |
| Cassandra      | commit log                      |

All follow the same principle:
**Commit → write log → guarantee durability → recover using logs.**

---

# ⭐ 7. Final Summary

You asked:
**“If server crashes, how will data recover? From WAL logs?”**

✔ Yes
✔ WAL is the main mechanism
✔ On restart DB replays WAL to restore all committed transactions
✔ Therefore, durability is guaranteed even after sudden failure
