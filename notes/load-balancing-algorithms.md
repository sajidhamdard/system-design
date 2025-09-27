# **⚖️ Load Balancing Algorithms**

**Definition:**

> Load balancing is the process of **distributing incoming network or application traffic across multiple servers** to ensure **high availability, reliability, and performance**.

The **algorithm** defines how the traffic is distributed.

---

## **1️⃣ Common Load Balancing Algorithms**

### **a) Round Robin**

* **How it works:** Requests are distributed **sequentially** across servers.
* **Pros:** Simple, easy to implement.
* **Cons:** Doesn’t consider server load or capacity.

**Example:** 3 servers → requests go to S1 → S2 → S3 → S1 → S2 → S3…

---

### **b) Weighted Round Robin**

* **How it works:** Servers are assigned **weights** based on capacity; more powerful servers get more requests.
* **Pros:** Handles heterogeneous servers better.
* **Cons:** Still doesn’t account for dynamic load in real-time.

---

### **c) Least Connections**

* **How it works:** Sends request to the server with **fewest active connections**.
* **Pros:** Adapts to server load, good for long-running sessions.
* **Cons:** Slightly more complex to maintain connection counts.

---

### **d) Least Response Time**

* **How it works:** Directs traffic to the server with **lowest response time** and **available capacity**.
* **Pros:** Optimizes for speed and responsiveness.
* **Cons:** Needs continuous monitoring of server response times.

---

### **e) IP Hash**

* **How it works:** Uses **hash of client IP** to consistently route requests to the same server.
* **Pros:** Useful for **session persistence**.
* **Cons:** Uneven distribution if many users share same IP block.

---

### **f) Random**

* **How it works:** Requests are sent to a **random server**.
* **Pros:** Simple, distributes load statistically evenly over time.
* **Cons:** May not account for server capacity; less predictable.

---

### **g) Weighted Least Connections**

* **How it works:** Combines **weights + active connections**.
* **Pros:** Good for heterogeneous servers and dynamic load balancing.
* **Cons:** More complex to implement.

---

## **2️⃣ Use Cases**

| Algorithm            | Best For                               |
| -------------------- | -------------------------------------- |
| Round Robin          | Small, similar servers                 |
| Weighted Round Robin | Mixed server capacities                |
| Least Connections    | Long-running sessions (DB connections) |
| Least Response Time  | Optimize latency & performance         |
| IP Hash              | Session stickiness / caching           |
| Random               | Low-complexity or small setups         |

---

## **3️⃣ Analogy**

* **Round Robin:** Like **taking turns in a queue**.
* **Least Connections:** Like **sending customers to the cashier with the shortest line**.
* **IP Hash:** Like **always seating the same guest at the same table** in a restaurant for familiarity.

---
