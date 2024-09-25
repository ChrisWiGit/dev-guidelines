---
# https://vitepress.dev/reference/default-theme-home-page
layout: doc
outline: [2, 2]
---

# Richtlinien für JavaScript und TypeScript

## Einleitung

Jede Richtliniennummer besteht aus dem Buchstaben **JS**(JavaScript oder Typescript) gefolgt von einer Nummer, die den Abschnitt identifiziert. Damit kann eine Regel eindeutig identifiziert werden, z.B. für ein Code-Review.

::: info
Wo notwendig, wird auf die Unterschiede zwischen JavaScript und TypeScript hingewiesen.
:::

::: info Typescript
Falls es erforderlich ist, wird in Zukunft Typescript in ein eigenes Regeldokument aufgeteilt.
:::

## JS1 Allgemeine Regeln

Es gelten die [Allgemeinen Regeln für Sprachen](../general).

## JS2 Anwendung von ES6 Features

Mit ES6 stehen viele neue Möglichkeiten zur Verfügung, um den Code zu verbessern.
Beispielsweise könnten Pfeilfunktionen, Template-Strings, Default-Parameter, Rest- und Spread-Operator, Destructuring-Zuweisungen, `const` und `let` anstelle von `var` für eine bessere Kontrolle des Scopings, Klassen, Module, Promises und Iteratoren verwendet werden, um den Code kürzer und leichter lesbar zu machen.

::: danger
`var` darf nicht verwendet werden.
Stattdessen sollen `const` und `let` verwendet werden, um die Sichtbarkeit von Variablen zu steuern.
:::

## JS3 Vermeidung von Callback-Hölle

Callbacks in Funktionsparameter und verschachtelte Callbacks sollen vermieden werden, da sie den Code schwer lesbar und wartbar machen.
Promises oder `async/await` können verwendet werden, um den asynchronen Code besser handhaben zu können.

```javascript
onCallMeBack(function(result) {
    onCallMeBackAgain(result, function(otherResult) {
        onCallMeBackYetAgain(otherResult, function(anotherResult) {
            // Code ausführen
        });
    });
});
```

Oder Promise-Chainings:

```javascript
promise.then(function(result) {
    return otherPromise.then(function(otherResult) {
        return anotherPromise.then(function(anotherResult) {
            // Code ausführen
        });
    });
})
```

stattdessen async/await verwenden:

```javascript
const result = await onCallMeBack();
const otherResult = await onCallMeBackAgain(result);
const anotherResult = await onCallMeBackYetAgain(otherResult);
```

und Promise.all:

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

## JS4 Verwendung von `const` und `let` anstelle von `var`

`var` soll nicht verwendet werden, da es zu unerwartetem Verhalten führen kann.

### JS4 Problem

`var` hat eine Funktionsscope und keine Blockscope, was zu unerwartetem Verhalten führen kann.

::: info
`Functionscope` bedeutet, dass die Variable innerhalb der gesamten Funktion von Anfang an sichtbar ist, auch wenn sie erst später deklariert wird (sogenanntes Hoisting).

`Blockscope` bedeutet, dass die Variable nur innerhalb des Blocks sichtbar ist, in dem sie deklariert wurde.
Blöcke werden mit geschweiften Klammern `{}` definiert, z.B. in If-Statements, Schleifen oder Funktionen.
:::

### JS4 Lösung

`const` und `let` haben einen Blockscope und sollten anstelle von `var` verwendet werden.

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

## JS5 Verwendung von `const` für alle Variablen in JavaScript und Kennzeichnung von Nicht-Konstanten

Um unbeabsichtigtes Ändern von Variablen zu vermeiden, sollte in JavaScript das Schlüsselwort `const` für alle Variablen verwendet werden.
In Fällen, in denen die Verwendung von `const` nicht möglich ist, sollte ein Kommentar mit dem Inhalt "nonconst" hinzugefügt werden.

### JS5 Problem

Die Verwendung von `const` sorgt dafür, dass Variablen nicht versehentlich geändert werden. Ohne die Verwendung von `const` besteht die Gefahr, dass Variablen unbeabsichtigt überschrieben werden.
Dies kann dazu führen, dass sich der Wert von Variablen, Attributen oder Parametern unerwartet ändert und dadurch unerwünschte Nebeneffekte auftreten können. Dies passiert beispielsweise dann, wenn die Variable, das Attribut oder der Parameter in einem anderen Teil des Codes nachträglich und von einer anderen Person unerwartet geändert wird.
Dadurch wird die Lesbarkeit und Nachvollziehbarkeit des Codes erschwert.

```javascript
let name = "John";
let age = 30;

// ...

name = "Jane"; // Unbeabsichtigte Änderung der Variable
```

### JS5 Lösung

Um unbeabsichtigtes Ändern von Variablen zu vermeiden, sollten alle Variablen mit `const` deklariert werden. In Fällen, in denen die Verwendung von `const` nicht möglich ist (z. B. bei Variablen, die sich ändern müssen), sollte ein Kommentar mit dem Inhalt "nonconst" hinzugefügt werden, um darauf hinzuweisen.

```javascript
const name = "John";
const age = 30;

// ...

// nonconst: Variable muss sich ändern
let count = 0;
count++;
```

### JS5 Vorteile

- Vermeidung unbeabsichtigter Änderungen von Variablen
- Klarheit in Bezug auf die Veränderlichkeit von Variablen
- Verbesserte Code-Qualität und Verständlichkeit

### JS5 Nachteile

Es gibt Situationen, in denen die Verwendung von `const` nicht möglich oder sinnvoll ist, z. B. bei Variablen, die sich ändern müssen oder in komplexen Legacy-Code.
In solchen Fällen kann die Kennzeichnung mit einem Kommentar "//nonconst" helfen, auf die Ausnahme hinzuweisen.

### JS5 Weiterführende Literatur/Links

- [MDN Web Docs: const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)
- [JavaScript: const, let, or var?](https://www.freecodecamp.org/news/var-let-and-const-whats-the-difference/)

## JS6 Einsatz von Linter und Formatter

Tools wie ESLint und Prettier können dabei helfen, den Code konsistent und fehlerfrei zu halten.

## JS7 Verwenden aussagekräftige Rückgabewerte und -typen

Wenn eine Methode einen Wert zurückgibt, sollte dieser Wert aussagekräftig sein und genau das darstellen, was die Methode tut.

### JS7 Problem

Oftmals spiegelt der Rückgabe-Wert einer Funktion nicht genau wider, was die Funktion tut.
Dies kann zu Verwirrung führen und die Lesbarkeit und Wartbarkeit des Codes beeinträchtigen.

Im folgenden Beispiel wird ein Benutzer-Objekt geprüft, jedoch ein String zurückgegeben anstatt eines booleschen Wertes.

```javascript
function validate(user) {
    if (user !== null && user !== undefined) {
        return "valid";
    } 

    return "invalid";
}
```

### JS7 Lösung

Es können unterschiedliche Ansätze verwendet werden, um aussagekräftige Rückgabewerte und -typen zu verwenden:

- Verwendung von booleschen Werten (`true`/`false`) für Ja/Nein-Entscheidungen
- Verwendung von spezifischen Werten wie `Symbol`, um den Status oder das Ergebnis einer Operation darzustellen

### JS7 Regeln für Rückgabewerte mit undefined

- Eine Funktion soll nie undefined zurückgeben, sondern immer einen Wert oder ein Objekt, das den Status des Ergebnisses darstellt.
- Jeder Ablaufpfad in einer Funktion muss ein return-Statement haben, um sicherzustellen, dass immer ein Wert zurückgegeben wird.
- Statt undefined kann auch Optional oder ein anderes Objekt verwendet werden, um den Status des Ergebnisses zu kennzeichnen.
Siehe dazu auch [JS15 Verwendung von `Optional` in JavaScript-Funktionen](.#js15-verwendung-von-optional-in-javascript-funktionen).

Beispiel:

```javascript
function findUserById(id) {
  const user = db.findUser(id);
  if (user) {
    return user;
  }
  return undefined;
  // statt dessen eine Exception werfen oder ein Optional-Objekt zurückgeben
  throw new UserNotFound('User not found');
}
```

## JS8 Optionaler Operator ?. / Optional Chaining verwenden

Der optionale Operator `?.` oder Optional Chaining ermöglicht den Zugriff auf Unterschlüssel, ohne explizit auf `null` oder `undefined` prüfen zu müssen.

> Alternativ kann auch das [JS15 Verwendung von `Optional` in JavaScript-Funktionen](.#js15-verwendung-von-optional-in-javascript-funktionen). verwendet werden.

### JS8 Probleme

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

### JS8 Lösung

Um den Code übersichtlicher und robuster zu gestalten, kann der optionale Operator `?.` (Optional Chaining) verwendet werden. Dieser Operator prüft automatisch, ob der vorherige Schlüssel existiert, und greift nur dann auf den nächsten Schlüssel zu, wenn er vorhanden ist.
Sollte ein Schlüssel nicht existieren, wird keine weitere Aktion ausgeführt und das Ergebnis ist `undefined`.

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

### JS8 Vorteile

- Vereinfachung des Codes durch Reduzierung von redundanten `if`-Bedingungen
- Lesbarkeit und Wartbarkeit des Codes werden verbessert
- Verringertes Risiko von Fehlern durch Vergessen oder falsche Anwendung von `null`- oder `undefined`-Prüfungen

### JS8 Nachteile

- Keine direkte Unterstützung in älteren JavaScript-Versionen (vor ECMAScript 2020)
- Verwendung des optionalen Operators kann dazu führen, dass Fehler später erkannt werden, da `undefined`-Werte nicht sofort als solche erkannt werden

### JS8 Weiterführende Informationen

Weitere Informationen zur Verwendung des optionalen Operators `?.` oder Optional Chaining in JavaScript findest du in der [Mozilla Developer Network (MDN) Dokumentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining). Dort werden die Funktionsweise und die verschiedenen Anwendungsfälle ausführlich erläutert.

## JS9 Auf null und undefined prüfen

Bei der Überprüfung auf `null` oder `undefined` ist es wichtig, die korrekte Überprüfung durchzuführen, da andernfalls unerwartet auch Werte wie 0, "", oder false fälschlicherweise als falsy-Werte erkannt werden können.

### JS9 Problem

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

### JS9 Lösung

Um sicherzustellen, dass **nur** `null` oder `undefined` erkannt werden und andere falsy-Werte ausgeschlossen werden, kann die folgende Überprüfung verwendet werden:

```javascript
if (myObject == null) {
    //myObject === null oder
    //myObject === undefined
}
```

Die Verwendung von zwei Gleichheitszeichen `==` anstelle von drei `===` ist hierbei wichtig, da so `undefined` und `null` erkannten werden.

### JS9 Vorteile

- Korrekte Überprüfung auf `null` oder `undefined`
- Vermeidung von unerwarteten Fehlern durch falsche Erkennung von falsy-Werten

### JS9 Nachteile

- Werte wie NaN werden nicht erkannt
- ESLint muss entsprechend konfiguriert werden, um die Verwendung von `==` bei null Vergleich zu erlauben. Dies ist möglich, indem die Regel `eqeqeq` auf [smart](https://eslint.org/docs/latest/rules/eqeqeq#smart) umgestellt wird.

## JS10 Object destructuring / Object Eigenschaften bekommen

Beim Object Destructuring werden die Eigenschaften eines Objekts in einzelne Variablen aufgeteilt und gespeichert.

### JS10 Problem

```javascript
const car = {
    speed: 10,
    color: "red"
}

const speed = car.speed;
const color = car.color;
```

### JS10 Lösung

Um den Code zu vereinfachen und die Eigenschaften eines Objekts direkt in Variablen zu speichern, kann das Object Destructuring verwendet werden:

```javascript
const car = {
    speed: 10,
    color: "red"
}

const { speed, color } = car;
```

### JS10 Vorteile

- Kürzerer und lesbarerer Code
- Direkter Zugriff auf die gewünschten Eigenschaften des Objekts

## JS11 Verwendung von async und await

Die Verwendung von `async` und `await` bietet eine elegante Möglichkeit, asynchrone Funktionen in JavaScript zu schreiben und zu verwalten.

### JS11 Problem

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

### JS11 Lösung

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

### JS11 Vorteile

- Lesbarer und verständlicher Code
- Reduzierung der Verschachtelung von Callbacks ("Callback-Hell")
- Einfachere Fehlerbehandlung durch Verwendung von `try-catch`-Blöcken
- Bessere Kontrolle über asynchrone Abläufe und Reihenfolge der Operationen
- Einfachere Fehlerbehandlung

### JS11 Nachteile

- Verwendung von `async` und `await` erfordert ECMAScript 2017 (ES8) oder höher
- Exception-Handling ist notwendig.

### JS11 Weiterführende Literatur/Links

- [Async functions - MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)

## JS12 Guard Pattern

Das Guard Pattern ist eine Best Practice, um die Lesbarkeit und Robustheit von Code zu verbessern, insbesondere bei Bedingungsprüfungen.

### JS12 Problem

In JavaScript müssen oft komplexe Bedingungen geprüft werden, um unerwünschte Ausführungszweige zu verhindern oder ungültige Eingaben abzufangen. Dies kann zu verschachteltem Code führen, der schwer zu lesen und zu warten ist.

```javascript
function processInput(input) {
    if (input !== null && input !== undefined && input !== '') {
        // Code zur Verarbeitung des Eingabewerts
    }
}
```

### JS12 Lösung

Das Guard Pattern ermöglicht es uns, Bedingungsprüfungen klarer und lesbarer zu gestalten, indem wir unerwünschte Fälle frühzeitig abfangen und beenden.

```javascript
function processInput(input) {
    if (input == null || input === '') {
        return;
    }

    // Code zur Verarbeitung des Eingabewerts
}
```

### JS12 Vorteile

- Verbesserte Lesbarkeit des Codes durch eine klare und frühzeitige Abhandlung unerwünschter Fälle
- Reduzierung der Verschachtelung von Bedingungsprüfungen
- Einfache Erweiterbarkeit und Wartbarkeit des Codes

### JS12 Weiterführende Literatur/Links

- [Guard Clause Pattern - Refactoring.Guru](https://refactoring.guru/smells/guard-clauses)

## JS13 Positiv formulierte If-Bedingungen und Auslagerung komplexer Bedingungen

Positiv formulierte If-Bedingungen und die Auslagerung komplexer Bedingungen in temporäre Variablen verbessern die Lesbarkeit und Wartbarkeit des Codes.

> Die Aufsplittung von If-Bedingungen ist sehr abhängig vom Verständnis des Entwicklers und sollte mit Sinn und Verstand eingesetzt werden.
>
### JS13 Problem

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

### JS13 Lösung

Durch die positive Formulierung der Bedingungen und die Auslagerung komplexer Ausdrücke in temporäre Variablen wird der Code lesbarer und verständlicher.

> Die Aufsplittung von If-Bedingungen ist sehr abhängig vom Verständnis des Entwicklers und sollte mit Sinn und Verstand eingesetzt werden.

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

### JS13 Vorteile

- Verbesserte Lesbarkeit des Codes durch positiv formulierte Bedingungen
- Reduzierung der Verschachtelung und Komplexität von If-Anweisungen
- Bessere Wartbarkeit des Codes durch klare und beschreibende Variablen

### JS13 Nachteile

- Alternativ kann ein Kommentar die If-Bedingung beschreiben, aber bei einer Änderung muss daran gedacht werden auch den Kommentar anzupassen.
- Das Auslagern von Bedingungen in temporäre Variablen kann zu einem erhöhten Speicherverbrauch führen, insbesondere bei komplexen Ausdrücken. Dies ist normalerweise vernachlässigbar, kann jedoch in speziellen Situationen berücksichtigt werden.

### JS13 Ausnahmen

Es gibt Fälle, in denen das Auslagern von Bedingungen in temporäre Variablen nicht sinnvoll ist, z. B. wenn die Bedingung nur an einer Stelle verwendet wird und keine weitere Klarheit oder Wartbarkeit gewonnen wird.

### JS13 Weiterführende Literatur/Links

- [The Art of Readable Code - Simple Conditionals](https://www.amazon.com/dp/0596802293)
- [Clean Code: A Handbook of Agile Software Craftsmanship](https://www.amazon.com/dp/0132350882)

## JS14 Begrenzte Zeilenanzahl in Methoden/Funktionen

Die Begrenzung der Anzahl von Codezeilen in Methoden und Funktionen verbessert die Lesbarkeit, Wartbarkeit und Verständlichkeit des Codes. Es ermöglicht auch eine bessere Testbarkeit des Codes.

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

Um die Lesbarkeit und Verständlichkeit des Codes zu verbessern, sollten Methoden und Funktionen auf eine begrenzte Anzahl von Zeilen beschränkt sein. Komplexe Aufgaben sollten in kleinere Teilfunktionen ausgelagert werden, um die Verantwortlichkeiten klarer zu trennen.

> Die Anzahl von Zeilen sollte allgemein so klein wie möglich gehalten werden. Sie sollte allerdings nie über eine Bildschirmhöhe hinausgehen, d.h. mehr als 25 Zeilen sollten vermieden werden.

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

8. **Förderung des Single Responsibility Principle**: Kleine Methoden unterstützen das Single Responsibility Principle, das besagt, dass eine Methode oder Funktion nur eine einzige Verantwortlichkeit haben sollte. Durch die Aufteilung des Codes in kleine Methoden wird die Verantwortlichkeit klarer definiert und das Prinzip der klaren Trennung von Aufgaben eingehalten.
:::

Die Verwendung kleiner Methoden verbessert die Qualität und Wartbarkeit des Codes, indem sie die Testbarkeit, Lesbarkeit, Wiederverwendbarkeit und Modularität fördern.
Es ist jedoch wichtig, ein Gleichgewicht zu finden, um eine übermäßige Fragmentierung des Codes zu vermeiden und die Lesbarkeit nicht zu beeinträchtigen.

::: info
Siehe zu Prinzipien und Vorteilen auch [Prinzipien der Softwareentwicklung](../../2.principles/principles.md).
:::

### JS14 Nachteile

- Die strikte Begrenzung der Zeilenanzahl kann zu einer übermäßigen Fragmentierung des Codes führen, wenn kleinere Methoden oder Funktionen unnötig erstellt werden.

### JS14 Ausnahmen

Die Anzahl der Codezeilen in einer Methode oder Funktion kann je nach Kontext und Komplexität des Codes variieren. Es ist wichtig, das Gleichgewicht zwischen einer angemessenen Zeilenzahl und einer klaren, verständlichen und wartbaren Struktur zu finden.

## JS15 Verwendung von `Optional` in JavaScript-Funktionen

Eine Funktion sollte niemals `null`, `undefined` oder `NaN` zurückgeben und stattdessen die `Optional`-Klasse verwenden, um den Status des Ergebnisses zu kennzeichnen.

### JS15 Problem

Das Zurückgeben von `null`, `undefined` oder `NaN` aus einer Funktion kann zu Fehlern führen, insbesondere wenn nicht überprüft wird, ob das Ergebnis vorhanden ist oder nicht.

```javascript
function divide(a, b) {
  if (b !== 0) {
    return a / b;
  }
  return null;
}
```

### JS15 Lösung

Die Verwendung des `Optional`-Objekts ermöglicht es uns, den Status des Ergebnisses klar zu kennzeichnen, anstatt `null`, `undefined` oder `NaN` zurückzugeben.

```javascript
function divide(a, b) {
  if (b !== 0) {
    return Optional.of(a / b);
  }

  return Optional.empty();
}
```

### JS15 Vorteile

- Klarere Kennzeichnung des Zustands des Ergebnisses durch Verwendung von `Optional`
- Bessere Fehlervermeidung durch explizite Behandlung von leeren Ergebnissen
- Verbesserte Lesbarkeit des Codes durch den Verzicht auf `null` oder `undefined`

### JS15 Nachteile

- Zusätzlicher Overhead durch die Verwendung von `Optional`
- Potenziell erhöhter Komplexitätsgrad in der Verwendung des `Optional`-Objekts
- Abhängigkeit von der Implementierung der `Optional`-Klasse

### JS15 Ausnahmen

Die Verwendung von `Optional` in JavaScript ist eine Designentscheidung und keine Sprachfunktion. Es ist optional und sollte basierend auf den Anforderungen des Projekts und der Teampräferenz eingesetzt werden.

### JS15 Weiterführende Literatur/Links

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

## JS16 Verwendung der npm-Bibliothek optional.js zur Rückgabe von Optional in JavaScript

Es ist einfach in JavaScript, die npm-Bibliothek optional.js zu verwenden, um die Rückgabe von Optional-Objekten anstelle von null oder anderen Fehlertypen zu ermöglichen.
Durch die Verwendung von Optional-Objekten wird deutlich, dass eine Funktion möglicherweise keinen Wert zurückgibt und ermöglicht eine bessere Behandlung von optionalen Werten.

### JS16 Problem

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

### JS16 Lösung

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

### JS16 Vorteile

- Bessere Behandlung von optionalen Werten durch die Verwendung von Optional-Objekten
- Explizite Kennzeichnung des Fehlens eines Werts
- Einfachere Überprüfung des Vorhandenseins eines Werts und Zugriff auf den Wert mit den Methoden von Optional

### JS16 Nachteile

- Einführung einer zusätzlichen Abhängigkeit durch die Verwendung der optional.js-Bibliothek
- API Methoden, die optional.js-Bibliothek verwenden erfordern, dass Nutzer der API die optional.js-Bibliothek einbinden, kennen und verwenden müssen.

### JS16 Ausnahmen

Es kann Situationen geben, in denen die Verwendung der optional.js-Bibliothek nicht angemessen ist, z. B. wenn das Projekt bereits eine andere Lösung für die Behandlung von optionalen Werten verwendet oder wenn die Einführung einer zusätzlichen Abhängigkeit vermieden werden soll.

### JS16 Weiterführende Literatur/Links

- [optional.js - npm](https://www.npmjs.com/package/optional-js)
- [Avoiding Null in JavaScript: An Introduction to Optional Values](https://dev.to/marcellomontemagno/avoiding-null-in-javascript-an-introduction-to-optional-values-4m22)

## JS17 If-Bedingungen ohne Else und mit Return

If-Bedingungen, die ein Return enthalten, sollten kein else enthalten, um die Lesbarkeit des Codes zu verbessern und die Verschachtelung von Bedingungen zu reduzieren.

### JS17 Problem

If-Bedingungen mit einem Return und einem dazugehörigen else-Block können die Lesbarkeit des Codes beeinträchtigen und zu unnötiger Verschachtelung führen.

```java
public int calculate(int x) {
    if (x > 0) {
        return x * 2;
    } else {
        return x;
    }
}
```

```javascript
function calculate(x) {
    if (x > 0) {
        return x * 2;
    } else {
        return x;
    }
}
```

### JS17 Refactoring

Durch Entfernen des else-Blocks und direktes Rückgabestatement wird der Code lesbarer und die Verschachtelung von Bedingungen reduziert.

```java
public int calculate(int x) {
    if (x > 0) {
        return x * 2;
    }
    return x;
}
```

```javascript
function calculate(x) {
    if (x > 0) {
        return x * 2;
    }
    return x;
}
```

### JS17 Vorteile

- Verbesserte Lesbarkeit und Klarheit des Codes
- Reduzierung der Verschachtelung von Bedingungen
- Vereinfachte Struktur und Fluss des Codes

### JS17 Weiterführende Literatur/Links

- [Clean Code: A Handbook of Agile Software Craftsmanship](https://www.amazon.com/dp/0132350882)
- [JavaScript: The Good Parts](https://www.amazon.com/dp/0596517742)

## JS18 Exceptions in JavaScript nicht einfach loggen und unverändert wieder werfen

Exceptions sollten in JavaScript nicht einfach nur geloggt und unverändert wieder geworfen werden.
Stattdessen ist es wichtig, Exceptions sinnvoll zu behandeln und angemessene Maßnahmen zu ergreifen.
Entweder wird die Exception geloggt und behandelt oder in eine andere Form umgewandelt und geworfen.

### JS18 Problem

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

### JS18 Lösung

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

### JS18 Vorteile

- Klare Behandlung und Reaktion auf Exceptions
- Verbesserte Fehlerbehandlung und Debugging-Möglichkeiten
- Besseres Verständnis der Ursachen von Fehlern

### JS18 Ausnahmen

In einigen Fällen kann es sinnvoll sein, Exceptions zu loggen und unverändert wieder zu werfen. Dies ist jedoch eher die Ausnahme und sollte gut begründet sein, z.B. wenn der Code in einem bestimmten Kontext läuft, der spezielle Anforderungen hat.

### JS18 Weiterführende Literatur/Links

- [Exception Handling Best Practices in JavaScript](https://www.toptal.com/javascript/exception-handling-javascript-best-practices)
- [JavaScript Error Handling: Best Practices](https://blog.bitsrc.io/javascript-error-handling-best-practices-329c5f6e5d33)

## JS20 Methoden/Funktionen sollten niemals null zurückgeben, sondern immer eine leere Liste, HashMap oder Array

Es ist eine bewährte Praxis in Java und JavaScript, dass Methoden/Funktionen, die Listen, Hashmaps oder Arrays zurückgeben, niemals null zurückgeben sollten. Stattdessen sollte immer eine leere Liste, HashMap oder ein leeres Array zurückgegeben werden.

### JS20 Problem

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

### JS20 Lösung

Um Zugriffsfehler und unerwartetes Verhalten zu vermeiden, sollten Methoden/Funktionen stattdessen ein leeres Objekt oder Array zurückgeben.

- Alternativ kann auch der [Optional-Operator](.#js8-optionaler-operator-optional-chaining-verwenden) `.?` verwendet werden..
- Alternativ kann auch das [Optional-Objekt](.#js15-verwendung-von-optional-in-javascript-funktionen) verwendet werden.

```javascript
function getNames() {
    if (condition) {
        return [];
    }
    // ... return xy
}
```

### JS20 Vorteile

- Vermeidung von Zugriffsfehlern und unerwartetem Verhalten
- Einfachere Handhabung und weniger Überprüfungen auf null im Aufrufercode
- Verbesserte Robustheit und Stabilität des Codes

### JS20 Ausnahmen

Es kann Situationen geben, in denen die Rückgabe von null sinnvoll ist, z. B. wenn null einen speziellen Zustand oder eine Bedeutung hat.
In solchen Fällen ist es wichtig, die Dokumentation klar zu kommunizieren und sicherzustellen, dass der Aufrufercode angemessen darauf reagiert.

### JS20 Weiterführende Literatur/Links

- [Effective Java: Item 54 - Return Empty Arrays or Collections, Not Nulls](https://www.amazon.com/dp/0321356683)
- [Null or Empty Collection in Java](https://www.baeldung.com/java-null-empty-collection) (für Java)
- [Avoiding Null in JavaScript](https://dmitripavlutin.com/avoid-null-undefined-javascript/) (für JavaScript)

## JS21 Benennung von Methoden mit verschiedenen Präfixen für Synchronität und Ergebnisverhalten

Es ist eine bewährte Praxis bei der Benennung von Methoden in JavaScript und Java, unterschiedliche Präfixe zu verwenden, um die Synchronität und das Ergebnisverhalten der Methode zu kennzeichnen. Das Präfix "get" sollte für synchronen Zugriff verwendet werden und immer einen Wert zurückgeben, während die Präfixe "fetch" oder "request" für asynchronen Zugriff stehen, der länger dauern und auch fehlschlagen kann.

### JS21 Problem

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

### JS21 Lösung

Um die Synchronität und das Ergebnisverhalten einer Methode klarer zu kennzeichnen, sollten unterschiedliche Präfixe verwendet werden. Das Präfix "get" sollte für synchronen Zugriff verwendet werden und immer einen Wert zurückgeben. Die Präfixe "fetch" oder "request" sollten für asynchronen Zugriff stehen, der länger dauern und auch fehlschlagen kann.

> get-Präfixe sollten nie async sein, dagegen sollten fetch- oder request- Präfixe immer async sein.

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

### JS21 Vorteile

- Klare und eindeutige Benennung, die die Synchronität und das Ergebnisverhalten einer Methode widerspiegelt
- Verbesserte Lesbarkeit und Verständlichkeit des Codes
- Einfachere Fehlersuche und Debugging-Möglichkeiten

### JS21 Ausnahmen

Es kann Situationen geben, in denen die Verwendung von anderen Präfixen oder Benennungsmustern angemessen ist, abhängig von den spezifischen Anforderungen und Konventionen des Projekts.
Es ist wichtig, einheitliche Benennungsstandards innerhalb des Projekts festzulegen und zu dokumentieren.

### JS21 Weiterführende Literatur/Links

- [Method Naming Conventions in Java](https://www.baeldung.com/java-method-naming-conventions)
- [JavaScript Naming Conventions](https://www.robinwieruch.de/javascript-naming-conventions)

## JS22 JSDoc Kommentare für JavaScript-Methoden, Funktionen, Variablen, Objekte und Typen

Methoden, Funktionen, Variablen, Objekte und Typen in JavaScript sollten mit JSDoc-Kommentaren annotiert werden, um eine klare Dokumentation und Typisierung der Parameter und des Rückgabewerts zu ermöglichen.

### JS22 Problem

JavaScript ist eine dynamisch typisierte Sprache, was zu einer geringeren Typsicherheit und Dokumentation führen kann.
Parameter, Variablen und Rückgabewerte von Methoden und Funktionen sind nicht explizit typisiert und dokumentiert, was zu Verwirrung und Fehlern führen kann.

### JS22 Lösung

Die Verwendung von JSDoc-Kommentaren ermöglicht es uns, Methoden, Funktionen, Variablen, Objekte und Typen in JavaScript klar zu dokumentieren und zu typisieren.
Auf diese Art können auch Objekte und jede andere Art von Datenstrukturen dokumentiert werden.

:::info
Moderne Entwicklungsumgebungen und Tools wie Visual Studio Code, WebStorm und ESLint unterstützen JSDoc-Kommentare und bieten Funktionen wie Autovervollständigung, Typüberprüfung und Dokumentation.
Diese Tools melden Probleme bei inkompatiblen Typen und fehlenden Parametern oder Rückgabewerten.
:::

### JS22 Beispiele

#### Methoden und Funktionen

:::warning Beachte!
JSDoc-Kommentare beginnen mit `/**` und enden mit `*/`.
Jede Zeile innerhalb des Kommentars beginnt mit `*`.
:::

```javascript
/**
 * Berechnet die Summe von zwei Zahlen.
 * @param {number} x - Die erste Zahl.
 * @param {number} y - Die zweite Zahl.
 * @param {number} [offsetDefault=1] - Der Standardwert, falls der Parameter fehlt.
 * @returns {number} Die Summe der beiden Zahlen. 
 */
function add(x, y, offsetDefault=1)
```

#### Variablen

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

#### Objekte deklarieren

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

#### Typen definieren

Wenn ein Objekt mehrmals verwendet wird, kann der Typ mit `@typedef` definiert werden.

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

### JS22 Siehe dazu

Die vollständige Dokumentation von [JSDoc @type](https://jsdoc.app/tags-type#:~:text=The%20%40type%20tag%20allows%20you,such%20as%20the%20%40param%20tag.) erklärt die verschiedenen Tags und ihre Verwendung:

## Variable Parameter in Funktionen oder Methoden vermeiden

## Boolean-Parameter in Funktionen oder Methoden vermeiden

Boolean als Parameter in Funktionen oder Methoden sollen nicht verwendet werden. 
Stattdessen sollen eigene Funktionen oder Methoden mit entsprechenden Namen und Parametern erstellt werden, weil damit das Verhalten der Funktion oder Methode klarer wird.

### Problem

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

### Lösung

Verwende stattdessen spezifische Parameter oder separate Funktionen/Methoden, um das Verhalten klarer zu kennzeichnen.

```javascript
function fetchAsyncData(url) {
  // Asynchroner Aufruf
}

function fetchData(url) {
  // Synchroner Aufruf
}
```


## Default Parameter in Funktionen oder Methoden

Default Parameter in Funktionen oder Methoden sollen nicht verwendet werden.

### Problem

Default Parameter in Funktionen oder Methoden können zu unerwartetem Verhalten führen, wenn der Aufrufer den Standardwert nicht erwartet oder überschreibt.

```javascript
function increment(value, step = 10) {
  return value + step;
}
```

### Lösung

Verwende stattdessen separate Funktionen oder Methoden mit spezifischen Parametern, um das Verhalten klarer zu kennzeichnen.

```javascript
function incrementValueBy(value, step) {
  return value + step;
}

function incrementByTen(value) {
  return increment(value, 10);
}
```

## Template Strings

::: info
In Bearbeitung
:::

Nutze Template Literals (`` ` ``) für die einfache Einbettung von Variablen in Strings.

## Spread-Operator

::: info
In Bearbeitung
:::

Nutze den Spread-Operator (`...`) für das Zusammenführen von Arrays oder das Kopieren von Objekten.

## Arrow Funktion statt `function`

::: info
In Bearbeitung
:::

Verwende Arrow Functions (`() => {}`) für eine kürzere und prägnantere Schreibweise von Funktionen. Vermeide `me = this`.

## "Ternärer Operator ?:"

::: info
In Bearbeitung
:::

Verwende den ternären Operator (`condition ? expression1 : expression2`) für kurze bedingte Ausdrücke.

## Array Prototype Methoden

::: info
In Bearbeitung
:::

Verwende `Array.prototype.forEach()`, `Array.prototype.map()`, `Array.prototype.filter()` und andere Array-Methoden anstelle von Schleifen, um den Code lesbarer zu machen.

## Import/Export

::: info
In Bearbeitung
:::

Nutze den `import`- und `export`-Mechanismus für die Modulorganisation in deinem Code.

## Einsatz von Set und Map statt Arrays und Objekten

::: info
In Bearbeitung
:::

Verwende `Set` und `Map` für die Verwaltung eindeutiger Werte und Schlüssel-Wert-Paare.

## for, forEach, for of, for in

In JavaScript gibt es verschiedene Möglichkeiten zu iterieren.

- `for`-Schleife ist die ursprüngliche Schleife
- `forEach`-Methode für Arrays mit Callback-Funktion
- `for...of`-Schleife für iterierbare Objekte (`Arrays`, `Strings`, `Sets`, `Maps`)
- `for...in`-Schleife für Objekte

### for-Schleife

Die ursprüngliche `for`-Schleife ist die am meisten verwendete Schleife in JavaScript.
Sie besteht aus drei Teilen: Initialisierung, Bedingung und Inkrementierung/Dekrementierung.

```javascript
for (let i = 0; i < 5; i++) {
    console.log(i);
}
```

:::info Veraltet
Diese Schleife sollte nur noch in Ausnahmefällen verwendet werden, wenn über ein Index ein Feld durchlaufen wird und beispielsweise der Index für Berechnungen benötigt wird.

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

### forEach-Methode

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

### for...of-Schleife

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

### for...in-Schleife

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

### Weiterführende Literatur/Links

- [MDN Web Docs: for](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for)
- [MDN Web Docs: Array.prototype.forEach()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
- [MDN Web Docs: for...in](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in)
- [MDN Web Docs: for...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of)
