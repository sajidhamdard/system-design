# System Design Syllabus (HLD + LLD)

## High-Level Design (HLD)

### 1. Fundamentals

* Serverless vs Serverful Architecture
* Horizontal vs Vertical Scaling
* Threads and Processes
* Pages and Memory Management
* How the Internet Works (DNS, IP, HTTP)
* Client-Server Architecture
* Monolithic vs Microservices Architecture

### 2. Databases

* SQL vs NoSQL Databases
* In-Memory Databases (Redis, Memcached)
* Data Replication & Migration
* Data Partitioning & Sharding
* Indexing
* Normalization & Denormalization
* Database Scaling (Horizontal & Vertical)
* Database Transactions (ACID Properties)

### 3. Consistency & Availability

* Data Consistency and Levels
* Isolation Levels
* CAP Theorem
* Eventual Consistency vs Strong Consistency
* Distributed Consensus Protocols (Paxos, Raft)

### 4. Caching

* What is Cache?
* Cache Types (Application, Database, CDN)
* Caching Strategies (Write-back, Write-through, Write-around)
* Cache Replacement Policies (LRU, LFU, Segmented LRU)
* Content Delivery Network (CDN)
* DNS Caching

### 5. Networking

* TCP vs UDP
* HTTP (1.0, 1.1, 2.0, 3.0) & HTTPS
* WebSockets & Webhooks
* WebRTC & Video Streaming
* TLS/SSL

### 6. Load Balancing

* Load Balancing Algorithms (Round Robin, Least Connections, IP Hashing)
* Consistent Hashing
* Proxy & Reverse Proxy
* Rate Limiting
* Circuit Breaker Pattern

### 7. Message Queues & Event-Driven Architecture

* Asynchronous Processing (Kafka, RabbitMQ)
* Pub-Sub Model
* Message Queues vs Streams
* Event Sourcing & CQRS

### 8. Microservices Architecture (Deep Dive)

* Why Microservices?
* Service Discovery
* API Gateway
* Single Point of Failure
* Avoiding Cascading Failures
* Containerization (Docker)
* Orchestration (Kubernetes)
* Migrating from Monolith to Microservices

### 9. Monitoring & Logging

* Logging Events
* Monitoring Metrics
* Distributed Tracing
* Health Checks & Heartbeats
* Anomaly Detection

### 10. Security

* Authentication Tokens (JWT, OAuth)
* SSO (Single Sign-On)
* Access Control Lists & Role-Based Access Control (RBAC)
* Encryption (At Rest, In Transit)
* Rate Limiting & Throttling
* API Security (OAuth2, OpenID Connect)

### 11. System Design Tradeoffs

* Push vs Pull Architecture
* Consistency vs Availability
* SQL vs NoSQL Tradeoffs
* Memory vs Latency
* Accuracy vs Latency
* Cost vs Performance
* Failover Strategies (Active-Active, Active-Passive)
* Data Lakes vs Data Warehouses
* Scalability vs Maintainability

---

## Low-Level Design (LLD)

### 1. Object-Oriented Programming (OOP)

* OOP Principles (SOLID)
* Class, Object, Interface, Abstract Class
* Composition vs Inheritance
* Dependency Injection

### 2. Design Patterns

* Creational (Singleton, Factory, Builder)
* Structural (Adapter, Composite, Proxy)
* Behavioral (Observer, Strategy, Command)

### 3. Concurrency & Thread Safety

* Threads, Synchronization, Locks
* Deadlocks & Starvation
* Thread-safe Collections
* Concurrent Data Structures
* Executor Framework

### 4. UML Diagrams

* Class Diagram
* Sequence Diagram
* Activity Diagram
* Component Diagram
* Deployment Diagram

### 5. APIs

* REST vs gRPC vs GraphQL
* API Design Principles
* Pagination, Filtering, Sorting
* Versioning
* Rate Limiting
* API Documentation (Swagger/OpenAPI)

### 6. Common LLD Problems

* Design a Parking Lot
* Design a BookMyShow System
* Design an Elevator System
* Design a Splitwise System
* Design a File Storage System
* Design a Rate Limiter
* Design a Cache System

---

## Additional Recommended Topics

* Distributed Transactions (2PC, Sagas)
* Data Modeling (ER Diagrams, Schema Design)
* Bloom Filters & Count-Min Sketch (for Probabilistic Data Structures)
* Idempotency in APIs
* API Gateway Design
* Data Compression & Serialization Formats (Protobuf, Avro)
* Leader Election (ZooKeeper, etcd)
* Quorum & Replication Factor (in Distributed Databases)
* Backpressure Handling in Streams
* Service Mesh (Istio, Linkerd)
* Observability (Logs, Metrics, Traces)
* Chaos Engineering
* Time Series Databases (InfluxDB, Prometheus)
