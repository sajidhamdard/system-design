## **1️⃣ What is Encoding?**

**Encoding** is the process of **transforming data from one format into another** so that it can be **stored, transmitted, or used more efficiently**.

* It **does not hide data** (unlike encryption)
* Its purpose is usually **compatibility, storage, or readability**

**Example:**

* Text `"Hello"` in ASCII encoding → `[72, 101, 108, 108, 111]`
* Text `"Hello"` in UTF-8 → `[48 65 6c 6c 6f]` (hex)

---

## **2️⃣ Why Encoding is Used**

1. **Data Transmission:**

   * Send binary data over text-based protocols (like email, JSON, URLs)
   * Example: Base64 encoding lets you send images via JSON safely

2. **Storage Efficiency:**

   * Encode numeric or binary data in smaller formats
   * Example: Base36 encoding compresses numbers into shorter strings

3. **Interoperability:**

   * Different systems understand different formats, encoding ensures **compatibility**

---

## **3️⃣ Common Types of Encoding**

| Encoding Type                       | Purpose / Usage                                              | Example                             |
| ----------------------------------- | ------------------------------------------------------------ | ----------------------------------- |
| **ASCII / UTF-8 / UTF-16**          | Represent text as bytes                                      | `"A"` → `65` in ASCII               |
| **Base64**                          | Encode binary as text (emails, JSON, XML)                    | Image bytes → `"iVBORw0KGgoAAA..."` |
| **Base32**                          | Encode binary as text (shorter alphabet, case-insensitive)   | `"JBSWY3DP"`                        |
| **Base16 / Hex**                    | Encode bytes in hexadecimal                                  | `255` → `"FF"`                      |
| **Base36**                          | Encode numeric IDs in **alphanumeric characters (0-9, a-z)** | `123456` → `"2n9c"`                 |
| **URL Encoding (Percent Encoding)** | Encode special characters for URLs                           | `" "` → `%20`, `"&"` → `%26`        |
| **Binary / Bit-level encoding**     | Store numbers in bits efficiently                            | `5` → `101`                         |

---

## **4️⃣ Base36 Encoding**

* Uses **digits 0–9** and **letters a–z** to represent numbers
* **Purpose:** Shorten numeric IDs into **compact, readable strings**

### Example:

```text
Decimal  -> Base36
123456   -> 2n9c
987654321 -> lfls1
```

* **Advantages:**

  * Shorter than decimal representation
  * Can be used in URLs or as **human-friendly IDs**
* **Disadvantages:**

  * Limited to integers
  * Not suitable for secure data (use encoding + encryption for security)

---

### **5️⃣ Encoding vs Encryption vs Compression**

| Concept         | Purpose                     | Reversible | Security |
| --------------- | --------------------------- | ---------- | -------- |
| **Encoding**    | Transform format            | ✅          | ❌        |
| **Encryption**  | Hide data / confidentiality | ✅          | ✅        |
| **Compression** | Reduce size                 | ✅          | ❌        |

---

### **6️⃣ Quick Analogy**

* **Encoding** → Translate English → Morse code (still readable to machines)
* **Encryption** → Translate English → secret code (only readable with key)
* **Compression** → Shrink English → remove spaces/shorten words

---
