# **🔑 OptimisticLockException**

**Definition:**
`OptimisticLockException` is an exception thrown in **JPA/Hibernate** when **optimistic locking** fails.

It happens when **two or more transactions try to update the same entity simultaneously**, and the **version check fails**.

---

## **1️⃣ Optimistic Locking Concept**

* Optimistic locking **does not lock rows** in the database.
* Each row/entity has a **version field** (integer or timestamp).
* When updating:

  1. Read the entity with its current version.
  2. Make changes.
  3. When saving, check if the version in DB matches the version read.
  4. If versions **match**, increment version and save.
  5. If versions **don’t match**, throw **`OptimisticLockException`**.

---

### **2️⃣ Example**

```java
@Entity
public class Account {
    @Id
    private Long id;

    private double balance;

    @Version
    private int version;  // Optimistic lock version
}
```

**Scenario:**

1. **Transaction A** reads account version = 1
2. **Transaction B** reads account version = 1
3. **Transaction A** updates balance → version increments to 2 → saved successfully
4. **Transaction B** updates balance → version in DB = 2, but B read version = 1 → **`OptimisticLockException`** thrown

---

## **3️⃣ Why it’s useful**

* Prevents **lost updates** in concurrent environments.
* Safer than **pessimistic locking** for high-concurrency systems.
* Works well when **conflicts are rare**, since no DB row locks are held.

---

## **4️⃣ How to handle it**

1. **Retry transaction:** Often, just retrying the operation works.
2. **Notify user:** Let the user know their changes conflicted.
3. **Merge changes:** Apply conflict resolution logic manually.

```java
try {
    accountRepository.save(account);
} catch (OptimisticLockException e) {
    // retry or show error
}
```

---

## **5️⃣ Key Points**

* Uses a **version column** (`@Version`) in JPA/Hibernate.
* Exception occurs **at commit/update**, not at read.
* Suitable for **high-concurrency systems** where conflicts are rare.
* Lightweight compared to **pessimistic locking**.

---

💡 **Analogy:**

> Think of it like **signing a document**:
>
> * You read the latest version of the doc.
> * Make your edits.
> * When saving, the system checks if the doc has been edited since you read it.
> * If yes → conflict → `OptimisticLockException`.

---
