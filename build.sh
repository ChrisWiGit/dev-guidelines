#!/bin/bash

# fail on error, shw all commands
set -e

currentDir=$(pwd)

cd ./.ops/hbscli
npm install
cd $currentDir

function buildLang {
  langDir=$1
  cd $langDir

  echo "Processing ${langDir}/headlines.json"
  node ../../.ops/headliner/index.js .

  echo "Processing ${langDir}/allrules.md.hbs"
  
  hbs="../../.ops/hbscli/index.js"

  node $hbs headlines.json allrules.md.hbs allrules.md
  cd $currentDir
}

echo "Building all languages..."

echo "Building German..."
buildLang guidelines/de-DE

cd $currentDir
echo "Done."