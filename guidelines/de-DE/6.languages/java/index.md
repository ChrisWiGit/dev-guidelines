---
# https://vitepress.dev/reference/default-theme-home-page
layout: doc
outline: [2, 2]
customRulePrefix: J
customIgnoreTitlesForRules: [Einleitung]
---

# Richtlinien für Java

## Einleitung {#einleitung}

Allen Kapiteln wurde eine eindeutige Nummerierung, der Richtliniennummer, hinzugefügt, um eine eindeutige Identifikation zu ermöglichen.
Jede Richtliniennummer besteht aus dem Buchstaben **J**(Java) gefolgt von einer Nummer, die den Abschnitt identifiziert. Damit kann eine Regel eindeutig identifiziert werden, z.B. für ein Code-Review.

::: info
Alle Beispiele sind mit 2 Leerzeichen eingerückt, da dies in Markdown die beste Darstellung bietet.
:::

## J1 Allgemeine Regeln {#allgemeine-regeln}

Es gelten die [Allgemeinen Regeln für Sprachen](../general).

## J2 Einheitliche Namensgebung {#einheitliche-namensgebung}

Es gelten die Regeln für eine [Einheitliche Namensgebung](../naming), wenn für Java anwendbar.

## J3 Abstraktionsschichten {#abstraktionsschichten}

Zugriffe auf unterliegende Schichten (Vergleich mit [GL3 Abstraktionsschichten](../general#abstraktionsschichten)) sollen in Java vermieden werden.

### J3 Problem

Der direkte Zugriff auf unterliegende Schichten wie Datenbanken, APIs oder andere externe Dienste kann zu einer starken Kopplung und Abhängigkeit führen.
Dies ist insbesondere problematisch, wenn der Zugriff direkt in den Anwendungscode (Business-Logik) eingebettet ist und somit eine Mischung von unterschiedlichen Code-Schichten entsteht.

```java
public void onClick() {
  try {
    const connection = this.db.connect();
    const data = connection.query('SELECT * FROM business');

    this.api.sendData(data, { options: "abc;charset=utf-8" });

    this.ui.editText.setText(data);
  } catch (e) {
    System.out.println(e);      
  }
}
```

### J3 Lösung

- Um die Abhängigkeit von unterliegenden Schichten zu reduzieren, sollen Zugriffe auf diese Schichten in separate Klassen oder Module ausgelagert werden.
- Dependency Injection (DI) soll verwendet werden, um die Abhängigkeiten zwischen den Schichten zu verwalten und den Zugriff auf unterliegende Schichten zu ermöglichen.
- Die Business-Logik soll von der Implementierungsdetails getrennt werden, um eine klare Trennung der Verantwortlichkeiten zu gewährleisten.
- Fehlerbehandlung soll in der UI-Schicht über einen allgemeinen Fehlermechanismus erfolgen, um die Business-Logik nicht mit Fehlerbehandlung zu belasten.
Nur behandelbare Fehler sollen selbst behandelt werden.
- Der Einsatz eines Modellansatzes wie MVC, MVP oder MVVM kann helfen, die Business-Logik von der UI zu trennen.
- Architekturansätze wie Domain-Driven Design (DDD), Model-Driver Architecture (MDA) oder Clean Architecture können ebenfalls helfen, die Abhängigkeiten zu reduzieren und die Business-Logik zu isolieren.

```java
public void onClick() {
  const data = this.dbDi.getBusinessData();
  
  this.apiDi.sendDataToFoo(data);

  this.uiDi.updateBusinessData(data);
}
```

### J3 Vorteile

- Simple und klare Struktur in den Methoden/Funktionen
- Reduzierung der Abhängigkeiten zwischen den Schichten
- Klare Trennung der Verantwortlichkeiten
- Verbesserte Wartbarkeit und Erweiterbarkeit des Codes
- Verbesserte Testbarkeit durch die Möglichkeit, die unterliegenden Schichten zu mocken

### J3 Nachteile

- Erhöhter Aufwand durch die Notwendigkeit, zusätzliche Klassen oder Module zu erstellen
- Erhöhter Aufwand durch die Notwendigkeit, Dependency Injection zu verwenden
- Überblick über die Abhängigkeiten und Struktur des Codes kann schwieriger sein
- Verhalten zur Laufzeit ist nicht direkt aus dem Code ersichtlich

### J3 Ausnahmen

- In *Prototypen* kann der direkte Zugriff auf unterliegende Schichten akzeptabel sein.
Der Prototyp muss jedoch nachträglich dahingehend refaktorisiert werden, dass die Zugriffe auf unterliegende Schichten in separate Klassen oder Module ausgelagert werden.
- In *kleinen Anwendungen* oder Tools kann der direkte Zugriff auf unterliegende Schichten akzeptabel sein.

## J4 Trennung von operationalem und integrativem Code {#trennung-von-operationalem-und-integrativem-code}

Nach dem **Integration Operation Segregation Principle** soll Code entweder Operations-Logik oder Integration-Logik enthalten, aber nicht beides.

<!-- !glossary-->
::: info Operation vs. Integration

Eine **Operations-Logik** enthält Bedingungen, Schleifen, etc., die die Geschäftsregeln implementieren.
Auch API-Aufrufe oder andere I/O-Operationen gehören zur Operations-Logik.

Eine **Integration-Logik** enthält Code, der andere Code verwendet, um die Operations-Logik zu implementieren.

Eine **Hybrid-Logik** enthält sowohl Operations- als auch Integrationslogik.

:::

### J4 Problem

Funktionale Abhängigkeiten sin ein Symptom von sich schlecht änderbaren Codes.
Durch die Vermischung von Operations- und Integrationslogik wird der Code unübersichtlich und schwer verständlich und lässt sich nur schwer automatisiert testen oder refaktorisieren.

Wenn in Methoden oder Funktionen verhaltenserzeugende Anweisungen (if, while, for, etc.) mit Aufrufen anderer Methoden derselben Codebasis gemischt sind, ist nicht mehr klar erkennbar, wie das Gesamtverhalten entsteht, da viel zu viel in der Methode oder Funktion passiert.

Solche Methoden tendieren oftmals dazu unbegrenzt zu wachsen.

Im folgenden Code besteht keine klare Trennung zwischen Operations- und Integration-Logik.
Es wurde einfach die Lösung "herunter-programmiert" und die Logik in einer Methode zusammengefasst.
Als Beispiel ist eine **kleine** Funktion gegeben, die in der Praxis oftmals deutlich größer und komplexer ist.

```java
public void onClick(String input) {
  String value = myInput.getText();

  if (input == null) {
    return;
  }
  
  final Connection connection = db.connect();
  ResultSet data = connection.query("SELECT * FROM Business");

  if (data.foo == 0) {
    data = connection.query("SELECT * FROM FooFoo");
  }

  api.sendData(data, "abc;charset=utf-8");

  myDiv.setText(data);
}
```

### J4 Lösung

Die Trennung kann durch die Verwendung von mehreren Zwischenmethoden erreicht werden, die die Operations- und Integrationslogik trennen.

<!-- !glossary-->
::: info Guard Clause

Strenggenommen ist die Guard Clause eine Operations-Logik, welche die Methode nach IOSP auch zu einer Operations-Logik, statt einer Integration-Logik macht.

:::

::: warning Folge dem Prinzip nicht blind

Beachte: Es steht die Lesbarkeit und Verständlichkeit des Codes im Vordergrund!

Wie stark eine Trennung durchgeführt werden soll, wird durch die Größe und Komplexität der Methode bestimmt.

Konzentriere dich daher darauf, die Methoden und Funktionen soweit zu trennen, dass sie leicht verständlich und testbar sind.

Es ist nicht erforderlich, dass jede Methode entweder nur Operations- oder Integrationslogik enthält, nur damit das Prinzip zu 100% eingehalten wird.

:::

```java
public void onClick(String input) {
  // Integration-Logik
  // und Trennung von UI und Business-Logik
  final String value = myInput.getText();

  processData(input);
}

// Hybrid-Logik, wenn guard clause mitgezählt wird
void processData(String input) {
  if (input == null) {
    // Guard clause, macht die Methode zu einer Operations-Logik
    return;
  }

  // Integration-Logik
  final Connection connection = db.connect();
  final ResultSet data = getDataFromBusinessOrFooTable(connection);

  sendData(data);
  setElementData(data);
}

ResultSet getDataFromBusinessTable(Connection connection) {
  // Operation-Logik, da Datenbankabfrage
  return connection.query("SELECT * FROM Business");
}

ResultSet getDataFromFooTable(Connection connection) {
  // Operation-Logik, da Datenbankabfrage
  return connection.query("SELECT * FROM FooFoo");
}

// Hybrid-Logik könnte weiter aufgeteilt werden
// aber die Trennung von Operations- und Integration-Logik ist bereits deutlich
ResultSet getDataFromBusinessOrFooTable(Connection connection) {
  final ResultSet data = getDataFromBusinessTable(connection);

  // Beispiel-If-Abfrage
  if (data.foo == 0) {
    return getDataFromFooTable(connection);
  }

  return data;
}

void sendData(ResultSet data) {
  // Operation-Logik, da API-Aufruf
  api.sendData(data, "abc;charset=utf-8");
}

void setElementData(ResultSet data) {
  // Operation-Logik, da UI-Aufruf
  myDiv.setText(data);
}

```

::: warning Code-Größe

Im Allgemeinen führt IOSP zu kürzeren Methoden, da die Operations- und Integrationslogik getrennt sind.
Jedoch wird insgesamt mehr Code geschrieben, da die Trennung zu mehr Methoden führt, welche neue Zeilen hinzufügen.

:::

### J4 Vorteile

- Durch die strikte Trennung von Operations- und Integration-Logik wird der Code übersichtlicher und leichter verständlich.
- Methoden/Funktionen sind einzeln einfacher zu lesen, da sie kurz sind.
- Methoden/Funktionen sind einzeln einfacher zu testen.
- Korrektheit von Integrationen lässt sich leicht durch Augenscheinnahme prüfen.
- Es gibt oftmals eine **Haupteinstiegs**-Methode, die die Integration-Logik koordiniert und die Operations-Logik in separaten Methoden aufruft.
- Integrations-Methoden/Funktionen lassen sich leicht erweitern, indem neue Methoden hinzugefügt werden, um neue Anforderungen zu erfüllen.

### J4 Nachteile

- Die Trennung von Operations- und Integration-Logik kann zu mehr Code führen, da mehr Methoden/Funktionen erstellt werden müssen.

### J4 Ausnahmen

- In kleinen Anwendungen oder Prototypen kann die Trennung von Operations- und Integration-Logik übertrieben sein.
- Die strikte Trennung kann in manchen Fällen unnötigen Overhead verursachen (siehe Trennung von `getOrCreateUser` und `getUser`).

```java
class UserService {
  private List<User> database;

  public UserService(List<User> database) {
    this.database = database;
  }

  // Operation: Benutzer suchen (nur Leseoperation)
  public User findUser(int id) {
    for (User user : database) {
      if (user.getId() == id) {
        return user;
      }
    }
    return null;
  }

  // Operation: Benutzer erstellen (nur Schreiboperation)
  public User createUser(int id) {
    User newUser = new User(id, "New User");
    database.add(newUser);
    return newUser;
  }

  // Operation: Benutzer holen oder erstellen (Logik zur Entscheidung, ob ein Benutzer erstellt werden muss)
  public User getOrCreateUser(int id) {
    User user = findUser(id);
    return user != null ? user : createUser(id);
  }

  // Integration: Koordiniert nur den Aufruf von getOrCreateUser
  public User getUser(int id) {
    return getOrCreateUser(id);
  }

  // Alternative Methode mit Hybrid aus Operations- und Integrationslogik
  public User getUserAlternative(int id) {
    User user = findUser(id);
    if (user == null) {
      user = createUser(id);
    }
    return user;
  }
}
```

## J5 Anwendung von neuen Java-Sprachfeatures {#anwendung-von-neuen-java-sprachfeatures}

- Der Einsatz von neuen Java-Sprachfeatures gegenüber alten Sprachfeatures soll bevorzugt werden.
- Alte Sprachfeatures, insbesondere die als veraltet markierten, sollen vermieden und im Zuge von Refaktorisierungen durch neue Sprachfeatures ersetzt werden.

### J5 Problem {#problem}

Java wird ständig weiterentwickelt und neue Sprachfeatures werden eingeführt, um die Sprache zu verbessern und die Entwicklung zu erleichtern.
Der Einsatz von veralteten Sprachfeatures kann zu schlechterer Lesbarkeit, Wartbarkeit und Performance führen.
Letztendlich kann der Code nicht mehr mit neuen Compiler-Versionen kompiliert werden, wenn veraltete Sprachfeatures entfernt werden.

### J5 Lösung {#loesung}

Neue Sprachfeatures wie Lambda-Ausdrücke, Streams, Optionals, Records, Pattern Matching, Sealed Classes, Text Blocks, etc. sollen bevorzugt verwendet werden, um den Code zu verbessern und die Entwicklung zu erleichtern.

Folgende Sprachfeatures sind als veraltet markiert und sollen nicht mehr verwendet werden:

- Generics mit Raw Types (z.B. `List list = new ArrayList();`).
- `Vector` und `Hashtable` sollen durch `ArrayList` und `HashMap` ersetzt werden.
- `Enumeration` soll durch `Iterator` ersetzt werden.
- `StringBuffer` soll durch `StringBuilder` ersetzt werden.
- `Date` und `Calendar` sollen durch `LocalDate`, `LocalTime`, `LocalDateTime`, `ZonedDateTime` oder `Instant` ersetzt werden.
- `SimpleDateFormat` soll durch `DateTimeFormatter` ersetzt werden.
- `Random` soll durch `ThreadLocalRandom` ersetzt werden.
- `System.out` und `System.err` sollen durch `Logger` und einem Framework wie SLF4J ersetzt werden.

Neue Sprachfeatures sind zum Beispiel:

- **Lambda-Ausdrücke** für die Implementierung von Funktions-Interfaces.
- `var` für lokale Variablen, um den Code zu vereinfachen.
- **Streams** für die Verarbeitung von Daten.
- **Optionals** für die Behandlung von Null-Werten.
- **Records** für die Definition von Datenklassen.
- **Pattern Matching** für die Vereinfachung von `instanceof`-Abfragen.
- **Sealed Classes** für die Definition von geschlossenen Klassen.
- **Text Blocks** für die Definition von mehrzeiligen Strings.
- **Switch Expressions** für die Vereinfachung von `switch`-Anweisungen.

::: code-group

```java [Lambda]
final List<String> list = Arrays.asList("a", "b", "c");

// Alte Schreibweise // [!code --]
list.forEach(new Consumer<String>() { // [!code --]
    @Override // [!code --]
    public void accept(String s) { // [!code --]
        System.out.println(s); // [!code --]
    } // [!code --] 
}); // [!code --]

// Neue Schreibweise // [!code ++]
list.forEach(s -> System.out.println(s)); // [!code ++]
// Methodenreferenz // [!code ++]
list.forEach(System.out::println); // [!code ++]
```

```java [var]
// Alte Schreibweise // [!code --]
List<String> list = new ArrayList<>(); // [!code --]

// Neue mögliche Schreibweise // [!code ++]
var list = new ArrayList<String>(); // [!code ++]
```

```java [Streams]
List<String> list = Arrays.asList("a", "b", "c"); 

// Alte Schreibweise // [!code --]
List<String> newList = new ArrayList<>(); // [!code --]
for (String s : list) { // [!code --]
    if (s.startsWith("a")) { // [!code --]
        newList.add(s); // [!code --]
    } // [!code --]
} // [!code --]

// Neue Schreibweise // [!code ++]
List<String> newList = list.stream() // [!code ++]
    .filter(s -> s.startsWith("a")) // [!code ++]
    .collect(Collectors.toList()); // [!code ++]
```

```java [Optional]
String str = "123";

// Alte Schreibweise // [!code --]
Integer i = null; // [!code --]
try { // [!code --]
    i = Integer.parseInt(str); // [!code --]
} catch (NumberFormatException e) { // [!code --]
    i = 0; // [!code --]
} // [!code --]

// Neue Schreibweise // [!code ++]
Integer i = Optional.ofNullable(str) // [!code ++]
    .map(Integer::parseInt) // [!code ++]
    .orElse(0); // [!code ++]
```

```java [Records]
// Alte Schreibweise // [!code --]
class Person { // [!code --]
    private String name; // [!code --]
    private int age; // [!code --]

    public Person(String name, int age) { // [!code --]
        this.name = name; // [!code --]
        this.age = age; // [!code --]
    } // [!code --]

    public String getName() { // [!code --]
        return name; // [!code --]
    } // [!code --]

    public int getAge() { // [!code --]
        return age; // [!code --]
    } // [!code --]
} // [!code --]

// Neue Schreibweise // [!code ++]
record Person(String name, int age) {} // [!code ++]
```

```java [sealed]
// sealed ermöglicht die Definition von Klassen, deren Unterklassen 
// von vorneherein auf bestimmte Unterklassen beschränkt sind.

// Alte Schreibweise // [!code --]
abstract class Shape { // [!code --]
    public abstract double area(); // [!code --]
} // [!code --]

class Circle extends Shape { // [!code --]
    private double radius; // [!code --]

    public Circle(double radius) { // [!code --]
        this.radius = radius; // [!code --]
    } // [!code --]

    @Override // [!code --]
    public double area() { // [!code --]
        return Math.PI * radius * radius; // [!code --]
    } // [!code --]
} // [!code --]

// Neue Schreibweise // [!code ++]
sealed abstract class Shape permits Circle, Square { // [!code ++]
    public abstract double area(); // [!code ++]
} // [!code ++]

final class Circle extends Shape { // [!code ++]
    private double radius; // [!code ++]

    public Circle(double radius) { // [!code ++]
        this.radius = radius; // [!code ++]
    } // [!code ++]

    @Override // [!code ++]
    public double area() { // [!code ++]
        return Math.PI * radius * radius; // [!code ++]
    } // [!code ++]
} // [!code ++]

// und so weiter für Square
```

```java [Textblocks]
// Alte Schreibweise // [!code --]
String html = "<html>\n" + // [!code --]
    "    <body>\n" + // [!code --]
    "        <p>Hello, World!</p>\n" + // [!code --]
    "    </body>\n" + // [!code --]
    "</html>\n"; // [!code --]

// Neue Schreibweise // [!code ++]
// Text Blocks // [!code ++]
String html = """ // [!code ++]
    <html> 
        <body>
            <p>Hello, World!</p>
        </body>
    </html>
    """; // [!code ++]
```

```java [Switch-expression]
//switch expression ermöglicht die Verwendung von switch als Ausdruck
//Das Schlüsselwort break fehlt, da es nicht mehr notwendig ist.

// Alte Schreibweise // [!code --]
String result; // [!code --]
switch (day) { // [!code --]
    case MONDAY: // [!code --]
    case TUESDAY: // [!code --]
    case WEDNESDAY: // [!code --]
    case THURSDAY: // [!code --]
    case FRIDAY: // [!code --]
        result = "Weekday"; // [!code --]
        break; // [!code --]
    case SATURDAY: // [!code --]
    case SUNDAY: // [!code --]
        result = "Weekend"; // [!code --]
        break; // [!code --]
} // [!code --]

// Neue Schreibweise // [!code ++]
String result = switch (day) { // [!code ++]
    case MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY -> "Weekday"; // [!code ++]
    case SATURDAY, SUNDAY -> "Weekend"; // [!code ++]
}; // [!code ++]
```

:::

## J6 Benennung von Variablen, Funktionen, Klassen und mehr {#benennung-von-variablen-funktionen-klassen-und-mehr}

- Variablen sind im **camelCase** <img src="/camel.png" width="24" height="24" alt="Ein Kamel mit einem Buckel in der Mitte beschreibt camelCase, in dem der erste Buchstabe klein ist und jeder folgende Wortanfang groß geschrieben wird." style="display: inline;" /> zu benennen: `myVariable`.
- Funktionen oder Methoden sind im **camelCase** zu benennen `myFunction()` oder `myMethod()`.
- Klassen sind im **PascalCase** zu benennen `MyClass`.
- Globale Konstanten sind in **UPPER_SNAKE_CASE** zu benennen `MY_CONSTANT`.
- Statische Klassen-Konstanten sind in **UPPER_SNAKE_CASE** zu benennen `MY_CLASS_CONSTANT`.
- Lokale Konstanten können in **camelCase** sein `myConstant` oder in **UPPER_SNAKE_CASE** `MY_CONSTANT`, wenn sie z.B. einen einzigen Wert definieren.
- Parameter sind im **camelCase** zu benennen `myParameter`.
- Exceptions sind in **PascalCase** zu benennen `MyException` und enden mit `Exception`.
- Typen sind in **PascalCase** zu benennen `MyType`.
- Interfaces sind in **PascalCase** zu benennen `MyInterface`.
- Enumerations sind in **PascalCase** zu benennen `MyEnum`.
- Objekt-Instanzen sind wie Variablen zu benennen `myObject`.

```java
public class GlobalAnyClass {
  // Konstanten
  private static final int THE_ANSWER = 42;
}

public class Example {
  public static void myFunction(int myParameter) throws MyException {
    final int myConstant = THE_ANSWER;
    final MyObject myObject = new MyObject("value");

    if (myObject.getKey().equals(String.valueOf(myConstant))) {
      throw new MyException("Error");
    }
  }
}

// Klasse MyClass
class MyClass {
  public static final int MY_CLASS_CONSTANT = 42;

  // Enum als Ersatz für JS Symbol
  public enum MyEnum {
    RED,
    GREEN,
    BLUE
  }

  public void myMethod() {
    MyEnum myEnum = MyEnum.RED;
    // Nutzung von myEnum...
  }
}

```

<!-- !glossary -->
::: details Schein-Konstanten

Objekte oder Array-Inhalte sind immer veränderbar, auch wenn sie mit `final` deklariert werden.
Nur die Zuweisung der Variable ist konstant, nicht der Wert.

In Java gibt es keine Möglichkeit, den Inhalt eines Objekts oder Arrays zu sperren.
Alternativen sind die Software Prinzipien [Tell, don't ask](../../2.principles/principles#tda-ie) und [Information Hiding](../../2.principles/principles#ih-e).
:::

## J7 Reihenfolge der Deklarationen {#reihenfolge-der-deklarationen}

Die Reihenfolge der Deklarationen soll konsistent sein und die Lesbarkeit des Codes verbessern.

### J7 Reihenfolge in Funktionen und Methoden

Die Deklaration von Variablen und Konstanten innerhalb von Scope-Blöcken soll in folgender Reihenfolge erfolgen:

1. Umschließender Funktions- oder Block-Scope
   1. Konstanten
   2. Variablen
   3. Funktionen

```java
public void myFunction() {
  final int myConstant = 42;
  int myVariable = 42;

  void myInnerFunction() {
    final int innerConstant = 42;
    int innerVariable = 42;

    // Code
  }
}
```

### J7 Reihenfolge in Klassen

In Klassen sollen die Deklarationen in folgender Reihenfolge erfolgen:

1. Statische Klassen-Konstanten
2. Statische Klassen-Methoden
3. Klassen-Konstanten sind in der Regel statisch, daher keine zusätzlichen Klassen-Konstanten.
4. Klassen-Attribute
5. Konstruktoren
6. Klassen-Methoden
7. Getter und Setter (vermeiden, siehe [Tell, don't ask](../../2.principles/principles#tda-ie))
8. Methoden für `toString`, `equals`, `hashCode`, `compareTo` und `compare`
9. Methoden für `clone` und `copy` für die Interfacen `Cloneable` und `Copyable`

```java
public class MyClass implements Cloneable {
    // 1. Statische Klassen-Konstanten
    public static final int MY_CLASS_CONSTANT = 42;

    // 2. Statische Klassen-Methoden
    public static void myStaticMethod()

    // 3. Klassen-Konstanten (keine zusätzlichen, da MY_CLASS_CONSTANT schon statisch ist)

    // 4. Klassen-Attribute
    private int myAttribute = 42;

    // 5. Konstruktoren
    public MyClass() {
        // Konstruktorlogik
    }

    public void myMethod() {
        // Normale Methode
        System.out.println("Instance method called.");
    }

    // 7. Getter und Setter (vermeiden, aber falls benötigt)
    public int getMyAttribute() {
        return myAttribute;
    }

    public void setMyAttribute(int value) {
        this.myAttribute = value;
    }

    // 8. Methoden für toString, equals, hashCode, compareTo und compare
    @Override
    public String toString()

    @Override
    public boolean equals(Object other)

    @Override
    public int hashCode()

    public int compareTo(MyClass other)

    @Override
    protected MyClass clone()
}

```

### J7 Ausnahmen

- Zwischenberechnungen für Konstanten oder Variablen können vor der Verwendung deklariert werden, wenn es nicht anders geht.
- In Fällen, in der eine besser Verständlichkeit des Codes durch eine andere Reihenfolge erreicht wird, kann von der oben genannten Reihenfolge abgewichen werden.

## J8 Verwendung von `final` für alle Variablen und Methoden/Funktions-Parameter Kennzeichnung von Nicht-Konstanten {#verwendung-von-final-fuer-alle-variablen-und-methoden-funktions-parameter-kennzeichnung-von-nicht-konstanten}

Variablen enthalten für gewöhnlich Werte, die sich während der Laufzeit des Programms nicht ändern.
Eine erneute Zuweisung von Werten zu Variablen kann zu unerwartetem Verhalten führen, weil sich der Wert plötzlich ändert oder versehentlich undefiniert wird.

- Variablen und Parameter sollen daher mit `final` deklariert werden, um sicherzustellen, dass sie nicht versehentlich geändert werden.
- Eine erneute Zuweisung von Werten zu Variablen soll vermieden werden, um unerwartetes Verhalten zu vermeiden.
Stattdessen sollen neue Variablen deklariert werden, wenn ein neuer Wert benötigt wird.
- Ist eine erneute Zuweisung von Werten notwendig, soll ein Kommentar mit dem Inhalt `/*nonfinal*/` hinzugefügt werden, um darauf hinzuweisen und dies auch einem Code-Review zu signalisieren, dass der Entwickler sich der Änderung bewusst ist.

### J8 Problem

Die Verwendung von `final` sorgt dafür, dass Variablen nicht versehentlich geändert werden. Ohne die Verwendung von `final` besteht die Gefahr, dass Variablen unbeabsichtigt überschrieben werden.
Dies kann dazu führen, dass sich der Wert von Variablen, Attributen oder Parametern unerwartet ändert und dadurch unerwünschte Nebeneffekte auftreten können.
Dies passiert beispielsweise dann, wenn die Variable, das Attribut oder der Parameter in einem anderen Teil des Codes nachträglich und von einer anderen Person unerwartet geändert wird.
Dadurch wird die Lesbarkeit und Nachvollziehbarkeit des Codes erschwert.

```java
String name = "John";
int age = 30;

// ...

name = "Jane"; // Unbeabsichtigte Änderung der Variable
// schlimmer
name = null;

void myFunction(int count) {
  count++;

  // originaler Wert von count ist verloren
}
```

### J8 Lösung

Um unbeabsichtigtes Ändern von Variablen zu vermeiden, sollen alle Variablen mit `final` deklariert werden.
In Fällen, in denen die Verwendung von `final` nicht möglich ist (z. B. bei Variablen, die sich ändern müssen), soll ein Kommentar mit dem Inhalt `/*nonfinal*/` hinzugefügt werden, um darauf hinzuweisen.

```java
final String name = "John";
final int age = 30;

// ...

/*nonfinal*/ int count = 0;

// oder
/*nonfinal*/
int count = 0;

count++;

void myFunction(final int count) {
  // count kann nicht verändert werden
  final int increasedByOneCount = count + 1;
}
```

### J8 Vorteile

- Vermeidung unbeabsichtigter Änderungen von Variablen
- Klarheit in Bezug auf die Veränderlichkeit von Variablen
- Verbesserte Code-Qualität und Verständlichkeit
- Entspricht dem Prinzip Least Astonishment

### J8 Nachteile

Es gibt Situationen, in denen die Verwendung von `final` nicht möglich oder sinnvoll ist, z. B. bei Variablen, die sich ändern müssen oder in komplexen Legacy-Code.
In solchen Fällen kann die Kennzeichnung mit einem Kommentar `/nonconst*/` helfen, auf die Ausnahme hinzuweisen.

## J9 Einsatz von Linter und Formatter {#einsatz-von-linter-und-formatter}

Tools wie [Checkstyle](https://checkstyle.sourceforge.io/), [PMD](https://pmd.github.io/), [SpotBugs](https://spotbugs.github.io/) und [SonarLint oder SonarQube](https://www.sonarqube.org/) sollen verwendet werden, um sicherzustellen, dass der Code den definierten Richtlinien entspricht und potenzielle Fehler und Probleme im Code identifiziert werden.

Formatierungs-Tools wie Eclipse, IntelliJ IDEA, VS Code oder Eclipse sollen verwendet werden, um den Code automatisch zu formatieren und die Einhaltung der Formatierungsrichtlinien zu gewährleisten.

::: warning Formatierer-Konfiguration

Formatierer müssen so konfiguriert werden, dass sie für alle Entwickler im Team die gleichen Einstellungen verwenden.
Andernfalls kann es zu Konflikten bei der Versionierung des Codes kommen.

:::

## J10 Verwende CompletableFuture für kurze asynchrone Operationen {#verwende-completablefuture-fuer-kurze-asynchrone-operationen}

CompletableFuture soll für kurze asynchrone Operationen verwendet werden, um die Lesbarkeit und Wartbarkeit des Codes zu verbessern.

### J10 Problem

Der Einsatz von `Thread` oder `ExecutorService` für asynchrone Operationen kann zu komplexem und schwer verständlichem Code führen.
Die Verwendung von `Thread` oder `ExecutorService` erfordert die explizite Verwaltung von Threads und die Synchronisation von Threads, was zu Fehlern und unerwartetem Verhalten führen kann.
Diese Thread müssen explizit gestartet und beendet werden, was zu zusätzlichem Code führt.
Für kurze Operationen kann der Start einen Threads im Betriebssystem teurer sein, als die Operation selbst, was zu Warterzeiten und Problemen mit Performance führen kann.

### J10 Lösung

CompletableFuture soll für kurze asynchrone Operationen verwendet werden, um die Lesbarkeit und Wartbarkeit des Codes zu verbessern.

::: code-group

```java [Beispiel]

public CompletableFuture<String> myFunction() {
  return CompletableFuture.supplyAsync(() -> {
    // Operation Beispiel
    Thread.sleep(1000);
    return "Hello, World!";
  });
}

```

```java [Abbbruch]

final CompletableFuture<String> future = myFunction();

// Abbruch der Operation
future.cancel(true);

```

```java [Ausnahmebehandlung]

public CompletableFuture<String> myFunction() {
  return CompletableFuture.supplyAsync(() -> {
    // Operation Beispiel
    if (condition) {
      throw new RuntimeException("Error");
    }
    return "Hello, World!";
  });
}

final CompletableFuture<String> future = myFunction();

future.exceptionally(ex -> {
  System.out.println("Error: " + ex.getMessage());
  return "Error";
});

```

```java [thenapply]
// thenapply führt eine Operation auf dem Ergebnis aus

final CompletableFuture<String> future = myFunction();

final CompletableFuture<Integer> result = future.thenApply(s -> s.length());

```

```java [thenaccept]
// thenaccept führt eine Operation auf dem Ergebnis aus, gibt aber kein Ergebnis zurück

final CompletableFuture<String> future = myFunction();

future.thenAccept(s -> System.out.println(s));

```

```java [thenrun]
// thenrun führt eine Operation aus, ohne auf das Ergebnis zu warten

final CompletableFuture<String> future = myFunction();

future.thenRun(() -> System.out.println("Operation completed"));

```

```java [thencombine]
// thencombine kombiniert zwei Ergebnisse, wenn beide abgeschlossen sind

final CompletableFuture<String> future1 = myFunction();

final CompletableFuture<String> future2 = myFunction();

final CompletableFuture<String> result = future1.thenCombine(future2, (s1, s2) -> s1 + s2);

```

```java [thencompose]

// thencompose führt eine Operation auf dem Ergebnis aus und gibt ein neues CompletableFuture zurück

final CompletableFuture<String> future = myFunction();

final CompletableFuture<Integer> result = future.thenCompose(s -> CompletableFuture.supplyAsync(() -> s.length()));

```

```java [thenacceptboth]

// thenacceptboth führt eine Operation auf beiden Ergebnissen aus

final CompletableFuture<String> future1 = myFunction();

final CompletableFuture<String> future2 = myFunction();

future1.thenAcceptBoth(future2, (s1, s2) -> System.out.println(s1 + s2));

```

```java [allof]

// allof wartet auf das Ergebnis aller CompletableFuture

final CompletableFuture<String> future1 = myFunction();

final CompletableFuture<String> future2 = myFunction();

final CompletableFuture<String> future3 = myFunction();

final CompletableFuture<Void> all = CompletableFuture.allOf(future1, future2, future3);

```

```java [anyof]

// anyof wartet auf das Ergebnis eines CompletableFuture

final CompletableFuture<String> future1 = myFunction();

final CompletableFuture<String> future2 = myFunction();

final CompletableFuture<String> future3 = myFunction();

final CompletableFuture<Object> any = CompletableFuture.anyOf(future1, future2, future3);

```

:::

### J10 Weiterführende Links

- [Java CompletableFuture](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/CompletableFuture.html)

## J11 Begrenzte Zeilenanzahl in Methoden/Funktionen {#begrenzte-zeilenanzahl-in-methoden-funktionen}

Codezeilen in Methoden und Funktionen sollen auf eine begrenzte Anzahl beschränkt werden, um die Lesbarkeit und Wartbarkeit des Codes zu verbessern.

Die Begrenzung ist nicht in Stein gemeißelt, aber eine Methode soll nicht mehr als eine Bildschirmseite umfassen bei einer *normalen* Bildschirmauflösung und Schriftgröße.

Eine Quantisierung von Zeilen ist schwierig, aber eine Möglichkeit ist die Millersche Zahl 7 ± 2 oder die zyklomatische Komplexität.

:::details Millersche Zahl 7 ± 2

Die Millersche Zahl besagt, dass Menschen in der Lage sind, sich an etwa 7 ± 2 Einheiten von Information zu erinnern.
Man kann dies auf die Anzahl der Codezeilen übertragen, die ein Entwickler in einer Methode oder Funktion verarbeiten kann.

Siehe auch [The Magical Number Seven, Plus or Minus Two](https://de.wikipedia.org/wiki/Millersche_Zahl)

Beachte jedoch, dass diese Zahl umstritten ist und es viele Faktoren gibt, die die Lesbarkeit und das Verständnis von Code beeinflussen.

:::

:::details Zyklomatische Komplexität

Die zyklomatische Komplexität ist eine Softwaremetrik, die die Anzahl der unabhängigen Pfade durch den Quellcode misst.
Sie ist gegeben durch die Formel `M = E - N + 2P`, wobei `E` die Anzahl der Kanten, `N` die Anzahl der Knoten und `P` die Anzahl der Zusammenhangskomponenten ist.

Siehe auch [Cyclomatic Complexity](https://en.wikipedia.org/wiki/Cyclomatic_complexity) oder [McCabe-Metrik](https://de.wikipedia.org/wiki/McCabe-Metrik)

Viele Entwicklungsumgebungen bieten eine Möglichkeit, die zyklomatische Komplexität zu berechnen und pro Methode anzuzeigen.

Beachte jedoch auch hier, dass die zyklomatische Komplexität nur ein Indikator für die Komplexität eines Codes ist und nicht alle Aspekte der Lesbarkeit und Wartbarkeit abdeckt.
:::

### J11 Problem

Methoden oder Funktionen mit einer großen Anzahl von Codezeilen können schwer zu lesen, zu verstehen und zu warten sein. Lange Methoden können verschiedene Aufgaben vermischen und die Einhaltung des Single Responsibility Principle erschweren.

```java
public class UserProcessor {

  public void processUserData(User user) {
    // Schritt 1: Validierung der Benutzerdaten
    if (user != null) {
      if (validateName(user.getName())) {
        if (validateEmail(user.getEmail())) {
          if (validateAge(user.getAge())) {
            // Weitere Logik...
            System.out.println("Benutzerdaten erfolgreich validiert.");
          }
        }
      }
    }

    // Schritt 2: Speichern der Benutzerdaten
    if (user != null) {
      if (saveUserData(user)) {
        // Weitere Logik...
        System.out.println("Benutzerdaten erfolgreich gespeichert.");
      }
    }

    // Schritt 3: Senden einer Bestätigungs-E-Mail
    if (user != null) {
      if (sendConfirmationEmail(user.getEmail())) {
        // Weitere Logik...
        System.out.println("Bestätigungs-E-Mail gesendet.");
      }
    }

    // Schritt 4: Aktualisierung des Benutzerstatus
    if (user != null) {
      if (updateUserStatus(user)) {
        // Weitere Logik...
        System.out.println("Benutzerstatus erfolgreich aktualisiert.");
      }
    }

      // Weitere Logik...
  }
}

```

### J11 Lösung

Um die Lesbarkeit und Verständlichkeit des Codes zu verbessern, sollen Methoden und Funktionen auf eine begrenzte Anzahl von Zeilen beschränkt sein. Komplexe Aufgaben sollen in kleinere Teilfunktionen ausgelagert werden, um die Verantwortlichkeiten klarer zu trennen.

> Die Anzahl von Zeilen soll allgemein so klein wie möglich gehalten werden. Sie soll allerdings nie über eine Bildschirmhöhe hinausgehen, d.h. mehr als 25 Zeilen sollen vermieden werden.

Allgemeine Code-Refactorings sind:

- Code-Blöcke oder Scopes (durch geschweifte Klammern separiert) können in Methoden ausgelagert werden.
- Kommentare, die eine Sektion kommentieren können im Allgemeinen in eine Methode ausgelagert werden.
- For-Schleifen, welche If-Bedingungen beinhalten, können als Methode geschrieben werden.
- Mehrdimensionale For-Schleifen können in Methoden ausgelagert werden,
- If-Bedingungen innerhalb einer Methode können als Methode geschrieben werden.

```java
public class UserProcessor {

  public void processUserData(final User user) {
    validateUser(user);
    saveUser(user);
    sendConfirmationEmail(user.getEmail());
    updateUserStatus(user);
  }

  void validateUser(final User user) {
    if (user == null) {
      throw new IllegalArgumentException("User cannot be null");
    }

    if (!validateName(user.getName())) {
      throw new IllegalArgumentException("Invalid name");
    }

    if (!validateEmail(user.getEmail())) {
      throw new IllegalArgumentException("Invalid email");
    }

    if (!validateAge(user.getAge())) {
      throw new IllegalArgumentException("Age must be 18 or older");
    }

    // Weitere Validierungen...
  }

  private boolean saveUser(final User user) {
    if (user == null) {
      throw new IllegalArgumentException("User cannot be null");
    }

    if (!saveUserData(user)) {
      throw new RuntimeException("Failed to save user data");
    }

    // Weitere Speicheroperationen...
  }
}
```

### J11 Vorteile

- Verbesserte Lesbarkeit und Verständlichkeit des Codes durch kleinere und fokussierte Methoden/Funktionen
- Einfachere Wartbarkeit und Testbarkeit durch klar abgegrenzte Verantwortlichkeiten
- Bessere Übersichtlichkeit und Strukturierung des Codes
- Bessere Testbarkeit des Codes, da kleinere Methoden leichter isoliert und getestet werden können

::: details Weitere Gründe für kleine Methoden

1. **KISS-Prinzip**: Das KISS-Prinzip kann leichter eingehalten werden, wenn Methoden und Funktionen auf eine begrenzte Anzahl von Zeilen beschränkt sind.
Der Entwickler kommt nicht dazu überkomplexe Methoden zu schreiben, da er sich an die Zeilenbeschränkung halten muss.

2. **Bessere Isolierung**: Kleine Methoden behandeln normalerweise nur eine spezifische Aufgabe oder Verantwortlichkeit.
Dadurch können sie isoliert und unabhängig von anderen Teilen des Codes getestet werden.
Durch die Fokussierung auf eine spezifische Funktion können Tests effektiver und einfacher geschrieben werden.

3. **Lesbarkeit**: Kleine Methoden sind in der Regel einfacher zu verstehen, da sie nur eine begrenzte Anzahl von Zeilen umfassen und sich auf eine bestimmte Funktionalität konzentrieren. Dadurch wird die Lesbarkeit des Codes verbessert und es ist einfacher, den Zweck und das Verhalten der Methode zu erfassen.

4. **Wiederverwendbarkeit**: Kleine Methoden können leichter wiederverwendet werden. Da sie in der Regel spezifische Aufgaben erfüllen, können sie in verschiedenen Teilen des Codes wiederverwendet werden, wenn ähnliche Funktionalität benötigt wird.
Dies fördert die Modularität und reduziert die Duplizierung von Code.

5. **Einfache Wartbarkeit**: Kleine Methoden sind einfacher zu warten, da sie in sich abgeschlossen sind und Änderungen an einer Methode weniger Auswirkungen auf andere Teile des Codes haben. Bei einem Fehler oder einer gewünschten Änderung ist es einfacher, den relevanten Code zu lokalisieren und anzupassen, ohne den gesamten Kontext berücksichtigen zu müssen.

6. **Bessere Testabdeckung**: Durch die Aufteilung des Codes in kleine Methoden wird die Testabdeckung verbessert, da jede Methode spezifische Tests erhalten kann. Dadurch können verschiedene Szenarien und Randbedingungen gezielt getestet werden, um die Fehleranfälligkeit zu reduzieren.

7. **Einfacheres Mocking**: Darüber hinaus ist das Mocking in Tests einfacher, wenn der Code in kleine Methoden aufgeteilt ist. Beim Schreiben von Unit-Tests ist es häufig erforderlich, externe Abhängigkeiten zu mocken oder zu fälschen, um den Fokus auf die zu testende Methode zu legen.
Mit kleinen Methoden ist es einfacher, diese Abhängigkeiten zu identifizieren und zu isolieren, da sie in der Regel explizit als Parameter an die Methode übergeben werden.
Das Mocking-Setup ist zudem kleiner und einfacher, weil aufgespaltete Methoden einfach diese Methoden mocken können, statt die fremde (externe) API, die darin verwendet wird.

8. **Förderung des Single Responsibility Principle**: Kleine Methoden unterstützen das Single Responsibility Principle, das besagt, dass eine Methode oder Funktion nur eine einzige Verantwortlichkeit haben soll. Durch die Aufteilung des Codes in kleine Methoden wird die Verantwortlichkeit klarer definiert und das Prinzip der klaren Trennung von Aufgaben eingehalten.
:::

Die Verwendung kleiner Methoden verbessert die Qualität und Wartbarkeit des Codes, indem sie die Testbarkeit, Lesbarkeit, Wiederverwendbarkeit und Modularität fördern.
Es ist jedoch wichtig, ein Gleichgewicht zu finden, um eine übermäßige Fragmentierung des Codes zu vermeiden und die Lesbarkeit nicht zu beeinträchtigen.

::: info
Siehe zu Prinzipien und Vorteilen auch [Prinzipien der Softwareentwicklung](../../2.principles/principles).
:::

### J11 Nachteile

Die strikte Begrenzung der Zeilenanzahl kann zu einer übermäßigen Fragmentierung des Codes führen, wenn kleinere Methoden oder Funktionen unnötig erstellt werden.

### J11 Ausnahmen

Die Anzahl der Codezeilen in einer Methode oder Funktion kann je nach Kontext und Komplexität des Codes variieren.

## J12 Attribute komplexer Typen sollten nicht mit Getter und Setter veröffentlicht werden {#attribute-komplexer-typen-sollten-nicht-mit-getter-und-setter-veroeffentlicht-werden}

Klassen sollen interne Daten nicht direkt über Getter- und Setter-Methoden veröffentlichen, um unerwartetes Verhalten und Inkonsistenzen zu vermeiden.

### J12 Problem

Wenn Attribute von Klassen einfach von außen manipuliert werden können, kann die Integrität und Konsistenz der Daten gefährdet sein und die Klasse wird anfällig für Fehler und unerwartete Veränderungen.
Das Prinzip [Tell, don't ask](../../2.principles/principles#tda-ie) und Information Hiding werden  hier verletzt, da die Klasse nicht mehr die Kontrolle über ihre eigenen Daten hat.

Die folgende Klasse erwartet, dass es ein Element in der Liste gibt, aber wenn ein Benutzer die Liste manipuliert, kann es zu einer `NullPointerException` kommen.

```java
public class MyClass {
    private List<String> myList;

    public MyClass() {
        this.myList = List.of("Hello", "World");
    }

    public List<String> getMyList() {
        return myList;
    }

    public void setMyList(List<String> myList) {
        this.myList = myList;
    }

    public void sayHello() {
      // Fehler IndexOutOfBoundsException oder NullPointerException
      System.out.println(this.myList.get(0));
    }
}

// ...

MyClass obj1 = new MyClass();
obj1.getMyList().clear();
// oder
obj1.setMyList(null);

obj.sayHello(); // NullPointerException
```

### J12 Lösung

- Es sollen spezielle Methoden bereitgestellt werden, um den inneren Zustand des Attributs zu verändern oder darauf zuzugreifen.
- Werte sollen als Kopie oder unveränderbare Objekte zurückgegeben werden, um die Inkonsistenz und unerwartete Veränderungen zu verhindern.

```java
public class MyClass {
    private List<String> myList;

    public MyClass() {
      this.reset();
    }

    public void addToList(String item) {
        this.myList.add(item);
    }

    public List<String> getList() {
        return Collections.unmodifiableList(myList);
    }

    public void reset() {
      this.myList = List.of("Hello", "World");
    }

    public void sayHello() {
      System.out.println(this.myList.get(0));
    }
}

// Keine Möglichkeit, die Liste zu manipulieren

```

### J12 Vorteile

Indem die Verwendung von Getter- und Setter-Methoden für Attribute komplexer Typen vermieden wird, können Inkonsistenzen bei der Verwendung von Referenzen auf dieselben Objekte verhindert werden.
Stattdessen sollten notwendige Methoden über das Parent-Objekt bereitgestellt werden, um sicherzustellen, dass das Attribut konsistent und korrekt verwendet wird.

### J12 Ausnahmen

Es kann jedoch Fälle geben, in denen die Verwendung von Getter- und Setter-Methoden sinnvoll ist, z.B. wenn das Attribut nicht referenzierbare Objekte enthält oder wenn das Attribut geändert werden kann, ohne dass Inkonsistenzen entstehen.
Es ist daher wichtig, die Verwendung von Getter- und Setter-Methoden sorgfältig zu prüfen und nur dann zu verwenden, wenn es notwendig und sinnvoll ist.

## J13 Auf null prüfen {#auf-null-pruefen}

Objekt-Variablen, die `null` sein können, sollen auf `null` geprüft werden, um keine Nullpointer-Exceptions zu verursachen.

::: warning Anwendungseinsatz und Alternativen

Diese Regel gilt nur für bereits bestehenden Methoden und Funktionen, die `null` zurückgeben können. [Optional](index#verwendung-von-optional-in-bei-rueckgabewerte-in-funktionen)

Soll für neue Methoden/Funktionen verwendet werden, um diese spezielle Fälle (`null` etc.) zu repräsentieren.

Soll ein neues Klassen- oder Objektmodell erstellt werden, sollen direkt [spezielle Objekte](index#verwende-spezielle-objekte-statt-spezielle-werte) verwendet werden.

Siehe auch [Null-Objekte](../../4.designpatterns/technical.md#null-objects).

:::

::: warning Alternative Namensgebung

Ist es nicht möglich `null` zu vermeiden, sollen die Variablen entsprechend der [Namensgebung](../naming#moegliche-nullwerte-in-variablen) benannt werden.

:::

### J13 Problem

Viele Methoden liefern direkt ein Objekt zurück, welches `null` sein kann.
Jedoch ist es oftmals nicht ersichtlich, ob die Methode `null` zurückgibt oder nicht und ein Blick in den Quellcode ist notwendig.
Doch das birgt die Gefahr, wenn der Quellcode geändert wird, dass die Methode plötzlich `null` zurückgibt und dadurch eine Nullpointer-Exception ausgelöst wird.

```java
public interface Data {
    String name();
}

public void myFunction() {
  final String name = data.name();
   
  // mögliche Nullpointer-Exception
  if (name.equals("John")) {
    // Code
  }
}
```

### J13 Lösung

Um sicherzustellen, dass keine Nullpointer-Exceptions auftreten, soll auf `null` geprüft werden, bevor auf die Methode zugegriffen wird.

```java
public void myFunction() {
  final String name = data.name();
   
  if (name != null && name.equals("John")) {
    // Code
  }
}
```

### J13 Refactoring

Im Beispiel kann nach der [Namensgebung](../naming#moegliche-nullwerte-in-variablen) die Variable umbenannt werden, um zu signalisieren, dass die Methode `null` zurückgeben kann.

Die Methode `name` sollte nicht umbenannt und stattdessen `Optional` verwendet werden.

```java
public void myFunction() {
  final String nameOrNull = data.name();
  ...
}
```

### J13 Vorteile

- Vermeidung von Nullpointer-Exceptions
- Vermeidung von unerwarteten Fehlern durch falsche Erkennung von falsy-Werten

### J13 Nachteile

- Werte wie NaN werden nicht erkannt
- ESLint muss entsprechend konfiguriert werden, um die Verwendung von `==` bei null Vergleich zu erlauben. Dies ist möglich, indem die Regel `eqeqeq` auf [smart](https://eslint.org/docs/latest/rules/eqeqeq#smart) umgestellt wird.

## J14 Methoden/Funktionen, die Mengen zurückgeben sollen niemals null zurückgeben {#methoden-funktionen-die-mengen-zurueckgeben-sollen-niemals-null-zurueckgeben}

Methoden oder Funktionen, die Mengen wie Arrays zurückgeben, sollen nie `null` zurückgeben, sondern leere Mengen oder Objekte.

### J14 Problem

Das Zurückgeben von null als Ergebnis einer Methode/Funktion, die eine Liste, HashMap oder ein Array zurückgibt, kann zu Zugriffsfehlern (undefined) und unerwartetem Verhalten führen.
Es erfordert zusätzliche Überprüfungen auf null und erhöht die Komplexität des Aufrufercodes.

```java
public ArrayList<String> getNames() {
  if (condition) {
    return null;
  }
  // ...
}
```

### J14 Lösung

Um Zugriffsfehler und unerwartetes Verhalten zu vermeiden, sollen Methoden/Funktionen stattdessen ein leeres Objekt oder Array zurückgeben.

```java
public ArrayList<String> getNames() {
  if (condition) {
    return new ArrayList<>(); 
  }
  // ...
}
```

### J14 Vorteile

- Vermeidung von Zugriffsfehlern und unerwartetem Verhalten
- Einfachere Handhabung und weniger Überprüfungen auf null im Aufrufercode
- Verbesserte Robustheit und Stabilität des Codes

### J14 Ausnahmen

Es kann Situationen geben, in denen die Rückgabe von null sinnvoll ist, z. B. wenn null einen speziellen Zustand oder eine Bedeutung hat.
In solchen Fällen ist es wichtig, die Dokumentation klar zu kommunizieren und sicherzustellen, dass der Aufrufer angemessen darauf reagiert.

### J14 Weiterführende Literatur/Links

- [Effective Java: Item 54 - Return Empty Arrays or Collections, Not Nulls](https://www.amazon.com/dp/0321356683)
- [Null or Empty Collection in Java](https://www.baeldung.com/java-null-empty-collection) (für Java)

## J15 Verwendung von `Optional` in bei Rückgabewerte in Funktionen {#verwendung-von-optional-in-bei-rueckgabewerte-in-funktionen}

Eine Funktion oder Methode, die dennoch `null` zurückgeben muss, soll stattdessen die `Optional`-Klasse verwenden, um den Status des Ergebnisses zu kennzeichnen.

::: warning Anwendungseinsatz und Alternativen

Diese Regel gilt nur für bereits bestehenden Klassenstrukturen, die nicht veränderbar oder erweiterbar sind.

Soll ein neues Klassen- oder Objektmodell erstellt werden, sollen direkt [spezielle Objekte](index#verwende-spezielle-objekte-statt-spezielle-werte) verwendet werden.

:::

### J15 Problem

Das Zurückgeben von `null` aus einer Funktion kann zu Fehlern führen, insbesondere wenn nicht überprüft wird, ob das Ergebnis vorhanden ist oder nicht.

```java
public Integer divide() {
  if (b != 0) {
    return a / b;
  }
  return null;
}
```

### J15 Lösung

Die Verwendung des `Optional`-Objekts ermöglicht es, den Status des Ergebnisses klar zu kennzeichnen, anstatt `null` zurückzugeben.

```java
public Optional<Integer> divide() {
  if (b != 0) {
    return Optional.of(a / b);
  }
  return Optional.empty();
}
```

### J15 Vorteile

- Klarere Kennzeichnung des Zustands des Ergebnisses durch Verwendung von `Optional`
- Bessere Fehlervermeidung durch explizite Behandlung von leeren Ergebnissen
- Verbesserte Lesbarkeit des Codes durch den Verzicht auf `null`

### J15 Nachteile

- Zusätzlicher Overhead durch die Verwendung von `Optional`
- Potenziell erhöhter Komplexitätsgrad in der Verwendung des `Optional`-Objekts
- Abhängigkeit von der Implementierung der `Optional`-Klasse

## J16 If-Bedingungen ohne Else und mit Return {#if-bedingungen-ohne-else-und-mit-return}

If-Bedingungen, die ein Return enthalten, sollen kein `else` enthalten, um die Lesbarkeit des Codes zu verbessern und die Verschachtelung von Bedingungen zu reduzieren.

Im Folgenden sind sich widersprechende Regeln aufgeführt, die bei der Reihenfolge der Bedingungen in If-Statements zu beachten sind:

- Die Bedingung, welche am wenigsten Code enthält, sollte zuerst geprüft werden.
- Die Bedingung, welche die Funktion/Methode am schnellsten verlässt, sollte zuerst geprüft werden.
- Die Bedingung, welche eine Exception wirft, sollte zuerst geprüft werden.
- Die Bedingung, welche eine positive Bedingung prüft, sollte zuerst geprüft werden.
- Die Bedingung, welche am häufigsten zutrifft, sollte zuerst geprüft werden.

### J16 Problem

If-Bedingungen mit einem Return und einem dazugehörigen else-Block können die Lesbarkeit des Codes beeinträchtigen und zu unnötiger Verschachtelung führen.

```java
public int calculate(int x) {
  if (x > 0) {
    return x * 2;
  } else if (x < 0) {
    return x;
  } else {
    return 42;
  }
}
```

### J16 Lösung

Durch Entfernen des else-Blocks und direktes Rückgabestatement wird der Code lesbarer und die Verschachtelung von Bedingungen reduziert.

```java
public int calculate(int x) {
  if (x > 0) {
    return x * 2;
  }
  if (x < 0) {
    return x;
  }  
  return 42;
}
```

### J16 Vorteile

- Verbesserte Lesbarkeit und Klarheit des Codes
- Pfade durch die Funktion sind klarer und leichter nachvollziehbar
- Reduzierung der Verschachtelung von Bedingungen
- Vereinfachte Struktur und Fluss des Codes

### J16 Weiterführende Literatur/Links

- [Guard Pattern](index#js12-guard-pattern)
- [Clean Code: A Handbook of Agile Software Craftsmanship](https://www.amazon.com/dp/0132350882)

## J17 Guard Pattern {#guard-pattern}

Guard-Klauseln sollen verwendet werden, um unerwünschte Ausführungszweige frühzeitig zu beenden und die Lesbarkeit des Codes zu verbessern.

Im Folgenden sind sich widersprechende Regeln aufgeführt, die bei der Reihenfolge der Bedingungen in If-Statements zu beachten sind:

- Die Bedingung, welche am wenigsten Code enthält, sollte zuerst geprüft werden.
- Die Bedingung, welche die Funktion/Methode am schnellsten verlässt, sollte zuerst geprüft werden.
- Die Bedingung, welche eine Exception wirft, sollte zuerst geprüft werden.
- Die Bedingung, welche eine positive Bedingung prüft, sollte zuerst geprüft werden.
- Die Bedingung, welche am häufigsten zutrifft, sollte zuerst geprüft werden.

### J17 Problem

In Java müssen oft komplexe Bedingungen geprüft werden, um unerwünschte Ausführungszweige zu verhindern oder ungültige Eingaben abzufangen. Dies kann zu verschachteltem Code führen, der schwer zu lesen und zu warten ist.

```java
public void processInput(Integer input) {
  if (input != null && input > 0) {
    // Code zur Verarbeitung des Eingabewerts
  }
}
```

### J17 Lösung

Das Guard Pattern ermöglicht es, Bedingungsprüfungen klarer und lesbarer zu gestalten, indem wir unerwünschte Fälle frühzeitig abfangen und beenden.

```java
public void processInput(Integer input) {
  if (input == null || input <= 0) {
    return;
  }

  // Code zur Verarbeitung des Eingabewerts
}
```

### J17 Vorteile

- Verbesserte Lesbarkeit des Codes durch eine klare und frühzeitige Abhandlung unerwünschter Fälle
- Reduzierung der Verschachtelung von Bedingungsprüfungen
- Einfache Erweiterbarkeit und Wartbarkeit des Codes

### J17 Weiterführende Literatur/Links

- [Guard Clause Pattern - Refactoring.Guru](https://refactoring.guru/smells/guard-clauses)

## J18 Positiv formulierte If-Bedingungen und Auslagerung komplexer Bedingungen {#positiv-formulierte-if-bedingungen-und-auslagerung-komplexer-bedingungen}

If-Bedingungen sollen positiv formuliert werden und komplexe Bedingungen sollen in temporäre Variablen ausgelagert werden, um die Lesbarkeit und Wartbarkeit des Codes zu verbessern.

::: info Beachte

Die Aufsplittung von If-Bedingungen ist sehr abhängig vom Verständnis des Entwicklers und soll mit Sinn und Verstand eingesetzt werden.

Generell ist die KISS-Regel (Keep It Simple, Stupid) zu beachten.

:::

### J18 Problem

Komplexe Bedingungen in If-Anweisungen können den Code schwer verständlich machen, insbesondere wenn sie negativ formuliert sind. Lange und verschachtelte Bedingungen erschweren die Lesbarkeit und können zu Fehlern führen.

```java
if (!(name.isEmpty() || age < 18 || !isAuthorized)) {
    // Code ausführen
}
```

### J18 Lösung

Durch die positive Formulierung der Bedingungen und die Auslagerung komplexer Ausdrücke in temporäre Variablen wird der Code lesbarer und verständlicher.

```java
final boolean isNameEmpty = name.isEmpty();
final boolean isUnderAge = age < 18;
final boolean isNotAuthorized = !isAuthorized;

if (!isNameEmpty && !isUnderAge && isNotAuthorized) {
    // Code ausführen
}
```

### J18 Vorteile

- Verbesserte Lesbarkeit des Codes durch positiv formulierte Bedingungen
- Reduzierung der Verschachtelung und Komplexität von If-Anweisungen
- Bessere Wartbarkeit des Codes durch klare und beschreibende Variablen

### J18 Nachteile

- Alternativ kann ein Kommentar die If-Bedingung beschreiben, aber bei einer Änderung muss daran gedacht werden auch den Kommentar anzupassen.
- Das Auslagern von Bedingungen in temporäre Variablen kann zu einem erhöhten Speicherverbrauch führen, insbesondere bei komplexen Ausdrücken. Dies ist normalerweise vernachlässigbar, kann jedoch in speziellen Situationen berücksichtigt werden.

### J18 Ausnahmen

Es gibt Fälle, in denen das Auslagern von Bedingungen in temporäre Variablen nicht sinnvoll ist, z. B. wenn die Bedingung nur an einer Stelle verwendet wird und keine weitere Klarheit oder Wartbarkeit gewonnen wird.

### J18 Weiterführende Literatur/Links

- [The Art of Readable Code - Simple Conditionals](https://www.amazon.com/dp/0596802293)
- [Clean Code: A Handbook of Agile Software Craftsmanship](https://www.amazon.com/dp/0132350882)

## J19 Verwendung von Exceptions {#verwendung-von-exceptions}

Exceptions sollten in Java nur für unerwartete Situationen verwendet werden, um eine saubere Trennung von Fehlerbehandlung und regulärem Code zu ermöglichen.

### J19 Problem

Wenn Exceptions unangemessen verwendet werden, kann dies zu schlechter Leistung, inkonsistentem Verhalten und schwer zu findenden Fehlern führen.
Eine übermäßige Verwendung von Exceptions kann auch die Lesbarkeit des Codes beeinträchtigen und dazu führen, dass der Code schwer verständlich ist.

Im folgenden Code kann nicht zwischen den beiden Ausnahmen unterschieden werden, die geworfen werden.
Es ist erforderlich, dass der Aufrufer den Exception-Text analysiert, um zu verstehen, was schief gelaufen ist.

```java
public void calculatePrice(int quantity) throws Exception {
   if (quantity < 0) {
      throw new Exception("Invalid quantity");
   }

   // do something

   // more code

   // throw another exception
   throw new Exception("Another error occurred");
}
```

Exceptions in Schleifen können auch zu schlechter Leistung führen, da das Erstellen und Werfen von Ausnahmen teuer sein kann.

```java
public void foo() {
  if (aCondition) {
    throw new Exception("An error occurred");
  }
}

public void calculatePrice(int quantity) throws Exception {
  for (int i = 0; i < quantity; i++) {
    try {
      foo();
    } catch (Exception e) {
      // und weiter
    }
  }
}
```

### J19 Lösung

Um die Verwendung von Exceptions zu verbessern, sollte man sie nur für unerwartete Situationen verwenden, wie zum Beispiel unerwartete Eingaben, Netzwerkprobleme oder Systemfehler.
Für erwartete Situationen sollte man eine andere Methode der Fehlerbehandlung verwenden, wie zum Beispiel die Rückgabe eines Fehlercodes oder die Verwendung von booleschen Rückgabewerten.

```java
public void calculatePrice(int quantity) throws InvalidQuantityException {
   if (quantity < 0) {
      throw new InvalidQuantityException("Invalid quantity: {}. Must be greater or equal than zero.", quantity);
   }

   // do something

   // more code
   throw new AnotherException("Another error occurred");
}
```

```java
boolean foo() throws Exception {
  if (aCondition) {
    return false;
  }
}

public void calculatePrice(int quantity) throws Exception {
  for (int i = 0; i < quantity; i++) {
    if (!foo()) {
      // und weiter
    }
  }
}
```

### J19 Vorteile

- Eine angemessene Verwendung von Exceptions führt zu einem saubereren Code, der einfacher zu verstehen und zu warten ist.
- Exceptions ermöglichen eine saubere Trennung von Fehlerbehandlung und regulärem Code.
- Durch eine bessere Strukturierung des Codes kann die Leistung verbessert werden.

### J19 Nachteile

- Eine übermäßige Verwendung von Exceptions kann die Leistung beeinträchtigen und die Lesbarkeit des Codes erschweren (Exceptions innerhalb von for-Schleifen.).
- Es kann schwierig sein, zwischen erwarteten und unerwarteten Situationen zu unterscheiden, was zu Fehlern führen kann, wenn Ausnahmen falsch verwendet werden.

## J20 Eigene Exceptions für Fehlerfälle erstellen {#eigene-exceptions-fuer-fehlerfaelle-erstellen}

Es ist eine bewährte Praxis, eigene Exceptions für spezifische Fehlerfälle zu erstellen, um eine klare und konsistente Fehlerbehandlung zu ermöglichen.

Es sollen für Fehlerfälle eigene Exceptions erstellt werden, um eine klare und konsistente Fehlerbehandlung zu ermöglichen.

### J20 Problem

Die Verwendung von allgemeinen Exceptions wie `Exception` oder `RuntimeException` kann zu unklaren Fehlermeldungen und unzureichender Fehlerbehandlung führen.
Insbesondere wenn mehrere gleichnamige Exceptions geworfen werden, kann es schwierig sein, den Ursprung des Fehlers zu identifizieren.
Wenn ein Fehlerfall abgefangen werden soll, ist es wichtig, dass der Aufrufer genau weiß, welcher Fehler aufgetreten ist und wie darauf reagiert werden soll.

```java
public void sendOrder(Order order) {
  if (order.isInvalid()) {
    throw new Exception("Invalid order");
  }

  if (order.unpaid()) {
    throw new Exception("Unpaid order");
  }

  if (order.notAvailable()) {
    throw new Exception("Product not available");
  }
}

public void processOrder(Order order) {
  try {
    // Code zur Verarbeitung der Bestellung
  } catch (Exception e) {
    // RunTimeException wie NullPointerException leitet auch von Exception ab   
    // und sollte/kann hier nicht behandelt werden 

    // Unklare Fehlerbehandlung
    logger.error("Fehler bei der Verarbeitung der Bestellung", e);

    if (e.getMessage().equals("Invalid order")) {
      // Behandlung von ungültigen Bestellungen
    } else if (e.getMessage().equals("Unpaid order")) {
      // Behandlung von unbezahlten Bestellungen
    } else if (e.getMessage().equals("Product not available")) {
      // Behandlung von nicht verfügbaren Produkten
    }
  }
}
```

### J20 Lösung

Durch die Erstellung eigener Exceptions für spezifische Fehlerfälle kann eine klare und konsistente Fehlerbehandlung ermöglicht werden.
Wenn eine eigene Hierarchie von Exceptions erstellt wird, kann der Aufrufer genau wissen, welcher Fehler aufgetreten ist und wie darauf reagiert werden soll.

```java
public class OrdersException extends Exception {
  public OrdersException(String message) {
    super(message);
  }
}

public class InvalidOrderException extends OrdersException {
  public InvalidOrderException(String message) {
    super(message);
  }
}

public class UnpaidOrderException extends OrdersException {
  public UnpaidOrderException(String message) {
    super(message);
  }
}

public void sendOrder(Order order) throws OrdersException {
  if (order.isInvalid()) {
    throw new InvalidOrderException("Invalid order");
  }

  if (order.unpaid()) {
    throw new UnpaidOrderException("Unpaid order");
  }

  if (order.notAvailable()) {
    throw new OrdersException("Product not available");
  }
}

public void processOrder(Order order) {
  try {
    sendOrder(order);
  } catch (InvalidOrderException e) {
    // Behandlung von ungültigen Bestellungen
    logger.error("Ungültige Bestellung", e);
  }
  catch (OrdersException e) {
    // Restliche Fehlerbehandlung: UnpaidOrderException und Rest
    logger.error("Fehler bei der Verarbeitung der Bestellung", e);
  }
}

```

### J20 Vorteile

- Klare und konsistente Fehlerbehandlung durch spezifische Exceptions
- Bessere Identifizierung und Behandlung von Fehlern
- Verbesserte Lesbarkeit und Wartbarkeit des Codes

### J20 Nachteile

- Erhöhter Aufwand bei der Erstellung und Verwaltung von eigenen Exceptions
- Möglicher Overhead bei der Verwendung von Exceptions
- Es kann schwierig sein, die richtige Hierarchie von Exceptions zu erstellen

## J21 Exceptions dürfen nur geloggt werden, wenn sie nicht geworfen werden {#exceptions-duerfen-nur-geloggt-werden-wenn-sie-nicht-geworfen-werden}

Exceptions sollten nur dann geloggt werden, wenn sie nicht an höhere Ebenen weitergegeben werden und keine Auswirkungen auf den weiteren Ablauf des Programms haben.

Stattdessen ist es wichtig, Exceptions sinnvoll zu behandeln und angemessene Maßnahmen zu ergreifen.

:::warning Wichtig
**Entweder** wird die Exception geloggt und behandelt **ODER** in eine andere Form umgewandelt und geworfen.

Aber nicht beides.
:::

### J21 Problem

Das Loggen von Exceptions in Methoden, in denen sie bereits abgefangen werden, führt zu einer unnötigen Vermehrung von Exception-Stacktraces in den Logs.
Dies erschwert das Lesen der Logs und kann zu einer höheren Belastung des Speichers führen.

Ein Beispiel für ungeprüftes Weiterschicken von Exceptions:

```java
public void readFromFile(String filePath) {
  try {
    BufferedReader reader = new BufferedReader(new FileReader(filePath));
    String line = reader.readLine();
    while (line != null) {
        // do something
        line = reader.readLine();
    }
  } catch (IOException e) {
    logger.error("Unknown error occurred", e);
    throw e;
  }
}
```

### J21 Lösung

Um Exceptions richtig zu behandeln, sollten sie entweder in der aktuellen Methode behandelt oder an eine höhere Ebene weitergegeben werden.
Nur im ersten Fall sollte ein Logging ausgeben werden.

```java
public void readFromFile(String filePath) throws IOException {
  try (BufferedReader reader = new BufferedReader(new FileReader(filePath))) {
    String line = reader.readLine();
    while (line != null) {
        // do something
        line = reader.readLine();
    }
  } catch (IOException e) {
    throw new MySpecificException("The file {} could not be read.", filePath, e);
  }
}
```

### J21 Vorteile

- Klare Behandlung und Reaktion auf Exceptions
- Verbesserte Fehlerbehandlung und Debugging-Möglichkeiten
- Besseres Verständnis der Ursachen von Fehlern
  - Logs beinhalten keine doppelten Fehlermeldungen.
  - Logs werden kleiner.

### J21 Ausnahmen

In einigen Fällen kann es sinnvoll sein, Exceptions zu loggen und unverändert wieder zu werfen. Dies ist jedoch eher die Ausnahme und soll gut begründet sein, z.B. wenn der Code in einem bestimmten Kontext läuft, der spezielle Anforderungen hat.

## J22 Benennung von Methoden mit verschiedenen Präfixen für Synchronität und Ergebnisverhalten {#benennung-von-methoden-mit-verschiedenen-praefixen-fuer-synchronitaet-und-ergebnisverhalten}

Es ist eine bewährte Praxis bei der Benennung von Methoden in Java, unterschiedliche Präfixe zu verwenden, um die Synchronität und das Ergebnisverhalten der Methode zu kennzeichnen.
Das Präfix "get" soll für synchronen Zugriff verwendet werden und immer einen Wert zurückgeben, während die Präfixe "fetch" oder "request" für asynchronen Zugriff stehen, der länger dauern und auch fehlschlagen kann.

### J22 Problem

Bei der Benennung von Methoden ist es wichtig, klare Hinweise auf die Synchronität und das Ergebnisverhalten der Methode zu geben.
Unklare oder inkonsistente Benennung kann zu Missverständnissen und unerwartetem Verhalten führen.

```java
// Unklare Benennung ohne klare Angabe zur Synchronität und zum Ergebnisverhalten 
public DataResult getData() {
  // ...
}

// Unklare Benennung ohne klare Angabe zur Synchronität und zum Ergebnisverhalten
public DataResult getAsyncData() {
  // ...
}
```

### J22 Lösung

Um die Synchronität und das Ergebnisverhalten einer Methode klarer zu kennzeichnen, sollen unterschiedliche Präfixe verwendet werden. Das Präfix "get" soll für synchronen Zugriff verwendet werden und immer einen Wert zurückgeben. Die Präfixe "fetch" oder "request" sollen für asynchronen Zugriff stehen, der länger dauern und auch fehlschlagen kann.

> get-Präfixe sollen nie async sein, dagegen sollen fetch- oder request- Präfixe immer async sein.

```java
// Synchroner Zugriff mit Wert-Rückgabe
public CompletableFuture<DataResult> fetchData() {
  // ...
  return CompletableFuture.completedFuture(data);
}

// Asynchroner Zugriff mit Möglichkeit eines Fehlschlags
public CompletableFuture<DataResult> fetchAsyncData() {
  // ...
}
```

### J22 Vorteile

- Klare und eindeutige Benennung, die die Synchronität und das Ergebnisverhalten einer Methode widerspiegelt
- Verbesserte Lesbarkeit und Verständlichkeit des Codes
- Einfachere Fehlersuche und Debugging-Möglichkeiten

### J22 Ausnahmen

Es kann Situationen geben, in denen die Verwendung von anderen Präfixen angemessen ist, abhängig von den spezifischen Anforderungen und Konventionen des Projekts.
Es ist wichtig, einheitliche Namen innerhalb des Projekts festzulegen und zu dokumentieren.

### J22 Weiterführende Literatur/Links

- [Method Naming Conventions in Java](https://www.baeldung.com/java-method-naming-conventions)

## J23 Einsatz von JavaDoc {#einsatz-von-javadoc}

Methoden, Objekte, Typen und Pakete in Java sollen mit JavaDoc annotiert werden, um eine klare Dokumentation der Objekte, Methoden, Parameter, Rückgabewerts und Pakete zu ermöglichen.

### J23 Problem

Es ist aufgrund der Benennung und der Signatur einer Methode oder eines Objekts nicht immer klar, wie sie verwendet werden sollen und welche Parameter und Rückgabewerte sie erwarten.
Auch in welchen Situationen Ausnahmen geworfen werden können und wie sie behandelt werden sollen, ist oft unklar.

Pakete haben oft keine klare Dokumentation, was sie enthalten und wie sie verwendet werden sollen.

### J23 Lösung

Die Verwendung von JavaDoc ermöglicht es, eine klare und konsistente Dokumentation von Methoden, Objekten, Typen und Paketen bereitzustellen.

Weiterhin kann eine Dokumentation automatisch generiert werden, die Entwicklern hilft, den Code besser zu verstehen und zu verwenden.

:::info
Moderne Entwicklungsumgebungen und Tools wie Visual Studio Code, WebStorm und ESLint unterstützen JavaDoc und bieten Funktionen wie Autovervollständigung und Anzeige der Dokumentation, wenn mit dem Mauszeiger über den Code gefahren wird.
:::

### J23 Beispiele

#### J23 Methoden und Funktionen

:::warning Beachte!
JavaDoc-Kommentare beginnen mit `/**` und enden mit `*/`.
Jede Zeile innerhalb des Kommentars beginnt mit `*`.
Der Kommentar muss direkt vor der Deklaration der Entität stehen.
:::

::: code-group

```java [Methoden]
/**
 * Berechnet die Summe von zwei Zahlen.
 * Es kann auch ein Link mit {@link com.example.user.User} eingefügt werden.
 * @param x Die erste Zahl.
 * @param y Die zweite Zahl.
 * @param <T> Der Typ der Zahlen. Generischer Typ.
 * @return Die Summe der beiden Zahlen.
 * @throws IllegalArgumentException Wenn einer der Parameter null ist.
 */
```

```java [Pakete]
// Erstelle eine Datei package-info.java im Paket mit folgendem Inhalt
/**
 * Enthält Klassen zur Verarbeitung von Benutzerdaten.
 * @since 1.0
 * @see com.example.user.User
 */
package com.example.user;
```

```java [Code-Beispiel]

/**
 * Dokumentation mit einem Code-Beispiel.
 * Damit werden &lt; und &gt; in der Dokumentation korrekt dargestellt.
 * Im Text selbst kann z.B. für &lt; auch {@code <} verwendet werden.
 * 
 * <code>{@code
 * if (x == null || y == null) {
 * }</code>
 * <pre>{@code
 * if (x == null || y == null) {
 * }</pre>
 */ 

```

:::

### J23 Weiterführende Literatur/Links

- [JavaDoc - Offical Documentation](https://docs.oracle.com/javase/8/docs/technotes/tools/windows/javadoc.html)
- [Javadoc Tags](https://docs.oracle.com/javase/8/docs/technotes/tools/windows/javadoc.html#CHDJGIJB)

## J24 Variable Parameter in Methoden vermeiden {#variable-parameter-in-methoden-vermeiden}

Variable Parameter in Funktionen oder Methoden sollen vermieden werden, wenn bereits Parameter mit spezifischen Typen oder Strukturen definiert sind.

### J24 Problem

Variable Parameter in Funktionen oder Methoden in Kombination mit weiteren vorangestellten unterschiedlichen Parametern können zu Verwirrung und unerwartetem Verhalten führen.

```java
public void fetchData(String url, Headers headers, Options options, Object... params) {
  // ...
}
```

### J24 Lösung

Verwende stattdessen spezifische Parameter oder separate Funktionen/Methoden, um das Verhalten klarer zu kennzeichnen.

```java
public void fetchData(String url, Headers headers, Options options) {
  // ...
}

public void fetchDataWithParams(String url, Object... params) {
  // ...
}
```

### J24 Ausnahmen

Wenn die Funktion oder Methode nur ein vorangestellten Parameter besitzt, kann der Restparameter `...params` verwendet werden, um eine variable Anzahl von Argumenten zu akzeptieren.
Eine Verwechslung mit den vorangestellten Parametern ist in diesem Fall unwahrscheinlich.

```java
public void formatString(String template, Object... params) {
  // ...
}
```

:::danger Viele spezifische Parameter mit variablem Parameter
Variable Parameter kombiniert mit vielen spezifischen Parametern kann zu Verwirrung führen, ab welchem Parameter die variablen Parameter beginnen.
Es ist daher besser wenige Parameter zu verwenden und in mehrere Methoden aufzuteilen, die jeweils einen spezifischen Zweck erfüllen.
:::

## J25 Boolean-Parameter in Methoden vermeiden {#boolean-parameter-in-methoden-vermeiden}

Boolean als Parameter in Methoden sollen nicht verwendet werden.
Stattdessen sollen eigene Methoden mit entsprechenden Namen und Parametern erstellt werden, weil damit das Verhalten der Funktion oder Methode klarer wird.

### J25 Problem

Boolean-Parameter in Methoden können zu Verwirrung und unerwartetem Verhalten führen, da der Aufrufer den Zweck des Parameters erraten muss.

```java
public void fetchData(String url, boolean async) {
  if (async) {
    // Asynchroner Aufruf
  } else {
    // Synchroner Aufruf
  }
}
```

### J25 Lösung

Verwende stattdessen spezifische Parameter oder separate Funktionen/Methoden, um das Verhalten klarer zu kennzeichnen.

```java
public void fetchAsyncData(String url) {
  // Asynchroner Aufruf
}

public void fetchData(String url) {
  // Synchroner Aufruf
}
```

## J26 Lambda-Ausdrücke statt Funktionsdeklarationen {#lambda-ausdruecke-statt-funktionsdeklarationen}

Lambda-Ausdrücke sollen verwendet werden, um Methoden in Java zu deklarieren, wenn sie kurz und prägnant sind.

::: info Methodenreferenzen

Methodenreferenzen sind eine spezielle Form von Lambda-Ausdrücken, die es ermöglichen, eine Methode als Lambda-Ausdruck zu übergeben.
Sie sollen eingesetzt werden, wenn ein Lambda-Ausdruck nur eine Methode aufruft, ohne zusätzliche Logik zu enthalten und dabei die Parameter unverändert weitergibt.

```java
// Lambda-Ausdruck
list.forEach(e -> System.out.println(e));

// Methodenreferenz
list.forEach(System.out::println);
```

:::

## J27 Ternärer Operator {#ternaerer-operator}

Der ternäre Operator (`condition ? expression1 : expression2`) soll verwendet werden, um einfache Bedingungen in einer einzigen Zeile zu schreiben.
Er ist einfach zu lesen und zu schreiben.
Er soll jedoch nicht geschachtelt werden, um die Lesbarkeit zu erhalten.
Verwende dann lieber `if...else`.

```java
final var result = condition ? expression1 : expression2;
```

:::info Hinweis
Der ternäre Operator ist auch bekannt als bedingter Operator oder `Elvis Operator`.

`Ternär` bedeutet, dass der Operator drei Operanden hat: die Bedingung, den Ausdruck, der ausgeführt wird, wenn die Bedingung wahr ist, und den Ausdruck, der ausgeführt wird, wenn die Bedingung falsch ist.
:::

:::warning Komplexität

- Der ternäre Operator soll nicht verschachtelt werden, um die Lesbarkeit zu erhalten.
- Der ternäre Operator soll nur für kurze Ausdrücke verwendet werden.
- Bei komplexeren Bedingungen oder Ausdrücken ist es besser, `if...else` zu verwenden.
- Bei komplexeren Bedingungen oder Ausdrücken kann auch eine separate Funktion verwendet werden.
:::

## J28 Verwendung von Streams {#verwendung-von-streams}

Java unterstützt Streams, die eine Reihe von Elementen in einer sequenziellen oder parallelen Weise verarbeiten können.
Streams sind eine leistungsstarke Möglichkeit, Daten zu filtern, zu transformieren und zu aggregieren, ohne Schleifen oder Iteratoren verwenden zu müssen.

Streams sollen verwendet werden, um Code klarer, lesbarer und kompatkter zu machen.

### J28 Problem

Die Verwendung von Schleifen und Iteratoren kann zu unleserlichem und unübersichtlichem Code führen, insbesondere wenn komplexe Filter- oder Transformationsoperationen durchgeführt werden müssen.
Darüber hinaus kann es zu Fehlern kommen, wenn Schleifen und Iteratoren nicht korrekt implementiert oder angewendet werden.

```java
final List<Integer> myList = Arrays.asList(1, 2, 3, 4, 5);

int sum = 0;
for (Integer num : myList) {
  if (num % 2 == 0) {
    sum += num;
  }
}

System.out.println(sum); // Output: 6
```

### J28 Lösung

Streams ersetzt die for-Schleife.

```java
List<Integer> myList = Arrays.asList(1, 2, 3, 4, 5);

int sum = myList.stream()
               .filter(num -> num % 2 == 0)
               .mapToInt(Integer::intValue)
               .sum();

System.out.println(sum); // Output: 6
```

### J28 Operationen für Streams

Methode | Erklärung | Beispiel
--------|-----------|---------
`filter()` | Filtert Elemente, die einer Bedingung entsprechen | `stream.filter(e -> e > 5)`
`map()` | Transformiert Elemente in andere Elemente | `stream.map(e -> e * 2)`
`mapToInt()` | Transformiert Elemente in Integer | `stream.mapToInt(e -> e.intValue())`
`mapToDouble()` | Transformiert Elemente in Double | `stream.mapToDouble(e -> e.doubleValue())`
`mapToLong()` | Transformiert Elemente in Long | `stream.mapToLong(e -> e.longValue())`
`flatMap()` | Transformiert und flacht verschachtelte Listen | `stream.flatMap(e -> e.stream())`
`distinct()` | Entfernt Duplikate | `stream.distinct()`
`sorted()` | Sortiert Elemente | `stream.sorted()`
`limit()` | Begrenzt die Anzahl der Elemente | `stream.limit(5)`
`skip()` | Überspringt die ersten n Elemente | `stream.skip(5)`
`reduce()` | Reduziert Elemente zu einem einzigen Wert | `stream.reduce(0, (a, b) -> a + b)`
`collect()` | Sammelt Elemente in eine Sammlung | `stream.collect(Collectors.toList())`
`toList()` | Sammelt Elemente in eine Liste, ersetzt `collect(Collectors.toList())` | `stream.toList()`
`toSet()` | Sammelt Elemente in ein Set | `stream.toSet()`
`toMap()` | Sammelt Elemente in eine Map | `stream.toMap(e -> e, e -> e * 2)`
`groupingBy()` | Gruppiert Elemente nach einem Schlüssel | `stream.collect(Collectors.groupingBy(e -> e % 2))`
`forEach()` | Führt eine Aktion für jedes Element aus | `stream.forEach(e -> System.out.println(e))`
`anyMatch()` | Überprüft, ob ein Element einer Bedingung entspricht | `stream.anyMatch(e -> e > 5)`
`allMatch()` | Überprüft, ob alle Elemente einer Bedingung entsprechen | `stream.allMatch(e -> e > 5)`
`noneMatch()` | Überprüft, ob kein Element einer Bedingung entspricht | `stream.noneMatch(e -> e > 5)`
`count()` | Zählt die Anzahl der Elemente | `stream.count()`
`min()` | Findet das kleinste Element | `stream.min(Comparator.naturalOrder())`
`max()` | Findet das größte Element | `stream.max(Comparator.naturalOrder())`
`findFirst()` | Findet das erste Element | `stream.findFirst()`
`findAny()` | Findet ein beliebiges Element | `stream.findAny()`
`parallel()` | Führt die Operationen parallel aus | `stream.parallel()`
`peek()` | Führt eine Aktion für jedes Element aus, ohne den Stream zu verändern | `stream.peek(System.out::println)`

### J28 Oft verwendete Operationen

::: code-group

```java [Liste in Array]
List<Integer> list = Arrays.asList(1, 2, 3, 4, 5);
Integer[] arr = list.stream().toArray(Integer[]::new);
```

```java [Array in Liste]
Integer[] arr = {1, 2, 3, 4, 5};
List<Integer> list = Arrays.stream(arr).collect(Collectors.toList());
```

```java [Liste in Map]
// Einfaches Mapping
List<String> list = Arrays.asList("Java", "Kotlin", "Scala");
Map<Integer, String> map = list.stream().collect(Collectors.toMap(String::length, e -> e));

// Gruppiert nach Genre
Map<String, List<Book>> groupedByGenre = items.stream().collect(Collectors.groupingBy(Book::genre));

// Neue Objekte erstellen
Map<Integer, PersonInfo> personInfoMap = personList.stream()
    .collect(Collectors.toMap(
        Person::getId, 
        person -> new PersonInfo(person.getName(), person.getName().length())
    ));

// Map für Transformation
List<PersonInfo> personInfoList = personList.stream()
    .map(person -> new PersonInfo(person.getName(), person.getName().length())) 
    .toLisT();    
```

```java [Map in Liste]
Map<Integer, String> map = new HashMap<>();

List<String> list = map.entrySet().stream()
    .map(e -> e.getKey() + ": " + e.getValue())
    .toLisT();
// Ausgabe: ["1: Java", "2: Kotlin", "3: Scala"]
```

```java [Filtern und Sammeln]
List<Integer> list = Arrays.asList(1, 2, 3, 4, 5);

List<Integer> evenNumbers = list.stream()
    .filter(e -> e % 2 == 0)
    .toLisT();
// Ausgabe: [2, 4]  
```

```java [Reduzieren]
List<Integer> list = Arrays.asList(1, 2, 3, 4, 5);

int sum = list.stream()
  .reduce(0, (a, b) -> a + b);

```

```java [Flatten]
List<List<Integer>> list = Arrays.asList(
  Arrays.asList(1, 2, 3),
  Arrays.asList(4, 5, 6),
  Arrays.asList(7, 8, 9)
);


list.stream()
  .flatMap(Collection::stream)
  .forEach(System.out::println);
// Ausgabe: 1, 2, 3, 4, 5, 6, 7, 8, 9
```

:::

::: warning Fallstricke

- Die Quelldaten darf während den Stream-Operationen nicht verändert werden (durch Hinzufügen, Entfernen oder Ändern von Elementen).
- Eine Stream Operation wird erst ausgeführt, wenn ein Terminal-Operation (z.B. `collect`, `sum`, `forEach`) aufgerufen wird.
D.h. Log-Ausgaben innerhalb von Stream-Operationen werden nicht ausgeführt, wenn keine Terminal-Operation aufgerufen wird.
- **`toList()` und `toSet()` sind nicht die gleichen wie `collect(Collectors.toList())` und `collect(Collectors.toSet())`.
`toList` und `toSet` liefern eine *immutable* Liste bzw. ein *immutable* Set zurück, das nicht verändert werden kann.
Der Zugriff darauf führt zu einer `UnsupportedOperationException`.**
- `toMap()` kann eine `IllegalStateException` werfen, wenn Schlüssel dupliziert werden.
D.h. die Schlüssel müssen eindeutig sein.
- `groupingBy()` kann eine `NullPointerException` werfen, wenn der Schlüssel `null` ist.
- `collect()` kann eine `NullPointerException` werfen, wenn das Sammeln in eine Liste oder ein Set erfolgt und ein Element `null` ist.
- `collect()` kann eine `IllegalStateException` werfen, wenn das Sammeln in eine Map erfolgt und Schlüssel dupliziert werden.
- Boxing und Unboxing kann ein Performance-Problem sein, wenn primitive Datentypen in Wrapper-Klassen umgewandelt werden.
Siehe [Autoboxing und Unboxing](index#autoboxing-und-unboxing) für weitere Informationen.
:::

::: info Methodenreferenzen

Für Stream-Operationen mit nur einem Parameter soll ein Methodenreferenz verwendet werden, um den Code zu vereinfachen und zu verkürzen.

Siehe [Methodenreferenzen Info](#lambda-ausdruecke-statt-funktionsdeklarationen) für weitere Informationen.

:::

### J28 Vorteile

- Die Verwendung der Stream-API kann zu einem einfacheren, übersichtlicheren und fehlersichereren Code führen.
- Durch die Verwendung von Stream-Operationen wie `filter`, `map`, `reduce`, `distinct` usw.
können komplexe Filter- und Transformationsoperationen auf eine klare und konsistente Weise durchgeführt werden.
- Darüber hinaus kann die Stream-API auch Parallelverarbeitung unterstützen, um die Leistung von Multi-Core-Systemen voll auszuschöpfen.

### J28 Nachteile

- Potentielle Performance-Probleme
- Komplizierte Verkettung von Befehlen
- Keine Zwischenergebnisse
- Schwierige Fehlerbehandlung (kann durch Stream*Debugger in IntelliJ entgegengewirkt werden)
- Komplexität

### J28 Ausnahmen

Es kann Fälle geben, in denen die Verwendung von Schleifen und Iteratoren sinnvoller ist,
z.B. wenn es sich um eine einfache Iteration ohne komplexe Filter- oder Transformationsoperationen handelt oder wenn es notwendig ist, auf Elemente in einer bestimmten Reihenfolge zuzugreifen.
Es ist daher wichtig, die Verwendung von Stream-Operationen sorgfältig zu prüfen und nur dann zu verwenden, wenn es notwendig und sinnvoll ist.

### J28 Weiterführende Literatur

- [Oracle Java 21 Streams](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/stream/package-summary.html)

## J29 Namen von Paketen {#namen-von-paketen}

- Paketen beginnen immer mit `com.company` für Enterprise-Anwendungen oder `org.project` für Open-Source-Projekte.
- Paketen und Packages sollen mit einem Nomen benannt werden, das den Inhalt beschreibt `com.company`, `com.company.project`, `com.company.project.module`.
- Implementierungen sollen `impl` als Teil des Namens enthalten `com.company.project.impl`, `com.company.project.user.impl`.
- Zusammengesetzte Nomen innerhalb eines Teils des Namensraums sollen mit Punkten getrennt werden. Statt `com.company.projectmodule` soll `com.company.project.module` verwendet werden.
Ausnahmen sind Situationen, in denen ein semantisches Problem oder Unverständnis entsteht, wenn der Name durch Punkt getrennt wird. In diesem Fall kann ein Bindstrich oder Unterstrich verwendet werden `com.company.project-module`.
- Die einzelne Tile eines Namensraums werden mit tieferliegenden Teilen immer konkreter. `com.company.project.entities`, `com.company.project.entities.user`, `com.company.project.entities.user.impl`.

## J30 Paket-Importe {#paket-importe}

Paket-Importe sollen in einer bestimmten Reihenfolge durch ein Formatierungs-Tool automatisch angeordnet werden, denn der Entwickler soll sich nicht um die Reihenfolge kümmern müssen.
Die Reihenfolge kann wie folgt sein, sie soll jedoch immer über ein Projekt konsistent sein.

1. **Java-Standardbibliotheken**: `java.*`, `javax.*`
2. **Drittanbieter-Bibliotheken**: `org.*`, `com.*`
3. **Eigene Pakete**: `com.example.myproject`
4. **Statische Importe**: `import static com.example.myproject.MyClass.MyStaticMethod`
5. **Wildcard-Importe**: `import com.example.myproject.*`
6. **Wildcard-Static-Importe**: `import static com.example.myproject.MyClass.*`

::: warning Wildcard-Importe
Wildcard-Importe können zu Namenskonflikten führen, wenn mehrere Klassen mit dem gleichen Namen in verschiedenen Paketen vorhanden sind.
:::

## J31 Vermeide automatisches Boxing und Unboxing {#autoboxing-und-unboxing}

Das automatische Boxing oder Unboxing von primitive Datentypen soll vermieden werden, um keine ungewollte Performance-Einbußen zu verursachen.

::: details Boxing vs. Unboxing

- **Boxing**: Konvertiert einen primitiven Datentyp in ein entsprechendes Wrapper-Objekt.
Aus `int` wird `Integer`, aus `double` wird `Double`, usw.
- **Unboxing**: Konvertiert ein Wrapper-Objekt in einen primitiven Datentyp.
Aus `Integer` wird `int`, aus `Double` wird `double`, usw.

```java
Integer myFoo(Integer input) {
  int i = input 5; // Unboxing

  return i; // Boxing
}
```

:::

### J31 Problem

Das automatische Boxing und Unboxing von primitiven Datentypen kann zu unerwünschten Performance-Einbußen führen, insbesondere in Schleifen oder bei häufigen Operationen.

Wo möglich soll auf primitive Datentypen zurückgegriffen werden, um das Boxing und Unboxing zu vermeiden.

```java
List<Integer> list = new ArrayList<>();

for (int i = 0; i < 1000000000; i++) {
  list.add(i); // Boxing von int zu Integer
}
```

Ein weiteres Beispiel ist die Stream-API, die häufig verwendet wird, um Daten zu filtern, zu transformieren und zu aggregieren.

```java
List<Integer> list = Arrays.asList(1, 2, 3, 4, 5);

int sum = list.stream()
  .filter(num -> num % 2 == 0) // Boxing von int zu Integer
  .mapToInt(Integer::intValue) // Unboxing von Integer zu int
  .sum();
```

Aber auch Optional kann zu Boxing führen.

```java
Optional<Integer> optional = Optional.of(1); // Boxing von int zu Integer
```

### J31 Lösung

#### J31 Primitive Datentypen

Für bekannte große Datenmengen oder Schleifen sollen primitive Datentypen verwendet werden, um das Boxing und Unboxing zu vermeiden.

```java
int[] array = new int[1000000000];

for (Integer i = 0; i < array.length; i++) {
  array[i] = i;
}
```

::: info Generics und primitive Datentypen

Generics unterstützen keine primitiven Datentypen, daher müssen Wrapper-Klassen wie `Integer`, `Double`, `Long` usw. verwendet werden.

:::

#### J31 Stream-API

Für die Stream-API sollen spezielle Methoden wie `mapToInt`, `mapToDouble`, `mapToLong`, `flatMapToInt`, `flatMapToDouble`, `flatMapToLong` verwendet werden, um das Boxing und Unboxing zu vermeiden.

::: code-group

```java [Stream mit primitiven Datentypen]
List<Integer> list = Arrays.asList(1, 2, 3, 4, 5);

int sum = list.stream()
  .filter(num -> num % 2 == 0)
  .mapToInt(Integer::intValue)
  .sum();

// oder
IntStream intStream = list.stream()
  .mapToInt(Integer::intValue); // Unboxing von Integer zu int
```

```java [IntSummaryStatistics]
// liefert Statistiken wie Summe, Durchschnitt, Minimum, Maximum, Anzahl
IntSummaryStatistics summaryStatistics = IntStream.of(1, 2, 3, 4, 5).summaryStatistics();
summaryStatistics.getAverage() // 3.0
summaryStatistics.getCount() // 5
summaryStatistics.getMax() // 5
summaryStatistics.getMin() // 1
summaryStatistics.getSum() // 15
```

:::

#### J31 Optional

Für `Optional` sollen die folgenden Klassen für primitive Datentypen verwendet werden, um das Boxing und Unboxing zu vermeiden.

```java
OptionalInt optionalInt = OptionalInt.of(1);
OptionalDouble optionalDouble = OptionalDouble.of(1.0);
OptionalLong optionalLong = OptionalLong.of(1L);
```

#### J31 Functional Interfaces

Für primitive Datentypen gibt es neben den generischen Functional Interfaces auch spezielle Functional Interfaces, die primitiven Datentypen entsprechen.
Diese sollen verwendet werden, um das Boxing und Unboxing zu vermeiden.

- `IntBinaryOperator` statt `BinaryOperator<Integer>`
- `LongBinaryOperator` statt `BinaryOperator<Long>`
- `DoubleBinaryOperator` statt `BinaryOperator<Double>`
- `IntConsumer` statt `Consumer<Integer>`
- `LongConsumer` statt `Consumer<Long>`
- `DoubleConsumer` statt `Consumer<Double>`
- `ObjIntConsumer` statt `BiConsumer<T, Integer>`
- `ObjLongConsumer` statt `BiConsumer<T, Long>`
- `ObjDoubleConsumer` statt `BiConsumer<T, Double>`
- `IntFunction` statt `Function<Integer, R>`
- `LongFunction` statt `Function<Long, R>`
- `DoubleFunction` statt `Function<Double, R>`
- `IntUnaryOperator` statt `Function<Integer, Integer>`
- `LongUnaryOperator` statt `Function<Long, Long>`
- `DoubleUnaryOperator` statt `Function<Double, Double>`
- `IntToDoubleFunction` statt `Function<Integer, Double>`
- `IntToLongFunction` statt `Function<Integer, Long>`
- `LongToIntFunction` statt `Function<Long, Integer>`
- `LongToDoubleFunction` statt `Function<Long, Double>`
- `DoubleToIntFunction` statt `Function<Double, Integer>`
- `DoubleToLongFunction` statt `Function<Double, Long>`
- `ToIntFunction` statt `Function<T, Integer>`
- `ToLongFunction` statt `Function<T, Long>`
- `ToDoubleFunction` statt `Function<T, Double>`
- `ToIntBiFunction<T, U>` statt `BiFunction<T, U, Integer>`
- `ToLongBiFunction<T, U>` statt `BiFunction<T, U, Long>`
- `ToDoubleBiFunction<T, U>` statt `BiFunction<T, U, Double>`
- `IntPredicate` statt `Predicate<Integer>`
- `LongPredicate` statt `Predicate<Long>`
- `DoublePredicate` statt `Predicate<Double>`
- `IntSupplier` statt `Supplier<Integer>`
- `LongSupplier` statt `Supplier<Long>`
- `DoubleSupplier` statt `Supplier<Double>`

### J31 Vorteile

- Die Verwendung von primitiven Datentypen kann zu einer besseren Leistung und Effizienz führen, insbesondere bei großen Datenmengen oder Schleifen.
- Das Erstellen von Wrapper-Objekten benötigt zusätzlichen Speicherplatz.

### J31 Weiterführende Literatur

- [java.util.function](https://docs.oracle.com/javase/8/docs/api/java/util/function/package-frame.html)
- [Optionals](https://docs.oracle.com/javase/8/docs/api/java/util/package-summary.html)

## J32 for, Array.forEach, Stream.forEach {#for-array-foreach-stream-foreach}

::: danger TODO:
:::

## J33 Generics einsetzen {#generics-einsetzen}

Generics sollen verwendet werden, um die Typsicherheit in Java zu erhöhen und die Wiederverwendbarkeit von Klassen und Methoden zu verbessern.

### J33 Problem

Oftmals müssen Objekte eines Typs in einer Liste oder Map gespeichert werden, ohne dass der Typ zur Laufzeit bekannt ist.

Der Compiler kann jedoch bei diesen allgemeinen Listen nicht überprüfen, ob die Typen korrekt sind, was zu Laufzeitfehlern führen kann.

```java
List list = new ArrayList();
list.add("Java");
Integer value = (Integer) list.get(0); // ClassCastException
```

### J33 Lösung

Generics ermöglichen es, den Typ eines Objekts zur Compile-Zeit zu überprüfen und sicherzustellen, dass der Typ zur Laufzeit korrekt ist.

```java
final List<String> list = new ArrayList<>();

list.add("Java");
final Integer value = list.get(0); // Compiler-Fehler
```

::: warning Erstellen von generischen Instanzen

Beim Erzeugen einer Instanz sollte der Typ nicht explizit angegeben werden, um die Typsicherheit zu gewährleisten.
Der Diamond-Operator `<>` soll verwendet werden, um den Typ automatisch zu inferieren.

```java
// Falsch (zwei Typen String angegeben)
List<String> list = new ArrayList<String>(); // [!code --]

// Richtig
List<String> list = new ArrayList<>(); // [!code ++]
```

:::

## J34 Type Erasure bei Generics {#type-erasure-bei-generics}

Generics in Java sind zur Compile-Zeit und nicht zur Laufzeit verfügbar.
Das bedeutet, dass der Compiler die Typen zur Compile-Zeit überprüft und dann die Typen entfernt.

### J34 Problem

Zur Laufzeit kann nicht auf den Typ eines generischen Typs wie z.B. einer Liste mit einem bestimmten Typ überprüfen.

```java
if (someList instanceof List<String>) { // Compiler-Fehler
  // ...
}
```

### J34 Vorteile

- Da keine Typprüfung zur Laufzeit durchgeführt wird, wird die Leistung nicht beeinträchtigt.
- Kompatibel zu älteren Binärcode-Versionen von Java.

### J34 Nachteile

- Einschränkungen bei der Verwendung von Reflexion und Typprüfung zur Laufzeit.
- Zur Laufzeit kann nicht auf den Typ eines generischen Typs überprüft werden.

## J35 Methoden-Verkettung {#methoden-verkettung}

Die Methoden-Verkettung soll verwendet werden, um Methodenaufrufe auf einem Objekt in einer einzigen Anweisung zu verkettet.

Methoden-Verkettung ist eine Technik, bei der mehrere Methodenaufrufe auf einem Objekt in einer einzigen Anweisung verkettet werden.
Dies wird beispielsweise bei Array-Methoden wie `map()`, `filter()`, `reduce()` und anderen verwendet.

Verwende Methoden-Verkettung, um den Code kompakter und lesbarer zu machen.

### J35 Beispiel

```java
final var numbers = List.of(1, 2, 3, 4, 5);

final var sum = numbers.stream()
    .filter(x -> x % 2 == 1)
    .map(x -> x * 2)
    .reduce(0, Integer::sum);
```

### J35 Regeln

- Jeder Methodenaufruf wird auf einer neuen Zeile eingerückt (entsprechend den ESLint-Regeln).
- Jeder Methodenaufruf wird durch einen Punkt (`.`) **vorangehend** zum Methodennamen getrennt.
- Verschachtelung werden vermieden, um die Lesbarkeit zu erhalten, ggf. durch Methoden-Referenzen.

```java
final var sum = numbers.stream()
    .filter(this::divisibleByTwo)
    .map(this::doubleIt)
    .reduce(this::addSum)
    .orElse(0);
```

### J35 Vorteile

- Kompakter und lesbarer Code
- Einfache Verkettung von Methodenaufrufen
- Bessere Performance durch Vermeidung von Zwischenvariablen
- Einfache Wiederverwendung von Methodenketten

### J35 Ausnahmen

- Übermäßige Verkettung von Methoden kann die Lesbarkeit beeinträchtigen.
- Bei komplexen Operationen oder Bedingungen ist es besser, die Methodenaufrufe aufzuteilen.
- Bei der Verkettung von Methoden ist darauf zu achten, dass die Reihenfolge der Methodenaufrufe korrekt ist.

## J36 Unbenutzte Variablen und Parameter {#unbenutzte-variablen-und-parameter}

:::danger Java-Version
Das Feature ist erst ab Java 22 verfügbar (März 2024)
:::

Es sollen keine unbenutzten Variablen und Parameter im Code vorhanden sein.

- Wenn die Funktionsdeklaration die Parameter vorschreibt, kann `_` als Platzhalter für unbenutzte Parameter verwendet werden.

### J36 Problem

Unbenutzte Variablen und Parameter sind oft als Deklaration notwendig, um den Code zu kompilieren, jedoch sieht es so aus, als würden sie im Code verwendet werden, obwohl das nicht der Fall ist.

### J36 Lösung

Verwende `_` als Platzhalter, um den Code sauber zu halten.

Underline `_` als Platzhalter kann für Parameter, Pattern-Matching (switch), Schleifenvariablen, Exceptionvariablen in `try-catch` und `try-with-resources` verwendet werden.

```java

public void sum(a, b) // [!code --]
public void sum(_, _) // [!code ++]
```

### J36 Vorteile

- Sauberer und wartbarer Code
- Vermeidung von Verwirrung und unerwartetem Verhalten
- Bessere Lesbarkeit und Verständlichkeit des Codes

### J36 Nachteile

- Der Unterstrich kann zu Verwirrung führen, wenn er nicht als Platzhalter für unbenutzte Variablen oder Parameter verwendet wird.
- Spätere Erweiterungen der Funktion oder Methode lassen den Namen des originalen Parameters vermissen, wenn der Unterstrich verwendet wird.
**Bitte beachten**, dass eine Erweiterung einer vorhandenen Methode gegen das [OCP Prinzip](../../2.principles/principles#open-closed-principle) verstößt.

### J36 Weiterführende Literatur/Links

- [Drop the Baggage: Use `_` for Unnamed Local Variables and Patterns in Java 22](https://blog.jetbrains.com/idea/2024/03/drop-the-baggage-use-_-for-unnamed-local-variables-and-patterns-in-java-22/)

## J37 Verwende spezielle Objekte statt spezielle Werte {#verwende-spezielle-objekte-statt-spezielle-werte}

Wenn Objekte, wie `User` oder jede andere Art von Entität verwendet werden, und es spezielle Fälle gibt wie *nicht gefunden*, *ungültig*, *leer*, *fehlerhaft*, etc., dann sollen spezielle abgeleitete Objekte verwendet werden, um diese Fälle zu repräsentieren.

### J37 Problem

Spezielle Fälle wie *nicht gefunden*, *ungültig*, *leer*, *fehlerhaft*, etc. werden oft durch spezielle Werte wie `null`, `-1`, `0`, `''`, `false`, etc. repräsentiert.
Dies führt dazu, dass im Code ständig überprüft werden muss, ob der Wert speziell ist und entsprechend behandelt werden muss.

Wird diese Prüfung nicht gemacht und vergessen, kommt es zu Fehlern wie `Null-Pointer-Exceptions`.
Diese Fehler sind schwer zu finden und zu beheben, da sie oft an einer anderen Stelle im Code auftreten, als wo der Fehler tatsächlich liegt.

```java

public User getUser(int id) {
  User user = getUserFromDatabase(id);

  if (user == null) {
    return null;
  }

  return user;
}
```

### J37 Lösung

Verwende abgeleitete Objekte, um spezielle Fälle zu repräsentieren.
Es kann beispielsweise ein `NotFoundUser`-Objekt für den Fall eines nicht-gefundenen Benutzers erstellt werden.

Dieses *leere* Benutzer-Objekt verhält sich  **anders** im Vergleich zu einem *korrekten* Benutzer-Objekt.
So können damit keine Operationen durchgeführt werden, die nur für korrekte Benutzer erlaubt sind.

Die Prüfung auf einen *nicht-gefundenen* Benutzer kann durch Methoden des Objekts selbst erfolgen.
Sollte dieses Objekt doch einmal verwendet werden, so gibt nur dann eine Exception, wenn die Operation am Objekt nicht erlaubt ist.
Die Gültigkeit wird in operativen Methoden geprüft (siehe [Trennung von operationalem und integrativem Code](index#trennung-von-operationalem-und-integrativem-code)), so können Integrationsmethoden diese Werte einfach weitergeben.

Das folgende Beispiel zeigt die Verwendung eines speziellen Objekts `NotFoundEntity` für den Fall, dass eine Entität (ein generisches Beispiel-Daten-Objekt) nicht gefunden wurde.
Es werden keine Exceptions geworfen, sondern spezielle Objekte zurückgegeben, die spezielles Verhalten haben (`Polymorphismus`).
Wenn diese Objekte verwendet werden, wird das spezielle Verhalten automatisch ausgeführt.
In diesem Fall wird ein leeres Array zurückgegeben.
Alternativ kann auch ein Fehler geworfen werden, wenn das spezielle Objekt verwendet wird.

::: info Kurzgesagt

Wenn spezielle Objekte verwendet werden, um spezielle Fälle zu repräsentieren, kann damit trotzdem gearbeitet werden und das Ergebnis ist immer gültig.

:::

::: details Optional

Die Klasse [Optional](https://docs.oracle.com/javase/8/docs/api/java/util/Optional.html) in Java kann auch verwendet werden, um diese spezielle Fälle zu repräsentieren.
Es ist nützlich, wenn bereits Klassen und Objekte aus einer Legacy-Anwendung verwendet werden, die nicht geändert werden können.

:::

```java
class Entity {
  private int id;
  private String name;

  public Entity(int id, String name) {
    this.id = id;
    this.name = name;
  }

  public boolean isValid() {
    return true;
  }
  public List<String> doSomething() {
    return List.of();
  }
}

class NotFoundEntity extends Entity {
  public NotFoundEntity() {
    super(-1, 'Unknown');
  }
  @Override
  public boolean isValid() {
    return false;
  }
  @Override
  public void doSomething() {
    //do nothing
  }
}

//...
public Entity getEntityById(int id) {
  if (id <= 0) {
    return new NotFoundEntity();
  }
  // liefert immer ein gültiges Entity-Objekt
}

public void foo(int id) {
  var entity = getEntityById(id);

  List<String> result = entity.doSomething(); // liefert leer Array, wenn NotFoundEntity
}
```

### J37 Vorteile

- Keine Null-Pointer-Exceptions
- Spezielle Fälle werden explizit repräsentiert.
- Unterscheidung zwischen verschiedenen Fällen durch unterschiedliches Verhalten und Objekte (statt `null`)
- Keine ständige Überprüfung auf spezielle Werte notwendig (wie `null`, `-1`, `0`, `''`, `false`, etc.)
- Code kann nicht fehlschlagen, weil keine spezielle Werte verwendet werden.
- Kein Exceptionhandling
  - Vermeidet verschachtelte try-catch-Blöcke
  - Testen von speziellem Verhalten wird einfacher oder braucht gar nicht mehr getestet zu werden, da es nichts zu testen gibt
  - API wird einfacher, da keine Exceptions geworfen werden müssen und Rückgabewerte immer gültig und prüfbar (`isValid()`) sind
- Code wird einfacher und lesbarer, da spezielle Fälle keine zusätzlichen `if`-Anweisungen benötigen.

### J37 Nachteile

- Architektur der Klassen und Objekte wird komplexer oder vorhandene Architektur muss angepasst werden.
- Methoden müssen in ihrer Dokumentation nun statt Exceptions spezielle Objekte beschreiben.
- Spezielle Objekte müssen erstellt und gepflegt werden.
- Spezielle Objekte können zu einer größeren Anzahl von Klassen führen.
- Umstellung bestehender Code kann aufwändig sein.
- Exceptions sind in Fleisch und Blut der meisten Entwickler und werden oft als einfacher angesehen.
- Performance kann durch die Erstellung von speziellen Objekten beeinträchtigt werden, insbesondere da Pfade nicht mehr durch Prüfung von speziellen Werten abgekürzt werden könnten.

::: warning Anderes Vorgehen gleiche Wirkung

Der Einsatz von speziellen Werten wie `null` unterscheidet sich im Endergebnis nicht von speziellen Objekten.
Eine Prüfung muss früher oder später erfolgen, ob es sich um einen speziellen Fall handelt (`null` oder `isValid()`).

Jedoch ist in der Entwicklung oft die Situation gegeben, dass Entwickler einen Eingabewert **nicht** prüfen und es dadurch zu Fehlern kommt.
Durch den Einsatz von speziellen Objekten wird die Prüfung auf spezielle Werte automatisiert und der Code wird sicherer.
Erst sogenannte Kernfunktionen, die die speziellen Objekte verwenden, müssen die Prüfung dann durchführen.
Diese sind in der Regel besser getestet im Gegensatz zu den weiter oben in der Hierarchie liegenden Methoden.

Durch den Einsatz von speziellen Objekten wird es unwahrscheinlicher, dass Fehler wie `null`-Pointer-Exceptions oder `undefined`-Exceptions auftreten.

:::

### J37 Ausnahmen

- Für eine bereits existierende API sollte das Verhalten nicht einfach so geändert werden,
da dies gegen [Lisko-Substitutionsprinzip](../../2.principles/principles#liskov-substitution-principle) und das Prinzip [Prinzip der konzeptuellen Integrität](../../2.principles/principles#prinzip-der-konzeptuellen-integritaet) verstößt.

## J38 JetBrains Annotations {#jetbrains-annotations}

JetBrains Annotations sind eine Reihe von Annotationen, die in Java-Code verwendet werden können, um zusätzliche Informationen über den Code zu geben.
Die Annotationen werden von JetBrains entwickelt und in ihren IDEs wie IntelliJ IDEA verwendet, um den Code zu analysieren und zu überprüfen.

JetBrains Annotationen sollen verwendet werden, um den Code zu dokumentieren und auf Null-Referenzen und andere Probleme hinzuweisen.

### J38 Problem

Es kann schwierig sein, den Code auf Null-Referenzen und andere Probleme zu überprüfen, die während der Laufzeit auftreten können.
Außerdem können schlecht dokumentierte Methoden und Klassen zu Verwirrung und Fehlern führen.

```java
public void foo(String s) {
  if (s == null) {
    throw new NullPointerException();
  }
  // ...
}
```

### J38 Refactoring

Mit den Annotations von JetBrains können Entwickler Methoden und Klassen genau dokumentieren und auf Null-Referenzen und andere Probleme hinweisen.
Zum Beispiel kann die `@NotNull`-Annotation verwendet werden, um anzuzeigen, dass eine Variable, ein Parameter oder ein Rückgabewert einer Methode nicht null sein darf.
Die `@Nullable`-Annotation kann verwendet werden, um anzuzeigen, dass ein Parameter oder Rückgabewert einer Methode null sein kann.

Andere mögliche [Annotations-Typen von Jetbrains](https://javadoc.io/doc/org.jetbrains/annotations/latest/index.html) sind:

- `org.intellij.lang.annotations.Flow`: Verwendet zur Angabe von Flussbedingungen, die von einem Code-Analyse-Tool verwendet werden können, um mögliche Fehler im Code zu identifizieren.
- `org.intellij.lang.annotations.JdkConstants`: Verwendet zur Verwendung von Konstanten aus der JDK-Codebasis, um Compilerwarnungen und -fehler zu vermeiden.
- `org.intellij.lang.annotations.Language`: Verwendet zur Angabe der Sprache, die in einem String-Literal verwendet wird, um Tools wie Code-Analyse-Tools und IDEs zu unterstützen.
- `org.jetbrains.annotations.ApiStatus`: Verwendet zur Kennzeichnung von API-Elementen (Methoden, Klassen usw.) mit ihrem aktuellen Stabilitätsstatus (experimentell, stabil, veraltet usw.).
- `org.jetbrains.annotations.Contract`: Verwendet zur Angabe von Vertragsbedingungen, die eine Methode erfüllen muss, wie z.B. dass sie keine `null`-Rückgabewerte liefern darf oder dass sie einen bestimmten Wertebereich zurückgeben muss.
- `org.jetbrains.annotations.Debug`: Verwendet zur Markierung von Code-Elementen (Klassen, Methoden usw.), die nur für Debugging-Zwecke verwendet werden sollten und nicht in einer Produktionsumgebung aufgerufen werden sollten.
- `org.jetbrains.annotations.DependsOn`: Verwendet zur Angabe von Abhängigkeiten zwischen Code-Elementen (Klassen, Methoden usw.), um Tools wie IDEs und Build-Tools bei der Erstellung von Abhängigkeitsdiagrammen zu unterstützen.
- `org.jetbrains.annotations.ExpectedFailure`: Verwendet zur Markierung von Tests, die auf fehlgeschlagene Tests warten oder darauf, dass bestimmte Ausnahmen ausgelöst werden.
- `org.jetbrains.annotations.FileCharset`: Verwendet zur Angabe des Zeichensatzes, der für eine bestimmte Datei verwendet werden soll.
- `org.jetbrains.annotations.MagicConstant`: Verwendet zur Verwendung von Enum-ähnlichen Konstanten mit einem bestimmten Wertebereich und einem vordefinierten Satz von Konstantenwerten.
- `org.jetbrains.annotations.Nls`: Verwendet zur Angabe von lokalisierten Strings, um Tools wie IDEs und Code-Analyse-Tools bei der Lokalisierung von Code zu unterstützen.
- `org.jetbrains.annotations.NotNull`: Verwendet zur Angabe von Argumenten, die nicht `null` sein dürfen.
- `org.jetbrains.annotations.Nullable`: Verwendet zur Angabe von Argumenten, die `null` sein dürfen.
- `org.jetbrains.annotations.Pattern`: Verwendet zur Überprüfung von Strings mit einem regulären Ausdruck.
- `org.jetbrains.annotations.PropertyKey`: Verwendet zur Angabe von Schlüsseln für lokalisierte Strings.
- `org.jetbrains.annotations.Range`: Verwendet zur Überprüfung von Argumenten auf einen bestimmten Wertebereich.
- `org.jetbrains.annotations.RegExp`: Verwendet zur Überprüfung von Strings mit einem regulären Ausdruck.
- `org.jetbrains.annotations.Subst`: Verwendet zur Ersetzung von Platzhaltern in Strings durch bestimmte Werte.
- `org.jetbrains.annotations.TestOnly`: Verwendet zur Markierung von Code-Elementen (Klassen, Methoden usw.), die nur für Tests verwendet werden sollten und nicht in einer Produktionsumgebung aufgerufen werden sollten

::: code-group

```java [@NotNull]
public static String formatName(@NotNull String firstName, @NotNull String lastName) {
  return lastName + ", " + firstName;
}
```

```java [@Contract]
public static void divide(@Contract("_,0 -> fail") int a, int b) {
  if (b == 0) {
    throw new IllegalArgumentException("Divisor cannot be zero");
  }
  int result = a / b;
  System.out.println(result);
}
```

```java [@MagicConstant]
  public class PaymentMethod {
    public static final String CREDIT_CARD = "credit_card";
    public static final String PAYPAL = "paypal";
    public static final String GOOGLE_PAY = "google_pay";

    private String method;

    public PaymentMethod(@MagicConstant(stringValues = {CREDIT_CARD, PAYPAL, GOOGLE_PAY}) String method) {
      this.method = method;
    }

    // ...
  }
```

```java [@Range]
public static void validateAge(@Range(from = 18, to = 99) int age) {
  if (age < 18 || age > 99) {
      throw new IllegalArgumentException("Age must be between 18 and 99");
  }
  System.out.println("Valid age: " + age);
}
```

```java [@Pattern]
public static void validateEmail(@Pattern(regexp = "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$") String email) {
  if (!email.matches("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")) {
      throw new IllegalArgumentException("Invalid email format");
  }
  System.out.println("Valid email: " + email);
}
```

:::

### J38 Vorteile

- Reduziert die Anzahl von Null-Referenz-Exceptions
- Verbessert die Dokumentation von Code
- Unterstützt statische Analysewerkzeuge und IDEs bei der Fehlererkennung. IntelliJ IDEA zeigt z.B. eine Warnung an, wenn eine Methode mit `@NotNull`-Annotation einen `null`-Wert zurückgibt.
- Verbessert die Lesbarkeit von Code für andere Entwickler

### J38 Nachteile

- Erfordert zusätzliche Zeit und Arbeit, um Annotations in den Code zu integrieren
- Kann dazu führen, dass der Code unübersichtlich wird, wenn zu viele Annotations verwendet werden

### J38 Ausnahmen

- Für kleine und einfache Projekte können Annotations möglicherweise nicht erforderlich sein
- Es kann Fälle geben, in denen der Aufwand, Annotations zu verwenden, den Nutzen überwiegt.

### J38 weiterführende Literatur/Links

- JetBrains Annotations Dokumentation: <https://www.jetbrains.com/help/idea/nullable-and-notnull-annotations.html>
- "Effective Java" von Joshua Bloch: Ein Buch, das die Verwendung von Annotations in Java detailliert beschreibt.

## J39 Eingabeprüfungen in REST-API mit Annotation {#eingabepruefungen-in-rest-api-mit-annotation}

Eingabeprüfungen in RESTful Web Services sollen verwendet werden, um unerwartete Fehler zu vermeiden und die Sicherheit zu erhöhen.

### J39 Problem

RESTful Web Services erlauben den Austausch von Daten zwischen verschiedenen Systemen über HTTP-Anfrage.
Diese Daten können jedoch in unerwarteter Weise falsch formatiert oder ungültig sei.
Eine fehlgeschlagene Eingabeprüfung kann zu unerwarteten Ergebnissen oder sogar zu Sicherheitsproblemen führen.

```java
@Path("/products/{category}/{productId}")
public class ProductResource {
  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public Response getProduct(
      @PathParam("category") String category,
      @PathParam("productId") int productId) {
      // ...
  }
}
```

In diesem Beispiel gibt es zwei Pfadparameter: `category` und `productId`. Der `category`-Parameter kann einen beliebigen String enthalten und `productId` muss eine ganze Zahl sei.
Es gibt keine Eingabeprüfung auf die Werte der Parameter.

### J39 Lösung

Eine Möglichkeit, die Eingabeprüfung in RESTful Web Services zu verbessern, besteht darin, Annotationen zu verwenden, um die zulässigen Werte und Formate von Parametern zu definiere.
JAX-RS bietet eine Vielzahl von Annotationen an, die dazu verwendet werden können, Eingabeprüfungen durchzuführen.

Einige der wichtigsten Annotationen, die in REST-Methoden verwendet werden können, um Eingabeprüfungen durchzuführen:

- `@PathParam` - Ermöglicht den Zugriff auf den Wert eines Pfadparameters in einer REST-Anfrage.
- `@QueryParam` - Ermöglicht den Zugriff auf den Wert eines Abfrageparameters in einer REST-Anfrage.
- `@HeaderParam` - Ermöglicht den Zugriff auf den Wert eines Header-Parameters in einer REST-Anfrage.
- `@CookieParam` - Ermöglicht den Zugriff auf den Wert eines Cookie-Parameters in einer REST-Anfrage.
- `@FormParam` - Ermöglicht den Zugriff auf den Wert eines Formular-Parameters in einer REST-Anfrage.
- `@BeanParam` - Ermöglicht die Verwendung eines POJOs, das mit `@PathParam`, `@QueryParam`, `@HeaderParam`, `@CookieParam` und `@FormParam` annotiert ist, um eine Gruppe von Parametern zu erfassen.
- `@DefaultValue` - Legt einen Standardwert für einen Parameter fest, falls er in der REST-Anfrage nicht vorhanden ist.
- `@Min` - Legt den minimalen Wert für eine numerische Eingabe fest.
- `@Max` - Legt den maximalen Wert für eine numerische Eingabe fest.
- `@NotNull` - Legt fest, dass ein Parameter in der REST-Anfrage nicht null sein darf.
- `@Size` - Legt die Größe eines Parameters in der REST-Anfrage fest.
- `@UUID` - Legt fest, dass ein Parameter in der REST-Anfrage eine gültige UUID sein muss.
- `@Pattern` - Legt ein reguläres Ausdrucksmuster fest, das ein Parameter in der REST-Anfrage erfüllen muss.

Diese Annotationen können verwendet werden, um sicherzustellen, dass die Eingaben in einer REST-Anfrage korrekt sind und um unerwartete Fehler bei der Verarbeitung zu vermeiden.

::: code-group

```java [@PathParam]
@Path("/products/{category}/{productId : \\d+}")
public class ProductResource {
  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public Response getProduct(
          @PathParam("category") @Pattern(regexp = "^(books|electronics|clothing)$") String category,
          @PathParam("productId") int productId) {
      // ...
  }
  // liefert 400-Fehler, wenn category nicht "books", "electronics" oder "clothing" ist
}
```

```java [@UUID]
@GET
@Path("/{id}")
public Response getResource(@PathParam("id") @UUID String id) {
    // code here
}
// liefert 400-Fehler, wenn id keine gültige UUID ist
// UUID-Format: 123e4567-e89b-12d3-a456-426614174000
```

```java [@Min, @Max]
@GET
@Path("/{number}")
public Response getNumber(@PathParam("number") @Min(1) @Max(10) int number) {
    // code here
}
// liefert 400-Fehler, wenn number < 1 oder number > 10
```

```java [@Email]
@POST
@Path("/example/{name}/{age}/{email}/{username}")
@Consumes(MediaType.APPLICATION_JSON)
public Response exampleMethod(
        @PathParam("name") final String name,
        @PathParam("age") @Min(value = 18, message = "Age must be at least 18") @Max(value = 120, message = "Age must not exceed 120") final int age,
        @PathParam("email") @Email(message = "Invalid email address") final String email,
        @PathParam("username") @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$", message = "Username must be at least 8 characters long and contain at least one letter and one number") final String username
) {
    // Methodenlogik hier...

    return Response.ok().build();
}

```

:::

### J39 Vorteile

- Bessere Eingabeprüfung: Annotationen ermöglichen eine präzisere Definition der zulässigen Werte und Formate von Parametern, was zu einer besseren Eingabeprüfung führt.
- Sicherheit: Eine effektive Eingabeprüfung kann dazu beitragen, Sicherheitsprobleme zu verhindern, die durch unerwartete oder ungültige Eingaben verursacht werden können.
- In der Regel wird der HTTP-Statuscode "400 Bad Request" zurückgegeben, wenn eine Eingabeprüfung in einer REST-API fehlschlägt.
- Bessere Lesbarkeit und Nachvollziehbarkeit: Annotationen können verwendet werden, um die Bedeutung von Parametern in REST-Methoden zu dokumentieren.

### J39 Nachteile

- Nicht alle Eingabeprüfungen können mit Annotationen durchgeführt werden. Eine manuelle Prüfung im Code ist in einigen Fällen erforderlich.

### J39 Weiterführende Literatur/Links

- [Java EE 7 Tutorial: Using Path Parameters](https://docs.oracle.com/javaee/7/tutorial/jaxrs-advanced004.htm)
- [Java EE 7 Tutorial: Using Query Parameters](https://docs.oracle.com/javaee/7/tutorial/jax)

## J40 Verwendung von `com.machinezoo.noexception` in Callbacks wie z.B. `forEach` in Java {#verwendung-von-com-machinezoo-noexception-in-callbacks-wie-z-b-foreach-in-java}

Es ist eine bewährte Praxis in Java, die Bibliothek `com.machinezoo.noexception` zu verwenden, um die Verwendung von `try-catch`-Blöcken in Callback-Funktionen wie `forEach` zu reduzieren. Durch die Verwendung dieser Bibliothek wird der Code sauberer und lesbarer, da die Ausnahmebehandlung von Callbacks elegant behandelt wird.

### J40 Problem

Bei der Verwendung von Callback-Funktionen wie `forEach` in Java besteht die Notwendigkeit, Ausnahmen innerhalb des Callbacks zu behandeln. Dies führt zu zusätzlichem Code und erhöht die Komplexität, insbesondere wenn mehrere Ausnahmen behandelt werden müssen.

```java
List<String> list = Arrays.asList("apple", "banana", "cherry");

try {
    list.forEach(item -> {
        try {
            // Operationen, die eine Ausnahme werfen können
            // ...
        } catch (Exception e) {
            // Ausnahmebehandlung
            // ...
        }
    });
} catch (Exception e) {
    // Ausnahmebehandlung
    // ...
}
```

### J40 Refactoring

Durch die Verwendung von `com.machinezoo.noexception` kann die Ausnahmebehandlung in Callback-Funktionen eleganter gehandhabt werden.
Die Bibliothek bietet verschiedene Hilfsmethoden an, um Ausnahmen in Callbacks zu behandeln, ohne dass zusätzliche `try-catch`-Blöcke erforderlich sind.

```java
import com.machinezoo.noexception.Exceptions;

List<String> list = Arrays.asList("apple", "banana", "cherry");

list.forEach(Exceptions.sneak().consumer(item -> {
  // Operationen, die eine Ausnahme werfen können
  // ...
}));
```

### J40 Vorteile

- Reduzierung des Boilerplate-Codes durch die Verwendung von `com.machinezoo.noexception`
- Sauberer und lesbarer Code ohne zusätzliche `try-catch`-Blöcke in Callback-Funktionen
- Bessere Trennung von Geschäftslogik und Ausnahmebehandlung

### J40 Nachteile

- Einführung einer zusätzlichen Abhängigkeit durch die Verwendung von `com.machinezoo.noexception`
- Erhöhte Komplexität des Codes durch die Verwendung von Hilfsmethoden

### J40 Ausnahmen

Es kann Situationen geben, in denen die Verwendung von `com.machinezoo.noexception` nicht angemessen ist, z. B. wenn das Projekt bereits eine andere Lösung für die Behandlung von Ausnahmen verwendet oder wenn die Einführung einer zusätzlichen Abhängigkeit vermieden werden soll.

### J40 Weiterführende Literatur/Links

- [com.machinezoo.noexception - GitHub](https://github.com/robertvazan/com.machinezoo.noexception)
- [Avoiding Exceptions in Callbacks](https://dzone.com/articles/avoiding-exceptions-in-callbacks)

## J41 Kapselung von API-Methoden zur Vereinfachung und besseren Testbarkeit {#kapselung-von-api-methoden-zur-vereinfachung-und-besseren-testbarkeit}

### J41 Problem

API-Methoden können oft komplexe Logik benötigen, um beispielsweise Datenumwandlungen oder Filterungen für die Eingabeparameter und Resultate durchzuführen. Wenn diese Komplexität für die API-Methode notwendig ist und direkt in der eigenen Methode angwendet wird, kann dies zu unübersichtlichem Code und Schwierigkeiten bei der Testbarkeit führen. Darüber hinaus kann es erforderlich sein, die API-Methode in Tests zu mocken, was zu erhöhtem Aufwand führt.

```java
// Beispiel-API-Methode
public String[] getActiveUsers(int[] userIds) {
   // Komplexe Logik zur Umwandlung und Filterung
   // ...
   
   // Rückgabe der Benutzernamen
   return usernames;
}
```

### J41 Lösung

Um die Komplexität der API-Methode zu reduzieren und die Testbarkeit zu verbessern, sollte die Logik in eine eigene Methode ausgelagert werden, die die API-Methode aufruft und dabei die erforderlichen Umwandlungen und Filterungen durchführt.

```java

// Eigentliche Arbeitsmethode
private void foo() {
  List<String> = getActiveUsers(userIds);
  // ...   
}

// Kapselungsmethode für die Komplexität der API
public List<String> getActiveUsers(List<Integer> userIds) {
  List<User> activeUsernames = api.getUsers(userIds.toArray(new String[0])));
  
  // Rückgabe der Benutzernamen als Array
  return activeUsernames.stream()
  .filter(User::isActive)
  .collect(Collectors.toList());
}
```

### J41 Vorteile

- Bessere Lesbarkeit und Wartbarkeit des Codes durch Auslagerung der Komplexität des API-Aufrufs in eine eigene Methode.
- Verbesserte Testbarkeit, da die kapselnde Methode leichter zu testen ist und die API-Methode nur über die kapselnde Methode getestet werden muss.
- Erhöhte Flexibilität, da die kapselnde Methode bei Bedarf weitere Anpassungen oder Erweiterungen der Funktionalität ermöglicht, ohne die API-Methode direkt zu verändern.

### J41 Ausnahmen

In bestimmten Fällen kann es aus Performance-Gründen oder aufgrund von spezifischen Anforderungen notwendig sein, die Komplexität direkt in der API-Methode zu belassen. 
In solchen Fällen sollte jedoch sorgfältig abgewogen werden, ob die Vorteile der Kapselung überwiegen.

### J41 Weiterführende Literatur/Links

- [Clean Code: A Handbook of Agile Software Craftsmanship by Robert C. Martin](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)

## J42 String-Formatierung in Java {#string-formatierung-in-java}

Beim Logging mit SLF4J ist es wichtig, die Platzhalter-Zeichen korrekt zu verwenden und nicht mit den Platzhaltern von String.Format zu verwechseln.
Leider ist in Java ein Verwechseln von Platzhaltern möglich, wenn man nicht aufpasst.

### J42 Problem

SLF4J bietet Platzhalter für das Einfügen von Werten in Log-Nachrichten.
Die Platzhalter werden jedoch manchmal mit den Platzhaltern von String.Format verwechselt, was zu unerwartetem Verhalten oder sogar Fehlern führen kann.

::: details  SLF4J vs. String.format vs. MessageFormat

- SLF4J: verwendet geschweifte Klammern `{}` als Platzhalter und erwartet die Variablen in der Reihenfolge der Platzhalter.
- String.format: verwendet Prozentzeichen `%` als Platzhalter und erwartet die Variablen in der Reihenfolge der Platzhalter und mit dem entsprechenden Typ (`%s` für String, `%d` für Integer, etc.).
- MessageFormat: verwendet geschweifte Klammern `{}` als Platzhalter und erwartet die Variablen mit dem entsprechenden Index (`{0}` für die erste Variable, `{1}` für die zweite Variable, etc.).

:::

```java
String name = "John";
int age = 30;
// falsch
log.info("Name: %s, Age: %d", name, age);
String.format("Name: {}, Age: {}", name, age);
MessageFormat.format("Name: %s, Age: %d", name, age)
```

### J42 Refactoring

Platzhalter für das Logging mit SLF4J werden mit geschweiften Klammern verwendet.
Platzhalter für String.format werden mit Prozentzeichen verwendet.
Zu beachten ist, dass Platzhalter die geschweiften Klammer sind und die Reihenfolge der Platzhalter mit der Reihenfolge der Variablen übereinstimmt.
Das Logging für Exceptions erfordert keinen Platzhalter, wenn das Objekt der Exception als letzter Parameter für das Logging übergeben wird.

```java
String name = "John";
int age = 30;
log.info("Name: {}, Age: {}", name, age);
String.format("Name: %s, Age: %d", name, age);
MessageFormat.format("Name: {0}, Age: {1}", name, age)
```

### J42 Weiterführende Literatur/Links

- [SLF4J Documentation](http://www.slf4j.org/manual.html)
- [Best Practices for Logging in Java](https://stackify.com/best-practices-logging-java/)

## J43 Rückgabe von Collections sollen immer unveränderlich sein {#rueckgabe-von-collections-sollen-immer-unveraenderlich-sein}

Wenn interne Datenstrukturen wie Collections (List, Set, Map) zurückgegeben werden müssen, sollen diese immer immutable sein, d.h. unveränderlich, sein, damit die internen Datenstrukturen nicht von außen verändert werden können.

### J43 Problem

Wenn interne Datenstrukturen wie Collections (List, Set, Map) zurückgegeben werden, können diese von außen verändert werden, was dazu führen kann, dass die interne Datenstruktur inkonsistent wird oder unerwartete Ergebnisse auftreten.

```java
public List<String> getNames() {
  return names;
}

List<String> names = getNames();
names.add("Alice");
```

### J43 Lösung

Um zu verhindern, dass interne Datenstrukturen von außen verändert werden, sollten immer Kopien der internen Datenstrukturen zurückgegeben werden, die unveränderlich sind.

Für einfache Listen wie Strings oder primitive Datentypen können `List.copyOf()` oder `Collections.unmodifiableList()` verwendet werden, um unveränderliche Listen zu erstellen.

```java
public List<String> getNames() {
  return List.copyOf(names);
}
// oder
public List<String> getNames() {
  return Collections.unmodifiableList(names);
}
```

::: warning Tiefe Kopie vs. Flache Kopie

`List.copyOf()` und `Collections.unmodifiableList()` erstellen nur eine flache Kopie der Liste, d.h. die Elemente der Liste sind nicht kopiert, sondern nur die Referenzen zu den Elementen.

Wenn die Elemente der Liste ebenfalls verändert werden können, sollten tiefe Kopien der Elemente erstellt werden, um sicherzustellen, dass die Element nicht verändert werden können.

Statt tiefe Kopien zu erstellen soll das Prinzip [Tell, Don't Ask](../../2.principles/principles#tda-ie) angewendet werden, um die Verantwortung für die Veränderung der Elemente an die Klasse zu übergeben, die die Elemente besitzt.

:::

::: details Mutable vs. Immutable vs. Unmodifiable

- Mutable: Ein Objekt oder Datenstruktur kann verändert werden, d.h. es Werte veränder oder Elemente hinzugefügt, entfernt oder geändert werden.
- Immutable: Ein Objekt oder Datenstruktur kann nicht verändert werden, d.h. seine internen Felder ist konstanz oder für eine Menge können keine Elemente hinzugefügt, entfernt oder geändert werden.
Beispiele für unveränderliche Objekte sind `String`, `Integer`, `LocalDate`, etc.
Methoden wie `Map.of()`, `List.of()`, `Set.of()`, `Map.copyOf()`, `List.copyOf()`, `Set.copyOf()` erstellen unveränderliche Mengen, Listen und Maps, d.h. die Datenstruktur können weder verändert noch erweitert werden.
Nur eine Kopie der immutablen Datenstruktur kann verändert werden.
- Unmodifiable: Eine nicht-modifizierbare Datenstruktur, die eine Ansicht auf eine veränderliche Datenstruktur darstellt, d.h. alle Änderungen an der unveränderlichen Datenstruktur werden blockiert, aber die ursprüngliche Datenstruktur kann verändert werden.
Beispiele für Methoden, die unveränderliche Datenstrukturen `Collections.unmodifiableList()`, `Collections.unmodifiableSet()`, `Collections.unmodifiableMap()` erzeugen.
Dies wird durch eine Wrapper-Klasse erreicht, die die Methoden zum Hinzufügen und Entfernen von Elementen blockiert, bzw. eine Ausnahame `UnsupportedOperationException` wirft.
Der Vorteil besteht darin, dass die ursprüngliche Datenstruktur nicht kopiert werden muss, sondern nur eine Ansicht auf die Datenstruktur erstellt wird.
Wenn komplexe Objekte in einer unveränderlichen Datenstruktur gespeichert werden, können die Objekte jedoch selbst verändert werden.
:::

## J44 Statische Initialisierer vermeiden {#statische-initialisierer-vermeiden}

Statische Initialisierungen in Java sind eine Möglichkeit, in Klassen statische Felder direkt beim Start der Anwendung zu initialisieren.
Statische Initialisierungen sind jedoch, wie der Name schon sagt, statisch und können nicht verändert werden, was zu Problemen bei der Testbarkeit und Wartbarkeit führen kann, wenn diese Werte doch verändert werden müssen.

### J44 Problem

Statische Felder, die direkt mit einem Wert initialisiert werden, können zur Lauzeit nicht verändert werden.
In Tests kann es notwendig sein, diese Werte zu verändern, um bestimmte Szenarien zu testen und Mocks zu verwenden.
Im ersten Beispiel wird ein statisches Feld mit einer Umgebungsvariable initialisiert, die auf dem Produktivsystem gesetzt wird, jedoch in einer Testumgebung überschrieben werden muss.

```java
public class Config {
  public static final String ENVIRONMENT = System.getProperty("environment", "dev");
}
```

Auch Logging mit dem SLF4J-Framework kann in Tests nicht getestet werden, wenn der Logger statisch initialisiert wird.

```java [Logger]
public class MyClass {
  private static final Logger log = LoggerFactory.getLogger(MyClass.class);
}
```

::: info Warum Logging getestet werden sollte

Logging sollte in Tests getestet werden, um sicherzustellen, dass die richtigen Log-Nachrichten mit den richtigen Parametern und Werten protokolliert werden.
Werte, die über Platzhalter (`{}`, `%s%d`, `{0}{1}`) in Log-Nachrichten eingefügt werden, sollten überprüft werden, um sicherzustellen, dass die richtigen Werte und im richtigen Format protokolliert werden.
Logging in Fehlerfällen sollte ebenfalls getestet werden, um sicherzustellen, dass die richtigen Fehlermeldungen protokolliert werden.
Sollte ein Logging im Fehlerfall selbst eine Exception werfen, wird die ursprüngliche Exception verschluckt und kann nicht erkannt werden.

:::

### J44 Lösung

Statt statische Initialisierungen zu verwenden, kann [Dependency Injection](../../2.principles/principles#dependency-injection) verwendet werden, um die Werte zur Laufzeit zu setzen.

Die Klasse sollte sich nicht darum kümmern müssen, woher die Umgebungsvariable kommt, sondern nur, dass sie gesetzt ist.
Es ist die Aufgabe des Aufrufers, die Umgebungsvariable zu setzen.
So kann der Wert auch aus einer Datei, einer Datenbank oder als CLI-Argument kommen.

```java
public class Config {
  private String environment;

  public Config(String environment) {
    this.environment = environment;
  }

  public String getEnvironment() {
    return environment;
  }
}
```

Es gibt viele Lösungen für den Einsatz von Dependency Injection mit SL4J.

- Logger als Parameter übergeben
- Logger über Factory-Methode erstellen
- Einen Log-Adapter verwenden, um die Log-Implementierung zu wrappen

::: code-group

```java [org.slf4j.Logger]

public class MyClass {
  private final Logger log;

  public MyClass(Logger log) {
    this.log = log;
  }

```

```java [org.slf4j.ILoggerFactory]

public class MyClass {
   private static final Logger;

  public MyClass(ILoggFactory loggerFactory) {
    this.Logger = loggerFactory.getLogger(MyClass.class);
  }
}

```

```java [Log-Adapter]

public interface CustomLoggerInterface {
  void info(String message);
  void error(String message);
}

public class LogAdapter implements CustomLoggerInterface {
  private final org.slf4j.Logger logger;

  public LogAdapter(org.slf4j.Logger logger) {
    this.logger = logger;
  }

  public void info(String message) {
    logger.info(message);
  }

  public void error(String message) {
    logger.error(message);
  }
}

public class MyClassToLog {
  private final Logger log;

  public MyClassToLog(Logger log) {
    this.log = log;
  }
}

void Main() {
  org.slf4j.Logger logger = LoggerFactory.getLogger(MyClassToLog.class);
  LogAdapter logAdapter = new LogAdapter(logger);
  MyClassToLog myClassToLog = new MyClassToLog(logAdapter);
}

```

Ein Adapter kann auch verwendet werden, um die Log-Implementierung zu wrappen und so die Log-Implementierung zu entkoppeln.
Damit ist die Klasse nicht mehr von einer spezifischen Log-Implementierung abhängig (hier das Logger-Interface), sondern nur noch von einer generischen Log-Implementierung, die im Projekt definiert ist.

::: warning Spezieller Code für Tests

Bei diesem Code handelt es sich nicht um speziellen Code für Tests, sondern um eine allgemeine Verbesserung der Codequalität.
Die Klasse wir dadurch vom konkreten Logger entkoppelt und kann leichter getestet werden.

:::

## J45 Verwenden von Schnittstellen {#verwenden-von-schnittstellen}

Verwende Schnittstellen (Interfaces) anstelle von konkreten Klassen, um die Flexibilität und Testbarkeit des Codes zu erhöhen.

### J45 Problem

Wenn Klassen von konkreten Klassen abhängig sind, sind sie an die konkrete Implementierung gebunden und können nicht einfach durch eine andere Implementierung ersetzt werden.

```java
public class MyClass {
  private final MySpecialService myService = new MySpecialService();
}
```

### J45 Lösung

Klassen sollten so wenig wie möglich von konkreten Implementierungen abhängig sein, um die Flexibilität und Testbarkeit des Codes zu erhöhen.
Dafür sollten Schnittstellen (Interfaces) verwendet werden, um die Abhängigkeit von konkreten Implementierungen zu reduzieren.

```java
public interface MyService {
  void doSomething();
}

public class MySpecialService implements MyService {
  public void doSomething() {
    // ...
  }
}

public class MySpecialService2 implements MyService {
  public void doSomething() {
    // ...
  }
}

public class MyClass {
  private final MyService myService;

  public MyClass(MyService myService) {
    this.myService = myService;
  }
}
```

Der Klasse `MyClass` ist es nun egal, welche konkrete Implementierung von `MyService` verwendet wird.

::: danger Aufwand

Das Schreiben von Schnittstellen erhöht nur scheinbar den Aufwand, denn durch die dadurch entstene Flexibilität und Testbarkeit wird der (viel größere) Aufwand für Tests und spätere Erweiterungen reduziert.
Zusätzlich ermöglicht das Nachdenken über die richtige Schnittstelle eine bessere Strukturierung des Codes und eine bessere Trennung von Verantwortlichkeiten.

Es führ nichts an Schnittstellen vorbei.

:::

### J45 Siehe auch

- [Kopplung und Kohäsion](../../2.principles/principles#lc).
- [Interface Segregation Principle](../../2.principles/principles#interface-segregation-principle).

## J46 Verwenden von `record`s statt Klassen {#verwende-record-s-statt-klassen}

Verwende für Datenobjekte, die sonst aus einer Klasse mit gettern und settern bestehen, `record`s, um komplexe Datentypen konsistent zu halten und einfach zu erstellen.

### J46 Problem

Klassen enthalten oftmals eine Menge Daten, die sie manipulieren müssen.
Diese Daten werden aber auch oft als Get- und Set-Methoden angeboten, um die Daten zu manipulieren.
Dies wiederspricht jedoch dem Prinzip der [Tell, Don't Ask](../../2.principles/principles#tell-dont-ask), da die Klasse die Daten manipulieren sollte und nicht der Aufrufer.

Zusätzlich gibt es eine Menge von Klassen, die nur Daten speichern und keine Logik enthalten.

Wenn die Daten von einem externen Objekt manipuliert werden, ist es nie sichergestellt, dass die Daten noch korrekt und konsistent sind.
Ungültige Werte führen dann zu unerwarteten Ergebnissen und Fehlern, die schwer zu finden und noch schwerer zu refaktorisieren sind.

```java
public class ManyAttributes {
  private String attribute1;
  private int attribute2;
  private boolean attribute3;
  private double attribute4;

  public String getAttribute1() {
    return attribute1;
  }
  public void setAttribute1(String attribute1) {
    this.attribute1 = attribute1;
  }
  // etc.
}

```

### J46 Lösung

Klassen sollten Daten nur über ihre Methoden manipulieren und nicht über Get- und Set-Methoden.
Wenn Klassen jedoch komplexe Datenstrukturen als Eingabe benötigen oder als Ausgabe produzieren, sollten `record`s verwendet werden.

Records sind unveränderliche Datenstrukturen, die nur über ihren Konstruktor initialisiert werden können.
Konstruktoren von Records können Prüfungen auf die Eingabedaten durchführen und sicherstellen, dass die Daten konsistent sind, bevor der Record erstellt wird.

```java
public record ManyAttributes(String attribute1, int attribute2, boolean attribute3, double attribute4) {
  public ManyAttributes {
    if (attribute1 == null || attribute1.isEmpty()) {
      throw new IllegalArgumentException("attribute1 must not be null or empty");
    }
    if (attribute2 < 0) {
      throw new IllegalArgumentException("attribute2 must be greater than 0");
    }
    if (attribute4 < 0.0) {
      throw new IllegalArgumentException("attribute4 must be greater than 0.0");
    }
  }
}

public class MyClass {
  public void doSomething(ManyAttributes manyAttributes) {
    // ...
  }
}
```

::: warning Kohäsion

Records sollten für Daten eingesetzt, die zusammengehören und eine hohe Kohäsion haben, weil sie sich beispielweise auf ein gemeinsames Konzept beziehen und sich gemeinsam verändern.
:::

### J46 Vorteile

- Records sind unveränderlich und können nur über ihren Konstruktor initialisiert werden.
- Records können Prüfungen auf ihre Eingabedaten durchführen und sicherstellen, dass die Daten konsistent sind.
- Records sind einfach zu erstellen und zu verwenden und erhöhen die Lesbarkeit und Wartbarkeit des Codes.
- Der Zugriff auf Records in Multi-Thread-Umgebungen ist sicher, da Records unveränderlich sind.

### J46 Nachteile

- Records können nicht verändert werden, was in einigen Fällen dazu führt, dass eine Kopie des Records erstellt werden muss, um die Daten zu verändern.
- Records können nicht von anderen Klassen erben.
- Nachträgliche Änderungen an der Struktur sind aufwändig (nicht jedoch das Hinzufüren von neuen Feldern).
