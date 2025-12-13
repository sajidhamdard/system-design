# 🏗️ System Design & Architecture Notes Index

> A complete guide to learning system design from fundamentals → advanced distributed systems → networking → DevOps → real-time systems.

---

# ⭐ Recommended Learning Path

1. **Start with fundamentals** → ACID, CAP, NFR, Idempotency
2. **Move to core system design** → Caching, Databases, Partitioning, HLD
3. **Understanding distributed systems** → Consensus, Event-driven, Replication
4. **Networking & performance** → HTTP, load balancing, latency
5. **Scaling & HA** → Failover, multi-region, resiliency
6. **Security** → OAuth2, JWT, TLS, OWASP
7. **Advanced concepts** → CRDT, OT, ABR video streaming
8. **DevOps + Kubernetes** → Pods, Ingress, Prometheus
9. **Design problems** → Chat system, Notification system, Rate limiting

---

# 📘 Fundamentals & Design Principles

* [12-Factor App](notes/12-factor-app-priniciple.md)
* [ACID](notes/ACID.md)
* [CAP](notes/CAP.md)
* [Consistency vs Integrity](notes/consistency-vs-integrity.md)
* [Idempotency](notes/idempotency.md)
* [NFR](notes/NFR.md)
* [SPOF](notes/SPOF.md)
* [SOLID](notes/SOLID.md), [SRP](notes/SRP.md), [OCP](notes/OCP.md), [LSP](notes/LSP.md), [DIP vs LSP](notes/DIP-vs-LSP.md)
* [Clear Architecture Principles](notes/clear-architecture-principles.md)
* [Non-functional No Value Trap](notes/non-functional-no-value-trap.md)
* [Six Pillars of System Design](notes/six-pillars-of-system-design.md)

---

# 🗄️ Databases & Storage

### Concepts

* [SQL vs NoSQL](notes/sql-vs-nosql.md)
* [Normalization vs Denormalization](notes/Normalization-Vs-Denormalization.md)
* [Partition Tolerance](notes/Partition-Tolerence.md)
* [Partition vs Sharding](notes/partition-vs-sharding.md)
* [Sharding](notes/Sharding.md)
* [Consistency Models](notes/data-consistency.md), [Eventual Consistency](notes/eventual-consistency.md)
* [MVCC](notes/MVCC.md)
* [Serializable Transactions](notes/serializable-transaction.md)
* [Db Consistency](notes/db-consistency.md)
* [DB Durability](notes/db-durability.md)
* [Row-level Locking](notes/row-level-locking.md)
* [Optimistic vs Pessimistic Locking](notes/optimistic-vs-pessimistic-locking.md)
* [Distributed Locks](notes/distributed-locks.md), [Redis Lock](notes/redis-lock.md)

### Systems

* [Cassandra](notes/Cassandra.md)
* [HDFS](notes/HDFS.md)
* [S3](notes/s3.md)
* [Timeseries DB](notes/timeseries-db.md)

### Logs, Storage & Recovery

* [Write Ahead Logs](notes/write-ahead-logs.md)
* [Redo Logs](notes/redo-logs.md)
* [Data Recovery](notes/data-recovery.md)

### Replication & Transactions

* [Primary Replica Setup](notes/primary-replica-setup.md)
* [Replication](notes/replication.md)
* [Two Phase Commit](notes/two-phase-commit.md)
* [Saga Pattern](notes/saga-pattern.md)

### Change Data & Migration

* [CDC](notes/CDC.md)
* [Data Migration Process](notes/data-replication-migration-process.md)

---

# ⚡ Performance, Scalability & Caching

### Caching

* [Caching](notes/Caching.md)
* [Eviction Policies](notes/Cache-Eviction-Policies.md)
* [Hot Keys](notes/hot-keys.md)
* [Hot Reads/Writes](notes/hot-reads-and-writes.md)

### Performance Engineering

* [Latency](notes/latency.md)
* [Tail & Request Latencies](notes/tail-and-request-latencies.md)
* [Latency vs Throughput](notes/latency-vs-throughput.md)
* [CPU Calculation](notes/cpu-calculation.md)
* [Low Latency Patterns](notes/low-latency-design-patterns.md)

### Scaling & Load

* [Backpressure](notes/Backpressure.md)
* [Real-time Backpressure](notes/real-time-backpressure.md)
* [Sudden Traffic Spike](notes/sudden-traffic-spike.md)
* [Buffer Burst](notes/buffer-burst.md)

---

# 🛡️ High Availability & Fault Tolerance

* [Failover Switching](notes/Failover-Switching.md)
* [Fault Tolerance](notes/fault-tolerence.md)
* [Auto Restart](notes/auto-restart.md)
* [RTO RPO](notes/RTO-RPO.md)
* [Resiliency](notes/Resiliency.md)
* [Multi-region Deployment](notes/multi-region-deployment.md)
* [Leader Election](notes/leader-election.md)
* [Cascading Failures](notes/cascading-failures.md)
* [Chaos Testing](notes/chaos-testing.md)

---

# 🌐 Networking & Infrastructure

### Core Networking

* [How HTTP Works](notes/how-http-works.md)
* [HTTP vs HTTPS](notes/http-https.md)
* [TCP vs UDP](notes/tcp-vs-udp.md)
* [Head of Line Blocking](notes/head-of-line-blocking.md)
* [TLS](notes/TLS.md)

### Load Balancing

* [Load Balancer](notes/Load-Balancer.md)
* [L4 vs L7](notes/L4-vs-L7.md)
* [Load Balancer vs Reverse Proxy](notes/Load-Balancer-vs-reverse-proxy.md)
* [LB vs RP vs API Gateway](notes/load-balancer-VS-reverse-proxy-VS-api-gateway.md)

### Traffic Delivery

* [CDN](notes/CDN.md)
* [Geo DNS](notes/Geo-DNS.md)

### Server Concepts

* [Sticky Sessions](notes/sticky-session.md)
* [Nginx](notes/nginx.md)

### API Management

* [API Gateway](notes/api-gateway.md)
* [Apigee](notes/apigiee.md)
* [REST Call Flow](notes/rest-call.md)

---

# 📩 Messaging, Streaming & Async Systems

### Messaging

* [Kafka vs RabbitMQ](notes/kafka-vs-rabbitmq.md)
* [Kafka vs Pulsar vs PubSub](notes/kafka-vs-pulsar-vs-pubsub.md)
* [Webhooks](notes/webhooks.md)

### Streaming

* [Redis Streams](notes/redis-streams.md)
* [Consumer Lag Monitoring](notes/consumer-lag-monitoring.md)

### Architectures

* [Push vs Pull](notes/push-vs-pull-architecture.md)
* [Asynchronous Decoupling](notes/asynchronous-decoupling.md)

### Real-time

* [WebSockets](notes/websockets.md)
* [Server Sent Events](notes/server-sent-events.md)
* [Short vs Long Polling](notes/short-polling-vs-long-polling.md)
* [Long Polling vs WebSockets](notes/long-polling-vs-websockets.md)

---

# 🔐 Security & Authentication

* [JWT](notes/JWT.md)
* [OAuth2](notes/OAuth2.md)
* [Secrets Management](notes/secrets-management.md)
* [Short Circuit Auth](notes/short-circuit-auth.md)
* [SAST vs DAST](notes/SAST-vs-DAST.md)
* [Dependency Vulnerability Checks](notes/dependency-vulnerability-checks.md)
* [Threat Modeling](notes/threat-modeling.md)
* [Threat Detection](notes/threat-detection.md)
* [DDOS Protection](notes/DDOS-Protection.md)
* [Brute Force Protection](notes/brute-force-protection.md)

---

# 🛠️ Tools, DevOps & Operations

* [Spring Boot Health Check](notes/Spring-Boot-Health-Check.md)
* [Kubernetes Pods Restart](notes/Kubernetes-Pods-Restart.md)
* [ConfigMap](notes/kubernetes-configmap.md)
* [Kubernetes Ingress](notes/kubernetes-ingress.md)
* [Persistent Volume](notes/persistent-volume.md)
* [Creating Docker Image](notes/creating-docker-image.md)
* [Helm](notes/helm.md)
* [PgBouncer](notes/PgBouncer.md)
* [Prometheus & Grafana](notes/prometheus-grafana.md)
* [Telemetry](notes/telemetry.md)

---

# 🧱 Architecture Patterns & System Design

* [Two-tier Architecture](notes/Two-tier-architecture.md)
* [Project Architecture](notes/project-architecture.md)
* [Single Server Design](notes/signle-server-design.md)
* [CQRS](notes/CQRS.md)
* [Event-driven Architecture](notes/event-driven-architecture.md)
* [Event Sourcing](notes/event-sourcing.md), [Event Sourcing vs Outbox](notes/event-sourcing-vs-outbox.md)
* [Mono vs Microservices](notes/mono-vs-micro.md)
* [Serverfull vs Serverless](notes/serverfull-vs-serverless.md)
* [Distributed Rate Limiter](notes/distributed-rate-limiter.md)
* [Retry Mechanism](notes/retry-mechanism.md)
* [Deployment Strategy](notes/deployment-strategy.md)
* [High Scale System Design](notes/high-scale-system-design.md)
* [Back-of-the-Envelop Estimation](notes/back-of-the-envelop.md)
* [Phased Approach](notes/phased-approach.md)
* [Post Materializer](notes/post-materializer.md)
* [Measure First Approach](notes/measure-first-approach.md)

---

# 🔍 Search, Indexing & Analytics

* [Elastic Search](notes/elastic-search.md)
* [Apache Lucene](notes/apache-lucene.md)
* [Inverted Index](notes/inverted-index.md)
* [Text Search Engines](notes/text-search-engines.md)
* [TF-IDF](notes/TF-IDF.md)
* [Proximity Search](notes/proximity-search.md)
* [Index Fragmentation](notes/index-fragmentation.md)
* [Cursor Pagination](notes/cursor-pagination.md)

---

# 🎥 Data Processing, Streaming & Video Tech

* [Batch vs Streaming](notes/batch-vs-streaming.md)
* [Adaptive Streaming](notes/adaptive-streaming.md)
* [Adaptive Bitrate Streaming (ABR)](notes/adaptive-bitrate-streaming.md)
* [DASH](notes/DASH.md) / [HLS](notes/HLS.md)
* [Manifest File Processing](notes/manifest-video-processing.md)
* [Chunker Service](notes/chunker-service.md)
* [Transcoding](notes/transcoding.md)
* [Micro-batching](notes/micro-batching.md)
* [Apache Spark](notes/apache-spark.md)

---

# 💬 System Design Use Cases

* [Chat System](notes/chat-system.md)
* [Notifications Design](notes/notifications-design.md)
* [Frontend Storage](notes/frontend-storage.md)
* [WebRTC](notes/WebRTC.md)

---

# 🔢 Identifiers & Utilities

* [UUID](notes/uuid.md)
* [Snowflake ID](notes/snowflake-id.md)
* [Vanity URL](notes/vanity-url.md)

---

# 📗 Miscellaneous

* [Internet](notes/internet.md)
* [Encoding](notes/encoding.md)
* [Download & Upload](notes/download-upload.md)
* [DOD](notes/DOD.md)
* [CAS – Compare and Swap](notes/compare-and-swap.md)
* [Operational Transformation](notes/operational-transformation.md)
* [CRDT Deep Dive](notes/crdt-deep-dive.md)
* [Rule Engine](notes/rule-engine.md), [ACL + Rule Engine](notes/ACL-and-Rule-Engine.md)

---

# 📑 HTTP Status & Protocol References

* [200 vs 201 vs 202](notes/200-vs-201-vs-202.md)
* [301 vs 302](notes/301-vs-302.md)
* [429 vs 503](notes/429-vs-503.md)

---

# 🧭 System Design Interview Prep

* [System Design Problems – Key Solutions](notes/system-design-problems-key-solution.md)
* [Interview Question Bank](notes/interview-questions.md)
* [Syllabus](notes/Syllabus.md)

---
