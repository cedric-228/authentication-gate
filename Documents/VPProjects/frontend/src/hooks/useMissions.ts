import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { missionService, MissionFilters, CreateMissionData, ApplicationData } from '../services/missionService';

export const useMissions = (filters: MissionFilters = {}) => {
  return useQuery({
    queryKey: ['missions', filters],
    queryFn: () => missionService.getMissions(filters),
  });
};

export const useMission = (id: number) => {
  return useQuery({
    queryKey: ['mission', id],
    queryFn: () => missionService.getMission(id),
    enabled: !!id,
  });
};

export const useMyMissions = () => {
  return useQuery({
    queryKey: ['my-missions'],
    queryFn: () => missionService.getMyMissions(),
  });
};

export const useCreateMission = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateMissionData) => missionService.createMission(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['missions'] });
      queryClient.invalidateQueries({ queryKey: ['my-missions'] });
    },
  });
};

export const useApplyToMission = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ missionId, data }: { missionId: number; data?: ApplicationData }) => 
      missionService.applyToMission(missionId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['missions'] });
      queryClient.invalidateQueries({ queryKey: ['my-missions'] });
    },
  });
};

