# **🔒 Isolation & Its Levels in Databases**

**Definition:**

> **Isolation** is a property of database transactions that ensures **concurrent transactions do not interfere with each other**.
>
> It’s part of **ACID** properties (Atomicity, Consistency, Isolation, Durability).

* Ensures **data correctness** when multiple transactions run simultaneously.

---

## **1️⃣ Isolation Levels**

| Level                | Description                                                                        | Possible Phenomena     |
| -------------------- | ---------------------------------------------------------------------------------- | ---------------------- |
| **Read Uncommitted** | Transactions can **read uncommitted changes** from other transactions.             | Dirty reads            |
| **Read Committed**   | Can only read **committed data** from other transactions.                          | Non-repeatable reads   |
| **Repeatable Read**  | Data read **cannot change** during the transaction. Prevents non-repeatable reads. | Phantom reads possible |
| **Serializable**     | Transactions are **fully isolated**, as if executed **one after another**.         | None (strictest level) |

---

### **2️⃣ Phenomena Explained**

* **Dirty Read:** Transaction reads uncommitted data from another transaction.
* **Non-repeatable Read:** A row read twice may have **different values** due to another transaction’s commit.
* **Phantom Read:** New rows added by another transaction appear in repeated queries.

---

### **3️⃣ How It Works (Flow)**

```
Transaction A → Reads/Writes
Transaction B → Reads/Writes concurrently

Isolation ensures Transaction B does not interfere with Transaction A 
according to the chosen isolation level.
```

---

### **4️⃣ Trade-offs**

| Isolation Level  | Concurrency | Data Safety |
| ---------------- | ----------- | ----------- |
| Read Uncommitted | High        | Low         |
| Read Committed   | Medium      | Medium      |
| Repeatable Read  | Low         | High        |
| Serializable     | Very Low    | Very High   |

* Higher isolation → less concurrency, more safety
* Lower isolation → more concurrency, potential anomalies

---

### **5️⃣ Analogy**

* **Read Uncommitted:** Reading someone’s **draft email** → may change.
* **Read Committed:** Reading **sent email only** → stable.
* **Repeatable Read:** Reading **same sent email twice** → same content each time.
* **Serializable:** Only **one person writes and reads at a time** → fully predictable.

---

💡 **Key takeaway:**

* **Isolation controls how concurrent transactions interact**
* Choose level based on **need for consistency vs performance/concurrency**

---
