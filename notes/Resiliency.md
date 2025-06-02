## ✅ What is **Resiliency** in System Design?

**Resiliency** is a system's **ability to recover quickly from failures** and continue to operate—possibly in a degraded mode—without causing cascading issues or complete downtime.

---

### 💡 Simple Definition:

> **Resiliency = ability to "bounce back" from failures** (like service crashes, network issues, or hardware faults) without user impact or system collapse.

---

## 🔄 Difference Between Resiliency and Reliability

| Term            | Definition                                                                   |
| --------------- | ---------------------------------------------------------------------------- |
| **Reliability** | How often the system works **without failure**. (Focus: uptime)              |
| **Resiliency**  | How well the system **recovers from failure**. (Focus: recovery & isolation) |

---

## 🚨 Why is Resiliency Important?

In **distributed systems**, failures are **inevitable**:

* Network latency/timeouts
* Service crashes
* DB overload
* Dependency downtime

A **resilient system**:

* Keeps functioning even when components fail
* Prevents small failures from escalating
* Improves **user experience** and **system availability**

---

## 🔧 Common Techniques to Build Resilient Systems

| Technique                      | Purpose                                                                         |
| ------------------------------ | ------------------------------------------------------------------------------- |
| **Retries with Backoff**       | Retry failed requests (with delays) to avoid overwhelming services              |
| **Circuit Breaker**            | Stop calling failing services temporarily to prevent cascading failures         |
| **Failover**                   | Automatically switch to a backup node or region                                 |
| **Graceful Degradation**       | Offer partial functionality when dependencies are down (e.g., show cached data) |
| **Timeouts**                   | Avoid hanging on slow/unresponsive services                                     |
| **Bulkheads**                  | Isolate failures in one part of the system so they don’t affect others          |
| **Rate Limiting**              | Prevent overload from excessive traffic                                         |
| **Health Checks & Monitoring** | Detect failures early and trigger mitigation mechanisms                         |
| **Replication & Redundancy**   | Duplicate critical components for high availability                             |

---

## 🏗️ Example Scenario

### Without Resiliency:

* Your service calls an external payment gateway.
* The gateway goes down.
* Your entire checkout system hangs → full outage.

### With Resiliency:

* Your service uses a **timeout + retry + circuit breaker**.
* After a few failures, it **stops retrying**, returns a **friendly error**, and logs the issue.
* System remains responsive; support team gets alerted.

---

## 🧠 Interview-Ready Answer (TL;DR)

> "Resiliency is the system's ability to recover from failures and continue working, ideally without impacting users. In large-scale distributed systems, failures are expected. So we build resiliency using techniques like retries, circuit breakers, timeouts, failovers, and graceful degradation. A resilient system prevents small failures from becoming large outages, improving availability and reliability."
