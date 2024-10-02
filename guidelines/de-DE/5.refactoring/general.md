---
layout: doc
customRulePrefix: RFG
customIgnoreTitlesForRules: [Einleitung,Begriffsdefinition,Warum Refactoring?]
---

# Allgemeine Vorgehensweise beim Refactoring

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

::: details Refactoring vs. Refaktorisierung vs. Refaktorierung

- **Refactoring** ist der Prozess, bei dem der Code verbessert wird, ohne das Verhalten zu ändern.
- **Refaktorierung** ist der Prozess, bei dem der Code verbessert wird, ohne das Verhalten zu ändern.
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

## RFG1 Wann soll refaktoriert werden? {#wann-soll-refaktoriert-werden}

1. Refactoring wird vor dem Beginn einer neuen Aufgabe durchgeführt, wenn notwendig.
Das Refactoring ermöglicht es auch sich in den Code einzuarbeiten und die Anforderungen besser zu verstehen.

2. Refactoring wird nach dem Programmieren durchgeführt, um den Code zu verbessern und die Qualität zu erhöhen.

3. Refactoring solle immer dann durchgeführt werden, wenn der Code schwer zu verstehen ist, schwer zu warten ist oder wenn neue Funktionen hinzugefügt werden sollen.

4. Ein Refactoring soll zu einem Bug- oder Story-Ticket durchgeführt werden, und in der Regel nicht als eigenständige Aufgabe.
Ausnahmen können größere Refactorings sein.

5. Refactoring soll in kleinen Schritten durchgeführt werden, um die Wahrscheinlichkeit von Fehlern zu minimieren.
Dies erleichtert das Finden und Beheben von Fehlern und hilft, den Überblick zu behalten.
Damit ist es auch möglich große Teile des Codes zu erneuern, ohne dass ein ganzes Team daran arbeiten muss.

6. Zu einem Refaktoring gehört zudem das Schreiben von Tests, um die Funktionalität sicherzustellen.

## RFG2 Prüfung auf Code Smells {#pruefung-auf-code-smells}

`Code Smells` sollen identifiziert und behoben werden, um die Codequalität zu verbessern.

::: info Code Smells
Code Smells sind Anzeichen in deinem Code, die auf tiefer liegende Probleme hinweisen können.
Beispiele hierfür sind überlange Funktionen, verschachtelte Schleifen, globale Variablen und duplizierter Code. Durch das Identifizieren dieser "Code Smells" kannst du gezielt Verbesserungen vornehmen.
:::

## RFG3 Umbenennen {#umbenennen}

Namen sollen manuell oder automatisiert umbenannt werden, um die Bedeutung des Codes zu verdeutlichen.

Namen sollen aussagekräftig und verständlich sein, damit der Inhalt der Variablen, Methoden, Klassen und Module klar ist.

Siehe dazu auch die Richtlinie [Benamung](../6.languages/naming.md).

## RFG4 Vereinfachungen {#vereinfachungen}

Code soll vereinfacht werden, um die Lesbarkeit zu verbessern.

Die Prinzipien [DRY](../2.principles/principles#dry), [SOC](../2.principles/principles#soc) und [KISS](../2.principles/principles#kiss) sind hierbei zu beachten.

## RFG5 Verantwortlichkeiten trennen {#verantwortlichkeiten-trennen}

Alle Verantwortlichkeiten sollen klar getrennt werden, um die Wartbarkeit zu verbessern.

Die Prinzipien [SRP](../2.principles/principles#single-responsibility-principle) und [ISP](../2.principles/principles#interface-segregation-principle) sind hierbei zu beachten.

## RFG6 Methoden extrahieren {#methoden-extrahieren}

Um Methoden einfacher zu verstehen, sollen sie in kleinere Methoden extrahiert werden.

Die Prinzipien [DRY](../2.principles/principles#dry) und [KISS](../2.principles/principles#kiss) sind hierbei zu beachten.

### RFG6 Bewusstsein für Seiteneffekte beim Refactoring

Während des Refactorings ist es wichtig, sicherzustellen, dass der Code noch immer das tut, was er soll.
Änderungen, die unerwartete Seiteneffekte verursachen könnten, sollen mit Vorsicht behandelt werden.
Teste den Code gründlich, um sicherzustellen, dass er immer noch korrekt funktioniert.

### RFG6 Dokumentation von Legacy-Code

Bestehender Code, der bisher nicht kommentiert wurde, soll im Nachhinein auch nicht kommentiert werden.

Dokumentation von Legacy-Code ist auch im Nachhinein kaum eine Hilfe, den Code zu verstehen.
Beim Lesen von alten Code besteht die Gefahr, dass er falsch verstanden wird und die Dokumentation dadurch nutzlos und verwirrend wird.
Vielmehr soll alter Code selbst im Zuge eines Refactorings verbessert werden, damit er selbsterklärend ist und nur neue Dokumentation braucht.

### RFG6 Kontinuierliche und sorgfältige Dokumentation für API-Benutzer

Die Dokumentation des öffentlichen Schnittstellen soll während des gesamten Programmierprozesses stattfinden, anstatt sie bis zum Ende zu verschieben, wo sie möglicherweise überhastet und unvollständig umgesetzt wird.
Insbesondere beim öffentlich zugänglichen Teil des Codes, der API, soll besonderer Wert auf Vollständigkeit und Verständlichkeit gelegt werden.
Eine umfassende und klar strukturierte Dokumentation würdigt die Zeit der API-Benutzer und erleichtert ihnen die Arbeit erheblich.
Beispiele können einen wertvollen Beitrag leisten, indem sie das Verständnis vertiefen und die Anwendung der API in verschiedenen Kontexten veranschaulichen.
Es ist von entscheidender Bedeutung, dass die Dokumentation stets den aktuellen Entwicklungsstand widerspiegelt und keine veralteten oder falschen Informationen enthält.
