---

layout: home
outline: [2, 2]

customRulePrefix: DPT
customIgnoreTitlesForRules: [Einleitung]

hero:
  name: Technische Ansätze
  text: Techniken
  tagline: Was es schon alles gibt
  actions:
    - theme: alt
      text: Allgemein
      link: ./general
    - theme: alt
      text: Erschaffungsmuster
      link: ./creational
    - theme: alt
      text: Strukturmuster
      link: ./structural
    - theme: alt
      text: Verhaltensmuster
      link: ./behavioral
    - theme: alt
      text: Architekturmuster
      link: ./architectural
    - theme: brand
      text: Technische Ansätze
      link: #
    - theme: alt
      text: Übersicht
      link: ./index
---

<!-- <img src="/diagram_light_128.png" alt="Creational Pattern" width="36" height="36"><br> -->

[[toc]]
<br>

# Technische Ansätze

## Einleitung {#einleitung}

Es gibt viele Programmieransätze, die sich bewährt haben und die in vielen Projekten eingesetzt werden.
Hier werden einige dieser Ansätze vorgestellt, die in der Softwareentwicklung eine wichtige Rolle spielen und nicht neu erfunden werden müssen.

Allen Kapiteln wurde eine eindeutige Nummerierung, der Richtliniennummer, hinzugefügt, um eine eindeutige Identifikation zu ermöglichen.
Jede Richtliniennummer besteht aus dem Buchstaben **DPT**(Design Pattern Technical) gefolgt von einer Nummer, die den Abschnitt identifiziert. Damit kann eine Regel eindeutig identifiziert werden, z.B. für ein Code-Review.

## DPT1 Feature Flags {#feature-flags}

Feature Flags sind Mechanismen, die es Entwicklern ermöglichen, bestimmte Funktionen oder Codeabschnitte zur Laufzeit zu aktivieren oder zu deaktivieren, ohne den Code neu zu deployen.
Dies unterstützt eine flexiblere und sicherere Softwarebereitstellung.

::: warning Feature-Flags sind keine Konfigurationsdateien

Feature Flags sollten nicht als Ersatz für Konfigurationsdateien verwendet werden.
Sie sind dazu gedacht, die Bereitstellung von Funktionen zu steuern, nicht die Konfiguration von Anwendungen.
Die Bereitstellung von Funktionen soll dabei sofort und ohne Neustart der Anwendung erfolgen.

:::

### DPT1 Vorteile von Feature Flags

Durch Feature Flags wird das Deployment vom Release entkoppelt, was folgende Vorteile bietet:

- **Trunk-Based Development:** Ermöglicht es, Code in den Hauptzweig zu integrieren, ohne dass er sofort für alle Benutzer sichtbar ist.
Wenn Features lange Zeit in eigenständigen Zweigen entwickelt werden, kann es zu Konflikten und Integrationsproblemen kommen.
- **Erhöhte Flexibilität:** Ermöglicht es Teams, Funktionen unabhängig vom Deployment-Zyklus zu steuern.
Dadurch kann Software bereits in ein Release integriert werden, bevor sie für alle Benutzer freigegeben wird.
- **Reduziertes Risiko:** Neue Funktionen können in kontrollierten Umgebungen getestet werden, bevor sie vollständig ausgerollt werden.
- **Schnellere Iteration:** Feedback kann schneller gesammelt und in die Entwicklung integriert werden, was die Produktentwicklung beschleunigt.

### DPT1 Anwendungsfälle für Feature Flags

- **Progressive Delivery:** Schrittweises Ausrollen von Funktionen an ausgewählte Benutzergruppen, um Feedback zu sammeln und die Systemstabilität zu gewährleisten.
- **Experimentation und A/B-Tests:** Testen verschiedener Varianten einer Funktion, um die effektivste Lösung zu identifizieren.
- **Schnelle Deaktivierung (Kill Switches):** Bei unerwarteten Problemen können Funktionen sofort deaktiviert werden, um negative Auswirkungen zu minimieren.
- **Infrastruktur-Migrationen:** Erleichterung von Übergängen, z. B. bei der Migration von Monolithen zu Microservices, bei Refactoring [Strangler Pattern](../5.refactoring/principals#strangler-pattern) oder bei der Einführung neuer Implementierungen, indem neue Implementierungen schrittweise aktiviert werden.
- **Veraltete Features:** Veraltete oder nicht mehr benötigte Features können testweise deaktiviert werden, um zu prüfen, ob der zuständige Code entfernt werden kann.

### DPT1 Best Practices

- **Sofortige Auswirkungen:** Änderungen an Feature Flags sollen sofort wirksam werden, ohne dass die Anwendung neu gestartet werden muss.
- **Verwaltung von technischen Schulden:** Veraltete oder nicht mehr benötigte Feature Flags sollten regelmäßig entfernt werden, um die Codebasis sauber zu halten.
- **Dokumentation:** Sorgfältige Dokumentation der Feature Flags und ihrer Zwecke, um Verwirrung im Team zu vermeiden.
- **Sicherheit:** Sicherstellen, dass Feature Flags nicht missbraucht werden können, um unautorisierte Funktionen zu aktivieren.

### DPT1 Quellen

- [Feature Flags - Martin Fowler](https://martinfowler.com/articles/feature-toggles.html)
- [Feature Flags - LaunchDarkly](https://launchdarkly.com/blog/what-are-feature-flags/)
- [Feature Toggle - Wikipedia](https://de.wikipedia.org/wiki/Feature_Toggle)
