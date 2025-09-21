@echo off
echo 🚀 Configuration du frontend YŌVO Talent Nexus...

echo.
echo 📋 Vérification de Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js n'est pas installé!
    echo.
    echo 📥 Veuillez installer Node.js depuis: https://nodejs.org/
    echo 🔄 Redémarrez ce script après l'installation
    pause
    exit /b 1
)

echo ✅ Node.js détecté!
echo.

echo 📦 Installation des dépendances...
cd frontend
npm install

if %errorlevel% neq 0 (
    echo ❌ Erreur lors de l'installation des dépendances
    pause
    exit /b 1
)

echo ✅ Dépendances installées avec succès!
echo.

echo 🔧 Configuration des variables d'environnement...
if not exist .env (
    copy .env.example .env
    echo ✅ Fichier .env créé
) else (
    echo ✅ Fichier .env existe déjà
)

echo.
echo 🎉 Configuration terminée!
echo.
echo Pour démarrer le frontend:
echo 1. cd frontend
echo 2. npm run dev
echo.
echo Pour démarrer le backend:
echo 1. cd backend
echo 2. php artisan serve
echo.
pause

