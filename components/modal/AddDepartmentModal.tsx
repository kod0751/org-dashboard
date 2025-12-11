'use client';

import { useForm, Controller } from 'react-hook-form';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Building2 } from 'lucide-react';
import { useCreateDepartment } from '@/feature/departments/model/useDepartments';

interface AddDepartmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface DepartmentFormData {
  name: string;
  description: string;
  color: string;
}

export function AddDepartmentModal({
  open,
  onOpenChange,
}: AddDepartmentModalProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DepartmentFormData>({
    defaultValues: {
      name: '',
      description: '',
      color: '',
    },
  });

  const createDepartment = useCreateDepartment();

  const onSubmit = async (data: DepartmentFormData) => {
    try {
      await createDepartment.mutateAsync({
        name: data.name,
        description: data.description || '',
        color: data.color,
      });
      //TODO: 성공메시지 추가
      reset();
      onOpenChange(false);
    } catch (error) {
      //TODO:토스트나 에러 메시지로 사용자에게 알림
      console.error('부서 추가 실패:', error);
    }
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
              <Building2 className="w-5 h-5 text-ring" />
            </div>
            <DialogTitle className="text-2xl">부서 추가</DialogTitle>
          </div>
          <DialogDescription className="text-base">
            새로운 부서를 생성하고 담당 팀장 및 정보를 입력하세요.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 py-4">
          <div className="grid grid-cols-1 gap-5">
            {/* 부서명 */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-semibold">
                부서명 <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                placeholder="예: 개발팀, 디자인팀"
                {...register('name', {
                  required: '부서명을 입력해주세요',
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
                부서 설명
              </Label>
              <Input
                id="description"
                placeholder="부서의 역할이나 담당 업무를 입력하세요"
                {...register('description')}
                disabled={isSubmitting}
                className="h-10 border-border/50 focus:border-primary"
              />
            </div>

            {/* 대표 색상 */}
            <div className="space-y-2">
              <Label htmlFor="color" className="text-sm font-semibold">
                대표 색상 <span className="text-destructive">*</span>
              </Label>
              <Controller
                name="color"
                control={control}
                rules={{ required: '색상을 선택해주세요' }}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger
                      id="color"
                      className="h-10 border-border/50 focus:border-primary"
                    >
                      <SelectValue placeholder="색상 선택" />
                    </SelectTrigger>
                    <SelectContent className="font-['NanumSquareNeo']">
                      <SelectItem value="bg-blue-500">파랑</SelectItem>
                      <SelectItem value="bg-pink-500">핑크</SelectItem>
                      <SelectItem value="bg-green-500">초록</SelectItem>
                      <SelectItem value="bg-orange-500">주황</SelectItem>
                      <SelectItem value="bg-purple-500">보라</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.color && (
                <p className="text-sm text-destructive">
                  {errors.color.message}
                </p>
              )}
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
              disabled={createDepartment.isPending}
              className="bg-ring/80 hover:bg-ring/90 text-white"
            >
              {createDepartment.isPending ? '추가 중...' : '부서 추가'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
