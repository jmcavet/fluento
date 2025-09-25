import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getProjects,
  deleteProject as deleteProjectApi,
  getProjectsPerUserId,
  updateProject as updateProjectApi,
} from "../../services/apiProject";
import { useUser } from "../authentification/useUser";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useProjectContext } from "../../contexts/ProjectContext";

export function useProject() {
  const { user } = useUser();
  const {
    isLoading,
    data: projects,
    error,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjectsPerUserId(user.id),
  });

  return { isLoading, error, projects };
}

export function useProjectsNames(projects) {
  const [projectsNames, setProjectNames] = useState([]);

  useEffect(() => {
    if (projects?.length > 0) {
      const projectNames = projects.map((project) => project.name);
      setProjectNames(projectNames);
    }
  }, [projects]);

  return projectsNames;
}

export function useNumberWordsPerProject(projects, vocabulary) {
  const numberWordsPerProject = projects.map(
    (project) =>
      vocabulary.filter((voca) => voca.project_id === project.id).length
  );

  const numberIncompleteWordsPerProject = projects.map(
    (project) =>
      vocabulary.filter((obj) => {
        return (
          obj.project_id === project.id &&
          ((obj.word && !obj.word_translation) ||
            (!obj.word && obj.word_translation) ||
            (obj.context && !obj.context_translation) ||
            (!obj.context && obj.context_translation))
        );
      }).length
  );

  const numberCompleteWordsPerProject = numberWordsPerProject.map(
    (item, index) => item - numberIncompleteWordsPerProject[index]
  );

  return {
    numberCompleteWordsPerProject,
    numberIncompleteWordsPerProject,
  };
}

export function useProjectSelected(projects) {
  const { state: stateProject, dispatch: dispatchProject } =
    useProjectContext();
  const projectSelected = stateProject.projectSelected;

  useEffect(() => {
    if (projects && !projectSelected) {
      dispatchProject({
        type: "project/selected",
        payload: projects[0],
      });
    }
  }, [projectSelected, dispatchProject, projects]);

  return projectSelected;
}

export function useDeleteProject() {
  const queryClient = useQueryClient();

  const { mutate: deleteProject, isPending: isDeleting } = useMutation({
    mutationFn: deleteProjectApi,
    onSuccess: (data) => {
      toast.success("Project successfully deleted!");

      // Invalidate the cache so that we can refetch/update the data on the UI
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (err) => {
      toast.error("The process deleting projects has failed");
    },
  });

  return { isDeleting, deleteProject };
}

export function useUpdateProject() {
  const queryClient = useQueryClient();

  const { mutate: updateProject, isPending: isUpdating } = useMutation({
    mutationFn: updateProjectApi,
    onSuccess: (data) => {
      toast.success("Project successfully updated!");

      // Invalidate the cache so that we can refetch/update the data on the UI
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (err) => {
      toast.error("The process updating a project has failed");
    },
  });

  return { isUpdating, updateProject };
}
