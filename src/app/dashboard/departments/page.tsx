import { getDepartments } from "@/shared/api/departments/queries";
import { DepartmentList } from "./DepartmentList";

export default async function DepartmentsPage() {
  const departments = await getDepartments();
  return <DepartmentList departments={departments} />;
}
