# **🧩 Data Consistency & Its Levels**

**Definition:**

> **Data consistency** ensures that **all users and systems see the same data at any given point**, following defined rules and constraints.
>
> In distributed systems, **consistency levels** define **how up-to-date or synchronized replicas are**.

---

## **1️⃣ Types / Levels of Consistency**

| Level                           | Description                                                                             | Example / Use Case                           |
| ------------------------------- | --------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Strong Consistency**          | All reads always return the **latest write**.                                           | Banking transactions, inventory systems      |
| **Eventual Consistency**        | Data will eventually become consistent, but **may be stale temporarily**.               | DNS, social media feeds, shopping cart views |
| **Causal Consistency**          | Reads reflect **causal relationships**; if write A causes B, then B is visible after A. | Collaborative editing (Google Docs)          |
| **Read-Your-Write Consistency** | A client always sees its **own writes** immediately.                                    | User profile updates in apps                 |
| **Session Consistency**         | All operations within a **session** see a consistent view.                              | Web sessions in a shopping app               |
| **Monotonic Read/Write**        | Ensures reads/writes **don’t go backward in time**.                                     | Messaging apps, logs                         |

---

## **2️⃣ Why Consistency Matters**

* **Prevent anomalies:** Avoid showing stale or conflicting data.
* **Critical for correctness:** Financial transactions, healthcare records.
* **Tradeoff with availability & latency:** According to **CAP theorem**.

---

## **3️⃣ Consistency vs Latency / Availability**

* **Strong consistency:** Highest correctness, can increase latency.
* **Eventual consistency:** Lower latency, higher availability, temporary stale reads.
* **Tradeoff:** System designers choose the **level based on use case**.

**Text Diagram:**

```
Client → Read/Write → Database Replicas
  |
  ├─ Strong Consistency: Read always latest write
  ├─ Eventual Consistency: Read may be stale
  └─ Session/Read-Your-Write: Client sees own writes immediately
```

---

## **4️⃣ Analogy**

* **Strong Consistency:** Everyone in a classroom sees the **same answer** immediately after the teacher writes it on the board.
* **Eventual Consistency:** Some students see the answer a few seconds later because the message travels through a network.
* **Read-Your-Write:** You always see **your own homework submission**, even if others see it later.

---

💡 **Key takeaway:**

* **Consistency ensures correctness of data** across replicas
* Choose a **consistency level** based on **application requirements**: critical data → strong, less critical → eventual

---
