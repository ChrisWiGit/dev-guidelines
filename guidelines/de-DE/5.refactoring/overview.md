---
layout: doc
---
# Code Refactoring

- [Code Refactoring](#code-refactoring)
  - [Warum Refactoring?](#warum-refactoring)
  - [Begriffsdefinition](#begriffsdefinition)
  - [Allgemeines Code-Refactoring](#allgemeines-code-refactoring)
    - [Code Refactoring als Teil der Programmierung](#code-refactoring-als-teil-der-programmierung)
    - [Prüfung auf Code Smells](#prüfung-auf-code-smells)
    - [Inkrementelles Refactoring](#inkrementelles-refactoring)
    - [Anwendung von Best Practices während der Programmierung](#anwendung-von-best-practices-während-der-programmierung)
    - [Bewusstsein für Seiteneffekte](#bewusstsein-für-seiteneffekte)
    - [Weiteres Refactoring nach Programmierung](#weiteres-refactoring-nach-programmierung)
    - [Dokumentation von Legacy-Code](#dokumentation-von-legacy-code)
    - [Kontinuierliche und sorgfältige Dokumentation für API-Benutzer](#kontinuierliche-und-sorgfältige-dokumentation-für-api-benutzer)
    - [Dokumentation von internen Code](#dokumentation-von-internen-code)

## Warum Refactoring?

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

## Begriffsdefinition

`Code Refactoring` bezieht sich auf den Prozess der Überarbeitung von vorhandenem Code, um dessen interne Struktur zu verbessern, ohne dabei das externe Verhalten zu ändern.

Das Hauptziel des Refactorings besteht darin, den Code lesbarer, verständlicher und leichter wartbar zu machen.
Es beinhaltet das Umstrukturieren des Codes, um ihn effizienter, besser organisiert und robuster zu gestalten.
Dabei werden Code-Duplikate entfernt, komplexe Teile vereinfacht, Code-Standards angepasst und die Code-Qualität verbessert.

::: warning
Es ist wichtig zu beachten, dass Refactoring kein Zwang ist, sondern eine empfohlene Praxis, um die Qualität des Codes im Laufe der Zeit kontinuierlich zu verbessern.
Viele Entwickler haben jedoch Angst vor Refactoring, da sie befürchten, dass es zu unerwünschten Seiteneffekten führen könnte und ihr Manager ihnen keine Zeit dafür gibt.
Trotzdem merken sie irgendwann, dass der Code so unübersichtlich und komplex geworden ist, dass er Schmerzen verursacht, ihn zu ändern.
:::

## Allgemeines Code-Refactoring

Code Refactoring (Code-Überarbeitung) ist der Prozess der Überarbeitung und Umstrukturierung des Quellcodes einer Software, um ihn effizienter, lesbarer und einfacher zu warten, ohne dabei das externe Verhalten der Anwendung zu ändern.
Dabei werden technische Schulden abgebaut und die Codequalität verbessert.

### Code Refactoring als Teil der Programmierung

Code Refactoring sollte als integraler Bestandteil der normalen Programmiertätigkeit betrachtet werden.

### Prüfung auf Code Smells

Bevor du mit einer Aufgabe beginnst, sollte bestehender Code zunächst auf "Code Smells" geprüft werden.
`Code Smells` sind Anzeichen in deinem Code, die auf tiefer liegende Probleme hinweisen können.
Beispiele hierfür sind überlange Funktionen, verschachtelte Schleifen, globale Variablen und duplizierter Code. Durch das Identifizieren dieser "Code Smells" kannst du gezielt Verbesserungen vornehmen.

### Inkrementelles Refactoring

Anstatt große Teile des Codes auf einmal zu ändern, ist es ratsam, kleine, schrittweise Änderungen vorzunehmen.
Dies erleichtert das Finden und Beheben von Fehlern und hilft, den Überblick zu behalten.
Damit ist es auch möglich große Teile des Codes zu erneuern, ohne dass ein ganzes Team daran arbeiten muss.

### Anwendung von Best Practices während der Programmierung

Die Durchführung der Programmiertätigkeit sollte immer unter Anwendung bewährter Methoden (Best Practices) erfolgen.

### Bewusstsein für Seiteneffekte

Während des Refactorings ist es wichtig, sicherzustellen, dass dein Code noch immer das tut, was er soll.
Änderungen, die unerwartete Seiteneffekte verursachen könnten, sollten mit Vorsicht behandelt werden.
Teste deinen Code gründlich, um sicherzustellen, dass er immer noch korrekt funktioniert.

### Weiteres Refactoring nach Programmierung

Nach der Durchführung der Programmiertätigkeit sollte ein weiteres Refactoring auf den geänderten Code angewendet werden, um ständige Verbesserungen zu gewährleisten.

### Dokumentation von Legacy-Code

Bestehender Code, der bisher nicht dokumentiert wurde, sollte im Nachhinein auch nicht kommentiert werden.
Dokumentation von Legacy-Code ist auch im Nachhinein kaum eine Hilfe, den Code zu verstehen, denn die Dokumentation kann veraltet, irreführend oder unverständlich sein.
Beim Lesen von alten Code besteht die Gefahr, dass er falsch verstanden wird und die Dokumentation dadurch nutzlos und verwirrend wird.
Vielmehr sollte alter Code selbst im Zuge eines Refactorings verbessert werden, damit er selbsterklärend ist und nur neue Dokumentation braucht.

### Kontinuierliche und sorgfältige Dokumentation für API-Benutzer

Die Dokumentation des öffentlichen Schnittstellen sollte während des gesamten Programmierprozesses stattfinden, anstatt sie bis zum Ende zu verschieben, wo sie möglicherweise überhastet und unvollständig umgesetzt wird.
Insbesondere beim öffentlich zugänglichen Teil des Codes, der API, sollte besonderer Wert auf Vollständigkeit und Verständlichkeit gelegt werden.
Eine umfassende und klar strukturierte Dokumentation würdigt die Zeit der API-Benutzer und erleichtert ihnen die Arbeit erheblich.
Beispiele können einen wertvollen Beitrag leisten, indem sie das Verständnis vertiefen und die Anwendung der API in verschiedenen Kontexten veranschaulichen.
Es ist von entscheidender Bedeutung, dass die Dokumentation stets den aktuellen Entwicklungsstand widerspiegelt und keine veralteten oder falschen Informationen enthält.

### Dokumentation von internen Code

Die Dokumentation von internen Code gestaltet sich einfacher als für Dokumentation von öffentlichen Schnittstellen.
Es sollte zuallererst beachtet werden, dass der Code selbst erklärend ist, andernfalls muss er überarbeitet werden.
Wenn der Code klein genug und verständlich ist, können Kommentare und Methoden-Dokumentation gespart werden, um so die Wahrscheinlichkeit von veralteter und irreführender Dokumentation zu verringern.
Der Code spricht für sich selbst und dokumentiert sollte daher die Intention des Entwicklers, warum bestimmte Codestellen sich auf eine bestimmte Art und Weise verhalten.
