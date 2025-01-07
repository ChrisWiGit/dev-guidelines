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

1. Wenn es keine Tests gibt, kann das korrekte Verhalten des Codes nicht sichergestellt werden.
2. Wenn es keine klare Vorstellung davon gibt, wie der Code verbessert werden kann.
3. Wenn die eigentliche Änderung sehr klein ist und das Refactoring mehr Zeit in Anspruch nimmt.

## RFP3 Was soll nicht von einer Refaktorisierung abhalten? {#was-soll-nicht-von-einer-refaktorisierung-abhalten}

1. Schwer verständlicher Coder muss zuerst versanden werden. Dies kann durch Tests geschehen, die dazu auch das Verhalten des Codes sicherstellen.
2. Schlecht strukturierter Code.
3. Fehlende Zeit für Refactoring.
4. Angst vor Seiteneffekten.
5. Angst vor dem Management, dass keine Zeit für Refactoring zur Verfügung gestellt wird.
6. Angst vor dem Verlust oder der Veränderung des Verhaltens des Codes.

## RFP4 Wann soll refaktorisiert werden? {#wann-soll-refaktorisiert-werden}

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

## Mögliche Arten von Refactoring

::: danger TODO:
:::





















## RFP5 Prüfung auf Code Smells {#pruefung-auf-code-smells}

`Code Smells` sollen identifiziert und behoben werden, um die Codequalität zu verbessern.

<!-- !glossary-->
::: info Code Smells
Code Smells sind Anzeichen in deinem Code, die auf tiefer liegende Probleme hinweisen können.
Beispiele hierfür sind überlange Funktionen, verschachtelte Schleifen, globale Variablen und duplizierter Code. Durch das Identifizieren dieser "Code Smells" kannst du gezielt Verbesserungen vornehmen.
:::

Siehe Beispiele [Code-Smells](./codesmells).

## RFP6 Vereinfachungen {#vereinfachungen}

Code soll vereinfacht durch Refactoring vereinfacht werden, um die Lesbarkeit und Wartbarkeit zu verbessern.

Die Prinzipien [DRY](../2.principles/principles#dry), [SOC](../2.principles/principles#soc) und [KISS](../2.principles/principles#kiss) sind hierbei zu beachten.

## RFP7 Bewusstsein für Seiteneffekte beim Refactoring {#bewusstsein-fuer-seiteneffekte-beim-refactoring}

Während der Refaktorisierung ist es wichtig, sicherzustellen, dass der Code noch immer das tut, was er soll.
Änderungen, die unerwartete Seiteneffekte verursachen könnten, sollen mit Vorsicht behandelt werden.
Es ist daher ratsam, Änderungen in kleinen Schritten durchzuführen und regelmäßig zu testen, um sicherzustellen, dass das Verhalten des Codes unverändert bleibt.

## RFP8 Kein nachträgliches Kommentieren von Code {#kein-nachtraegliches-kommentieren-von-code}

Bestehender Code, der bisher nicht kommentiert wurde, soll im Nachhinein auch nicht kommentiert werden.

Dokumentation von Legacy-Code ist auch im Nachhinein kaum eine Hilfe, den Code zu verstehen.
Beim Lesen von alten Code besteht die Gefahr, dass er falsch verstanden wird und die Dokumentation dadurch nutzlos und verwirrend wird.
Vielmehr soll alter Code selbst im Zuge eines Refactorings verbessert werden, damit er selbsterklärend ist und nur neue Dokumentation braucht.

## RFP9 Code entfernen {#code-entfernen}

Refaktorisierung kann auch das Entfernen von Code bedeuten, der nicht mehr benötigt wird.

Code, der nicht mehr gebraucht wird hat keinen Zweck und kann zu Verwirrung für den Leser führen und benötigt außerdem Zeit, wenn Tests darauf ausgeführt werden.

Wenn der Code und dazugehörige Tests entfernt wurden, soll das Projekt auch neu gebaut werden, um sicherzustellen, dass keine Abhängigkeiten mehr bestehen.

## RFP10 Methodisches Vorgehen {#methodisches-vorgehen}

Ein Refactoring muss methodisch durchgeführt werden, um sicherzustellen, dass das Verhalten des Codes unverändert bleibt.

Ein Vorgehen soll wie folgt aussehen:

1. Sicherstellen, dass ein Test vorhanden ist, der das Verhalten des Codes sicherstellt.
Ggf. einen Test schreiben, wenn noch keiner vorhanden ist.
2. Refactoring in kleinen Schritten mit Zwischenprüfung(en) durchführen, ob der Test noch grün ist.
3. Prüfen, ob alle Tests noch grün sind, damit mögliche Seiteneffekte erkannt werden.

## RFP11 Bezeichner {#bezeichner}

Bezeichner sollen aussagekräftig und verständlich sein, daher ist es wichtig, Namen von Variablen, Funktionen und Klassen im Zuge eines Refactorings zu überprüfen und ggf. anzupassen.

1. Namen können länger, aber aussagekräftiger sein.
2. Abkürzungen sollen ausgechrieben werden.
3. Namen sollen entsprechend der Funktion benannt werden.
4. Präfixe (`get`, `set`) und Typ-Suffixe (`varStr`, `iVar`) sollen vermieden werden.
5. Kompexe Namen deuten auf komplexe Funktionen hin und die Funktion sollte refaktorisiert werden.

Weitere Regeln können unter [Bezeichner](../6.languages/naming.html) gefunden werden.

## RFP12 Doppelter Code {#doppelter-code}

Mehrfach vorkommender Code reduziert Kopplung (Abhängigkeit) kann aber auch zu Wartbarkeitsproblemen führen,
da Änderungen an mehreren Stellen vorgenommen werden müssen (Eine Stelle vergessen?).

1. Einzelne Zeilen von dupliziertem Code können in eine Funktion extrahiert werden.
2. Funktionen mit ähnlichem Verhalten können in parametrisierte Methoden zusammengeführt werden.
3. Große und viele Duplikate können durch das Zusammenführen in Klassen oder Modulen reduziert werden.

Nicht jedes Duplikat benötigt eine Refaktorisierung, beispielweise wenn es nur zwei Stellen gibt, an denen der Code vorkommt.
Die [Die 2-3-5](../2.principles/principles#the-2-3-5) Regel kann hierbei helfen einzuschätzen, ob ein Duplikat refaktorisiert werden sollte.

## RFP13 Lange Funktionen/Methoden {#lange-funktionen-methoden}

Komplexität von Funktionen/Methoden steigt mir ihrer Länge.
Um die Lesbarkeit und Wartbarkeit zu verbessern, sollen lange Funktionen/Methoden in kleinere Funktionen/Methoden aufgeteilt werden.

1. Funktionen/Methoden sollen nur eine Aufgabe erfüllen.
2. Funktionen/Methoden sollen in mehrere Funktionen/Methoden in unterschiedlichen Abstraktionsstufen aufgeteilt werden.
3. Jede aufgeteilte Funktion/Methode soll eine klare und einzelne Aufgabe haben.
4. Jede aufgeteilte Funktion/Methode soll getestet sein.

## RFP14 Parameter {#lange-parameterlisten}

1. Parameter sollen `final`, `const` oder `readonly` sein, damit sie nicht verändert werden.
2. Viele Parameter mit gleicher Art und Reihenfolge können durch ein Objekt ersetzt werden.
3. Boolean-Parameter können durch zwei Methoden mit aussagekräftigen Namen ersetzt werden.
4. ENUM-Parameter können durch Polymorphie ersetzt werden.

## RFP15 Globale Variablen/Daten {#globale-variablen-daten}

1. Globale Variablen sollen unbedingt vermieden werden und durch `Dependency Injection` mit Klassen, die die Daten kapseln, ersetzt werden.
2. Der direkte Zugriff auf globale Variablen soll vermieden werden und durch Methoden, die darauf zugreifen, ersetzt werden.
3. Globale Variablen, wenn unvermeidlich, sollen unveränderlich sein und mit Kopien gearbeitet werden (Value Object).

## RFP16 Feature-Neid {#feature-neid}

Wenn eine Klasse oder Methode zu viele Verantwortlichkeiten hat, kann dies zu Feature-Neid führen, denn andere Klassen und Methoden greifen auf die Funktionalität ständig zu.
Die Kopplung steigt dadurch und die Wartbarkeit sinkt, denn eine Änderung an der Funktionalität muss an vielen Stellen vorgenommen werden.

1. Klassen und Methoden sollen nur eine Verantwortlichkeit haben.
Verschiebe die Funktionalität in eine neue Klasse oder Methode.
2. Klassen und Methoden sollen nur auf die Funktionalität anderer Klassen und Methoden zugreifen, wenn sie diese wirklich benötigen.
    

## RFP17 elementare Datentypen {#elementare-datentypen}

## RFP18 Schleifen {#schleifen}

## RFP19 Switch-Statements {#switch-statements}

## RFP20 If-Statements {#if-statements}

- Negationen
- Große If-Blöcke
- Viele If-Statements
- Tief oder mehrfach verschachtelte If-Statements
- Lange If-Statements
- Komplexe Bedingungen

Siehe Beispiele [Code-Smells](./codesmells#if-statements).

## RFP21 Umfangreiche Klassen {#umfangreiche-klassen}

::: danger TODO:
Umfangreiche Klassen
:::

## RFP22 Datenklassen {#datenklassen}

::: danger TODO:
:::

## RFP23 Kommentare {#kommentare}

::: danger TODO:
:::

## Strangler Patern verwenden {#strangler-patern}
