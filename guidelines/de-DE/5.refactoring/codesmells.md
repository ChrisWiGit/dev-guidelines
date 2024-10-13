---
layout: doc
outline: [2, 2]
---

# Code-Smells

## Einleitung {#einleitung}

Code-Smells sind Hinweise darauf, dass der Code refaktorisiert werden sollte.
Anhand von wiederkehrende Muster und Anzeichen können Code-Smells identifiziert werden.
Hier werden daher Beispiel für Code-Smells aufgeführt, die auf Probleme im Code hinweisen können.

## If-Statements {#if-statements}

### Negationen

::: code-group

```java [Negationen]
if (!data.isBlank()) {
  // do something
} else {
  // do something
}
```

```java [doppelte Negationen]
if (!data.isNotBlank()) {
  // do something
} else {
  // do something
}
```

```java [Unnötiger Vergleich]
if (data.isBlank() == false) {
  // do something
} else {
  // do something
}
```

:::

### Große If-Blöcke

```java [Große If-Blöcke]
if (...) {
  // ...
  // ...
  // ...
  // ...
  // ...
  // ...
  // ...
  // ...
  // ...
  // ...
  // ...
  // ...
  // ...
  // ...
  // ...
  // ...
  // ...
}
```

### Viele If-Statement

```java [Viele If-Statements]
if (...) {
  // do something
}
if (...) {
  // do something
}
if (...) {
  // do something
}
if (...) {
  // do something
}
if (...) {
  // do something
}
if (...) {
  // do something
}
```

### Tief oder mehrfach verschachtelte If-Statements

```java [Tief oder mehrfach verschachtelte If-Statements]
if (a == 1) {
  if (anotherValue === 0) {
    if (yetAnotherValue === 2) {
      // do something
      if (a === 2) {
        // do something
      }
    }
    // do something
  } else if (anotherValue === 1) {
    // do something
  } else {
    //..
  }
}
```

### Lange If-Statements

```java [Lange If-Statements]
if (a == 1 && b == 2 && c == 3 && d == 4 && e == 5 && f == 6) {
  // do something
}
```

### Komplexe Bedingungen

```java [Komplexe Bedingungen]
if ((a == 1 && anotherValue.data.equals("123")) || (a == 2 && anotherValue === 1)) {
  // do something
}
```

## Bezeichner

- Bezeichner ist zu kurz.
- Bezeichner ist unverständlich.
- Bezeichner ist mehrdeutig (z.B. `data`).
- Bezeichner ist in der falschen Sprache (Deutsch statt englisch).
- Bezeichner sagt nichts über den Inhalt oder Funktion aus (z.B. `temp`).
- Bezeichner einer Methode sagt nichts über die Ausführung aus (z.B. `doSomething`).
- Bezeichner lügt über den Inhalt (z.B. `isFinished` statt `isRunning`).
- Bezeichner lügt über den Datentyp (z.B. `numberOfSeconds` statt `numberOfMilliseconds`).
- Bezeichner entspricht nicht der Domänensprache.
- Bezeichner enthält Informationen wie Datentyp oder Klassenname (z.B. `intNumberOfDays`).
- Bezeichner hat einen Präfix oder Suffix (z.B. `m_` oder `_value`).
- Bezeichner enthält Schreibfehler (z.B. `nummberOfDays`, doppeltes `m`).
- Bezeichner verwendet Abkürzungen (z.B. `cnt` statt `count`).
- Bezeichner ist an der falschen Stelle deklariert (nicht in der Nähe der Verwendung).
- Bezeichner ist nicht im korrekten Format (z.B. camelCase, PascalCase, etc.)
- Bezeichner ist nicht konsistent (z.B. `get` und `set` Methoden).
- Bezeichner kann `null` sein, ohne dass dies im Namen erkennbar ist.

```java
int a = 1; // mehrdeutig, mehr Informationen
int intValue = 123;  // statt int numberOfDays = 123;
int containsMoney = 123;  // moneyAmountInCents
boolean length = true;  // statt isLength
boolean asterix = false; // statt isAsterix

class Testclassname { // statt TestClass
  static int maximumAmount = 100; // statt MAXIMUM_AMOUNT
  int testVariable = 1; // statt numberOfTests
}
```

## Feature-Neid

Eine Klasse verwendet viele Methoden oder Variablen einer anderen Klasse, um eine Aufgabe zu erledigen.

```java

void doSomething() {
  anotherClass.var = 42;
  anotherClass.var2 = 42;

  anotherClass.method1();
  anotherClass.method2();
  anotherClass.method3();
  anotherClass.method4();
  anotherClass.method5();
  anotherClass.method6();
  anotherClass.method7();
}

```

## elementare Datentypen

Oftmals werden elementare Datentypen verwendet, obwohl andere Datentypen oder Klassen passender wären.
Insbesondere String wird oft als Datentyp verwendet, was ein Code-Smell ist.

Beispiele sind:

- Datumswerte und Fest-/Fließkommazahlen sollen nicht als String, sondern als einen spracheigener Datentypen gespeichert werden.
- Geldbeträge sollen immer in Cent als ganze Zahl gespeichert werden, um Rundungsfehler zu vermeiden.
- Koordinaten sollen als eigener Datentyp gespeichert werden, und nicht durch die Verwendung von Arrays, Tupeln, Listen oder gar durch die Verknüpfung mit Bit-Operationen.
- Längen und Größen sollen einheitlich in einer grundlegenden Einheit gespeichert werden, um Rundungsfehler zu vermeiden.
- Viele elementare Werte sollen in eigenen Klassen gespeichert werden.

::: code-group

```java [Strings]
String date = "2021-01-01";
String amount = "42.42";
String coordinates = "42,42";
```

```java [Geldbeträge]
float amount = 42.3;
```

```java [Koordinaten]
int[] coordinates = {42, 42};
```

```java [Längen]
double lengthInMeters = 42.3;
```

:::

## Schleifen

### Schleifen mit viel Inhalt

```java
for (int i = 0; i < 10; i++) {
  // do something
  // do something
  // do something
  // do something
  // do something
  // do something
  // do something
  // do something
  // do something
  // do something
  // do something
}
```

### verschachtelte Schleifen

```java
while (condition) {
  while (condition2) {
    // do something
  }
}

for (int i = 0; i < 10; i++) {
  for (int j = 0; j < 10; j++) {
    for (int k = 0; k < 10; k++) {
      // do something
    }
  }
}
```

### Schleifen mit Seiteneffekten

```java
```

### Falsche eingesetzte Schleifen

```java
int i = 0;
while (i < 10) {
  val[i] = value;
}
```

statt

```java
for (int i = 0; i < 10; i++) {
  val[i] = value;
}

IntStream.range(0, 10).forEach(i -> val[i] = value);
```

## Switch-Statements

```java
switch (type) {
  ENUMTYPE1:
    // do something
    break;
  ENUMTYPE2:
    // do something
    break;
  //...
}
```

statt

```java
classType1.doSomething();
classType2.doSomething();
```

## Umfangreiche Klassen

Folgende Code-Smells können auf zu umfangreiche Klassen hinweisen:

- zu viele Methoden, die nicht zusammengehören und auf ein Ziel hinarbeiten
- viele statische Methoden, die eher Tools oder Helper-Funktionen sind
- Klassen mit Namen wie Helper, Util, Manager, Controller, etc. (`DataHelper`, `DataUtil`, etc.)

::: code-group

```java [Zu viele Methoden]
class MyClass {
  void method1() {
    // do something
  }

  void method2() {
    // do something
  }

  void method3() {
    // do something
  }

  void method4() {
    // do something
  }

  void method5() {
    // do something
  }
}
```

```java [Statische Methoden]
class MyClass {
  static void convertToJSON() {
    // do something
  }
  static void helpWith() {
    // do something
  }
}
```

:::

## Prüfung auf `null`

- Fehlende Prüfung auf `null`
- Rückgabe von `null` statt eines leeren Objekts
- Bezeichner enthält keine Information über die Möglichkeit von `null` (`data` statt `dataOrNull`)

```java




## Datenklassen

## Kommentare

Kommentare, die den Code erklären beschreiben, sind in der Regel überflüssig, da der Code selbst sprechen sollte.

