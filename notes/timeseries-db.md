A **time-series database (TSDB)** is a specialized type of database optimized for storing, retrieving, and analyzing time-stamped (time-series) data. This kind of data is very common in **IoT, monitoring, finance, DevOps metrics, sensor data, and event logging**.

---

### 🔹 What is OpenTSDB?

* **OpenTSDB (Open Time Series Database)** is built on **HBase** (a distributed, scalable big-data store on top of Hadoop).
* It’s designed to **store billions of data points per day** while providing **fast lookups and aggregations**.
* Often used for **metrics collection, monitoring, and graphing** at large scale (e.g., server performance monitoring, DevOps, etc.).
* Uses a **key-value schema** with efficient compression for time-series data.

---

### 🔹 Other Popular Time-Series Databases (TSDBs)

1. **InfluxDB**

   * Purpose-built time-series DB.
   * SQL-like query language (**InfluxQL**) or **Flux** language.
   * High performance for writes/queries.
   * Popular for monitoring, IoT, real-time analytics.

2. **Prometheus**

   * Open-source monitoring system + TSDB.
   * Pull-based metrics collection (scraping endpoints).
   * Widely used in **Kubernetes and cloud-native monitoring**.
   * Strong integration with **Grafana** for dashboards.

3. **TimescaleDB**

   * Extension on **PostgreSQL**.
   * Combines SQL familiarity with time-series optimizations.
   * Good for analytics + relational joins + time-series queries.
   * Used in **financial data, IoT, and analytics-heavy workloads**.

4. **Graphite**

   * One of the older TSDBs.
   * Focused on **storing numeric time-series metrics**.
   * Often paired with **Grafana** for visualization.

5. **VictoriaMetrics**

   * High-performance, cost-efficient alternative to Prometheus.
   * Handles long-term storage efficiently.
   * Often used as a **drop-in replacement** for Prometheus TSDB.

6. **Kdb+**

   * Commercial, very fast TSDB.
   * Used heavily in **financial services (stock tick data, trading analytics)**.
   * Proprietary, but known for extreme performance at scale.

---

### 🔹 When to Use a TSDB?

Use one when you need:

* Efficient **storage and compression** of time-series data.
* **High write throughput** (millions of inserts per second).
* Queries like:

  * Average CPU usage over 5 minutes.
  * Max stock price in last 24h.
  * Trends, downsampling, anomaly detection.

---
