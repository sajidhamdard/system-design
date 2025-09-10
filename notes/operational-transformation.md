# 🔹 What is Operational Transformation (OT)?

**Operational Transformation (OT)** is an algorithm that enables **real-time collaboration** by allowing multiple users to edit the same document simultaneously while ensuring **consistency** (everyone sees the same final state).

👉 Problem: If two people type at the same time, edits may conflict. OT ensures the document converges to the **same state** on all clients, regardless of the order of operations.

---

# 🔹 The Core Idea

* Every edit (insert, delete, replace) is represented as an **operation**.
* When two operations happen concurrently, OT **transforms** one operation against the other so both can be applied without conflict.
* This ensures **intention preservation** → each user’s action has the effect they intended, even if others edit in parallel.

---

# 🔹 Example

Document = `"hello"`

👩 User A: inserts `"X"` at position 0 → `Insert(0, "X")`
👨 User B: inserts `"Y"` at position 5 → `Insert(5, "Y")`

If processed in order:

* Apply A: `"Xhello"`
* Apply B: `"XhelloY"` ✅

But what if applied in opposite order?

* Apply B first: `"helloY"`
* Now A’s operation (`Insert(0, "X")`) still works: `"XhelloY"` ✅

No problem here.

---

### Conflict Example

Document = `"hello"`

👩 User A: deletes `"h"` at position 0 → `Delete(0)`
👨 User B: inserts `"X"` at position 1 → `Insert(1, "X")`

If processed in order:

* Apply A: `"ello"`
* Apply B (Insert at 1): `"eXllo"`

If processed in reverse:

* Apply B: `"hXello"`
* Apply A (Delete at 0) → `"Xello"`

⚠️ Results differ (`"eXllo"` vs `"Xello"`)

---

# 🔹 How OT Fixes This

OT defines **transformation rules** so operations are adjusted before applying:

When B’s `Insert(1, "X")` sees that A deleted `"h"` at 0,

* The insertion point shifts left → becomes `Insert(0, "X")`.

Now both orders lead to `"Xello"`. ✅

---

# 🔹 Properties OT Must Ensure

1. **Convergence** → All users end with the same document.
2. **Causality preservation** → Operations respect their logical order.
3. **Intention preservation** → Each user’s edits have the effect they intended.

---

# 🔹 Where OT is Used

* **Google Docs** (classic implementation).
* **Etherpad, ShareJS**.
* **Real-time collaborative editors**.

---

# 🔹 OT vs CRDT (Conflict-free Replicated Data Types)

* **OT** → transform operations on-the-fly, requires central server for coordination.
* **CRDT** → mathematical structures designed for distributed systems, allow eventual consistency without central server.
* Modern apps (like Figma) often prefer **CRDTs** over OT for decentralized sync.

---

✅ In summary:
**OT = algorithm that transforms concurrent operations so all users end up with the same final state, preserving intention.**

---
