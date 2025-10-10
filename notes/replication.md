## ⚙️ What is Replication?

**Definition:**

> Replication is the process of **creating copies of data** across multiple servers/nodes to ensure **high availability, durability, and fault tolerance**.

* **Primary (master) node** → handles writes
* **Replica (secondary/slave) nodes** → serve reads and act as backups

**Goal:**

* Prevent **data loss**
* Reduce **latency for geographically distributed users**
* Improve **read scalability**

---

## 🔄 Types of Replication

### 1. **Synchronous Replication**

* Writes are applied to **primary and replica simultaneously**.
* Guarantees **strong consistency**.
* **Trade-off:** Higher latency because write waits for all replicas.

### 2. **Asynchronous Replication**

* Writes are applied to **primary first**, then **replicas eventually**.
* **Trade-off:** Lower latency, eventual consistency (replicas may lag).

---

## 🏢 Multi-AZ Replication (Availability Zones)

**Availability Zone (AZ)** = isolated data center within a region.

* **Multi-AZ replication** → replicate data **across multiple AZs within the same region**.
* **Purpose:** Protect against **data center failures**.
* Typically **synchronous replication** to maintain strong consistency.

**Example:**

```
Region: us-east-1
AZs: us-east-1a, us-east-1b, us-east-1c

Primary DB → us-east-1a
Replica DBs → us-east-1b, us-east-1c
```

**Advantages:**

* Automatic failover if primary AZ goes down
* Low-latency replication within the same region
* High availability SLA (99.99%)

---

## 🌍 Multi-Region Replication

**Region** = geographically distant location (different country or continent).

* **Multi-region replication** → replicate data **across regions**.
* **Purpose:**

  * Disaster recovery (DR) in case of regional outage
  * Serve **global users with lower latency**
* Typically **asynchronous replication** due to **network latency**.

**Example:**

```
Primary DB → us-east-1 (Virginia)
Replica DB → eu-west-1 (Ireland)
Replica DB → ap-south-1 (Mumbai)
```

**Advantages:**

* Disaster recovery across regions
* Reduced read latency for global users
* Compliance with local data regulations

**Trade-offs:**

* Higher network latency → often eventual consistency
* More complex failover strategies
* Increased cost

---

## 🔧 Replication Models in Practice

| Type                            | Use Case                     | Example                            |
| ------------------------------- | ---------------------------- | ---------------------------------- |
| **Single AZ**                   | Basic HA                     | MySQL Master-Slave within one AZ   |
| **Multi-AZ**                    | High availability & failover | AWS RDS Multi-AZ                   |
| **Multi-Region Active-Passive** | Disaster recovery            | Primary in US → Read replica in EU |
| **Multi-Region Active-Active**  | Low-latency global reads     | DynamoDB Global Tables, Cassandra  |

---

## ⚡ Key Considerations

1. **Consistency**

   * Synchronous = strong consistency
   * Asynchronous = eventual consistency

2. **Latency**

   * Multi-AZ → low (tens of ms)
   * Multi-region → higher (hundreds of ms)

3. **Failover**

   * Multi-AZ → usually automatic
   * Multi-region → may require manual or orchestrated failover

4. **Cost**

   * More replicas = higher storage + network cost

5. **Use case**

   * Multi-AZ → HA within one region
   * Multi-region → global users + disaster recovery

---

## 🧩 Real-world Examples

| System                     | Replication Strategy                                          |
| -------------------------- | ------------------------------------------------------------- |
| **AWS RDS**                | Multi-AZ synchronous for HA, Multi-region asynchronous for DR |
| **Cassandra**              | Multi-region active-active, eventual consistency              |
| **DynamoDB Global Tables** | Multi-region active-active with eventual consistency          |
| **MongoDB Atlas**          | Multi-AZ replica sets and global clusters                     |

---

## 🧭 Key Takeaways

* **Replication** = copy data across nodes for durability and availability
* **Multi-AZ** → same region, synchronous, high availability
* **Multi-region** → different regions, usually asynchronous, disaster recovery + global latency optimization
* Trade-offs: **latency, consistency, cost, complexity**

---

💡 **Analogy:**

* Multi-AZ = “backup in the next building” → fast and reliable
* Multi-region = “backup in another city/country” → slower but protects against disasters

---
