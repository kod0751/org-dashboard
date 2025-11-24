export type Employee = {
  id: number;
  name: string;
  position: string;
  department: string;
  email: string;
  avatar?: string;
  status?: string;
  is_manager?: boolean;
};

export type EmployeeDetail = Employee & {
  phone?: string;
  join_date?: string;
  location?: string;
  skill?: string[];
  cover_image?: string;
  work_type?: string; // '정규직', '계약직' 등
};
