import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {
  createVocabulary as createVocabularyApi,
  deleteVocabulary as deleteVocabularyApi,
  updateVocabulary as updateVocabularyApi,
  updateWords as updateWordsApi,
  getVocabulary,
  getVocabularyPerUserId,
  deleteMulitpleVocabulary as deleteMulitpleVocabularyApi,
} from "../../services/apiVocabulary";
import { useUser } from "../authentification/useUser";

export function useVocabulary() {
  const {
    isLoading,
    data: vocabulary,
    error,
  } = useQuery({
    queryKey: ["vocabulary"],
    queryFn: getVocabulary,
  });

  return { isLoading, error, vocabulary };
}

export function useVocabularyPerUser() {
  const { user } = useUser();

  const {
    isLoading,
    data: vocabulary,
    error,
  } = useQuery({
    queryKey: ["vocaPerUser"],
    queryFn: () => getVocabularyPerUserId(user.id),
  });

  return { isLoading, error, vocabulary };
}

export function useCreateVocabulary() {
  const queryClient = useQueryClient();

  const { mutate: createVocabulary, isPending } = useMutation({
    mutationFn: createVocabularyApi,
    onSuccess: (data) => {
      toast.success("Vocabulary successfully created!");
      // Invalidate the cache so that we can refetch/update the data on the UI
      queryClient.invalidateQueries({ queryKey: ["vocaPerUser"] });
    },

    onError: (err) => {
      toast.error("The process creating vocabulary has failed");
    },
  });

  return { createVocabulary, isPending };
}

export function useVocaTypes(projectSelected, vocabulary) {
  const projectVoca = vocabulary.filter(
    (voca) => voca.project_id === projectSelected?.id
  );

  const wordTypes = {
    none: 0,
    noun: 0,
    adjective: 0,
    adverb: 0,
    expression: 0,
    verb: 0,
  };

  Object.keys(wordTypes).forEach(
    (key) =>
      (wordTypes[key] = projectVoca.filter((voca) => voca.type === key).length)
  );

  return wordTypes;
}

export function useDeleteVocabulary() {
  const queryClient = useQueryClient();

  const { mutate: deleteVocabulary, isPending: isDeleting } = useMutation({
    mutationFn: deleteVocabularyApi,
    onSuccess: (data) => {
      toast.success("Word successfully deleted!");

      // Invalidate the cache so that we can refetch/update the data on the UI
      queryClient.invalidateQueries({ queryKey: ["vocaPerUser"] });
    },
    onError: (err) => {
      toast.error("The process deleting words has failed");
    },
  });

  return { isDeleting, deleteVocabulary };
}

export function useDeleteMultipleVocabulary() {
  const queryClient = useQueryClient();

  const { mutate: deleteMultipleVocabulary, isPending: isDeleting } =
    useMutation({
      mutationFn: deleteMulitpleVocabularyApi,
      onSuccess: (data) => {
        toast.success("Words successfully deleted!");

        // Invalidate the cache so that we can refetch/update the data on the UI
        queryClient.invalidateQueries({ queryKey: ["vocaPerUser"] });
      },
      onError: (err) => {
        toast.error("The process deleting multiple words has failed");
      },
    });

  return { isDeleting, deleteMultipleVocabulary };
}

export function useUpdateVocabulary() {
  const queryClient = useQueryClient();

  const { mutate: updateVocabulary, isPending: isUpdating } = useMutation({
    mutationFn: updateVocabularyApi,
    onSuccess: (data) => {
      toast.success("Word successfully updated!");

      // Invalidate the cache so that we can refetch/update the data on the UI
      queryClient.invalidateQueries({ queryKey: ["vocaPerUser"] });
    },
    onError: (err) => {
      toast.error("The process updating a word has failed");
    },
  });

  return { isUpdating, updateVocabulary };
}

export function useUpdateWords() {
  const queryClient = useQueryClient();

  const { mutate: updateWords, isPending: isUpdating } = useMutation({
    mutationFn: updateWordsApi,
    onSuccess: (data) => {
      toast.success("Words successfully updated!");

      // Invalidate the cache so that we can refetch/update the data on the UI
      queryClient.invalidateQueries({ queryKey: ["vocaPerUser"] });
    },
    onError: (err) => {
      toast.error("The process updating words has failed");
    },
  });

  return { isUpdating, updateWords };
}
