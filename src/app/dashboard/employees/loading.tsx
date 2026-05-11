export default function Loading() {
  return (
    <div className="bg-white min-h-full p-12 flex flex-col gap-12">
      {/* 헤더 */}
      <div className="h-10 w-48 bg-gray-200 rounded animate-pulse" />

      {/* 필터/정렬 버튼 */}
      <div className="flex justify-end gap-2">
        <div className="h-9 w-16 bg-gray-200 rounded-lg animate-pulse" />
        <div className="h-9 w-16 bg-gray-200 rounded-lg animate-pulse" />
      </div>

      {/* 리스트 */}
      <div className="rounded-xl border border-gray-200 p-6 flex flex-col gap-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-gray-200 rounded-xl animate-pulse" />
        ))}
      </div>
    </div>
  );
}
