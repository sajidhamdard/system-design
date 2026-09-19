# 🏗️ System Design & Architecture Notes — Complete Roadmap

> A structured roadmap to master System Design from fundamentals → distributed systems → networking → scalability → real-world architectures.

This guide is designed for:

* Software Engineers preparing for **System Design Interviews**
* Developers building **scalable production systems**
* Engineers transitioning to **Senior / Staff roles**

---

# 🧭 How to Use This Roadmap

Start with the [System Design Interview Playbook](interview-playbook.md). Use it as the process for practice, and use the phase notes below as reference material for each decision.

Follow the sections **in order**. Each section builds on previous concepts.

```
Fundamentals → Databases → Caching → Distributed Systems → Networking → Scaling → Security → DevOps → Architecture Patterns → Real-world Design Problems
```

Do NOT jump randomly. System design knowledge is cumulative.

---

# 🥇 Phase 1 — Fundamentals (START HERE)

📍 Goal: Build strong foundation. Everything depends on these concepts.

These teach core system behavior, constraints, and tradeoffs.

### MUST READ FIRST

* [ACID](notes/ACID.md)
* [CAP](notes/CAP.md)
* [Consistency vs Integrity](notes/consistency-vs-integrity.md)
* [Idempotency](notes/idempotency.md)
* [NFR](notes/NFR.md)
* [SPOF](notes/SPOF.md)
* [Stateless vs Stateful](notes/stateless-vs-statefull.md)

### Architecture & Design Principles

These help design maintainable systems.

* [SOLID](notes/SOLID.md)
* [SRP](notes/SRP.md)
* [OCP](notes/OCP.md)
* [LSP](notes/LSP.md)
* [DIP vs LSP](notes/DIP-vs-LSP.md)
* [Clear Architecture Principles](notes/clear-architecture-principles.md)
* [12-Factor App](notes/12-factor-app-priniciple.md)

### Why this section matters

After completing this section, you'll understand:

* Why distributed systems fail
* Tradeoffs in consistency vs availability
* How production-grade systems are designed

---

# 🥈 Phase 2 — Databases & Storage

📍 Goal: Understand how data is stored, scaled, and kept consistent.

This section is critical. Most interview questions revolve around this.

---

## Database Fundamentals (Read in order)

* [SQL vs NoSQL](notes/sql-vs-nosql.md)
* [Normalization vs Denormalization](notes/Normalization-Vs-Denormalization.md)
* [Partition vs Sharding](notes/partition-vs-sharding.md)
* [Sharding](notes/Sharding.md)
* [Partition Tolerance](notes/Partition-Tolerence.md)

---

## Transactions & Consistency

* [Serializable Transactions](notes/serializable-transaction.md)
* [MVCC](notes/MVCC.md)
* [Optimistic vs Pessimistic Locking](notes/optimistic-vs-pessimistic-locking.md)
* [Row Level Locking](notes/row-level-locking.md)
* [Distributed Locks](notes/distributed-locks.md)
* [Redis Lock](notes/redis-lock.md)

---

## Replication & Distributed Data

* [Replication](notes/replication.md)
* [Primary Replica Setup](notes/primary-replica-setup.md)
* [Eventual Consistency](notes/eventual-consistency.md)
* [Data Consistency](notes/data-consistency.md)
* [Quorum](notes/quorum.md)

---

## Logs, Durability & Recovery

* [Write Ahead Logs](notes/write-ahead-logs.md)
* [Redo Logs](notes/redo-logs.md)
* [DB Durability](notes/db-durability.md)
* [Data Recovery](notes/data-recovery.md)

---

## Distributed Transactions

* [Two Phase Commit](notes/two-phase-commit.md)
* [Saga Pattern](notes/saga-pattern.md)

---

## Storage Systems

* [Cassandra](notes/Cassandra.md)
* [S3](notes/s3.md)
* [HDFS](notes/HDFS.md)
* [Timeseries DB](notes/timeseries-db.md)

---

After this section, you'll understand:

* How large-scale databases work
* How data scales to billions of records
* How consistency is maintained

---

# 🥉 Phase 3 — Caching & Performance

📍 Goal: Learn how systems achieve high performance.

Caching is asked in almost every interview.

---

## Read in order

* [Caching](notes/Caching.md)
* [Cache Eviction Policies](notes/Cache-Eviction-Policies.md)
* [Hot Keys](notes/hot-keys.md)
* [Hot Reads and Writes](notes/hot-reads-and-writes.md)

---

## Performance Concepts

* [Latency](notes/latency.md)
* [Latency vs Throughput](notes/latency-vs-throughput.md)
* [Tail Latency](notes/tail-and-request-latencies.md)
* [Low Latency Patterns](notes/low-latency-design-patterns.md)

---

## Traffic Handling

* [Backpressure](notes/Backpressure.md)
* [Sudden Traffic Spike](notes/sudden-traffic-spike.md)
* [Buffer Burst](notes/buffer-burst.md)

---

After this section, you'll understand:

* How systems handle millions of requests/sec
* How to reduce latency
* How to prevent system crashes

---

# 🏅 Phase 4 — Distributed Systems Core

📍 Goal: Understand how multi-server systems work.

This is the most important section for senior roles.

---

## Core Distributed Concepts

* [Replication](notes/replication.md)
* [Consistent Hashing](notes/consistent-hashing.md)
* [Leader Election](notes/leader-election.md)
* [Distributed Locking](notes/distributed-locking.md)
* [Fault Tolerance](notes/fault-tolerence.md)
* [Resiliency](notes/Resiliency.md)

---

## Consensus Algorithms

* [Raft Consensus](notes/raft-consensus.md)
* [Paxos](notes/paxos-algorithm.md)

---

## Event Driven Systems

* [Event Driven Architecture](notes/event-driven-architecture.md)
* [Event Sourcing](notes/event-sourcing.md)
* [Outbox Pattern](notes/Outbox-pattern-and-ops-dashboard.md)
* [CQRS](notes/CQRS.md)

---

After this section, you'll understand:

* How distributed systems coordinate
* How failures are handled
* How data consistency works across servers

---

# 🌐 Phase 5 — Networking & Communication

📍 Goal: Understand how services communicate.

Very commonly asked in interviews.

---

## Core Networking

* [How HTTP Works](notes/how-http-works.md)
* [HTTP vs HTTPS](notes/http-https.md)
* [TCP vs UDP](notes/tcp-vs-udp.md)
* [TLS](notes/TLS.md)

---

## Traffic Routing

* [Load Balancer](notes/Load-Balancer.md)
* [L4 vs L7](notes/L4-vs-L7.md)
* [Load Balancer vs Reverse Proxy vs API Gateway](notes/load-balancer-VS-reverse-proxy-VS-api-gateway.md)

---

## Content Delivery

* [CDN](notes/CDN.md)
* [Geo DNS](notes/Geo-DNS.md)

---

After this section, you'll understand:

* How internet works internally
* How traffic reaches servers
* How scaling works globally

---

# 🛡️ Phase 6 — Security

📍 Goal: Learn how authentication and security work.

---

Read in order:

* [JWT](notes/JWT.md)
* [OAuth2](notes/OAuth2.md)
* [Opaque vs JWT Token](notes/opaque-vs-jwt-token.md)
* [TLS](notes/TLS.md)
* [OWASP](notes/OWASP.md)
* [Secrets Management](notes/secrets-management.md)

---

After this section, you'll understand:

* Authentication
* Authorization
* Secure system design

---

# ⚙️ Phase 7 — DevOps & Infrastructure

📍 Goal: Learn how systems run in production.

---

Read in order:

* [Creating Docker Image](notes/creating-docker-image.md)
* [Kubernetes ConfigMap](notes/kubernetes-configmap.md)
* [Kubernetes Ingress](notes/kubernetes-ingress.md)
* [Persistent Volume](notes/persistent-volume.md)
* [Prometheus and Grafana](notes/prometheus-grafana.md)

---

After this section, you'll understand:

* How systems run in production
* Monitoring
* Deployment

---

# 🧱 Phase 8 — Architecture Patterns

📍 Goal: Learn real architecture patterns used in companies.

---

Read in order:

* [Monolith vs Microservices](notes/mono-vs-micro.md)
* [API Gateway](notes/api-gateway.md)
* [Retry Mechanism](notes/retry-mechanism.md)
* [Deployment Strategy](notes/deployment-strategy.md)
* [Rate Limiting](notes/distributed-rate-limiter.md)

---

After this section, you'll understand:

* Real-world architectures
* How companies design scalable systems

---

# 🧪 Phase 9 — Real System Design Problems (FINAL STAGE)

📍 Goal: Apply everything learned.

---

Read:

* [Chat System](notes/chat-system.md)
* [Notifications Design](notes/notifications-design.md)
* [System Design Problems](notes/system-design-problems-key-solution.md)

---

After this section, you'll be able to design:

* WhatsApp
* YouTube
* Uber
* Instagram
* Distributed systems

---

# 🎯 Final Outcome

After completing this roadmap, you will be able to:

✅ Crack System Design Interviews
✅ Design scalable systems
✅ Understand distributed systems deeply
✅ Work as Senior / Staff Engineer

---

# ⭐ Recommended Study Timeline

```
Week 1–2 → Fundamentals
Week 3–4 → Databases
Week 5 → Caching & Performance
Week 6 → Distributed Systems
Week 7 → Networking
Week 8 → Security & DevOps
Week 9 → Architecture Patterns
Week 10 → Real Design Problems
```

---
