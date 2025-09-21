import React from 'react';
import { Award, Download, Share } from 'lucide-react';

interface BadgeDisplayProps {
  badge: {
    name: string;
    category: string;
    score: number;
    date: string;
    userPhoto?: string;
    userName: string;
  };
  onDownload?: () => void;
  onShare?: () => void;
}

const BadgeDisplay: React.FC<BadgeDisplayProps> = ({ 
  badge, 
  onDownload, 
  onShare 
}) => {
  const handleDownload = async () => {
    try {
      // Générer un PDF de badge/certificat
      const pdfContent = generateBadgePDF(badge);
      const blob = new Blob([pdfContent], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `badge-${badge.name.replace(/\s+/g, '-').toLowerCase()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      if (onDownload) {
        onDownload();
      }
    } catch (error) {
      console.error('Erreur lors du téléchargement:', error);
      alert('Erreur lors du téléchargement du badge');
    }
  };

  const generateBadgePDF = (badge: any): string => {
    // Générer un PDF simple pour le badge
    return `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
/Resources <<
/Font <<
/F1 5 0 R
>>
>>
>>
endobj

4 0 obj
<<
/Length 300
>>
stream
BT
/F1 24 Tf
100 700 Td
(BADGE DE COMPETENCE) Tj
0 -50 Td
/F1 18 Tf
(${badge.name}) Tj
0 -40 Td
/F1 12 Tf
(Categorie: ${badge.category}) Tj
0 -30 Td
(Score: ${badge.score}%) Tj
0 -30 Td
(Date: ${badge.date}) Tj
0 -30 Td
(Nom: ${badge.userName}) Tj
ET
endstream
endobj

5 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj

xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000274 00000 n 
0000000625 00000 n 
trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
612
%%EOF`;
  };
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'développement web & mobile':
        return 'from-blue-500 to-blue-700';
      case 'graphisme et design':
        return 'from-purple-500 to-purple-700';
      case 'gestion communautaire / communication':
        return 'from-green-500 to-green-700';
      case 'missions terrain & action sociale':
        return 'from-orange-500 to-orange-700';
      case 'gestion de projet / compétences générales':
        return 'from-indigo-500 to-indigo-700';
      default:
        return 'from-gray-500 to-gray-700';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'développement web & mobile':
        return '💻';
      case 'graphisme et design':
        return '🎨';
      case 'gestion communautaire / communication':
        return '📱';
      case 'missions terrain & action sociale':
        return '🤝';
      case 'gestion de projet / compétences générales':
        return '📊';
      default:
        return '🏆';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-xs sm:max-w-sm mx-auto">
      {/* Badge Header */}
      <div className={`bg-gradient-to-r ${getCategoryColor(badge.category)} p-4 sm:p-6 text-white relative`}>
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <span className="text-lg sm:text-2xl">{getCategoryIcon(badge.category)}</span>
          </div>
        </div>
        
        <div className="relative z-10">
          <h3 className="text-base sm:text-lg font-bold mb-2">{badge.name}</h3>
          <p className="text-sm opacity-90">{badge.category}</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm opacity-90">Score: {badge.score}%</span>
            <span className="text-sm opacity-90">{badge.date}</span>
          </div>
        </div>
      </div>

      {/* User Section */}
      <div className="p-4 sm:p-6">
        <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden border-4 border-gray-200">
            {badge.userPhoto ? (
              <img 
                src={badge.userPhoto} 
                alt={badge.userName}
                className="w-12 h-12 sm:w-16 sm:h-16 object-cover"
              />
            ) : (
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-300 flex items-center justify-center">
                <span className="text-gray-600 font-semibold text-sm sm:text-lg">
                  {badge.userName.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{badge.userName}</h4>
            <p className="text-xs sm:text-sm text-gray-600">Certifié le {badge.date}</p>
          </div>
        </div>

        {/* Badge Content */}
        <div className="text-center mb-4 sm:mb-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
            <Award className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
          </div>
          <h5 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Certification Validée</h5>
          <p className="text-xs sm:text-sm text-gray-600">
            Compétences validées avec succès dans le domaine de {badge.category}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          {onDownload && (
            <button
              onClick={handleDownload}
              className="flex-1 bg-blue-800 hover:bg-blue-900 text-white py-2 px-3 sm:px-4 rounded-lg font-medium transition-colors flex items-center justify-center text-sm"
            >
              <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              Télécharger PDF
            </button>
          )}
          {onShare && (
            <button
              onClick={onShare}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-3 sm:px-4 rounded-lg font-medium transition-colors flex items-center justify-center text-sm"
            >
              <Share className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              Partager
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BadgeDisplay;
