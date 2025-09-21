<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Mission;
use App\Models\Badge;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // Créer des utilisateurs de démonstration
        $youngUser = User::create([
            'name' => 'Jeune Talent',
            'email' => 'young@demo.com',
            'password' => Hash::make('password'),
            'role' => 'young',
            'bio' => 'Jeune talent passionné utilisant YŌVO HUB',
            'location' => 'Lomé, Togo',
        ]);

        $providerUser = User::create([
            'name' => 'Porteur de Projet',
            'email' => 'provider@demo.com',
            'password' => Hash::make('password'),
            'role' => 'provider',
            'bio' => 'Porteur de projet utilisant YŌVO HUB',
            'location' => 'Lomé, Togo',
        ]);

        // Créer des missions de démonstration
        $missions = [
            [
                'title' => 'Créer un logo pour notre association de voyage de plage',
                'description' => 'Nous recherchons un graphiste créatif pour concevoir un logo moderne et attrayant pour notre association de tourisme durable au Togo.',
                'category' => 'Graphisme',
                'duration' => '1 semaine',
                'is_paid' => true,
                'amount' => '50 000 FCFA',
                'skills' => ['Créativité', 'Adobe Illustrator', 'Branding'],
                'location' => 'Lomé',
                'organization' => 'EcoTravel Togo',
                'deadline' => now()->addDays(30),
                'user_id' => $providerUser->id,
            ],
            [
                'title' => 'Développeur mobile freelance iOS/Android',
                'description' => 'Développement d\'une application mobile pour la gestion des micro-finances rurales. Projet à fort impact social.',
                'category' => 'Développement',
                'duration' => '2 mois',
                'is_paid' => true,
                'amount' => '600 000 FCFA',
                'skills' => ['React Native', 'iOS', 'Android', 'API Integration'],
                'location' => 'Remote',
                'organization' => 'FinTech Afrique',
                'deadline' => now()->addDays(45),
                'user_id' => $providerUser->id,
            ],
            [
                'title' => 'Community Manager pour startup EdTech',
                'description' => 'Gérer les réseaux sociaux et créer du contenu engageant pour promouvoir l\'éducation numérique en Afrique.',
                'category' => 'Communication',
                'duration' => '3 mois',
                'is_paid' => true,
                'amount' => '120 000 FCFA/mois',
                'skills' => ['Social Media', 'Content Creation', 'Canva'],
                'location' => 'Lomé',
                'organization' => 'EduTech Solutions',
                'deadline' => now()->addDays(20),
                'user_id' => $providerUser->id,
            ],
            [
                'title' => 'Mission bénévole - Éducation rurale',
                'description' => 'Soutenir l\'alphabétisation dans les villages ruraux du Togo. Formation et accompagnement des enfants.',
                'category' => 'Terrain',
                'duration' => '1 mois',
                'is_paid' => false,
                'amount' => 'Hébergement fourni',
                'skills' => ['Pédagogie', 'Français', 'Patience'],
                'location' => 'Kpalimé',
                'organization' => 'Alpha B - Togo',
                'deadline' => now()->addDays(25),
                'user_id' => $providerUser->id,
            ],
            [
                'title' => 'Comptable projet ONG - GRET',
                'description' => 'Gérer la comptabilité d\'un projet de développement rural. Expérience en comptabilité associative requise.',
                'category' => 'Gestion',
                'duration' => '6 mois',
                'is_paid' => true,
                'amount' => 'À négocier',
                'skills' => ['Comptabilité', 'Excel', 'Gestion budgétaire'],
                'location' => 'Lomé',
                'organization' => 'GRET Togo',
                'deadline' => now()->addDays(40),
                'user_id' => $providerUser->id,
            ],
            [
                'title' => 'Consultant climat - FAO',
                'description' => 'Expertise technique pour projet d\'adaptation au changement climatique. Mission de conseil et formation.',
                'category' => 'Consultance',
                'duration' => '4 mois',
                'is_paid' => true,
                'amount' => 'À négocier (international)',
                'skills' => ['Environnement', 'Analyse de données', 'Rapport technique'],
                'location' => 'Lomé + terrain',
                'organization' => 'FAO Togo',
                'deadline' => now()->addDays(50),
                'user_id' => $providerUser->id,
            ],
        ];

        foreach ($missions as $missionData) {
            Mission::create($missionData);
        }

        // Créer quelques badges pour le jeune utilisateur
        $badges = [
            [
                'name' => 'Premier Pas',
                'category' => 'Débutant',
                'icon' => 'star',
                'color' => 'gold',
                'date_earned' => now()->subDays(5),
                'user_id' => $youngUser->id,
            ],
            [
                'name' => 'Créatif',
                'category' => 'Design',
                'icon' => 'palette',
                'color' => 'blue',
                'date_earned' => now()->subDays(3),
                'user_id' => $youngUser->id,
            ],
        ];

        foreach ($badges as $badgeData) {
            Badge::create($badgeData);
        }
    }
}
