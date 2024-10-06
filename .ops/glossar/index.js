/*
CLI Tool, um ein Glossar/Begriffsverzeichnis aus Markdown-Dateien zu erstellen.

1. Dateien werden gescannt und nach einem Eintrag gesucht: <!-- !glossary [Begriff,[Begriff2...]] --> 
2. Wenn so ein Kommentar gefunden wurde, dann wird der nächste Inhalt des Block mit ::: komplett als Definition genommen.
3. Wenn darin Pfade ../ oder ../../ etc. gefunden werden, dann wird der Pfad durch ./ ersetzt.
4. Alle Begriffe werden in ein JSON-Objekt geschrieben und in einer Datei 'glossary.json' gespeichert.

::: details Schein-Konstanten

Objekte oder Array-Inhalte sind immer veränderbar, auch wenn sie mit `final` deklariert werden.
Nur die Zuweisung der Variable ist konstant, nicht der Wert.

In Java gibt es keine Möglichkeit, den Inhalt eines Objekts oder Arrays zu sperren.
Alternativen sind die Software Prinzipien [Tell, don't ask](../../2.principles/principles#tda-ie) und [Informatin Hiding](../../2.principles/principles#ih-e).
:::

*/

const fs = require("fs").promises;
const path = require("path");
const Glob = require("glob-promise");


const globalState = {
  wordToDefinition: new Map(),
};

function isGlossaryComment(str) {
  return str.includes("<!-- !glossary");  
}
function getGlossaryWordAsString(str) {
  // <!-- !glossary [Begriff,[Begriff2...]] --> 
  const bounds = str.replace("<!-- !glossary", "").replace("-->", "").trim();
  return bounds.split(",").map((word) => word.trim()).join(", ");
}

async function processSingleFile(filePath, globalState) {
  const content = await fs.readFile(filePath, "utf-8");
  
  const lines = content.split(/\r?\n/);

  let isGlossary = false;
  let words = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (isGlossary) {
      if (line.includes(":::")) {
        isGlossary = false;

        const definitions = [];
        let j = i + 1;
        while (j < lines.length && !lines[j].includes(":::")) {
          definitions.push(lines[j]);
          j++;
        }

        
      }
    }

    if (isGlossaryComment(line)) {
      isGlossary = true;
      words = getGlossaryWordAsString(line);
    }






}
  



async function processFilesInDirectory(directoryPath, globalState) {
  const files = await Glob.glob(`${directoryPath}/**/*.md`, {
    ignore: IGNORE_MD_FILES,
  });

  for (const file of files) {
    await processSingleFile(file, globalState);
  }
}

(async function (args) {
  if (args.length != 1) {
    console.error("Usage: node index.js <path-to-file|cwd>");
    process.exit(1);
  }

  try {
    const filePath = args[0];

    const stat = await fs.lstat(filePath);

    if (stat.isDirectory()) {
      await processFilesInDirectory(filePath, globalState);
    } else {
      await processSingleFile(filePath, globalState);
    }

    await fs.writeFile(
      path.join(path.dirname(filePath), "glossary.json"),
      JSON.stringify(globalState.glossary, null, 2),
      "utf-8"
    );
  } catch (err) {
    console.error(err);
    process.exit(5);
  }
})(process.argv.slice(2));