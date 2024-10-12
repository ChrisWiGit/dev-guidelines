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

const fs = require("fs").promises
const path = require("path")
const Glob = require("glob")

const IGNORE_MD_FILES = ["**/node_modules/**", "**/dist/**", "**/build/**", "README.md", "CHANGELOG.md", "CONTRIBUTING.md", "CODE_OF_CONDUCT.md", "LICENSE.md", "todos.md"]

const globalState = {
  wordToDefinition: new Map(),
}

function isGlossaryComment(str) {
  return str.includes("<!-- !glossary")  
}
function getGlossaryWordAsString(str) {
  // <!-- !glossary [Begriff,[Begriff2...]] --> 
  const bounds = str.replace("<!-- !glossary", "").replace("-->", "").trim()
  return bounds.split(",").map((word) => word.trim()).join(", ")
}

function getGlossaryWordsFromBox(str) {
  //::: details Schein-Konstanten -> Schein-Konstanten
  return str.split(/\s+/).slice(2).join(" ").trim()
}

async function processSingleFile(filePath, globalState) {
  const content = await fs.readFile(filePath, "utf-8")
  
  const lines = content.split(/\r?\n/)

  let isGlossary = false
  let words = ''
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (isGlossary) {
      if (line.includes(":::")) {

        if (!words) {
          words = getGlossaryWordsFromBox(line)
        }

        isGlossary = false

        const definitions = []
        let j = i + 1
        while (j < lines.length && !lines[j].includes(":::")) {
          definitions.push(lines[j])
          j++
        }     

        globalState.wordToDefinition[words] = definitions.filter((line) => line.trim() !== "").join("\n")
      }
    }

    if (isGlossaryComment(line)) {
      isGlossary = true
      words = getGlossaryWordAsString(line)
    }
  }
}
  
function fixPathsInLinks(wordToDefinition) {
  // (./../ -> (./
  // (../../ -> (./
  // (../../../ -> (./
  for (const [word, definition] of Object.entries(wordToDefinition)) {
    const matches = definition.match(/\((\.+\/)+/g)
    if (matches) {
      wordToDefinition[word] = definition.replace(/\((\.+\/)+/g, "(./")
    }
  }
}



async function processFilesInDirectory(directoryPath, globalState) {
  const files = await Glob.glob(`${directoryPath}/**/*.md`, {
    ignore: IGNORE_MD_FILES,
  })

  for (const file of files) {
    await processSingleFile(file, globalState)
  }
}

async function writeGlossaryFile(filePath, globalState) {
  await fs.writeFile(
    path.join(path.dirname(filePath), "glossary.json"),
    JSON.stringify(globalState.wordToDefinition, null, 2),
    "utf-8"
  )
}

(async function (args) {
  if (args.length != 1) {
    console.error("Usage: node index.js <path-to-file|cwd>")
    process.exit(1)
  }

  try {
    const filePath = args[0]
    const stat = await fs.lstat(filePath)

    if (stat.isDirectory()) {
      await processFilesInDirectory(filePath, globalState)
    } else {
      await processSingleFile(filePath, globalState)
    }

    fixPathsInLinks(globalState.wordToDefinition)

    await writeGlossaryFile(filePath, globalState)

    

    
  } catch (err) {
    console.error(err)
    process.exit(5)
  }
})(process.argv.slice(2))