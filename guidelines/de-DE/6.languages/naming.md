
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

# Einheitliche Namensgebung

## Allgemeine Regeln

* Verwende so kurze und präzise Namen wie möglich.
* Verwende die gleichen Wörter für die gleichen Konzepte in der gesamten Codebasis.
* Verwende eindeutige Wörter, die Teil der Domänensprache sind.
* Vermeide Abkürzungen, die nicht allgemein bekannt sind.
* Vermeide Zahlen in Namen, wenn sie nicht Teil des Namens sind.
* Vermeide komplizierte oder nicht gebräuchliche Wörter.

## Prefixe und Suffixe

Vermeide Prefixe und Suffixe, wenn der Kontext bereits klar ist.

Beispiele:

* `name` statt `strName`, wenn der Typ klar ist.
* `age` statt `intAge`
* `Name` statt `NameType`
* `User::name()` statt `User::setUserName()`, wenn der Kontext Benutzer klar ist.
* `com.company.ClassName` statt `com.company.CompanyClassName`, wenn der Namespace die Trennung klar macht.

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

## Methodenpaare

Methoden, die ein Paar bilden, sollten mit den gleichen Wörtern beginnen. Zum Beispiel:

* get/put
* read/write
* add/remove
* store/retrieve
* open/dose
* load/save
* initialize/finalize (oder terminate)
* create/destroy
* insert/delete
* start/stop
* pause/resume
* start/finish
* increase/decrease
* increment/decrement
* encrypt/decrypt
* encode/decode
* obtain/forfeit (relinquish)
* use/release
* acquire/release
* reserve/release
* startup/shutdown
* login/logout
* begin/end
* launch/terminate
* publish/subscribe
* join/detach

Namen können auch mit Präfixen versehen werden, um die Bedeutung zu verdeutlichen. Zum Beispiel:

```
<something> / un<something>
<something> / de<something>
<something> / dis<something>
```

Beispiele:

* assign/unassign
* install/uninstall
* subscribe/unsubscribe
* follow/unfollow
* serialize/deserialize
* connect/disconnect