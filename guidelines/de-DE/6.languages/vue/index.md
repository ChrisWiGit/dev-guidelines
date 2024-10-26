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

## Vue-Expressions

Vue-Expression im HTML-Template sollen nur für einfachste Ausdrücke verwendet werden.
Komplexe oder längere Ausdrücke sollen in Methoden oder Computed Properties ausgelagert werden.

### Problem

Oft werden in Vue-Expressions in Direktiven wie `v-if`, `v-for`, `v-bind` oder `v-on` zuerst einfache Ausdrücke verwendet, die dann mit der Zeit und Anforderungen zu immer größere und komplexere Ausdrücke werden.
Dies führt zu unübersichtlichen, schwer testbaren und wartbaren Templates.
Zudem ist es oftmals nicht ersichtlich, was der Ausdruck genau bewirkt.

```html
<template>
  <div>
    <div v-if="user && user.name && user.name.length > 0">
    {{ user.name }}
    </div>
  </div>
```

### Lösung

Komplexe Ausdrücke sollen in Methoden oder Computed Properties ausgelagert werden, wenn sie aus mehr als einer Zeile bestehen oder mehr als eine einfache Operation enthalten.
Computed Properties sind hierbei vorzuziehen, wenn der Wert gecached werden soll.

```html
<template>
  <div>
    <div v-if="isUserNameValid">
    {{ user.name }}
    </div>
  </div>
</template> 
```

::: warning

Die zu berechnenden Terme innerhalb eines Computed Properties sollen nach den Regeln in diesem Guide definiert werden.

:::

## 

 2. Versuchen Klassen statt dynamische styles zu verwenden
  a. Klasse selected wird gesetzt und nicht über einen style ein selected css gesetzt
 3. Hat ein Element mehrere Klassen, die dynamisch gesetzt werden, kann dies in ein computed ausgelagert werden
  a. mainClasses, contentClasses, etc..
 4. v-if und v-show Bedingungen, als ersten an das Element schreiben
  a. Beim lesen wird schneller klar, warum das Element ggf. ausgeblendet ist
 5. Nicht in context bezoge Elemente in andere Komponenten umlagern
  a. Anzeige von Fehlermeldung, Anzeige von Tooltips etc..
 6. Keine Großen Kommentarblöcke in das HTML Template
  a. Schadet der Lesbarkeit
 7. displayValues die bei besonderen Werten anders gerendet werden, können in computed ausgelagert werden
  a. Das Komponent gibt dann die displayValu zurück
  b. Kann besser getestet werden
 8. Keine Werte aus Objekten nehmen
  a. Computed soll die objekt werte dann wieder zurück geben
   i. Nicht: v-for(data in myProps.User.userList)
 9. Fazit: 
  a. Die meisten Fehler passieren nazürlich nicht im Vue Template sondern in der Komponenten Logik, man sollte trotzdem drauf achten, wie das Template aufgebaut ist.
  b. Es sollte so egschrieben werden, dass ohne wenig $refs und html texte getestet werden kann
   i. Die Annahme besteht das HTML das schon richtig macht und aus einem computed prüfen, ob der Wert richtig ist
 

JS:
 1. Jede Listener beim zerstören der Vue Komponente auch wieder entfernen
 2. Auf null oder undefined Werte achten
  a. Die meisten Meldungen sind "cannot read properties of undenfied"
 3. Konstanten verwenden
