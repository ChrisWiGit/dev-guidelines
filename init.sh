#!/bin/sh
set -ex

node -v

echo "Base"
rm package-lock.json || true
rm -rf node_modules || true
npm install
npm audit fix || true

cd .ops

echo "HBS"
cd hbscli
rm package-lock.json || true
rm -rf node_modules || true
npm install
npm audit fix || true

echo "headliner"
cd ../headliner
rm package-lock.json || true
rm -rf node_modules || true
npm install
npm audit fix || true

echo "glossary"
cd ../glossary
rm package-lock.json || true
rm -rf node_modules || true
npm install
npm audit fix || true

echo "statistics"
cd ../statistics
rm package-lock.json || true
rm -rf node_modules || true
npm install
npm audit fix || true

echo "todos"
cd ../todos
rm -rf node_modules || true
rm package-lock.json || true
npm install
npm audit fix || true

cd ../..