---

layout: home
outline: [2, 2]

customRulePrefix: DPB
customIgnoreTitlesForRules: [Einleitung]

hero:
  name: "Design Patterns"
  text: "Strukturmuster"
  tagline: Struktur ist alles
  actions:
    - theme: alt
      text: Allgemein
      link: ./general
    - theme: alt
      text: Erschaffungsmuster
      link: ./creational
    - theme: alt
      text: Strukturmuster
      link: ./structural
    - theme: brand
      text: Verhaltensmuster
      link: #
    - theme: alt
      text: Architekturmuster
      link: ./architectural
    - theme: alt
      text: Übersicht
      link: ./index
---

<img src="/behaviour_light_128.png" alt="Creational Pattern" width="36" height="36"><br>

[[toc]]
<br>

# Entwurfsmuster - Verhaltensmuster

::: danger TODO:

Beispiele

:::

## Einleitung {#einleitung}

Verhaltensmuster sind Entwurfsmuster, die sich mit der Kommunikation zwischen Objekten und Klassen beschäftigen.

Allen Kapiteln wurde eine eindeutige Nummerierung, der Richtliniennummer, hinzugefügt, um eine eindeutige Identifikation zu ermöglichen.
Jede Richtliniennummer besteht aus dem Buchstaben **DPB**(Design Pattern Behavioral) gefolgt von einer Nummer, die den Abschnitt identifiziert. Damit kann eine Regel eindeutig identifiziert werden, z.B. für ein Code-Review.

## DPB1 Chain of Responsibility {#chain-of-responsibility}

Das Chain of Responsibility Pattern ermöglicht es, eine Anfrage von mehreren Objekten bearbeiten zu lassen.
Die Anfrage wird von einem Objekt an das nächste weitergegeben, bis ein Objekt die Anfrage bearbeitet.

### DPB1 Externe Beschreibung auf refactoring.guru

[Chain of Responsibility Pattern](https://refactoring.guru/design-patterns/chain-of-responsibility)

## DPB2 Command {#command}

Das Command Pattern ermöglicht es, Sender und Empfänger einer Anfrage zu entkoppeln.
Ein Objekt wird erstellt, das alle Informationen enthält, die für die Ausführung einer Methode erforderlich sind.

### DPB2 Externe Beschreibung auf refactoring.guru

[Command Pattern](https://refactoring.guru/design-patterns/command)

## DPB3 Interpreter {#interpreter}

Das Interpreter Pattern wird verwendet, um eine Sprache (Ausdrücke, Grammatik etc.) zu interpretieren.

### DPB3 Externe Beschreibung

[Interpreter Pattern - refactoring.guru](https://refactoring.guru/design-patterns/interpreter)
[Interpreter Pattern - geeksforgeeks.org](https://www.geeksforgeeks.org/interpreter-design-pattern/)

## DPB4 Iterator {#iterator}

Das Iterator Pattern wird verwendet, um eine Möglichkeit bereitzustellen, um über eine Sammlung von Objekten zu iterieren, ohne die zugrunde liegende Implementierung zu offenbaren.

### DPB4 Externe Beschreibung auf refactoring.guru

[Iterator Pattern - refactoring.guru](https://refactoring.guru/design-patterns/iterator)

## DPB5 Mediator {#mediator}

Das Mediator Pattern wird verwendet, um die Kommunikation zwischen Objekten zu zentralisieren.
Das Muster hilft, die Abhängigkeiten zwischen den Objekten zu reduzieren und die Kommunikation zu vereinfachen.

### DPB5 Externe Beschreibung auf refactoring.guru

[Mediator Pattern - refactoring.guru](https://refactoring.guru/design-patterns/mediator)

## DPB6 Memento {#memento}

Das Memento Pattern wird verwendet, um den Zustand eines Objekts zu speichern und wiederherzustellen, ohne die Details der Implementierung offenzulegen.

### DPB6 Externe Beschreibung auf refactoring.guru

[Memento Pattern - refactoring.guru](https://refactoring.guru/design-patterns/memento)

## DPB7 Observer {#observer}

Das Observer Pattern wird verwendet, um ein Objekt über Änderungen in einem anderen Objekt zu benachrichtigen.
Ein Objekt registriert sich als Beobachter eines anderen Objekts und wird benachrichtigt, wenn sich der Zustand des beobachteten Objekts ändert.

### DPB7 Externe Beschreibung auf refactoring.guru

[Observer Pattern - refactoring.guru](https://refactoring.guru/design-patterns/observer)

## DPB8 State {#state}

Das State Pattern wird verwendet, um das Verhalten eines Objekts zu ändern, wenn sich sein interner Zustand ändert.
Es erscheint, als ob das Objekt seinen Klassen ändert.

### DPB8 Externe Beschreibung auf refactoring.guru

[State Pattern - refactoring.guru](https://refactoring.guru/design-patterns/state)

## DPB9 Singleton {#singleton}

Das Singleton Pattern sorgt dafür, dass von einer Klasse nur ein einziges Objekt existiert.

### DPB9 Externe Beschreibung auf refactoring.guru

[Singleton Pattern](https://refactoring.guru/design-patterns/singleton)

## DPB10 Template Method / Vorlage {#template-method-vorlage}

Das Template Method Pattern definiert das Skelett eines Algorithmus in einer Methode und überlässt die Implementierung der Schritte den Unterklassen.

### DPB10 Externe Beschreibung auf refactoring.guru

[Template Method Pattern](https://refactoring.guru/design-patterns/template-method)

## DPB11 Visitor {#visitor}

Das Visitor Pattern wird verwendet, um die Operationen von Datenstrukturen von ihrer Struktur zu trennen.

### DPB11 Externe Beschreibung auf refactoring.guru

[Visitor Pattern](https://refactoring.guru/design-patterns/visitor)
