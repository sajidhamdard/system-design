## ⚙️ What is Threat Detection?

**Definition:**

> Threat detection is the process of **identifying malicious activity or security breaches** in a system or network.

**Goal:**

* Detect attacks **early**
* Respond **quickly** to prevent damage
* Maintain **confidentiality, integrity, and availability**

---

## 1️⃣ **SIEM (Security Information and Event Management)**

**Definition:**

> SIEM collects, **aggregates, and analyzes logs and events** from multiple sources to detect suspicious patterns.

**Key Functions:**

1. **Log collection** → from servers, network devices, firewalls, apps
2. **Correlation** → detect patterns across systems
3. **Alerting** → notify security team about potential threats
4. **Reporting & compliance** → audit trails, regulatory compliance

**Examples:**

* Splunk, IBM QRadar, ArcSight, Azure Sentinel

**Pros:**

* Centralized view of security events
* Can detect **complex multi-step attacks**

**Cons:**

* Reactive; relies on logs
* Requires tuning to reduce false positives

---

## 2️⃣ **IDS (Intrusion Detection System)**

**Definition:**

> IDS monitors network or host activity to **detect suspicious behavior or policy violations**, but **does not block traffic**.

**Types:**

1. **Network IDS (NIDS)** → monitors network traffic
2. **Host IDS (HIDS)** → monitors individual systems

**Detection Methods:**

* **Signature-based:** match known attack patterns
* **Anomaly-based:** detect deviations from normal behavior

**Pros:**

* Detects attacks in real-time
* Can provide alerts for forensic analysis

**Cons:**

* Cannot prevent attacks (alert only)
* Signature-based IDS cannot detect unknown attacks

**Examples:**

* Snort, Suricata, OSSEC

---

## 3️⃣ **IPS (Intrusion Prevention System)**

**Definition:**

> IPS is similar to IDS but **can actively block malicious traffic** instead of just alerting.

**Functions:**

* Detect malicious activity (like IDS)
* **Drop packets or terminate connections**
* Protect networks automatically

**Pros:**

* Real-time prevention of attacks
* Reduces workload on security team

**Cons:**

* False positives can block legitimate traffic
* Needs careful configuration

**Examples:**

* Cisco Firepower, Palo Alto Threat Prevention

---

## 🔄 **Comparison Table**

| Feature     | SIEM                       | IDS                  | IPS                         |
| ----------- | -------------------------- | -------------------- | --------------------------- |
| Purpose     | Analyze logs/events        | Detect intrusions    | Detect & prevent intrusions |
| Action      | Alert/report               | Alert                | Block / prevent             |
| Data Source | Logs from multiple sources | Network/Host traffic | Network/Host traffic        |
| Detection   | Correlation & patterns     | Signatures/Anomalies | Signatures/Anomalies        |
| Real-time   | Usually near real-time     | Real-time            | Real-time                   |

---

## 🧩 Analogy

* **SIEM:** Security dashboard → collects CCTV footage and alarms, analyzes patterns
* **IDS:** Security guard → notices suspicious behavior and calls the team
* **IPS:** Security guard + automatic lock → notices suspicious behavior and blocks entry immediately

---

✅ **Key Takeaways**

1. **Threat detection** = identify malicious activity early
2. **SIEM** → centralizes logs, correlates events, alerts
3. **IDS** → detects intrusions, alerts only
4. **IPS** → detects intrusions, actively blocks them
5. For robust security → often **used together**: SIEM + IDS/IPS

---
