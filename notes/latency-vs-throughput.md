## **1. Latency**

* **Definition**: The **time it takes** for one request to travel through a system and get a response.
* Measured in **milliseconds (ms)** or **seconds**.
* It’s about **speed per request**.

👉 Example:

* You click a link → page loads in **120 ms** → that’s the **latency**.
* In F1 telemetry, latency = how quickly sensor data reaches the pit crew.

---

## **2. Throughput**

* **Definition**: The **amount of work done** (requests/data processed) per unit of time.
* Measured in **requests per second (RPS)**, **transactions/sec**, or **MB/sec**.
* It’s about **capacity**.

👉 Example:

* A web server handles **10,000 requests per second** → that’s its **throughput**.
* In F1 telemetry, throughput = how many data points per second can be handled from all cars.

---

## **3. Latency vs Throughput — Analogy**

Imagine a **highway** 🛣️:

* **Latency** = how fast **one car** goes from point A → point B.
* **Throughput** = how many **cars in total** can pass per minute.

👉 Low latency = one car reaches fast.
👉 High throughput = many cars move through at the same time.

---

## **4. Trade-offs in System Design**

* Sometimes reducing latency reduces throughput, or vice versa.
* Example:

  * Database in **batch mode** → high throughput (process thousands of rows at once), but higher latency (results after a delay).
  * Database in **real-time mode** → low latency (instant results), but lower throughput (one request at a time).

---

## **5. Summary Table**

| Feature     | **Latency**                   | **Throughput**                           |
| ----------- | ----------------------------- | ---------------------------------------- |
| **Meaning** | Time per request (speed)      | Requests processed per second (capacity) |
| **Unit**    | ms, sec                       | req/sec, MB/sec, tx/sec                  |
| **Focus**   | How fast?                     | How many?                                |
| **Analogy** | Speed of one car              | Number of cars per minute                |
| **Ex: In F1 Racing**   | Time for one telemetry update | Total data points per second             |

---

✅ **In short**:

* **Latency = delay per request** (speed).
* **Throughput = total volume of requests processed** (capacity).

---
