#!/bin/bash

echo "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<Building client..."
cd UI
rm -rf "./dist"
rm -rf "./node_modules"
npm install
npm run build

echo "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<Moving client static files to PUBLIC folder"
cd ../api
rm -rf "./node_modules"
rm -rf "./public"
npm install
mv "../UI/dist" "./public"
