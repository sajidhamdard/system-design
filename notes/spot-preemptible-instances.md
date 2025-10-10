## ⚙️ What Are Spot / Preemptible Instances?

**Definition:**

> Spot (AWS) or Preemptible (GCP) instances are **temporary, low-cost virtual machines** offered by cloud providers.
> They are **unused compute capacity** that providers sell at a **discount** (often 70–90% cheaper than regular instances).

**Key Characteristic:**

* **Can be terminated (preempted) at any time** if the cloud provider needs the resources back.

---

## 🔄 How They Work

1. **Provider has spare capacity** → offers instances at low cost
2. **User requests a spot/preemptible instance** → gets it **while available**
3. **Provider can reclaim the instance** → gives **short notice** before termination (AWS: 2 min, GCP: 30 sec)

---

## ⚡ Pros

1. **Cost Savings**

   * Much cheaper than on-demand instances

2. **Scalability**

   * Can spin up **many instances** at low cost for batch jobs

3. **Flexibility**

   * Ideal for **stateless, fault-tolerant workloads**

---

## ⚠️ Cons

1. **Not guaranteed to run**

   * Can be terminated anytime → not suitable for critical workloads

2. **Requires fault-tolerant design**

   * Must handle instance loss gracefully (retry, checkpointing)

3. **Limited maximum runtime** (GCP preemptible: 24 hours max)

---

## 🛠️ Common Use Cases

| Use Case                      | Reason for Using Spot/Preemptible                    |
| ----------------------------- | ---------------------------------------------------- |
| Batch Processing              | Can restart failed tasks without affecting cost      |
| Big Data / Analytics          | Scale clusters cheaply (Hadoop, Spark)               |
| CI/CD Pipelines               | Non-critical build jobs can tolerate interruption    |
| Rendering / Video Transcoding | Tasks are stateless → can resume if instance is lost |
| Fault-Tolerant Microservices  | With autoscaling and redundancy                      |

---

## 🔧 Best Practices

1. **Checkpoint / Save State Frequently**

   * So work can resume on another instance after termination

2. **Use Auto Scaling Groups / Managed Instance Groups**

   * Automatically replace terminated instances

3. **Mix with On-Demand / Reserved Instances**

   * Critical services on on-demand, batch jobs on spot → cost efficiency + reliability

4. **Monitor Termination Notices**

   * AWS gives 2 min warning → gracefully stop or save progress

---

## 🧩 Analogy

* Spot / Preemptible instance = **hotel room leftover inventory**

  * Very cheap, but hotel can reclaim it anytime if needed
* Regular instance = **reserved hotel room**

  * Always available, costs more

---

✅ **Key Takeaways**

1. Spot / Preemptible instances are **cheap, temporary cloud VMs**
2. **Preemptible / spot = “use if available”** → not reliable for critical workloads
3. **Best for batch, stateless, or fault-tolerant workloads**
4. Must design systems to **handle interruptions gracefully**

---
