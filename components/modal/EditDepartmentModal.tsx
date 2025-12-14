'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import { useForm, Controller } from 'react-hook-form';
import { DepartmentDetail } from '@/types/department';

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
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
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

  const onSubmit = async (data: EditDepartmentFormData) => {
    const updatedData = {
      ...data,
      tags: data.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag !== ''),
    };

    // TODO: 부서 수정 API 호출
    console.log('Updated department data:', updatedData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto font-['NanumSquareNeo']">
        <DialogHeader>
          <DialogTitle>부서 정보 수정</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              부서명 <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              placeholder="부서명을 입력하세요"
              {...register('name', {
                required: '부서명을 입력해주세요',
              })}
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              부서 설명
            </Label>
            <Textarea
              id="description"
              placeholder="부서 설명을 입력하세요"
              {...register('description')}
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm font-medium">
              위치
            </Label>
            <Input
              id="location"
              placeholder="예: 본사 3층"
              {...register('location')}
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              이메일
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="department@company.com"
              {...register('email', {
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: '올바른 이메일 형식이 아닙니다',
                },
              })}
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="color" className="text-sm font-medium">
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
                  <SelectTrigger id="color">
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
            {errors.color && (
              <p className="text-sm text-destructive">{errors.color.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags" className="text-sm font-medium">
              스킬
            </Label>
            <Input
              id="tags"
              placeholder="태그1, 태그2, 태그3"
              {...register('tags')}
              disabled={isSubmitting}
            />
            <p className="text-xs text-gray-500">
              쉼표(,)로 구분하여 입력하세요
            </p>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              취소
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-ring/80 hover:bg-ring/90 text-white"
            >
              {isSubmitting ? '저장 중...' : '저장'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
