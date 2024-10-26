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

## Verwenden von Klassen statt dynamischer Styles

Dynamische Styles sollten durch CSS-Klassen mit `:class` ersetzt werden, statt direkt das Style-Attribut mit `:style` oder sogar `style`.

### Problem

Wenn das Style-Attribut direkt gesetzt wird, ist es schwierig, die Styles zu ändern oder zu erweitern.
Zudem ist es schwer zu erkennen, welche Styles aufgrund welcher Bedingungen gesetzt werden und diese zu ändern.

```html
<template>
  <div>
    <div :style="{ color: isSelected ? 'red' : 'blue' }">
    {{ user.name }}
    </div>
  </div>
```

### Lösung

Klassen sollen verwendet werden, um dynamische Styles zu setzen.
Vue und darauf aufbauende UI-Frameworks wie Vuetify bieten viele Möglichkeiten, Klassen dynamisch zu setzen.

Vue unterstützt das Setzen von Klassen mit `v-bind:class` oder `:class`.

::: clode-group

```html [v-bind:class]
<template>
  <div>
    <div :class="{ selected: isSelected, 'text-red': isRed }">
    {{ user.name }}
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isSelected: true,
      isRed: false
    }
  }
}
</script>
<div class="selected">User Name</div>
```

```html [Objekt]
<template>
  <div>
    <div :class="mainClasses">
    {{ user.name }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSelected: true,
      isRed: false
    }
  },
  computed: {
    mainClasses() {
      return {
        selected: this.isSelected,
        'text-red': this.isRed
      }
    }
  }
}
</script>
<div class="selected">User Name</div>
```

```html [Array]
<template>
  <div>
    <div :class="[isSelected, isRed]">
    {{ user.name }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSelected: 'selected',
      isRed: 'text-red'
    }
  }
}

<div class="selected text-red">User Name</div>
```

:::

## Reihenfolgen der Direktiven in Vue-Elementen

Es soll eine bestimmte Reihenfolge der Direktiven in Vue-Elementen eingehalten werden.

1. `v-if` und `v-show` sollen an erster Stelle im Element verwendet werden.
2. `v-for` soll als nächstes verwendet werden.
3. `v-bind` oder `:` soll danach verwendet werden.
4. `v-on` oder `@` soll zuletzt verwendet werden.
5. `v-model` soll nach `v-bind` oder `:` verwendet werden.
6. `v-slot` soll nach `v-model` verwendet werden.
7. `v-html` soll nach `v-slot` verwendet werden.
8. `v-pre` soll als letztes verwendet werden.

## Kommentare im HTML-Template

Kommentare im HTML-Template sollen vermieden werden, insbesondere große Kommentarblöcke.

Es ist möglich, dass Kommentare im Produktivcode landen, wenn sie nicht entfernt werden.

<!-- ## Kontextunabhängige Elemente in eigene Komponenten auslagern

Nicht kontextbezogene Elemente wie Fehlermeldungen oder Tooltips sollten in eigene Komponenten ausgelagert werden. -->

## Keine großen Kommentarblöcke im HTML-Template

Große Kommentarblöcke beeinträchtigen die Lesbarkeit und sollten vermieden werden.

## Besondere Anzeige-Werte in Computed-Eigenschaften definieren

Display-Werte, die abhängig von bestimmten Werten variieren, sollten in Computed-Eigenschaften ausgelagert werden – das verbessert die Testbarkeit.

## Keine direkten Objektzugriffe im Template

Verwende keine direkten Objektzugriffe im Template, sondern lass Computed-Eigenschaften die gewünschten Werte zurückgeben, z. B. nicht `v-for(data in myProps.User.userList)`.

## Fazit: Sorgfalt beim Template-Aufbau

Fehler treten oft in der Logik auf, aber auch das Template sollte sauber aufgebaut sein – Tests sollten ohne `$refs` oder HTML-basierte Texte möglich sein, indem Computed-Eigenschaften geprüft werden.

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
