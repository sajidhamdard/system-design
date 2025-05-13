## JWT

### JWT Signing Algorithms (used in `.signWith()`)

JWT supports 2 broad categories of algorithms:

| Algorithm | Type                 | Description                                                                   |
| --------- | -------------------- | ----------------------------------------------------------------------------- |
| **HS256** | HMAC (symmetric)     | HMAC using SHA-256 hash, same key used to sign and verify                     |
| **HS384** | HMAC (symmetric)     | HMAC using SHA-384                                                            |
| **HS512** | HMAC (symmetric)     | HMAC using SHA-512                                                            |
| **RS256** | RSA (asymmetric)     | RSA signature with SHA-256 hash, private key to sign and public key to verify |
| **RS384** | RSA (asymmetric)     | RSA signature with SHA-384                                                    |
| **RS512** | RSA (asymmetric)     | RSA signature with SHA-512                                                    |
| **ES256** | ECDSA (asymmetric)   | ECDSA signature with SHA-256                                                  |
| **PS256** | RSA-PSS (asymmetric) | Probabilistic RSA signature with SHA-256                                      |

---

### Most commonly used in real apps:

* **HS256** → for simple apps where both sides share a secret key (symmetric)
* **RS256** → for apps where private/public keys are used (asymmetric), e.g., OAuth2 / OpenID Connect

---

### What does `.signWith()` look like?

```java
.signWith(SignatureAlgorithm.HS256, secretKey)
```

OR

```java
.signWith(SignatureAlgorithm.RS256, privateKey)
```

---

## **HS256 vs ES256** **and symmetric vs asymmetric**

---

## 1. **Symmetric vs Asymmetric cryptography (simple terms)**

| Symmetric                                                       | Asymmetric                                                       |
| --------------------------------------------------------------- | ---------------------------------------------------------------- |
| **Same key** is used to **sign** and **verify**                 | **Two keys**: **Private key** (sign) and **Public key** (verify) |
| Both sender and receiver must **share the secret key** securely | Private key is **kept secret**, Public key is **shared openly**  |
| **Fast**, but key distribution is tricky                        | **Slightly slower**, but easier to distribute public key         |
| Example algorithms: **HS256** (HMAC)                            | Example algorithms: **RS256**, **ES256**                         |

#### Example analogy:

* Symmetric → Like both of us having the **same lock and key**. If you know the key, you can both lock and unlock.
* Asymmetric → Like me having a **lock (public key)** that I give to everyone, but only **I have the key (private key)** that can lock/unlock something securely.

---

## 2. **HS256 vs ES256 (difference)**

| HS256                                               | ES256                                                                        |
| --------------------------------------------------- | ---------------------------------------------------------------------------- |
| **HMAC with SHA-256**                               | **ECDSA (Elliptic Curve Digital Signature Algorithm) with SHA-256**          |
| **Symmetric** — same secret key for sign and verify | **Asymmetric** — private key (sign), public key (verify)                     |
| Easier to implement if same party signs & verifies  | Better for distributed systems (public key can be widely shared)             |
| Faster (because HMAC is fast)                       | Slower but more secure for certain applications                              |
| Shorter key is enough (e.g., 256-bit secret)        | Uses **elliptic curve cryptography** — shorter keys but very strong security |
| Common in small internal apps                       | Common in **OpenID Connect**, **OAuth2**, modern APIs                        |

---

## 3. **JWT Token header (algorithm field)**

When you create a JWT token, its header contains:

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

or

```json
{
  "alg": "ES256",
  "typ": "JWT"
}
```

The `alg` field tells which algorithm was used to sign the token.

---

## 4. **When should you use HS256 vs ES256?**

| Situation                                                                                                                          | Recommended          |
| ---------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| Small internal app, both sides trust each other and share secret                                                                   | **HS256**            |
| Large distributed app (OAuth2, OpenID Connect), where many services need to verify the token but **only one party** should sign it | **ES256** (or RS256) |

---

## Quick summary (if asked in an interview)

* **HS256** is symmetric → same secret key is used to sign and verify.
* **ES256** is asymmetric → private key signs, public key verifies, uses elliptic curve crypto (secure + shorter keys).
* Use **HS256** if both parties trust and securely share a secret.
* Use **ES256** (or RS256) when public verification is needed and private signing is required (e.g., OAuth2).

---

Perfect — let's get to the core of this, because understanding **HS256 vs ES256** **and symmetric vs asymmetric** is important (not just for interviews, but for real-world usage too).

---

## 1. **Symmetric vs Asymmetric cryptography (simple terms)**

| Symmetric                                                       | Asymmetric                                                       |
| --------------------------------------------------------------- | ---------------------------------------------------------------- |
| **Same key** is used to **sign** and **verify**                 | **Two keys**: **Private key** (sign) and **Public key** (verify) |
| Both sender and receiver must **share the secret key** securely | Private key is **kept secret**, Public key is **shared openly**  |
| **Fast**, but key distribution is tricky                        | **Slightly slower**, but easier to distribute public key         |
| Example algorithms: **HS256** (HMAC)                            | Example algorithms: **RS256**, **ES256**                         |

#### Example analogy:

* Symmetric → Like both of us having the **same lock and key**. If you know the key, you can both lock and unlock.
* Asymmetric → Like me having a **lock (public key)** that I give to everyone, but only **I have the key (private key)** that can lock/unlock something securely.

---

## 2. **HS256 vs ES256 (difference)**

| HS256                                               | ES256                                                                        |
| --------------------------------------------------- | ---------------------------------------------------------------------------- |
| **HMAC with SHA-256**                               | **ECDSA (Elliptic Curve Digital Signature Algorithm) with SHA-256**          |
| **Symmetric** — same secret key for sign and verify | **Asymmetric** — private key (sign), public key (verify)                     |
| Easier to implement if same party signs & verifies  | Better for distributed systems (public key can be widely shared)             |
| Faster (because HMAC is fast)                       | Slower but more secure for certain applications                              |
| Shorter key is enough (e.g., 256-bit secret)        | Uses **elliptic curve cryptography** — shorter keys but very strong security |
| Common in small internal apps                       | Common in **OpenID Connect**, **OAuth2**, modern APIs                        |

---

## 3. **JWT Token header (algorithm field)**

When you create a JWT token, its header contains:

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

or

```json
{
  "alg": "ES256",
  "typ": "JWT"
}
```

The `alg` field tells which algorithm was used to sign the token.

---

## 4. **When should you use HS256 vs ES256?**

| Situation                                                                                                                          | Recommended          |
| ---------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| Small internal app, both sides trust each other and share secret                                                                   | **HS256**            |
| Large distributed app (OAuth2, OpenID Connect), where many services need to verify the token but **only one party** should sign it | **ES256** (or RS256) |

---

## Quick summary (if asked in an interview)

* **HS256** is symmetric → same secret key is used to sign and verify.
* **ES256** is asymmetric → private key signs, public key verifies, uses elliptic curve crypto (secure + shorter keys).
* Use **HS256** if both parties trust and securely share a secret.
* Use **ES256** (or RS256) when public verification is needed and private signing is required (e.g., OAuth2).

---

## **JWT Flow (Sign vs Verify)**

| Operation  | Who does it?                        | What does it do?                                                     | Purpose                                                                 |
| ---------- | ----------------------------------- | -------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| **Sign**   | Token creator (server/auth system)  | Creates a **signature** for the JWT using a key (secret/private)     | Ensures token **cannot be tampered** with                               |
| **Verify** | Token consumer (API/backend/client) | Checks that the **signature is valid** using the key (secret/public) | Ensures token **was not modified** and **was issued by trusted source** |

---

### Imagine this story:

#### 1. **Sign the JWT (Token creation)**

You (the server) issue a JWT like:

```json
{
  "sub": "alice",
  "role": "admin"
}
```

If you don't **sign** it, anyone can just edit `"role": "admin"` to `"role": "user"` — dangerous!

So you **sign** the token:

* HS256 → use **secret key** to sign
* RS256 → use **private key** to sign

This generates a **signature** and adds it to JWT:

```
header.payload.signature
```

Now if **anyone changes even 1 letter**, the signature **won’t match** anymore.

---

#### 2. **Verify the JWT (Token usage)**

Now a client sends the JWT back to your server in a request:

```
Authorization: Bearer <token>
```

Your backend will:

* Extract **header.payload**
* Compute the **expected signature** (using same key or public key)
* Compare it to the signature in token

If **they match** → token is valid.
If **not** → token is tampered → reject it!

---

## **Key takeaway (memorize)**

* **Sign** = Attach a proof that data is authentic and unmodified
* **Verify** = Check that proof (is signature valid? is data untouched?)

---

## **HS256 vs RS256 in this flow**

| Step   | HS256 (Symmetric)   | RS256 (Asymmetric) |
| ------ | ------------------- | ------------------ |
| Sign   | Use secret key      | Use private key    |
| Verify | Use same secret key | Use public key     |

---

## **Analogy (non-technical)**

* **Sign** = I write you a letter and **sign it with my unique signature**
* **Verify** = You compare the signature to my known signature to check **I actually wrote it** and **it wasn’t modified**

---

Excellent question — you’re drilling into the **exact terminology**, which interviewers *love* when candidates are clear about.

Here’s the clean answer:

---

> **HS256 and RS256 are algorithms used for signing and verifying JSON Web Tokens (JWTs).**

They are called **JWS algorithms**
(JWS = **JSON Web Signature**)

---

## To be precise:

* **JWT** (JSON Web Token) is the whole concept → it contains header, payload, signature
* The **signature** part of JWT uses **JWS algorithms**
* **HS256** and **RS256** are **JWS algorithms** → they define **how the signature is generated and verified**

> You can simply say:
> *“HS256 and RS256 are signature algorithms used in JWT for signing and verifying tokens.”*

---

## What does **HS256** exactly mean?

* **H** = HMAC (Hash-based Message Authentication Code)
* **S256** = SHA-256 hash function

→ So HS256 = **HMAC using SHA-256**

---

## What does **RS256** exactly mean?

* **R** = RSA (Rivest–Shamir–Adleman cryptography)
* **S256** = SHA-256 hash function

→ So RS256 = **RSA Signature with SHA-256**

---

## Interview-friendly 1-liner:

> **HS256** and **RS256** are **JWS algorithms** used to sign and verify JWT tokens.
> HS256 uses **HMAC + SHA-256** (symmetric), RS256 uses **RSA + SHA-256** (asymmetric)

---

## FYI (if you want to sound expert)

There are **other JWS algorithms** too:

| Algorithm | Type       | Description                             |
| --------- | ---------- | --------------------------------------- |
| HS256     | Symmetric  | HMAC + SHA-256                          |
| HS384     | Symmetric  | HMAC + SHA-384                          |
| HS512     | Symmetric  | HMAC + SHA-512                          |
| RS256     | Asymmetric | RSA + SHA-256                           |
| RS384     | Asymmetric | RSA + SHA-384                           |
| RS512     | Asymmetric | RSA + SHA-512                           |
| ES256     | Asymmetric | ECDSA + SHA-256                         |
| PS256     | Asymmetric | RSASSA-PSS + SHA-256 (RSA with padding) |

---

## Final takeaway (memorize)

> **HS256 and RS256 are signing algorithms used in JWT — they define how the token’s signature is created and verified.**
> HS = HMAC (symmetric), RS = RSA (asymmetric)

---

## **First** — What is **RS512**?

* **RS512** = **RSA signature + SHA-512**
  (It’s exactly like RS256 but uses **SHA-512** instead of SHA-256)

| Algorithm | Hash used | Security strength (bits) | Output size |
| --------- | --------- | ------------------------ | ----------- |
| **RS256** | SHA-256   | 128 bits                 | Smaller     |
| **RS384** | SHA-384   | 192 bits                 | Medium      |
| **RS512** | SHA-512   | 256 bits                 | Larger      |

* So **RS512** gives a **stronger cryptographic hash** (more secure signature)
* But signature size is **bigger** and computation is **slower**

---

## **When should I use RS512?**

| Scenario                                                                                            | Why RS512 makes sense                                 |
| --------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| Your security policies **demand very strong hashing** (eg. financial, military, healthcare systems) | RS512 = higher security margin                        |
| You're dealing with **long-lived JWT tokens** (eg. refresh tokens valid for days/weeks)             | Higher security = safer if token is intercepted later |
| Your system already uses **RSA-4096** (very strong keys)                                            | Using RS512 aligns hash strength with key strength    |
| Your **compliance regulations** (eg. PCI DSS, HIPAA) recommend stronger hashes                      | RS512 can satisfy those guidelines                    |

---

## **When NOT to use RS512?**

(Because bigger signature = slower + heavier)

| Scenario                                                     | Better to use RS256                                            |
| ------------------------------------------------------------ | -------------------------------------------------------------- |
| Short-lived tokens (access tokens, < 1 hour expiry)          | RS256 is enough                                                |
| You want **faster performance** (mobile apps, high QPS APIs) | RS256 is faster and smaller                                    |
| Key size is only RSA-2048 (smaller RSA key)                  | RS256 hash strength matches RSA-2048 key fine — RS512 overkill |

---

## **Practical industry usage (truth)**

Most systems (even Google, Auth0, Okta) default to **RS256** — because:

* It's secure enough
* Fast
* Signature size is smaller (\~256 bytes)

They **don’t bother with RS512** unless strict security/compliance says so.

---

## **Interview 1-liner (memorize)**

> **RS512** is used when higher security is needed (stronger hash), like in financial, healthcare, or long-lived tokens — but in most cases **RS256** is preferred for speed and size.

---

## **My honest advice for interviews**

Unless explicitly told by company’s **security policy**, always recommend **RS256** as default, and mention:

> “We could upgrade to **RS512** if security/compliance demands stronger protection, but typically **RS256** is more balanced.”
