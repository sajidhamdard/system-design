# **1️⃣ Definition in simple words**

> **Liskov Substitution Principle:** Objects of a superclass should be replaceable with objects of a subclass **without affecting the correctness of the program**.

* If a method works with a base class object, it should also work with any subclass object **without breaking behavior**.
* Subclasses must honor the “contract” of the base class.

**Shortcut to remember:**

> A subclass **is a true substitute** for its parent class.

---

# **2️⃣ Why it matters (practical perspective)**

* If LSP is violated:

  * Code that expects a base class may **break** unexpectedly when given a subclass.
  * Leads to **runtime errors**, **bugs**, or **unsupported operations**.
  * Makes the system **harder to maintain** and **less predictable**.

* Following LSP ensures:

  * **Subtypes can replace the base type safely**.
  * Code using base class **doesn’t need to know subclass details**.
  * Makes your design **robust, reusable, and predictable**.

---

# **3️⃣ Example you provided**

```java
class Bird {
    public void fly() {
        System.out.println("Flying");
    }
}

class Sparrow extends Bird {
    @Override
    public void fly() {
        System.out.println("Sparrow flying");
    }
}

class Ostrich extends Bird {
    @Override
    public void fly() {
        throw new UnsupportedOperationException("Ostriches can't fly");
    }
}
```

### ✅ Problem

* Base class `Bird` says: “all birds can fly”.
* Subclass `Ostrich` cannot fly → it **breaks the contract**.
* Code expecting a `Bird` object:

```java
public void makeBirdFly(Bird b) {
    b.fly();
}
```

* Works for `Sparrow` → fine
* Fails for `Ostrich` → throws runtime exception

This **violates LSP** because `Ostrich` cannot be safely substituted for `Bird`.

---

# **4️⃣ How to fix it**

The key is **redefining the hierarchy** so that LSP holds.

### ✅ Approach: Separate the “flyable” behavior

```java
interface Flyable {
    void fly();
}

class Bird {
    // common bird behavior
}

class Sparrow extends Bird implements Flyable {
    @Override
    public void fly() {
        System.out.println("Sparrow flying");
    }
}

class Ostrich extends Bird {
    // no fly method
}
```

* Now `Bird` is generic
* Only birds that can fly implement `Flyable`
* Code expecting `Flyable`:

```java
public void makeFly(Flyable f) {
    f.fly();
}
```

* Works for `Sparrow`
* Won’t accidentally pass `Ostrich` → **no violation**, no runtime errors.

---

# **5️⃣ Real-world analogy**

Think of a **plug socket**:

* Base type = `Socket` (accepts plugs)
* Subtype = `ThreePinPlug` → works fine
* Subtype = `SquarePlug` → can’t fit

If you expect **any plug to work**, SquarePlug **breaks your assumption** → LSP violation.

---

# **6️⃣ Key points to follow for LSP**

1. **Subclasses must honor the contract** of the base class:

   * Don’t throw exceptions that violate base behavior
   * Don’t reduce functionality
2. **Use interfaces or separate hierarchies for optional behavior**:

   * e.g., Flyable, Swimmable
3. **Avoid overriding methods in ways that break assumptions**:

   * If a method in the base class guarantees `X`, the subclass **must also guarantee X**
4. **Use composition if behavior differs**:

   * Ostrich can have a `Walkable` interface instead of overriding `fly`.

---

# **7️⃣ Summary**

| Aspect        | Violation Example                         | Correct Example                  |
| ------------- | ----------------------------------------- | -------------------------------- |
| Base contract | Bird can fly                              | Only Flyable birds implement fly |
| Substitution  | Ostrich passed to Bird → throws exception | Only Flyable passed → safe       |
| Result        | Runtime errors, unpredictable behavior    | Safe, predictable, reusable      |

---

# ✅ TL;DR Practical Rule

> **“A subclass should be usable anywhere the parent class is expected, without breaking the program.”**

* If it **can’t**, rethink your class hierarchy or use interfaces.
