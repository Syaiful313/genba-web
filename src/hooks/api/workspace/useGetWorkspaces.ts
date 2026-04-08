"use client";

import useAxios from "@/hooks/useAxios";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { Workspace } from "@/types/workspace";
import { useQuery } from "@tanstack/react-query";

export interface GetWorkspacesQueries extends PaginationQueries {
  search?: string;
}

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
