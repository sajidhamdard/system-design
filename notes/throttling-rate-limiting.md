**“Throttling per user / IP / API key”** refers to a **rate-limiting mechanism** used in APIs and backend systems to **control how many requests a client can make in a given time window**.

---

## 🔹 Why Throttling?

Without throttling:

* A single user or buggy client could **flood your system** with requests.
* This can cause **server overload**, higher costs, or denial of service for others.

With throttling:

* You **protect backend resources**.
* Ensure **fair usage** (no single client hogs all capacity).
* Improve **security** (limit brute-force attacks).

---

## 🔹 Per User / IP / API Key Meaning

1. **Per User** 👤

   * Each authenticated user has a **request quota**.
   * Example: *User A can make 100 requests per minute, User B can make 200 requests per minute.*

2. **Per IP Address** 🌐

   * Requests are limited by **client IP address**.
   * Example: *Only 50 requests per second from a single IP.*
   * Common for unauthenticated APIs.

3. **Per API Key** 🔑

   * If clients use API keys, each key has its **own quota**.
   * Example: *API Key X gets 1000 requests/day, API Key Y gets 500 requests/day.*

---

## 🔹 Example in Practice

Suppose you run an API:

```http
GET /api/v1/products
```

You might enforce throttling like:

* **Per user**: 100 requests/minute.
* **Per IP**: 50 requests/sec.
* **Per API key**: 1000 requests/day.

So:

* If a user exceeds 100 requests/minute → they get `429 Too Many Requests`.
* If one IP floods you → throttling kicks in.
* If an API key crosses daily quota → requests are blocked until reset.

---

## 🔹 How It’s Implemented

Common algorithms for throttling:

* **Token Bucket** – Tokens replenish at fixed rate; each request consumes one.
* **Leaky Bucket** – Requests processed at steady rate; excess requests dropped.
* **Fixed Window** – Count requests in fixed intervals (e.g., per minute).
* **Sliding Window** – More accurate distribution by checking moving time window.

---

👉 In short:
**Throttling per user/IP/API key** means your system enforces request rate limits **individually for each user, IP address, or API key** to ensure fair and safe usage.

---
