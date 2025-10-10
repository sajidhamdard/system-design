## ⚙️ What Are Serializable Transactions?

**Definition:**

> A **serializable transaction** is a database transaction that executes in such a way that **the outcome is the same as if all transactions were executed sequentially**, one after another.

**Goal:**

* Ensure **strong consistency**
* Prevent **race conditions, dirty reads, non-repeatable reads, and phantom reads**

---

## 🔄 Isolation Levels in SQL

| Isolation Level  | Description                              | Issues Possible            |
| ---------------- | ---------------------------------------- | -------------------------- |
| Read Uncommitted | Can read uncommitted changes             | Dirty reads                |
| Read Committed   | Only committed data visible              | Non-repeatable reads       |
| Repeatable Read  | Re-reading same data gives same result   | Phantom reads possible     |
| Serializable     | Transactions appear **fully sequential** | None (strongest isolation) |

---

## 1️⃣ **Snapshot Isolation (SI)**

* Each transaction reads **a snapshot of the database** at the start
* Writes **conflicting data** are **blocked or cause abort**
* Prevents **non-repeatable reads and dirty reads**

**Problem:**

* SI **does not guarantee full serializability**
* **Write skew** anomalies can occur

**Example of Write Skew:**

* Two doctors check a schedule table (slots available)
* Both see a free slot and book it → resulting in **overbooking**
* Snapshot isolation allows it, even though serial execution would prevent it

---

## 2️⃣ **Serializable Snapshot Isolation (SSI)**

**Definition:**

> SSI is an **enhanced version of Snapshot Isolation** that ensures **serializability**, preventing anomalies like write skew.

**How it works:**

1. Transactions read **snapshots** of data (like SI)
2. Database **tracks read-write conflicts** between concurrent transactions
3. If a conflict that could lead to **non-serializable behavior** is detected → **abort one transaction**
4. Only transactions that **do not conflict** commit

**Pros:**

* Achieves **serializable isolation**
* Avoids complex locking like **two-phase locking**
* More **concurrent-friendly** than strict locking

**Cons:**

* Transaction may **abort under high contention**
* Slightly more overhead than plain SI

---

## 🔧 Example Scenario

| Step | Transaction A                                       | Transaction B                  |
| ---- | --------------------------------------------------- | ------------------------------ |
| 1    | Reads slot availability                             | Reads slot availability        |
| 2    | Books slot 1                                        | Books slot 2 (write skew risk) |
| 3    | Under SSI, DB detects conflict → abort one          | Aborted, retry required        |
| 4    | Only one transaction commits → serializable outcome |                                |

---

## 🧩 Analogy

* **SI:** Each person sees a **snapshot of a parking lot** → can lead to double booking if people act on it concurrently
* **SSI:** Each person sees a snapshot, **but system detects conflicting bookings and blocks one** → ensures only safe bookings happen

---

## ✅ Key Takeaways

1. **Serializable transactions = strongest isolation** → appear sequential
2. **Snapshot Isolation (SI)** = reads snapshot → may cause write skew
3. **Serializable Snapshot Isolation (SSI)** = SI + conflict detection → prevents write skew
4. **Trade-off:** SSI allows **higher concurrency than strict serializable locking** but may abort some transactions

---
