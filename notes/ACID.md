## **What is ACID?**

> **ACID** = **4 key properties** that guarantee **reliable transactions** in a database.
> It ensures that **data stays correct** even if there are **crashes**, **errors**, or **concurrent users**.

### **A = Atomicity**

> All or nothing
> → **Transaction fully completes** or **does nothing** (no partial writes)

**Example:**
Transfer ₹100 from A → B

```sql
UPDATE accounts SET balance = balance - 100 WHERE account_id = 'A';
UPDATE accounts SET balance = balance + 100 WHERE account_id = 'B';
```

If step 2 fails → step 1 **rolls back**
→ **Money doesn’t vanish**

---

### **C = Consistency**

> DB always moves from **valid state → valid state** (rules are followed)

**Example:**
If rule = **“Balance can’t be negative”**
→ After transaction, DB enforces rule
→ No invalid data ever saved

---

### **I = Isolation**

> Transactions don’t interfere with each other (they **act as if run one-by-one**)

**Example:**
2 users transfer money at same time
→ DB makes sure **they don’t mess up each other’s balances**
→ Uses locks, MVCC, etc.

---

### **D = Durability**

> Once committed → **Data stays saved** (even after crash, power failure)

**Example:**
You book a ticket, get success message → server crashes
→ When server comes back → **your booking still exists**
(DB writes safely to disk)

---

## **In short (interview ready)**

| **ACID property** | **What it ensures**      | **Easy example**                         |
| ----------------- | ------------------------ | ---------------------------------------- |
| **Atomicity**     | All or nothing           | Bank transfer doesn’t lose money halfway |
| **Consistency**   | Valid state always       | No negative balance                      |
| **Isolation**     | Transactions don’t clash | Two transfers don’t mess up              |
| **Durability**    | Data is permanent        | Booking stays after crash                |

---

## **Where is ACID important?**

✅ **Relational DBs (SQL)** → Banking, E-commerce orders
✅ **Critical data apps** → CRM, ERP, Accounting

---

| **ACID Property** | **1-line Example**                                                                           |
| ----------------- | -------------------------------------------------------------------------------------------- |
| **Atomicity**     | **Bank transfer** ₹100 A → B → If step 2 fails, step 1 **rolls back** → no ₹ loss            |
| **Consistency**   | Insert row into **accounts(balance >= 0)** → DB rejects if balance = -500 (violates rule)    |
| **Isolation**     | 2 users book **same seat** → DB ensures **only 1** succeeds, avoids double booking           |
| **Durability**    | After booking a ticket + commit → **Server crashes** → Booking **still saved** after restart |

---

> In short 👇
> **“ACID means — All or nothing, Valid state, No interference, Data stays safe. Eg: Bank transfer, balance rule, seat booking, ticket saved.”**

---
