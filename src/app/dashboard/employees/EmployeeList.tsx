"use client";

import { DashboardHeader } from "@/components/layout/header";
import { AddMemberModal } from "@/components/modal/AddMemberModal";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { MoreMenu } from "@/components/ui/more-menu";
import { Employee } from "@/feature/employees/model/employee";
import { ArrowUpDown, SlidersHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Department = {
  id: number;
  name: string;
};

type Props = {
  employees: Employee[];
  departments: Department[];
};

export function EmployeeList({ employees, departments }: Props) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getDepartmentName = (department_id: number | undefined) => {
    if (!department_id) return "-";
    return departments.find((d) => d.id === department_id)?.name ?? "-";
  };

  return (
    <div className="bg-white min-h-full">
      <div className="flex flex-col gap-12 p-12">
        <DashboardHeader
          title="구성원"
          searchPlaceholder="검색"
          onAddClick={() => setIsModalOpen(true)}
        />

        <div className="flex justify-end -mb-8 font-['NanumSquareNeo']">
          <div className="flex gap-2">
            <button className="flex items-center gap-1 px-3 py-2 text-sm rounded-lg border border-gray-200 hover:bg-gray-50">
              <SlidersHorizontal className="w-4 h-4" />
              필터
            </button>
            <button className="flex items-center gap-1 px-3 py-2 text-sm rounded-lg border border-gray-200 hover:bg-gray-50">
              <ArrowUpDown className="w-4 h-4" />
              정렬
            </button>
          </div>
        </div>

        <Card className="p-6">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-[2fr_2fr_1.5fr_3fr_1.5fr_48px] items-center px-8 gap-4">
              <div>이름</div>
              <div>직책</div>
              <div>부서</div>
              <div>이메일</div>
              <div>상태</div>
              <div></div>
            </div>

            {employees.map((employee) => (
              <Card key={employee.id} className="bg-white">
                <div className="grid grid-cols-[2fr_2fr_1.5fr_3fr_1.5fr_48px] items-center px-8 py-3 gap-4">
                  <div className="flex items-center gap-2 min-w-0">
                    <Avatar className="h-10 w-10 flex-shrink-0">
                      <AvatarImage
                        src={
                          employee.avatar ??
                          "https://search.pstatic.net/sunny/?src=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2017%2F12%2F20%2F17%2F49%2Fnature-3030385_960_720.jpg&type=a340"
                        }
                      />
                    </Avatar>
                    <div className="truncate">{employee.name}</div>
                  </div>
                  <div className="truncate">{employee.position}</div>
                  <div className="truncate">
                    {getDepartmentName(employee.department_id)}
                  </div>
                  <div className="truncate">{employee.email}</div>
                  <div className="truncate">{employee.status}</div>
                  <MoreMenu
                    actions={[
                      {
                        label: "프로필 보기",
                        onClick: () =>
                          router.push(`/dashboard/employees/${employee.id}`),
                      },
                      ...(employee.status === "초대 대기중"
                        ? [
                            {
                              label: "초대 보내기",
                              onClick: () => console.log("초대"),
                            },
                          ]
                        : []),
                      {
                        label: "삭제",
                        danger: true,
                        onClick: () => console.log("delete", employee.id),
                      },
                    ]}
                  />
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </div>

      <AddMemberModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
}
