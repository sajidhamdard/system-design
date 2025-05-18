## **What is OAuth2?**

**“OAuth2 is an authorization framework (protocol) that defines how a client application can obtain limited access to user resources on a server, without exposing the user’s credentials. It describes how access tokens are requested and used to authorize API calls.”**


## **How does OAuth2 decide whether to show login page or something else?**

That’s controlled by the **Authorization Server** (e.g., Okta).
**OAuth2** itself **doesn't say "show login page"** → it says:

> “Client → ask Authorization Server for access”
> How **the Authorization Server authenticates the user** (login page, biometrics, SSO, etc.) is **up to the server / implementation**.

But **typically**:

* When the client redirects user to **Authorization Endpoint**,
  → The **Authorization Server** (Okta) checks:

  * Is user **already logged in**? (via session cookie or SSO) → Skip login page
  * If not logged in → **Show login page**

---

## **Is it standard?**

Yes — OAuth2 defines **standard flows** called **Grant Types** (these decide the process)

| **Grant Type**                           | **When it’s used**                | **What happens**                                                          |
| ---------------------------------------- | --------------------------------- | ------------------------------------------------------------------------- |
| **Authorization Code**                   | Web apps (with user)              | Shows login page (user authenticates), returns code → exchanged for token |
| **Client Credentials**                   | Server-to-server (no user)        | No login page; direct token request with client\_id & secret              |
| **Resource Owner Password (deprecated)** | Direct username/password exchange | Very rare now (security risk)                                             |
| **Implicit (deprecated)**                | Single-page apps (old)            | Not recommended now                                                       |
| **Device Code**                          | Devices with no browser (TVs)     | User logs in on separate device                                           |

---

## **Okta + login page**

You're using **Authorization Code flow (with PKCE probably)** →
That's why **Okta shows a login page first**, then returns tokens.

---

## **Interview ready summary** (say this confidently)

“OAuth2 is an authorization protocol that defines how clients get tokens to access APIs on behalf of users. It provides standardized flows (grant types) to suit different scenarios — like interactive user login (Authorization Code flow) or server-to-server access (Client Credentials flow). The details of user authentication (like showing login page) are handled by the Authorization Server implementation, such as Okta.”

---

## **Extra crisp interview line**

> “OAuth2 doesn’t do authentication itself — it delegates that responsibility to the Authorization Server. Its job is to standardize how **access tokens** are requested and used.”

---

## In short:

* **OAuth2 = protocol for authorization (token issuance)**
* **Login page etc. = handled by Authorization Server (Okta)**
* **Flows (grant types)** decide whether login is shown or not

---

## Where are **roles** configured?

**Roles** (sometimes called **groups**, **authorities**, or **permissions**) are typically configured and managed in the **Authorization Server (Okta)**

In **Okta**, you can:

* Create **Groups** (example: `ROLE_ADMIN`, `ROLE_USER`, `ROLE_MANAGER`)
* Assign **Users** to Groups (in Okta user management UI)
* Configure Okta to **include group/role info inside the token (JWT)**

---

## How do roles flow into the system?

| Step | What happens                                                                                |
| ---- | ------------------------------------------------------------------------------------------- |
| 1    | User logs in via Okta                                                                       |
| 2    | Okta authenticates user                                                                     |
| 3    | Okta **includes user roles/groups inside the Access Token or ID Token as claims**           |
| 4    | Your **frontend app** reads token → knows user roles → shows/hides UI components            |
| 5    | Your **backend API** validates token → reads roles → allows/denies API calls based on roles |

---

## **Where exactly do roles appear?**

Inside the **JWT Access Token** (or ID Token), you’ll see a claim like:

```json
{
  "sub": "user123",
  "email": "user@example.com",
  "groups": ["ROLE_ADMIN", "ROLE_USER"],
  "exp": 1715500000
}
```

Here `groups` claim carries **roles**
(Okta calls them **groups**, but you can map them as roles)

---

## How does your **frontend/backend** use these roles?

### **Frontend (Angular, React etc.)**

* Decode JWT (using `jwt-decode` library)
* Check `groups` claim
* Example:

```js
const token = getAccessToken();
const decoded = jwtDecode(token);
if (decoded.groups.includes('ROLE_ADMIN')) {
   // show admin button
}
```

### **Backend (Spring Boot, Java)**

* When token is validated, your backend **extracts roles from token**
* You can secure endpoints using annotations like:

```java
@PreAuthorize("hasRole('ROLE_ADMIN')")
@GetMapping("/admin/data")
public ResponseEntity<?> getAdminData() {
   ...
}
```

Or in security config:

```java
http
  .authorizeRequests()
  .antMatchers("/admin/**").hasRole("ADMIN")
  .antMatchers("/user/**").hasAnyRole("USER", "ADMIN");
```

---

## **How do you configure Okta to include roles in token?**

* In Okta **Authorization Server → Access Policies → Token Claims**
  → Add a **Custom Claim**
* Name: `groups`
* Include: `Groups`
* Filter: **Matches regex or Group name pattern**
* Include in: **ID Token / Access Token**

This ensures **roles (groups)** get embedded in JWT automatically after login.

---


> “We configure user roles as groups in Okta. When users log in, Okta includes those groups as claims in the issued tokens (JWT). Our frontend reads roles from the token to control UI, and our backend validates the token and uses roles to enforce API authorization.”

---

Perfect — you’re asking **exactly the right thing**.
Let’s get straight to **clean backend code** that extracts roles from the JWT **Access Token** (since roles are inside token claims)

I’ll assume you’re using **Spring Boot** (most common).
If you’re using something else, just tell me.

---

## **Scenario 1 — You’re using Spring Boot + OAuth2 Resource Server**

(The **best-practice modern setup**)

### 1. Add dependency

```xml
<!-- Maven -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-oauth2-resource-server</artifactId>
</dependency>

<dependency> <!-- To decode JWT -->
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
```

### 2. Configure **JWT decoder** to extract roles

By default, Spring Security **looks for `scope` or `authorities` claims**
But Okta puts roles inside **`groups`**
So we tell Spring: **map `groups` → roles**

#### **Security config (Java)**

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .antMatchers("/admin/**").hasRole("ADMIN")
                .antMatchers("/user/**").hasAnyRole("USER", "ADMIN")
                .anyRequest().authenticated()
            )
            .oauth2ResourceServer(oauth2 -> oauth2
                .jwt(jwt -> jwt.jwtAuthenticationConverter(jwtAuthenticationConverter()))
            );

        return http.build();
    }

    private JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtGrantedAuthoritiesConverter converter = new JwtGrantedAuthoritiesConverter();
        converter.setAuthoritiesClaimName("groups");  // <-- tells Spring to read 'groups' claim
        converter.setAuthorityPrefix("ROLE_");        // <-- ensures ROLE_ prefix is added

        JwtAuthenticationConverter jwtConverter = new JwtAuthenticationConverter();
        jwtConverter.setJwtGrantedAuthoritiesConverter(converter);
        return jwtConverter;
    }
}
```

---

### 3. How to use roles in **controller**

You don’t need to manually parse the token —
Spring automatically maps **groups → roles**

Example:

```java
@RestController
@RequestMapping("/admin")
public class AdminController {

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/dashboard")
    public ResponseEntity<String> adminDashboard() {
        return ResponseEntity.ok("Welcome Admin Dashboard");
    }
}
```

Or

```java
@GetMapping("/me")
public Map<String, Object> currentUser(@AuthenticationPrincipal Jwt jwt) {
    // Directly get claims from token
    return Map.of(
        "username", jwt.getSubject(),
        "roles", jwt.getClaimAsStringList("groups")
    );
}
```

---

## **Scenario 2 — You don’t use Spring Security (manual parsing)**

If you want to **manually decode token**:

```java
// You’ll need nimbus-jose-jwt library (Spring uses it internally)
import com.nimbusds.jwt.SignedJWT;

public List<String> extractRolesFromToken(String jwtToken) throws ParseException {
    SignedJWT signedJWT = SignedJWT.parse(jwtToken);
    Object groupsClaim = signedJWT.getJWTClaimsSet().getClaim("groups");

    if (groupsClaim instanceof List<?>) {
        return ((List<?>) groupsClaim).stream()
            .map(Object::toString)
            .collect(Collectors.toList());
    }

    return Collections.emptyList();
}
```

> “We configure Spring Security to extract roles from the `groups` claim in the JWT token using `JwtAuthenticationConverter`, and then secure our APIs using role-based annotations like `@PreAuthorize` or `antMatchers().hasRole()`.”


---


## 🔑 First: What is a **Protocol** in this context?

In tech, a **protocol** is like a **set of rules** or a **contract** about **how two systems should talk to each other**.

> Think of it like traffic rules: the protocol doesn't **drive the car**, but it **tells you how to drive safely and correctly** on the road.

So when we say:

> "**OAuth 2.0 is a protocol**" — it means:
> It defines **how authorization should happen** between the **client**, **authorization server**, and **resource server**.

But OAuth **doesn’t implement any code**. It just **describes what should happen**.

---

## 🎯 OAuth2 in Simple Words

OAuth 2.0 is a **framework** (or protocol) for:

> Granting **limited access** to a user's resources **without giving away their password**.

---

## 🔐 Why Does OAuth2 Matter for Authentication & Authorization?

* **OAuth2 doesn't authenticate users directly.**
* It enables **authorization** (giving apps permission to access things).
* But when combined with something like **OpenID Connect**, it can also do **authentication**.

---

### 📦 Real-world Example

Let’s say a user wants to log into **XYZ App** using **Google**:

1. **XYZ App** redirects user to **Google**.
2. **Google (Authorization Server)** asks the user to log in and consent.
3. **If user consents**, Google redirects back to XYZ with a **token**.
4. XYZ App uses that token to access resources (like the user's profile) from Google.

In this flow:

* OAuth2 defines the **steps** (redirect, consent, token, etc.).
* The actual **login UI**, **token creation**, **profile sharing**, etc. are **done by Google** (or the provider).
* **OAuth2 itself doesn't do any of that—it just says *how* it should be done.**

---

### ⚙️ OAuth2 Is Like...

| Analogy                      | Role                              |
| ---------------------------- | --------------------------------- |
| A blueprint (protocol)       | OAuth2                            |
| The builder (implementation) | Google, Facebook, Okta, Auth0     |
| The building (functionality) | User login, token issuing, scopes |

---

## 🤯 Summary

* ✅ **OAuth2 is a protocol** = set of rules for how to request & grant access.
* ❌ It doesn't do authentication/authorization **by itself**.
* 🔐 **Authorization Server** (like Google, Auth0, Okta) implements the protocol.
* 💡 Use **OpenID Connect (OIDC)** on top of OAuth2 for authentication (identity).

---
