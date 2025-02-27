---
# https://vitepress.dev/reference/default-theme-home-page
layout: doc
outline: [2, 2]
customRulePrefix: V
customIgnoreTitlesForRules: [Einleitung]
---

# Richtlinien für Vue

::: danger TODO:
Weitere Regeln einfügen.

Weiterhin sind die Beispiele auch noch nur für Vue 2 geeignet.
Composition-Api wird überhaupt nicht erwähnt.

:::

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

Vue-Komponenten sollen so einfach wie möglich gehalten werden ([KISS-Prinzip](../../2.principles/principles#kiss)).
Auf diese Weise wird die Wartbarkeit, Lesbarkeit und Testbarkeit verbessert.

### V3 Aufgabenorientierung

Eine Vue-Komponente soll nur eine Aufgabe erfüllen ([Seperation of Concern](../../2.principles/principles#p1-solid-solid)).
Damit wird
die Testbarkeit, Wartbarkeit und Wiederverwendbarkeit verbessert.

### V3 Wiederverwendbarkeit

Vue-Komponenten können erweitert werden, indem das Kompositions-Entwurfsmuster ([Composite](../../4.designpatterns/structural#composite)) verwendet wird.
Alternativ
werden Vue-Komponenten durch Verschachtelung von Sub-Komponenten, von Slots, Prop-Drilling, durch das Verwenden von Mixins oder mit [Dependency Injection](../../4.designpatterns/creational#dependency-injection) erweitert.

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

::: code-group

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

Kommentare im HTML-Template sollen vermieden werden, insbesondere große Kommentarblöcke ([Guter Code statt Kommentare](../general#selbsterklaerender-code-und-keine-kommentare))

### V7 Problem

Es ist möglich, dass Kommentare im Produktivcode landen, wenn sie nicht entfernt werden.

### V7 Lösung

Kommentare sollen durch gut benannte Methoden oder Computed Properties ersetzt werden.

## V8 Vue-Props nicht verändern {#vue-props-nicht-veraendern}

Vue-Props sollen nicht verändert werden.

### V8 Problem

Wenn Vue-Props verändert werden, kann dies zu unerwartetem Verhalten führen.

```javascript
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

```javascript
computed: {
  userName() {
    return this.user.name + '!'
  }
}
```

### V8 Weitere Informationen

- Vue 3
  - [Vue V-Model](https://vuejs.org/guide/components/v-model)
- Vue 2
  - [Vue V-Model](https://v2.vuejs.org/v2/guide/components.html#Using-v-model-on-Components)
  - [Vue Forms](https://v2.vuejs.org/v2/guide/forms)

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

::: warning Dependency Injection für `setTimeout` und `setInterval`
`setTimeout` und `setInterval` sollen mit `inject` als Dependency Injection injiziert werden.
Siehe dazu [Browserspezifische Funktionen](#browserspezifische-funktionen).
:::

```javascript
import { watch, onMounted, onUnmounted } from 'vue'

let watcher
let stopTimeout
let stopInterval

onMounted(() => {
  watcher = watch(() => userName, (newValue, oldValue) => {
    console.log('Name changed')
  })

  stopTimeout = setTimeout(() => {
    console.log('Timeout')
  }, 1000)

  stopInterval = setInterval(() => {
    console.log('Interval')
  }, 1000)
})

onUnmounted(() => {
  watcher()
  clearTimeout(stopTimeout)
  clearInterval(stopInterval)
})

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

```html
<template>
  <div>
    <div v-if="user.name">
    {{ user.name }}
    </div>
  </div>
</template>
<script setup>
import { ref, readonly, onMounted } from 'vue'

const NullUser = readonly(reactive({
  name: 'None'
}))

const user = ref(NullUser)

onMounted(() => {
  // default user
  user.value = NullUser
})
</script>
```

Das Beispiel zeigt, wie ein `Null Object Pattern` verwendet werden kann, um `null` oder `undefined` Werte zu vermeiden.
Dazu wird ein spezielles Objekt `NullUser` erstellt, das als Standardwert für `user` verwendet wird.
Das NullUser-Objekt ist ein `readonly`-Objekt, das nicht verändert werden kann und auch nicht mit *value* verändert werden kann.

## V12 Inject/Provide verwenden {#inject-provide-verwenden}

Vue-Komponenten sollen `Inject` und `Provide` verwenden, um Abhängigkeiten zu injizieren.
**Statt `import` von Abhängigkeiten in Komponenten sollen diese durch `Inject` und `Provide` injiziert werden, so dass im besten Fall kein `import` in der Komponente vorkommt.**

### V12 Problem

Vue-Komponenten sind oft abhängig von anderen Komponenten oder Services.
Diese Abhängigkeiten sollen nicht direkt in den Komponenten erstellt werden, sondern durch `Inject` und `Provide` injiziert werden.

```javascript
import { onMounted, onUnmounted } from 'vue'
import UserService from './UserService'
import { otherMethod } from './OtherService'

onMounted(() => {
  const userService = new UserService()

  otherMethod(userService)
})
```

### V12 Lösung

Abhängigkeiten sollen durch `Inject` und `Provide` injiziert werden.
Dadurch wird die Wiederverwendbarkeit, Testbarkeit und Wartbarkeit verbessert.
Eine Komponente kann so einfach verändert werden, indem eine andere Abhängigkeit injiziert wird.

```javascript
import { onMounted, inject } from 'vue'

const userService = inject('userService')
const otherMethod = inject('otherService')

onMounted(() => {
  otherMethod(userService)
})
```

Der Komponente wird durch `provide` die Abhängigkeit injiziert.

```js
import { provide, ref } from 'vue'

const userService = new UserService()

provide('userService', userService)
provide('otherService', otherMethod)

```

## V13 Browserspezifische Funktionen {#browserspezifische-funktionen}

Oft werden spezielle Funktionen verwendet, um den Browser zu steuren.
Dazu gehören:

- `setTimeout` und `setInterval`
- `scrollTo` und `scrollBy`
- `resize` und `scroll` und ähnliche Events

### V13 Problem

Diese Funktionen führen speziellen Code in der Laufzeitumgebung (Node, Browser) aus und können in Tests nicht oder nur schwer getestet werden.
Um Komponenten testbar zu machen, sollen diese Funktionen vermieden und Alternativen wie Reaktivität, Events und Dependency Injection verwendet werden.

Im Folgenden wird auf `setTimeout` und `setInterval` als Beispiel eingegangen.

### V13 setTimeout und setInterval {#settimeout-und-setinterval}

`setTimeout` und `setInterval` sollen in Vue-Komponenten vermieden werden.
Die Gründe sind:

1. **Schwierige Tests** Wenn Komponenten getestet werden, führen `setTimeout` und `setInterval` dazu, dass Tests schwierig zu schreiben und zu verstehen sind, weil Code asynchron ausgeführt wird.  
2. **Asynchronität** `setTimeout` und `setInterval` führen zu asynchronem Code, der schwer zu verstehen und zu warten ist.
Andere Komponenten, die eine solche Komponente verwenden, müssen wiederum asynchronen Code verwenden, um auf die asynchronen Timer zu reagieren.
3. **Lebensdauer** `setTimeout` und `setInterval` führen zu Problemen, wenn die Komponente zerstört wird, aber die Timer noch laufen.
So können bereits abgeschlossene Tests fehlschlagen, weil die Timer noch laufen.
Siehe [Watcher und Listener müssen entfernt werden](#watcher-und-listener-muessen-entfernt-werden).

### V13 Alternativen

Statt `setTimeout` soll die Reaktivität von Vue verwendet werden.

### V13 Dependecy Injection

Sollte ein Timer benötigt werden, weil beispielsweise eine verwendete Komponente dies bereits macht, muss der Timer durch Dependency Injection injiziert werden, um die Asynchronität zu vermeiden.

Vue 3 Composition API bietet die Möglichkeit, Timer zu injizieren.

```javascript
// Komponente
import { inject } from 'vue'

const setTimeoutDI = inject('setTimeout')

// Parent Komponente
import { provide } from 'vue'

provide('setTimeout', setTimeout)
```

Tests können dadurch von `setTimeout` und `setInterval` entkoppelt, und die Asynchronität vermieden werden.
Im folgenden Test wird `setTimeout` durch eine Funktion ersetzt, die sofort ausgeführt wird.
Die Komponente kann so getestet werden, ohne auf die asynchrone Ausführung von `setTimeout` zu warten.

```javascript

const setTimeoutDI = (callback) => callback()

it('should call setTimeout', () => {
  const setTimeout = jest.fn()
  const wrapper = mount(MyComponent, {
    global: {
      provide: {
        setTimeout: (callback) => callback()
      }
    }
  })
  // ... alle Methoden der Komponenten, die setTimeout verwenden, aufrufen
  // sind nicht mehr asynchron
  expect(wrapper.vm.method()).toHaveBeenCalled()
})
```

### V13 Globale Timeout und Intervall ersetzen für Tests

In Tests für Komponenten, die weitere Komponenten einbinden, die `setTimeout` und `setInterval` verwenden, jedoch nicht verändert werden können, können die globalen Funktionen ersetzt werden.

```javascript
describe('MyComponent', () => {
  let setTimeoutOriginal
  let setIntervalOriginal

  before(() => {
    setTimeoutOriginal = global.setTimeout
    setIntervalOriginal = global.setInterval
    global.setTimeout = (callback) => callback()
    global.setInterval = (callback) => callback()
  })

  after(() => {
    global.setTimeout = setTimeoutOriginal
    global.setInterval = setIntervalOriginal
  })

  it('should call setTimeout', () => {    
    // MyComponent verwendet intern eine weitere Komponente, die setTimeout verwendet
    const wrapper = mount(MyComponent)
    // ... alle Methoden der Komponenten, die setTimeout verwenden, aufrufen
    // sind nicht mehr asynchron
    expect(wrapper.vm.method()).toHaveBeenCalled()
  })
})
```
