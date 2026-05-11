import { getEmployees } from "@/shared/api/employees/queries";
import { EmployeeList } from "./EmployeeList";

export default async function EmployeesPage() {
  const employees = await getEmployees();
  return <EmployeeList employees={employees} />;
}
