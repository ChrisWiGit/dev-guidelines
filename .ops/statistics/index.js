const fs = require("fs").promises
const path = require("path")
const Glob = require("glob")
const textStats = require("text-stats")

const IGNORE_MD_FILES = ["**/node_modules/**", "**/dist/**", "**/build/**", "README.md", "CHANGELOG.md", "CONTRIBUTING.md", "CODE_OF_CONDUCT.md", "LICENSE.md", "todos.md"]

const globalState = {
  sentences: 0,
  words: 0,
  syllables: 0,
  characters: 0
}

async function processSingleFile(filePath, globalState) {
  const content = await fs.readFile(filePath, "utf-8")
   const stats = textStats.stats(content)

  globalState.sentences += stats.sentences
  globalState.words += stats.words
  globalState.syllables += stats.syllables
  globalState.characters += stats.characters  
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

    console.info("Glossary created successfully", filePath)
  } catch (err) {
    console.error(err)
    process.exit(5)
  }
})(process.argv.slice(2))