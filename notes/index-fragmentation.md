## ⚙️ What is Index Fragmentation?

**Definition:**

> **Index fragmentation** occurs when the **physical order of pages in a database index** no longer matches the **logical order** of the indexed data.

**Goal of Index:**

* Improve **query performance** by allowing the database to **quickly locate rows**.

**Fragmentation Problem:**

* Over time, as **INSERT, UPDATE, DELETE** operations happen, index pages get **scattered** → leads to fragmentation.

---

## 🔄 Types of Fragmentation

1. **Internal Fragmentation**

   * Index pages have **unused space**
   * Happens when rows are deleted or updated and pages are not fully filled
   * Leads to **wasted memory/disk space**

2. **External Fragmentation (Logical Fragmentation)**

   * **Logical order of index entries does not match physical order** on disk
   * Causes **extra disk I/O** when reading ranges of rows

**Example:**

* Index before fragmentation (logical = physical):

```
1, 2, 3, 4, 5
```

* After deletes and inserts:

```
Logical: 1, 2, 3, 4, 5
Physical: 3, 1, 5, 2, 4
```

* **Query scanning 1–5** now reads more pages → slower

---

## ⚡ Causes of Fragmentation

1. Frequent **INSERTs in non-sequential order**
2. **DELETEs** leaving empty space
3. **UPDATEs** that increase row size → row moved to another page
4. Lack of **regular index maintenance**

---

## 🔧 Impact of Fragmentation

* Slower **range queries** and **index scans**
* Increased **I/O** and memory usage
* Longer **backup and restore times**
* Can affect **transaction performance**

---

## 🛠️ How to Fix / Prevent Fragmentation

1. **Rebuild Index**

   * Creates a new index → removes fragmentation
   * Example (SQL Server):

     ```sql
     ALTER INDEX idx_name ON table_name REBUILD;
     ```

2. **Reorganize Index**

   * Defragments index **in-place**, less resource-intensive
   * Example (SQL Server):

     ```sql
     ALTER INDEX idx_name ON table_name REORGANIZE;
     ```

3. **Fill Factor**

   * Leave **some free space** in index pages to reduce future fragmentation
   * Example: `FILLFACTOR = 80%`

4. **Use Sequential Inserts**

   * Insert in **primary key order** to reduce page splits

---

## 🧩 Analogy

* Think of a **library shelf**:

  * Books (rows) should be in order for fast lookup
  * If you remove books and insert new ones randomly → books scattered → slower to find
  * **Rebuild** = reorganize all books neatly
  * **Reorganize** = push books around to close gaps

---

## ✅ Key Takeaways

1. **Index fragmentation = misalignment between logical and physical order**
2. Types: **internal (unused space)**, **external/logical (out-of-order pages)**
3. Causes: inserts, deletes, updates, lack of maintenance
4. Effects: slower queries, more I/O, higher memory usage
5. Solutions: **rebuild, reorganize, proper fill factor, sequential inserts**

---
