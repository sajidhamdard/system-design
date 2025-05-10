## **High-Level Design (HLD)**

### 1️⃣ **Fundamentals**

* What is the difference between horizontal and vertical scaling? When would you use each?
* Explain Monolithic vs Microservices architecture. What are pros and cons of each?
* How does a client-server architecture work? Can you design a basic client-server interaction flow?
* How does DNS resolution work when you enter a URL in the browser?
* How does HTTP work under the hood? Can you describe an end-to-end request flow?
* What are the trade-offs of serverless vs serverful architectures?

---

### 2️⃣ **Databases**

* SQL vs NoSQL — when to choose which?
* What is Indexing? How does it improve performance? What are its downsides?
* How does sharding work? What are the pros and cons of sharding a database?
* What is replication? What are the different types of replication?
* Explain eventual consistency and strong consistency in context of databases.
* What are the CAP theorem implications on database design?
* What is normalization? When would you denormalize your schema?
* How do ACID properties ensure reliability in databases?
* How would you scale a database horizontally? What challenges will you face?
* How does a distributed database ensure fault tolerance?

---

### 3️⃣ **Consistency & Availability**

* Explain CAP theorem with real-life examples.
* What is eventual consistency? Can you give a use case where it is acceptable?
* What is quorum in distributed systems? How does it relate to consistency and availability?
* What are distributed consensus algorithms like Paxos or Raft? Why are they needed?
* What is the difference between strong consistency, weak consistency, and eventual consistency?
* What is the difference between read-your-writes and monotonic reads consistency models?
* Explain isolation levels in relational databases with examples.
* How does leader election work in distributed systems?

---

### 4️⃣ **Caching**

* Why do we use caching? What are the benefits and risks?
* What is CDN caching and how does it work?
* What are the different cache eviction policies (LRU, LFU)? When would you use each?
* What are cache consistency strategies? How do you ensure cache invalidation?
* What is the difference between write-through, write-back, and write-around caching?
* How does DNS caching improve performance?
* How would you cache user sessions in a scalable web application?
* What is cache stampede? How do you mitigate it?

---

### 5️⃣ **Networking**

* What is the difference between TCP and UDP? When would you prefer one over the other?
* How does HTTPS work internally? What is the role of SSL/TLS in HTTPS?
* What is the difference between HTTP/1.1, HTTP/2, and HTTP/3?
* How does WebSocket work? How is it different from HTTP?
* How does a TLS handshake work? What is mutual TLS?
* What is the role of a Content Delivery Network (CDN) in networking?
* How does video streaming (like YouTube or Netflix) work over the internet?

---

### 6️⃣ **Load Balancing**

* Why do we need load balancers? What are their key advantages?
* What is the difference between Layer 4 and Layer 7 load balancing?
* Explain various load balancing algorithms (Round Robin, Least Connections, IP Hashing).
* What is a reverse proxy? How is it different from a forward proxy?
* What is Consistent Hashing? How does it help in distributed systems?
* How do you implement rate limiting at the API level?
* What is a circuit breaker pattern? Why is it used?
* How do you ensure high availability and fault tolerance using load balancers?

---

### 7️⃣ **Message Queues & Event-Driven Architecture**

* What is the difference between message queues and streams? Give examples.
* When would you use Kafka vs RabbitMQ?
* What is the Pub/Sub model? How does it work?
* What is event sourcing? How is it different from traditional CRUD?
* Explain CQRS (Command Query Responsibility Segregation). What problem does it solve?
* What are the advantages of asynchronous processing in large-scale systems?
* How does exactly-once, at-least-once, and at-most-once delivery semantics work in messaging systems?
* How does Kafka ensure message durability and fault tolerance?
* What is backpressure in streaming systems? How do you handle it?

---

### 8️⃣ **Microservices Architecture (Deep Dive)**

* What are the advantages and challenges of microservices over monolithic architecture?
* What is service discovery? How does it work in a microservice ecosystem?
* What is an API Gateway? What are its benefits and risks?
* How do you handle inter-service communication — REST vs gRPC vs messaging?
* What is a single point of failure? How do you avoid it in microservices?
* How do you prevent cascading failures in a microservice architecture?
* What is the role of Docker in microservices?
* How does Kubernetes help in orchestration of microservices?
* What are the challenges in migrating from monolith to microservices? How do you plan such a migration?
* How do you manage distributed transactions in microservices (Sagas, 2PC)?
* How do you monitor and debug a distributed microservices-based system?

---

### 9️⃣ **Monitoring & Logging**

* What is the difference between monitoring and logging?
* What are some key metrics you would monitor in a large distributed system?
* How does distributed tracing work? Why is it important in microservices?
* What are health checks and how do they help in system reliability?
* What is anomaly detection in system monitoring? How can it be implemented?
* How do you aggregate logs from multiple services/machines?
* How do you design a centralized logging system?
* What is an alerting system? What are best practices to avoid alert fatigue?

---

### 🔟 **Security**

* What is the difference between authentication and authorization?
* How does OAuth2 work? What are its different grant types?
* What is the difference between JWT and session-based authentication?
* How does Single Sign-On (SSO) work?
* What is role-based access control (RBAC)? How do you implement it?
* What is encryption at rest vs encryption in transit? Why are both important?
* How do you secure APIs? What are common attack vectors (e.g., rate limiting, SQL injection)?
* How do you prevent man-in-the-middle attacks in a distributed system?
* How does OpenID Connect work in comparison with OAuth2?

---

### 1️⃣1️⃣ **System Design Tradeoffs**

* How would you decide between SQL and NoSQL for a given application?
* How do you balance consistency vs availability in a distributed system?
* What is the trade-off between memory usage and latency in caching systems?
* How do you design for cost vs performance in cloud infrastructure?
* What are the trade-offs between push-based vs pull-based architectures?
* When would you choose eventual consistency over strong consistency?
* How do you handle failover in a distributed application (Active-Active vs Active-Passive)?
* What is the difference between a data lake and a data warehouse? When would you use each?
* How do you balance scalability vs maintainability in microservices architecture?

---


Perfect! Here's **Part 4 (Low-Level Design)** covering OOP, Design Patterns, Concurrency, UML, APIs, and Common LLD Problems.

---

## **Low-Level Design (LLD)**

### 1️⃣ **Object-Oriented Programming (OOP)**

* What are the four basic principles of Object-Oriented Programming? Can you explain each one?
* What is the difference between an interface and an abstract class? When would you use each?
* Explain the concept of polymorphism with examples.
* What is the difference between composition and inheritance? When would you prefer composition over inheritance?
* What is dependency injection? How is it implemented in different programming languages?
* Can you explain SOLID principles? Provide examples of how to apply them in real-world applications.
* What is the difference between a deep copy and a shallow copy in object cloning?
* What is the importance of encapsulation in software design?

---

### 2️⃣ **Design Patterns**

#### **Creational Patterns**

* What is the Singleton pattern? When should it be used, and what are its potential issues?
* How does the Factory pattern differ from the Abstract Factory pattern?
* Can you explain the Builder pattern with an example? When is it useful?

#### **Structural Patterns**

* What is the Adapter pattern? Can you provide an example where it can be used?
* How does the Composite pattern work? Can you think of an example where it is applicable?
* Explain the Proxy pattern. How can it help with performance or security?

#### **Behavioral Patterns**

* What is the Observer pattern? How does it work and where is it useful?
* How does the Strategy pattern work? Can you give an example of its usage?
* Can you explain the Command pattern with an example?

---

### 3️⃣ **Concurrency & Thread Safety**

* What is a thread? How is it different from a process?
* What are race conditions? How can you avoid them in a multithreaded environment?
* What is synchronization in Java? Can you explain how to implement it to ensure thread safety?
* What are the potential pitfalls of multithreading and how do you mitigate them (e.g., deadlocks, starvation)?
* How does the Executor Framework simplify thread management in Java?
* What is the difference between a synchronized method and a synchronized block?
* What is a thread pool and how does it improve performance?
* What are thread-safe collections? Can you give examples of thread-safe collections in Java?
* What is the purpose of the `volatile` keyword in Java? How does it help in multithreading?
* How do you implement a thread-safe singleton in a multithreaded environment?

---

### 4️⃣ **UML Diagrams**

* What is the purpose of a class diagram? What kind of information does it represent?
* How do you represent relationships like inheritance and composition in a UML diagram?
* What is a sequence diagram? How does it differ from a class diagram?
* Can you explain an activity diagram with an example? How do you use it in system design?
* What is a deployment diagram and what does it describe in the context of system architecture?
* How would you design a component diagram for a microservice-based system?

---

### 5️⃣ **APIs**

* What is the difference between REST, gRPC, and GraphQL? When would you use each?
* How do you handle versioning in REST APIs?
* Can you explain the concept of statelessness in REST APIs?
* What are common HTTP status codes and their meanings (e.g., 200, 400, 404, 500)?
* What is the role of authentication and authorization in API design? How do you implement OAuth2 in an API?
* How would you design an API for a service like booking flights (e.g., POST /book, GET /book/{id})?
* What is rate limiting? How would you implement it in a REST API?
* What is the importance of pagination in APIs? How would you design pagination for a large dataset?
* What are the differences between synchronous and asynchronous APIs?
* What is Swagger/OpenAPI? How does it help in API documentation and testing?

---

### 6️⃣ **Common LLD Problems**

* How would you design a parking lot system?

  * What classes would you create? What attributes and methods would they have?
  * How would you handle pricing, parking slots, and vehicle types?
* Design a BookMyShow system.

  * What components would be involved? How would you structure the data?
  * How would you manage seat reservations, payments, and user interactions?
* How would you design an elevator system?

  * How would you handle multiple floors, multiple elevators, and user requests?
  * What algorithms would you use for optimal elevator selection?
* Design a Splitwise system.

  * How would you model the debts, payments, and users? What is the structure of the data?
  * How would you handle the scenario when someone clears a debt?
* How would you design a file storage system like Dropbox or Google Drive?

  * What are the main features you would include (upload, download, sharing)?
  * How would you ensure scalability and fault tolerance for file storage?
* How would you design a rate limiter?

  * What are the strategies you would use (e.g., token bucket, leaky bucket)?
  * How would you ensure that the rate limiting is efficient and does not degrade performance?
* How would you design a caching system?

  * What cache eviction policies would you use (LRU, LFU)?
  * How would you manage cache consistency and invalidation?

---
