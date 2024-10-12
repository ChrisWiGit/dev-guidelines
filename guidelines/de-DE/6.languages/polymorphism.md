# Polymorphismus

## Was ist Polymorphismus?

In der Objekt-Orientierten Programmierung (OOP) ist Polymorphismus ein Konzept, das es ermöglicht, dass ein Objekt sich in verschiedenen Formen verhalten kann.
Das bedeutet, dass ein Objekt einer Klasse sich wie ein Objekt einer anderen Klasse verhalten kann, indem es eine Methode mit dem gleichen Namen wie die Methode der anderen Klasse implementiert.

Das Ableiten (sub-typing) ermöglicht zur Laufzeit unterschiedliches Verhalten für Objekte, die von einer gemeinsamen Basisklasse abgeleitet sind.

```java

public interface Animal {
    void makeSound();
}

public class Dog extends Animal {
    @Override
    public void makeSound() {
        System.out.println("Woof");
    }
}

public class Cat extends Animal {
  @Override
  public void makeSound() {
    System.out.println("Meow");
  }
}

void makeSound(Animal animal) {
  animal.makeSound();
}

void main() {
  Animal dog = new Dog();
  Animal cat = new Cat();
  
  makeSound(dog); // Woof
  makeSound(cat); // Meow
}

```

<!-- !glossary-->
::: danger Polymorphismus: Verhalten vs. Daten

Oftmals wird Polymporphismus verwendet, um einer abgeleiteten Klasse zusätzliche Daten hinzuzufügen.
Das ist jedoch nicht der Sinn von Polymorphismus.
Polymorphismus handelt von Verhalten, nicht von Daten.

Kurz: Polymorphismus bedeutet, das abgeleitete Klassen sich nur in ihrem Verhalten unterscheiden, nicht in ihren Daten.

Wenn Daten hinzu gefügt werden sollen, ist es besser das [Pattern Komposition](../4.designpatterns/structural#composite) zu verwenden.

:::

### Weiterführende Links

- [Wikipedia - Polymorphismus](https://de.wikipedia.org/wiki/Polymorphie_(Programmierung))
- [Composition over Inheritance](https://en.wikipedia.org/wiki/Composition_over_inheritance)
