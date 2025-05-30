```java
package com.example.restclient;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.ClientRequestContext;
import javax.ws.rs.client.ClientRequestFilter;
import javax.ws.rs.client.Entity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.Provider;
import java.io.IOException;
import java.time.LocalDateTime;

import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.apache.commons.lang3.StringUtils;

@ApplicationScoped
@Provider
public class ClientCredentialFilter implements ClientRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(ClientCredentialFilter.class);

    @Inject
    @ConfigProperty(name = "clientId")
    private javax.inject.Provider<String> clientId;

    @Inject
    @ConfigProperty(name = "clientSecret")
    private javax.inject.Provider<String> clientSecret;

    @Inject
    TokenExchangeClientFactory tokenClientFactory;

    private static String outboundToken = null;
    private static LocalDateTime outboundTokenExpirationTime;

    private boolean filterRequest() {
        boolean filterRequest = false;
        if (this.clientId != null && this.clientSecret != null) {
            filterRequest = true;
        } else {
            logger.error("Filter initialization failed. The config providers were not injected.");
        }
        return filterRequest;
    }

    @Override
    public void filter(ClientRequestContext reqContext) throws IOException {
        if (this.filterRequest() && StringUtils.isNoneBlank(clientId.get(), clientSecret.get())) {
            if (StringUtils.isNotBlank(reqContext.getHeaderString("Authorization"))) {
                logger.warn("The token provided by this filter will replace the existing token. URI: {}", reqContext.getUri());
            }

            logger.debug("Requesting token for service call");

            if (outboundToken == null || (outboundTokenExpirationTime != null && LocalDateTime.now().isAfter(outboundTokenExpirationTime))) {
                TokenExchangeResponse tokenResponse = this.tokenClientFactory.newJaxRsClient()
                    .exchangeClientAccessToken(clientId.get(), clientSecret.get());

                if (tokenResponse != null) {
                    outboundTokenExpirationTime = LocalDateTime.now().plusSeconds(tokenResponse.getExpiresIn());
                    outboundToken = tokenResponse.getAccessToken();
                }
            }

            if (StringUtils.isBlank(outboundToken)) {
                logger.warn("Could not provide a bearer token. No outbound token was specified.");
            } else {
                reqContext.getHeaders().add("Authorization", "Bearer " + outboundToken);
            }
        }
    }
}

// Sample service using the filter
@ApplicationScoped
class MyService {

    @Inject
    ClientCredentialFilter clientCredentialFilter;

    public String callOtherService(String url, String requestPayload) {
        Client client = ClientBuilder.newClient().register(clientCredentialFilter);

        Response response = client.target(url)
            .request(MediaType.APPLICATION_JSON)
            .post(Entity.entity(requestPayload, MediaType.APPLICATION_JSON));

        String result = response.readEntity(String.class);
        response.close();
        return result;
    }
}



Absolutely — let's go through this code step by step so you fully understand how service-to-service REST API communication is handled here, including the security aspects.

---

## 🔹 Overview of What's Happening

You're using **JAX-RS** (Java API for RESTful Web Services) with **MicroProfile Config** and a **custom request filter** to securely call another service.
The filter injects a **Bearer token** (OAuth2 Client Credentials Flow) into the request automatically.

---

## 🔹 Code Breakdown

### ### 1. `ClientCredentialFilter` class

This is a `@Provider`-annotated **JAX-RS ClientRequestFilter** that adds an `Authorization: Bearer <token>` header to outgoing HTTP requests.

```java
@ApplicationScoped
@Provider
public class ClientCredentialFilter implements ClientRequestFilter
```

* `@ApplicationScoped`: CDI scope, bean lives for the lifetime of the app.
* `@Provider`: Registers this class as a JAX-RS filter.

---

### ### 2. Injected Configuration

```java
@Inject
@ConfigProperty(name = "clientCredentialFilter.clientId")
private javax.inject.Provider<String> clientId;
```

* Injects `clientId` and `clientSecret` from configuration (`microprofile-config.properties`, `application.yaml`, etc.).
* Wrapped in `javax.inject.Provider` so you can lazily access values.

---

### ### 3. Token Fetching Dependencies

```java
@Inject
TokenExchangeClientFactory tokenClientFactory;
```

This factory helps you obtain a token using client ID and secret via OAuth2 token exchange.

---

### ### 4. Static Fields to Cache the Token

```java
private static String outboundToken = null;
private static LocalDateTime outboundTokenExpirationTime;
```

To avoid calling the token API on every request, you cache the token and its expiration time. The token is refreshed only when it's expired.

---

### ### 5. `filterRequest()` – Should This Filter Apply?

```java
private boolean filterRequest() {
    return this.clientId != null && this.clientSecret != null;
}
```

Basic sanity check to ensure configuration is loaded.

---

### ### 6. `filter(...)` – Core Logic

This is where the token is fetched and injected into the request:

#### a. **Skip if missing config or blank strings**

```java
if (filterRequest() && StringUtils.isNoneBlank(clientId.get(), clientSecret.get()))
```

#### b. **Check if Authorization already exists**

```java
if (StringUtils.isNotBlank(reqContext.getHeaderString("Authorization"))) {
    logger.warn("The token provided by this filter will replace the existing token...");
}
```

Warns if someone else has already set an Authorization header.

#### c. **Token Expiration Check**

```java
if (outboundToken == null || LocalDateTime.now().isAfter(outboundTokenExpirationTime))
```

If the token is missing or expired, fetch a new one.

#### d. **Fetch Token**

```java
TokenExchangeResponse tokenResponse = tokenClientFactory.newJaxRsClient().exchangeClientAccessToken(...);
```

Fetches a token using client credentials. Sets:

* `outboundTokenExpirationTime` using `tokenResponse.getExpiresIn()`
* `outboundToken` using `tokenResponse.getAccessToken()`

#### e. **Set Authorization Header**

```java
reqContext.getHeaders().add("Authorization", "Bearer " + outboundToken);
```

This line injects the token into the actual HTTP request.

---

### ### 7. `MyService` – Calls Another REST API

```java
Client client = ClientBuilder.newClient().register(clientCredentialFilter);
```

* Creates a JAX-RS Client and registers your custom filter.

```java
Response response = client.target(url)
    .request(MediaType.APPLICATION_JSON)
    .post(Entity.entity(requestPayload, MediaType.APPLICATION_JSON));
```

* Sends the actual HTTP POST request with JSON body.
* The filter transparently injects the Bearer token in the background.

```java
String result = response.readEntity(String.class);
```

* Reads and returns the response as a string.

---

## 🔹 Summary

| Component                      | Purpose                                |
| ------------------------------ | -------------------------------------- |
| `ClientCredentialFilter`       | Injects access token via filter        |
| `clientId` & `clientSecret`    | Pulled from config                     |
| `TokenExchangeClientFactory`   | Gets token from identity provider      |
| `MyService.callOtherService()` | Makes the actual API call using JAX-RS |
| `@Provider`                    | Enables JAX-RS to detect the filter    |

---

Great! Let's now convert the JAX-RS version into a **Spring Boot version** that does the same thing: securely call another service using a Bearer token obtained via **OAuth2 Client Credentials Flow** — but this time, using **Spring’s WebClient** (not JAX-RS).

---

## ✅ Step-by-step: Equivalent Spring Boot Version

We'll cover:

1. `application.yml` configuration
2. A component to fetch and cache the token
3. A service class to make secure REST API calls

---

### 🔹 1. `application.yml`

```yaml
client-credentials:
  client-id: your-client-id
  client-secret: your-client-secret
  token-uri: https://auth-server.example.com/oauth/token
```

---

### 🔹 2. Token Fetching Component

```java
@Component
public class OAuth2TokenProvider {

    @Value("${client-credentials.client-id}")
    private String clientId;

    @Value("${client-credentials.client-secret}")
    private String clientSecret;

    @Value("${client-credentials.token-uri}")
    private String tokenUri;

    private String cachedToken;
    private Instant tokenExpiryTime;

    public synchronized String getAccessToken() {
        if (cachedToken == null || Instant.now().isAfter(tokenExpiryTime)) {
            fetchNewToken();
        }
        return cachedToken;
    }

    private void fetchNewToken() {
        WebClient client = WebClient.builder().build();

        MultiValueMap<String, String> form = new LinkedMultiValueMap<>();
        form.add("grant_type", "client_credentials");
        form.add("client_id", clientId);
        form.add("client_secret", clientSecret);

        Map<String, Object> response = client.post()
            .uri(tokenUri)
            .contentType(MediaType.APPLICATION_FORM_URLENCODED)
            .bodyValue(form)
            .retrieve()
            .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {})
            .block();

        if (response != null) {
            cachedToken = (String) response.get("access_token");
            int expiresIn = (Integer) response.get("expires_in");
            tokenExpiryTime = Instant.now().plusSeconds(expiresIn - 30); // buffer
        }
    }
}
```

---

### 🔹 3. Service to Call Another API

```java
@Service
public class MyRestClient {

    private final OAuth2TokenProvider tokenProvider;
    private final WebClient webClient;

    @Autowired
    public MyRestClient(OAuth2TokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
        this.webClient = WebClient.builder().build();
    }

    public String callOtherService(String url, Object requestBody) {
        String token = tokenProvider.getAccessToken();

        return webClient.post()
                .uri(url)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }
}
```

---

## 🔍 Comparison: Spring Boot vs. JAX-RS

| Feature               | JAX-RS + ClientRequestFilter      | Spring Boot + WebClient                 |
| --------------------- | --------------------------------- | --------------------------------------- |
| **Framework**         | JAX-RS / MicroProfile             | Spring Boot                             |
| **Token Injection**   | Done via `ClientRequestFilter`    | Done via `WebClient` with manual header |
| **Token Caching**     | Static fields                     | In-memory fields with `Instant` check   |
| **Configuration**     | `@ConfigProperty`                 | `@Value` from `application.yml`         |
| **Request Building**  | `ClientBuilder`                   | `WebClient.builder()`                   |
| **Flexibility**       | Needs boilerplate for token logic | Easily pluggable and reactive           |
| **Community Support** | Less Spring-specific              | Massive community + built-in support    |

---

## ✅ Best Practice Notes

* Spring Security has built-in support for OAuth2 client credentials (using `@RegisteredOAuth2AuthorizedClient`), but doing it manually gives you more control.
* Always buffer token expiry by a few seconds.
* Don't log actual tokens.
* For high-load apps, consider using `Reactive` WebClient and token caching services like Redis if deployed in clusters.

---


## ✅ Step 1: Spring Boot’s Built-in OAuth2 Client Credentials Support (No manual WebClient setup)

This is the **cleanest and most idiomatic** way in Spring Boot to call secure APIs using OAuth2 Client Credentials.

---

### 🔹 1. Add Dependencies

For Maven:

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-oauth2-client</artifactId>
</dependency>
```

---

### 🔹 2. `application.yml` Configuration

```yaml
spring:
  security:
    oauth2:
      client:
        registration:
          my-client:
            client-id: your-client-id
            client-secret: your-client-secret
            authorization-grant-type: client_credentials
            scope: read write
        provider:
          my-provider:
            token-uri: https://auth-server.example.com/oauth/token
```

---

### 🔹 3. Inject OAuth2AuthorizedClientManager (Spring Boot 2.4+)

```java
@Configuration
public class WebClientOAuth2Config {

    @Bean
    public WebClient webClient(OAuth2AuthorizedClientManager authorizedClientManager) {
        ServletOAuth2AuthorizedClientExchangeFilterFunction oauth2 =
            new ServletOAuth2AuthorizedClientExchangeFilterFunction(authorizedClientManager);
        oauth2.setDefaultClientRegistrationId("my-client");
        return WebClient.builder()
            .apply(oauth2.oauth2Configuration())
            .build();
    }
}
```

---

### 🔹 4. Use WebClient to Call Secure API

```java
@Service
public class MySecureApiClient {

    private final WebClient webClient;

    @Autowired
    public MySecureApiClient(WebClient webClient) {
        this.webClient = webClient;
    }

    public String callSecureService(String url, Object requestBody) {
        return webClient.post()
                .uri(url)
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }
}
```

👉 Spring will automatically inject the Bearer token using the `client_credentials` flow.

---

## 🔄 Alternate Approaches

### 🔸 1. **RestTemplate (Deprecated for OAuth2)**

> ⚠️ Manual and not recommended for new projects.

You'd have to:

* Fetch token manually.
* Add Authorization header manually to `HttpHeaders`.
* Build `HttpEntity` and call `RestTemplate.postForObject(...)`.

⚙️ Verbose and hard to test.

---

### 🔸 2. **OpenFeign (Spring Cloud)**

If you're using Spring Cloud, Feign makes service-to-service calls **declarative**.

#### 1. Dependency

```xml
<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-openfeign</artifactId>
</dependency>
```

#### 2. Enable Feign

```java
@SpringBootApplication
@EnableFeignClients
public class YourApp {
}
```

#### 3. Config (`application.yml`)

```yaml
feign:
  client:
    config:
      default:
        request-interceptors:
          - com.example.security.OAuth2FeignRequestInterceptor
```

#### 4. Feign Client Interface

```java
@FeignClient(name = "other-service", url = "https://api.example.com")
public interface OtherServiceClient {
    @PostMapping("/data")
    String sendData(@RequestBody MyRequest req);
}
```

#### 5. Add Token Interceptor Manually

```java
@Component
public class OAuth2FeignRequestInterceptor implements RequestInterceptor {

    @Autowired
    private OAuth2TokenProvider tokenProvider;

    @Override
    public void apply(RequestTemplate template) {
        String token = tokenProvider.getAccessToken();
        template.header("Authorization", "Bearer " + token);
    }
}
```

> ☑️ Declarative, clean. Ideal with Spring Cloud.

---

## 🧾 Final Summary – What to Choose?

| Approach                     | Best For                 | Pros                                  | Cons                  |
| ---------------------------- | ------------------------ | ------------------------------------- | --------------------- |
| 🔹 Manual WebClient + token  | Full control             | Fine-grained handling                 | Boilerplate code      |
| 🔹 WebClient + Spring OAuth2 | ✅ Recommended            | No boilerplate, secure, token caching | Slightly more setup   |
| 🔹 Feign + Spring Cloud      | Declarative REST clients | Cleanest code, testable               | Adds Spring Cloud     |
| 🔹 RestTemplate              | Legacy apps              | Simpler than JAX-RS                   | Deprecated for OAuth2 |

---
