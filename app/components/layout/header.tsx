import { Input } from '@/app/components/ui/input';
import { Plus, Search } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  /* 검색창 placeholder */
  searchPlaceholder?: string;
  /* 추가 버튼 클릭 이벤트 */
  onAddClick?: () => void;
  /* 추가 버튼 텍스트 */
  addLabel?: string;
}

export function DashboardHeader({
  title,
  searchPlaceholder,
  onAddClick,
  addLabel = '추가' /* 기본값 '추가' */,
}: PageHeaderProps) {
  return (
    <header className="flex items-center justify-between font-['NanumSquareNeo']">
      <h1 className="text-3xl">{title}</h1>

      {(searchPlaceholder || onAddClick) && (
        <div className="flex gap-4">
          {searchPlaceholder && (
            <div className="relative max-w-xs">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder={searchPlaceholder}
                className="pl-9 py-5"
              />
            </div>
          )}

          {onAddClick && (
            <button
              onClick={onAddClick}
              className="flex items-center gap-2 px-4 rounded-lg bg-ring/80 text-white"
            >
              <Plus />
              {addLabel}
            </button>
          )}
        </div>
      )}
    </header>
  );
}
