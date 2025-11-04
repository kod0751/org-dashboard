'use client';

import { Card } from '@/app/components/ui/card';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';

const data = [
  { name: '개발팀', value: 85, color: 'oklch(0.65 0.25 250)' },
  { name: '디자인팀', value: 42, color: 'oklch(0.70 0.20 180)' },
  { name: '마케팅팀', value: 38, color: 'oklch(0.75 0.18 140)' },
  { name: '영업팀', value: 45, color: 'oklch(0.68 0.22 280)' },
  { name: '기타', value: 38, color: 'oklch(0.72 0.19 60)' },
];

export function DepartmentChart() {
  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">부서별 인원</h3>
        <p className="text-sm text-muted-foreground">전체 조직 구성 현황</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={100}
            paddingAngle={4}
            cornerRadius={50}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{
              borderRadius: '8px',
            }}
          />

          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            formatter={(value) => (
              <span className="text-foreground text-sm">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
}
