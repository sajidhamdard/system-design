# 🖥️ 1️⃣ **Ops Dashboard (Operations Dashboard)** — *Basics for Interview*

> A central place where **Operations / Support / Admin** teams can monitor, view, search, and troubleshoot **system issues** quickly without needing developer help.

---

## ✅ **Key features of a good Ops Dashboard (relevant to your project)**

| Feature                    | Example in your project                                            |
| -------------------------- | ------------------------------------------------------------------ |
| **Search / filter logs**   | Search paymentID = 123, see its history                            |
| **Status visibility**      | See payment status = `REFUNDED`, `FAILED`, `PENDING_MANUAL_REVIEW` |
| **Retry/Replay actions**   | Retry failed refund or API call from UI                            |
| **Alerts & Notifications** | DLQ has 5 failed refunds → Ops gets alert                          |
| **Traceability**           | Trace full journey of transaction (via correlationID)              |
| **Audit Logs**             | See which Ops person retried/reconciled                            |

---

## ✨ **Tech stack (practical for your project)**

| Tool                       | Use                                                     |
| -------------------------- | ------------------------------------------------------- |
| **ElasticSearch + Kibana** | You already have for logs → can build dashboards        |
| **Grafana**                | (Optional) Nice dashboards with alerts                  |
| **Custom Admin UI**        | A simple Angular admin panel to view/retry DLQ messages |
| **DLQ Viewer**             | Custom page to view Kafka DLQ messages                  |

---

## 💡 **What to say in Interview? (Sample)**

> *“In our project, we use ElasticSearch and Kibana to create Ops dashboards where our support team can view failed transactions (like payment refunds), DLQ messages, and even retry or escalate them manually. This reduces downtime and ensures eventual consistency even when automated compensation fails.”*

---

# 📦 2️⃣ **Outbox Pattern** — *Detailed & Practical*

## 🧐 **Problem first (why do we need it?)**

In microservices:
Let’s say your **OrderService** does this in a single REST API:

```java
@Transactional
public void placeOrder(Order order) {
   // Step 1: Save order to DB
   orderRepository.save(order);

   // Step 2: Send event to Kafka
   kafkaTemplate.send("order-events", new OrderPlacedEvent(order));
}
```

⚠️ **Problem** →
If **Step 1 succeeds** but **Step 2 fails (Kafka down / network issue)**
→ Your DB says "Order placed"
→ But no event was sent → **Data inconsistency**

---

## 🛡️ **Solution = Outbox Pattern**

### Steps

1. **Instead of sending Kafka event directly, save event to a DB table (`outbox` table)**
   *Same transaction as business data → so both are safe*

```java
@Transactional
public void placeOrder(Order order) {
   orderRepository.save(order);

   OutboxEvent event = new OutboxEvent(
     "OrderPlaced", order.getId(), LocalDateTime.now(), "PENDING"
   );
   outboxRepository.save(event);
}
```

2. **A separate background thread (poller)** keeps checking `outbox` table
   If event status = `PENDING` → send to Kafka
   If successful → mark `SENT`
   If fails → retry or DLQ

---

## 🗂️ **Outbox table schema**

| id | event\_type     | payload          | status  | created\_at |
| -- | --------------- | ---------------- | ------- | ----------- |
| 1  | OrderPlaced     | {orderId: 123}   | PENDING | 2025-05-05  |
| 2  | PaymentRefunded | {paymentId: 987} | SENT    | 2025-05-05  |

---

## 💡 **Key benefits**

✅ No data inconsistency
✅ Safe even if Kafka is down temporarily
✅ Works nicely with **exactly-once** semantics
✅ Can combine with **Debezium (CDC)** to automate event publishing (optional advanced)

---

## ✍️ **What to say in Interview? (Sample Answer)**

> *“To avoid dual-write problems between DB and Kafka, we follow Outbox pattern. Our services first save business data + event in same DB transaction. A poller then reliably publishes events to Kafka and marks them sent. This guarantees consistency even if Kafka is down momentarily.”*

---

# 🏆 **Summary for You (Your project context)**

✅ **Ops Dashboard**
— Your Kibana + DLQ viewer → for Ops to see, retry, reconcile
✅ **Outbox Pattern**
— Helps when service emits events to Kafka after DB updates → to keep data consistent
