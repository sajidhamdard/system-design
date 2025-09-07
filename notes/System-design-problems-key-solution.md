# 🎯 System Design Problems → Core Challenge + Key Solution

### 1. **TinyURL**

* **Core Problem**: Generate a unique short URL that maps to long URL.
* **Key Solution**: Use **Base62 encoding** + **hashing** + **collision handling**; store in DB/cache.

---

### 2. **Ticket Booking System (Movie, Bus, Flights)**

* **Core Problem**: Avoid **double booking of seats** under concurrency.
* **Key Solution**: Use **pessimistic / optimistic locking** (DB `FOR UPDATE` or versioning), sometimes **Redis lock with TTL**.

---

### 3. **E-commerce (Amazon, Flipkart)**

* **Core Problem**: Handle **high traffic product search + inventory consistency**.
* **Key Solution**: **Elasticsearch** for search, **event-driven updates** for stock, **caching** for product pages.

---

### 4. **OTT Streaming (Netflix, Hotstar)**

* **Core Problem**: Efficient **video delivery across varying bandwidths**.
* **Key Solution**: **Transcoding to multiple bitrates + chunking**, store in CDN; adaptive streaming (HLS, MPEG-DASH).

---

### 5. **Hotel Booking (Airbnb, MMT, Booking.com)**

* **Core Problem**: **Room availability & overbooking**.
* **Key Solution**: **Optimistic / pessimistic locking** on rooms, **eventual consistency** across partner inventory.

---

### 6. **Food Delivery (Zomato, Swiggy, Uber Eats)**

* **Core Problem**: **Order assignment + real-time tracking**.
* **Key Solution**: **Proximity search (R-Tree, GeoHash)** to find nearby delivery agents; use **Pub/Sub** for live order tracking.

---

### 7. **Proximity Search (Nearby restaurants, ATMs)**

* **Core Problem**: Fast **geo-spatial search**.
* **Key Solution**: Use **R-Trees / QuadTrees / GeoHash** + **caching**.

---

### 8. **Chat App (WhatsApp, Messenger)**

* **Core Problem**: **Message delivery guarantees** (at least once, order preserved).
* **Key Solution**: **Message queues (Kafka, RabbitMQ)**, **acknowledgements**, **read receipts**, DB with **time-ordered writes**.

---

### 9. **Distributed Job Scheduler (e.g., Cron across many nodes)**

* **Core Problem**: Ensure **a job runs once, not multiple times**.
* **Key Solution**: **Distributed locks (Redis/Zookeeper/etcd)**, **leader election**, job queues.

---

### 10. **Real-time Collaborative Editor (Google Docs)**

* **Core Problem**: Merge **simultaneous edits** without conflicts.
* **Key Solution**: **Operational Transformation (OT)** or **CRDTs**, WebSockets for real-time sync.

---

### 11. **Ride Sharing (Uber, Ola)**

* **Core Problem**: **Matching rider with nearest driver in real-time**.
* **Key Solution**: **Geo-indexing (GeoHash, R-Tree)** + **dynamic pricing (surge)** + **Pub/Sub updates**.

---

### 12. **Stock Trading (Zerodha, Groww)**

* **Core Problem**: **Low latency order matching + consistency**.
* **Key Solution**: **In-memory order books**, **pessimistic locking** for matching engine, strong consistency over availability.

---

### 13. **Social Media (Facebook, Instagram)**

* **Core Problem**: Efficient **news feed generation** (millions of updates).
* **Key Solution**: **Fan-out on write vs fan-out on read**; caching (Redis, Memcached); ranking via ML.

---

# ✅ Quick “Interview Recall Formula”

When asked a system design problem → answer in this format:

* “The **core challenge** here is *X*. We solve it using *Y*.”
  Example:

> “In a ticket booking system, the core challenge is avoiding double booking of seats under concurrency. We solve it using DB locking (pessimistic/optimistic) or distributed locks like Redis with TTL.”

---

Would you like me to expand this cheat sheet with **1–2 common trade-offs** per system (like fan-out on write vs read in social media, strong vs eventual consistency in bookings)? That way you’ll have both the **main issue + interview-worthy follow-ups**.
