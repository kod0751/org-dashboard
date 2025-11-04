import { Heart, Package, ShoppingBag, Briefcase } from 'lucide-react';
import { Card } from '@/app/components/ui/card';

interface State {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  value: number;
  label: string;
  color: string;
}

const stats: State[] = [
  {
    icon: Heart,
    value: 178,
    label: '총 직원 수',
    color: 'bg-blue-100 text-blue-400',
  },
  {
    icon: Package,
    value: 20,
    label: '총 부서 수',
    color: 'bg-yellow-100 text-yellow-400',
  },
  {
    icon: ShoppingBag,
    value: 190,
    label: '진행 중인 프로젝트',
    color: 'bg-red-100 text-red-400',
  },
  {
    icon: Briefcase,
    value: 12,
    label: '활동 중인 직원 수',
    color: 'bg-purple-100 text-purple-400',
  },
];

export default function StateCard() {
  return (
    <section>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-6 font-['NanumSquareNeo']">
            <div className="flex items-center gap-4">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full ${stat.color}`}
              >
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
