## 🧠 **What is Dedupe Storage / Idempotency Keys?**

**Deduplication storage** is a technique where a system stores **unique keys (idempotency keys)** to **prevent processing the same request or message multiple times**.

* Helps achieve **idempotent operations**
* Often used in **payments, APIs, messaging systems, and batch processing**
* Essential when **at-least-once delivery** is used

---

## ⚡ **Why It’s Needed**

In distributed systems, failures and retries can cause:

* Duplicate API requests
* Duplicate messages from queues
* Double payments or orders

**Solution:** Generate a **unique idempotency key** per request, store it, and **check before processing**.

---

## 🧩 **How Idempotency Keys Work**

### 1️⃣ Request Flow

1. Client generates a **unique idempotency key** (e.g., UUID)
2. Sends request to server with key
3. Server checks **dedupe storage**:

   * **Key exists** → return previous result
   * **Key does not exist** → process request, store key + result

### 2️⃣ Storage Options

* In-memory cache (Redis) → fast, short TTL
* Database table → persistent, for long-term idempotency
* Dedicated dedupe storage service

---

## 💻 **Example: Payment API (Java + Redis)**

```java
String idempotencyKey = request.getHeader("Idempotency-Key");

// Check Redis
if (redis.exists(idempotencyKey)) {
    return redis.get(idempotencyKey); // Return previous response
}

// Process payment
PaymentResult result = processPayment(request);

// Store result in Redis with TTL (e.g., 24h)
redis.set(idempotencyKey, result, 24, TimeUnit.HOURS);

return result;
```

* **Redis TTL** ensures storage doesn’t grow indefinitely
* Guarantees **no duplicate processing** even if client retries

---

## 🔑 **Best Practices**

1. **Unique & unpredictable keys**

   * Usually **UUIDv4** or hash of request body + user ID
2. **Short TTL for ephemeral requests**

   * e.g., 24 hours for payment retries
3. **Atomic storage check-and-set**

   * Prevent race conditions in high concurrency
4. **Store result, not just key**

   * Allows returning **exact same response** for retries

---

## 🧩 **Analogy**

Think of it like a **ticketing system** 🎟️:

* Each ticket has a **unique number** (idempotency key)
* If someone tries to buy again with the same ticket number, the system says:

> “You already bought this ticket — here’s your receipt”

---

## ✅ **Summary**

| Concept                   | Purpose                       | Storage                    | Use Case                                         |
| ------------------------- | ----------------------------- | -------------------------- | ------------------------------------------------ |
| **Idempotency Key**       | Prevent duplicate processing  | Redis, DB, dedicated store | Payments, API requests, messaging                |
| **Deduplication Storage** | Tracks processed keys/results | Fast & atomic              | At-least-once messaging, retries, micro-batching |

---
