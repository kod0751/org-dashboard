import { Employee } from './employee';

export type DepartmentManager = Pick<
  Employee,
  'name' | 'avatar' | 'position'
> & {
  isManager: true;
};

export type DepartmentMember = Pick<
  Employee,
  'id' | 'name' | 'position' | 'avatar' | 'isManager'
>;

export type DepartmentProject = {
  id: number;
  name: string;
  progress: number;
  status: string;
  dueDate: string;
  description: string;
};

export type Department = {
  id: number;
  name: string;
  manager: string; // 관리자 이름만
  memberCount: number;
  projectCount: number;
  createdAt: string;
  description: string;
  color: string;
};

export type DepartmentDetail = Omit<
  Department,
  'manager' | 'memberCount' | 'projectCount'
> & {
  manager: DepartmentManager;
  location?: string;
  email?: string;
  coverImage?: string;
  members?: DepartmentMember[];
  projects?: DepartmentProject[];
  tags?: string[];
};
