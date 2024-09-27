---
# https://vitepress.dev/reference/default-theme-home-page
layout: doc
customRulePrefix: GL
customIgnoreTitlesForRules: [Einleitung]
---

# Allgemeine Richtlinien für alle Sprachen

## Einleitung {#einleitung}

Allen Kapiteln wurde eine eindeutige Nummerierung, der Richtliniennummer, hinzugefügt, um eine eindeutige Identifikation zu ermöglichen.
Jede Richtliniennummer besteht aus dem Buchstaben **GL**(General Languages) gefolgt von einer Nummer, die den Abschnitt identifiziert. Damit kann eine Regel eindeutig identifiziert werden, z.B. für ein Code-Review.

## GL1 Zielgruppe {#zielgruppe}

Schreibe Code und Dokumentation so, als würdest du für andere Entwickler schreiben, die deinen Code lesen werden.

::: info
Code wird öfters gelesen als geschrieben.
:::

## GL2 Anwendung der Prinzipien der Softwareentwicklung {#anwendung-der-prinzipien-der-softwareentwicklung}

Die Prinzipien der Softwareentwicklung wie in [Prinzipien der Softwareentwicklung](../2.principles/) beschrieben, sollen befolgt werden, um sicherzustellen, dass der Code sauber, robust und wartbar bleibt.

## GL3 Abstraktionsschichten {#abstraktionsschichten}

Ein Projekt soll in Abstraktionsschichten aufgeteilt werden, um die Verantwortlichkeiten zu trennen und die Wartbarkeit zu verbessern.
Diese Schichten sind, aber nicht ausschließlich:

- Präsentationsschicht (Benutzeroberfläche)
- Geschäftslogikschicht (Domänenlogik)
- Datenzugriffsschicht (Datenbankzugriff)

Dazu soll Dependency Injection verwendet werden, um die Abhängigkeiten zwischen den Schichten zu verwalten.
Jede Schicht kommuniziert über Schnittstellen (Interfaces) mit den anderen Schichten.

::: warning Fehlen von Abstraktionsschichten

Das Unterlassen einer Trennung zwischen den Schichten führt zu einem unübersichtlichen und schwer wartbaren und testbaren Code.

Die auch nachträgliche Einführung von Abstraktionsschichten ist zuerst aufwändig, aber langfristig führt es zu einer deutlichen Verbesserung der Situation.

Neue Entwickler können sich zudem schneller in den Code einarbeiten, da sie nicht die gesamte Anwendung verstehen müssen, sondern nur die Schicht, in der sie arbeiten.

:::

## GL4 Anwendung von Design Patterns {#anwendung-von-design-patterns}

Design Patterns bieten eine wiederverwendbare Vorlage zur Lösung von Softwareentwicklungsproblemen in einem bestimmten Kontext. Sie dienen dazu, den Code sauberer, effizienter und einfacher zu verstehen zu machen. Einige Beispiele für Design Patterns, die in Java häufig verwendet werden, sind:

- Klassenfabrik (Factory Pattern)
- Singleton Pattern
- Builder Pattern
- weitere Patterns [dofactory Design Patterns](https://www.dofactory.com/javascript/design-patterns)

## GL5 Architektur planen und umsetzen {#architektur-planen-und-umsetzen}

Der Code soll nach den Prinzipien der Softwareentwicklung in [Prinzipien der Softwareentwicklung](../2.principles/) strukturiert werden.

Darunter fallen, jedoch nicht ausschließlich:

- Aufteilung in Abstraktionsschichten
- Trennung von Verantwortlichkeiten
- Trennung von Geschäftslogik und Präsentation
- Nutzung von Dependency Injection

## GL6 Ein Befehl, ein Build {#ein-befehl-ein-build}

Ein Projekt soll mit einem einzigen Befehl gebaut werden können. Dies erleichtert die Wartung und die Zusammenarbeit mit anderen Entwicklern.

## GL7 Dokumentation {#dokumentation}

- Ein Projekt muss immer mit einem `README.md`-Dokument beginnen, das eine kurze und lange Beschreibung des Projekts, Anweisungen zur Installation und Verwendung, sowie Informationen zur Lizenzierung und zum Beitrag enthält.
- Der Standardtext, der von gitlab für readme-Dateien generiert wird, muss angepasst werden.
- Dokumentation über die Architektur und die Funktionsweise muss verlinkt oder im Projekt selbst enthalten sein.

## GL8 Einsatz von Linter und Formatter {#einsatz-von-linter-und-formatter}

Von Anfang an sollen für Projekte Linter und automatische Code-Formatter eingesetzen, um sicherzustellen, dass der Code konsistent und fehlerfrei ist.

## GL9 Schreiben von Unit-Tests {#schreiben-von-unit-tests}

Guter Code muss immer von Anfang an mit Tests begleitet werden.
Tests helfen dabei, sicherzustellen, dass der Code nach dem Refactoring immer noch wie erwartet funktioniert.

## GL10 Selbsterklärender Code und keine Kommentare {#selbsterklaerender-code-und-keine-kommentare}

- Kommentare können lügen, Code nicht.
- Kommentare müssen vermieden werden, denn Kommentare veralten und ändern sich of nicht mit, wenn der Code geändert wird.
- Kommentare sind oftmals unverständlich, enthalten Rechtschreibfehler oder ergeben keinen Sinn zum Code.
- Wenn der Code nicht selbst erklärend ist, soll kein Kommentar geschrieben werden, sondern der Code soll umstrukturiert werden, um ihn verständlicher zu machen.
- Wenn ein Block von Code nicht selbst erklärend ist, soll dieser in eine eigene Methode ausgelagert werden, die einen aussagekräftigen Namen hat.
- Kommentare für Variablen oder Konstanten sollen vermieden werden und statt dessen aussagekräftige Namen verwendet werden.
- Kommentare für if-Bedingungen sollen vermieden werden und statt dessen der Term als aussagekräftige Variable oder Methode extrahiert werden.
- Kommentare dienen
  - zur Erklärung von komplexen Algorithmen oder Geschäftsregeln, die nicht offensichtlich sind und nicht vereinfacht werden können.
  - Meta-Informationen, die der Entwickler zur Klärung benötigt (z.B. warum etwas gemacht wurde).
  - TODOs, die noch erledigt werden müssen.

::: warning Hinweis
Kommentare als Code Dokumentation (z.B. JavaDoc, JsDoc) sind eine Ausnahme und müssen immer verwendet werden.
:::

::: info
Code Kommentare beschreiben, wie Code funktioniert.

Code Dokumentation beschreibt wie Code verwendet werden soll, wozu er dient, welche Laufzeitbedingungen er hat und welche Fehler er werfen kann.
:::

## GL11 Einfachheit und nur das Notwendige {#einfachheit-und-nur-das-notwendige}

Gute Code soll einfach geschrieben und für andere Personen (im Team) leicht verständlich und ohne Überraschungen sein.
Entwickler sollen sich nicht im Code selbst verwirklichen, sondern Code so schreiben, dass andere Entwickler ihn leicht verstehen, erweitern und verbessern können.

Um Code daher nicht unnötig komplex zu machen, darf daher auch nur das Notwendige implementiert werden, um die Anforderungen zu erfüllen.
Das Vorgehen nach "Könnte später nützlich sein" soll vermieden werden und nur in Absprache mit dem Team umgesetzt werden.

## GL12 Ständiges Refactoring {#staendiges-refactoring}

Refactoring ist ein kontinuierlicher Prozess, um den Code sauber und wartbar zu halten und insbesondere sich den ständig neuen und ändernden Anforderungen anzupassen.
Er ist verwandt mit der `Boy Scout Rule` (Hinterlasse den Code sauberer als du ihn vorgefunden hast).

Refactoring soll immer durchgeführt werden, wenn es notwendig ist, um den Code zu verbessern.

- Refactoring ändert nicht das Verhalten des Codes, sondern verbessert die Struktur und Lesbarkeit des Codes.
- Refactorings sollen nicht in einem separaten Ticket auf der To-Do-Liste stehen, sondern mit einer User Story oder einem Bugfix zusammen durchgeführt werden.
- Refactoring soll immer in kleinen Schritten durchgeführt werden.
- Refactoring soll immer mit Tests begleitet werden.
- Legacy-Code mit Tests abzudecken, ist ein Refactoring.
- Größere Refactorings sollen immer im Team abgesprochen werden. Lass dich aber nicht von einem Refactoring abhalten, wenn es notwendig ist.
- Größere Refactorings sollen parallel zum Tagesgeschäft und in kleinen Schritten (Divde and Conquer) über einen längeren Zeitraum durchgeführt werden.

::: warning Code altert nicht, aber er wird alt

Refactoring ist ein kontinuierlicher Prozess und sollte nicht als einmalige Aufgabe betrachtet werden.

Code ändert sich nicht (altert nicht), aber durch ändernde Anforderungen wird Code alt und muss daher angepasst werden, damit er für zukünftige Anforderungen gerüstet ist.

:::

::: info Aufwand von Refactoring vs. nicht durchgeführtes Refactoring

Aufwand durch Refactoring ist immer geringer als der Aufwand, der durch nicht durchgeführtes Refactoring entsteht.

Je öfter, früher und regelmäßiger Refactorings durchgeführt werden, desto geringer ist der Aufwand für die folgenden Refactorings.

Der Aufwand für neue Features und Bugfixes wird durch Refactoring reduziert, da der Code sauberer und wartbarer ist.

:::

## Trennung von BusLogik und Daten

::: warning TODO
TODO
Datenobjekte sollen nur Daten enthalten und Methoden, die damit umgehen.
:::

## GL13 Performance-Optimierungen {#performance-optimierungen}

Auf Optimierung ohne Grund soll verzichtet werden.

- Es ist besser, den Code zuerst zu schreiben und dann zu optimieren, wenn es notwendig ist.
- Optimierungen dürfen nur mit einem Benchmark durchgeführt werden, um das Optimierungsergebnis zu überprüfen.

## GL14 Einheitliche Fehlerbehandlung {#einheitliche-fehlerbehandlung}

- Fehler/Ausnahmen sollen einheitlich über den gesamten Code behandelt werden.
- Das Framework oder eine globale Fehlerbehandlung behandelt allgemeine Fehler und informiert den Benutzer.
- Spezifische Fehlerbehandlungen (`try-catch`) sollen nur verwendet werden, wenn ein Fehler bekannt und im Code behandelbar ist.
- Abgefangene Fehler/Ausnahmen sollen entweder geloggt oder weitergegeben werden, aber nicht beides, um Doppelungen beim Loggen zu vermeiden.
- Abgefangene Fehler/Ausnahmen können in Ausnahmefällen und mit Kommentar auch ignoriert werden.
- Die Fehlerbehandlung muss immer berücksichtigt und immer getestet werden.
  - Tests müssen auch die Fehlerbehandlung abdecken.
  - Auch seltene oder unmöglich erscheinende Fehler müssen getestet werden.
- Fehler müssen so früh wie möglich geworfen werden (siehe [Fail Fast](../2.principles/#fail-fast)).
- Fehler sollen anhand ihres Abstraktionsgrades geworfen werden
  - Fehler von niederen Schichten sollen in höheren Schichten in Domänen-spezifische Fehler umgewandelt werden (gewrappt werden).

::: info
Lokale Fehlerbehandlung statt globaler Fehlerbehandlung führt zu unaufgeräumten Code.
Oftmals wird die Fehlerbehandlung vollständig vergessen oder ignoriert, was zu unterschiedlicher Behandlung von Fehlern führt.
:::

## GL15 Verwenden aussagekräftige Rückgabewerte und -typen {#verwenden-aussagekraeftige-rueckgabewerte-und-typen}

Wenn eine Methode einen Wert zurückgibt, soll dieser Wert aussagekräftig sein und genau das darstellen, was die Methode tut. Es ist auch hilfreich, konsistente Rückgabetypen zu verwenden.

## GL16 Gesetz von Demeter {#gesetz-von-demeter}

Objekte sollen nur mit Objekten kommunizieren, die sie direkt kennen. Das bedeutet, dass ein Objekt nur Methoden von Objekten aufrufen soll, die es selbst erstellt hat, die als Parameter übergeben wurden oder die es als Eigenschaft besitzt.
Dies verhindert eine zu starke Kopplung zwischen den Objekten.

Um dies zu verhindern kann Dependency Injection verwendet werden.

Beispiel:

```java
// schlecht
person.department().manager().address().streetName();
// statt dessen
addressDI.streetName();
```

## GL17 Einheitliche Namensgebung {#einheitliche-namensgebung}

Code wird öfters gelesen als geschrieben.
Daher ist es wichtig, dass die Namensgebung konsistent und aussagekräftig ist.

Detailliertere Regeln dazu findest du in [Einheitliche Namensgebung](./naming.md).

::: info
Gute Code beschreibt sich selbst.
:::

## GL18 Sicherheit {#sicherheit}

Sicherheit in der Entwicklung ist eine nicht-funktionale Anforderung, die in jedem Schritt der Softwareentwicklung berücksichtigt werden muss.

Allgemein gilt:

- Prüfung der Authentifizierung und Autorisierung
- Prüfung der Eingaben auf Gültigkeit und Sicherheit
- Benutzereingaben sind immer als unsicher zu betrachten
- Aktualisierung der verwendeten Bibliotheken
- Einsatz von Tools zur statischen Codeanalyse und Prüfung der Abhängigkeiten

::: info
`Authentifizierung` ist der Prozess, bei dem die Identität eines Benutzers überprüft wird.

`Autorisierung` ist der Prozess, bei dem überprüft wird, ob ein Benutzer auf bestimmte Ressourcen zugreifen darf.
:::

::: warning Fehlende Eingabeprüfung
Die fehlende oder ungenügende Prüfung von Benutzereingaben ist die häufigste Ursache für Sicherheitslücken.
:::
