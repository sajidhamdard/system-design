# **💾 DB Secrets & Deployment Secrets**

When an application connects to a database, it needs **credentials** like:

* **Username**
* **Password**
* **Certificates / Keys** (for SSL/TLS)

These are collectively called **secrets** because they must be **kept safe**.

---

## **1️⃣ Why you don’t hardcode secrets**

```text
// BAD: hardcoding DB credentials
DB_USERNAME = "admin"
DB_PASSWORD = "password123"
```

* Hardcoding secrets in code or config files is **dangerous**:

  * If someone gains access to the repo → full DB access
  * Hard to rotate/change passwords
  * Environment-specific secrets become tricky

✅ **Best practice:** Use **external secret management**, not code.

---

## **2️⃣ How secrets are stored & deployed**

### **a) Secret Management Tools**

* **Vault (HashiCorp Vault)** – central store for secrets; apps fetch them securely.
* **AWS Secrets Manager / Parameter Store** – cloud-managed secrets.
* **Kubernetes Secrets** – stores secrets in k8s cluster (encoded in Base64, not encrypted by default).

**Example in Kubernetes:**

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: db-credentials
type: Opaque
data:
  username: YWRtaW4=      # base64 of 'admin'
  password: c2VjdXJlUGFzcw==  # base64 of 'securePass'
```

> Note: Base64 is **not encryption**. Real secrets should be encrypted at rest.

---

### **b) Deploying secrets to applications**

* **Environment Variables:** App reads secrets from env vars injected at runtime.
* **Volumes / Files:** Mount secret as a file (common in k8s).
* **Dynamic retrieval:** App fetches secret from Vault or AWS Secrets Manager at startup or on demand.

**Example (env var injection):**

```bash
export DB_USERNAME=$(kubectl get secret db-credentials -o jsonpath="{.data.username}" | base64 --decode)
export DB_PASSWORD=$(kubectl get secret db-credentials -o jsonpath="{.data.password}" | base64 --decode)
```

Then the app reads:

```java
String dbUser = System.getenv("DB_USERNAME");
String dbPass = System.getenv("DB_PASSWORD");
```

---

## **3️⃣ Key practices for secure secret management**

| Practice                           | Explanation                                                                     |
| ---------------------------------- | ------------------------------------------------------------------------------- |
| **Don’t hardcode**                 | Secrets should never be in code repositories.                                   |
| **Use a secret manager**           | Vault, AWS Secrets Manager, GCP Secret Manager, etc.                            |
| **Encrypt at rest and in transit** | Secrets must be encrypted both in storage and when retrieved.                   |
| **Rotate secrets regularly**       | Change passwords or keys periodically; apps should support rotation.            |
| **Limit access**                   | Only authorized services/users can read secrets (principle of least privilege). |
| **Audit access**                   | Log secret access to detect misuse.                                             |

---

## **4️⃣ Flow of Secret Usage**

```
[Secret Manager] --> [K8s Secret / Env Variable / File] --> [Application] --> [Database]
```

1. Secret is **stored encrypted** in secret manager.
2. Secret is **injected securely** into the environment of the app.
3. App reads secret **at runtime**, never storing it in code.
4. DB credentials are used to **connect to DB**.
5. Rotation or revocation can happen without code changes.

---

💡 **Tip:**

* For temporary secrets (like API tokens), use **short TTLs** and auto-refresh.
* Always assume **secrets can leak**, and design **compensation & rotation** accordingly.

---
