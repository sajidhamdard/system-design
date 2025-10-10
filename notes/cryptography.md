## ⚙️ What is Cryptography?

**Definition:**

> Cryptography is the science of **protecting information by transforming it into an unreadable format**, so only **authorized parties can access it**.

**Purpose:**

* Confidentiality (keep data secret)
* Integrity (ensure data is not altered)
* Authentication (verify sender/receiver)
* Non-repudiation (prevent denial of action)

---

## 🔑 Core Concepts

| Concept        | Description                                                |
| -------------- | ---------------------------------------------------------- |
| **Plaintext**  | Original readable data                                     |
| **Ciphertext** | Encrypted data, unreadable without key                     |
| **Encryption** | Process of converting plaintext → ciphertext               |
| **Decryption** | Process of converting ciphertext → plaintext               |
| **Key**        | Secret value used to encrypt/decrypt                       |
| **Hashing**    | One-way transformation (no decryption), used for integrity |

---

## 🔒 Types of Cryptography

### 1. **Symmetric Key Cryptography**

* **Same key** is used for **encryption and decryption**.
* **Fast**, suitable for bulk data.
* **Problem:** Key distribution is challenging.

**Common Algorithms:**

* AES (Advanced Encryption Standard)
* DES / 3DES (Data Encryption Standard)
* RC4

**Example:**

```
Key: "secret123"
Plaintext: "Hello"
Ciphertext: "X7#%a9"
Decryption with same key → "Hello"
```

---

### 2. **Asymmetric Key Cryptography (Public-Key Cryptography)**

* Uses **two keys**:

  * **Public key** → encrypt
  * **Private key** → decrypt
* Solves key distribution problem.
* Slower than symmetric, often used for **key exchange and digital signatures**.

**Common Algorithms:**

* RSA
* ECC (Elliptic Curve Cryptography)
* DSA (Digital Signature Algorithm)

**Example:**

* Bob shares his public key
* Alice encrypts message with Bob’s public key
* Only Bob can decrypt with his private key

---

### 3. **Hash Functions**

* **One-way function**: converts data → fixed-length digest
* Cannot decrypt → used for integrity verification, password storage

**Common Algorithms:**

* SHA-256, SHA-3
* MD5 (deprecated)
* Bcrypt, Argon2 (for password hashing)

**Use case:**

* Storing passwords securely
* Checking file integrity

---

### 4. **Digital Signatures**

* Verify **authenticity and integrity** of a message
* Uses **asymmetric cryptography**

**Flow:**

1. Sender hashes the message
2. Sender encrypts hash with **private key** → signature
3. Receiver decrypts signature with sender’s **public key**, compares with hash

---

### 5. **Hybrid Cryptography**

* Combines **symmetric + asymmetric**
* Common in HTTPS / SSL/TLS

  * Asymmetric encryption to exchange symmetric key
  * Symmetric encryption for actual data transfer

---

## 🔧 Real-World Use Cases

| Use Case            | Type of Cryptography              |
| ------------------- | --------------------------------- |
| HTTPS / SSL/TLS     | Hybrid (RSA/ECDH + AES)           |
| VPN / IPsec         | Symmetric + asymmetric            |
| Digital Signatures  | Asymmetric (RSA, ECC)             |
| Password Storage    | Hashing (Bcrypt, Argon2)          |
| Encrypted Messaging | End-to-end encryption (AES + RSA) |

---

## ⚡ Key Takeaways

1. Cryptography ensures **confidentiality, integrity, authentication, non-repudiation**.
2. **Symmetric** → fast, same key
3. **Asymmetric** → secure key exchange, public/private keys
4. **Hashing** → integrity, one-way
5. **Digital signatures** → verify authenticity
6. **Hybrid systems** → combine speed + security (TLS, messaging apps)

---

💡 **Analogy:**

* **Symmetric key:** like a locked diary with **one key**.
* **Asymmetric key:** like a **mailbox**: anyone can drop a letter (encrypt with public key), only owner can open (private key).
* **Hashing:** like a **fingerprint** of a document — you can check if it changed but cannot recreate the document from it.

---
