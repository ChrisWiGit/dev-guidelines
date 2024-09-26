# dev-guidelines

Coding guidelines for software development projects

## Introduction

This project uses vitepress to generate a static site with markdown files.

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

## Addendum

Due to the package hbs-cli being unmaintained, the devependency global-promise in Version 6 had to be added to the package.json. This is a temporary solution until the package hbs-cli is updated.