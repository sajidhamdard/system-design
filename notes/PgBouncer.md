## 🧠 **What is PgBouncer?**

**PgBouncer** is a **lightweight PostgreSQL connection pooler**.

It sits **between your application and the PostgreSQL database**, managing and reusing connections efficiently instead of creating new ones for every request.

---

## ⚙️ **Why We Need PgBouncer**

By default, PostgreSQL:

* Creates a **new process** for every client connection.
* Each connection consumes **significant memory and CPU**.
* Thousands of short-lived connections can easily **overload** PostgreSQL.

👉 This is where **PgBouncer** helps.

It **keeps a pool of connections open to the database** and reuses them for incoming client requests — **saving overhead** and improving performance.

---

## 🧩 **How PgBouncer Works**

### Architecture:

```
[Your App]  <---->  [PgBouncer]  <---->  [PostgreSQL Database]
```

1. Your app connects to PgBouncer (instead of PostgreSQL directly).
2. PgBouncer maintains a **pool** of active DB connections.
3. When the app requests a connection:

   * PgBouncer gives it a **pooled** connection (if available).
   * When done, PgBouncer **returns it to the pool** for reuse.

---

## 🔁 **Pooling Modes**

PgBouncer supports **three pooling modes**:

| Mode                    | Description                                                | Use Case                                                      |
| ----------------------- | ---------------------------------------------------------- | ------------------------------------------------------------- |
| **Session pooling**     | A client gets one DB connection for its entire session.    | Default mode, good for most apps.                             |
| **Transaction pooling** | Connection is returned to the pool after each transaction. | Best for web apps with short transactions.                    |
| **Statement pooling**   | Connection is returned after each SQL statement.           | High concurrency systems, but not all queries are compatible. |

---

## 📈 **Benefits of PgBouncer**

✅ **Faster connection handling** (no need to fork a new PostgreSQL process per connection)
✅ **Lower memory usage** on PostgreSQL
✅ **Better scalability** — can handle thousands of concurrent app connections
✅ **Failover and load balancing** (in some setups)
✅ **Supports connection limits and timeouts**
✅ **Can handle database restarts gracefully**

---

## 🧰 **Common Use Cases**

* Web apps (like Spring Boot, Django, Node.js) with **short, frequent DB queries**
* **Microservices** architecture where each service opens multiple DB connections
* **Serverless apps** where connection churn is very high
* High-traffic APIs needing stable, low-latency DB access

---

## 💻 **Basic Example**

### Step 1: Install PgBouncer

```bash
sudo apt install pgbouncer
```

### Step 2: Edit the configuration (`/etc/pgbouncer/pgbouncer.ini`)

```ini
[databases]
mydb = host=127.0.0.1 port=5432 dbname=mydb user=myuser password=mypassword

[pgbouncer]
listen_addr = 0.0.0.0
listen_port = 6432
auth_type = md5
auth_file = /etc/pgbouncer/userlist.txt
pool_mode = transaction
max_client_conn = 1000
default_pool_size = 100
```

### Step 3: Start PgBouncer

```bash
sudo service pgbouncer start
```

### Step 4: Connect your app

Instead of connecting to PostgreSQL on `port 5432`, connect to PgBouncer on `port 6432`.

---

## 🧠 **Example in Java (JDBC)**

```java
String url = "jdbc:postgresql://localhost:6432/mydb";
String username = "myuser";
String password = "mypassword";

Connection connection = DriverManager.getConnection(url, username, password);
```

That’s it — PgBouncer will handle the pooling behind the scenes.

---

## 🚨 **Things to Watch Out For**

* In **transaction pooling mode**, you **cannot use session-level features** like:

  * Temporary tables
  * Session variables
  * Prepared statements that persist beyond a single transaction
* PgBouncer does not replace an ORM’s **application-level connection pool** (like HikariCP).
  👉 It sits **below** it — at the network/database layer.

---

## 🧩 **Analogy**

Think of PostgreSQL as a restaurant kitchen 🍳
Each “connection” is a waiter.
If every customer brought their own waiter — chaos!
PgBouncer is the **restaurant manager** who reuses a small team of waiters efficiently between customers 😄

---
