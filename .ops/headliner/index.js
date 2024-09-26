/*
CLI um eine MD-Datei zu durchgehen und alle Headlines mit einer Richtliniennummer zu versehen.

Eine Richtliniennummer ist eine aufsteigende Nummer mit einem vorangestellten Kürzel, z.b. G für General oder JS für JavaScript.
z.B. G1, G2, G3, JS1, JS2, JS3, ...

0. Lese als erstes Argument ein den Präfix für die Richtliniennummer ein (JS, G, etc.) und als zweites Argument den Pfad zur Datei
1. Lese alle Zeilen der Datei in einen Array ein (der wird später durchgegangen und gespeichert)
2. Beginne mit der Richtliniennummer bei 0
2. Prüfe, ob eine Zeile ein Header ist (d.h. mit ## beginnt)
    2.1. Wenn ja,
    2.1.1. Prüfe, ob der Header bereits eine Richtliniennummer hat, wenn ja, entferne diese mit einem RegEx.
    2.1.2 Dann erhöhe die aktuelle Richtliniennummer um eins und speichere den Header mit der Richtliniennummer als "<Richtliniennummer> originale Headertitel" in den Array.
    z.B. # G1 originale Headertitel
    2.2. Wenn nicht mit # beginnt, dann gehe zur nächsten Zeile (ignoriere also alle nicht-Header-Zeilen)
    2.3. Wenn es ein Sub-Header ist (###, ####, etc.), dann füge die aktuelle Richtliniennummer des Headers als Präfix hinzu "<Richtliniennummer> originale Sub-Headertitel"
    2.3.1. Entferne eine bereits vorhandene Richtliniennummer mit einem RegEx
    z.B. ## G1 originale SubHeadertitel
3. Schreibe den Header in eine neue Datei
*/

const fs = require("fs").promises;
const path = require("path");
const Glob = require("glob");

const CURRENT_NEW_LINE_OF_OS = process.platform === "win32" ? "\r\n" : "\n";

const RULE_NUMBER_REGEX = /#+\s*\w+\d+/;
const HEADLINE_GUTTERS_REGEX = /#+/;

class NoCustomRulePrefixException extends Error {}

function isMainHeader(str) {
  return str.startsWith("##") && !isSubHeader(str);
}

function isSubHeader(str) {
  return str.startsWith("###");
}

function correctHeaderTitle(str) {
  return str
    .replace(RULE_NUMBER_REGEX, "")
    .replace(HEADLINE_GUTTERS_REGEX, "")
    .trim();
}

function countNumberOfGutters(str) {
  return str.match(/#/g).length;
}

function addRuleNumber(str, ruleNumber, state) {
  const numberOfGutters = countNumberOfGutters(str);
  const gutters = "#".repeat(numberOfGutters);
  const newTitle = correctHeaderTitle(str);

  state.headers.push({
    ruleNumber,
    gutters,
    header: isSubHeader(str) ? state.currentHeader : -1,
    ruleStr: `${state.prefix}${ruleNumber}`,
    title: newTitle,
    filePath: state.relativeFilePath,
  });

  return `${gutters} ${state.prefix}${ruleNumber} ${newTitle}`;
}

function isYamlSectionBounds(str) {
  // verhinder Tabelle als Yaml zu interpretieren
  return str.startsWith("---") && !str.startsWith("----");
}

function processYamlCustomRulePrefixLine(line, state) {
  if (state.prefix) {
    throw new Error(`Custom rule prefix already set to ${state.prefix}`);
  }

  const customRulePrefix = line.match(/customRulePrefix: (\w+)/);
  if (customRulePrefix) {
    state.prefix = customRulePrefix[1];
  }
}

function processLine(line, state) {
  if (isYamlSectionBounds(line)) {
    state.mdYamlSection = !state.mdYamlSection;
    return line;
  }

  if (state.mdYamlSection) {
    processYamlCustomRulePrefixLine(line, state);
    return line;
  }

  if (!state.prefix) {
    throw new NoCustomRulePrefixException("Custom rule prefix not set");
  }

  if (isMainHeader(line)) {
    state.ruleNumber += 1;
    state.currentHeader = state.headers.length;
    return addRuleNumber(line, state.ruleNumber, state);
  }

  if (isSubHeader(line)) {
    return addRuleNumber(line, state.ruleNumber, state);
  }

  return line;
}

function processLines(lines, state) {
  return lines.map((line) => processLine(line, state));
}

async function processFile(filePath, state) {
  console.log(`Processing file ${filePath}`);

  const fileContent = await fs.readFile(filePath, "utf-8");
  const fileArray = fileContent.split(/\r?\n/);

  return processLines(fileArray, state);
}

function joinHeadersByPrefix(state, globalState) {
  if (globalState.headersByPrefix[state.prefix]) {
    throw new Error(`Prefix ${state.prefix} already exists`);
  }

  globalState.headersByPrefix[state.prefix] = [];
  globalState.headersByPrefix[state.prefix] = state.headers;
}

function resetFileState(state, newFile) {
  state.prefix = "";
  state.ruleNumber = 0;
  state.mdYamlSection = false;
  state.headers = [];
  state.relativeFilePath = newFile;
}

const singleFileState = {
  prefix: "",
  ruleNumber: 0,
  mdYamlSection: false,
  headers: [],
  relativeFilePath: "",
};

const globalState = {
  headersByPrefix: {},
};

async function processSingleFile(filePath, state, globalState) {
  resetFileState(state, path.relative(process.cwd(), filePath));

  let newFileArray;
  try {
    newFileArray = await processFile(filePath, state);
  } catch (err) {
    if (err instanceof NoCustomRulePrefixException) {
      console.error(`No RulePrefix: Ignoring file ${filePath}`);

      return;
    }
    throw err;
  }

  if (state.mdYamlSection) {
    console.error("Yaml section not closed");
    process.exit(2);
  }

  await fs.writeFile(
    filePath,
    newFileArray.join(CURRENT_NEW_LINE_OF_OS),
    "utf-8"
  );

  joinHeadersByPrefix(state, globalState);
}

async function processFilesInDirectory(directoryPath, state, globalState) {
  const files = await Glob.glob(`${directoryPath}/**/*.md`, {
    ignore: ["**/node_modules/**", "**/.git/**"],
  });

  for (const file of files) {
    await processSingleFile(file, state, globalState);
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
      await processFilesInDirectory(filePath, singleFileState, globalState);
    } else {
      await processSingleFile(filePath, singleFileState, globalState);
    }

    await fs.writeFile(
      path.join(path.dirname(filePath), "headlines.json"),
      JSON.stringify(globalState.headersByPrefix, null, 2),
      "utf-8"
    );
  } catch (err) {
    console.error(err);
    process.exit(5);
  }
})(process.argv.slice(2));
