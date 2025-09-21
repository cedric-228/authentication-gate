import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import badgeService, { Badge, Certificate } from '../services/badgeService';
import { Download, Award, Medal, Certificate as CertificateIcon } from 'lucide-react';

const CertificatesPage: React.FC = () => {
  const { user } = useAuth();
  const [badges, setBadges] = useState<Badge[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'badges' | 'certificates'>('badges');

  useEffect(() => {
    const loadUserData = async () => {
      if (user) {
        setLoading(true);
        try {
          const [userBadges, userCertificates] = await Promise.all([
            badgeService.getUserBadges(user.id),
            badgeService.getUserCertificates(user.id)
          ]);
          setBadges(userBadges);
          setCertificates(userCertificates);
        } catch (error) {
          console.error('Erreur lors du chargement des données:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadUserData();
  }, [user]);

  const handleDownloadCertificate = async (certificateId: string) => {
    try {
      const blob = await badgeService.downloadCertificate(certificateId);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `certificat-${certificateId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Erreur lors du téléchargement du certificat:', error);
    }
  };

  const getBadgeIcon = (badge: Badge) => {
    switch (badge.level) {
      case 'bronze':
        return <Medal className="h-8 w-8 text-amber-700" />;
      case 'silver':
        return <Medal className="h-8 w-8 text-gray-400" />;
      case 'gold':
        return <Medal className="h-8 w-8 text-yellow-400" />;
      default:
        return <Award className="h-8 w-8 text-blue-500" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'bronze':
        return 'bg-amber-100 text-amber-800';
      case 'silver':
        return 'bg-gray-100 text-gray-800';
      case 'gold':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Mes Récompenses</h1>
      
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === 'badges'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('badges')}
        >
          Badges
        </button>
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === 'certificates'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('certificates')}
        >
          Certificats
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {activeTab === 'badges' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Mes Badges</h2>
              
              {badges.length === 0 ? (
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <Award className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">
                    Vous n'avez pas encore obtenu de badges. Complétez des quiz, des missions et des projets pour en gagner !
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {badges.map((badge) => (
                    <div
                      key={badge.id}
                      className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start">
                        <div className="p-2 rounded-full bg-blue-50 mr-3">
                          {getBadgeIcon(badge)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{badge.name}</h3>
                          <p className="text-gray-600 text-sm mb-2">{badge.description}</p>
                          <div className="flex items-center">
                            <span className={`text-xs px-2 py-1 rounded-full ${getLevelColor(badge.level)}`}>
                              {badge.level.charAt(0).toUpperCase() + badge.level.slice(1)}
                            </span>
                            {badge.dateEarned && (
                              <span className="text-xs text-gray-500 ml-2">
                                Obtenu le {new Date(badge.dateEarned).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'certificates' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Mes Certificats</h2>
              
              {certificates.length === 0 ? (
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <CertificateIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">
                    Vous n'avez pas encore obtenu de certificats. Collectez des badges pour débloquer des certificats !
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {certificates.map((certificate) => (
                    <div
                      key={certificate.id}
                      className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
                    >
                      <div className="h-40 bg-gradient-to-r from-blue-500 to-indigo-600 relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <CertificateIcon className="h-16 w-16 text-white opacity-30" />
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-xl mb-2">{certificate.title}</h3>
                        <p className="text-gray-600 text-sm mb-3">{certificate.description}</p>
                        <p className="text-gray-500 text-xs mb-4">
                          Délivré le {new Date(certificate.dateIssued).toLocaleDateString()}
                        </p>
                        <button
                          onClick={() => handleDownloadCertificate(certificate.id)}
                          className="flex items-center text-blue-600 hover:text-blue-800"
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Télécharger
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CertificatesPage;