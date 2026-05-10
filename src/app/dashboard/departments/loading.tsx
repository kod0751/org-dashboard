export default function Loading() {
  return (
    <div className="bg-white min-h-full p-12 flex flex-col gap-12">
      {/* 헤더 */}
      <div className="h-10 w-48 bg-gray-200 rounded animate-pulse" />

      {/* 요약 카드 4개 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 bg-gray-200 rounded-xl animate-pulse" />
        ))}
      </div>

      {/* 부서 카드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-48 bg-gray-200 rounded-xl animate-pulse" />
        ))}
      </div>
    </div>
  );
}
