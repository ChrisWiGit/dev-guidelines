---
# https://vitepress.dev/reference/default-theme-home-page
layout: doc
outline: [2, 2]
customRulePrefix: JS
customIgnoreTitlesForRules: [Einleitung]
---

# Richtlinien für JavaScript und TypeScript

## Einleitung {#einleitung}

Allen Kapiteln wurde eine eindeutige Nummerierung, der Richtliniennummer, hinzugefügt, um eine eindeutige Identifikation zu ermöglichen.
Jede Richtliniennummer besteht aus dem Buchstaben **JS**(JavaScript oder Typescript) gefolgt von einer Nummer, die den Abschnitt identifiziert. Damit kann eine Regel eindeutig identifiziert werden, z.B. für ein Code-Review.

::: info
Wo notwendig, wird auf die Unterschiede zwischen JavaScript und TypeScript hingewiesen.

Alle Beispiele sind mit 2 Leerzeichen eingerückt, da dies in Markdown die beste Darstellung bietet.
:::

::: info Typescript
Falls es erforderlich ist, wird in Zukunft Typescript in ein eigenes Regeldokument aufgeteilt.
:::

## JS1 Allgemeine Regeln {#allgemeine-regeln}

Es gelten die [Allgemeinen Regeln für Sprachen](../general).

## JS2 Abstraktionsschichten {#abstraktionsschichten}

Zugriffe auf unterliegende Schichten (Vergleich mit [GL3 Abstraktionsschichten](../general#abstraktionsschichten)) sollen in JavaScript vermieden werden.

### JS2 Problem

Der direkte Zugriff auf unterliegende Schichten wie Datenbanken, APIs oder andere externe Dienste kann zu einer starken Kopplung und Abhängigkeit führen.
Dies ist insbesondere problematisch, wenn der Zugriff direkt in den Anwendungscode (Business-Logik) eingebettet ist und somit eine Mischung von unterschiedlichen Code-Schichten entsteht.

```javascript
function onClick() {
    try {
      const connection = this.db.connect();
      const data = connection.query('SELECT * FROM business');

      this.api.sendData(data, { options: "abc;charset=utf-8" });

      document.getElementById('myDiv').innerHTML = data;
    } catch (e) {
      console.error(e);      
    }
}
```

### JS2 Lösung

- Um die Abhängigkeit von unterliegenden Schichten zu reduzieren, sollen Zugriffe auf diese Schichten in separate Klassen oder Module ausgelagert werden.
- Dependency Injection (DI) soll verwendet werden, um die Abhängigkeiten zwischen den Schichten zu verwalten und den Zugriff auf unterliegende Schichten zu ermöglichen.
- Die Business-Logik soll von der Implementierungsdetails getrennt werden, um eine klare Trennung der Verantwortlichkeiten zu gewährleisten.
- Fehlerbehandlung soll in der UI-Schicht über einen allgemeinen Fehlermechanismus erfolgen, um die Business-Logik nicht mit Fehlerbehandlung zu belasten.
Nur behandelbare Fehler sollen selbst behandelt werden.
- Der Einsatz eines Modellansatzes wie MVC, MVP oder MVVM kann helfen, die Business-Logik von der UI zu trennen.
- Architekturansätze wie Domain-Driven Design (DDD), Model-Driver Architecture (MDA) oder Clean Architecture können ebenfalls helfen, die Abhängigkeiten zu reduzieren und die Business-Logik zu isolieren.

```javascript

function onClick() {
  const data = this.dbDi.getBusinessData();
  
  this.apiDi.sendDataToFoo(data);

  this.uiDi.updateBusinessData(data);
}

// Error handling in UI durch Framework aufgerufen,
// wenn in onClick ein Fehler auftritt
globalErrorHandler = (e) => {
  // Darstellen des Fehlers (so oder ähnlich)
  this.uiDi.showError(e);
}

```

### JS2 Vorteile

- Simple und klare Struktur in den Methoden/Funktionen
- Reduzierung der Abhängigkeiten zwischen den Schichten
- Klare Trennung der Verantwortlichkeiten
- Verbesserte Wartbarkeit und Erweiterbarkeit des Codes
- Verbesserte Testbarkeit durch die Möglichkeit, die unterliegenden Schichten zu mocken

### JS2 Nachteile

- Erhöhter Aufwand durch die Notwendigkeit, zusätzliche Klassen oder Module zu erstellen
- Erhöhter Aufwand durch die Notwendigkeit, Dependency Injection zu verwenden
- Überblick über die Abhängigkeiten und Struktur des Codes kann schwieriger sein
- Verhalten zur Laufzeit ist nicht direkt aus dem Code ersichtlich

### JS2 Ausnahmen

- In *Prototypen* kann der direkte Zugriff auf unterliegende Schichten akzeptabel sein.
Der Prototyp muss jedoch nachträglich dahingehend refaktorisiert werden, dass die Zugriffe auf unterliegende Schichten in separate Klassen oder Module ausgelagert werden.
- In *kleinen Anwendungen* oder Tools kann der direkte Zugriff auf unterliegende Schichten akzeptabel sein.

## JS3 Trennung von operationalem und integrativem Code {#trennung-von-operationalem-und-integrativem-code}

Nach dem **Integration Operation Segregation Principle** soll Code entweder Operations-Logik oder Integration-Logik enthalten, aber nicht beides.

:::info Operation vs. Integration

Eine **Operations-Logik** enthält Bedingungen, Schleifen, etc., die die Geschäftsregeln implementieren.
Auch API-Aufrufe oder andere I/O-Operationen gehören zur Operations-Logik.

Eine **Integration-Logik** enthält Code, der andere Code verwendet, um die Operations-Logik zu implementieren.

Eine **Hybrid-Logik** enthält sowohl Operations- als auch Integrationslogik.

:::

### JS3 Problem

Funktionale Abhängigkeiten sin ein Symptom von sich schlecht änderbaren Codes.
Durch die Vermischung von Operations- und Integrationslogik wird der Code unübersichtlich und schwer verständlich und lässt sich nur schwer automatisiert testen oder refaktorisieren.

Wenn in Methoden oder Funktionen verhaltenserzeugende Anweisungen (if, while, for, etc.) mit Aufrufen anderer Methoden derselben Codebasis gemischt sind, ist nicht mehr klar erkennbar, wie das Gesamtverhalten entsteht, da viel zu viel in der Methode oder Funktion passiert.

Solche Methoden tendieren oftmals dazu unbegrenzt zu wachsen.

Im folgenden Code besteht keine klare Trennung zwischen Operations- und Integration-Logik.
Es wurde einfach die Lösung "herunter-programmiert" und die Logik in einer Methode zusammengefasst.
Als Beispiel ist eine **kleine** Funktion gegeben, die in der Praxis oftmals deutlich größer und komplexer ist.

```javascript
function onClick(input) {
  const value = document.getElementById('myInput').value;

  if (!input) {
    return;
  }
  
  const connection = this.db.connect();
  let data = connection.query('SELECT * FROM Business');

  if (data.foo == 0) {
    data = connection.query('SELECT * FROM FooFoo');
  }

  this.api.sendData(data, { options: "abc;charset=utf-8" });

  document.getElementById('myDiv').innerHTML = data;
}

```

### JS3 Lösung

Die Trennung kann durch die Verwendung von mehreren Zwischenmethoden erreicht werden, die die Operations- und Integrationslogik trennen.

:::info Guard Clause

Strenggenommen ist die Guard Clause eine Operations-Logik, welche die Methode nach IOSP auch zu einer Operations-Logik, statt einer Integration-Logik macht.

:::

:::warning Folge dem Prinzip nicht blind

Beachte: Es steht die Lesbarkeit und Verständlichkeit des Codes im Vordergrund!

Wie stark eine Trennung durchgeführt werden soll, wird durch die Größe und Komplexität der Methode bestimmt.

Konzentriere dich daher darauf, die Methoden und Funktionen soweit zu trennen, dass sie leicht verständlich und testbar sind.

Es ist nicht erforderlich, dass jede Methode entweder nur Operations- oder Integrationslogik enthält, nur damit das Prinzip zu 100% eingehalten wird.

:::

```javascript

function onClick(input) {
  // Integration-Logik
  // und Trennung von UI und Business-Logik
  const value = document.getElementById('myInput').value;

  this.processData(input);
}

// Hybrid-Logik, wenn guard clause mitgezählt wird
function processData(input) {
  if (!input) {
    // Guard clause, macht die Methode zu einer Operations-Logik
    return;
  }

  // Integration-Logik
  const data = getDataFromBusinessOrFooTable();

  this.sendData(data);
  this.setElementData(data);
}

function getDataFromBusinessTable(connection) {
  // Operation-Logik, da Datenbankabfrage
  return connection.query('SELECT * FROM Business');
}

function getDataFromFooTable(connection) {
  // Operation-Logik, da Datenbankabfrage
  return connection.query('SELECT * FROM FooFoo');
}

// Hybrid-Logik könnte weiter aufgeteilt werden
// aber die Trennung von Operations- und Integration-Logik ist bereits deutlich
function getDataFromBusinessOrFooTable() {
  const connection = this.db.connect();
  const data = this.getDataFromBusinessTable(connection);

  // Beispiel-If-Abfrage
  if (data.foo == 0) {
    return this.getDataFromFooTable(connection);
  }

  return data;
}

function sendData(data) {
  // Operation-Logik, da API-Aufruf
  this.api.sendData(data, { options: "abc;charset=utf-8" });
}

function setElementData(data) {
  // Operation-Logik, da UI-Aufruf
  document.getElementById('myDiv').innerHTML = data;
}
```

:::warning Code-Größe

Im Allgemeinen führt IOSP zu kürzeren Methoden, da die Operations- und Integrationslogik getrennt sind.
Jedoch wird insgesamt mehr Code geschrieben, da die Trennung zu mehr Methoden führt, welche neue Zeilen hinzufügen.

:::

### JS3 Vorteile

- Durch die strikte Trennung von Operations- und Integration-Logik wird der Code übersichtlicher und leichter verständlich.
- Methoden/Funktionen sind einzeln einfacher zu lesen, da sie kurz sind.
- Methoden/Funktionen sind einzeln einfacher zu testen.
- Korrektheit von Integrationen lässt sich leicht durch Augenscheinnahme prüfen.
- Es gibt oftmals eine **Haupteinstiegs**-Methode, die die Integration-Logik koordiniert und die Operations-Logik in separaten Methoden aufruft.
- Integrations-Methoden/Funktionen lassen sich leicht erweitern, indem neue Methoden hinzugefügt werden, um neue Anforderungen zu erfüllen.

### JS3 Nachteile

- Die Trennung von Operations- und Integration-Logik kann zu mehr Code führen, da mehr Methoden/Funktionen erstellt werden müssen.

### JS3 Ausnahmen

- In kleinen Anwendungen oder Prototypen kann die Trennung von Operations- und Integration-Logik übertrieben sein.
- Die strikte Trennung kann in manchen Fällen unnötigen Overhead verursachen (siehe Trennung von `getOrCreateUser` und `getUser`).

```javascript
class UserService {
  constructor(database) {
    this.database = database;
  }

  // Operation: Benutzer suchen (nur Leseoperation)
  findUser(id) {
    return this.database.find(user => user.id === id);
  }

  // Operation: Benutzer erstellen (nur Schreiboperation)
  createUser(id) {
    const newUser = { id, name: 'New User' };
    this.database.push(newUser);
    return newUser;
  }

  // Operation: Benutzer holen oder erstellen (Logik zur Entscheidung, ob ein Benutzer erstellt werden muss)
  getOrCreateUser(id) {
    const user = this.findUser(id);
    return user ? user : this.createUser(id);
  }

  // Integration: Koordiniert nur den Aufruf von getOrCreateUser
  getUser(id) {
    return this.getOrCreateUser(id);
  }

  // statdessen könnte auch bei dieser einfachen Methode auch ein Hybrid aus Operations- und Integration-Logik verwendet werden
  getUserAlternative(id) {
    let user = this.findUser(id);
    if (!user) {
      user = this.createUser(id);
    }
    return user;
  }
}
```

## JS4 Anwendung von ES6 Features {#anwendung-von-es6-features}

Mit ES6 stehen viele neue Möglichkeiten zur Verfügung, um den Code zu verbessern.
Beispielsweise könnten Pfeilfunktionen, Template-Strings, Default-Parameter, Rest- und Spread-Operator, Destructuring-Zuweisungen, `const` und `let` anstelle von `var` für eine bessere Kontrolle des Scopings, Klassen, Module, Promises und Iteratoren verwendet werden, um den Code kürzer und leichter lesbar zu machen.

::: danger
`var` darf nicht verwendet werden.
Stattdessen sollen `const` und `let` verwendet werden, um die Sichtbarkeit von Variablen zu steuern.
:::

## JS5 Benennung von Variablen, Funktionen, Klassen und mehr {#benennung-von-variablen-funktionen-klassen-und-mehr}

- Variablen sind im **camelCase** <img src="/camel.png" width="24" height="24" alt="camelCase" style="display: inline;" /> zu benennen: `myVariable`.
- Funktionen oder Methoden sind im **camelCase** zu benennen `myFunction()` oder `myMethod()`.
- Klassen sind im **PascalCase** zu benennen `MyClass`.
- Globale Konstanten sind in **UPPER_SNAKE_CASE** zu benennen `MY_CONSTANT`.
- Statische Klassen-Konstanten sind in **UPPER_SNAKE_CASE** zu benennen `MY_CLASS_CONSTANT`.
- Lokale Konstanten können in **camelCase** sein `myConstant` oder in **UPPER_SNAKE_CASE** `MY_CONSTANT`, wenn sie z.B. einen einzigen Wert definieren.
- Parameter sind im **camelCase** zu benennen `myParameter`.
- Exceptions sind in **PascalCase** zu benennen `MyException` und enden mit `Exception`.
- Typen (TypeScript) sind in **PascalCase** zu benennen `MyType`.
- Interfaces (TypeScript) sind in **PascalCase** zu benennen `MyInterface`.
- Symbole sind in **UPPER_SNAKE_CASE** zu benennen `MY_SYMBOL`.
- Enumerations sind in **PascalCase** zu benennen `MyEnum`.
- Objekte sind wie Variablen zu benennen `myObject`.

```javascript
const THE_ANSWER = 42;

function myFunction(myParameter) {
    const myConstant = THE_ANSWER;
    const myObject = { key: "value" };
    const THE_SYMBOL = Symbol("mySymbol");

    if (myObject.key === myConstant) {
        throw new MyException("Error");
    }
}

class MyClass {
    static MY_CLASS_CONSTANT = 42;
    static MyEnum = { RED: Symbol("red") };

    myMethod() {
        const myEnum = MyClass.MyEnum.VALUE;
    }
}

```

::: details Schein-Konstanten

Objekte oder Array-Inhalte sind immer veränderbar, auch wenn sie mit `const` deklariert werden.
Nur die Zuweisung der Variable ist konstant, nicht der Wert.

Mit `Object.freeze()` können Objekte **und** Arrays tatsächlich konstant gemacht werden.

```javascript
"use strict"; // TypeError nur im strict mode
const myArray = Object.freeze([1, 2, 3]);

myArray[0] = 4; // TypeError: Cannot assign to read only property '0' of object '[object Array]'
```

:::

## JS6 Reihenfolge der Deklarationen {#reihenfolge-der-deklarationen}

Die Reihenfolge der Deklarationen soll konsistent sein und die Lesbarkeit des Codes verbessern.

### JS6 Reihenfolge in Funktionen und Methoden

Die Deklaration von Variablen und Konstanten innerhalb von Scope-Blöcken soll in folgender Reihenfolge erfolgen:

1. Umschließender Funktions- oder Block-Scope
   1. Konstanten
   2. Variablen
   3. Funktionen

```javascript
function myFunction() {
    const myConstant = 42;
    let myVariable = 42;

    function myInnerFunction() {
        const innerConstant = 42;
        let innerVariable = 42;

        // Code
    }
}
```

### JS6 Reihenfolge in Klassen

In Klassen sollen die Deklarationen in folgender Reihenfolge erfolgen:

1. Statische Klassen-Konstanten
2. Statische Klassen-Methoden
3. Klassen-Konstanten
4. Klassen-Attribute
5. Konstruktoren
6. Klassen-Methoden
7. Getter und Setter (vermeiden, siehe [Tell, don't ask](../../2.principles/principles#tda-ie))
8. Methoden für `Symbol.iterator` und `Symbol.asyncIterator`
9. Methoden für `toString`, `valueOf`, `toJSON` und `toPrimitive`
10. Methoden für `equals`, `hashCode`, `compareTo` und `compare`
11. Methoden für `clone`, `copy`, `deepCopy` und `deepClone`

```javascript

class MyClass {
    static MY_CLASS_CONSTANT = 42;

    static myStaticMethod() {
        // ...
    }

    MY_CLASS_CONSTANT = 42;
    myAttribute = 42;

    constructor() {
        // ...
    }

    myMethod() {
        // ...
    }

    get myGetter() {
        // ...
    }

    set mySetter(value) {
        // ...
    }

    [Symbol.iterator]() {
        // ...
    }

    toString() {
        // ...
    }

    equals(other) {
        // ...
    }

    clone() {
        // ...
    }
}
```

### JS6 Ausnahmen

- Zwischenberechnungen für Konstanten oder Variablen können vor der Verwendung deklariert werden, wenn es nicht anders geht.
- In Fällen, in der eine besser Verständlichkeit des Codes durch eine andere Reihenfolge erreicht wird, kann von der oben genannten Reihenfolge abgewichen werden.

## JS7 Verwendung von `const` und `let` anstelle von `var` {#verwendung-von-const-und-let-anstelle-von-var}

`var` soll nicht verwendet werden, da es zu unerwartetem Verhalten führen kann.

### JS7 Problem

`var` hat eine Funktionsscope und keine Blockscope, was zu unerwartetem Verhalten führen kann.

::: info
`Functionscope` bedeutet, dass die Variable innerhalb der gesamten Funktion von Anfang an sichtbar ist, auch wenn sie erst später deklariert wird (sogenanntes Hoisting).

`Blockscope` bedeutet, dass die Variable nur innerhalb des Blocks sichtbar ist, in dem sie deklariert wurde.
Blöcke werden mit geschweiften Klammern `{}` definiert, z.B. in If-Statements, Schleifen oder Funktionen.
:::

### JS7 Lösung

`const` und `let` haben einen Blockscope und sollen anstelle von `var` verwendet werden.

Im folgenden Beispiel wird `myVariable` nur innerhalb des Blocks sichtbar sein:

```javascript
const myConstant = 42;
{
    let myVariable = 42;
    //...
}
// myVariable ist hier nicht sichtbar
// myConstant ist hier sichtbar
```

## JS8 Verwendung von `const` für alle Variablen und Kennzeichnung von Nicht-Konstanten {#verwendung-von-const-fuer-alle-variablen-und-kennzeichnung-von-nicht-konstanten}

Variablen enthalten für gewöhnlich Werte, die sich während der Laufzeit des Programms nicht ändern.
Eine erneute Zuweisung von Werten zu Variablen kann zu unerwartetem Verhalten führen, weil sich der Wert plötzlich ändert oder versehentlich undefiniert wird.

- Variablen sollen daher mit `const` deklariert werden, um sicherzustellen, dass sie nicht versehentlich geändert werden.
- Eine erneute Zuweisung von Werten zu Variablen soll vermieden werden, um unerwartetes Verhalten zu vermeiden.
Stattdessen sollen neue Variablen deklariert werden, wenn ein neuer Wert benötigt wird.
- Ist eine erneute Zuweisung von Werten notwendig, soll ein Kommentar mit dem Inhalt `/*nonconst*/` hinzugefügt werden, um darauf hinzuweisen und dies auch einem Code-Review zu signalisieren, dass der Entwickler sich der Änderung bewusst ist.

### JS8 Problem

Die Verwendung von `const` sorgt dafür, dass Variablen nicht versehentlich geändert werden. Ohne die Verwendung von `const` besteht die Gefahr, dass Variablen unbeabsichtigt überschrieben werden.
Dies kann dazu führen, dass sich der Wert von Variablen, Attributen oder Parametern unerwartet ändert und dadurch unerwünschte Nebeneffekte auftreten können. Dies passiert beispielsweise dann, wenn die Variable, das Attribut oder der Parameter in einem anderen Teil des Codes nachträglich und von einer anderen Person unerwartet geändert wird.
Dadurch wird die Lesbarkeit und Nachvollziehbarkeit des Codes erschwert.

```javascript
let name = "John";
let age = 30;

// ...

name = "Jane"; // Unbeabsichtigte Änderung der Variable

```

### JS8 Lösung

Um unbeabsichtigtes Ändern von Variablen zu vermeiden, sollen alle Variablen mit `const` deklariert werden.
In Fällen, in denen die Verwendung von `const` nicht möglich ist (z. B. bei Variablen, die sich ändern müssen), soll ein Kommentar mit dem Inhalt "nonconst" hinzugefügt werden, um darauf hinzuweisen.

```javascript
const name = "John";
const age = 30;

// ...

/*nonconst*/ let count = 0;

// oder
/*nonconst*/
let count = 0;

count++;

```

### JS8 Vorteile

- Vermeidung unbeabsichtigter Änderungen von Variablen
- Klarheit in Bezug auf die Veränderlichkeit von Variablen
- Verbesserte Code-Qualität und Verständlichkeit

### JS8 Nachteile

Es gibt Situationen, in denen die Verwendung von `const` nicht möglich oder sinnvoll ist, z. B. bei Variablen, die sich ändern müssen oder in komplexen Legacy-Code.
In solchen Fällen kann die Kennzeichnung mit einem Kommentar "//nonconst" helfen, auf die Ausnahme hinzuweisen.

### JS8 Weiterführende Literatur/Links

- [MDN Web Docs: const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)
- [JavaScript: const, let, or var?](https://www.freecodecamp.org/news/var-let-and-const-whats-the-difference/)

## JS9 Einsatz von Linter und Formatter {#einsatz-von-linter-und-formatter}

Tools wie ESLint und Prettier sollen verwendet werden, um sicherzustellen, dass der Code konsistent und weniger fehleranfällig ist.

Mit dem Einsatz von [JSDoc](.#jsdoc-kommentare-fuer-javascript-methoden-funktionen-variablen-objekte-und-typen) können auch Typen geprüft werden.

## JS10 Optionaler Operator ?. / Optional Chaining verwenden {#optionaler-operator-optional-chaining-verwenden}

Der optionale Operator `?.` oder Optional Chaining soll für den Zugriff auf Unterschlüssel verwendet werde, ohne explizit auf `null` oder `undefined` prüfen zu müssen.

:::info Alternative

Alternativ kann auch das [JS15 Verwendung von `Optional` in JavaScript-Funktionen](.#js15-verwendung-von-optional-in-javascript-funktionen). verwendet werden.

:::

### JS10 Probleme

In JavaScript besteht oft die Notwendigkeit, auf verschachtelte Schlüssel in Objekten oder Arrays zuzugreifen.
Dabei kann es vorkommen, dass einige der Zwischenschlüssel nicht existieren oder dass Methoden undefiniert sein können.
In solchen Fällen wird häufig eine Reihe von `if`-Bedingungen verwendet, um sicherzustellen, dass jeder Schlüssel existiert, bevor auf ihn zugegriffen wird. Dieser Ansatz führt jedoch zu redundantem Code und macht den Code schwerer lesbar und fehleranfällig.

```javascript
// Pfad zur Methode könnte nicht existieren
if (myObject && myObject.myKey) {
    myObject.myKey.myMethod();
}

// Falls eine Methode undefiniert sein könnte
if (myObject && myObject.myKey && myObject.myKey.myMethod) {
    myObject.myKey.myMethod();
}

// Prüfung, ob a,b,e und e[0] sowie f nicht null oder undefined sind.
if (a && a.b && a.b.e && a.b.e[0] && a.b.e[0].f != null) {
    // Code ausführen
}
```

### JS10 Lösung

Um den Code übersichtlicher und robuster zu gestalten, kann der optionale Operator `?.` (Optional Chaining) verwendet werden. Dieser Operator prüft automatisch, ob der vorherige Schlüssel existiert, und greift nur dann auf den nächsten Schlüssel zu, wenn er vorhanden ist.
soll ein Schlüssel nicht existieren, wird keine weitere Aktion ausgeführt und das Ergebnis ist `undefined`.

```javascript
// Pfad zur Methode könnte nicht existieren
myObject.myKey?.myMethod();
// Rückgabe ist `undefined`, falls der Pfad nicht existiert

// Falls eine Methode undefiniert sein könnte
anotherObject.myMethod?.();
// Rückgabe ist `undefined`, falls der Pfad oder die Methode nicht existieren

// Feldzugriff oder Array
anotherObject?.["field"];

if (myNullValue == null) {
    // Code ausführen
}

if (myObject?.myKey?.myMethod()) {
    // Code ausführen
}

// Prüfung, ob a,b,e und e[0] sowie f nicht null oder undefined sind.
a.b.e[0]?.f != null;

// Wenn einer der Schlüssel null oder undefined ist, ist das Ergebnis ebenfalls undefined.
console.log('Defined', a.b.e[0]?.f == null);
```

### JS10 Vorteile

- Vereinfachung des Codes durch Reduzierung von redundanten `if`-Bedingungen
- Lesbarkeit und Wartbarkeit des Codes werden verbessert
- Verringertes Risiko von Fehlern durch Vergessen oder falsche Anwendung von `null`- oder `undefined`-Prüfungen

### JS10 Nachteile

- Keine direkte Unterstützung in älteren JavaScript-Versionen (vor ECMAScript 2020)
- Verwendung des optionalen Operators kann dazu führen, dass Fehler später erkannt werden, da `undefined`-Werte nicht sofort als solche erkannt werden
- Einsatz der Operator nach dem Gießkannenprinzip kann dazu führen, dass andere Entwickler davon ausgehen, dass die Werte nicht immer vorhanden sind und dadurch für Erweiterungen weitere Prüfungen einbauen, die nicht notwendig wären.

:::details Gießkannenprinzip

Das Gießkannenprinzip bezeichnet die Verwendung von optionalen Operatoren an vielen Stellen im Code, auch wenn sie nicht unbedingt notwendig sind.

```javascript
const obj = { defined: { value: 42 } };

// Gießkannenprinzip, obj kann nie null oder undefined sein, genauso obj.defined
const value = obj?.defined?.value;
```

:::

### JS10 Weiterführende Informationen

Weitere Informationen zur Verwendung des optionalen Operators `?.` oder Optional Chaining in JavaScript findest du in der [Mozilla Developer Network (MDN) Dokumentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining). Dort werden die Funktionsweise und die verschiedenen Anwendungsfälle ausführlich erläutert.

## JS11 Auf null und undefined prüfen {#auf-null-und-undefined-pruefen}

Bei der Prüfung auf `null` oder `undefined` soll immer `value == null` verwendet werden, um sicherzustellen, dass nur `null` oder `undefined` erkannt werden.

::: warning Anwendungseinsatz und Alternativen

Diese Regel gilt nur für bereits bestehenden Methoden und Funktionen, die `null` oder `undefined` zurückgeben können.

[Optional](.#verwendung-von-optional-in-javascript-funktionen) soll für neue Methoden/Funktionen verwendet werden, um diese spezielle Fälle (`null` etc.) zu repräsentieren.

Soll ein neues Klassen- oder Objektmodell erstellt werden, sollen direkt [spezielle Objekte](.#verwende-spezielle-objekte-statt-spezielle-werte) verwendet werden.

:::

### JS11 Problem

Bei der Überprüfung auf `null` oder `undefined` ist es wichtig, die korrekte Überprüfung durchzuführen, da andernfalls unerwartet auch Werte wie 0, "", oder false fälschlicherweise als falsy-Werte erkannt werden können.

```javascript
if (!myObject) {
    //myObject === null oder
    //myObject === undefined oder
    //myObject === 0 oder
    //myObject === "" oder
    //myObject === false
}

if (myObject === null || myObject === undefined || typeof myObject === 'undefined') {
    // myObject === null oder
    // myObject === undefined
}
```

### JS11 Lösung

Um sicherzustellen, dass **nur** `null` oder `undefined` erkannt werden und andere falsy-Werte ausgeschlossen werden, kann die folgende Überprüfung verwendet werden:

```javascript
if (myObject == null) {
    //myObject === null oder
    //myObject === undefined
}
```

Die Verwendung von zwei Gleichheitszeichen `==` anstelle von drei `===` ist hierbei wichtig, da so `undefined` und `null` erkannten werden.

### JS11 Vorteile

- Korrekte Überprüfung auf `null` oder `undefined`
- Vermeidung von unerwarteten Fehlern durch falsche Erkennung von falsy-Werten

### JS11 Nachteile

- Werte wie NaN werden nicht erkannt
- ESLint muss entsprechend konfiguriert werden, um die Verwendung von `==` bei null Vergleich zu erlauben. Dies ist möglich, indem die Regel `eqeqeq` auf [smart](https://eslint.org/docs/latest/rules/eqeqeq#smart) umgestellt wird.

## JS12 Object destructuring / Object Eigenschaften bekommen {#object-destructuring-object-eigenschaften-bekommen}

Beim Object Destructuring werden die Eigenschaften eines Objekts in einzelne Variablen aufgeteilt und gespeichert.

### JS12 Problem

```javascript
const car = {
    speed: 10,
    color: "red"
}

const speed = car.speed;
const color = car.color;
```

### JS12 Lösung

Um den Code zu vereinfachen und die Eigenschaften eines Objekts direkt in Variablen zu speichern, kann das Object Destructuring verwendet werden:

```javascript
const car = {
    speed: 10,
    color: "red"
}

const { speed, color } = car;
```

### JS12 Vorteile

- Kürzerer und lesbarer Code
- Direkter Zugriff auf die gewünschten Eigenschaften des Objekts

## JS13 Verwendung von async und await {#verwendung-von-async-und-await}

Die Verwendung von `async` und `await` soll verwendet werden, um asynchrone Funktionen in JavaScript zu vereinfachen und lesbarer zu machen.

### JS13 Problem

Traditionell wurden asynchrone Operationen in JavaScript mithilfe von Callback-Funktionen oder Promises behandelt.
Dies führte jedoch oft zu sogenanntem "Callback-Hell" oder zu komplexem und schwer verständlichem Code, insbesondere bei mehreren aufeinanderfolgenden asynchronen Operationen.

```javascript
getData(function(result) {
    processData(result, function(data) {
        saveData(data, function(response) {
            // Weitere Operationen...
        });
    });
});
```

### JS13 Lösung

Dank `async` und `await` kann asynchroner Code lesbarer und besser handhabbar gemacht werden.
Durch das Hinzufügen des `async`-Schlüsselworts zu einer Funktion wird diese automatisch zu einer asynchronen Funktion.
Das `await`-Schlüsselwort wird verwendet, um auf das Ergebnis einer asynchronen Operation zu warten.
Fehlerbehandlung wird durch `try/catch` durchgeführt.

```javascript
async function myAsyncFunction() {
    const result = await getData();
    const data = await processData(result);
    try {
      const response = await saveData(data);
    } catch (e) {
        // ...
    }
    // Weitere Operationen...
}
```

Wenn auf mehrere asynchrone Operationen gewartet werden muss, kann `Promise.all` verwendet werden, um die Ausführung zu beschleunigen.

```javascript
async function myAsyncFunction() {
    const result = await promise;
    const otherResult = await otherPromise;
    const anotherResult = await anotherPromise;
    // Code ausführen
}
// oder
const result = await Promise.all([promise, otherPromise, anotherPromise])
```

:::warning Exceptions

Es ist wichtig, dass Fehlerbehandlung in asynchronen Operationen nicht vergessen wird.

:::

### JS13 Vorteile

- Lesbarer und verständlicher Code
- Reduzierung der Verschachtelung von Callbacks ("Callback-Hell")
- Einfachere Fehlerbehandlung durch Verwendung von `try-catch`-Blöcken
- Bessere Kontrolle über asynchrone Abläufe und Reihenfolge der Operationen
- Einfachere Fehlerbehandlung

### JS13 Nachteile

- Verwendung von `async` und `await` erfordert ECMAScript 2017 (ES8) oder höher
- Exception-Handling ist notwendig.

### JS13 Weiterführende Literatur/Links

- [Async functions - MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)

## JS14 Begrenzte Zeilenanzahl in Methoden/Funktionen {#begrenzte-zeilenanzahl-in-methoden-funktionen}

Codezeilen in Methoden und Funktionen sollen auf eine begrenzte Anzahl beschränkt werden, um die Lesbarkeit und Wartbarkeit des Codes zu verbessern.

Die Begrenzung ist nicht in Stein gemeißelt, aber eine Methode soll nicht mehr als eine Bildschirmseite umfassen bei einer *normalen* Bildschirmauflösung und Schriftgröße.

Eine Quantisierung von Zeilen ist schwierig, aber eine Möglichkeit ist die Millersche Zahl 7 ± 2 oder die zyklomatische Komplexität.

:::details Millersche Zahl 7 ± 2

Die Millersche Zahl besagt, dass Menschen in der Lage sind, sich an etwa 7 ± 2 Einheiten von Information zu erinnern.
Man kann dies auf die Anzahl der Codezeilen übertragen, die ein Entwickler in einer Methode oder Funktion verarbeiten kann.

Siehe auch [The Magical Number Seven, Plus or Minus Two](https://de.wikipedia.org/wiki/Millersche_Zahl)

Beachte jedoch, dass diese Zahl umstritten ist und es viele Faktoren gibt, die die Lesbarkeit und das Verständnis von Code beeinflussen.

:::

:::details Zyklomatische Komplexität

Die zyklomatische Komplexität ist eine Softwaremetrik, die die Anzahl der unabhängigen Pfade durch den Quellcode misst.
Sie ist gegeben durch die Formel `M = E - N + 2P`, wobei `E` die Anzahl der Kanten, `N` die Anzahl der Knoten und `P` die Anzahl der Zusammenhangskomponenten ist.

Siehe auch [Cyclomatic Complexity](https://en.wikipedia.org/wiki/Cyclomatic_complexity) oder [McCabe-Metrik](https://de.wikipedia.org/wiki/McCabe-Metrik)

Viele Entwicklungsumgebungen bieten eine Möglichkeit, die zyklomatische Komplexität zu berechnen und pro Methode anzuzeigen.

Beachte jedoch auch hier, dass die zyklomatische Komplexität nur ein Indikator für die Komplexität eines Codes ist und nicht alle Aspekte der Lesbarkeit und Wartbarkeit abdeckt.
:::

### JS14 Problem

Methoden oder Funktionen mit einer großen Anzahl von Codezeilen können schwer zu lesen, zu verstehen und zu warten sein. Lange Methoden können verschiedene Aufgaben vermischen und die Einhaltung des Single Responsibility Principle erschweren.

```javascript
function processUserData(user) {
    // Schritt 1: Validierung der Benutzerdaten
    if (user !== null && user !== undefined) {
        if (validateName(user.name)) {
            if (validateEmail(user.email)) {
                if (validateAge(user.age)) {
                    // ...
                }
            }
        }
    }

    // Schritt 2: Speichern der Benutzerdaten
    if (user !== null && user !== undefined) {
        if (saveUserData(user)) {
            // ...
        }
    }

    // Schritt 3: Senden einer Bestätigungs-E-Mail
    if (user !== null && user !== undefined) {
        if (sendConfirmationEmail(user.email)) {
            // ...
        }
    }

    // Schritt 4: Aktualisierung des Benutzerstatus
    if (user !== null && user !== undefined) {
        if (updateUserStatus(user)) {
            // ...
        }
    }

    // ...
}
```

### JS14 Lösung

Um die Lesbarkeit und Verständlichkeit des Codes zu verbessern, sollen Methoden und Funktionen auf eine begrenzte Anzahl von Zeilen beschränkt sein. Komplexe Aufgaben sollen in kleinere Teilfunktionen ausgelagert werden, um die Verantwortlichkeiten klarer zu trennen.

> Die Anzahl von Zeilen soll allgemein so klein wie möglich gehalten werden. Sie soll allerdings nie über eine Bildschirmhöhe hinausgehen, d.h. mehr als 25 Zeilen sollen vermieden werden.

Allgemeine Code-Refactorings sind:

- Code-Blöcke oder Scopes (durch geschweifte Klammern separiert) können in Methoden ausgelagert werden.
- Kommentare, die eine Sektion kommentieren können im Allgemeinen in eine Methode ausgelagert werden.
- For-Schleifen, welche If-Bedingungen beinhalten, können als Methode geschrieben werden.
- Mehrdimensionale For-Schleifen können in Methoden ausgelagert werden,
- If-Bedingungen innerhalb einer Methode können als Methode geschrieben werden.

```javascript
function processUserData(user) {
    validateUser(user);
    saveUser(user);
    sendConfirmationEmail(user.email);
    updateUserStatus(user);
}

function validateUser(user) {
    if (user === null || user === undefined) {
        throw ...;
    }

    if (!validateName(user.name)) {
        throw ...;
    }

    if (!validateEmail(user.email)) {
        throw ...;
    }

    if (!validateAge(user.age)) {
        throw ...;
    }

    // Weitere Validierungen...
}

function saveUser(user) {
    if (user === null || user === undefined) {
        throw ...;
    }

    if (!saveUserData(user)) {
        throw ...;
    }

    // Weitere Speicheroperationen...
}

// Weitere Teilfunktionen...

```

### JS14 Vorteile

- Verbesserte Lesbarkeit und Verständlichkeit des Codes durch kleinere und fokussierte Methoden/Funktionen
- Einfachere Wartbarkeit und Testbarkeit durch klar abgegrenzte Verantwortlichkeiten
- Bessere Übersichtlichkeit und Strukturierung des Codes
- Bessere Testbarkeit des Codes, da kleinere Methoden leichter isoliert und getestet werden können

::: details Weitere Gründe für kleine Methoden

1. **KISS-Prinzip**: Das KISS-Prinzip kann leichter eingehalten werden, wenn Methoden und Funktionen auf eine begrenzte Anzahl von Zeilen beschränkt sind.
Der Entwickler kommt nicht dazu überkomplexe Methoden zu schreiben, da er sich an die Zeilenbeschränkung halten muss.

2. **Bessere Isolierung**: Kleine Methoden behandeln normalerweise nur eine spezifische Aufgabe oder Verantwortlichkeit.
Dadurch können sie isoliert und unabhängig von anderen Teilen des Codes getestet werden.
Durch die Fokussierung auf eine spezifische Funktion können Tests effektiver und einfacher geschrieben werden.

3. **Lesbarkeit**: Kleine Methoden sind in der Regel einfacher zu verstehen, da sie nur eine begrenzte Anzahl von Zeilen umfassen und sich auf eine bestimmte Funktionalität konzentrieren. Dadurch wird die Lesbarkeit des Codes verbessert und es ist einfacher, den Zweck und das Verhalten der Methode zu erfassen.

4. **Wiederverwendbarkeit**: Kleine Methoden können leichter wiederverwendet werden. Da sie in der Regel spezifische Aufgaben erfüllen, können sie in verschiedenen Teilen des Codes wiederverwendet werden, wenn ähnliche Funktionalität benötigt wird.
Dies fördert die Modularität und reduziert die Duplizierung von Code.

5. **Einfache Wartbarkeit**: Kleine Methoden sind einfacher zu warten, da sie in sich abgeschlossen sind und Änderungen an einer Methode weniger Auswirkungen auf andere Teile des Codes haben. Bei einem Fehler oder einer gewünschten Änderung ist es einfacher, den relevanten Code zu lokalisieren und anzupassen, ohne den gesamten Kontext berücksichtigen zu müssen.

6. **Bessere Testabdeckung**: Durch die Aufteilung des Codes in kleine Methoden wird die Testabdeckung verbessert, da jede Methode spezifische Tests erhalten kann. Dadurch können verschiedene Szenarien und Randbedingungen gezielt getestet werden, um die Fehleranfälligkeit zu reduzieren.

7. **Einfacheres Mocking**: Darüber hinaus ist das Mocking in Tests einfacher, wenn der Code in kleine Methoden aufgeteilt ist. Beim Schreiben von Unit-Tests ist es häufig erforderlich, externe Abhängigkeiten zu mocken oder zu fälschen, um den Fokus auf die zu testende Methode zu legen.
Mit kleinen Methoden ist es einfacher, diese Abhängigkeiten zu identifizieren und zu isolieren, da sie in der Regel explizit als Parameter an die Methode übergeben werden.
Das Mocking-Setup ist zudem kleiner und einfacher, weil aufgespaltete Methoden einfach diese Methoden mocken können, statt die fremde (externe) API, die darin verwendet wird.

8. **Förderung des Single Responsibility Principle**: Kleine Methoden unterstützen das Single Responsibility Principle, das besagt, dass eine Methode oder Funktion nur eine einzige Verantwortlichkeit haben soll. Durch die Aufteilung des Codes in kleine Methoden wird die Verantwortlichkeit klarer definiert und das Prinzip der klaren Trennung von Aufgaben eingehalten.
:::

Die Verwendung kleiner Methoden verbessert die Qualität und Wartbarkeit des Codes, indem sie die Testbarkeit, Lesbarkeit, Wiederverwendbarkeit und Modularität fördern.
Es ist jedoch wichtig, ein Gleichgewicht zu finden, um eine übermäßige Fragmentierung des Codes zu vermeiden und die Lesbarkeit nicht zu beeinträchtigen.

::: info
Siehe zu Prinzipien und Vorteilen auch [Prinzipien der Softwareentwicklung](../../2.principles/principles).
:::

### JS14 Nachteile

Die strikte Begrenzung der Zeilenanzahl kann zu einer übermäßigen Fragmentierung des Codes führen, wenn kleinere Methoden oder Funktionen unnötig erstellt werden.

### JS14 Ausnahmen

Die Anzahl der Codezeilen in einer Methode oder Funktion kann je nach Kontext und Komplexität des Codes variieren.

## JS15 Verwenden aussagekräftige Rückgabewerte und -typen {#verwenden-aussagekraeftige-rueckgabewerte-und-typen}

Wenn eine Methode einen Wert zurückgibt, soll dieser Wert aussagekräftig sein und genau das darstellen, was die Methode tut.

### JS15 Problem

Oftmals spiegelt der Rückgabe-Wert einer Funktion nicht genau wider, was die Funktion tut.
Dies kann zu Verwirrung führen und die Lesbarkeit und Wartbarkeit des Codes beeinträchtigen.
Es ist zudem ohne Dokumentation schwer zu verstehen, welche Rückgabewerte eine Funktion haben kann und was diese bedeuten.

Im folgenden Beispiel wird ein Benutzer-Objekt geprüft, jedoch ein String zurückgegeben anstatt eines booleschen Wertes.

```javascript
function validate(user) {
    if (user !== null && user !== undefined) {
        return "valid";
    } 

    return "invalid";
}
```

### JS15 Lösung

Es können unterschiedliche Ansätze verwendet werden, um aussagekräftige Rückgabewerte und -typen zu verwenden:

- Verwendung von booleschen Werten (`true`/`false`) für Ja/Nein-Entscheidungen
- Verwendung von spezifischen Werten wie `Symbol`, um den Status oder das Ergebnis einer Operation darzustellen

Beispiel:

```javascript
function findUserById(id) {
  const user = db.findUser(id);
  if (user) {
    return user;
  }
  // statt dessen eine Exception werfen oder ein Optional-Objekt zurückgeben
  throw new UserNotFoundException('User not found');
}
```

## JS16 Methoden/Funktionen geben für alle Pfade einen Wert zurück {#methoden-funktionen-geben-fuer-alle-pfade-einen-wert-zurueck}

Methoden oder Funktionen, die generell einen Wert zurückgeben, müssen für alle Pfade einen Wert zurückgeben.

### JS16 Problem {#problem}

In JavaScript ist es möglich, dass eine Funktion keinen expliziten Rückgabewert hat, was zu unerwartetem Verhalten führen kann.
Wenn ein Pfad ein einfaches `return`-Statement hat, aber andere Pfade nicht, wird `undefined` implizit zurückgegeben.
Ein Benutzer dieser Methode/Funktion, der nicht auf `undefined` prüft, muss zuerst sicherstellen, dass der Rückgabewert nicht `undefined` ist, bevor er ihn verwendet.
Dieser Vorgang wird oft vergessen und kann zu Fehlern führen, die schwer zu finden sind.

Generell ist der Rückgabewert `null` keine Lösung, da er sich von `undefined` nur in der Semantik unterscheidet.

```javascript
function getUserById(id) {
    if (id === 1) {
        return { id: 1, name: 'Alice' };
    }
    // Kein explizites return-Statement. 
    // Es wird implizit `undefined` zurückgegeben.
}
```

### JS16 Lösung

- Eine Funktion soll nie `undefined` oder `null` zurückgeben, sondern immer einen Wert oder ein Objekt, das den Status des Ergebnisses darstellt.
- Jeder Ablaufpfad in einer Funktion muss ein return-Statement haben, um sicherzustellen, dass immer ein Wert zurückgegeben wird.
- Statt `undefined` kann auch Optional verwendet werden, um den Status des Ergebnisses zu kennzeichnen.
Siehe dazu auch [JS15 Verwendung von `Optional` in JavaScript-Funktionen](.#js15-verwendung-von-optional-in-javascript-funktionen).
- Es kann auch ein spezieller Wert als Objekt zurückgegeben werden, um den Status des Ergebnisses zu kennzeichnen (siehe Beispiel unten).

```javascript
class EmptyUser extends User {
    static create() {
       return Object.freeze(new EmptyUser())
    }
    constructor() {
        super(-1, 'Unknown');
    }
    isValid() {
        return false;
    }
}

class User {
    static EMPTY = EmptyUser.create();
    
    isValid() {
        return true;
    }
    // ...
}

function getUserById(id) {
    if (id === 1) {
        return new User(1, 'Alice'); //oder Erstellung über Factory
    }
    return User.EMPTY; // oder return Optional.empty();
}
```

::: info Hinweis

Funktionen/Methoden, die generell keinen Wert zurückgeben, fallen nicht unter diese Regel.

:::

### JS16 Ausnahmen

Generell kann auch `null` ein gültiger Rückgabewert sein, wenn er explizit verwendet wird, um einen speziellen Zustand oder eine Bedeutung zu kennzeichnen.
Dieser Zustand muss jedoch in der JSDoc-Dokumentation klar dokumentiert sein, um Missverständnisse zu vermeiden.
Generell sollte man solche Methoden jedoch nur für interne Zwecke verwenden und nicht als öffentliche API bereitstellen.

## JS17 Methoden/Funktionen, die Mengen zurückgeben sollen niemals null oder undefined zurückgeben {#methoden-funktionen-die-mengen-zurueckgeben-sollen-niemals-null-oder-undefined-zurueckgeben}

Methoden oder Funktionen, die Mengen wie Arrays zurückgeben, sollen nie `null` oder `undefined` zurückgeben, sondern leere Mengen oder Objekte.

### JS17 Problem

Das Zurückgeben von null als Ergebnis einer Methode/Funktion, die eine Liste, HashMap oder ein Array zurückgibt, kann zu Zugriffsfehlern (undefined) und unerwartetem Verhalten führen.
Es erfordert zusätzliche Überprüfungen auf null und erhöht die Komplexität des Aufrufercodes.

```javascript
getNames() {
    if (condition) {
        return null;
    }
    // ...
}
```

### JS17 Lösung

Um Zugriffsfehler und unerwartetes Verhalten zu vermeiden, sollen Methoden/Funktionen stattdessen ein leeres Objekt oder Array zurückgeben.

```javascript
function getNames() {
    if (condition) {
        return [];
    }
    // ... return xy
}
```

### JS17 Vorteile

- Vermeidung von Zugriffsfehlern und unerwartetem Verhalten
- Einfachere Handhabung und weniger Überprüfungen auf null im Aufrufercode
- Verbesserte Robustheit und Stabilität des Codes

### JS17 Ausnahmen

Es kann Situationen geben, in denen die Rückgabe von null sinnvoll ist, z. B. wenn null einen speziellen Zustand oder eine Bedeutung hat.
In solchen Fällen ist es wichtig, die Dokumentation klar zu kommunizieren und sicherzustellen, dass der Aufrufercode angemessen darauf reagiert.

### JS17 Weiterführende Literatur/Links

- [Effective Java: Item 54 - Return Empty Arrays or Collections, Not Nulls](https://www.amazon.com/dp/0321356683)
- [Null or Empty Collection in Java](https://www.baeldung.com/java-null-empty-collection) (für Java)
- [Avoiding Null in JavaScript](https://dmitripavlutin.com/avoid-null-undefined-javascript/) (für JavaScript)

## JS18 Verwendung von `Optional` in JavaScript-Funktionen {#verwendung-von-optional-in-javascript-funktionen}

Eine Funktion oder Methode, die dennoch `null`, `undefined` oder `NaN` zurückgeben muss, soll stattdessen die `Optional`-Klasse verwenden, um den Status des Ergebnisses zu kennzeichnen.

:::info Siehe auch
[Methoden/Funktionen sollen niemals null oder undefined zurückgeben](.#js20-methodenfunktionen-sollen-niemals-null-oder-undefined-zuruckgeben)
:::

::: warning Anwendungseinsatz und Alternativen

Diese Regel gilt nur für bereits bestehenden Klassenstrukturen, die nicht veränderbar oder erweiterbar sind.

Soll ein neues Klassen- oder Objektmodell erstellt werden, sollen direkt [spezielle Objekte](.#verwende-spezielle-objekte-statt-spezielle-werte) verwendet werden.

:::

### JS18 Problem

Das Zurückgeben von `null`, `undefined` oder `NaN` aus einer Funktion kann zu Fehlern führen, insbesondere wenn nicht überprüft wird, ob das Ergebnis vorhanden ist oder nicht.

```javascript
function divide(a, b) {
  if (b !== 0) {
    return a / b;
  }
  return null;
}
```

### JS18 Lösung

Die Verwendung des `Optional`-Objekts ermöglicht es, den Status des Ergebnisses klar zu kennzeichnen, anstatt `null`, `undefined` oder `NaN` zurückzugeben.

```javascript
function divide(a, b) {
  if (b !== 0) {
    return Optional.of(a / b);
  }

  return Optional.empty();
}
```

### JS18 Vorteile

- Klarere Kennzeichnung des Zustands des Ergebnisses durch Verwendung von `Optional`
- Bessere Fehlervermeidung durch explizite Behandlung von leeren Ergebnissen
- Verbesserte Lesbarkeit des Codes durch den Verzicht auf `null` oder `undefined`

### JS18 Nachteile

- Zusätzlicher Overhead durch die Verwendung von `Optional`
- Potenziell erhöhter Komplexitätsgrad in der Verwendung des `Optional`-Objekts
- Abhängigkeit von der Implementierung der `Optional`-Klasse

### JS18 Ausnahmen

Die Verwendung von `Optional` in JavaScript ist eine Designentscheidung und keine Sprachfunktion. Es ist optional und soll basierend auf den Anforderungen des Projekts und der Teampräferenz eingesetzt werden.

### JS18 Weiterführende Literatur/Links

- [Optional Chaining Operator - JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining) (Alternatives Muster zur Behandlung von `null`- und `undefined`-Werten)

::: details Codebeispiel für die `Optional`-Klasse in JavaScript

```javascript

/**
 * Klasse, die ein optionales Ergebnis repräsentiert.
 * @param {*} value - Der Wert des optionalen Ergebnisses.
 * @class
 * @readonly
 */
function Optional(value) {
  /**
   * Der Wert des optionalen Ergebnisses.
   * @type {*}
   * @readonly
   */
  Object.defineProperty(this, 'result', {
    value: value,
    writable: false
  });

  /**
   * Gibt an, ob das optionale Ergebnis vorhanden ist.
   * @type {boolean}
   * @readonly
   */
  Object.defineProperty(this, 'isPresent', {
    get: function() {
      return this.result !== null && !isNaN(this.result);
    }
  });

  /**
   * Gibt an, ob das optionale Ergebnis fehlt.
   * @type {boolean}
   * @readonly
   */
  Object.defineProperty(this, 'isMissing', {
    get: function() {
      return !this.isPresent;
    }
  });

  Object.freeze(this);
}

/**
 * Erstellt ein `Optional`-Objekt mit dem angegebenen Wert.
 * @param {*} value - Der Wert für das optionale Ergebnis.
 * @returns {Optional} - Das erstellte `Optional`-Objekt.
 * @static
 * @example
 * var myResult = Optional.of(42);
 */
Optional.of = function(value) {
  return new Optional(value);
};

/**
 * Erstellt ein leeres `Optional`-Objekt.
 * @returns {Optional} - Das erstellte leere `Optional`-Objekt.
 * @static
 * @example
 * var emptyResult = Optional.empty();
 */
Optional.empty = function() {
  return new Optional(null);
};

/**
 * Überprüft, ob ein gegebener Wert eine Instanz von `Optional` ist.
 * @param {*} optional - Der zu überprüfende Wert.
 * @returns {boolean} - `true`, wenn der Wert eine `Optional`-Instanz ist, andernfalls `false`.
 * @static
 * @example
 * var myResult = Optional.of(42);
 * console.log(Optional.isOptional(myResult)); // true
 */
Optional.isOptional = function(optional) {
  return optional instanceof Optional;
};
```

:::

## JS19 Verwendung der npm-Bibliothek optional.js zur Rückgabe von Optional in JavaScript {#verwendung-der-npm-bibliothek-optional-js-zur-rueckgabe-von-optional-in-javascript}

Es ist einfach in JavaScript, die npm-Bibliothek optional.js zu verwenden, um die Rückgabe von Optional-Objekten anstelle von null oder anderen Fehlertypen zu ermöglichen.
Durch die Verwendung von Optional-Objekten wird deutlich, dass eine Funktion möglicherweise keinen Wert zurückgibt und ermöglicht eine bessere Behandlung von optionalen Werten.

:::info Abhängigkeiten minimieren

Es kann besser sein, die Abhängigkeiten des eigenen Projekts zu minimieren und so eine `Optional`-Klasse selbst zu implementieren, um die Abhängigkeit von optional.js zu vermeiden.

:::

### JS19 Problem

In JavaScript ist es üblich, dass Funktionen null, undefined oder andere Werte zurückgeben, um das Fehlen eines erwarteten Werts zu kennzeichnen.
Dies kann zu Verwirrung und unerwartetem Verhalten führen, da der Rückgabewert möglicherweise nicht explizit auf das Fehlen des Werts überprüft wird.

```javascript
function findUserById(id) {
  const user = db.findUser(id);
  if (user) {
    return user;
  }
  return null;
}

const user = findUserById(123);
if (user) {
  // Do something with the user
}
```

### JS19 Lösung

Durch die Verwendung der optional.js-Bibliothek können Funktionen Optional-Objekte zurückgeben, um das Fehlen eines Werts explizit zu kennzeichnen. Dadurch wird die Code-Klarheit verbessert und die Behandlung von optionalen Werten erleichtert.

```javascript
const Optional = require('optional-js');

function findUserById(id) {
  const user = db.findUser(id);
  return Optional.ofNullable(user);
}

const userOptional = findUserById(123);
if (userOptional.isPresent()) {
  const user = userOptional.get();
  // Do something with the user
}
```

### JS19 Vorteile

- Bessere Behandlung von optionalen Werten durch die Verwendung von Optional-Objekten
- Explizite Kennzeichnung des Fehlens eines Werts
- Einfachere Überprüfung des Vorhandenseins eines Werts und Zugriff auf den Wert mit den Methoden von Optional

### JS19 Nachteile

- Einführung einer zusätzlichen Abhängigkeit durch die Verwendung der optional.js-Bibliothek
- API Methoden, die optional.js-Bibliothek verwenden erfordern, dass Nutzer der API die optional.js-Bibliothek einbinden, kennen und verwenden müssen.

### JS19 Ausnahmen

Es kann Situationen geben, in denen die Verwendung der optional.js-Bibliothek nicht angemessen ist, z. B. wenn das Projekt bereits eine andere Lösung für die Behandlung von optionalen Werten verwendet oder wenn die Einführung einer zusätzlichen Abhängigkeit vermieden werden soll.

### JS19 Weiterführende Literatur/Links

- [optional.js - npm](https://www.npmjs.com/package/optional-js)
- [Avoiding Null in JavaScript: An Introduction to Optional Values](https://dev.to/marcellomontemagno/avoiding-null-in-javascript-an-introduction-to-optional-values-4m22)

## JS20 If-Bedingungen ohne Else und mit Return {#if-bedingungen-ohne-else-und-mit-return}

If-Bedingungen, die ein Return enthalten, sollen kein `else` enthalten, um die Lesbarkeit des Codes zu verbessern und die Verschachtelung von Bedingungen zu reduzieren.

Im Folgenden sind sich widersprechende Regeln aufgeführt, die bei der Reihenfolge der Bedingungen in If-Statements zu beachten sind:

- Die Bedingung, welche am wenigsten Code enthält, sollte zuerst geprüft werden.
- Die Bedingung, welche die Funktion/Methode am schnellsten verlässt, sollte zuerst geprüft werden.
- Die Bedingung, welche eine Exception wirft, sollte zuerst geprüft werden.
- Die Bedingung, welche eine positive Bedingung prüft, sollte zuerst geprüft werden.
- Die Bedingung, welche am häufigsten zutrifft, sollte zuerst geprüft werden.

### JS20 Problem

If-Bedingungen mit einem Return und einem dazugehörigen else-Block können die Lesbarkeit des Codes beeinträchtigen und zu unnötiger Verschachtelung führen.

```javascript
function calculate(x) {
    if (x > 0) {
        return x * 2;
    } else {
        return x;
    }
}
```

### JS20 Lösung

Durch Entfernen des else-Blocks und direktes Rückgabestatement wird der Code lesbarer und die Verschachtelung von Bedingungen reduziert.

```javascript
function calculate(x) {
    if (x > 0) {
        // Guard Clause
        return x * 2;
    }
    return x;
}
```

### JS20 Vorteile

- Verbesserte Lesbarkeit und Klarheit des Codes
- Pfade durch die Funktion sind klarer und leichter nachvollziehbar
- Reduzierung der Verschachtelung von Bedingungen
- Vereinfachte Struktur und Fluss des Codes

### JS20 Weiterführende Literatur/Links

- [Guard Pattern](.#js12-guard-pattern)
- [Clean Code: A Handbook of Agile Software Craftsmanship](https://www.amazon.com/dp/0132350882)
- [JavaScript: The Good Parts](https://www.amazon.com/dp/0596517742)

## JS21 Guard Pattern {#guard-pattern}

Guard-Klauseln sollen verwendet werden, um unerwünschte Ausführungszweige frühzeitig zu beenden und die Lesbarkeit des Codes zu verbessern.

Im Folgenden sind sich widersprechende Regeln aufgeführt, die bei der Reihenfolge der Bedingungen in If-Statements zu beachten sind:

- Die Bedingung, welche am wenigsten Code enthält, sollte zuerst geprüft werden.
- Die Bedingung, welche die Funktion/Methode am schnellsten verlässt, sollte zuerst geprüft werden.
- Die Bedingung, welche eine Exception wirft, sollte zuerst geprüft werden.
- Die Bedingung, welche eine positive Bedingung prüft, sollte zuerst geprüft werden.
- Die Bedingung, welche am häufigsten zutrifft, sollte zuerst geprüft werden.

### JS21 Problem

In JavaScript müssen oft komplexe Bedingungen geprüft werden, um unerwünschte Ausführungszweige zu verhindern oder ungültige Eingaben abzufangen. Dies kann zu verschachteltem Code führen, der schwer zu lesen und zu warten ist.

```javascript
function processInput(input) {
    if (input !== null && input !== undefined && input !== '') {
        // Code zur Verarbeitung des Eingabewerts
    }
}
```

### JS21 Lösung

Das Guard Pattern ermöglicht es, Bedingungsprüfungen klarer und lesbarer zu gestalten, indem wir unerwünschte Fälle frühzeitig abfangen und beenden.

```javascript
function processInput(input) {
    if (input == null || input === '') {
        return;
    }

    // Code zur Verarbeitung des Eingabewerts
}
```

### JS21 Vorteile

- Verbesserte Lesbarkeit des Codes durch eine klare und frühzeitige Abhandlung unerwünschter Fälle
- Reduzierung der Verschachtelung von Bedingungsprüfungen
- Einfache Erweiterbarkeit und Wartbarkeit des Codes

### JS21 Weiterführende Literatur/Links

- [Guard Clause Pattern - Refactoring.Guru](https://refactoring.guru/smells/guard-clauses)

## JS22 Positiv formulierte If-Bedingungen und Auslagerung komplexer Bedingungen {#positiv-formulierte-if-bedingungen-und-auslagerung-komplexer-bedingungen}

If-Bedingungen sollen positiv formuliert werden und komplexe Bedingungen sollen in temporäre Variablen ausgelagert werden, um die Lesbarkeit und Wartbarkeit des Codes zu verbessern.

::: info Beachte

Die Aufsplittung von If-Bedingungen ist sehr abhängig vom Verständnis des Entwicklers und soll mit Sinn und Verstand eingesetzt werden.

Generell ist die KISS-Regel (Keep It Simple, Stupid) zu beachten.

:::

### JS22 Problem

Komplexe Bedingungen in If-Anweisungen können den Code schwer verständlich machen, insbesondere wenn sie negativ formuliert sind. Lange und verschachtelte Bedingungen erschweren die Lesbarkeit und können zu Fehlern führen.

```java
if (!(name.isEmpty() || age < 18 || !isAuthorized)) {
    // Code ausführen
}
```

```javascript
if (!(name === "" || age < 18 || !isAuthorized)) {
    // Code ausführen
}
```

### JS22 Lösung

Durch die positive Formulierung der Bedingungen und die Auslagerung komplexer Ausdrücke in temporäre Variablen wird der Code lesbarer und verständlicher.

```java
boolean isNameEmpty = name.isEmpty();
boolean isUnderAge = age < 18;
boolean isNotAuthorized = !isAuthorized;

if (!isNameEmpty && !isUnderAge && isNotAuthorized) {
    // Code ausführen
}
```

```javascript
const isNameEmpty = name === "";
const isUnderAge = age < 18;
const isNotAuthorized = !isAuthorized;

if (!isNameEmpty && !isUnderAge && isNotAuthorized) {
    // Code ausführen
}
```

### JS22 Vorteile

- Verbesserte Lesbarkeit des Codes durch positiv formulierte Bedingungen
- Reduzierung der Verschachtelung und Komplexität von If-Anweisungen
- Bessere Wartbarkeit des Codes durch klare und beschreibende Variablen

### JS22 Nachteile

- Alternativ kann ein Kommentar die If-Bedingung beschreiben, aber bei einer Änderung muss daran gedacht werden auch den Kommentar anzupassen.
- Das Auslagern von Bedingungen in temporäre Variablen kann zu einem erhöhten Speicherverbrauch führen, insbesondere bei komplexen Ausdrücken. Dies ist normalerweise vernachlässigbar, kann jedoch in speziellen Situationen berücksichtigt werden.

### JS22 Ausnahmen

Es gibt Fälle, in denen das Auslagern von Bedingungen in temporäre Variablen nicht sinnvoll ist, z. B. wenn die Bedingung nur an einer Stelle verwendet wird und keine weitere Klarheit oder Wartbarkeit gewonnen wird.

### JS22 Weiterführende Literatur/Links

- [The Art of Readable Code - Simple Conditionals](https://www.amazon.com/dp/0596802293)
- [Clean Code: A Handbook of Agile Software Craftsmanship](https://www.amazon.com/dp/0132350882)

## JS23 Exceptions in JavaScript nicht einfach loggen und unverändert wieder werfen {#exceptions-in-javascript-nicht-einfach-loggen-und-unveraendert-wieder-werfen}

Exceptions sollen in JavaScript nicht einfach nur geloggt und unverändert wieder geworfen werden.

Stattdessen ist es wichtig, Exceptions sinnvoll zu behandeln und angemessene Maßnahmen zu ergreifen.

:::warning Wichtig
**Entweder** wird die Exception geloggt und behandelt **ODER** in eine andere Form umgewandelt und geworfen.

Aber nicht beides.
:::

### JS23 Problem

Das einfache Loggen und unveränderte Werfen von Exceptions führt oft dazu, dass die eigentliche Ursache des Problems verschleiert wird.
Es erschwert auch die Fehlerbehandlung und das Debugging des Codes.

```javascript
try {
  // Code, der eine Exception auslöst
} catch (error) {
  console.log('Exception aufgetreten:', error);
  throw error;
}
```

### JS23 Lösung

Es ist wichtig, die Ursache der Exception zu verstehen und entsprechend zu reagieren. Dies kann das Ergreifen von Fehlerbehandlungsmaßnahmen, das Aufzeigen von aussagekräftigen Fehlermeldungen oder das Umwandeln der Exception in eine andere Form sein.

```javascript
try {
  // Code, der eine Exception auslöst
} catch (error) {
  // Fehlerbehandlung und angemessene Maßnahmen ergreifen
  console.error('Ein Fehler ist aufgetreten:', error);
  // Weitere Maßnahmen wie Fehlermeldung anzeigen, alternative Verarbeitung, etc.
}
```

### JS23 Vorteile

- Klare Behandlung und Reaktion auf Exceptions
- Verbesserte Fehlerbehandlung und Debugging-Möglichkeiten
- Besseres Verständnis der Ursachen von Fehlern

### JS23 Ausnahmen

In einigen Fällen kann es sinnvoll sein, Exceptions zu loggen und unverändert wieder zu werfen. Dies ist jedoch eher die Ausnahme und soll gut begründet sein, z.B. wenn der Code in einem bestimmten Kontext läuft, der spezielle Anforderungen hat.

### JS23 Weiterführende Literatur/Links

- [Exception Handling Best Practices in JavaScript](https://www.toptal.com/javascript/exception-handling-javascript-best-practices)
- [JavaScript Error Handling: Best Practices](https://blog.bitsrc.io/javascript-error-handling-best-practices-329c5f6e5d33)

## JS24 Benennung von Methoden mit verschiedenen Präfixen für Synchronität und Ergebnisverhalten {#benennung-von-methoden-mit-verschiedenen-praefixen-fuer-synchronitaet-und-ergebnisverhalten}

Es ist eine bewährte Praxis bei der Benennung von Methoden in JavaScript und Java, unterschiedliche Präfixe zu verwenden, um die Synchronität und das Ergebnisverhalten der Methode zu kennzeichnen. Das Präfix "get" soll für synchronen Zugriff verwendet werden und immer einen Wert zurückgeben, während die Präfixe "fetch" oder "request" für asynchronen Zugriff stehen, der länger dauern und auch fehlschlagen kann.

::: info get-Präfix

Verwechsle das get-Präfix nicht mit dem get-Präfix in Java, das für Getter-Methoden verwendet wird.
`get-` in JavaScript soll für synchronen Zugriff für eine berechnete Eigenschaft oder ein Ergebnis stehen.

:::

### JS24 Problem

Bei der Benennung von Methoden ist es wichtig, klare Hinweise auf die Synchronität und das Ergebnisverhalten der Methode zu geben.
Unklare oder inkonsistente Benennung kann zu Missverständnissen und unerwartetem Verhalten führen.

```javascript
// Unklare Benennung ohne klare Angabe zur Synchronität und zum Ergebnisverhalten
function getData() {
  // ...
}

// Unklare Benennung ohne klare Angabe zur Synchronität und zum Ergebnisverhalten
async function getAsyncData() {
  // ...
}
```

### JS24 Lösung

Um die Synchronität und das Ergebnisverhalten einer Methode klarer zu kennzeichnen, sollen unterschiedliche Präfixe verwendet werden. Das Präfix "get" soll für synchronen Zugriff verwendet werden und immer einen Wert zurückgeben. Die Präfixe "fetch" oder "request" sollen für asynchronen Zugriff stehen, der länger dauern und auch fehlschlagen kann.

> get-Präfixe sollen nie async sein, dagegen sollen fetch- oder request- Präfixe immer async sein.

```javascript
// Synchroner Zugriff mit Wert-Rückgabe
function getValue() {
  // ...
}

// Asynchroner Zugriff mit Möglichkeit eines Fehlschlags
async function fetchResource() {
  // ...
}
```

### JS24 Vorteile

- Klare und eindeutige Benennung, die die Synchronität und das Ergebnisverhalten einer Methode widerspiegelt
- Verbesserte Lesbarkeit und Verständlichkeit des Codes
- Einfachere Fehlersuche und Debugging-Möglichkeiten

### JS24 Ausnahmen

Es kann Situationen geben, in denen die Verwendung von anderen Präfixen oder Benennungsmustern angemessen ist, abhängig von den spezifischen Anforderungen und Konventionen des Projekts.
Es ist wichtig, einheitliche Benennungsstandards innerhalb des Projekts festzulegen und zu dokumentieren.

### JS24 Weiterführende Literatur/Links

- [Method Naming Conventions in Java](https://www.baeldung.com/java-method-naming-conventions)
- [JavaScript Naming Conventions](https://www.robinwieruch.de/javascript-naming-conventions)

## JS25 JSDoc Kommentare für JavaScript-Methoden, Funktionen, Variablen, Objekte und Typen {#jsdoc-kommentare-fuer-javascript-methoden-funktionen-variablen-objekte-und-typen}

Methoden, Funktionen, Variablen, Objekte und Typen in JavaScript sollen mit JSDoc-Kommentaren annotiert werden, um eine klare Dokumentation und Typisierung der Parameter und des Rückgabewerts zu ermöglichen.

### JS25 Problem

JavaScript ist eine dynamisch typisierte Sprache, was zu einer geringeren Typsicherheit und Dokumentation führen kann.
Parameter, Variablen und Rückgabewerte von Methoden und Funktionen sind nicht explizit typisiert und dokumentiert, was zu Verwirrung und Fehlern führen kann.

### JS25 Lösung

Die Verwendung von JSDoc-Kommentaren ermöglicht es, Methoden, Funktionen, Variablen, Objekte und Typen in JavaScript klar zu dokumentieren und zu typisieren.
Auf diese Art können auch Objekte und jede andere Art von Datenstrukturen dokumentiert werden.

:::info
Moderne Entwicklungsumgebungen und Tools wie Visual Studio Code, WebStorm und ESLint unterstützen JSDoc-Kommentare und bieten Funktionen wie Autovervollständigung, Typüberprüfung und Dokumentation.
Diese Tools melden Probleme bei inkompatiblen Typen und fehlenden Parametern oder Rückgabewerten.
:::

### JS25 Beispiele

#### JS25 Methoden und Funktionen

:::warning Beachte!
JSDoc-Kommentare beginnen mit `/**` und enden mit `*/`.
Jede Zeile innerhalb des Kommentars beginnt mit `*`.
:::

```javascript
/**
 * Berechnet die Summe von zwei Zahlen.
 * @param {number} x - Die erste Zahl.
 * @param [number] y - Die zweite Zahl ist optional. //Alternative Google Closure Compiler Syntax: {number=}
 * @param [string|number] text - Ein Text als String oder Zahl.
 * @param {*} data - Ein beliebiger Typ.
 * @param {number} [offsetDefault=1] - Der Standardwert, falls der Parameter fehlt.
 * @returns {number} Die Summe der beiden Zahlen. 
 */
```

#### JS25 Variablen

```javascript
/**
 * Die maximale Anzahl von Elementen.
 * @type {number}
 */
const MAX_ELEMENTS = 100;

/** @type {(symbol|boolean|{}|string|Array.<string>|number|null|NaN)} */
let myVariable;
myVariable = Symbol('mySymbol');
myVariable = true;
myVariable = {};
myVariable = 'Hello';
// oder, entspricht string[]
myVariable = ['Hello', 'World'];
myVariable = 42;
myVariable = null;
myVariable = NaN;


/** @type {?number} */
let nullableVar = null;

/** @type {!number} */
let NotNullVar = 0;
```

#### JS25 Objekte deklarieren

Objekt-Variablen können direkt mit `@type` dokumentiert werden.

```javascript
 /**
 * Ein Benutzerobjekt.
 * @type {Object}
 * @property {string} name - Der Name des Benutzers.
 * @property {number} age - Das Alter des Benutzers.
 * @property {{street: string, city: string}} address - Die Adresse des Benutzers.
 * @property {string[]} roles - Die Rollen des Benutzers.
 */
let user = {
  name: 'Alice',
  age: 30,
  address: {
    street: '123 Main St',
    city: 'Anytown'
  },
  roles: ['admin', 'user']
};
```

#### JS25 Typen definieren

Wenn ein Objekt mehrmals verwendet wird, kann der Typ mit `@typedef` definiert werden.

`@typedef` definiert einen benutzerdefinierten Typ, der in anderen JSDoc-Kommentaren verwendet werden kann.
Im Gegensatz zu `@type`, welches den Typ einer Variablen oder eines Objekts angibt, definiert `@typedef` einen benutzerdefinierten Typ, der wiederverwendet werden kann.

```javascript

 /**
 * Ein Benutzerobjekt.
 * @typedef {Object} User
 * @type {Object}
 * @property {string} name - Der Name des Benutzers.
 * @property {number} age - Das Alter des Benutzers.
 */

// definiert den Typ der Variable user als User-Objekt
/** 
 * @type {User}
 */
let user;
```

### JS25 Siehe dazu

- [JSDoc @type](https://jsdoc.app/tags-type) erklärt die verschiedenen Tags und ihre Verwendung:
- [JSDoc @typedef](https://jsdoc.app/tags-typedef)

## JS26 Variable Parameter in Funktionen oder Methoden vermeiden {#variable-parameter-in-funktionen-oder-methoden-vermeiden}

Variable Parameter in Funktionen oder Methoden sollen vermieden werden, wenn bereits Parameter mit spezifischen Typen oder Strukturen definiert sind.

### JS26 Problem

Variable Parameter in Funktionen oder Methoden in Kombination mit weiteren vorangestellten unterschiedlichen Parametern können zu Verwirrung und unerwartetem Verhalten führen.

```javascript
function fetchData(url, headers, options, ...params) {
  // ...
}
```

### JS26 Lösung

Verwende stattdessen spezifische Parameter oder separate Funktionen/Methoden, um das Verhalten klarer zu kennzeichnen.

```javascript
function fetchData(url, headers, options) {
  // ...
}

function fetchDataWithParams(url, ...params) {
  // ...
}
```

### JS26 Ausnahmen

Wenn die Funktion oder Methode nur ein vorangestellten Parameter besitzt, kann der Restparameter `...params` verwendet werden, um eine variable Anzahl von Argumenten zu akzeptieren.
Eine Verwechslung mit den vorangestellten Parametern ist in diesem Fall unwahrscheinlich.

```javascript
function formatString(template, ...params) {
  // ...
}
```

:::danger Variable Parameter kombiniert mit spezifischen Parametern
Betrachte folgendes Beispiel:

```javascript
function useOneOrMultiple(first, ...rest) {
  console.log(first);
  console.log(rest); // rest ist ein Array, d.h ...rest sind die Inhalte
}

const args = [1, 2, 3];
useOneOrMultiple(args[0], ...args.slice(1));
useOneOrMultiple(args[0], args.slice(1));
useOneOrMultiple(...args);
useOneOrMultiple(args);
```

Die Ausgabe ist:

- 1 und [2, 3]
- 1 und [[2, 3]]
- 1 und [2, 3]
- [1, 2, 3] und []

Erklärung:

- `useOneOrMultiple(args[0], ...args.slice(1));` entspricht `useOneOrMultiple(1, 2, 3);`, da `...args.slice(1)` in `(2, 3)` aufgelöst wird.
- `useOneOrMultiple(args[0], args.slice(1));` entspricht `useOneOrMultiple(1, [2, 3]);`
- `useOneOrMultiple(...args);` entspricht `useOneOrMultiple(1, 2, 3);` , da `(...args)` in `(1, 2, 3)` über alle Parameter aufgelöst wird wie beim ersten Beispiel
- `useOneOrMultiple(args);` entspricht `useOneOrMultiple([1, 2, 3], []);`

Jetzt stell dir vor, dass es mehr als 2 spezifische Parameter gibt und du versuchst, die Argumente zu übergeben...

:::

## JS27 Boolean-Parameter in Funktionen oder Methoden vermeiden {#boolean-parameter-in-funktionen-oder-methoden-vermeiden}

Boolean als Parameter in Funktionen oder Methoden sollen nicht verwendet werden.
Stattdessen sollen eigene Funktionen oder Methoden mit entsprechenden Namen und Parametern erstellt werden, weil damit das Verhalten der Funktion oder Methode klarer wird.

### JS27 Problem

Boolean-Parameter in Funktionen oder Methoden können zu Verwirrung und unerwartetem Verhalten führen, da der Aufrufer den Zweck des Parameters erraten muss.

```javascript
function fetchData(url, async) {
  if (async) {
    // Asynchroner Aufruf
  } else {
    // Synchroner Aufruf
  }
}
```

### JS27 Lösung

Verwende stattdessen spezifische Parameter oder separate Funktionen/Methoden, um das Verhalten klarer zu kennzeichnen.

```javascript
function fetchAsyncData(url) {
  // Asynchroner Aufruf
}

function fetchData(url) {
  // Synchroner Aufruf
}
```

## JS28 Default Parameter in Funktionen oder Methoden {#default-parameter-in-funktionen-oder-methoden}

Default Parameter in Funktionen oder Methoden sollen nicht verwendet werden.

### JS28 Problem

Default Parameter in Funktionen oder Methoden können zu unerwartetem Verhalten führen, wenn der Aufrufer den Standardwert nicht erwartet oder überschreibt.

Sollte der default Parameter sich später ändern, kann dies zu unerwartetem Verhalten führen bei Code, der bereits existiert und den Standardwert verwendet.

```javascript
function increment(value, step = 10) {
  return value + step;
}
```

### JS28 Lösung

Verwende stattdessen separate Funktionen oder Methoden mit spezifischen Namen, um das Verhalten klarer zu kennzeichnen.

```javascript
function incrementValueBy(value, step) {
  return value + step;
}

function incrementByTen(value) {
  return increment(value, 10);
}
```

### JS28 Vorteile

- Klarere und verständlichere Funktionen und Methoden
- Vermeidung von unerwartetem Verhalten durch Standardwerte
- Einfachere Wartung und Erweiterung des Codes
- Nachträgliches Refactoring bzw. Änderungen des Standardwertes sind einfach, weil einfach eine neue Funktion erstellt wird.

### JS28 Nachteile

- Mehr Code und mehr Tests, da separate Funktionen oder Methoden erstellt werden müssen
- Möglicherweise mehr Code-Duplizierung, wenn die Funktionen oder Methoden ähnliche Logik enthalten
- Mehr Aufwand bei der Benennung von Funktionen oder Methoden
- Mehr Aufwand bei der Dokumentation von Funktionen oder Methoden

## JS29 Template Strings {#template-strings}

Template Literals (`` ` ``) sollen verwendet werden, um Strings in JavaScript zu erstellen, anstatt die veraltete Methode mit `+` zu verwenden.

### JS29 Beispiel

```javascript
const name = 'Alice';

// Veraltete Methode
console.log('Hello, ' + name + '!');
// Moderne Methode
console.log(`Hello, ${name}!`);
```

## JS30 Spread-Operator {#spread-operator}

Der Spread-Operator (`...`) soll verwendet werden, um Arrays zusammenzuführen oder Objekte zu kopieren, anstatt Schleifen oder Methoden wie `concat()` oder `Object.assign()` zu verwenden.

### JS30 Problem

Um Arrays zusammenzuführen oder Objekte zu kopieren, werden oft Schleifen oder Methoden wie `concat()` oder `Object.assign()` verwendet.
Dies ist jedoch umständlich und unübersichtlich.

### JS30 Lösung

Der Spread-Operator (`...`) ermöglicht es, Arrays zusammenzuführen oder Objekte zu kopieren, indem er die Elemente oder Eigenschaften in ein neues Array oder Objekt einfügt.

#### JS30 Arrays zusammenführen

```javascript
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

const result = [...arr1, ...arr2];
```

:::info Objekte im Array
Der Spread-Operator erstellt eine flache Kopie der Elemente, d.h. wenn die Elemente Objekte sind, werden nur die Referenzen kopiert.

Dies gilt auch für alle anderen Arten von Objekten, die referenziert werden, wie z.B. Funktionen, Maps, Sets, etc.

```javascript
const arr1 = [{ a: 1 }, { b: 2 }];
const arr2 = [{ c: 3 }, { d: 4 }];

const result = [...arr1, ...arr2];

arr1[0].a = 42;
console.log(result[0]); // { a: 42 }
```

:::

#### JS30 Objekte kopieren

```javascript
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };

const copy = { ...obj1, ...obj2 };
```

:::info Objekte im Objekt

Der Spread-Operator erstellt eine flache Kopie der Eigenschaften, d.h. wenn die Eigenschaften Objekte sind, werden nur die Referenzen kopiert.

```javascript
const obj1 = { a: { x: 1 }, b: { y: 2 } };
const obj2 = { c: { z: 3 }, d: { w: 4 } };

const copy = { ...obj1, ...obj2 };

obj1.a.x = 42;
console.log(copy.a.x); // 42
```

Wenn Objekte die gleichen Keys haben, wird der letzte Wert verwendet.

```javascript
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };

const copy = { ...obj1, ...obj2 };

console.log(copy); // { a: 1, b: 3, c: 4 }
```

:::

:::details Tiefe Kopie

Um eine tiefe Kopie von Objekten zu erstellen, die auch die Eigenschaften der Objekte kopiert, kann das globale Objekt `JSON` verwendet werden.

```javascript
const obj1 = { a: { x: 1 }, b: { y: 2 } };

const deepCopy = JSON.parse(JSON.stringify(obj1));
```

Beachte jedoch:

- Operation sind nicht für alle Objekte geeignet ist,
  - z.B. für Funktionen, Maps, Sets,
  - oder zirkuläre Referenzen.
- Bei einer tiefen Kopie gehen auch Methoden und Prototypen verloren.
- Die Performance ist schlechter als bei flachen Kopien.

:::

## JS31 Arrow Funktion statt `function` {#arrow-funktion-statt-function}

Arrow Functions (`() => {}`) sollen verwendet werden, um Funktionen in JavaScript zu definieren, anstatt der traditionellen `function`-Syntax.

`me = this` soll vermieden werden.

### JS31 Problem

Traditionelle Funktionen (`function`) haben einen eigenen Wert für `this`, was es umständlich macht, auf das äußere `this` zuzugreifen.

```javascript
function Person() {
  this.age = 0;

  setInterval(function growUp() {
    // `this` bezieht sich auf den globalen Objekt, nicht auf die Person-Instanz
    this.age++;
  }, 1000);
}
```

:::details bind-Methode von Funktionen
Eine Möglichkeit, das Problem zu lösen, ist die Verwendung von `bind()`.
Bind erstellt eine neue Funktion, die, wenn sie aufgerufen wird, ihren `this`-Wert auf den angegebenen Wert setzt.

```javascript
function Person() {
  this.age = 0;

  setInterval(function growUp() {
    this.age++;
  }.bind(this), 1000);
}
```

Beachte, das ein einmal gebundener Wert nicht mehr geändert werden kann.

```javascript
function callCallback(callback) {
  callback.call(null); // `this` wird auf `null` gesetzt, aber durch `bind` nicht mehr änderbar
}

callCallback(function() {
  console.log(this);  // nicht null, sondern das ursprüngliche `this`
}.bind(this)); // this ist jetzt gebunden
```

:::

### JS31 Lösung

Arrow Functions (`() => {}`) haben kein eigenes `this`, sondern erben es vom umgebenden Kontext, was es einfacher macht, auf das äußere `this` zuzugreifen.

```javascript
function Person() {
  this.age = 0;

  setInterval(() => {
    // `this` bezieht sich auf die Person-Instanz
    this.age++;
  }, 1000);
}
```

:::details Arrow, Lambda, Anonyme Funktion
`Arrow Functions` sind auch bekannt als `Lambda Expression` oder `Anonyme Funktionen`.
Jedoch können `anonyme Funktionen` auch mit `function` erstellt werden..
:::

### JS31 Ausnahmen

Es gibt Fälle, in denen traditionelle Funktionen (`function`) bevorzugt werden, z.B. wenn `this` explizit benötigt wird oder wenn `arguments` verwendet werden soll.

```javascript
const sum = function() {
  return Array.from(arguments).reduce((a, b) => a + b, 0);
};
```

`me = this` kann verwendet werden, wenn `this` in einer Funktion verwendet wird, die in einem anderen Kontext ausgeführt wird.
Beispielsweise durch ein `bind` oder `call`, worin das `this`-Objekt überschrieben wird.

```javascript

function outerKontext() {
    const me = this;

    const kontextGebundeneFunction = function() {
        console.log(this); // == me
        me.doSomething(); // == this von outer()
    }.call(otherThis);
}

```

## JS32 Ternärer Operator {#ternaerer-operator}

Der ternäre Operator (`condition ? expression1 : expression2`) soll verwendet werden, um einfache Bedingungen in einer einzigen Zeile zu schreiben.
Er ist einfach zu lesen und zu schreiben.
Er soll jedoch nicht geschachtelt werden, um die Lesbarkeit zu erhalten.
Verwende dann lieber `if...else`.

```javascript
const result = condition ? expression1 : expression2;
```

:::info Hinweis
Der ternäre Operator ist auch bekannt als bedingter Operator oder `Elvis Operator`.

`Ternär` bedeutet, dass der Operator drei Operanden hat: die Bedingung, den Ausdruck, der ausgeführt wird, wenn die Bedingung wahr ist, und den Ausdruck, der ausgeführt wird, wenn die Bedingung falsch ist.
:::

:::warning Komplexität

- Der ternäre Operator soll nicht verschachtelt werden, um die Lesbarkeit zu erhalten.
- Der ternäre Operator soll nur für kurze Ausdrücke verwendet werden.
- Bei komplexeren Bedingungen oder Ausdrücken ist es besser, `if...else` zu verwenden.
- Bei komplexeren Bedingungen oder Ausdrücken kann auch eine separate Funktion verwendet werden.
:::

## JS33 Array Prototype Methoden {#array-prototype-methoden}

Der Einsatz von Array-Methoden wie `map()`, `filter()`, `reduce()`, `find()`, `every()`, `some()` und anderen soll bevorzugt werden, um Arrays zu durchlaufen und Operationen auf den Elementen durchzuführen, um die Lesbarkeit und Wartbarkeit des Codes zu verbessern.

### JS33 Problem

Oftmals werden Schleifen verwendet, um Arrays zu durchlaufen und Operationen auf den Elementen durchzuführen.
Dies ist jedoch umständlich und unübersichtlich.

### JS33 Lösung

Array-Methoden wie `map()`, `filter()`, `reduce()`, `find()`, `every()`, `some()` und andere bieten eine elegante und effiziente Möglichkeit, Arrays zu durchlaufen und Operationen auf den Elementen durchzuführen.

Methode | Erklärung | Beispiel
--------|-----------|---------
`map()` | Erstellt ein neues Array, indem eine Funktion auf jedes Element angewendet wird. | `const doubled = [1, 2, 3].map(x => x * 2); // [2, 4, 6]`
`filter()` | Erstellt ein neues Array, das nur die Elemente enthält, für die die Funktion `true` zurückgibt. | `const evens = [1, 2, 3, 4].filter(x => x % 2 === 0); // [2, 4]`
`reduce()` | Wendet eine Funktion auf jedes Element des Arrays an, um ein einzelnes Ergebnis zu erzeugen. | `const sum = [1, 2, 3].reduce((acc, x) => acc + x, 0);// 6`
`find()` | Gibt das erste Element im Array zurück, für das die Funktion `true` zurückgibt. | `const even = [1, 2, 3].find(x => x % 2 === 0); // 2`
`every()` | Gibt `true` zurück, wenn die Funktion für jedes Element `true` zurückgibt. | `const allEven = [2, 4, 6].every(x => x % 2 === 0); // true`
`some()` | Gibt `true` zurück, wenn die Funktion für mindestens ein Element `true` zurückgibt. | `const hasEven = [1, 2, 3].some(x => x % 2 === 0); // true`
`findIndex()` | Gibt den Index des ersten Elements zurück, für das die Funktion `true` zurückgibt. | `const index = [1, 2, 3].findIndex(x => x % 2 === 0); // 1`
`indexOf()` | Gibt den Index des ersten Vorkommens eines Elements im Array zurück. | `const index = [1, 2, 3].indexOf(2); // 1`
`slice()` | Gibt eine flache Kopie eines Teils des Arrays zurück. | `const copy = [1, 2, 3].slice(1, 2); // [2]`
`splice()` | Ändert den Inhalt eines Arrays durch das Entfernen oder Ersetzen vorhandener Elemente und/oder das Hinzufügen neuer Elemente. | `const removed = [1, 2, 3].splice(1, 1); // [2]`
`entries()` | Gibt ein Array-Iterator-Objekt zurück, das Schlüssel/Wert-Paare für jedes Index/Element im Array enthält. | `for (const [index, value] of ['a', 'b'].entries()) { console.log(index, value); }`
`keys()` | Gibt ein Array-Iterator-Objekt zurück, das die Schlüssel für jeden Index im Array enthält. | `for (const index of ['a', 'b'].keys()) { console.log(index); }`
`values()` | Gibt ein Array-Iterator-Objekt zurück, das die Werte für jeden Index im Array enthält. | `for (const value of ['a', 'b'].values()) { console.log(value); }`

:::info Verkettung von Methoden

Operatoren können auch mit den Methoden kombiniert werden.
Beachte jedoch, dass die Ausdrücke nicht zu komplex werden sollen, um die Lesbarkeit zu erhalten.

```javascript
const sum = [1, 2, 3]
    .filter(x => x % 2 === 1)
    .map(x => x * 2)
    .reduce((acc, x) => acc + x, 0); // 8
```

Du kannst auch Methoden-Referenzen verwenden, um die Lesbarkeit zu verbessern.

```javascript
const divisibleByTwo = x => x % 2 === 0;
const addSum = (acc, x) => acc + x;

const sum = [1, 2, 3]
    .filter(divisibleByTwo)
    .map(x => x * 2)
    .reduce(addSum, 0); // 6
```

:::

### JS33 Weiterführende Literatur/Links

- [MDN Web Docs: Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

## JS34 Import/Export {#import-export}

Der `import`- und `export`-Mechanismus soll verwendet werden, um Module in JavaScript zu organisieren und zu verwalten.

### JS34 Benannter Export

Im folgenden Beispiel wird ein Export mit einem Namen definiert.

```javascript
// export.js
export const sum = (a, b) => a + b;
export const VALUE = 42;

// import.js
import { sum, VALUE } from './export.js';
```

### JS34 Default Export

Im folgenden Beispiel wird ein Export als Standard definiert.

```javascript
// export.js
const sum = (a, b) => a + b;
export default sum;

// import.js
import mySum from './export.js';
```

Beachte:

- Der importierte Name kann beliebig sein (`mySum`).
- Benannter und default Export können in einem Modul kombiniert werden.

```javascript
// export.js
export const sum = (a, b) => a + b;
export default const anotherSum = (a, b) => a + b;

// import.js
import mySum, { sum } from './export.js';
```

### JS34 Namespace-Import

Namespace-Import ermöglicht es, alle Exporte eines Moduls in einem Objekt zu importieren.

```javascript
// export.js
export const sum = (a, b) => a + b;
export const VALUE = 42;

// import.js
import * as myExports from './export.js';
console.log(myExports.sum(1, 2)); // 3
console.log(myExports.VALUE); // 42
```

### JS34 Aliase-Import

Du kannst auch Aliase für benannte Importe verwenden.

```javascript
import { sum as add, VALUE as NUMBER } from './export.js';
```

## JS35 Einsatz von Set und Map statt Arrays und Objekten {#einsatz-von-set-und-map-statt-arrays-und-objekten}

Seit ECMAScript 6 (ES6) gibt es die Datentypen `Set` und `Map`, die für die Verwaltung eindeutiger Werte und Schlüssel-Wert-Paare verwendet werden können.

`Map` ist ein Schlüssel-Wert-Datentyp, der es ermöglicht, Schlüssel und Werte zu speichern und abzurufen, ähnlich wie ein Objekt.
`Set` ist ein Datentyp, der es ermöglicht, eindeutige Werte zu speichern und abzurufen, ähnlich wie ein Array mit eindeutigen Werten oder ein Objekt mit eindeutigen Schlüsseln.

Verwende `Set` und `Map`, um eindeutige Werte und Schlüssel-Wert-Paare effizient und einfach zu verwalten, anstatt Arrays und Objekte zu verwenden.

### JS35 Problem

Arrays und Objekte werden oft für die Verwaltung von eindeutigen Werten und Schlüssel-Wert-Paaren verwendet.
Dies ist jedoch oftmals aufwändig und unübersichtlich und in anderen Sprachen gibt es spezielle Datentypen für diese Zwecke.
Oftmals entwickeln Entwickler eigene Lösungen, um eindeutige Werte oder Schlüssel-Wert-Paare zu verwalten.

### JS35 Lösung

Die Verwendung von `Set` und `Map` ermöglicht eine effiziente und einfache Verwaltung von eindeutigen Werten und Schlüssel-Wert-Paaren.

#### JS35 Set

```javascript
const uniqueNumbers = new Set([1, 2, 3, 1, 2, 3]);
console.log(uniqueNumbers); // Set { 1, 2, 3 }
```

#### JS35 Map

```javascript
const keyValuePairs = new Map([
    ['key1', 'value1'],
    ['key2', 'value2'],
    ['key3', 'value3']
]);
console.log(keyValuePairs); // Map { 'key1' => 'value1', 'key2' => 'value2', 'key3' => 'value3' }
```

:::details Komplexe Schlüssel

Maps können als Schlüssel, im Gegensatz zu Objekten, auch Objekte, Funktionen und andere komplexe Datentypen verwenden.

```javascript
const complexMap = new Map([
    [{ a: 1 }, 'value1'],
    [{ b: 2 }, 'value2'],
    [{ c: 3 }, 'value3']
]);
console.log(complexMap); // Map { { a: 1 } => 'value1', { b: 2 } => 'value2', { c: 3 } => 'value3' }
```

:::

### JS35 Weiterführende Literatur/Links

- [MDN Web Docs: Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
- [MDN Web Docs: Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)

## JS36 Abschließende Kommas {#abschliessende-kommas}

Trailing Commas sollen verwendet werden, um die Wartbarkeit des Codes zu erhöhen.

Trailing Commas sind Kommata, die am Ende von Arrays, Objekten, Funktionsparametern und Argumenten stehen.

### JS36 Problem

Das einfache und schnelle Hinzufügen oder Entfernen von Elementen oder Eigenschaften in Arrays oder Objekten kann zu Fehlern wegen fehlendem vorangestellten oder nachgestellten Komma führen.

Im folgenden Beispiel kann das Hinzufügen eines neuen Elements zu einem Array zu einem Fehler führen, wenn das Komma fehlt.

```javascript
const numbers = [
    { langerUndKomplexesObjekt: 'a' },
    { langerUndKomplexesObjekt: 'b' }   // Kein Komma am Ende
    // Füge neues Element hinzu
    { langerUndKomplexesObjekt: 'c' } // Fehler, Komma fehlt
];
```

### JS36 Lösung

Trailing Commas können verwendet werden, um das Hinzufügen oder Entfernen von Elementen oder Eigenschaften in Arrays oder Objekten zu erleichtern.

```javascript
const numbers = [
    { langerUndKomplexesObjekt: 'a' },
    { langerUndKomplexesObjekt: 'b' },  // Abschließendes Komma
];

// Füge neues Element hinzu
const numbers = [
    { langerUndKomplexesObjekt: 'a' },
    { langerUndKomplexesObjekt: 'b' },
    { langerUndKomplexesObjekt: 'c' },
];
```

:::info Unterstützter Syntax
Trailing Commas sind in Arrays, Objekten, Funktionsparametern, Funktionsargumenten und Import- und Export-Anweisungen sowie in Destrukturierungen erlaubt.
:::

:::warning JSON und Trailing Commas
Trailing Commas sind in JSON nicht erlaubt und können zu Syntaxfehlern führen.
:::

### JS36 Weiterführende Literatur/Links

- [MDN Web Docs: Trailing Commas](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Trailing_commas)

## JS37 for, forEach, for of, for in {#for-foreach-for-of-for-in}

In JavaScript gibt es verschiedene Möglichkeiten zu iterieren.

- `for`-Schleife ist die ursprüngliche Schleife
- `forEach`-Methode für Arrays mit Callback-Funktion
- `for...of`-Schleife für iterierbare Objekte (`Arrays`, `Strings`, `Sets`, `Maps`)
- `for...in`-Schleife für Objekte

Es soll die Methode verwendet werden, die am besten zur Aufgabe passt, um die Lesbarkeit und Wartbarkeit des Codes zu verbessern.

Vermische jedoch die Methoden nicht im gleichen (Funktions- oder Modul)Kontext, wenn es nicht unbedingt notwendig ist.

### JS37 for-Schleife

Die ursprüngliche `for`-Schleife ist die am meisten verwendete Schleife in JavaScript.
Sie besteht aus drei Teilen: Initialisierung, Bedingung und Inkrementierung/Dekrementierung.

```javascript
for (let i = 0; i < 5; i++) {
    console.log(i);
}
```

:::info Veraltet
Diese Schleife soll nur noch in Ausnahmefällen verwendet werden, wenn über ein Index ein Feld durchlaufen wird und beispielsweise der Index für Berechnungen benötigt wird.

Die `for...of`-Schleife ist andernfalls einfacher zu lesen.
:::

:::warning Objekte
Die `for`-Schleife kann auch für Objekte verwendet werden, um über die Schlüssel zu iterieren.
Es ist zu beachten, dass die Reihenfolge der Schlüssel nicht garantiert ist und auch Schlüssel aus dem Prototypen iteriert werden.
Deshalb muss mit `hasOwnProperty` geprüft werden, ob der Schlüssel direkt im eigenen Objekt vorhanden ist.
Andernfalls werden versehentlich auch Schlüssel aus dem Prototypen iteriert.

Nutze besser die `for...in`-Schleife.
:::

:::warning Unendliche Schleife
Die Schleife kann unendlich laufen, wenn die End-Bedingung nicht korrekt ist.

```javascript

for (let i = 0; i < 5; i--) {
    console.log(i);
}
```

:::

### JS37 forEach-Methode

Die `forEach`-Methode wird auf Arrays verwendet und führt eine Funktion für jedes Element im Array aus.

```javascript
const numbers = [1, 2, 3, 4, 5];
numbers.forEach((number) => {
    console.log(number);
});
// oder kürzer mit Methodenreferenz
numbers.forEach(console.log);
```

:::info Einsatzgebiet
Die `forEach`-Methode existiert für die Prototypen von `Array`, `Map`, `Set`, `String` und einigen mehr.
:::

### JS37 for...of-Schleife

Die `for...of`-Schleife (neu seit ES6) ist eine moderne Schleife, die für `Arrays`, `Strings`, `Sets`, `Maps` und andere iterierbare Objekte verwendet wird.

```javascript
const numbers = [1, 2, 3, 4, 5];

for (const number of numbers) {
    console.log(number);
}
```

Es kann auch Destrukturierung verwendet werden.

```javascript
const numbers = [[1, 2], [3, 4], [5, 6]];

for (const [first, second] of numbers) {
    console.log(first, second);
}
```

:::warning Objekte
Die `for...of`-Schleife kann nicht direkt auf Objekte verwendet werden, da diese nicht iterierbar sind.
:::

### JS37 for...in-Schleife

Die `for...in`-Schleife wird verwendet, um über die Schlüssel (und Werte) eines Objekts zu iterieren.

```javascript
const person = {
    name: 'Alice',
    age: 30
};

for (const key in person) {
    console.log(key, person[key]);
}
```

Mit Destrukturierung:

```javascript
for (const [key, value] of Object.entries(person)) {
    console.log(key, value);
}
```

### JS37 Weiterführende Literatur/Links

- [MDN Web Docs: for](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for)
- [MDN Web Docs: Array.prototype.forEach()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
- [MDN Web Docs: for...in](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in)
- [MDN Web Docs: for...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of)

## JS38 Methoden-Verkettung {#methoden-verkettung}

Die Methoden-Verkettung soll verwendet werden, um Methodenaufrufe auf einem Objekt in einer einzigen Anweisung zu verkettet.

Methoden-Verkettung ist eine Technik, bei der mehrere Methodenaufrufe auf einem Objekt in einer einzigen Anweisung verkettet werden.
Dies wird beispielsweise bei Array-Methoden wie `map()`, `filter()`, `reduce()` und anderen verwendet.

Verwende Methoden-Verkettung, um den Code kompakter und lesbarer zu machen.

### JS38 Beispiel

```javascript
const numbers = [1, 2, 3, 4, 5];

const sum = numbers
    .filter(x => x % 2 === 1)
    .map(x => x * 2)
    .reduce((acc, x) => acc + x, 0);
```

### JS38 Regeln

- Jeder Methodenaufruf wird auf einer neuen Zeile eingerückt (entsprechend den ESLint-Regeln).
- Jeder Methodenaufruf wird durch einen Punkt (`.`) **vorangehend** zum Methodennamen getrennt.
- Verschachtelung werden vermieden, um die Lesbarkeit zu erhalten, ggf. durch Methoden-Referenzen.

```javascript
const sum = numbers
    .filter(divisibleByTwo)
    .map(double)
    .reduce(addSum, 0);
```

### JS38 Vorteile

- Kompakter und lesbarer Code
- Einfache Verkettung von Methodenaufrufen
- Bessere Performance durch Vermeidung von Zwischenvariablen
- Einfache Wiederverwendung von Methodenketten

### JS38 Ausnahmen

- Übermäßige Verkettung von Methoden kann die Lesbarkeit beeinträchtigen.
- Bei komplexen Operationen oder Bedingungen ist es besser, die Methodenaufrufe aufzuteilen.
- Bei der Verkettung von Methoden ist darauf zu achten, dass die Reihenfolge der Methodenaufrufe korrekt ist.

## JS39 Unbenutzte Variablen und Parameter {#unbenutzte-variablen-und-parameter}

Es sollen keine unbenutzten Variablen und Parameter im Code vorhanden sein.

- Wenn die Funktionsdeklaration die Parameter vorschreibt, kann `_` als Platzhalter für unbenutzte Parameter verwendet werden.
- Mehrere unbenutzte Parameter können durch `(_, __, ___)` etc. gekennzeichnet werden.

:::details Linter bei Verwendung des Unterstrichs

Gegebenenfalls wird ein Linter bei der Verwendung des Unterstrichs als Platzhalter für unbenutzte Variablen oder Parameter eine Warnung ausgeben.
Dies kann in der Konfiguration des Linters deaktiviert werden.

Von [Stack Overflow](https://stackoverflow.com/questions/64052318/how-to-disable-warn-about-some-unused-params-but-keep-typescript-eslint-no-un)

```JSON
// .eslintrc.json
{
  // ...
  "rules": {
    // note you must disable the base rule
    // as it can report incorrect errors
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn", // or "error"
      {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "caughtErrorsIgnorePattern": "^_"
      }
    ]
  }
}
```

:::

### JS39 Problem

Unbenutzte Variablen und Parameter können zu Verwirrung und unerwartetem Verhalten führen.

Das Entfernen von unbenutzten Parametern ist jedoch auch nicht möglich, wenn die Parameter vorne deklariert sind, da dies zu einem Fehler führen würde.

Vererbung und Interfaces können auch unbenutzte Parameter erzeugen.

### JS39 Lösung

- Entferne alle Parameter, wenn keiner davon benutzt wird.
- Entferne den Parameter, wenn er eindeutig unbenutzt ist.
- Verwende `_` als Platzhalter für unbenutzte Variablen und Parameter, um den Code sauber zu halten.

```javascript

function sum(a, b, _) {
    return a + b;
}

```

### JS39 Vorteile

- Sauberer und wartbarer Code
- Vermeidung von Verwirrung und unerwartetem Verhalten
- Bessere Lesbarkeit und Verständlichkeit des Codes

### JS39 Nachteile

- Der Unterstrich kann zu Verwirrung führen, wenn er nicht als Platzhalter für unbenutzte Variablen oder Parameter verwendet wird.
- Spätere Erweiterungen der Funktion oder Methode lassen den Namen des originalen Parameters vermissen, wenn der Unterstrich verwendet wird.
**Bitte beachten**, dass eine Erweiterung einer vorhandenen Methode gegen das [OCP Prinzip](../../2.principles/principles#open-closed-principle) verstößt.

### JS39 Ausnahmen

- Bei bereits vorhandene Funktionen oder Methoden besteht die Gefahr, dass das entfernen eines Parameters und damit einer semantischen Änderung der Reihenfolge der Parameter zu Fehlern beim Aufruf von vorhandenen Code führt.

```javascript
function original(unusedParameter1, parameter2, parameter3) {
    // ...
}

function refactored(parameter2, parameter3) {
    // ...
}

// Aufruf irgendwo

original(1, 2, 3); // Fehler
```

## JS40 Verwende spezielle Objekte statt spezielle Werte {#verwende-spezielle-objekte-statt-spezielle-werte}

Wenn Objekte, wie `User` oder jede andere Art von Entität verwendet werden, und es spezielle Fälle gibt wie *nicht gefunden*, *ungültig*, *leer*, *fehlerhaft*, etc., dann sollen spezielle abgeleitete Objekte verwendet werden, um diese Fälle zu repräsentieren.

### JS40 Problem

Spezielle Fälle wie *nicht gefunden*, *ungültig*, *leer*, *fehlerhaft*, etc. werden oft durch spezielle Werte wie `null`, `undefined`, `-1`, `0`, `''`, `false`, etc. repräsentiert.
Dies führt dazu, dass im Code ständig überprüft werden muss, ob der Wert speziell ist und entsprechend behandelt werden muss.

Wird diese Prüfung nicht gemacht und vergessen, kommt es zu Fehlern wie `Null-Pointer-Exceptions`, `undefined is not a function`, `TypeError: Cannot read property '...' of null`, etc.
Diese Fehler sind schwer zu finden und zu beheben, da sie oft an einer anderen Stelle im Code auftreten, als wo der Fehler tatsächlich liegt.

```javascript
function getUser(id) {
    const user = getUserFromDatabase(id);

    if (user == null) {
        return null;
    }

    return user;
}
```

### JS40 Lösung

Verwende abgeleitete Objekte, um spezielle Fälle zu repräsentieren.
Es kann beispielsweise ein `NotFoundUser`-Objekt für den Fall eines nicht-gefundenen Benutzers erstellt werden.

Dieses *leere* Benutzer-Objekt verhält sich  **anders** im Vergleich zu einem *korrekten* Benutzer-Objekt.
So können damit keine Operationen durchgeführt werden, die nur für korrekte Benutzer erlaubt sind.

Die Prüfung auf einen *nicht-gefundenen* Benutzer kann durch Methoden des Objekts selbst erfolgen.
Sollte dieses Objekt doch einmal verwendet werden, so gibt nur dann eine Exception, wenn die Operation am Objekt nicht erlaubt ist.
Die Gültigkeit wird in operativen Methoden geprüft (siehe [Trennung von operationalem und integrativem Code](.#trennung-von-operationalem-und-integrativem-code)), so können Integrationsmethoden diese Werte einfach weitergeben.

Das folgende Beispiel zeigt die Verwendung eines speziellen Objekts `NotFoundEntity` für den Fall, dass eine Entität (ein generisches Beispiel-Daten-Objekt) nicht gefunden wurde.
Es werden keine Exceptions geworfen, sondern spezielle Objekte zurückgegeben, die spezielles Verhalten haben (`Polymorphismus`).
Wenn diese Objekte verwendet werden, wird das spezielle Verhalten automatisch ausgeführt.
In diesem Fall wird ein leeres Array zurückgegeben.
Alternativ kann auch ein Fehler geworfen werden, wenn das spezielle Objekt verwendet wird.

::: info Optional

Das spezielle Objekt [Optional](.#verwendung-von-optional-in-javascript-funktionen) kann auch verwendet werden, um diese spezielle Fälle zu repräsentieren.
Es ist nützlich, wenn bereits Klassen und Objekte aus einer Legacy-Anwendung verwendet werden, die nicht geändert werden können.

:::

```javascript

class NotFoundEntity extends Entity {
  static create() {
    // schützt vor Veränderung des Objekts
    return Object.freeze(new NotFoundEntity())
  }
  constructor() {
    super(-1, 'Unknown');
  }
  isValid() {
    return false;
  }
}

class Entity {
  static NOT_FOUND = NotFoundEntity.create();
  
  isValid() {
    return true;
  }
  // ...
}

// Methode braucht kein Exceptionhandling
function getEntityById(id) {
  if (id === 1) {
    return new Entity(1, 'Alice'); //oder Erstellung über Factory
  }
  // statt Exception
  return Entity.NOT_FOUND; // oder return Optional.empty();
}

function linesOfEntity(entity) {
  if (!entity.isValid()) {
    return new EmptyFoo();
  }
  return new Foo(entity);
}

function dataOfEntity(lines) {
  return new Data(lines.data);
}

function dataToArray(data) {
  return data.map(d => d.value);
}

function foo() {
  const entity = getEntityById(1);
  const linesOfEntity = linesOfEntity(entity);
  const data = dataOfEntity(linesOfEntity);

  return dataToArray(data);
}

// Alternativ mit Exception
function fooStrict() {
  const entity = getEntityById(1);

  if (!entity.isValid()) {
    throw new Error('Entity not found');
  }

  const linesOfEntity = linesOfEntity(entity);
  const data = dataOfEntity(linesOfEntity);

  return dataToArray(data);
}

```

### JS40 Vorteile

- Keine Null-Pointer-Exceptions
- Spezielle Fälle werden explizit repräsentiert.
- Unterscheidung zwischen verschiedenen Fällen durch unterschiedliches Verhalten und Objekte (statt `null`)
- Keine ständige Überprüfung auf spezielle Werte notwendig (wie `null`, `undefined`, `-1`, `0`, `''`, `false`, etc.)
- Code kann nicht fehlschlagen, weil keine spezielle Werte verwendet werden.
- Kein Exceptionhandling
  - Vermeidet verschachtelte try-catch-Blöcke
  - Testen von speziellem Verhalten wird einfacher oder braucht gar nicht mehr getestet zu werden, da es nichts zu testen gibt
  - API wird einfacher, da keine Exceptions geworfen werden müssen und Rückgabewerte immer gültig und prüfbar (`isValid()`) sind
- Code wird einfacher und lesbarer, da spezielle Fälle keine zusätzlichen `if`-Anweisungen benötigen.

### JS40 Nachteile

- Architektur der Klassen und Objekte wird komplexer oder vorhandene Architektur muss angepasst werden.
- Methoden müssen in ihrer Dokumentation nun statt Exceptions spezielle Objekte beschreiben.
- Spezielle Objekte müssen erstellt und gepflegt werden.
- Spezielle Objekte können zu einer größeren Anzahl von Klassen führen.
- Umstellung bestehender Code kann aufwändig sein.
- Exceptions sind in Fleisch und Blut der meisten Entwickler und werden oft als einfacher angesehen.
- Performance kann durch die Erstellung von speziellen Objekten beeinträchtigt werden, insbesondere da Pfade nicht mehr durch Prüfung von speziellen Werten abgekürzt werden könnten.

::: warning Anderes Vorgehen gleiche Wirkung

Der Einsatz von speziellen Werten wie `null` und `undefined` unterscheidet sich im Endergebnis nicht von speziellen Objekten.
Eine Prüfung muss früher oder später erfolgen, ob es sich um einen speziellen Fall handelt (`null` oder `isValid()`).

Jedoch ist in der Entwicklung oft die Situation gegeben, dass Entwickler einen Eingabewert **nicht** prüfen und es dadurch zu Fehlern kommt.
Durch den Einsatz von speziellen Objekten wird die Prüfung auf spezielle Werte automatisiert und der Code wird sicherer.
Erst sogenannte Kernfunktionen, die die speziellen Objekte verwenden, müssen die Prüfung dann durchführen.
Diese sind in der Regel besser getestet im Gegensatz zu den weiter oben in der Hierarchie liegenden Methoden.

Durch den Einsatz von speziellen Objekten wird es unwahrscheinlicher, dass Fehler wie `null`-Pointer-Exceptions oder `undefined`-Exceptions auftreten.

:::
