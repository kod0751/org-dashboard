'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

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

export async function deleteDepartment(id: number) {
  const supabase = await createClient();

  const { error } = await supabase.from('departments').delete().eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/departments');
  return { success: true };
}
