---
layout: doc
---

# Prinzipien der Software Entwicklung

## Einleitung

Prinzipien sind grundlegende Regeln, die bei der Entwicklung von Software eingehalten werden sollten.
Jedes Prinzip stammt aus der Praxis und hat sich bewährt, um Software zu entwickeln, die wartbar, erweiterbar und verständlich ist.
Dennoch können Prinzipien sich gegenseitig widersprechen.
In der Praxis ist es daher wichtig, die Prinzipien zu kennen und sich mit ihnen auseinanderzusetzen, um die richtige Balance zu finden.

## SOLID

SOLID ist das grundlegenste Prinzip der Softwareentwicklung.
Es steht für die fünf Prinzipien der Softwareentwicklung:

* Single Responsibility Principle,
* Open/Closed Principle,
* Liskov Substitution Principle,
* Interface Segregation Principle und
* Dependency Inversion Principle.

### Single Responsibility Principle

Das `Single Responsibility Principle` besagt, dass eine Klasse oder ein Modul nur eine einzige Aufgabe erfüllen sollte.
Ihre Funktionen und Methoden ermöglichen im Gesamtbild, dass diese Aufgabe erfüllt wird.
Jede Funktion oder Methode sollte jedoch nur wiederum eine einzige Aufgabe erfüllen.

> Trotzdem können Module, Komponenten oder Klassen mehrere Funktionen oder Methoden besitzen, sollte jede Funktion oder Methode nur eine einzige Aufgabe erfüllen, die zur Erfüllung der Gesamtaufgabe beiträgt.

### Open/Closed Principle

### Liskov Substitution Principle

### Interface Segregation Principle

## KISS

KISS steht für `Keep It Simple, Stupid` und ist ein Prinzip, das besagt, dass Software so einfach wie möglich sein sollte.
Dies bedeutet, dass Software so einfach und verständliche für andere Entwickler sein sollte, dass sie leicht gewartet und erweitert werden kann.

> Gute Software ist einfach und verständlich.

## DRY

Code, der sich oft wiederholt, ist schwer zu pflegen und zu korrigieren, da Änderungen an einer Stelle auch an anderen (oft unbekannten) Stellen gemacht werden müssen.

Das `Don't Repeat Yourself` Prinzip besagt, dass Code so geschrieben werden sollte, dass er sich nicht wiederholt.

### Die 2-3-5 Regel

Die *2-3-5* Regel besagt, dass Code, der sich mehr als **zweimal** wiederholt, in eine Funktion oder Methode ausgelagert werden sollte.
Code, der sich mehr als **dreimal** wiederholt, sollte in eine Klasse oder ein Modul ausgelagert werden.
Code, der sich mehr als **fünfmal** wiederholt, sollte in eine eigene Bibliothek oder ein eigenes Framework ausgelagert werden.

> Oftmals ist doppelter Code nicht sofort ein Problem, sondern erst später, wenn er ein drittes Mal angefasst wird.
> Daher kann es manchmal besser sein, Code erst dann zu restrukturieren, wenn er sich zum dritten Mal wiederholt.

## SPOT

Das `Single Point of Truth` Prinzip besagt, dass es nur eine einzige Stelle geben sollte, an der eine Information gespeichert wird.

Wenn es mehrere Stellen gibt, an denen die gleiche Information gespeichert wird, kommt es unweigerlich zu Inkonsistenzen und Fehlern.
Es ist dann nicht mehr möglich welche Information die richtige ist.

## YAGNI

Die `You Ain't Gonna Need It` Regel besagt, dass unnützer Code und Features nicht geschrieben werden sollte, weil nicht nur diesen Code zu schreiben Aufwand kostet, sondern ihn auch wieder zu Entfernen, je später dies passiert.
Daher sollten Laufzeitkonfigurationen, voreilige Optimierungen und unnötige Features vermieden werden und erst dann implementiert werden, wenn sie wirklich benötigt werden.

> Die Zukunft vorauszusagen, ob etwas notwendig ist oder nicht ist unmöglich. Feedback an das Team, den PO, die Stakeholder und die Benutzer ist daher unerlässlich.

## SoC

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

> Die Nicht-Einhaltung von SoC lässt sich leicht an *schnell-geschriebenen* Code sehen, der `alles` in einer Methode abhandelt.

## LC

Das `Low Coupling` Prinzip besagt, dass Software so entwickelt werden sollte, dass die Abhängigkeiten zwischen den einzelnen Komponenten so gering wie möglich sind.

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

## IOSP

Das `Integration Operation Segregation Principle` besagt, dass Code entweder Operations-Logik oder Integration-Logik enthalten sollte, aber nicht beides.
Solch getrennte Logiken ermöglichen leichteres Testen und erhöht die Verständlichkeit des Codes durch kleinere und einfachere Methoden/Funktionen.

* Eine Methode/Funktion sollte Operations-Logik (Bedingungen, Schleifen, etc.) enthalten, die die Geschäftsregeln implementiert und/oder API-Aufrufe (oder derart) durchführt.
* Eine Methode/Funktion sollte Integration-Logik enthalten, die anderen Code verwendet, um die Operations-Logik zu implementieren.

## NFR

Das `Non-Functional Requirements` Prinzip besagt, dass Software von Anfang an so entwickelt werden sollte, dass sie nicht-funktionale Anforderungen erfüllt.
Nicht-funktionale Anforderungen sind Anforderungen, die nicht direkt mit der Funktionalität der Software zusammenhängen, sondern mit anderen Aspekten wie Performance, Sicherheit, Skalierbarkeit, Wartbarkeit, Zuverlässigkeit, etc.
Es ist wichtig eine Priorisierung dieser nicht-funktionalen Anforderungen vor dem Beginn der Entwicklung zu machen, denn das nachträgliche Hinzufügen dieser Anforderungen bedeutet in der Regel einen höheren Aufwand.

## FP

Das `Flexible Principle` ist ein Prinzip, das die Flexibilität von Software beschreibt. Es besagt, dass Software so flexibel sein sollte, dass sie leicht an neue Anforderungen angepasst werden kann. Dies bedeutet, dass Software so entwickelt werden sollte, dass sie leicht erweitert oder geändert werden kann, ohne dass dies zu einem großen Aufwand führt.

## EUHM

Insbesondere API sollten so entwickelt werden, dass sie einfach zu verwenden sind. Dies bedeutet, dass die API so einfach und verständlich wie möglich sein sollte, damit Entwickler sie leicht verwenden können.
Das `Easy to Use, Hard to Misuse` Prinzip besagt, dass die API so einfach wie möglich sein sollte, damit Entwickler sie leicht verwenden können, jedoch so restriktiv wie nötig, damit sie nicht missbraucht werden kann.

## Postel's Law / Robustheitsgebot

Das `Postel's Law` Prinzip ist ein Konzept für Internetstandards. Auf Software bezogen bedeutet das Robustheitsgebot, dass Software so entwickelt werden sollte, dass sie so tolerant wie möglich gegenüber Eingaben von außen in Hinblick auf die Verarbeitung von Daten sein sollte und so restriktiv wie nötig in Hinblick auf die Ausgabe der eigenen Daten.

> „Software sollte so geschrieben werden, dass sie mit jedem vorstellbaren Fehler umgehen kann, egal wie unwahrscheinlich er ist“ [^](https://datatracker.ietf.org/doc/html/rfc1122)

## TdA/IE

Das `Tell don't Ask` Prinzip ist ein Prinzip, das besagt, dass Objekte so entwickelt werden sollten, dass sie Informationen nicht nach aussen geben und stattdessen nur mit ihren Methoden diese Informationen verarbeiten lassen.
Wenn Objekte es anderen Objekten erlauben, auf ihre Daten zuzugreifen, führt dies zu einer Verletzung des `Information Hiding/Encapsulation` Prinzips und zu einer erhöhten Kopplung zwischen den Objekten (Koppelung durch Daten).
Weiterhin kommt es zu einer Inkonsistenz der Daten, da mehrere Objekte auf die gleichen Daten zugreifen können und es nicht gewährleistet ist, dass die Daten korrekt geschrieben werden.

## IH/E

Das Prinzips `Information Hiding/Encapsulation` besagt, dass Objekte so entwickelt werden sollten, dass sie ihre Daten und Methoden vor anderen Objekten verbergen.

## PoQ

Das `Principle of Quality` Prinzip besagt, dass Software so entwickelt werden sollte, dass sie eine hohe Qualität hat.
Es könnte schneller sein jetzt eine Lösung zu entwickeln, die nicht so gut ist, aber es wird später mehr Zeit und Geld kosten, um die Qualität zu verbessern.
Schlechte Qualität führt zu Frustration bei den Benutzern und den Entwicklern und lässt Fehler schwerer beseitigen und Features länger dauern.
Qualität muss nicht nur gelebt, sondern auch überwacht werden und Metriken wie Testüberdeckung, Fehlerrate sowie Code Reviews und statische Code Analyse sollten regelmäßig durchgeführt und überwacht werden.

## CF

Das `Customer Focus` Prinzip besagt, dass Software so entwickelt werden sollte, dass sie auf die Bedürfnisse des Kunden zugeschnitten ist.

Es ist wichtiger, dass der Kunde seine eigentliche Aufgabe mit dem Produkt erfüllen kann, als dass das Produkt technisch perfekt ist.
Dazu zählt auch, dass das Produkt einfach zu bedienen, die Benutzerfreundlichkeit im Vordergrund steht und die Fehler sich in Grenzen halten.

> Fehler sind unerwartete Verhalten von Software gegenüber den Erwartungen des Benutzers.

## UFT

Das `Use familiar tools` Prinzip besagt, dass Software so entwickelt werden sollte, dass sie mit den Werkzeugen und Technologien entwickelt wird, die die Entwickler bereits kennen und verwenden.

## FF

Programmieren mit dem `Fail Fast` Prinzip bedeutet, dass Software defensive programmiert werden soll, damit Fehler zum frühstmöglichsten Zeitpunkt **durch** Code erkannt und behandelt werden können.
Eingabedaten sollten immer validiert und geprüft werden, damit die Fehlerfälle einfach und schnell erkannt und behandelt werden können.

## RoE

Die `Rule of Explicitness` (Regel der Eindeutigkeit/Unmissverständlichkeit) besagt, dass explizite Lösungen einfacher zu verstehen und zu warten sind als implizite Lösungen. 
Implizite Lösungen erfordert, dass ein Entwickler zwischen den Zeilen lesen muss, um zu verstehen, wie die Lösung funktioniert.

\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
