---
layout: doc
outline: [2, 2]

customRulePrefix: RFJS
customIgnoreTitlesForRules: [Einleitung]
---

# Refactoring von JavaScript und TypeScript

::: danger TODO:
Mehr Beispiele hinzufügen mit der Zeit.
:::

## Einleitung {#einleitung}

Allen Kapiteln wurde eine eindeutige Nummerierung, der Richtliniennummer, hinzugefügt, um eine eindeutige Identifikation zu ermöglichen.
Jede Richtliniennummer besteht aus dem Buchstaben **RFJS**(Refactoring JavaScript) gefolgt von einer Nummer, die den Abschnitt identifiziert.
Damit kann eine Regel eindeutig identifiziert werden, z.B. für ein Code-Review.

## RFJS1 JavaScript und TypeScript {#javascript-und-typescript}

In diesem Dokument werden JavaScript und TypeScript zusammengefasst.
Dort wo es notwendig ist, wird auf die Unterschiede hingewiesen.

> In Zukunft könnte ein eigenes Kapitel für TypeScript entstehen.

## RFJS2 Verwenden von `await` und `async` statt Callback und Promise {#await-async}

Callback-Funktionen und Promise können in den meisten Fällen durch `await` und `async` ersetzt werden.

::: code-group

```javascript [Callback]
// Vorher
getData((data) => {
    console.log(data);
});

// Nachher
const data = await getData();

console.log(data);
```

```javascript [Promise]
// Vorher
getData().then((data) => {
    console.log(data);
}).catch((error) => {
    console.error(error);
});

// Nachher
const data = await getData();
// Exception wird durch ein Cross-Cutting Concern behandelt
console.log(data);
```

```javascript [ Promise]
// Vorher
const promise1 = getData();
const promise2 = getMoreData();

Promise.all([promise1, promise2]).then(([data1, data2]) => {
    console.log(data1, data2);
}).catch((error) => {
    console.error(error);
});

// Nachher

const [data1, data2] = await Promise.all([getData(), getMoreData()]);
```

```javascript [Verschachtelung]
// Vorher
getData().then((data) => {
    getMoreData(data).then((moreData) => {
        console.log(moreData);
    });
});
// Vorsicht: an dieser Stelle wird nicht gewartet, bis getMoreData fertig ist

// Nachher
const data = await getData();
const moreData = await getMoreData(data);
// wartet auf beide Daten
```

```javascript [Funktion ohne async]
async function fetchData() { ... }

function getData : Promise<any> {
    return new Promise((resolve, reject) => {
        // vermeidet try-catch mit .catch
        const data = await fetchData().catch(reject);
        // ...
        resolve(data);
    });
}
```

```javascript [Funktion mit async]
async function getData : Promise<any> {
    const data = await fetchData();
    // weitere Verarbeitung
    return data;
}
```

```javascript [Unnötiges await]
async function getData : Promise<any> {
    const data = await fetchData();
    // keine Verarbeitung
    return data;
}
// kann vereinfacht werden zu
function getData : Promise<any> {
    // kein await und kein async
    return fetchData();
}
```

```javascript [Funktion mit async und Guard-Pattern]
async function getData : Promise<any> {
    if (!this.isDataAvailable()) {
        // liefert in Wirklichkeit ein Promise.resolve(null) zurück
        return null; 
    }

    const data = await fetchData();
    // ...
    return data;
}
```

```javascript [For-Schleife mit await]
async function getData : Promise<any[]> {
    const promises = [];

    // alle Promises gleichzeitig starten
    for (const id of ids) {
        promises.push(fetchData(id));
    }
    // und dann auf alle warten
    const data = await Promise.all(promises);
        
    return data;
}
```

```javascript [Catch mit async]
// Durch eine Zweiteilung der Funktion kann ein spezieller Fehler behandelt werden
// oder es kann die originale Funktion ohne spezielle Fehlerbehandlung aufgerufen werden
async function getDataPromise : Promise<any> {
    return fetchData();
}

async function getData : Promise<any> {
    try {
        return await getDataPromise();
    } catch (error) {
        if (error instanceof SpecialError) {
            return null;
        } 
        throw error;
    }
}
```

:::

::: info Fehlerbehandlung

`await` wirft eine Exception, wenn das Promise rejected wird.
Diese Exception sollte durch ein globales Error-Handling behandelt werden, statt durch `catch` in der Funktion.
`catch` sollte nur eingesetzt werden, wenn die Exception lokal behandelt werden kann.

:::

### RFJS2 Vorteile

- Bessere Lesbarkeit durch sequentielle Ausführung statt Verschachtelung
- Bessere Fehlerbehandlung durch `try-catch` statt `catch`-Funktionen (die oft nicht implementiert und getestet sind)
- Bessere Wartbarkeit durch bessere Strukturierung des Codes
