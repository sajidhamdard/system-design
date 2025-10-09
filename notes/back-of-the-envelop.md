In **system design**, the term **“back-of-the-envelope”** refers to a **quick, rough estimation** or calculation done **informally**, usually **without detailed tools or exact data**, to see if an idea or approach is feasible.

It’s called that way because people often literally **scribble on a napkin or small piece of paper** — you don’t need a full spreadsheet, simulator, or diagram to get the gist.

---

## 🔹 Key Points

1. **Purpose**:

   * Quickly **validate assumptions**
   * Check if a system can **handle expected load**
   * Estimate **rough costs** or resources needed

2. **Not Precise**:

   * These are **approximations**, not exact numbers
   * They help **identify bottlenecks or feasibility** before diving deep

3. **Common Use Cases in System Design Interviews**:

   * Estimating **traffic/load**: How many requests per second will the system handle?
   * Estimating **storage**: How much disk space is needed for user data?
   * Estimating **bandwidth**: How much network capacity is required?
   * Estimating **compute resources**: How many servers or CPUs do you need?

---

## 🔹 Example

Suppose you are designing a **URL shortening service**:

* Expected: 1 billion URLs in 10 years
* Average URL length: 100 bytes
* Extra metadata: 50 bytes

**Rough calculation (back-of-the-envelope):**

```
Total storage = 1B * (100 + 50) bytes
              = 150B bytes
              ≈ 150 GB
```

✅ Conclusion: Storage requirement is manageable.
❌ No need to calculate exact overheads or indexing yet — this is just a **rough check**.

---

### 🔹 Why It’s Useful in Interviews

* Shows you can **think about scalability** and **resource requirements quickly**
* Helps **guide the design**: e.g., whether you need sharding, caching, or distributed databases
* Demonstrates **practical engineering intuition**

---

### 🔹 Analogy

It’s like **estimating if a car can reach a destination without calculating exact fuel consumption** — you just check if the trip is roughly possible.

---
