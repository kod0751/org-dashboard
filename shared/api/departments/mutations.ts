import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

export async function createDepartment(payload: {
  name: string;
  description?: string;
  color: string;
}) {
  const { data, error } = await supabase
    .from('departments')
    .insert(payload)
    .select()
    .single();

  if (error) throw error;
  return data;
}
