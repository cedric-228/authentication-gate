import React from 'react';
import { Target, Users, Award, Globe, Heart, Lightbulb, Mail, Phone, MessageCircle, MapPin } from 'lucide-react';

const AboutPage = () => {
  const values = [
    {
      icon: <Target className="h-8 w-8 text-blue-800" />,
      title: "Impact Local",
      description: "Nous créons des opportunités qui transforment les communautés locales."
    },
    {
      icon: <Users className="h-8 w-8 text-emerald-500" />,
      title: "Inclusion",
      description: "Chaque jeune mérite une chance de révéler son potentiel."
    },
    {
      icon: <Award className="h-8 w-8 text-orange-500" />,
      title: "Excellence",
      description: "Nous encourageons la qualité et la progression continue."
    },
    {
      icon: <Globe className="h-8 w-8 text-blue-600" />,
      title: "Innovation",
      description: "Nous utilisons la technologie pour connecter talents et opportunités."
    }
  ];

  const team = [
    {
      name: "Koffi Drick Odjo",
      role: "Fondateur & Développeur Web Mobile",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      bio: "Développeur Web Mobile et Graphiste passionné par l'innovation technologique et l'autonomisation des jeunes talents africains.",
      email: "kofficedrickodjo@gmail.com",
      phone: "+228 79 49 70 56",
      whatsapp: "+228 99 87 37 15",
      location: "Adakpamé, Lomé, Togo"
    },
    {
      name: "Amina Togo",
      role: "Responsable Communauté",
      image: "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      bio: "Passionnée par l'entrepreneuriat social et l'autonomisation des jeunes."
    },
    {
      name: "Fatou Diallo",
      role: "Responsable Communication",
      image: "https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      bio: "Spécialiste en communication et engagement communautaire."
    }
  ];

  const milestones = [
    {
      year: "2024",
      title: "Conception & Développement",
      description: "Recherche utilisateur et développement de la plateforme"
    },
    {
      year: "2025",
      title: "Lancement Beta",
      description: "Test avec 100 premiers utilisateurs au Togo"
    },
    {
      year: "2025+",
      title: "Expansion",
      description: "Déploiement dans toute l'Afrique de l'Ouest"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-800 to-emerald-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              À Propos de YŌVO HUB
            </h1>
            <p className="text-xl lg:text-2xl text-gray-100 max-w-4xl mx-auto leading-relaxed">
              Nous construisons un réseau où l'engagement n'est plus "gratuit" 
              mais un investissement dans l'avenir des jeunes talents africains.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Notre Mission
              </h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  Chez YŌVO HUB, nous croyons que chaque jeune a du potentiel. 
                  Notre objectif est de transformer l'envie d'agir en compétences concrètes, 
                  en visibilité et en revenus.
                </p>
                <p>
                  Nous connectons les jeunes talents avec des micro-projets et des missions 
                  à impact local, créant un écosystème où l'expérience se transforme en 
                  opportunités professionnelles durables.
                </p>
                <div className="flex items-center text-blue-800">
                  <Heart className="h-6 w-6 mr-2 text-orange-500" />
                  <span className="font-semibold">Impact social + Développement économique</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-emerald-500 rounded-lg blur opacity-30"></div>
              <div className="relative bg-white rounded-lg p-8 shadow-xl">
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-blue-800 mb-2">500+</div>
                    <div className="text-gray-600">Jeunes accompagnés</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-emerald-600 mb-2">200+</div>
                    <div className="text-gray-600">Missions réalisées</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-orange-500 mb-2">50+</div>
                    <div className="text-gray-600">Organisations partenaires</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-purple-600 mb-2">95%</div>
                    <div className="text-gray-600">Taux de satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Notre Vision
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Construire le premier réseau panafricain de talents où l'engagement 
              social devient un tremplin vers l'excellence professionnelle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition-shadow duration-300">
                <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Notre Équipe Fondatrice
            </h2>
            <p className="text-xl text-gray-600">
              Des passionnés déterminés à transformer l'écosystème des opportunités pour la jeunesse africaine
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-orange-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 mb-4">{member.bio}</p>
                  
                  {member.email && (
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-gray-600">
                        <Mail className="h-4 w-4 mr-2 text-blue-800" />
                        <span>{member.email}</span>
                      </div>
                      {member.phone && (
                        <div className="flex items-center text-gray-600">
                          <Phone className="h-4 w-4 mr-2 text-emerald-500" />
                          <span>{member.phone}</span>
                        </div>
                      )}
                      {member.whatsapp && (
                        <div className="flex items-center text-gray-600">
                          <MessageCircle className="h-4 w-4 mr-2 text-green-500" />
                          <span>{member.whatsapp}</span>
                        </div>
                      )}
                      {member.location && (
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-4 w-4 mr-2 text-orange-500" />
                          <span>{member.location}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Notre Parcours
            </h2>
            <p className="text-xl text-gray-600">
              L'évolution de YŌVO HUB depuis sa conception
            </p>
          </div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-800 text-white rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                </div>
                <div className="ml-6 bg-white rounded-lg shadow-md p-6 flex-1">
                  <div className="flex items-center mb-2">
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium mr-4">
                      {milestone.year}
                    </span>
                    <h3 className="text-xl font-semibold text-gray-900">{milestone.title}</h3>
                  </div>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Notre Impact
            </h2>
            <p className="text-xl text-gray-600">
              Transformer des vies, une mission à la fois
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <Lightbulb className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Développement de Compétences</h3>
                  <p className="text-gray-600">
                    Nos missions permettent aux jeunes d'acquérir des compétences pratiques 
                    directement applicables sur le marché du travail.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Création de Réseaux</h3>
                  <p className="text-gray-600">
                    La plateforme facilite la création de réseaux professionnels 
                    durables entre jeunes, entrepreneurs et organisations.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                  <Target className="h-4 w-4 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Impact Économique</h3>
                  <p className="text-gray-600">
                    Chaque mission génère de la valeur économique locale et contribue 
                    au développement des communautés.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Impact communautaire"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute inset-0 bg-blue-900 opacity-20 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-800 to-emerald-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Rejoignez Notre Mission
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Ensemble, construisons l'avenir des jeunes talents africains. 
            Chaque contribution compte, chaque action a de l'impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/auth"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
            >
              Devenir Membre
            </a>
            <a
              href="/contact"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-900 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
            >
              Nous Contacter
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;