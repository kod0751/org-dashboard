import StateCard from "@/components/dashboard/state-card";
import RecentEmployees from "@/components/dashboard/recent-employees";
import { DepartmentChart } from "../../components/charts/pie-chart";
import { DashboardHeader } from "../../components/layout/header";

export default function DashboardPage() {
  return (
    <div className="bg-white min-h-full">
      <div className="flex flex-col gap-12 p-12">
        {/* 헤더 */}
        <DashboardHeader title="Dashboard" />

        {/* 메인 상태 카드 */}
        <div>
          <StateCard />
        </div>

        {/* 메인 부서별 차트 */}
        <div>
          <DepartmentChart />
        </div>

        {/* 최근 변경된 직원 */}
        <div>
          <RecentEmployees />
        </div>
      </div>
    </div>
  );
}
