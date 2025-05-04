Great question — these two terms often get mixed up because they overlap in function, but they serve distinct primary purposes. Let’s break it down clearly:

---

### **Load Balancer**

**Main job:** Distribute incoming traffic across multiple servers (to spread the load).

* **Purpose:** Ensure no single server is overwhelmed, improve scalability, reliability, and fault tolerance.
* **Typical use case:** You have several application servers, and you want requests evenly spread out among them.
* **How it works:** Clients send requests to the load balancer → the load balancer forwards the request to one of several backend servers (based on algorithm: round-robin, least connections, etc.).
* **Example:** An e-commerce site with 5 web servers behind a load balancer to handle high user traffic.

---

### **Reverse Proxy**

**Main job:** Sit in front of one or more servers and handle incoming requests on their behalf (acting as a gatekeeper).

* **Purpose:** Hide backend servers, handle tasks like SSL termination, caching, compression, security (e.g., filtering malicious traffic).
* **Typical use case:** You want a single entry point to handle client requests securely, possibly forwarding to just *one* backend server (but it can be more).
* **How it works:** Clients send requests to the reverse proxy → the reverse proxy forwards the request to the backend server → returns response to the client.
* **Example:** A single web app server with a reverse proxy (like Nginx) in front that handles HTTPS, serves static files, and passes dynamic requests to the backend.

---

### **Key Difference**

* **Load balancer = Focuses on distributing load efficiently.**
* **Reverse proxy = Focuses on mediating and managing requests (can also load balance as one of its features).**

> **Bonus insight:** Modern reverse proxies (like Nginx, HAProxy, Envoy) *can act as load balancers* — so the line is blurrier in practice, but their core *intent* is different.
