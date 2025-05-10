# **Fault Tolerance**


## **What is Fault Tolerance?**

> **Fault Tolerance = The ability of a system to keep working even when some parts fail.**

In other words:
👉 Your system does **NOT go down** just because 1 server, 1 database, or 1 component crashes.

---

## **Why is Fault Tolerance important?**

Because **hardware fails, networks fail, software crashes, power cuts happen** — but your users expect the app/website to work anyway.

Examples:

* Your web server dies → Users still expect to access the website
* Your database crashes → App still needs to read/write data

---

## **How do we improve Fault Tolerance?**

Let’s break it **per component** clearly:

| **Component**                          | **Problem if it fails?**                          | **Solution to tolerate the failure?**                                                                                                                          |
| -------------------------------------- | ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Web server**                         | Users can’t access website                        | Deploy **multiple web servers** behind a **Load Balancer**. If 1 dies, LB sends traffic to the others automatically.                                           |
| **Database**                           | App can’t read/write data                         | Use **Primary-Replica setup** (Master-Slave). If primary DB fails, **failover** to replica DB (some DBs like PostgreSQL, MongoDB have auto-failover features). |
| **Application server (backend logic)** | Business logic is unavailable                     | Design app servers to be **stateless** → You can start new app servers easily and balance traffic.                                                             |
| **Region / Data center**               | Entire location goes down (earthquake, power cut) | Deploy in **multiple regions** or **availability zones**. E.g., AWS offers Multi-AZ deployment → if 1 zone fails, traffic shifts to another.                   |
| **Cache server** (like Redis)          | Cache unavailable                                 | Use **replicated caches** or configure **cache warm-up** to restore quickly.                                                                                   |

---

## **Core Tools / Concepts that improve Fault Tolerance**

* **Load Balancer** — Distributes traffic to healthy servers
* **Auto-scaling** — Automatically adds servers if load increases
* **Database replication** — Copies of database (read replicas, failover replicas)
* **Health checks** — Regularly ping services to see if they are alive
* **Failover mechanism** — Automatic switch to backup when primary fails
* **Stateless servers** — Any server can handle any request (no session stickiness)
* **Multi-region deployment** — Your app runs in multiple geographic locations

---

## **A simple example**

You have:

* 1 Load Balancer
* 3 Web Servers (behind LB)
* 1 Primary DB + 1 Replica DB

Scenario:

* Web Server 1 crashes → LB routes users to Web Server 2 and 3 → **No downtime**
* Primary DB crashes → App switches to Replica DB → **No downtime**

\= **Fault tolerant system.**

---

## **Golden sentence (for interviews)**

> "Fault tolerance is about ensuring **redundancy and automatic recovery**, so the system remains operational despite component failures."

---
