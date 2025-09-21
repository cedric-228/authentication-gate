@echo off
title Lancer Projet Complet Yovo Talent Nexus

echo ===============================
echo Vérification de XAMPP et MySQL
echo ===============================

REM Vérifie si MySQL est déjà lancé (port 3306)
netstat -ano | findstr :3306 >nul
if %errorlevel%==0 (
    echo MySQL semble déjà lancé.
) else (
    echo Démarrage de XAMPP MySQL...
    REM Modifie le chemin si ton XAMPP est ailleurs
    start "" "C:\xampp\xampp-control.exe"
    echo Attendez quelques secondes que MySQL démarre...
    timeout /t 10
)

echo ===============================
echo Backend Laravel
echo ===============================
cd backend

if not exist vendor (
    echo Installation des dépendances PHP...
    composer install
)

php artisan key:generate
php artisan migrate
php artisan db:seed

start cmd /k "php artisan serve"

echo ===============================
echo Frontend NPM
echo ===============================
cd ../frontend

if not exist node_modules (
    echo Installation des dépendances npm...
    npm install
)

start cmd /k "npm run dev"

echo ===============================
echo Projet lancé !
echo Backend : http://127.0.0.1:8000
echo Frontend : URL affichée par npm run dev
pause


