"use client";

import { Card } from "@/components/ui/card";
import { Users, FolderKanban, CalendarDays } from "lucide-react";
import { DashboardHeader } from "@/components/layout/header";
import { cn } from "@/lib/utils";
import { AddDepartmentModal } from "@/components/modal/AddDepartmentModal";
import { useState } from "react";
import { MoreMenu } from "@/components/ui/more-menu";
import { useRouter } from "next/navigation";
import { useDeleteDepartment } from "@/feature/departments/model/useDepartments";
import { Department } from "@/feature/departments/model/department";

type Props = {
  departments: Department[];
};

export function DepartmentList({ departments }: Props) {
  const router = useRouter();
  const deleteMutation = useDeleteDepartment();
  const [isAddModalOpen, setAddModalOpen] = useState(false);

  return (
    <div className="bg-white min-h-full">
      <div className="flex flex-col gap-12 p-12">
        <DashboardHeader
          title="부서"
          searchPlaceholder="부서를 검색하세요"
          addLabel="추가"
          onAddClick={() => setAddModalOpen(true)}
        />

        {/* 부서 요약 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="p-6 text-center">
            <p className="text-gray-500 text-sm">총 부서</p>
            <p className="text-3xl font-semibold">{departments.length}</p>
          </Card>
          <Card className="p-6 text-center">
            <p className="text-gray-500 text-sm">총 팀원 수</p>
            <p className="text-3xl font-semibold">
              {departments.reduce((sum, d) => sum + d.member_count, 0)}
            </p>
          </Card>
          <Card className="p-6 text-center">
            <p className="text-gray-500 text-sm">총 프로젝트</p>
            <p className="text-3xl font-semibold">
              {departments.reduce((sum, d) => sum + d.project_count, 0)}
            </p>
          </Card>
          <Card className="p-6 text-center">
            <p className="text-gray-500 text-sm">평균 인원</p>
            <p className="text-3xl font-semibold">
              {departments.length > 0
                ? (
                    departments.reduce((sum, d) => sum + d.member_count, 0) /
                    departments.length
                  ).toFixed(1)
                : "0"}
            </p>
          </Card>
        </div>

        {/* Department Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {departments.map((dept) => (
            <Card
              key={dept.id}
              className="relative p-6 hover:shadow-lg transition-all border border-gray-200 bg-white group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center text-white shadow-md",
                    dept.color,
                  )}
                >
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{dept.name}</h3>
                  {dept.manager && (
                    <p className="text-sm text-gray-500">팀장 {dept.manager}</p>
                  )}
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {dept.description || "아직 부서 설명이 없습니다"}
              </p>

              <div className="flex flex-col gap-2 text-sm text-gray-500">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" /> 팀원
                  </span>
                  <span className="font-medium text-gray-800">
                    {dept.member_count}명
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <FolderKanban className="w-4 h-4" /> 프로젝트
                  </span>
                  <span className="font-medium text-gray-800">
                    {dept.project_count}개
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <CalendarDays className="w-4 h-4" /> 생성일
                  </span>
                  <span>{dept.created_at.split("T")[0]}</span>
                </div>
              </div>

              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreMenu
                  actions={[
                    {
                      label: "상세보기",
                      onClick: () =>
                        router.push(`/dashboard/departments/${dept.id}`),
                    },
                    {
                      label: "삭제",
                      danger: true,
                      onClick: () => deleteMutation.mutate(dept.id),
                    },
                  ]}
                />
              </div>
            </Card>
          ))}
        </div>

        <AddDepartmentModal
          open={isAddModalOpen}
          onOpenChange={setAddModalOpen}
        />
      </div>
    </div>
  );
}
