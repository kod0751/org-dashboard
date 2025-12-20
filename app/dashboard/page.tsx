import StateCard from '@/components/dashboard/state-card';
import RecentEmployees from '@/components/dashboard/recent-employees';
import { DepartmentChart } from '../../components/charts/pie-chart';
import { DashboardHeader } from '../../components/layout/header';

export default function DashboardPage() {
  return (
    <div className="bg-white min-h-full">
      <div className="flex flex-col gap-12 p-12">
        {/* Header */}
        <DashboardHeader title="Dashboard" />

        {/* Stat Cards Component */}
        <div>
          <StateCard />
        </div>

        <div>
          <DepartmentChart />
        </div>

        <div>
          <RecentEmployees />
        </div>
      </div>
    </div>
  );
}
