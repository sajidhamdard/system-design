## **1️⃣ Partial Booking → Temporary Hold with Expiry**

* **Problem:** In booking systems (e.g., airline tickets, hotel rooms), multiple users may try to book the same resource simultaneously.
* **Solution:** Use **Redis** to place a **temporary hold** on the item.

  * Store the booked item in Redis with a **TTL (Time To Live)**.
  * If the user completes the booking, sync with the DB.
  * If the TTL expires, the hold is automatically released.

**Example:**

```text
User selects seat 12A → Redis key: "seat:12A" = "held" (expires in 5 min)
```

✅ Pros:

* Very fast (Redis is in-memory).
* Automatically cleans up expired holds.

---

## **2️⃣ Rollback → Auto-expiry + Compensation (not XA transaction)**

* **Problem:** Distributed transactions (DB + Redis) cannot always use **XA transactions** (two-phase commit) due to complexity.
* **Solution:** Use **auto-expiry** in Redis + **compensation logic** in the DB:

  * Redis key expires → system triggers a **rollback or compensating action** in the DB.
  * Example: Refund reserved amount, release inventory.

**Example Flow:**

```
User holds item → TTL expires → Job detects expired hold → Release DB lock → Refund amount
```

✅ Pros:

* Avoids complex distributed transactions.
* Handles failures gracefully.

---

## **3️⃣ Concurrency → Row Lock or Optimistic Versioning**

* **Problem:** Multiple users may try to update the same row in the DB concurrently.
* **Strategies:**

  1. **Row-level locking (pessimistic):** Lock the DB row when updating.

     * Pros: No conflicts.
     * Cons: May block other transactions → less concurrency.
  2. **Optimistic versioning:** Use a **version column** to detect conflicts.

     * Pros: High concurrency, no blocking.
     * Cons: Need retry logic if version mismatch occurs.

**Example:**

```sql
UPDATE bookings
SET status='confirmed', version=version+1
WHERE id=123 AND version=2;
-- fails if version changed
```

---

## **4️⃣ System Crash Recovery → Cleanup via Cron/Job**

* **Problem:** System may crash after a hold is placed in Redis but before syncing with DB.
* **Solution:** Use a **scheduled cleanup job** (cron or background worker):

  * Scan Redis for expired or orphaned keys.
  * Release any associated locks or resources in the DB.

**Example Flow:**

```
Cron job runs every minute → Checks Redis for expired holds → Releases DB rows/resources → Logs cleanup
```

✅ Pros:

* Ensures system consistency even after crashes.
* Prevents **stale locks or ghost bookings**.

---

### **Putting it all together: Workflow**

1. User requests booking → place temporary hold in Redis with TTL.
2. User confirms → update DB with **optimistic versioning or row lock**.
3. If user cancels or TTL expires → compensation logic releases DB resources.
4. Cron/cleanup job ensures **system crash recovery**.

---
