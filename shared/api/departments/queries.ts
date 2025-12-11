'use server';

import { createClient } from '@/lib/supabase/server';

export async function getDepartments() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('departments')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}
