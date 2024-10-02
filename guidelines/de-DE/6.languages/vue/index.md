---
# https://vitepress.dev/reference/default-theme-home-page
layout: doc
outline: [2, 2]
customRulePrefix: V
customIgnoreTitlesForRules: [Einleitung]
---

# Richtlinien für JavaScript und TypeScript

## Einleitung {#einleitung}

Allen Kapiteln wurde eine eindeutige Nummerierung, der Richtliniennummer, hinzugefügt, um eine eindeutige Identifikation zu ermöglichen.
Jede Richtliniennummer besteht aus dem Buchstaben **V**(Vue) gefolgt von einer Nummer, die den Abschnitt identifiziert. Damit kann eine Regel eindeutig identifiziert werden, z.B. für ein Code-Review.

::: info
Dieses Dokument bezieht sich auf [Vue 3](https://vuejs.org/guide/introduction.html).

Alle Beispiele sind mit 2 Leerzeichen eingerückt, da dies in Markdown die beste Darstellung bietet.

:::

## V1 Allgemeine Regeln {#allgemeine-regeln}

Es gelten die [Allgemeinen Regeln für Sprachen](../general).

## V2 Abstraktionsschichten {#abstraktionsschichten}

Zugriffe auf unterliegende Schichten (Vergleich mit [GL3 Abstraktionsschichten](../general#abstraktionsschichten)) sollen in JavaScript vermieden werden.