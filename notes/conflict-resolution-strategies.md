## ⚙️ What is a Conflict?

**Definition:**

> In a **distributed system**, a conflict occurs when **multiple replicas of the same data diverge**, usually because **concurrent updates** happen on different nodes.

* Example: Two users edit the same document offline → when syncing, replicas may disagree.

**Goal:**

* Resolve conflicts **automatically or manually** so data remains **consistent**.

---

## 1️⃣ **Last-Write-Wins (LWW)**

**Concept:**

* Each update has a **timestamp** (logical or physical).
* The system **accepts the update with the latest timestamp**, discarding others.

**Pros:**

* Simple to implement
* Deterministic

**Cons:**

* Can **lose updates** if multiple writes occur almost simultaneously
* May overwrite important changes

**Example:**

| Node A          | Node B          |
| --------------- | --------------- |
| Value: 10       | Value: 15       |
| Timestamp: 1000 | Timestamp: 1005 |

* After sync → **Value = 15** (latest timestamp wins)

**Use Cases:**

* Caching systems, simple key-value stores (e.g., Riak, DynamoDB optional LWW mode)

---

## 2️⃣ **Merges / CRDTs (Conflict-Free Replicated Data Types)**

**Concept:**

* Instead of overwriting, **merge changes** from different replicas to preserve all updates.
* CRDTs are **data structures designed for automatic merging without conflicts**.

**Types of Merges:**

1. **Set merge** → combine elements from both replicas

   * Example: `{a, b}` + `{b, c}` → `{a, b, c}`
2. **Counter merge** → sum increments

   * Example: +1 on node A, +2 on node B → total = 3
3. **Custom merges** → application-specific logic (e.g., concatenating strings, merging JSON)

**Pros:**

* No data loss
* Deterministic and consistent

**Cons:**

* More complex to implement
* May require careful data modeling

**Use Cases:**

* Collaborative editing (Google Docs, CRDT-based apps)
* Distributed counters, shopping carts

---

## 3️⃣ **Manual Conflict Resolution**

* Conflicts are detected → **users resolve them manually**.
* Often used when **automated merging is not meaningful**.
* Example: Git merge conflicts → developer chooses which code to keep.

---

## 4️⃣ **Operational Transformation (OT)**

* Used in **real-time collaborative apps**
* Operations (like insert/delete) are **transformed** based on concurrent changes to maintain consistency
* Example: Google Docs uses OT to merge multiple users editing a document

---

## 🔧 Comparison Table

| Strategy     | Automatic? | Data Loss Risk | Complexity  | Use Case                        |
| ------------ | ---------- | -------------- | ----------- | ------------------------------- |
| LWW          | ✅          | High           | Low         | Key-value stores, caches        |
| Merge / CRDT | ✅          | Low            | Medium-High | Collaborative apps, counters    |
| Manual       | ❌          | None           | Low         | Complex domain-specific data    |
| OT           | ✅          | Low            | High        | Real-time collaborative editing |

---

## 🧩 Analogy

* **LWW:** “Who shouted last, wins” → simple but might ignore other voices
* **Merge / CRDT:** “Combine all voices” → everyone’s input is preserved
* **Manual:** “Let a judge decide” → human resolves conflicts
* **OT:** “Adjust words dynamically as people type” → everyone sees consistent document

---

✅ **Key Takeaways**

1. Conflicts arise in distributed systems due to **concurrent updates**.
2. **Last-write-wins** → simple, may lose data
3. **Merges / CRDTs** → preserve all updates, deterministic
4. **Manual resolution** → human intervention
5. **Operational Transformation** → for real-time collaboration

---
