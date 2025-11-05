'use client';

import {
  LayoutGrid,
  BarChart3,
  FileText,
  CalendarIcon,
  Settings,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { icon: LayoutGrid, label: '대시보드', active: true },
  { icon: BarChart3, label: '구성원', active: false },
  { icon: FileText, label: '부서', active: false },
  { icon: CalendarIcon, label: '일정', active: false },
  { icon: Settings, label: '설정', active: false },
];

export function Sidebar() {
  return (
    <aside className="flex w-64 flex-col bg-primary">
      {/* Logo */}
      <div className="flex items-center justify-center gap-3 p-6 py-12">
        <figure className="flex h-12 w-12 items-center justify-center rounded-full bg-ring/80">
          <svg
            viewBox="0 0 24 24"
            className="h-7 w-7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2.2L20.6 6.9V17.1L12 21.8L3.4 17.1V6.9L12 2.2Z"
              stroke="white"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <circle cx="12" cy="12" r="2.6" fill="white" />
          </svg>
        </figure>
        <span className="text-xl font-['NanumSquareNeoExtraBold']">
          TeamBase
        </span>
      </div>

      <div>
        <div className="h-px bg-border w-full " />
      </div>

      {/* Navigation */}
      <nav
        aria-label="사이드바 메뉴"
        className="flex-1 space-y-2 p-6 text-md font-['NanumSquareNeoBold']"
      >
        {menuItems.map((item) => (
          <button
            key={item.label}
            className={cn(
              'flex w-full items-center gap-4 p-2.5 rounded-lg transition-colors',
              item.active
                ? 'text-gray-800'
                : 'text-gray-400 hover:text-gray-800 hover:bg-sidebar-active'
            )}
          >
            <item.icon className="h-5 w-5" />
            <span className="flex-1 text-left">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
