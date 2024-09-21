#!/bin/sh
# git clone nach /guidelines
git clone https://github.com/ChrisWiGit/dev-guidelines.git /guidelines
cd guidelines
npm install
npm run serve
