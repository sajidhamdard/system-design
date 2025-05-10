## **What is Caching?**

> **Caching = Storing frequently used data in fast storage (RAM, etc.)**
> → So that **future requests** can be served faster, without recomputing or re-fetching from slow source.

---

## **Simple real-life analogy**

🔹 **You Google "Weather Delhi"**
→ Google **caches** result in memory → Next person asking **gets instant answer** (no recompute)

---

## **How caching helps in system design?**

| **Benefit**              | **How it helps**                                             |
| ------------------------ | ------------------------------------------------------------ |
| ⚡ **Speed up responses** | Data served from RAM / nearby cache → ms instead of seconds  |
| 🔥 **Reduce load on DB** | Less hits to DB / backend → saves cost, improves scalability |
| 🌍 **Scale better**      | Allows handling **more users** with same infra               |
| 💸 **Cost savings**      | Less DB queries → saves compute + bandwidth                  |

---

## **Where can we cache? (Types)**

| **Cache type**        | **Example**                       |
| --------------------- | --------------------------------- |
| **Browser cache**     | Images, CSS, JS                   |
| **CDN cache**         | Static files (Cloudflare, Akamai) |
| **Application cache** | In-memory (Redis, Memcached)      |
| **Database cache**    | Query result caching              |

---

## **Best practices of caching** ✅

| **Best practice**                               | **Why?**                                                        |
| ----------------------------------------------- | --------------------------------------------------------------- |
| **Cache only hot data**                         | Caching everything wastes memory                                |
| **Set TTL (expiry)**                            | Prevent stale data                                              |
| **Invalidate/update cache when source changes** | Keep data fresh                                                 |
| **Consider consistency needs**                  | For critical apps, don’t serve outdated data                    |
| **Use cache-aside pattern**                     | Fetch from DB when cache miss, then update cache                |
| **Limit cache size**                            | Avoid memory explosion (use LRU — Least Recently Used eviction) |

---

## **When NOT to use cache unnecessarily** ❌

| **Don’t cache if…**                       | **Why?**                                               |
| ----------------------------------------- | ------------------------------------------------------ |
| Data changes too frequently               | Cache will be invalidated constantly → No benefit      |
| Data is rarely accessed again             | Caching wastes memory                                  |
| You need **very strong consistency**      | Cache might show old data (bad for banking etc.)       |
| Memory/storage cost > performance benefit | For small apps, caching infra cost may not be worth it |

---

## **Quick interview summary (you can say this)**

> **Caching = fast storage for frequent data. Speeds up reads, reduces load, scales system.
> Use wisely → only hot, not too-changing data, with expiry + invalidation. Avoid over-caching or stale data risk.**

---

## **Tiny real-world example**

🔹 **E-commerce site → Product details**
→ Cache **top 100 most viewed products** in Redis (refresh every 10 mins)

✅ Faster load
✅ Less DB hit
✅ Good trade-off (products don’t change every second)

---

# **Common caching patterns** 👇


## **1️⃣ Cache-aside (Lazy loading)**

**Most common & easiest pattern**

### How it works:

* App **checks cache first**
* If cache **miss** → fetch from DB → **update cache**
* Next request hits cache ✅

| **Step** | **Action**                    |
| -------- | ----------------------------- |
| 1        | Check cache for `product:123` |
| 2        | Not found → Fetch from DB     |
| 3        | Save result to cache          |
| 4        | Return result to user         |

### 📌 **Example (E-commerce)**

```java
// Pseudo code
if (cache.has(productId)) return cache.get(productId);
else {
   product = db.get(productId);
   cache.set(productId, product);
   return product;
}
```

✅ Simple
✅ Cache only when needed
❌ First user waits (cold start)

---

## **2️⃣ Write-through**

### How it works:

* **Whenever app writes to DB**, it **also updates cache immediately**
  → Cache always has fresh data

| **Step** | **Action**                    |
| -------- | ----------------------------- |
| 1        | Save product to DB            |
| 2        | Immediately save to cache too |

### 📌 **Example (User profile update)**

```java
db.save(profile);
cache.set(userId, profile);
```

✅ Cache always fresh
❌ Writes are slower (2 writes: DB + cache)

---

## **3️⃣ Write-back (Write-behind)**

### How it works:

* **Write to cache first**
* Cache **writes back to DB later (async/batch)**

| **Step** | **Action**                     |
| -------- | ------------------------------ |
| 1        | Save to cache                  |
| 2        | Cache queues/batches DB writes |

### 📌 **Example (Analytics counters)**

* Like count, view count → fast writes to cache
* Cache syncs back to DB every 5 mins

✅ Very fast writes
❌ Risk of data loss if cache crashes before sync

---

## **4️⃣ Read-through**

### How it works:

* **App never talks to DB directly**
* App always asks cache → cache fetches DB on miss

| **Step** | **Action**                        |
| -------- | --------------------------------- |
| 1        | App asks cache                    |
| 2        | Cache checks + fetches DB on miss |

### 📌 **Example (Transparent caching)**

* Some cache libraries like **Ehcache**
  → You configure once → App always calls cache

✅ Simplifies code
❌ More complex cache config

---

## **Quick comparison table**

| **Pattern**   | **When to use?**            | **Pro**       | **Con**           |
| ------------- | --------------------------- | ------------- | ----------------- |
| Cache-aside   | Common fetch-heavy apps     | Simple        | First access slow |
| Write-through | Data needs to be fresh      | Always synced | Slower writes     |
| Write-back    | High write apps (analytics) | Fast writes   | Risky (data loss) |
| Read-through  | Transparent cache mgmt      | Simple usage  | Complex setup     |

---

## **In short (interview ready)**

> **Cache-aside** = fetch + cache on miss (default)
> **Write-through** = write DB + cache together (freshness)
> **Write-back** = write cache first → DB later (fast write)
> **Read-through** = app only talks to cache (transparent)

---


