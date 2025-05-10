## **What is CAP theorem?**

> **CAP theorem says: In a distributed system, you can only guarantee 2 out of 3 properties at the same time.**

| **C** | Consistency → All nodes show **same data** at same time                                 |
| ----- | --------------------------------------------------------------------------------------- |
| **A** | Availability → System **always responds** (even if partial/failure)                     |
| **P** | Partition tolerance → System **keeps working** even if **network breaks** between nodes |

---

## **Quick example to understand**

Let’s say we have **2 DB nodes** (Node 1 & Node 2)
User tries to **update profile photo**

→ **Partition** = Network break between Node 1 & Node 2

Now you have to choose:

| **Option**                                                              | **Keep C + P (No A)**                                        | **Keep A + P (No C)** |
| ----------------------------------------------------------------------- | ------------------------------------------------------------ | --------------------- |
| Block writes until nodes sync → **No response to user** (not available) | Allow writes on both nodes → Data may **differ temporarily** |                       |

---

## **Summary table (very easy)**

| **Pick 2** | **Means**                                       | **Example DB**                             |
| ---------- | ----------------------------------------------- | ------------------------------------------ |
| **C + A**  | No Partition tolerance (fails on network split) | **SQL (single-node)**                      |
| **C + P**  | Sacrifice Availability (system blocks ops)      | **HBase, Mongo (strong consistency mode)** |
| **A + P**  | Sacrifice Consistency (eventual consistency)    | **Cassandra, DynamoDB, Couchbase**         |

---

## **Real-life analogy (very easy)**

> You send a **WhatsApp message**
> → Server **network splits**
> Now:

✅ Do you **wait** until both servers agree (C+P)?
✅ Or do you **see message delivered instantly** (A+P) but maybe later it syncs?

→ WhatsApp favors **A + P** (eventually consistent)

---

## **In short (interview ready)**

> **CAP theorem** says: In distributed DB, you can guarantee **only 2 of — Consistency, Availability, Partition tolerance**.
> → **AP = Cassandra**, **CP = Mongo (strict)**, **CA = MySQL (single node — but real-world distributed systems must tolerate partitions)**

---


| **DB**                    | **Consistency**   | **Availability**      | **Partition Tolerance** | **CAP combo** | **Why?**                                                                   |
| ------------------------- | ----------------- | --------------------- | ----------------------- | ------------- | -------------------------------------------------------------------------- |
| **SQL (MySQL, Postgres)** | ✅ Strong          | ✅ High (single-node)  | ❌ Fails on partition    | **CA**        | Great for single server, but cannot handle network splits well             |
| **MongoDB (strict mode)** | ✅ Strong          | ❌ Blocks on partition | ✅ Handles partition     | **CP**        | Prioritizes correctness, but might block writes when network split happens |
| **Cassandra**             | ❌ Eventual (weak) | ✅ Always responds     | ✅ Handles partition     | **AP**        | Prioritizes always-on + scalability, tolerates temporary inconsistency     |

---

## **Real world analogy (easy)**

| **Scenario**                   | **DB**           | **Behavior**                                                    |
| ------------------------------ | ---------------- | --------------------------------------------------------------- |
| **Bank transfer (₹100 A → B)** | SQL / Mongo (CP) | Block writes if network split (better to be correct)            |
| **Instagram post like**        | Cassandra (AP)   | Allow likes on all nodes (sync later — eventual consistency OK) |

---

## **In short (you say this in interview)**

> **SQL → CA** (single node, strict data)
> **Mongo → CP** (strong data, OK to block on partition)
> **Cassandra → AP** (always on, eventual consistency OK)
