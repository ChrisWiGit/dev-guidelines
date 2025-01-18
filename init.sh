#!/bin/sh
set -ex

node -v

echo "Base"
rm package-lock.json || true
npm install
npm audit fix --force

cd .ops

echo "HBS"
cd hbscli
rm package-lock.json || true
npm install
npm audit fix --force

echo "headliner"
cd ../headliner
rm package-lock.json || true
npm install
npm audit fix --force

echo "glossary"
cd ../glossary
rm package-lock.json || true
npm install
npm audit fix --force

echo "statistics"
cd ../statistics
rm package-lock.json || true
npm install
npm audit fix --force

echo "todos"
cd ../todos
rm package-lock.json || true
npm install
npm audit fix --force

cd ../..