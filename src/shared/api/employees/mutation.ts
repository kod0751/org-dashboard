"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

type CreateEmployee = {
  name: string;
  email: string;
  position?: string;
};

export async function createEmployee(payload: CreateEmployee) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("employees")
    .insert(payload)
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/employees");
  return data;
}
