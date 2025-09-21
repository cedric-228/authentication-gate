import api from './api';

export interface AISuggestion {
  id: number;
  title: string;
  description: string;
  category: string;
  duration: string;
  is_paid: boolean;
  amount?: string;
  skills: string[];
  location: string;
  difficulty_level: 'débutant' | 'intermédiaire' | 'avancé';
  ai_generated: boolean;
  status: 'suggested' | 'accepted' | 'rejected' | 'converted';
  generated_at: string;
  created_at: string;
  updated_at: string;
}

export interface AIAssistant {
  name: string;
  description: string;
  capabilities: string[];
  avatar: string;
  status: string;
}

export const aiService = {
  async getAssistant(): Promise<AIAssistant> {
    const response = await api.get('/ai/assistant');
    return response.data;
  },

  async generateSuggestions(count: number = 3): Promise<{ suggestions: AISuggestion[]; message: string }> {
    const response = await api.post('/ai/suggestions', { count });
    return response.data;
  },

  async getMySuggestions(): Promise<AISuggestion[]> {
    const response = await api.get('/ai/suggestions');
    return response.data;
  },

  async acceptSuggestion(suggestionId: number): Promise<{ mission: any; message: string }> {
    const response = await api.post(`/ai/suggestions/${suggestionId}/accept`);
    return response.data;
  },

  async rejectSuggestion(suggestionId: number): Promise<{ message: string }> {
    const response = await api.post(`/ai/suggestions/${suggestionId}/reject`);
    return response.data;
  },
};

