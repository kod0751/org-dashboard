"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

type CreateEmployee = {
  name: string;
  email: string;
  position?: string;
};

type UpdateEmployee = {
  id: number;
  payload: Partial<{
    name: string;
    email: string;
    phone: string;
    position: string;
    department_id: number | null;
    location: string;
    work_type: string;
  }>;
};

export async function createEmployee(payload: CreateEmployee) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("employees")
    .insert(payload)
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/dashboard/employees");
  return data;
}

export async function updateEmployee({ id, payload }: UpdateEmployee) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("employees")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/dashboard/employees");
  revalidatePath(`/dashboard/employees/${id}`);
  return data;
}
