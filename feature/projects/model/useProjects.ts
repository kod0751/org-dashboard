import { createProject } from '@/shared/api/departments/projects/mutations';
import { getProjectsByDepartment } from '@/shared/api/departments/projects/queries';
import { Project } from '@/types/project';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useProjects(departmentId: number) {
  return useQuery<Project[]>({
    queryKey: ['projects', departmentId],
    queryFn: () => getProjectsByDepartment(departmentId),
    enabled: !!departmentId,
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProject,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({
        queryKey: ['departments', variables.department_id],
      });
      toast.success('프로젝트가 추가되었습니다.');
    },
    onError: () => {
      toast.error('프로젝트 추가에 실패했습니다.');
    },
  });
}
