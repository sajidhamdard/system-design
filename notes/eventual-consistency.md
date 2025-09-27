# **🕰️ Eventual Consistency**

**Definition:**

> Eventual consistency is a **consistency model in distributed systems** where **all replicas of data will become consistent over time**, but **immediate consistency is not guaranteed**.

It’s commonly used in **highly available, distributed databases** like **Cassandra, DynamoDB, or Riak**.

---

## **1️⃣ How It Works**

1. Data is **written to one node** in the system.
2. Changes are **propagated asynchronously** to other nodes.
3. During propagation, **different nodes may return different values**.
4. Eventually, all nodes **converge to the same value**.

**Key Point:**

* **Immediate reads may return stale data**, but system guarantees **convergence eventually**.

---

## **2️⃣ Example Scenario**

* Distributed DB with **3 nodes**: A, B, C
* Initial value of `x = 10`

```
Client updates x = 20 on Node A
Node A → B → C (asynchronously)
Before propagation: 
  Node A = 20
  Node B = 10
  Node C = 10
Eventually: 
  Node A = 20
  Node B = 20
  Node C = 20
```

* Reads may return **stale values** until all nodes are updated.

---

## **3️⃣ Pros and Cons**

| Pros                             | Cons                                   |
| -------------------------------- | -------------------------------------- |
| High availability and uptime     | Reads may be stale                     |
| Better performance & low latency | Not suitable for critical transactions |
| Fault-tolerant                   | Complex conflict resolution            |

---

## **4️⃣ Use Cases**

* Social media feeds (e.g., likes count)
* Shopping cart updates in e-commerce
* DNS replication
* Event logging systems

---

## **5️⃣ Analogy**

> Imagine **writing a note on a whiteboard in a classroom**:
>
> * Teacher writes the note on **one board** first.
> * Students in other corners **see it a little later**.
> * Eventually, **all students have the same note**.

---

💡 **Key takeaway:**

* **Eventual consistency = “It will be correct eventually.”**
* Trade-off between **consistency** and **availability/performance** (CAP theorem).

---
