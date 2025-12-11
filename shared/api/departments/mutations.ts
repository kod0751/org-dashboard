'use server';

import { createClient } from '@/lib/supabase/server';

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
