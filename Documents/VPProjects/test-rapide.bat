@echo off
echo 🚀 Test Rapide YŌVO Talent Nexus
echo ================================

echo.
echo 📁 Vérification des fichiers...
if exist "backend\app\Models\User.php" (
    echo ✅ Backend Laravel: OK
) else (
    echo ❌ Backend Laravel: Manquant
)

if exist "frontend\src\App.tsx" (
    echo ✅ Frontend React: OK
) else (
    echo ❌ Frontend React: Manquant
)

echo.
echo 🎯 Aperçu du projet:
echo ===================
echo.
echo 📱 FRONTEND (React + TypeScript)
echo - Interface utilisateur moderne
echo - Authentification (Login/Register)
echo - Gestion des missions
echo - Robot IA intégré
echo - Design responsive
echo.
echo 🔧 BACKEND (Laravel + API)
echo - API REST complète
echo - Authentification Sanctum
echo - Gestion des missions
echo - Robot IA avec OpenAI
echo - Base de données SQLite
echo.
echo 🤖 FONCTIONNALITÉS IA
echo - Suggestions de projets personnalisées
echo - Chat avec l'assistant IA
echo - Génération automatique de missions
echo.
echo 🌐 POUR DÉMARRER:
echo 1. Backend: cd backend ^&^& php artisan serve
echo 2. Frontend: cd frontend ^&^& npm run dev
echo.
echo 🎉 Projet prêt à l'utilisation!
pause
