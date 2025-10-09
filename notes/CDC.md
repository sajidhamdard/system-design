# **📡 CDC in Cache – Change Data Capture**

**Definition:**

> **CDC (Change Data Capture)** is a technique to **detect and capture changes in a database** (inserts, updates, deletes) and **propagate those changes to other systems**, like caches or downstream services.

In caching systems, CDC ensures the **cache stays consistent with the database** without having to frequently poll the DB.

---

## **1️⃣ Why CDC is Needed for Cache**

* Traditional caching strategies:

  * **Write-through / write-behind**: Updates cache when DB changes.
  * **Time-to-live (TTL)**: Cache expires after a set time.
* Problem: High traffic DB or multiple apps → cache might become **stale** or inconsistent.
* Solution: **CDC listens to DB changes and updates the cache in real-time.**

---

## **2️⃣ How It Works**

1. DB change occurs (insert/update/delete).
2. **CDC system captures the change** (via logs, triggers, or streaming).
3. **Cache is updated automatically** with the new value.

**Flow (Text Diagram):**

```
Database ---> CDC ---> Cache ---> Applications
   |            |
   |      Change detected
   |            |
Update cache automatically
```

---

## **3️⃣ Benefits**

* **Real-time cache updates** → reduces stale reads.
* **Improves performance** → fewer DB queries.
* **Scales well** → supports high-throughput systems.
* **Decouples cache from application logic** → less complexity in app code.

---

## **4️⃣ Common Implementations**

* **Debezium + Kafka** → capture DB changes and update cache.
* **Redis with CDC support** → automatically listens to DB events.
* **Database triggers + messaging queue** → push changes to cache.

---

## **5️⃣ Analogy**

> Imagine a **whiteboard in an office**:
>
> * Any time someone updates the **master notebook (DB)**,
> * A **messenger (CDC)** immediately updates the **whiteboard (cache)** so everyone sees the latest info.

---

💡 **Key takeaway:**

* **CDC = real-time cache consistency.**
* It **captures DB changes** and **synchronizes cache automatically**, avoiding stale data and expensive polling.

---

# **📡 Change Data Capture (CDC) in Database**

**Definition:**

> **CDC is a technique used to detect and capture changes in a database**—like **inserts, updates, and deletes**—and make those changes available to **other systems in real-time or near real-time**.

It’s widely used for **replicating data, syncing caches, event streaming, and analytics pipelines**.

---

## **1️⃣ How CDC Works**

1. **Data changes in the source database** (insert/update/delete).
2. CDC **detects these changes** (via logs, triggers, or database hooks).
3. Changes are **published to a stream or message system** (e.g., Kafka).
4. **Target systems** (analytics, cache, other DBs, microservices) **consume these changes**.

**Flow (Text Diagram):**

```
Source DB → CDC → Message Queue / Stream → Target System (Cache, DB, Analytics)
```

---

## **2️⃣ Implementation Methods**

| Method                        | How It Works                                                  |
| ----------------------------- | ------------------------------------------------------------- |
| Database Logs (Log-Based CDC) | Reads **transaction logs** (e.g., MySQL binlog, Postgres WAL) |
| Triggers (Trigger-Based CDC)  | Executes **triggers on table changes**                        |
| Timestamp/Version Column      | Checks rows with **updated timestamps or version numbers**    |

---

## **3️⃣ Benefits**

* **Real-time data replication** → target systems are always updated.
* **Decouples systems** → source DB doesn’t need to know about consumers.
* **Supports event-driven architecture** → trigger downstream actions automatically.
* **Efficient** → only changed data is transmitted, not the entire dataset.

---

## **4️⃣ Use Cases**

* **Cache synchronization**: Keep Redis or Memcached updated.
* **Analytics pipelines**: Stream changes to data warehouses (e.g., Snowflake, BigQuery).
* **Microservices**: Share state changes between services.
* **Data replication**: Between different databases or cloud regions.

---

## **5️⃣ Analogy**

> Imagine a **journalist taking notes at a live event**:
>
> * Instead of reporting the **entire story repeatedly**, they **note only what changes or happens next**.
> * Subscribers (readers, news channels) **receive only the updates**, not the full content every time.

---

💡 **Key takeaway:**

* **CDC = capture and stream database changes in real-time**
* Enables **data sync, event-driven processing, and analytics** efficiently.

---

## **1️⃣ What is CDC (Change Data Capture)?**

**Change Data Capture (CDC)** is a technique that **tracks changes in a database** — like inserts, updates, or deletes — and makes them **available to other systems** in real time.

### 🔹 Purpose:

* Keep **databases, data warehouses, or microservices in sync**
* Enable **real-time analytics**
* Avoid **polling the database** repeatedly (which is inefficient)

### 🔹 How It Works:

1. CDC monitors the **database’s transaction log** (like MySQL binlog, PostgreSQL WAL).
2. Captures **every change** (insert, update, delete).
3. Converts it into a **stream of events** that other systems can consume.

---

### 🔹 Example:

Suppose you have a **MySQL table `orders`**:

| order_id | customer | status  |
| -------- | -------- | ------- |
| 1        | Alice    | pending |

If a new order is inserted:

```sql
INSERT INTO orders VALUES (2, 'Bob', 'pending');
```

A CDC system will **capture this change** and send an event like:

```json
{
  "operation": "insert",
  "table": "orders",
  "data": {
    "order_id": 2,
    "customer": "Bob",
    "status": "pending"
  }
}
```

---

## **2️⃣ What is Debezium?**

**Debezium** is an **open-source CDC platform** that:

* Connects to **databases**
* Monitors their **transaction logs**
* Streams the **captured changes as events** (usually into **Kafka**)

---

### 🔹 Key Features of Debezium:

* Supports **multiple databases**: MySQL, PostgreSQL, SQL Server, MongoDB, Oracle, etc.
* Captures **real-time changes** (insert, update, delete)
* Sends **structured events** to **Kafka topics** or other messaging systems
* **Non-intrusive**: reads **logs** instead of querying tables repeatedly
* Supports **schema evolution** (tracks table structure changes)

---

### 🔹 How Debezium Fits in Architecture:

```
[Database] → [Debezium Connector] → [Kafka Topic] → [Microservices / Data Warehouse / Analytics]
```

* **Database**: e.g., MySQL
* **Debezium Connector**: reads binlog/WAL
* **Kafka Topic**: streams each change as an event
* **Consumers**: other services, dashboards, or warehouses consume events in real time

---

### 🔹 Example Use Case

**Scenario**: You have a MySQL database and want your **search index (Elasticsearch)** to update in real time when data changes.

**Without CDC**:

* Poll the database every few minutes → inefficient and slow

**With Debezium CDC**:

* Debezium detects the change instantly → sends the event to Kafka → Elasticsearch updates immediately

---

### 🔹 Event Example from Debezium:

```json
{
  "before": {"order_id": 1, "status": "pending"},
  "after": {"order_id": 1, "status": "shipped"},
  "source": {"db": "shop", "table": "orders"},
  "op": "u",   // u = update, c = create, d = delete
  "ts_ms": 1696930000000
}
```

---

### 🔹 Benefits of Using Debezium / CDC:

✅ Real-time data replication & analytics
✅ Low impact on the source database (reads logs, not tables)
✅ Enables **event-driven architectures**
✅ Scales well for multiple consumers
✅ Keeps microservices **event-driven and synchronized**

---

In short:

* **CDC** = the concept of capturing changes from a database.
* **Debezium** = a tool that implements CDC and streams changes to Kafka or other systems.

---
