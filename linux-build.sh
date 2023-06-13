#!/bin/bash

echo "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<Building client..."
cd UI
rm -rf "./dist"
rm -rf "./node_modules"
npm install
npm run build

echo "GO TO API AND REBUILD"
cd ../api
rm -rf "./node_modules"
rm -rf "./public"
npm install

echo "MOVE CLIENT BUILD TO API/PUBLIC"
mv ../UI/dist ./public
cd ..
