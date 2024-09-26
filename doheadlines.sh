#!/bin/sh
# process all md Files with ./.ops/headliner/index.js

cd guidelines/de-DE

node ../../.ops/headliner/index.js .

echo "Processing allrules.md.hbs"
# json headlines.json als input und die datei allrules.md.hbs als template
npx hbs -D headlines.json -e md allrules.md.hbs
mv allrules.md.md allrules.md

cd ..