'use client';

import { Button } from '@/app/components/ui/button';
import { MoreVertical } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

function InfoItem({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-medium">{value || '-'}</p>
    </div>
  );
}

export default function page() {
  const teamMember = {
    id: 1,
    name: '김지훈',
    email: 'jihoon@example.com',
    position: 'Frontend Engineer',
    department: '개발팀',
    phone: '+82 10-3894-9395',
    joinDate: '2023-03-15',
    location: '서울',
    skill: ['JavaScript', 'React', 'Next.js', 'TypeScript'],
    avatar:
      'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F5612288%2Fpexels-photo-5612288.jpeg%3Fauto%3Dcompress%26cs%3Dtinysrgb%26h%3D627%26fit%3Dcrop%26w%3D1200&type=sc960_832',
    coverImage:
      'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F5612288%2Fpexels-photo-5612288.jpeg%3Fauto%3Dcompress%26cs%3Dtinysrgb%26h%3D627%26fit%3Dcrop%26w%3D1200&type=sc960_832',
  };

  return (
    <main className="flex-1 font-['NanumSquareNeo'] shadow-xl">
      {/* 커버 이미지 영역 */}
      <header className="relative h-64 bg-gradient-to-r from-primary/20 to-accent/20 overflow-hidden group">
        <Image
          src={
            teamMember.coverImage ||
            'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F5612288%2Fpexels-photo-5612288.jpeg%3Fauto%3Dcompress%26cs%3Dtinysrgb%26h%3D627%26fit%3Dcrop%26w%3D1200&type=sc960_832'
          }
          fill
          priority
          alt={`${teamMember.name}님의 커버 이미지`}
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="100vw"
        />

        {/* 상단 액션 바 */}
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center">
          <Link href="/dashboard">
            <button className="text-white hover:bg-black/20 p-2 rounded-full transition-colors">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          </Link>

          <button className="text-white hover:bg-black/20 p-2 rounded-full transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* 프로필 정보 섹션 */}
      <div className="max-w-6xl mx-auto px-12 pb-12">
        {/* 프로필 헤더 - 사진 및 기본 정보 */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 -mt-20 relative z-10 mb-12">
          <div className="flex items-end gap-6">
            <div className="relative w-40 h-40 rounded-full border-4 border-card shadow-lg bg-muted overflow-hidden">
              <Image
                src={teamMember.avatar || '/placeholder.svg'}
                alt={teamMember.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="pt-2">
              <h1 className="text-4xl font-bold mb-1">{teamMember.name}</h1>

              <p className="text-sm text-muted-foreground">
                {teamMember.position} · {teamMember.department}
              </p>
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
            <InfoItem label="이메일" value={teamMember.email} />
            <InfoItem label="전화번호" value={teamMember.phone} />
            <InfoItem label="위치" value={teamMember.location} />
            <InfoItem label="입사일" value={teamMember.joinDate} />
          </div>
        </div>

        {/* 근무 정보 */}
        <div>
          <h2 className="text-xl font-semibold mb-4">근무 정보</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-muted/20 p-6 rounded-2xl border">
            <InfoItem label="직책" value={teamMember.position} />
            <InfoItem label="부서" value={teamMember.department} />
            <InfoItem label="근무 형태" value="정규직" />
            <InfoItem label="관리자 여부" value="X" />
          </div>
        </div>

        {/* 스킬 */}
        <div>
          <h2 className="text-xl font-semibold mb-4">스킬</h2>
          <div className="flex flex-wrap text-muted-foreground leading-relaxed bg-muted/20 p-6 rounded-2xl border gap-2">
            {teamMember.skill.map((skill, index) => (
              <span
                key={index}
                className="px-4 rounded-full bg-secondary/10 text-secondary border border-secondary/20"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* 활동 / 프로젝트 */}
        <div>
          <h2 className="text-xl font-semibold mb-4">참여 중인 프로젝트</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="border rounded-xl p-4 hover:bg-muted/30 transition-colors cursor-pointer"
              >
                <h3 className="font-medium">Design Platform TF</h3>
                <p className="text-sm text-muted-foreground">프론트엔드 담당</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
