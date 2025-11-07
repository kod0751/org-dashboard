'use client';

import { Card } from '@/app/components/ui/card';
import { Users, UserCircle, MoreVertical } from 'lucide-react';
import { DashboardHeader } from '@/app/components/layout/header';

type Department = {
  id: number;
  name: string;
  manager: string;
  memberCount: number;
};

const departments: Department[] = [
  {
    id: 1,
    name: '개발팀',
    manager: '김지훈',
    memberCount: 12,
  },
  {
    id: 2,
    name: '디자인팀',
    manager: '이수진',
    memberCount: 8,
  },
  {
    id: 3,
    name: '마케팅팀',
    manager: '박민수',
    memberCount: 15,
  },
  {
    id: 4,
    name: '영업팀',
    manager: '최유리',
    memberCount: 10,
  },
  {
    id: 5,
    name: '인사팀',
    manager: '정현우',
    memberCount: 6,
  },
  {
    id: 6,
    name: '재무팀',
    manager: '강서연',
    memberCount: 7,
  },
];

export default function DepartmentsPage() {
  return (
    <div className="bg-white min-h-full shadow-xl">
      <div className="flex flex-col gap-12 p-12">
        {/* Header */}
        <DashboardHeader
          title="부서"
          searchPlaceholder="검색"
          onAddClick={() => console.log('클릭')}
        />

        {/* Department Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {departments.map((department) => (
            <Card
              key={department.id}
              className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="flex flex-col gap-4">
                {/* Department Name */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold">{department.name}</h3>
                  </div>
                  <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <MoreVertical className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                {/* Manager Info */}
                <div className="flex items-center gap-2 text-gray-600">
                  <UserCircle className="w-5 h-5" />
                  <span className="text-sm">팀장: {department.manager}</span>
                </div>

                {/* Member Count */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-sm text-gray-500">팀원 수</span>
                  <span className="text-lg font-semibold text-ring">
                    {department.memberCount}명
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
