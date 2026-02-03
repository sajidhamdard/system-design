In Liberty, OAuth2/OIDC is not “code you write”.
It’s **features + server.xml wiring** doing the heavy lifting.

You typically see this combo:

* `openidConnectClient-1.0`
* `appSecurity-3.0`
* `mpJwt-1.2` (sometimes)
* `web.xml` or annotations with roles

That’s the real engine.

---

## 🧠 What Liberty is actually doing

When you add:

```xml
<feature>openidConnectClient-1.0</feature>
```

Liberty becomes an **OIDC Relying Party (client)**.

It will:

1. Redirect user to IdP login
2. Receive **Authorization Code**
3. Exchange it for:

   * Access Token
   * **ID Token (JWT)**
4. Validate the ID Token
5. Create a **Liberty authenticated Subject**
6. Inject roles into your app

You never see this code — Liberty does it.

---

## 🔁 Real Flow in Liberty

```
Browser → Liberty → IdP → Liberty → Your App
```

Step by step:

1. User hits protected URL `/app/home`
2. Liberty sees user not logged in
3. Liberty redirects to IdP (OIDC authorize endpoint)
4. User logs in
5. IdP sends code back to Liberty
6. Liberty calls token endpoint
7. Liberty validates **ID Token**
8. Liberty creates security context
9. Request reaches your servlet/rest

---

## 🧩 The Key Config: `server.xml`

### Typical config you have but never realized the power of

```xml
<featureManager>
    <feature>appSecurity-3.0</feature>
    <feature>openidConnectClient-1.0</feature>
</featureManager>

<openidConnectClient id="oidcClient"
    clientId="abc"
    clientSecret="xyz"
    discoveryEndpoint="https://idp/.well-known/openid-configuration"
    scope="openid profile email"/>
```

### This line is the magic

```
scope="openid profile email"
```

This is what turns OAuth2 → **OpenID Connect**.

---

## 🪪 Where Liberty uses the ID Token

Liberty extracts from ID Token:

* `sub` → user id
* `email`
* `groups` / `roles` claim

And maps them to:

```java
request.getUserPrincipal()
request.isUserInRole("admin")
```

That’s how your app knows the user.

You never parsed JWT — Liberty did.

---

## 🛡️ How your app is protected

Somewhere you have either:

### web.xml

```xml
<security-constraint>
  <web-resource-collection>
    <url-pattern>/api/*</url-pattern>
  </web-resource-collection>
  <auth-constraint>
    <role-name>user</role-name>
  </auth-constraint>
</security-constraint>
```

or annotations:

```java
@RolesAllowed("user")
```

Liberty checks role from **ID token claims**.

---

## 🧠 Important realization

You thought:

> “We are using OAuth2”

But actually Liberty is using:

> **OpenID Connect on top of OAuth2**

Because of `scope=openid`.

---

## 🗺️ Visual Map

```
ID Token (OIDC) ──► Liberty ──► Security Context ──► Your Code
```

Access token is mostly ignored unless you call downstream APIs.

---

## 🧪 How to prove this in your running app (very important)

Open browser dev tools after login.

You will see redirect like:

```
/callback?code=eyJhbGciOi...
```

That is OAuth2 code flow.

Then check Liberty logs:

You will see logs about **ID Token validation**.

---

## 🏁 Final clarity

| You see in code      | What Liberty is doing     |
| -------------------- | ------------------------- |
| Nothing              | OIDC Code Flow            |
| `@RolesAllowed`      | Roles from ID Token       |
| `getUserPrincipal()` | Subject from ID Token     |
| server.xml config    | Full OAuth2 + OIDC engine |

---

### Interview-level one-liner for your project

> “In our Liberty project, we configured `openidConnectClient-1.0`, so Liberty handles the full OIDC authorization code flow, validates the ID token, and creates the security context used by our application.”
