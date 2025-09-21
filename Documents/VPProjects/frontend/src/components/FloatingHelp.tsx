import React, { useState } from 'react';
import { HelpCircle, X, MessageCircle, Lightbulb, BookOpen, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FloatingHelp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const helpOptions = [
    {
      icon: MessageCircle,
      title: 'Chat avec l\'IA',
      description: 'Posez vos questions directement',
      action: () => {
        navigate('/ai-assistance');
        setIsOpen(false);
      }
    },
    {
      icon: BookOpen,
      title: 'Ressources d\'apprentissage',
      description: 'Guides et tutoriels',
      action: () => {
        navigate('/ai-assistance');
        setIsOpen(false);
      }
    },
    {
      icon: Target,
      title: 'Projets suggérés',
      description: 'Mini-projets personnalisés',
      action: () => {
        navigate('/ai-assistance');
        setIsOpen(false);
      }
    },
    {
      icon: Lightbulb,
      title: 'Conseils rapides',
      description: 'Astuces pour réussir',
      action: () => {
        // Afficher des conseils rapides
        alert('Conseil du jour : Prenez 5 minutes chaque matin pour planifier vos tâches prioritaires. Cela améliore considérablement votre productivité !');
        setIsOpen(false);
      }
    }
  ];

  return (
    <>
      {/* Floating Help Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-800 to-emerald-500 hover:from-blue-900 hover:to-emerald-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        aria-label="Aide IA"
      >
        <HelpCircle className="h-6 w-6" />
      </button>

      {/* Help Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-800 to-emerald-500 text-white p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <HelpCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Assistance IA</h2>
                    <p className="text-blue-100 text-sm">Comment puis-je vous aider ?</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="space-y-4">
                {helpOptions.map((option, index) => (
                  <button
                    key={index}
                    onClick={option.action}
                    className="w-full p-4 text-left bg-gray-50 hover:bg-blue-50 rounded-xl transition-colors group"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 group-hover:bg-blue-200 rounded-full flex items-center justify-center transition-colors">
                        <option.icon className="h-6 w-6 text-blue-800" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-800">
                          {option.title}
                        </h3>
                        <p className="text-sm text-gray-600 group-hover:text-blue-600">
                          {option.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Quick Tips */}
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                <div className="flex items-start space-x-3">
                  <Lightbulb className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800 mb-1">Astuce du jour</h4>
                    <p className="text-sm text-yellow-700">
                      Créez un portfolio en ligne pour mettre en valeur vos projets et attirer plus de clients !
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingHelp;
