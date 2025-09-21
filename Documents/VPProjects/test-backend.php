<?php
// Test simple du backend Laravel
echo "🚀 Test du Backend YŌVO Talent Nexus\n";
echo "=====================================\n\n";

// Vérifier PHP
echo "✅ PHP Version: " . PHP_VERSION . "\n";

// Vérifier Composer
if (file_exists('backend/composer.json')) {
    echo "✅ Fichier composer.json trouvé\n";
} else {
    echo "❌ Fichier composer.json manquant\n";
}

// Vérifier les modèles
$models = [
    'backend/app/Models/User.php',
    'backend/app/Models/Mission.php',
    'backend/app/Models/AISuggestion.php',
    'backend/app/Models/Application.php',
    'backend/app/Models/Badge.php'
];

echo "\n📁 Vérification des modèles:\n";
foreach ($models as $model) {
    if (file_exists($model)) {
        echo "✅ $model\n";
    } else {
        echo "❌ $model\n";
    }
}

// Vérifier les contrôleurs
$controllers = [
    'backend/app/Http/Controllers/AuthController.php',
    'backend/app/Http/Controllers/MissionController.php',
    'backend/app/Http/Controllers/AIController.php'
];

echo "\n🎮 Vérification des contrôleurs:\n";
foreach ($controllers as $controller) {
    if (file_exists($controller)) {
        echo "✅ $controller\n";
    } else {
        echo "❌ $controller\n";
    }
}

// Vérifier les migrations
$migrations = [
    'backend/database/migrations/2024_01_01_000001_create_users_table.php',
    'backend/database/migrations/2024_01_01_000002_create_missions_table.php',
    'backend/database/migrations/2024_01_01_000003_create_badges_table.php',
    'backend/database/migrations/2024_01_01_000004_create_applications_table.php',
    'backend/database/migrations/2024_01_01_000005_create_ai_suggestions_table.php'
];

echo "\n🗄️ Vérification des migrations:\n";
foreach ($migrations as $migration) {
    if (file_exists($migration)) {
        echo "✅ $migration\n";
    } else {
        echo "❌ $migration\n";
    }
}

echo "\n🎉 Test terminé!\n";
echo "\nPour installer les dépendances Laravel:\n";
echo "1. cd backend\n";
echo "2. composer install\n";
echo "3. php artisan key:generate\n";
echo "4. php artisan migrate\n";
echo "5. php artisan db:seed\n";
echo "6. php artisan serve\n";
?>

