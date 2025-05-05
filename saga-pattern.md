## Handling **failure & rollback** when **multiple microservices** are involved.

---

## 1️⃣ **Concept: Why it’s hard?**

In monolith:
Single DB transaction → rollback is easy (ACID).

In microservices:
Each service has **its own DB** → No global DB transaction → Rollback is hard → We need **Distributed Transaction Pattern**.

## 🛠️ **Industry solutions**

✅ **Saga Pattern** (Most common) — recommended for your answer
✅ 2PC (Two-phase commit) — theoretical, but impractical in microservices (avoid suggesting it)

---

## 2️⃣ **What to say (Your project - Real Example)**

> "In our project, we follow the **Saga pattern** using **Kafka** to manage distributed transactions. Let me take an example:
> Suppose we have an **Order Service**, **Payment Service**, and **Inventory Service** working together in a transaction."

### ✅ **Steps**

| Step | Action                                                              |
| ---- | ------------------------------------------------------------------- |
| 1    | **Order Service** creates an order (status = PENDING)               |
| 2    | Publishes `OrderCreated` event to Kafka                             |
| 3    | **Inventory Service** reserves items, publishes `InventoryReserved` |
| 4    | **Payment Service** deducts payment, publishes `PaymentCompleted`   |
| 5    | **Order Service** receives all success → marks order **COMPLETED**  |

### ❌ **If failure happens? (say Payment fails)**

| Step                  | Action                                           |
| --------------------- | ------------------------------------------------ |
| Payment fails         | Publishes `PaymentFailed` event                  |
| **Inventory Service** | Consumes event → **releases reserved inventory** |
| **Order Service**     | Cancels order (status = CANCELLED)               |

This is called a **Compensating Transaction** → reverse the earlier steps.

---

## 3️⃣ **Words you should confidently say in interview**

Here’s an exact sentence you can memorize and say:

> *“We handle such failures using the **Saga pattern** with **Kafka**. Each service publishes events and performs local transactions. If any step fails, compensating actions are triggered to undo previous steps and bring the system to a consistent state. For example, if payment fails, inventory is released and the order is cancelled. This ensures eventual consistency without needing distributed locks or global transactions.”*

---

## 🚀 **Bonus (Advanced)**

> We also ensure **idempotency** (via unique transaction IDs) so retrying compensating actions doesn’t cause duplicate processing.

---

## **Summary to say in one line**

💡 “We use **Saga pattern + Kafka + Compensating transactions** to rollback and ensure eventual consistency in distributed workflows.”

---

**(Order → Inventory → Payment → Rollback)** is **Saga pattern** — and there are **two styles** of implementing Saga:

---

| **Saga Type**              | **Orchestration**                                            | **Choreography**                                                                                                        |
| -------------------------- | ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| **Who controls the flow?** | Central controller (Orchestrator service)                    | No central controller — services react to events                                                                        |
| **Communication**          | Orchestrator calls services directly (via REST or messaging) | Services emit/consume events via broker (like Kafka)                                                                    |
| **Example flow**           | Orchestrator → Inventory → Payment → Order → Compensation    | Order emits `OrderCreated` → Inventory listens → emits `InventoryReserved` → Payment listens → emits `PaymentCompleted` |
| **Complexity**             | Simpler to understand (central brain)                        | Fully decoupled but harder to debug                                                                                     |
| **Tools**                  | Camunda, Temporal, Axon                                      | Kafka, RabbitMQ, EventBridge                                                                                            |

---

## ✅ **Your project?**

Since you are using **Kafka** and **services publish/consume events**,
Your approach = **Saga pattern (Choreography)**

---

## **In interview**, confidently say:

> "We implement the **Saga pattern (choreography-based)** using **Kafka**. Each service emits and listens to events, and performs compensating transactions on failure to rollback the workflow and ensure eventual consistency."

---

## 🚀 **Bonus Tip (Interview)**

If interviewer asks:

**Q** — When would you choose Orchestration vs Choreography?
Say this:

> * If flow is **simple and linear** → Choreography is good
> * If flow is **complex (many branches)** or **needs central monitoring** → Orchestration is better

---

# ✅ **How Orchestrator works (Saga Pattern - Orchestration)**

👉 There is **1 central Orchestrator service**
👉 It talks to other services (Order, Payment, Inventory, etc.)
👉 It decides the **next step** and handles failures

Think of it as:

```
Orchestrator Service → Calls Order Service
                     → Then calls Payment Service
                     → Then calls Inventory Service
```

If any step fails → it triggers **compensating transactions**.

---

# 📊 **Example Scenario**

We have:

* **Order Service** → Creates Order
* **Payment Service** → Deducts money
* **Inventory Service** → Reserve item

---

## 1️⃣ **Architecture Diagram**

```
Client → Orchestrator
            |
            ↓
    Order Service → Payment Service → Inventory Service
```

---

## 2️⃣ **Spring Boot Example (Code)**

### 🛠️ **OrchestratorController.java**

```java
@RestController
@RequestMapping("/orchestrator")
public class OrchestratorController {

    @Autowired
    private OrchestratorService orchestratorService;

    @PostMapping("/createOrder")
    public ResponseEntity<String> createOrder(@RequestBody OrderRequest request) {
        orchestratorService.startOrderWorkflow(request);
        return ResponseEntity.ok("Order process started");
    }
}
```

### 🛠️ **OrchestratorService.java**

```java
@Service
public class OrchestratorService {

    @Autowired
    private RestTemplate restTemplate;  // Simple for demo (or FeignClient)

    public void startOrderWorkflow(OrderRequest request) {
        try {
            // 1. Call Order Service
            String orderResponse = restTemplate.postForObject("http://ORDER-SERVICE/api/order", request, String.class);

            // 2. Call Payment Service
            String paymentResponse = restTemplate.postForObject("http://PAYMENT-SERVICE/api/payment", request, String.class);

            // 3. Call Inventory Service
            String inventoryResponse = restTemplate.postForObject("http://INVENTORY-SERVICE/api/inventory", request, String.class);

            System.out.println("All steps completed successfully");

        } catch (Exception ex) {
            // If any failure happens → trigger compensating actions
            compensate(request);
        }
    }

    private void compensate(OrderRequest request) {
        // Example compensating transactions
        restTemplate.postForObject("http://ORDER-SERVICE/api/order/cancel", request, String.class);
        restTemplate.postForObject("http://PAYMENT-SERVICE/api/payment/refund", request, String.class);
        restTemplate.postForObject("http://INVENTORY-SERVICE/api/inventory/release", request, String.class);

        System.out.println("Compensating transactions executed due to failure");
    }
}
```

---

## 3️⃣ **Each service should expose APIs like**

Order Service:

```java
@PostMapping("/api/order/cancel")
public ResponseEntity<String> cancelOrder(@RequestBody OrderRequest request) {
    // Cancel order logic here
    return ResponseEntity.ok("Order cancelled");
}
```

Payment Service:

```java
@PostMapping("/api/payment/refund")
public ResponseEntity<String> refundPayment(@RequestBody OrderRequest request) {
    // Refund logic here
    return ResponseEntity.ok("Payment refunded");
}
```

Inventory Service:

```java
@PostMapping("/api/inventory/release")
public ResponseEntity<String> releaseInventory(@RequestBody OrderRequest request) {
    // Release reserved items logic here
    return ResponseEntity.ok("Inventory released");
}
```

---

# ✅ **Key Features of Orchestration (to SAY in Interview)**

> *“In Orchestration-based Saga, one central service (the Orchestrator) manages the workflow and calls other services synchronously/asynchronously. It controls the sequence of steps and triggers compensating transactions on failure.”*

---

# 🚀 **Advanced (Real-world)**

In real systems → Instead of `RestTemplate`, we often use:
✅ **Spring Cloud OpenFeign** → For service-to-service calls
✅ **Resilience4j Circuit Breaker** → For fault tolerance
✅ **Distributed Tracing (Zipkin)** → For observability

---

## 🥇 **Your Project Mapping**

If in your project, you want to **convert Choreography to Orchestration** →
You can create **one Orchestrator service** and call

* Order API
* Payment API
* Inventory API
  in sequence → and handle rollback

---


Perfect — now let’s make it **production grade**, like **what interviewers expect when they ask “Have you handled distributed transactions, failure, retries, timeouts etc?”**
We will upgrade to:

✅ **Feign Client** (instead of RestTemplate)
✅ **Resilience4j Circuit Breaker + Retry** (for fault tolerance)
✅ Clean Code Structure

---

# 🛠️ **Spring Boot Orchestrator with Feign + Resilience4j (Advanced)**

---

## 1️⃣ **pom.xml dependencies**

```xml
<!-- OpenFeign -->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-openfeign</artifactId>
</dependency>

<!-- Resilience4j (Circuit Breaker + Retry) -->
<dependency>
    <groupId>io.github.resilience4j</groupId>
    <artifactId>resilience4j-spring-boot2</artifactId>
</dependency>
```

In `application.yml`, enable Feign + CircuitBreaker support

```yaml
spring:
  cloud:
    openfeign:
      circuitbreaker:
        enabled: true
```

---

## 2️⃣ **Feign Clients (Clean service calls)**

### 🛠️ **OrderClient.java**

```java
@FeignClient(name = "order-service", url = "http://ORDER-SERVICE/api/order")
public interface OrderClient {

    @PostMapping
    String createOrder(@RequestBody OrderRequest request);

    @PostMapping("/cancel")
    String cancelOrder(@RequestBody OrderRequest request);
}
```

### 🛠️ **PaymentClient.java**

```java
@FeignClient(name = "payment-service", url = "http://PAYMENT-SERVICE/api/payment")
public interface PaymentClient {

    @PostMapping
    String makePayment(@RequestBody OrderRequest request);

    @PostMapping("/refund")
    String refundPayment(@RequestBody OrderRequest request);
}
```

### 🛠️ **InventoryClient.java**

```java
@FeignClient(name = "inventory-service", url = "http://INVENTORY-SERVICE/api/inventory")
public interface InventoryClient {

    @PostMapping
    String reserveInventory(@RequestBody OrderRequest request);

    @PostMapping("/release")
    String releaseInventory(@RequestBody OrderRequest request);
}
```

---

## 3️⃣ **OrchestratorService.java (With Circuit Breaker)**

```java
@Service
@RequiredArgsConstructor
public class OrchestratorService {

    private final OrderClient orderClient;
    private final PaymentClient paymentClient;
    private final InventoryClient inventoryClient;

    @CircuitBreaker(name = "orderService", fallbackMethod = "orderFallback")
    @Retry(name = "orderService")
    public String startOrderWorkflow(OrderRequest request) {
        try {
            // 1. Order Creation
            orderClient.createOrder(request);

            // 2. Payment
            paymentClient.makePayment(request);

            // 3. Inventory
            inventoryClient.reserveInventory(request);

            return "Order Workflow Completed Successfully";

        } catch (Exception e) {
            compensate(request);
            throw new RuntimeException("Workflow failed, compensation triggered");
        }
    }

    // Compensation logic
    private void compensate(OrderRequest request) {
        try { orderClient.cancelOrder(request); } catch (Exception ignored) {}
        try { paymentClient.refundPayment(request); } catch (Exception ignored) {}
        try { inventoryClient.releaseInventory(request); } catch (Exception ignored) {}

        System.out.println("Compensating transactions done.");
    }

    // Circuit breaker fallback method
    public String orderFallback(OrderRequest request, Throwable t) {
        compensate(request);
        return "Fallback triggered due to: " + t.getMessage();
    }
}
```

---

## 4️⃣ **application.yml (Resilience4j settings)**

```yaml
resilience4j:
  circuitbreaker:
    instances:
      orderService:
        slidingWindowSize: 5
        failureRateThreshold: 50
        waitDurationInOpenState: 5s

  retry:
    instances:
      orderService:
        maxAttempts: 3
        waitDuration: 2s
```

---

## 📝 **What to SAY in interview (with confidence)**

> *“In my project, we followed the Saga Pattern (Orchestration). Our Orchestrator service coordinates workflows across microservices (Order, Payment, Inventory). We used FeignClient for clean service-to-service communication, Resilience4j Circuit Breaker + Retry for fault tolerance, and compensating transactions to maintain consistency in case of failures. We also integrated distributed tracing for observability.”*

---

## 🚀 **Pro Tip for Interview (Your Project)**

You can say confidently:

✅ *“In our system, similar to our payment/account services, we use Kafka, REST APIs for communication, and we deploy microservices independently using Kubernetes GitOps. For complex transactions, we use Saga Pattern with compensating transactions to ensure eventual consistency.”*

---

Let’s break this **clearly and cleanly** so that in the interview — you can **explain it in 1 min confidently**.

---

## ❓ **What is a Compensating Transaction?**

> ➡️ It is an operation that **UNDOES the effect of a previously successful operation**
> ➡️ We use it when we **cannot use database rollback (ACID transaction)** because we are dealing with **distributed microservices**

---

## ⚡ **Why do we need it?**

In microservices, each service has **its own DB**
You **can’t rollback all DBs together** like a normal SQL transaction.

**So what do we do? → We COMPENSATE**

---

## ⚙️ **Real-world example (Your project relatable)**

Let’s say:
1️⃣ You created an **Order**
2️⃣ You made a **Payment**
3️⃣ You reserved **Inventory**

But **Inventory reservation failed** ❌

Now we need to "undo" →
✅ Refund the Payment
✅ Cancel the Order

These **undo actions** are called **Compensating Transactions**

---

## 🛠️ **In Your Project Terms**

You can say in interview:

> *“In our project, when we have services like payment, account, checkout — if one step fails (for example payment success but inventory fails), we trigger compensating transactions like refundPayment(), cancelOrder(), releaseInventory() — so system comes back to original state. This is how we maintain consistency across services using Saga Pattern.”*

---

## 💡 **Typical Compensating Transaction Examples**

| Service           | Normal Action      | Compensating Action |
| ----------------- | ------------------ | ------------------- |
| Order Service     | createOrder()      | cancelOrder()       |
| Payment Service   | makePayment()      | refundPayment()     |
| Inventory Service | reserveInventory() | releaseInventory()  |

---

## 📝 **Interview one-liner (memorize)**

> *“Compensating Transactions are explicit undo actions we call to bring system back to consistent state when a distributed transaction partially fails — because microservices can’t share DB transactions.”*

---

## ❓ **What if Compensating Transaction ALSO fails?**

➡️ *Yes — compensating APIs can also fail.*
Example: refundPayment() fails because payment gateway is down.

In such cases:
We don’t panic — we **ensure 3 things**:

---

## ✅ **1. Retry Mechanism**

We **retry** the compensation API (with exponential backoff).
Because **many failures are transient** (temporary network, service downtime)

**Spring Boot example** (using `@Retryable`)

```java
@Retryable(value = { RemoteServiceNotAvailableException.class }, maxAttempts = 3, backoff = @Backoff(delay = 2000))
public void refundPayment(String paymentId) {
    // call refund API
}
```

---

## ✅ **2. Manual Intervention (Dead Letter Queue / Manual Review)**

If retry also fails →
We **record the failed compensation** in a **Dead Letter Queue (DLQ)** or a **Failed\_Compensation Table**
Ops team can later **manually fix** those few rare cases.

Your project uses **Kafka** —
So you can say:

> *“We can send failed compensation messages to a Dead Letter Kafka topic — so that ops can replay or handle manually later”*

---

## ✅ **3. Idempotency**

Even if we retry multiple times →
We make sure **the compensation action happens at most ONCE** (no double refund)

In your Spring Boot services →
This means **refundPayment()** API should be **idempotent**

---

## 📌 **Interview GOLDEN answer (memorize this 👇)**

> *“In case compensating APIs fail, we use Retry with exponential backoff, and if still fails, log it into Dead Letter Queue or Compensation table for manual intervention. Also, all compensating actions are idempotent to avoid side effects.”*

---

## 🛠️ **In Your Project (Your words)**

> *“Since we have Kafka and elastic logs — we can push failed compensations to Kafka DLQ and monitor logs in Elastic. Our APIs are idempotent (e.g., refundPayment() does not refund twice even if retried). We ensure eventual consistency and operational visibility.”*

---

## ⚡ **Final Notes**

| Failure Scenario  | Our Strategy            |
| ----------------- | ----------------------- |
| Temporary failure | Retry                   |
| Permanent failure | Log to DLQ / Manual fix |
| Avoid duplicates  | Idempotent API          |

---


✅ 1. **Normal flow** of compensation
✅ 2. **Retry**
✅ 3. **DLQ handling**
✅ 4. **Idempotency**

---

## 📂 **Example Scenario**

Service: **PaymentService**
Compensation action: **refundPayment(paymentId)**

Let’s say we trigger this via **Kafka compensation topic**
Topic name: `compensate-payment`

---

## ⚙️ **1. Kafka Consumer for Compensation**

```java
@Component
public class PaymentCompensationListener {

    @Autowired
    private PaymentService paymentService;

    @KafkaListener(topics = "compensate-payment", groupId = "payment-group")
    public void handleCompensatePayment(String paymentId) {
        paymentService.refundPayment(paymentId);
    }
}
```

---

## ⚙️ **2. PaymentService with Retry + Idempotency**

```java
@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;  // db table with payment + refund status

    @Retryable(value = {RemoteServiceNotAvailableException.class}, maxAttempts = 3, backoff = @Backoff(delay = 2000))
    public void refundPayment(String paymentId) {
        Payment payment = paymentRepository.findById(paymentId)
                                           .orElseThrow(() -> new IllegalArgumentException("Payment not found"));

        // ✅ IDEMPOTENCY check — already refunded?
        if (payment.isRefunded()) {
            System.out.println("Payment already refunded. Skipping...");
            return;
        }

        // Call external payment gateway refund API
        boolean success = externalRefundAPI(paymentId);

        if (success) {
            payment.setRefunded(true);
            paymentRepository.save(payment);
        } else {
            throw new RemoteServiceNotAvailableException("Refund API failed");
        }
    }

    private boolean externalRefundAPI(String paymentId) {
        // simulate external API call
        return Math.random() > 0.2; // 80% success, 20% fail
    }
}
```

---

## ⚙️ **3. Kafka Dead Letter Queue (DLQ)**

If **all retries fail** →
Spring Kafka can automatically send message to **DLQ topic**

Configure in **application.yml**:

```yaml
spring:
  kafka:
    consumer:
      enable-auto-commit: false
    listener:
      ack-mode: record
      retry:
        topics:
          - topic: compensate-payment
            dlt-topic-suffix: ".DLT"
            max-attempts: 3
```

This creates **`compensate-payment.DLT`**
→ all failed compensations go there automatically.

---

## ⚙️ **4. DLQ Listener (For Ops / Manual Fix)**

```java
@Component
public class DLQListener {

    @KafkaListener(topics = "compensate-payment.DLT", groupId = "payment-dlq-group")
    public void handleFailedCompensation(String paymentId) {
        // Log to Elastic, alert ops
        System.out.println("Compensation FAILED for paymentId = " + paymentId);
        // push to Elastic, or create JIRA, or alert team etc
    }
}
```

---

## 🏆 **In Interview (Your answer)**

> *“In our project, for compensations like refundPayment(), we have Kafka based listeners. We retry 3 times with exponential backoff. If all retries fail, message is pushed to Kafka Dead Letter topic (DLQ). Our DLQ listener logs to Elastic for ops visibility. Also, refundPayment() is idempotent — so even if retried, no duplicate refunds happen.”*

---

## 📊 **Architecture Diagram (Clean)**

```
compensate-payment topic
          |
          v
 PaymentCompensationListener
          |
    refundPayment()
       /     \
 (Success)   (Fail 3x)
     |           |
     v           v
 Done      compensate-payment.DLT
                   |
              DLQListener → Elastic Logs
```

---

## ⚡️ Summary

| Strategy       | Implementation         |
| -------------- | ---------------------- |
| Retry          | @Retryable             |
| Idempotent     | Check DB before refund |
| DLQ            | Kafka auto DLT         |
| Ops visibility | DLQ Listener + Elastic |

---
