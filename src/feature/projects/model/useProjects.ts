import {
  createProject,
  deleteProject,
  updateProject,
} from "@/shared/api/departments/projects/mutations";
import { getProjectsByDepartment } from "@/shared/api/departments/projects/queries";
import { Project } from "@/feature/projects/model/project";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useProjects(departmentId: number) {
  return useQuery<Project[]>({
    queryKey: ["projects", departmentId],
    queryFn: () => getProjectsByDepartment(departmentId),
    enabled: !!departmentId,
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProject,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["projects", variables.department_id],
      });
      queryClient.invalidateQueries({
        queryKey: ["departments", variables.department_id],
      });
      toast.success("프로젝트가 추가되었습니다.");
    },
    onError: () => {
      toast.error("프로젝트 추가에 실패했습니다.");
    },
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProject,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["projects", variables.department_id],
      });
      queryClient.invalidateQueries({
        queryKey: ["departments", variables.department_id],
      });
      toast.success("프로젝트 정보가 수정되었습니다.");
    },
    onError: () => {
      toast.error("프로젝트 정보 수정에 실패했습니다.");
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProject,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["projects", variables.department_id],
      });
      queryClient.invalidateQueries({
        queryKey: ["departments", variables.department_id],
      });
      toast.success("해당 프로젝트를 성공적으로 제거했습니다.");
    },
    onError: () => {
      toast.error("프로젝트 제거에 실패했습니다.");
    },
  });
}
