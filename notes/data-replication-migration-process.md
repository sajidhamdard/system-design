# **💾 Data Replication & Migration**

These are critical for **high availability, scaling, and moving data across systems or environments**.

---

## **1️⃣ Data Replication**

**Definition:**

> **Data replication** is the process of **copying and maintaining the same data across multiple databases or storage systems**.

**Purpose:**

* **High availability & fault tolerance** → if one node fails, others serve the data
* **Load balancing** → distribute read traffic across replicas
* **Disaster recovery** → backup copies in different regions

---

### **a) Types of Replication**

| Type          | Description                                      | Use Case                                 |
| ------------- | ------------------------------------------------ | ---------------------------------------- |
| Master-Slave  | One master handles writes, slaves replicate data | Read scaling, backup                     |
| Master-Master | Multiple nodes handle reads & writes             | High availability                        |
| Synchronous   | Data written to replicas **before commit**       | Strong consistency                       |
| Asynchronous  | Data written to replicas **after commit**        | Better performance, eventual consistency |

---

### **b) How Replication Works (Flow)**

```
Primary DB → Log / Event Stream → Replica DBs
```

1. Write occurs on **primary database**.
2. Change is **captured** (via logs, triggers, CDC).
3. Changes are **applied to replicas**.
4. Replicas are **read-only or read-write** depending on the setup.

---

### **c) Tools / Approaches**

* Database built-in replication: MySQL replication, PostgreSQL streaming replication
* CDC-based replication: Debezium + Kafka
* Cloud managed: AWS RDS Read Replicas, Google Cloud SQL replicas

---

## **2️⃣ Data Migration**

**Definition:**

> **Data migration** is the process of **moving data from one database/system to another**, often during upgrades, cloud migration, or scaling.

**Purpose:**

* **Upgrade DB** (old → new version)
* **Move to cloud** (on-prem → cloud DB)
* **Change schema or DB type** (SQL → NoSQL)

---

### **a) Types of Migration**

| Type                      | Description                                    |
| ------------------------- | ---------------------------------------------- |
| Offline / Batch Migration | Take DB offline, migrate all data              |
| Online / Live Migration   | Migrate while system is running                |
| Homogeneous Migration     | Same DB type (e.g., MySQL → MySQL)             |
| Heterogeneous Migration   | Different DB types (e.g., Oracle → PostgreSQL) |

---

### **b) How Migration Works (Flow)**

**Step 1:** Extract data from source → **ETL or replication tools**
**Step 2:** Transform data (if needed) → e.g., schema conversion
**Step 3:** Load data into target database → validate integrity
**Step 4:** Switch traffic to target database

**Text Diagram:**

```
Source DB → Extract → Transform → Load → Target DB
```

---

### **c) Tools / Approaches**

* **ETL tools**: Talend, Informatica
* **Database migration tools**: AWS DMS, Flyway, Liquibase
* **Custom scripts / CDC-based streaming**: Kafka, Debezium

---

## **3️⃣ Best Practices**

1. **Plan & Test Migration** → schema, data types, and indexes
2. **Monitor replication lag** → ensure replicas are up-to-date
3. **Use versioned backups** → fallback in case of failure
4. **Validate data consistency** → checksum, row counts
5. **Minimize downtime** → use online migration if critical

---

## **4️⃣ Analogy**

* **Replication:** Like making **real-time copies of a file** on multiple servers → if one copy fails, others are still accessible.
* **Migration:** Like **moving all files from an old hard drive to a new one**, maybe converting formats along the way.

---

💡 **Key takeaway:**

* **Replication = keep multiple copies in sync for availability/scaling**
* **Migration = move data safely from one system to another**

---
