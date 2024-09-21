#!/bin/sh
# This script will be executed by the docker container every time it starts
# In this way we make sure that the latest version of the guidelines is always available.
git clone https://github.com/ChrisWiGit/dev-guidelines.git /guidelines
cd guidelines
npm install
npm run serve
