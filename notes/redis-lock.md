## ⚙️ What is a Redis Lock?

**Definition:**

> A **Redis lock** is a mechanism to **synchronize access to shared resources** in a distributed system using Redis.

**Goal:**

* Prevent **race conditions** when multiple processes try to update the same resource

---

### 1️⃣ Basic Redis Lock

**How it works:**

1. Use the `SET key value NX PX <ttl>` command:

   * `NX` → set only if key does not exist (prevents overwriting)
   * `PX` → set expiration time (time-to-live) to avoid deadlocks

2. Acquire the lock:

   ```bash
   SET lock:order:123 "uuid-xyz" NX PX 5000
   ```

   * Returns `OK` if lock acquired
   * Returns `nil` if lock is already held

3. Release the lock:

   * Only the owner of the lock can release it to prevent accidental unlock:

   ```lua
   if redis.call("get",KEYS[1]) == ARGV[1] then
       return redis.call("del",KEYS[1])
   else
       return 0
   end
   ```

**Pros:**

* Simple, fast
* Works for **single Redis instance**

**Cons:**

* Not safe in **Redis cluster / multiple nodes**
* Can fail if Redis crashes or network partition occurs

---

### 2️⃣ Redlock (Distributed Redis Lock)

**Problem:**

* A single Redis instance lock can fail in distributed environments → risk of **split-brain / multiple owners**

**Solution:** **Redlock** (proposed by Salvatore Sanfilippo, Redis creator)

**How it works:**

1. **Multiple Redis instances** (e.g., 5 nodes)
2. Client tries to acquire lock on **majority of nodes** (e.g., 3 out of 5)
3. Lock has a **short TTL** to prevent deadlocks
4. If lock is acquired on majority → success
5. Unlock → release lock from all instances

**Algorithm Steps (simplified):**

1. Get current time
2. Try to acquire lock on N Redis nodes sequentially
3. Calculate elapsed time, ensure majority acquired and TTL not expired
4. If yes → lock acquired, else retry

**Pros:**

* Safer in **distributed environments**
* Reduces risk of multiple clients acquiring the lock

**Cons:**

* More complex
* Network latency can affect reliability

---

### 3️⃣ ⚡ Use Cases

| Use Case                   | Why Redis Lock / Redlock                             |
| -------------------------- | ---------------------------------------------------- |
| Distributed job scheduling | Ensure only one worker processes a job               |
| Updating shared resources  | Prevent race conditions in counters, inventory, etc. |
| Leader election            | Choose one master node in distributed system         |
| Rate limiting              | Ensure only one service instance updates counters    |

---

### 4️⃣ 🔧 Key Best Practices

1. **Always use TTL** → avoid deadlocks if client crashes
2. **Use unique values** per client → ensure correct unlock
3. **Prefer Redlock in distributed Redis** → more fault-tolerant
4. **Avoid long-running critical sections** → lock should be short-lived

---

### 5️⃣ 🧩 Analogy

* **Single Redis lock:** “One key to a safe” → if the keyholder crashes, safe is stuck
* **Redlock:** “Multiple locks on multiple safes” → need majority keys to open → safer for distributed environment

---

✅ **Key Takeaways**

1. Redis lock = simple locking mechanism on a single Redis instance
2. Redlock = distributed locking across multiple Redis nodes for safety
3. Always use **TTL and unique identifiers**
4. Best for **distributed coordination, job scheduling, and preventing race conditions**

---
