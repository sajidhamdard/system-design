# 🏗️ System Design & Architecture Notes Index

> A guided path to learning system design, from fundamentals to advanced patterns.

---

## 1️⃣ Start with Fundamentals & Design Principles

Before building systems, understand **core principles that govern design**:

* [ACID](notes/ACID.md) – Database transaction guarantees
* [CAP](notes/CAP.md) – Trade-offs in distributed systems
* [Normalization Vs Denormalization](notes/Normalization-Vs-Denormalization.md) – Data modeling approaches
* [Partition Tolerance](notes/Partition-Tolerence.md) – Handling distributed failures
* [Partition vs Sharding](notes/partition-vs-sharding.md) – Scaling databases horizontally
* [SOLID](notes/SOLID.md) – Object-oriented design principles
* [Strategy Design Pattern](notes/StrategyDesignPattern.md) – Flexible design patterns
* [12-Factor App Principle](notes/12-factor-app-priniciple.md) – Building cloud-native apps
* [NFR](notes/NFR.md) – Non-functional requirements like scalability, latency, availability
* [Idempotency](notes/idempotency.md) – Designing reliable operations

> **Tip:** Start here to form a strong foundation; everything else builds on these ideas.

---

## 2️⃣ Learn Databases & Data Storage

Once fundamentals are clear, dive into **how data is stored and accessed**:

* [SQL vs NoSQL](notes/sql-vs-nosql.md) – Choosing the right database
* [Document DB vs Columnar DB](notes/document-vs-columnar-db.md) – Data models
* [Cassandra](notes/Cassandra.md) – High-scale distributed database
* [Sharding](notes/Sharding.md) – Horizontal data partitioning
* [Primary Replica Setup](notes/primary-replica-setup.md) – High availability in DBs
* [Data Lakes](notes/Data-Lakes.md) – Centralized storage for analytics
* [HDFS](notes/HDFS.md) – Distributed file system
* [S3](notes/s3.md) – Cloud object storage
* [Outbox Pattern and Ops Dashboard](notes/Outbox-pattern-and-ops-dashboard.md) – Event-driven reliability
* [Saga Pattern](notes/saga-pattern.md) – Distributed transaction management

> **Flow:** Understand **data storage first**, then patterns to **coordinate distributed operations**.

---

## 3️⃣ Performance & Scalability

Learn **how to make systems fast and scalable**:

* [Caching](notes/Caching.md) – Reduce latency
* [Cache Eviction Policies](notes/Cache-Eviction-Policies.md) – Manage memory efficiently
* [Hotspot](notes/Hotspot.md) – Handling traffic spikes
* [Latency](notes/latency.md) – Response time measurement
* [Latency vs Throughput](notes/latency-vs-throughput.md) – Trade-offs
* [Backpressure](notes/Backpressure.md) – Avoid overloading services
* [High Scale System Design](notes/high-scale-system-design.md) – Putting it all together

> **Tip:** These topics naturally follow database design; once you know data flows, think about speed and scaling.

---

## 4️⃣ High Availability & Fault Tolerance

Ensure **systems stay alive under failures**:

* [Failover Switching](notes/Failover-Switching.md)
* [Fault Tolerence](notes/fault-tolerence.md)
* [Auto Restart](notes/auto-restart.md)
* [RTO RPO](notes/RTO-RPO.md) – Recovery objectives
* [Multi-region Deployment](notes/multi-region-deployment.md)
* [Resiliency](notes/Resiliency.md)
* [SLA](notes/SLA.md) – Service guarantees
* [Leader Election](notes/leader-election.md) – Coordinating nodes in a cluster

> **Flow:** Once systems scale, ensure **they remain available** even under failures.

---

## 5️⃣ Networking & Infrastructure

Learn how **data moves and reaches users**:

* [CDN](notes/CDN.md) – Deliver content closer to users
* [Load Balancer](notes/Load-Balancer.md) – Distribute requests
* [Load Balancer vs Reverse Proxy](notes/Load%20Balancer%20vs%20reverse%20proxy.md)
* [API Gateway](notes/api-gateway.md) – Manage microservices
* [Apigee](notes/apigiee.md)
* [Nginx](notes/nginx.md)
* [Geo DNS](notes/Geo-DNS.md) – Route traffic globally
* [HTTP vs HTTPS](notes/http-https.md)
* [Load Balancer vs Reverse Proxy vs API Gateway](notes/load-balancer-VS-reverse-proxy-VS-api-gateway.md)

> **Tip:** Networking topics naturally come after scaling and availability, because you need to route traffic efficiently.

---

## 6️⃣ Tools & Operations

Learn **how to monitor, deploy, and maintain systems**:

* [Spring Boot Health Check](notes/Spring-Boot-Health-Check.md)
* [Kubernetes Pods Restart](notes/Kubernetes-Pods-Restart.md)
* [Creating Docker Image](notes/creating-docker-image.md)
* [REST Call](notes/rest-call.md)
* [Prometheus & Grafana](notes/prometheus-grafana.md)

> **Flow:** These are practical tools to implement the designs you’ve learned.

---

## 7️⃣ Architecture Patterns

Study **common system structures and messaging patterns**:

* [Two-tier Architecture](notes/Two-tier-architecture.md)
* [Project Architecture](notes/project-architecture.md)
* [Single Server Design](notes/signle-server-design.md)
* [CQRS](notes/CQRS.md)
* [Fanout](notes/fanout.md)
* [Webhooks](notes/webhooks.md)
* [WebSockets](notes/websockets.md)

> **Flow:** After understanding systems, learn patterns to **structure services efficiently**.

---

## 8️⃣ Search & Indexing

Handle **large-scale queries and fast search**:

* [Elastic Search](notes/elastic-search.md)
* [Apache Lucene](notes/apache-lucene.md)
* [Text Search Engines](notes/text-search-engines.md)

---

## 9️⃣ Data Processing

Process **batch or streaming data**:

* [Batch vs Streaming](notes/batch-vs-streaming.md)

---

## 🔟 AI & ML Basics

* [Basics of AI](notes/basics-of-AI.md)

---

## 📝 Miscellaneous

* [Syllabus](notes/Syllabus.md)
* [System Design Problems Key Solutions](notes/System-design-problems-key-solution.md)
* [Download & Upload](notes/download-upload.md)
* [Telemetry](notes/telemetry.md)
* [JWT](notes/JWT.md)
* [OAuth2](notes/OAuth2.md)

---
