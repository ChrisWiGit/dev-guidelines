# dev-guidelines

Coding guidelines for software development projects

## Introduction

This project uses vitepress to generate a static site with markdown files.

You'll find a browsable version of the site at [https://chriswigit.github.io/dev-guidelines/](https://chriswigit.github.io/dev-guidelines/).

## Installation

```bash
npm install
```

## Run the development server

```bash
npm run docs:dev
```

Then follow the instructions in the console.

## Build the static site

```bash
npm run docs:build
```

## Preview the static site

```bash
npm run docs:preview
```

## Build Script

The build script is used to generate `headlines.json`, `allrules.md`, `glossary.md`, `stats.md`, and `todos.md` files for each language.
In some folders there are Handlebars templates that are used to generate the markdown files.

>> Do not edit the handlebars templates directly, instead use the build script to generate the files.

```bash
./build.sh
```

## Deployment

1. All markdown files are also processed by a nodejs custom script that creates the `allrules.md` file.
2. All markdown files are processed to extract terms and definitions for the glossary.

See `.op` folder for the scripts.

## Credits/Attributions

- [Vitepress](https://github.com/vuejs/vitepress)
- [Icons from FreePik](https://www.freepik.com/)
