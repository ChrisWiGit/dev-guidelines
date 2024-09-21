---
# https://vitepress.dev/reference/default-theme-home-page
layout: doc
---

# Allgemeine Richtlinien für alle Sprachen

## Einleitung

Jede Richtliniennummer besteht aus dem Buchstaben **G**(eneral) gefolgt von einer Nummer, die den Abschnitt identifiziert. Damit kann eine Regel eindeutig identifiziert werden, z.B. für ein Code-Review.

## Übersicht

<!-- TOC depthFrom:2 and depthTo:2 -->
* [G1 Folgen des KISS-Prinzips (Keep it simple and stupid)](general#g1-folgen-des-kiss-prinzips-keep-it-simple-and-stupid)
* [G2 Folgen des DRY-Prinzips (Don't Repeat Yourself)](general#g2-folgen-des-dry-prinzips-dont-repeat-yourself)
* [G3 Konsistente Benennung von Variablen und Funktionen](general#g3-konsistente-benennung-von-variablen-und-funktionen)
* [G4 Anwendung von ES6 Features](general#g4-anwendung-von-es6-features)
* [G5 Vermeidung von Callback-Hölle](general#g5-vermeidung-von-callback-hölle)
* [G6 Einsatz von Linter und Formatter](general#g6-einsatz-von-linter-und-formatter)
* [G7 Schreiben von Unit-Tests](general#g7-schreiben-von-unit-tests)
* [G8 Anwendung Modulare Architektur](general#g8-anwendung-modulare-architektur)
* [G9 Selbsterklärender Code](general#g9-selbsterklärender-code)
* [G10  Anwendung des SOLID-Prinzips](general#g10--anwendung-des-solid-prinzips)
* [G11 Performance-Optimierungen](general#g11-performance-optimierungen)
* [G12 Anwendung Funktionale Programmierkonzepte](general#g12-anwendung-funktionale-programmierkonzepte)
* [G13 Fehlerbehandlung](general#g13-fehlerbehandlung)
* [G14 Anwendung von Design Patterns](general#g14-anwendung-von-design-patterns)
* [G15 Verwenden aussagekräftige Rückgabewerte und -typen](general#g15-verwenden-aussagekräftige-rückgabewerte-und--typen)
<!-- /TOC -->

<!--
Uniformes Benennungsschema 
Law of Demeter

-->

## Regeln

### G1 Folgen der Prinzipien der Softwareentwicklung

Die Prinzipien der Softwareentwicklung wie in [Prinzipien der Softwareentwicklung](../2.principles/) beschrieben, sollten befolgt werden, um sicherzustellen, dass der Code sauber, robust und wartbar bleibt.

### G14 Anwendung von Design Patterns

Design Patterns bieten eine wiederverwendbare Vorlage zur Lösung von Softwareentwicklungsproblemen in einem bestimmten Kontext. Sie dienen dazu, den Code sauberer, effizienter und einfacher zu verstehen zu machen. Einige Beispiele für Design Patterns, die in Java häufig verwendet werden, sind:

* Klassenfabrik (Factory Pattern)
* Singleton Pattern
* Builder Pattern
* weitere Patterns [dofactory Design Patterns](https://www.dofactory.com/javascript/design-patterns)


### G8 Architektur

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
