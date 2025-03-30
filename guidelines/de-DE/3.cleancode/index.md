---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Clean Code"
  text: "Craftsmanship/ Craftwomanship"
  tagline: "Guter Code ist Einstellungssache"
  actions:
    - theme: brand
      text: Craftmanship/Craftwomanship
      link: ./craftsmanship
    - theme: alt
      text: 10000 Stunden Regel
      link: ./10000hours
    - theme: alt
      text: Warum Clean Code?
      link: ./whycleancode
    - theme: alt
      text: Performance?
      link: ../6.languages/performance
    - theme: brand
      text: Literatur
      link: ../sources

features:

---

# Clean Code

## Einleitung

Clean Code wurde ursprünglich von Robert C. Martin in seinem gleichnamigen Buch genannt.
Es ist ein Begriff, der sich auf die Lesbarkeit und Wartbarkeit von Code bezieht und Verhaltensweise, Prinzipien, Regeln und Best Practices umfasst, die dazu beitragen, Code sauber und verständlich zu halten.

Viele Regeln und Best Practices in diesen [Richtlinien](../) sind Teil von Clean Code oder können als Teil davon betrachtet werden.

## Was ist Clean Code?

Clean Code beschreibt eine Programmierphilosophie, die darauf abzielt, verständlichen, wartbaren und fehlerfreien Code zu schreiben. Robert C. Martin hat in seinem Buch *Clean Code: A Handbook of Agile Software Craftsmanship* die wichtigsten Prinzipien und Best Practices zusammengefasst. Dazu gehören:

- **Klarheit und Einfachheit**: Code sollte so geschrieben sein, dass er leicht verständlich ist.
- **DRY (Don't Repeat Yourself)**: Redundanzen im Code vermeiden, um Fehlerquellen zu minimieren.
- **Single Responsibility Principle (SRP)**: Jede Klasse oder Methode sollte genau eine Verantwortung haben.
- **Testbarkeit**: Code sollte so strukturiert sein, dass er sich leicht mit Unit-Tests überprüfen lässt.
- [Siehe auch weitere Prinzipien](../2.principles/)

Diese Prinzipien helfen dabei, langfristig wartbare und erweiterbare Software zu entwickeln. Der Fokus liegt auf Qualität und nicht auf kurzfristigen Effizienzgewinnen. Weitere Informationen zu Clean Code finden sich in folgenden Quellen:

- Robert C. Martin: *Clean Code: A Handbook of Agile Software Craftsmanship* (2008)
- Martin Fowler: *Refactoring: Improving the Design of Existing Code* (2018)
- Kent Beck: *Test-Driven Development: By Example* (2002)

## Clean Code und Performance – Ein Widerspruch?

In Diskussionen rund um "Clean Code" von Robert C. Martin taucht oft das Argument auf, dass dieser Ansatz die Performance einer Anwendung negativ beeinflusse.
Kritiker behaupten, dass der Fokus auf Lesbarkeit, Erweiterbarkeit und Testbarkeit zu unnötigem Overhead führt.
Befürworter hingegen sehen in Clean Code die Basis für eine nachhaltige Softwareentwicklung.
Doch wie so oft in der Softwareentwicklung gibt es keine absolute Wahrheit – **es kommt auf den Kontext an**.

### Vorteile von Clean Code

Clean Code verfolgt das Ziel, verständlichen, erweiterbaren und testbaren Code zu schreiben. Dies bietet eine Reihe von Vorteilen:

- **Verbesserte Wartbarkeit**: Verständlicher Code erleichtert Anpassungen und Erweiterungen, was besonders in großen Softwareprojekten essenziell ist.
- **Bessere Testbarkeit**: Durch Prinzipien wie Dependency Injection können Komponenten isoliert getestet werden, was die Softwarequalität erheblich steigert.
- **Reduzierte technische Schulden**: Gut strukturierter Code minimiert die Gefahr von "Hacks" und Workarounds, die langfristig schwer verständlich und fehleranfällig sind.

### Kritik: Performance-Nachteile?

Die Kritik an Clean Code in Bezug auf Performance basiert auf mehreren Annahmen:

- **Abstraktions-Overhead**: Clean Code setzt auf Prinzipien wie Single Responsibility und Dependency Injection.
Dadurch entstehen zusätzliche Abstraktionsschichten, die potenziell die Laufzeit beeinflussen können.
- **Speicherverbrauch**: Durch zusätzliche Objekte, Methoden und Klassen kann der Speicherverbrauch steigen, was in ressourcenbeschränkten Umgebungen problematisch sein kann.
- **Methodenaufruf-Overhead**: Kleine, klar definierte Methoden erfordern mehr Funktionsaufrufe, was sich in Performance-kritischen Situationen summieren kann.

### Die pragmatische Lösung: Messen und Optimieren

Doch bedeutet dies, dass Clean Code per se unperformant ist? Nein, denn die Softwareentwicklung ist ein iterativer Prozess.
**Die richtige Herangehensweise besteht darin, zunächst eine funktionierende, gut getestete Software zu entwickeln.**
Erst dann kann gezielt an der Performance gearbeitet werden:

1. **Messen statt raten**: Statt von vornherein auf Performance zu optimieren, sollten Entwickler zunächst messen, wo tatsächliche Engpässe liegen. Dies kann durch Profiler oder spezifische Metriken erfolgen.
2. **Gezielt optimieren**: Nach der Messung kann Code an den relevanten Stellen angepasst oder optimiert werden, ohne die gesamte Struktur zu gefährden.
3. **Offen für Erweiterungen bleiben (OCP - Open-Closed Principle)**: Eine gut strukturierte Codebasis erlaubt es, Performance-Verbesserungen gezielt einzufügen, ohne bestehende Funktionalität zu brechen.
4. **Mit Tests absichern**: Dank sauberer Architektur und Dependency Injection lassen sich Änderungen leicht überprüfen, um sicherzustellen, dass die Optimierung nicht zu neuen Fehlern führt.

### In Kürze

Clean Code und Performance stehen nicht grundsätzlich im Widerspruch.
Vielmehr sollte der Fokus zunächst auf einer gut strukturierten, funktionierenden Software liegen.
Erst nach der Messung echter Performance-Engpässe sollten gezielte Optimierungen erfolgen. Clean Code schafft hier die Grundlage für eine nachhaltige Weiterentwicklung und erlaubt es, Performance-Tweaks gezielt und überprüfbar einzufügen.
