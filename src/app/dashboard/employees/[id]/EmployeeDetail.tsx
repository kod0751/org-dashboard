"use client";

import { CoverImgModal } from "@/components/modal/CoverImgModal";
import { EditEmployeeModal } from "@/components/modal/EditEmployeeModal";
import InfoItem from "@/components/ui/info-item";
import { MoreMenu } from "@/components/ui/more-menu";
import type { EmployeeDetail } from "@/feature/employees/model/employee";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const coverImages = [
  "https://images.pexels.com/photos/34505016/pexels-photo-34505016.jpeg",
  "https://images.pexels.com/photos/33039121/pexels-photo-33039121.jpeg",
  "https://images.pexels.com/photos/2325447/pexels-photo-2325447.jpeg",
];

type Props = {
  employee: EmployeeDetail;
  departments: { id: number; name: string }[];
};

export function EmployeeDetail({ employee, departments }: Props) {
  const router = useRouter();
  const [coverImage, setCoverImage] = useState(coverImages[0]);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  return (
    <main className="flex-1 font-['NanumSquareNeo']">
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
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 -mt-20 relative z-10 mb-12">
          <div className="flex items-end gap-6">
            <div className="relative w-40 h-40 rounded-full border-4 border-card shadow-lg bg-muted overflow-hidden">
              <Image
                src={employee.avatar || "/placeholder.svg"}
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
          <MoreMenu
            variant="outline"
            actions={[
              {
                label: "프로필 수정",
                onClick: () => setEditModalOpen(true),
              },
              {
                label: "삭제",
                danger: true,
                onClick: () => {}, // 삭제 (나중에 연결)
              },
            ]}
          />
        </div>
      </div>

      <section className="max-w-6xl mx-auto px-12 pb-20 space-y-12">
        <div>
          <h2 className="text-xl font-semibold mb-4">기본 정보</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-muted/20 p-6 rounded-2xl border">
            <InfoItem label="이메일" value={employee.email} />
            <InfoItem label="전화번호" value={employee.phone} />
            <InfoItem label="위치" value={employee.location} />
            <InfoItem label="입사일" value={employee.created_at} />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">근무 정보</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-muted/20 p-6 rounded-2xl border">
            <InfoItem label="직책" value={employee.position} />
            <InfoItem label="부서" value={employee.department} />
            <InfoItem label="근무 형태" value={employee.work_type} />
            <InfoItem
              label="관리자 여부"
              value={employee.is_manager ? "O" : "X"}
            />
          </div>
        </div>

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

        <EditEmployeeModal
          open={isEditModalOpen}
          onOpenChange={setEditModalOpen}
          employee={employee}
          departments={departments}
        />
      </section>
    </main>
  );
}
