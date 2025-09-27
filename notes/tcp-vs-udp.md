# **🌐 TCP vs UDP**

These are the two main **transport layer protocols** used for sending data over networks.

---

## **1️⃣ TCP (Transmission Control Protocol)**

**Definition:**

> TCP is a **connection-oriented protocol** that ensures **reliable, ordered, and error-checked delivery** of data between applications.

**Key Points:**

* **Connection-oriented:** Establishes a **handshake** before data transfer.
* **Reliable:** Guarantees delivery with **acknowledgments**.
* **Ordered:** Data arrives in the **same order** as sent.
* **Error-checked:** Detects lost or corrupted packets and retransmits.
* **Flow control & congestion control:** Prevents network overload.

**Examples:** HTTP, HTTPS, FTP, SSH

**Analogy:**

> Sending a **registered mail** → tracked, delivered in order, and confirmed by signature.

---

## **2️⃣ UDP (User Datagram Protocol)**

**Definition:**

> UDP is a **connectionless protocol** that sends **datagrams without establishing a connection**, and **does not guarantee delivery or order**.

**Key Points:**

* **Connectionless:** No handshake; just sends packets.
* **Unreliable:** No acknowledgment of delivery.
* **No ordering:** Packets may arrive out of order.
* **Low overhead & fast:** Ideal for real-time applications.

**Examples:** DNS queries, VoIP, online gaming, video streaming

**Analogy:**

> Sending a **postcard** → fast, no confirmation, might arrive late or lost.

---

## **3️⃣ Comparison Table**

| Feature     | TCP                         | UDP                      |
| ----------- | --------------------------- | ------------------------ |
| Connection  | Connection-oriented         | Connectionless           |
| Reliability | Reliable (ack + retransmit) | Unreliable               |
| Order       | Guaranteed                  | Not guaranteed           |
| Speed       | Slower due to overhead      | Faster, minimal overhead |
| Use Cases   | Web, File Transfer, Email   | Streaming, Gaming, DNS   |
| Overhead    | High                        | Low                      |

---

## **4️⃣ When to Use Which**

* **TCP:** Use when **data integrity and order matter**. Example: transferring a file.
* **UDP:** Use when **speed and low latency matter** and some data loss is acceptable. Example: live video streaming.

---

💡 **Key takeaway:**

* **TCP = reliable, ordered, slower, connection-oriented**
* **UDP = fast, unreliable, connectionless**

---
