**Row-level locking** is a type of database locking mechanism where **individual rows in a table are locked** during a transaction, rather than the entire table.

It’s used to **allow high concurrency** by letting multiple transactions work on different rows of the same table simultaneously without conflicts.

---

## 🔑 Key Points

1. **Granularity:**

   * Lock is applied **per row**.
   * Finer-grained than **table-level locks** (which lock the whole table).

2. **Purpose:**

   * Prevent **lost updates** and **data inconsistencies** when multiple transactions modify the same table.

3. **Behavior:**

   * Other transactions can read or update **different rows** in the same table.
   * Transactions trying to update the **same row** will **wait** until the lock is released.

4. **Types of Row Locks:**

   * **Exclusive Lock (X Lock):** Only one transaction can modify the row.
   * **Shared Lock (S Lock):** Multiple transactions can read but cannot write.

---

## 🖥 Example (SQL)

```sql
-- Transaction A locks row with id=1
SELECT * FROM accounts WHERE id = 1 FOR UPDATE;

-- Transaction B tries to update the same row
UPDATE accounts SET balance = balance + 100 WHERE id = 1;
-- B will wait until A commits

-- Transaction C updates row with id=2
UPDATE accounts SET balance = balance + 50 WHERE id = 2;
-- C executes immediately (different row)
```

---

## ✅ Advantages

* Higher concurrency than table-level locks.
* Prevents conflicts at a **row level**, allowing other rows to be updated.

## ⚠️ Disadvantages

* More **overhead** for the database (tracking many locks).
* Can still cause **deadlocks** if multiple rows are locked in different orders by different transactions.

---

💡 **Analogy:**

* **Table-level lock:** Lock the whole classroom → nobody else can enter.
* **Row-level lock:** Lock only one desk → other students can work at other desks.

---
