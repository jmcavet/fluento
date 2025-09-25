import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createProject as createProjectApi } from "../../services/apiProject";
import { useProjectContext } from "../../contexts/ProjectContext";

export function useCreateProject() {
  const { dispatch } = useProjectContext();

  const queryClient = useQueryClient();

  const { mutate: createProject, isPending } = useMutation({
    mutationFn: createProjectApi,
    onSuccess: (data) => {
      toast.success("Project successfully created!");

      // Define the project that is just being created as the selected one per default
      dispatch({ type: "project/selected", payload: data });

      // Invalidate the cache so that we can refetch/update the data on the UI
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (err) => {
      toast.error("The process creating project has failed");
    },
  });

  return { createProject, isPending };
}
