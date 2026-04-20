"use server";

import { createClient } from "@/lib/supabase/server";

type CreateProjectInput = {
  department_id: number;
  name: string;
  description?: string;
  due_date?: string | null;
};

type UpdateProjectInput = {
  id: number;
  department_id: number;
  name?: string;
  description?: string;
  due_date?: string | null;
  progress?: number;
  status?: string;
};

export async function createProject(payload: CreateProjectInput) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .insert({
      ...payload,
      progress: 0,
      status: "진행중",
    })
    .select()
    .single();

  if (error) {
    console.error("[createProject]", error);
    throw new Error("프로젝트 생성에 실패했습니다.");
  }

  return data;
}

export async function updateProject(payload: UpdateProjectInput) {
  const supabase = await createClient();
  const { id, department_id, ...body } = payload;

  const { data, error } = await supabase
    .from("projects")
    .update(body)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("[updateProject]", error);
    throw new Error("프로젝트 수정에 실패했습니다.");
  }

  return data;
}
