@echo off
echo Application automatique des descriptions GitHub
echo ==============================================
echo.
echo Ce script va appliquer les descriptions generees a vos repositories GitHub
echo.
echo Prerequisites:
echo 1. Node.js installe
echo 2. Token GitHub configure (voir instructions dans le script)
echo.
echo Appuyez sur une touche pour continuer ou Ctrl+C pour annuler...
pause > nul

node apply_descriptions.js

echo.
echo Termine ! Appuyez sur une touche pour fermer.
pause > nul