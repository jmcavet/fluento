import { useUser } from "../features/authentification/useUser";
import supabase from "./supabase";

export async function getProjects() {
  const { data, error } = await supabase.from("project").select("*");

  if (error) throw new Error("Projects could not be loaded");

  return data;
}

export async function getProjectsPerUserId(userId) {
  const { data, error } = await supabase
    .from("project")
    .select("*")
    .eq("user_id", userId);

  if (error) throw new Error("Projects could not be loaded");
  return data;
}

export async function createProject(projectObj) {
  const { data, error } = await supabase
    .from("project")
    .insert([{ ...projectObj }])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Project could not be created");
  }

  return data;
}

export async function deleteProject(id) {
  const { data, error } = await supabase.from("project").delete().eq("id", id);
  if (error) throw new Error("Project could not be deleted");

  return data;
}

export async function updateProject(projectObj) {
  const { data, error } = await supabase
    .from("project")
    .update(projectObj)
    .eq("id", projectObj.id);

  if (error) throw new Error("Project could not be updated");

  return data;
}
