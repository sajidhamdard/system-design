# **🛠️ Six Pillars of System Design**

1. **Requirements & Constraints**

   * Define **what the system must do** (functional requirements) and **limits** (budget, tech stack, latency, legal).
   * Example: “Support 1 million users, respond within 200ms.”

2. **High-Level Architecture**

   * Decide the **overall structure** of the system.
   * Includes **components, modules, services, and how they interact**.
   * Example: Client → API Gateway → Microservices → Database

3. **Scaling & Performance**

   * Plan for **handling growth** in traffic and data.
   * Consider **horizontal vs vertical scaling, caching, load balancing, concurrency**.
   * Example: Add Redis caching, database sharding, or CDNs for performance.

4. **Data Storage Strategy**

   * Choose how and where to store data: **SQL, NoSQL, columnar, or object storage**.
   * Decide **partitioning, replication, backup, and retention policies**.

5. **Security & Authentication**

   * Protect data and system access.
   * Include **authentication, authorization, encryption, secrets management, and auditing**.

6. **Monitoring & Reliability**

   * Ensure system **health, availability, and fault tolerance**.
   * Include **logging, metrics, alerts, retries, failover, and SLA/SLO tracking**.

---

💡 **Analogy:**
Designing a system is like **building a secure, scalable, and reliable city**:

* Know the **rules & limits** → requirements & constraints
* Plan **roads, buildings, and zones** → high-level architecture
* Ensure **traffic flows smoothly** → scaling & performance
* Store **resources safely** → data storage strategy
* Protect citizens → security & authentication
* Keep city **running 24/7** → monitoring & reliability

---
