'use client';

import { useForm, Controller } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useUpdateDepartmentDetail } from '@/feature/departments/model/useDepartments';
import { DepartmentDetail } from '@/feature/departments/model/department';

interface EditDepartmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  department: DepartmentDetail;
}

interface EditDepartmentFormData {
  name: string;
  description: string;
  location: string;
  email: string;
  color: string;
  tags: string;
}

export function EditDepartmentModal({
  open,
  onOpenChange,
  department,
}: EditDepartmentModalProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<EditDepartmentFormData>({
    defaultValues: {
      name: department.name,
      description: department.description ?? '',
      location: department.location ?? '',
      email: department.email ?? '',
      color: department.color,
      tags: department.tags?.join(', ') ?? '',
    },
  });

  const updateDepartment = useUpdateDepartmentDetail();

  const onSubmit = (data: EditDepartmentFormData) => {
    updateDepartment.mutate(
      {
        id: department.id,
        payload: {
          name: data.name,
          description: data.description || undefined,
          location: data.location || undefined,
          email: data.email || undefined,
          color: data.color,
          tags: data.tags
            .split(',')
            .map((tag) => tag.trim())
            .filter(Boolean),
        },
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
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto font-['NanumSquareNeo']">
        <DialogHeader>
          <DialogTitle>부서 정보 수정</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 py-4">
          {/* 부서명 */}
          <div className="space-y-2">
            <Label>부서명 *</Label>
            <Input
              {...register('name', { required: '부서명을 입력해주세요' })}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* 설명 */}
          <div className="space-y-2">
            <Label>부서 설명</Label>
            <Textarea {...register('description')} />
          </div>

          {/* 위치 */}
          <div className="space-y-2">
            <Label>위치</Label>
            <Input {...register('location')} />
          </div>

          {/* 이메일 */}
          <div className="space-y-2">
            <Label>이메일</Label>
            <Input
              type="email"
              {...register('email', {
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: '올바른 이메일 형식이 아닙니다',
                },
              })}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          {/* 색상 */}
          <div className="space-y-2">
            <Label>대표 색상 *</Label>
            <Controller
              name="color"
              control={control}
              rules={{ required: '색상을 선택해주세요' }}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="색상 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bg-blue-500">파랑</SelectItem>
                    <SelectItem value="bg-pink-500">핑크</SelectItem>
                    <SelectItem value="bg-green-500">초록</SelectItem>
                    <SelectItem value="bg-orange-500">주황</SelectItem>
                    <SelectItem value="bg-purple-500">보라</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* 태그 */}
          <div className="space-y-2">
            <Label>스킬</Label>
            <Input placeholder="태그1, 태그2" {...register('tags')} />
          </div>

          <DialogFooter className="gap-2 pt-2">
            <Button type="button" variant="outline" onClick={handleClose}>
              취소
            </Button>
            <Button
              type="submit"
              disabled={updateDepartment.isPending}
              className="bg-ring/80 hover:bg-ring/90 text-white"
            >
              {updateDepartment.isPending ? '저장 중...' : '저장'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
