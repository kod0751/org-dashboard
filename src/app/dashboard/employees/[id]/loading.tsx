export default function Loading() {
  return (
    <main className="flex-1">
      {/* 커버 이미지 */}
      <div className="h-64 bg-gray-200 animate-pulse" />

      <div className="max-w-6xl mx-auto px-12 pb-12">
        {/* 프로필 */}
        <div className="flex items-end gap-6 -mt-20 relative z-10 mb-12">
          <div className="w-40 h-40 rounded-full bg-gray-200 animate-pulse border-4 border-white" />
          <div className="flex flex-col gap-2 pb-2">
            <div className="h-8 w-40 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* 정보 섹션 */}
      <div className="max-w-6xl mx-auto px-12 space-y-12">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-40 bg-gray-200 rounded-2xl animate-pulse" />
        ))}
      </div>
    </main>
  );
}
