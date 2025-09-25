import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      // Below allows us to manually set some data into the React query cache.
      // As soon as the user data has been received from supabase, it is immediately stored into the cache.
      // Whenever we want to use "useUser", it won't have to fetch the data from supabase since it will be
      // already stored in the cache.
      queryClient.setQueryData(["user"], user.user);
      // navigate("/dashboard", { replace: true });
      navigate("/", { replace: true });
    },
    onError: (err) => {
      toast.error("Provided email or password are incorrect");
    },
  });

  return { login, isPending };
}
