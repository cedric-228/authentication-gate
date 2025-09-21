import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Trophy, Target, Star, CheckCircle } from 'lucide-react';

const HomePage = () => {
  const features = [
    {
      icon: <Target className="h-8 w-8 text-orange-500" />,
      title: "Des missions à ton échelle",
      description: "Trouve des projets courts et utiles près de chez toi ou en ligne."
    },
    {
      icon: <Trophy className="h-8 w-8 text-emerald-500" />,
      title: "Construis ton passeport de compétences",
      description: "Chaque mission réussie enrichit ton profil."
    },
    {
      icon: <Star className="h-8 w-8 text-blue-800" />,
      title: "Gagne en expérience et en visibilité",
      description: "Prouve ta valeur avec des badges et des recommandations."
    }
  ];

  const testimonials = [
    {
      name: "Amina Kouadio",
      role: "Développeuse Web",
      image: "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      quote: "YŌVO HUB m'a permis de décrocher ma première mission freelance. Une plateforme qui change vraiment la donne !",
      rating: 5
    },
    {
      name: "Koffi Mensah",
      role: "Graphiste",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      quote: "Grâce aux badges obtenus, j'ai pu prouver mes compétences et obtenir des missions mieux rémunérées.",
      rating: 5
    },
    {
      name: "Fatou Diallo",
      role: "Community Manager",
      image: "https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      quote: "Une plateforme intuitive qui m'a permis de développer mon réseau professionnel rapidement.",
      rating: 5
    }
  ];

  const stats = [
    { number: "500+", label: "Jeunes talents" },
    { number: "200+", label: "Missions réalisées" },
    { number: "50+", label: "Porteurs de projets" },
    { number: "95%", label: "Taux de satisfaction" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-800 via-blue-900 to-emerald-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/hero-woman-working.jpg)'
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  YŌVO HUB
                  <span className="block text-2xl lg:text-3xl font-normal text-orange-300 mt-2">
                    Hub de l'Avenir
                  </span>
                </h1>
                <p className="text-xl lg:text-2xl text-gray-100 leading-relaxed">
                  Transformer l'engagement en compétences concrètes et en revenus
                </p>
                <p className="text-lg text-gray-200">
                  Découvre des micro-missions locales qui valent ton temps, tes talents et ton impact.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/missions"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center group"
                >
                  Trouver une mission
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/auth"
                  className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-900 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
                >
                  S'inscrire gratuitement
                </Link>
              </div>
            </div>
            
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-emerald-500 rounded-lg blur opacity-30"></div>
                <div className="relative bg-white/10 backdrop-blur-md rounded-lg p-8 space-y-6">
                  <h3 className="text-2xl font-bold text-center">Rejoins la communauté</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {stats.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-3xl font-bold text-orange-300">{stat.number}</div>
                        <div className="text-sm text-gray-200">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Pourquoi YŌVO HUB ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une plateforme conçue pour transformer ton potentiel en opportunités concrètes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-100 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Témoignages de notre communauté
            </h2>
            <p className="text-xl text-gray-600">
              Découvre ce que nos talents disent de leur expérience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-800 to-emerald-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Prêt à transformer ton potentiel ?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Rejoins des centaines de jeunes talents qui construisent déjà leur avenir avec YŌVO HUB
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/auth"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
            >
              Créer mon compte
            </Link>
            <Link
              to="/missions"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-900 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
            >
              Explorer les missions
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-800 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;