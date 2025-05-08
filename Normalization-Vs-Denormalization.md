## **What is Normalization?**

> **Normalization** = Process of **organizing data** to **eliminate redundancy** and ensure **data integrity** by splitting into **multiple related tables**.

✅ Reduces **duplicate data**
✅ Ensures **consistency** (if data changes, only update in 1 place)

---

### **Example (Normalized)**

You have **Students** and their **Courses**

| **Students Table** |       | **Courses Table** |            |              |
| ------------------ | ----- | ----------------- | ---------- | ------------ |
| student\_id        | name  |                   | course\_id | course\_name |
| 1                  | Alice |                   | 101        | Math         |
| 2                  | Bob   |                   | 102        | Science      |

\| **Enrollments Table (relation)** |

| student\_id | course\_id |
| ----------- | ---------- |
| 1           | 101        |
| 1           | 102        |
| 2           | 101        |

No duplication of **student names** or **course names**
→ Everything is clean and connected by **foreign keys**

---

## **What is Denormalization?**

> **Denormalization** = **Combining tables** (introducing some redundancy) to **reduce joins** and **speed up reads**.

✅ Fewer **joins**
✅ Faster **read performance** (but more storage and risk of inconsistency)

---

### **Example (Denormalized)**

| student\_id | student\_name | course\_id | course\_name |
| ----------- | ------------- | ---------- | ------------ |
| 1           | Alice         | 101        | Math         |
| 1           | Alice         | 102        | Science      |
| 2           | Bob           | 101        | Math         |

→ **student\_name** and **course\_name** repeated
→ But **faster to query** (only 1 table)

---

## **Quick comparison**

| **Aspect**           | **Normalization**                | **Denormalization**                     |
| -------------------- | -------------------------------- | --------------------------------------- |
| **Goal**             | Remove redundancy                | Improve read speed                      |
| **Data duplication** | Minimal                          | Yes (intentional)                       |
| **Write operations** | Faster, simpler                  | Slower (more updates due to redundancy) |
| **Read operations**  | Slower (joins)                   | Faster (fewer joins)                    |
| **Storage**          | Less                             | More                                    |
| **Data consistency** | Stronger (less risk of mismatch) | Weaker (risk of mismatch)               |

---

## **When to choose?**

| **If your app is…**                                                                                                 | **Choose**          | **Why?**                                            |
| ------------------------------------------------------------------------------------------------------------------- | ------------------- | --------------------------------------------------- |
| **OLTP (Online Transaction Processing)**<br>Banking, ERP, CRM (lots of small reads/writes, data integrity critical) | **Normalization**   | Reduces redundancy, keeps data clean and consistent |
| **OLAP (Online Analytical Processing)**<br>Reporting, dashboards, analytics (heavy reads, fewer writes)             | **Denormalization** | Speeds up reads, fewer joins                        |

---

## **In short (interview-ready)**

> **Normalization** → Reduce redundancy, keep data clean → best for **write-heavy + integrity** systems
> **Denormalization** → Improve read speed (at cost of redundancy) → best for **read-heavy + analytics** systems
