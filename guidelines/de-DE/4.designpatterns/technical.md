---

layout: home
outline: [2, 2]

customRulePrefix: DPT
customIgnoreTitlesForRules: [Einleitung]

hero:
  name: Technische Ansätze
  text: Techniken
  tagline: Was es schon alles gibt
  actions:
    - theme: alt
      text: Allgemein
      link: ./general
    - theme: alt
      text: Erschaffungsmuster
      link: ./creational
    - theme: alt
      text: Strukturmuster
      link: ./structural
    - theme: alt
      text: Verhaltensmuster
      link: ./behavioral
    - theme: alt
      text: Architekturmuster
      link: ./architectural
    - theme: brand
      text: Technische Ansätze
      link: #
    - theme: alt
      text: Übersicht
      link: ./index
---

<!-- <img src="/diagram_light_128.png" alt="Creational Pattern" width="36" height="36"><br> -->

[[toc]]
<br>

# Technische Ansätze

## Einleitung {#einleitung}

Es gibt viele Programmieransätze, die sich bewährt haben und die in vielen Projekten eingesetzt werden.
Hier werden einige dieser Ansätze vorgestellt, die in der Softwareentwicklung eine wichtige Rolle spielen und nicht neu erfunden werden müssen.

Allen Kapiteln wurde eine eindeutige Nummerierung, der Richtliniennummer, hinzugefügt, um eine eindeutige Identifikation zu ermöglichen.
Jede Richtliniennummer besteht aus dem Buchstaben **DPT**(Design Pattern Technical) gefolgt von einer Nummer, die den Abschnitt identifiziert. Damit kann eine Regel eindeutig identifiziert werden, z.B. für ein Code-Review.

## DPT1 Feature Flags {#feature-flags}

Feature Flags sind Mechanismen, die es Entwicklern ermöglichen, bestimmte Funktionen oder Codeabschnitte zur Laufzeit zu aktivieren oder zu deaktivieren, ohne den Code neu zu deployen.
Dies unterstützt eine flexiblere und sicherere Softwarebereitstellung.

::: warning Feature-Flags sind keine Konfigurationsdateien

Feature Flags sollten nicht als Ersatz für Konfigurationsdateien verwendet werden.
Sie sind dazu gedacht, die Bereitstellung von Funktionen zu steuern, nicht die Konfiguration von Anwendungen.
Die Bereitstellung von Funktionen soll dabei sofort und ohne Neustart der Anwendung erfolgen.

:::

### DPT1 Vorteile von Feature Flags

Durch Feature Flags wird das Deployment vom Release entkoppelt, was folgende Vorteile bietet:

- **Trunk-Based Development:** Ermöglicht es, Code in den Hauptzweig zu integrieren, ohne dass er sofort für alle Benutzer sichtbar ist.
Wenn Features lange Zeit in eigenständigen Zweigen entwickelt werden, kann es zu Konflikten und Integrationsproblemen kommen.
- **Erhöhte Flexibilität:** Ermöglicht es Teams, Funktionen unabhängig vom Deployment-Zyklus zu steuern.
Dadurch kann Software bereits in ein Release integriert werden, bevor sie für alle Benutzer freigegeben wird.
- **Reduziertes Risiko:** Neue Funktionen können in kontrollierten Umgebungen getestet werden, bevor sie vollständig ausgerollt werden.
- **Schnellere Iteration:** Feedback kann schneller gesammelt und in die Entwicklung integriert werden, was die Produktentwicklung beschleunigt.

### DPT1 Anwendungsfälle für Feature Flags

- **Progressive Delivery:** Schrittweises Ausrollen von Funktionen an ausgewählte Benutzergruppen, um Feedback zu sammeln und die Systemstabilität zu gewährleisten.
- **Experimentation und A/B-Tests:** Testen verschiedener Varianten einer Funktion, um die effektivste Lösung zu identifizieren.
- **Schnelle Deaktivierung (Kill Switches):** Bei unerwarteten Problemen können Funktionen sofort deaktiviert werden, um negative Auswirkungen zu minimieren.
- **Infrastruktur-Migrationen:** Erleichterung von Übergängen, z. B. bei der Migration von Monolithen zu Microservices, bei Refactoring [Strangler Pattern](../5.refactoring/principals#strangler-pattern) oder bei der Einführung neuer Implementierungen, indem neue Implementierungen schrittweise aktiviert werden.
- **Veraltete Features:** Veraltete oder nicht mehr benötigte Features können testweise deaktiviert werden, um zu prüfen, ob der zuständige Code entfernt werden kann.

### DPT1 Best Practices

- **Sofortige Auswirkungen:** Änderungen an Feature Flags sollen sofort wirksam werden, ohne dass die Anwendung neu gestartet werden muss.
- **Verwaltung von technischen Schulden:** Veraltete oder nicht mehr benötigte Feature Flags sollten regelmäßig entfernt werden, um die Codebasis sauber zu halten.
- **Dokumentation:** Sorgfältige Dokumentation der Feature Flags und ihrer Zwecke, um Verwirrung im Team zu vermeiden.
- **Sicherheit:** Sicherstellen, dass Feature Flags nicht missbraucht werden können, um unautorisierte Funktionen zu aktivieren.

### DPT1 Quellen

- [Feature Flags - Martin Fowler](https://martinfowler.com/articles/feature-toggles.html)
- [Feature Flags - LaunchDarkly](https://launchdarkly.com/blog/what-are-feature-flags/)
- [Feature Toggle - Wikipedia](https://de.wikipedia.org/wiki/Feature_Toggle)


## DPT2 Null-Objekte {#null-objects}

Viele Sprachen ermöglichen es, Variablen mit einem `null`-Wert zu initialisieren (oder `nil`, `None`, `undefined`, etc.).
Dieser spezielle Fall wird von Entwicklern und Entwicklerinnen verwendet, um zu signalisieren, dass ein Wert nicht vorhanden ist.
Allerdings wird dieser Fall nicht immer korrekt kommuniziert oder einfach vom Benutzer übersehen.
Dies führt dann zur Laufzeit zu `NullPointerExceptions` oder noch schlimmeren Fehlern wie Speicherüberläufen.

Das Null-Objekt-Muster ist ein technischer Ansatz, um dieses Problem zu umgehen, indem ein spezielles Objekt erstellt oder verwendet wird, das den `null`-Wert repräsentiert, sich jedoch sonst wie ein normales Objekt mit leeren Werte verhält.

### DPT2 Beispiele

Ein Beispiel für die Verwendung des Null-Objekt-Musters ist die Verwendung eines leeren Arrays oder einer leeren Liste anstelle von `null`, um anzuzeigen, dass keine Elemente vorhanden sind.

```java
public List<String> getNames() {
    if (hasNames()) {
        return new ArrayList<>(Arrays.asList("Alice", "Bob", "Charlie"));
    } else {
        return Collections.emptyList();
    }
}
```

Ein String sollte niemals `null` sein, sondern stattdessen ein leerer String oder eine spezielle Konstante, die als Referenz verwendet werden.

::: code-group

```java [Leerer String]
public String getName() {
   // ...
   return "";
}
```

```java [Spezielle Konstante]
final static String NOT_DEFINED = "";

public String getName() {
   // ...
   return NOT_DEFINED;
}
// ...
boolean isUnDefined = getName() == NOT_DEFINED; // kein equals, da es sich um eine Referenz handelt
// isUnDefined == true
boolean isEmpty = getName().equals("");
// isEmpty == true
```
:::

Sobald ein Datenobjekt zurückgegeben soll, die Methode jedoch keinen Wert zurückgeben kann, sollte ein Null-Objekt zurückgegeben werden, das die Schnittstelle implementiert, jedoch keine Daten enthält.
Auch hier kann wieder ein *globales* Datenobjekt definiert werden, das verwendet werden kann, wenn der Benutzer prüfen möchte, ob ein Wert vorhanden ist (nicht-null) oder nicht (null).

> Ein Null-Objekt hat keine Auswirkungen auf die weitere Verarbeitung, da es keine Daten enthält und die weitere Verarbeitung nicht beeinflusst.

```java
public Data getData() {
    if (hasData()) {
        return new Data("important data");
    } else {
        return Data.NULL;
    }
}

// ...

Data data = getData();
// Zugriff immer sicher
data.doSomething();
if (data != Data.NULL) {
    // Daten verarbeiten
}
```

### DPT2 Legacy-Code

In Legacy-Code kann es schwierig sein, das Null-Objekt-Muster zu implementieren, da es viele Stellen gibt, an denen `null`-Werte verwendet werden.
Um das Null-Objekt-Muster in Legacy-Code zu implementieren, kann es erforderlich sein, den Code schrittweise zu refaktorisieren, um die Verwendung von `null`-Werten zu reduzieren.
Eine Möglichkeit besteht darin, Methoden-Aufrufe, die `null` zurückgeben können, in einer neuen Methode zu kapseln (Proxy-Muster), die das Null-Objekt-Muster implementiert.
Allerdings kann es erforderlich sein, dass weiter Code angepasst werden muss, da es sonst in UI-Elementen zu leeren Anzeigen, allerdings mit Funktionalität (z.B. Senden von leeren Daten) kommen kann.

**Schritte für eine Umstellung:**

1. **Identifizieren von `null`-Werten:** Suchen nach Stellen im Code, an denen `null`-Werte verwendet werden.
Prüfen, welche Datenobjekte `null` sein können und wie diese umstrukturiert werden können.
2. **Erstellen von Null-Objekten:** Erstellen von Null-Objekten für Datenobjekte, die `null` sein können.
Die einfachsten sind meist Listen, Maps und Arrays, welche durch leere Listen oder Arrays ersetzt werden können.
3. **Ersetzen von `null`-Werten:** Ersetzen von `null`-Werten durch Null-Objekte in eine eigenen gekapselten Methode.
Beachte, dass Fehler auch als solche behandelt werden müssen und nicht durch leere Datenobjekte ersetzt werden dürfen.
4. **Refaktorisieren:** Refaktorisieren des Codes, um die Verwendung von Null-Objekten zu erleichtern.
Folgecode muss ebenfalls angepasst werden, um die neuen Null-Objekte zu berücksichtigen.
Beispielsweise müssen UI-Elemente angepasst werden, die vorher auf `null` prüften und nun auf leere Datenobjekte prüfen müssen.
5. **Testen:** Testen des Codes, um sicherzustellen, dass die Umstellung erfolgreich war und keine neuen Fehler eingeführt wurden.


::: info Optional

Das Null-Objekt darf nicht mit einem Optional-Typ verwechselt werden, der in einigen Programmiersprachen wie Java oder Kotlin verwendet wird,
um einen Wert zu kapseln, der möglicherweise `null` sein kann.

:::

### DPT2 Best Practices

- **Architektur:** Entwerfe die Architektur der Anwendung so, dass das Null-Objekt-Muster einfach implementiert werden kann.
- **Konsistenz:** Stelle sicher, dass das Null-Objekt konsistent verwendet wird, um Verwirrung zu vermeiden.
- **Dokumentation:** Dokumentiere die Verwendung von Null-Objekten, um anderen Entwicklern und Entwicklerinnen zu helfen, den Code zu verstehen.
- **Testen:** Teste den Code, um sicherzustellen, dass das Null-Objekt korrekt implementiert ist und keine unerwarteten Fehler verursacht.
- **Refaktorisierung:** Refaktorisiere den Code schrittweise, um die Verwendung von `null`-Werten zu reduzieren und das Null-Objekt-Muster zu implementieren.
- **Fehlerbehandlung:** Behandle Fehler und Ausnahmen korrekt, um sicherzustellen, dass das Null-Objekt nicht für Fehler verwendet wird.
- **Sicherheit:** Stelle sicher, dass das Null-Objekt sicher verwendet wird und keine Sicherheitslücken verursacht.
- **Performance:** Achte darauf, dass das Null-Objekt keine unnötigen Ressourcen verbraucht und die Leistung der Anwendung nicht beeinträchtigt.

### DPT2 Argument Fail-Fast

Ein häufig vorgebrachtes Argument gegen das Null-Objekt-Muster ist, dass es Fehler verschleiern könnte, anstatt sie sofort erkennbar zu machen. Tatsächlich ist es in vielen Situationen essenziell, dass Fehler frühzeitig entdeckt werden, um deren Ursache schnell zu identifizieren und zu beheben.

Das Null-Objekt-Muster dient jedoch nicht dazu, Fehler zu verbergen, sondern vielmehr dazu, Fehler zu vermeiden, die durch vergessene oder inkonsistente `null`-Prüfungen entstehen. Durch die konsequente Verwendung von Null-Objekten wird sichergestellt, dass anstelle von `null` immer ein gültiges Objekt zurückgegeben wird, wodurch spezielle `null`-Prüfungen in der weiteren Verarbeitung überflüssig werden.

Ein **einfaches** Beispiel verdeutlicht, wie sich der Einsatz von Null-Objekten auf die Verarbeitung potenziell fehlender Daten auswirkt, ohne dabei explizite `null`-Prüfungen erforderlich zu machen:

```java
final static Integer NO_NUMBER = 0;

public Integer getNumber() {
  return NO_NUMBER;
}

// ...
Integer sum = getNumber() + 5;
sum = sum + 10;
// sum == 15
```

Durch die Rückgabe eines Null-Objekts (`NO_NUMBER` in diesem Fall) entfällt die Notwendigkeit, auf `null` zu prüfen, da der Code jederzeit mit einem gültigen Wert arbeitet. 
Dies ist möglich, da Null-Werte durch leere Werte ersetzt werden, die keine Auswirkungen auf die weitere Verarbeitung haben.
Auf diese Weise wird das Risiko von NullPointerExceptions effektiv minimiert, ohne die Nachvollziehbarkeit des Codes einzuschränken.

Weiterhin können Null-Objekte in einer Liste leicht aussortiert werden, indem dessen *leeren* Werte geprüft werden, denn der Zugriff auf dessen Methoden ist immer sicher.
Oberfläche-Elemente können auf leere Datenobjekte prüfen und entsprechend reagieren, ohne dass der Benutzer eine Fehlermeldung erhält.

Hier ist die überarbeitete Version des Abschnitts:  

### DPT2 Gegenbeispiel

Null-Werte sollten nicht als Ersatz für eine ordnungsgemäße Fehlerbehandlung verwendet werden, sondern als spezielle Werte, die eine klar definierte Bedeutung haben. 
Ein Gegenbeispiel könnte die Verwendung eines `NoUserFound`-Objekts als Null-Objekt für Benutzer sein. 
Dies ist nur in solchen Fällen sinnvoll, in denen die weitere Verarbeitung auch ohne einen Benutzer möglich ist. 
Andernfalls sollte ein Fehler geworfen werden, um explizit darauf hinzuweisen, dass kein Benutzer gefunden wurde.

Das folgende **schlechte Beispiel** zeigt die Verwendung eines Null-Objekts in einem Szenario, in dem das Fehlen eines Benutzers eigentlich einen Fehler darstellen sollte:

```java
public User getUser() {
    if (hasUser()) {
        return new RealUser(...);
    } 
    return User.NO_USER_FOUND;
}

// ...
User user = getUser();

if (user != User.NO_USER_FOUND) {
    // Benutzer verarbeiten
}
```

In diesem Fall wird das `NO_USER_FOUND`-Objekt verwendet, um das Fehlen eines Benutzers anzuzeigen. Dies kann jedoch zu **Sicherheits**-Problemen führen, da das Fehlen eines Benutzers hier ein Ausnahmefall sein sollte, der die weitere Verarbeitung verhindert. 
Das Codebeispiel erfordert zusätzliche Prüfungen auf das spezielle Objekt, wodurch potenziell Fehler übersehen werden können.

Stattdessen sollte in einem solchen Fall ein Fehler durch eine Ausnahme signalisiert werden, wie im folgenden **guten Beispiel**:

```java
public User getUser() {
    if (hasUser()) {
        return new RealUser(...);
    } 
    throw new UserNotFoundException("User not found");
}
```

Durch das Werfen einer spezifischen Ausnahme (`UserNotFoundException`) wird klar signalisiert, dass das Fehlen eines Benutzers ein Fehler ist und die weitere Verarbeitung nicht sinnvoll fortgesetzt werden kann. Dieses Vorgehen unterstützt das Fail-Fast-Prinzip und erleichtert die Fehlersuche, da Fehler frühzeitig erkannt und behandelt werden.

