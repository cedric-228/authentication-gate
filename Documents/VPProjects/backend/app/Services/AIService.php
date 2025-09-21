<?php

namespace App\Services;

use App\Models\User;
use App\Models\AISuggestion;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class AIService
{
    private $apiKey;
    private $apiUrl;

    public function __construct()
    {
        $this->apiKey = config('services.openai.api_key');
        $this->apiUrl = 'https://api.openai.com/v1/chat/completions';
    }

    public function generateSuggestions(User $user, int $count = 3): array
    {
        try {
            $prompt = $this->buildPrompt($user);
            
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $this->apiKey,
                'Content-Type' => 'application/json',
            ])->post($this->apiUrl, [
                'model' => 'gpt-3.5-turbo',
                'messages' => [
                    [
                        'role' => 'system',
                        'content' => 'Tu es un assistant IA spécialisé dans la création de mini-projets pour jeunes talents africains. Tu génères des suggestions de missions concrètes, réalisables et motivantes.'
                    ],
                    [
                        'role' => 'user',
                        'content' => $prompt
                    ]
                ],
                'max_tokens' => 1500,
                'temperature' => 0.8,
            ]);

            if ($response->successful()) {
                $content = $response->json()['choices'][0]['message']['content'];
                return $this->parseSuggestions($content, $user);
            }

            Log::error('OpenAI API Error: ' . $response->body());
            return $this->getFallbackSuggestions($user, $count);

        } catch (\Exception $e) {
            Log::error('AI Service Error: ' . $e->getMessage());
            return $this->getFallbackSuggestions($user, $count);
        }
    }

    private function buildPrompt(User $user): string
    {
        $role = $user->role === 'young' ? 'jeune talent' : 'porteur de projet';
        $location = $user->location ?? 'Afrique de l\'Ouest';
        
        return "Génère {$count} mini-projets personnalisés pour un {$role} basé à {$location}. 
        
        Profil utilisateur:
        - Nom: {$user->name}
        - Rôle: {$role}
        - Localisation: {$location}
        - Bio: {$user->bio}
        
        Créer des projets qui:
        1. Sont adaptés au contexte africain
        2. Ont un impact social positif
        3. Permettent d'acquérir de nouvelles compétences
        4. Sont réalisables en 1-4 semaines
        5. Mélangent projets rémunérés et bénévoles
        
        Format de réponse (JSON):
        [
            {
                \"title\": \"Titre du projet\",
                \"description\": \"Description détaillée\",
                \"category\": \"Catégorie\",
                \"duration\": \"Durée\",
                \"is_paid\": true/false,
                \"amount\": \"Montant ou 'Bénévole'\",
                \"skills\": [\"compétence1\", \"compétence2\"],
                \"location\": \"Lieu\",
                \"difficulty_level\": \"débutant/intermédiaire/avancé\"
            }
        ]";
    }

    private function parseSuggestions(string $content, User $user): array
    {
        try {
            // Extraire le JSON de la réponse
            $jsonStart = strpos($content, '[');
            $jsonEnd = strrpos($content, ']') + 1;
            $jsonString = substr($content, $jsonStart, $jsonEnd - $jsonStart);
            
            $suggestions = json_decode($jsonString, true);
            
            if (!is_array($suggestions)) {
                throw new \Exception('Invalid JSON format');
            }

            $savedSuggestions = [];
            foreach ($suggestions as $suggestion) {
                $aiSuggestion = AISuggestion::create([
                    'user_id' => $user->id,
                    'title' => $suggestion['title'],
                    'description' => $suggestion['description'],
                    'category' => $suggestion['category'],
                    'duration' => $suggestion['duration'],
                    'is_paid' => $suggestion['is_paid'],
                    'amount' => $suggestion['amount'],
                    'skills' => $suggestion['skills'],
                    'location' => $suggestion['location'],
                    'difficulty_level' => $suggestion['difficulty_level'],
                    'ai_generated' => true,
                    'generated_at' => now(),
                ]);
                
                $savedSuggestions[] = $aiSuggestion;
            }

            return $savedSuggestions;

        } catch (\Exception $e) {
            Log::error('Error parsing AI suggestions: ' . $e->getMessage());
            return $this->getFallbackSuggestions($user, 3);
        }
    }

    private function getFallbackSuggestions(User $user, int $count): array
    {
        $fallbackSuggestions = [
            [
                'title' => 'Créer un site web pour une association locale',
                'description' => 'Développer un site web simple et moderne pour une association de votre communauté. Parfait pour pratiquer le développement web tout en aidant une cause locale.',
                'category' => 'Développement',
                'duration' => '2 semaines',
                'is_paid' => false,
                'amount' => 'Bénévole',
                'skills' => ['HTML', 'CSS', 'JavaScript', 'WordPress'],
                'location' => $user->location ?? 'Lomé',
                'difficulty_level' => 'débutant',
            ],
            [
                'title' => 'Organiser un atelier de sensibilisation numérique',
                'description' => 'Créer et animer un atelier pour enseigner les bases du numérique aux personnes âgées de votre quartier.',
                'category' => 'Formation',
                'duration' => '1 semaine',
                'is_paid' => false,
                'amount' => 'Bénévole',
                'skills' => ['Communication', 'Pédagogie', 'Patience'],
                'location' => $user->location ?? 'Lomé',
                'difficulty_level' => 'intermédiaire',
            ],
            [
                'title' => 'Créer du contenu pour les réseaux sociaux d\'une PME',
                'description' => 'Aider une petite entreprise locale à améliorer sa présence en ligne en créant du contenu engageant.',
                'category' => 'Communication',
                'duration' => '3 semaines',
                'is_paid' => true,
                'amount' => '75 000 FCFA',
                'skills' => ['Social Media', 'Créativité', 'Canva', 'Marketing'],
                'location' => $user->location ?? 'Lomé',
                'difficulty_level' => 'intermédiaire',
            ],
        ];

        $savedSuggestions = [];
        for ($i = 0; $i < min($count, count($fallbackSuggestions)); $i++) {
            $suggestion = $fallbackSuggestions[$i];
            $aiSuggestion = AISuggestion::create([
                'user_id' => $user->id,
                'title' => $suggestion['title'],
                'description' => $suggestion['description'],
                'category' => $suggestion['category'],
                'duration' => $suggestion['duration'],
                'is_paid' => $suggestion['is_paid'],
                'amount' => $suggestion['amount'],
                'skills' => $suggestion['skills'],
                'location' => $suggestion['location'],
                'difficulty_level' => $suggestion['difficulty_level'],
                'ai_generated' => false,
                'generated_at' => now(),
            ]);
            
            $savedSuggestions[] = $aiSuggestion;
        }

        return $savedSuggestions;
    }
}
