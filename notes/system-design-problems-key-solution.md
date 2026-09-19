# 🎯 System Design Problems → Core Challenge + Key Solution + Trade-offs

---

### 1. **TinyURL**

* **Core Problem**: Unique short URL mapping.
* **Key Solution**: Base62 encoding + DB storage.
* **Trade-offs**:

  * Random hash (possible collisions) vs Sequential IDs (predictable, less secure).
  * Store in SQL (consistency) vs NoSQL (scalability).

---

### 2. **Ticket Booking System**

* **Core Problem**: Avoid double booking.
* **Key Solution**: Pessimistic / Optimistic locking.
* **Trade-offs**:

  * **Pessimistic lock**: safe but hurts performance under high load.
  * **Optimistic lock**: faster but retries needed on conflicts.

---

### 3. **E-commerce (Amazon)**

* **Core Problem**: Product search + inventory consistency.
* **Key Solution**: Elasticsearch for search + event-driven stock update.
* **Trade-offs**:

  * Strong consistency (slower checkout) vs Eventual consistency (stock may go negative briefly).
  * Search in DB (simple but slow) vs Search in ES (fast but needs sync).

---

### 4. **OTT Streaming (Netflix)**

* **Core Problem**: Adaptive streaming across bandwidths.
* **Key Solution**: Transcoding into multiple bitrates + CDN distribution.
* **Trade-offs**:

  * Pre-transcode all (higher storage) vs Transcode on demand (higher latency).
  * Push video from origin (expensive latency) vs CDN caching (cheap, faster).

---

### 5. **Hotel Booking (Airbnb/MMT)**

* **Core Problem**: Room availability.
* **Key Solution**: Locks (optimistic/pessimistic) + eventual sync with partners.
* **Trade-offs**:

  * Strong consistency (slow but safe) vs Eventual consistency (faster, rare overbooking).
  * Central DB (simple, bottleneck) vs Sharded DB (complex, scalable).

---

### 6. **Food Delivery (Zomato/Swiggy)**

* **Core Problem**: Order assignment + live tracking.
* **Key Solution**: Proximity search (GeoHash, R-Tree) + Pub/Sub updates.
* **Trade-offs**:

  * Centralized assignment (optimal matching but slow) vs Decentralized (fast but may be sub-optimal).
  * Polling (wasteful, outdated) vs Push via WebSockets (efficient, complex infra).

---

### 7. **Proximity Search**

* **Core Problem**: Fast geo search.
* **Key Solution**: R-Trees / GeoHash indexing.
* **Trade-offs**:

  * Exact distance calculation (accurate but slower) vs Approximate GeoHash (fast but may include false positives).

---

### 8. **Chat App (WhatsApp)**

* **Core Problem**: Message delivery guarantees.
* **Key Solution**: Message queues + ACKs + ordering guarantees.
* **Trade-offs**:

  * At-least-once (safe but may duplicate) vs At-most-once (no duplicates but may lose).
  * Store messages in DB (durable but slower) vs In-memory queues (fast but risk of loss).

---

### 9. **Distributed Job Scheduler**

* **Core Problem**: Ensure job runs once globally.
* **Key Solution**: Distributed locks (Redis/Zookeeper) + leader election.
* **Trade-offs**:

  * Centralized scheduler (simple but SPOF) vs Distributed (resilient but complex).
  * Immediate retries (fast but risk duplicates) vs Delayed retries (safe but slower recovery).

---

### 10. **Collaborative Editor (Google Docs)**

* **Core Problem**: Merge concurrent edits.
* **Key Solution**: OT (Operational Transformation) or CRDTs.
* **Trade-offs**:

  * OT (complex but widely adopted) vs CRDT (eventual consistency, simpler conflict handling).
  * Real-time sync (better UX, expensive infra) vs Periodic sync (cheaper, worse UX).

---

### 11. **Ride Sharing (Uber/Ola)**

* **Core Problem**: Matching rider ↔ nearest driver.
* **Key Solution**: GeoHash indexing + dynamic pricing.
* **Trade-offs**:

  * Central dispatch (better matches, slower) vs Local matching (faster, less optimal).
  * Strong consistency for driver status (expensive) vs Eventual consistency (rare mismatches).

---

### 12. **Stock Trading (Zerodha/Groww)**

* **Core Problem**: Low-latency order matching.
* **Key Solution**: In-memory order book + DB persistence.
* **Trade-offs**:

  * Consistency (safe but slower) vs Availability (fast but may reject valid trades).
  * In-memory matching (fast but volatile) vs DB-based (safe but slower).

---

### 13. **Social Media (Facebook/Instagram)**

* **Core Problem**: News feed generation at scale.
* **Key Solution**: Fan-out (precompute feeds) vs Fan-in (compute at read time).
* **Trade-offs**:

  * Fan-out on write (fast reads, heavy writes) vs Fan-out on read (light writes, slow reads).
  * Strong ordering (expensive DB ops) vs Eventual ordering (fast, but minor inconsistencies).

---

# ✅ Final Tip for Interviews

When asked any design problem, follow this formula:

1. State the **core challenge**.
2. Propose the **main solution**.
3. Mention **1–2 trade-offs**.

Example (Food Delivery):

> “The core challenge is assigning delivery partners efficiently. A common solution is using GeoHash for nearby driver search and Pub/Sub for tracking. The trade-off is centralized assignment gives optimal matches but slower; decentralized assignment is faster but may lead to sub-optimal driver allocation.”

---

---

# ✅ Quick “Interview Recall Formula”

When asked a system design problem → answer in this format:

* “The **core challenge** here is *X*. We solve it using *Y*.”
  Example:

> “In a ticket booking system, the core challenge is avoiding double booking of seats under concurrency. We solve it using DB locking (pessimistic/optimistic) or distributed locks like Redis with TTL.”

---
