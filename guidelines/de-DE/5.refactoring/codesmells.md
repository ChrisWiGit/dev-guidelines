---
layout: doc
outline: [2, 2]
---

# Code-Smells

## Einleitung {#einleitung}

Code-Smells sind Hinweise darauf, dass der Code refaktorisiert werden sollte.
Anhand von wiederkehrende Muster und Anzeichen können Code-Smells identifiziert werden.
Hier werden daher Beispiel für Code-Smells aufgeführt, die auf Probleme im Code hinweisen können.

## If-Statements {#if-statements}

### Negationen

```java [Negationen]
if (!data.isBlank()) {
  // do something
} else {
  // do something
}
```

### Große If-Blöcke

```java [Große If-Blöcke]
if (...) {
  // ...
  // ...
  // ...
  // ...
  // ...
  // ...
  // ...
  // ...
  // ...
  // ...
  // ...
  // ...
  // ...
  // ...
  // ...
  // ...
  // ...
}
```

### Viele If-Statement

```java [Viele If-Statements]
if (...) {
  // do something
}
if (...) {
  // do something
}
if (...) {
  // do something
}
if (...) {
  // do something
}
if (...) {
  // do something
}
if (...) {
  // do something
}
```

### Tief oder mehrfach verschachtelte If-Statements

```java [Tief oder mehrfach verschachtelte If-Statements]
if (a == 1) {
  if (anotherValue === 0) {
    if (yetAnotherValue === 2) {
      // do something
      if (a === 2) {
        // do something
      }
    }
    // do something
  } else if (anotherValue === 1) {
    // do something
  } else {
    //..
  }
}
```

### Lange If-Statements

```java [Lange If-Statements]
if (a == 1 && b == 2 && c == 3 && d == 4 && e == 5 && f == 6) {
  // do something
}
```

### Komplexe Bedingungen

```java [Komplexe Bedingungen]
if ((a == 1 && anotherValue.data.equals("123")) || (a == 2 && anotherValue === 1)) {
  // do something
}
```

## Bezeichner

```java
int a = 1; 

class Testclassname {
  int testVariable = 1;
}
```

## Feature-Neid

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

## elementare Datentypen

## Schleifen

### Schleifen mit viel Inhalt

```java
for (int i = 0; i < 10; i++) {
  // do something
  // do something
  // do something
  // do something
  // do something
  // do something
  // do something
  // do something
  // do something
  // do something
  // do something
}
```

### verschachtelte Schleifen

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

### Schleifen mit Seiteneffekten

```java
```

### Falsche eingesetzte Schleifen

```java
int i = 0;
while (i < 10) {
  val[i] = value;
}
```

statt

```java
for (int i = 0; i < 10; i++) {
  val[i] = value;
}

IntStream.range(0, 10).forEach(i -> val[i] = value);
```

## Switch-Statements

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

statt

```java
classType1.doSomething();
classType2.doSomething();
```

## Umfangreiche Klassen

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

## Datenklassen

## Kommentare

Kommentare, die den Code erklären beschreiben, sind in der Regel überflüssig, da der Code selbst sprechen sollte.
