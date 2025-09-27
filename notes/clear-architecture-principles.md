# **🏗️ Clean Architecture Principles**

**Definition:**

> Clean Architecture is a software design approach that **separates concerns into layers**, making systems **maintainable, testable, and flexible**.

It emphasizes **independence of frameworks, UI, databases, and external agencies**.

---

## **1️⃣ Core Principles**

### **a) Separation of Concerns**

* Each part of the system handles **only one responsibility**.
* Avoid mixing business logic, UI, and database access in the same module.
* Makes code easier to **understand, maintain, and test**.

**Example:**

```
UI Layer: Handles user input
Business Layer: Processes business rules
Data Layer: Reads/writes database
```

---

### **b) Layered Architecture**

* System is divided into **distinct layers**, each with a specific role.

**Typical Layers in Clean Architecture:**

1. **Entities (Core / Domain layer)**

   * Business rules, core objects, validations
   * Independent of frameworks

2. **Use Cases / Application layer**

   * Orchestrates business rules for specific workflows
   * Implements application-specific logic

3. **Interface / Adapter layer**

   * Converts data between external systems and core logic
   * Examples: Controllers, Presenters, Gateways

4. **Infrastructure / Framework layer**

   * Database, Web frameworks, External APIs
   * Should not affect core business logic

**Flow Example:**

```
UI → Application (Use Cases) → Domain (Entities) → Infrastructure (DB/API)
```

---

### **c) Modularity**

* The system is divided into **modules with well-defined responsibilities**.
* Modules communicate through **interfaces**, not concrete implementations.
* Encourages **reuse** and **easy replacement of components**.

**Example:**

* Payment module → only handles payments
* Notification module → only handles email/SMS

---

### **d) Dependency Rule**

* **Source code dependencies point inward** (toward the core domain).
* Outer layers can depend on inner layers, but inner layers **must not depend on outer layers**.

```
[Infrastructure / DB / UI] → [Use Cases] → [Entities]
```

* Inner layers remain **independent of frameworks** and easy to test.

---

## **2️⃣ Benefits**

* **Testability:** Business logic can be tested without UI or DB.
* **Maintainability:** Changes in outer layers don’t affect core logic.
* **Flexibility:** Easy to replace frameworks, databases, or UIs.
* **Scalability:** Layers and modules can evolve independently.

---

## **3️⃣ Analogy**

> Think of a house:
>
> * **Foundation/Core (Entities):** Strong, stable, never changes.
> * **Rooms/Use Cases:** Define the purpose of each space.
> * **Exterior/Infrastructure:** Walls, doors, windows → can change without touching the foundation.
> * **Furniture/UI:** Can be replaced without affecting the structure.

---
