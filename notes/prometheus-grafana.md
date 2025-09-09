## **Prometheus**

* **What it is**: Open-source **monitoring and alerting tool**.
* **What it does**: Collects **metrics** (numeric data) from your apps & infrastructure (CPU, memory, requests/sec, DB latency, etc.).
* **How it works**:

  * Apps expose metrics in a special format (HTTP endpoint like `/metrics`).
  * Prometheus **scrapes** this data at intervals.
  * Stores it in a **time-series database** (values with timestamps).
* **Extras**: Has its own query language (PromQL). Often paired with **Grafana** for visualization.

---

## **Grafana**

* **What it is**: Open-source **visualization & dashboarding tool**.
* **What it does**: Shows data from different sources (Prometheus, Elasticsearch, MySQL, InfluxDB, etc.) in **charts, graphs, and dashboards**.
* **Why use it**: Helps you see system health, business KPIs, or infra metrics in real time.
* **Extras**: Can set up alerts (e.g., if CPU > 90%, send Slack/Email).

---

## **How they work together**

* **Prometheus** = collects & stores metrics.
* **Grafana** = visualizes those metrics in dashboards.

👉 Example:

1. Prometheus scrapes `http_requests_total` from your app.
2. Grafana shows a live graph of requests per second.
3. If it spikes abnormally, Grafana alerts you.

---

⚡ So in short:

* **Prometheus → Monitoring & Metrics collection**
* **Grafana → Visualization & Dashboards**

---
