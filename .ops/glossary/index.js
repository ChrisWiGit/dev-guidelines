/*
CLI Tool, um ein Glossar/Begriffsverzeichnis aus Markdown-Dateien zu erstellen.

1. Dateien werden gescannt und nach einem Eintrag gesucht: <!-- !glossary [Begriff,[Begriff2...]] --> 
2. Wenn so ein Kommentar gefunden wurde, dann wird der nächste Inhalt des Block mit ::: komplett als Definition genommen.
3. Wenn darin Pfade ../ oder ../../ etc. gefunden werden, dann wird der Pfad durch ./ ersetzt.
4. Alle Begriffe werden in ein JSON-Objekt geschrieben und in einer Datei 'glossary.json' gespeichert.

<!-- !glossary [optionaler ErsatzName]-->
::: details Begriff
Erklärung
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
  //:::details Schein-Konstanten -> Schein-Konstanten
  return str.replace(/:::\s*\w+/, "").trim()
}

async function processSingleFile(filePath, globalState) {
  const content = await fs.readFile(filePath, "utf-8")
  const lines = content.split(/\r?\n/)

  let infoBlocksCount = 0;
  let glossaryBlocksCount = 0;

  let isGlossary = false
  let words = ''
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (line.includes(":::")) {
      infoBlocksCount++
    }

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

        if (words) {
          const definition = definitions.filter((line) => line.trim() !== "").join("\n")

          globalState.wordToDefinition[words] = fixPathsInLinks(definition, filePath)
        } else {
          console.warn("No words found in glossary box at line", i)
          glossaryBlocksCount--
        }
      }
    }

    if (isGlossaryComment(line)) {
      glossaryBlocksCount++
      isGlossary = true
      words = getGlossaryWordAsString(line)
    }
  }

  console.info("Info blocks to glossary blocks ratio", infoBlocksCount, glossaryBlocksCount)
}
  
function fixPathsInLinks(definition) {
  // (./../ -> (./
  // (../../ -> (./
  // (../../../ -> (./
  const matches = definition.match(/\((\.+\/)+/g)
  if (matches) {
    definition = definition.replace(/\((\.+\/)+/g, "(./")
  }

  return definition
}

function sortByKeys(wordToDefinition) {
  const sorted = Object.keys(wordToDefinition).sort().reduce((acc, key) => {
    acc[key] = wordToDefinition[key]
    return acc
  }, {})

  return sorted
}



async function processFilesInDirectory(directoryPath, globalState) {
  const files = await Glob.glob(`${directoryPath}/**/*.md`, {
    ignore: IGNORE_MD_FILES,
  })

  for (const file of files) {
    console.info("Processing file", file)
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

    globalState.wordToDefinition = sortByKeys(globalState.wordToDefinition)

    await writeGlossaryFile(filePath, globalState)

    console.info("Glossary created successfully", filePath)
  } catch (err) {
    console.error(err)
    process.exit(5)
  }
})(process.argv.slice(2))