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

### DPC1 Externe Beschreibung auf refactoring.guru

[Singleton Pattern](https://refactoring.guru/design-patterns/singleton)

## DPC2 Factory Method {#factory-method}

::: danger TODO:
Beispiel
:::


Das Factory Method Pattern definiert eine Schnittstelle zur Erzeugung von Objekten, lässt aber die Unterklassen entscheiden, welche Klasse instanziiert wird.

### DPC2 Externe Beschreibung auf refactoring.guru

[Factory Method Pattern](https://refactoring.guru/design-patterns/factory-method)

## DPC3 Abstract Factory {#abstract-factory}

::: danger TODO:
Beispiel
:::


Das Abstract Factory Pattern definiert eine Schnittstelle zur Erzeugung von Familien von Objekten, ohne die konkreten Klassen zu spezifizieren.

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
