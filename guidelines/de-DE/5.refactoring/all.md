---
layout: doc
outline: [2, 2]

customRulePrefix: RFA
customIgnoreTitlesForRules: [Einleitung]
---

# Refactoring Allgemein

## Einleitung {#einleitung}

In diesem Dokument werden allgemeine Richtlinien für das Refactoring von Code beschrieben.
Anhand von Code-Smells und schlechten Code-Beispielen werden die Richtlinien erläutert und ein Refactoring vorgeschlagen.

<!-- !glossary -->
::: info Code-Smells

Code-Smells sind wiederkehrende Muster und Anzeichen, die auf Probleme im Code hinweisen.

Anhand von Code-Smells können Code-Verbesserungen identifiziert und Refactorings durchgeführt werden.

:::

Diese Richtlinien sind unabhängig von der Programmiersprache und können auf jede Sprache angewendet werden.
Für die Beispiele wird Java verwendet.

Allen Kapiteln wurde eine eindeutige Nummerierung, der Richtliniennummer, hinzugefügt, um eine eindeutige Identifikation zu ermöglichen.
Jede Richtliniennummer besteht aus dem Buchstaben **RFA**(Refactoring Alle Sprachen) gefolgt von einer Nummer, die den Abschnitt identifiziert.
Damit kann eine Regel eindeutig identifiziert werden, z.B. für ein Code-Review.

## RFA1 Umbenennen {#umbenennen}

Namen sollen manuell oder automatisiert umbenannt werden, um die Bedeutung des Codes zu verdeutlichen.

Namen sollen aussagekräftig und verständlich sein, damit der Inhalt der Variablen, Methoden, Klassen und Module klar ist.

Die Richtlinie für [Benennungen](../6.languages/naming.md) ist zu beachten.

### RFA1 Code-Smells

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

### RFA1 Allgemeine Refactoring-Schritte

- Bezeichner umbenennen.
- Bezeichner in der Domänensprache umbenennen.
- Bezeichner in der Nähe der Verwendung deklarieren.
- Bezeichner in das korrekte Format umbenennen (z.B. camelCase, PascalCase, etc.)
- Bezeichner konsistent umbenennen.

## RFA2 Verantwortlichkeiten trennen {#verantwortlichkeiten-trennen}

Alle Verantwortlichkeiten sollen klar getrennt werden, um die Wartbarkeit zu verbessern.

Die Prinzipien [SRP](../2.principles/principles#single-responsibility-principle) und [ISP](../2.principles/principles#interface-segregation-principle) sind hierbei zu beachten.

## RFA3 Methoden extrahieren {#methoden-extrahieren}

Um Methoden einfacher zu verstehen, sollen sie in kleinere Methoden extrahiert werden.

Die Prinzipien [DRY](../2.principles/principles#dry) und [KISS](../2.principles/principles#kiss) sind hierbei zu beachten.

Folgende Extraktionen können durchgeführt werden:

### RFA3 Code-Smell: Lange Methoden

Die Methode ist zu lang oder hat zu viele Verantwortlichkeiten und kann in kleinere Methoden extrahiert werden.

```java
public void doSomething() {
    // viel Code
}

// wird zu
public void doSomething() {
    doFirstThing();
    doSecondThing();
    doThirdThing();
}
```

## RFA4 Viele Parameter {#viele-parameter}

Methoden mit vielen Parametern sollen vermieden werden, da sie schwer zu lesen und zu testen sind.

```java
void doSomething(int a, int b, int c, int d, int e, int f, int g, int h, int i, int j) {
  // do something
}
```

### RFA4 Refactoring

- Parameter in ein Objekt zusammenfassen.
- Mehrere Methoden aus einer Methode extrahieren.

### RFA4 Code-Smell: Lange If-Blöcke

Block einer If-Bedingung kann in eine Methode extrahiert werden.

```java
if (condition) {
    // viel Code
}

// wird zu
if (condition) {
    doSomething();
}
```

### RFA4 Code-Smell: Block einer Schleife

Block einer Schleife kann in eine Methode extrahiert werden.

```java
for (int i = 0; i < 10; i++) {
    // viel Code
}

// wird zu
for (int i = 0; i < 10; i++) {
    doSomething();
}

// oder den gesamten Block in eine Methode extrahieren
iterateOverList(list);
```

### RFA4 Code-Smell: Mehrfache Verwendung von Code

Blöcke, die mehrfach verwendet werden, können in eine Methode extrahiert werden.

```java
// viel Code
// viel Code
// viel Code

// wird zu
doSomething();
doSomething();
doSomething();
```

### RFA4 Code-Smell: Zusammenfassung durch Blöcke oder Kommentare

Blöcke, die durch Klammern oder einem Kommentar zusammengefasst sind, können in eine Methode extrahiert werden.
Kommentare, die den Code erklären, sind ein Hinweis, dass der Code in eine Methode extrahiert werden kann.

```java
// hier passiert etwas
{
    // viel Code
}

// wird zu
doSomething();
```

### RFA4 Code-Smell: Komplexe Prüfungen

Komplexe Prüfungen, die z.B. Eingaben validieren, können in eine Methode extrahiert werden.

```java
public void doSomething(String input) {
    if (input == null) {
        throw new IllegalArgumentException("input is null");
    }

    if (input.isEmpty()) {
        throw new IllegalArgumentException("input is empty");
    }

    // viel Code
}

// wird zu
throwIfInvalid(input); // wirft eine Exception, wenn die Eingabe ungültig ist
```

::: warning Hinweis
Die extrahierten Methoden sollten so benannt werden, dass sie die Intention des Codes klar wiedergeben.
:::

## RFA5 Variablen extrahieren {#variablen-extrahieren}

::: danger TODO
TODO
:::

## RFA6 Bedingungen vereinfachen {#bedingungen-vereinfachen}

## RFA7 Verschachtelungen durch Guard-Klauseln reduzieren {#verschachtelungen-reduzieren}

Methoden sollen so strukturiert werden, dass die Lesbarkeit erhöht wird.
Dazu sollen if-Bedingungen so aufgetrennt werden, dass die Methode flacher wird.

```java

if (condition1) {
    if (condition2) {
        if (condition3) {
            // wenn alle Bedingungen erfüllt sind
        } else {
            // wenn alle Bedingungen erfüllt sind, aber condition3 nicht
        }
    }
} else {
    // wenn condition1 nicht erfüllt ist
}
```

Insbesondere kurze if-Blöcke sollen frühzeitig am Anfang der Methode abgefangen werden.

Kann umgeschrieben werden in:

```java
if (!condition1) {
    return;
}

if (!condition2) {
    return;
}

if (!condition3) {
    // wenn alle Bedingungen erfüllt sind, aber condition3 nicht
    return;
}

// wenn alle Bedingungen erfüllt sind
// ...
```

Wenn eine if und else-Bedingung mit einem frühzeitigen Verlassen (durch z.B. `return`) endet, kann die else-Bedingung weggelassen werden.

```java
if (condition) {
    // ...
    return 1;
} else {
  return 2;
}
```

Kann umgeschrieben werden in:

```java
if (condition) {
    // ...
    return 1;
}

return 2;
```

::: info if-Block oder else-Block

Welcher Block soll zuerst stehen, wenn beide Blöcke gleichwertig sind?
In diesem Fall hängt es vom Entwickler ab, ob er den if-Block oder den else-Block zuerst schreibt.

Sollte einer der Blöcke jedoch kleiner sein oder eine Sonderfall- oder Fehlerprüfung enthalten, sollte dieser Block zuerst stehen.

Positive if-Bedingungen sollten zuerst stehen, falls dies ein besseres Verständnis des Codes ermöglicht.
Andernfalls können if-Bedingungen mit negativen Bedingungen zuerst stehen oder es kann eine Variable mit entsprechender Benedung eingeführt werden.

```java
final boolean invalidCondition = !condition;

if (invalidCondition) {
    // Guard-Klausel
    return;
}

// ...
```

:::

## RFA8 Bedingungen durch Polymorphismus ersetzen {#bedingungen-polymorphismus}

## RFA9 Sonderfälle behandeln {#sonderfaelle-behandeln}
<!-- p.336 -->

## RFA10 elementare Datentypen {#elementare-datentypen}

Oftmals werden elementare Datentypen verwendet, obwohl andere Datentypen oder Klassen passender wären.
Insbesondere String wird oft als Datentyp verwendet, was ein Code-Smell ist.

### RFA10 Code-Smells

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

### RFA10 Refactoring

- Eigene Klassen für Datentypen erstellen.
- Korrekte Datentypen verwenden (z.B. `LocalDate` statt `String`).
- Einheitliche Datentypen verwenden.

## RFA11 Schleifen {#schleifen}

Schleifen sollen so einfach wie möglich gehalten werden.

### RFA11 Schleifen mit viel Inhalt

Wenn eine Schleife zu viel Inhalt hat, soll der Inhalt in Methoden ausgelagert werden.

```java
for (int i = 0; i < 10; i++) {
  // viel Code
  // viel Code
  // viel Code
  // viel Code
}

// wird zu

for (int i = 0; i < 10; i++) {
  doSomething();
}
```

#### RFA11 Refactoring

- Schleifenkörper in Methoden auslagern.
- Verantwortlichkeiten trennen.

### RFA11 verschachtelte Schleifen

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

- Schleifenkörper in Methoden auslagern.
- Algorithmus überdenken und vereinfachen.

Und kann daher umgeschrieben werden in:

```java
while (condition) {
  doSomething();
}

for (int i = 0; i < 10; i++) {
  doSomething();
}
```

::: info Beachte

Die Benennung der Schleifenvariablen sollte so gewählt werden, dass die Intention der Schleife klar ist.

Beachte dazu auch die [Richtlinien für Schleifenvariablen](../6.languages/naming#schleifenvariablen).
:::

### RFA11 Schleifen mit Seiteneffekten

Wenn externe Variablen innerhalb einer Schleife geändert werden, soll dies vermieden werden.
Schleifen sollen keine direkte Änderung an Werten außerhalb der lokalen Situation (Function Scope) vornehmen.

```java
for (int i = 0; i < 10; i++) {
  if (condition) {
    enableField[i] = true
  }
}
```

Kann umgeschrieben werden in:

```java
for (int i = 0; i < 10; i++) {
  if (condition) {
    enableField(i);
  }
}

// oder als Stream
IntStream.range(0, 10).filter(i -> condition).forEach(this::enableField);
```

- Seitennebeneffekt entfernen
- Schleifen in Klasse auslagern, die die Variable verwaltet.
- Methoden von Klassen sollen Werte ändern.

### RFA11 Falsche eingesetzte Schleifen

```java
int i = 0;
while (i < 10) {
  val[i] = value;
}
```

Soll statt einer `while`-Schleife eine `for`-Schleife verwendet werden.

```java
for (int i = 0; i < 10; i++) {
  val[i] = value;
}

IntStream.range(0, 10).forEach(i -> val[i] = value);
```

### RFA11 Schleifen mit zu vielen exit-Punkten

```java
for (int i = 0; i < 10; i++) {
  if (condition1) {
    break;
  }
  // do something
  if (condition2) {
    break;
  }

  if (condition3) {
    return;
  }
}
```

### RFA11 Refactoring von Schleifen mit zu vielen exit-Punkten

Zu viele Exit-Anweisungen in einer Schleife lassen die Schleife unübersichtlich werden.
Je nach Einsatz müssen unterschiedliche Refactorings durchgeführt werden.

- Schleifenkörper in Methoden auslagern.
- Schleife aufteilen in mehrere Schleifen.
- Algorithmus überdenken und vereinfachen.

## RFA12 Switch-Statements {#switch-statements}

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

### RFA12 Refactoring

- Switch-Verhalten in eine Klassenhierarchie auslagern mit Vererbung (Polymporphismus).
- Verhalten in Methoden von unterschiedlichen Klassen auslagern.

## RFA13 Doppelter Code {#doppelter-code}

Doppelter Code ist Code, der mehrmals im Projekt vorkommt und nicht in einer Methode oder Klasse zusammengefasst wurde.

### RFA13 Refactoring

- Doppelter Code zusammenführen.
- Methode oder Klasse für doppelten Code erstellen.

## RFA14 Umfangreiche Klassen {#umfangreiche-klassen}

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

### RFA14 Refactoring

- Klasse in kleinere Klassen aufteilen.
- Methoden in eigene Klassen auslagern.
- Verantwortlichkeiten trennen.

## RFA15 Prüfung auf `null` {#pruefung-auf-null}

- Fehlende Prüfung auf `null`
- Rückgabe von `null` statt eines [Null-Objekts](../4.designpatterns/technical.md#null-objects)
- Bezeichner enthält keine Information über die Möglichkeit von `null` (`data` statt `dataOrNull`)

```java
var data = getData();
data.doSomething(); // NullPointerException
```

### RFA15 Refactoring

- Prüfung auf `null` hinzufügen.
- Rückgabe von `null` durch *leeres Objekt* (Array, List, etc) ersetzen.
- Optional verwenden.
- Spezielle Klassen für `null`-Werte verwenden ([Null-Objekts](../4.designpatterns/technical.md#null-objects))

## RFA16 If-Statements {#if-statements}

If-Bedingungen sollen so einfach wie möglich gehalten werden.

### RFA16 Code-Smells: Negationen

Wenn **Negationen** umgewandelt werden können, so sind positive Bedingungen zu bevorzugen.

```java
if (!condition) {
    // ...
} else {
    // ...
}
// kann umgeschrieben werden in

if (condition) {
    // ...
} else {
    // ...
}

// mehrfache Negationen
final boolean isNotValid = !isValid;
if (!isNotValid) {
    // ...
}

// kann umgeschrieben werden in
if (isValid) {
    // ...
}

```

### RFA16 Code-Smells: Unnötige Vergleiche

Unnötige Vergleiche sollen vermieden werden.

```java
if (data.isBlank() == false) {
    // ...
}

// kann umgeschrieben werden in
if (!data.isBlank()) {
    // ...
}
```

```java
final boolean isNotValid = false
if (isNotValid == false) {
    // ist immer true
}

// if Bedingung kann entfernt werden
```

### RFA16 Code-Smells: Große If-Blöcke

Große If-Blöcke können in kleinere Methoden extrahiert werden.

```java
if (condition) {
    // viel Code
}
// wird zu
if (condition) {
    doSomething();
}
```

### RFA16 Code-Smells: Mehrfache Verwendung von Code

Mehrfache If-Bedingungen können in Switch-Statements umgewandelt werden.

```java
if (condition1) {
    // ...
} else if (condition2) {
    // ...
} else if (condition3) {
    // ...
}

// wird zu
switch (condition) {
    case 1:
        // ...
        break;
    case 2:
        // ...
        break;
    case 3:
        // ...
        break;
    default:
}
```

::: warning switch-Statements bei Verhalten

Statt switch-Statements sollten Polymorphismus oder Strategy-Pattern verwendet werden, um das Verhalten zu ändern.

:::

### RFA16 Code-Smells: Komplexe Prüfungen

Viele If-Bedingungen sollen durch Methoden und frühzeitiges Verlassen (Guard-Klauseln) ersetzt werden, wenn möglich.

```java
if (condition1) {
    // ...
} else if (condition2) {
    // ...
} else if (condition3) {
    // ...
}

// wird zu
if (condition1) {
    doSomething();
} else if (condition2) {
    doSomethingElse();
} else if (condition3) {
    doAnotherThing();
}

// oder wird zu
if (condition1) {
    return doSomething();
}

if (condition2) {
    return doSomethingElse();
}

if (condition3) {
    return doAnotherThing();
}
```

### RFA16 Code-Smells: Verschachtelte If-Statements

Tief oder mehrfach verschachtelte If-Bedingungen sollen durch frühzeitiges Verlassen (Guard-Klauseln) reduziert werden.

```java
if (condition1) {
    if (condition2) {
        if (condition3) {
            // ...
        }
    }
}

// wird zu
if (!condition1) {
    return;
}

if (!condition2) {
    return;
}

if (!condition3) {
    return;
}

// ...
```

### RFA16 Code-Smells: Komplexe Terme in If-Bedingungen

Komplexe Terme in If-Bedingungen sollen durch Variablen ersetzt werden.

```java
if (a > 0 && b < 10 && c == 42) {
    // ...
}

// wird zu
final boolean isAValid = a > 0;
final boolean isBValid = b < 10;

if (isAValid && isBValid && c == 42) {
    // ...
}
```

## RFA17 Kommentare prüfen und entfernen {#kommentare}

Für Kommentare im Code gibt es nur zwei Existenzberechtigung:

1. Der Kommentar beschreibt die Intention oder die Gedanken des Entwicklers, warum der Code so implementiert wurde.
2. Der Kommentar ist eigentlich eine Dokumentation, die eine Methode dokumentiert (z.B. JavaDoc).

**Kommentar, der den Code beschreibt ist zu entfernen und ein Refactoring durchzuführen.**

Beispiele von schlechten Kommentaren:

Simple Kommentare, die den Code beschreiben, sind überflüssig und sollten entfernt werden.

```java
i = 0; // i wird auf 0 gesetzt
```

Beschreibende Kommentare, die den Code beschreiben, sind überflüssig und sollten entfernt werden.
Wenn der Code nicht verständlich ist, sollte der Code refactored werden.

```java
// gehe durch alle Elemente
for (int i = 0; i < 10; i++) {  
  process_element(i)
}
```

Unsinnige, unnütze oder unverständliche Kommentare sind zu entfernen.

```java
// das ist ein Kommentar
```

Todos und Fixmes sind zu entfernen und in ein Issue-Tracking-System zu überführen.
Falls wirklich erforderlich sollen die Kommentare mit dem Issue-Tracking-System verknüpft werden.

```java
// TODO: Refactoring
// FIXME: Bug
```

Auskommentierter Code ist zu entfernen.

```java
// for (int i = 0; i < 10; i++) {  } <- Code in Kommentar
```

Beschreibung von Code, der durch den Code selbst erfolgen sollte, ist zu entfernen und ein refactoring durchzuführen.

```java
// Hier wird die Datei gespeichert
deleteFile(filepath)

// Berechnet den Mittelwert
total = sum(values) * 2
```

Unklare Kommentare sind zu entfernen und durch verständlichen Code zu ersetzen.

```java
// Wichtig
process_data(data)

// Keine Ahnung, warum das funktioniert, aber es tut’s!
magic_number = 42
```

Lange und unnötig ausschweifende Kommentare sind zu entfernen und durch verständlichen Code zu ersetzen.

```java
// Diese Funktion ruft eine andere Funktion auf, die wiederum das Ergebnis 
// verarbeitet, nachdem die Daten validiert wurden.
result = process_data(data)
```

Kommentare, die ASCII-Art oder ähnliches zur Visualisierung enthalten, sind zu entfernen.

```java
// =============================================
// Hier beginnt die Methode
// =============================================
```

## RFA18 Feature-Neid {#feature-neid}

Eine Klasse verwendet viele Methoden oder Variablen einer anderen Klasse, um eine Aufgabe zu erledigen.

### RFA18 Code-Smells

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

### RFA18 Refactoring

- Code in Klasse auslagern, die die Methoden und Variablen enthält.
- Methoden in eigene Klassen auslagern.

## RFA19 Mittelsmänner {#mittelsmaenner-feature-neid}

Ketten von Methodenaufrufen, die nur einen Aufruf weiterleiten, sollen vermieden werden.

```java
instance.getAnotherInstance().getAnotherInstance().doSomething();
```

### RFA19 Refactoring

- Methoden in Klasse auslagern, die die Methoden enthält.
- Dependency Injection verwenden mit der entsprechenden Klasse, die verwendet werden soll.

## RFA20 Datenklassen {#datenklassen}

Reine Datenklassen enthalten nur getter und setter Methoden und keine Logik.
Diese Datenklassen können von überall willkürlich verändert werden, was zu unerwartetem Verhalten führen kann.

### RFA20 Refactoring

- Datenklassen in Klassen mit Logik umwandeln.
- Daten kapseln und Methoden hinzufügen, um die Daten zu verändern.

## RFA21 Globale Variablen {#globale-variablen}

Globale Variablen können von überall verändert werden und führen zu unerwartetem Verhalten.

### RFA21 Refactoring

- Globale Variablen in lokale Variablen umwandeln.
- Variablen in Klassen kapseln.

## RFA22 Klassen mit ähnlicher oder doppelter Funktionalität {#klassen-mit-aehnlicher-oder-doppelter-funktionalitaet}

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

### RFA22 Refactoring

- Methoden in eine Klasse verschieben.
- Klassen zusammenführen.
- Interface vereinheitlichen.

## RFA23 Vererbung ohne Verhalten {#vererbung-ohne-verhalten}

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

### RFA23 Refactoring

- Vererbung entfernen.
- Delegate Pattern verwenden.
- Interface verwenden.

## RFA24 Verwechslung von booleschem und bitweisem Operator {#verwechslung-von-booleschem-und-bitweisem-operator}

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

Um Bits zu verknüpfen, wird der bitweise Operator `|` verwendet und nicht `+`.

```java
int a = 1;
int b = 2;

int c = a + b; // 3
int d = a | b; // 3

//Gegenbeispiel
int a = 3; // 0011
int b = 5; // 0101

int c = a + b; // 8
int d = a | b; // 7

```

### RFA24 Refactoring

- Kapseln von bitweisen Operatoren in Methoden und Konstanten.
- Verwendung von Klammern, um die Reihenfolge der Ausführung zu verdeutlichen.
- Verwendung von `&&` und `||` für boolesche Operatoren.
- Verwendung von `&` und `|` für bitweise Operatoren.
- Verwendung von `+` für Addition.
