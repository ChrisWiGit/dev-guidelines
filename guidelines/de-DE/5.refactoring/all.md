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

## RFA1 Strategien zum Refactoring {#strategien-zum-refactoring}

### RFA1 In Kürze

* Iteratives Refactoring: Code kontinuierlich verbessern, Anforderungen umsetzen, erneut verbessern.
* Kleine Schritte: Änderungen in kleinen, nachvollziehbaren Schritten durchführen.
* Boy Scout Rule: Code immer verbessern, wenn man ihn anfasst.
* Red-Green-Refactor: Test schreiben (Red), Code anpassen (Green), Code verbessern (Refactor).
* Code oder Tests ändern: Nie beides gleichzeitig anpassen.
* Stronghold-Strategie: Erst eigenen, vertrauten Code verbessern, dann Unbekanntes refaktorisieren.
* Hotspot-Strategie: Häufig geänderten Code zuerst verbessern.
* Duplizierung vermeiden: Code-Duplizierung entfernen, wenn sinnvoll.

### RFA1 1. Iteratives Refactoring: Code verbessern, Anforderungen umsetzen, erneut verbessern

Statt große Änderungen auf einmal durchzuführen, sollte der Code iterativ verbessert werden.
Zuerst wird der bestehende Code verfeinert, dann werden neue Anforderungen umgesetzt und anschließend wird der Code erneut auf Qualität überprüft und verbessert.
Diese iterative Vorgehensweise verhindert technische Schulden und stellt sicher, dass der Code langfristig wartbar bleibt.
Zudem hilft Refactoring dabei, dass Entwickler den Code besser verstehen und effizienter mit ihm arbeiten können.

1. Bestehenden Code verbessern
2. Neue Anforderungen umsetzen
3. Code erneut überprüfen und verbessern

### RFA1 2. Änderungen in kleinen Schritten durchführen

Statt große, schwer nachvollziehbare Änderungen auf einmal vorzunehmen, sollte Refactoring in kleinen, kontrollierten Schritten erfolgen. Dadurch bleibt der Code verständlich, und Fehler lassen sich leichter identifizieren.
Außerdem ermöglicht dies eine bessere Zusammenarbeit in Teams, da kleinere Änderungen leichter überprüft und integriert werden können.

### RFA1 3. Boy Scout Rule: Code immer etwas verbessern

Wenn man Code ohnehin ändern muss, sollte man die Gelegenheit nutzen, ihn direkt zu verbessern.
Oft wird Refactoring auf einen späteren Zeitpunkt verschoben, der jedoch nie kommt.
Das führt dazu, dass sich über die Zeit technische Schulden ansammeln.
Zudem gilt: Sobald ein Code einmal funktioniert („Never touch a running system“), wird sich niemand mehr trauen, ihn anzufassen, aus Angst, etwas zu zerstören.
Daher ist es wichtig, kontinuierlich kleine Verbesserungen vorzunehmen, um langfristig eine hohe Codequalität zu gewährleisten.

<!-- !glossary -->
:::info

Die Boy Scout Rule wird oft auch als **Leave the campground cleaner than you found it** bezeichnet.

Diese Regel stammt ursprünglich aus den Prinzipien der Pfadfinderbewegung, die besagt: "Verlasse einen Platz immer sauberer, als du ihn vorgefunden hast." Übertragen auf die Softwareentwicklung bedeutet dies, dass Entwickler den Code besser hinterlassen sollten, als sie ihn vorgefunden haben.

:::

### RFA1 4. Red-Green-Refactor: Testgetriebenes Refactoring

Diese Methode basiert auf dem Test-Driven Development (TDD)-Ansatz. Sie folgt drei Schritten:

1. **Red**: Ein neuer Test wird geschrieben, der zunächst fehlschlägt.
2. **Green**: Der Code wird angepasst, um den Test zu bestehen.
3. **Refactor**: Der Code wird verbessert, ohne die Funktionalität zu ändern.

Dadurch, dass bereits Code existiert, kann oft bereits ein Test geschrieben werden, der den aktuellen Stand des Codes abbildet.
Dieser Test wird dann zum Ausgangspunkt für die Verbesserung des Codes.

### RFA1 5. Entweder Code oder Tests ändern, nicht beides gleichzeitig

Beim Refactoring sollte entweder der Code oder die Tests geändert werden – aber niemals beides gleichzeitig.
Diese Vorgehensweise stellt sicher, dass immer eine funktionierende Version vorhanden ist und verhindert, dass unbeabsichtigte Fehler entstehen.
Sobald eine Änderung abgeschlossen ist, kann im nächsten Schritt der andere Teil angepasst werden.

### RFA1 6. **Stronghold-Strategie**: Erst bekannten Code verbessern

Beim Refactoring ist es oft hilfreich, mit Code zu beginnen, den man selbst geschrieben oder bereits gut verstanden hat.
Durch das Aufräumen und Optimieren dieser vertrauten Bereiche wird eine stabile Basis geschaffen.
Von dort aus kann dann der unbekanntere Code analysiert und verbessert werden.
Diese Strategie hilft, das Risiko von Fehlern zu minimieren und Refactoring systematisch durchzuführen.

### RFA1 7. **Hotspot-Strategie**: Häufig geänderten Code verbessern

Bestimmte Teile des Codes werden häufiger geändert als andere. Diese **Hotspots** sind oft problematisch, weil sie durch häufige Anpassungen komplex oder unübersichtlich werden.
Es lohnt sich, diese kritischen Bereiche gezielt zu verbessern, da sie eine hohe Wartungslast verursachen. Durch das gezielte Refactoring von Hotspots wird die Codequalität an den wichtigsten Stellen verbessert und zukünftige Änderungen erleichtert.

### RFA1 8. Duplizierung entfernen

Code-Duplizierung zu entfernen kann helfen, die Wartbarkeit und Lesbarkeit des Codes zu verbessern, wenn eine Änderung nur an einer Stelle vorgenommen werden muss.
Wenn Code initial geschrieben wird, ist oftmals unklar, welche Teile wiederverwendet werden können.
Daher kann erst bei einer Wiederholung von Code entschieden werden, ob dieser ausgelagert werden sollte.

Allerdings kann dies zu einer hohen **[Kopplung](../6.languages/general.html#niedrige-kopplung)** führen, wenn zu viele Abhängigkeiten entstehen.
Deshalb sollte man sich an die **[2-3-5-Regel](../2.principles/principles.html#2-3-5-regel)** halten, um abzuwägen, wann eine Wiederverwendung sinnvoll ist und wann nicht.

Siehe auch: **[DRY-Prinzip](../2.principles/principles.html#dry)** (Don’t Repeat Yourself).

::: warning Wiederholende Datenstrukturen vs. Code

Wiederholende Datenstrukturen sind oft kein Code-Smell.
Datenformate wie HTML, JSON oder XML werden häufig zur Beschreibung von Oberflächen und Strukturen genutzt.
Wenn sich Oberflächen stark ähneln, kann es verlockend sein, ihre Datenstrukturen mit einer Generator-Methode zu erstellen.
Dies kann jedoch die Kopplung erhöhen, da Oberflächen oft Ziel von Anforderungsänderungen sind.
Dadurch müssen Anpassungen an bestimmten Stellen vorgenommen werden, während andere unberührt bleiben.
Eine zu starke Abstraktion kann hier die Flexibilität und Wartbarkeit reduzieren.

:::

## RFA2 Umbenennen {#umbenennen}

Namen sollen manuell oder automatisiert umbenannt werden, um die Bedeutung des Codes zu verdeutlichen.

Namen sollen aussagekräftig und verständlich sein, damit der Inhalt der Variablen, Methoden, Klassen und Module klar ist.

Die Richtlinie für [Benennungen](../6.languages/naming.md) ist zu beachten.

### RFA2 Code-Smells

* Bezeichner ist zu kurz.
* Bezeichner ist unverständlich.
* Bezeichner ist mehrdeutig (z.B. `data`).
* Bezeichner ist in der falschen Sprache (Deutsch statt englisch).
* Bezeichner sagt nichts über den Inhalt oder Funktion aus (z.B. `temp`).
* Bezeichner einer Methode sagt nichts über die Ausführung aus (z.B. `doSomething`).
* Bezeichner lügt über den Inhalt (z.B. `isFinished` statt `isRunning`).
* Bezeichner lügt über den Datentyp (z.B. `numberOfSeconds` statt `numberOfMilliseconds`).
* Bezeichner entspricht nicht der Domänensprache.
* Bezeichner enthält Informationen wie Datentyp oder Klassenname (z.B. `intNumberOfDays`).
* Bezeichner hat einen Präfix oder Suffix (z.B. `m_` oder `_value`).
* Bezeichner enthält Schreibfehler (z.B. `nummberOfDays`, doppeltes `m`).
* Bezeichner verwendet Abkürzungen (z.B. `cnt` statt `count`).
* Bezeichner ist an der falschen Stelle deklariert (nicht in der Nähe der Verwendung).
* Bezeichner ist nicht im korrekten Format (z.B. camelCase, PascalCase, etc.)
* Bezeichner ist nicht konsistent (z.B. `get` und `set` Methoden).
* Bezeichner kann `null` sein, ohne dass dies im Namen erkennbar ist.

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

### RFA2 Allgemeine Refactoring-Schritte

* Bezeichner umbenennen.
* Bezeichner in der Domänensprache umbenennen.
* Bezeichner in der Nähe der Verwendung deklarieren.
* Bezeichner in das korrekte Format umbenennen (z.B. camelCase, PascalCase, etc.)
* Bezeichner konsistent umbenennen.

## RFA3 Verantwortlichkeiten trennen {#verantwortlichkeiten-trennen}

Alle Verantwortlichkeiten sollen klar getrennt werden, um die Wartbarkeit zu verbessern.

Die Prinzipien [SRP](../2.principles/principles#single-responsibility-principle) und [ISP](../2.principles/principles#interface-segregation-principle) sind hierbei zu beachten.

## RFA4 Methoden extrahieren {#methoden-extrahieren}

Um Methoden einfacher zu verstehen, sollen sie in kleinere Methoden extrahiert werden.

Die Prinzipien [DRY](../2.principles/principles#dry) und [KISS](../2.principles/principles#kiss) sind hierbei zu beachten.

Folgende Extraktionen können durchgeführt werden:

### RFA4 Code-Smell: Lange Methoden

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

## RFA5 Viele Parameter {#viele-parameter}

Methoden mit vielen Parametern sollen vermieden werden, da sie schwer zu lesen und zu testen sind.

```java
void doSomething(int a, int b, int c, int d, int e, int f, int g, int h, int i, int j) {
  // do something
}
```

### RFA5 Refactoring

* Parameter in ein Objekt zusammenfassen.
* Mehrere Methoden aus einer Methode extrahieren.

### RFA5 Code-Smell: Lange If-Blöcke

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

### RFA5 Code-Smell: Block einer Schleife

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

### RFA5 Code-Smell: Mehrfache Verwendung von Code

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

### RFA5 Code-Smell: Zusammenfassung durch Blöcke oder Kommentare

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

### RFA5 Code-Smell: Komplexe Prüfungen

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

## RFA6 Variablen extrahieren {#variablen-extrahieren}

::: danger TODO:

:::

## RFA7 Bedingungen vereinfachen {#bedingungen-vereinfachen}

## RFA8 Verschachtelungen durch Guard-Klauseln reduzieren {#verschachtelungen-reduzieren}

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

## RFA9 Bedingungen durch Polymorphismus ersetzen {#bedingungen-polymorphismus}

## RFA10 Sonderfälle behandeln {#sonderfaelle-behandeln}
<!-- p.336 -->

## RFA11 elementare Datentypen {#elementare-datentypen}

Oftmals werden elementare Datentypen verwendet, obwohl andere Datentypen oder Klassen passender wären.
Insbesondere String wird oft als Datentyp verwendet, was ein Code-Smell ist.

### RFA11 Code-Smells

* Datumswerte und Fest-/Fließkommazahlen sollen nicht als String, sondern als einen spracheigener Datentypen gespeichert werden.
* Geldbeträge sollen immer in Cent als ganze Zahl gespeichert werden, um Rundungsfehler zu vermeiden.
* Koordinaten sollen als eigener Datentyp gespeichert werden, und nicht durch die Verwendung von Arrays, Tupeln, Listen oder gar durch die Verknüpfung mit Bit-Operationen.
* Längen und Größen sollen einheitlich in einer grundlegenden Einheit gespeichert werden, um Rundungsfehler zu vermeiden.
* Viele elementare Werte sollen in eigenen Klassen gespeichert werden.

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

### RFA11 Refactoring

* Eigene Klassen für Datentypen erstellen.
* Korrekte Datentypen verwenden (z.B. `LocalDate` statt `String`).
* Einheitliche Datentypen verwenden.

## RFA12 Schleifen {#schleifen}

Schleifen sollen so einfach wie möglich gehalten werden.

### RFA12 Schleifen mit viel Inhalt

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

#### RFA12 Refactoring

* Schleifenkörper in Methoden auslagern.
* Verantwortlichkeiten trennen.

### RFA12 verschachtelte Schleifen

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

* Schleifenkörper in Methoden auslagern.
* Algorithmus überdenken und vereinfachen.

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

### RFA12 Schleifen mit Seiteneffekten

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

* Seitennebeneffekt entfernen
* Schleifen in Klasse auslagern, die die Variable verwaltet.
* Methoden von Klassen sollen Werte ändern.

### RFA12 Falsche eingesetzte Schleifen

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

### RFA12 Schleifen mit zu vielen exit-Punkten

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

### RFA12 Refactoring von Schleifen mit zu vielen exit-Punkten

Zu viele Exit-Anweisungen in einer Schleife lassen die Schleife unübersichtlich werden.
Je nach Einsatz müssen unterschiedliche Refactorings durchgeführt werden.

* Schleifenkörper in Methoden auslagern.
* Schleife aufteilen in mehrere Schleifen.
* Algorithmus überdenken und vereinfachen.

## RFA13 Switch-Statements {#switch-statements}

* Switch-Statements mit Verhalten, das über Polymorphismus gelöst werden kann.
* Mehrere Switch-Statements and verschiedenen Stellen im Code für den gleichen ENUM-Typ.

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

### RFA13 Refactoring

* Switch-Verhalten in eine Klassenhierarchie auslagern mit Vererbung (Polymporphismus).
* Verhalten in Methoden von unterschiedlichen Klassen auslagern.

## RFA14 Doppelter Code {#doppelter-code}

::: danger TODO:
:::


Doppelter Code ist Code, der mehrmals im Projekt vorkommt und nicht in einer Methode oder Klasse zusammengefasst wurde.

### RFA14 Refactoring

* Doppelter Code zusammenführen.
* Methode oder Klasse für doppelten Code erstellen.

## RFA15 Umfangreiche Klassen {#umfangreiche-klassen}

Folgende Code-Smells können auf zu umfangreiche Klassen hinweisen:

* zu viele Methoden, die nicht zusammengehören und auf ein Ziel hinarbeiten
* viele statische Methoden, die eher Tools oder Helper-Funktionen sind
* Klassen mit Namen wie Helper, Util, Manager, Controller, etc. (`DataHelper`, `DataUtil`, etc.)

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

### RFA15 Refactoring

* Klasse in kleinere Klassen aufteilen.
* Methoden in eigene Klassen auslagern.
* Verantwortlichkeiten trennen.

## RFA16 Prüfung auf `null` {#pruefung-auf-null}

* Fehlende Prüfung auf `null`
* Rückgabe von `null` statt eines [Null-Objekts](../4.designpatterns/technical.md#null-objects)
* Bezeichner enthält keine Information über die Möglichkeit von `null` (`data` statt `dataOrNull`)

```java
var data = getData();

// implizite Annahme, dass data nicht null ist
data.doSomething(); // NullPointerException
```

### RFA16 Refactoring

* Variablen mit `null` im Namen kennzeichnen.
* Prüfung auf `null` hinzufügen (implizite Annahme, dass `null` nicht vorkommt).
* Rückgabe von `null` durch *leeres Objekt* (Array, List, etc) ersetzen.
* Optional-Objekte verwenden (Java).
* Spezielle Klassen für `null`-Werte verwenden ([Null-Objekts](../4.designpatterns/technical.md#null-objects))

```java
var dataOrNull = getDataOrNull();

if (dataOrNull == null) {
  // handle null
}

dataOrNull.doSomething();
```

## RFA17 If-Statements {#if-statements}

If-Bedingungen sollen so einfach wie möglich gehalten werden.

### RFA17 Code-Smells: Negationen

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

### RFA17 Code-Smells: Unnötige Vergleiche

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

### RFA17 Code-Smells: Große If-Blöcke

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

### RFA17 Code-Smells: Mehrfache Verwendung von Code

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

### RFA17 Code-Smells: Komplexe Prüfungen

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

### RFA17 Code-Smells: Verschachtelte If-Statements

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

### RFA17 Code-Smells: Komplexe Terme in If-Bedingungen

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

## RFA18 Kommentare prüfen und entfernen {#kommentare}

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

## RFA19 Feature-Neid {#feature-neid}

Eine Klasse verwendet viele Methoden oder Variablen einer anderen Klasse, um eine Aufgabe zu erledigen.

### RFA19 Code-Smells

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

### RFA19 Refactoring

* Code in Klasse auslagern, die die Methoden und Variablen enthält.
* Methoden in eigene Klassen auslagern.

## RFA20 Mittelsmänner {#mittelsmaenner-feature-neid}

Ketten von Methodenaufrufen, die nur einen Aufruf weiterleiten, sollen vermieden werden.

```java
instance.getAnotherInstance().getAnotherInstance().doSomething();
```

### RFA20 Refactoring

* Methoden in Klasse auslagern, die die Methoden enthält.
* Dependency Injection verwenden mit der entsprechenden Klasse, die verwendet werden soll.

## RFA21 Datenklassen {#datenklassen}

Reine Datenklassen enthalten nur getter und setter Methoden und keine Logik.
Diese Datenklassen können von überall willkürlich verändert werden, was zu unerwartetem Verhalten führen kann.

### RFA21 Refactoring

* Datenklassen in Klassen mit Logik umwandeln.
* Daten kapseln und Methoden hinzufügen, um die Daten zu verändern.

## RFA22 Globale Variablen {#globale-variablen}

Globale Variablen können von überall verändert werden und führen zu unerwartetem Verhalten.

### RFA22 Refactoring

* Globale Variablen in lokale Variablen umwandeln.
* Variablen in Klassen kapseln.

## RFA23 Klassen mit ähnlicher oder doppelter Funktionalität {#klassen-mit-aehnlicher-oder-doppelter-funktionalitaet}

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

### RFA23 Refactoring

* Methoden in eine Klasse verschieben.
* Klassen zusammenführen.
* Interface vereinheitlichen.

## RFA24 Vererbung ohne Verhalten {#vererbung-ohne-verhalten}

* Klassen, die von einer anderen Klasse erben, aber ihr Verhalten nicht ändern, sollen nicht vererben.
* Klassen, die ihr Verhalten komplett ändern, sollen nicht vererben, sondern die Klasse wrappen.

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

### RFA24 Refactoring

* Vererbung entfernen.
* Delegate Pattern verwenden.
* Interface verwenden.

## RFA25 Verwechslung von booleschem und bitweisem Operator {#verwechslung-von-booleschem-und-bitweisem-operator}

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

### RFA25 Refactoring

* Kapseln von bitweisen Operatoren in Methoden und Konstanten.
* Verwendung von Klammern, um die Reihenfolge der Ausführung zu verdeutlichen.
* Verwendung von `&&` und `||` für boolesche Operatoren.
* Verwendung von `&` und `|` für bitweise Operatoren.
* Verwendung von `+` für Addition.
