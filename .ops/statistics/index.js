const fs = require("fs").promises
const path = require("path")
const Glob = require("glob")
const textStats = require("text-stats")

const IGNORE_MD_FILES = ["**/node_modules/**", "**/dist/**", "**/build/**", "README.md", "CHANGELOG.md", "CONTRIBUTING.md", "CODE_OF_CONDUCT.md", "LICENSE.md", "todos.md"]

const globalState = {
  sentences: 0,
  words: 0,
  syllables: 0,
  characters: 0,
  wordToCount: new Map()
}

function dismissInvalidWords() {
  return word => {
    if (word.length < 4) {
      return false
    }

    // nur Wörter mit Buchstaben
    if (!word.match(/^[a-z]+$/i)) {
      return false
    }

    return true
  }
}


function countWords(content, globalState) {
  const words = content.split(/\s+/)
  for (const word of words.filter(dismissInvalidWords())) {
    const count = globalState.wordToCount.get(word) || 0
    globalState.wordToCount.set(word, count + 1)
  }
}

async function processSingleFile(filePath, globalState) {
  const content = await fs.readFile(filePath, "utf-8")

  const contentWithoutYamlStart = content.replace(/---[\s\S]*?---/, "").toString()

  try {
    const stats = textStats.stats(contentWithoutYamlStart)

    globalState.sentences += stats.sentences
    globalState.words += stats.words
    globalState.syllables += stats.syllables
    globalState.characters += stats.characters
  } catch (ignore) {
    console.warn("Could not calculate stats for file", filePath)
  }

  countWords(contentWithoutYamlStart, globalState)
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

async function writeStatsFile(filePath, globalState) {
  const statsFilePath = path.join(filePath, "stats.json")

  globalState.wordToCount = Object.fromEntries(globalState.wordToCount)

  await fs.writeFile(statsFilePath, JSON.stringify(globalState, null, 2))
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

    await writeStatsFile(filePath, globalState)

    console.info("Statistics created successfully", filePath)
  } catch (err) {
    console.error(err)
    process.exit(5)
  }
})(process.argv.slice(2))