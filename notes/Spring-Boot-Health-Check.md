**Spring Boot health check config (production-grade)** — including:

✅ A robust **`/actuator/health`** endpoint
✅ Configuration to expose **only what's needed** (secure + clean)
✅ How to configure **liveness** and **readiness probes** in K8s correctly

---

### 1️⃣ **Spring Boot Dependencies**

Add **Spring Boot Actuator** to your `pom.xml`

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

---

### 2️⃣ **application.properties (minimal, secure config)**

```properties
# Expose only health endpoint
management.endpoints.web.exposure.include=health

# Make health endpoint respond UP even during startup (optional but good for readiness)
management.endpoint.health.probes.enabled=true

# Optional — if you want detailed health (db, disk, etc.)
management.endpoint.health.show-details=always
```

✅ This enables `/actuator/health`
✅ If you're on **Spring Boot 2.3+**, `probes.enabled=true` automatically enables `/health/liveness` and `/health/readiness` (ideal for K8s)

---

### 3️⃣ **Optional — Custom Health Indicator (for DB or external checks)**

If your interviewer asks **"How do you make sure DB is healthy too?"** — here’s how:

```java
@Component
public class CustomHealthIndicator implements HealthIndicator {

    @Override
    public Health health() {
        // Custom logic here
        boolean dbIsUp = checkDatabaseConnection();
        if (dbIsUp) {
            return Health.up().withDetail("custom-db", "Available").build();
        }
        return Health.down().withDetail("custom-db", "Unavailable").build();
    }

    private boolean checkDatabaseConnection() {
        // Simulate DB check
        return true;
    }
}
```

---

### 4️⃣ **Kubernetes Probes (ideal, interview-grade)**

```yaml
livenessProbe:
  httpGet:
    path: /actuator/health/liveness
    port: 8080
  initialDelaySeconds: 30
  periodSeconds: 10

readinessProbe:
  httpGet:
    path: /actuator/health/readiness
    port: 8080
  initialDelaySeconds: 10
  periodSeconds: 5
```

✅ **liveness** → Restart app if stuck
✅ **readiness** → Don’t send traffic until ready

---

### 5️⃣ **Security Tip (interview bonus)**

If **Spring Security** is on, allow unauthenticated access to health:

```java
@Configuration
public class ActuatorSecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
          .authorizeHttpRequests(auth -> auth
            .requestMatchers("/actuator/health/**").permitAll()
            .anyRequest().authenticated()
          )
          .httpBasic(withDefaults());
        return http.build();
    }
}
```

---

### 6️⃣ **How does `/health/liveness` & `/health/readiness` behave?**

| Endpoint            | When is it UP?                                            | Why is it useful?                  |
| ------------------- | --------------------------------------------------------- | ---------------------------------- |
| `/health/liveness`  | App is running (JVM not deadlocked/crashed)               | Restart container if DOWN          |
| `/health/readiness` | App is ready to serve traffic (DB ready, dependencies OK) | Pause traffic if DOWN (no restart) |

---

### ✅ **Interview-Ready Key Talking Points**

* Expose **only necessary endpoints** (`health`)
* Use `/liveness` and `/readiness` for clean separation of concerns
* Add **Custom HealthIndicator** for DB/external systems
* Allow health endpoint **without auth** (production best practice)
* Kubernetes probes = `/actuator/health/liveness` and `/actuator/health/readiness`

---

**How can I make DB health check non-blocking in Spring Boot?**
Let’s break it cleanly.

---

# ❓ **What’s the problem with DB health check?**

By default,
When you hit `/actuator/health` (or when K8s does readiness probe)…
→ Spring Boot **executes a blocking DB check** (like `SELECT 1`)
→ If DB is slow or momentarily unavailable → the health endpoint hangs (bad)

**Drawback:**
Your pod may be marked unhealthy **just because DB is slow**, even if your app can still serve cached or partial functionality.

---

# ✅ **Best practice — DB health check should be NON-BLOCKING and "degraded", not DOWN**

> Even if DB is unreachable, health endpoint **should not block** and **should return 'UP with degraded info'** instead of failing everything.

---

# 🛠️ **Solution in Spring Boot (Reactive or Timeout)**

## Option 1️⃣ — **Set a Timeout on DB Health Check** *(Recommended, Simple)*

In **`application.yml`**

```yaml
management:
  health:
    db:
      enabled: true
    defaults:
      enabled: true
  endpoint:
    health:
      show-details: always

# Timeout DB health indicator to 1 second
spring:
  health:
    db:
      validation-query: SELECT 1
      timeout: 1000 # milliseconds
```

> **Effect:**
> If DB takes >1s → it times out and marks **DB = DOWN** but **/actuator/health still responds quickly**
> → Kubernetes probe does not hang

---

## Option 2️⃣ — **Customize DB Health Indicator to be "degraded"**

You can write a **custom HealthIndicator** that reports:

* **UP** (if DB ok)
* **DEGRADED** (if DB slow/unreachable, but app still partially usable)

```java
@Component
public class CustomDbHealthIndicator implements HealthIndicator {

    @Autowired
    private DataSource dataSource;

    @Override
    public Health health() {
        try (Connection conn = dataSource.getConnection()) {
            boolean valid = conn.isValid(1); // timeout 1 sec
            if (valid) {
                return Health.up().withDetail("db", "Available").build();
            } else {
                return Health.status("DEGRADED").withDetail("db", "Unreachable").build();
            }
        } catch (SQLException e) {
            return Health.status("DEGRADED").withDetail("db", "Error: " + e.getMessage()).build();
        }
    }
}
```

> **Effect:**
> Even if DB fails, **app reports 'DEGRADED'**, does not block.

---

# ⚙️ **How Kubernetes handles this?**

* K8s readiness probe sees **200 OK** response quickly
* Your app is still considered **ready** (if that's what you want)
* OR if you want: **fail readiness** only if DB is really critical → configure that

---

# 🥇 **Simple interview answer **

> *“We configured non-blocking DB health checks by applying a timeout of 1s on DB validation queries. If DB is unreachable, our health endpoint returns quickly with a degraded status rather than blocking. This prevents Kubernetes from marking pods unhealthy unnecessarily during transient DB slowdowns.”*

---

# ⚡ **Summary**

| Problem                                  | Solution                                    |
| ---------------------------------------- | ------------------------------------------- |
| Health check blocks on slow DB           | Set timeout on DB check                     |
| App marked unhealthy unnecessarily       | Return degraded status instead of DOWN      |
| K8s removes healthy pod because DB flaky | Prevent by fast, non-blocking health checks |
