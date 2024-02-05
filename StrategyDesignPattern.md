# Strategy Design Pattern

The Strategy Design Pattern is a behavioral design pattern that defines a family of algorithms, encapsulates each algorithm, and makes them interchangeable. It allows the client to choose an algorithm from a family of algorithms at runtime, independently from clients that use it. This pattern promotes the principle of favoring composition over inheritance.

Here are the key participants in the Strategy Design Pattern:

1. Context:

 - This is the class that maintains a reference to the strategy object and may switch between different strategies. The context class typically has a method that delegates the work to the strategy.

2. Strategy:

 - This is an interface or an abstract class that defines a set of algorithms or behaviors. Each concrete strategy implements this interface or extends the abstract class, providing a specific implementation for the algorithm.

3. ConcreteStrategy:

 - These are the concrete implementations of the strategy interface. Each concrete strategy implements the algorithm defined by the strategy interface.

```java
// Strategy Interface
interface SortingStrategy {
    void sort(int[] data);
}

// Concrete Strategies
class BubbleSort implements SortingStrategy {
    @Override
    public void sort(int[] data) {
        // Implementation of Bubble Sort
        System.out.println("Sorting using Bubble Sort");
    }
}

class QuickSort implements SortingStrategy {
    @Override
    public void sort(int[] data) {
        // Implementation of Quick Sort
        System.out.println("Sorting using Quick Sort");
    }
}

// Context
class Sorter {
    private SortingStrategy strategy;

    public Sorter(SortingStrategy strategy) {
        this.strategy = strategy;
    }

    public void setStrategy(SortingStrategy strategy) {
        this.strategy = strategy;
    }

    public void performSort(int[] data) {
        this.strategy.sort(data);
    }
}

// Client code
public class StrategyPatternExample {
    public static void main(String[] args) {
        int[] dataToSort = {4, 2, 7, 1, 9};

        // Using Bubble Sort strategy
        SortingStrategy bubbleSortStrategy = new BubbleSort();
        Sorter sorter = new Sorter(bubbleSortStrategy);
        sorter.performSort(dataToSort);

        // Changing strategy at runtime
        SortingStrategy quickSortStrategy = new QuickSort();
        sorter.setStrategy(quickSortStrategy);
        sorter.performSort(dataToSort);
    }
}
```

In this Java example, the SortingStrategy is an interface, and BubbleSort and QuickSort are classes implementing this interface. The Sorter class is the context that can use different sorting strategies. The client code can switch between strategies at runtime by setting a different strategy for the Sorter.
