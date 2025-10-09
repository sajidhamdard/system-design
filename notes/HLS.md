## **1️⃣ What is HLS?**

**HLS (HTTP Live Streaming)** is a **streaming protocol developed by Apple** for delivering video and audio over the internet.

* Works over **HTTP**
* Supports **adaptive bitrate streaming** (adjusts video quality based on network conditions)
* Widely used in **iOS devices**, web browsers, smart TVs, and streaming platforms

**Goal:** Provide smooth, continuous playback even when the network fluctuates.

---

## **2️⃣ How HLS Works**

HLS works in **3 main steps**:

### **Step 1: Video Preparation (Encoding & Segmentation)**

* Original video is **encoded at multiple bitrates/resolutions** (e.g., 240p, 480p, 720p, 1080p)
* Each version is divided into **small chunks** (usually 2–10 seconds)

### **Step 2: Playlist Creation (M3U8)**

* HLS creates **playlist files** in **.m3u8 format**

  1. **Master Playlist:** lists all available bitrates/resolutions
  2. **Media Playlist:** lists URLs of video chunks for a specific bitrate

**Example Master Playlist (`master.m3u8`):**

```
#EXTM3U
#EXT-X-STREAM-INF:BANDWIDTH=500000,RESOLUTION=640x360
low.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=1500000,RESOLUTION=1280x720
mid.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=3000000,RESOLUTION=1920x1080
high.m3u8
```

**Example Media Playlist (`mid.m3u8`):**

```
#EXTM3U
#EXTINF:10,
seg1.ts
#EXTINF:10,
seg2.ts
#EXTINF:10,
seg3.ts
```

### **Step 3: Streaming to Client**

* Client downloads **master playlist**, chooses **initial bitrate**
* Requests **segments (chunks) one by one**
* Monitors **buffer & network** and switches to higher/lower bitrate dynamically

---

## **3️⃣ Key Features of HLS**

| Feature                | Description                                |
| ---------------------- | ------------------------------------------ |
| Adaptive Bitrate       | Smooth playback under fluctuating network  |
| HTTP-based             | Works with standard web servers and CDNs   |
| Chunked streaming      | Segments allow quick startup and buffering |
| Live streaming support | Can stream live events efficiently         |
| Wide device support    | iOS, Android, Web, Smart TVs               |

---

## **4️⃣ Comparison with DASH**

| Feature         | HLS                        | DASH                                    |
| --------------- | -------------------------- | --------------------------------------- |
| Developer       | Apple                      | MPEG / Open standard                    |
| Playlist format | M3U8                       | MPD (XML)                               |
| Segment format  | TS (transport stream)      | MP4 fragments                           |
| Latency         | Higher (~6–10s)            | Lower (~2–4s with low-latency DASH)     |
| Device support  | Excellent on Apple devices | Broader on Android, Web, Cross-platform |

---

## **5️⃣ Use Cases**

* iOS video apps (YouTube iOS, Netflix iOS)
* Live events (sports, concerts)
* Video-on-demand (VOD) platforms
* Adaptive streaming for mobile networks

---

### **6️⃣ Quick Analogy**

Think of HLS like a **playlist of small video clips**:

* Each clip = 5–10 seconds
* Client picks which quality clip to play depending on bandwidth
* If network slows → picks smaller clips
* If network improves → switches to higher quality

---
