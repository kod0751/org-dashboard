export type Employee = {
  id: number;
  name: string;
  position: string;
  department: string;
  email: string;
  avatar?: string;
  status?: string;
  isManager?: boolean;
};

export type EmployeeDetail = Employee & {
  phone?: string;
  joinDate?: string;
  location?: string;
  skill?: string[];
  coverImage?: string;
  workType?: string; // '정규직', '계약직' 등
};
