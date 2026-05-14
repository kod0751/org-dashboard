import { getEmployeeDetail } from "@/shared/api/employees/queries";
import { getDepartments } from "@/shared/api/departments/queries";
import { EmployeeDetail } from "./EmployeeDetail";

type Props = {
  params: { id: string };
};

export default async function EmployeeDetailPage({ params }: Props) {
  const [employee, departments] = await Promise.all([
    getEmployeeDetail(Number(params.id)),
    getDepartments(),
  ]);

  return <EmployeeDetail employee={employee} departments={departments} />;
}
