## ⚡ What is IOPS?

**IOPS** stands for **Input/Output Operations Per Second**.

It measures **how many read or write operations** a storage device can handle in one second.

👉 It’s a **performance metric** for disks, SSDs, databases, and cloud volumes (like AWS EBS, Azure Disks, etc.).

---

## 💡 Example

If a storage volume has **3000 IOPS**, it means:

> It can perform **3000 read or write operations per second**.

Each operation might be reading or writing a **block of data** (e.g., 4 KB).

---

## ⚙️ **Why IOPS Matters**

In high-performance systems (databases, caches, real-time analytics), the speed of reading/writing data to storage is crucial.

Higher IOPS → faster data access → better system performance.

For example:

* A **database** with low IOPS may take seconds to fetch or update records.
* A **high-IOPS SSD** can handle thousands of concurrent reads/writes with low latency.

---

## 📊 **IOPS vs Throughput vs Latency**

| Metric         | Meaning                                    | Unit              | Analogy                              |
| -------------- | ------------------------------------------ | ----------------- | ------------------------------------ |
| **IOPS**       | Number of read/write operations per second | ops/sec           | How many times you open a drawer     |
| **Throughput** | Amount of data read/written per second     | MB/s              | How much you take out of the drawer  |
| **Latency**    | Time to complete one I/O operation         | milliseconds (ms) | How long it takes to open the drawer |

✅ **IOPS** = How many
✅ **Throughput** = How much
✅ **Latency** = How fast

---

## 🧠 **Types of IOPS**

| Type                | Description                                             |
| ------------------- | ------------------------------------------------------- |
| **Read IOPS**       | Number of read operations per second                    |
| **Write IOPS**      | Number of write operations per second                   |
| **Random IOPS**     | Random access to small chunks of data (e.g., databases) |
| **Sequential IOPS** | Sequential reads/writes (e.g., video streaming, logs)   |

---

## 🧩 **Typical IOPS by Storage Type**

| Storage Type              | Typical IOPS       | Use Case             |
| ------------------------- | ------------------ | -------------------- |
| HDD (Hard Disk)           | ~100 IOPS          | Archival, backups    |
| SATA SSD                  | ~10,000 IOPS       | General purpose      |
| NVMe SSD                  | 100,000+ IOPS      | Databases, analytics |
| AWS EBS gp3 (SSD)         | Up to 16,000 IOPS  | Cloud servers        |
| AWS io2 (provisioned SSD) | Up to 256,000 IOPS | Enterprise workloads |

---

## ☁️ **Example in AWS (EBS)**

When you create an **EBS volume**, you can **provision IOPS**.

```text
gp3 volume → 3,000 IOPS (default), scalable to 16,000 IOPS
io2 volume → up to 256,000 IOPS
```

You pay based on **IOPS provisioned**, not just storage size.

---

## 🧮 **How IOPS is Calculated**

Approximate formula:

```
IOPS = 1 / (Average Latency + Seek Time)
```

For example:

* Latency = 1 ms
* Seek Time = 2 ms
  Then:

```
IOPS = 1 / (0.001 + 0.002) = ~333 IOPS
```

---

## 🧰 **In Databases**

IOPS is critical for:

* **Transaction-heavy systems** (e.g., OLTP)
* **Write-heavy workloads** (e.g., logs, analytics)
* **Index-heavy queries**

If your DB storage has low IOPS, queries can be slow even with powerful CPUs.

---

## 🧩 **How to Improve IOPS**

✅ Use **SSD/NVMe** instead of HDD
✅ Use **RAID 0** (striping) for higher parallelism
✅ Optimize **block size** and **access patterns**
✅ Enable **caching** (e.g., Redis in front of DB)
✅ Use **read replicas** to distribute reads
✅ For cloud, **provision higher IOPS volumes** (e.g., AWS io2)

---

## 📦 Analogy

Think of IOPS like **how many boxes you can move per second** 📦

* **Throughput** = total weight moved per second
* **Latency** = how long it takes to move one box

A forklift (SSD) can move many boxes per second (high IOPS),
while a human (HDD) moves few boxes slowly (low IOPS).

---

### ✅ **Summary**

| Term           | Meaning                            | Goal                              |
| -------------- | ---------------------------------- | --------------------------------- |
| **IOPS**       | Input/Output operations per second | Maximize for fast read/write      |
| **Throughput** | Data transferred per second        | Increase for large file transfers |
| **Latency**    | Time per operation                 | Minimize for responsiveness       |

---
