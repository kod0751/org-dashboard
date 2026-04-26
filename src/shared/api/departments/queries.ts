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

export async function getDepartmentById(id: number) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('departments')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}
