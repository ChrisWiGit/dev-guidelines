---

layout: home
outline: [2, 2]

customRulePrefix: DPA
customIgnoreTitlesForRules: [Einleitung]

hero:
  name: "Design Patterns"
  text: "Architekturmuster"
  tagline: Architektur ist die Basis
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
    - theme: brand
      text: Architekturmuster
      link: #
    - theme: alt
      text: Technische Ansätze
      link: ./technical
    - theme: alt
      text: Übersicht
      link: ./index
---

[[toc]]
<br>

# Architekturmuster

## Einleitung {#einleitung}

Architekturmuster sind Entwurfsmuster, die sich mit der Strukturierung von Anwendungen beschäftigen.

Allen Kapiteln wurde eine eindeutige Nummerierung, der Richtliniennummer, hinzugefügt, um eine eindeutige Identifikation zu ermöglichen.
Jede Richtliniennummer besteht aus dem Buchstaben **DPA**(Design Pattern Architectural) gefolgt von einer Nummer, die den Abschnitt identifiziert. Damit kann eine Regel eindeutig identifiziert werden, z.B. für ein Code-Review.

## DPA1 Bekannte Architekturmuster {#bekannte-architekturmuster}

Es gibt eine Menge von Architekturmuster, die in der Softwareentwicklung verwendet werden. Hier sind einige der bekanntesten:

- **Broker**: Ein Broker ist ein Architekturmuster, das die Kommunikation zwischen Komponenten in einem verteilten System vereinfacht.
- **MVC**: Model-View-Controller ist ein Architekturmuster, das die Anwendung in drei Komponenten unterteilt: Model, View und Controller.
- **MVVM**: Model-View-ViewModel ist ein Architekturmuster, das die Anwendung in drei Komponenten unterteilt: Model, View und ViewModel.
- **SoA**: Service-Oriented Architecture ist ein Architekturmuster, das die Anwendung in Services unterteilt, die über das Netzwerk kommunizieren.
- **Pipes and Filters**: Pipes and Filters ist ein Architekturmuster, das die Anwendung in eine Reihe von Filtern unterteilt, die durch Pipes miteinander verbunden sind.
- **Blackboard**: Blackboard ist ein Architekturmuster, das die Anwendung in eine Reihe von Komponenten unterteilt, die auf einem gemeinsamen Speicher arbeiten.

Weitere sind:

- **Interpreter**: Interpreter ist ein Architekturmuster, das die Anwendung in eine Reihe von Ausdrücken unterteilt, die von einem Interpreter ausgewertet werden.
- **Reflective**: Reflective ist ein Architekturmuster, das die Anwendung in eine Reihe von Objekten unterteilt, die ihre Struktur zur Laufzeit ändern können.
- **Client-Server**: Client-Server ist ein Architekturmuster, das die Anwendung in zwei Komponenten unterteilt: Client und Server.
- **Peer-to-Peer**: Peer-to-Peer ist ein Architekturmuster, das die Anwendung in eine Reihe von gleichberechtigten Peers unterteilt.
- **Publish-Subscribe**: Publish-Subscribe ist ein Architekturmuster, das die Anwendung in eine Reihe von Publishern und Subscribers unterteilt.
- **Master-Slave**: Master-Slave ist ein Architekturmuster, das die Anwendung in eine Reihe von Master- und Slave-Komponenten unterteilt.
- **MapReduce**: MapReduce ist ein Architekturmuster, das die Anwendung in eine Reihe von Mapper- und Reducer-Komponenten unterteilt.
- **EDA**: Event-Driven Architecture ist ein Architekturmuster, das die Anwendung in eine Reihe von Event-Produzenten und Event-Konsumenten unterteilt.
- **CQRS**: Command Query Responsibility Segregation ist ein Architekturmuster, das die Anwendung in eine Reihe von Command- und Query-Komponenten unterteilt.
- **Event Sourcing**: Event Sourcing ist ein Architekturmuster, das die Anwendung in eine Reihe von Event-Produzenten und Event-Konsumenten unterteilt.