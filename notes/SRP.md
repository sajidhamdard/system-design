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
