# **🌐 Layer 4 vs Layer 7 Load Balancing / Networking**

These terms come from the **OSI model**. Layer 4 is **Transport**, Layer 7 is **Application**.

---

## **1️⃣ Layer 4 (Transport Layer)**

**Definition:**

> Layer 4 load balancers operate at the **Transport Layer** of the OSI model, dealing with **TCP/UDP connections**.

**Key Points:**

* Uses **IP address and port** to route traffic.
* **Does not inspect application data**.
* Very **fast and lightweight**.
* Works for **any TCP/UDP protocol**.

**Example:**

* TCP load balancing for a **web server cluster**.
* Forward request to server based on **source IP, destination IP, or port**.

**Analogy:**

* Like a **traffic cop at the gate** checking **which lane cars come from**, but not looking inside the car.

---

## **2️⃣ Layer 7 (Application Layer)**

**Definition:**

> Layer 7 load balancers operate at the **Application Layer**, inspecting **HTTP/HTTPS requests** and **content** to make routing decisions.

**Key Points:**

* Can route traffic based on **URL, headers, cookies, or request body**.
* Supports **advanced routing features** like host-based, path-based, or A/B testing.
* Slightly **slower** than L4 because it inspects application data.

**Example:**

* Route `/api/*` requests to microservice A and `/web/*` to microservice B.
* Inspect cookies to send returning users to a specific server.

**Analogy:**

* Like a **receptionist checking ID, purpose, and preference** before directing visitors to the correct office.

---

## **3️⃣ Comparison Table**

| Feature          | Layer 4 (Transport)          | Layer 7 (Application)           |
| ---------------- | ---------------------------- | ------------------------------- |
| OSI Layer        | 4 (Transport)                | 7 (Application)                 |
| Routing Decision | IP, TCP/UDP port             | URL, headers, cookies, content  |
| Speed            | Fast, low latency            | Slower, inspects full request   |
| Flexibility      | Basic load balancing         | Advanced, content-based routing |
| Protocol Support | TCP, UDP                     | HTTP, HTTPS, WebSocket          |
| Example Tools    | IP Hash LB, Nginx (TCP mode) | Nginx (HTTP mode), HAProxy HTTP |

---

💡 **Key takeaway:**

* **L4 = faster, simple routing by IP/port**
* **L7 = smarter, content-aware routing**

---
