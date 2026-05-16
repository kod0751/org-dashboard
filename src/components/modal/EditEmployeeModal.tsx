"use client";

import { Controller, useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { EmployeeDetail } from "@/feature/employees/model/employee";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { updateEmployee } from "@/shared/api/employees/mutation";

interface EditEmployeeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee: EmployeeDetail;
  departments: { id: number; name: string }[];
}

interface EditEmployeeFormData {
  name: string;
  email: string;
  phone: string;
  position: string;
  department_id: number | null; // ID 기반으로 변경
  location: string;
  work_type: string;
}

export function EditEmployeeModal({
  open,
  onOpenChange,
  employee,
  departments,
}: EditEmployeeModalProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditEmployeeFormData>({
    defaultValues: {
      name: employee.name ?? "",
      email: employee.email ?? "",
      phone: employee.phone ?? "",
      position: employee.position ?? "",
      department_id: employee.department_id ?? null, // 기존 부서 ID 연결
      location: employee.location ?? "",
      work_type: employee.work_type ?? "",
    },
  });

  const onSubmit = async (data: EditEmployeeFormData) => {
    try {
      await updateEmployee({
        id: employee.id,
        payload: {
          name: data.name,
          email: data.email,
          phone: data.phone || undefined,
          position: data.position || undefined,
          department_id: data.department_id,
          location: data.location || undefined,
          work_type: data.work_type || undefined,
        },
      });

      onOpenChange(false);
    } catch (error) {
      console.error("수정 실패:", error);
      alert("정보 수정 중 오류가 발생했습니다.");
    }
  };

  const handleClose = () => {
    reset(); // 입력값 초기화
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto font-['NanumSquareNeo']">
        <DialogHeader>
          <DialogTitle>프로필 수정</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 py-4">
          <div className="space-y-2">
            <Label>이름 *</Label>
            <Input {...register("name", { required: "이름을 입력해주세요" })} />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>이메일 *</Label>
            <Input
              type="email"
              {...register("email", {
                required: "이메일을 입력해주세요",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "올바른 이메일 형식이 아닙니다",
                },
              })}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>전화번호</Label>
            <Input {...register("phone")} placeholder="+82 10-0000-0000" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>직책</Label>
              <Input {...register("position")} placeholder="예: 개발자" />
            </div>

            <div className="space-y-2">
              <Label>부서</Label>
              <Controller
                name="department_id"
                control={control}
                render={({ field }) => (
                  <Select
                    // Select 컴포넌트의 value는 문자열이어야 하므로 변환 처리
                    value={field.value?.toString() || "unassigned"}
                    onValueChange={(val) =>
                      field.onChange(val === "unassigned" ? null : Number(val))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="부서 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unassigned">부서 없음</SelectItem>
                      {departments.map((dept) => (
                        <SelectItem key={dept.id} value={dept.id.toString()}>
                          {dept.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>위치</Label>
              <Input {...register("location")} placeholder="예: 서울" />
            </div>

            <div className="space-y-2">
              <Label>근무 형태</Label>
              <Input {...register("work_type")} placeholder="예: 정규직" />
            </div>
          </div>

          <DialogFooter className="gap-2 pt-2">
            <Button type="button" variant="outline" onClick={handleClose}>
              취소
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-ring/80 hover:bg-ring/90 text-white"
            >
              {isSubmitting ? "저장 중..." : "저장"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
