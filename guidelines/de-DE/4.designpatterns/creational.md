---

layout: home
outline: [2, 2]

customRulePrefix: DPC
customIgnoreTitlesForRules: [Einleitung]

hero:
  name: Design Patterns
  text: Erschaffungsmuster
  tagline: Erzeugung von etwas Neuem
  actions:
    - theme: alt
      text: Allgemein
      link: ./general
    - theme: brand
      text: Erschaffungsmuster
      link: #
    - theme: alt
      text: Strukturmuster
      link: ./structural
    - theme: alt
      text: Verhaltensmuster
      link: ./behavioral
    - theme: alt
      text: Architekturmuster
      link: ./architectural
    - theme: alt
      text: Übersicht
      link: ./index
---

<img src="/brickwall_light_128.png" alt="Creational Pattern" width="36" height="36"><br>

[[toc]]
<br>

# Entwurfsmuster - Creational Patterns

## Einleitung {#einleitung}

Creational Patterns sind Entwurfsmuster, die sich mit der Erzeugung von Objekten beschäftigen.
Sie helfen dabei, die Erzeugung von Objekten zu entkoppeln und die Art und Weise der Erzeugung zu variieren.

Allen Kapiteln wurde eine eindeutige Nummerierung, der Richtliniennummer, hinzugefügt, um eine eindeutige Identifikation zu ermöglichen.
Jede Richtliniennummer besteht aus dem Buchstaben **DPC**(Design Pattern Creational) gefolgt von einer Nummer, die den Abschnitt identifiziert. Damit kann eine Regel eindeutig identifiziert werden, z.B. für ein Code-Review.

## DPC1 Singleton {#singleton}

::: danger TODO:
Beispiel
:::

Das Singleton Pattern sorgt dafür, dass von einer Klasse nur ein einziges Objekt existiert.

::: warning Anti-Pattern
Das Singleton Pattern wird oft als Anti-Pattern angesehen, da es die Testbarkeit des Codes erschwert.
Oftmals werden Utility- oder Service-Klassen als Singleton implementiert, was zu einer starken Kopplung führt, da direkt auf die Singleton-Instanz zugegriffen wird, statt über Interfaces.
:::

### DPC1 Externe Beschreibung auf refactoring.guru

[Singleton Pattern](https://refactoring.guru/design-patterns/singleton)

## DPC2 Factory Method {#factory-method}

Das Factory Method Pattern definiert eine Schnittstelle zur Erzeugung von Objekten, lässt aber die Unterklassen entscheiden, welche Klasse instanziiert wird.
Auf diese Weise können Objekte sehr flexibel mit derselben Methode erstellt werden.

### DPC2 Beispiel

Im folgenden Beispiel wird das Factory Method Pattern verwendet, um eine abstrakte Klasse `Creator` zu definieren, die eine abstrakte Methode `factoryMethod` enthält, die von Unterklassen implementiert wird, um eine Instanz von `Product` zu erstellen.
Je nach Implementierung der `factoryMethod` wird eine Instanz von `ConcreteProduct` oder einer anderen Klasse erstellt.

::: code-group

```java [Java]
public abstract class Creator {
    public abstract Product factoryMethod();
}

public class ConcreteCreator extends Creator {
    @Override
    public Product factoryMethod() {
        return new ConcreteProduct();
    }
}

public class ConcreteCreatorAnother extends Creator {
    @Override
    public Product factoryMethod() {
        return new ConcreteAnotherProduct();
    }
}

public interface Product {
    void operation();
}

public class ConcreteProduct implements Product {
    @Override
    public void operation() {
        System.out.println("ConcreteProduct operation");
    }
}

public class Client {
    public static void main(String[] args) {
        Creator creator = new ConcreteCreator();
        Product product = creator.factoryMethod();
        product.operation();
    }
}
```

```typescript [TypeScript]
interface Creator {
    factoryMethod(): Product;
}

class ConcreteCreator implements Creator {
    factoryMethod(): Product {
        return new ConcreteProduct();
    }
}

class ConcreteCreatorAnother implements Creator {
    factoryMethod(): Product {
        return new ConcreteAnotherProduct();
    }
}

interface Product {
    operation(): void;
}

class ConcreteProduct implements Product {
    operation(): void {
        console.log("ConcreteProduct operation");
    }
}
```

:::

### DPC2 Externe Beschreibung auf refactoring.guru

[Factory Method Pattern](https://refactoring.guru/design-patterns/factory-method)

## DPC3 Abstract Factory {#abstract-factory}

Das Abstract Factory Pattern definiert eine Schnittstelle zur Erzeugung von Familien von Objekten, ohne die konkreten Klassen zu spezifizieren.

::: info Erweiterbarkeit

Durch das Abstract Factory Pattern können neue Familien von Objekten hinzugefügt werden, ohne die bestehenden Klassen zu ändern.
Sollte später neue Funktionalität gewünscht sein, kann eine neue Factory-Klasse erstellt werden, die die neuen Klassen instanziiert.

:::

### DPC3 Beispiel

::: code-group

```java [Java Auth-Benutzer]

class AbstractAuthenticatedUserFactory {
    public abstract AuthenticatedUser getAuthenticatedUser();
}

class AuthenticatedUserFactory extends AbstractAuthenticatedUserFactory {
    private User user;
    public ConcreteAuthenticatedUserFactory(User user) {
        this.user = user;
    }
    @Override
    public AuthenticatedUser getAuthenticatedUser() {
        return new ConcreteAuthenticatedUser(user);
    }
}

class SysAdminFactory extends AbstractAuthenticatedUserFactory {
    @Override
    public AuthenticatedUser getAuthenticatedUser() {
        return new SysAdmin();
    }
}

// ...
class Backend {
    private AbstractAuthenticatedUserFactory factory;
    public Backend(AbstractAuthenticatedUserFactory factory) {
        this.factory = factory;
    }
    public AbstractAuthenticatedUserFactory authenticate(LoginDto loginDto) {
        // Login logic example only!
        if (loginDto.getUsername().equals("admin")) {
            factory = new SysAdminFactory();
        } else {
            factory = new AuthenticatedUserFactory();
        }
        
        return factory;
    }
}

```

```typescript [TypeScript]

interface AbstractAuthenticatedUserFactory {
    getAuthenticatedUser(): AuthenticatedUser;
}

class AuthenticatedUserFactory implements AbstractAuthenticatedUserFactory {
    private user: User;
    constructor(user: User) {
        this.user = user;
    }
    getAuthenticatedUser(): AuthenticatedUser {
        return new ConcreteAuthenticatedUser(this.user);
    }
}

class SysAdminFactory implements AbstractAuthenticatedUserFactory {
    getAuthenticatedUser(): AuthenticatedUser {
        return new SysAdmin();
    }
}

// ...

class Backend {
    private factory: AbstractAuthenticatedUserFactory;
    constructor(factory: AbstractAuthenticatedUserFactory) {
        this.factory = factory;
    }
    authenticate(loginDto: LoginDto): AbstractAuthenticatedUserFactory {
        // Login logic example only!
        if (loginDto.username === "admin") {
            this.factory = new SysAdminFactory();
        } else {
            this.factory = new AuthenticatedUserFactory();
        }
        
        return this.factory;
    }
}

```

:::

### DPC3 Externe Beschreibung auf refactoring.guru

[Abstract Factory Pattern](https://refactoring.guru/design-patterns/abstract-factory)

## DPC4 Builder {#builder}

Das Builder Pattern trennt die Konstruktion eines komplexen Objekts von seiner Repräsentation, so dass der gleiche Konstruktionsprozess unterschiedliche Repräsentationen erzeugen kann.

### DPC4 Externe Beschreibung auf refactoring.guru

[Builder Pattern](https://refactoring.guru/design-patterns/builder)

## DPC5 Prototype {#prototype}

::: danger TODO:
Beispiel
:::


Das Prototype Pattern ermöglicht es, neue Objekte zu erstellen, indem ein Prototypobjekt kopiert wird.

### DPC5 Externe Beschreibung auf refactoring.guru

[Prototype Pattern](https://refactoring.guru/design-patterns/prototype)
