import React, { useState } from 'react';
import { Upload, Calendar, MapPin, DollarSign, Users, Send } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const PostMissionPage = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    duration: '',
    type: 'paid' as 'paid' | 'volunteer' | 'internship',
    skills: '',
    deadline: '',
    budget: '',
    companyLogo: null as File | null
  });
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const categories = [
    'Développement Web & Mobile',
    'Graphisme et Design',
    'Communication & Marketing',
    'Rédaction & Traduction',
    'Photographie & Vidéo',
    'Formation & Éducation',
    'Conseil & Expertise',
    'Assistance Administrative',
    'Événementiel',
    'Autre'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, companyLogo: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 2000);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: '',
      location: '',
      duration: '',
      type: 'paid',
      skills: '',
      deadline: '',
      budget: '',
      companyLogo: null
    });
    setLogoPreview(null);
    setSubmitted(false);
  };

  if (!user || user.role !== 'project-owner') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Accès non autorisé</h1>
          <p className="text-gray-600">Seuls les porteurs de projet peuvent publier des missions.</p>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Send className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Mission publiée avec succès ! 🎉</h1>
            <p className="text-xl text-gray-600 mb-8">
              Votre mission sera visible par tous les talents de YŌVO HUB. 
              Vous recevrez les candidatures par email.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-blue-900 mb-2">Mission : {formData.title}</h3>
              <p className="text-blue-700">Catégorie : {formData.category}</p>
              <p className="text-blue-700">Type : {formData.type === 'paid' ? 'Rémunéré' : formData.type === 'volunteer' ? 'Bénévolat' : 'Stage'}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={resetForm}
                className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Publier une autre mission
              </button>
              <button
                onClick={() => window.location.href = '/missions'}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Voir toutes les missions
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Publier une Mission
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Partagez vos besoins sous forme de micro-missions et trouvez rapidement des talents motivés. 
            Décrivez votre projet en détail pour attirer les meilleurs candidats.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Mission Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Titre de la mission *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Ex: Création d'un logo pour notre association"
              />
            </div>

            {/* Category and Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Catégorie *
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <option value="">Sélectionner une catégorie</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                  Type de mission *
                </label>
                <select
                  id="type"
                  name="type"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.type}
                  onChange={handleInputChange}
                >
                  <option value="paid">Rémunéré</option>
                  <option value="volunteer">Bénévolat</option>
                  <option value="internship">Stage</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description détaillée *
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Décrivez votre projet, vos attentes, les livrables attendus..."
              />
            </div>

            {/* Location and Duration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="h-4 w-4 inline mr-1" />
                  Localisation *
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Ex: Lomé, Togo ou À distance"
                />
              </div>

              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="h-4 w-4 inline mr-1" />
                  Durée estimée *
                </label>
                <input
                  type="text"
                  id="duration"
                  name="duration"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.duration}
                  onChange={handleInputChange}
                  placeholder="Ex: 1 semaine, 2-3 jours, 1 mois"
                />
              </div>
            </div>

            {/* Skills and Budget */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-2">
                  <Users className="h-4 w-4 inline mr-1" />
                  Compétences recherchées *
                </label>
                <input
                  type="text"
                  id="skills"
                  name="skills"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.skills}
                  onChange={handleInputChange}
                  placeholder="Ex: Créativité, Adobe Illustrator, Branding"
                />
              </div>

              {formData.type === 'paid' && (
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                    <DollarSign className="h-4 w-4 inline mr-1" />
                    Budget (FCFA)
                  </label>
                  <input
                    type="number"
                    id="budget"
                    name="budget"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.budget}
                    onChange={handleInputChange}
                    placeholder="Ex: 50000"
                  />
                </div>
              )}
            </div>

            {/* Deadline */}
            <div>
              <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-2">
                Date limite de candidature
              </label>
              <input
                type="date"
                id="deadline"
                name="deadline"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.deadline}
                onChange={handleInputChange}
              />
            </div>

            {/* Company Logo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Logo de l'organisation (optionnel)
              </label>
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  {logoPreview ? (
                    <img
                      src={logoPreview}
                      alt="Logo preview"
                      className="h-16 w-16 rounded-lg object-cover border-2 border-gray-300"
                    />
                  ) : (
                    <div className="h-16 w-16 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                      <Upload className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                </div>
                <label className="cursor-pointer bg-white px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <Upload className="h-4 w-4 inline mr-2" />
                  Télécharger un logo
                  <input
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={handleLogoChange}
                  />
                </label>
              </div>
            </div>

            {/* Preview Section */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Aperçu de votre mission</h3>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    formData.type === 'paid' ? 'bg-emerald-100 text-emerald-800' :
                    formData.type === 'volunteer' ? 'bg-blue-100 text-blue-800' :
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {formData.type === 'paid' ? 'Rémunéré' : 
                     formData.type === 'volunteer' ? 'Bénévolat' : 'Stage'}
                  </span>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  {formData.title || 'Titre de votre mission'}
                </h4>
                <p className="text-orange-600 font-medium mb-3">{user.name}</p>
                <p className="text-gray-600 mb-4">
                  {formData.description || 'Description de votre mission...'}
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center text-gray-500">
                    <MapPin className="h-4 w-4 mr-2" />
                    {formData.location || 'Localisation'}
                  </div>
                  <div className="flex items-center text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    {formData.duration || 'Durée'}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-800 hover:bg-blue-900 text-white transform hover:scale-105'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Publication en cours...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Send className="h-5 w-5 mr-2" />
                    Publier ma mission
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Conseils pour une mission réussie</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-blue-800 mb-2">Titre accrocheur</h4>
              <p className="text-blue-700 text-sm">Soyez précis et descriptif pour attirer les bons profils</p>
            </div>
            <div>
              <h4 className="font-medium text-blue-800 mb-2">Description détaillée</h4>
              <p className="text-blue-700 text-sm">Expliquez clairement vos attentes et les livrables</p>
            </div>
            <div>
              <h4 className="font-medium text-blue-800 mb-2">Compétences requises</h4>
              <p className="text-blue-700 text-sm">Listez les compétences techniques et soft skills nécessaires</p>
            </div>
            <div>
              <h4 className="font-medium text-blue-800 mb-2">Budget réaliste</h4>
              <p className="text-blue-700 text-sm">Proposez une rémunération juste pour attirer de la qualité</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostMissionPage;