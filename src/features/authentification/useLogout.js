import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      // This action will remove the current user from the local storage and from the server. But we also need
      // to remove the current user from the React Query cache (and all query accumulated in that cache)
      queryClient.removeQueries();
      navigate("/landing", { replace: true });
    },
  });

  return { logout, isPending };
}
