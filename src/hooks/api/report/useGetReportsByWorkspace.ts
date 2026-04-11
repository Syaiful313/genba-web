"use client";

import useAxios from "@/hooks/useAxios";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { Report } from "@/types/report";
import { useQuery } from "@tanstack/react-query";

export interface GetReportsQueries extends PaginationQueries {
  workspaceId?: string;
  search?: string;
}

const useGetReportsByWorkspace = (queries?: GetReportsQueries) => {
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["reports", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<Report>>(
        "/reports",
        { params: queries },
      );
      return data;
    },
  });
};

export default useGetReportsByWorkspace;
