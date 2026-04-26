'use client';

import { MoreVertical } from 'lucide-react';
import { Button } from './button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

type MoreMenuVariant = 'ghost' | 'outline';

type MenuAction = {
  label: string;
  onClick: () => void;
  danger?: boolean; // 삭제 같은 빨간 스타일
};

interface MoreMenuProps {
  actions: MenuAction[];
  variant?: MoreMenuVariant;
}

export function MoreMenu({ actions, variant = 'ghost' }: MoreMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant={variant} className="h-9 w-9">
          <MoreVertical
            className={cn(
              'w-4 h-4',
              variant === 'ghost' ? 'text-gray-600' : 'text-muted-foreground'
            )}
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-40 font-['NanumSquareNeo']">
        {actions.map((action) => (
          <DropdownMenuItem
            key={action.label}
            onClick={action.onClick}
            className={action.danger ? 'text-red-500 focus:text-red-500' : ''}
          >
            {action.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
