# **LocalStorage**

### **What it is:**

A simple storage in the browser where data is stored **permanently** (until you delete it manually or via code).

### **Key points**

* Capacity: ~5–10 MB
* Data never expires automatically
* Only stores **string** values
* Synchronous (blocks main thread — not ideal for big data)

### **Example:**

```js
localStorage.setItem("username", "Sajid");
console.log(localStorage.getItem("username")); // Sajid
localStorage.removeItem("username");
```

### **Easy explanation:**

🟩 **“A small permanent locker inside the browser.”**

Good for small user preferences.

---

# **SessionStorage**

### **What it is:**

Similar to LocalStorage but works **only for one browser tab** and **clears automatically when tab closes**.

### **Key points**

* Capacity: ~5MB
* You can store only **string** values
* Data gone when tab is closed
* Each tab has its *own* sessionStorage

### **Example:**

```js
sessionStorage.setItem("otp", "123456");
console.log(sessionStorage.getItem("otp")); // 123456

// closes tab → data gone
```

### **Easy explanation:**

🟦 **“A temporary locker that lasts only until the tab is open.”**

Good for temporary data like OTP, form progress, filters, etc.

---

# **IndexedDB**

### **What it is:**

A **client-side database** in your browser.
It stores **large amounts of data**, supports **objects**, **indexes**, **transactions**, etc.

### **Key points**

* Capacity: 100MB to several **GBs**
* Asynchronous (non-blocking, fast)
* Works like a real NoSQL DB
* Stores structured data (objects, arrays, blobs)
* Perfect for large apps, offline apps (PWA)

### **Example (very simple):**

```js
let request = indexedDB.open("MyDB", 1);

request.onupgradeneeded = () => {
  let db = request.result;
  db.createObjectStore("users", { keyPath: "id" });
};

request.onsuccess = () => {
  let db = request.result;
  let tx = db.transaction("users", "readwrite");
  let store = tx.objectStore("users");

  store.put({ id: 1, name: "Sajid", role: "Developer" });
};
```

### **Easy explanation:**

🟥 **“A full database inside your browser for large or complex data.”**

Used by Gmail, WhatsApp Web, Instagram, Twitter, PWAs, offline apps.

---

# 🔥 Summary Table (Super Easy)

| Feature     | LocalStorage         | SessionStorage       | IndexedDB                 |
| ----------- | -------------------- | -------------------- | ------------------------- |
| Data Expiry | Never                | On tab close         | Never                     |
| Max Size    | ~5MB                 | ~5MB                 | 100MB – GBs               |
| Data Type   | String only          | String only          | Anything (objects, files) |
| Speed       | Fast but synchronous | Fast but synchronous | Fast async                |
| Use Case    | Preferences, tokens  | Tab-based data       | Offline apps, big data    |
| Tab Sharing | Shared across tabs   | Per-tab only         | Shared                    |

---

# 🎯 When to use what?

### ✔ LocalStorage

* Dark mode
* Language preference
* JWT token (but less secure)

### ✔ SessionStorage

* OTP
* Temporary filters
* Form wizard steps
* Data that should reset on tab close

### ✔ IndexedDB

* Big lists (thousands of items)
* Offline-first apps (PWA)
* Chat history
* Caching API responses
* Storing files, images, blobs

---

# 🧠 Easy Memory Trick

* **LocalStorage → Permanent small data**
* **SessionStorage → Temporary small data**
* **IndexedDB → Large complex data**

---
