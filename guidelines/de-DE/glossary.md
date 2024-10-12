---
layout: doc
---

# Glossar

Glossar ist eine Sammlung von Begriffen, die in der Softwareentwicklung verwendet werden. 
Es ist eine Referenz für Entwickler, um die Bedeutung von Begriffen zu verstehen, die in der Softwareentwicklung verwendet werden.

## Authentifizierung vs. Autorisierung

`Authentifizierung` ist der Prozess, bei dem die Identität eines Benutzers überprüft wird.
`Autorisierung` ist der Prozess, bei dem überprüft wird, ob ein Benutzer auf bestimmte Ressourcen zugreifen darf.

## Guard Clause

Strenggenommen ist die Guard Clause eine Operations-Logik, welche die Methode nach IOSP auch zu einer Operations-Logik, statt einer Integration-Logik macht.

## Kopplung und Kohäsion

- `Kopplung` ist die Abhängigkeit zwischen zwei oder mehr Modulen oder Komponenten.
Sie beschreibt, wie stark zwei oder mehr Module oder Komponenten voneinander abhängig sind.
- `Kohäsion` ist die Zusammengehörigkeit von Funktionalitäten innerhalb eines Moduls, Klasse oder einer Komponente.
Sie beschreibt, wie stark die Funktionalität innerhalb eines Moduls, Klasse oder einer Komponente zusammenhängt.

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
