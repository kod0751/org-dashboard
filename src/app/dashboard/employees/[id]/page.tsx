import { getEmployeeDetail } from "@/shared/api/employees/queries";
import { getDepartments } from "@/shared/api/departments/queries";
import { EmployeeDetail } from "./EmployeeDetail";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EmployeeDetailPage({ params }: Props) {
  const { id } = await params;

  const [employee, departments] = await Promise.all([
    getEmployeeDetail(Number(id)),
    getDepartments(),
  ]);

  return <EmployeeDetail employee={employee} departments={departments} />;
}
