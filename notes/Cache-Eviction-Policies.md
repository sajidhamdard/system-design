## **What is cache eviction?**

> **Eviction** = Removing items from cache when cache is full (to make space for new data)

🗂️ **Cache = Limited memory**
→ You can’t store everything forever → Must evict less useful data

---

## **Common Cache Eviction Policies** (with small real-world analogy)

| **Policy**                      | **Meaning**                                   | **Real-life analogy**                                     |
| ------------------------------- | --------------------------------------------- | --------------------------------------------------------- |
| **LRU (Least Recently Used)**   | Remove the item not accessed for longest time | Bookshelf - remove the book you haven’t touched in months |
| **LFU (Least Frequently Used)** | Remove item with **least # of accesses**      | TV shows - delete show you watched only once              |
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
> **LRU** (most used), **LFU**, **FIFO**, **TTL** -
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

Perfect - let’s make a **clean table** of:
🔹 **Policy → Use case → Why**
So in real system design interviews, you know **exactly where to apply each** 👇

---

## **Cache eviction policies - where to apply in real systems**

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

> ✨ *“For a web app with heavy reads (e.g. e-commerce product pages), I’d use **LRU cache** in Redis to serve hot products fast - as users mostly revisit recent products.”*

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


## **"Under the hood, how does a cache implement LRU/LFU etc.?"**

---

## 🚀 **First - High level**

> **Eviction policy** (LRU, LFU etc.) = **Strategy**
>
> **Algorithm + Data structures** = **How to efficiently implement it**

---

## **LRU (Least Recently Used)** - Common algorithm

### 🎯 **Goal**: Quickly find and evict least recently accessed item

### ⚙️ **Typical algorithm**:

➡️ Use **HashMap + Doubly Linked List**

| Data structure           | Purpose                 |
| ------------------------ | ----------------------- |
| **HashMap** (key → node) | Fast O(1) lookup        |
| **Doubly linked list**   | Maintains recency order |

🛠️ **How it works**

* On **get() / put()** → move item to **head (most recent)**
* Evict from **tail (least recent)**

### **Time complexity**

✅ get() → O(1)
✅ put() → O(1)

### 📌 **Example** (Java-ish)

```java
class LRUCache {
  Map<Key, Node> map;
  DoublyLinkedList list;
}
```

---

## **LFU (Least Frequently Used)** - Common algorithm

### 🎯 **Goal**: Evict least frequently accessed item

### ⚙️ **Typical algorithm**:

➡️ Use **HashMap + Frequency List**

| Data structure                           | Purpose            |
| ---------------------------------------- | ------------------ |
| **HashMap (key → node)**                 | O(1) lookup        |
| **FreqMap (freq → linked list of keys)** | Group keys by freq |
| Track **minFreq**                        | Find LFU key fast  |

🛠️ **How it works**

* On get/put → increment freq
* Move node to **next freq list**
* Evict node from **minFreq list** when full

### **Time complexity**

✅ get() → O(1)
✅ put() → O(1)

---

## 🟥 **Redis - What algorithm does Redis use?**

Redis supports **multiple eviction policies** - here’s how **Redis implements them**:

| **Redis Policy**                   | **Redis Algorithm**                                 |
| ---------------------------------- | --------------------------------------------------- |
| **allkeys-lru** / **volatile-lru** | **Approximate LRU** using **LRU clock + sampling**  |
| **allkeys-lfu**                    | **Approximate LFU** with **8-bit counters + decay** |
| **volatile-ttl**                   | Evict keys expiring soonest (based on TTL)          |
| **noeviction**                     | Just error on memory full                           |

---

## 🔍 **Why Redis uses Approximate LRU/LFU (not exact)?**

* **Exact LRU/LFU (O(1))** → more metadata + complex
* Redis uses **simple counters + random sampling** (fast & good enough)

### 📌 **Approx LRU example**

* Each key stores a **last access timestamp (LRU clock)**
* Redis samples **5 random keys**
* Evicts key with **oldest timestamp** among sampled ones

→ **Fast & scalable**, especially for millions of keys

---

## **Redis LFU - How does it work?**

* Each key has **8-bit counter** (max 255)
* On access → increment counter (with probability)
* Counter **decays** over time (so stale keys drop freq)

---

## **In short (interview ready)**

> **Cache design = eviction policy + fast data structure**

* **LRU** → HashMap + Doubly Linked List
* **LFU** → HashMap + Freq Lists + minFreq
* **Redis** uses **Approximate LRU/LFU** via **sampling + counters** (for speed)

---

## **Pro tip (interview)**

> ✨ *“Redis trades perfect LRU/LFU accuracy for speed and simplicity - using sampling and approximate counters.”*
