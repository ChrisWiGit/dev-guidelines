---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
hero:
  name: "Design Patterns"
  text: "Entwurfsmuster"
  tagline: "Was sich bewährt hat ist gut"
  actions:
    - theme: brand
      text: Allgemein
      link: ./general
    - theme: alt
      text: Erschaffungsmuster
      link: ./creational
    - theme: alt
      text: Strukturmuster
      link: ./structural
    - theme: alt
      text: Verhaltensmuster
      link: ./behavioral
    - theme: alt
      text: Architekturmuster
      link: ./architectural
    - theme: brand
      text: Literatur
      link: ../sources
  

  # hier image mit übersicht


features:

## Creational Patterns

  - title: Singleton
    details: "Einzelstück, Singleton"
    link: ./creational#singleton
    icon: 
      src: /brickwall_light_128.png
      width: 36
      height: 36
      alt: Singleton zählt zu den Creational Patterns
  - title: Factory Method
    details: "Fabrikmethode, Factory Method"
    link: ./creational#factory-method
    icon:
      src: /brickwall_light_128.png
      width: 36
      height: 36
      alt: Factory Method zählt zu den Creational Patterns
  - title: Abstract Factory
    details: "Abstrakte Fabrik, Abstract Factory"
    link: ./creational#abstract-factory
    icon:
      src: /brickwall_light_128.png
      width: 36
      height: 36
      alt: Abstract Factory zählt zu den Creational Patterns
  - title: Builder
    details: "Erbauer, Builder"
    link: ./creational#builder
    icon:
      src: /brickwall_light_128.png
      width: 36
      height: 36
      alt: Builder zählt zu den Creational Patterns
  - title: Prototype
    details: "Prototyp, Prototype"
    link: ./creational#prototype
    icon:
      src: /brickwall_light_128.png
      width: 36
      height: 36
      alt: Prototype zählt zu den Creational Patterns

## Structural Patterns

  - title: Adapter
    details: "Adapter"
    link: ./structural#adapter
    icon:
      src: /diagram_light_128.png
      width: 36
      height: 36
      alt: Adapter zählt zu den Creational Patterns
  - title: Bridge
    details: "Brücke, Bridge"
    link: ./structural#bridge
    icon:
      src: /diagram_light_128.png
      width: 36
      height: 36
      alt: Bridge zählt zu den Creational Patterns
  - title: Composite
    details: "Zusammengesetzt, Composite"
    link: ./structural#composite
    icon:
      src: /diagram_light_128.png
      width: 36
      height: 36
      alt: Composite zählt zu den Creational Patterns
  - title: Decorator
    details: "Dekorateur, Decorator"
    link: ./structural#decorator
    icon:
      src: /diagram_light_128.png
      width: 36
      height: 36
      alt: Decorator zählt zu den Creational Patterns
  - title: Facade
    details: "Fassade, Facade"
    link: ./structural#facade
    icon:
      src: /diagram_light_128.png
      width: 36
      height: 36
      alt: Facade zählt zu den Creational Patterns
  - title: Flyweight
    details: "Fliegengewicht, Flyweight"
    link: ./structural#flyweight
    icon:
      src: /diagram_light_128.png
      width: 36
      height: 36
      alt: Flyweight zählt zu den Creational Patterns
  - title: Proxy
    details: "Stellvertreter, Proxy"
    link: ./structural#proxy
    icon:
      src: /diagram_light_128.png
      width: 36
      height: 36
      alt: Proxy zählt zu den Creational Patterns      

## Behavioral Patterns

  - title: Chain of Responsibility
    details: Eine Anfrage von mehr als einem Objekt bearbeiten
    link: ./behavioral#chainofresponsibility
    icon:
      src: /behaviour_light_128.png
      width: 36
      height: 36
      alt: Chain of Responsibility zählt zu den Creational Patterns
  - title: Command
    details: Sender und Empfänger entkoppeln
    link: ./behavioral#command
    icon:
      src: /behaviour_light_128.png
      width: 36
      height: 36
      alt: Command zählt zu den Creational Patterns
  - title: Interpreter
    details: Für das Interpretieren von Sprachen
    link: ./behavioral#interpreter
    icon:
      src: /behaviour_light_128.png
      width: 36
      height: 36
      alt: Interpreter zählt zu den Creational Patterns
  - title: Iterator
    details: Für das Durchlaufen von Datenstrukturen
    link: ./behavioral#iterator
    icon:
      src: /behaviour_light_128.png
      width: 36
      height: 36
      alt: Iterator zählt zu den Creational Patterns
  - title: Mediator
    details: Für die Kommunikation zwischen Objekten
    link: ./behavioral#mediator
    icon:
      src: /behaviour_light_128.png
      width: 36
      height: 36
      alt: Mediator zählt zu den Creational Patterns
  - title: Memento
    details: Für das Speichern und Wiederherstellen von Zuständen von Objekten
    link: ./behavioral#memento
    icon:
      src: /behaviour_light_128.png
      width: 36
      height: 36
      alt: Memento zählt zu den Creational Patterns
  - title: Observer
    details: Für das Benachrichtigen von Objekten über Änderungen
    link: ./behavioral#observer
    icon:
      src: /behaviour_light_128.png
      width: 36
      height: 36
      alt: Observer zählt zu den Creational Patterns
  - title: State
    details: Für das Ändern des Verhaltens eines Objekts anhand seines Zustands
    link: ./behavioral#state
    icon:
      src: /behaviour_light_128.png
      width: 36
      height: 36
      alt: State zählt zu den Creational Patterns
  - title: Strategy
    details: Um Algorithmen austauschbar zu machen
    link: ./behavioral#strategy
    icon:
      src: /behaviour_light_128.png
      width: 36
      height: 36
      alt: Strategy zählt zu den Creational Patterns
  - title: Template Method / Vorlage
    details: Basisklassen erlauben Unterklassen, Schritte zu überschreiben
    link: ./behavioral#templatemethod
    icon:
      src: /behaviour_light_128.png
      width: 36
      height: 36
      alt: Template Method zählt zu den Creational Patterns
  - title: Visitor
    details: Trennung von Datenstruktur und Operationen
    link: ./behavioral#visitor
    icon:
      src: /behaviour_light_128.png
      width: 36
      height: 36
      alt: Visitor zählt zu den Creational Patterns


---


::: code-group

```js [example.js]
/**
 * @type {import('vitepress').UserConfig}
 */
const config = {
  // ...
}

export default config
```

```ts [example.ts] 
/**
 * @type {import('vitepress').UserConfig}
 */
const config = {
  // ...
}

export default config
```

```java [example.java]

import java.util.*;

public class Config {
  // ...
}

```java [example.java]

```

:::
