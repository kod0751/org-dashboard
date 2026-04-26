'use client';

import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FolderKanban } from 'lucide-react';
import { useCreateProject } from '@/feature/projects/model/useProjects';

interface AddProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  departmentId: number;
}

interface ProjectFormData {
  name: string;
  description?: string;
  due_date?: string;
}

export function AddProjectModal({
  open,
  onOpenChange,
  departmentId,
}: AddProjectModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormData>({
    defaultValues: {
      name: '',
      description: '',
      due_date: '',
    },
  });

  const createProject = useCreateProject();

  const onSubmit = (data: ProjectFormData) => {
    createProject.mutate(
      {
        department_id: departmentId,
        name: data.name,
        description: data.description || '',
        due_date: data.due_date || null,
      },
      {
        onSuccess: () => {
          reset();
          onOpenChange(false);
        },
      }
    );
  };

  const handleClose = () => {
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] backdrop-blur-sm bg-white font-['NanumSquareNeo']">
        <DialogHeader className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-ring/10 flex items-center justify-center">
              <FolderKanban className="w-5 h-5 text-ring" />
            </div>
            <DialogTitle className="text-2xl">프로젝트 추가</DialogTitle>
          </div>
          <DialogDescription className="text-base">
            부서에 새로운 프로젝트를 추가하고 기본 정보를 입력하세요.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 py-4">
          <div className="grid grid-cols-1 gap-5">
            {/* 프로젝트명 */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-semibold">
                프로젝트명 <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                placeholder="예: 조직관리 시스템 리뉴얼"
                {...register('name', {
                  required: '프로젝트명을 입력해주세요',
                })}
                disabled={isSubmitting}
                className="h-10 border-border/50 focus:border-primary"
              />
              {errors.name && (
                <p className="text-sm text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* 설명 */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-semibold">
                프로젝트 설명
              </Label>
              <Input
                id="description"
                placeholder="프로젝트의 목적이나 범위를 입력하세요"
                {...register('description')}
                disabled={isSubmitting}
                className="h-10 border-border/50 focus:border-primary"
              />
            </div>

            {/* 마감일 */}
            <div className="space-y-2">
              <Label htmlFor="due_date" className="text-sm font-semibold">
                마감일
              </Label>
              <Input
                id="due_date"
                type="date"
                {...register('due_date')}
                disabled={isSubmitting}
                className="h-10 border-border/50 focus:border-primary"
              />
            </div>
          </div>

          <DialogFooter className="gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
              className="border-border hover:bg-muted"
            >
              취소
            </Button>
            <Button
              type="submit"
              disabled={createProject.isPending}
              className="bg-ring/80 hover:bg-ring/90 text-white"
            >
              {createProject.isPending ? '추가 중...' : '프로젝트 추가'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
