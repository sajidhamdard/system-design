# SOLID Principle

### **SOLID Principles** – A Guide to Better Object-Oriented Design

**SOLID** is an acronym that stands for five **object-oriented design principles** intended to make software more understandable, flexible, and maintainable. They help in **creating clean code** that is easy to refactor, test, and extend. These principles are:

---

### 🟢 **S – Single Responsibility Principle (SRP)**

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

### 🔵 **O – Open/Closed Principle (OCP)**

**Definition:**
Software entities (classes, modules, functions, etc.) should be **open for extension**, but **closed for modification**.

**Why it matters:**
You should be able to add new behavior to existing code without modifying it. This prevents breaking existing functionality and promotes **extensibility**.

**Example:**

```java
interface PaymentStrategy {
    void pay(int amount);
}

class CreditCardPayment implements PaymentStrategy {
    public void pay(int amount) {
        System.out.println("Paid " + amount + " via Credit Card");
    }
}

class ShoppingCart {
    private PaymentStrategy paymentStrategy;
    
    public void checkout(int amount) {
        paymentStrategy.pay(amount);
    }
}
```

Here, if you add a new `PayPalPayment` strategy, you don't modify existing code but **extend** it by creating a new class. This makes the code **open for extension** but **closed for modification**.

---

### 🟠 **L – Liskov Substitution Principle (LSP)**

**Definition:**
Objects of a superclass should be replaceable with objects of a subclass without affecting the functionality of the program.

**Why it matters:**
Subtypes must behave in such a way that the system **can substitute them** without altering the correct behavior of the system. Violating LSP leads to unexpected behavior.

**Example:**

```java
class Bird {
    public void fly() {
        System.out.println("Flying");
    }
}

class Sparrow extends Bird {
    @Override
    public void fly() {
        System.out.println("Sparrow flying");
    }
}

class Ostrich extends Bird {
    @Override
    public void fly() {
        throw new UnsupportedOperationException("Ostriches can't fly");
    }
}
```

Here, substituting an `Ostrich` for a `Bird` would violate the expected behavior, because `Ostrich` cannot fly. To fix this, you could introduce an interface like `Flyable` to separate birds that can fly.

---

### 🟡 **I – Interface Segregation Principle (ISP)**

**Definition:**
Clients should not be forced to depend on interfaces they do not use.

**Why it matters:**
Rather than having one large interface with many methods, break it down into smaller, more specific interfaces. This ensures that clients don't have to implement methods they don't need.

**Example:**

```java
interface Bird {
    void fly();
    void swim();
}

class Duck implements Bird {
    public void fly() {
        System.out.println("Duck flying");
    }
    
    public void swim() {
        System.out.println("Duck swimming");
    }
}

class Penguin implements Bird {
    public void fly() {
        throw new UnsupportedOperationException("Penguins can't fly");
    }
    
    public void swim() {
        System.out.println("Penguin swimming");
    }
}
```

In this case, a `Penguin` should not be forced to implement `fly()`. Instead, split the `Bird` interface into two: `Flyable` and `Swimmable`.

---

### 🟣 **D – Dependency Inversion Principle (DIP)**

**Definition:**
High-level modules should not depend on low-level modules. Both should depend on abstractions. Abstractions should not depend on details. Details should depend on abstractions.

**Why it matters:**
DIP reduces coupling between high-level and low-level modules by introducing abstractions. This makes code **more flexible** and **testable**.

**Example:**

```java
interface Database {
    void save();
}

class MySQLDatabase implements Database {
    public void save() {
        System.out.println("Saving to MySQL Database");
    }
}

class PostgresDatabase implements Database {
    public void save() {
        System.out.println("Saving to PostgreSQL Database");
    }
}

class UserService {
    private Database database;

    public UserService(Database database) {
        this.database = database;
    }

    public void createUser() {
        database.save();
    }
}
```

Here, `UserService` depends on the abstraction `Database`, not on the concrete database implementations. This allows easy switching between database types without modifying the `UserService`.

---

### 🔄 **Why SOLID Matters?**

* **Maintainability:** Easier to maintain and extend code.
* **Testability:** Smaller, focused classes are easier to test.
* **Scalability:** New features or classes can be added with minimal changes to existing code.
* **Flexibility:** You can swap out different behaviors (e.g., strategies, policies) without altering the core logic.

---

### 🚀 **SOLID Principle Recap**

* **S (SRP):** A class should have one responsibility.
* **O (OCP):** Open for extension, closed for modification.
* **L (LSP):** Subtypes must be replaceable for their base types.
* **I (ISP):** Clients should not depend on methods they don’t use.
* **D (DIP):** Depend on abstractions, not concrete classes.

---

By following these principles, developers can create more modular, adaptable, and maintainable software systems, which is particularly important in large and complex codebases.

## Code Examples

### Single Responsibility Principle (SRP)

```java
// Before SRP
class User {
    private String username;
    private String email;

    public void saveUser() {
        // code to save user to the database
    }

    public void sendEmail() {
        // code to send a welcome email
    }
}

// After SRP
class User {
    private String username;
    private String email;

    public void saveUser() {
        // code to save user to the database
    }
}

class EmailSender {
    public void sendEmail(User user) {
        // code to send a welcome email
    }
}
```

In the improved version, the User class now only handles user-related functionality, while the EmailSender class is responsible for sending emails.

### Open/Closed Principle (OCP)

```java
// Before OCP
class Rectangle {
    public double width;
    public double height;
}

class AreaCalculator {
    public double calculateArea(Rectangle rectangle) {
        return rectangle.width * rectangle.height;
    }
}

// After OCP
interface Shape {
    double calculateArea();
}

class Rectangle implements Shape {
    private double width;
    private double height;

    @Override
    public double calculateArea() {
        return width * height;
    }
}

class Circle implements Shape {
    private double radius;

    @Override
    public double calculateArea() {
        return Math.PI * radius * radius;
    }
}
```

With the use of interfaces and polymorphism, we can add new shapes (like Circle) without modifying existing code.

### Liskov Substitution Principle (LSP)

```java
// Before LSP
class Bird {
    public void fly() {
        // code to make the bird fly
    }
}

class Ostrich extends Bird {
    // Ostrich is a bird that cannot fly
}

// After LSP
interface Flyable {
    void fly();
}

class Bird implements Flyable {
    @Override
    public void fly() {
        // code to make the bird fly
    }
}

class Ostrich implements Flyable {
    @Override
    public void fly() {
        throw new UnsupportedOperationException("Ostrich cannot fly");
    }
}
```

Now, both Bird and Ostrich implement the Flyable interface, but Ostrich overrides the fly method to throw an exception since ostriches cannot fly.


### Interface Segregation Principle (ISP)

```java
// Before ISP
interface Worker {
    void work();
    void eat();
}

class Human implements Worker {
    @Override
    public void work() {
        // code for working
    }

    @Override
    public void eat() {
        // code for eating
    }
}

class Robot implements Worker {
    @Override
    public void work() {
        // code for working
    }

    @Override
    public void eat() {
        // robots don't eat, but we're forced to implement the method
    }
}

// After ISP
interface Workable {
    void work();
}

interface Eatable {
    void eat();
}

class Human implements Workable, Eatable {
    @Override
    public void work() {
        // code for working
    }

    @Override
    public void eat() {
        // code for eating
    }
}

class Robot implements Workable {
    @Override
    public void work() {
        // code for working
    }
}
```

By breaking the Worker interface into smaller, more focused interfaces, classes can implement only the methods relevant to them.


### Dependency Inversion Principle (DIP)

```java
// Before DIP
class LightBulb {
    public void turnOn() {
        // code to turn on the light bulb
    }
}

class Switch {
    private LightBulb bulb;

    public Switch(LightBulb bulb) {
        this.bulb = bulb;
    }

    public void operate() {
        bulb.turnOn();
    }
}

// After DIP
interface Switchable {
    void turnOn();
}

class LightBulb implements Switchable {
    @Override
    public void turnOn() {
        // code to turn on the light bulb
    }
}

class Switch {
    private Switchable device;

    public Switch(Switchable device) {
        this.device = device;
    }

    public void operate() {
        device.turnOn();
    }
}
```

Now, the Switch depends on the Switchable interface instead of the concrete LightBulb class, allowing for more flexibility and easier substitution of different devices.
