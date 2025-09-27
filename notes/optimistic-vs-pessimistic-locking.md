## **1. Pessimistic Locking**

### 🔑 Concept:

* Assumes **conflicts are likely**.
* Locks the data **before reading or updating** to prevent other transactions from modifying it.
* Other transactions that try to access the locked data **must wait** until the lock is released.

### 🛠 How it works:

1. Transaction A reads a row → places a **lock**.
2. Transaction B tries to read/update the same row → **blocked** until A commits/rolls back.
3. Once A finishes, B can proceed.

### ✅ Advantages:

* Guarantees data consistency.
* Safe for high-contention scenarios (many users updating the same data).

### ⚠️ Disadvantages:

* Can cause **blocking** and reduce concurrency.
* Potential **deadlocks** if multiple transactions wait for each other.

### 🖥 Example (SQL):

```sql
-- Transaction A
SELECT * FROM accounts WHERE id = 1 FOR UPDATE;

-- Transaction B waits until A commits
UPDATE accounts SET balance = balance + 100 WHERE id = 1;
```

---

## **2. Optimistic Locking**

### 🔑 Concept:

* Assumes **conflicts are rare**.
* **Does not lock** data when reading.
* When updating, checks if the data was changed by someone else (using a **version/timestamp** column).

### 🛠 How it works:

1. Transaction A reads row with `version = 1`.
2. Transaction B reads the same row (`version = 1`).
3. Transaction A updates → increments `version = 2`.
4. Transaction B tries to update → **version mismatch → fails/rolls back**.

### ✅ Advantages:

* Higher concurrency (no locks while reading).
* No deadlocks.

### ⚠️ Disadvantages:

* Updates may fail and require **retry logic**.
* Not suitable if conflicts are frequent.

### 🖥 Example (SQL):

```sql
-- Table has a 'version' column
UPDATE accounts
SET balance = balance + 100, version = version + 1
WHERE id = 1 AND version = 1;
```

* If `version != 1`, update fails → retry.

---

## **3. Comparison Table**

| Feature          | Pessimistic Locking          | Optimistic Locking             |
| ---------------- | ---------------------------- | ------------------------------ |
| Assumption       | Conflicts are likely         | Conflicts are rare             |
| Locking          | Locks data before read/write | No locks; checks on update     |
| Concurrency      | Low (blocked by locks)       | High (no blocking)             |
| Risk of Deadlock | High                         | Low                            |
| Use Case         | High-contention scenarios    | Low-contention scenarios       |
| Complexity       | Easy to implement            | Needs versioning & retry logic |

---

💡 **Rule of Thumb:**

* **Many users updating same data frequently → Pessimistic.**
* **Few conflicts, mostly reads → Optimistic.**

---

## **1. Pessimistic Locking**

```
Time →
Transaction A:  Read row X  ──> Lock row X ──> Update row X ──> Commit ──> Unlock
Transaction B:  Wait (row X locked) ────────────────────────────> Read/Update row X
```

**Explanation:**

* Transaction A locks the row before updating.
* Transaction B must **wait** until the lock is released.

---

## **2. Optimistic Locking**

```
Time →
Transaction A:  Read row X (version=1) ──> Compute ──> Update row X (version=2)
Transaction B:  Read row X (version=1) ──> Compute ──> Update row X (version mismatch!) ──> Retry
```

**Explanation:**

* No locks during read.
* Version check ensures no conflicts; failed updates are retried.

---

💡 **Key Visual Difference:**

```
Pessimistic:   [LOCKED]   → others wait
Optimistic:    [NO LOCK]  → conflicts detected at update
```

---
