'use client';

import { Card } from '@/components/ui/card';
import { Users, FolderKanban, CalendarDays } from 'lucide-react';
import { DashboardHeader } from '@/app/components/layout/header';
import { cn } from '@/lib/utils';
import { AddDepartmentModal } from '@/app/components/modal/AddDepartmentModal';
import { useState } from 'react';
import { MoreMenu } from '@/components/ui/more-menu';
import { useRouter } from 'next/navigation';
import { Department } from '@/types/department';

const departments: Department[] = [
  {
    id: 1,
    name: '개발팀',
    manager: '김지훈',
    member_count: 12,
    project_count: 5,
    created_at: '2022-03-15',
    description: '웹 및 모바일 서비스 개발을 담당합니다.',
    color: 'bg-blue-500',
  },
  {
    id: 2,
    name: '디자인팀',
    manager: '이수진',
    member_count: 8,
    project_count: 3,
    created_at: '2022-06-10',
    description: 'UI/UX 및 브랜드 디자인을 총괄합니다.',
    color: 'bg-pink-500',
  },
  {
    id: 3,
    name: '마케팅팀',
    manager: '박민수',
    member_count: 15,
    project_count: 6,
    created_at: '2021-11-22',
    description: '제품 홍보 및 시장 분석을 담당합니다.',
    color: 'bg-green-500',
  },
  {
    id: 4,
    name: '인사팀',
    manager: '정현우',
    member_count: 6,
    project_count: 2,
    created_at: '2023-01-05',
    description: '인사관리 및 복지를 담당합니다.',
    color: 'bg-orange-500',
  },
];

export default function DepartmentsPage() {
  const router = useRouter();
  const [isAddModalOpen, setAddModalOpen] = useState(false);

  return (
    <div className="bg-white min-h-full shadow-xl">
      <div className="flex flex-col gap-12 p-12">
        {/* Header */}
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
              {(
                departments.reduce((sum, d) => sum + d.member_count, 0) /
                departments.length
              ).toFixed(1)}
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
              {/* 부서 헤더 */}
              <div className="flex items-center gap-4 mb-4">
                <div
                  className={cn(
                    'w-12 h-12 rounded-full flex items-center justify-center text-white shadow-md',
                    dept.color
                  )}
                >
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{dept.name}</h3>
                  <p className="text-sm text-gray-500">팀장 {dept.manager}</p>
                </div>
              </div>

              {/* 부서 설명 */}
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {dept.description}
              </p>

              {/* 부서 상태 */}
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
                  <span>{dept.created_at}</span>
                </div>
              </div>

              {/* 부서 상세 */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreMenu
                  actions={[
                    {
                      label: '상세보기',
                      onClick: () =>
                        router.push(`/dashboard/departments/${dept.id}`),
                    },
                    {
                      label: '수정',
                      onClick: () => console.log('edit', dept.id),
                    },
                    {
                      label: '삭제',
                      danger: true,
                      onClick: () => console.log('delete', dept.id),
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
