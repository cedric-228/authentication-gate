import { useState, useRef } from 'react';
import { Edit, Camera, Star, Award, MapPin, Mail, Calendar, BookOpen, Trophy, Target, Upload, X, Phone, MessageCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import BadgeDisplay from '../components/BadgeDisplay';

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [photoMode, setPhotoMode] = useState<'upload' | 'capture' | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  
  const [editData, setEditData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    location: user?.location || '',
    skills: user?.skills?.join(', ') || '',
    phone: user?.phone || '',
    whatsapp: user?.whatsapp || ''
  });

  // Mock data for demonstration
  const badges = [
    { 
      id: 1, 
      name: 'Développeur Web Junior', 
      category: 'Développement Web & Mobile',
      score: 85,
      date: '15 Jan 2025',
      userPhoto: user?.photo,
      userName: user?.name || 'Utilisateur'
    },
    { 
      id: 2, 
      name: 'Graphiste Confirmé', 
      category: 'Graphisme et Design',
      score: 92,
      date: '10 Jan 2025',
      userPhoto: user?.photo,
      userName: user?.name || 'Utilisateur'
    },
    { 
      id: 3, 
      name: 'Community Manager', 
      category: 'Gestion Communautaire / Communication',
      score: 78,
      date: '05 Jan 2025',
      userPhoto: user?.photo,
      userName: user?.name || 'Utilisateur'
    },
  ];

  const completedMissions = [
    {
      id: 1,
      title: 'Création de logo pour startup',
      organization: 'TechStart Lomé',
      rating: 5,
      comment: 'Excellent travail, très créatif et professionnel!',
      date: '2025-01-12',
      category: 'Graphisme'
    },
    {
      id: 2,
      title: 'Développement site web vitrine',
      organization: 'Cabinet Avocat Togo',
      rating: 4,
      comment: 'Bon travail, livraison dans les délais.',
      date: '2025-01-08',
      category: 'Développement'
    },
    {
      id: 3,
      title: 'Gestion réseaux sociaux',
      organization: 'Restaurant Le Palmier',
      rating: 5,
      comment: 'Augmentation significative de l\'engagement!',
      date: '2025-01-03',
      category: 'Communication'
    }
  ];

  const handleSave = () => {
    updateProfile({
      name: editData.name,
      bio: editData.bio,
      location: editData.location,
      skills: editData.skills.split(',').map(s => s.trim()).filter(s => s),
      phone: editData.phone,
      whatsapp: editData.whatsapp
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      name: user?.name || '',
      bio: user?.bio || '',
      location: user?.location || '',
      skills: user?.skills?.join(', ') || '',
      phone: user?.phone || '',
      whatsapp: user?.whatsapp || ''
    });
    setIsEditing(false);
  };

  // Photo handling functions
  const openPhotoModal = (mode: 'upload' | 'capture') => {
    setPhotoMode(mode);
    setShowPhotoModal(true);
    if (mode === 'capture') {
      startCamera();
    }
  };

  const closePhotoModal = () => {
    setShowPhotoModal(false);
    setPhotoMode(null);
    setSelectedFile(null);
    setPreviewUrl(null);
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Impossible d\'accéder à la caméra. Veuillez vérifier vos permissions.');
      closePhotoModal();
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], 'camera-photo.jpg', { type: 'image/jpeg' });
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(blob));
          }
        }, 'image/jpeg');
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const uploadPhoto = async () => {
    if (!selectedFile) return;
    
    try {
      // Vérifier la taille du fichier (max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        alert('La photo doit faire moins de 5MB');
        return;
      }
      
      // Vérifier le type de fichier
      if (!selectedFile.type.startsWith('image/')) {
        alert('Veuillez sélectionner un fichier image valide');
        return;
      }
      
      // Convertir l'image en base64 pour le stockage local
      const reader = new FileReader();
      reader.onloadend = () => {
        // Mettre à jour le profil avec l'image en base64
        if (typeof reader.result === 'string') {
          updateProfile({ photo: reader.result });
          closePhotoModal();
          // Afficher un message de succès
          alert('Photo de profil mise à jour avec succès!');
        }
      };
      reader.onerror = () => {
        alert('Erreur lors de la lecture du fichier');
      };
      reader.readAsDataURL(selectedFile);
    } catch (error) {
      console.error('Error processing photo:', error);
      alert('Erreur lors du traitement de la photo. Veuillez réessayer.');
    }
  };

  const averageRating = completedMissions.reduce((acc, mission) => acc + mission.rating, 0) / completedMissions.length;

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Photo Modal */}
      {showPhotoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">
                {photoMode === 'upload' ? 'Importer une photo' : 'Prendre une photo'}
              </h3>
              <button onClick={closePhotoModal} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>
            
            {photoMode === 'upload' && (
              <div className="space-y-4">
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer"
                     onClick={() => fileInputRef.current?.click()}>
                  <Upload className="h-12 w-12 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">Cliquez pour sélectionner une image</p>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleFileChange}
                  />
                </div>
                
                {previewUrl && (
                  <div className="mt-4">
                    <img src={previewUrl} alt="Aperçu" className="max-h-64 mx-auto rounded-lg" />
                  </div>
                )}
              </div>
            )}
            
            {photoMode === 'capture' && (
              <div className="space-y-4">
                {!previewUrl ? (
                  <div className="relative">
                    <video 
                      ref={videoRef} 
                      autoPlay 
                      playsInline 
                      className="w-full rounded-lg"
                    />
                    <button 
                      onClick={capturePhoto}
                      className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full shadow-lg"
                    >
                      <Camera className="h-6 w-6" />
                    </button>
                  </div>
                ) : (
                  <div className="mt-4">
                    <img src={previewUrl} alt="Photo capturée" className="max-h-64 mx-auto rounded-lg" />
                  </div>
                )}
                <canvas ref={canvasRef} className="hidden" />
              </div>
            )}
            
            <div className="flex justify-between mt-6">
              {!photoMode || previewUrl ? (
                <>
                  <button 
                    onClick={closePhotoModal}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Annuler
                  </button>
                  
                  <div className="space-x-2">
                    {previewUrl && (
                      <button 
                        onClick={uploadPhoto}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        Enregistrer
                      </button>
                    )}
                    
                    {photoMode === 'upload' ? (
                      <button 
                        onClick={() => {
                          setPhotoMode('capture');
                          setPreviewUrl(null);
                          setSelectedFile(null);
                          startCamera();
                        }}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                      >
                        Prendre une photo
                      </button>
                    ) : (
                      <button 
                        onClick={() => {
                          setPhotoMode('upload');
                          setPreviewUrl(null);
                          setSelectedFile(null);
                          if (stream) {
                            stream.getTracks().forEach(track => track.stop());
                            setStream(null);
                          }
                        }}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                      >
                        Importer une photo
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <button 
                  onClick={closePhotoModal}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 ml-auto"
                >
                  Annuler
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-800 to-emerald-600 px-8 py-12">
            <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
              <div className="relative">
                <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg">
                  {user.photo ? (
                    <img src={user.photo} alt={user.name} className="w-32 h-32 rounded-full object-cover" />
                  ) : (
                    <span className="text-4xl font-bold text-blue-800">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <button 
                  onClick={() => openPhotoModal('upload')}
                  className="absolute bottom-2 right-2 bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full shadow-lg transition-colors">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <h1 className="text-3xl font-bold text-white mb-2 md:mb-0">{user.name}</h1>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    {isEditing ? 'Annuler' : 'Modifier le profil'}
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white/90">
                  <div className="flex items-center justify-center md:justify-start">
                    <Trophy className="h-5 w-5 mr-2" />
                    <span>{badges.length} badges obtenus</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start">
                    <Target className="h-5 w-5 mr-2" />
                    <span>{completedMissions.length} missions réalisées</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start">
                    <Star className="h-5 w-5 mr-2 fill-current" />
                    <span>{averageRating.toFixed(1)}/5 étoiles</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            {isEditing ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nom complet</label>
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                  <textarea
                    value={editData.bio}
                    onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Parlez-nous de vous..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Localisation</label>
                  <input
                    type="text"
                    value={editData.location}
                    onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Votre ville, pays"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Compétences (séparées par des virgules)</label>
                  <input
                    type="text"
                    value={editData.skills}
                    onChange={(e) => setEditData({ ...editData, skills: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="JavaScript, React, Design, etc."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                  <input
                    type="tel"
                    value={editData.phone}
                    onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+228 XX XX XX XX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp</label>
                  <input
                    type="tel"
                    value={editData.whatsapp}
                    onChange={(e) => setEditData({ ...editData, whatsapp: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+228 XX XX XX XX"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={handleSave}
                    className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Sauvegarder
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Annuler
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations personnelles</h3>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <Mail className="h-5 w-5 mr-3 text-blue-800" />
                      <span>{user.email}</span>
                    </div>
                    {user.location && (
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-5 w-5 mr-3 text-blue-800" />
                        <span>{user.location}</span>
                      </div>
                    )}
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-5 w-5 mr-3 text-blue-800" />
                      <span>Membre depuis janvier 2025</span>
                    </div>
                    {user.phone && (
                      <div className="flex items-center text-gray-600">
                        <Phone className="h-5 w-5 mr-3 text-emerald-500" />
                        <span>{user.phone}</span>
                      </div>
                    )}
                    {user.whatsapp && (
                      <div className="flex items-center text-gray-600">
                        <MessageCircle className="h-5 w-5 mr-3 text-green-500" />
                        <span>{user.whatsapp}</span>
                      </div>
                    )}
                  </div>
                  
                  {user.bio && (
                    <div className="mt-6">
                      <h4 className="font-medium text-gray-900 mb-2">À propos</h4>
                      <p className="text-gray-600 leading-relaxed">{user.bio}</p>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Compétences</h3>
                  <div className="flex flex-wrap gap-2">
                    {user.skills && user.skills.length > 0 ? (
                      user.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500">Aucune compétence renseignée</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Quiz Section */}
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <BookOpen className="h-6 w-6 mr-2 text-blue-800" />
                Évaluations
              </h2>
              <Link
                to="/quiz"
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Passer un quiz
              </Link>
            </div>
            <p className="text-gray-600 mb-6">
              Testez vos compétences et obtenez des badges pour renforcer votre profil.
            </p>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                <span className="text-gray-700">Développement Web</span>
                <span className="text-sm text-gray-500">Non passé</span>
              </div>
              <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                <span className="text-gray-700">Graphisme</span>
                <span className="text-sm text-emerald-600 font-medium">Validé (85%)</span>
              </div>
              <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                <span className="text-gray-700">Communication</span>
                <span className="text-sm text-emerald-600 font-medium">Validé (78%)</span>
              </div>
            </div>
          </div>

          {/* Badges Section */}
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Award className="h-6 w-6 mr-2 text-blue-800" />
              Badges Obtenus
            </h2>
            
            {badges.length > 0 ? (
              <div className="space-y-6">
              {badges.map((badge) => (
                  <BadgeDisplay
                    key={badge.id}
                    badge={badge}
                    onDownload={() => {
                      // Simuler le téléchargement
                      alert(`Téléchargement du badge "${badge.name}"`);
                    }}
                    onShare={() => {
                      // Simuler le partage
                      if (navigator.share) {
                        navigator.share({
                          title: `Mon badge ${badge.name}`,
                          text: `J'ai obtenu le badge ${badge.name} avec un score de ${badge.score}% !`,
                          url: window.location.href
                        });
                      } else {
                        alert(`Partage du badge "${badge.name}"`);
                      }
                    }}
                  />
              ))}
            </div>
            ) : (
              <div className="text-center py-8">
                <Award className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Aucun badge obtenu pour le moment</p>
                <Link
                  to="/quiz"
                  className="inline-block mt-4 text-blue-800 hover:text-blue-900 font-medium"
                >
                  Passer un quiz pour obtenir votre premier badge
                </Link>
              </div>
            )}
          </div>

          {/* Missions History */}
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Target className="h-6 w-6 mr-2 text-blue-800" />
              Missions Réalisées
            </h2>
            
            <div className="space-y-4">
              {completedMissions.map((mission) => (
                <div key={mission.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-900 text-sm">{mission.title}</h4>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < mission.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-orange-600 text-sm font-medium mb-2">{mission.organization}</p>
                  <p className="text-gray-600 text-sm mb-2">{mission.comment}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">{mission.date}</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {mission.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            {completedMissions.length === 0 && (
              <div className="text-center py-8">
                <Target className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Aucune mission réalisée pour le moment</p>
                <Link
                  to="/missions"
                  className="inline-block mt-4 text-blue-800 hover:text-blue-900 font-medium"
                >
                  Découvrir les missions disponibles
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;