# Paxos Consensus Algorithm

## Overview
The **Paxos algorithm** is a fundamental **consensus protocol** used in distributed systems to ensure that multiple nodes agree on a single value, even in the presence of **failures or network partitions**.  
It is widely used in **distributed databases, coordination services (e.g., Chubby, Zookeeper)**, and fault-tolerant systems.

---

## 1. Key Concepts

| Term | Description |
|------|-------------|
| **Consensus** | Agreement among distributed nodes on a single value. |
| **Proposer** | Node that proposes a value for agreement. |
| **Acceptor** | Node that decides whether to accept a proposed value. |
| **Learner** | Node that learns the final agreed value. |
| **Quorum** | Minimum number of nodes that must agree to make a decision (typically >50%). |

---

## 2. Problem Paxos Solves

- Distributed systems need a **single source of truth**.  
- Nodes may **fail** or messages may be **delayed** or **duplicated**.  
- Paxos guarantees **safety** (no two nodes decide differently) and **liveness** (a value is eventually chosen) under certain assumptions.  

---

## 3. Roles in Paxos

1. **Proposer**
   - Suggests a value to be chosen.
   - Coordinates the consensus process.

2. **Acceptor**
   - Votes to accept or reject proposed values.
   - Maintains the highest proposal number seen to ensure consistency.

3. **Learner**
   - Learns the value once a quorum of acceptors agrees.
   - Can be the proposer itself or separate nodes.

---

## 4. Basic Paxos Protocol Steps

### Step 1: Prepare
- Proposer selects a **proposal number (n)** and sends a `Prepare(n)` request to a majority of acceptors.
- Acceptors respond with:
  - Promise not to accept proposals numbered less than `n`
  - Previous accepted value (if any)

### Step 2: Accept
- If the proposer receives responses from a **quorum**, it sends `Accept(n, value)` to acceptors.
- Value chosen:
  - If any acceptor has already accepted a value, proposer must use the **highest-numbered accepted value**.
  - Otherwise, proposer can use its own value.

### Step 3: Learn
- Acceptors accept the proposal if it meets the promise conditions.
- Once a **quorum of acceptors** accepts a value, it is considered **chosen**.
- Learners are notified of the chosen value.

---

## 5. Paxos Example

**Scenario:** Three nodes A, B, C want to agree on a value.

1. **Proposer A** proposes `X` with proposal number `1`.
2. Sends `Prepare(1)` to B and C.
3. B and C promise not to accept lower numbers; no previous values.
4. A sends `Accept(1, X)`.
5. B and C accept `X`.
6. Quorum reached → `X` is chosen.

**Key Rule:** If multiple proposers exist, proposal numbers ensure **no conflicting decisions**.

---

## 6. Multi-Paxos

- **Single-Paxos** chooses one value.
- **Multi-Paxos** extends Paxos to repeatedly agree on a sequence of values.
- Useful for **replicated logs** in distributed databases.

**Optimization:**  
- One leader proposer can reduce message rounds for repeated proposals.

---

## 7. Guarantees

| Guarantee | Explanation |
|-----------|-------------|
| **Safety** | No two nodes decide differently on the same instance. |
| **Liveness** | Eventually, some value is chosen if a majority of nodes are operational. |
| **Fault Tolerance** | Can tolerate up to `f` failures in `2f+1` nodes. |

---

## 8. Challenges

- **Complexity:** Paxos is difficult to implement correctly.
- **Performance:** Multiple message rounds per value; can be slow.
- **Leader Election:** Multi-Paxos requires leader coordination for efficiency.

---

## 9. Variants / Alternatives

- **Raft** – Easier-to-understand consensus algorithm, similar guarantees.
- **EPaxos** – Efficient, leaderless, and low-latency Paxos variant.
- **Fast Paxos** – Reduces the number of message delays in some cases.

---

## 10. Summary

- Paxos ensures **consensus in unreliable distributed systems**.  
- Roles: **Proposer, Acceptor, Learner**  
- Steps: **Prepare → Accept → Learn**  
- Guarantees **safety** and **fault-tolerance**.  
- Multi-Paxos is used for **replicated logs and continuous consensus**.

---

## References

- [Lamport, Leslie – The Part-Time Parliament (Paxos Paper)](https://lamport.azurewebsites.net/pubs/lamport-paxos.pdf)  
- [Paxos Made Simple – Leslie Lamport](https://lamport.azurewebsites.net/pubs/paxos-simple.pdf)  
- [Raft vs Paxos – Understanding Consensus](https://raft.github.io/)
- [EPaxos: Efficient Generalized Paxos](https://www.usenix.org/conference/osdi14/technical-sessions/presentation/zhang)
