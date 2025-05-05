## **If a Pod (service instance) goes down — what does Kubernetes do?**

1. **Kubernetes notices the failure**
   → kubelet (on node) + Controller manager + ReplicaSet continuously monitor Pod health

2. **Kubernetes kills the dead Pod completely** *(terminates it)*

3. **Kubernetes creates a brand-new Pod instance**
   → **With a new Pod UID and possibly a new IP address**
   (It is NOT restarting the old Pod process. It is **creating a fresh Pod**)

4. **Kubernetes ReplicaSet ensures “desired replicas” count**
   Example:
   You said:
   `"I want 3 replicas"`
   → If 1 Pod crashes → ReplicaSet sees there are only 2 Pods running → **immediately creates a 3rd Pod**

5. **The new Pod automatically registers in Service Endpoints**
   → The Kubernetes **Service** will automatically route traffic to healthy Pods only
   (dead Pods are removed from Endpoints list)

---

## **Summary**

| Action                | What happens?                                 |
| --------------------- | --------------------------------------------- |
| Pod crashes           | Kubernetes deletes it                         |
| New Pod?              | Yes — freshly created (NOT restart same Pod)  |
| Same IP?              | Usually NO → new Pod gets a new IP            |
| Traffic affected?     | Minimal → Service routes only to healthy Pods |
| Manual action needed? | NO — Kubernetes auto-recovers                 |

---

## **Clean interview answer**

> *“If a Pod crashes in Kubernetes, it does not restart the old process. Kubernetes ReplicaSet immediately creates a brand-new Pod instance to replace it, ensuring the desired replica count is maintained. The new Pod may have a new IP, but the Kubernetes Service automatically updates its Endpoints list to route traffic only to healthy Pods — providing self-healing and high availability.”*

---

## **Advanced note (optional but gold in interviews)**

You can also configure **liveness probes** and **readiness probes**
→ So that Kubernetes knows **when to restart unhealthy Pods**
and **when to stop sending traffic** to Pods that are not ready

---

## **Bottom line**

> **Kubernetes creates a fresh Pod — NOT restart same Pod process**

---

If you want — I can show you:

* How to configure **liveness probe** (interview ready example)
* Or **what happens if entire node fails** (slightly different)

Want one of these next?


Perfect — this is **core Kubernetes interview stuff**, and if you explain this well, you’ll sound very solid.

Let’s nail it.

---

# **Liveness Probe vs Readiness Probe**

| Probe Type          | What does it check?                            | Action if fails                                              |
| ------------------- | ---------------------------------------------- | ------------------------------------------------------------ |
| **Liveness Probe**  | "Is the application still alive (running)?"    | **Kill + Restart** the Pod                                   |
| **Readiness Probe** | "Is the application ready to receive traffic?" | **Remove Pod from Service endpoints** (Stop sending traffic) |

---

## **Why do we need these probes?**

* Apps sometimes **hang / get stuck** (process is running but not responsive)
* Apps sometimes **boot slowly** (not ready to serve traffic yet after restart)
* Apps may go into **temporary errors** (like DB connection lost)

We need **automated ways** to:

* Restart dead apps (**liveness**)
* Stop sending traffic to unready apps (**readiness**)

---

## **Example to make it clear**

Let’s say you have a **Spring Boot** app:

* It **takes 30 seconds to start up**
* It sometimes **hangs after running 5 hours** (thread deadlock)

**Without probes → Kubernetes thinks Pod is fine as long as process runs**
But in reality, it may be **unresponsive** or **not ready**

---

## **Example config**

```yaml
livenessProbe:
  httpGet:
    path: /health
    port: 8080
  initialDelaySeconds: 60
  periodSeconds: 10

readinessProbe:
  httpGet:
    path: /ready
    port: 8080
  initialDelaySeconds: 30
  periodSeconds: 5
```

---

## **What does this mean?**

* **Liveness Probe**
  → Kubernetes will call `/health` every 10s
  → If `/health` fails (non-200) → **Kill and restart Pod**

* **Readiness Probe**
  → Kubernetes will call `/ready` every 5s
  → If `/ready` fails → **Remove Pod from Service endpoints** (no traffic)
  → When `/ready` passes → **Add Pod back**

---

## **Common use cases**

| Use Case                            | Which probe?  | Why?                                 |
| ----------------------------------- | ------------- | ------------------------------------ |
| App crashes or hangs                | **Liveness**  | Restart automatically                |
| App starts slowly                   | **Readiness** | Don’t send traffic too early         |
| App temporarily unhealthy (DB down) | **Readiness** | Stop traffic temporarily, don’t kill |
| App stuck in infinite loop          | **Liveness**  | Kill and restart                     |

---

## **Clean interview answer**

> *“Liveness probes check if an app is still alive; if it fails, Kubernetes kills and restarts the Pod. Readiness probes check if an app is ready to serve traffic; if it fails, Kubernetes stops routing traffic to that Pod but does not restart it. Liveness ensures self-healing, and readiness ensures smooth traffic handling during startup or transient failures.”*

---

## **Bonus — How are probes implemented?**

You can configure probes in 3 ways:

* **HTTP GET** — hit an endpoint (common for web apps)
* **TCP Socket** — check if a port is open
* **Exec command** — run a command inside container

---

## **Golden rule (to remember easily)**

| Probe         | **LIVE** or **READY**? | **Kill?** or **Remove from traffic?** |
| ------------- | ---------------------- | ------------------------------------- |
| **Liveness**  | “Am I alive?”          | Kill Pod                              |
| **Readiness** | “Am I ready to serve?” | Remove Pod from traffic               |

---

If you want —
I can show a **real Spring Boot health check** config that works well with probes (interview ready)

Want that?


