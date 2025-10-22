# Event Sourcing

## Overview
**Event Sourcing** is a design pattern where **all changes to application state are stored as a sequence of immutable events**, rather than directly storing the current state.  
This approach provides **auditability, temporal queries, and better traceability** for distributed systems, especially when combined with **CQRS** and **microservices**.

---

## 1. Key Concepts

| Concept | Description |
|---------|-------------|
| **Event** | Immutable record of a state-changing action (e.g., `OrderCreated`, `PaymentProcessed`). |
| **Event Store** | Storage system for persisting events (can be relational DB, NoSQL, or specialized event store). |
| **Aggregate** | Domain object whose state is derived by replaying events. |
| **Replay** | Reconstructing current state by applying events in order. |
| **Projection** | Read-optimized view of events for queries. |

---

## 2. Event Store

### Definition
The **event store** is the primary source of truth in event sourcing. It **persists events in order** and supports:

- Appending new events  
- Querying events by aggregate ID  
- Reconstructing state via replay  
- Event versioning for schema evolution  

### Storage Options
| Option | Description |
|--------|-------------|
| **Relational DB** | Store events as JSON/serialized objects in tables |
| **NoSQL DB** | Document-oriented storage (MongoDB, Cassandra) |
| **Specialized Event Store** | EventStoreDB, Kafka (as an event log) |

### Example – Event Table Schema
| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Unique event ID |
| `aggregate_id` | UUID | ID of the aggregate |
| `event_type` | String | Type of event (e.g., `OrderCreated`) |
| `payload` | JSON | Event data |
| `timestamp` | DateTime | Event creation time |
| `version` | Integer | Event sequence number |

---

## 3. Writing Events

- Every **state-changing command** produces one or more events.  
- Events are **appended** to the event store **atomically**.  
- Example: `OrderService` processing a `CreateOrder` command.

```java
OrderCreatedEvent event = new OrderCreatedEvent(orderId, amount, userId);
eventStore.appendEvent(orderId, event);
````

---

## 4. Replaying Events

### Purpose

Replaying events **reconstructs the current state** of an aggregate or projection.

### Example – Aggregate State Reconstruction

```java
public class OrderAggregate {
    private String orderId;
    private int amount;
    private String status;

    public void replay(List<Event> events) {
        for (Event e : events) {
            if (e instanceof OrderCreatedEvent oc) {
                this.orderId = oc.getOrderId();
                this.amount = oc.getAmount();
                this.status = "CREATED";
            } else if (e instanceof PaymentProcessedEvent pp) {
                this.status = pp.isSuccess() ? "PAID" : "FAILED";
            }
        }
    }
}
```

### Snapshots

* Replaying **all events** can become slow if many events exist.
* **Snapshots** periodically store aggregate state to speed up reconstruction.

---

## 5. Event Sourcing Workflow

```
[Command] → [Validate] → [Generate Event(s)] → [Append to Event Store] → [Update Projections / Notify Subscribers]
```

1. **Command**: Request to change state (e.g., `CreateOrder`)
2. **Validation**: Business rules check
3. **Event Generation**: Produce immutable events
4. **Persist Event**: Append to event store
5. **Projection Update**: Update read models for queries
6. **Notification**: Publish events to other services (optional)

---

## 6. Integration with CQRS

* **Commands**: Generate events that modify state (write model)
* **Queries**: Read from projections (read model) built from event streams
* **Benefits**:

  * Decouples reads from writes
  * Enables multiple read models for different use cases
  * Supports eventual consistency in distributed systems

---

## 7. Advantages

* Full **audit trail** of every state change
* Easy **debugging and temporal queries** (query past states)
* Natural fit for **event-driven architectures**
* Supports **scalability**: multiple services can subscribe to event streams

---

## 8. Challenges

* **Event schema evolution**: Changing event structure without breaking replay
* **Replaying large event streams** can be slow without snapshots
* Complexity in implementing **transactional consistency** and **idempotency**
* Requires careful design of **projections** and **read models**

---

## 9. Event Versioning & Evolution

* Maintain **backward-compatible event formats**
* Use **version numbers** or **event type changes** to handle schema changes
* Optionally transform old events during replay using **upcasters**

---

## 10. Example Event Stream – Order Lifecycle

| Event              | Payload                                     |
| ------------------ | ------------------------------------------- |
| `OrderCreated`     | `{orderId: 123, amount: 500, userId: 567}`  |
| `PaymentProcessed` | `{orderId: 123, status: SUCCESS}`           |
| `OrderShipped`     | `{orderId: 123, shippedAt: "2025-10-22"}`   |
| `OrderDelivered`   | `{orderId: 123, deliveredAt: "2025-10-25"}` |

Replaying this event stream reconstructs the **complete state** of the order.

---

## 11. Best Practices

* Use **immutable events**
* Store **enough metadata** (timestamps, version, userId, traceId)
* Keep **events small and focused**
* Implement **snapshots** for aggregates with long event histories
* Use **projections** for read-optimized views
* Integrate with **message brokers** (Kafka, RabbitMQ) for event-driven microservices

---

## References

* [Martin Fowler – Event Sourcing](https://martinfowler.com/eaaDev/EventSourcing.html)
* [EventStoreDB Documentation](https://www.eventstore.com/)
* [CQRS + Event Sourcing Patterns – Microsoft Docs](https://docs.microsoft.com/en-us/azure/architecture/patterns/event-sourcing)
* [Event Sourcing with Java – Baeldung](https://www.baeldung.com/cqrs-event-sourcing)

```
