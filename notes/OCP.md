# **1️⃣ Definition in simple terms**

> A class (or module, or function) should be **open for extension** but **closed for modification**.

* **Open for extension** → You can **add new features** or behavior without changing existing code.
* **Closed for modification** → You **don’t touch existing tested code**; this prevents introducing bugs in working functionality.

Think of it like this:

> You can **add new bricks** to a wall without tearing down the old wall.

---

# **2️⃣ Why it matters (practical view)**

* If you constantly modify existing classes to add new features:

  * You risk **breaking existing functionality**.
  * You create **tight coupling** → one change affects multiple parts.
  * You make the system **hard to maintain** as it grows.
* Following OCP means:

  * **Adding new behavior won’t break old behavior**.
  * Your code becomes **extensible** and **future-proof**.

---

# **3️⃣ Example explained**

Your example:

```java
interface PaymentStrategy {
    void pay(int amount);
}

class CreditCardPayment implements PaymentStrategy {
    public void pay(int amount) {
        System.out.println("Paid " + amount + " via Credit Card");
    }
}

class ShoppingCart {
    private PaymentStrategy paymentStrategy;
    
    public void checkout(int amount) {
        paymentStrategy.pay(amount);
    }
}
```

### ✅ How OCP is achieved here

1. **ShoppingCart is closed for modification**

   * `ShoppingCart` doesn’t need to be touched if a new payment method is added.

2. **ShoppingCart is open for extension**

   * To add PayPal payment, just create a new class:

```java
class PayPalPayment implements PaymentStrategy {
    public void pay(int amount) {
        System.out.println("Paid " + amount + " via PayPal");
    }
}
```

* You **don’t modify** existing code; you **extend** functionality by adding new classes.
* Existing `CreditCardPayment` or `ShoppingCart` code remains untouched → no risk of breaking old functionality.

---

# **4️⃣ Real-world analogy**

Think of your phone’s charging port:

* **Closed for modification** → You don’t change the port every time you get a new charger.
* **Open for extension** → You can plug in a new charger or accessory without modifying the phone itself.

OCP is the same concept applied to code.

---

# **5️⃣ Key points to implement OCP**

1. **Use interfaces or abstract classes**:

   * Let new behaviors implement the interface rather than modifying existing classes.

2. **Favor composition over inheritance** (often together with Strategy pattern):

   * Compose behavior using objects rather than changing code.

3. **Add new features via new classes**:

   * Example: new payment methods → new classes implementing `PaymentStrategy`.

4. **Avoid changing tested code**:

   * Protect existing functionality from regressions.

---

# **6️⃣ Practical summary**

| Aspect              | Without OCP                         | With OCP                 |
| ------------------- | ----------------------------------- | ------------------------ |
| Adding new behavior | Modify existing classes → high risk | Add new class → low risk |
| Maintenance         | Hard, error-prone                   | Easy, safe               |
| Extensibility       | Limited                             | Flexible                 |
| Coupling            | High                                | Low                      |

---
