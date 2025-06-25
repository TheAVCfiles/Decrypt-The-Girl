#!/bin/bash
set -e

echo "Cleaning previous builds..."
rm -rf dist build

echo "Installing dependencies..."
npm install

echo "Compiling TypeScript..."
npx tsc

echo "Installing production dependencies only..."
npm ci --only=production

echo "Cleaning up development files..."
rm -rf src test *.log

echo "Project is ready for deployment in the dist/