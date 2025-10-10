## ⚙️ What is **Redis Streams**?

**Definition:**

> Redis Streams is a **log-based data structure** in Redis, designed for **storing, processing, and consuming real-time streams of data**.

* Think of it as a **persistent, append-only message queue**.
* Supports **multiple producers** and **multiple consumers**.
* Useful for **event sourcing, message queues, data pipelines**.

**Analogy:**

* Like a **Kafka topic**, but fully managed **in Redis**.

---

## 🔄 Key Concepts

| Term                           | Description                                        |
| ------------------------------ | -------------------------------------------------- |
| **Stream**                     | The data structure itself (like a topic)           |
| **Entry**                      | Individual message/event in the stream             |
| **ID**                         | Unique identifier for each entry (timestamp-based) |
| **XADD**                       | Command to **add an entry** to a stream            |
| **XRANGE / XREVRANGE**         | Read entries from a stream                         |
| **Consumer Group**             | Group of consumers that **share messages**         |
| **XREAD / XREADGROUP**         | Commands to **consume messages**                   |
| **Pending Entries List (PEL)** | Tracks messages **delivered but not acknowledged** |

---

## 🔧 Basic Commands

1. **XADD** – Add a message to the stream

```bash
XADD mystream * user "Alice" action "login"
```

* `*` → auto-generated ID based on timestamp
* `user` and `action` → fields of the message

2. **XRANGE** – Read messages by range

```bash
XRANGE mystream - +
```

* `-` → start (oldest)
* `+` → end (newest)

3. **XREAD** – Read messages from one or more streams

```bash
XREAD COUNT 10 STREAMS mystream 0
```

4. **Consumer Groups** – multiple consumers share the load

```bash
XGROUP CREATE mystream mygroup $ MKSTREAM
XREADGROUP GROUP mygroup Alice COUNT 10 STREAMS mystream >
```

* `>` → fetch new messages
* Each consumer in the group gets **different messages** (like queue semantics)

5. **Acknowledgement (XACK)** – mark message as processed

```bash
XACK mystream mygroup 1696890000000-0
```

---

## 🔄 Features of Redis Streams

1. **Persistent Storage**

   * Unlike normal Pub/Sub, streams **store messages**, so consumers can read later.

2. **Multiple Consumers & Consumer Groups**

   * Scale processing horizontally.

3. **Automatic IDs**

   * Unique, time-ordered IDs for each entry.

4. **Message Acknowledgment & PEL**

   * Track pending messages → ensures **exactly-once processing** in consumer groups.

5. **Efficient Range Queries**

   * Read entries by ID range → supports **time-based processing**.

---

## 🧩 Example Use Case

**Scenario:** Logging user actions in real-time:

1. Microservices produce events:

   * `user_signup`, `user_login`, `order_placed`
2. Each event is `XADD`ed to a Redis stream:
   `XADD user-events * type "login" user_id "1234"`
3. Consumer group processes events:

   * Service A → Analytics
   * Service B → Notifications
4. Messages are acknowledged after processing (`XACK`)

* Guarantees **no message is lost**, multiple consumers can process independently.

---

## ⚡ Redis Streams vs Pub/Sub

| Feature         | Redis Pub/Sub                    | Redis Streams                     |
| --------------- | -------------------------------- | --------------------------------- |
| Persistence     | ❌ Messages lost if no subscriber | ✅ Messages stored in stream       |
| Consumer Groups | ❌ Not supported                  | ✅ Supported                       |
| Replay          | ❌ No                             | ✅ Yes, using IDs                  |
| Exactly-once    | ❌ Hard                           | ✅ Using PEL & XACK                |
| Use Case        | Real-time notifications          | Event sourcing, queues, pipelines |

---

## 🧭 Key Takeaways

* **Redis Streams = log-based, persistent data structure** for real-time events.
* Supports **producer-consumer model** with **consumer groups**.
* Guarantees **message durability, replay, and acknowledgment**.
* Great for **real-time pipelines, microservices communication, and analytics events**.

---

💡 **Analogy:**

* Streams = **train track**, each entry = **passenger**.
* Consumers = **stations**, PEL = **tickets of passengers not yet delivered**.

---
