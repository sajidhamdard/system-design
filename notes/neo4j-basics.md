# Neo4j Basics

## Overview
**Neo4j** is a **graph database** designed to efficiently store, query, and traverse **graph data**.  
It is based on the **property graph model**, making it ideal for **social networks, recommendation engines, fraud detection, and knowledge graphs**.

---

## 1. Property Graph Model

### Components
| Component | Description |
|-----------|-------------|
| **Node** | Represents an entity (e.g., Person, Product). |
| **Relationship** | Connects nodes and describes the type of connection (e.g., `FRIENDS_WITH`). |
| **Properties** | Key-value pairs associated with nodes or relationships (e.g., `name: "Alice"`). |
| **Labels** | Categorize nodes for easy querying (e.g., `:Person`, `:Movie`). |

### Example
```

(:Person {name: "Alice", age: 30})-[:FRIENDS_WITH]->(:Person {name: "Bob", age: 25})

````

- Node Alice is labeled `Person` with properties `name` and `age`.
- Relationship `FRIENDS_WITH` connects Alice to Bob.

---

## 2. Neo4j Architecture

- **Native Graph Storage:** Stores nodes and relationships directly, optimized for graph traversals.  
- **ACID-compliant:** Ensures **atomicity, consistency, isolation, and durability**.  
- **Indexing:** Supports indexes on node labels and properties for faster queries.  
- **Traversal Engine:** Efficiently follows relationships for queries like shortest path or pattern matching.

---

## 3. Cypher Query Language

**Cypher** is Neo4j’s declarative query language, optimized for **graph patterns**.  

### 3.1 Basic Queries

#### Create Nodes
```cypher
CREATE (a:Person {name: 'Alice', age: 30})
CREATE (b:Person {name: 'Bob', age: 25})
````

#### Create Relationships

```cypher
MATCH (a:Person {name: 'Alice'}), (b:Person {name: 'Bob'})
CREATE (a)-[:FRIENDS_WITH]->(b)
```

#### Read Nodes

```cypher
MATCH (p:Person)
RETURN p.name, p.age
```

#### Read Relationships

```cypher
MATCH (a:Person)-[r:FRIENDS_WITH]->(b:Person)
RETURN a.name, b.name
```

---

### 3.2 Filtering and Conditions

```cypher
MATCH (p:Person)
WHERE p.age > 25
RETURN p.name, p.age
```

---

### 3.3 Updating Data

```cypher
MATCH (p:Person {name: 'Alice'})
SET p.age = 31
RETURN p
```

---

### 3.4 Deleting Nodes and Relationships

```cypher
MATCH (p:Person {name: 'Bob'})
DETACH DELETE p
```

> `DETACH DELETE` removes the node and all its relationships.

---

## 4. Common Graph Operations

| Operation                | Cypher Example                                                                                      |
| ------------------------ | --------------------------------------------------------------------------------------------------- |
| Find friends of a person | `MATCH (a:Person {name:'Alice'})-[:FRIENDS_WITH]->(b) RETURN b.name`                                |
| Shortest path            | `MATCH p=shortestPath((a:Person {name:'Alice'})-[:FRIENDS_WITH*]-(b:Person {name:'Eve'})) RETURN p` |
| Count nodes              | `MATCH (p:Person) RETURN count(p)`                                                                  |
| Aggregation              | `MATCH (p:Person) RETURN avg(p.age)`                                                                |

---

## 5. Indexes and Constraints

* **Create Index**

```cypher
CREATE INDEX FOR (p:Person) ON (p.name)
```

* **Create Unique Constraint**

```cypher
CREATE CONSTRAINT unique_name ON (p:Person) ASSERT p.name IS UNIQUE
```

* Indexes speed up lookups, and constraints ensure **data integrity**.

---

## 6. Use Cases

* **Social Networks:** Friend/follower graphs
* **Recommendation Engines:** Product or content recommendations based on relationships
* **Fraud Detection:** Identify suspicious patterns in financial transactions
* **Knowledge Graphs:** Connect entities and relationships for semantic queries
* **Network & IT Ops:** Dependency and infrastructure mapping

---

## 7. Best Practices

* Model data as **nodes and relationships**, avoid flattening graphs into tables.
* Use **labels and properties** wisely for efficient queries.
* Apply **indexes** on frequently queried properties.
* Use **`DETACH DELETE`** cautiously to avoid accidental data loss.
* Leverage **pattern matching** in Cypher for complex traversals instead of iterative queries.

---

## References

* [Neo4j Official Documentation](https://neo4j.com/docs/)
* [Cypher Query Language Guide](https://neo4j.com/developer/cypher/)
* [Neo4j Property Graph Model](https://neo4j.com/developer/graph-database/)
* [Graph Data Modeling Best Practices](https://neo4j.com/developer/graph-data-modeling/)

```
