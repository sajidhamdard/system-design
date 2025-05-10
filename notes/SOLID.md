# SOLID Principle

The SOLID principles are a set of five design principles that aim to guide software developers in creating more maintainable, flexible, and scalable software. These principles were introduced by Robert C. Martin and are widely used in object-oriented programming. The SOLID acronym represents the following principles:

- Single Responsibility Principle (SRP): A class should have only one reason to change, meaning that it should have only one responsibility. This principle encourages the organization of code into small, focused classes, each responsible for a specific task.

- Open/Closed Principle (OCP): Software entities (such as classes, modules, and functions) should be open for extension but closed for modification. This means that you should be able to add new functionality without altering existing code.

- Liskov Substitution Principle (LSP): Subtypes should be substitutable for their base types without affecting the correctness of the program. In other words, if a class is a subtype of another class, it should be able to be used interchangeably with its base class without causing issues.

- Interface Segregation Principle (ISP): Clients should not be forced to depend on interfaces they do not use. This principle advocates for the creation of small, specific interfaces tailored to the needs of the clients that use them, rather than large, monolithic interfaces.

- Dependency Inversion Principle (DIP): High-level modules should not depend on low-level modules. Both should depend on abstractions. This principle encourages the use of abstractions (e.g., interfaces or abstract classes) to decouple higher-level and lower-level modules, promoting flexibility and easier maintenance.

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
