import { getEmployees } from "@/shared/api/employees/queries";
import { EmployeeList } from "./EmployeeList";
import { getDepartments } from "@/shared/api/departments/queries";

export default async function EmployeesPage() {
  const [employees, departments] = await Promise.all([
    getEmployees(),
    getDepartments(),
  ]);

  return <EmployeeList employees={employees} departments={departments} />;
}
