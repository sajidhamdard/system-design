# **🛠️ Two-Phase Commit (2PC)**

**Definition:**

> Two-Phase Commit (2PC) is a **distributed transaction protocol** used to **ensure all participants in a distributed system either commit or rollback a transaction**, maintaining **atomicity** across multiple databases or services.

It’s commonly used in **distributed databases, microservices, and financial systems**.

---

## **1️⃣ Why 2PC is Needed**

* In a distributed system, a transaction may involve **multiple databases/services**.
* Example: Transferring money from Bank A to Bank B:

  * Debit from A
  * Credit to B
* Both operations must **either succeed together or fail together**.
* 2PC ensures **consistency** across all participants.

---

## **2️⃣ How 2PC Works**

### **Phase 1: Prepare (Voting Phase)**

1. **Coordinator** sends a “prepare” request to all participants.
2. Each **participant checks if it can commit** the transaction:

   * If yes → responds **“vote commit”**
   * If no → responds **“vote abort”**

### **Phase 2: Commit (Decision Phase)**

1. **Coordinator collects votes**:

   * If **all vote commit** → coordinator sends **commit command** to all.
   * If **any vote abort** → coordinator sends **rollback command** to all.
2. Each participant **executes commit or rollback** as instructed.

---

## **3️⃣ Sequence Diagram (Text-Based)**

```
Coordinator             Participant 1      Participant 2
     |                        |                  |
     |------Prepare----------->|                  |
     |                        |---Vote Commit-->|
     |                        |                  |
     |------Prepare----------->|                  |
     |                        |---Vote Commit-->|
     |                        |                  |
     |------Commit------------>|                  |
     |                        |---Commit-------->|
```

---

## **4️⃣ Pros and Cons**

| Pros                                 | Cons                                                                               |
| ------------------------------------ | ---------------------------------------------------------------------------------- |
| Ensures **atomicity across systems** | **Blocking protocol** – if coordinator crashes, participants may wait indefinitely |
| Maintains **consistency**            | Slower due to multiple communication rounds                                        |
| Simple to implement conceptually     | **No fault tolerance** for coordinator crash                                       |

---

## **5️⃣ Analogy**

> Think of 2PC like **group dinner ordering**:
>
> * **Phase 1 (Prepare):** Everyone says “I can eat this dish?”
> * **Phase 2 (Commit):** If everyone agrees → order all dishes; if anyone disagrees → cancel the order.

---

💡 **Key takeaway:**
2PC is **reliable for atomic transactions across multiple systems**, but **can be slow and blocking**, so alternatives like **3PC or Saga pattern** are used in high-availability systems.

---
