---
layout: doc
customRulePrefix: GN # General Naming
customIgnoreTitlesForRules: [Einleitung]
---

# Einheitliche Namensgebung

## Einleitung {#einleitung}

> Das zweit-schwierigste Problem in der IT ist die Kunden zu verstehen, was sie wollen.
> Das schwierigste Problem ist, gute Namen zu finden.

Allen Kapiteln wurde eine eindeutige Nummerierung, der Richtliniennummer, hinzugefügt, um eine eindeutige Identifikation zu ermöglichen.
Jede Richtliniennummer besteht aus dem Buchstaben **GN**(General Naming) gefolgt von einer Nummer, die den Abschnitt identifiziert. Damit kann eine Regel eindeutig identifiziert werden, z.B. für ein Code-Review.

## GN1 Konventionen durch eingesetzte Sprache {#konventionen-durch-eingesetzte-sprache}

::: warning Unterschiede in der Namensgebung bei verschiedenen Programmiersprachen

Die Namensgebung in der Softwareentwicklung ist von der verwendeten Programmiersprache abhängig.

Es soll von den hier vorgegebenen Regeln abgewichen werden, wenn die Sprache spezifische Konventionen vorgibt.

:::

## GN2 Allgemeine Regeln {#allgemeine-regeln}

- Verwende die Sprache der Domäne, in der die Software entwickelt wird.
  - Verwende Namen, die auch für das Geschäftsmodell oder die Domäne verständlich sind.
  - Vermeide das ersetzen von Domänenspezifischen Namen durch technische Namen (`Item` statt `Article` oder sogar `Invoice`).
Andernfalls müssen Entwickler ständig zwischen der Domäne und der technischen Sprache wechseln.
- Prüfe, ob der Name korrekt geschrieben ist (z.B. `Asterisk` statt `Asterix`).
- Verwende so kurze und präzise Namen wie möglich, aber so lang wie nötig.
- Verwende die gleichen Wörter für die gleichen Konzepte in der gesamten Codebasis (Konsistenz, z.B. `Account` statt `User`).
- Vermeide Abkürzungen, die nicht allgemein bekannt sind (z.B. `load` statt `ld`).
- Vermeide Zahlen in Namen, wenn sie nicht Teil des Namens sind (z.B. `user1` statt `user`).
- Vermeide komplizierte oder nicht gebräuchliche Wörter (z.B. `abracadabra` statt `magic`).
- Vermeide Überraschungen in Namen, weil der Name nicht das beschreibt, was der Wert enthält oder die Methode tut (Least astonishment)
- Übertreibe es nicht mit der Wortwahl, bleibe einfach und verständlich (`release` statt `relinquish` oder `giveUp`).

Beispiele:

- `calculateTotalAmountOfItems` soll den Gesamtbetrag der Artikel berechnen und nicht z.B. die Differenz (Least astonishment)
- Keine Methode soll eine Datei löschen, wenn sie `calculateTotalAmountOfItems` heißt (Least astonishment).
- Werte im Objekt dürfen nicht verändert werden, wenn die Methode `getFullName` heißt (Least astonishment).
- globale Variablen sollen nicht verändert werden, wenn die Methode printDocument heißt (Seiteneffekte).
- Eine Methode, die `getFullName` heißt, soll keine FileNotFoundException werfen.
- Eine Methode, die `calculateTotalAmountOfItems` heißt, soll keine NullPointerException werfen (Fehler in der Methode).
- Eine Methode, die printDocument heißt, soll keine `NetworkException` werfen (Domänen-fremd)

## GN3 Unspezifische Namen {#unspezifische-namen}

Vermeide unspezifische Namen, die so generisch sind, dass sie keine Information über den Typ oder den Wert enthalten.

Beispiele sind: `temp`, `value`, `values`, `items`, `data`, `object`, `stuff`, `things`, `element`, `entity`, `item`, `object`, `instance` oder das berüchtigte `foo`, `foobar`, `baz`.

Bessere Namen sind z.B.: `tempDirectoryPath`, `totalAmount`, `itemListOfArticles`, `userCustomData`, `elementFindInUserList`, `entityUser`, `itemArticle`, `instanceOfUser`.

::: info Abwägung

Unspezifische Namen können in bestimmten Situationen verwendet werden, wenn der Kontext klar ist.

:::

## GN4 Schreibweise {#schreibweise}

Die Schreibweise von Variablen, Methoden, Konstanten, Typen und Klassen soll konsistent sein und den Konventionen der Sprache folgen.

Die Schreibweise wird detailliert im Kapitel der entsprechenden Sprache beschrieben.

::: warning Groß- und Kleinschreibung der Namen

Die hier verwendeten Beispiele sind in der Regel in **camelCase** <img src="/camel.png" width="24" height="24" alt="camelCase" style="display: inline;" /> geschrieben, aber die Schreibweise kann je nach Sprache variieren.

:::

## GN5 Präfixe und Suffixe {#praefixe-und-suffixe}

Vermeide Präfixe und Suffixe, wenn der Kontext bereits klar ist.

Beispiele:

- `name` statt `strName`, wenn der Typ klar ist.
- `age` statt `intAge`
- `Name` statt `NameType`
- `User::name()` statt `User::setUserName()`, wenn der Kontext Benutzer klar ist.
- `com.company.ClassName` statt `com.company.CompanyClassName`, wenn der Namespace die Trennung klar macht.

Sollen Präfixe oder Suffixe notwendig sein, sollen eine Aufteilung in Betracht gezogen werden nach dem Prinzip [Separation of Concerns](../2.principles/principles#soc).

::: warning Achtung

Nicht alle Sprachen können ohne getter und setter auskommen, daher kann es notwendig sein, diese Präfixe zu verwenden.

:::

## GN6 Variablen {#variablen}

- Variablen sollen mit einem Nomen benannt werden, das den Wert beschreibt `name`, `surname`, `firstName`, `fullName`.
- Wenn der Kontext nicht klar ist, soll das Nomen genauer beschrieben werden `textOfArticle`, `messageOfStatus`.
- Die Groß- und Kleinschreibung soll konsistent sein und den Konventionen der Sprache folgen.

## GN7 mögliche Nullwerte in Variablen {#moegliche-nullwerte-in-variablen}

Variablen, die möglicherweise `null` sind, können auf folgende Arten *markiert* werden:

::: code-group

```javascript

const nullableName = null;
const nameOrNull = null;
const nameOrUndefined = undefined;
const nameOrEmpty = '';
const nameOrNothing = '';
const nameOrNone = '';

```

```java

String nullableName = null;
String nameOrNull = null;
String nameOrEmpty = "";
String nameOrNothing = "";
String nameOrNone = "";

```

```typescript

let nullableName: string | null = null;
let nameOrNull: string | null = null;
let nameOrEmpty: string = "";
let nameOrNothing: string = "";
let nameOrNone: string = "";

```

```csharp

string? nullableName = null;
string? nameOrNull = null;
string nameOrEmpty = "";
string nameOrNothing = "";

```

:::

::: info Unterschiede in den Sprachen

Wie die Variable annotiert wird, hängt von der verwendeten Programmiersprache ab.
Es muss darauf geachtet werden, dass die Annotationen dem Konzept von `null` oder undefinierten Werten entsprechen.

:::

::: warning Optional

In manchen Sprachen gibt es spezielle Typen, die `null` oder undefinierte Werte erlauben.
Diese Typen sollen stattdessen verwendet werden, um die Absicht klar zu machen.

Verwende `Optional` in Java, `Nullable` in C#, oder [Custom-Optional in JS/TS](javascript/index#verwendung-von-optional-in-javascript-funktionen) um die Absicht klar zu machen.

:::

## GN8 Schleifenvariablen {#schleifenvariablen}

- Variablen von Schleifenvariablen können mit `i`, `j`, `k`, `l`, `m` benannt werden, wenn sie als reiner Index ohne Bedeutung verwendet werden.
  - `i` oder `j` darf nicht zusammen mit `l` verwendet werden, da es leicht zu Verwechslungen führen kann.
  - Es dürfen nur bis zu `2` dieser Schleifenvariablennamen verwendet werden, um die Lesbarkeit zu erhöhen, andernfalls sollen sprechende Namen verwendet werden.
- Koordinaten in Schleifen sollen mit `x`, `y`, `z` benannt werden und mit einer Zahl, falls mehrere Koordinaten verwendet werden `x1`, `y1`, `z1` (die Berechnung von Matrizen oder Vektoren macht dies oft notwendig).
- Schleifenvariablen sollen mit einem Nomen benannt werden, das den Wert beschreibt, wenn sie eine Bedeutung haben `index`, `counter`, `position`.

## GN9 Ganzzahlen {#ganzzahlen}

- Variablen von Ganzzahlen sollen mit einem Nomen benannt werden, das den Wert beschreibt `ageInYears`, `weightInKg`, `heightInCm`.
  - andere Variablen sollen mit einem Nomen benannt werden, das den Wert beschreibt `indexOfUser`, `counterOfUsers`.
- Allgemeine Nomen sollen mit einem weitere Nomen benannt werden, das den Wert beschreibt `amountOfItems`, `numberOfUsers` oder `textOfArticle`.
- Gewichte, Zeiten, Größe, Entfernungen, Geschwindigkeiten, Währungen, Namen sollen mit einem Nomen benannt werden, das den Wert beschreibt `weightInKg`, `timeInSeconds`, `sizeInBytes`, `distanceInKm`, `speedInKmPerHour`, `valueInDollars`, `valueInEuros` oder `amountInCents`.
- `value` soll vermieden werden, da es keine Information über den Typ enthält und der Kontext nicht klar ist (z.B. zu großer Abstand zwischen Deklaration und Verwendung).
Statt `value` soll der Typname verwendet werden, wenn der Typ nicht offensichtlich ist `valueInDollars`, `valueInEuros`.
- Währung soll in der Regel in der kleinsten Einheit gespeichert werden, z.B. in Cents statt in Euro (101c statt 1,01€ als Fließkommazahl).

::: details Sekunden vs. Millisekunden Fehlerquelle

Eine häufige Fehlerquelle ist, dass Zeiten in Sekunden oder Millisekunden gespeichert werden, aber nicht klar ist, welcher Typ verwendet wird.
Dies führt oft dazu, dass ein Wert in Sekunden definiert ist, aber ein Wert in Millisekunden zugewiesen wird, so dass der Wert dann das Tausendfache des erwarteten Wertes ist.
Die Folge ist, dass beispielsweise eine Verzögerung von 1000 Millisekunden (1 Sekunde) als 1000 Sekunden (16 Minuten) interpretiert wird, was zu langen Wartezeiten führt.

:::

## GN10 Fließkommazahlen {#fliesskommazahlen}

- Variablen von Fließkommazahlen sollen mit einem Nomen benannt werden, das den Wert beschreibt `weightInKg`, `energyInJoules`, `speedInKmPerHour`.
- Währungen dürfen nicht in Fließkommazahlen gespeichert werden, da dies zu Rundungsfehlern führen kann (0.1 + 0.2 = 0.3000000000000000**4**).

## GN11 Boolean {#boolean}

- Variablen von Booleans sollen mit einem Präfix `is`, `has`, `can`, `should` oder `will` gefolgt von einem Adjektiv benannt werden.
- `does` soll vermieden werden, da es durch die anderen Präfixe besser ersetzt werden kann.
- `empty` soll vermieden werden, da es auch ein Verb handeln kann für eine Methode `empty()`.

## GN12 Strings {#strings}

- Variablen von Strings sollen mit einem Nomen benannt werden, das den Wert beschreibt `name`, `surname`, `firstName`, `fullName`
- Der Inhalt kann auch mit `as` beschrieben werden, wenn der Kontext nicht klar ist `yearAsString`, `statusAsString`.
- Wenn der Kontext nicht klar ist, soll das Nomen genauer beschrieben werden `textOfArticle`, `messageOfStatus`.

## GN13 Listen, Sets {#listen-sets}

- Variablen von Listen sollen mit einem Nomen im Plural benannt werden, das den Inhalt beschreibt `users`, `shoppingItems`, `articles`.
- Alternativ können Präfixe wie `list`, `array`, `collection` oder `set` verwendet werden, wenn der Kontext nicht klar ist `listOfUsers`, `arrayOfArticles`, `collectionOfItems`, `setOfItems`.

## GN14 Maps, Dictionary {#maps-dictionary}

Variablen von Maps und Dictionaries sollen mit dem Muster `keyToValue` benannt werden, das den Inhalt beschreibt `userIdToUser`, `articleIdToArticle` für `Map<Integer, User>`, `Map<Integer, Article>`.

## GN15 Tuple {#tuple}

Eine Variable für ein Tuple soll mit dem Muster `firstValueAndSecondValue` benannt werden, das den Inhalt beschreibt `xAndY`, `latitudeAndLongitude`, `startAndEnd` oder `beginAndEnd`.

## GN16 Optional {#optional}

Eine Variablen von `Optional` oder `Nullable` kann mit dem Muster `maybeValue` oder `valueOrNull` benannt werden, das den Inhalt beschreibt `maybeUser`, `valueOrNull`, `userOrNull`.

::: info Optional/Nullable vs. null

Diese Regel ist optional, da der Typ der Variable klar macht, dass es sich hierbei um einen `Optional` oder `Nullable` Wert handelt.

Compiler und Linter prüfen in der Regel, ob ein Zugriff vor einer Prüfung stattfindet und melden dies als Fehler.

:::

## GN17 Namensräume und Packages {#namespaces-packages}

- Namensräume beginnen immer mit `com.company` für Enterprise-Anwendungen oder `org.project` für Open-Source-Projekte.
- Namensräume und Packages sollen mit einem Nomen benannt werden, das den Inhalt beschreibt `com.company`, `com.company.project`, `com.company.project.module`.
- Implementierungen sollen `impl` als Teil des Namens enthalten `com.company.project.impl`, `com.company.project.user.impl`.
- Zusammengesetzte Nomen innerhalb eines Teils des Namensraums sollen mit Punkten getrennt werden. Statt `com.company.projectmodule` soll `com.company.project.module` verwendet werden.
Ausnahmen sind Situationen, in denen ein semantisches Problem oder Unverständnis entsteht, wenn der Name durch Punkt getrennt wird. In diesem Fall kann ein Bindstrich oder Unterstrich verwendet werden `com.company.project-module`.
- Die einzelne Tile eines Namensraums werden mit tieferliegenden Teilen immer konkreter. `com.company.project.entities`, `com.company.project.entities.user`, `com.company.project.entities.user.impl`.

## GN18 Klassen {#klassen}

- Klassen präsentieren Dinge oder Akteure.
Sie sollen daher konsistent benannt werden und mit einem Nomen enden (z.B. `Person`, `Article`, `User`).

- Abgeleitete Klassen sollen die Basisklasse oder das Basisinterface im Namen enthalten.
Z.B. Klassen `User` und implementiertes Interface `Account` -> `UserAccount` oder die Klassen `Shape` und `Circle` -> `CircleShape`.
Dies gilt nicht für Interfaces, die zusätzliche Funktionalität bereitstellen (`Serializable`, `Comparable`, `Validatable`).
- Klassen, die ein Interface implementieren, sollen mit `Impl` enden (z.B. `UserImpl`, `ArticleImpl`).
Von dieser Regel kann abgewichen werden, wenn die Klassen durch Namensräume oder Packages getrennt sind.

- Abstrakte Klassen sollen mit `Abstract` enden (z.B. `PersonAbstract`, `ArticleAbstract`, `UserAbstract`).

## GN19 Interfaces {#interfaces}

Interfaces präsentieren Dinge, Akteure oder Fähigkeiten und sollen ähnlich wie Klassen benannt werden, jedoch mit einem abstrakten Nomen enden (z.B. `Serializer`, `Comparator`, `Validator`).
Interfaces, die eine Fähigkeit präsentieren, sollen mit einem Adjektiv enden (z.B. `Serializable`, `Comparable`, `Validatable`).

Interfaces sollen nicht mit `I` beginnen, da dies redundant ist und die Sprache bereits durch die Syntax klarstellt, dass es sich um ein Interface handelt.
Ausnahmen sind Sprachen, die Interfaces mit Präfix als Konvention verwenden (z.B. `I` in C#).

## GN20 Funktionen und Methoden {#funktionen-und-methoden}

- Funktionen und Methoden sollen mit einem Verb beginnen, das die Aktion beschreibt, die sie ausführen (`printDocument`, `calculateTotalAmountOfItems`).
- Der Name beginnt mit einem Verb und bezieht dabei auch die Parameter mit ein, sodass der Name die Funktionalität der Methode beschreibt.
  - Parameter in den Funktionsnamen sind optional, wenn der Kontext klar ist oder zu viele Parameter den Namen unübersichtlich machen.
  (statt `sumOfXYZ(int x, int y, int z)` soll `sum` oder besser `sumCoordinates`, wenn es sich um 3D-Koordinate handelt, verwendet werden).
- Namen können lang sein, solange sie die Funktionalität klar beschreiben (z.B. `calculateTotalAmountOfItems`).
- Weiterhin kann das Verb ausgeschmückt werden, um die Aktion genauer zu beschreiben (`compareTextCaseInsensitive`).

Beachte jedoch auch:

- Methoden-/Funktionsnamen sollen nur eine Aktion konkret beschreiben
`DoSomethingAndSomethingElse` ist ein Hinweis auf eine zu komplexe Methode.
- Methoden-/Funktionsnamen sollen nur alphanumerische Zeichen enthalten (Buchstaben, Zahlen, Unterstriche).
- Methoden-/Funktionsnamen sollen nicht mehr als `25` Zeichen lang sein.
In diesem Fall soll die Methode in kleinere Methoden aufgeteilt werden (siehe [Single Responsibility Principle](../2.principles/principles#srp)).
- Die Namen können Typen (z.B. `String`) enthalten, wenn die Sprache **nicht** typisiert ist (*JavaScript*) und der Typ nicht offensichtlich ist (`serializeJsonObject`).
- Methoden sollen anhand ihrer Funktionalität benannt werden, nicht anhand ihrer Implementierung.

Beispiele:

```text
serialize(json : JsonObject), aber serializeJsonObject(json)
deserialize(json : String)
validate(data : any)
compare(a : Integer, b : Integer) oder compareIntegers(a, b)
compareTextCaseInsensitive(a, b) oder compareCaseInsensitive(a: String, b: String)
writeOnFlush() statt write(), wenn die Methode erst beim Flush schreibt
```

## GN21 Funktionen- und Methodenparameter {#funktionen-und-methodenparameter}

Die Namen von Funktionen- und Methodenparametern sollen mit denen von Variablen übereinstimmen.

## GN22 Methodenpaare {#methodenpaare}

Methoden, die ein Paar bilden, sollen mit den gleichen Wörtern beginnen. Zum Beispiel:

- acquire/release
- add/remove
- begin/end
- create/destroy
- encode/decode
- encrypt/decrypt
- get/put
- increase/decrease
- increment/decrement
- initialize/finalize (oder terminate)
- insert/delete
- join/detach
- launch/terminate
- load/save
- login/logout
- obtain/forfeit (relinquish)
- open/dose
- pause/resume
- publish/subscribe
- read/write
- reserve/release
- start/finish
- start/stop
- startup/shutdown
- store/retrieve
- use/release

Namen können auch mit Präfixen versehen werden, um die Bedeutung zu verdeutlichen. Zum Beispiel:

```text
<something> / un<something>
<something> / de<something>
<something> / dis<something>
```

Beispiele:

- assign/unassign
- connect/disconnect
- follow/unfollow
- install/uninstall
- serialize/deserialize
- subscribe/unsubscribe

## GN23 Methoden mit Boolean-Rückgabewerten {#methoden-mit-boolean-rueckgabewerten}

Methoden, die einen Boolean-Wert zurückgeben, sollen mit einem Präfix `is`, `has`, `can`, `should` oder `will` gefolgt von einem Adjektiv beginnen.

Beispiele:

```text
isReady()
hasChildren()
canEdit()
shouldDisplay()
willDestroy()
```

> Der Präfix `does` soll vermieden werden, da er durch die anderen Präfixe besser ersetzt werden kann.

::: info
Spezifischere Präfixe wie `contains` oder `supports` sollen verwendet werden, wenn sie besser in den Kontext passen (z.B. in Listen oder Collections).
:::

## GN24 Getter und Setter {#getter-und-setter}

Getter sollen **kein** Präfix haben, Setter sollen durch Methoden ersetzt werden, die eine Aktion mit der Eigenschaft durchführen (Prinzip [Tell, Don't Ask](../2.principles/principles#tda)).

Die Silbe `get` ist überflüssig, da sie keine zusätzliche Information hinzufügt (wie z.B. auch der Typname im Variablenname).
Heutige Entwicklungsumgebungen bieten Code-Vervollständigung, sodass der Unterschied zwischen Getter und Setter offensichtlich ist.
Stattdessen sollen Domain-spezifische Namen direkt verwendet werden

Beispiele:

```text
`name()` statt `getName()`
```

> Manche Programmiersprachen erfordern die Verwendung von `get` und `set` für Getter und Setter.

::: warning Achtung
Wenn Klassen nur aus Getter und Setter bestehen, soll die Klasse neu bewertet werden, da sie gegen das Prinzip [Information Hiding](../2.principles/principles#ih) verstößt.
:::

## GN25 Build-Pattern Methoden {#build-pattern-methoden}

Methoden für das [Build-Pattern](../4.designpatterns/builder) sollen mit `with` beginnen.
Das `Endstück` soll den Namen `build` haben, denn der Kontext soll mit dem Namen der Klasse oder der Builder-Methode klar sein.

Beispiele:

```text
PersonBuilder
.withName(name)
.withAge(age)
.withAddress(address)
.build()
```

::: warning Achtung
Das Prefix `add` soll vermieden werden, da es zu Verwirrung führen kann, ob es sich um eine Methode zur Hinzufügung oder zum Setzen handelt.
:::

## GN26 Factory-Methode {#factory-method}

Methoden für das [Factory-Pattern](../4.designpatterns/factory-method) sollen mit `create` beginnen gefolgt von einem Nomen, das den Typ beschreibt.
Z.B. `createUser`, `createArticle`, `createProduct`.
Präpositionen wie `with`, `for`, `from`, `of` können verwendet werden, die Art der Factory-Methode zu beschreiben `createUserWithRole`, `createArticleForUser`, `createProductFromJson`.

## GN27 Verwechslung von Verben und Adjektive {#verwechslung-von-verben-und-adjektive}

Verben UND Adjektive ohne die hier vorgestellten Präfixe können zu Verwechslungen führen.
Einige dieser Worte im Englischen können durch ihre Schreibweise nicht unterschieden werden, ob sie ein Verb oder Adjektiv sind.

- `empty` kann ein Adjektiv (im Sinne `isEmpty`) oder ein Verb (`to empty`) sein.
- `free` kann ein Adjektiv (im Sinne `isFree`) oder ein Verb (`to free`) sein.
- `open` kann ein Adjektiv (im Sinne `isOpen`) oder ein Verb (`to open`) sein.

## GN28 Asynchrone Methoden {#asynchrone-methoden}

Methoden sollen anhand ihrer Funktionalität benannt werden, nicht anhand ihrer Implementierung.

- `loadUserDataAsync`, `requestUserData` lädt die Benutzerdaten asynchron
- `loadUserData`, `sendUserData` lädt die Benutzerdaten synchron

## Unbenutzte Namen in Variablen und Parameter

Es sollen keine unbenutzten Variablen und Parameter im Code vorhanden sein.

- Wenn die Funktionsdeklaration die Parameter vorschreibt, kann `_` als Platzhalter für unbenutzte Parameter verwendet werden.
- Mehrere unbenutzte Parameter können durch `(_, __, ___)` etc. gekennzeichnet werden.
- Ist der Einsatz von `_` nicht möglich, sollen die Parameter umbenannt werden, um zu verdeutlichen, dass sie nicht verwendet werden (`unused` bzw. `unusedName1`, `unusedName2`).
