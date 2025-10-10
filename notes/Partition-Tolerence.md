## **What is Partition Tolerance (P in CAP)?**

> **Partition tolerance** means:
>
> 🟢 The system **keeps working** even if **network breaks** (communication failure) happen between some nodes.

---

## **Simple real-life analogy**

You and your friend both use **WhatsApp**
📶 Your friend's phone loses internet → **network partition**

> Can WhatsApp **still work** for you (send/receive)?
> ✅ Yes → WhatsApp is **partition tolerant**

---

## **In distributed database terms**

Suppose you have **2 DB servers (nodes)**
🌍 Node A (India) and Node B (US)

→ Network cable cut → **Partition** (nodes can’t talk)

If the DB is **partition tolerant**,
✅ Node A still handles requests
✅ Node B still handles requests

They **sync later** when network comes back

---

## **Why Partition Tolerance is essential?**

In **distributed systems**,
**Network failures WILL happen** (it's not *if*, it's *when*)
🌐 Internet glitches, datacenter issues, cross-region lag

So, **real-world distributed systems MUST tolerate partitions**
(**That’s why in CAP — practically every system needs P**)

---

## **Quick summary table**

| **Without P**                                | **With P**                        |
| -------------------------------------------- | --------------------------------- |
| System crashes / blocks during network split | System keeps running, syncs later |

---

## **Example DBs**

| **DB**              | **Partition tolerant?** | **Why?**                             |
| ------------------- | ----------------------- | ------------------------------------ |
| Cassandra           | ✅ Yes (AP)              | Always on, syncs later               |
| DynamoDB            | ✅ Yes (AP)              | Same                                 |
| MongoDB             | ✅ Yes (CP or AP mode)   | Allows choice                        |
| MySQL (single node) | ❌ No                    | Single server → no distributed split |

---

## **In short**

> **Partition tolerance** means:
> System keeps running even when network splits happen between nodes → handles failure gracefully.

---
