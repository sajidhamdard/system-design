## 🔐 What is **Encryption**

**Encryption** is the process of converting **readable data (plaintext)** into **unreadable data (ciphertext)** using a **key**, so that **only authorized parties** can read it.

> 📖 In short:
> **Encryption = Protecting data confidentiality**
> by making it unreadable to anyone without the decryption key.

---

## 🧩 Basic Terms

| Term                   | Meaning                                                   |
| ---------------------- | --------------------------------------------------------- |
| **Plaintext**          | Original readable data (e.g., `"MyPassword123"`)          |
| **Ciphertext**         | Encrypted version (e.g., `"x8D@9#s!..."`)                 |
| **Key**                | Secret used to encrypt/decrypt data                       |
| **Algorithm (Cipher)** | Mathematical formula used for encryption (e.g., AES, RSA) |
| **Decryption**         | Reverse process of encryption to get back plaintext       |

---

## ⚙️ Encryption Mechanisms (Types)

There are **two main types** of encryption:

---

### 1. 🧠 **Symmetric Encryption**

* **Same key** is used for **encryption** and **decryption**.
* Very **fast and efficient**.
* But both sender and receiver must **share and protect the same secret key**.

**Example algorithms:**

* AES (Advanced Encryption Standard)
* DES / 3DES (older, now insecure)
* Blowfish
* ChaCha20

**Diagram:**

```
Plaintext + SecretKey → [Encrypt] → Ciphertext
Ciphertext + Same SecretKey → [Decrypt] → Plaintext
```

**Example use cases:**

* Encrypting data at rest (files, database)
* Disk encryption (BitLocker, LUKS)
* API tokens (stored locally)
* HTTPS session encryption (after initial handshake)

---

### 2. 🔑 **Asymmetric Encryption**

* Uses **two keys**:

  * **Public key** for encryption
  * **Private key** for decryption
* Slower but more secure for key exchange.

**Example algorithms:**

* RSA (Rivest–Shamir–Adleman)
* ECC (Elliptic Curve Cryptography)
* DSA (Digital Signature Algorithm)

**Diagram:**

```
Plaintext + PublicKey → [Encrypt] → Ciphertext
Ciphertext + PrivateKey → [Decrypt] → Plaintext
```

**Example use cases:**

* SSL/TLS (for secure web communication)
* SSH keys
* Digital signatures
* Secure key exchange before using symmetric encryption

---

### 3. 🔐 **Hybrid Encryption (Combination of both)**

Used in most real-world systems (like HTTPS).

**Why?**

* Asymmetric encryption (RSA/ECC) is **secure** but **slow**.
* Symmetric encryption (AES) is **fast** but requires **secure key sharing**.

✅ Solution:

* Use asymmetric encryption to **securely exchange** a symmetric key.
* Then use that symmetric key to encrypt actual data.

**Example:**

* In HTTPS:

  * SSL/TLS handshake uses RSA/ECC (asymmetric) to share a symmetric session key.
  * Data transfer then uses AES (symmetric) for speed.

---

## 🧰 Other Important Mechanisms Related to Encryption

### 1. **Hashing (Not Encryption)**

* One-way operation — cannot be decrypted.
* Used for **password storage**, **data integrity**.
* Example: SHA-256, bcrypt, Argon2, PBKDF2.

```
"password123" → SHA-256 → "ef92b778bafe771..."
```

### 2. **Digital Signatures**

* Ensure **authenticity** and **integrity**.
* Sender signs data with their **private key**, receiver verifies with **public key**.

### 3. **Transport Encryption**

* Data encrypted **in transit** (moving over network).
  → e.g., HTTPS, SSL/TLS.

### 4. **Encryption at Rest**

* Data encrypted **while stored** in databases, disks, or files.
  → e.g., AES-256 encryption for stored files.

### 5. **End-to-End Encryption**

* Data is encrypted by the sender and can **only be decrypted by the receiver** — not even the server can read it.
  → e.g., WhatsApp, Signal, Telegram (secret chats).

---

## 📦 Summary Table

| Type           | Key Type            | Speed    | Common Algorithms  | Typical Use                  |
| -------------- | ------------------- | -------- | ------------------ | ---------------------------- |
| **Symmetric**  | Same key            | Fast     | AES, DES, Blowfish | File, DB, session encryption |
| **Asymmetric** | Public/Private keys | Slow     | RSA, ECC           | SSL, digital signatures      |
| **Hybrid**     | Combination         | Balanced | RSA + AES          | HTTPS, secure messaging      |
| **Hashing**    | No key (one-way)    | Fast     | SHA-256, bcrypt    | Passwords, integrity checks  |

---

## 🧠 Real-world Examples

| System                  | Encryption Type              | Purpose               |
| ----------------------- | ---------------------------- | --------------------- |
| **HTTPS**               | Hybrid (RSA + AES)           | Secure web traffic    |
| **WhatsApp**            | End-to-End (Signal Protocol) | Private chat          |
| **AWS KMS**             | Symmetric + Asymmetric       | Secure key management |
| **Database Encryption** | AES (Symmetric)              | Data-at-rest security |
| **SSH**                 | Asymmetric (RSA/ECC)         | Secure remote login   |

---

## 🧭 In Summary

* **Encryption = hiding data from unauthorized users.**
* **Symmetric = fast, shared key.**
* **Asymmetric = secure, public/private keys.**
* **Hybrid = best of both worlds (used in HTTPS).**
* Always use **modern algorithms** like **AES-256** and **RSA-2048+** or **ECC**.

---
