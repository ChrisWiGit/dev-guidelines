#!/bin/sh
# This script builds the headlines and rules for all languages
# It is intended to be run from the root of the repository
# It requires node.js to be installed
# It creates a headlines.json file in each language directory
# It creates a allrules.md file in each language directory
# It uses the .ops/hbscli/index.js script to generate the allrules.md file


# fail on error, shw all commands
set -e

currentDir=$(pwd)

# cd ./.ops/hbscli
# npm install
# cd ./.ops/glossary
# npm install
# cd ./.ops/headliner
# npm install
cd $currentDir

function buildLang {
  langDir=$1
  cd $langDir

  echo "Processing ${langDir}/headlines.json"
  node ../../.ops/headliner/index.js .

  echo "Processing ${langDir}/allrules.md.hbs"  
  hbs="../../.ops/hbscli/index.js"

  node $hbs headlines.json allrules.md.hbs allrules.md

  echo "Processing ${langDir}/glossary.json"
  node ../../.ops/glossary/index.js .

  node $hbs glossary.json glossary.md.hbs glossary.md

  echo "Processing ${langDir}/stats.md"
  node ../../.ops/statistics/index.js .

  node $hbs stats.json wordcount.md.hbs wordcount.md

  cd $currentDir
}

echo "Building all languages..."

echo "Building German..."
buildLang guidelines/de-DE

cd $currentDir
echo "Done."