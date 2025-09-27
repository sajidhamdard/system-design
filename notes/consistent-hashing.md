# **🔗 Consistent Hashing**

**Definition:**

> **Consistent hashing** is a technique used to **distribute data across multiple nodes** in a way that **minimizes data movement** when nodes are added or removed.

* Widely used in **distributed systems, caching, and load balancing**.

---

## **1️⃣ Problem it Solves**

* Naive hashing (mod-based):

  ```
  Node = Hash(Key) % N
  ```

  * If N (number of nodes) changes → **most keys get remapped** → huge data movement.
* **Consistent hashing** reduces remapping to only a **small fraction of keys** when nodes change.

---

## **2️⃣ How It Works**

1. Represent nodes on a **hash ring** (0–2³² or 0–MAX).
2. Hash keys to the **same ring**.
3. Each key is stored in the **first node clockwise** from the key’s hash.

**Text Diagram:**

```
Hash Ring: 0 --------------------------------- 2^32
Nodes:    N1      N2        N3
Keys:     k1   k2   k3   k4
k1 → N2 (first node clockwise)
k2 → N3
k3 → N1
k4 → N2
```

* Adding/removing a node only affects **neighboring keys**.

---

## **3️⃣ Virtual Nodes (VNodes)**

* To handle **uneven load**, each physical node can have **multiple virtual nodes** on the hash ring.
* Improves **load balancing**.

---

## **4️⃣ Advantages**

* **Scalable:** Works efficiently as nodes are added/removed.
* **Minimal disruption:** Only a small fraction of keys are remapped.
* **Balanced load:** With virtual nodes, keys are evenly distributed.

---

## **5️⃣ Use Cases**

* **Distributed caches:** Memcached, Redis Cluster
* **Load balancing:** Request routing to microservices
* **Distributed databases:** Cassandra, DynamoDB

---

## **6️⃣ Analogy**

> Imagine a **circular table (hash ring)** where servers sit at different points.
>
> * Place keys around the table.
> * Each key goes to the **next server clockwise**.
> * Adding/removing a server only affects keys **near that server**, not the whole table.

---

💡 **Key takeaway:**

* **Consistent hashing = minimal remapping + scalable distribution of data**
* Essential for **distributed systems, caching, and fault tolerance**

---
