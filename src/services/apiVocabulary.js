import supabase from "./supabase";

export async function createVocabulary(vocabularyObj) {
  const { data, error } = await supabase
    .from("vocabulary")
    .insert([{ ...vocabularyObj }])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Vocabulary could not be created");
  }

  return data;
}

export async function getVocabulary() {
  const { data, error } = await supabase
    .from("vocabulary")
    .select("*")
    .order("word", { ascending: true });

  if (error) throw new Error("Vocabulary could not be loaded");

  return data;
}

export async function getVocabularyPerUserId(userId) {
  // Get all vocabulary, the newest created first
  const { data, error } = await supabase
    .from("vocabulary")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw new Error("Vocabulary could not be loaded");

  return data;
}

export async function deleteVocabulary(id) {
  const { data, error } = await supabase
    .from("vocabulary")
    .delete()
    .eq("id", id);

  if (error) throw new Error("Vocabulary could not be deleted");

  return data;
}

export async function deleteMulitpleVocabulary(ids) {
  const { data, error } = await supabase
    .from("vocabulary")
    .delete()
    .in("id", ids);

  if (error) throw new Error("Vocabularies could not be deleted");

  return data;
}

export async function updateVocabulary(vocabularyObj) {
  const { data, error } = await supabase
    .from("vocabulary")
    .update(vocabularyObj)
    .eq("id", vocabularyObj.id);

  if (error) throw new Error("Vocabulary could not be updated");

  return data;
}

export async function updateWords(words) {
  const { data, error } = await supabase.from("vocabulary").upsert(words);

  if (error) throw new Error("Words could not be updated");

  return data;
}
