# CRDT (Conflict-Free Replicated Data Types) – Deep Dive

## Overview
**CRDTs** are data structures designed for **distributed systems** that allow **concurrent updates** without requiring **coordination or locking**, while guaranteeing **eventual consistency**.  
They are widely used in **collaborative applications, distributed databases, and edge computing**.

---

## 1. Key Concepts

| Concept | Description |
|---------|-------------|
| **CRDT** | Data type that can be **replicated across nodes**, allowing **conflict-free concurrent updates**. |
| **Convergence** | All replicas converge to the same state, eventually, without coordination. |
| **Commutativity** | Operations are **order-independent**; different replicas apply them in any order and still converge. |
| **Idempotency** | Applying the same update multiple times does not change the outcome. |
| **Eventual Consistency** | System guarantees that replicas will eventually converge to the same value. |

---

## 2. CRDT Types

### 2.1 State-based (Convergent Replicated Data Type – CvRDT)
- Each replica maintains a **local state**.  
- Periodically **merges** its state with other replicas.  
- Merge function must be **commutative, associative, and idempotent**.

**Example:** G-Counter (Grow-only Counter)  
```text
Node A: 3
Node B: 2
Merge: max(A, B) = 3+2 = 5
````

### 2.2 Operation-based (Commutative Replicated Data Type – CmRDT)

* Replicas send **operations** (increment, add, delete) to others.
* Operations must be **commutative and idempotent**.
* Requires reliable **delivery**, but no need for global state merging.

**Example:** PN-Counter (Positive-Negative Counter)

* Maintain two G-Counters: `P` for increments, `N` for decrements.
* Value = `P - N`.

---

## 3. Common CRDT Structures

| CRDT             | Type            | Description                                            |
| ---------------- | --------------- | ------------------------------------------------------ |
| **G-Counter**    | State-based     | Grow-only counter (only increments)                    |
| **PN-Counter**   | State-based     | Counter supporting increments & decrements             |
| **G-Set**        | State-based     | Grow-only set                                          |
| **2P-Set**       | State-based     | Two-phase set (add/remove with tombstones)             |
| **OR-Set**       | State-based     | Observed-remove set (supports concurrent adds/removes) |
| **LWW-Register** | State-based     | Last-Write-Wins register                               |
| **RGA**          | Operation-based | Replicated growable array (text editing)               |
| **MV-Register**  | State-based     | Multi-value register (captures concurrent updates)     |

---

## 4. CRDT Properties

1. **Convergence:** All replicas eventually reach the same state.
2. **Commutativity:** Merge of operations yields the same result, regardless of order.
3. **Idempotency:** Reapplying the same operation/state does not change the final result.
4. **Monotonicity (for state-based CRDTs):** State only grows (or progresses) to guarantee convergence.

---

## 5. Conflict Resolution in CRDTs

* CRDTs **avoid conflicts** instead of resolving them after the fact.
* Examples:

  * **LWW-Register**: Use timestamp to resolve concurrent writes.
  * **OR-Set**: Track unique identifiers for each element to handle concurrent adds/removes.
* **No coordination** is required between replicas.

---

## 6. Use Cases

* **Collaborative editing:** Google Docs, shared text editors
* **Distributed databases:** Redis CRDTs, Riak, AntidoteDB
* **Messaging systems:** WhatsApp, Matrix for conflict-free message states
* **Edge computing:** Offline-first applications where nodes may be disconnected

---

## 7. Advantages

* **No central coordinator** needed
* **Highly available** under network partitions
* **Deterministic convergence** ensures eventual consistency
* Supports **low-latency local operations**
* Works well for **CRDT-aware caches and real-time collaboration**

---

## 8. Limitations

* **Complexity:** Designing CRDTs for custom data structures can be challenging.
* **Metadata overhead:** Some CRDTs require storing tombstones or version vectors.
* **Not suitable for all workloads:** Sequential consistency or strong consistency guarantees are not provided.
* **Space growth:** Some sets or arrays may grow indefinitely without compaction.

---

## 9. Example: G-Counter

**State:**

```
Node A: {A: 3, B: 0, C: 0}
Node B: {A: 0, B: 2, C: 0}
Node C: {A: 0, B: 0, C: 1}
```

**Merge Function:** element-wise max

```
Merged State: {A:3, B:2, C:1} → Value = 3+2+1 = 6
```

* Any order of merges produces the same final value → **convergence guaranteed**.

---

## 10. Best Practices

* Choose **state-based CRDTs** if network is unreliable (merge states).
* Choose **operation-based CRDTs** if you can guarantee **reliable delivery**.
* Periodically **garbage collect tombstones** in sets to save space.
* Use **unique identifiers** to prevent conflicts in concurrent updates.
* Monitor **metadata growth** to avoid performance degradation.

---

## References

* [Shapiro et al., Conflict-Free Replicated Data Types](https://hal.inria.fr/inria-00555588/document)
* [CRDTs in Riak – Basho Technologies](https://riak.com/learn/crdt/)
* [AntidoteDB – CRDT-based Database](https://antidotedb.eu/)
* [Redis CRDTs – Redis Labs](https://redis.com/)

```
