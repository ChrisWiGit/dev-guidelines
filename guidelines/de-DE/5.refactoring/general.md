---
layout: doc
outline: [2, 2]

customRulePrefix: RFP
customIgnoreTitlesForRules: [Einleitung,Begriffsdefinition,Warum Refactoring?]
---

# Prinzipien des Refactoring

::: danger TODO: Allgemeines Refactoring

Teile diese Dokumentation sind noch in Arbeit und können unvollständig sein.

:::

## Einleitung {#einleitung}

Refactoring ist ein Prozess, bei dem der Code verbessert wird, ohne das Verhalten zu ändern. Es ist ein wichtiger Bestandteil der Softwareentwicklung, um die Wartbarkeit und Lesbarkeit des Codes zu verbessern.
Durch Refactoring wird die sogenannte **technische Schuld** abgebaut, die durch schnelle Lösungen und Kompromisse entsteht.

::: warning Integrierter Bestandteil der Programmierung
Code Refactoring ist als integraler Bestandteil der normalen Programmiertätigkeit zu betrachten.
:::

In diesem Dokument werden allgemeine Richtlinien für das Refactoring von Code beschrieben.
Diese Richtlinien sind unabhhängig von der Programmiersprache und können auf jede Sprache angewendet werden.

Allen Kapiteln wurde eine eindeutige Nummerierung, der Richtliniennummer, hinzugefügt, um eine eindeutige Identifikation zu ermöglichen.
Jede Richtliniennummer besteht aus dem Buchstaben **RFG**(Refactoring General) gefolgt von einer Nummer, die den Abschnitt identifiziert.
Damit kann eine Regel eindeutig identifiziert werden, z.B. für ein Code-Review.

## Begriffsdefinition {#begriffsdefinition}

`Code Refactoring` bezieht sich auf den Prozess der Überarbeitung von vorhandenem Code, um dessen interne Struktur zu verbessern, ohne dabei das externe Verhalten zu ändern.

Das Hauptziel des Refactorings besteht darin, den Code lesbarer, verständlicher und leichter wartbar zu machen.
Es beinhaltet das Umstrukturieren des Codes, um ihn effizienter, besser organisiert und robuster zu gestalten.
Dabei werden Code-Duplikate entfernt, komplexe Teile vereinfacht, Code-Standards angepasst und die Code-Qualität verbessert.

::: warning
Es ist wichtig zu beachten, dass Refactoring kein Zwang ist, sondern eine empfohlene Praxis, um die Qualität des Codes im Laufe der Zeit kontinuierlich zu verbessern.
Viele Entwickler haben jedoch Angst vor Refactoring, da sie befürchten, dass es zu unerwünschten Seiteneffekten führen könnte und ihr Manager ihnen keine Zeit dafür gibt.
Trotzdem merken sie irgendwann, dass der Code so unübersichtlich und komplex geworden ist, dass er Schmerzen verursacht, ihn zu ändern.
:::

<!-- !glossary-->
::: details Refactoring vs. Refaktorisierung

- **Refactoring** ist der Prozess, bei dem der Code verbessert wird, ohne das Verhalten zu ändern.
- **Refaktorisierung** ist die Tätigkeit, die während des Refactorings durchgeführt wird.

:::

## Warum Refactoring? {#warum-refactoring}

> Code altert nicht, er wird alt.

Die Entwicklung eines Produkts ist ein Lernprozess.
Während der Entwicklung lernen wir mehr über die Anforderungen, die Technologien und die Architektur.
Dieses wissen besteht allerdings bei den wenigsten Projekten von Anfang an.
Außerdem ändern sich Anforderungen und Technologien im Laufe der Zeit, so dass spätere Änderungen am Code, der für frühere Anforderungen geschrieben wurde, notwendig werden.
Diese Änderungen am Code werden oft einfach irgendwie hinzugefügt, ohne, dass der originale Code dafür ausgelegt war.
Dazu werden oftmals Abkürzungen genommen, um schneller zu einem Ergebnis zu kommen, was zu technischen Schulden führt.
Der Code wird dadurch immer komplexer und unübersichtlicher, und lässt sich irgendwann nicht mehr ändern oder erweitern, ohne, dass es an anderen Stellen zu Fehlern kommt.

Der Abbau dieser technischen Schulden ist ein wichtiger Bestandteil der Softwareentwicklung, um die Wartbarkeit und Erweiterbarkeit des Codes zu gewährleisten.
Nur durch den Abbau dieser technischen Schulden können neue Features effizient hinzu gefügt werden.

::: info Kurz gesagt

- Refactoring verbessert das Design des Codes, ohne das Verhalten zu ändern.
- Refactoring macht den Code lesbarer, verständlicher und leichter wartbar.
- Refactoring baut technische Schulden ab und verbessert die Code-Qualität.
- Refactoring hilft den Code zu verstehen.
- Refactoring hilft beim Finden und Beheben von Fehlern.
- Refactoring hilft schneller neue Features hinzuzufügen.

:::

## RFP1 Wann kann refaktorisiert werden? {#wann-kann-refaktorisiert-werden}

Refaktorisierung kann nur dann richtig durchgeführt werden, wenn Tests vorhanden sind, die das Verhalten des Codes sicherstellen.
Ohne Tests ist es schwierig, sicherzustellen, dass das Verhalten des Codes nach dem Refactoring unverändert bleibt.

## RFP2 Wann sollte nicht refaktorisiert werden? {#wann-sollte-nicht-refaktorisiert-werden}

Refactoring sollte nicht durchgeführt werden:

- Wenn es keine Tests gibt, kann das korrekte Verhalten des Codes nicht sichergestellt werden.
- Wenn es keine klare Vorstellung davon gibt, wie der Code verbessert werden kann.
- Wenn die eigentliche Änderung sehr klein ist und das Refactoring mehr Zeit in Anspruch nimmt.

Siehe [Die 2-3-5](../2.principles/principles#the-2-3-5) Regel.

## RFP3 Wann soll refaktorisiert werden? {#wann-soll-refaktorisiert-werden}

1. Refaktorisierung wird vor dem Beginn einer neuen Aufgabe durchgeführt, wenn notwendig.
Die Refaktorisierung ermöglicht es auch sich in den Code einzuarbeiten und den Code dadurch besser zu verstehen.

2. Refaktorisierung wird nach dem Programmieren durchgeführt, um den Code zu verbessern und die Qualität zu erhöhen.

3. Refaktorisierung soll immer dann durchgeführt werden, wenn der Code schwer zu verstehen ist, schwer zu warten ist oder wenn neue Funktionen hinzugefügt werden sollen.

4. Eine Refaktorisierung soll zu einem Bug- oder Story-Ticket durchgeführt werden, und in der Regel nicht als eigenständige Aufgabe.
Ausnahmen können größere Refactorings sein.

5. Die Refaktorisierung soll in kleinen Schritten durchgeführt werden, um die Wahrscheinlichkeit von Fehlern zu minimieren.
Dies erleichtert das Finden und Beheben von Fehlern und hilft, den Überblick zu behalten.
Damit ist es auch möglich große Teile des Codes zu erneuern, ohne dass ein ganzes Team daran arbeiten muss.

6. Zu einer Refaktorisierung gehört zudem das Schreiben von Tests, um die Funktionalität sicherzustellen.

## RFP4 Prüfung auf Code Smells {#pruefung-auf-code-smells}

`Code Smells` sollen identifiziert und behoben werden, um die Codequalität zu verbessern.

<!-- !glossary-->
::: info Code Smells
Code Smells sind Anzeichen in deinem Code, die auf tiefer liegende Probleme hinweisen können.
Beispiele hierfür sind überlange Funktionen, verschachtelte Schleifen, globale Variablen und duplizierter Code. Durch das Identifizieren dieser "Code Smells" kannst du gezielt Verbesserungen vornehmen.
:::

Siehe Beispiele [Code-Smells](./codesmells).


## RFP5 Vereinfachungen {#vereinfachungen}

Code soll vereinfacht durch Refactoring vereinfacht werden, um die Lesbarkeit und Wartbarkeit zu verbessern.

Die Prinzipien [DRY](../2.principles/principles#dry), [SOC](../2.principles/principles#soc) und [KISS](../2.principles/principles#kiss) sind hierbei zu beachten.

## RFP6 Bewusstsein für Seiteneffekte beim Refactoring {#bewusstsein-fuer-seiteneffekte-beim-refactoring}

Während der Refaktorisierung ist es wichtig, sicherzustellen, dass der Code noch immer das tut, was er soll.
Änderungen, die unerwartete Seiteneffekte verursachen könnten, sollen mit Vorsicht behandelt werden.
Es ist daher ratsam, Änderungen in kleinen Schritten durchzuführen und regelmäßig zu testen, um sicherzustellen, dass das Verhalten des Codes unverändert bleibt.

## RFP7 Kein nachträgliches Kommentieren von Code {#kein-nachtraegliches-kommentieren-von-code}

Bestehender Code, der bisher nicht kommentiert wurde, soll im Nachhinein auch nicht kommentiert werden.

Dokumentation von Legacy-Code ist auch im Nachhinein kaum eine Hilfe, den Code zu verstehen.
Beim Lesen von alten Code besteht die Gefahr, dass er falsch verstanden wird und die Dokumentation dadurch nutzlos und verwirrend wird.
Vielmehr soll alter Code selbst im Zuge eines Refactorings verbessert werden, damit er selbsterklärend ist und nur neue Dokumentation braucht.

## RFP8 Code entfernen {#code-entfernen}

Refaktorisierung kann auch das Entfernen von Code bedeuten, der nicht mehr benötigt wird.

## RFP9 Methodisches Vorgehen {#methodisches-vorgehen}

Ein Refactoring muss methodisch durchgeführt werden, um sicherzustellen, dass das Verhalten des Codes unverändert bleibt.

Ein Vorgehen soll wie folgt aussehen:

1. Sicherstellen, dass ein Test vorhanden ist, der das Verhalten des Codes sicherstellt.
Ggf. einen Test schreiben, wenn noch keiner vorhanden ist.
2. Refactoring in kleinen Schritten mit Zwischenprüfung(en) durchführen, ob der Test noch grün ist.
3. Prüfen, ob alle Tests noch grün sind, damit mögliche Seiteneffekte erkannt werden.

### RFP9 Bezeichner

### RFP9 Doppelter Code

## RFP10 Lange Funktionen/Methoden {#lange-funktionen-methoden}

## RFP11 Lange Parameterlisten {#lange-parameterlisten}

## RFP12 Globale Variablen/Daten {#globale-variablen-daten}

## RFP13 Feature-Neid {#feature-neid}

## RFP14 elementare Datentypen {#elementare-datentypen}

## RFP15 Schleifen {#schleifen}

## RFP16 Switch-Statements {#switch-statements}

## RFP17 If-Statements {#if-statements}

- Negationen
- Große If-Blöcke
- Viele If-Statements
- Tief oder mehrfach verschachtelte If-Statements
- Lange If-Statements
- Komplexe Bedingungen

Siehe Beispiele [Code-Smells](./codesmells#if-statements).

## RFP18 Umfangreiche Klassen {#umfangreiche-klassen}

::: danger TODO:
Umfangreiche Klassen
:::

## RFP19 Datenklassen {#datenklassen}

::: danger TODO:
:::


## RFP20 Kommentare {#kommentare}

::: danger TODO:
:::

