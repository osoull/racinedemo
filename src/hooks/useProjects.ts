import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useProjectStore } from '../services/projects';

export function useProjects() {
  const { getProjects } = useProjectStore();
  return useQuery({
    queryKey: ['projects'],
    queryFn: getProjects
  });
}

export function useProject(id: string) {
  const { getProject } = useProjectStore();
  return useQuery({
    queryKey: ['projects', id],
    queryFn: () => getProject(id)
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();
  const { createProject } = useProjectStore();
  
  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    }
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();
  const { updateProject } = useProjectStore();
  
  return useMutation({
    mutationFn: ({ id, ...updates }: { id: string } & Parameters<typeof updateProject>[1]) =>
      updateProject(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    }
  });
}