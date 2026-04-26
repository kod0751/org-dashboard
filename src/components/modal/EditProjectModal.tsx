"use client";

import { useForm, Controller } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Project } from "@/feature/projects/model/project";
import { useUpdateProject } from "@/feature/projects/model/useProjects";

interface EditProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project;
}

interface EditProjectFormData {
  name: string;
  description: string;
  progress: number;
  status: string;
  due_date: string;
}

export function EditProjectModal({
  open,
  onOpenChange,
  project,
}: EditProjectModalProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<EditProjectFormData>({
    defaultValues: {
      name: project.name,
      description: project.description ?? "",
      progress: project.progress ?? 0,
      status: project.status ?? "대기",
      due_date: project.due_date ?? "",
    },
  });
  const updateProject = useUpdateProject();

  const onSubmit = (data: EditProjectFormData) => {
    updateProject.mutate(
      {
        id: project.id,
        department_id: project.department_id,
        ...data,
        progress: Number(data.progress),
      },
      {
        onSuccess: () => {
          reset();
          onOpenChange(false);
        },
      },
    );
  };

  const handleClose = () => {
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto font-['NanumSquareNeo']">
        <DialogHeader>
          <DialogTitle>프로젝트 정보 수정</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 py-4">
          {/* 프로젝트명 */}
          <div className="space-y-2">
            <Label>프로젝트명 *</Label>
            <Input
              {...register("name", { required: "프로젝트명을 입력해주세요" })}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* 설명 */}
          <div className="space-y-2">
            <Label>설명</Label>
            <Textarea {...register("description")} />
          </div>

          {/* 진행률 */}
          <div className="space-y-2">
            <Label>진행률 (%)</Label>
            <Input
              type="number"
              min={0}
              max={100}
              {...register("progress", {
                valueAsNumber: true,
                min: { value: 0, message: "0 이상이어야 합니다" },
                max: { value: 100, message: "100 이하이어야 합니다" },
              })}
            />
            {errors.progress && (
              <p className="text-sm text-destructive">
                {errors.progress.message}
              </p>
            )}
          </div>

          {/* 상태 */}
          <div className="space-y-2">
            <Label>상태</Label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="상태 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="대기">대기</SelectItem>
                    <SelectItem value="진행중">진행중</SelectItem>
                    <SelectItem value="완료">완료</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* 마감일 */}
          <div className="space-y-2">
            <Label>마감일</Label>
            <Input type="date" {...register("due_date")} />
          </div>

          <DialogFooter className="gap-2 pt-2">
            <Button type="button" variant="outline" onClick={handleClose}>
              취소
            </Button>
            <Button
              type="submit"
              disabled={updateProject.isPending}
              className="bg-ring/80 hover:bg-ring/90 text-white"
            >
              {updateProject.isPending ? "저장 중..." : "저장"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
