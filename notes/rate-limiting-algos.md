### 🔹 1. **Token Bucket**

* **Idea**: A bucket holds tokens.
* **Tokens are added at a fixed rate** (e.g., 5 per second).
* Each request consumes 1 token.
* If bucket is empty → request is denied or queued.
* **Allows bursts** (if tokens accumulate).
* **Use case**: APIs that allow short bursts but enforce average rate.

---

### 🔹 2. **Leaky Bucket**

* **Idea**: Requests enter a bucket (queue).
* Bucket leaks at a constant rate (like water dripping).
* If bucket is full → extra requests are dropped.
* **Smooths out traffic** to a steady rate (no bursts).
* **Use case**: Network traffic shaping, smoothing out bursts.

---

### 🔹 3. **Fixed Window Counter**

* **Idea**: Divide time into fixed windows (e.g., 1 minute).
* Count requests in current window.
* If count > limit → block.
* **Problem**: Can allow bursts at window boundaries.
* **Use case**: Simple API rate limiting.

---

### 🔹 4. **Sliding Window Log**

* **Idea**: Store timestamp of each request.
* On new request, remove timestamps older than window size, then check count.
* Very accurate but **high memory** usage at scale.
* **Use case**: Precise per-user request limits.

---

### 🔹 5. **Sliding Window Counter**

* **Idea**: Combine fixed window + weighting.
* Track counts in current + previous window, apply proportion based on elapsed time.
* Balances accuracy vs. memory.
* **Use case**: APIs needing more fairness than fixed window.

---

✅ **Summary**:

* **Token Bucket** → Allows bursts, average rate controlled.
* **Leaky Bucket** → Smooth constant rate, bursts not allowed.
* **Fixed Window** → Simple but unfair at boundaries.
* **Sliding Window Log** → Accurate, but memory heavy.
* **Sliding Window Counter** → Good tradeoff, used in many API gateways.

---

Here’s a **comparison table** for quick revision of **rate limiting algorithms**:

---

| Algorithm                  | Pros ✅                                                                             | Cons ❌                                                                      | Typical Use Cases 📌                                                              |
| -------------------------- | ---------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| **Token Bucket**           | - Allows bursts<br>- Enforces average rate<br>- Efficient (just counters)          | - Bursts can overwhelm downstream if too big                                | API rate limiting where short bursts are okay (e.g., user actions, microservices) |
| **Leaky Bucket**           | - Smooth, constant output rate<br>- Simple implementation                          | - Doesn’t allow bursts<br>- Can delay legitimate requests                   | Network traffic shaping, preventing sudden spikes                                 |
| **Fixed Window Counter**   | - Very simple<br>- Low memory usage                                                | - Unfair at boundaries (burst at window edges)<br>- Can exceed rate briefly | Basic API rate limiting (small apps, quick checks)                                |
| **Sliding Window Log**     | - Very accurate<br>- No burst unfairness                                           | - High memory (stores all request timestamps)<br>- Slower at scale          | High-security APIs, login attempt throttling                                      |
| **Sliding Window Counter** | - More fair than fixed window<br>- Efficient (just two counters)<br>- Good balance | - Slightly more complex<br>- Approximate, not exact                         | Large-scale API gateways (e.g., NGINX, Envoy, AWS API Gateway)                    |

---

👉 **Shortcut to remember**:

* **Token Bucket** = bursty but fair over time.
* **Leaky Bucket** = smooth constant rate, no bursts.
* **Fixed Window** = simple but unfair.
* **Sliding Window Log** = accurate but costly.
* **Sliding Window Counter** = good tradeoff.

---
