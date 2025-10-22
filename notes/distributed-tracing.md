# Distributed Tracing

## Overview
Distributed tracing is a method of **tracking requests as they flow through a distributed system**, such as microservices or serverless functions.  
It helps developers understand **latency bottlenecks**, **dependencies**, and **root causes** of performance issues by providing end-to-end visibility of a request’s journey.

---

## 1. What Is Distributed Tracing?

### Definition
Distributed tracing records the lifecycle of a request (or transaction) as it travels across services, assigning a **unique trace ID** to connect all related operations.

### Why It Matters
- Detects **latency hotspots** across microservices  
- Helps debug **slow or failed requests**  
- Provides **observability** across multiple systems and components  
- Supports **root cause analysis** for incidents  

---

## 2. Key Terminology

| Term | Description |
|------|--------------|
| **Trace** | Represents the full journey of a request across multiple services. |
| **Span** | A single operation within a trace (e.g., API call, DB query). |
| **Parent Span** | The span that triggered a child operation. |
| **Child Span** | Represents a sub-operation derived from a parent span. |
| **Trace Context** | Metadata (trace ID, span ID, sampling info) passed between services. |
| **Instrumentation** | Code or middleware that captures and reports tracing data. |

---

## 3. Example Trace Hierarchy

```

Trace ID: 1234abcd

└── [Frontend] GET /checkout
├── [Auth Service] validateUser()
├── [Payment Service] chargeCard()
│       ├── [Gateway API] POST /charge
│       └── [DB] insertTransaction()
└── [Inventory Service] updateStock()

```

Each operation (span) has:
- Start and end timestamps  
- Metadata (tags, logs, attributes)  
- Parent-child relationships  

---

## 4. Core Components of a Tracing System

| Component | Description |
|------------|-------------|
| **Tracer / SDK** | Library that creates and manages spans (e.g., OpenTelemetry SDK). |
| **Collector / Agent** | Receives traces from applications and exports to backend. |
| **Backend (Jaeger / Zipkin / Tempo)** | Stores and visualizes traces. |
| **Instrumentation Library** | Adds trace data automatically for common frameworks. |

---

## 5. OpenTelemetry Overview

### What Is OpenTelemetry?
**OpenTelemetry (OTel)** is a vendor-neutral, open-source standard for **traces**, **metrics**, and **logs**.  
It provides a consistent API and SDK for observability across platforms and languages.

### OpenTelemetry Architecture
```

[Application Code]
↓
[OpenTelemetry SDK]
↓
[Collector (Agent/Sidecar)]
↓
[Backend (Jaeger / Tempo / New Relic / Datadog)]

````

### Key Components
- **Tracer Provider** – Creates tracers for generating spans  
- **Span Processor** – Handles span export (e.g., batching, sampling)  
- **Exporter** – Sends traces to the backend (Jaeger, Zipkin, etc.)  
- **Context Propagation** – Maintains trace continuity across threads/services  

---

## 6. Example: OpenTelemetry + Jaeger (Java)

```java
import io.opentelemetry.api.trace.Span;
import io.opentelemetry.api.trace.Tracer;
import io.opentelemetry.api.GlobalOpenTelemetry;

public class CheckoutService {
    private static final Tracer tracer = GlobalOpenTelemetry.getTracer("checkout-service");

    public void processOrder() {
        Span span = tracer.spanBuilder("processOrder").startSpan();
        try {
            callInventoryService();
            callPaymentService();
        } finally {
            span.end();
        }
    }
}
````

### Export Configuration (Spring Boot Example)

```yaml
otel:
  exporter:
    otlp:
      endpoint: http://localhost:4317
  resource:
    attributes:
      service.name: checkout-service
```

---

## 7. Jaeger Overview

### What Is Jaeger?

**Jaeger** is an open-source distributed tracing system created by Uber.
It helps monitor and troubleshoot transactions in complex microservice architectures.

### Architecture

```
[Application] → [Jaeger Agent] → [Jaeger Collector] → [Jaeger Query UI + Storage]
```

### Features

* Visualize full trace timelines
* Detect slow services and spans
* Root-cause analysis across microservices
* Supports **OpenTelemetry** and **Zipkin** formats

### Jaeger UI

In the Jaeger UI, you can:

* Filter by **service name**, **operation**, or **trace ID**
* Visualize **critical paths**
* Analyze **latency distribution**

---

## 8. Context Propagation

### Definition

**Context propagation** ensures that trace context (trace ID, span ID, etc.) travels with requests across service boundaries.

Without it, traces appear **disconnected** and lose end-to-end visibility.

### Mechanism

1. The upstream service injects trace context into headers (HTTP, gRPC, Kafka, etc.)
2. The downstream service extracts the context to continue the trace.

### Common Standards

| Standard                | Description                                                          |
| ----------------------- | -------------------------------------------------------------------- |
| **W3C Trace Context**   | Defines `traceparent` and `tracestate` headers for interoperability. |
| **B3 Headers (Zipkin)** | Older header format: `X-B3-TraceId`, `X-B3-SpanId`, etc.             |

### Example – HTTP Header Propagation

```
traceparent: 00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01
```

### Example – OpenTelemetry Propagation (Java)

```java
import io.opentelemetry.context.propagation.TextMapSetter;

TextMapSetter<HttpURLConnection> setter = (carrier, key, value) ->
    carrier.setRequestProperty(key, value);

GlobalOpenTelemetry.getPropagators()
    .getTextMapPropagator()
    .inject(Context.current(), connection, setter);
```

---

## 9. Sampling Strategies

Sampling controls how many traces are recorded and exported.

| Strategy                 | Description                           |
| ------------------------ | ------------------------------------- |
| **Always On**            | Record every trace (useful in dev).   |
| **Always Off**           | Disable tracing.                      |
| **Parent Based**         | Inherit decision from parent span.    |
| **Trace ID Ratio-Based** | Record only a percentage (e.g., 10%). |

### Example

```yaml
otel.traces.sampler: traceidratio
otel.traces.sampler.arg: 0.1  # 10% sampling
```

---

## 10. Best Practices

✅ Use consistent **service names** and **operation names**
✅ Instrument critical paths: API calls, DB queries, external dependencies
✅ Use **baggage attributes** sparingly (avoid large data)
✅ Correlate traces with **logs and metrics** (via trace ID)
✅ Visualize latency breakdowns to find bottlenecks
✅ Start with **OpenTelemetry SDKs** and export to **Jaeger** for visualization

---

## 11. Common Integrations

| Component               | Integration Method                  |
| ----------------------- | ----------------------------------- |
| **Spring Boot**         | Spring Cloud Sleuth + OpenTelemetry |
| **Node.js**             | `@opentelemetry/sdk-trace-node`     |
| **Python**              | `opentelemetry-instrumentation`     |
| **gRPC / HTTP Clients** | Auto-instrumentation libraries      |
| **Kafka / RabbitMQ**    | Propagation via headers (B3 or W3C) |

---

## 12. Summary

| Concept                 | Purpose                                |
| ----------------------- | -------------------------------------- |
| **Trace**               | Entire request journey                 |
| **Span**                | Individual operation                   |
| **Context Propagation** | Maintains linkage between services     |
| **Jaeger**              | Visualization and analysis tool        |
| **OpenTelemetry**       | Standard SDK for traces, metrics, logs |

---

## References

* [OpenTelemetry Documentation](https://opentelemetry.io/docs/)
* [Jaeger Official Docs](https://www.jaegertracing.io/docs/)
* [W3C Trace Context Specification](https://www.w3.org/TR/trace-context/)
* [Google Cloud Trace Overview](https://cloud.google.com/trace/docs/overview)
* [Distributed Tracing in Microservices – CNCF Blog](https://www.cncf.io/blog/)

```
