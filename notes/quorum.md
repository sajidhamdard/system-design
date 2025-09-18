A **quorum (majority voting)** refers to the **minimum number of votes (or participants)** required in a distributed system, database, or consensus algorithm to make a decision valid.

It ensures that even if some nodes fail or give conflicting answers, the system still reaches a consistent and reliable decision.

---

### 📌 In Distributed Systems (like databases, consensus, leader election):

* A quorum is the **minimum number of nodes that must agree** for an operation (read or write) to be considered successful.
* Typically, it’s defined as **more than half of the total nodes** (`⌊N/2⌋ + 1`).
* Example: If you have 5 nodes in a cluster:

  * Quorum = 3 (majority).
  * Any decision (like electing a leader or committing a write) needs at least 3 nodes agreeing.

---

### 📌 Why Majority Voting (Quorum) is Important:

1. **Consistency** – Prevents two conflicting decisions from being accepted at the same time.
2. **Fault Tolerance** – System continues to work even if some nodes fail.
3. **Avoids Split-Brain** – Ensures only one "side" of the cluster makes valid decisions.

---

### 📌 Example in Databases:

* **Write Quorum (W):** Minimum nodes that must confirm a write.
* **Read Quorum (R):** Minimum nodes that must confirm a read.
* Rule: `R + W > N` ensures strong consistency.
  Example: In Cassandra with 5 replicas (N=5):

  * W = 3, R = 3 → guarantees overlap → consistent reads/writes.

---

👉 In short:
**Quorum (majority voting) = Minimum number of participants required to agree, usually a simple majority, to make a decision valid in distributed systems.**

---
