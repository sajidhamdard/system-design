# **🛡️ Threat Modeling**

**Definition:**

> Threat modeling is the **process of identifying, analyzing, and mitigating potential security threats** to a system **before they occur**.

It’s a proactive approach to secure system design.

---

## **1️⃣ Why Threat Modeling is Important**

* Helps **identify security risks early** in design/development.
* Prioritizes **critical threats** based on risk.
* Guides **mitigation strategies** to protect data, users, and infrastructure.
* Reduces **cost and effort** compared to fixing vulnerabilities post-deployment.

---

## **2️⃣ Key Components**

1. **Assets:**

   * What are you protecting?
   * Examples: user data, financial transactions, internal APIs.

2. **Entry Points / Attack Surfaces:**

   * Where can attackers interact with the system?
   * Examples: web forms, APIs, admin portals, database endpoints.

3. **Threats:**

   * What can go wrong?
   * Examples: SQL injection, XSS, privilege escalation, data exfiltration.

4. **Vulnerabilities:**

   * Weaknesses that could be exploited by threats.
   * Example: unvalidated input, default passwords, outdated libraries.

5. **Mitigations / Controls:**

   * How to prevent, detect, or respond to threats.
   * Examples: input validation, encryption, multi-factor authentication, firewalls.

---

## **3️⃣ Common Threat Modeling Approaches**

| Approach                                                    | Description                                                                                                                  |
| ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **STRIDE**                                                  | Focuses on threat types: Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege |
| **PASTA** (Process for Attack Simulation & Threat Analysis) | Risk-centric, iterative modeling to simulate attacks                                                                         |
| **OCTAVE**                                                  | Organizational risk and asset-based threat modeling                                                                          |
| **Attack Trees**                                            | Graphical tree of potential attack paths and mitigations                                                                     |

---

## **4️⃣ Steps in Threat Modeling**

1. **Define scope and assets**
2. **Diagram the system** (data flow, components, interactions)
3. **Identify threats and vulnerabilities**
4. **Prioritize risks** (e.g., impact vs likelihood)
5. **Define mitigation strategies**
6. **Review & iterate** regularly

---

## **5️⃣ Example: Web Application Threat Modeling**

**Step 1:** Assets → User data, payment info
**Step 2:** Entry points → Login page, API endpoints
**Step 3:** Threats → SQL Injection, XSS, brute-force login
**Step 4:** Vulnerabilities → No input validation, weak passwords
**Step 5:** Mitigations → Input validation, rate limiting, MFA
**Step 6:** Monitor → Logs, alerts, periodic review

---

💡 **Analogy:**

> Think of threat modeling like **planning security for a bank**:
>
> * Identify valuables → vaults, cash, customer info
> * Identify entrances → doors, windows, staff access
> * Identify potential attacks → burglary, insider theft
> * Plan mitigations → alarms, cameras, guards

---
