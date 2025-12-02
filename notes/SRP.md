## 🟢 **S – Single Responsibility Principle (SRP)**

**Definition:**
A class should have **only one reason to change**, meaning it should only have one job or responsibility.

**Why it matters:**
When a class has multiple responsibilities, changes to one responsibility might affect other functionalities. Keeping a class focused on one task makes it easier to maintain and test.

**Example:**

```java
class ReportGenerator {
    public void generateReport() {
        // logic to generate report
    }
}

class ReportPrinter {
    public void printReport(Report report) {
        // logic to print the report
    }
}
```

Here, `ReportGenerator` and `ReportPrinter` have **separate** responsibilities: generating and printing reports. If you need to change how printing works, you don't need to modify the report generation logic.

---

# Why putting both methods in one class *seems okay initially*

If you put `generateReport()` and `printReport()` in the same class, you *can still change the methods independently*.
Nothing will break immediately.

For small projects or 2–3 methods, you won’t feel the pain.

Example:

```java
class ReportService {
    void generateReport() {}
    void printReport() {}
}
```

This technically works.

---

# ❌ But here is the real-world problem (what actually goes wrong)

As the system grows, these issues appear:

---

## **1. Change in one responsibility forces class re-testing**

If a class has two responsibilities:

* generating reports
* printing reports

Then changing printing code means:

* you recompile the class
* you retest everything
* you redeploy the entire component

Even though generation logic never changed.

**More responsibilities → more regression testing → more bugs.**

---

## **2. Violates “Separation of Change” — when business rules expand**

Initially:

* report printing = 20 lines
* report generation = 30 lines

Six months later:

* printing supports PDF, Excel, HTML
* generation supports daily, weekly, yearly summaries

Now the class becomes 300–400 lines.
Now changes *will* collide.

---

## **3. Harder to extend**

If printing and generating are mixed, adding new features becomes painful:

> Add support for sending the report by email
> Add a scheduler to auto-generate reports
> Add a new Excel formatter

Now one class must handle:

* generation
* printing
* email sending
* scheduling
* formatting

Your class becomes a **god class**.
Testing becomes hell.

---

## **4. Harder to reuse**

What if another service wants only the printing logic?

If both are in one class, you either:

✔ reuse the bloated class
✘ duplicate code
✘ or extract later → double work

---

## **5. Harder to mock in tests**

Mocking a class with multiple unrelated methods is painful:

```java
ReportService service = mock(ReportService.class);
```

Now tests that need only printing accidentally depend on generation.

Small problem → big time-waste when the system grows.

---

# 💡 The best way to understand this:

### Putting both methods in one class works.

But…

### Maintaining a class with 2 responsibilities → 2× more effort

### Maintaining a class with 4 responsibilities → 4× more effort

### Maintaining a class with 10 responsibilities → impossible

SRP prevents the slow death of your codebase.

---

# 👇 Ultimate practical rule (not textbook)

> **Every class should change for only ONE business reason.
> Not one “method reason”. One BUSINESS reason.**

If printing rules change → only `ReportPrinter` changes.

If generation logic changes → only `ReportGenerator` changes.

This simplifies maintenance massively when your codebase grows beyond a few files.

---

# 👍 Final answer

Yes, putting both methods into the same class **won’t harm immediately** for small code.

But **as the project grows**, it will:

* lead to bigger classes
* make changes harder
* increase regressions
* force unnecessary testing
* tightly couple unrelated logic
* reduce code quality

**That’s why SRP exists — not for today, but for 6 months later.**

---

Here are **the clearest, most practical rules of thumb** used by senior engineers and architects to decide **when to split a class** — not theory, only real-world guidance.

---

# 🔹 **Rule of Thumb #1: The class has more than ONE business reason to change**

Ask yourself:

> **If the business changes Requirement A, will this class change?**
> **If the business changes Requirement B, will this class also change?**

If the answer is **yes** for two different business reasons → **split the class**.

### Example

* Business changes printing format → class must change
* Business changes generation rules → class must also change

Two reasons → **split**.

---

# 🔹 **Rule of Thumb #2: Methods inside the class don’t belong together logically**

Ask:

> “Do these methods feel like they belong to the same purpose?”

If the answer is **no**, split.

### Example

`generateReport()` and `printReport()` do not belong together logically.

---

# 🔹 **Rule of Thumb #3: Class name contains ‘and’ or gets too long**

If your class name sounds like:

* `ReportGenerationAndPrintingService`
* `OrderAndInventoryManager`
* `UserAndEmailService`

Or you try to find a big name like:

* `ReportAwesomeProcessingManagerServiceUtil`

Then it's doing too much → **split**.

💡 *If you cannot name it simply, the class is violating SRP.*

---

# 🔹 **Rule of Thumb #4: Class keeps growing every few weeks**

If each new requirement adds 20–30 lines to the same class:

* It will become a God class
* Hard to maintain
* High chances of bugs

This is the best time to split before it becomes 1000 lines.

---

# 🔹 **Rule of Thumb #5: You cannot test the class in isolation**

If unit testing the class becomes difficult because:

* printing depends on generation
* saving depends on formatting
* emailing depends on DB

Then **split**.

Testability is a strong indicator of responsibility separation.

---

# 🔹 **Rule of Thumb #6: Some methods are used by one module, others by another**

Classic sign of multiple responsibilities.

Example:

* OrderService.createOrder() → called by checkout
* OrderService.cancelOrder() → used by admin
* OrderService.sendEmail() → used by marketing
* OrderService.updateInventory() → used by inventory module

Absolute violation → split into dedicated services.

---

# 🔹 **Rule of Thumb #7: You often pass too many unused dependencies**

If your class constructor looks like:

```java
ReportService(ReportGenerator gen, ReportPrinter printer, EmailSender emailer, DBRepo repo)
```

And some methods don’t even need those dependencies → **split**.

---

# 🔹 **Rule of Thumb #8: You feel scared to modify the class**

This is the biggest practical sign.

If developers think:

> “Yaar is class ko mat touch karna… kuch na kuch tutega.”

Time to split.

---

# 🔹 **Rule of Thumb #9: Code review comments repeatedly say: "Move this out"**

If multiple developers feel something doesn’t belong there → it probably doesn’t.

---

# 🔹 **The Easiest Shortcut (Golden Rule)**

### 👉 **If a class does more than ONE thing, split it.**

### 👉 **If a class changes for more than ONE reason, split it.**

If you're *thinking* whether to split → **split it**.
Small classes are always cheaper than big classes.

---
