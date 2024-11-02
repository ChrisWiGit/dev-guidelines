---
layout: doc
---

# Glossar

Glossar ist eine Sammlung von Begriffen, die in der Softwareentwicklung verwendet werden. 
Es ist eine Referenz für Entwickler, um die Bedeutung von Begriffen zu verstehen, die in der Softwareentwicklung verwendet werden.

## Authentifizierung vs. Autorisierung

`Authentifizierung` ist der Prozess, bei dem die Identität eines Benutzers überprüft wird.
`Autorisierung` ist der Prozess, bei dem überprüft wird, ob ein Benutzer auf bestimmte Ressourcen zugreifen darf.

## Code Smells

Code Smells sind Anzeichen in deinem Code, die auf tiefer liegende Probleme hinweisen können.
Beispiele hierfür sind überlange Funktionen, verschachtelte Schleifen, globale Variablen und duplizierter Code. Durch das Identifizieren dieser "Code Smells" kannst du gezielt Verbesserungen vornehmen.

## Globale Fehlerbehandlung der lokalen Fehlerbehandlung vorziehen

**Lokale Fehlerbehandlung** ist die Verwendung von `try-catch`-Blöcken, Status-Wert-Abfrage, `Promise.catch` oder ähnlichen Mechanismen, um Fehler zu behandeln, die in einem bestimmten Codeabschnitt auftreten können.\
**Globaler Fehlerbehandlung** ist die Verwendung eines zentralen Mechanismus, um Fehler zu behandeln, die nicht lokal behandelt werden.
Oftmals stellt das eingesetzte Framework eine globale Fehlerbehandlung zur Verfügung, die verwendet werden kann, um z.B. dem Benutzer eine Fehlermeldung anzuzeigen.\
Die Globale Fehlerbehandlung ist einfacher zu implementieren und zu warten und führt zu verständlicheren Code.
Wenn eine lokale Fehlerbehandlung wie mit `try-catch`-Blöcken verwendet wird, muss die Behandlung der möglichen Fehler manuell implementiert werden.
Oftmals wird jedoch die Fehlerbehandlung vollständig vergessen oder ignoriert (und auch nicht getestet), was zu unterschiedlicher Behandlung von Fehlern führt.

## Guard Clause

Strenggenommen ist die Guard Clause eine Operations-Logik, welche die Methode nach IOSP auch zu einer Operations-Logik, statt einer Integration-Logik macht.

## Innere Methoden/Funktionen

In JavaScript könnten komplexe Bereichsblöcke in eigene Methoden einer Klasse ausgelagert werden.
Dies führt jedoch zu vielen öffentlichen Methoden führt, die nur von einer Methode aufgerufen werden, und interne Methoden und Information nach aussen sichtbar macht.
Das sollte verhindert werden, indem die Funktionen innerhalb der Methode als Konstanten, wie im Beispiel oben, definiert werden.
Alternativ können private Methoden in einer Klasse verwendet werden, um die Verantwortlichkeiten klar zu trennen.
Entweder wird eine Methode im Konstruktor definiert oder mit `#` als private Methode gekennzeichnet, bzw. in TypeScript mit `private`.
```javascript
class MyClass {
  constructor() {
    this.#checkComplicatedCondition();
    this.#doWhile();
    this.#checkAnotherCondition();
  }
  #checkComplicatedCondition() {
    for (let i = 0; i < 10; i++) {
      if (complicatedCondition) {
      } else {
      }
    }
  }
  #doWhile() {
    while (condition) {
      // Code
    }
  }
  #checkAnotherCondition() {
    if (anotherCondition) {
      // Code
    }
  }
}
```

## Kopplung und Kohäsion

- `Kopplung` ist die Abhängigkeit zwischen zwei oder mehr Modulen oder Komponenten.
Sie beschreibt, wie stark zwei oder mehr Module oder Komponenten voneinander abhängig sind.
- `Kohäsion` ist die Zusammengehörigkeit von Funktionalitäten innerhalb eines Moduls, Klasse oder einer Komponente.
Sie beschreibt, wie stark die Funktionalität innerhalb eines Moduls, Klasse oder einer Komponente zusammenhängt.

## Mehr Code durch Trennung

Das Argument "mehr Code" ist kein Argument gegen die Trennung von Verantwortlichkeiten, denn die Trennung führt zu besser wartbarem und testbarem Code, was die Größe des Codes überwiegt.
Ein großer Teil des zusätzlichen Codes sind oftmals nur Methoden- oder Klassendeklarationen, die keine zusätzliche Logik enthalten und damit auch nicht getestet werden können (Solche Logik wird vom Compiler/Interpreter/Linter geprüft).

## Model Driven Development vs. Domain Driven Design

- **Model Driven Development (MDE)** konzentriert sich auf die Modellierung von Software.
Es versucht, durch den Einsatz von Modellen auf höheren Abstraktionsebenen den Softwareentwicklungsprozess zu verbessern und zu automatisieren.
Diese Modelle werden oft direkt in Code übersetzt (Code-Generierung).
In MDE beschreibt man die Objekte (Entitäten) und ihre Beziehungen oft in Form von Modellen, z.B. UML-Diagrammen (Unified Modeling Language).
Die Idee ist, dass man von diesen Modellen ausgeht und sie schrittweise verfeinert, bis sie entweder automatisch in lauffähigen Code umgewandelt werden oder als Grundlage für die Implementierung dienen.
Die Interaktionen zwischen den Objekten können in den Modellen beschrieben werden und dann in eine Implementierung überführt werden, in der die verschiedenen Objekten über APIs, Methodenaufrufe oder Events miteinander interagieren.
- **Domain Driven Design (DDE)** hingegen konzentriert sich auf die Modellierung von Domänenwissen und die Implementierung von Software, die dieses Domänenwissen umsetzt.
Dabei wird eine starke Trennung zwischen der Domäne und der technischen Implementierung vorgenommen.
Das Domänenmodell steht dabei im Mittelpunkt und wird durch die Implementierung umgesetzt.
Die Domänenobjekte spielen eine zentrale Rolle und werden durch die Geschäftslogik und nicht durch technische Aspekte bestimmt.
In DDD werden Entitäten oft durch Begriffe aus der „Ubiquitous Language“ (eine gemeinsame Sprache zwischen Entwicklern und Fachexperten) beschrieben, sodass das Modell die Realität des Geschäfts widerspiegelt.
In DDD wird die Interaktion zwischen den Entitäten durch bestimmte Muster wie Aggregate (Sammlung verwandter Entitäten), Repositories (Zugriff auf gespeicherte Entitäten) und Services strukturiert. Diese Interaktionen spiegeln die realen Geschäftsprozesse wider, die die Entitäten repräsentieren.

## Operation vs. Integration

Eine **Operations-Logik** enthält Bedingungen, Schleifen, etc., die die Geschäftsregeln implementieren.
Auch API-Aufrufe oder andere I/O-Operationen gehören zur Operations-Logik.
Eine **Integration-Logik** enthält Code, der andere Code verwendet, um die Operations-Logik zu implementieren.
Eine **Hybrid-Logik** enthält sowohl Operations- als auch Integrationslogik.

## Polymorphismus: Verhalten vs. Daten

Oftmals wird Polymporphismus verwendet, um einer abgeleiteten Klasse zusätzliche Daten hinzuzufügen.
Das ist jedoch nicht der Sinn von Polymorphismus.
Polymorphismus handelt von Verhalten, nicht von Daten.
Kurz: Polymorphismus bedeutet, das abgeleitete Klassen sich nur in ihrem Verhalten unterscheiden, nicht in ihren Daten.
Wenn Daten hinzu gefügt werden sollen, ist es besser das [Pattern Komposition](./4.designpatterns/structural#composite) zu verwenden.

## Refactoring vs. Refaktorisierung

- **Refactoring** ist der Prozess, bei dem der Code verbessert wird, ohne das Verhalten zu ändern.
- **Refaktorisierung** ist die Tätigkeit, die während des Refactorings durchgeführt wird.

## Schein-Konstanten

Objekte oder Array-Inhalte sind immer veränderbar, auch wenn sie mit `final` deklariert werden.
Nur die Zuweisung der Variable ist konstant, nicht der Wert.
In Java gibt es keine Möglichkeit, den Inhalt eines Objekts oder Arrays zu sperren.
Alternativen sind die Software Prinzipien [Tell, don't ask](./2.principles/principles#tda-ie) und [Information Hiding](./2.principles/principles#ih-e).

## Senior-Entwickler vs. Junior-Entwickler

Beim Verständnis von Code sollte es keine Rolle spielen, ob der Entwickler ein Senior- oder Junior-Entwickler ist.
Die große Erfahrung bei Senior-Entwicklern kann dazu führen, dass sie unnötig komplexen Code schreiben, der nicht nur für Junior-Entwickler schwer zu verstehen ist.
Es ist daher wichtig, dass Code so geschrieben wird, dass er von jedem Entwickler verstanden werden kann.
Beide Seiten sollen von der Zusammenarbeit profitieren und voneinander lernen.
Junior-Entwickler sollen sich nicht scheuen, Fragen zu stellen, wenn sie etwas nicht verstehen.
Dagegen sollen Senior-Entwickler offen für Fragen sein und bereit sein, ihr Wissen zu teilen, denn auch sie waren einmal Junior-Entwickler.
Dadurch können Junior-Entwickler viel lernen und werden so schneller zu wertvollen Teammitgliedern.
