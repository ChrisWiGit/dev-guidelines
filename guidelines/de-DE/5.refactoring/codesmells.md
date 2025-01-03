---
layout: doc
outline: [2, 2]
---
<!-- MD024 = Multiple headers with the same content -->
<!-- markdownlint-disable MD024 -->
# Code-Smells

## Einleitung {#einleitung}

Code-Smells sind Hinweise darauf, dass der Code [refaktorisiert](../5.refactoring/general) werden sollte.
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

#### Refactoring

- Bedingungen tauschen.
- Bedingungen in sprechende Konstanten oder Methoden auslagern.
- Bedingungslogik vereinfachen.

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

#### Refactoring

- Inhalte in Methoden auslagern.
- Verantwortlichkeiten trennen.

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

#### Refactoring

- Bedingungen in sprechende Konstanten oder Methoden auslagern.

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

#### Refactoring

- Bedingungen in sprechende Konstanten oder Methoden auslagern.
- Bedingungen in Methoden auslagern.

### Lange If-Statements

```java [Lange If-Statements]
if (a == 1 && b == 2 && c == 3 && d == 4 && e == 5 && f == 6) {
  // do something
}
```

#### Refactoring

- Bedingungen in sprechende Konstanten oder Methoden auslagern.

### Komplexe Bedingungen

```java [Komplexe Bedingungen]
if ((a == 1 && anotherValue.data.equals("123")) || (a == 2 && anotherValue === 1)) {
  // do something
}
```

#### Refactoring

- Bedingungen in sprechende Konstanten oder Methoden auslagern.

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

### Refactoring

- Bezeichner umbenennen.

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

### Refactoring

- Code in Klasse auslagern, die die Methoden und Variablen enthält.
- Methoden in eigene Klassen auslagern.

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

### Refactoring

- Eigene Klassen für Datentypen erstellen.
- Korrekte Datentypen verwenden.
- Einheitliche Datentypen verwenden.

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

#### Refactoring

- Schleifenkörper in Methoden auslagern.
- Verantwortlichkeiten trennen.

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

#### Refactoring

- Schleifenkörper in Methoden auslagern.
- Algorithmus überdenken und vereinfachen.

### Schleifen mit Seiteneffekten

```java
for (int i = 0; i < 10; i++) {
  if (i == 5) {
    globalValue = 42;
  }
  i++;
}
```

#### Refactoring

- Seitennebeneffekt entfernen
- Schleifen in Klasse auslagern, die die Variable verwaltet.

### Falsche eingesetzte Schleifen

```java
int i = 0;
while (i < 10) {
  val[i] = value;
}
```

stattdessen:

```java
for (int i = 0; i < 10; i++) {
  val[i] = value;
}

IntStream.range(0, 10).forEach(i -> val[i] = value);
```

#### Refactoring

- Andere Schleifen verwenden.

### Schleifen mit zu vielen exit-Punkten

```java
for (int i = 0; i < 10; i++) {
  if (i == 5) {
    break;
  }
  // do something
  if (i == 3) {
    break;
  }

  if (i == 7) {
    return;
  }
}
```

#### Refactoring

- Schleifenkörper in Methoden auslagern.
- Schleifen umstellen.

## Switch-Statements

- Switch-Statements mit Verhalten, das über Polymorphismus gelöst werden kann.
- Mehrere Switch-Statements and verschiedenen Stellen im Code für den gleichen ENUM-Typ.

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

```java
instance = switch (type) {
  ENUMTYPE1 -> new ClassType1();
  ENUMTYPE2 -> new ClassType2();
}
// ... ClassType1
instance.doSomething();
// ... ClassType2
instance.doSomething();
```

### Refactoring

- Switch-Verhalten in eine Klassenhierarchie auslagern mit Vererbung (Polymporphismus).
- Verhalten in Methoden von unterschiedlichen Klassen auslagern.

## Doppelter Code

Doppelter Code ist Code, der mehrmals im Projekt vorkommt und nicht in einer Methode oder Klasse zusammengefasst wurde.

### Refactoring

- Doppelter Code zusammenführen.
- Methode oder Klasse für doppelten Code erstellen.

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

### Refactoring

- Klasse in kleinere Klassen aufteilen.
- Methoden in eigene Klassen auslagern.
- Verantwortlichkeiten trennen.

## Prüfung auf `null`

- Fehlende Prüfung auf `null`
- Rückgabe von `null` statt eines leeren Objekts
- Bezeichner enthält keine Information über die Möglichkeit von `null` (`data` statt `dataOrNull`)

```java
var data = getData();
data.doSomething(); // NullPointerException
```

### Refactoring

- Prüfung auf `null` hinzufügen.
- Rückgabe von `null` durch *leeres Objekt* (Array, List, etc) ersetzen.
- Optional verwenden.
- Spezielle Klassen für `null`-Werte verwenden.

## Datenklassen

Reine Datenklassen enthalten nur getter und setter Methoden und keine Logik.
Diese Datenklassen können von überall willkürlich verändert werden, was zu unerwartetem Verhalten führen kann.

### Refactoring

- Datenklassen in Klassen mit Logik umwandeln.
- Daten kapseln und Methoden hinzufügen, um die Daten zu verändern.

## Kommentare

Kommentare, die den Code erklären beschreiben, sind in der Regel überflüssig, da der Code selbst sprechen sollte.

```java
// lädt die Daten
loadData();

// lädt alle Daten aus der Datenbank
for (int i = 0; i < 10; i++) {
  loadData(i);
}

```

### Refactoring

- Kommentare entfernen.
- Code refaktorisieren, um verständlicher zu sein.
- Kommentare in Methoden- oder Klassennamen umwandeln.
- Statt Kommentare sollen Tests geschrieben werden, die das Verhalten und den Einsatz für den Entwickler des Codes beschreiben.

## Globale Variablen

Globale Variablen können von überall verändert werden und führen zu unerwartetem Verhalten.

### Refactoring

- Globale Variablen in lokale Variablen umwandeln.
- Variablen in Klassen kapseln.

## Klassen mit ähnlicher oder doppelter Funktionalität

Klassen, die ähnliche oder doppelter Funktionalität haben, sollen zusammengeführt werden.

```java
class DataLoader {
  void loadData() {
    // do something
  }
}

class DataHelper {
  static void loadData() {
    // do something
  }
}
```

### Refactoring

- Methoden in eine Klasse verschieben.
- Klassen zusammenführen.
- Interface vereinheitlichen.

## Vererbung ohne Verhalten

- Klassen, die von einer anderen Klasse erben, aber ihr Verhalten nicht ändern, sollen nicht vererben.
- Klassen, die ihr Verhalten komplett ändern, sollen nicht vererben, sondern die Klasse wrappen.

```java
class BaseClass {
  Integer doSomething() {
    // do something
  }
}

class SubClass extends BaseClass {
  // keine Änderung
}

class SubClass {
  Integer doSomething() {
    throw new UnsupportedOperationException();
  }
}

```

### Refactoring

- Vererbung entfernen.
- Delegate Pattern verwenden.
- Interface verwenden.

## Mittelsmänner

Ketten von Methodenaufrufen, die nur einen Aufruf weiterleiten, sollen vermieden werden.

```java
instance.getAnotherInstance().getAnotherInstance().doSomething();
```

### Refactoring

- Methode in Klasse verschieben.

## Lange Funktionen/Methoden

Lange Funktionen sind schwer zu lesen und zu testen.

### Refactoring

- Funktion in mehrere Funktionen aufteilen.
- Funktionalität in eigene Klasse auslagern.
- Abstraktionsebenen einfügen.

## Viele Parameter

Methoden mit vielen Parametern sollen vermieden werden, da sie schwer zu lesen und zu testen sind.

```java
void doSomething(int a, int b, int c, int d, int e, int f, int g, int h, int i, int j) {
  // do something
}
```

### Refactoring

- Parameter in ein Objekt zusammenfassen.
- Mehrere Methoden aus einer Methode extrahieren.

## Verwechslung von booleschem und bitweisem Operator

Boolesche Ausdrücke sollen nicht mit bitweisen Operatoren verwechselt werden.
In Sprachen wie Java wird der boolesche Operator `&&` verwendet, um zwei boolesche Werte zu verknüpfen.
Der bitweise Operator `&` wird verwendet, um zwei Zahlen zu verknüpfen.

```java
if (a && b) {
  // boolescher Operator
}

if (a & b) {
  // bitweiser Operator
}
```

### Refactoring

- Kapseln von bitweisen Operatoren in Methoden und Konstanten.
- Verwendung von Klammern, um die Reihenfolge der Ausführung zu verdeutlichen.
