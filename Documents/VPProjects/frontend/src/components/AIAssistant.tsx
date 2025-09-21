import React, { useState } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const AIAssistant: React.FC = () => {
    
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Bonjour ! Je suis YŌVO Bot, votre assistant IA. Comment puis-je vous aider aujourd\'hui ?',
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulation de réponse IA
    setTimeout(() => {
      const botResponse = generateAIResponse(inputMessage);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('mission') || input.includes('projet')) {
      return 'Je peux vous aider à trouver des missions adaptées à vos compétences ! Consultez la page Missions pour voir toutes les opportunités disponibles. Avez-vous des compétences particulières que vous aimeriez mettre en valeur ?';
    }
    
    if (input.includes('quiz') || input.includes('compétence') || input.includes('évaluation')) {
      return 'Excellent ! Les quiz d\'évaluation vous permettent de valider vos compétences et d\'obtenir des badges. Nous avons des quiz pour le Développement, le Graphisme, la Communication, les Missions Terrain et la Gestion de projet. Quel domaine vous intéresse ?';
    }
    
    if (input.includes('badge') || input.includes('certificat') || input.includes('attestation')) {
      return 'Les badges et attestations YŌVO HUB sont des preuves reconnues de vos compétences. En réussissant les quiz (score ≥ 70%), vous obtenez un badge numérique et une attestation PDF téléchargeable. Cela renforce votre profil auprès des organisations !';
    }
    
    if (input.includes('profil') || input.includes('passeport')) {
      return 'Votre Passeport de Compétences est votre vitrine ! Il affiche vos badges, vos missions réalisées et votre progression. N\'oubliez pas d\'ajouter une photo de profil professionnelle pour maximiser vos chances.';
    }
    
    if (input.includes('inscription') || input.includes('compte') || input.includes('register')) {
      return 'L\'inscription sur YŌVO HUB est gratuite ! Choisissez votre rôle (Jeune Talent ou Porteur de Projet), créez votre compte et commencez immédiatement à explorer les opportunités. Avez-vous besoin d\'aide pour vous inscrire ?';
    }
    
    if (input.includes('contact') || input.includes('kofficedrickodjo') || input.includes('téléphone')) {
      return 'Pour toute question technique ou support, vous pouvez contacter notre équipe :\n📧 Email: kofficedrickodjo@gmail.com\n📱 Téléphone: +228 79 49 70 56\n💬 WhatsApp: +228 99 87 37 15\n📍 Adresse: Adakpamé, Lomé, Togo';
    }
    
    if (input.includes('mini-projet') || input.includes('mini projet') || input.includes('ia')) {
      return 'Les mini-projets IA sont des projets personnalisés générés par notre intelligence artificielle ! Ils sont adaptés à votre niveau et vos compétences. Vous pouvez générer des suggestions ou créer vos propres projets. Voulez-vous que je vous explique comment ça marche ?';
    }
    
    if (input.includes('aide') || input.includes('help') || input.includes('comment')) {
      return 'Je suis là pour vous guider ! Vous pouvez me poser des questions sur les missions, les quiz, votre profil, les badges, les mini-projets IA, ou tout autre aspect de YŌVO HUB. Que souhaitez-vous savoir ?';
    }
    
    if (input.includes('salut') || input.includes('bonjour') || input.includes('hello')) {
      return 'Salut ! 👋 Bienvenue sur YŌVO HUB ! Je suis votre assistant IA personnel. Comment puis-je vous aider à développer vos compétences et trouver des opportunités aujourd\'hui ?';
    }
    
    return 'Merci pour votre question ! Je suis encore en apprentissage pour mieux vous aider. En attendant, n\'hésitez pas à explorer la plateforme ou à consulter notre page Contact pour plus d\'informations. Y a-t-il autre chose que je puisse faire pour vous ?';
  };

  return (
    <>
      {/* Bouton flottant */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-blue-900 hover:bg-blue-800 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 z-50 ${
          isOpen ? 'scale-0' : 'scale-100'
        }`}
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-96 bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col z-50">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-blue-900 text-white rounded-t-lg">
            <div className="flex items-center space-x-2">
              <Bot className="w-5 h-5" />
              <span className="font-semibold">YŌVO Bot</span>
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                    message.isBot
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-blue-900 text-white'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg text-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Tapez votre message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;