#!/usr/bin/env node
/*
CLI Anwendung
index.js <path-to-file|cwd>

1. Durchläuft mit glob alle md Dateien
2. Liest die Datei ein
3. Durchläuft die Zeilen
4. Prüft, ob folgende Zeile vorkommt: ::: danger TODO: <Titel>
5. Wenn ja wird die Zeile in ein Array als Objekt gespeichert mit Titel und Datei
6. Der Array wird in eine JSON Datei todos.json geschrieben.
Es wird immer vom aktuellen Arbeitsverzeichnis ausgegangen.
*/

const fs = require("fs").promises;
const path = require("path");
const Glob = require("glob");

const IGNORE_MD_FILES = ["**/node_modules/**", "**/dist/**", "**/build/**", "README.md", "CHANGELOG.md", "CONTRIBUTING.md", "CODE_OF_CONDUCT.md", "LICENSE.md", "todos.md"]


function findFileInTodos(filePath, todos) {
  return todos.find((todo) => todo.filePath === filePath);
}

function processLine(line, state, filePath) {

  if (line.match(/^#+\s*/)) {
    // ## Einleitung {#einleitung}
    const headerTitleWithoutHash = line.replace(/^#+\s*(.*)$/, "$1").replace(/ {#.*}$/, "").trim();

    if (line.match(/\s*{#.*}$/)) {
      const headerLink = line.match(/\s*{(#.*)}$/)[1];

      state.lastFoundHeaderLink = headerLink;
    } else {
      state.lastFoundHeaderLink = '';
    }
    state.lastFoundHeaderTitle = headerTitleWithoutHash;
  }

  if (line.match(/^:::\s*danger\s*TODO:/)) {
    const title = line.replace(/^:::\s*danger\s*TODO:/, "").trim();
    
    let foundFile = findFileInTodos(filePath, state.todos);
    if (!foundFile) {
      foundFile = {
        filePath,
        filename: path.basename(filePath),
        todos: []
      };
      state.todos.push(foundFile);
    }
    foundFile.todos.push({
      title: state.lastFoundHeaderTitle || title,
      link: filePath+state.lastFoundHeaderLink || filePath
    });
  }
}

function processLines(lines, state, filePath) {
  return lines.map((line) => processLine(line, state, filePath));
}

async function processFile(filePath, state) {
  console.log(`Processing file ${filePath}`);

  const fileContent = await fs.readFile(filePath, "utf-8");
  const fileArray = fileContent.split(/\r?\n/);

  return processLines(fileArray, state, filePath);
}

const globalState = {
  /**
   * @type {Array<{
   * filePath: string,
   * filename: string,
   * todos: Array<{
   *  title: string,
   *  link: string
   * }>
   */
  todos: [
  ]
};

async function processSingleFile(filePath, globalState) {
  await processFile(filePath, globalState);
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

    globalState.todos.sort((a, b) => a.filePath.localeCompare(b.filePath));

    await fs.writeFile(
      path.join(path.dirname(filePath), "todos.json"),
      JSON.stringify(globalState.todos, null, 2),
      "utf-8"
    );
  } catch (err) {
    console.error(err);
    process.exit(5);
  }
})(process.argv.slice(2));
