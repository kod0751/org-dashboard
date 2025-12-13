import {
  createDepartment,
  deleteDepartment,
} from '@/shared/api/departments/mutations';
import {
  getDepartmentById,
  getDepartments,
} from '@/shared/api/departments/queries';
import { Department } from '@/types/department';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useDepartments() {
  return useQuery<Department[]>({
    queryKey: ['departments'],
    queryFn: getDepartments,
  });
}

export function useDepartment(id: string) {
  return useQuery({
    queryKey: ['department', id],
    queryFn: () => getDepartmentById(id),
    enabled: !!id, // id 없을 때 실행 방지
  });
}

export function useCreateDepartment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
    },
  });
}

export function useDeleteDepartment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
    },
  });
}
