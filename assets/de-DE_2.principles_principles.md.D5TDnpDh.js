import{_ as e,c as n,o as i,a4 as t}from"./chunks/framework.DpC1ZpOZ.js";const p=JSON.parse('{"title":"Prinzipien der Software Entwicklung","description":"","frontmatter":{"layout":"doc"},"headers":[],"relativePath":"de-DE/2.principles/principles.md","filePath":"de-DE/2.principles/principles.md"}'),r={name:"de-DE/2.principles/principles.md"},a=t('<h1 id="prinzipien-der-software-entwicklung" tabindex="-1">Prinzipien der Software Entwicklung <a class="header-anchor" href="#prinzipien-der-software-entwicklung" aria-label="Permalink to &quot;Prinzipien der Software Entwicklung&quot;">​</a></h1><h2 id="einleitung" tabindex="-1">Einleitung <a class="header-anchor" href="#einleitung" aria-label="Permalink to &quot;Einleitung&quot;">​</a></h2><p>Prinzipien sind grundlegende Regeln, die bei der Entwicklung von Software eingehalten werden sollten. Jedes Prinzip stammt aus der Praxis und hat sich bewährt, um Software zu entwickeln, die wartbar, erweiterbar und verständlich ist. Dennoch können Prinzipien sich gegenseitig widersprechen. In der Praxis ist es daher wichtig, die Prinzipien zu kennen und sich mit ihnen auseinanderzusetzen, um die richtige Balance zu finden.</p><h2 id="solid" tabindex="-1">SOLID <a class="header-anchor" href="#solid" aria-label="Permalink to &quot;SOLID&quot;">​</a></h2><p>SOLID ist das grundlegenste Prinzip der Softwareentwicklung. Es steht für die fünf Prinzipien der Softwareentwicklung:</p><ul><li>Single Responsibility Principle,</li><li>Open/Closed Principle,</li><li>Liskov Substitution Principle,</li><li>Interface Segregation Principle und</li><li>Dependency Inversion Principle.</li></ul><h3 id="single-responsibility-principle" tabindex="-1">Single Responsibility Principle <a class="header-anchor" href="#single-responsibility-principle" aria-label="Permalink to &quot;Single Responsibility Principle&quot;">​</a></h3><p>Das <code>Single Responsibility Principle</code> besagt, dass eine Klasse oder ein Modul nur eine einzige Aufgabe erfüllen sollte. Ihre Funktionen und Methoden ermöglichen im Gesamtbild, dass diese Aufgabe erfüllt wird. Jede Funktion oder Methode sollte jedoch nur wiederum eine einzige Aufgabe erfüllen.</p><blockquote><p>Trotzdem können Module, Komponenten oder Klassen mehrere Funktionen oder Methoden besitzen, sollte jede Funktion oder Methode nur eine einzige Aufgabe erfüllen, die zur Erfüllung der Gesamtaufgabe beiträgt.</p></blockquote><h3 id="open-closed-principle" tabindex="-1">Open/Closed Principle <a class="header-anchor" href="#open-closed-principle" aria-label="Permalink to &quot;Open/Closed Principle&quot;">​</a></h3><h3 id="liskov-substitution-principle" tabindex="-1">Liskov Substitution Principle <a class="header-anchor" href="#liskov-substitution-principle" aria-label="Permalink to &quot;Liskov Substitution Principle&quot;">​</a></h3><h3 id="interface-segregation-principle" tabindex="-1">Interface Segregation Principle <a class="header-anchor" href="#interface-segregation-principle" aria-label="Permalink to &quot;Interface Segregation Principle&quot;">​</a></h3><h2 id="kiss" tabindex="-1">KISS <a class="header-anchor" href="#kiss" aria-label="Permalink to &quot;KISS&quot;">​</a></h2><p>KISS steht für <code>Keep It Simple, Stupid</code> und ist ein Prinzip, das besagt, dass Software so einfach wie möglich sein sollte. Dies bedeutet, dass Software so einfach und verständliche für andere Entwickler sein sollte, dass sie leicht gewartet und erweitert werden kann.</p><blockquote><p>Gute Software ist einfach und verständlich.</p></blockquote><h2 id="dry" tabindex="-1">DRY <a class="header-anchor" href="#dry" aria-label="Permalink to &quot;DRY&quot;">​</a></h2><p>Code, der sich oft wiederholt, ist schwer zu pflegen und zu korrigieren, da Änderungen an einer Stelle auch an anderen (oft unbekannten) Stellen gemacht werden müssen.</p><p>Das <code>Don&#39;t Repeat Yourself</code> Prinzip besagt, dass Code so geschrieben werden sollte, dass er sich nicht wiederholt.</p><h3 id="die-2-3-5-regel" tabindex="-1">Die 2-3-5 Regel <a class="header-anchor" href="#die-2-3-5-regel" aria-label="Permalink to &quot;Die 2-3-5 Regel&quot;">​</a></h3><p>Die <em>2-3-5</em> Regel besagt, dass Code, der sich mehr als <strong>zweimal</strong> wiederholt, in eine Funktion oder Methode ausgelagert werden sollte. Code, der sich mehr als <strong>dreimal</strong> wiederholt, sollte in eine Klasse oder ein Modul ausgelagert werden. Code, der sich mehr als <strong>fünfmal</strong> wiederholt, sollte in eine eigene Bibliothek oder ein eigenes Framework ausgelagert werden.</p><blockquote><p>Oftmals ist doppelter Code nicht sofort ein Problem, sondern erst später, wenn er ein drittes Mal angefasst wird. Daher kann es manchmal besser sein, Code erst dann zu restrukturieren, wenn er sich zum dritten Mal wiederholt.</p></blockquote><h2 id="spot" tabindex="-1">SPOT <a class="header-anchor" href="#spot" aria-label="Permalink to &quot;SPOT&quot;">​</a></h2><p>Das <code>Single Point of Truth</code> Prinzip besagt, dass es nur eine einzige Stelle geben sollte, an der eine Information gespeichert wird.</p><p>Wenn es mehrere Stellen gibt, an denen die gleiche Information gespeichert wird, kommt es unweigerlich zu Inkonsistenzen und Fehlern. Es ist dann nicht mehr möglich welche Information die richtige ist.</p><h2 id="yagni" tabindex="-1">YAGNI <a class="header-anchor" href="#yagni" aria-label="Permalink to &quot;YAGNI&quot;">​</a></h2><p>Die <code>You Ain&#39;t Gonna Need It</code> Regel besagt, dass unnützer Code und Features nicht geschrieben werden sollte, weil nicht nur diesen Code zu schreiben Aufwand kostet, sondern ihn auch wieder zu Entfernen, je später dies passiert. Daher sollten Laufzeitkonfigurationen, voreilige Optimierungen und unnötige Features vermieden werden und erst dann implementiert werden, wenn sie wirklich benötigt werden.</p><blockquote><p>Die Zukunft vorauszusagen, ob etwas notwendig ist oder nicht ist unmöglich. Feedback an das Team, den PO, die Stakeholder und die Benutzer ist daher unerlässlich.</p></blockquote><h2 id="soc" tabindex="-1">SoC <a class="header-anchor" href="#soc" aria-label="Permalink to &quot;SoC&quot;">​</a></h2><p>Das <code>Separation of Concerns</code> Prinzip besagt, dass Software so entwickelt werden sollte, dass die verschiedenen Aspekte der Software voneinander getrennt sind. Eine Trennung von Verantwortlichkeiten und Aufgaben ermöglicht es, dass die Software leichter gewartet und erweitert werden kann. Zudem ist sie dann leichter verständlich und testbar, weil Abstraktionen helfen, die Komplexität zu reduzieren.</p><p>Verschiedene Aspekte können sein:</p><ul><li>UI</li><li>Datenbankzugriff</li><li>Datenverwaltung</li><li>generell Geschäftslogik</li><li>Fehlerbehandlung (try/catch)</li><li>Logging</li><li>Security</li><li>Klassen</li></ul><blockquote><p>Die Nicht-Einhaltung von SoC lässt sich leicht an <em>schnell-geschriebenen</em> Code sehen, der <code>alles</code> in einer Methode abhandelt.</p></blockquote><h2 id="lc" tabindex="-1">LC <a class="header-anchor" href="#lc" aria-label="Permalink to &quot;LC&quot;">​</a></h2><p>Das <code>Low Coupling</code> Prinzip besagt, dass Software so entwickelt werden sollte, dass die Abhängigkeiten zwischen den einzelnen Komponenten so gering wie möglich sind.</p><p>Es gibt verschiedene Arten von Kopplung:</p><ul><li>Datenkoppelung besteht darin, dass Module auf die Daten eines anderen Moduls zugreifen.</li><li>Globale Datenkoppelung besteht darin, dass Module auf gemeinsame globale Daten zugreifen.</li><li>Steuerungskoppelung besteht darin, dass ein Modul die Kontrolle über ein anderes Modul übernimmt.</li><li>Koppelung durch gemeinsame Ressourcen besteht darin, dass Module auf gemeinsame Ressourcen zugreifen.</li><li>Externe Koppelung besteht darin, dass Module von gleichen externen Software oder Hardware abhängig sind.</li><li>Koppelung durch Kommunikation besteht darin, dass Module durch Kommunikation miteinander verbunden sind wie z.B. durch Nachrichten oder Signale oder Datenbanken.</li><li>Funktionale Koppelung besteht darin, dass Module auf die Funktionalität des jeweiligen Moduls zugreifen.</li><li>Temporale Koppelung besteht darin, dass Module abhängig einer zeitlichen Abfolge oder Reihenfolge von Ereignissen anderer Module sind.</li><li>Sequenzielle Koppelung besteht darin, dass Module in einer bestimmten Reihenfolge ausgeführt werden müssen, da ihre Datenverarbeitung voneinander abhängig ist.</li><li>Interaktionskoppelung besteht darin, dass Methoden oder Funktionen eines Moduls auf die Methoden oder Funktionen eines anderen Moduls zugreifen.</li><li>Komponentenkoppelung besteht darin, dass Komponenten auf Variable oder Funktionen einer anderen Komponente direkt zugreifen.</li></ul><h2 id="iosp" tabindex="-1">IOSP <a class="header-anchor" href="#iosp" aria-label="Permalink to &quot;IOSP&quot;">​</a></h2><p>Das <code>Integration Operation Segregation Principle</code> besagt, dass Code entweder Operations-Logik oder Integration-Logik enthalten sollte, aber nicht beides. Solch getrennte Logiken ermöglichen leichteres Testen und erhöht die Verständlichkeit des Codes durch kleinere und einfachere Methoden/Funktionen.</p><ul><li>Eine Methode/Funktion sollte Operations-Logik (Bedingungen, Schleifen, etc.) enthalten, die die Geschäftsregeln implementiert und/oder API-Aufrufe (oder derart) durchführt.</li><li>Eine Methode/Funktion sollte Integration-Logik enthalten, die anderen Code verwendet, um die Operations-Logik zu implementieren.</li></ul><h2 id="nfr" tabindex="-1">NFR <a class="header-anchor" href="#nfr" aria-label="Permalink to &quot;NFR&quot;">​</a></h2><p>Das <code>Non-Functional Requirements</code> Prinzip besagt, dass Software von Anfang an so entwickelt werden sollte, dass sie nicht-funktionale Anforderungen erfüllt. Nicht-funktionale Anforderungen sind Anforderungen, die nicht direkt mit der Funktionalität der Software zusammenhängen, sondern mit anderen Aspekten wie Performance, Sicherheit, Skalierbarkeit, Wartbarkeit, Zuverlässigkeit, etc. Es ist wichtig eine Priorisierung dieser nicht-funktionalen Anforderungen vor dem Beginn der Entwicklung zu machen, denn das nachträgliche Hinzufügen dieser Anforderungen bedeutet in der Regel einen höheren Aufwand.</p><h2 id="fp" tabindex="-1">FP <a class="header-anchor" href="#fp" aria-label="Permalink to &quot;FP&quot;">​</a></h2><p>Das <code>Flexible Principle</code> ist ein Prinzip, das die Flexibilität von Software beschreibt. Es besagt, dass Software so flexibel sein sollte, dass sie leicht an neue Anforderungen angepasst werden kann. Dies bedeutet, dass Software so entwickelt werden sollte, dass sie leicht erweitert oder geändert werden kann, ohne dass dies zu einem großen Aufwand führt.</p><h2 id="euhm" tabindex="-1">EUHM <a class="header-anchor" href="#euhm" aria-label="Permalink to &quot;EUHM&quot;">​</a></h2><p>Insbesondere API sollten so entwickelt werden, dass sie einfach zu verwenden sind. Dies bedeutet, dass die API so einfach und verständlich wie möglich sein sollte, damit Entwickler sie leicht verwenden können. Das <code>Easy to Use, Hard to Misuse</code> Prinzip besagt, dass die API so einfach wie möglich sein sollte, damit Entwickler sie leicht verwenden können, jedoch so restriktiv wie nötig, damit sie nicht missbraucht werden kann.</p><h2 id="postel-s-law-robustheitsgebot" tabindex="-1">Postel&#39;s Law / Robustheitsgebot <a class="header-anchor" href="#postel-s-law-robustheitsgebot" aria-label="Permalink to &quot;Postel&#39;s Law / Robustheitsgebot&quot;">​</a></h2><p>Das <code>Postel&#39;s Law</code> Prinzip ist ein Konzept für Internetstandards. Auf Software bezogen bedeutet das Robustheitsgebot, dass Software so entwickelt werden sollte, dass sie so tolerant wie möglich gegenüber Eingaben von außen in Hinblick auf die Verarbeitung von Daten sein sollte und so restriktiv wie nötig in Hinblick auf die Ausgabe der eigenen Daten.</p><blockquote><p>„Software sollte so geschrieben werden, dass sie mit jedem vorstellbaren Fehler umgehen kann, egal wie unwahrscheinlich er ist“ <a href="https://datatracker.ietf.org/doc/html/rfc1122" target="_blank" rel="noreferrer">^</a></p></blockquote><h2 id="tda-ie" tabindex="-1">TdA/IE <a class="header-anchor" href="#tda-ie" aria-label="Permalink to &quot;TdA/IE&quot;">​</a></h2><p>Das <code>Tell don&#39;t Ask</code> Prinzip ist ein Prinzip, das besagt, dass Objekte so entwickelt werden sollten, dass sie Informationen nicht nach aussen geben und stattdessen nur mit ihren Methoden diese Informationen verarbeiten lassen. Wenn Objekte es anderen Objekten erlauben, auf ihre Daten zuzugreifen, führt dies zu einer Verletzung des <code>Information Hiding/Encapsulation</code> Prinzips und zu einer erhöhten Kopplung zwischen den Objekten (Koppelung durch Daten). Weiterhin kommt es zu einer Inkonsistenz der Daten, da mehrere Objekte auf die gleichen Daten zugreifen können und es nicht gewährleistet ist, dass die Daten korrekt geschrieben werden.</p><h2 id="ih-e" tabindex="-1">IH/E <a class="header-anchor" href="#ih-e" aria-label="Permalink to &quot;IH/E&quot;">​</a></h2><p>Das Prinzips <code>Information Hiding/Encapsulation</code> besagt, dass Objekte so entwickelt werden sollten, dass sie ihre Daten und Methoden vor anderen Objekten verbergen.</p><h2 id="poq" tabindex="-1">PoQ <a class="header-anchor" href="#poq" aria-label="Permalink to &quot;PoQ&quot;">​</a></h2><p>Das <code>Principle of Quality</code> Prinzip besagt, dass Software so entwickelt werden sollte, dass sie eine hohe Qualität hat. Es könnte schneller sein jetzt eine Lösung zu entwickeln, die nicht so gut ist, aber es wird später mehr Zeit und Geld kosten, um die Qualität zu verbessern. Schlechte Qualität führt zu Frustration bei den Benutzern und den Entwicklern und lässt Fehler schwerer beseitigen und Features länger dauern. Qualität muss nicht nur gelebt, sondern auch überwacht werden und Metriken wie Testüberdeckung, Fehlerrate sowie Code Reviews und statische Code Analyse sollten regelmäßig durchgeführt und überwacht werden.</p><h2 id="cf" tabindex="-1">CF <a class="header-anchor" href="#cf" aria-label="Permalink to &quot;CF&quot;">​</a></h2><p>Das <code>Customer Focus</code> Prinzip besagt, dass Software so entwickelt werden sollte, dass sie auf die Bedürfnisse des Kunden zugeschnitten ist.</p><p>Es ist wichtiger, dass der Kunde seine eigentliche Aufgabe mit dem Produkt erfüllen kann, als dass das Produkt technisch perfekt ist. Dazu zählt auch, dass das Produkt einfach zu bedienen, die Benutzerfreundlichkeit im Vordergrund steht und die Fehler sich in Grenzen halten.</p><blockquote><p>Fehler sind unerwartete Verhalten von Software gegenüber den Erwartungen des Benutzers.</p></blockquote><h2 id="uft" tabindex="-1">UFT <a class="header-anchor" href="#uft" aria-label="Permalink to &quot;UFT&quot;">​</a></h2><p>Das <code>Use familiar tools</code> Prinzip besagt, dass Software so entwickelt werden sollte, dass sie mit den Werkzeugen und Technologien entwickelt wird, die die Entwickler bereits kennen und verwenden.</p><h2 id="ff" tabindex="-1">FF <a class="header-anchor" href="#ff" aria-label="Permalink to &quot;FF&quot;">​</a></h2><p>Programmieren mit dem <code>Fail Fast</code> Prinzip bedeutet, dass Software defensive programmiert werden soll, damit Fehler zum frühstmöglichsten Zeitpunkt <strong>durch</strong> Code erkannt und behandelt werden können. Eingabedaten sollten immer validiert und geprüft werden, damit die Fehlerfälle einfach und schnell erkannt und behandelt werden können.</p><h2 id="roe" tabindex="-1">RoE <a class="header-anchor" href="#roe" aria-label="Permalink to &quot;RoE&quot;">​</a></h2><p>Die <code>Rule of Explicitness</code> (Regel der Eindeutigkeit/Unmissverständlichkeit) besagt, dass explizite Lösungen einfacher zu verstehen und zu warten sind als implizite Lösungen. Implizite Lösungen erfordert, dass ein Entwickler zwischen den Zeilen lesen muss, um zu verstehen, wie die Lösung funktioniert.</p><p><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br> \\</p>',65),s=[a];function d(o,l,u,h,c,g){return i(),n("div",null,s)}const f=e(r,[["render",d]]);export{p as __pageData,f as default};
