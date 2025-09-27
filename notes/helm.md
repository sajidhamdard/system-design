# **📦 What is Helm?**

**Definition:**

> **Helm** is a **package manager for Kubernetes**. It simplifies **deploying, managing, and versioning Kubernetes applications** using pre-configured templates called **charts**.

Think of Helm as **apt/yum for Kubernetes**, but designed for cloud-native apps.

---

## **1️⃣ Key Concepts**

### **a) Helm Chart**

* A **package of Kubernetes resources** (Deployment, Service, ConfigMaps, etc.)
* Defines **what to install, how to configure it, and default values**.
* Can be **shared and reused**.

**Example:** Nginx Helm chart → deploys Nginx with default settings.

---

### **b) Helm Release**

* An **instance of a chart deployed in a cluster**.
* Can have **customized configuration** via `values.yaml`.
* Each release is **versioned**, so you can **rollback** easily.

---

### **c) Values**

* **Parameters to customize the chart** during installation.
* Stored in `values.yaml` or passed via CLI.

---

## **2️⃣ Helm Commands (Commonly Used)**

| Command                              | Description                        |
| ------------------------------------ | ---------------------------------- |
| `helm repo add`                      | Add a chart repository             |
| `helm search repo`                   | Search charts in repository        |
| `helm install <release> <chart>`     | Deploy a chart with a release name |
| `helm upgrade <release> <chart>`     | Update an existing release         |
| `helm rollback <release> <revision>` | Rollback to a previous release     |
| `helm uninstall <release>`           | Remove a release from the cluster  |

---

## **3️⃣ Benefits of Helm**

* **Simplifies deployments:** Deploy complex apps with one command.
* **Version control:** Track releases and rollback if needed.
* **Reusable templates:** Standardize deployments across environments.
* **Parameterization:** Customize apps without modifying templates.

---

## **4️⃣ Analogy**

> Think of Helm like **installing software on Linux**:
>
> * Charts = software packages (.deb/.rpm)
> * Releases = installed instances of the software
> * Values = configuration options you provide during installation

---

💡 **Key takeaway:**

* **Helm = Kubernetes package manager**
* Makes **deployments, upgrades, and rollbacks** simple, repeatable, and versioned.

---
