# System Design Interview Playbook

Use this page for every practice session. The topic notes are references; this is the repeatable process that turns them into an interview answer.

## The 45-minute flow

| Time | Goal | Output |
| --- | --- | --- |
| 0-5 min | Clarify scope | Functional requirements, users, out of scope |
| 5-10 min | Set scale | QPS, storage, bandwidth, latency, availability |
| 10-15 min | Define the contract | APIs, events, entities, important invariants |
| 15-25 min | Draw the baseline | Client, edge, services, data stores, async paths |
| 25-38 min | Deep dive | One bottleneck, consistency decision, and failure path |
| 38-43 min | Operate it | Metrics, alerts, retries, recovery, rollout |
| 43-45 min | Summarize | Trade-offs, limits, and the next improvement |

Do not begin with technology names. Start with the requirement or constraint that makes the technology useful.

## 1. Clarify the problem

Ask questions that change the design:

- Who are the users and what is the primary user journey?
- Which operations are reads, writes, real-time, or asynchronous?
- What must be strongly consistent, and what can be eventually consistent?
- What are the limits for payload size, retention, regions, privacy, and cost?
- Which features are explicitly out of scope for this round?

Write down assumptions. If an assumption is uncertain, give a range and explain how the design changes at either end.

## 2. Do a capacity estimate

Use simple numbers and show the arithmetic. For example:

```text
100 million users
10% daily active = 10 million DAU
20 requests/user/day = 200 million requests/day
average QPS = 200m / 86,400 ~= 2,300
peak QPS (10x) ~= 23,000
```

Estimate the quantities that affect architecture:

- Peak read and write QPS
- Average and peak payload bandwidth
- Storage per day and retention period
- Cache size and hot-key behavior
- Number of connections or queued messages
- Replication and recovery overhead

State whether each number is an estimate. Precision without evidence is not rigor.

## 3. Define contracts and invariants

Before choosing a database, write the important rules:

- An order cannot be paid twice.
- A seat can be confirmed for at most one customer.
- A message is not acknowledged until it is durably stored.
- A retry must not create a second side effect.

Then define a small API or event contract. Include idempotency keys, pagination, versioning, error behavior, and authorization where relevant.

## 4. Draw the baseline design

Show the request path first:

```text
client -> DNS/CDN -> load balancer -> stateless service -> cache/database
                                      \-> queue -> worker -> downstream system
```

Label every boundary where data can be lost, duplicated, delayed, or reordered. Add a component only when it solves a stated requirement.

## 5. Explain the key decisions

For each major choice, use this sentence:

> We choose **X** because **requirement/constraint**; the cost is **trade-off**; we mitigate it with **fallback or operational control**.

Cover the decisions that usually matter most:

- SQL, document, key-value, wide-column, or search store
- Partition key and hot-partition strategy
- Cache invalidation and stampede protection
- Synchronous versus asynchronous work
- At-most-once, at-least-once, or effectively-once processing
- Consistency model and conflict resolution
- Single-region, active-passive, or active-active deployment

## 6. Deep-dive failure modes

Walk through at least three failures:

| Failure | Expected behavior |
| --- | --- |
| Dependency timeout | Deadline, bounded retry, fallback, or fail fast |
| Duplicate request/event | Idempotency key or deduplication record |
| Queue backlog | Backpressure, rate control, and lag alert |
| Cache outage | Controlled database fallback and protection from overload |
| Region outage | Traffic switch, data-loss window, and recovery procedure |
| Partial write | Transaction, outbox, compensation, or reconciliation |

Do not claim “no data loss” or “exactly once” without describing the mechanism and its boundary.

## 7. Operate the system

Name the signals that prove the system is healthy:

- **Latency:** p50, p95, and p99 by endpoint
- **Traffic:** requests, active connections, and queue throughput
- **Errors:** timeouts, retries, rejected requests, and dependency failures
- **Saturation:** CPU, memory, connections, disk, partitions, and queue lag
- **Correctness:** duplicate rate, reconciliation failures, stale reads, and dropped events

Add an alert threshold, an owner, and a recovery action for the most important signal. Mention safe deployment, rollback, backups, restore testing, and capacity review.

## Practice template

Copy this checklist into a new design answer:

```text
Problem:
Users and primary use case:
Functional requirements:
Non-functional requirements:
Out of scope:
Assumptions and estimates:
APIs/events:
Data model and invariants:
Baseline architecture:
Key bottleneck:
Consistency and delivery guarantees:
Failure modes and recovery:
Observability:
Trade-offs:
What I would improve next:
```

## Self-scoring rubric

Score each category from 0 to 2 after every practice attempt:

| Category | 0 | 1 | 2 |
| --- | --- | --- | --- |
| Requirements | Assumptions hidden | Some clarification | Scope and priorities are explicit |
| Scale | No numbers | Rough numbers | Peak, storage, and bandwidth drive choices |
| Correctness | Happy path only | Some edge cases | Invariants and delivery guarantees are clear |
| Architecture | Components listed | Main flow works | Boundaries, bottlenecks, and alternatives are justified |
| Reliability | Generic “retry” | A few failures | Timeouts, backpressure, recovery, and operations are concrete |
| Communication | Unstructured | Understandable | Clear progression and concise trade-offs |

Target 10/12 before increasing difficulty. Keep the weakest category as the focus of the next practice session.

## Suggested progression

1. **Foundation:** URL shortener, rate limiter, file storage, notification service.
2. **Intermediate:** chat, news feed, ticket booking, video streaming.
3. **Advanced:** ride sharing, collaborative editor, global payments, multi-region search.

For each design, produce one diagram, one capacity estimate, one API/data model, three failure cases, and one paragraph of trade-offs.