## **🏆 Must-Know Topics (High Probability in Interviews)**

### **1️⃣ Fundamentals & Design Principles**

* ACID
* CAP
* Partition vs Sharding
* Partition Tolerance
* SOLID
* 12-Factor App Principle
* Idempotency
* Single Point of Failure (SPOF)
* Data Consistency & Isolation

### **2️⃣ Databases & Data Storage**

* SQL vs NoSQL
* Primary-Replica / Leader-Follower Setup
* Sharding & Horizontal Scaling
* MVCC
* Redis persistence & streams
* Cassandra / DynamoDB basics
* Outbox Pattern
* Saga Pattern / Distributed Transactions
* Write-Ahead Logs / Redo Logs
* Index Fragmentation

### **3️⃣ Performance & Scalability**

* Caching & Cache Eviction Policies
* Hot keys / Hot Reads
* Latency vs Throughput
* Backpressure & Buffer Burst Handling
* CPU/Memory estimation (request cost × concurrency)
* Micro-batching
* Sudden Traffic Spike

### **4️⃣ High Availability & Fault Tolerance**

* Failover Switching
* Multi-region Deployment
* RTO / RPO
* Resiliency / Chaos Testing
* Auto Restart / Kubernetes Pod Restart
* Leader Election
* SLA / SLO

### **5️⃣ Networking & Infrastructure**

* Load Balancer (L4/L7)
* Reverse Proxy vs API Gateway
* Geo-DNS
* CDN
* HTTP vs HTTPS / SSL Termination
* Sticky Sessions

### **6️⃣ Messaging & Event-Driven**

* Push vs Pull Architecture
* Fanout / Webhooks / WebSockets
* Kafka vs RabbitMQ / Pulsar / PubSub
* Exactly-once vs At-least-once
* Distributed Locks / Redis Lock / Redlock
* Quorum

### **7️⃣ Security & Authentication**

* JWT
* OAuth2
* Encryption Mechanisms
* Threat Detection (SEIM, IDS, IPS)
* Secrets Management (Vault, K8s secrets)
* OWASP Top 10

### **8️⃣ Tools & Observability**

* Spring Boot Health Check
* Prometheus & Grafana
* Telemetry / Logs / Metrics
* Docker & Kubernetes Basics

### **9️⃣ Architecture Patterns**

* Mono vs Microservices
* Serverless vs Serverfull
* CQRS
* Event-driven Architecture
* Deployment Strategies (Blue/Green, Canary)

### **🔟 Streaming & Video (for media-heavy systems)**

* Adaptive Bitrate Streaming (ABR)
* HLS / DASH
* Manifest Files
* Transcoding

---

## **💡 Nice-to-Know / Advanced Topics**

These are often asked in **senior / specialized roles** or for **deep-dive follow-ups**:

* Graph DB concepts
* Operational Transformation (OT) vs CRDTs
* Event Sourcing
* Advanced consensus algorithms: Raft, Paxos
* Observability / Distributed Tracing (Jaeger, OpenTelemetry)
* Cost optimization: Spot / Preemptible Instances, Autoscaling policies
* TF-IDF, ElasticSearch Advanced Queries, Proximity Search
* Timeseries DB
* Vanity URLs, UUID / Snowflake IDs
* Phased-approach deployment, Post-materializer / Chunker services
* SAST vs DAST, Dependency Vulnerability Checks
* Rate-limiting algorithms, Throttling

---

### ✅ **How to Use This**

1. **Master Must-Know topics first** – these are 80–90% of what interviewers expect.
2. **Keep Nice-to-Know topics as backups** – read them for follow-ups or senior-level questions.
3. **Practice with system design questions** – map these topics to real-world systems: e.g., YouTube → ABR, HLS, Caching, Multi-region, CDN.
