'use client';

import { DashboardHeader } from '@/app/components/layout/header';
import { Avatar, AvatarImage } from '@/app/components/ui/avatar';
import { Card } from '@/app/components/ui/card';
import { ArrowUpDown, Ellipsis, SlidersHorizontal } from 'lucide-react';

type Employee = {
  id: number;
  name: string;
  role: string;
  department: string;
  email: string;
  updatedAt: string;
  img?: string;
  status: string;
  type: '추가' | '수정';
};

const employees: Employee[] = [
  {
    id: 1,
    name: '김지훈',
    role: 'Frontend Engineer',
    department: '개발팀',
    email: 'jihoon@example.com',
    updatedAt: '2025-11-02',
    img: 'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F5612288%2Fpexels-photo-5612288.jpeg%3Fauto%3Dcompress%26cs%3Dtinysrgb%26h%3D627%26fit%3Dcrop%26w%3D1200&type=sc960_832',
    type: '추가',
    status: '휴가',
  },
  {
    id: 2,
    name: '이서연',
    role: 'Design Lead',
    department: '디자인팀',
    email: 'seoyeon@example.com',
    updatedAt: '2025-11-01',
    type: '수정',
    status: '재택근무',
  },
  {
    id: 3,
    name: '박준호',
    role: 'Marketing Manager',
    department: '마케팅팀',
    email: 'junho@example.com',
    updatedAt: '2025-10-30',
    type: '수정',
    status: '출근',
  },
];

export default function EmployeesPage() {
  return (
    <div className="bg-white min-h-full shadow-xl">
      <div className="flex flex-col gap-12 p-12">
        {/* Header */}
        <DashboardHeader
          title="구성원"
          searchPlaceholder="검색"
          onAddClick={() => console.log('클릭')}
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
            {/* List Header */}
            <div className="grid grid-cols-[2fr_2fr_1.5fr_3fr_1.5fr_48px] items-center px-8 gap-4">
              <div>이름</div>
              <div>직책</div>
              <div>부서</div>
              <div>이메일</div>
              <div>상태</div>
              <div></div>
            </div>

            {/* List */}
            {employees.map((employee) => (
              <Card key={employee.id} className="bg-white">
                <div className="grid grid-cols-[2fr_2fr_1.5fr_3fr_1.5fr_48px] items-center px-8 py-3 gap-4">
                  <div className="flex items-center gap-2 min-w-0">
                    <Avatar className="h-10 w-10 flex-shrink-0">
                      <AvatarImage
                        src={
                          employee.img ||
                          'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2017%2F12%2F20%2F17%2F49%2Fnature-3030385_960_720.jpg&type=a340'
                        }
                      />
                    </Avatar>
                    <div className="truncate">{employee.name}</div>
                  </div>
                  <div className="truncate">{employee.role}</div>
                  <div className="truncate">{employee.department}</div>
                  <div className="truncate">{employee.email}</div>
                  <div className="truncate">{employee.status}</div>
                  <button className="flex items-center justify-center w-full h-full rounded-lg hover:bg-gray-50">
                    <Ellipsis className="w-4 h-4" />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
