A **grant type** simply answers:

> **“How is the client proving who the user is to get an access token?”**

Different situations → different grant types.

---

## 🧠 First, the actors

* **Resource Owner** → User (you)
* **Client** → App (Angular app, mobile app, backend)
* **Auth Server** → Keycloak / Okta / Auth0 / Spring Authorization Server
* **Resource Server** → Your APIs

---

## ✅ 1. Authorization Code Grant (Most Important)

### Used when:

User logs in via browser (Angular / React / Web app)

### Flow:

1. User redirected to Auth Server login page
2. User logs in
3. Auth server sends **code** to client
4. Client exchanges code for **access token**

### Why this exists?

So that **password never touches the client app**

### Today’s standard:

👉 **Authorization Code + PKCE** (mandatory for SPA)

| Best for     | Web apps, SPA, Mobile |
| ------------ | --------------------- |
| User present | ✅                     |
| Secure       | ✅ Most secure         |
| Recommended  | ⭐⭐⭐⭐⭐                 |

---

## ✅ 2. Client Credentials Grant

### Used when:

**Machine-to-Machine communication**

No user.

Example:

```
Order Service → Payment Service
```

### Flow:

Client sends:

```
client_id + client_secret
```

Gets access token.

| Best for      | Microservice calls |
| ------------- | ------------------ |
| User involved | ❌                  |
| Secure        | ✅                  |
| Recommended   | ⭐⭐⭐⭐⭐              |

You will use this a LOT in microservices.

---

## ✅ 3. Refresh Token Grant

Not for login.

Used to:

> Get new access token without asking user to login again

| Best for      | Keeping user logged in |
| ------------- | ---------------------- |
| User involved | ❌                      |
| Works with    | Authorization Code     |

---

## ⚠️ 4. Implicit Grant (Deprecated)

Old way for SPA before PKCE existed.

Problems:

* Token in browser URL
* Security issues

❌ **Do not use in 2026**

Replaced by:

> Authorization Code + PKCE

---

## ⚠️ 5. Resource Owner Password Credentials (ROPC) (Deprecated)

### Used when:

Client asks user:

> “Enter username & password here”

Then sends password to auth server.

This is what **basic login forms** used to do.

Problems:

* Client sees password
* Very insecure

❌ Not recommended anymore

---

## 🧩 6. Device Code Grant

### Used when:

Device has no browser

Example:

* Smart TV
* CLI tool
* IoT device

Flow:
TV shows code → user enters on phone → TV gets token.

| Best for     | TV, CLI, IoT          |
| ------------ | --------------------- |
| User present | ✅ (on another device) |

---

## 🏆 7. PKCE (Enhancement, not a grant)

PKCE = extra security layer for Authorization Code.

Mandatory for:

* Angular / React SPA
* Mobile apps

Prevents code interception attacks.

---

## 📊 Quick Comparison

| Grant Type                | User Login | Where Used       | Status       |
| ------------------------- | ---------- | ---------------- | ------------ |
| Authorization Code + PKCE | ✅          | Web, SPA, Mobile | ⭐ Best       |
| Client Credentials        | ❌          | Microservices    | ⭐ Best       |
| Refresh Token             | ❌          | Session renewal  | ⭐            |
| Device Code               | ✅          | TV / CLI         | ⭐            |
| Implicit                  | ✅          | Old SPA          | ❌ Deprecated |
| Password (ROPC)           | ✅          | Old apps         | ❌ Deprecated |

---

## 🧠 Real World Mapping (your kind of backend system)

| Scenario                | Grant                     |
| ----------------------- | ------------------------- |
| Angular app login       | Authorization Code + PKCE |
| Service to service call | Client Credentials        |
| Keep user logged in     | Refresh Token             |
| CLI tool login          | Device Code               |

---

## One-liner memory trick

> **User in browser? → Auth Code**
> **No user? → Client Credentials**
> **Need new token? → Refresh**
> **No browser? → Device Code**

---

| Grant Type (Actual `grant_type` value)         | Common Name                                | User Involved             | Typical Use Case                              | Status / Notes                             |
| ---------------------------------------------- | ------------------------------------------ | ------------------------- | --------------------------------------------- | ------------------------------------------ |
| `authorization_code`                           | Authorization Code                         | ✅ Yes                     | Web apps, SPA, Mobile apps (with PKCE)        | ⭐ Recommended standard                     |
| `client_credentials`                           | Client Credentials                         | ❌ No                      | Service-to-service / microservices            | ⭐ Recommended                              |
| `refresh_token`                                | Refresh Token                              | ❌ No                      | Get new access token without login            | ⭐ Used with auth code                      |
| `urn:ietf:params:oauth:grant-type:device_code` | Device Code                                | ✅ Yes (on another device) | TV, CLI tools, IoT devices                    | ⭐ Recommended for devices                  |
| `password`                                     | Resource Owner Password Credentials (ROPC) | ✅ Yes                     | Legacy apps asking username/password directly | ❌ Deprecated / avoid                       |
| `implicit`                                     | Implicit Grant                             | ✅ Yes                     | Old browser-based apps                        | ❌ Deprecated / removed from best practices |

---

### Example Token Requests

**Authorization Code**

```
grant_type=authorization_code
```

**Client Credentials**

```
grant_type=client_credentials
```

**Refresh Token**

```
grant_type=refresh_token
```

**Device Code**

```
grant_type=urn:ietf:params:oauth:grant-type:device_code
```

**Password (deprecated)**

```
grant_type=password
```
