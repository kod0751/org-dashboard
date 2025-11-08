'use client';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/app/components/ui/dropdown-menu';
import { Button } from '@/app/components/ui/button';
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '@/app/components/ui/avatar';
import { User, Settings, LogOut } from 'lucide-react';

interface UserDropdownProps {
  name: string;
  email: string;
  avatar?: string;
  onProfile?: () => void;
  onSettings?: () => void;
  onLogout?: () => void;
}

export function UserDropdown({
  name,
  email,
  avatar,
  onProfile,
  onSettings,
  onLogout,
}: UserDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 px-3 py-2 h-auto hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <Avatar className="h-8 w-8 flex-shrink-0">
            <AvatarImage src={avatar || '/placeholder.svg'} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="flex-1 text-left min-w-0">
            <div className="text-sm font-medium text-sidebar-foreground truncate">
              {name}
            </div>
            <div className="text-xs text-sidebar-foreground/60 truncate">
              {email}
            </div>
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56 font-['NanumSquareNeo']">
        <div className="px-2 py-1.5">
          <p className="text-sm font-medium text-foreground">{name}</p>
          <p className="text-xs text-muted-foreground">{email}</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onProfile}>
          <User className="mr-2 h-4 w-4" />
          <span>프로필</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onSettings}>
          <Settings className="mr-2 h-4 w-4" />
          <span>설정</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={onLogout}
          className="cursor-pointer text-destructive focus:text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>로그아웃</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
