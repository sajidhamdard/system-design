## 🔹 What is a Cursor in Pagination?

A **cursor** in pagination is a **pointer/marker** that tells the database or API **where to resume fetching the next set of results**.

Instead of using **page numbers** (`page=2, page=3`), a cursor-based system uses an **encoded ID or token** from the last item fetched to get the next set of results.

---

## 🔹 Example

Imagine you have a list of users sorted by `created_at`:

| id | name  | created\_at         |
| -- | ----- | ------------------- |
| 1  | Alice | 2024-09-01 10:00:00 |
| 2  | Bob   | 2024-09-01 10:05:00 |
| 3  | Carl  | 2024-09-01 10:10:00 |
| 4  | Dave  | 2024-09-01 10:15:00 |
| 5  | Emma  | 2024-09-01 10:20:00 |

### **Offset Pagination (traditional)**

* `GET /users?page=2&limit=2` → skip first 2, fetch next 2.
* Issues: If new users are inserted between requests, results shift (inconsistent).

### **Cursor Pagination**

* First call: `GET /users?limit=2` → returns Alice, Bob.
* Response includes a **cursor**: `"nextCursor": "created_at=2024-09-01 10:05:00"`.
* Next call: `GET /users?limit=2&cursor=2024-09-01 10:05:00` → returns Carl, Dave.

👉 The **cursor points to the last seen item**, so you always continue **from that exact spot**, even if new data is inserted.

---

## 🔹 Benefits of Cursor Pagination

✅ **More consistent** for real-time data (avoids duplicates or missing items if data changes).
✅ **Faster** for large datasets (no expensive `OFFSET n` scans).
✅ Works well for **infinite scroll** (social media feeds, chat apps).

---

## 🔹 Where It’s Used

* **Twitter/Instagram feeds** (scrolling posts).
* **Messaging apps** (load older messages when scrolling up).
* **APIs** (GitHub, GraphQL, Firebase, DynamoDB, etc. use cursor pagination).

---

👉 In short:
**Cursor = bookmark to continue fetching results from where you left off.**

---
