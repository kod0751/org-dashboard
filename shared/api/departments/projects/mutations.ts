'use server';

import { createClient } from '@/lib/supabase/server';

type CreateProjectInput = {
  department_id: number;
  name: string;
  description?: string;
  due_date?: string | null;
};

export async function createProject(payload: CreateProjectInput) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('projects')
    .insert({
      ...payload,
      progress: 0,
      status: 'In progress',
    })
    .select()
    .single();

  if (error) {
    console.error('[createProject]', error);
    throw new Error('프로젝트 생성에 실패했습니다.');
  }

  return data;
}
