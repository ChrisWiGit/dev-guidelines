---
layout: doc
outline: [2,2]
customRulePrefix: P
customIgnoreTitlesForRules: [Einleitung]
---

# Prinzipien der Software Entwicklung

## Einleitung {#einleitung}

Prinzipien sind grundlegende Regeln, die bei der Entwicklung von Software eingehalten werden sollten.
Jedes Prinzip stammt aus der Praxis und hat sich bewährt, um Software zu entwickeln, die wartbar, erweiterbar und verständlich ist.
Dennoch können Prinzipien sich gegenseitig widersprechen.
In der Praxis ist es daher wichtig, die Prinzipien zu kennen und sich mit ihnen auseinanderzusetzen, um die richtige Balance zu finden.

Allen Kapiteln wurde eine eindeutige Nummerierung, der Richtliniennummer, hinzugefügt, um eine eindeutige Identifikation zu ermöglichen.
Jede Richtliniennummer besteht aus dem Buchstaben **P**(Prinzip) gefolgt von einer Nummer, die den Abschnitt identifiziert.
Damit kann eine Regel eindeutig identifiziert werden, z.B. für ein Code-Review.

## P1 SOLID {#solid}

SOLID ist das grundlegendste Prinzip der Softwareentwicklung.
Es steht für die fünf Prinzipien der Softwareentwicklung:

* Single Responsibility Principle,
* Open/Closed Principle,
* Liskov Substitution Principle,
* Interface Segregation Principle und
* Dependency Inversion Principle.

## P2 Single Responsibility Principle {#single-responsibility-principle}

Das `Single Responsibility Principle` besagt, dass eine Klasse oder ein Modul nur eine einzige Aufgabe erfüllen sollte.
Ihre Funktionen und Methoden ermöglichen im Gesamtbild, dass diese Aufgabe erfüllt wird.
Jede Funktion oder Methode sollte jedoch nur wiederum eine einzige Aufgabe erfüllen.

::: warning Vorsicht
Trotzdem können Module, Komponenten oder Klassen mehrere Funktionen oder Methoden besitzen, sollte jede Funktion oder Methode nur eine einzige Aufgabe erfüllen, die zur Erfüllung der Gesamtaufgabe beiträgt.
:::

## P3 Open/Closed Principle {#open-closed-principle}

Das Open/Closed Principle besagt, dass Software so entwickelt werden sollte, dass sie offen für Erweiterungen, aber geschlossen für Änderungen ist.

Das bedeutet, dass Software so entwickelt werden sollte, dass sie leicht erweitert werden kann, ohne dass der bestehende Code geändert werden muss.

### P3 Problem

Viele Fehler entstehen durch Änderungen an bestehendem Code, insbesondere wenn keine Tests vorhanden sind.
Wenn vorhandener Code geändert wird, müssen Tests angepasst werden, was zu einem erhöhten Aufwand führt.
Code, der diesen Code bereits verwendet, muss ebenfalls angepasst werden, was zu einem erhöhten Aufwand führt.

### P3 Lösung

Code soll so geschrieben werden, dass er leicht erweitert werden kann, ohne dass der bestehende Code geändert werden muss.
Dies wird erreicht, indem Polymorphismus, Interfaces, Abstraktionen und Design Patterns verwendet werden.
Beispielsweise kann das Design Pattern `Strategy` oder `Komposition` verwendet werden, um Algorithmen auszutauschen, ohne den bestehenden Code zu ändern.

## P4 Liskov Substitution Principle {#liskov-substitution-principle}

Das `Liskov Substitution Principle` besagt, dass Objekte einer abgeleiteten Klasse so verwendet werden können sollten, wie Objekte der Basisklasse.

### P4 Problem

Wenn Objekte einer abgeleiteten Klasse nicht so verwendet werden können, wie Objekte der Basisklasse, führt dies zu Fehlern und unerwartetem Verhalten.

### P4 Lösung

Abgeleitete Klassen sollten so entwickelt werden, dass sie Objekte der Basisklasse ersetzen können, ohne dass es zu Fehlern oder unerwartetem Verhalten kommt.
Methoden müssen die gleichen Parameter akzeptieren und die gleichen Rückgabewerte liefern.
Methoden dürfen keine zusätzlichen Parameter haben und dürfen keine zusätzlichen Ausnahmen werfen.
Das Verhalten der Methoden muss das gleiche sein wie das der Basisklasse beziehungsweise der Interface-Beschreibung.

## P5 Interface Segregation Principle {#interface-segregation-principle}

Das `Interface Segregation Principle` besagt, dass Software so entwickelt werden soll, dass Interfaces so klein wie möglich sein sollten.

### P5 Problem

Interfaces, die zu groß sind, enthalten oft Methoden, die nicht benötigt werden.
Dies führt dazu, dass Klassen, die dieses Interface implementieren, Methoden implementieren müssen, die sie nicht benötigen.
Dies führt zu unnötigem Code und erhöht die Kopplung zwischen den Klassen.

### P5 Lösung

Interfaces sollen so klein wie möglich sein und nur die Methoden enthalten, die benötigt werden.
Dies wird erreicht, indem Interfaces in kleinere Interfaces aufgeteilt werden, die nur die Methoden enthalten, die benötigt werden.
Klassen, die diese Interfaces implementieren, müssen nur die Methoden implementieren, die sie benötigen.

## P6 KISS {#kiss}

KISS steht für `Keep It Simple, Stupid` und ist ein Prinzip, das besagt, dass Software so einfach wie möglich sein sollte.
Dies bedeutet, dass Software so einfach und verständliche für andere Entwickler sein sollte, dass sie leicht gewartet und erweitert werden kann.

::: info Kurz gesagt
Gute Software ist einfach zu lesen und zu verstehen.
:::

## P7 DRY {#dry}

Code, der sich oft wiederholt, ist schwer zu pflegen und zu korrigieren, da Änderungen an einer Stelle auch an anderen (oft unbekannten) Stellen gemacht werden müssen.

Das `Don't Repeat Yourself` Prinzip besagt, dass Code so geschrieben werden sollte, dass er sich nicht wiederholt.

### P7 Die 2-3-5 Regel

Die *2-3-5* Regel besagt, dass Code, der sich mehr als **zweimal** wiederholt, in eine Funktion oder Methode ausgelagert werden sollte.
Code, der sich mehr als **dreimal** wiederholt, sollte in eine Klasse oder ein Modul ausgelagert werden.
Code, der sich mehr als **fünfmal** wiederholt, sollte in eine eigene Bibliothek oder ein eigenes Framework ausgelagert werden.

::: warning Vorsicht
Oftmals ist doppelter Code nicht sofort ein Problem, sondern erst später, wenn er ein drittes Mal angefasst wird.
Daher kann es manchmal besser sein, Code erst dann zu restrukturieren, wenn er sich zum dritten Mal wiederholt.
:::

## P8 SPOT {#spot}

Das `Single Point of Truth` Prinzip besagt, dass es nur eine einzige Stelle geben sollte, an der eine Information gespeichert wird.

Wenn es mehrere Stellen gibt, an denen die gleiche Information gespeichert wird, kommt es unweigerlich zu Inkonsistenzen und Fehlern.
Es ist dann nicht mehr möglich welche Information die richtige ist.

## P9 YAGNI {#yagni}

Die `You Ain't Gonna Need It` Regel besagt, dass unnützer Code und Features nicht geschrieben werden sollte, weil nicht nur diesen Code zu schreiben Aufwand kostet, sondern ihn auch wieder zu Entfernen, je später dies passiert.
Daher sollten Laufzeitkonfigurationen, voreilige Optimierungen und unnötige Features vermieden werden und erst dann implementiert werden, wenn sie wirklich benötigt werden.

::: warning Denke daran
Die Zukunft vorauszusagen, ob etwas notwendig ist oder nicht ist unmöglich.
Feedback an das Team, den PO, die Stakeholder und die Benutzer ist daher unerlässlich.
:::

## P10 SoC {#soc}

Das `Separation of Concerns` Prinzip besagt, dass Software so entwickelt werden sollte, dass die verschiedenen Aspekte der Software voneinander getrennt sind.
Eine Trennung von Verantwortlichkeiten und Aufgaben ermöglicht es, dass die Software leichter gewartet und erweitert werden kann.
Zudem ist sie dann leichter verständlich und testbar, weil Abstraktionen helfen, die Komplexität zu reduzieren.

Verschiedene Aspekte können sein:

* UI
* Datenbankzugriff
* Datenverwaltung
* generell Geschäftslogik
* Fehlerbehandlung (try/catch)
* Logging
* Security
* Klassen

::: info Kurz gesagt
Die Nicht-Einhaltung von SoC lässt sich leicht an *schnell-geschriebenen* Code sehen, der `alles` in einer Methode abhandelt.
:::

## P11 LC {#lc}

Das `Low Coupling` Prinzip besagt, dass Software so entwickelt werden sollte, dass die Abhängigkeiten zwischen den einzelnen Komponenten so gering wie möglich sind.
Module, Klassen und Komponenten sollten immer eine niedrige Kopplung und eine hohe Kohäsion haben.

Durch eine niedrige Kopplung können Module, Klassen und Komponenten wieder verwendet und leichter getestet werden.
Durch eine hohe Kohäsion sind Module, Klassen und Komponenten nur einer Aufgabe verpflichtet und haben eine klare Verantwortlichkeit ([Single Responsibility Principle](.#single-responsibility-principle)).

::: info Kopplung und Kohäsion
`Kopplung` ist die Abhängigkeit zwischen zwei oder mehr Modulen oder Komponenten.
Sie beschreibt, wie stark zwei oder mehr Module oder Komponenten voneinander abhängig sind.
`Kohäsion` ist die Zusammengehörigkeit von Funktionalitäten innerhalb eines Moduls, Klasse oder einer Komponente.
Sie beschreibt, wie stark die Funktionalität innerhalb eines Moduls, Klasse oder einer Komponente zusammenhängt.
:::

Es gibt verschiedene Arten von Kopplung:

* Datenkoppelung besteht darin, dass Module auf die Daten eines anderen Moduls zugreifen.
* Globale Datenkoppelung besteht darin, dass Module auf gemeinsame globale Daten zugreifen.
* Steuerungskoppelung besteht darin, dass ein Modul die Kontrolle über ein anderes Modul übernimmt.
* Koppelung durch gemeinsame Ressourcen besteht darin, dass Module auf gemeinsame Ressourcen zugreifen.
* Externe Koppelung besteht darin, dass Module von gleichen externen Software oder Hardware abhängig sind.
* Koppelung durch Kommunikation besteht darin, dass Module durch Kommunikation miteinander verbunden sind wie z.B. durch Nachrichten oder Signale oder Datenbanken.
* Funktionale Koppelung besteht darin, dass Module auf die Funktionalität des jeweiligen Moduls zugreifen.
* Temporale Koppelung besteht darin, dass Module abhängig einer zeitlichen Abfolge oder Reihenfolge von Ereignissen anderer Module sind.
* Sequenzielle Koppelung besteht darin, dass Module in einer bestimmten Reihenfolge ausgeführt werden müssen, da ihre Datenverarbeitung voneinander abhängig ist.
* Interaktionskoppelung besteht darin, dass Methoden oder Funktionen eines Moduls auf die Methoden oder Funktionen eines anderen Moduls zugreifen.
* Komponentenkoppelung besteht darin, dass Komponenten auf Variable oder Funktionen einer anderen Komponente direkt zugreifen.

## P12 IOSP {#iosp}

Das `Integration Operation Segregation Principle` besagt, dass Code entweder Operations-Logik oder Integration-Logik enthalten sollte, aber nicht beides.
Solch getrennte Logiken ermöglichen leichteres Testen und erhöht die Verständlichkeit des Codes durch kleinere und einfachere Methoden/Funktionen.

* Eine Methode/Funktion sollte Operations-Logik (Bedingungen, Schleifen, etc.) enthalten, die die Geschäftsregeln implementiert und/oder API-Aufrufe (oder derart) durchführt.
* Eine Methode/Funktion sollte Integration-Logik enthalten, die anderen Code verwendet, um die Operations-Logik zu implementieren.

## P13 NFR {#nfr}

Das `Non-Functional Requirements` Prinzip besagt, dass Software von Anfang an so entwickelt werden sollte, dass sie nicht-funktionale Anforderungen erfüllt.
Nicht-funktionale Anforderungen sind Anforderungen, die nicht direkt mit der Funktionalität der Software zusammenhängen, sondern mit anderen Aspekten wie Performance, Sicherheit, Skalierbarkeit, Wartbarkeit, Zuverlässigkeit, etc.
Es ist wichtig eine Priorisierung dieser nicht-funktionalen Anforderungen vor dem Beginn der Entwicklung zu machen, denn das nachträgliche Hinzufügen dieser Anforderungen bedeutet in der Regel einen höheren Aufwand.

## P14 FP {#fp}

Das `Flexible Principle` ist ein Prinzip, das die Flexibilität von Software beschreibt. Es besagt, dass Software so flexibel sein sollte, dass sie leicht an neue Anforderungen angepasst werden kann. Dies bedeutet, dass Software so entwickelt werden sollte, dass sie leicht erweitert oder geändert werden kann, ohne dass dies zu einem großen Aufwand führt.

## P15 EUHM {#euhm}

Insbesondere API sollten so entwickelt werden, dass sie einfach zu verwenden sind. Dies bedeutet, dass die API so einfach und verständlich wie möglich sein sollte, damit Entwickler sie leicht verwenden können.
Das `Easy to Use, Hard to Misuse` Prinzip besagt, dass die API so einfach wie möglich sein sollte, damit Entwickler sie leicht verwenden können, jedoch so restriktiv wie nötig, damit sie nicht missbraucht werden kann.

## P16 Postel's Law / Robustheitsgebot {#postel-s-law-robustheitsgebot}

Das `Postel's Law` Prinzip ist ein Konzept für Internetstandards. Auf Software bezogen bedeutet das Robustheitsgebot, dass Software so entwickelt werden sollte, dass sie so tolerant wie möglich gegenüber Eingaben von außen in Hinblick auf die Verarbeitung von Daten sein sollte und so restriktiv wie nötig in Hinblick auf die Ausgabe der eigenen Daten.

::: info Kurz gesagt
„Software sollte so geschrieben werden, dass sie mit jedem vorstellbaren Fehler umgehen kann, egal wie unwahrscheinlich er ist“ [^](https://datatracker.ietf.org/doc/html/rfc1122)
:::

## P17 TdA/IE {#tda-ie}

Das `Tell don't Ask` Prinzip ist ein Prinzip, das besagt, dass Objekte so entwickelt werden sollten, dass sie Informationen nicht nach aussen geben und stattdessen nur mit ihren Methoden diese Informationen verarbeiten lassen.
Wenn Objekte es anderen Objekten erlauben, auf ihre Daten zuzugreifen, führt dies zu einer Verletzung des `Information Hiding/Encapsulation` Prinzips und zu einer erhöhten Kopplung zwischen den Objekten (Koppelung durch Daten).
Weiterhin kommt es zu einer Inkonsistenz der Daten, da mehrere Objekte auf die gleichen Daten zugreifen können und es nicht gewährleistet ist, dass die Daten korrekt geschrieben werden.

## P18 IH/E {#ih-e}

Das Prinzips `Information Hiding/Encapsulation` besagt, dass Objekte so entwickelt werden sollten, dass sie ihre Daten und Methoden vor anderen Objekten verbergen.

## P19 PoQ {#poq}

Das `Principle of Quality` Prinzip besagt, dass Software so entwickelt werden sollte, dass sie eine hohe Qualität hat.
Es könnte schneller sein jetzt eine Lösung zu entwickeln, die nicht so gut ist, aber es wird später mehr Zeit und Geld kosten, um die Qualität zu verbessern.
Schlechte Qualität führt zu Frustration bei den Benutzern und den Entwicklern und lässt Fehler schwerer beseitigen und Features länger dauern.
Qualität muss nicht nur gelebt, sondern auch überwacht werden und Metriken wie Testüberdeckung, Fehlerrate sowie Code Reviews und statische Code Analyse sollten regelmäßig durchgeführt und überwacht werden.

## P20 CF {#cf}

Das `Customer Focus` Prinzip besagt, dass Software so entwickelt werden sollte, dass sie auf die Bedürfnisse des Kunden zugeschnitten ist.

Es ist wichtiger, dass der Kunde seine eigentliche Aufgabe mit dem Produkt erfüllen kann, als dass das Produkt technisch perfekt ist.
Dazu zählt auch, dass das Produkt einfach zu bedienen, die Benutzerfreundlichkeit im Vordergrund steht und die Fehler sich in Grenzen halten.

::: info Kurz gesagt
Fehler sind unerwartete Verhalten von Software gegenüber den Erwartungen des Benutzers.
Unerwartetes Verhalten ist jedoch nicht immer ein Fehler.
:::

## P21 UFT {#uft}

Das `Use familiar tools` Prinzip besagt, dass Software so entwickelt werden sollte, dass sie mit den Werkzeugen und Technologien entwickelt wird, die die Entwickler bereits kennen und verwenden.

## P22 FF {#ff}

Programmieren mit dem `Fail Fast` Prinzip bedeutet, dass Software defensive programmiert werden soll, damit Fehler zum frühstmöglichsten Zeitpunkt **durch** Code erkannt und behandelt werden können.
Eingabedaten sollten immer validiert und geprüft werden, damit die Fehlerfälle einfach und schnell erkannt und behandelt werden können.

## P23 RoE {#roe}

Die `Rule of Explicitness` (Regel der Eindeutigkeit/Unmissverständlichkeit) besagt, dass explizite Lösungen einfacher zu verstehen und zu warten sind als implizite Lösungen.
Implizite Lösungen erfordert, dass ein Entwickler zwischen den Zeilen lesen muss, um zu verstehen, wie die Lösung funktioniert.

## P24 Don't trust google {#don-t-trust-google}

Quellen und Quellcode, die aus einer Suchmaschine stammen, müssen immer überprüft und validiert werden.
Die Qualität von Quellcode, der aus einer Suchmaschine stammt, ist oft fragwürdig und kann zu Sicherheitslücken und Fehlern führen.

* Prüfe, ob es bereits eine Inhouse-Lösung gibt.
* Die Lizenz muss überprüft werden.
Die Verwendung von Lizenzen, die nicht mit den Unternehmensrichtlinien übereinstimmen ist nicht erlaubt.
* Wenn Quelltext übernommen wird, muss ein Test dafür geschrieben werden.

## P25 Behandle Warnungen als Fehler {#behandle-warnungen-als-fehler}

Warnungen im Code sollten immer als Fehler behandelt werden und entsprechend behoben werden.

Werden Warnungen ignoriert, können sie in bestimmten Fällen zu Fehlern führen, die nicht leicht zu finden sind.
Ausnahmen können gemacht werden, wenn die Warnung definitiv nicht zutrifft oder wenn sie zum aktuellen Zeitpunkt nicht behoben werden kann.

Warnungen sollten im Zuge eines Refactorings Stück für Stück behoben werden.
