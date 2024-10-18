#!/bin/sh
set -ex

npm install
cd .ops
cd hbscli
npm install
cd ../headliner
npm install
cd ../glossary
npm install
cd ../statistics
npm install