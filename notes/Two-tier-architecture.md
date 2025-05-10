# Single Server Design but Separating Out the Database Server

> **Two-tier architecture** or **Single application server + separate database server design**

---

### ⚙️ **What happens here?**

You **split the database** out onto its **own server**, like this:

```
Client (browser)
      ↓
Application Server (backend logic, web server)
      ↓
Database Server (only database)
```

---

### ✅ **Why do this? (Benefits)**

| Benefit                    | Why it helps                                                              |
| -------------------------- | ------------------------------------------------------------------------- |
| **Better performance**     | DB has its own CPU/RAM → no competition with app code                     |
| **Easier scaling**         | You can upgrade app server or DB server independently                     |
| **Improved security**      | You can **lock down** DB server (accept connections only from app server) |
| **Better maintainability** | DB backups, tuning, and monitoring are easier                             |

---

### ❌ **Tradeoffs / Disadvantages**

| Issue                           | Why it matters                                                                       |
| ------------------------------- | ------------------------------------------------------------------------------------ |
| **Slightly more complex setup** | Now 2 servers to manage                                                              |
| **Network latency**             | App server ↔️ DB server communication has minor delay (but acceptable in most cases) |
| **Cost**                        | Need two machines (or two VMs/cloud instances)                                       |

---

### 📦 **Common usage**

* Small-to-medium apps that **outgrow single server**
* Apps where database load is heavy
* Apps that need **better security** or **separate scaling** of DB

---

### ✅ **Summary (in one line)**

> **App and DB run on separate servers → better performance, security, and scalability vs. single server**
