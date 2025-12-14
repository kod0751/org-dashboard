import {
  createDepartment,
  deleteDepartment,
  updateDepartmentDetail,
} from '@/shared/api/departments/mutations';
import {
  getDepartmentById,
  getDepartments,
} from '@/shared/api/departments/queries';
import { Department } from '@/types/department';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

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
      toast.success('부서가 생성되었습니다.');
    },
    onError: () => {
      toast.error('부서 생성에 실패했습니다.');
    },
  });
}

export function useUpdateDepartmentDetail() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateDepartmentDetail,
    onSuccess: (data, variables) => {
      // 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['departments'] });

      // 수정된 특정 부서의 상세 쿼리도 무효화
      queryClient.invalidateQueries({
        queryKey: ['department', variables.id.toString()],
      });
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
