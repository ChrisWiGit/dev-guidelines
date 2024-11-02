# Checkliste für eine neues Projekt

## Projektstruktur

Die Struktur des Projekts hängt von der eingesetzten Architektur (z.B. Clean Architecture, MVC, MVVM, DDD) und der Programmiersprache und dem Framework ab, das verwendet wird.
Weitere Randbedingungen sind eingesetzte Tools, CI/CD-Pipeline, Testframeworks und Dokumentation.

Bei der Strukturierung des Projekts sollte darauf geachtet werden, dass die Struktur übersichtlich und nachvollziehbar ist.

Beispiel für eine Projektstruktur:

::: code-group

```plaintext [Webapp]
.
|── .workflow (für GitHub Actions)
|── docs (für Projektdokumentation)
├── src
│   ├── main
│   │   ├── java
│   │   │   └── com
│   │   │       └── company
│   │   │           └── myproject
│   │   │               ├── controllers
│   │   │               ├── models
│   │   │               ├── services
│   │   │               └── views
│   │   └── resources
│   │       ├── static
│   │       └── templates
│   └── test
│       └── java
│           └── com
│               └── company
│                   └── myproject
│                       ├── controllers
│                       ├── models
│                       ├── services
│                       └── views
|── client (für Frontend-Code)
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── pages
│   │   └── services
│   └── tests
|── public (für statische Dateien)
├── .gitignore
├── README.md (für Build- und Laufanweisungen)
├── LICENSE
├── .gitlab-ci.yml (für GitLab)
└── pom.xml (für Maven)
```

```plaintext [Vue, Node]
.
|── .github (für GitHub Actions)
|── docs (für Projektdokumentation)
|── public (für statische Dateien)
|── src
│   ├── assets
│   ├── components
│   ├── router
│   ├── store
│   ├── views
│   └── services
├── tests
├── .gitignore
├── README.md (für Build- und Laufanweisungen)
├── LICENSE
├── .gitlab-ci.yml (für GitLab)
└── package.json
```

:::

## Versionsverwaltung

Code-Änderungen sollten in einem Versionsverwaltungssystem wie Git verwaltet werden.
Webbasierte Git-Repository-Hosting-Dienste wie GitHub, GitLab oder Bitbucket bieten Funktionen wie Pull-Requests, Code-Reviews und Continuous Integration.

## Programmiersprache(n)

Programmiersprachen und Frameworks sollten sorgfältig ausgewählt werden, um die Anforderungen des Projekts zu erfüllen.

## Linter / Quality-Tools

Linter und Quality-Tools wie ESLint, SonarQube oder Checkstyle helfen dabei, Code-Qualität und -Konsistenz zu gewährleisten.
Sie sollten in die Entwicklungsumgebung sowie den CI/CD-Prozess integriert werden.

Commits sollten durch ein Linting-Tool überprüft werden, um sicherzustellen, dass der Code den vereinbarten Standards entspricht und nicht eingecheckt wird, wenn dies nicht der Fall ist.

## Testframework

Ein Testframework wie JUnit, NUnit, Jest o.Ä. sollte verwendet werden, um die Qualität des Codes zu gewährleisten.

## CI/CD

Eine Continuous Integration / Continuous Deployment (CI/CD)-Pipeline sollte eingerichtet werden, um automatisierte Tests, Builds und Bereitstellungen durchzuführen.
Test- und Produktionsumgebungen sollen aufgebaut und bereitgestellt werden, damit Entwickler darauf entwickeln sowie testen und Stakeholder den aktuellen Stand des Projekts überprüfen können.

## Dokumentation

Eine Projektdokumentation sollte erstellt werden, um Entwicklern und anderen Stakeholdern einen Überblick über das Projekt zu geben.

Diese umfasst folgenden Informationen (und mehr):

1. Projektbeschreibung
2. Installationsanweisungen
3. Verwendete Technologien
4. Architekturübersicht (oder verweist auf eine separate Architekturdokumentation)
5. Wichtige Informationen für Entwickler (z.B. Konventionen, Best Practices)

## Ticketsystem

Ein Ticketsystem wie Jira, Trello oder GitHub Issues sollte verwendet werden, um Aufgaben, Fehler und Anforderungen zu verfolgen.

## Sonstiges

Im agilen Umfeld ist oftmals notwendig einen Sprint 0 durchzuführen, um die oben genannten Punkte zu klären und zu definieren.

