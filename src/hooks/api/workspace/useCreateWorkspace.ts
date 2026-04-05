import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

interface CreateWorkspacePayload {
  title: string;
  description?: string;
}

const useCreateWorkspace = () => {
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: CreateWorkspacePayload) => {
      const { data } = await axiosInstance.post("/workspaces", payload);
      return data;
    },
    onSuccess: () => {
      toast.success("Workspace created successfully");
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
    },
    onError: (error: AxiosError<any>) => {
      toast.error(
        error.response?.data?.message || "Failed to create workspace",
      );
    },
  });
};

export default useCreateWorkspace;
