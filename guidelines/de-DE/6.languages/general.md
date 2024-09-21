---
# https://vitepress.dev/reference/default-theme-home-page
layout: doc
---

# Allgemeine Richtlinien für alle Sprachen

## Einleitung

Jede Richtliniennummer besteht aus dem Buchstaben **G**(eneral) gefolgt von einer Nummer, die den Abschnitt identifiziert. Damit kann eine Regel eindeutig identifiziert werden, z.B. für ein Code-Review.

## Übersicht

<!-- TOC depthfrom:2 depthto:2 -->

- [Einleitung](#einleitung)
- [Übersicht](#%C3%BCbersicht)
- [Regeln](#regeln)

<!-- /TOC -->

<!--
Uniformes Benennungsschema
Law of Demeter

-->

## Regeln

### Zielgruppe

Schreibe Code und Dokumentation so, als würdest du für andere Entwickler schreiben, die deinen Code lesen werden.

::: info
Code wird öfters gelesen als geschrieben.
:::

### G1 Anwendung der Prinzipien der Softwareentwicklung

Die Prinzipien der Softwareentwicklung wie in [Prinzipien der Softwareentwicklung](../2.principles/) beschrieben, sollten befolgt werden, um sicherzustellen, dass der Code sauber, robust und wartbar bleibt.

### G14 Anwendung von Design Patterns

Design Patterns bieten eine wiederverwendbare Vorlage zur Lösung von Softwareentwicklungsproblemen in einem bestimmten Kontext. Sie dienen dazu, den Code sauberer, effizienter und einfacher zu verstehen zu machen. Einige Beispiele für Design Patterns, die in Java häufig verwendet werden, sind:

* Klassenfabrik (Factory Pattern)
* Singleton Pattern
* Builder Pattern
* weitere Patterns [dofactory Design Patterns](https://www.dofactory.com/javascript/design-patterns)


### G8 Architektur planen und umsetzen

Der Code soll nach den Prinzipien der Softwareentwicklung in [Prinzipien der Softwareentwicklung](../2.principles/) strukturiert werden.

Darunter fallen, jedoch nicht ausschließlich:

* Aufteilung in Abstraktionsschichten
* Trennung von Verantwortlichkeiten
* Trennung von Geschäftslogik und Präsentation
* Nutzung von Dependency Injection

### Ein Befehl, ein Build

Ein Projekt sollte mit einem einzigen Befehl gebaut werden können. Dies erleichtert die Wartung und die Zusammenarbeit mit anderen Entwicklern.

### Dokumentation

* Ein Projekt muss immer mit einem `README.md`-Dokument beginnen, das eine kurze und lange Beschreibung des Projekts, Anweisungen zur Installation und Verwendung, sowie Informationen zur Lizenzierung und zum Beitrag enthält.
* Der Standardtext, der von gitlab für readme-Dateien generiert wird, muss angepasst werden.
* Dokumentation über die Architektur und die Funktionsweise muss verlinkt oder im Projekt selbst enthalten sein.

### G6 Einsatz von Linter und Formatter

Von Anfang an sollen für Projekte Linter und automatische Code-Formatter eingesetzen, um sicherzustellen, dass der Code konsistent und fehlerfrei ist.

### G7 Schreiben von Unit-Tests

Guter Code muss immer von Anfang an mit Tests begleitet werden.
Tests helfen dabei, sicherzustellen, dass der Code nach dem Refactoring immer noch wie erwartet funktioniert.

### G9 Selbsterklärender Code und keine Kommentare

* Kommentare müssen vermieden werden, wenn der Code selbsterklärend ist.
  * Wenn der Code nicht selbst erklärend ist, sollte der Code umstrukturiert werden, um ihn verständlicher zu machen.
* Kommentare dienen
  * zur Erklärung von komplexen Algorithmen oder Geschäftsregeln, die nicht offensichtlich sind und nicht vereinfacht werden können.
  * Meta-Informationen, die der Entwickler zur Klärung benötigt (z.B. warum etwas gemacht wurde).
  * TODOs, die noch erledigt werden müssen.

::: info
Kommentare als Dokumentation (z.B. JavaDoc, JsDoc) sind eine Ausnahme und müssen immer verwendet werden.
:::

### Einfachheit und nur das Notwendige

Gute Code sollte einfach geschrieben und für andere Personen (im Team) leicht verständlich und ohne Überraschungen sein.
Entwickler sollten sich nicht im Code selbst verwirklichen, sondern Code so schreiben, dass andere Entwickler ihn leicht verstehen, erweitern und verbessern können.

Um Code daher nicht unnötig komplex zu machen, darf daher auch nur das Notwendige implementiert werden, um die Anforderungen zu erfüllen.
Das Vorgehen nach "Könnte später nützlich sein" sollte vermieden werden und nur in Absprache mit dem Team umgesetzt werden.

### G11 Performance-Optimierungen

Auf Optimierung ohne Grund sollte verzichtet werden.

* Es ist besser, den Code zuerst zu schreiben und dann zu optimieren, wenn es notwendig ist.
* Optimierungen dürfen nur mit einem Benchmark durchgeführt werden, um das Optimierungsergebnis zu überprüfen.

### G13 Fehlerbehandlung

* Es soll immer eine allgemeine Fehlerbehandlung verwendet werden und spezifische Fehlerbehandlungen vermieden werden.
  * Allgemeine Fehler vom Framework behandeln lassen oder in einem globalen Fehlerhandler behandeln und dem Benutzer anzeigen.
  * Spezifische Fehlerbehandlungen (`try-catch`) nur verwenden, wenn ein Fehler bekannt und im Code behandelbar ist.
* Fehlerbehandlung muss immer berücksichtigt und mit-getestet werden.
  * Tests müssen auch die Fehlerbehandlung abdecken.
  * Auch seltene oder unmöglich erscheinende Fehler müssen getestet werden.
* Fehler müssen so früh wie möglich geworfen werden (siehe [Fail Fast](../2.principles/#fail-fast)).

### G15 Verwenden aussagekräftige Rückgabewerte und -typen

Wenn eine Methode einen Wert zurückgibt, sollte dieser Wert aussagekräftig sein und genau das darstellen, was die Methode tut. Es ist auch hilfreich, konsistente Rückgabetypen zu verwenden.

### Einheitliche Namensgebung

Code wird öfters gelesen als geschrieben.
Daher ist es wichtig, dass die Namensgebung konsistent und aussagekräftig ist.

Detailliertere Regeln dazu findest du in [Einheitliche Namensgebung](./naming.md).

> Gute Code beschreibt sich selbst.