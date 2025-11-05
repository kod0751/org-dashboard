import StateCard from '../components/dashboard/state-card';
import { DepartmentChart } from '../components/charts/pie-chart';
import RecentEmployees from '../components/dashboard/recent-employees';

export default function DashboardPage() {
  return (
    <div className="bg-white min-h-full shadow-xl">
      <div className="flex flex-col gap-12 p-12">
        {/* Header */}
        <header className="flex items-center font-['NanumSquareNeoBold']">
          <h1 className="text-3xl">Dashboard</h1>
        </header>

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
