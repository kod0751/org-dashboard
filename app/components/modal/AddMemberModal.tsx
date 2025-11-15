'use client';

import { useForm, Controller } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/app/components/ui/dialog';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { UserPlus } from 'lucide-react';

interface AddMemberModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface TeamMemberFormData {
  name: string;
  email: string;
  role: string;
  department: string;
}

export function AddMemberModal({ open, onOpenChange }: AddMemberModalProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TeamMemberFormData>({
    defaultValues: {
      name: '',
      email: '',
      role: '',
      department: '',
    },
  });

  const onSubmit = async (data: TeamMemberFormData) => {
    try {
      console.log('팀원 추가:', data);

      await new Promise((resolve) => setTimeout(resolve, 500));

      reset();
      onOpenChange(false);
    } catch (error) {
      console.error('팀원 추가 실패:', error);
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
              <UserPlus className="w-5 h-5 text-ring" />
            </div>
            <DialogTitle className="text-2xl">팀원 추가</DialogTitle>
          </div>
          <DialogDescription className="text-base">
            새로운 팀원의 정보를 입력하여 조직에 추가하세요.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 py-4">
          <div className="grid grid-cols-1 gap-5">
            {/* 이름 입력 */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-semibold">
                이름 <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                placeholder="팀원의 이름을 입력하세요"
                {...register('name', {
                  required: '이름을 입력해주세요',
                  minLength: {
                    value: 2,
                    message: '이름은 최소 2자 이상이어야 합니다',
                  },
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

            {/* 이메일 입력 */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold">
                이메일 <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="example@company.com"
                {...register('email', {
                  required: '이메일을 입력해주세요',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: '올바른 이메일 형식이 아닙니다',
                  },
                })}
                disabled={isSubmitting}
                className="h-10 border-border/50 focus:border-primary"
              />
              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* 직책 입력 */}
              <div className="space-y-2">
                <Label htmlFor="role" className="text-sm font-semibold">
                  직책 <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="role"
                  placeholder="예: 개발자, 매니저"
                  {...register('role', {
                    required: '직책을 입력해주세요',
                  })}
                  disabled={isSubmitting}
                  className="h-10 border-border/50 focus:border-primary"
                />
                {errors.role && (
                  <p className="text-sm text-destructive">
                    {errors.role.message}
                  </p>
                )}
              </div>

              {/* 부서 선택 */}
              <div className="space-y-2">
                <Label htmlFor="department" className="text-sm font-semibold">
                  부서 <span className="text-destructive">*</span>
                </Label>
                <Controller
                  name="department"
                  control={control}
                  rules={{ required: '부서를 선택해주세요' }}
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger
                        id="department"
                        className="h-10 border-border/50 focus:border-primary"
                      >
                        <SelectValue placeholder="부서 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dev">개발팀</SelectItem>
                        <SelectItem value="design">디자인팀</SelectItem>
                        <SelectItem value="sales">영업팀</SelectItem>
                        <SelectItem value="hr">인사팀</SelectItem>
                        <SelectItem value="marketing">마케팅팀</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.department && (
                  <p className="text-sm text-destructive">
                    {errors.department.message}
                  </p>
                )}
              </div>
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
              disabled={isSubmitting}
              className="bg-ring/80 hover:bg-ring/90 text-white"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  추가 중...
                </span>
              ) : (
                '팀원 추가'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
