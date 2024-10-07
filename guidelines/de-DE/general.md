---
outline: deep
---

# Allgemeines

Dieser Entwicklerleitfaden ist eine Sammlung von Richtlinien, die dir helfen sollen, bessere Software zu entwickeln.
Software ist mehr als nur Code. Software ist ein Produkt, das von Menschen für Menschen entwickelt wird.
Daher ist es wichtig, dass Standards festgelegt werden, auf die sich alle Entwickler einigen, um eine Wiedererkennung und damit eine bessere Wartbarkeit zu gewährleisten.

::: info Beachte
Viele dieser Richtlinien stammen aus den verschiedensten Quellen.

Sie haben alle gemeinsam, dass sie aus Erfahrung von tausenden von Entwicklern stammen und sich als nützlich erwiesen haben.
Es ist normal, dass du mit der einen oder anderen Regel nicht einverstanden bist.
Wichtig dabei ist jedoch, dass du dies kommunizierst, darüber im Team diskutierst und eine neue Regelung als Ersatz findest.
:::

::: info Entwicklerinnen und Entwickler

Glücklicherweise entscheiden sich immer mehr Frauen für eine Karriere in der Softwareentwicklung.
Dieser positive Trend soll weiter gefördert werden, um die Vielfalt in der Softwareentwicklung zu erhöhen, denn Vielfalt führt zu besseren Lösungen und Produkten.

Leider sind die Diskussionen über das generische Maskulinum in der deutschen Sprache noch nicht abgeschlossen.
Dennoch haben sich die Autoren entschieden, in diesem Dokument das generische Maskulinum zu verwenden, um die Lesbarkeit zu erhöhen.

**Natürlich sind alle Richtlinien und Regeln in diesem Dokument für Entwicklerinnen und Entwickler gleichermaßen gültig.**

:::

## Warum Richtlinien?

In Deutschland gibt es allein für das Bauwesen rund [3900 Normen](https://www.din.de/de/mitwirken/normenausschuesse/nabau/baukosten-normen), viele hundert ISO-Normen regeln die Qualität von Produkten und Dienstleistungen (z.B. [ISO 9001](https://www.iso.org/standard/62085.html) für Qualitätsmanagement, [25010 für Software-Qualität](https://iso25000.com/index.php/en/iso-25000-standards/iso-25010)) und die Europäische Union hat viele weitere Richtlinien, um den Binnenmarkt zu regeln und Produkte sicherer zu machen.
Und wer keinen Stromschlag von einer Elektroinstallation bekommen will, sollte sich an die [VDE-Normen](https://www.vde-verlag.de/standards.html) halten.

Im Gegensatz dazu wird in der Softwareentwicklung oft noch nach dem Prinzip "Learning by Doing" gearbeitet.
Viele etablierte Regeln und Prinzipien sind den Entwicklern unbekannt oder werden einfach ignoriert.
Dies geschieht tagtäglich in vielen, auch namhaften Unternehmen und führt zu schlechter Softwarequalität, hohen Wartungskosten und großer Frustration bei den Anwendern.

Software wird aufgrund ihrer immateriellen Form gerne als ein einfach und schnell zu erstellendes Produkt angesehen, das man nebenbei entwickeln kann (*"Der Praktikant macht das schon"*).
Selbst wenn Entwickler eine Ausbildung oder ein Hochschulstudium absolviert haben, fehlt ihnen das Wissen und die Erfahrung, um große und komplexe Unternehmenssoftware zu entwickeln.
Auch so genannte Senior-Entwickler, die schon viele Jahre in der Softwareentwicklung tätig sind, haben oftmals wenig Ahnung von Softwarearchitektur und Design Patterns, da sie in ihrer täglichen Arbeit regelmäßig nur mit der (schnellen) Lösung von Problemen beschäftigt sind.
Code wird nicht selten nur geschrieben, um ein Problem zu lösen, ohne sich Gedanken über die Wartbarkeit und Erweiterbarkeit des Codes zu machen.
Dies führt zu einer hohen technischen Verschuldung, die in vielen Fällen nicht mehr abgebaut werden kann und die Softwareentwicklung nicht nur immer langsamer und teurer macht, sondern mit hoher Wahrscheinlichkeit zum Konkurs des Unternehmens führen kann.
Der Verfall kann auch nicht einfach dadurch aufgehalten werden, dass neue Entwickler eingestellt werden, um den Code zu verbessern und gleichzeitig neue Funktionen hinzuzufügen.
Die neuen Entwickler, d.h. die Junior-Entwickler, werden höchstwahrscheinlich die gleichen Fehler machen wie ihre Vorgänger, müssen aber mit dem zusätzlichen Ballast und der Komplexität des alten Codes zurechtkommen.

**Wenn Softwareprodukte und insbesondere Code von Anfang an nach festen Regeln und Prinzipien entwickelt werden, verbessert dies nicht nur die Qualität der Software und des Produkts, sondern senkt auch die Kosten und erhöht die Zufriedenheit von Anwendern und Entwicklern.
Die Softwareentwicklung wird effizienter und die Software wird langlebiger und wartbarer, was zu einer gleichbleibenden oder höheren Produktivität (mehr Funktionen in kürzerer Zeit) führt.**

::: info Kurz

Softwareentwicklung wird zu einer Ingenieursdisziplin, die nach festen Regeln und Prinzipien arbeitet und nicht mehr nach dem Prinzip "Learning by Doing".

:::

## Abschnitte

Die Richtlinien sind in mehrere Abschnitte unterteilt, die dir helfen sollen, mit der Zeit immer besser bei der Entwicklung von Software zu werden.
Lese sie dir durch und versuche, sie in deinem täglichen Arbeitsablauf zu integrieren.

::: info
Es ist besser die Leitlinien mit der Zeit zu lernen, als sie alle auf einmal zu lernen.
:::

::: warning
Die Richtlinien sind nicht in Stein gemeißelt. Sie sind ein Leitfaden, der dir helfen soll, bessere Software zu entwickeln.
:::

## Richtlinien und Regeln

Alle Richtlinien in diesem Dokument sind kodiert. 
Jede Regel beginnt mit einem Buchstaben, gefolgt von einer Nummer, die den Abschnitt identifiziert, z.B. H1 für Erste Regel im Abschnitt **Health**/**Gesundheit**.
Damit kann eine Regel eindeutig identifiziert werden, z.B. für einen Kommentar im Code-Review.

Die Regeln sind alle [hier](./allrules) aufgelistet und können nach Bedarf aufgerufen werden.

## Nutzen

Du kannst die Richtlinien gesamt oder in Teilen nutzen. Du kannst sie auch an deine Bedürfnisse anpassen und sie in deinem Team verwenden,
solange du die [Lizenz](../.#license) beachtest.

::: warning Wichtig

Es ist unwichtig, dass alle Regeln bis ins kleinste Detail befolgt werden.

Wichtig ist, dass eine einheitliche Linie in der Softwareentwicklung eingehalten wird.
Nur so kann in einem Team effizient gearbeitet werden.

:::

## Können vs. Sollen

- In diesem Dokument werden alle Regeln die mit `soll`/`sollen` beginnen als verbindlich angesehen.
- Regeln mit `kann`/`können`/`könnte` sind optional und können je nach Bedarf angewendet werden.

## Feedback

Wenn du Fehler findest oder Verbesserungsvorschläge hast, kannst du diese gerne mitteilen.
Du kannst auch per github pull request Verbesserungen vorschlagen.
Bitte beachte, dass es manchmal etwas dauern kann, bis Änderungen übernommen werden.
