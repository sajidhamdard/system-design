# **Coupling vs Cohesion**

Both are **software design principles** that help you build maintainable and robust systems, but they focus on **different aspects**.

---

## **1️⃣ Cohesion**

### 🔑 Definition:

* **Cohesion** measures **how closely related the responsibilities of a single module/class are**.
* A module is **highly cohesive** if all its parts are focused on a **single task or purpose**.

### 🖼 Example:

* **High cohesion:**

  ```text
  Class: InvoiceGenerator
  Methods: generateInvoice(), calculateTotal(), formatInvoice()
  ```

  * Everything in the class is related to **invoice generation**.
* **Low cohesion:**

  ```text
  Class: Utility
  Methods: generateInvoice(), sendEmail(), saveToDB(), drawChart()
  ```

  * The class does many **unrelated tasks** → harder to maintain and reuse.

### ✅ Key Idea:

> “Keep related things together.”

* High cohesion → easier to understand, maintain, and test.

---

## **2️⃣ Coupling**

### 🔑 Definition:

* **Coupling** measures **how dependent one module/class is on another**.
* **Low coupling** is desirable → modules can work independently.

### 🖼 Example:

* **High coupling:**

  ```text
  Class A directly modifies internal data of Class B
  Class A depends on Class B's private methods
  ```

  * Changes in B → break A → hard to maintain.

* **Low coupling:**

  ```text
  Class A uses an interface of Class B
  Class A doesn’t care about B’s internal implementation
  ```

  * B can change internally → A unaffected → more flexible.

### ✅ Key Idea:

> “Reduce dependencies between modules.”

* Low coupling → easier to extend, modify, and reuse modules.

---

## **3️⃣ Coupling vs Cohesion – Quick Comparison**

| Aspect         | Cohesion                               | Coupling                         |
| -------------- | -------------------------------------- | -------------------------------- |
| Focus          | Within a single module/class           | Between multiple modules/classes |
| Goal           | Make module focused & clear            | Make modules independent         |
| High/Low Good? | **High cohesion is good**              | **Low coupling is good**         |
| Example        | InvoiceGenerator only handles invoices | Module depends on another module |

---

## **4️⃣ Analogy**

* **Cohesion:** A team where all members work on **the same project** → efficient and clear.
* **Coupling:** Multiple teams **independent of each other** → one team’s changes don’t break others.

---

💡 **Rule of Thumb:**

* Design modules/classes with **high cohesion** and **low coupling** → leads to clean, maintainable, and scalable code.

---
