import { getEmployeeDetail } from "@/shared/api/employees/queries";
import { EmployeeDetail } from "./EmployeeDetail";

type Props = {
  params: { id: string };
};

export default async function EmployeeDetailPage({ params }: Props) {
  const employee = await getEmployeeDetail(Number(params.id));
  return <EmployeeDetail employee={employee} />;
}
