"use client";

import useAxios from "@/hooks/useAxios";
import { Workspace } from "@/types/workspace";
import { useQuery } from "@tanstack/react-query";

interface WorkspaceDetailResponse {
  data: Workspace;
}

const useGetWorkspaceById = (id: string) => {
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["workspace", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get<WorkspaceDetailResponse>(
        `/workspaces/${id}`,
      );
      return data;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export default useGetWorkspaceById;
