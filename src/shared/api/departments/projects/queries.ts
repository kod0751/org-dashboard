'use server';

import { createClient } from '@/lib/supabase/server';

export async function getProjectsByDepartment(departmentId: number) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('department_id', departmentId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[getProjectsByDepartment]', error);
    throw new Error('프로젝트 목록을 불러오는데 실패했습니다.');
  }

  return data;
}
