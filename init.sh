#!/bin/sh
set -ex

node -v

rm package-lock.json
npm install

cd .ops

cd hbscli
rm package-lock.json
npm install

cd ../headliner
rm package-lock.json
npm install

cd ../glossary
rm package-lock.json
npm install

cd ../statistics
rm package-lock.json
npm install

cd ../..