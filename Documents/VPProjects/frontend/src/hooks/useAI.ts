import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { aiService } from '../services/aiService';

export const useAIAssistant = () => {
  return useQuery({
    queryKey: ['ai-assistant'],
    queryFn: () => aiService.getAssistant(),
  });
};

export const useAISuggestions = () => {
  return useQuery({
    queryKey: ['ai-suggestions'],
    queryFn: () => aiService.getMySuggestions(),
  });
};

export const useGenerateSuggestions = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (count: number) => aiService.generateSuggestions(count),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ai-suggestions'] });
    },
  });
};

export const useAcceptSuggestion = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (suggestionId: number) => aiService.acceptSuggestion(suggestionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ai-suggestions'] });
      queryClient.invalidateQueries({ queryKey: ['missions'] });
      queryClient.invalidateQueries({ queryKey: ['my-missions'] });
    },
  });
};

export const useRejectSuggestion = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (suggestionId: number) => aiService.rejectSuggestion(suggestionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ai-suggestions'] });
    },
  });
};

