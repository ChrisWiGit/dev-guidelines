#!/bin/sh

# fail on error, shw all commands
set -e -x

cd guidelines/de-DE

currentDir=$(pwd)

node ../../.ops/headliner/index.js .

echo "Processing allrules.md.hbs"
cd ../../.ops/hbscli
npm install
cd $currentDir
alias hbs="../../.ops/hbscli/index.js"

node hbs headlines.json allrules.md.hbs allrules.hbs

cd ..