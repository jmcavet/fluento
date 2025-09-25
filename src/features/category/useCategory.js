import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {
  getCategoryPerUserId,
  createCategory as createCategoryApi,
  getCategory,
  deleteCategory as deleteCategoryApi,
  updateCategory as updateCategoryApi,
} from "../../services/apiCategory";
import { useUser } from "../authentification/useUser";

export function useCategory() {
  const {
    isLoading,
    data: category,
    error,
  } = useQuery({
    queryKey: ["category"],
    queryFn: getCategory,
  });

  return { isLoading, error, category };
}

export function useCategoriesPerUser() {
  const { user } = useUser();

  const {
    isLoading,
    data: categories,
    error,
  } = useQuery({
    queryKey: ["category"],
    queryFn: () => getCategoryPerUserId(user.id),
  });

  return { isLoading, error, categories };
}

export function useCreateCategory() {
  const queryClient = useQueryClient();

  const { mutate: createCategory, isPending } = useMutation({
    mutationFn: createCategoryApi,
    onSuccess: (data) => {
      toast.success("Category successfully created!");
      // Invalidate the cache so that we can refetch/update the data on the UI
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
    onError: (err) => {
      toast.error("The process creating category has failed");
    },
  });

  return { createCategory, isPending };
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  const { mutate: deleteCategory, isPending: isDeleting } = useMutation({
    mutationFn: deleteCategoryApi,
    onSuccess: (data) => {
      toast.success("Category successfully deleted!");
      // Invalidate the cache so that we can refetch/update the data on the UI
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
    onError: (err) => {
      toast.error("The process deleting category has failed");
    },
  });

  return { isDeleting, deleteCategory };
}

export function useVocaCategories(projectSelected, vocabulary) {
  const projectVoca = vocabulary.filter(
    (voca) => voca.project_id === projectSelected?.id
  );

  const arrCategoriesIds = projectVoca.map((voca) => voca.category_ids);

  const newArr = [];
  arrCategoriesIds.forEach((array) => newArr.push(...array));
  const { categories, isLoading } = useCategoriesPerUser();

  // const categoriesByProject = useCategoriesFilteredByProject(projectSelected);
  const categoriesByProject = categories?.filter(
    (category) => category.project_id === projectSelected?.id
  );

  if (isLoading) return;

  const arrCategories = {};
  [...new Set(newArr)].forEach((catId) => {
    const categoryName = categoriesByProject.filter(
      (cat) => cat.id === catId
    )[0].name;
    const nbVocasForCategory = newArr.filter((el) => el === catId).length;
    arrCategories[categoryName] = nbVocasForCategory;
  });

  return arrCategories;
}

export function useCategoriesFilteredByProject(project) {
  const { categories } = useCategoriesPerUser();
  const [categoriesByProject, setCategoriesByProject] = useState(null);

  useEffect(() => {
    const categoriesPerProject = categories?.filter(
      (category) => category.project_id === project?.id
    );

    setCategoriesByProject(categoriesPerProject);
  }, [categories, project?.id]);

  return categoriesByProject;
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  const { mutate: updateCategory, isPending: isUpdating } = useMutation({
    mutationFn: updateCategoryApi,
    onSuccess: (data) => {
      toast.success("Category successfully updated!");

      // Invalidate the cache so that we can refetch/update the data on the UI
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
    onError: (err) => {
      toast.error("The process updating the category has failed");
    },
  });

  return { isUpdating, updateCategory };
}
