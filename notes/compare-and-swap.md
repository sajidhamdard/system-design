# **🔄 Versioning (Compare-And-Swap / CAS)**

**Definition:**

> **Compare-And-Swap (CAS)** is a concurrency control technique used in **optimistic locking** where a value is updated **only if it hasn’t changed since it was last read**.
> Often implemented via a **version number** associated with a record or object.

It’s widely used in **databases, caches, and multi-threaded programming**.

---

## **1️⃣ How CAS Works**

1. Each record has a **version number** (or timestamp).
2. **Read** the value and its version.
3. **Compute new value**.
4. **Update** the value **only if the version matches** the version you read.
5. If the version has changed (someone else updated it), **retry** or abort.

**Pseudocode Example:**

```java
// Read current value and version
(oldValue, oldVersion) = read(key)

// Compute new value
newValue = oldValue + 1

// Attempt to update
if (currentVersion(key) == oldVersion) {
    write(key, newValue, oldVersion + 1)
} else {
    // Retry because value changed
}
```

---

## **2️⃣ Advantages**

* **Non-blocking:** No locks needed → avoids deadlocks.
* **High concurrency:** Multiple threads can attempt updates without waiting.
* **Safe for distributed systems:** Ensures data consistency with minimal locking.

---

## **3️⃣ Disadvantages**

* **Retry overhead:** Multiple retries may occur under high contention.
* **Complex for multiple fields:** Works best for **single variable updates**.
* **Not suitable for very high-conflict scenarios:** Locks might be better.

---

## **4️⃣ Use Cases**

* **Databases:** Optimistic locking using version numbers.
* **Distributed caches:** Redis `WATCH` + `MULTI` uses CAS-like logic.
* **Multithreading:** Atomic operations in Java (`AtomicInteger.incrementAndGet()`) or C++ (`std::atomic`).
* **Counters / Inventory systems:** Ensure correct increments/decrements without locks.

---

## **5️⃣ Analogy**

> Think of CAS like **signing a contract with a version number**:
>
> * You agree to a deal at **version 5**.
> * Before submitting, if someone else already updated to **version 6**, your agreement is rejected → you need to **re-read and retry**.

---

💡 **Key takeaway:**
CAS allows **safe concurrent updates without locking**, but may require retries under high contention. It’s the core of **optimistic concurrency control**.

---
