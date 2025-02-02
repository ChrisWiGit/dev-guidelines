---
# https://vitepress.dev/reference/default-theme-home-page
layout: doc
customRulePrefix: MC
customIgnoreTitlesForRules: [Einleitung]
---

# Code-Metriken

## Einleitung {#einleitung}

Allen Kapiteln wurde eine eindeutige Nummerierung, der Richtliniennummer, hinzugefügt, um eine eindeutige Identifikation zu ermöglichen.
Jede Richtliniennummer besteht aus dem Buchstaben **MC**(Metrics for Code) gefolgt von einer Nummer, die den Abschnitt identifiziert. Damit kann eine Regel eindeutig identifiziert werden, z.B. für ein Code-Review.

## MC1 Arten von Code-Metriken {#arten-von-code-metriken}

### MC1 Quantitative Metriken

### MC1 Qualitiative Metriken

## MC2 Quantitative Metriken {#quantitative-metriken}

Von vielen der quantitativen Metriken können der Maximalwert, Durchschnittswert und Median (der Wert, der in der Mitte einer Liste von Werten liegt) berechnet werden.

* Anzahl Klassen (statisch oder nicht-statisch)
* Anzahl Methoden, Attribute, Variablen pro Klasse
* Anzahl Zeilen pro Methode, Klasse oder Modul
* Anzahl Kommentare pro Methode, Klasse oder Modul
* Anzahl Dokumentationskommentare pro Methode

## MC3 Qualitiative Metriken {#qualitiative-metriken}

* Kohäsion in Klassen
* Kopplung zwischen Klassen (hoch/niedrig)
* Kommentare
  * Art von Kommentar, z.B. TODO, FIXME, etc.
  * Inhalt des Kommentars, z.B. Beschreibung von Code oder Erklärung von Designentscheidungen
  * Nützlichkeit des Kommentars

::: danger TODO:
:::
