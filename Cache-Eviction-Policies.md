## **What is cache eviction?**

> **Eviction** = Removing items from cache when cache is full (to make space for new data)

🗂️ **Cache = Limited memory**
→ You can’t store everything forever → Must evict less useful data

---

## **Common Cache Eviction Policies** (with small real-world analogy)

| **Policy**                      | **Meaning**                                   | **Real-life analogy**                                     |
| ------------------------------- | --------------------------------------------- | --------------------------------------------------------- |
| **LRU (Least Recently Used)**   | Remove the item not accessed for longest time | Bookshelf — remove the book you haven’t touched in months |
| **LFU (Least Frequently Used)** | Remove item with **least # of accesses**      | TV shows — delete show you watched only once              |
| **FIFO (First In First Out)**   | Remove **oldest added** item                  | First water bottle you put in fridge gets removed first   |
| **MRU (Most Recently Used)**    | Remove most recently accessed item (rare)     | Remove the book you just read (not common)                |
| **Random**                      | Evict random item                             | Pick any bottle and throw out (used in simple systems)    |
| **TTL (Time To Live)**          | Remove item after fixed time expiry           | Milk carton expires after 3 days                          |

---

## **Quick Summary Table (Pros & Cons)**

| **Policy** | **Good when…**                                         | **Pros**               | **Cons**                       |
| ---------- | ------------------------------------------------------ | ---------------------- | ------------------------------ |
| **LRU**    | Recent items likely reused (web pages)                 | Intuitive, widely used | Slightly more metadata needed  |
| **LFU**    | Items with **high re-use freq** matter (config values) | Captures frequency     | Slow to adapt to recent trends |
| **FIFO**   | Very simple cases                                      | Easy to implement      | Doesn’t consider usage         |
| **MRU**    | Access pattern flips fast (rare)                       | Niche cases            | Rarely useful                  |
| **Random** | Small/simple cache                                     | Ultra fast             | Unpredictable                  |
| **TTL**    | Data expires naturally (weather, prices)               | Auto refresh           | Can expire useful data         |

---

## **Where these are used (Real systems)**

| **System**           | **Policy used**               |
| -------------------- | ----------------------------- |
| **Redis**            | LRU, LFU, TTL (all supported) |
| **CDN (Cloudflare)** | TTL + LRU                     |
| **Browser cache**    | LRU                           |
| **Memcached**        | LRU                           |

---

## **In short (interview answer)**

> **Cache eviction = free up space by removing items**
> Common policies:
> **LRU** (most used), **LFU**, **FIFO**, **TTL** —
> Choose based on access pattern & app needs.

---

## **Tiny real example (Redis)**

```bash
# Set maxmemory & eviction policy (Redis)
CONFIG SET maxmemory 100mb
CONFIG SET maxmemory-policy allkeys-lru
```

→ Redis will evict **least recently used keys** when 100 MB full

---

## **Pro tip for interview**

If you’re unsure, **default safe answer = LRU**
(It balances recency and practical use)

---

Perfect — let’s make a **clean table** of:
🔹 **Policy → Use case → Why**
So in real system design interviews, you know **exactly where to apply each** 👇

---

## **Cache eviction policies — where to apply in real systems**

| **Policy**                            | **Best used in...**                                                                | **Why it works well**                                                      |
| ------------------------------------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| **LRU (Least Recently Used)**         | **Web page caching (CDN, browser)**<br>**API response cache (Redis, Memcached)**   | Users often revisit **recent pages**<br>→ Old pages become less useful     |
| **LFU (Least Frequently Used)**       | **Config values cache**<br>**Dictionary lookup (common terms)**                    | Some data is **repeatedly used a lot**<br>→ Keep items with high reuse     |
| **FIFO (First In First Out)**         | **Streaming apps (Video chunk buffer)**<br>**Batch processing queues**             | You naturally want **oldest data out first**<br>→ Process in arrival order |
| **MRU (Most Recently Used)** *(rare)* | **Undo history (Text editor)**<br>**Session cleanup (if user comes back soon)**    | When **recent data is least useful**<br>→ Unusual, niche cases             |
| **Random**                            | **Very small caches (IoT devices)**<br>**Simple embedded systems**                 | Hardware/resource constrained<br>→ Simpler, faster eviction logic          |
| **TTL (Time To Live)**                | **Weather data API**<br>**Stock prices cache**<br>**Product catalog (E-commerce)** | Data **naturally expires/changes**<br>→ Expiry ensures freshness           |

---

## **Interview-ready crisp examples** (You can say like this)

> ✨ *“For a web app with heavy reads (e.g. e-commerce product pages), I’d use **LRU cache** in Redis to serve hot products fast — as users mostly revisit recent products.”*

> ✨ *“For config flags or common lookup tables, **LFU** makes sense to keep frequently accessed keys longer.”*

> ✨ *“If caching weather or stock data, I’d apply **TTL** of 10 mins so users get fresh info automatically.”*

---

## **If you want an easy rule of thumb 🥳**

| **Pattern**             | **Policy** |
| ----------------------- | ---------- |
| Recent data reused?     | **LRU**    |
| Frequently reused data? | **LFU**    |
| Data expires naturally? | **TTL**    |
| Stream / Queue?         | **FIFO**   |
| Tiny embedded system?   | **Random** |

---

**Quick tip (interview)**
If unsure → **LRU is almost always a safe answer for general purpose caches**
