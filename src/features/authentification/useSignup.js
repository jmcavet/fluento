import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { createProject } from "../../services/apiProject";

export function useSignup() {
  const navigate = useNavigate();

  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      toast.success(
        "Account successfully created! Please verify the new account from the user's email address."
      );

      createProject();

      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      toast.error("The signup process has failed");
    },
  });

  return { signup, isPending };
}
