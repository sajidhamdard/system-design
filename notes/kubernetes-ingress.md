# **🌐 Kubernetes Ingress**

**Definition:**

> **Ingress** is a Kubernetes resource that manages **external access to services** in a cluster, typically HTTP/HTTPS. It acts as a **smart entry point** or **reverse proxy** for routing traffic to different services based on **hostnames, paths, or rules**.

* Ingress **does not provide the actual traffic handling** — it requires an **Ingress Controller** like **NGINX, Traefik, or HAProxy**.

---

## **1️⃣ Key Components**

| Component          | Description                                                      |
| ------------------ | ---------------------------------------------------------------- |
| Ingress Resource   | Defines **rules and routing paths** for incoming traffic         |
| Ingress Controller | Implements the **Ingress rules**, actually handling HTTP traffic |
| Backend Service    | Kubernetes service that receives the traffic after routing       |

---

## **2️⃣ How It Works**

**Flow (Text Diagram):**

```
Client Request
      |
      v
Ingress Controller (NGINX, Traefik)
      |
      v
Ingress Resource → Route based on host/path rules
      |
      v
Backend Services (pods)
```

**Example Rule:**

* `example.com/api → service-a`
* `example.com/web → service-b`

---

## **3️⃣ Benefits**

* **Single entry point** for multiple services → simplifies external access
* **Path-based or host-based routing** → flexible routing rules
* **TLS termination** → handle HTTPS centrally
* **Load balancing** → distribute traffic to backend pods

---

## **4️⃣ Use Cases**

* Expose multiple microservices under **one domain**.
* Centralized **TLS/SSL termination**.
* Route traffic based on **URL paths or hostnames**.
* Implement **rate limiting, authentication, or rewrites** (with advanced controllers).

---

## **5️⃣ Analogy**

> Imagine a **receptionist at a large office building**:
>
> * Visitors arrive at a **single entrance** (Ingress Controller)
> * Receptionist checks **which office they need to visit** (Ingress rules: host/path)
> * Directs them to the **correct office** (Backend service/pods)

---

💡 **Key takeaway:**

* **Ingress = entry point + routing rules**
* **Ingress Controller = actual traffic manager**
* **Backend Services = applications handling the requests**

---
