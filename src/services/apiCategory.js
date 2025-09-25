import supabase from "./supabase";

export async function createCategory(categoryObj) {
  const { data, error } = await supabase
    .from("category")
    .insert([{ ...categoryObj }])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Category could not be created");
  }

  return data;
}

export async function getCategory() {
  const { data, error } = await supabase.from("category").select("*");

  if (error) throw new Error("Category could not be loaded");

  return data;
}

export async function getCategoryPerUserId(userId) {
  const { data, error } = await supabase
    .from("category")
    .select("*")
    .eq("user_id", userId);

  if (error) throw new Error("Category per user id could not be loaded");

  return data;
}

export async function deleteCategory(id) {
  const { data, error } = await supabase.from("category").delete().eq("id", id);

  if (error) throw new Error("Category could not be deleted");

  return data;
}

export async function updateCategory(categoryObj) {
  const { data, error } = await supabase
    .from("category")
    .update(categoryObj)
    .eq("id", categoryObj.id);

  if (error) throw new Error("Category could not be updated");

  return data;
}
