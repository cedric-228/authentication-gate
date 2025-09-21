import React, { useState } from 'react';
import { Search, Filter, MapPin, Clock, DollarSign, Users, ExternalLink } from 'lucide-react';

interface Mission {
  id: string;
  title: string;
  organization: string;
  category: string;
  location: string;
  duration: string;
  type: 'paid' | 'volunteer' | 'internship';
  description: string;
  skills: string[];
  applicants: number;
  contact: string;
  website?: string;
}

const MissionsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Real missions from Togo/Africa
  const missions: Mission[] = [
    {
      id: '1',
      title: 'Bénévolat Éducatif et Participation Sociale',
      organization: 'Alpha B – Togo',
      category: 'Éducation',
      location: 'Togo',
      duration: 'Long terme',
      type: 'volunteer',
      description: 'Mission de bénévolat axée sur l\'éducation et la participation sociale. Hébergement et nourriture fournis.',
      skills: ['Éducation', 'Animation', 'Communication'],
      applicants: 12,
      contact: 'alpha-b.org',
      website: 'https://alpha-b.org'
    },
    {
      id: '2',
      title: 'Mission Humanitaire - Santé et Éducation',
      organization: 'AJACTODI',
      category: 'Humanitaire',
      location: 'Togo',
      duration: '3-6 mois',
      type: 'volunteer',
      description: 'Participation aux activités humanitaires dans les domaines de l\'éducation et de la santé communautaire.',
      skills: ['Santé', 'Éducation', 'Travail social'],
      applicants: 8,
      contact: 'assoajactodi.wordpress.com'
    },
    {
      id: '3',
      title: 'Téléopérateur/Commercial',
      organization: 'Cabinet 80/20',
      category: 'Commercial',
      location: 'Lomé, Togo',
      duration: 'CDI',
      type: 'paid',
      description: 'Poste de téléopérateur et assistant commercial avec salaire fixe plus primes.',
      skills: ['Vente', 'Communication', 'Relation client'],
      applicants: 25,
      contact: 'Cabinet 80/20'
    },
    {
      id: '4',
      title: 'Consultant Climat et Environnement',
      organization: 'FAO',
      category: 'Environnement',
      location: 'Togo',
      duration: '6 mois',
      type: 'paid',
      description: 'Mission de consultance individuelle sur les projets climat et développement durable.',
      skills: ['Environnement', 'Développement durable', 'Recherche'],
      applicants: 15,
      contact: 'FAO Togo'
    },
    {
      id: '5',
      title: 'Community Manager',
      organization: 'DEEZPRO',
      category: 'Communication',
      location: 'Lomé, Togo',
      duration: '3 mois',
      type: 'paid',
      description: 'Gestion des réseaux sociaux et communication digitale pour startup innovante.',
      skills: ['Réseaux sociaux', 'Communication', 'Marketing digital'],
      applicants: 18,
      contact: 'emploi.tg'
    },
    {
      id: '6',
      title: 'Développeur Mobile Freelance',
      organization: 'Freelance',
      category: 'Développement',
      location: 'Remote/Togo',
      duration: '2-4 mois',
      type: 'paid',
      description: 'Développement d\'application mobile iOS/Android. Mission freelance bien rémunérée.',
      skills: ['React Native', 'iOS', 'Android', 'JavaScript'],
      applicants: 22,
      contact: 'Contactez directement'
    },
    {
      id: '7',
      title: 'Mission Médicale Rurale',
      organization: 'Globalong',
      category: 'Santé',
      location: 'Zones rurales, Togo',
      duration: '1-3 mois',
      type: 'volunteer',
      description: 'Assistance médicale dans les zones rurales. Logement fourni, expérience enrichissante.',
      skills: ['Médecine', 'Soins infirmiers', 'Santé publique'],
      applicants: 10,
      contact: 'globalong.com'
    },
    {
      id: '8',
      title: 'Éducation et Développement Culturel',
      organization: 'PROVUD Togo',
      category: 'Culture',
      location: 'Togo',
      duration: '3-12 mois',
      type: 'volunteer',
      description: 'Missions d\'éducation, santé et développement culturel. Stage ou bénévolat possible.',
      skills: ['Éducation', 'Culture', 'Animation'],
      applicants: 14,
      contact: 'provud.org'
    }
  ];

  const categories = [
    'all', 'Développement', 'Graphisme', 'Communication', 'Éducation', 
    'Santé', 'Humanitaire', 'Commercial', 'Environnement', 'Culture'
  ];

  const filteredMissions = missions.filter(mission => {
    const matchesSearch = mission.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mission.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mission.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || mission.category === selectedCategory;
    const matchesType = selectedType === 'all' || mission.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'paid': return 'bg-emerald-100 text-emerald-800';
      case 'volunteer': return 'bg-blue-100 text-blue-800';
      case 'internship': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'paid': return 'Rémunéré';
      case 'volunteer': return 'Bénévolat';
      case 'internship': return 'Stage';
      default: return type;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Explorez les Missions Disponibles
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez des dizaines de micro-missions qui révéleront vos talents. 
            Filtrez selon vos compétences, votre localisation ou vos objectifs.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Rechercher une mission, organisation ou compétence..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <select
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">Toutes les catégories</option>
              {categories.slice(1).map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            {/* Type Filter */}
            <select
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="all">Tous les types</option>
              <option value="paid">Rémunéré</option>
              <option value="volunteer">Bénévolat</option>
              <option value="internship">Stage</option>
            </select>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center justify-center px-4 py-3 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors"
            >
              <Filter className="h-5 w-5 mr-2" />
              Filtres
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredMissions.length} mission{filteredMissions.length !== 1 ? 's' : ''} trouvée{filteredMissions.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Missions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMissions.map((mission) => (
            <div key={mission.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(mission.type)}`}>
                    {getTypeLabel(mission.type)}
                  </span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Users className="h-4 w-4 mr-1" />
                    {mission.applicants}
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                  {mission.title}
                </h3>
                
                <p className="text-orange-600 font-medium mb-3">{mission.organization}</p>
                
                <p className="text-gray-600 mb-4 line-clamp-3">{mission.description}</p>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-gray-500 text-sm">
                    <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                    {mission.location}
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                    {mission.duration}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Compétences requises :</p>
                  <div className="flex flex-wrap gap-2">
                    {mission.skills.slice(0, 3).map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {skill}
                      </span>
                    ))}
                    {mission.skills.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        +{mission.skills.length - 3} autres
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <button className="flex-1 bg-blue-800 hover:bg-blue-900 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                    Postuler
                  </button>
                  {mission.website && (
                    <a
                      href={mission.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredMissions.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Aucune mission trouvée</h3>
            <p className="text-gray-600 mb-4">
              Essayez de modifier vos critères de recherche ou explorez d'autres catégories.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedType('all');
              }}
              className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MissionsPage;