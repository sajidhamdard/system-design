# **🛡️ SAST vs DAST Scans**

These are two common approaches to **application security testing**.

---

## **1️⃣ SAST – Static Application Security Testing**

**Definition:**

> SAST analyzes **source code, bytecode, or binaries** **without running the application** to find security vulnerabilities.

**Key Points:**

* **Static testing:** No runtime execution.
* Detects vulnerabilities **early in development** (Shift-Left approach).
* Examples: SQL Injection, XSS in code, insecure configurations.

**How it works:**

```
Developer writes code → SAST tool scans code → Reports vulnerabilities → Fix code
```

**Pros:**

* Early detection → cheaper to fix.
* Can be integrated into CI/CD pipeline.

**Cons:**

* Might produce **false positives**.
* Cannot detect runtime issues like environment misconfigurations.

**Example tools:** SonarQube, Checkmarx, Fortify, Veracode.

---

## **2️⃣ DAST – Dynamic Application Security Testing**

**Definition:**

> DAST analyzes a **running application** by simulating attacks to find security weaknesses.

**Key Points:**

* **Dynamic testing:** Application is executed.
* Works like a **black-box tester**: does not require source code.
* Detects runtime vulnerabilities: authentication issues, input validation errors, session management flaws.

**How it works:**

```
App deployed → DAST tool attacks endpoints → Finds vulnerabilities → Report → Fix
```

**Pros:**

* Realistic testing (finds runtime issues).
* Can detect misconfigurations and environment-related vulnerabilities.

**Cons:**

* Late detection (after code is written/deployed).
* Might miss deep code vulnerabilities not exposed in runtime.

**Example tools:** OWASP ZAP, Burp Suite, AppSpider, Netsparker.

---

## **3️⃣ SAST vs DAST – Quick Comparison**

| Feature               | SAST                  | DAST                                          |
| --------------------- | --------------------- | --------------------------------------------- |
| Stage                 | Early (development)   | Late (running app)                            |
| Testing method        | Static (code review)  | Dynamic (runtime)                             |
| Access to code        | Yes                   | No                                            |
| Types of issues found | Code flaws, SQLi, XSS | Runtime flaws, auth issues, misconfigurations |
| False positives       | Higher                | Lower (more realistic)                        |
| CI/CD integration     | Easy                  | Possible, but slower                          |

---

## **4️⃣ Combined Approach (Best Practice)**

* **Shift-Left:** Use SAST early in development.
* **Pre-Release:** Use DAST on staging/QA environment.
* **Continuous Security:** Integrate both in CI/CD pipeline for maximum coverage.

---

💡 **Analogy:**

* **SAST:** Reading a blueprint to spot design flaws **before construction**.
* **DAST:** Inspecting the building by trying to **break doors/windows** after construction.

---
