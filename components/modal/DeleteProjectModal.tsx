"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Project } from "@/feature/projects/model/project";
import { useDeleteProject } from "@/feature/projects/model/useProjects";

interface DeleteProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project;
}

export function DeleteProjectModal({
  open,
  onOpenChange,
  project,
}: DeleteProjectModalProps) {
  const deleteProject = useDeleteProject();

  const handleDelete = () => {
    deleteProject.mutate(
      { id: project.id, department_id: project.department_id },
      { onSuccess: () => onOpenChange(false) },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md font-['NanumSquareNeo']">
        <DialogHeader>
          <DialogTitle>프로젝트 삭제</DialogTitle>
          <DialogDescription>
            <span className="font-semibold text-foreground">
              {project.name}
            </span>{" "}
            프로젝트를 삭제하시겠습니까? <br /> 이 작업은 되돌릴 수 없습니다.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            취소
          </Button>
          <Button
            variant="destructive"
            disabled={deleteProject.isPending}
            onClick={handleDelete}
          >
            {deleteProject.isPending ? "삭제 중..." : "삭제"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
