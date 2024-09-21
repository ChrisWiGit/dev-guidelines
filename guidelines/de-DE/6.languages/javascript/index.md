---
# https://vitepress.dev/reference/default-theme-home-page
layout: doc
---

# Richtlinien für JavaScript und TypeScript

## Einleitung

Jede Richtliniennummer besteht aus dem Buchstaben **JS**(JavaScript oder Typescript) gefolgt von einer Nummer, die den Abschnitt identifiziert. Damit kann eine Regel eindeutig identifiziert werden, z.B. für ein Code-Review.

::: info
Wo notwendig, wird auf die Unterschiede zwischen JavaScript und TypeScript hingewiesen.
:::

::: info
Falls es erforderlich ist, wird in Zukunft Typescript in ein eigenes Regeldokument aufgeteilt.
:::

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




## Regeln

Es gelten die [Allgemeinen Regeln für Sprachen](../general).

### G1 Folgen des KISS-Prinzips (Keep it simple and stupid)

Die Entwicklung von Software sollte nicht der Selbstverwirklichung des Entwicklers dienen, sondern der Lösung eines Problems. Daher sollte Architektur, Code und Dokumentation so einfach wie möglich gehalten werden. Komplexe Lösungen sollten vermieden werden, wenn einfachere Lösungen möglich sind.

### G2 Folgen des DRY-Prinzips (Don't Repeat Yourself)

Wird festgestellt, dass derselbe Code an mehreren Stellen verwendet wird, sollte in Betracht gezogen werden, diesen Code in eine Funktion oder ein Modul zu extrahieren und es dann jedes Mal zu verwenden, wenn es benötigt wird.

### G3 Konsistente Benennung von Variablen und Funktionen

Es sollte sichergestellt werden, dass die verwendeten Namen aussagekräftig sind und den Zweck des Codes genau beschreiben. Die Benennung sollte auch konsistent sein.

### G4 Anwendung von ES6 Features

Mit ES6 stehen viele neue Möglichkeiten zur Verfügung, um den Code zu verbessern. Beispielsweise könnten Pfeilfunktionen, Template-Strings, Default-Parameter, Rest- und Spread-Operator, Destructuring-Zuweisungen, `const` und `let` anstelle von `var` für eine bessere Kontrolle des Scopings, Klassen, Module, Promises und Iteratoren verwendet werden, um den Code kürzer und leichter lesbar zu machen.

### G5 Vermeidung von Callback-Hölle

Verschachtelte Callbacks sollten vermieden werden, da sie den Code schwer lesbar und wartbar machen. Promises oder `async/await` können verwendet werden, um den asynchronen Code besser handhaben zu können.

### G6 Einsatz von Linter und Formatter

Tools wie ESLint und Prettier können dabei helfen, den Code konsistent und fehlerfrei zu halten.

### G7 Schreiben von Unit-Tests

Guter refaktorierter Code sollte immer von Tests begleitet werden. Sie helfen dabei, sicherzustellen, dass der Code nach dem Refactoring immer noch wie erwartet funktioniert.

### G8 Anwendung Modulare Architektur

Der Code sollte in kleinere, wiederverwendbare Module aufgeteilt werden. Dies erhöht die Lesbarkeit und erleichtert die Wartung und das Testen.

### G9 Selbsterklärender Code

Kommentare sollten vermieden werden, wo der Code selbst klar sein kann. Guter Code sollte größtenteils selbsterklärend sein.

### G10  Anwendung des SOLID-Prinzips

SOLID ist ein Akronym für fünf Prinzipien des objektorientierten Designs und der Programmierung, die dazu beitragen, dass der Code sauber, robust und wartbar bleibt.

### G11 Performance-Optimierungen

Auf teure Operationen wie unnötige DOM-Manipulationen oder ineffiziente Schleifen sollte geachtet werden. Performance-Tools wie die Chrome DevTools können genutzt werden, um Flaschenhälse zu identifizieren und zu beheben.

### G12 Anwendung Funktionale Programmierkonzepte

Funktionale Programmierung kann dazu beitragen, dass der Code besser strukturiert und leichter zu testen ist. Konzepte wie Unveränderlichkeit (Immutability), reine Funktionen und höherwertige Funktionen (Higher Order Functions) sind besonders nützlich.

### G13 Fehlerbehandlung

Es sollte sichergestellt werden, dass der Code ordnungsgemäß mit Fehlern umgeht. Dies könnte beinhalten, dass versucht wird, Fehler frühzeitig zu werfen, anstatt sie zu ignorieren, und dass `try/catch`-Blöcke verwendet werden, um Fehler effektiv zu behandeln.

### G14 Anwendung von Design Patterns

Design Patterns bieten eine wiederverwendbare Vorlage zur Lösung von Softwareentwicklungsproblemen in einem bestimmten Kontext. Sie dienen dazu, den Code sauberer, effizienter und einfacher zu verstehen zu machen. Einige Beispiele für Design Patterns, die in Java häufig verwendet werden, sind:

- Klassenfabrik (Factory Pattern)
- Singleton Pattern
- Builder Pattern
- weitere Patterns [dofactory Design Patterns](https://www.dofactory.com/javascript/design-patterns)

### G15 Verwenden aussagekräftige Rückgabewerte und -typen

Wenn eine Methode einen Wert zurückgibt, sollte dieser Wert aussagekräftig sein und genau das darstellen, was die Methode tut. Es ist auch hilfreich, konsistente Rückgabetypen zu verwenden.
