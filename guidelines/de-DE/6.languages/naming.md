# Einheitliche Namensgebung

- [Einheitliche Namensgebung](#einheitliche-namensgebung)
  - [Allgemeine Regeln](#allgemeine-regeln)
  - [Prefixe und Suffixe](#prefixe-und-suffixe)
  - [Ganzzahlen](#ganzzahlen)
  - [Fließkommazahlen](#fließkommazahlen)
  - [Boolean](#boolean)
  - [Strings](#strings)
  - [Listen](#listen)
  - [Maps, Dictionary](#maps-dictionary)
  - [Tuple](#tuple)
  - [Optional](#optional)
  - [Klassen](#klassen)
  - [Interfaces](#interfaces)
  - [Funktionen und Methoden](#funktionen-und-methoden)
  - [Methodenpaare](#methodenpaare)
  - [Methoden mit Boolean-Rückgabewerten](#methoden-mit-boolean-rückgabewerten)
  - [Getter und Setter](#getter-und-setter)
  - [Build-Pattern Methoden](#build-pattern-methoden)

## Allgemeine Regeln

- Verwende so kurze und präzise Namen wie möglich.
- Verwende die gleichen Wörter für die gleichen Konzepte in der gesamten Codebasis.
- Verwende eindeutige Wörter, die Teil der Domänensprache sind.
- Vermeide Abkürzungen, die nicht allgemein bekannt sind.
- Vermeide Zahlen in Namen, wenn sie nicht Teil des Namens sind.
- Vermeide komplizierte oder nicht gebräuchliche Wörter.

## Prefixe und Suffixe

Vermeide Prefixe und Suffixe, wenn der Kontext bereits klar ist.

Beispiele:

- `name` statt `strName`, wenn der Typ klar ist.
- `age` statt `intAge`
- `Name` statt `NameType`
- `User::name()` statt `User::setUserName()`, wenn der Kontext Benutzer klar ist.
- `com.company.ClassName` statt `com.company.CompanyClassName`, wenn der Namespace die Trennung klar macht.

Sollten Prefixe oder Suffixe notwendig sein, sollten eine Aufteilung in Betracht gezogen werden nach dem Prinzip [Separation of Concerns](../2.principles/principles#soc).

## Ganzzahlen

## Fließkommazahlen

## Boolean

## Strings

## Listen

## Maps, Dictionary

## Tuple

## Optional

## Klassen

Klassen präsentieren Dinge oder Akteure.
Sie sollten daher konsistent benannt werden und mit einem Nomen enden.

## Interfaces

Interfaces präsentieren Dinge, Akteure oder Fähigkeiten und sollten ähnlich wie Klassen benannt werden, jedoch mit einem abstrakten Nomen enden (z.B. `Serializer`, `Comparator`, `Validator`).
Interfaces, die eine Fähigkeit präsentieren, sollten mit einem Adjektiv enden (z.B. `Serializable`, `Comparable`, `Validatable`).

## Funktionen und Methoden

Funktionen und Methoden sollten mit einem Verb beginnen, das die Aktion beschreibt, die sie ausführen.
Der Name beginnt mit einem Verb und bezieht dabei auch die Parameter mit ein, sodass der Name die Funktionalität der Methode beschreibt.
Namen können lang sein, solange sie die Funktionalität klar beschreiben.
Weiterhin kann das Verb ausgeschmückt werden, um die Aktion genauer zu beschreiben (`compareTextCaseInsensitive`).

Beachte jedoch auch:

- Methoden-/Funktionsnamen sollten nur eine Aktion beschreiben.
`DoSomethingAndSomethingElse` ist ein Hinweis auf eine zu komplexe Methode.
- Methoden-/Funktionsnamen sollten nur alphanumerische Zeichen enthalten (Buchstaben, Zahlen, Unterstriche).
- Methoden-/Funktionsnamen sollten nicht mehr als 25 Zeichen lang sein.
In diesem Fall sollte die Methode in kleinere Methoden aufgeteilt werden (siehe [Single Responsibility Principle](../2.principles/principles#srp)).
- Die Namen können Typen (z.B. `String`) enthalten, wenn die Sprache **nicht** typisiert ist (*JavaScript*) und der Typ nicht offensichtlich ist (`serializeJsonObject`).

Beispiele:

```text
serialize(json : JsonObject), aber serializeJsonObject(json)
deserialize(json : String)
validate(data : any)
compare(a : Integer, b : Integer) oder compareIntegers(a, b)
compareTextCaseInsensitive(a, b) oder compareCaseInsensitive(a: String, b: String)
```

## Methodenpaare

Methoden, die ein Paar bilden, sollten mit den gleichen Wörtern beginnen. Zum Beispiel:

- get/put
- read/write
- add/remove
- store/retrieve
- open/dose
- load/save
- initialize/finalize (oder terminate)
- create/destroy
- insert/delete
- start/stop
- pause/resume
- start/finish
- increase/decrease
- increment/decrement
- encrypt/decrypt
- encode/decode
- obtain/forfeit (relinquish)
- use/release
- acquire/release
- reserve/release
- startup/shutdown
- login/logout
- begin/end
- launch/terminate
- publish/subscribe
- join/detach

Namen können auch mit Präfixen versehen werden, um die Bedeutung zu verdeutlichen. Zum Beispiel:

```text
<something> / un<something>
<something> / de<something>
<something> / dis<something>
```

Beispiele:

- assign/unassign
- install/uninstall
- subscribe/unsubscribe
- follow/unfollow
- serialize/deserialize
- connect/disconnect

## Methoden mit Boolean-Rückgabewerten

Methoden, die einen Boolean-Wert zurückgeben, sollten mit einem Präfix `is`, `has`, `can`, `should` oder `will` gefolgt von einem Adjektiv beginnen.

Beispiele:

```text
isReady()
hasChildren()
canEdit()
shouldDisplay()
willDestroy()
```

> Der Präfix `does` sollte vermieden werden, da er durch die anderen Präfixe besser ersetzt werden kann.

::: info
Spezifischere Präfixe wie `contains` oder `supports` sollten verwendet werden, wenn sie besser in den Kontext passen.
:::

## Getter und Setter

Getter sollten **kein** Präfix haben, Setter sollten mit `set` beginnen.
Die Silbe `get` ist überflüssig, da sie keine zusätzliche Information hinzufügt (wie z.B. auch der Typname im Variablenname).
Heutige Entwicklungsumgebungen bieten Code-Vervollständigung, sodass der Unterschied zwischen Getter und Setter offensichtlich ist.
Stattdessen sollen Domain-spezifische Namen direkt verwendet werden

Beispiele:

```text
`name()` statt `getName()`
```

> Manche Programmiersprachen erfordern die Verwendung von `get` und `set` für Getter und Setter.

::: warning
Wenn Klassen nur aus Getter und Setter bestehen, sollte die Klasse neu bewertet werden, da sie gegen das Prinzip [Information Hiding](../2.principles/principles#ih) verstößt.
:::

## Build-Pattern Methoden

Methoden für das [Build-Pattern](../4.designpatterns/builder) sollen mit `with` beginnen.
Das `Endstück` solle den Namen `build` haben, denn der Kontext sollte mit dem Namen der Klasse oder der Builder-Methode klar sein.

Beispiele:

```text
PersonBuilder
.withName(name)
.withAge(age)
.withAddress(address)
.build()
```

> Das Prefix `add` sollte vermieden werden, da es zu Verwirrung führen kann, ob es sich um eine Methode zur Hinzufügung oder zum Setzen handelt.
