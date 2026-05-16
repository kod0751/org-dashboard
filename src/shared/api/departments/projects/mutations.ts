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
  const { id, ...body } = payload;

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

export async function deleteProject(payload: {
  id: number;
  department_id: number;
}) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", payload.id);

  if (error) {
    console.error("[deleteProject] 상세 에러:", JSON.stringify(error, null, 2));
    throw new Error("프로젝트 삭제에 실패했습니다.");
  }
}
