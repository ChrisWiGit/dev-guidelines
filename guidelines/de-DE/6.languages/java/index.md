---
# https://vitepress.dev/reference/default-theme-home-page
layout: doc
outline: [2, 2]
customRulePrefix: J
customIgnoreTitlesForRules: [Einleitung]
---

# Richtlinien für JavaScript und TypeScript

## Einleitung {#einleitung}

Allen Kapiteln wurde eine eindeutige Nummerierung, der Richtliniennummer, hinzugefügt, um eine eindeutige Identifikation zu ermöglichen.
Jede Richtliniennummer besteht aus dem Buchstaben **JS**(JavaScript oder Typescript) gefolgt von einer Nummer, die den Abschnitt identifiziert. Damit kann eine Regel eindeutig identifiziert werden, z.B. für ein Code-Review.

::: info
Wo notwendig, wird auf die Unterschiede zwischen JavaScript und TypeScript hingewiesen.

Alle Beispiele sind mit 2 Leerzeichen eingerückt, da dies in Markdown die beste Darstellung bietet.
:::

## J1 Allgemeine Regeln {#allgemeine-regeln}

Es gelten die [Allgemeinen Regeln für Sprachen](../general).

## J2 Abstraktionsschichten {#abstraktionsschichten}

Zugriffe auf unterliegende Schichten (Vergleich mit [GL3 Abstraktionsschichten](../general#abstraktionsschichten)) sollen in JavaScript vermieden werden.

### J2 Problem

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

### J2 Lösung

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

### J2 Vorteile

- Simple und klare Struktur in den Methoden/Funktionen
- Reduzierung der Abhängigkeiten zwischen den Schichten
- Klare Trennung der Verantwortlichkeiten
- Verbesserte Wartbarkeit und Erweiterbarkeit des Codes
- Verbesserte Testbarkeit durch die Möglichkeit, die unterliegenden Schichten zu mocken

### J2 Nachteile

- Erhöhter Aufwand durch die Notwendigkeit, zusätzliche Klassen oder Module zu erstellen
- Erhöhter Aufwand durch die Notwendigkeit, Dependency Injection zu verwenden
- Überblick über die Abhängigkeiten und Struktur des Codes kann schwieriger sein
- Verhalten zur Laufzeit ist nicht direkt aus dem Code ersichtlich

### J2 Ausnahmen

- In *Prototypen* kann der direkte Zugriff auf unterliegende Schichten akzeptabel sein.
Der Prototyp muss jedoch nachträglich dahingehend refaktorisiert werden, dass die Zugriffe auf unterliegende Schichten in separate Klassen oder Module ausgelagert werden.
- In *kleinen Anwendungen* oder Tools kann der direkte Zugriff auf unterliegende Schichten akzeptabel sein.

## J3 Trennung von operationalem und integrativem Code {#trennung-von-operationalem-und-integrativem-code}

Nach dem **Integration Operation Segregation Principle** soll Code entweder Operations-Logik oder Integration-Logik enthalten, aber nicht beides.

:::info Operation vs. Integration

Eine **Operations-Logik** enthält Bedingungen, Schleifen, etc., die die Geschäftsregeln implementieren.
Auch API-Aufrufe oder andere I/O-Operationen gehören zur Operations-Logik.

Eine **Integration-Logik** enthält Code, der andere Code verwendet, um die Operations-Logik zu implementieren.

Eine **Hybrid-Logik** enthält sowohl Operations- als auch Integrationslogik.

:::

### J3 Problem

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

### J3 Lösung

Die Trennung kann durch die Verwendung von mehreren Zwischenmethoden erreicht werden, die die Operations- und Integrationslogik trennen.

:::info Guard Clause

Strenggenommen ist die Guard Clause eine Operations-Logik, welche die Methode nach IOSP auch zu einer Operations-Logik, statt einer Integration-Logik macht.

:::

:::warning Folge dem Prinzip nicht blind

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

:::warning Code-Größe

Im Allgemeinen führt IOSP zu kürzeren Methoden, da die Operations- und Integrationslogik getrennt sind.
Jedoch wird insgesamt mehr Code geschrieben, da die Trennung zu mehr Methoden führt, welche neue Zeilen hinzufügen.

:::

### J3 Vorteile

- Durch die strikte Trennung von Operations- und Integration-Logik wird der Code übersichtlicher und leichter verständlich.
- Methoden/Funktionen sind einzeln einfacher zu lesen, da sie kurz sind.
- Methoden/Funktionen sind einzeln einfacher zu testen.
- Korrektheit von Integrationen lässt sich leicht durch Augenscheinnahme prüfen.
- Es gibt oftmals eine **Haupteinstiegs**-Methode, die die Integration-Logik koordiniert und die Operations-Logik in separaten Methoden aufruft.
- Integrations-Methoden/Funktionen lassen sich leicht erweitern, indem neue Methoden hinzugefügt werden, um neue Anforderungen zu erfüllen.

### J3 Nachteile

- Die Trennung von Operations- und Integration-Logik kann zu mehr Code führen, da mehr Methoden/Funktionen erstellt werden müssen.

### J3 Ausnahmen

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

## J4 Anwendung von neuen Java-Sprachfeatures {#anwendung-von-neuen-java-sprachfeatures}

- Der Einsatz von neuen Java-Sprachfeatures gegenüber alten Sprachfeatures soll bevorzugt werden.
- Alte Sprachfeatures, insbesondere die als veraltet markierten, sollen vermieden und im Zuge von Refaktorisierungen durch neue Sprachfeatures ersetzt werden.

### J4 Problem {#problem}

Java wird ständig weiterentwickelt und neue Sprachfeatures werden eingeführt, um die Sprache zu verbessern und die Entwicklung zu erleichtern.
Der Einsatz von veralteten Sprachfeatures kann zu schlechterer Lesbarkeit, Wartbarkeit und Performance führen.
Letztendlich kann der Code nicht mehr mit neuen Compiler-Versionen kompiliert werden, wenn veraltete Sprachfeatures entfernt werden.

### J4 Lösung {#loesung}

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

## J5 Benennung von Variablen, Funktionen, Klassen und mehr {#benennung-von-variablen-funktionen-klassen-und-mehr}

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

::: details Schein-Konstanten

Objekte oder Array-Inhalte sind immer veränderbar, auch wenn sie mit `final` deklariert werden.
Nur die Zuweisung der Variable ist konstant, nicht der Wert.

In Java gibt es keine Möglichkeit, den Inhalt eines Objekts oder Arrays zu sperren.
Alternativen sind die Software Prinzipien [Tell, don't ask](../../2.principles/principles#tda-ie) und [Informatin Hiding](../../2.principles/principles#ih-e).
:::

## J6 Reihenfolge der Deklarationen {#reihenfolge-der-deklarationen}

Die Reihenfolge der Deklarationen soll konsistent sein und die Lesbarkeit des Codes verbessern.

### J6 Reihenfolge in Funktionen und Methoden

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

### J6 Reihenfolge in Klassen

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

### J6 Ausnahmen

- Zwischenberechnungen für Konstanten oder Variablen können vor der Verwendung deklariert werden, wenn es nicht anders geht.
- In Fällen, in der eine besser Verständlichkeit des Codes durch eine andere Reihenfolge erreicht wird, kann von der oben genannten Reihenfolge abgewichen werden.

## J7 Verwendung von `final` für alle Variablen und Methoden/Funktions-Parameter Kennzeichnung von Nicht-Konstanten {#verwendung-von-final-fuer-alle-variablen-und-methoden-funktions-parameter-kennzeichnung-von-nicht-konstanten}

Variablen enthalten für gewöhnlich Werte, die sich während der Laufzeit des Programms nicht ändern.
Eine erneute Zuweisung von Werten zu Variablen kann zu unerwartetem Verhalten führen, weil sich der Wert plötzlich ändert oder versehentlich undefiniert wird.

- Variablen und Parameter sollen daher mit `final` deklariert werden, um sicherzustellen, dass sie nicht versehentlich geändert werden.
- Eine erneute Zuweisung von Werten zu Variablen soll vermieden werden, um unerwartetes Verhalten zu vermeiden.
Stattdessen sollen neue Variablen deklariert werden, wenn ein neuer Wert benötigt wird.
- Ist eine erneute Zuweisung von Werten notwendig, soll ein Kommentar mit dem Inhalt `/*nonfinal*/` hinzugefügt werden, um darauf hinzuweisen und dies auch einem Code-Review zu signalisieren, dass der Entwickler sich der Änderung bewusst ist.

### J7 Problem

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

### J7 Lösung

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

### J7 Vorteile

- Vermeidung unbeabsichtigter Änderungen von Variablen
- Klarheit in Bezug auf die Veränderlichkeit von Variablen
- Verbesserte Code-Qualität und Verständlichkeit
- Entspricht dem Prinzip Least Astonishment

### J7 Nachteile

Es gibt Situationen, in denen die Verwendung von `final` nicht möglich oder sinnvoll ist, z. B. bei Variablen, die sich ändern müssen oder in komplexen Legacy-Code.
In solchen Fällen kann die Kennzeichnung mit einem Kommentar `/nonconst*/` helfen, auf die Ausnahme hinzuweisen.

## J8 Einsatz von Linter und Formatter {#einsatz-von-linter-und-formatter}

Tools wie [Checkstyle](https://checkstyle.sourceforge.io/), [PMD](https://pmd.github.io/), [SpotBugs](https://spotbugs.github.io/) und [SonarLint oder SonarQube](https://www.sonarqube.org/) sollen verwendet werden, um sicherzustellen, dass der Code den definierten Richtlinien entspricht und potenzielle Fehler und Probleme im Code identifiziert werden.

Formatierungs-Tools wie Eclipse, IntelliJ IDEA, VS Code oder Eclipse sollen verwendet werden, um den Code automatisch zu formatieren und die Einhaltung der Formatierungsrichtlinien zu gewährleisten.

::: warning Formatierer-Konfiguration

Formatierer müssen so konfiguriert werden, dass sie für alle Entwickler im Team die gleichen Einstellungen verwenden.
Andernfalls kann es zu Konflikten bei der Versionierung des Codes kommen.

:::

## J9 Auf null prüfen {#auf-null-pruefen}

Objekt-Variablen, die `null` sein können, sollen auf `null` geprüft werden, um keine Nullpointer-Exceptions zu verursachen.

::: danger TODO

Prüfe die Links und die Verweise auf die Regeln.

:::

::: warning Anwendungseinsatz und Alternativen

Diese Regel gilt nur für bereits bestehenden Methoden und Funktionen, die `null` zurückgeben können.

[Optional](.#verwendung-von-optional-in-funktionen) soll für neue Methoden/Funktionen verwendet werden, um diese spezielle Fälle (`null` etc.) zu repräsentieren.

Soll ein neues Klassen- oder Objektmodell erstellt werden, sollen direkt [spezielle Objekte](.#verwende-spezielle-objekte-statt-spezielle-werte) verwendet werden.

:::

### J9 Problem

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

### J9 Lösung

Um sicherzustellen, dass keine Nullpointer-Exceptions auftreten, soll auf `null` geprüft werden, bevor auf die Methode zugegriffen wird.

```java
public void myFunction() {
  final String name = data.name();
   
  if (name != null && name.equals("John")) {
    // Code
  }
}
```

### J9 Vorteile

- Vermeidung von Nullpointer-Exceptions
- Vermeidung von unerwarteten Fehlern durch falsche Erkennung von falsy-Werten

### J9 Nachteile

- Werte wie NaN werden nicht erkannt
- ESLint muss entsprechend konfiguriert werden, um die Verwendung von `==` bei null Vergleich zu erlauben. Dies ist möglich, indem die Regel `eqeqeq` auf [smart](https://eslint.org/docs/latest/rules/eqeqeq#smart) umgestellt wird.

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

<!-- 
TODO
 -->

## J12 Methoden/Funktionen, die Mengen zurückgeben sollen niemals null zurückgeben 

::: danger TODO

TODO: nach java umschreiben

:::

Methoden oder Funktionen, die Mengen wie Arrays zurückgeben, sollen nie `null` zurückgeben, sondern leere Mengen oder Objekte.

### J12 Problem

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

### J12 Lösung

Um Zugriffsfehler und unerwartetes Verhalten zu vermeiden, sollen Methoden/Funktionen stattdessen ein leeres Objekt oder Array zurückgeben.

```java
public ArrayList<String> getNames() {
  if (condition) {
    return new ArrayList<>(); 
  }
  // ...
}
```

### J12 Vorteile

- Vermeidung von Zugriffsfehlern und unerwartetem Verhalten
- Einfachere Handhabung und weniger Überprüfungen auf null im Aufrufercode
- Verbesserte Robustheit und Stabilität des Codes

### J12 Ausnahmen

Es kann Situationen geben, in denen die Rückgabe von null sinnvoll ist, z. B. wenn null einen speziellen Zustand oder eine Bedeutung hat.
In solchen Fällen ist es wichtig, die Dokumentation klar zu kommunizieren und sicherzustellen, dass der Aufrufercode angemessen darauf reagiert.

### J12 Weiterführende Literatur/Links

- [Effective Java: Item 54 - Return Empty Arrays or Collections, Not Nulls](https://www.amazon.com/dp/0321356683)
- [Null or Empty Collection in Java](https://www.baeldung.com/java-null-empty-collection) (für Java)

## J13 Verwendung von `Optional` in bei Rückgabewerte in Funktionen 

Eine Funktion oder Methode, die dennoch `null`, `undefined` oder `NaN` zurückgeben muss, soll stattdessen die `Optional`-Klasse verwenden, um den Status des Ergebnisses zu kennzeichnen.

::: danger TODO

TODO: Siehe auch umschreiben

:::
:::info Siehe auch
[Methoden/Funktionen sollen niemals null oder undefined zurückgeben](.#js20-methodenfunktionen-sollen-niemals-null-oder-undefined-zuruckgeben)
:::

::: warning Anwendungseinsatz und Alternativen

Diese Regel gilt nur für bereits bestehenden Klassenstrukturen, die nicht veränderbar oder erweiterbar sind.

Soll ein neues Klassen- oder Objektmodell erstellt werden, sollen direkt [spezielle Objekte](.#verwende-spezielle-objekte-statt-spezielle-werte) verwendet werden.

:::

### J13 Problem

Das Zurückgeben von `null` aus einer Funktion kann zu Fehlern führen, insbesondere wenn nicht überprüft wird, ob das Ergebnis vorhanden ist oder nicht.

```java
public Integer divide() {
  if (b != 0) {
    return a / b;
  }
  return null;
}
```

### J13 Lösung

Die Verwendung des `Optional`-Objekts ermöglicht es, den Status des Ergebnisses klar zu kennzeichnen, anstatt `null` zurückzugeben.

```java
public Optional<Integer> divide() {
  if (b != 0) {
    return Optional.of(a / b);
  }
  return Optional.empty();
}
```

### J13 Vorteile

- Klarere Kennzeichnung des Zustands des Ergebnisses durch Verwendung von `Optional`
- Bessere Fehlervermeidung durch explizite Behandlung von leeren Ergebnissen
- Verbesserte Lesbarkeit des Codes durch den Verzicht auf `null`

### J13 Nachteile

- Zusätzlicher Overhead durch die Verwendung von `Optional`
- Potenziell erhöhter Komplexitätsgrad in der Verwendung des `Optional`-Objekts
- Abhängigkeit von der Implementierung der `Optional`-Klasse

## J14 If-Bedingungen ohne Else und mit Return {#if-bedingungen-ohne-else-und-mit-return}

If-Bedingungen, die ein Return enthalten, sollen kein `else` enthalten, um die Lesbarkeit des Codes zu verbessern und die Verschachtelung von Bedingungen zu reduzieren.

Im Folgenden sind sich widersprechende Regeln aufgeführt, die bei der Reihenfolge der Bedingungen in If-Statements zu beachten sind:

- Die Bedingung, welche am wenigsten Code enthält, sollte zuerst geprüft werden.
- Die Bedingung, welche die Funktion/Methode am schnellsten verlässt, sollte zuerst geprüft werden.
- Die Bedingung, welche eine Exception wirft, sollte zuerst geprüft werden.
- Die Bedingung, welche eine positive Bedingung prüft, sollte zuerst geprüft werden.
- Die Bedingung, welche am häufigsten zutrifft, sollte zuerst geprüft werden.

### J14 Problem

If-Bedingungen mit einem Return und einem dazugehörigen else-Block können die Lesbarkeit des Codes beeinträchtigen und zu unnötiger Verschachtelung führen.

::: danger TODO

TODO: nach java umschreiben

:::

```javascript
function calculate(x) {
    if (x > 0) {
        return x * 2;
    } else {
        return x;
    }
}
```

### J14 Lösung

Durch Entfernen des else-Blocks und direktes Rückgabestatement wird der Code lesbarer und die Verschachtelung von Bedingungen reduziert.

```javascript
function calculate(x) {
    if (x > 0) {
        // Guard Clause
        return x * 2;
    }
    return x;
}
```

### J14 Vorteile

- Verbesserte Lesbarkeit und Klarheit des Codes
- Pfade durch die Funktion sind klarer und leichter nachvollziehbar
- Reduzierung der Verschachtelung von Bedingungen
- Vereinfachte Struktur und Fluss des Codes

### J14 Weiterführende Literatur/Links

- [Guard Pattern](.#js12-guard-pattern)
- [Clean Code: A Handbook of Agile Software Craftsmanship](https://www.amazon.com/dp/0132350882)
- [JavaScript: The Good Parts](https://www.amazon.com/dp/0596517742)

## J15 Guard Pattern {#guard-pattern}

Guard-Klauseln sollen verwendet werden, um unerwünschte Ausführungszweige frühzeitig zu beenden und die Lesbarkeit des Codes zu verbessern.

Im Folgenden sind sich widersprechende Regeln aufgeführt, die bei der Reihenfolge der Bedingungen in If-Statements zu beachten sind:

- Die Bedingung, welche am wenigsten Code enthält, sollte zuerst geprüft werden.
- Die Bedingung, welche die Funktion/Methode am schnellsten verlässt, sollte zuerst geprüft werden.
- Die Bedingung, welche eine Exception wirft, sollte zuerst geprüft werden.
- Die Bedingung, welche eine positive Bedingung prüft, sollte zuerst geprüft werden.
- Die Bedingung, welche am häufigsten zutrifft, sollte zuerst geprüft werden.

### J15 Problem

In JavaScript müssen oft komplexe Bedingungen geprüft werden, um unerwünschte Ausführungszweige zu verhindern oder ungültige Eingaben abzufangen. Dies kann zu verschachteltem Code führen, der schwer zu lesen und zu warten ist.

::: danger TODO

TODO: nach java umschreiben

:::

```javascript
function processInput(input) {
    if (input !== null && input !== undefined && input !== '') {
        // Code zur Verarbeitung des Eingabewerts
    }
}
```

### J15 Lösung

Das Guard Pattern ermöglicht es, Bedingungsprüfungen klarer und lesbarer zu gestalten, indem wir unerwünschte Fälle frühzeitig abfangen und beenden.

```javascript
function processInput(input) {
    if (input == null || input === '') {
        return;
    }

    // Code zur Verarbeitung des Eingabewerts
}
```

### J15 Vorteile

- Verbesserte Lesbarkeit des Codes durch eine klare und frühzeitige Abhandlung unerwünschter Fälle
- Reduzierung der Verschachtelung von Bedingungsprüfungen
- Einfache Erweiterbarkeit und Wartbarkeit des Codes

### J15 Weiterführende Literatur/Links

- [Guard Clause Pattern - Refactoring.Guru](https://refactoring.guru/smells/guard-clauses)

## J16 Positiv formulierte If-Bedingungen und Auslagerung komplexer Bedingungen {#positiv-formulierte-if-bedingungen-und-auslagerung-komplexer-bedingungen}

If-Bedingungen sollen positiv formuliert werden und komplexe Bedingungen sollen in temporäre Variablen ausgelagert werden, um die Lesbarkeit und Wartbarkeit des Codes zu verbessern.

::: info Beachte

Die Aufsplittung von If-Bedingungen ist sehr abhängig vom Verständnis des Entwicklers und soll mit Sinn und Verstand eingesetzt werden.

Generell ist die KISS-Regel (Keep It Simple, Stupid) zu beachten.

:::

### J16 Problem

Komplexe Bedingungen in If-Anweisungen können den Code schwer verständlich machen, insbesondere wenn sie negativ formuliert sind. Lange und verschachtelte Bedingungen erschweren die Lesbarkeit und können zu Fehlern führen.

```java
if (!(name.isEmpty() || age < 18 || !isAuthorized)) {
    // Code ausführen
}
```

### J16 Lösung

Durch die positive Formulierung der Bedingungen und die Auslagerung komplexer Ausdrücke in temporäre Variablen wird der Code lesbarer und verständlicher.

```java
boolean isNameEmpty = name.isEmpty();
boolean isUnderAge = age < 18;
boolean isNotAuthorized = !isAuthorized;

if (!isNameEmpty && !isUnderAge && isNotAuthorized) {
    // Code ausführen
}
```

### J16 Vorteile

- Verbesserte Lesbarkeit des Codes durch positiv formulierte Bedingungen
- Reduzierung der Verschachtelung und Komplexität von If-Anweisungen
- Bessere Wartbarkeit des Codes durch klare und beschreibende Variablen

### J16 Nachteile

- Alternativ kann ein Kommentar die If-Bedingung beschreiben, aber bei einer Änderung muss daran gedacht werden auch den Kommentar anzupassen.
- Das Auslagern von Bedingungen in temporäre Variablen kann zu einem erhöhten Speicherverbrauch führen, insbesondere bei komplexen Ausdrücken. Dies ist normalerweise vernachlässigbar, kann jedoch in speziellen Situationen berücksichtigt werden.

### J16 Ausnahmen

Es gibt Fälle, in denen das Auslagern von Bedingungen in temporäre Variablen nicht sinnvoll ist, z. B. wenn die Bedingung nur an einer Stelle verwendet wird und keine weitere Klarheit oder Wartbarkeit gewonnen wird.

### J16 Weiterführende Literatur/Links

- [The Art of Readable Code - Simple Conditionals](https://www.amazon.com/dp/0596802293)
- [Clean Code: A Handbook of Agile Software Craftsmanship](https://www.amazon.com/dp/0132350882)

## J17 Exceptions in JavaScript nicht einfach loggen und unverändert wieder werfen {#exceptions-in-javascript-nicht-einfach-loggen-und-unveraendert-wieder-werfen}

::: danger TODO

TODO: nach java umschreiben

:::

Exceptions sollen in JavaScript nicht einfach nur geloggt und unverändert wieder geworfen werden.

Stattdessen ist es wichtig, Exceptions sinnvoll zu behandeln und angemessene Maßnahmen zu ergreifen.

:::warning Wichtig
**Entweder** wird die Exception geloggt und behandelt **ODER** in eine andere Form umgewandelt und geworfen.

Aber nicht beides.
:::

### J17 Problem

Das einfache Loggen und unveränderte Werfen von Exceptions führt oft dazu, dass die eigentliche Ursache des Problems verschleiert wird.
Es erschwert auch die Fehlerbehandlung und das Debugging des Codes.

```javascript
try {
  // Code, der eine Exception auslöst
} catch (error) {
  console.log('Exception aufgetreten:', error);
  throw error;
}
```

### J17 Lösung

Es ist wichtig, die Ursache der Exception zu verstehen und entsprechend zu reagieren. Dies kann das Ergreifen von Fehlerbehandlungsmaßnahmen, das Aufzeigen von aussagekräftigen Fehlermeldungen oder das Umwandeln der Exception in eine andere Form sein.

```javascript
try {
  // Code, der eine Exception auslöst
} catch (error) {
  // Fehlerbehandlung und angemessene Maßnahmen ergreifen
  console.error('Ein Fehler ist aufgetreten:', error);
  // Weitere Maßnahmen wie Fehlermeldung anzeigen, alternative Verarbeitung, etc.
}
```

### J17 Vorteile

- Klare Behandlung und Reaktion auf Exceptions
- Verbesserte Fehlerbehandlung und Debugging-Möglichkeiten
- Besseres Verständnis der Ursachen von Fehlern

### J17 Ausnahmen

In einigen Fällen kann es sinnvoll sein, Exceptions zu loggen und unverändert wieder zu werfen. Dies ist jedoch eher die Ausnahme und soll gut begründet sein, z.B. wenn der Code in einem bestimmten Kontext läuft, der spezielle Anforderungen hat.

### J17 Weiterführende Literatur/Links

- [Exception Handling Best Practices in JavaScript](https://www.toptal.com/javascript/exception-handling-javascript-best-practices)
- [JavaScript Error Handling: Best Practices](https://blog.bitsrc.io/javascript-error-handling-best-practices-329c5f6e5d33)

## J18 Benennung von Methoden mit verschiedenen Präfixen für Synchronität und Ergebnisverhalten {#benennung-von-methoden-mit-verschiedenen-praefixen-fuer-synchronitaet-und-ergebnisverhalten}

Es ist eine bewährte Praxis bei der Benennung von Methoden in JavaScript und Java, unterschiedliche Präfixe zu verwenden, um die Synchronität und das Ergebnisverhalten der Methode zu kennzeichnen. Das Präfix "get" soll für synchronen Zugriff verwendet werden und immer einen Wert zurückgeben, während die Präfixe "fetch" oder "request" für asynchronen Zugriff stehen, der länger dauern und auch fehlschlagen kann.

::: info get-Präfix

Verwechsle das get-Präfix nicht mit dem get-Präfix in Java, das für Getter-Methoden verwendet wird.
`get-` in JavaScript soll für synchronen Zugriff für eine berechnete Eigenschaft oder ein Ergebnis stehen.

:::

### J18 Problem

Bei der Benennung von Methoden ist es wichtig, klare Hinweise auf die Synchronität und das Ergebnisverhalten der Methode zu geben.
Unklare oder inkonsistente Benennung kann zu Missverständnissen und unerwartetem Verhalten führen.

::: danger TODO

TODO: nach java umschreiben

:::

```javascript
// Unklare Benennung ohne klare Angabe zur Synchronität und zum Ergebnisverhalten
function getData() {
  // ...
}

// Unklare Benennung ohne klare Angabe zur Synchronität und zum Ergebnisverhalten
async function getAsyncData() {
  // ...
}
```

### J18 Lösung

Um die Synchronität und das Ergebnisverhalten einer Methode klarer zu kennzeichnen, sollen unterschiedliche Präfixe verwendet werden. Das Präfix "get" soll für synchronen Zugriff verwendet werden und immer einen Wert zurückgeben. Die Präfixe "fetch" oder "request" sollen für asynchronen Zugriff stehen, der länger dauern und auch fehlschlagen kann.

> get-Präfixe sollen nie async sein, dagegen sollen fetch- oder request- Präfixe immer async sein.

```javascript
// Synchroner Zugriff mit Wert-Rückgabe
function getValue() {
  // ...
}

// Asynchroner Zugriff mit Möglichkeit eines Fehlschlags
async function fetchResource() {
  // ...
}
```

### J18 Vorteile

- Klare und eindeutige Benennung, die die Synchronität und das Ergebnisverhalten einer Methode widerspiegelt
- Verbesserte Lesbarkeit und Verständlichkeit des Codes
- Einfachere Fehlersuche und Debugging-Möglichkeiten

### J18 Ausnahmen

Es kann Situationen geben, in denen die Verwendung von anderen Präfixen oder Benennungsmustern angemessen ist, abhängig von den spezifischen Anforderungen und Konventionen des Projekts.
Es ist wichtig, einheitliche Benennungsstandards innerhalb des Projekts festzulegen und zu dokumentieren.

### J18 Weiterführende Literatur/Links

- [Method Naming Conventions in Java](https://www.baeldung.com/java-method-naming-conventions)
- [JavaScript Naming Conventions](https://www.robinwieruch.de/javascript-naming-conventions)

## J19 JSDoc Kommentare für JavaScript-Methoden, Funktionen, Variablen, Objekte und Typen {#jsdoc-kommentare-fuer-javascript-methoden-funktionen-variablen-objekte-und-typen}

::: danger TODO

TODO: nach java umschreiben

:::

Methoden, Funktionen, Variablen, Objekte und Typen in JavaScript sollen mit JSDoc-Kommentaren annotiert werden, um eine klare Dokumentation und Typisierung der Parameter und des Rückgabewerts zu ermöglichen.

### J19 Problem

JavaScript ist eine dynamisch typisierte Sprache, was zu einer geringeren Typsicherheit und Dokumentation führen kann.
Parameter, Variablen und Rückgabewerte von Methoden und Funktionen sind nicht explizit typisiert und dokumentiert, was zu Verwirrung und Fehlern führen kann.

### J19 Lösung

Die Verwendung von JSDoc-Kommentaren ermöglicht es, Methoden, Funktionen, Variablen, Objekte und Typen in JavaScript klar zu dokumentieren und zu typisieren.
Auf diese Art können auch Objekte und jede andere Art von Datenstrukturen dokumentiert werden.

:::info
Moderne Entwicklungsumgebungen und Tools wie Visual Studio Code, WebStorm und ESLint unterstützen JSDoc-Kommentare und bieten Funktionen wie Autovervollständigung, Typüberprüfung und Dokumentation.
Diese Tools melden Probleme bei inkompatiblen Typen und fehlenden Parametern oder Rückgabewerten.
:::

### J19 Beispiele

#### J19 Methoden und Funktionen

:::warning Beachte!
JSDoc-Kommentare beginnen mit `/**` und enden mit `*/`.
Jede Zeile innerhalb des Kommentars beginnt mit `*`.
:::

```javascript
/**
 * Berechnet die Summe von zwei Zahlen.
 * @param {number} x - Die erste Zahl.
 * @param [number] y - Die zweite Zahl ist optional. //Alternative Google Closure Compiler Syntax: {number=}
 * @param [string|number] text - Ein Text als String oder Zahl.
 * @param {*} data - Ein beliebiger Typ.
 * @param {number} [offsetDefault=1] - Der Standardwert, falls der Parameter fehlt.
 * @returns {number} Die Summe der beiden Zahlen. 
 */
```

#### J19 Variablen

```javascript
/**
 * Die maximale Anzahl von Elementen.
 * @type {number}
 */
const MAX_ELEMENTS = 100;

/** @type {(symbol|boolean|{}|string|Array.<string>|number|null|NaN)} */
let myVariable;
myVariable = Symbol('mySymbol');
myVariable = true;
myVariable = {};
myVariable = 'Hello';
// oder, entspricht string[]
myVariable = ['Hello', 'World'];
myVariable = 42;
myVariable = null;
myVariable = NaN;


/** @type {?number} */
let nullableVar = null;

/** @type {!number} */
let NotNullVar = 0;
```

#### J19 Objekte deklarieren

Objekt-Variablen können direkt mit `@type` dokumentiert werden.

```javascript
 /**
 * Ein Benutzerobjekt.
 * @type {Object}
 * @property {string} name - Der Name des Benutzers.
 * @property {number} age - Das Alter des Benutzers.
 * @property {{street: string, city: string}} address - Die Adresse des Benutzers.
 * @property {string[]} roles - Die Rollen des Benutzers.
 */
let user = {
  name: 'Alice',
  age: 30,
  address: {
    street: '123 Main St',
    city: 'Anytown'
  },
  roles: ['admin', 'user']
};
```

## J20 Variable Parameter in Funktionen oder Methoden vermeiden {#variable-parameter-in-funktionen-oder-methoden-vermeiden}

Variable Parameter in Funktionen oder Methoden sollen vermieden werden, wenn bereits Parameter mit spezifischen Typen oder Strukturen definiert sind.

### J20 Problem

Variable Parameter in Funktionen oder Methoden in Kombination mit weiteren vorangestellten unterschiedlichen Parametern können zu Verwirrung und unerwartetem Verhalten führen.

::: danger TODO

TODO: nach java umschreiben

:::

```javascript
function fetchData(url, headers, options, ...params) {
  // ...
}
```

### J20 Lösung

Verwende stattdessen spezifische Parameter oder separate Funktionen/Methoden, um das Verhalten klarer zu kennzeichnen.

```javascript
function fetchData(url, headers, options) {
  // ...
}

function fetchDataWithParams(url, ...params) {
  // ...
}
```

### J20 Ausnahmen

Wenn die Funktion oder Methode nur ein vorangestellten Parameter besitzt, kann der Restparameter `...params` verwendet werden, um eine variable Anzahl von Argumenten zu akzeptieren.
Eine Verwechslung mit den vorangestellten Parametern ist in diesem Fall unwahrscheinlich.

```javascript
function formatString(template, ...params) {
  // ...
}
```

:::danger Variable Parameter kombiniert mit spezifischen Parametern
Betrachte folgendes Beispiel:

```javascript
function useOneOrMultiple(first, ...rest) {
  console.log(first);
  console.log(rest); // rest ist ein Array, d.h ...rest sind die Inhalte
}

const args = [1, 2, 3];
useOneOrMultiple(args[0], ...args.slice(1));
useOneOrMultiple(args[0], args.slice(1));
useOneOrMultiple(...args);
useOneOrMultiple(args);
```

Die Ausgabe ist:

- 1 und [2, 3]
- 1 und [[2, 3]]
- 1 und [2, 3]
- [1, 2, 3] und []

Erklärung:

- `useOneOrMultiple(args[0], ...args.slice(1));` entspricht `useOneOrMultiple(1, 2, 3);`, da `...args.slice(1)` in `(2, 3)` aufgelöst wird.
- `useOneOrMultiple(args[0], args.slice(1));` entspricht `useOneOrMultiple(1, [2, 3]);`
- `useOneOrMultiple(...args);` entspricht `useOneOrMultiple(1, 2, 3);` , da `(...args)` in `(1, 2, 3)` über alle Parameter aufgelöst wird wie beim ersten Beispiel
- `useOneOrMultiple(args);` entspricht `useOneOrMultiple([1, 2, 3], []);`

Jetzt stell dir vor, dass es mehr als 2 spezifische Parameter gibt und du versuchst, die Argumente zu übergeben...

:::

## J21 Boolean-Parameter in Funktionen oder Methoden vermeiden {#boolean-parameter-in-funktionen-oder-methoden-vermeiden}

Boolean als Parameter in Funktionen oder Methoden sollen nicht verwendet werden.
Stattdessen sollen eigene Funktionen oder Methoden mit entsprechenden Namen und Parametern erstellt werden, weil damit das Verhalten der Funktion oder Methode klarer wird.

### J21 Problem

Boolean-Parameter in Funktionen oder Methoden können zu Verwirrung und unerwartetem Verhalten führen, da der Aufrufer den Zweck des Parameters erraten muss.

::: danger TODO

TODO: nach java umschreiben

:::

```javascript
function fetchData(url, async) {
  if (async) {
    // Asynchroner Aufruf
  } else {
    // Synchroner Aufruf
  }
}
```

### J21 Lösung

Verwende stattdessen spezifische Parameter oder separate Funktionen/Methoden, um das Verhalten klarer zu kennzeichnen.

```javascript
function fetchAsyncData(url) {
  // Asynchroner Aufruf
}

function fetchData(url) {
  // Synchroner Aufruf
}
```

## J22 Default Parameter in Funktionen oder Methoden {#default-parameter-in-funktionen-oder-methoden}

Default Parameter in Funktionen oder Methoden sollen nicht verwendet werden.

### J22 Problem

Default Parameter in Funktionen oder Methoden können zu unerwartetem Verhalten führen, wenn der Aufrufer den Standardwert nicht erwartet oder überschreibt.

Sollte der default Parameter sich später ändern, kann dies zu unerwartetem Verhalten führen bei Code, der bereits existiert und den Standardwert verwendet.

```javascript
function increment(value, step = 10) {
  return value + step;
}
```

### J22 Lösung

Verwende stattdessen separate Funktionen oder Methoden mit spezifischen Namen, um das Verhalten klarer zu kennzeichnen.

```javascript
function incrementValueBy(value, step) {
  return value + step;
}

function incrementByTen(value) {
  return increment(value, 10);
}
```

### J22 Vorteile

- Klarere und verständlichere Funktionen und Methoden
- Vermeidung von unerwartetem Verhalten durch Standardwerte
- Einfachere Wartung und Erweiterung des Codes
- Nachträgliches Refactoring bzw. Änderungen des Standardwertes sind einfach, weil einfach eine neue Funktion erstellt wird.

### J22 Nachteile

- Mehr Code und mehr Tests, da separate Funktionen oder Methoden erstellt werden müssen
- Möglicherweise mehr Code-Duplizierung, wenn die Funktionen oder Methoden ähnliche Logik enthalten
- Mehr Aufwand bei der Benennung von Funktionen oder Methoden
- Mehr Aufwand bei der Dokumentation von Funktionen oder Methoden

## J23 Lambda-Ausdrücke statt Funktionsdeklarationen {#lambda-ausdruecke-statt-funktionsdeklarationen}
<!-- hier sollen java lambda verwendet werden, statt ein Functional Interface mit anonymer Klasse -->

::: danger TODO

TODO
:::

::: info Methodenreferenzen

Methodenreferenzen sind eine spezielle Form von Lambda-Ausdrücken, die es ermöglichen, eine Methode als Lambda-Ausdruck zu übergeben.
Sie sollen eingesetzt werden, wenn ein Lambda-Ausdruck nur eine Methode aufruft, ohne zusätzliche Logik zu enthalten und dabei die Parameter unverändert weitergibt.

```java
// Lambda-Ausdruck
list.forEach(e -> System.out.println(e));

// Methodenreferenz
list.forEach(System.out::println);
```

## J24 Ternärer Operator {#ternaerer-operator}

Der ternäre Operator (`condition ? expression1 : expression2`) soll verwendet werden, um einfache Bedingungen in einer einzigen Zeile zu schreiben.
Er ist einfach zu lesen und zu schreiben.
Er soll jedoch nicht geschachtelt werden, um die Lesbarkeit zu erhalten.
Verwende dann lieber `if...else`.

::: danger TODO

TODO: nach java umschreiben

:::

```javascript
const result = condition ? expression1 : expression2;
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

## J25 Verwendung von Streams {#verwendung-von-streams}

::: danger TODO

Streams hier beschreiben

:::

Methode | Erklärung | Beispiel
--------|-----------|---------
`filter()` | Filtert Elemente, die einer Bedingung entsprechen | `stream.filter(e -> e > 5)`

## J26 Namespace-Import {#namespace-import}

::: danger TODO

TODO: JAVA
Reihenfolge der imports, mit * als letztes

:::

## J27 Autoboxing und Unboxing {#autoboxing-und-unboxing}

::: danger TODO

TODO: JAVA

:::

## J28 for, Array.forEach, Stream.forEach {#for-array-foreach-stream-foreach}

::: danger TODO

TODO: JAVA

:::

## J29 Methoden-Verkettung {#methoden-verkettung}

Die Methoden-Verkettung soll verwendet werden, um Methodenaufrufe auf einem Objekt in einer einzigen Anweisung zu verkettet.

Methoden-Verkettung ist eine Technik, bei der mehrere Methodenaufrufe auf einem Objekt in einer einzigen Anweisung verkettet werden.
Dies wird beispielsweise bei Array-Methoden wie `map()`, `filter()`, `reduce()` und anderen verwendet.

Verwende Methoden-Verkettung, um den Code kompakter und lesbarer zu machen.

### J29 Beispiel

::: danger TODO

TODO: nach java umschreiben

:::

```javascript
const numbers = [1, 2, 3, 4, 5];

const sum = numbers
    .filter(x => x % 2 === 1)
    .map(x => x * 2)
    .reduce((acc, x) => acc + x, 0);
```

### J29 Regeln

- Jeder Methodenaufruf wird auf einer neuen Zeile eingerückt (entsprechend den ESLint-Regeln).
- Jeder Methodenaufruf wird durch einen Punkt (`.`) **vorangehend** zum Methodennamen getrennt.
- Verschachtelung werden vermieden, um die Lesbarkeit zu erhalten, ggf. durch Methoden-Referenzen.

```javascript
const sum = numbers
    .filter(divisibleByTwo)
    .map(double)
    .reduce(addSum, 0);
```

### J29 Vorteile

- Kompakter und lesbarer Code
- Einfache Verkettung von Methodenaufrufen
- Bessere Performance durch Vermeidung von Zwischenvariablen
- Einfache Wiederverwendung von Methodenketten

### J29 Ausnahmen

- Übermäßige Verkettung von Methoden kann die Lesbarkeit beeinträchtigen.
- Bei komplexen Operationen oder Bedingungen ist es besser, die Methodenaufrufe aufzuteilen.
- Bei der Verkettung von Methoden ist darauf zu achten, dass die Reihenfolge der Methodenaufrufe korrekt ist.

## J30 Unbenutzte Variablen und Parameter {#unbenutzte-variablen-und-parameter}

Es sollen keine unbenutzten Variablen und Parameter im Code vorhanden sein.

- Wenn die Funktionsdeklaration die Parameter vorschreibt, kann `_` als Platzhalter für unbenutzte Parameter verwendet werden.
- Mehrere unbenutzte Parameter können durch `(_, __, ___)` etc. gekennzeichnet werden.

:::details Linter bei Verwendung des Unterstrichs

Gegebenenfalls wird ein Linter bei der Verwendung des Unterstrichs als Platzhalter für unbenutzte Variablen oder Parameter eine Warnung ausgeben.
Dies kann in der Konfiguration des Linters deaktiviert werden.

Von [Stack Overflow](https://stackoverflow.com/questions/64052318/how-to-disable-warn-about-some-unused-params-but-keep-typescript-eslint-no-un)

```JSON
// .eslintrc.json
{
  // ...
  "rules": {
    // note you must disable the base rule
    // as it can report incorrect errors
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn", // or "error"
      {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "caughtErrorsIgnorePattern": "^_"
      }
    ]
  }
}
```

:::

### J30 Problem

Unbenutzte Variablen und Parameter können zu Verwirrung und unerwartetem Verhalten führen.

Das Entfernen von unbenutzten Parametern ist jedoch auch nicht möglich, wenn die Parameter vorne deklariert sind, da dies zu einem Fehler führen würde.

Vererbung und Interfaces können auch unbenutzte Parameter erzeugen.

### J30 Lösung

::: danger TODO

TODO: geht hier nicht?

:::

- Entferne alle Parameter, wenn keiner davon benutzt wird.
- Entferne den Parameter, wenn er eindeutig unbenutzt ist.
- Verwende `_` als Platzhalter für unbenutzte Variablen und Parameter, um den Code sauber zu halten.

```javascript

function sum(a, b, _) {
    return a + b;
}

```

### J30 Vorteile

- Sauberer und wartbarer Code
- Vermeidung von Verwirrung und unerwartetem Verhalten
- Bessere Lesbarkeit und Verständlichkeit des Codes

### J30 Nachteile

- Der Unterstrich kann zu Verwirrung führen, wenn er nicht als Platzhalter für unbenutzte Variablen oder Parameter verwendet wird.
- Spätere Erweiterungen der Funktion oder Methode lassen den Namen des originalen Parameters vermissen, wenn der Unterstrich verwendet wird.
**Bitte beachten**, dass eine Erweiterung einer vorhandenen Methode gegen das [OCP Prinzip](../../2.principles/principles#open-closed-principle) verstößt.

### J30 Ausnahmen

- Bei bereits vorhandene Funktionen oder Methoden besteht die Gefahr, dass das entfernen eines Parameters und damit einer semantischen Änderung der Reihenfolge der Parameter zu Fehlern beim Aufruf von vorhandenen Code führt.

```javascript
function original(unusedParameter1, parameter2, parameter3) {
    // ...
}

function refactored(parameter2, parameter3) {
    // ...
}

// Aufruf irgendwo

original(1, 2, 3); // Fehler
```

## J31 Verwende spezielle Objekte statt spezielle Werte {#verwende-spezielle-objekte-statt-spezielle-werte}

Wenn Objekte, wie `User` oder jede andere Art von Entität verwendet werden, und es spezielle Fälle gibt wie *nicht gefunden*, *ungültig*, *leer*, *fehlerhaft*, etc., dann sollen spezielle abgeleitete Objekte verwendet werden, um diese Fälle zu repräsentieren.

### J31 Problem

::: danger TODO

TODO: nach java umschreiben

:::

Spezielle Fälle wie *nicht gefunden*, *ungültig*, *leer*, *fehlerhaft*, etc. werden oft durch spezielle Werte wie `null`, `undefined`, `-1`, `0`, `''`, `false`, etc. repräsentiert.
Dies führt dazu, dass im Code ständig überprüft werden muss, ob der Wert speziell ist und entsprechend behandelt werden muss.

Wird diese Prüfung nicht gemacht und vergessen, kommt es zu Fehlern wie `Null-Pointer-Exceptions`, `undefined is not a function`, `TypeError: Cannot read property '...' of null`, etc.
Diese Fehler sind schwer zu finden und zu beheben, da sie oft an einer anderen Stelle im Code auftreten, als wo der Fehler tatsächlich liegt.

```javascript
function getUser(id) {
    const user = getUserFromDatabase(id);

    if (user == null) {
        return null;
    }

    return user;
}
```

### J31 Lösung

Verwende abgeleitete Objekte, um spezielle Fälle zu repräsentieren.
Es kann beispielsweise ein `NotFoundUser`-Objekt für den Fall eines nicht-gefundenen Benutzers erstellt werden.

Dieses *leere* Benutzer-Objekt verhält sich  **anders** im Vergleich zu einem *korrekten* Benutzer-Objekt.
So können damit keine Operationen durchgeführt werden, die nur für korrekte Benutzer erlaubt sind.

Die Prüfung auf einen *nicht-gefundenen* Benutzer kann durch Methoden des Objekts selbst erfolgen.
Sollte dieses Objekt doch einmal verwendet werden, so gibt nur dann eine Exception, wenn die Operation am Objekt nicht erlaubt ist.
Die Gültigkeit wird in operativen Methoden geprüft (siehe [Trennung von operationalem und integrativem Code](.#trennung-von-operationalem-und-integrativem-code)), so können Integrationsmethoden diese Werte einfach weitergeben.

Das folgende Beispiel zeigt die Verwendung eines speziellen Objekts `NotFoundEntity` für den Fall, dass eine Entität (ein generisches Beispiel-Daten-Objekt) nicht gefunden wurde.
Es werden keine Exceptions geworfen, sondern spezielle Objekte zurückgegeben, die spezielles Verhalten haben (`Polymorphismus`).
Wenn diese Objekte verwendet werden, wird das spezielle Verhalten automatisch ausgeführt.
In diesem Fall wird ein leeres Array zurückgegeben.
Alternativ kann auch ein Fehler geworfen werden, wenn das spezielle Objekt verwendet wird.

::: info Optional

Das spezielle Objekt [Optional](.#verwendung-von-optional-in-javascript-funktionen) kann auch verwendet werden, um diese spezielle Fälle zu repräsentieren.
Es ist nützlich, wenn bereits Klassen und Objekte aus einer Legacy-Anwendung verwendet werden, die nicht geändert werden können.

:::

::: danger TODO

TODO: nach java umschreiben

:::

```javascript

class NotFoundEntity extends Entity {
  static create() {
    // schützt vor Veränderung des Objekts
    return Object.freeze(new NotFoundEntity())
  }
  constructor() {
    super(-1, 'Unknown');
  }
  isValid() {
    return false;
  }
}

class Entity {
  static NOT_FOUND = NotFoundEntity.create();
  
  isValid() {
    return true;
  }
  // ...
}

// Methode braucht kein Exceptionhandling
function getEntityById(id) {
  if (id === 1) {
    return new Entity(1, 'Alice'); //oder Erstellung über Factory
  }
  // statt Exception
  return Entity.NOT_FOUND; // oder return Optional.empty();
}

function linesOfEntity(entity) {
  if (!entity.isValid()) {
    return new EmptyFoo();
  }
  return new Foo(entity);
}

function dataOfEntity(lines) {
  return new Data(lines.data);
}

function dataToArray(data) {
  return data.map(d => d.value);
}

function foo() {
  const entity = getEntityById(1);
  const linesOfEntity = linesOfEntity(entity);
  const data = dataOfEntity(linesOfEntity);

  return dataToArray(data);
}

// Alternativ mit Exception
function fooStrict() {
  const entity = getEntityById(1);

  if (!entity.isValid()) {
    throw new Error('Entity not found');
  }

  const linesOfEntity = linesOfEntity(entity);
  const data = dataOfEntity(linesOfEntity);

  return dataToArray(data);
}

```

### J31 Vorteile

- Keine Null-Pointer-Exceptions
- Spezielle Fälle werden explizit repräsentiert.
- Unterscheidung zwischen verschiedenen Fällen durch unterschiedliches Verhalten und Objekte (statt `null`)
- Keine ständige Überprüfung auf spezielle Werte notwendig (wie `null`, `undefined`, `-1`, `0`, `''`, `false`, etc.)
- Code kann nicht fehlschlagen, weil keine spezielle Werte verwendet werden.
- Kein Exceptionhandling
  - Vermeidet verschachtelte try-catch-Blöcke
  - Testen von speziellem Verhalten wird einfacher oder braucht gar nicht mehr getestet zu werden, da es nichts zu testen gibt
  - API wird einfacher, da keine Exceptions geworfen werden müssen und Rückgabewerte immer gültig und prüfbar (`isValid()`) sind
- Code wird einfacher und lesbarer, da spezielle Fälle keine zusätzlichen `if`-Anweisungen benötigen.

### J31 Nachteile

- Architektur der Klassen und Objekte wird komplexer oder vorhandene Architektur muss angepasst werden.
- Methoden müssen in ihrer Dokumentation nun statt Exceptions spezielle Objekte beschreiben.
- Spezielle Objekte müssen erstellt und gepflegt werden.
- Spezielle Objekte können zu einer größeren Anzahl von Klassen führen.
- Umstellung bestehender Code kann aufwändig sein.
- Exceptions sind in Fleisch und Blut der meisten Entwickler und werden oft als einfacher angesehen.
- Performance kann durch die Erstellung von speziellen Objekten beeinträchtigt werden, insbesondere da Pfade nicht mehr durch Prüfung von speziellen Werten abgekürzt werden könnten.

::: warning Anderes Vorgehen gleiche Wirkung

Der Einsatz von speziellen Werten wie `null` und `undefined` unterscheidet sich im Endergebnis nicht von speziellen Objekten.
Eine Prüfung muss früher oder später erfolgen, ob es sich um einen speziellen Fall handelt (`null` oder `isValid()`).

Jedoch ist in der Entwicklung oft die Situation gegeben, dass Entwickler einen Eingabewert **nicht** prüfen und es dadurch zu Fehlern kommt.
Durch den Einsatz von speziellen Objekten wird die Prüfung auf spezielle Werte automatisiert und der Code wird sicherer.
Erst sogenannte Kernfunktionen, die die speziellen Objekte verwenden, müssen die Prüfung dann durchführen.
Diese sind in der Regel besser getestet im Gegensatz zu den weiter oben in der Hierarchie liegenden Methoden.

Durch den Einsatz von speziellen Objekten wird es unwahrscheinlicher, dass Fehler wie `null`-Pointer-Exceptions oder `undefined`-Exceptions auftreten.

:::
