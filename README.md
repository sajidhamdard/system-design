# 🏗️ System Design and Architecture Notes

A step-by-step roadmap for learning system design, distributed systems, networking, scalability, security, infrastructure, and real-world architecture.

📖 **[Read the interactive version](https://sajidhamdard.github.io/system-design/)** for a better reading experience.

This guide is useful for:

- Software engineers preparing for system design interviews
- Developers building scalable production systems
- Engineers moving into senior and staff-level roles

## How to use this roadmap

Study the phases in order. Each phase builds on the previous one.

1. Learn the fundamentals.
2. Understand how data is stored and queried.
3. Learn how to improve performance.
4. Study distributed systems and failure handling.
5. Learn networking and service communication.
6. Study security and identity.
7. Learn how systems run in production.
8. Study architecture patterns and integration styles.
9. Practice real-world system design problems.
10. Review the interview and estimation material regularly.

Do not try to read every topic in one sitting. Complete one subsection, take notes, and then apply the ideas in a small design exercise.

## Recommended starting points

Start with these files before moving through the phases:

- [Syllabus](notes/Syllabus.md)
- [Six Pillars of System Design](notes/six-pillars-of-system-design.md)
- [System Design Patterns](notes/system-design-patterns.md)
- [High Scale System Design](notes/high-scale-system-design.md)
- [Back-of-the-Envelope Estimation](notes/back-of-the-envelop.md)
- [Interview Questions](notes/interview-questions.md)
- [System Design Problems and Key Solutions](notes/System-design-problems-key-solution.md)

# Phase 1: Fundamentals and Design Principles

**Goal:** Understand the basic properties, constraints, and principles used to design reliable systems.

## Core system design concepts

- [Six Pillars of System Design](notes/six-pillars-of-system-design.md)
- [Non-Functional Requirements](notes/NFR.md)
- [Non-Functional Requirements: No-Value Trap](notes/non-functional-no-value-trap.md)
- [SLA](notes/SLA.md)
- [SLOs vs SLAs](notes/SLOs-vs-SLAs.md)
- [ACID](notes/ACID.md)
- [CAP Theorem](notes/CAP.md)
- [Consistency vs Integrity](notes/consistency-vs-integrity.md)
- [Idempotency](notes/idempotency.md)
- [Stateless vs Stateful Systems](notes/stateless-vs-statefull.md)
- [Single Server Design](notes/signle-server-design.md)
- [Two-Tier Architecture](notes/Two-tier-architecture.md)
- [Project Architecture](notes/project-architecture.md)
- [Clear Architecture Principles](notes/clear-architecture-principles.md)
- [12-Factor App Principles](notes/12-factor-app-priniciple.md)
- [Coupling vs Cohesion](notes/coupling-vs-choesion.md)
- [SOLID](notes/SOLID.md)
- [Single Responsibility Principle](notes/SRP.md)
- [Open-Closed Principle](notes/OCP.md)
- [Liskov Substitution Principle](notes/LSP.md)
- [Dependency Inversion Principle vs Liskov Substitution Principle](notes/DIP-vs-LSP.md)
- [Strategy Design Pattern](notes/StrategyDesignPattern.md)
- [Proof of Concept](notes/POC.md)
- [Definition of Done](notes/DOD.md)
- [Phased Approach](notes/phased-approach.md)
- [Measure First Approach](notes/measure-first-approach.md)

# Phase 2: Capacity Planning and Scaling

**Goal:** Estimate system capacity and understand how to scale services and infrastructure.

- [Back-of-the-Envelope Estimation](notes/back-of-the-envelop.md)
- [CPU Calculation](notes/cpu-calculation.md)
- [IOPS](notes/IOPS.md)
- [Vertical vs Horizontal Scaling](notes/vertical-vs-horizontal-scaling.md)
- [High Scale System Design](notes/high-scale-system-design.md)
- [Scaling Patterns](notes/system-design-patterns.md)
- [Hotspots](notes/Hotspot.md)
- [Hot Keys](notes/hot-keys.md)
- [Hot Reads and Writes](notes/hot-reads-and-writes.md)
- [Fanout](notes/fanout.md)
- [Push vs Pull Architecture](notes/push-vs-pull-architecture.md)
- [Asynchronous Decoupling](notes/asynchronous-decoupling.md)
- [Backpressure](notes/Backpressure.md)
- [Real-Time Backpressure](notes/real-time-backpressure.md)
- [Buffer Burst](notes/buffer-burst.md)
- [Sudden Traffic Spike](notes/sudden-traffic-spike.md)
- [Rate Adaptation and Throttling](notes/rate-adaptation-and-throttling.md)
- [Throttling and Rate Limiting](notes/throttling-rate-limiting.md)
- [Rate Limiting Algorithms](notes/rate-limiting-algos.md)
- [Distributed Rate Limiter](notes/distributed-rate-limiter.md)

# Phase 3: Databases and Data Modeling

**Goal:** Learn how to choose databases, model data, and scale storage systems.

## Database fundamentals

- [SQL vs NoSQL](notes/sql-vs-nosql.md)
- [Document vs Columnar Databases](notes/document-vs-columnar-db.md)
- [Partition vs Sharding](notes/partition-vs-sharding.md)
- [Sharding](notes/Sharding.md)
- [Partition Tolerance](notes/Partition-Tolerence.md)
- [Database Tuning](notes/tuned-database.md)
- [Index Fragmentation](notes/index-fragmentation.md)
- [Cursor Pagination](notes/cursor-pagination.md)
- [Data Isolation](notes/data-isolation.md)
- [Normalization vs Denormalization](notes/Normalization-Vs-Denormalization.md)

## Database technologies and storage systems

- [Cassandra](notes/Cassandra.md)
- [DynamoDB](notes/dynamo-db.md)
- [Graph Databases](notes/graph-db.md)
- [Advanced Graph Databases](notes/graph-db-advanced.md)
- [Neo4j Basics](notes/neo4j-basics.md)
- [Time Series Databases](notes/timeseries-db.md)
- [S3](notes/s3.md)
- [HDFS](notes/HDFS.md)
- [Data Lakes](notes/Data-Lakes.md)
- [Frontend Storage](notes/frontend-storage.md)
- [PgBouncer](notes/PgBouncer.md)
- [Redis Persistence](notes/redis-persistence.md)

## Transactions and locking

- [Serializable Transactions](notes/serializable-transaction.md)
- [MVCC](notes/MVCC.md)
- [Optimistic vs Pessimistic Locking](notes/optimistic-vs-pessimistic-locking.md)
- [Optimistic Lock Exception](notes/OptimisticLockException.md)
- [Row-Level Locking](notes/row-level-locking.md)
- [Locking](notes/locking.md)
- [Compare and Swap](notes/compare-and-swap.md)
- [Distributed Locks](notes/distributed-locks.md)
- [Distributed Locking](notes/distributed-locking.md)
- [Redis Lock](notes/redis-lock.md)

## Replication, consistency, and recovery

- [Replication](notes/replication.md)
- [Primary Replica Setup](notes/primary-replica-setup.md)
- [Data Consistency](notes/data-consistency.md)
- [Database Consistency](notes/db-consistency.md)
- [Eventual Consistency](notes/eventual-consistency.md)
- [Quorum](notes/quorum.md)
- [Write-Ahead Logs](notes/write-ahead-logs.md)
- [Redo Logs](notes/redo-logs.md)
- [Database Durability](notes/db-durability.md)
- [Data Recovery](notes/data-recovery.md)
- [Data Replication Migration Process](notes/data-replication-migration-process.md)
- [Migration](notes/migration.md)
- [RTO and RPO](notes/RTO-RPO.md)
- [Failover Switching](notes/Failover-Switching.md)
- [High Availability Clusters](notes/HA-clusters.md)

## Distributed transactions and data change flows

- [Two-Phase Commit](notes/two-phase-commit.md)
- [Saga Pattern](notes/saga-pattern.md)
- [Change Data Capture](notes/CDC.md)
- [Backfill Service](notes/backfill-service.md)
- [Dedupe Storage](notes/dedupe-storage.md)

# Phase 4: Caching and Performance

**Goal:** Reduce latency, improve throughput, and protect backend systems.

- [Caching](notes/Caching.md)
- [Cache Eviction Policies](notes/Cache-Eviction-Policies.md)
- [Bloom Filters](notes/bloom-filters.md)
- [Redis Streams](notes/redis-streams.md)
- [Lua Scripts](notes/lua-scripts.md)
- [Latency](notes/latency.md)
- [Latency vs Throughput](notes/latency-vs-throughput.md)
- [Tail and Request Latencies](notes/tail-and-request-latencies.md)
- [Low-Latency Design Patterns](notes/low-latency-design-patterns.md)
- [Preload Strategies](notes/preload-strategies.md)
- [Post Materializer](notes/post-materializer.md)
- [Download and Upload](notes/download-upload.md)

# Phase 5: Distributed Systems

**Goal:** Understand coordination, consistency, failure handling, and communication between services.

## Coordination and consistency

- [Replication](notes/replication.md)
- [Consistent Hashing](notes/consistent-hashing.md)
- [Leader Election](notes/leader-election.md)
- [Raft Consensus](notes/raft-consensus.md)
- [Paxos](notes/paxos-algorithm.md)
- [Fault Tolerance](notes/fault-tolerence.md)
- [Resiliency](notes/Resiliency.md)
- [Cascading Failures](notes/cascading-failures.md)
- [Chaos Testing](notes/chaos-testing.md)
- [Exactly Once vs At Least Once Delivery](notes/exactly-once-vs-at-least-once.md)
- [Consumer Lag Monitoring](notes/consumer-lag-monitoring.md)

## Event-driven architecture

- [Event-Driven Architecture](notes/event-driven-architecture.md)
- [Event Sourcing](notes/event-sourcing.md)
- [Event Sourcing vs Outbox](notes/event-sourcing-vs-outbox.md)
- [Outbox Pattern and Operations Dashboard](notes/Outbox-pattern-and-ops-dashboard.md)
- [CQRS](notes/CQRS.md)
- [Kafka vs RabbitMQ](notes/kafka-vs-rabbitmq.md)
- [Kafka vs Pulsar vs Pub/Sub](notes/kafka-vs-pulsar-vs-pubsub.md)

## Conflict resolution and collaboration

- [Conflict Resolution Strategies](notes/conflict-resolution-strategies.md)
- [CRDT](notes/CRDT.md)
- [CRDT Deep Dive](notes/crdt-deep-dive.md)
- [Operational Transformation](notes/operational-transformation.md)
- [Operational Transformation vs CRDTs](notes/OT-vs-CRDTs.md)

# Phase 6: Networking and Communication

**Goal:** Understand how requests travel through the internet and between services.

## Internet and protocols

- [The Internet](notes/internet.md)
- [How HTTP Works](notes/how-http-works.md)
- [HTTP vs HTTPS](notes/http-https.md)
- [REST Call](notes/rest-call.md)
- [TCP vs UDP](notes/tcp-vs-udp.md)
- [gRPC](notes/gRPC.md)
- [Encoding](notes/encoding.md)
- [200 vs 201 vs 202](notes/200-vs-201-vs-202.md)
- [301 vs 302](notes/301-vs-302.md)
- [429 vs 503](notes/429-vs-503.md)

## Load balancing and request routing

- [Load Balancer](notes/Load-Balancer.md)
- [Load Balancing Algorithms](notes/load-balancing-algorithms.md)
- [L4 vs L7](notes/L4-vs-L7.md)
- [Load Balancer vs Reverse Proxy](notes/Load-Balancer-vs-reverse-proxy.md)
- [Load Balancer vs Reverse Proxy vs API Gateway](notes/load-balancer-VS-reverse-proxy-VS-api-gateway.md)
- [API Gateway](notes/api-gateway.md)
- [Apigee](notes/apigiee.md)
- [Nginx](notes/nginx.md)
- [Sticky Sessions](notes/sticky-session.md)
- [SSL Termination](notes/SSL-termination.md)

## Real-time communication

- [WebSockets](notes/websockets.md)
- [Long Polling vs WebSockets](notes/long-polling-vs-websockets.md)
- [Short Polling vs Long Polling](notes/short-polling-vs-long-polling.md)
- [Server-Sent Events](notes/server-sent-events.md)
- [WebRTC](notes/WebRTC.md)
- [Webhooks](notes/webhooks.md)

## Content delivery and location-based systems

- [CDN](notes/CDN.md)
- [Geo DNS](notes/Geo-DNS.md)
- [Geohash](notes/geohash.md)
- [Proximity Search](notes/proximity-search.md)
- [Vanity URLs](notes/vanity-url.md)
- [UUID](notes/uuid.md)
- [Snowflake IDs](notes/snowflake-id.md)

# Phase 7: Security and Identity

**Goal:** Design systems that protect users, data, services, and infrastructure.

## Authentication and authorization

- [JWT](notes/JWT.md)
- [OAuth 2.0](notes/OAuth2.md)
- [OAuth 2.0 Grant Types](notes/grant_types_oauth2.md)
- [OAuth 2.0 in Liberty](notes/oauth2-in-liberty.md)
- [Opaque Tokens vs JWT](notes/opaque-vs-jwt-token.md)
- [Identity Provider](notes/identity-provider.md)
- [Active Directory](notes/active-directory.md)
- [Access Control Lists and Rule Engine](notes/ACL-and-Rule-Engine.md)
- [Rule Engine](notes/rule-engine.md)
- [Short-Circuit Authentication](notes/short-circuit-auth.md)
- [Refresh Token Protection](notes/refresh-token-protection.md)
- [Brute-Force Protection](notes/brute-force-protection.md)

## Application and infrastructure security

- [TLS](notes/TLS.md)
- [Cryptography](notes/cryptography.md)
- [Encryption](notes/encryption.md)
- [OWASP](notes/OWASP.md)
- [Secrets Management](notes/secrets-management.md)
- [Database Secrets](notes/db-secrets.md)
- [Threat Modeling](notes/threat-modeling.md)
- [Threat Detection](notes/threat-detection.md)
- [DDoS Protection](notes/DDOS-Protection.md)
- [WAF](notes/WAF.md)
- [SAST vs DAST](notes/SAST-vs-DAST.md)
- [Dependency Vulnerability Checks](notes/dependency-vulnerability-checks.md)

# Phase 8: Observability and Operations

**Goal:** Detect problems, understand system behavior, and operate services reliably.

- [Telemetry](notes/telemetry.md)
- [Distributed Tracing](notes/distributed-tracing.md)
- [Log Aggregation](notes/log-aggregation.md)
- [Prometheus and Grafana](notes/prometheus-grafana.md)
- [Anomaly Detection](notes/anomaly-detection.md)
- [Spring Boot Health Check](notes/Spring-Boot-Health-Check.md)
- [Auto Restart](notes/auto-restart.md)
- [Kubernetes Pod Restart](notes/Kubernetes-Pods-Restart.md)
- [Cron Jobs](notes/cronjob.md)
- [Retry Mechanism](notes/retry-mechanism.md)

# Phase 9: DevOps, Cloud, and Deployment

**Goal:** Package, deploy, scale, and manage applications in production.

## Containers and Kubernetes

- [Creating a Docker Image](notes/creating-docker-image.md)
- [Kubernetes ConfigMap](notes/kubernetes-configmap.md)
- [Kubernetes Ingress](notes/kubernetes-ingress.md)
- [Persistent Volumes](notes/persistent-volume.md)
- [Kubernetes Pods Restart](notes/Kubernetes-Pods-Restart.md)
- [Helm](notes/helm.md)

## Deployment and infrastructure

- [Deployment Strategy](notes/deployment-strategy.md)
- [Multi-Region Deployment](notes/multi-region-deployment.md)
- [Serverful vs Serverless](notes/serverfull-vs-serverless.md)
- [Serverless Cost Patterns](notes/serverless-cost-patterns.md)
- [Spot and Preemptible Instances](notes/spot-preemptible-instances.md)

# Phase 10: Architecture Patterns and Application Design

**Goal:** Compare common architecture styles and select the right pattern for a system.

- [Monolith vs Microservices](notes/mono-vs-micro.md)
- [API Gateway](notes/api-gateway.md)
- [System Design Patterns](notes/system-design-patterns.md)
- [Two-Tier Architecture](notes/Two-tier-architecture.md)
- [Project Architecture](notes/project-architecture.md)
- [Asynchronous Decoupling](notes/asynchronous-decoupling.md)
- [Retry Mechanism](notes/retry-mechanism.md)
- [Rate Limiting](notes/distributed-rate-limiter.md)
- [Rule Engine](notes/rule-engine.md)
- [ACL and Rule Engine](notes/ACL-and-Rule-Engine.md)

# Phase 11: Search, Analytics, and Data Processing

**Goal:** Learn the building blocks behind search, analytics, recommendations, and large-scale data processing.

- [Inverted Index](notes/inverted-index.md)
- [Text Search Engines](notes/text-search-engines.md)
- [Apache Lucene](notes/apache-lucene.md)
- [Elasticsearch](notes/elastic-search.md)
- [TF-IDF](notes/TF-IDF.md)
- [Batch vs Streaming](notes/batch-vs-streaming.md)
- [Micro-Batching](notes/micro-batching.md)
- [Apache Spark](notes/apache-spark.md)
- [DASH](notes/DASH.md)
- [Chunker Service](notes/chunker-service.md)
- [Basics of AI](notes/basics-of-AI.md)

# Phase 12: Media and Streaming Systems

**Goal:** Understand how large media files are uploaded, processed, delivered, and streamed.

- [Adaptive Streaming](notes/adaptive-streaming.md)
- [Adaptive Bitrate Streaming](notes/adaptive-bitrate-streaming.md)
- [HLS](notes/HLS.md)
- [Manifest Video Processing](notes/manifest-video-processing.md)
- [Transcoding](notes/transcoding.md)
- [Video Download and Upload](notes/download-upload.md)

# Phase 13: Real-World System Design Problems

**Goal:** Apply the concepts from the earlier phases to complete system designs.

- [Chat System](notes/chat-system.md)
- [Notifications Design](notes/notifications-design.md)
- [System Design Problems and Key Solutions](notes/System-design-problems-key-solution.md)
- [Interview Questions](notes/interview-questions.md)

When practicing a design problem, follow this sequence:

1. Clarify the requirements.
2. Identify functional requirements.
3. Identify non-functional requirements.
4. Estimate traffic and storage.
5. Define the public APIs.
6. Design the data model.
7. Draw the high-level architecture.
8. Explain the request and data flows.
9. Identify bottlenecks and failure modes.
10. Add scaling, caching, observability, and security.
11. Discuss tradeoffs and alternative designs.

# Suggested study schedule

## Week 1: Fundamentals

Read Phase 1 and complete a simple single-server design.

## Week 2: Capacity and scaling

Read Phase 2 and practice traffic, storage, and CPU calculations.

## Weeks 3 and 4: Databases

Read Phase 3. Design a storage model and compare SQL, NoSQL, partitioning, sharding, and replication.

## Week 5: Caching and performance

Read Phase 4. Add caching, rate limiting, backpressure, and latency targets to an existing design.

## Week 6: Distributed systems

Read Phase 5. Study consensus, event delivery, failure handling, and consistency tradeoffs.

## Week 7: Networking

Read Phase 6. Trace a request from the client through DNS, the load balancer, the gateway, services, and storage.

## Week 8: Security and operations

Read Phases 7 and 8. Add authentication, authorization, secrets, logs, metrics, and tracing to your designs.

## Week 9: DevOps and architecture patterns

Read Phases 9 and 10. Practice deployment, multi-region architecture, containers, and service boundaries.

## Week 10: Search, media, and real-world problems

Read Phases 11, 12, and 13. Complete at least three full system design exercises.

# Final checklist

Before considering a design complete, verify that it includes:

- Clear functional and non-functional requirements
- Capacity estimates
- API and data model decisions
- Appropriate storage technology
- Caching and performance strategy
- Scaling and partitioning strategy
- Failure handling and recovery plan
- Security and access control
- Observability and operational readiness
- Deployment and rollback strategy
- Tradeoffs and known limitations

After completing this roadmap, you should be able to reason about scalable systems, explain design tradeoffs, and approach system design interviews with a repeatable process.
