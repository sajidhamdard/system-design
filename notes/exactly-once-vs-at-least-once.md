## 🧠 **Delivery Semantics**

When messages/events are sent between systems (like Kafka, RabbitMQ, or a microservice), there are **three common delivery guarantees**:

1. **At-most-once** – message may be delivered **once or not at all**
2. **At-least-once** – message is delivered **one or more times**
3. **Exactly-once** – message is delivered **exactly once**, no duplicates

We’ll focus on **At-least-once vs Exactly-once**.

---

## 1️⃣ **At-Least-Once Delivery**

* Ensures **every message is processed at least once**
* Messages **can be duplicated** due to retries
* Simpler to implement
* Often used in **streaming and messaging systems**

### 🔹 Example

Suppose a payment system processes an event:

1. Event sent to service
2. Service crashes before acknowledging
3. Event is retried → **message processed twice**

```text
Event: "Charge $100 to user"
Processing: 2 times → user may get charged twice
```

✅ Pros: No message lost
❌ Cons: Duplicate messages, need idempotent processing

---

## 2️⃣ **Exactly-Once Delivery**

* Ensures **each message is processed exactly once**
* No duplicates, no data loss
* Harder to implement, usually requires **transactional processing**
* Common in **streaming systems like Kafka with transactional writes**

### 🔹 Example

Same payment system:

1. Event sent to service
2. Service crashes before acknowledging
3. Event retried
4. System ensures **charge happens only once**

✅ Pros: No duplicates, consistent state
❌ Cons: More complex, may impact performance

---

## 3️⃣ **Comparison Table**

| Feature        | At-Least-Once                      | Exactly-Once                               |
| -------------- | ---------------------------------- | ------------------------------------------ |
| Guarantee      | Process ≥1 times                   | Process =1 time                            |
| Risk           | Duplicates                         | No duplicates                              |
| Complexity     | Low                                | High                                       |
| Latency        | Low                                | Higher (transactional overhead)            |
| Implementation | Retry logic, idempotent operations | Transactions, deduplication, atomic writes |
| Use Case       | Logging, analytics, notifications  | Financial transactions, inventory updates  |

---

## 🔧 **How Exactly-Once is Implemented**

1. **Idempotent Consumers**

   * Consumer ignores duplicate messages based on a **unique message ID**

2. **Atomic Writes**

   * Write to **output topic/DB** only if processing is successful

3. **Transactional Messaging**

   * Systems like **Kafka transactions** guarantee atomic commit across multiple partitions

---

## 🔑 **Analogy**

Think of mailing letters:

* **At-least-once:** You mail a letter. If the postman loses it, you resend → recipient may get 2 letters.
* **Exactly-once:** You mail a letter, and the system ensures the recipient **gets exactly 1 letter**, no duplicates, even if retries occur.

---

### ⚡ **Summary**

* **At-least-once:** No data loss, duplicates possible, simpler
* **Exactly-once:** No duplicates, guaranteed processing once, harder & heavier
* **Trade-off:** Performance vs reliability

---
