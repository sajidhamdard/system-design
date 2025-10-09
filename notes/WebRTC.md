## **1️⃣ What is WebRTC?**

**WebRTC (Web Real-Time Communication)** is an **open-source protocol and set of APIs** that allows **real-time audio, video, and data communication directly between browsers and apps** without needing plugins.

* Supported by modern browsers (Chrome, Firefox, Edge, Safari)
* Peer-to-peer (P2P) communication
* Low latency → suitable for **video calls, live streaming, and gaming**

**Goal:** Enable **real-time, secure, high-quality media streaming** over the web.

---

## **2️⃣ How WebRTC Works**

WebRTC has **3 main components**:

1. **GetUserMedia API**

   * Accesses **camera and microphone**
   * Example: `navigator.mediaDevices.getUserMedia({ video: true, audio: true })`

2. **RTCPeerConnection**

   * Establishes **peer-to-peer connection** between clients
   * Handles **media encoding, transmission, and network traversal**

3. **RTCDataChannel**

   * Allows **real-time data exchange** (chat, files, game data) alongside media

---

## **3️⃣ Key Features**

| Feature        | Description                                       |
| -------------- | ------------------------------------------------- |
| Real-time      | Low-latency audio/video streaming                 |
| Peer-to-peer   | Direct connection between users                   |
| Adaptive       | Adjusts video quality based on network conditions |
| Secure         | Built-in encryption (DTLS & SRTP)                 |
| Browser-native | No plugins or extra software needed               |

---

## **4️⃣ How Video Streaming Works with WebRTC**

1. **Signaling (setup phase)**

   * Exchange metadata between peers to establish a connection
   * Usually done via **WebSocket or HTTP server**
   * Involves exchanging:

     * **Session Description Protocol (SDP)**
     * **ICE candidates** (network addresses to traverse NAT/firewalls)

2. **Peer Connection Established**

   * Browser A → Browser B
   * Video/audio captured → encoded → sent over **P2P** connection

3. **Adaptive Streaming**

   * WebRTC adjusts bitrate and resolution dynamically based on network conditions
   * Ensures smooth playback without buffering

4. **Rendering Video**

   * Received video stream is rendered in a `<video>` element

---

## **5️⃣ Example Use Case**

* Video calling apps (Google Meet, Zoom web client)
* Live peer-to-peer streaming (small events, one-to-one streams)
* Gaming apps with live collaboration
* Real-time collaboration tools (whiteboard + video chat)

---

## **6️⃣ WebRTC vs Traditional Video Streaming**

| Feature            | WebRTC                      | HLS / DASH (HTTP streaming) |
| ------------------ | --------------------------- | --------------------------- |
| Latency            | Very low (200–500ms)        | High (3–10s)                |
| Protocol           | P2P / SRTP                  | HTTP                        |
| Adaptive Bitrate   | Yes, dynamic                | Yes, but chunk-based        |
| Use Case           | Video calls, conferencing   | VOD, live broadcast         |
| Client Requirement | Browser with WebRTC support | Browser / media player      |

**Key difference:**

* WebRTC = **real-time, peer-to-peer**, not ideal for millions of viewers at once
* HLS/DASH = **server-based streaming**, high scalability, higher latency

---

## **7️⃣ Quick Analogy**

* **WebRTC** = Phone call → direct, instant, low-latency
* **HLS / DASH** = TV broadcast → chunks are downloaded and buffered

---

## **8️⃣ Simple JavaScript Example**

```javascript
// Access camera and microphone
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  .then(stream => {
      // Show local video
      document.getElementById("localVideo").srcObject = stream;

      // Create peer connection
      const pc = new RTCPeerConnection();

      // Add local tracks to peer connection
      stream.getTracks().forEach(track => pc.addTrack(track, stream));

      // Handle remote stream
      pc.ontrack = (event) => {
          document.getElementById("remoteVideo").srcObject = event.streams[0];
      };

      // Signaling (pseudo code)
      // exchange SDP and ICE candidates via WebSocket or server
  });
```

* `<video id="localVideo">` → shows your camera
* `<video id="remoteVideo">` → shows peer’s video

---
