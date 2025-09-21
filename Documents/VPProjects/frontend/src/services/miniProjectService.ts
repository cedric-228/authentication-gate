import api from './api';

export interface MiniProject {
  id: number;
  user_id: number;
  title: string;
  description: string;
  category: string;
  duration: string;
  is_paid: boolean;
  amount: string | null;
  skills: string[];
  location: string;
  difficulty_level: 'débutant' | 'intermédiaire' | 'avancé';
  status: 'active' | 'in_progress' | 'submitted' | 'reviewed' | 'completed' | 'rejected';
  submission_description?: string;
  submission_files?: Array<{
    name: string;
    path: string;
    size: number;
    type: string;
  }>;
  review_feedback?: string;
  review_score?: number;
  submitted_at?: string;
  reviewed_at?: string;
  created_at: string;
  updated_at: string;
  status_label?: string;
  difficulty_color?: string;
  status_color?: string;
}

export interface CreateMiniProjectData {
  title: string;
  description: string;
  category: string;
  duration: string;
  is_paid?: boolean;
  amount?: string;
  skills: string[];
  location: string;
  difficulty_level: 'débutant' | 'intermédiaire' | 'avancé';
}

export interface SubmitProjectData {
  submission_description: string;
  submission_files?: File[];
}

export interface ReviewProjectData {
  review_feedback: string;
  review_score: number;
}

class MiniProjectService {
  async getMiniProjects(status?: string): Promise<MiniProject[]> {
    const params = status ? { status } : {};
    const response = await api.get('/mini-projects', { params });
    return response.data.data;
  }

  async getMiniProject(id: number): Promise<MiniProject> {
    const response = await api.get(`/mini-projects/${id}`);
    return response.data.data;
  }

  async createMiniProject(data: CreateMiniProjectData): Promise<MiniProject> {
    const response = await api.post('/mini-projects', data);
    return response.data.data;
  }

  async generateSuggestions(count: number = 3): Promise<MiniProject[]> {
    // Simulation de l'appel API avec des données générées localement
    // Dans une implémentation réelle, cela appellerait une API d'IA
    const categories = ['Développement Web', 'Design', 'Marketing Digital', 'Rédaction', 'Analyse de Données'];
    const skills = [
      ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'],
      ['Photoshop', 'Illustrator', 'UI/UX', 'Figma'],
      ['SEO', 'Réseaux Sociaux', 'Google Ads', 'Analyse de Marché'],
      ['Rédaction Web', 'Copywriting', 'Storytelling'],
      ['Excel', 'Python', 'Tableau', 'Power BI']
    ];
    const difficulties = ['débutant', 'intermédiaire', 'avancé'];
    const durations = ['1-3 jours', '1 semaine', '2 semaines', '1 mois'];
    const locations = ['En ligne', 'Lomé', 'Cotonou', 'Dakar', 'Abidjan'];
    
    const suggestions: MiniProject[] = [];
    
    for (let i = 0; i < count; i++) {
      const categoryIndex = Math.floor(Math.random() * categories.length);
      const category = categories[categoryIndex];
      const projectSkills = skills[categoryIndex].sort(() => 0.5 - Math.random()).slice(0, 3);
      const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)] as 'débutant' | 'intermédiaire' | 'avancé';
      
      suggestions.push({
        id: -(i + 1), // ID négatif pour les suggestions non enregistrées
        user_id: 0,
        title: `Projet IA: ${category} - ${projectSkills[0]}`,
        description: `Ce mini-projet généré par IA vous permettra de développer vos compétences en ${category}. Vous travaillerez principalement avec ${projectSkills.join(', ')} pour créer une solution adaptée aux besoins du marché africain.`,
        category,
        duration: durations[Math.floor(Math.random() * durations.length)],
        is_paid: Math.random() > 0.7,
        amount: Math.random() > 0.7 ? `${Math.floor(Math.random() * 20) * 5 + 50}€` : null,
        skills: projectSkills,
        location: locations[Math.floor(Math.random() * locations.length)],
        difficulty_level: difficulty,
        status: 'active',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        status_label: 'Disponible',
        difficulty_color: difficulty === 'débutant' ? 'green' : difficulty === 'intermédiaire' ? 'orange' : 'red',
        status_color: 'blue',
        ai_generated: true // Marquer comme généré par IA
      });
    }
    
    return suggestions;
  }
  
  async getAIFeedback(projectId: number, submissionText: string): Promise<string> {
    // Simulation de feedback IA
    // Dans une implémentation réelle, cela appellerait une API d'IA
    const feedbacks = [
      "Votre solution est bien structurée et répond aux exigences principales. Pour améliorer davantage, considérez d'optimiser la performance et d'ajouter plus de tests.",
      "Excellent travail! Votre approche est créative et l'implémentation est propre. Quelques petites améliorations pourraient être apportées à la documentation.",
      "Bonne tentative, mais certains aspects clés du projet n'ont pas été abordés. Essayez de vous concentrer davantage sur les fonctionnalités principales avant d'ajouter des éléments supplémentaires.",
      "Votre solution montre une bonne compréhension des concepts, mais pourrait bénéficier d'une meilleure organisation du code. Pensez à utiliser des patterns de conception appropriés."
    ];
    
    // Simuler un délai pour l'analyse IA
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return feedbacks[Math.floor(Math.random() * feedbacks.length)];
  }

  async acceptProject(id: number): Promise<MiniProject> {
    const response = await api.post(`/mini-projects/${id}/accept`);
    return response.data.data;
  }

  async submitProject(id: number, data: SubmitProjectData): Promise<MiniProject> {
    const formData = new FormData();
    formData.append('submission_description', data.submission_description);
    
    if (data.submission_files) {
      data.submission_files.forEach((file, index) => {
        formData.append(`submission_files[${index}]`, file);
      });
    }

    const response = await api.post(`/mini-projects/${id}/submit`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  }

  async reviewProject(id: number, data: ReviewProjectData): Promise<MiniProject> {
    const response = await api.post(`/mini-projects/${id}/review`, data);
    return response.data.data;
  }

  async deleteProject(id: number): Promise<void> {
    await api.delete(`/mini-projects/${id}`);
  }

  getDifficultyColor(difficulty: string): string {
    switch (difficulty) {
      case 'débutant':
        return 'bg-green-100 text-green-800';
      case 'intermédiaire':
        return 'bg-yellow-100 text-yellow-800';
      case 'avancé':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getDifficultyLabel(difficulty: string): string {
    switch (difficulty) {
      case 'débutant':
        return 'Débutant';
      case 'intermédiaire':
        return 'Intermédiaire';
      case 'avancé':
        return 'Avancé';
      default:
        return 'Inconnu';
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'submitted':
        return 'bg-purple-100 text-purple-800';
      case 'reviewed':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'active':
        return 'Disponible';
      case 'in_progress':
        return 'En cours';
      case 'submitted':
        return 'Soumis';
      case 'reviewed':
        return 'Évalué';
      case 'completed':
        return 'Terminé';
      case 'rejected':
        return 'Rejeté';
      default:
        return 'Inconnu';
    }
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

export default new MiniProjectService();

