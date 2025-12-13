import { Avatar, AvatarImage } from '../ui/avatar';
import { Card } from '../ui/card';

type Employee = {
  id: number;
  name: string;
  role: string;
  email: string;
  updatedAt: string;
  img?: string;
  type: '추가' | '수정';
};

const employees: Employee[] = [
  {
    id: 1,
    name: '김지훈',
    role: 'Frontend Engineer',
    email: 'jihoon@example.com',
    updatedAt: '2025-11-02',
    img: 'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F5612288%2Fpexels-photo-5612288.jpeg%3Fauto%3Dcompress%26cs%3Dtinysrgb%26h%3D627%26fit%3Dcrop%26w%3D1200&type=sc960_832',
    type: '추가',
  },
  {
    id: 2,
    name: '이서연',
    role: 'Design Lead',
    email: 'seoyeon@example.com',
    updatedAt: '2025-11-01',
    type: '수정',
  },
  {
    id: 3,
    name: '박준호',
    role: 'Marketing Manager',
    email: 'junho@example.com',
    updatedAt: '2025-10-30',
    type: '수정',
  },
];

export default function RecentEmployees() {
  return (
    <section>
      <Card className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            최근 추가/수정된 직원
          </h3>
        </div>

        <div className="flex flex-col gap-4">
          {/* 헤더 영역 */}

          <div className="flex items-center px-8 pt-3">
            <div className="flex-1">이름</div>
            <div className="flex-2">직책</div>
            <div className="flex-2">이메일</div>
            <div className="flex-1">수정일</div>
            <div className="flex-1 text-right">유형</div>
          </div>

          {/* 리스트 영역 */}
          {employees.map((employee) => (
            <Card key={employee.id} className="bg-white">
              <div className="flex items-center px-8 py-3">
                <div className="flex flex-1 items-center gap-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={
                        employee.img ||
                        'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2017%2F12%2F20%2F17%2F49%2Fnature-3030385_960_720.jpg&type=a340'
                      }
                    />
                  </Avatar>
                  <div>{employee.name}</div>
                </div>
                <div className="flex-2">{employee.role}</div>
                <div className="flex-2 text-gray-600">{employee.email}</div>
                <div className="flex-1 text-gray-600">{employee.updatedAt}</div>
                <div className="flex-1 text-right">{employee.type}</div>
                {/* TODO: 프로필 버튼 추가 */}
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </section>
  );
}
