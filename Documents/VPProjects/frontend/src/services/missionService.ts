import api from './api';

export interface Mission {
  id: number;
  title: string;
  description: string;
  category: string;
  duration: string;
  is_paid: boolean;
  amount?: string;
  skills: string[];
  location: string;
  organization: string;
  deadline: string;
  status: 'active' | 'completed' | 'cancelled';
  user_id: number;
  created_at: string;
  updated_at: string;
  applications_count?: number;
  user?: {
    id: number;
    name: string;
    email: string;
  };
}

export interface MissionFilters {
  search?: string;
  category?: string;
  type?: string;
  location?: string;
  page?: number;
}

export interface CreateMissionData {
  title: string;
  description: string;
  category: string;
  duration: string;
  is_paid: boolean;
  amount?: string;
  skills: string[];
  location: string;
  organization: string;
  deadline: string;
}

export interface ApplicationData {
  message?: string;
}

export const missionService = {
  async getMissions(filters: MissionFilters = {}): Promise<{
    data: Mission[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  }> {
    const response = await api.get('/missions', { params: filters });
    return response.data;
  },

  async getMission(id: number): Promise<Mission> {
    const response = await api.get(`/missions/${id}`);
    return response.data;
  },

  async createMission(data: CreateMissionData): Promise<Mission> {
    const response = await api.post('/missions', data);
    return response.data;
  },

  async applyToMission(missionId: number, data: ApplicationData = {}): Promise<any> {
    const response = await api.post(`/missions/${missionId}/apply`, data);
    return response.data;
  },

  async getMyMissions(): Promise<Mission[]> {
    const response = await api.get('/my-missions');
    return response.data;
  },
};

