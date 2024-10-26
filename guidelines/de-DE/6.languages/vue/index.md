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

## V3 Vue-Komponenten {#vue-komponenten}

Vue-Komponenten sollen einige Regeln folgen:

### V3 Einfachheit

Vue-Komponenten sollen so einfach wie möglich gehalten werden ([KISS-Prinzip](../../2.principles/principles.md#kiss)).
Auf diese Weise wird die Wartbarkeit, Lesbarkeit und Testbarkeit verbessert.

### V3 Aufgabenorientierung

Eine Vue-Komponente soll nur eine Aufgabe erfüllen ([Seperation of Concern](../../2.principles/principles.md#p1-solid-solid)).
Damit wird die Testbarkeit, Wartbarkeit und Wiederverwendbarkeit verbessert.

### V3 Wiederverwendbarkeit

Vue-Komponenten können erweitert werden, indem das Kompositions-Entwurfsmuster ([Composite](../../4.designpatterns/structural.md#composite)) verwendet wird.
Alternativ werden Vue-Komponenten durch Verschachtelung von Sub-Komponenten, von Slots, Prop-Drilling, durch das Verwenden von Mixins oder mit [Dependency Injection](../../4.designpatterns/creational.md#dependency-injection) erweitert.

### V3 Komplexe und Geschäfts-Logik auslagern

Komplexe Logik soll in Methoden, Computed Properties oder Services ausgelagert werden.
Generell soll Geschäftslogik nicht in Vue-Komponenten liegen, sondern in Services (Klassen), die durch Dependency Injection in die Komponenten injiziert werden.

### V3 Trennen von UI-Logik und Geschäfts-Logik

Methoden und Events in Vue-Komponenten sollen sich nur um die Logik der UI-Komponente kümmern.
Wenn Geschäftslogik in einer Methode benötigt wird, soll diese in einer Service-Klasse ausgelagert werden, so kann die Logik wiederverwendet, ersetzt oder getestet werden.

### V3 Kopplung reduzieren

Vue-Komponenten sollen so wenig wie möglich von anderen Komponenten abhängig sein.
Damit wird die Wiederverwendbarkeit und Testbarkeit verbessert.

### V3 Tests parallel zur Entwicklung

Tests sollen direkt für Vue-Komponenten erstellt werden, damit die Vue-Komponente parallel zur Entwicklung getestet wird und entsprechend für die Tests angepasst wird.

Komponenten, die ohne Tests entwickelt werden, neigen dazu komplex und kompliziert zu werden, denn das Entwickeln von Tests zwingt dazu, die Komponenten einfach und klar zu halten.

### V3 Keine direkten DOM-Zugriffe

Direkte DOM-Zugriffe sollen vermieden werden.
Vue bietet viele Möglichkeiten, um auf das DOM zuzugreifen, ohne direkt darauf zuzugreifen.
Direkte DOM-Zugriffe machen die Komponenten schwer testbar und wartbar.

## V4 Nur einfache Vue-Expressions {#nur-einfache-vue-expressions}

Vue-Expression im HTML-Template sollen nur für einfachste Ausdrücke verwendet werden.
Komplexe oder längere Ausdrücke sollen in Methoden oder Computed Properties ausgelagert werden.

### V4 Problem

Oft werden in Vue-Expressions in Direktiven wie `v-if`, `v-for`, `v-bind` oder `v-on` zuerst einfache Ausdrücke verwendet, die dann mit der Zeit und Anforderungen zu immer größere und komplexere Ausdrücke werden.
Dies führt zu unübersichtlichen, schwer testbaren und wartbaren Templates.
Zudem ist es oftmals nicht ersichtlich, was der Ausdruck genau bewirkt.

```html
<template>
  <div>
    <div v-if="user && user.name && user.name.length > 0">
    {{ user.name == null ? 'No Name' : user.name }}
    </div>
  </div>
```

### V4 Lösung

Komplexe Ausdrücke sollen in Methoden oder Computed Properties ausgelagert werden, wenn sie aus mehr als einer Zeile bestehen oder mehr als eine einfache Operation enthalten.
Computed Properties sind hierbei vorzuziehen, wenn der Wert gecached werden soll.

```html
<template>
  <div>
    <div v-if="isUserNameValid">
    {{ userNameOrNoName }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: 'Max'
      }
    }
  },
  computed: {
    isUserNameValid() {
      return this.user && this.user.name && this.user.name.length > 0
    },
    userNameOrNoName() {
      return this.user.name == null ? 'No Name' : this.user.name
    }
  }
}
```

::: warning

Die zu berechnenden Terme innerhalb eines Computed Properties sollen nach den Regeln in diesem Guide definiert werden.

:::

## V5 Verwenden von Klassen statt dynamischer Styles {#verwenden-von-klassen-statt-dynamischer-styles}

Dynamische Styles sollten durch CSS-Klassen mit `:class` ersetzt werden, statt direkt das Style-Attribut mit `:style` oder sogar `style`.

### V5 Problem

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

### V5 Lösung

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

## V6 Reihenfolgen der Direktiven in Vue-Elementen {#reihenfolgen-der-direktiven-in-vue-elementen}

Es soll eine bestimmte Reihenfolge der Direktiven in Vue-Elementen eingehalten werden.

1. `v-if` und `v-show` sollen an erster Stelle im Element verwendet werden.
2. `v-for` soll als nächstes verwendet werden.
3. `v-bind` oder `:` soll danach verwendet werden.
4. `v-on` oder `@` soll zuletzt verwendet werden.
5. `v-model` soll nach `v-bind` oder `:` verwendet werden.
6. `v-slot` soll nach `v-model` verwendet werden.
7. `v-html` soll nach `v-slot` verwendet werden.
8. `v-pre` soll als letztes verwendet werden.

## V7 Kommentare im HTML-Template {#kommentare-im-html-template}

Kommentare im HTML-Template sollen vermieden werden, insbesondere große Kommentarblöcke.

### V7 Problem

Es ist möglich, dass Kommentare im Produktivcode landen, wenn sie nicht entfernt werden.

### V7 Lösung

Kommentare sollen durch gut benannte Methoden oder Computed Properties ersetzt werden.

## V8 Vue-Props nicht verändern {#vue-props-nicht-veraendern}

Vue-Props sollen nicht verändert werden.

### V8 Problem

Wenn Vue-Props verändert werden, kann dies zu unerwartetem Verhalten führen.

```js
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  methods: {
    changeUser() {
      this.user.name = 'Max'
    }
  }
}
```

### V8 Lösung

Vue-Props sollen als read-only betrachtet werden.
Dies kanna auf verschiedene Weisen erreicht werden:

- Vue-Props generell nicht verändern.
- Vue-Props in lokale Daten kopieren und diese verändern.
- Vue-Props in Computed Properties verwenden, die angepasste oder veränderte Werte zurückgeben.
- Statt Schleifen können Deklarative Methoden aus `Array` wie `map`, `filter`, `reduce` verwendet werden, die keine Seiteneffekte haben.

```js
computed: {
  userName() {
    return this.user.name + '!'
  }
}
```

## V9 Keine direkten Objektzugriffe im Template {#keine-direkten-objektzugriffe-im-template}

Verwende keine direkten Objektzugriffe im Template, sondern lass Computed-Eigenschaften die gewünschten Werte zurückgeben, z. B. nicht `v-for(data in myProps.User.userList)`.

## V10 Watcher und Listener müssen entfernt werden {#watcher-und-listener-muessen-entfernt-werden}

Jeder Watcher und Listener muss entfernt werden, wenn die Vue-Komponente zerstört wird.

### V10 Problem

Wenn Watcher und Listener nicht entfernt werden, können unerwartete Seiteneffekte auftreten.
Dies können sein:

- Speicherlecks
- Unerwartetes Ausführen von Code, obwohl die Komponente nicht mehr existiert

### V10 Lösung

Watcher und Listener sollen in der `onUnmounted`-Hook entfernt werden.

```js
// irgendwo im Code

this.unwatch = watch(() => this.user.name, (newValue, oldValue) => {
  console.log('Name changed')
})
this.stopTimeout = setTimeout(() => {
  console.log('Timeout')
}, 1000)
this.stopInterval = setInterval(() => {
  console.log('Interval')
}, 1000)

const noop = () => {}

export default {
  data() {
    return {
      unwatch: noop,
      stopTimeout: null,
      stopInterval: null
    }
  },
  setup() {
    onUnmounted(() => {
      clearInterval(this.stopInterval)
      stopTimeout(this.stopTimeout)
      this.unwatch()
    })
  }
}

```

## V11 null, undefined Werte {#null-undefined-werte}

`null` oder `undefined` Werte sollen immer gepüft, abgefangen oder vermieden werden.

### V11 Problem

Viele Fehler treten auf, weil auf `null` oder `undefined` Werte zugegriffen wird, die zu einem `TypeError` führen.
Insbesondere der Zugriff innerhalb eines Vue-Templates auf `null` oder `undefined` Werte führt zu Fehlern, die schwer zu finden sind.

```js
export default {
  data() {
    return {
      user: null
    }
  }
}
```

```html
<template>
  <div>
    <div v-if="user.name">
    {{ user.name }}
    </div>
  </div>
</template>
```

### V11 Lösung

`null` oder `undefined` Werte sollen immer geprüft und abgefangen werden.

Folgende Möglichkeiten gibt es:

- `v-if` oder `v-show` verwenden, um zu prüfen, ob ein Wert `null` oder `undefined` ist.
- `||`-Operator verwenden, um einen Standardwert zu setzen.
- `??`-Operator verwenden, um einen Standardwert zu setzen, wenn es auch den Wert `0` oder `''` (leerer String) gibt.
- `Optional Chaining` verwenden, um auf verschachtelte Objekte zuzugreifen.
- `null` oder `undefined` Werte in Computed Properties prüfen und abfangen.
- Spezielle Objekte, die einen `Null Object Pattern` verwenden, um `null` oder `undefined` Werte zu vermeiden.

::: code-group

```html [Null Object Pattern]
<template>
  <div>
    <div v-if="user.name">
    {{ user.name }}
    </div>
  </div>
</template>
<script>
const NullUser = {
  name: 'No Name'
}

export default {
  data() {
    return {
      user: NullUser
    }
  }
}
</script>
```

:::

## V12 Inject/Provide verwenden {#inject-provide-verwenden}

Vue-Komponenten sollen `Inject` und `Provide` verwenden, um Abhängigkeiten zu injizieren.

### V12 Problem

Vue-Komponenten sind oft abhängig von anderen Komponenten oder Services.
Diese Abhängigkeiten sollen nicht direkt in den Komponenten erstellt werden, sondern durch `Inject` und `Provide` injiziert werden.

```js
export default {
  data() {
    return {
      userService: new UserService()
    }
  }
}
```

### V12 Lösung

Abhängigkeiten sollen durch `Inject` und `Provide` injiziert werden.
Dadurch wird die Wiederverwendbarkeit, Testbarkeit und Wartbarkeit verbessert.
Eine Komponente kann so einfach verändert werden, indem eine andere Abhängigkeit injiziert wird.

```js
export default {
  inject: ['userService']
}

// provide in Parent Component
provide() {
  return {
    userService: new UserService()
  }
}
```
