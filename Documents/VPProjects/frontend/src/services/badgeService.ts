import { User } from '../types/user';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'quiz' | 'mission' | 'project' | 'contribution';
  level: 'bronze' | 'silver' | 'gold';
  dateEarned?: Date;
}

export interface Certificate {
  id: string;
  title: string;
  description: string;
  dateIssued: Date;
  badgeIds: string[];
  imageUrl: string;
}

class BadgeService {
  private badges: Badge[] = [
    {
      id: 'quiz-beginner',
      name: 'Apprenti IA',
      description: 'A réussi son premier quiz sur l\'IA',
      icon: '🤖',
      category: 'quiz',
      level: 'bronze'
    },
    {
      id: 'quiz-intermediate',
      name: 'Technicien IA',
      description: 'A réussi 5 quiz sur l\'IA avec un score d\'au moins 80%',
      icon: '🧠',
      category: 'quiz',
      level: 'silver'
    },
    {
      id: 'quiz-expert',
      name: 'Expert IA',
      description: 'A réussi tous les quiz sur l\'IA avec un score parfait',
      icon: '🏆',
      category: 'quiz',
      level: 'gold'
    },
    {
      id: 'mission-beginner',
      name: 'Explorateur',
      description: 'A complété sa première mission',
      icon: '🔍',
      category: 'mission',
      level: 'bronze'
    },
    {
      id: 'mission-intermediate',
      name: 'Aventurier',
      description: 'A complété 10 missions',
      icon: '🧭',
      category: 'mission',
      level: 'silver'
    },
    {
      id: 'mission-expert',
      name: 'Maître des Missions',
      description: 'A complété 25 missions avec excellence',
      icon: '🌟',
      category: 'mission',
      level: 'gold'
    },
    {
      id: 'project-beginner',
      name: 'Développeur Novice',
      description: 'A complété son premier mini-projet',
      icon: '💻',
      category: 'project',
      level: 'bronze'
    },
    {
      id: 'project-intermediate',
      name: 'Développeur Confirmé',
      description: 'A complété 5 mini-projets',
      icon: '⚙️',
      category: 'project',
      level: 'silver'
    },
    {
      id: 'project-expert',
      name: 'Architecte IA',
      description: 'A complété 10 mini-projets avec excellence',
      icon: '🏗️',
      category: 'project',
      level: 'gold'
    }
  ];

  private certificates: Certificate[] = [
    {
      id: 'ia-fundamentals',
      title: 'Fondamentaux de l\'IA',
      description: 'Certifie la maîtrise des concepts fondamentaux de l\'intelligence artificielle',
      dateIssued: new Date(),
      badgeIds: ['quiz-beginner', 'quiz-intermediate'],
      imageUrl: '/certificates/ia-fundamentals.png'
    },
    {
      id: 'ia-developer',
      title: 'Développeur IA',
      description: 'Certifie les compétences en développement d\'applications utilisant l\'IA',
      dateIssued: new Date(),
      badgeIds: ['project-beginner', 'project-intermediate'],
      imageUrl: '/certificates/ia-developer.png'
    },
    {
      id: 'ia-expert',
      title: 'Expert en Intelligence Artificielle',
      description: 'Certifie l\'expertise complète dans le domaine de l\'intelligence artificielle',
      dateIssued: new Date(),
      badgeIds: ['quiz-expert', 'project-expert', 'mission-expert'],
      imageUrl: '/certificates/ia-expert.png'
    }
  ];

  public getUserBadges(userId: string): Promise<Badge[]> {
    // Simuler un appel API
    return new Promise((resolve) => {
      setTimeout(() => {
        // Dans une vraie application, on récupérerait les badges de l'utilisateur depuis le backend
        // Pour l'instant, on retourne quelques badges aléatoires
        const userBadges = this.badges
          .filter(() => Math.random() > 0.5)
          .map(badge => ({
            ...badge,
            dateEarned: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
          }));
        resolve(userBadges);
      }, 500);
    });
  }

  public getUserCertificates(userId: string): Promise<Certificate[]> {
    // Simuler un appel API
    return new Promise((resolve) => {
      setTimeout(() => {
        // Dans une vraie application, on récupérerait les certificats de l'utilisateur depuis le backend
        // Pour l'instant, on retourne quelques certificats aléatoires
        const userCertificates = this.certificates
          .filter(() => Math.random() > 0.5);
        resolve(userCertificates);
      }, 500);
    });
  }

  public generateCertificate(userId: string, badgeIds: string[]): Promise<Certificate> {
    // Simuler un appel API pour générer un certificat basé sur les badges obtenus
    return new Promise((resolve) => {
      setTimeout(() => {
        const certificate: Certificate = {
          id: `cert-${Date.now()}`,
          title: 'Certificat de Compétences IA',
          description: 'Ce certificat atteste des compétences acquises dans le domaine de l\'intelligence artificielle',
          dateIssued: new Date(),
          badgeIds: badgeIds,
          imageUrl: '/certificates/custom-certificate.png'
        };
        resolve(certificate);
      }, 800);
    });
  }

  public downloadCertificate(certificateId: string): Promise<Blob> {
    // Générer un PDF de certificat
    return new Promise((resolve) => {
      setTimeout(() => {
        // Créer un PDF simple avec les informations du certificat
        const certificate = this.certificates.find(c => c.id === certificateId);
        if (!certificate) {
          throw new Error('Certificat non trouvé');
        }
        
        // Simuler la génération d'un PDF
        const pdfContent = this.generatePDFContent(certificate);
        const blob = new Blob([pdfContent], { type: 'application/pdf' });
        resolve(blob);
      }, 1000);
    });
  }

  private generatePDFContent(certificate: Certificate): string {
    // Simuler le contenu PDF (dans une vraie app, utiliser une librairie comme jsPDF)
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
/Length 200
>>
stream
BT
/F1 24 Tf
100 700 Td
(${certificate.title}) Tj
0 -50 Td
/F1 12 Tf
(${certificate.description}) Tj
0 -30 Td
(Date d'émission: ${certificate.dateIssued.toLocaleDateString('fr-FR')}) Tj
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
0000000525 00000 n 
trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
612
%%EOF`;
  }

  public getAllBadges(): Badge[] {
    return this.badges;
  }
}

export const badgeService = new BadgeService();
export default badgeService;