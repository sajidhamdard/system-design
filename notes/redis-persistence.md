# **💾 Redis Persistence**

Redis is an **in-memory database**, so by default, data is stored in memory.
To **prevent data loss** on crash or restart, Redis provides **persistence mechanisms**:

1. **RDB (Snapshotting)** – saves the dataset at specific intervals.
2. **AOF (Append Only File)** – logs every write operation to disk.

We’ll focus on **AOF**.

---

## **1️⃣ What is AOF (Append Only File)?**

* Redis writes **every write operation** (like `SET`, `DEL`, `INCR`) to a file on disk, **appending** it at the end.
* On restart, Redis **replays the AOF file** to rebuild the dataset in memory.

**Key idea:**

> “Every change is recorded sequentially on disk, so nothing is lost.”

---

## **2️⃣ How AOF Works**

```
Write command (SET key value) → Redis memory update → Append command to AOF file
```

* Example:

```text
SET user:1 "Sajid"
INCR counter
DEL user:2
```

* Redis appends these commands to the AOF file in the **exact order they occurred**.

---

## **3️⃣ AOF Persistence Policies**

Redis allows **different syncing strategies** for durability:

| Policy     | Description                  | Pros                          | Cons                       |
| ---------- | ---------------------------- | ----------------------------- | -------------------------- |
| `always`   | Sync to disk **every write** | Max durability                | Slowest, high disk I/O     |
| `everysec` | Sync **every second**        | Good durability + performance | Can lose last 1s of writes |
| `no`       | OS decides when to flush     | Fastest                       | Possible data loss         |

---

## **4️⃣ Advantages of AOF**

* **Better durability** than RDB (less data loss).
* **Readable** – you can see commands in plain text.
* Supports **rewrite/compaction** – reduces file size while keeping all operations.

---

## **5️⃣ AOF vs RDB**

| Feature        | RDB (Snapshot)          | AOF (Append Only File)   |
| -------------- | ----------------------- | ------------------------ |
| Frequency      | Periodic (every N sec)  | Every write (append)     |
| Durability     | Medium                  | High (configurable)      |
| Recovery speed | Faster (load snapshot)  | Slower (replay commands) |
| File size      | Smaller                 | Larger                   |
| Use case       | Backups & fast restarts | High durability          |

> 🔑 Tip: Many production setups use **both RDB + AOF**: RDB for fast restarts, AOF for high durability.

---

### **6️⃣ How AOF Helps in Practice**

1. User writes data → Redis updates memory → Appends operation to AOF.
2. Crash happens → Redis restarts → Replays AOF → Dataset restored in memory.
3. Optional: Redis can **rewrite AOF** in background to remove old redundant commands.

---
