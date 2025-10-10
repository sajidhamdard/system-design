## **1. Document DB**

* **Definition**: A **NoSQL database** that stores data as **documents** (usually JSON or BSON format).
* **Structure**:

  * Flexible schema → each document can have different fields.
  * Data is grouped logically as collections.
* **Best for**:

  * Applications dealing with **semi-structured data**.
  * Use cases where fields/attributes may change often.

👉 **Examples**: MongoDB, Amazon DocumentDB, CouchDB.

---

## **2. Columnar DB**

* **Definition**: A **database optimized for analytics**, stores data by **columns instead of rows**.
* **Structure**:

  * Each column’s values are stored together → makes aggregations very fast.
  * Typically used for **OLAP (analytical queries)**, not transactional workloads.
* **Best for**:

  * **Read-heavy, analytical queries** like aggregations, sums, averages.
  * Data warehouses and BI tools.

👉 **Examples**: Apache Cassandra, HBase (NoSQL columnar), Amazon Redshift, ClickHouse (analytical column stores).

---

## **3. Key Differences**

| Feature           | **Document DB**                                           | **Columnar DB**                                          |
| ----------------- | --------------------------------------------------------- | -------------------------------------------------------- |
| **Data Model**    | JSON/BSON documents                                       | Columns (column families)                                |
| **Schema**        | Flexible (schema-less)                                    | More rigid (but optimized for analytics)                 |
| **Best Use Case** | Real-time apps, catalogs, user profiles, IoT              | Analytics, reporting, BI, big data                       |
| **Query Pattern** | Good for searching/filtering documents                    | Good for aggregations, aggregating over billions of rows |
| **Performance**   | Fast for CRUD (create, read, update, delete) on documents | Fast for scanning large data & aggregations              |
| **Examples**      | MongoDB, CouchDB, Amazon DocumentDB                       | Cassandra, HBase, Redshift, ClickHouse                   |

---

## **4. Simple Analogy**

* **Document DB** → Like a **folder of files (documents)**, each file can look different. Easy to add/remove fields.
* **Columnar DB** → Like an **Excel sheet optimized for columns**. If you want the **sum of a column**, it’s super fast because all column values are stored together.

---

✅ So in short:

* **DocumentDB** = Flexible, schema-less, best for apps with dynamic and semi-structured data.
* **Columnar DB** = Optimized for analytics, best for querying large volumes of structured data.

---

## **1. DocumentDB Example (e.g., MongoDB, Amazon DocumentDB)**

Stores data as **JSON-like documents** (each record can have different fields).

```json
{
  "order_id": 101,
  "customer": {
    "id": 1,
    "name": "Alice"
  },
  "items": [
    {"product": "Laptop", "price": 1000, "qty": 1},
    {"product": "Mouse", "price": 20, "qty": 2}
  ],
  "total_amount": 1040,
  "payment_status": "Paid",
  "order_date": "2025-09-09"
}
```

👉 Features:

* Can store nested objects (`customer`, `items`).
* Flexible → next order might have **extra fields** like `discount` or `shipping_address` without breaking schema.
* Great for applications where data structure changes often.

---

## **2. Columnar DB Example (e.g., Cassandra, Redshift, ClickHouse)**

Stores **columns together** instead of rows → efficient for aggregations.

```
Table: sales

order_id | customer_id | product  | price | qty | total_amount | payment_status | order_date
---------------------------------------------------------------------------------------------
101      | 1           | Laptop   | 1000  | 1   | 1040         | Paid           | 2025-09-09
101      | 1           | Mouse    | 20    | 2   | 1040         | Paid           | 2025-09-09
```

👉 Features:

* Each **column is stored separately**:

  * `order_id` column: \[101, 101]
  * `customer_id` column: \[1, 1]
  * `product` column: \[Laptop, Mouse]
* If you run `SELECT SUM(total_amount) FROM sales`, it reads only that column → super fast.
* Best for analytics queries across billions of rows.

---

✅ **Summary**

* **DocumentDB**: Flexible JSON-like, good for applications (e-commerce, user profiles, dynamic fields).
* **ColumnarDB**: Stores by columns, good for analytics (BI dashboards, big data queries).

---
