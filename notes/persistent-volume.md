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

# **💡 Persistent Volume Claim (PVC) in Kubernetes**

**Definition:**

> A **Persistent Volume Claim (PVC)** is a **request for storage by a pod**. It specifies **size, access mode, and storage class**, and Kubernetes **binds it to a suitable Persistent Volume (PV)**.

* PVC is how **pods consume storage** in Kubernetes.
* Decouples **storage request from physical storage details**.

---

## **1️⃣ How PVC Works**

1. Pod needs storage → defines a **PVC** in its spec.
2. Kubernetes looks for a **matching PV** (capacity, access mode, storage class).
3. If a match is found, PV is **bound to PVC**.
4. Pod mounts PVC → can **read/write data**.

**Flow (Text Diagram):**

```
Pod --> PVC --> PV --> Storage Backend
```

* Pod asks for storage → PVC → Kubernetes finds or provisions PV → Pod uses PV.

---

## **2️⃣ Key Fields in PVC**

| Field                        | Description                                                         |
| ---------------------------- | ------------------------------------------------------------------- |
| `resources.requests.storage` | Amount of storage requested (e.g., 10Gi)                            |
| `accessModes`                | Read/write permissions (ReadWriteOnce, ReadOnlyMany, ReadWriteMany) |
| `storageClassName`           | Type of storage / provisioner (e.g., fast SSD, standard HDD)        |

---

## **3️⃣ Dynamic vs Static Provisioning**

* **Static Provisioning:** PV is **pre-created by admin**, PVC binds to it.
* **Dynamic Provisioning:** PVC triggers **automatic creation of PV** via StorageClass.

---

## **4️⃣ Benefits**

* **Decouples storage from pod lifecycle** → data persists beyond pod.
* **Standardizes storage requests** → pods don’t need to know physical storage details.
* **Supports dynamic provisioning** → automatically allocate new PVs.

---

## **5️⃣ Analogy**

> Think of **PVC like a storage rental request**:
>
> * Pod = tenant needing storage
> * PVC = rental request specifying **size & type**
> * PV = actual storage drive / warehouse
> * Kubernetes binds the request → tenant gets storage
> * Data persists even if tenant moves out (pod deleted)

---

💡 **Key takeaway:**

* **PVC = pod’s request for storage**
* **PV = physical storage**
* PVC abstracts **how storage is allocated**, making it **easy and reusable**

---
