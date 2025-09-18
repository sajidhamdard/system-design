A **distributed rate limiter** is a rate limiting system that works **across multiple servers/nodes** instead of a single process. This is needed when your system is **horizontally scaled** (e.g., multiple API servers behind a load balancer).

If each server keeps its own counter/bucket → a user could exceed the global limit by spreading requests across servers.
So, we need **coordination**.

---

## 🔹 Common Approaches for Distributed Rate Limiting

### 1. **Centralized Store (Redis / Memcached / DB)**

* All servers share a central store for counters/buckets.
* Example: Redis `INCR` with expiry for Fixed Window or Lua scripts for Token Bucket.
* Pros: Simple, widely used.
* Cons: Single-point bottleneck if not scaled.

---

### 2. **Distributed Locks**

* Use a distributed lock (e.g., via Redis Redlock, ZooKeeper, Etcd) to coordinate updates to counters.
* Ensures correctness when multiple servers update the same bucket.
* Pros: Strong consistency.
* Cons: Higher latency, lock contention.

---

### 3. **Sharded Counters**

* Partition the rate-limit counters across multiple nodes (sharding by user ID, API key, etc.).
* Each server updates only its assigned shard.
* Queries for limit enforcement may require aggregation.
* Pros: Scales well.
* Cons: More complex, eventual consistency.

---

### 4. **Leverage Streaming Systems**

* Use Kafka / Pulsar / PubSub to process requests through a stream.
* Rate limiting logic applied in the consumer before passing downstream.
* Pros: Natural ordering + distributed processing.
* Cons: Higher latency, requires queue-based design.

---

### 5. **Token Distribution (Pre-allocation)**

* A central authority generates & distributes “tokens” (like API credits) to each server.
* Each server enforces rate limiting locally until tokens run out, then requests more.
* Pros: Reduces contention, scales well.
* Cons: Less precise (some servers might run out early).

---

### 🔹 Example Tech Choices

* **Redis + Lua script** → most common, atomic operations.
* **Envoy / NGINX with Redis** → API Gateway level rate limiting.
* **Cloud services**:

  * AWS API Gateway → built-in distributed rate limiter.
  * Google Cloud Endpoints / Apigee.
  * Kong / Istio → distributed rate limiting plugins.

---

## ✅ Summary

* **Single-server rate limiters**: easy, local counters/buckets.
* **Distributed rate limiters**: need coordination across nodes → usually solved with **Redis, DB, or token distribution**.
* Tradeoff is between **accuracy** (global strict enforcement) and **performance** (less contention, higher throughput).

---
