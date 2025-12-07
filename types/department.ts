import { Employee } from './employee';

export type DepartmentManager = Pick<
  Employee,
  'name' | 'avatar' | 'position'
> & {
  is_manager: true;
};

export type DepartmentMember = Pick<
  Employee,
  'id' | 'name' | 'position' | 'avatar' | 'is_manager'
>;

export type DepartmentProject = {
  id: number;
  name: string;
  progress: number;
  status: string;
  due_date: string;
  description: string;
};

export type Department = {
  id: number;
  name: string;
  manager?: string; // 관리자 이름만
  member_count: number;
  project_count: number;
  created_at: string;
  description?: string;
  color: string;
};

export type DepartmentDetail = Omit<
  Department,
  'manager' | 'member_count' | 'project_count'
> & {
  manager?: DepartmentManager;
  location?: string;
  email?: string;
  members?: DepartmentMember[];
  projects?: DepartmentProject[];
  tags?: string[];
};
