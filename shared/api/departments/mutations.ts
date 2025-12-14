'use server';

import { createClient } from '@/lib/supabase/server';
import { DepartmentDetail } from '@/types/department';
import { revalidatePath } from 'next/cache';

type UpdateDepartmentVariables = {
  id: number;
  payload: Partial<
    Pick<
      DepartmentDetail,
      'name' | 'email' | 'description' | 'color' | 'location' | 'tags'
    >
  >;
};

export async function createDepartment(payload: {
  name: string;
  description?: string;
  color: string;
}) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('departments')
    .insert(payload)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function updateDepartmentDetail({
  id,
  payload,
}: UpdateDepartmentVariables) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('departments')
    .update(payload)
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath('/departments');
  revalidatePath(`/departments/${id}`);

  return data;
}

export async function deleteDepartment(id: number) {
  const supabase = await createClient();

  const { error } = await supabase.from('departments').delete().eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/departments');
  return { success: true };
}
