"use client";

import useAxios from "@/hooks/useAxios";
import { PageableResponse } from "@/types/pagination";
import { Workspace, GetWorkspacesQueries } from "@/types/workspace";
import { useQuery } from "@tanstack/react-query";

const useGetWorkspaces = (queries?: GetWorkspacesQueries) => {
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["workspaces", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<Workspace>>(
        "/workspaces",
        { params: queries },
      );
      return data;
    },
  });
};

export default useGetWorkspaces;
