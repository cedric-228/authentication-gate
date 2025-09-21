@echo off
echo 🚀 Démarrage YŌVO Talent Nexus
echo ==============================

echo.
echo 📋 Vérification des prérequis...

:: Vérifier PHP
php --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ PHP non installé
    echo Téléchargez PHP depuis https://php.net
    pause
    exit /b 1
) else (
    echo ✅ PHP installé
)

:: Vérifier Composer
composer --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Composer non installé
    echo Téléchargez Composer depuis https://getcomposer.org
    pause
    exit /b 1
) else (
    echo ✅ Composer installé
)

:: Vérifier Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️ Node.js non installé
    echo Téléchargez Node.js depuis https://nodejs.org
    echo Puis relancez ce script
    pause
    exit /b 1
) else (
    echo ✅ Node.js installé
)

echo.
echo 🔧 Configuration du Backend...
cd backend

:: Installer les dépendances Laravel
echo Installation des dépendances Laravel...
composer install --no-dev --optimize-autoloader

:: Générer la clé d'application
echo Génération de la clé d'application...
php artisan key:generate --force

:: Créer la base de données
echo Configuration de la base de données...
if not exist "database\database.sqlite" (
    echo. > database\database.sqlite
)

:: Exécuter les migrations
echo Exécution des migrations...
php artisan migrate --force

:: Peupler la base de données
echo Peuplement de la base de données...
php artisan db:seed --force

echo.
echo 📱 Configuration du Frontend...
cd ..\frontend

:: Installer les dépendances React
echo Installation des dépendances React...
npm install

echo.
echo 🎉 Configuration terminée!
echo.
echo Pour démarrer le projet:
echo 1. Ouvrez un terminal et tapez: cd backend ^&^& php artisan serve
echo 2. Ouvrez un autre terminal et tapez: cd frontend ^&^& npm run dev
echo.
echo Accès:
echo - Backend: http://localhost:8000
echo - Frontend: http://localhost:5173
echo.
pause
