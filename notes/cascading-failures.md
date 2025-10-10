## ⚠️ What is a Cascading Failure?

A **cascading failure** occurs when:

1. One component/service fails.
2. Its failure **propagates** to dependent components.
3. This causes **more failures**, eventually leading to **system-wide outage**.

**Analogy:**

* Think of dominoes — if one falls, it pushes the next, and the entire line collapses.

**Example in Microservices:**

* Service A calls Service B and C.
* Service B is slow or down.
* Service A keeps retrying or queues requests, causing overload on itself and possibly Service C → system-wide degradation.

---

## 🔧 Strategies to Avoid Cascading Failures

### 1. **Circuit Breaker Pattern**

* Stop calling a failing service after detecting repeated failures.
* Prevents **overloading a slow/failing service**.
* Can automatically **retry after a cool-down**.

**Flow:**

```
[Service A] --> [Circuit Breaker] --> [Service B]
If failures > threshold → Circuit opens → calls fail fast
```

**Libraries/Tools:** Netflix Hystrix, Resilience4j

---

### 2. **Bulkhead Isolation**

* Isolate resources (threads, connections) for different services or clients.
* Prevents **failure in one part from consuming all resources**.

**Example:**

* Thread pools per service in a server.
* If Service B overloads its threads, Service C still works fine.

---

### 3. **Timeouts**

* Never wait indefinitely for a response.
* Set **request/connection timeouts**.
* Prevents waiting threads from piling up, which can **block other requests**.

---

### 4. **Retries with Backoff**

* Retry failed requests **carefully**.
* Use **exponential backoff** instead of immediate retries.
* Prevents **retry storms**, which worsen cascading failures.

**Example:**

```
Retry intervals: 100ms → 200ms → 400ms → 800ms
```

---

### 5. **Rate Limiting / Throttling**

* Limit the number of requests a service can handle per second.
* Protects downstream services from **sudden spikes**.
* Can be applied per user, per client, or globally.

---

### 6. **Fail Fast / Graceful Degradation**

* If a service is failing, return a **default response** or an **error immediately**.
* Don’t keep **blocking requests**, allowing the system to stay partially functional.

**Example:**

* If recommendation service fails → show “Top Trending” instead of personalized recommendations.

---

### 7. **Load Shedding**

* Intentionally drop requests when the system is overloaded.
* Protects critical services from collapse.
* Works like **circuit breaker at system level**.

---

### 8. **Monitoring & Alerting**

* Detect slowdowns or error spikes before they cascade.
* Metrics to monitor: latency, error rate, CPU/memory usage.

---

### 9. **Asynchronous Communication**

* Use **queues or events** to decouple services.
* Prevents **blocking synchronous calls**, which propagate failures.

**Example:**

* Order service publishes “Order Placed” to Kafka → Payment service consumes asynchronously.
* If Payment service is down, the order still persists in the queue → system doesn’t collapse.

---

## 🧩 Real-world Example: Netflix

Netflix is famous for **resilient microservices**:

| Pattern         | How Netflix Uses It                              |
| --------------- | ------------------------------------------------ |
| Circuit Breaker | Hystrix prevents retries from cascading failures |
| Bulkheads       | Isolated thread pools for critical services      |
| Timeouts        | Default timeout for every service call           |
| Fail Fast       | Provide fallback responses for failing services  |
| Monitoring      | Chaos Monkey tests system resilience proactively |

---

## 🧭 Key Takeaways

* Cascading failures are **contagious failures** in distributed systems.
* Avoid them with:

  * **Circuit breakers** → fail fast and isolate failing service.
  * **Timeouts & retries with backoff** → prevent request pile-ups.
  * **Bulkheads & rate limiting** → isolate resources and control load.
  * **Asynchronous decoupling** → reduce direct dependencies.
  * **Failures gracefully** → partial functionality instead of full crash.
* Monitoring + proactive testing (Chaos Engineering) is critical.

---
