import { Input } from '@/app/components/ui/input';
import { Card } from '@/app/components/ui/card';
import { Plus, Search, Users, UserCircle, MoreVertical } from 'lucide-react';

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
        <header className="flex items-center justify-between font-['NanumSquareNeo']">
          <h1 className="text-3xl">부서</h1>
          <div className="flex gap-4">
            <div className="flex items-center gap-4 ml-4">
              <div className="relative max-w-xs">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input type="text" placeholder="검색" className="pl-9 py-5" />
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 rounded-lg bg-ring/80 hover:bg-ring text-white">
              <Plus />
              추가
            </button>
          </div>
        </header>

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
