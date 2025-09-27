A **Graph Database (GraphDB)** is a type of database that uses **graph structures** (nodes, edges, and properties) to represent and store data, instead of traditional rows and tables (relational DB) or documents (NoSQL).

It’s designed to **efficiently manage and query highly connected data**, like social networks, recommendation systems, fraud detection, and knowledge graphs.

---

## 🔑 Core Concepts

1. **Nodes (Vertices)**

   * Entities or objects.
   * Example: A person, a product, a city.

2. **Edges (Relationships)**

   * Connections between nodes.
   * Example: "FRIENDS_WITH", "BOUGHT", "LOCATED_IN".

3. **Properties**

   * Key-value pairs attached to nodes or edges.
   * Example: A `Person` node may have `{name: "Sajid", age: 35}`.

---

## ⚙️ How It Works

* Instead of joining tables (like in SQL), relationships are **stored directly** in the database.
* This makes **traversing relationships** (e.g., finding shortest paths, recommendations) much faster.

Example query:
*"Find all friends of Sajid who live in Mumbai"*

* In SQL: multiple JOINs across Person and City tables.
* In GraphDB: start at Sajid → follow "FRIENDS_WITH" edges → filter by "LOCATED_IN = Mumbai".

---

## 🛠️ Popular Graph Databases

* **Neo4j** (most widely used)
* **Amazon Neptune** (AWS-managed graph DB)
* **ArangoDB** (multi-model)
* **OrientDB**
* **JanusGraph**

---

## 🔍 Query Languages

* **Cypher** (Neo4j) → `MATCH (a:Person)-[:FRIENDS_WITH]->(b:Person) RETURN b`
* **Gremlin** (Apache TinkerPop)
* **SPARQL** (for RDF/triple-store based graph DBs)

---

## ✅ Advantages

* Handles **complex relationships** naturally.
* Faster queries for **connected data**.
* Flexible schema (can evolve easily).
* Great for graph algorithms (shortest path, centrality, clustering).

---

## ⚠️ Limitations

* Not always the best for **large transactional workloads** (where RDBMS excels).
* Learning curve (new data model + query language).
* Fewer mature tools compared to SQL databases.

---
