import supabase from "./supabase";

export async function getTag() {
  const { data, error } = await supabase.from("tag").select("*");

  if (error) throw new Error("Tag could not be loaded");

  return data;
}
