# ✅ **1. preload**

### **Purpose:**

Load a resource **as early as possible**, because the browser will need it *very soon*.

### **When to use:**

* Critical CSS
* Important fonts
* Above-the-fold images
* Scripts that must be executed early

### **Example:**

```html
<link rel="preload" href="styles.css" as="style">
```

### **Easy explanation:**

🟢 **"Load this now. I will need it immediately!"**

The browser starts fetching it *right away*, even before rendering.

---

# ✅ **2. prefetch**

### **Purpose:**

Load a resource **for future use**, not needed right now.

### **When to use:**

* Next page’s JS or CSS (SPA routing)
* Images or data needed after some time

### **Example:**

```html
<link rel="prefetch" href="next-page.js" as="script">
```

### **Easy explanation:**

🔵 **"When you're free, load this also. I’ll need it later."**

Browser gives **low priority** to prefetch.

---

# ⭐ preload vs prefetch (super simple)

| Feature  | preload             | prefetch                 |
| -------- | ------------------- | ------------------------ |
| Priority | High                | Low                      |
| Needed   | Now                 | Later                    |
| Goal     | Faster initial load | Faster future navigation |

---

# ✅ **3. async (for JS)**

### **Purpose:**

Download the script **in background** and run it **as soon as it finishes**, *without blocking the page*.

### **When to use:**

* Ads
* Analytics
* Non-critical scripts
* Scripts that don’t depend on others

### **Example:**

```html
<script src="app.js" async></script>
```

### **Easy explanation:**

🟠 **"Load in background. When ready, run immediately."**

⚠️ Order is NOT guaranteed.

---

# ✅ **4. defer (for JS)**

### **Purpose:**

Download the script **in background**, but **run it only after HTML is fully parsed**.

### **When to use:**

* Most page JS
* Scripts that depend on DOM
* Scripts that must run in order

### **Example:**

```html
<script src="app.js" defer></script>
```

### **Easy explanation:**

🟡 **"Load in background, but wait… run only after HTML is ready."**

Order **is guaranteed**.

---

# ⭐ async vs defer (super simple)

| Feature          | async                      | defer                 |
| ---------------- | -------------------------- | --------------------- |
| Download?        | Background                 | Background            |
| Execute?         | Immediately after download | After HTML parsing    |
| Execution order? | Not guaranteed             | Guaranteed            |
| Good for?        | Independent scripts        | DOM-dependent scripts |

---

# 🎉 **Ultra-simple memory trick**

* **preload = load NOW (urgent)**
* **prefetch = load LATER (not urgent)**
* **async = run ASAP (order not important)**
* **defer = run AFTER HTML (order important)**

---

# 📌 When to use which (real-world)

| Scenario                  | Best Choice  |
| ------------------------- | ------------ |
| Critical font/CSS         | **preload**  |
| Next page resources (SPA) | **prefetch** |
| Analytics / ads           | **async**    |
| Main JS bundle            | **defer**    |
| Large image above fold    | **preload**  |

---
