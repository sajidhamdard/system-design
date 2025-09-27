# **⚙️ Kubernetes ConfigMap**

**Definition:**

> A **ConfigMap** is a Kubernetes object used to **store configuration data separately from application code**. It allows pods to **consume configuration as environment variables, command-line arguments, or configuration files**.

* Helps make applications **environment-agnostic**.
* Decouples **configuration from container images**.

---

## **1️⃣ Key Features**

| Feature           | Description                                                                   |
| ----------------- | ----------------------------------------------------------------------------- |
| Key-Value Storage | Store configuration as **key-value pairs**                                    |
| Pod Consumption   | Can be used as **env variables, files, or command args**                      |
| Decoupling        | Keeps configuration **separate from application code**                        |
| Dynamic Updates   | ConfigMap changes can be **reflected in pods** (with restart or volume mount) |

---

## **2️⃣ How It Works (Flow)**

```
ConfigMap
   |
   v
Pod consumes configuration
   |
   v
Application uses config dynamically
```

**Example Usage:**

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  LOG_LEVEL: "DEBUG"
  MAX_CONNECTIONS: "100"
```

* Pod can use these as **environment variables**:

```yaml
env:
  - name: LOG_LEVEL
    valueFrom:
      configMapKeyRef:
        name: app-config
        key: LOG_LEVEL
```

---

## **3️⃣ Benefits**

* **Separation of concerns** → app logic vs configuration
* **Easier to update configs** without rebuilding images
* **Reusable** across multiple pods and environments
* Supports **environment-specific overrides**

---

## **4️⃣ Analogy**

> Think of **ConfigMap like a property file**:
>
> * App = Java program
> * ConfigMap = `application.properties` file
> * Pod mounts ConfigMap → app reads configuration at runtime

---

💡 **Key takeaway:**

* **ConfigMap = Kubernetes object to store config data**
* Helps **decouple configuration from container images**
* Can be **consumed via env vars, files, or command arguments**

---
