## 🔁 **Load Balancer**

### 📌 Purpose:

Ensures **performance, availability, fault tolerance, and scalability** by distributing traffic across servers.

### 🛠 Examples:

* AWS ELB
* Google Cloud Load Balancing
* HAProxy (Layer 4/7)

### ⭐ Key Features:

* **Traffic Distribution**:

  * Round Robin
  * Least Connections
  * Weighted Distribution

* **Health Checks**: Detects and removes unhealthy servers

* **Session Persistence (Sticky Sessions)**: IP-based or Cookie-based

* **SSL Termination**: Handles HTTPS at entry point

* **High Availability & Failover**

---

### 🧱 Types:

1. **Layer 4 Load Balancer** (Transport Layer)

   * Uses **IP addresses**, **TCP/UDP ports**
   * Fast, low-level routing

2. **Layer 7 Load Balancer** (Application Layer)

   * Advanced routing using:

     * HTTP Methods
     * URLs, Query Strings
     * Headers, Cookies
     * Application logic (e.g., `/api`, `/images`)

---

## 🔄 **Reverse Proxy**

### 📌 Features:

* **Security & Abstraction**: Hides backend servers (IP, port)
* **Centralized SSL Termination**
* **Caching**: Static & dynamic content
* **Compression**: Improves performance
* **Load Balancing Capabilities**
* **URL Rewriting & Routing**

### ✅ Use Case:

Sits in front of backend servers and forwards requests.

---

### 🧠 Difference Between Reverse Proxy & Load Balancer:

* **Reverse Proxy** = Receptionist: receives requests and passes them inside
* **Load Balancer** = Smart receptionist: chooses the best backend to avoid overload

> ✅ A **load balancer is a specialized type of reverse proxy**

---

## 🌐 **Nginx**

### 📌 Type:

Multi-purpose **web server** and **reverse proxy**

### 🔧 Can Do:

* Serve static files (HTML, CSS, JS, images)
* Reverse proxy to backend servers
* Load balancing (basic)
* SSL termination
* HTTP caching & compression

---

## ⚡ **HAProxy**

### 📌 Type:

**Specialized load balancer** for high-performance use

### 🔧 Can Do:

* Load balancing (L4 + L7)
* Handle **millions of requests/sec**
* Server health checks
* SSL termination (with config)
* Advanced TCP/HTTP routing

---

## 🆚 Nginx vs HAProxy

| Use Case                            | Best Tool |
| ----------------------------------- | --------- |
| Static file serving                 | ✅ Nginx   |
| Web server with reverse proxy       | ✅ Nginx   |
| Simple app hosting + load balancing | ✅ Nginx   |
| High-speed traffic distribution     | ✅ HAProxy |
| Advanced TCP load balancing (L4)    | ✅ HAProxy |

| Tool        | Analogy                                                                     |
| ----------- | --------------------------------------------------------------------------- |
| **Nginx**   | Swiss Army knife – does many things (web server, proxy, SSL, load balancer) |
| **HAProxy** | Formula 1 car – does one thing (load balancing) **extremely well**          |

➡️ **Typical Setup**:
**Internet → Nginx (reverse proxy, SSL) → HAProxy (load balancer) → App Servers**

---

## 🚪 **API Gateway**

### 📌 Purpose:

Central entry point in **microservices** architectures.

### 🛠 Examples:

* Amazon API Gateway
* Apigee (Google)
* Kong Gateway
* Netflix Zuul

### ⭐ Features:

* Single Point of Entry
* Request Routing
* Authentication & Authorization
* Rate Limiting & Throttling
* Request/Response Transformation
* API Aggregation
* Caching
* Logging & Monitoring
* Protocol Translation

---

## 🧭 When to Use What?

| Goal                                         | Use             |
| -------------------------------------------- | --------------- |
| **High availability & traffic distribution** | ✅ Load Balancer |
| **Security, caching, flexible routing**      | ✅ Reverse Proxy |
| **Managing APIs/microservices**              | ✅ API Gateway   |

---
