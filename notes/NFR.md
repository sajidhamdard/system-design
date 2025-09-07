In **system design interviews**, once you have the basic **functional requirements** (what the system *does*), you must also discuss **non-functional requirements (NFRs)**, which describe *how* the system should behave under different conditions.

---

## 🔑 Common Non-Functional Requirements (NFRs)

Here’s a structured list of NFRs typically discussed in interviews, along with what they drive in the design:

---

### 1. **Scalability**

* **What it means**: System should handle growth in users, requests, or data.
* **What it drives**:

  * Load balancers, horizontal scaling
  * Sharding, partitioning
  * Caching (Redis, CDN)
  * Asynchronous processing (Kafka, queues)

---

### 2. **Availability**

* **What it means**: System should be up and running most of the time.
* **What it drives**:

  * Replication (multi-AZ / multi-region)
  * Failover mechanisms
  * Leader election (Zookeeper, etcd)
  * Redundancy

---

### 3. **Reliability / Fault Tolerance**

* **What it means**: System continues to work despite failures.
* **What it drives**:

  * Retry mechanisms
  * Circuit breakers
  * Idempotency in APIs
  * Message queues (so events are not lost)

---

### 4. **Performance / Latency**

* **What it means**: Response time for a request should be within acceptable limits.
* **What it drives**:

  * Caching layers (Redis, Memcached)
  * CDN for static assets
  * Pre-computation / materialized views
  * Database indexing

---

### 5. **Consistency**

* **What it means**: Data seen by users is correct and up-to-date.
* **What it drives**:

  * CAP theorem trade-offs (Consistency vs Availability)
  * Strong vs Eventual consistency
  * Optimistic / Pessimistic locking

---

### 6. **Durability**

* **What it means**: Once data is saved, it should not be lost.
* **What it drives**:

  * Write-ahead logs
  * Database replication
  * Persistent queues
  * Backups & snapshots

---

### 7. **Security**

* **What it means**: Protect against unauthorized access.
* **What it drives**:

  * Authentication (OAuth, JWT)
  * Authorization (RBAC/ABAC)
  * Encryption at rest & in transit
  * API rate limiting, WAF

---

### 8. **Maintainability / Operability**

* **What it means**: Easy to monitor, debug, and update system.
* **What it drives**:

  * Logging & Monitoring (Prometheus, ELK, Grafana)
  * Health checks
  * CI/CD pipelines
  * Service discovery

---

### 9. **Cost Efficiency**

* **What it means**: Optimize infra cost while meeting requirements.
* **What it drives**:

  * Cloud auto-scaling
  * Spot instances
  * Cold vs hot storage (S3 Glacier vs S3 Standard)

---

## ✅ NFRs You Should **Always** Mention

In almost every interview, you should cover at least these 5:

1. **Scalability** – how system grows
2. **Availability** – system uptime
3. **Reliability / Fault Tolerance** – resilience to failure
4. **Performance (Latency + Throughput)** – speed
5. **Consistency** – correctness of data

*(Security is also critical if system deals with money or personal data.)*

---

## ⚖️ Example Mapping: Hotel Booking System

* **Scalability** → add caching for search results (Redis, CDN)
* **Availability** → replicate DB across regions
* **Consistency** → pessimistic/optimistic locks for room booking
* **Performance** → use Elasticsearch for search, not raw SQL
* **Durability** → store payment logs in persistent queues (Kafka)
* **Security** → PCI compliance for payments

---

👉 In interviews, the key is not just listing NFRs, but **showing how each NFR influences your design choices**.

---

# 📝 NFRs → Design Choices Cheat Sheet

### 1. **Scalability** (Handle more users / data / traffic)

* Load balancers (NGINX, HAProxy)
* Horizontal scaling (more servers instead of bigger servers)
* Partitioning / Sharding (DB, cache)
* Caching (Redis, CDN)
* Asynchronous processing (Kafka, RabbitMQ)

---

### 2. **Availability** (System uptime, minimal downtime)

* Replication (DB replicas, multi-region deployment)
* Failover systems (active-active, active-passive)
* Leader election (Zookeeper, etcd)
* Heartbeats & health checks
* Redundancy in infra (multiple app servers, DB clusters)

---

### 3. **Reliability / Fault Tolerance** (System continues even if parts fail)

* Retry with exponential backoff
* Circuit breakers (avoid cascading failures)
* Idempotent APIs (safe retries)
* Persistent queues (no message loss)
* Chaos testing (Netflix’s Chaos Monkey style)

---

### 4. **Performance (Latency + Throughput)**

* Database indexes
* Query optimization
* In-memory caching (Redis, Memcached)
* CDN for static assets (images, JS, CSS)
* Pre-computed data (materialized views, summary tables)
* Efficient protocols (gRPC vs REST when speed matters)

---

### 5. **Consistency** (Correctness of data)

* Strong consistency → Pessimistic locks, distributed transactions
* Eventual consistency → Async updates, CQRS
* Optimistic concurrency control (versioning)
* Conflict resolution strategies (last-write-wins, merges)

---

### 6. **Durability** (No data loss after commit)

* Write-ahead logs (WAL in DBs)
* Replicated storage (multi-AZ, multi-region)
* Snapshots & backups
* Persistent queues (Kafka, Pulsar)

---

### 7. **Security**

* Authentication (OAuth, JWT, SSO)
* Authorization (RBAC, ABAC)
* Encryption (TLS in transit, AES at rest)
* API rate limiting, throttling
* WAF, DDOS protection

---

### 8. **Maintainability / Operability**

* Centralized logging (ELK, Splunk)
* Metrics & Monitoring (Prometheus, Grafana)
* Alerting (PagerDuty, OpsGenie)
* Service discovery (Consul, Eureka)
* CI/CD pipelines for safe deployment

---

### 9. **Cost Efficiency**

* Auto-scaling groups
* Spot / preemptible instances
* Tiered storage (S3 vs Glacier)
* Optimize indexes & queries
* Resource quotas

---

## ✅ Always Mention (baseline NFRs in interview)

1. Scalability
2. Availability
3. Reliability / Fault Tolerance
4. Performance (Latency/Throughput)
5. Consistency
6. (Security if payments / sensitive data involved)

---

> “For this system, the most critical NFRs are scalability (to handle peak traffic), availability (users expect 24/7 service), consistency (to avoid double-booking), and security (since payments are involved). These will drive choices like caching, DB replication, and optimistic locking.”
