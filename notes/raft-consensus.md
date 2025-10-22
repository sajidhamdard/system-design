# Raft Consensus Algorithm

## Overview
**Raft** is a consensus algorithm designed to manage a **replicated log** in distributed systems, ensuring that multiple nodes agree on a **single sequence of commands**.  
Raft emphasizes **understandability** and is widely used in systems like **etcd, Consul, and CockroachDB**.

---

## 1. Key Concepts

| Term | Description |
|------|-------------|
| **Leader** | Node responsible for handling client requests and replicating log entries. |
| **Follower** | Passive nodes that replicate logs from the leader and respond to requests. |
| **Candidate** | Node that requests votes to become a leader during elections. |
| **Term** | Logical time period in Raft, incremented during elections. |
| **Log Entry** | Client command stored in the replicated log along with the term. |
| **Commit Index** | Index of the highest log entry known to be committed. |
| **Snapshot** | Compressed state of the log to avoid replaying long histories. |

---

## 2. Raft Overview

Raft breaks down consensus into **three subproblems**:

1. **Leader Election** – Selecting a single leader to coordinate log replication.
2. **Log Replication** – Ensuring that all followers’ logs match the leader’s log.
3. **Safety** – Ensuring that committed entries are never lost or overwritten.

---

## 3. Raft Roles and State

### 3.1 Leader
- Handles **all client requests**.
- Appends new log entries and replicates them to followers.
- Sends **heartbeat messages** to maintain authority.

### 3.2 Follower
- Responds to **leader requests** and **vote requests**.
- Converts to **candidate** if no heartbeat is received within a timeout.

### 3.3 Candidate
- Starts an **election** by requesting votes from other nodes.
- Becomes **leader** if it gets a majority of votes.

---

## 4. Raft Protocol Steps

### 4.1 Leader Election
1. Follower timeout triggers **election**.
2. Follower becomes **candidate**, increments current term.
3. Candidate requests votes from other nodes.
4. Candidate wins if it gets a **majority**; otherwise, retries in next term.

### 4.2 Log Replication
1. Leader receives a client command and appends it to its log.
2. Leader sends **AppendEntries RPCs** to followers.
3. Followers append entries to their logs.
4. Once a majority acknowledges, leader marks entries as **committed**.
5. Followers update their commit index and apply commands to their state machines.

### 4.3 Safety
- Raft ensures **logs are consistent** across nodes:
  - A log entry in a higher term always contains all committed entries from previous terms.
  - Followers never overwrite committed entries.

---

## 5. Raft Example

**Scenario:** Cluster with 3 nodes (A, B, C)

1. A becomes leader in term 5.  
2. Client sends `Set(x=10)` to A.  
3. A appends entry `(term=5, command=Set(x=10))` to its log.  
4. A replicates to B and C.  
5. Once 2/3 nodes (majority) confirm, entry is committed.  
6. Followers apply the entry to their state machine.

---

## 6. Advantages of Raft

- **Understandable and practical** – easier to implement than Paxos.  
- Strong **leader-based consistency** simplifies replication.  
- **Fault-tolerant** – tolerates `f` failures in `2f+1` nodes.  
- **Efficient log replication** with heartbeats and snapshots.  
- Supports **linearizable consistency** for client operations.

---

## 7. Raft vs Paxos

| Feature | Raft | Paxos |
|---------|------|-------|
| **Understandability** | Easy to understand and implement | Conceptually harder |
| **Leader Election** | Explicit leader | No explicit leader (leaderless Paxos) |
| **Log Replication** | Built-in log replication | Focuses on consensus on single values |
| **Performance** | Efficient with a stable leader | Can be slower for repeated proposals |
| **Use Cases** | etcd, Consul, CockroachDB | Chubby, Zookeeper |

---

## 8. Use Cases

- **Distributed Key-Value Stores**: etcd, Consul  
- **Configuration Management**: Cluster configuration synchronization  
- **Leader Election Services**: Coordinating distributed tasks  
- **State Machine Replication**: Fault-tolerant microservices and databases  
- **Highly Available Systems**: Systems requiring linearizable reads/writes

---

## 9. Raft Best Practices

- Keep **cluster size odd** to maximize fault tolerance.  
- Use **leader stickiness** to reduce unnecessary elections.  
- Implement **log compaction / snapshotting** for long-running systems.  
- Monitor **heartbeat and election timeouts** to detect failures quickly.  
- Use **idempotent client commands** to avoid duplicate application during retries.

---

## 10. Summary

- Raft provides **strong consistency** for distributed systems.  
- Roles: **Leader, Follower, Candidate**  
- Subproblems: **Leader Election, Log Replication, Safety**  
- Ensures **fault-tolerance**, **linearizable consistency**, and **high availability**.  
- Widely used in **modern distributed databases and coordination services**.

---

## References

- [Raft Paper – Diego Ongaro, John Ousterhout](https://raft.github.io/raft.pdf)  
- [Raft Consensus Algorithm Explained – Understandable](https://raft.github.io/)  
- [etcd Documentation – Raft Implementation](https://etcd.io/docs/v3.5/learning/raft/)  
- [Consul Raft Guide](https://www.consul.io/docs/architecture/raft)
