---

layout: home
outline: [2, 2]

customRulePrefix: DPS
customIgnoreTitlesForRules: [Einleitung]

hero:
  name: Design Patterns
  text: Strukturmuster
  tagline: Struktur ist alles
  actions:
    - theme: alt
      text: Allgemein
      link: ./general
    - theme: alt
      text: Erschaffungsmuster
      link: ./creational
    - theme: brand
      text: Strukturmuster
      link: #
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

<img src="/diagram_light_128.png" alt="Creational Pattern" width="36" height="36"><br>

[[toc]]
<br>

# Entwurfsmuster - Strukturmuster

## Einleitung {#einleitung}

Strukturmuster sind Entwurfsmuster, die sich mit der Strukturierung von Klassen und Objekten beschäftigen.

Allen Kapiteln wurde eine eindeutige Nummerierung, der Richtliniennummer, hinzugefügt, um eine eindeutige Identifikation zu ermöglichen.
Jede Richtliniennummer besteht aus dem Buchstaben **DPS**(Design Pattern Structural) gefolgt von einer Nummer, die den Abschnitt identifiziert. Damit kann eine Regel eindeutig identifiziert werden, z.B. für ein Code-Review.

## DPS1 Adapter {#adapter}

Das Adapter Pattern ermöglicht es, zwei Objekte mit inkompatiblen Schnittstellen miteinander zu verbinden.

### DPS1 Einsatzzweck

- Der Adapter kommt zum Einsatz, wenn eine bereits vorhandene Klasse zum Einsatz kommen soll, die jedoch nicht die benötigte Schnittstelle implementiert.
Der Adapter wird als Zwischenschicht verwendet, um als Überbrückung zwischen den beiden Klassen zu dienen.
- Der Adapter kommt zum Einsatz, wenn mehrere Unterklassen verwendet werden sollen, die eine gemeinsame Funktionalität bereitstellen sollen, die Oberklasse jedoch nicht erweitert werden kann.

### DPS1 Externe Beschreibung auf refactoring.guru

[Adapter Pattern](https://refactoring.guru/design-patterns/adapter)

### DPS1 Beispiel

::: code-group

```typescript
interface Adapter {
  request(): string;
}

class ConcreteAdapter implements Adapter {
  private adaptee: Adaptee;
  constructor(adaptee: Adaptee) {
    this.adaptee = adaptee;
  }

  request(): string {
    return adaptee.specificRequest();
  }
}

// Client kommuniziert mit Adaptee

class Adaptee {
  specificRequest(): string {
    return 'Specific request.';
  }
}

class Client {
  public request(adapter: Adapter): string {
    return adapter.request();
  }
}

```

:::

## DPS2 Bridge {#bridge}

Das Bridge Pattern trennt die Abstraktion von der Implementierung, so dass beide unabhängig voneinander geändert werden können.

### DPS2 Externe Beschreibung auf refactoring.guru

[Bridge Pattern](https://refactoring.guru/design-patterns/bridge)

### DPS2 Beispiel

::: code-group

```typescript
interface DeviceImplementor {
  operationImp(): string;
}

class DeviceOne implements DeviceImplementor {
  operationImp(): string {
    return 'DeviceOne operation.';
  }
}

class DeviceTwo implements DeviceImplementor {
  operationImp(): string {
    return 'DeviceTwo operation.';
  }
}

abstract class Abstraction {
  protected implementor: DeviceImplementor;
  constructor(implementor: DeviceImplementor) {
    this.implementor = implementor;
  }

  operation(): string {
    return this.implementor.operationImp();
  }
}

class RefinedAbstraction extends Abstraction {
  operation(): string {
    return `RefinedAbstraction: ${this.implementor.operationImp()}`;
  }
}

const deviceOne = new DeviceOne();
const deviceTwo = new DeviceTwo();

const abstractionOne = new Abstraction(deviceOne);

const abstractionTwo = new RefinedAbstraction(deviceTwo);

abstractionOne.operation(); // DeviceOne operation.

abstractionTwo.operation(); // RefinedAbstraction: DeviceTwo operation.


```

:::

## DPS3 Composite {#composite}

::: danger TODO:
Beispiel
:::


Das Composite Pattern ermöglicht es, Objekte in einer Baumstruktur zu behandeln, so dass einzelne Objekte und zusammengesetzte Objekte einheitlich und unabhängig voneinander behandelt werden können.

### DPS3 Externe Beschreibung auf refactoring.guru

[Composite Pattern](https://refactoring.guru/design-patterns/composite)

## DPS4 Decorator {#decorator}

Das Decorator Pattern ermöglicht es, Objekte dynamisch um zusätzliche Funktionalität zu erweitern, ohne die Objekte selbst zu ändern.

### DPS4 Externe Beschreibung auf refactoring.guru

[Decorator Pattern](https://refactoring.guru/design-patterns/decorator)

## DPS5 Facade {#facade}

::: danger TODO:
Beispiel
:::


Das Facade Pattern bietet eine vereinfachte Schnittstelle zu einem komplexen Subsystem (Library, Framework, etc.).

### DPS5 Externe Beschreibung auf refactoring.guru

[Facade Pattern](https://refactoring.guru/design-patterns/facade)

## DPS6 Flyweight {#flyweight}

::: danger TODO:
Beispiel
:::


Das Flyweight Pattern wird verwendet, um die Anzahl der Objekte zu reduzieren und den Speicherbedarf zu verringern, indem gemeinsam genutzte Daten zwischen mehreren Objekten geteilt werden.

### DPS6 Externe Beschreibung auf refactoring.guru

[Flyweight Pattern](https://refactoring.guru/design-patterns/flyweight)

## DPS7 Proxy {#proxy}

Das Proxy Pattern wird verwendet, um den Zugriff auf ein Objekt zu kontrollieren, indem ein Proxyobjekt erstellt wird, das als Stellvertreter für das eigentliche Objekt fungiert.
Alle Aufrufe an das Proxyobjekt werden an das eigentliche Objekt weitergeleitet, wobei der Proxy zusätzliche Funktionalität vor oder nach dem Aufruf des originalen Objekts bereitstellen kann.

### DPS7 Einsatzzweck

- Das Proxy Pattern wird für eine Verzögerte Initialisierung (lazy initialization) (virtueller Proxy) eingesetzt, wenn eine schwergewichtige Klasse nicht von Anfang an initialisiert werden soll, sondern erst dann, wenn sie tatsächlich benötigt wird.
- Das Proxy Pattern wird für den Zugriffsschutz (Schutzproxy) eingesetzt, wenn nur bestimmte Clients auf das Objekt zugreifen dürfen.
- Das Proxy Pattern wird für die lokale Ausführung eines Remote-Dienstes (Remote-Proxy) eingesetzt, wenn das echte Objekt auf einem Remote-Server liegt (DCOM, CORBA, RMI).
- Das Proxy Pattern wird für das Protokollieren von Anfragen (Protokoll-Proxy) eingesetzt, wenn das Ändern der eigentlichen Klasse nicht möglich ist.
- Das Proxy Pattern wird für die intelligente Referenz (Smart Reference) eingesetzt, wenn das Objekt freigegeben werden soll, sobald es nicht mehr benötigt wird.

### DPS7 Externe Beschreibung auf refactoring.guru

[Proxy Pattern](https://refactoring.guru/design-patterns/proxy)
