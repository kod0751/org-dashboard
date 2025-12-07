'use client';

import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MoreVertical, Users, Target, ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import InfoItem from '@/components/ui/info-item';
import { DepartmentDetail } from '@/types/department';
import { CoverImgModal } from '@/app/components/modal/CoverImgModal';

const departmentData: Record<string, DepartmentDetail> = {
  '1': {
    id: 1,
    name: '개발팀',
    color: 'bg-blue-500',
    created_at: '2022-03-15',
    members: [],
    projects: [],
    tags: [],
  },
  '2': {
    id: 2,
    name: '디자인팀',
    manager: {
      name: '이수진',
      position: 'Head of Design',
      avatar: '/placeholder.svg?height=160&width=160',
      is_manager: true,
    },
    description:
      'UI/UX 및 브랜드 디자인을 총괄하며, 사용자에게 최고의 경험을 제공하기 위해 노력합니다.',
    color: 'bg-pink-500',
    created_at: '2022-06-10',
    location: '본사 4층 B구역',
    email: 'design-team@company.com',
    members: [
      {
        id: 1,
        name: '이수진',
        position: '팀장',
        avatar: '/placeholder.svg?height=100&width=100',
        is_manager: true,
      },
      {
        id: 2,
        name: '김예린',
        position: 'UI/UX 디자이너',
        avatar: '/placeholder.svg?height=100&width=100',
        is_manager: false,
      },
      {
        id: 3,
        name: '박준형',
        position: '그래픽 디자이너',
        avatar: '/placeholder.svg?height=100&width=100',
        is_manager: false,
      },
      {
        id: 4,
        name: '최유나',
        position: '프로덕트 디자이너',
        avatar: '/placeholder.svg?height=100&width=100',
        is_manager: false,
      },
    ],
    projects: [
      {
        id: 1,
        name: '브랜드 리디자인',
        progress: 65,
        status: 'In Progress',
        due_date: '2024-03-25',
        description: '브랜드 아이덴티티 새단장',
      },
      {
        id: 2,
        name: '디자인 시스템 구축',
        progress: 80,
        status: 'On Track',
        due_date: '2024-02-28',
        description: '일관된 디자인 언어 정립',
      },
      {
        id: 3,
        name: '모바일 UI 개선',
        progress: 50,
        status: 'In Progress',
        due_date: '2024-04-10',
        description: '모바일 사용성 향상',
      },
    ],
    tags: ['Figma', 'Sketch', 'Adobe XD', 'Prototyping'],
  },
};

const coverImages = [
  'https://images.pexels.com/photos/34505016/pexels-photo-34505016.jpeg',
  'https://images.pexels.com/photos/33039121/pexels-photo-33039121.jpeg',
  'https://images.pexels.com/photos/2325447/pexels-photo-2325447.jpeg',
  'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F5612288%2Fpexels-photo-5612288.jpeg%3Fauto%3Dcompress%26cs%3Dtinysrgb%26h%3D627%26fit%3Dcrop%26w%3D1200&type=sc960_832',
];

export default function DepartmentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const dept = departmentData[params.id as string];
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [coverImage, setCoverImage] = useState(coverImages[0]);

  return (
    <main className="flex-1 font-['NanumSquareNeo'] shadow-xl">
      {/* 커버 이미지 영역 */}
      <header className="relative h-64 bg-gradient-to-r from-primary/20 to-accent/20 overflow-hidden group">
        <Image
          src={coverImage}
          fill
          priority
          alt={`${dept.name} 커버 이미지`}
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

      {/* 부서 정보 섹션 */}
      <div className="max-w-6xl mx-auto px-12 pb-12">
        {/* 부서 헤더 - 기본 정보 */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 -mt-20 relative z-10 mb-12">
          <div className="flex items-end gap-6">
            <div className="relative w-40 h-40 rounded-full border-4 border-card shadow-lg bg-muted overflow-hidden">
              <div
                className={cn(
                  'w-full h-full flex items-center justify-center text-white',
                  dept.color
                )}
              >
                <Users className="w-20 h-20" />
              </div>
            </div>
            <div className="pt-2">
              <h1 className="text-4xl font-bold mb-1">{dept.name}</h1>
              {dept.manager && (
                <p className="text-sm text-muted-foreground">
                  {dept.manager.name} · {dept.manager.position}
                </p>
              )}
            </div>
          </div>

          {/* 액션 버튼 */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="border-border hover:bg-muted px-6 bg-transparent"
            >
              <Users className="w-4 h-4 mr-2" />
              팀원 관리
            </Button>
            <Button
              variant="outline"
              className="border-border hover:bg-muted px-4 bg-transparent"
              onClick={() => setEditModalOpen(true)}
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
            <InfoItem label="이메일" value={dept.email} />
            <InfoItem label="위치" value={dept.location} />
            <InfoItem label="설립일" value={dept.created_at} />
            <InfoItem
              label="팀원 수"
              value={`${dept?.members?.length ?? 0}명`}
            />
          </div>
        </div>

        {/* 부서 설명 */}
        <div>
          <h2 className="text-xl font-semibold mb-4">부서 소개</h2>
          <div className="bg-muted/20 p-6 rounded-2xl border">
            <p className="text-muted-foreground leading-relaxed">
              {dept.description || '아직 부서 설명이 없습니다'}
            </p>
          </div>
        </div>

        {/* 진행중인 프로젝트 */}
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Target className="w-5 h-5" />
            진행중인 프로젝트
          </h2>

          <div className="space-y-4">
            {dept.projects && dept.projects.length > 0 ? (
              dept.projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-muted/20 p-6 rounded-2xl border hover:bg-muted/30 transition-colors"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg">
                          {project.name}
                        </h3>
                        <Badge
                          variant={
                            project.status === 'In Progress'
                              ? 'default'
                              : 'secondary'
                          }
                          className="text-xs"
                        >
                          {project.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {project.description}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground ml-4">
                      마감: {project.due_date}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">진행률</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-muted/20 p-6 rounded-2xl border text-center">
                <p className="text-muted-foreground">
                  진행중인 프로젝트가 없습니다.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 구성원 */}
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Users className="w-5 h-5" />팀 구성원
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dept.members && dept.members.length > 0 ? (
              dept.members.map((member) => (
                <div
                  key={member.id}
                  className="border rounded-xl p-4 hover:bg-muted/30 transition-colors cursor-pointer flex items-center gap-4"
                >
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={member.avatar || '/placeholder.svg'} />
                    <AvatarFallback
                      className={
                        member.position === '팀장'
                          ? dept.color + ' text-white'
                          : ''
                      }
                    >
                      {member.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {member.position}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-muted/20 p-6 rounded-2xl border text-center">
                <p className="text-muted-foreground">
                  아직 지정된 팀원이 없습니다.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 스킬 */}
        <div>
          <h2 className="text-xl font-semibold mb-4">보유 기술</h2>
          <div className="flex flex-wrap gap-2 bg-muted/20 p-6 rounded-2xl border">
            {dept.tags && dept.tags.length > 0 ? (
              dept.tags.map((tag: string, idx: number) => (
                <span
                  key={idx}
                  className="px-4 py-2 rounded-full bg-secondary/10 text-secondary border border-secondary/20"
                >
                  {tag}
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
