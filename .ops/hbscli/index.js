#!/usr/bin/env node

/*
CLI Node Anwendung als HBS-Compiler für MD Dateien als CLI 

verwendet hbs, um ein Template hsb Datei mit Daten aus einer JSON-Datei zu füllen und das Ergebnis in eine Markdown-Datei zu schreiben.

Eingabe
index.js <data.json> <input.md.hbs> <output.md>
*/

const hbs = require("handlebars");
const path = require("path");
const fs = require("fs").promises;

function parseRelativePaths(args) {
  return args.map((arg) => path.join(process.cwd(), arg));
}

(async function main(args) {

  if (args.length !== 3) {
    console.error("Usage: index.js <data.json> <input.md.hbs> <output.md>");
    process.exit(1);
  }

  try {
    const [dataFilePath, templateFilePath, outputFilePath] =
      parseRelativePaths(args);

    const dataFile = await fs.readFile(dataFilePath, "utf8");
    const data = JSON.parse(dataFile);
    const templateFile = await fs.readFile(templateFilePath, "utf8");

    const template = hbs.compile(templateFile, {noEscape: true});
    const output = template(data);

    await fs.writeFile(outputFilePath, output);

    console.log(`Successfully compiled ${templateFilePath} to ${outputFilePath}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})(process.argv.slice(2));
