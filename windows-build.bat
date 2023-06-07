::===============================================================
:: Build client and move it to the api/ to server statically
::===============================================================


::===============================================================
:: Step 1: Build client
::===============================================================

echo "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<Building client..."
CD UI
RMDIR ".\dist" /S /Q 
RMDIR ".\node_modules" /S /Q
CALL npm install 
CALL npm run build

echo "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<Moving client static files to PUBLIC folder"
CD ../api
RMDIR ".\node_modules" /S /Q 
RMDIR ".\public" /S /Q
CALL npm install
MOVE "..\UI\dist" ".\public"
CD ..
XCOPY /E /I /Y "api" "public"