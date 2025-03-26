---
# https://vitepress.dev/reference/default-theme-home-page
layout: doc
outline: [2, 3]
customRulePrefix: PF
customIgnoreTitlesForRules: []
---
# Performance

## PF1 Einleitung {#einleitung}

Allen Kapiteln wurde eine eindeutige Nummerierung, der Richtliniennummer, hinzugefügt, um eine eindeutige Identifikation zu ermöglichen.
Jede Richtliniennummer besteht aus dem Buchstaben **PF**(Performance) gefolgt von einer Nummer, die den Abschnitt identifiziert. Damit kann eine Regel eindeutig identifiziert werden, z.B. für ein Code-Review.

## PF2 Die Qualität Performance {#die-qualitaet-performance}

Performance ist eine Qualitätsanforderung in der Softwareentwicklung und wird in der ISO 25010 als **Effizienz und Reaktionsfähigkeit** einer Software definiert. Dabei geht es darum, wie schnell und ressourcenschonend eine Anwendung auf Benutzer- oder Systemanforderungen reagiert. Eine schlechte Performance kann die Benutzerfreundlichkeit und Wirtschaftlichkeit eines Systems stark beeinträchtigen.

::: info
**ISO 25010:** Definiert Performance-Effizienz als eine der acht Hauptmerkmale der Softwarequalität, die sich auf die Nutzung von Ressourcen in Bezug auf Zeitverhalten, Ressourcenverbrauch und Kapazität bezieht.
:::

## PF3 Warum Performance wichtig ist {#warum-performance-wichtig-ist}

- Direkte Auswirkung auf Benutzererlebnis (UX)
- Geringere Betriebskosten durch effiziente Ressourcennutzung
- Kritisch für Echtzeitanwendungen (z. B. Finanzhandel, Spiele, eingebettete Systeme)
- Skalierbarkeit und Wartbarkeit verbessern sich
- In vielen Fällen ein Wettbewerbsfaktor

## PF4 Die goldenen Regeln bei Performance {#die-goldenen-regeln-bei-performance}

### PF4 Vorzeitige Optimierung ist die Wurzel allen Übels

> "Premature optimization is the root of all evil." – Donald Knuth

Es ist wichtig, sich zunächst auf sauberen Code und eine klare Architektur zu konzentrieren, anstatt voreilig auf Performance zu optimieren. Erst nach dem Messen und Identifizieren von Engpässen sollte eine Optimierung erfolgen.

::: details Nintend 64 Mario 64 Optimierungen von Kaze Emanuar

Der Modder Kaze Emanuar hat den Quellcode des Bestellerspiels Super Mario 64 (Veröffentlicht 1996, 11,9 Mio verkaufte Einheiten lt. Wikipedia) analysiert und optimiert, um die Performance des Spiels auf der originalen Nintendo 64-Hardware erheblich zu verbessern.
Durch seine Optimierungen konnte die Rendering-Geschwindigkeit des Spiels um das Sechsfache gesteigert werden.
Diese Leistungsverbesserung ermöglicht es, aufwendigere Level mit höherer Polygonzahl und höherer Auflösung flüssig darzustellen.
Zudem ebnet sie den Weg für einen Multiplayer-Modus, der ursprünglich aufgrund technischer Einschränkungen nicht realisiert werden konnte.

Diese Optimierungen sind teilweise durch Unwissenheit der Entwickler über die Hardware-Optimierungsmöglichkeiten möglich geworden (z.B. Debug-Code, ineffiziente Algorithmen).
Weitere Optimierungen erforderten jedoch ein tiefes Verständnis der Hardware und aufwändige Reverse-Engineering-Arbeiten sowie Messungen in Taktzyklen und dauerten eine lange Zeit.

Seine Arbeit zeigt Kaze Emanuars in einer Reihe von YouTube-Videos, in denen er die Optimierungen und die technischen Hintergründe detailliert erklärt:

[Kaze Emanuar Youtube](https://www.youtube.com/channel/UCuvSqzfO_LV_QzHdmEj84SQ)

:::

### PF4 Das angepasste Pareto-Prinzip

In der Performance-Optimierung gilt oft die Regel, dass Programme **ca. 90 % der Zeit nur 10 % ihres Codes ausführen**. Das bedeutet, dass nicht der gesamte Code optimiert werden muss, sondern nur die relevanten 10 %, die den größten Einfluss auf die Laufzeit haben.

Daher ist es essenziell, diesen kritischen Codeabschnitt zu identifizieren, bevor Optimierungsmaßnahmen getroffen werden.

::: info
**Tipp:** Profiling-Tools wie `perf`, `gprof` oder `Chrome DevTools` helfen dabei, diese "Hot Spots" im Code zu ermitteln.
:::

::: details Fan behebt Performance-Bottleneck in GTA Online

Ein bemerkenswertes Beispiel für die Verbesserung der Performance in *GTA Online* stammt von einem findigen Fan. Der GitHub-Nutzer **"tostercx"** (alias **t0st**) analysierte die Ursache der langen Ladezeiten und entdeckte einen **CPU-Flaschenhals**.

Eine JSON-Datei mit 63.000 Einträgen wurde unnötig oft durchsucht, was die Laufzeit auf O(n²) ansteigen ließ. Durch den Einsatz einer Hash-Map optimierte t0st den Prozess und reduzierte die Ladezeit von 6 auf 1-2 Minuten.

Durch seine Optimierungen konnte er die Ladezeiten um bis zu **70 Prozent** reduzieren.

Dieses Beispiel zeigt, wie durch manchmal einfache Änderungen an kritischen Stellen in der Software erhebliche Performance-Verbesserungen erzielt werden können.
Nicht eine Grafik- oder Netzwerkoptimierung, sondern eine **CPU-Optimierung** führte zu einer signifikanten Verbesserung der Benutzererfahrung.

**Quellen:**

- [buffed.de](https://www.buffed.de/GTA-5-Grand-Theft-Auto-5-Spiel-4795/News/Ladezeiten-Fan-Fix-Belohnung-1368677/?utm_source=chatgpt.com)  
- [pcgames.de](https://www.pcgames.de/GTA-5-Grand-Theft-Auto-5-Spiel-4795/News/fan-reduziert-ladezeiten-belohnung-von-rockstar-1368647/?utm_source=chatgpt.com)

:::

### PF4 Erfahrung kann täuschen – Messen ist wichtiger

Subjektive Einschätzungen von Entwicklern über Performance sind oft irreführend.
Statt Annahmen zu treffen, sollten Metriken und Profiling-Tools genutzt werden, um echte Flaschenhälse zu identifizieren.

::: info
**Beispiel:** Ein Entwickler könnte denken, dass eine bestimmte Schleife langsam ist, während der eigentliche Engpass eine Datenbankabfrage ist.
:::

### PF4 Das Einsatzgebiet beachten

Nicht jede Anwendung benötigt die gleiche Performance-Optimierung. Während eine Webanwendung mit Millisekunden-Latenzen leben kann, muss ein Mikrocontroller in Echtzeit arbeiten.

### PF4 Der Compiler optimiert bereits vieles

Moderne Compiler führen viele Optimierungen automatisch durch. Beispielsweise macht es oft keinen Unterschied, ob man `i++` oder `++i` verwendet, da der erzeugte Assembler-Code identisch sein kann.
Daher gilt auch hier wieder: **Erst messen, dann optimieren.**

```cpp
int i = 0;
i++; // Kann denselben Maschinencode erzeugen wie ++i
```

### PF4 Den generierten Code analysieren

Performance hängt oft weniger von der Syntax ab als vom generierten Maschinencode. Das Analysieren mit Tools wie `objdump` oder Compiler-Flags zur Optimierung kann helfen, ineffizienten Code zu identifizieren.

::: warning

Moderne Compiler optimieren den Code bereits sehr gut.
Manuelle Optimierungen sollten nur in Ausnahmefällen durchgeführt werden, da sie die Lesbarkeit, Erweiterbarkeit und Wartbarkeit des Codes beeinträchtigen können.

:::

## PF5 O-Notation für die Laufzeitbestimmung {#o-notation-fuer-die-laufzeitbestimmung}

Die **O-Notation** beschreibt die asymptotische Laufzeit eines Algorithmus, um seine Skalierbarkeit zu bestimmen. Sie wird oft zur Worst-Case-Bestimmung verwendet.

| O-Notation  | Beispiel                         | Beschreibung         |
|------------|---------------------------------|----------------------|
| O(1)       | Array-Zugriff `arr[i]`          | Konstante Zeit       |
| O(log n)   | Binäre Suche                    | Logarithmische Zeit  |
| O(n)       | Einfache Schleife               | Lineare Zeit         |
| O(n log n) | Mergesort, Quicksort            | Quasilineare Zeit    |
| O(n²)      | Doppelte Schleife               | Quadratische Zeit    |
| O(n³)      | Dreifach verschachtelte Schleife | Kubische Zeit        |
| O(2^n)     | Rekursive Berechnungen (z. B. Fibonacci ohne Memoization) | Exponentielle Zeit |
| O(n!)      | Traveling Salesman Problem (TSP) mit Brute-Force | Fakultätszeit |
| O(n^n)     | Primfaktorzerlegung (Faktorisierung großer Zahlen in der Kryptographie) | Extrem hohe Laufzeit |

## PF6 Vergleich von Zugriffszeiten {#vergleich-von-zugriffszeiten}

Um ein besseres Verständnis für die Geschwindigkeit von verschiedenen Speicher- und Netzwerkzugriffen zu erhalten, zeigt die folgende Tabelle eine Übersicht über typische Zugriffszeiten:

| Speicher-/Netzwerkmedium    | Typische Zugriffszeit |
|----------------------------|----------------------|
| L1 Cache                  | ~0,5 ns              |
| L2 Cache                  | ~3 ns                |
| L3 Cache                  | ~10 ns               |
| RAM (DRAM)                | ~100 ns              |
| NVMe SSD                  | ~0,1 ms              |
| SATA SSD                  | ~0,2 ms              |
| HDD (7200 U/min)          | ~10 ms               |
| Netzwerk (LAN, 1 Gbit/s)  | ~0,1 ms              |
| DSL (50 Mbit/s)           | ~20 ms               |
| Glasfaser (1 Gbit/s)      | ~1-5 ms              |
| Mobilfunk (4G LTE)        | ~30-50 ms            |
| Mobilfunk (5G)            | ~10-20 ms            |
| Satelliteninternet        | ~500-800 ms          |
| Bandlaufwerk              | ~10-100 Sekunden     |
| Magnetbandarchivierung    | Minuten bis Stunden  |

Die Unterschiede in den Zugriffszeiten zeigen, wie wichtig es ist, die richtige Speicher- oder Netzwerktechnologie für eine bestimmte Anwendung zu wählen.

## PF7 Optimierungstechniken {#optimierungstechniken}

Diese Techniken helfen dabei, die Performance von Software zu verbessern und Engpässe zu identifizieren.
Sie sind allgemein gehalten, jedoch müssen sie nicht zweingend zu einer Verbesserung führen.
Es ist wichtig, die Verbesserungen zu messen und zu überprüfen.

### PF7 Tief verschachtelte Schleifen vermeiden

Tief verschachtelte Schleifen führen zu einer exponentiellen Zunahme der Laufzeitkomplexität.
Eine dreifach geschachtelte Schleife kann schnell zu einer **O(n³)**-Komplexität führen.

**Schlechtes Beispiel:**

```java
for i = 0 to n:
    for j = 0 to n:
        for k = 0 to n:
            process(i, j, k)
```

**Lösung:**

- Durch geeignete Datenstrukturen kann man oft die Anzahl der Schleifen reduzieren (z. B. durch Hashmaps oder Lookup-Tabellen).
- Nutzen von Lookup-Tabellen oder Hashmaps zur Vermeidung redundanter Berechnungen.

```python
for i = 0 to n:
    process(i, lookup[j][k])
```

### PF7 Mehrere Aufrufe zusammenfassen

Viele kleine Datenbank- oder API-Aufrufe sind ineffizient.
Stattdessen sollten sie zusammengefasst werden.

**Schlechtes Beispiel:**

```java
insertIntoDatabase("Alice")
insertIntoDatabase("Bob")
insertIntoDatabase("Charlie")
```

**Besser:**

```java
bulkInsertIntoDatabase(["Alice", "Bob", "Charlie"])
```

Dasselbe gilt für REST-API-Aufrufe:

**Schlechtes Beispiel:**

```http
POST /api/user { "name": "Alice" }
POST /api/user { "name": "Bob" }
```

**Besser:**

```http
POST /api/users [ { "name": "Alice" }, { "name": "Bob" } ]
```

### PF7 Unnötige Berechnungen vermeiden

Anstatt eine Berechnung mehrfach auszuführen, speichert man das Ergebnis.

**Schlechtes Beispiel:**

```java
for i = 0 to n:
    result = expensiveCalculation()
    use(result)
```

**Besser:**

```java
result = expensiveCalculation()
for i = 0 to n:
    use(result)
```

#### PF7 Loop Unrolling

Durch das Entfalten von Schleifen kann die Anzahl der Iterationen reduziert werden.

```java
# Statt
for i = 0 to n:
    process(i)
for i = 0 to n step 2:
    process(i)

# Besser
for i = 0 to n step 2:
    process(i)
    process(i+1)
```

### PF7 Effiziente Datenstrukturen und Algorithmen

#### PF7 Wahl der richtigen Datenstruktur

Die richtige Datenstruktur kann drastische Auswirkungen auf die Performance haben.

**Beispiel:**

- **Array**: Gut für indexbasierten Zugriff (**O(1)**)
- **Linked List**: Gut für schnelles Einfügen und Löschen (**O(1)** an den Enden)
- **HashMap**: Perfekt für schnelle Suchen (**O(1)** für Schlüsselwerte)

```python
hashMap = { "Alice": 12345, "Bob": 67890 }
number = hashMap["Alice"]  # O(1)
```

::: info Bitfelder, Bitmasken und Speichergrenzen

In Hardware-nahe Programmierung (z. B. Embedded Systems) sind Bitfelder und Bitmasken oft effizienter als Arrays oder Hashmaps.

Datenstrukturen wie Records oder Structs können von Hardware-Optimierungen profitieren, wenn sie nicht gepackt sind, d.h. die Felder der Struktur auf Speichergrenzen (ofttmals ein Vielfaches von 2) ausgerichtet sind.
Dadurch können Speicherzugriffe effizienter sein, wenn sie auf Wortgrenzen oder Cache-Lines ausgerichtet sind.

:::

::: info binäre Datenstrukturen vs. Text

Binäre Datenstrukturen sind oft effizienter als Textformate wie JSON oder XML.
Sie benötigen weniger Speicherplatz und können schneller serialisiert und deserialisiert werden.
Nachtile sind jedoch, dass sie schwerer zu lesen und zu debuggen sind.

:::

#### PF7 Effiziente Algorithmen

- **Schnelleres Sortieren**: Statt Bubble Sort (**O(n²)**) lieber Quicksort oder Mergesort (**O(n log n)**)
- **Bessere Suchalgorithmen**: Binäre Suche statt linearer Suche (**O(log n)** statt **O(n)**)

```c
if binarySearch(sortedArray, target):
    print("Gefunden!")
```

::: info Das Rad neu erfinden

In vielen Fällen ist es besser, vorhandene Bibliotheken oder Frameworks zu verwenden, anstatt eigene Algorithmen zu schreiben.
Bibliotheken und Frameworks von Drittanbietern sind oft optimiert und getestet.

Beachte außerdem, dass optimierte Algorithmen auch Sicherheitslücken enthalten können.
Diese Lücken werden wahrscheinlicher in externen Bibliotheken gefunden,
da sie häufiger getestet werden als eigener Code.

:::

### PF7 Speicheroptimierung

#### PF7 Reduzierung von Speicherallokationen

Häufige Speicherallokationen kosten viel Zeit und Ressourcen.
Object Pooling kann helfen.
Dabei werden Objekte im Voraus erstellt und wiederverwendet, anstatt sie jedes Mal neu zu erstellen.

```java
objectPool = createPool(100)
obj = objectPool.getObject()
objectPool.releaseObject(obj)
```

Auch Collections und Listen können vorab initialisiert werden, um unnötige Allokationen zu vermeiden.

```java
list = new ArrayList<>(100)

stringBuilder = new StringBuilder(100) // Initialisiere StringBuilder mit Kapazität
```

::: info Garbage Collection

Eine Garbage Collection kann die Performance beeinträchtigen.
Oftmals ist es nicht möglich den Zeitpunkt der Garbage Collection zu beeinflussen,
daher kann es im schlimmsten Fall passieren, dass bei einer kritischen Anwendung die Garbage Collection zur Laufzeit erfolgt.

:::

::: warning Speicherfragmentierung

Speicherfragmentierung kann die Performance beeinträchtigen, da zusammenhängender Speicherplatz benötigt wird.
Wenn viel kleine Speicherblöcke allokiert und wieder freigegeben werden, kann dies zu Fragmentierung führen.
Tritt der Fall ein, dass ein großer Speicherblock benötigt wird, aber nur fragmentierter Speicher vorhanden ist, kann dies zu einer schlechten Performance führen,
weil der Speichermanager gezwungen ist, Speicherblöcke zu verschieben, um den benötigten Speicherplatz zu erhalten.

Als Entwickler kann man in diesem Fall versuchen, diese kleinen Daten selbst zu verwalten und in größeren Blöcken zu speichern.

:::

#### PF7 Vermeidung von Speicherlecks

Speicherlecks können die Performance beeinträchtigen, da sie letztendlich zu einem Speichermangel führen, welcher Speicheranforderungen immer schwieriger lösbar macht.
Die Anwendung wird langsamer und instabiler.

- Werte auf dem Heap müssen nach dem Gebrach freigegeben werden.
- zyklische Referenzen können oft nicht vom Framework oder Garbage Collector erkannt werden (verwende Weak References).
- Vermeide globale Variablen, da sie den Speicher unnötig belegen.
- Vermeide rekursive Funktionen, da sie den Stack-Speicher schnell füllen können.

### PF7 Caching

Caching kann die Performance erheblich verbessern, indem häufig verwendete Daten im Speicher gehalten werden.
Dies kann die Anzahl der Datenbankabfragen oder Berechnungen reduzieren, weil sie nicht jedes Mal neu durchgeführt werden müssen.

::: warning Aspekteortientierte Programmierung (AOP)

Caching sollte nicht direkt in den Code eingebettet werden, sondern als eigenständige Schicht implementiert werden.
Die Aspektorientierte Programmierung (AOP) kann dabei helfen, Caching-Logik von der Geschäftslogik zu trennen, damit
der Code wartbar und erweiterbar bleibt.

:::

#### PF7 Arten von Caching

- **Datenbank-Caching**: Ergebnisse von häufigen Abfragen speichern, um die Last auf die Datenbank zu reduzieren.
- **In-Memory-Caching**: Speicherung im RAM mit Tools wie Redis oder Memcached.
- **Browser-Caching**: Statische Ressourcen wie Bilder oder Stylesheets werden im lokalen Speicher des Clients abgelegt.
- **CDN-Caching**: Inhalte werden auf global verteilten Servern zwischengespeichert, um Ladezeiten zu verringern.

#### PF7 Implementierung von Caching (Pseudocode)

**Beispiel für ein einfaches In-Memory-Caching:**

```python
cache = {}

def get_data(key):
    if key in cache:
        return cache[key]  # Cache Hit
    data = database_query(key)
    cache[key] = data  # Speichern im Cache
    return data
```

::: warning Vor- und Nachteile von Caching

**Vorteile:**

- Schnellere Antwortzeiten
- Reduzierung von Datenbankabfragen
- Reduzierung von Berechnungen
- Verbesserte Skalierbarkeit

**Nachteile:**

- Konsistenzprobleme (veraltete Daten)
- Speicherbedarf
- Komplexität (Invalidierung von Caches)
- Cache-Miss (erste Anfrage dauert länger)
- Cache-Invalidierung (wann und wie wird der Cache geleert)

:::

#### PF7 Cache-Strategien

- **Write-Through**: Daten werden gleichzeitig im Cache und in der Datenbank aktualisiert.
- **Write-Back**: Daten werden erst im Cache aktualisiert und später in die Datenbank geschrieben.
- **Least Recently Used (LRU)**: Entfernt die am wenigsten genutzten Einträge, wenn der Cache voll ist.
- **Time-To-Live (TTL)**: Setzt ein Ablaufdatum für Cache-Einträge, um veraltete Daten zu vermeiden.

#### PF7 Cache-Invalidierung

Die richtige Invalidierungsstrategie ist entscheidend für die Datenkonsistenz:

- **Zeitbasierte Invalidierung**: Cache wird nach einer bestimmten Zeit geleert.
- **Event-basierte Invalidierung**: Cache wird geleert, wenn sich die Daten ändern.
- **Manuelle Invalidierung**: Entwickler oder Administratoren löschen den Cache bei Bedarf.

### PF7 SIMD (Single Instruction, Multiple Data)

SIMD ist eine Technik, die es ermöglicht, eine einzelne Instruktion auf mehrere Daten gleichzeitig anzuwenden. Sie wird häufig in der Hochleistungsprogrammierung eingesetzt, insbesondere für Grafikberechnungen, KI und wissenschaftliche Simulationen.

::: info Die eine Milliarde Zeilen Challenge

2024 wurde die "Eine Milliarde Zeilen Challenge" von Gunnar Morling ins Leben gerufen, um den schnellsten Weg zu finden, eine Milliarde Zeilen in einer CSV-Datei zu verarbeiten.

Die schnellste Implementierung verwendet SIMD-Instruktionen und erreicht eine Verarbeitungszeit von unter einer Sekunde.
Die einfachste Lösung benötigt mehrere Minuten.

Mehr Informationen und Implementierungen finden Sie auf [GitHub von Gunnar Morling](https://github.com/gunnarmorling/1brc).

:::

#### PF7 Vorteile von SIMD

- **Parallelität**: Mehrere Operationen werden gleichzeitig ausgeführt.
- **Effizienz**: Reduziert den Overhead von Schleifen.
- **Optimierung für moderne CPUs**: SIMD-Befehle nutzen spezialisierte Hardware in Prozessoren.
- **Performance**: Beschleunigt Berechnungen erheblich.
- **Skalierbarkeit**: Kann auf große Datenmengen angewendet werden.

#### PF7 Nachteile von SIMD

- **Nicht für Anfänger**: Erfordert spezielle Kenntnisse und Erfahrung.
- **Komplexität**: SIMD erfordert spezielle Kenntnisse und kann schwer zu debuggen sein.
- **Plattformabhängigkeit**: SIMD-Instruktionen sind nicht auf allen Plattformen verfügbar.
- **Verständlichkeit**: SIMD-Code kann schwer zu lesen und zu warten sein.
- **Erweiterbarkeit**: SIMD-Code ist oft spezifisch für eine Anwendung und schwer wiederverwendbar.
- **Fehleranfälligkeit**: SIMD-Code kann zu Fehlern führen, die schwer zu finden sind.

#### PF7 Beispiel für SIMD in Pseudocode

**Ohne SIMD:**

```pseudo
for i = 0 to n:
    result[i] = a[i] + b[i]
```

**Mit SIMD:**

```pseudo
load_vector(v1, a)
load_vector(v2, b)
v3 = add(v1, v2)
store_vector(result, v3)
```

Hier wird ein ganzes Vektor-Register gleichzeitig verarbeitet, anstatt Element für Element in einer Schleife zu iterieren.

#### PF7 Anwendungsfälle von SIMD

- Bildverarbeitung (z. B. Farboperationen auf Pixeln)
- Verschlüsselung (z. B. AES-Instruktionen)
- Physiksimulationen (z. B. Vektorrechnungen für Partikelsysteme)

SIMD bietet erhebliche Performance-Vorteile, sollte aber nur verwendet werden, wenn die Daten parallel verarbeitet werden können.

### PF7 Parallelisierung und Concurrency

Die Parallelisierung von Aufgaben kann die Performance erheblich verbessern, insbesondere auf Mehrkernsystemen.
Wenn Aufgaben unabhängig voneinander sind, können sie parallel ausgeführt werden, um die Gesamtlaufzeit zu verkürzen.
Es ist jedoch erforderlich, dass der Zugriff auf geminsame Ressourcen synchronisiert wird, was Wartezeiten verursachen kann.
Daher sind nicht alle Aufgaben für die Parallelisierung geeignet.
Beispielsweise sind Berechnungen, die von vorherigen Berechnungen abhängen, nicht parallelisierbar.

Beispiele für parllelisierbare Aufgaben:

- Bildverarbeitung
- Datenverarbeitung (z. B. Big Data)
- Simulationen
- KI-Training
- Videokodierung

::: info Multithreading und Concurrency

Multithreading ist eine Möglichkeit, die Performance zu verbessern, indem mehrere Threads gleichzeitig ausgeführt werden.
Concurrency bezieht sich auf die Fähigkeit eines Systems, mehrere Aufgaben gleichzeitig zu verarbeiten.

So können z. B. Berechnungen parallel ausgeführt werden, um die Gesamtlaufzeit zu verkürzen.
Wenn mehrere Threads auf mehreren Kernen ausgeführt werden, kann die Performance erheblich verbessert werden, sofern ein System mit mehreren Kernen vorhanden ist.
Andernfalls wird werden Aufgaben durch denseleben Kern abgearbeitet, was zu einer schlechteren Performance führen kann.

:::

::: warning Beachte

Eine Parallelisierung kommt mit eigenen Herausforderungen.
Wenn die Aufgabe oder Datenmenge zu klein ist, kann der Overhead der Parallelisierung die Performance verschlechtern.
Die Erstellung von Threads benötigt zusätzlichen Speicher und CPU-Zeit.
Dies kann durch Thread-Pools, Task-Queues, virtuelle Threads (Java) oder User-Threads (Windows-Fiber) aufgefangen, aber nicht vollständig

:::

#### PF7 Nebenläufigkeit und Locking-Mechanismen

Der Zugriff auf gemeinsame Ressourcen muss synchronisiert werden.

Dazu gibt es mehrere Mechanismen wie Mutex, Semaphoren, Monitore oder Locks.
Der Einsatz ist abhängig von der Anwendung und den Anforderungen.

```java
synchronized (lock) {
    // Kritischer Abschnitt
}
```

Für Listen können auch Read-Write-Locks verwendet werden, um parallele Lese- und Schreibzugriffe zu ermöglichen.
Sollten Listen nur selten verändert werden, kann auch eine Kopie der Liste erstellt werden, um parallele Lesezugriffe zu ermöglichen.

Es existieren in einigen Programmiersprachen auch spezielle Klassen, die den Zugriff auf Elemnete in Kollektionen synchronisieren,
ohne Locking-Mechanismen (beim Lesen) zu verwenden.

Weiterhin können auch atomare Operationen verwendet werden, um kritische Abschnitte zu schützen und
primitive Datentypen atomar zu verarbeiten.

```java
AtomicInteger counter = new AtomicInteger(0)

counter.incrementAndGet()
```

### PF7 Datenbank-Optimierungen

Datenbanken sind komplexe Systeme, die viele Optimierungsmöglichkeiten bieten.
Jede spezielle Datenbank hat ihre eigenen Optimierungsmöglichkeiten, die in der Dokumentation beschrieben sind
und sich stark unterscheiden können.
Es ist daher unerlässlich, die Dokumentation der verwendeten Datenbank zu lesen, zu verstehen und insbesondere Messungen durchzuführen, um Engpässe zu identifizieren.

Dennoch können grundlegende Regeln für die Optimierung von Datenbanken gelten:

#### PF7 Indexierung richtig einsetzen

Indizes beschleunigen Suchvorgänge erheblich.

```sql
CREATE INDEX idx_name ON users(name);
```

#### PF7 Denormalisierung

Durch Denormalisierung können Daten redundant gespeichert werden, um Lesevorgänge zu beschleunigen.
Dies kann jedoch zu Inkonsistenzen führen, wenn Daten aktualisiert werden.

#### PF7 Partitionierung

Datenbankpartitionierung kann die Performance verbessern, indem große Tabellen in kleinere Teile aufgeteilt werden.
Dies kann die Abfragegeschwindigkeit erhöhen, insbesondere bei großen Datenmengen.

#### PF7 Primärschlüssel und Fremdschlüssel

Primärschlüssel und Fremdschlüssel sollten richtig definiert werden, um die Integrität der Datenbank zu gewährleisten und die Performance zu verbessern.
Abfragen auf Primärschlüssel sind schneller als Abfragen auf anderen Spalten.

```sql
CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE orders (
    id INT PRIMARY KEY,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

SELECT * FROM users WHERE id = 1;
```

#### PF7 Datenmenge reduzieren

Abfragen sollen nur die benötigten Daten zurückgeben, um die Datenmenge zu reduzieren.

Statt `SELECT *` sollte nur die benötigte Spalte abgefragt werden.

```sql
SELECT name FROM users WHERE id = 1;
```

Statt mehree **SELECT**-Statements sollten **JOIN**s verwendet werden, um keine Zwischenergebnisse übertragen zu müssen, sondern direkt in der Datenbank zu verarbeiten.

```sql
SELECT users.name, orders.total FROM users JOIN orders ON users.id = orders.user_id;
```

#### PF7 Profiling von Datenbankabfragen

Profiling-Tools wie `EXPLAIN` in SQL können helfen, langsame Abfragen zu identifizieren und zu optimieren.
Diese sind insbesondere nützlich bei komplexen Abfragen oder Joins.

```sql
EXPLAIN SELECT * FROM users WHERE name = 'Alice';
EXPLAIN SELECT * FROM users JOIN orders ON users.id = orders.user_id;
```

### PF7 Netzwerkoptimierung

Netzwerke sind eines der langsamsten Glieder in der Performancekette.
Übertragungszeiten und Latenzen können die Performance erheblich beeinträchtigen.
Große Datenmengen sollten daher effizient übertragen werden.

#### PF7 Minimierung der Anzahl von API-Requests

Mehrere kleine Anfragen sollten in eine große Anfrage umgewandelt werden.

**Statt mehrerer Anfragen:**

```http
GET /user/1
GET /user/2
GET /user/3
```

**Besser eine große Anfrage:**

```http
GET /users?ids=1,2,3
```

### PF7 Nutzung von Komprimierung und Caching

Nutze Gzip-Komprimierung und Cache-Control-Header für große und/oder statische Inhalte, die sich selten ändern.

```http
Cache-Control: max-age=3600
```

### PF7 Load Balancing und CDN-Nutzung

Verteile Anfragen auf mehrere Server oder nutzen ein CDN für statische Inhalte.
