# **💾 Persistent Volume (PV) in Kubernetes**

**Definition:**

> A **Persistent Volume (PV)** is a **storage resource in Kubernetes** that exists **independently of pods** and provides **durable storage** for containers.

* Pods are **ephemeral** → their filesystem disappears when deleted.
* PV allows **data to persist beyond pod lifecycle**.

---

## **1️⃣ Key Concepts**

### **a) Persistent Volume (PV)**

* **Cluster-level resource** representing actual storage (e.g., NFS, EBS, GCE Persistent Disk).
* Created **by admin or dynamically** via StorageClass.
* Has **capacity, access modes, and reclaim policy**.

### **b) Persistent Volume Claim (PVC)**

* **Request for storage** by a pod.
* Specifies **size, access mode**.
* Kubernetes binds PVC to a suitable PV.

### **c) StorageClass**

* Defines **type of storage** (fast SSD, slow HDD, cloud-managed).
* Supports **dynamic provisioning** → PV is created automatically when PVC is requested.

---

## **2️⃣ How It Works (Flow)**

```
Pod --> PVC --> PV --> Storage Backend
```

1. Pod requests storage via **PVC**.
2. Kubernetes finds **matching PV** or creates one dynamically.
3. PV is **mounted to pod**.
4. Data persists even if **pod is deleted/recreated**.

---

## **3️⃣ Access Modes**

| Mode          | Meaning                                    |
| ------------- | ------------------------------------------ |
| ReadWriteOnce | Mounted as read/write by a **single node** |
| ReadOnlyMany  | Mounted **read-only by multiple nodes**    |
| ReadWriteMany | Mounted **read/write by multiple nodes**   |

---

## **4️⃣ Reclaim Policies**

| Policy  | Meaning                                     |
| ------- | ------------------------------------------- |
| Retain  | PV and data are **kept** after PVC deletion |
| Delete  | PV and storage **deleted** when PVC deleted |
| Recycle | PV is **cleaned and reused**                |

---

## **5️⃣ Analogy**

> Think of **PV like a hard drive** and **PVC like a request to rent that hard drive**:
>
> * Pod = user who needs storage
> * PV = actual storage device
> * PVC = lease agreement specifying size and access
> * Data stays safe even if the user (pod) leaves

---

💡 **Key takeaway:**

* **PV = durable, cluster-level storage**
* **PVC = pod’s request for storage**
* Decouples **storage lifecycle from pod lifecycle**

---
