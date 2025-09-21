<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'role' => 'required|in:young,provider',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'bio' => $request->role === 'young' ? 'Jeune talent passionné utilisant YŌVO HUB' : 'Porteur de projet utilisant YŌVO HUB',
            'location' => 'Lomé, Togo',
        ]);

        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
            'role' => 'required|in:young,provider',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Les identifiants fournis sont incorrects.'],
            ]);
        }

        if ($user->role !== $request->role) {
            throw ValidationException::withMessages([
                'role' => ['Le rôle sélectionné ne correspond pas à votre compte.'],
            ]);
        }

        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Déconnexion réussie']);
    }

    public function me(Request $request)
    {
        return response()->json($request->user());
    }

    public function updateProfile(Request $request)
    {
        $request->validate([
            'name' => 'sometimes|string|max:255',
            'bio' => 'sometimes|string|max:1000',
            'location' => 'sometimes|string|max:255',
            'phone' => 'sometimes|string|max:20|regex:/^\+?[1-9]\d{1,14}$/',
            'whatsapp' => 'sometimes|string|max:20|regex:/^\+?[1-9]\d{1,14}$/',
            'skills' => 'sometimes|array',
            'skills.*' => 'string|max:100',
        ]);

        $user = $request->user();
        
        // Préparer les données à mettre à jour
        $updateData = $request->only(['name', 'bio', 'location', 'phone', 'whatsapp']);
        
        // Gérer les compétences si elles sont fournies
        if ($request->has('skills')) {
            $updateData['skills'] = json_encode($request->skills);
        }
        
        $user->update($updateData);

        return response()->json([
            'user' => $user,
            'message' => 'Profil mis à jour avec succès'
        ]);
    }
    
    public function uploadProfilePhoto(Request $request)
    {
        $request->validate([
            'photo' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);
        
        $user = $request->user();
        
        if ($request->hasFile('photo')) {
            // Supprimer l'ancienne photo si elle existe
            if ($user->photo && file_exists(storage_path('app/public/profiles/' . $user->photo))) {
                unlink(storage_path('app/public/profiles/' . $user->photo));
            }
            
            $photoName = time() . '.' . $request->photo->extension();
            $request->photo->storeAs('public/profiles', $photoName);
            
            $user->photo = $photoName;
            $user->save();
            
            return response()->json([
                'success' => true,
                'photo' => asset('storage/profiles/' . $photoName),
                'message' => 'Photo de profil mise à jour avec succès'
            ]);
        }
        
        return response()->json([
            'success' => false,
            'message' => 'Aucune photo n\'a été fournie'
        ], 400);
    }
    
    public function captureProfilePhoto(Request $request)
    {
        $request->validate([
            'photo_data' => 'required|string',
        ]);
        
        $user = $request->user();
        
        // Décoder l'image base64
        $image = $request->photo_data;
        $image = str_replace('data:image/png;base64,', '', $image);
        $image = str_replace('data:image/jpeg;base64,', '', $image);
        $image = str_replace(' ', '+', $image);
        
        // Supprimer l'ancienne photo si elle existe
        if ($user->photo && file_exists(storage_path('app/public/profiles/' . $user->photo))) {
            unlink(storage_path('app/public/profiles/' . $user->photo));
        }
        
        $photoName = time() . '.png';
        $path = storage_path('app/public/profiles/' . $photoName);
        
        // Créer le répertoire s'il n'existe pas
        if (!file_exists(storage_path('app/public/profiles'))) {
            mkdir(storage_path('app/public/profiles'), 0755, true);
        }
        
        file_put_contents($path, base64_decode($image));
        
        $user->photo = $photoName;
        $user->save();
        
        return response()->json([
            'success' => true,
            'photo' => asset('storage/profiles/' . $photoName),
            'message' => 'Photo de profil capturée avec succès'
        ]);
    }
    
    public function forgotPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
        ]);

        // Générer un code de réinitialisation à 6 chiffres
        $resetCode = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);
        
        // Stocker le code dans la base de données
        DB::table('password_reset_tokens')->updateOrInsert(
            ['email' => $request->email],
            [
                'token' => Hash::make($resetCode),
                'created_at' => now()
            ]
        );
        
        // Envoyer l'email avec le code
        $user = User::where('email', $request->email)->first();
        
        // Ici, vous devriez envoyer un email avec le code
        // Pour l'instant, nous allons simplement retourner le code pour les tests
        // Dans un environnement de production, vous devriez utiliser Mail::send()
        
        return response()->json([
            'message' => 'Un code de réinitialisation a été envoyé à votre adresse email.',
            'reset_code' => $resetCode, // À supprimer en production
        ]);
    }
    
    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'code' => 'required|string|size:6',
            'password' => 'required|string|min:6|confirmed',
        ]);
        
        // Vérifier si le code est valide
        $resetRecord = DB::table('password_reset_tokens')
            ->where('email', $request->email)
            ->first();
            
        if (!$resetRecord || !Hash::check($request->code, $resetRecord->token)) {
            return response()->json([
                'message' => 'Le code de réinitialisation est invalide.'
            ], 400);
        }
        
        // Vérifier si le code n'a pas expiré (24 heures)
        if (now()->diffInHours($resetRecord->created_at) > 24) {
            return response()->json([
                'message' => 'Le code de réinitialisation a expiré.'
            ], 400);
        }
        
        // Mettre à jour le mot de passe
        $user = User::where('email', $request->email)->first();
        $user->password = Hash::make($request->password);
        $user->save();
        
        // Supprimer le token
        DB::table('password_reset_tokens')
            ->where('email', $request->email)
            ->delete();
            
        return response()->json([
            'message' => 'Votre mot de passe a été réinitialisé avec succès.'
        ]);
    }
}
