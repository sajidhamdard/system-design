# 🏗️ System Design & Architecture Notes Index

> A guided path to learning system design, from fundamentals to advanced patterns.

---

## Start with Fundamentals & Design Principles

* [ACID](notes/ACID.md) – Database transaction guarantees
* [CAP](notes/CAP.md) – Trade-offs in distributed systems
* [Partition Tolerance](notes/Partition-Tolerence.md) – Handling distributed failures
* [Partition vs Sharding](notes/partition-vs-sharding.md) – Scaling databases horizontally
* [SOLID](notes/SOLID.md) – Object-oriented design principles
* [Strategy Design Pattern](notes/StrategyDesignPattern.md) – Flexible design patterns
* [12-Factor App Principle](notes/12-factor-app-priniciple.md) – Cloud-native app principles
* [NFR](notes/NFR.md) – Non-functional requirements like scalability, latency, availability
* [Idempotency](notes/idempotency.md) – Designing reliable operations
* [SPOF](notes/SPOF.md) – Single point of failure
* [Six Pillars of System Design](notes/six-pillars-of-system-design.md) – Core pillars overview

---

## Databases & Data Storage

* [SQL vs NoSQL](notes/sql-vs-nosql.md) – Choosing the right database
* [Document DB vs Columnar DB](notes/document-vs-columnar-db.md) – Data models
* [Cassandra](notes/Cassandra.md) – High-scale distributed database
* [Sharding](notes/Sharding.md) – Horizontal data partitioning
* [Primary Replica Setup](notes/primary-replica-setup.md) – High availability in DBs
* [MVCC](notes/MVCC.md) – Multi-version concurrency control
* [Serializable Transactions](notes/serializable-transaction.md) – Strong consistency in DBs
* [Data Isolation](notes/data-isolation.md) – Isolation strategies
* [Data Consistency](notes/data-consistency.md) – Ensuring consistent data
* [Eventual Consistency](notes/eventual-consistency.md) – Relaxed consistency models
* [Replication](notes/replication.md) – Multi-AZ / Multi-region setups
* [Two-Phase Commit](notes/two-phase-commit.md) – Distributed transaction protocol
* [Saga Pattern](notes/saga-pattern.md) – Distributed transaction management
* [Data Lakes](notes/Data-Lakes.md) – Centralized analytics storage
* [HDFS](notes/HDFS.md) – Distributed file system
* [S3](notes/s3.md) – Cloud object storage
* [Redis Persistence](notes/redis-persistence.md) – Durable in-memory data
* [Outbox Pattern and Ops Dashboard](notes/Outbox-pattern-and-ops-dashboard.md) – Event-driven reliability
* [Write-Ahead Logs / Redo Logs](notes/write-ahead-logs.md) – Recovery mechanisms
* [CDC](notes/CDC.md) – Change data capture

---

## Performance, Scalability & Caching

* [Caching](notes/Caching.md) – Reduce latency
* [Cache Eviction Policies](notes/Cache-Eviction-Policies.md) – Memory management
* [Hotspot / Hot Keys](notes/Hotspot.md), [hot-reads-and-writes](notes/hot-reads-and-writes.md) – Handling traffic spikes
* [Latency](notes/latency.md) – Response time measurement
* [Latency vs Throughput](notes/latency-vs-throughput.md) – Trade-offs
* [CPU & Memory Sizing](notes/cpu-calculation.md) – Estimating resources
* [Backpressure](notes/Backpressure.md) – Avoid overloading services
* [Micro-batching](notes/micro-batching.md) – Efficient processing
* [Sudden Traffic Spike](notes/sudden-traffic-spike.md) – Handling bursts
* [Buffer Burst](notes/buffer-burst.md) – Absorbing load spikes

---

## High Availability & Fault Tolerance

* [Failover Switching](notes/Failover-Switching.md)
* [Fault Tolerence](notes/fault-tolerence.md)
* [Auto Restart](notes/auto-restart.md)
* [RTO RPO](notes/RTO-RPO.md) – Recovery objectives
* [Multi-region Deployment](notes/multi-region-deployment.md)
* [Resiliency](notes/Resiliency.md)
* [SLA](notes/SLA.md) – Service guarantees
* [Leader Election](notes/leader-election.md) – Cluster coordination
* [Cascading Failures](notes/cascading-failures.md)
* [Chaos Testing](notes/chaos-testing.md)

---

## Networking & Infrastructure

* [CDN](notes/CDN.md) – Deliver content closer to users
* [Load Balancer](notes/Load-Balancer.md) – Distribute requests
* [Load Balancer vs Reverse Proxy](notes/Load-Balancer-vs-reverse-proxy.md)
* [API Gateway](notes/api-gateway.md) – Manage microservices
* [Apigee](notes/apigiee.md)
* [Nginx](notes/nginx.md)
* [Geo DNS](notes/Geo-DNS.md) – Global traffic routing
* [HTTP vs HTTPS](notes/http-https.md)
* [SSL Termination](notes/SSL-termination.md)
* [Sticky Session / Connection](notes/sticky-session.md)
* [L4 vs L7 Load Balancing](notes/L4-vs-L7.md)
* [Load Balancer vs Reverse Proxy vs API Gateway](notes/load-balancer-VS-reverse-proxy-VS-api-gateway.md)

---

## Messaging, Streaming & Async

* [Push vs Pull Architecture](notes/push-vs-pull-architecture.md)
* [Asynchronous Decoupling](notes/asynchronous-decoupling.md)
* [Kafka vs Pulsar vs PubSub](notes/kafka-vs-pulsar-vs-pubsub.md)
* [Kafka vs RabbitMQ](notes/kafka-vs-rabbitmq.md)
* [Redis Streams](notes/redis-streams.md)
* [Consumer Lag Monitoring](notes/consumer-lag-monitoring.md)
* [Fanout](notes/fanout.md)
* [Webhooks](notes/webhooks.md)
* [WebSockets](notes/websockets.md)
* [Operational Transformation / CRDTs](notes/OT-vs-CRDTs.md)

---

## Security & Authentication

* [Encryption](notes/encryption.md)
* [Cryptography](notes/cryptography.md)
* [JWT](notes/JWT.md)
* [OAuth2](notes/OAuth2.md)
* [Secrets Management](notes/secrets-management.md)
* [Threat Detection (SEIM, IDS, IPS)](notes/threat-detection.md)
* [OWASP](notes/OWASP.md)
* [SAST vs DAST](notes/SAST-vs-DAST.md)
* [Dependency Vulnerability Checks](notes/dependency-vulnerability-checks.md)
* [DDOS Protection](notes/DDOS-Protection.md)

---

## Tools, DevOps & Operations

* [Spring Boot Health Check](notes/Spring-Boot-Health-Check.md)
* [Kubernetes Pods Restart](notes/Kubernetes-Pods-Restart.md)
* [Kubernetes ConfigMap](notes/kubernetes-configmap.md)
* [Kubernetes Ingress](notes/kubernetes-ingress.md)
* [Creating Docker Image](notes/creating-docker-image.md)
* [Helm](notes/helm.md)
* [Prometheus & Grafana](notes/prometheus-grafana.md)
* [Telemetry](notes/telemetry.md)

---

## Architecture Patterns & System Design

* [Two-tier Architecture](notes/Two-tier-architecture.md)
* [Project Architecture](notes/project-architecture.md)
* [Single Server Design](notes/signle-server-design.md)
* [CQRS](notes/CQRS.md)
* [Event-driven Architecture](notes/event-driven-architecture.md)
* [Mono vs Microservices](notes/mono-vs-micro.md)
* [Serverfull vs Serverless](notes/serverfull-vs-serverless.md)
* [Deployment Strategy](notes/deployment-strategy.md)
* [Back-of-the-Envelop Estimation](notes/back-of-the-envelop.md)
* [Phased Approach](notes/phased-approach.md)
* [Post Materializer](notes/post-materializer.md)
* [Measure First Approach](notes/measure-first-approach.md)

---

## System Reliability & Concurrency Patterns

* [Retry Mechanism](notes/retry-mechanism.md)
* [Distributed Locking / Redis Lock / Redlock](notes/distributed-locks.md)
* [Optimistic vs Pessimistic Locking](notes/optimistic-vs-pessimistic-locking.md)
* [Row Level Locking](notes/row-level-locking.md)
* [Compare-And-Swap](notes/compare-and-swap.md)
* [Quorum](notes/quorum.md)
* [Rate Limiting & Distributed Rate Limiter](notes/distributed-rate-limiter.md), [Rate Limiting Algorithms](notes/rate-limiting-algos.md)
* [CPU / Memory Estimation](notes/cpu-calculation.md)

---

## Search, Indexing & Analytics

* [Elastic Search](notes/elastic-search.md)
* [Apache Lucene](notes/apache-lucene.md)
* [Text Search Engines](notes/text-search-engines.md)
* [TF-IDF](notes/TF-IDF.md)
* [Proximity Search](notes/proximity-search.md)
* [Cursor Pagination](notes/cursor-pagination.md)
* [Index Fragmentation](notes/index-fragmentation.md)

---

## Data Processing, Streaming & Video

* [Batch vs Streaming](notes/batch-vs-streaming.md)
* [Adaptive Streaming](notes/adaptive-streaming.md)
* [ABR (Adaptive Bitrate Streaming)](notes/adaptive-bitrate-streaming.md)
* [Transcoding](notes/transcoding.md)
* [Manifest File in Video Chunks Processing](notes/manifest-video-processing.md)
* [Chunker Service](notes/chunker-service.md)
* [Apache Spark](notes/apache-spark.md)
* [HLS / DASH](notes/HLS.md), [DASH](notes/DASH.md)

---

## Messaging, Queue & Event Processing

* [Exactly Once vs At-Least Once](notes/exactly-once-vs-at-least-once.md)
* [Micro-batching](notes/micro-batching.md)

---

## Miscellaneous & References

* [Internet](notes/internet.md)
* [UUID](notes/uuid.md)
* [Snowflake ID](notes/snowflake-id.md)
* [Vanity URL](notes/vanity-url.md)
* [Syllabus](notes/Syllabus.md)
* [System Design Problems Key Solutions](notes/System-design-problems-key-solution.md)
* [Download & Upload](notes/download-upload.md)
* [200 vs 201 vs 202](notes/200-vs-201-vs-202.md)
* [301 vs 302](notes/301-vs-302.md)
* [429 vs 503](notes/429-vs-503.md)
* [DOD](notes/DOD.md)

---
