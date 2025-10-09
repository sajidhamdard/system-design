## 🧠 **What is Deployment Strategy?**

When you release a new version of your application, you need to **deploy it safely without downtime or errors**.
Two popular strategies are:

1. **Blue/Green Deployment**
2. **Canary Deployment**

Both aim to **reduce risk during releases**.

---

## 1️⃣ **Blue/Green Deployment**

### 🔹 Concept

* You have **two identical environments**:

  * **Blue:** Current live version
  * **Green:** New version to deploy
* Switch traffic from **Blue → Green** once Green is ready
* Rollback is **instant** if Green fails

### 🔹 Flow

1. Deploy new version to **Green** environment
2. Run smoke tests, health checks
3. Switch router/load balancer from **Blue → Green**
4. Blue becomes idle (can be kept as backup)

### 🔹 Pros & Cons

| Pros                   | Cons                                     |
| ---------------------- | ---------------------------------------- |
| Instant rollback       | Requires **double infrastructure**       |
| Minimal downtime       | Costly for large systems                 |
| Simple traffic routing | Must sync DB carefully if schema changes |

---

## 2️⃣ **Canary Deployment**

### 🔹 Concept

* Gradually roll out the new version to a **small subset of users**
* Monitor metrics (errors, latency, performance)
* If everything is good → increase rollout
* If issues → rollback quickly

### 🔹 Flow

1. Deploy **new version to 5% of servers** or users
2. Monitor errors, logs, KPIs
3. Increase rollout to 25%, then 50%, then 100%
4. Full deployment if stable

### 🔹 Pros & Cons

| Pros                          | Cons                               |
| ----------------------------- | ---------------------------------- |
| Minimal risk                  | Slower rollout                     |
| Can detect issues early       | More complex routing / monitoring  |
| Works well with microservices | Requires good metrics & automation |

---

## 🔄 **Comparison**

| Feature        | Blue/Green                    | Canary                           |
| -------------- | ----------------------------- | -------------------------------- |
| Infrastructure | 2 environments                | Usually same infra               |
| Rollback       | Instant                       | Gradual rollback needed          |
| Risk           | Low (instant switch)          | Very low (small subset first)    |
| Cost           | High (duplicate infra)        | Low-medium                       |
| Use Case       | Large systems, DB-safe deploy | Microservices, frequent releases |

---

## 🧩 **Analogy**

* **Blue/Green:** Swap entire bridges — drive all cars on new bridge after testing 🚧
* **Canary:** Send **few cars first** on new bridge, watch carefully before everyone uses it 🐤

---

## ⚡ **Key Considerations**

1. **Database Changes**

   * Blue/Green: Must handle migrations carefully
   * Canary: Prefer **backward-compatible DB changes**

2. **Monitoring & Metrics**

   * Canary deployments **require real-time monitoring** (errors, latency, logs)

3. **Automation**

   * Use **CI/CD pipelines** (Jenkins, GitHub Actions, ArgoCD) for safe rollouts

---

### ✅ Summary

| Strategy   | Risk     | Speed   | Cost   | Rollback |
| ---------- | -------- | ------- | ------ | -------- |
| Blue/Green | Low      | Fast    | High   | Instant  |
| Canary     | Very Low | Gradual | Medium | Gradual  |

---
