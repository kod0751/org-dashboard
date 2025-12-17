'use client';

import { CoverImgModal } from '@/components/modal/CoverImgModal';
import { Button } from '@/components/ui/button';
import InfoItem from '@/components/ui/info-item';
import { EmployeeDetail } from '@/feature/employees/model/employee';
import { ChevronLeft, MoreVertical } from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

const Member: Record<string, EmployeeDetail> = {
  '1': {
    id: 1,
    name: '김지훈',
    email: 'jihoon@example.com',
    phone: '+82 10-3894-9395',
    created_at: '2023-03-15',
    skill: [],
    avatar:
      'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F5612288%2Fpexels-photo-5612288.jpeg%3Fauto%3Dcompress%26cs%3Dtinysrgb%26h%3D627%26fit%3Dcrop%26w%3D1200&type=sc960_832',
  },
  '2': {
    id: 2,
    name: '이서연',
    email: 'seoyeon@example.com',
    phone: '+82 10-8651-1357',
    created_at: '2023-03-15',
    position: 'Product designer',
    department: '디자인팀',
    location: '서울',
    skill: ['Figma', 'Photoshop'],
    work_type: '정규직',
    is_manager: true,
    avatar:
      'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F5612288%2Fpexels-photo-5612288.jpeg%3Fauto%3Dcompress%26cs%3Dtinysrgb%26h%3D627%26fit%3Dcrop%26w%3D1200&type=sc960_832',
  },
};

const coverImages = [
  'https://images.pexels.com/photos/34505016/pexels-photo-34505016.jpeg',
  'https://images.pexels.com/photos/33039121/pexels-photo-33039121.jpeg',
  'https://images.pexels.com/photos/2325447/pexels-photo-2325447.jpeg',
  'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F5612288%2Fpexels-photo-5612288.jpeg%3Fauto%3Dcompress%26cs%3Dtinysrgb%26h%3D627%26fit%3Dcrop%26w%3D1200&type=sc960_832',
];

export default function EmployeeDetailpage() {
  const params = useParams();
  const router = useRouter();
  const employee = Member[params.id as string];
  const [coverImage, setCoverImage] = useState(coverImages[0]);

  return (
    <main className="flex-1 font-['NanumSquareNeo'] shadow-xl">
      {/* 커버 이미지 영역 */}
      <header className="relative h-64 bg-gradient-to-r from-primary/20 to-accent/20 overflow-hidden group">
        <Image
          src={coverImage}
          fill
          priority
          alt={`${employee.name}님의 커버 이미지`}
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="100vw"
        />

        {/* 상단 액션 바 */}
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10">
          <button
            onClick={() => router.back()}
            className="text-white hover:bg-black/20 p-2 rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <CoverImgModal
            images={coverImages}
            currentImage={coverImage}
            onImageChange={setCoverImage}
          />
        </div>
      </header>

      {/* 프로필 정보 섹션 */}
      <div className="max-w-6xl mx-auto px-12 pb-12">
        {/* 프로필 헤더 - 사진 및 기본 정보 */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 -mt-20 relative z-10 mb-12">
          <div className="flex items-end gap-6">
            <div className="relative w-40 h-40 rounded-full border-4 border-card shadow-lg bg-muted overflow-hidden">
              <Image
                src={employee.avatar || '/placeholder.svg'}
                alt={employee.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="pt-2">
              <h1 className="text-4xl font-bold mb-1">{employee.name}</h1>

              {(employee.position || employee.department) && (
                <p className="text-sm text-muted-foreground">
                  {employee.position} · {employee.department}
                </p>
              )}
            </div>
          </div>

          {/* 액션 버튼 */}
          <div>
            <Button
              variant="outline"
              className="border-border hover:bg-muted px-6 bg-transparent"
            >
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <section className="max-w-6xl mx-auto px-12 pb-20 space-y-12">
        {/* 기본 정보 */}
        <div>
          <h2 className="text-xl font-semibold mb-4">기본 정보</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-muted/20 p-6 rounded-2xl border">
            <InfoItem label="이메일" value={employee.email} />
            <InfoItem label="전화번호" value={employee.phone} />
            <InfoItem label="위치" value={employee.location} />
            <InfoItem label="입사일" value={employee.created_at} />
          </div>
        </div>

        {/* 근무 정보 */}
        <div>
          <h2 className="text-xl font-semibold mb-4">근무 정보</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-muted/20 p-6 rounded-2xl border">
            <InfoItem label="직책" value={employee.position} />
            <InfoItem label="부서" value={employee.department} />
            <InfoItem label="근무 형태" value={employee.work_type} />
            <InfoItem
              label="관리자 여부"
              value={employee.is_manager == true ? 'O' : 'X'}
            />
          </div>
        </div>

        {/* 스킬 */}
        <div>
          <h2 className="text-xl font-semibold mb-4">스킬</h2>
          <div className="flex flex-wrap text-muted-foreground leading-relaxed bg-muted/20 p-6 rounded-2xl border gap-2">
            {employee.skill && employee.skill.length > 0 ? (
              employee.skill.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 rounded-full bg-secondary/10 text-secondary border border-secondary/20"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-muted-foreground">등록된 스킬이 없습니다.</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
