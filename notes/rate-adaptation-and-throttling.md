# Rate Adaptation & Throttling

## Overview
Rate adaptation and throttling are essential techniques for maintaining system stability and consistent user experience in **real-time**, **networked**, or **high-traffic** environments.  
They dynamically control the flow of data — increasing throughput when possible, and reducing it when network or system constraints demand it.

---

## 1. What Is Rate Adaptation?

### Definition
**Rate adaptation** is the process of dynamically adjusting the bitrate or data rate of a stream or service based on real-time feedback such as:
- Available bandwidth  
- Network congestion  
- CPU load or buffer occupancy  
- Packet loss and latency  

### Goal
Maintain the **best possible quality** while avoiding:
- Buffer underruns (starvation)  
- Congestion collapse  
- Unnecessary retransmissions  

---

## 2. Adaptive Bitrate (ABR) in Streaming

### Concept
Adaptive Bitrate (ABR) streaming automatically adjusts the **quality** (bitrate, resolution, frame rate) of video/audio streams based on current network conditions.

### How It Works
1. The client measures network throughput and buffer health.
2. Based on these metrics, it selects the best bitrate variant (e.g., 240p, 480p, 1080p).
3. The player continuously monitors and adapts during playback.

### Protocols Supporting ABR
| Protocol | Description |
|-----------|-------------|
| **HLS (HTTP Live Streaming)** | Uses multiple playlists for different bitrates. |
| **DASH (Dynamic Adaptive Streaming over HTTP)** | Uses Media Presentation Description (MPD) for adaptive playback. |
| **WebRTC** | Adapts bitrate dynamically using congestion control feedback (RTCP). |

### Example – HLS Bitrate Ladder
| Quality | Resolution | Bitrate |
|----------|-------------|----------|
| Low | 240p | 400 kbps |
| Medium | 480p | 800 kbps |
| High | 720p | 2 Mbps |
| Ultra | 1080p | 4 Mbps |

---

## 3. Adaptive Bitrate in WebRTC

WebRTC includes built-in **congestion control algorithms** that automatically adapt bitrate and frame rate.

### Mechanism
- **Sender** monitors network metrics (RTT, loss rate, bandwidth estimation).
- **Receiver** provides feedback via **RTCP reports**.
- **Encoder** adjusts output quality accordingly.

### Key APIs
```javascript
const sender = peerConnection.getSenders()[0];
const parameters = sender.getParameters();

// Dynamically adjust bitrate
parameters.encodings[0].maxBitrate = 800_000; // 800 kbps
await sender.setParameters(parameters);
````

### Algorithms

| Algorithm                           | Description                                          |
| ----------------------------------- | ---------------------------------------------------- |
| **Google Congestion Control (GCC)** | Used in Chrome/Android WebRTC implementations.       |
| **Transport-CC**                    | Provides feedback based on per-packet arrival times. |
| **TFRC / BBR**                      | Model-based algorithms for smoother rate control.    |

---

## 4. Throttling

### Definition

**Throttling** limits the rate of requests or data flow to protect systems from overload and ensure fair usage among clients.

### Common Use Cases

* API rate limiting
* Message queues (e.g., Kafka, RabbitMQ)
* Streaming ingestion endpoints
* WebSocket or WebRTC data channels

### Techniques

| Technique                | Description                                                  |
| ------------------------ | ------------------------------------------------------------ |
| **Token Bucket**         | Allows bursts of requests up to a limit, refilled over time. |
| **Leaky Bucket**         | Enforces a constant outflow rate, smoothing traffic.         |
| **Fixed Window Counter** | Counts requests in a fixed time window.                      |
| **Sliding Window Log**   | Provides more accurate rate limiting by tracking timestamps. |

---

## 5. Rate Adaptation vs Throttling

| Feature       | Rate Adaptation                       | Throttling                            |
| ------------- | ------------------------------------- | ------------------------------------- |
| **Goal**      | Optimize quality/performance          | Prevent overload or abuse             |
| **Driven By** | Network & system feedback             | Policy or quota enforcement           |
| **Scope**     | Client-side (adaptive)                | Server-side (restrictive)             |
| **Examples**  | ABR streaming, WebRTC bitrate control | API rate limiting, message throttling |

---

## 6. Feedback Mechanisms

### A. Network Metrics

* Round Trip Time (RTT)
* Packet loss %
* Jitter and delay variation
* Bandwidth estimation

### B. Application Metrics

* Queue length
* Buffer occupancy
* Frame drops or rebuffer events

### C. Feedback Loop (Control Theory)

Rate adaptation systems often use a **closed-loop control** model:

```
[Monitor Metrics] → [Compute Adjustment] → [Apply Rate Change] → [Observe Results]
```

---

## 7. Example Scenarios

### A. Streaming Video (ABR)

* Detects low bandwidth → switches from 1080p → 480p.
* Buffer recovers → switches back up to higher bitrate.

### B. API Rate Limiting

```java
// Example: Token bucket rate limiter (Java)
RateLimiter limiter = RateLimiter.create(100); // 100 requests per second

void processRequest() {
    limiter.acquire(); // Blocks if rate exceeded
    handleRequest();
}
```

### C. WebRTC Data Channel

```javascript
if (dataChannel.bufferedAmount > 256 * 1024) {
  console.log("Too much queued data, throttling sender...");
  await new Promise(r => setTimeout(r, 100));
}
```

---

## 8. Design Patterns & Best Practices

| Pattern                        | Description                                              |
| ------------------------------ | -------------------------------------------------------- |
| **Feedback-driven Adaptation** | Continuously measure and adjust bitrate or request rate. |
| **Graceful Degradation**       | Reduce quality instead of dropping connections.          |
| **Priority Queuing**           | Prioritize critical data (audio before video).           |
| **Exponential Backoff**        | Gradually retry after throttling to avoid spikes.        |
| **Client-side Adaptation**     | Let clients detect congestion and self-adjust.           |

---

## 9. Monitoring & Metrics

| Metric                               | Description                              |
| ------------------------------------ | ---------------------------------------- |
| **Throughput**                       | Actual data rate achieved.               |
| **Bitrate Switch Count**             | How often quality changes.               |
| **Dropped Frames / Rebuffer Events** | Indicates poor adaptation.               |
| **RTT / Packet Loss**                | Core congestion indicators.              |
| **Requests Throttled**               | Monitors effectiveness of rate limiting. |

### Tools

* **Grafana / Prometheus** – Monitor bitrate, latency, drops.
* **WebRTC getStats() API** – Inspect live network metrics.
* **CDN Analytics** – Track adaptive bitrate switches.
* **API Gateway Logs** – View rate limit hits and throttled requests.

---

## 10. Summary

| Problem                    | Technique                       |
| -------------------------- | ------------------------------- |
| Unstable network bandwidth | Adaptive bitrate (ABR)          |
| Client overload            | Backpressure + throttling       |
| API abuse                  | Token bucket / rate limiting    |
| Quality fluctuation        | Feedback-based adaptation       |
| Excessive buffering        | Downscale bitrate or frame rate |

---

## References

* [RFC 8835 – WebRTC Video Bandwidth Control](https://datatracker.ietf.org/doc/html/rfc8835)
* [Google Congestion Control for RTC](https://webrtc.org/)
* [AWS API Gateway Throttling & Quotas](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-request-throttling.html)
* [Adaptive Bitrate Streaming (HLS/DASH) – Akamai Blog](https://www.akamai.com/)
* [Leaky Bucket vs Token Bucket Explained – Cloudflare Blog](https://blog.cloudflare.com/)

```
