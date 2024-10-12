---
layout: doc
outline: [2, 2]

customRulePrefix: RFA
customIgnoreTitlesForRules: [Einleitung]
---

# Refactoring Allgemein

## Einleitung {#einleitung}

In diesem Dokument werden allgemeine Richtlinien für das Refactoring von Code beschrieben.
Diese Richtlinien sind unabhhängig von der Programmiersprache und können auf jede Sprache angewendet werden.
Für die Beispiele wird Java verwendet.

Allen Kapiteln wurde eine eindeutige Nummerierung, der Richtliniennummer, hinzugefügt, um eine eindeutige Identifikation zu ermöglichen.
Jede Richtliniennummer besteht aus dem Buchstaben **RFA**(Refactoring Alle Sprachen) gefolgt von einer Nummer, die den Abschnitt identifiziert.
Damit kann eine Regel eindeutig identifiziert werden, z.B. für ein Code-Review.

## RFA1 Umbenennen {#umbenennen}

Namen sollen manuell oder automatisiert umbenannt werden, um die Bedeutung des Codes zu verdeutlichen.

Namen sollen aussagekräftig und verständlich sein, damit der Inhalt der Variablen, Methoden, Klassen und Module klar ist.

Siehe dazu auch die Richtlinie [Benamung](../6.languages/naming.md).

## RFA2 Verantwortlichkeiten trennen {#verantwortlichkeiten-trennen}

Alle Verantwortlichkeiten sollen klar getrennt werden, um die Wartbarkeit zu verbessern.

Die Prinzipien [SRP](../2.principles/principles#single-responsibility-principle) und [ISP](../2.principles/principles#interface-segregation-principle) sind hierbei zu beachten.

## RFA3 Methoden extrahieren {#methoden-extrahieren}

Um Methoden einfacher zu verstehen, sollen sie in kleinere Methoden extrahiert werden.

Die Prinzipien [DRY](../2.principles/principles#dry) und [KISS](../2.principles/principles#kiss) sind hierbei zu beachten.

## RFA4 Variablen extrahieren {#variablen-extrahieren}

::: danger TODO
TODO
:::

## RFA5 Bedingungen vereinfachen {#bedingungen-vereinfachen}

## RFA6 Verschachtelungen durch Guard-Klauseln reduzieren {#verschachtelungen-reduzieren}

## RFA7 Bedingungen durch Polymorphismus ersetzen {#bedingungen-polymorphismus}

## RFA8 Sonderfälle behandeln {#sonderfaelle-behandeln}
<!-- p.336 -->
