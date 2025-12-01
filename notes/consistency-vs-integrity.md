# ⭐ 1. **Integrity = The Rules The Data Must Follow**

**Integrity = Constraints / Rules** you define to keep data correct.

Examples of integrity rules:

* `CHECK (balance >= 0)`
* `age > 0`
* `email` must be unique
* Foreign key must reference an existing row
* Order total = sum of items
* Salary cannot exceed manager's salary (business rule)

**Integrity = what *valid data* means.**

---

# ⭐ 2. **Consistency = Guarantee That the Rules Will Always Hold**

**Consistency = the database will never allow a state that breaks integrity rules.**

So:

* Integrity = the rules
* Consistency = ensuring the rules are enforced 100% of the time

A simple way to remember:

> **Integrity = Rules**
> **Consistency = Obeying the rules**

---

# ✔ Example to connect both

| Concept                   | Meaning                                                 |
| ------------------------- | ------------------------------------------------------- |
| **Integrity rule**        | `balance >= 0`                                          |
| **Consistency guarantee** | DB will reject any transaction that makes balance `< 0` |

If you try:

```sql
UPDATE account SET balance = -10;
```

❌ *Integrity rule violated*
→ DB aborts transaction
→ State remains **consistent**

---

# ⭐ 3. Another analogy

Think of **traffic laws**:

* **Integrity** = signals and rules (red means stop, green means go)
* **Consistency** = police & system ensure rules are followed

If someone tries to break a rule → they get stopped → system stays “consistent”.

---

# ⭐ 4. Technical distinction (important 👇)

### **Integrity = About the data itself**

* Entity integrity
* Referential integrity
* Domain integrity
* Business integrity

### **Consistency = About transactions obeying integrity**

* Every **transaction must maintain integrity rules**
* If not → transaction fails

---

# ⭐ 5. Why people get confused?

Because consistency *depends* on integrity.

* Without integrity rules → there is nothing to enforce
* Without consistency → rules can be broken

But they are **different concepts**.

---

# 🔥 Final Summary (best way to remember)

### **Integrity = What is allowed.**

(Your defined constraints)

### **Consistency = Database never allows a state that violates integrity.**

(ACID property that enforces the rules)
