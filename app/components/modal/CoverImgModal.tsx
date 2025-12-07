import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ImageIcon, MoreVertical } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface CoverImgModalProps {
  images: string[];
  currentImage: string;
  onImageChange: (image: string) => void;
}

export function CoverImgModal({
  images,
  currentImage,
  onImageChange,
}: CoverImgModalProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="text-white hover:bg-black/20 p-2 rounded-full transition-colors">
          <MoreVertical className="w-5 h-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-4">
        <div className="grid grid-cols-2 gap-3">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => onImageChange(image)}
              className={cn(
                'relative aspect-square rounded-lg overflow-hidden border-2 transition-all hover:scale-105',
                currentImage === image
                  ? 'border-primary ring-2 ring-primary/20'
                  : 'border-transparent hover:border-muted-foreground/20'
              )}
            >
              <Image
                src={image}
                fill
                alt={`커버 이미지 옵션 ${index + 1}`}
                className="object-cover"
                sizes="150px"
              />
              {currentImage === image && (
                <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs">
                    ✓
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
