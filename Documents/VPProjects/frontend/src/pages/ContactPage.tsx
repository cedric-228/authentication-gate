import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, ExternalLink } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Send className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Message envoyé ! 🎉</h1>
            <p className="text-xl text-gray-600 mb-8">
              Merci pour votre message. Notre équipe vous répondra dans les plus brefs délais.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: '', email: '', subject: '', message: '' });
              }}
              className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Envoyer un autre message
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-800 to-emerald-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Contactez-Nous
          </h1>
          <p className="text-xl lg:text-2xl text-gray-100 max-w-3xl mx-auto">
            Une question ? Un partenariat ? Une suggestion ? 
            Nous sommes là pour vous écouter et vous accompagner.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Nos Informations de Contact
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-blue-800 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">bonjour@yovohub.tg</p>
                    <p className="text-sm text-gray-500">Réponse sous 24h</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-emerald-500 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Téléphone</h3>
                    <p className="text-gray-600">+228 79 49 70 56</p>
                    <p className="text-sm text-gray-500">Lun-Ven 8h-18h</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MessageCircle className="h-6 w-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">WhatsApp</h3>
                    <p className="text-gray-600">+228 99 87 37 15</p>
                    <p className="text-sm text-gray-500">Scan QR code pour discuter</p>
                    <div className="mt-2">
                      <img 
                        src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://wa.me/22899873715" 
                        alt="QR Code WhatsApp" 
                        className="w-16 h-16 border border-gray-300 rounded"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-orange-500 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Adresse</h3>
                    <p className="text-gray-600">Adakpamé, Lomé, Togo</p>
                    <p className="text-sm text-gray-500">Afrique de l'Ouest</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">Suivez-nous</h3>
                <div className="flex space-x-4">
                  <a 
                    href="#" 
                    className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors"
                    aria-label="LinkedIn"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"/>
                    </svg>
                  </a>
                  <a 
                    href="#" 
                    className="bg-purple-500 hover:bg-purple-600 text-white p-3 rounded-full transition-colors"
                    aria-label="Instagram"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2.163c2.204 0 2.466.009 3.297.048.796.036 1.227.166 1.513.276.38.148.65.325.935.61.285.285.462.555.61.935.11.286.24.717.276 1.513.039.831.048 1.093.048 3.297s-.009 2.466-.048 3.297c-.036.796-.166 1.227-.276 1.513a2.51 2.51 0 01-.61.935 2.51 2.51 0 01-.935.61c-.286.11-.717.24-1.513.276-.831.039-1.093.048-3.297.048s-2.466-.009-3.297-.048c-.796-.036-1.227-.166-1.513-.276a2.51 2.51 0 01-.935-.61 2.51 2.51 0 01-.61-.935c-.11-.286-.24-.717-.276-1.513C2.172 12.466 2.163 12.204 2.163 10s.009-2.466.048-3.297c.036-.796.166-1.227.276-1.513.148-.38.325-.65.61-.935.285-.285.555-.462.935-.61.286-.11.717-.24 1.513-.276C7.534 2.172 7.796 2.163 10 2.163M10 0C7.741 0 7.444.01 6.598.048 5.754.086 5.172.222 4.65.42a4.012 4.012 0 00-1.44.933 4.012 4.012 0 00-.933 1.44C2.079 3.317 1.943 3.9 1.905 4.742 1.867 5.588 1.857 5.885 1.857 8.143v3.714c0 2.258.01 2.555.048 3.401.038.846.174 1.428.372 1.951.205.545.478 1.009.933 1.44.431.455.895.728 1.44.933.523.198 1.105.334 1.951.372C7.445 19.99 7.742 20 10 20s2.555-.01 3.401-.048c.846-.038 1.428-.174 1.951-.372a4.012 4.012 0 001.44-.933c.455-.431.728-.895.933-1.44.198-.523.334-1.105.372-1.951.038-.846.048-1.143.048-3.401V8.143c0-2.258-.01-2.555-.048-3.401-.038-.846-.174-1.428-.372-1.951a4.012 4.012 0 00-.933-1.44 4.012 4.012 0 00-1.44-.933C14.828.222 14.246.086 13.4.048 12.555.01 12.258 0 10 0z"/>
                      <path d="M10 4.865a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm0 8.468a3.333 3.333 0 110-6.666 3.333 3.333 0 010 6.666zm5.338-9.87a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z"/>
                    </svg>
                  </a>
                  <a 
                    href="#" 
                    className="bg-black hover:bg-gray-800 text-white p-3 rounded-full transition-colors"
                    aria-label="Twitter/X"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M11.82 8.75L19.39 0h-1.8l-6.58 7.64L6.39 0H0l7.94 11.57L0 20h1.8l6.94-8.06L13.61 20H20l-8.18-11.25zM8.5 11.25l-.81-1.15L2.14 1.5h2.77l5.2 7.43.81 1.15 6.74 9.64h-2.77L8.5 11.25z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-blue-50 rounded-xl p-6 mt-8">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">
                Questions Fréquentes
              </h3>
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-medium text-blue-800">Comment devenir partenaire ?</h4>
                  <p className="text-blue-700">Contactez-nous par email avec une présentation de votre organisation.</p>
                </div>
                <div>
                  <h4 className="font-medium text-blue-800">Comment publier une mission ?</h4>
                  <p className="text-blue-700">Créez un compte "Porteur de projet" et utilisez notre formulaire de publication.</p>
                </div>
                <div>
                  <h4 className="font-medium text-blue-800">Support technique ?</h4>
                  <p className="text-blue-700">Notre équipe technique répond dans les 24h par email.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Envoyez-nous un Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Votre nom et prénom"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Adresse email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Sujet *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.subject}
                    onChange={handleInputChange}
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option value="partenariat">Partenariat</option>
                    <option value="support">Support technique</option>
                    <option value="suggestion">Suggestion</option>
                    <option value="media">Demande média</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Décrivez votre demande ou votre message..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-lg font-semibold text-lg transition-all flex items-center justify-center ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-800 hover:bg-blue-900 text-white transform hover:scale-[1.02]'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Envoi en cours...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Send className="h-5 w-5 mr-2" />
                      Envoyer le message
                    </div>
                  )}
                </button>
              </form>
            </div>

            {/* Alternative Contact Methods */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl p-6">
                <MessageCircle className="h-8 w-8 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Chat en Direct</h3>
                <p className="text-orange-100 mb-4">
                  Besoin d'aide immédiate ? Chattez avec notre équipe.
                </p>
                <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  Démarrer le chat
                </button>
              </div>

              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-xl p-6">
                <ExternalLink className="h-8 w-8 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Centre d'Aide</h3>
                <p className="text-emerald-100 mb-4">
                  Consultez notre base de connaissances et tutoriels.
                </p>
                <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  Voir l'aide
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;