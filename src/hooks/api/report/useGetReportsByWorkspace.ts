"use client";

import useAxios from "@/hooks/useAxios";
import { PageableResponse } from "@/types/pagination";
import { Report } from "@/types/workspace";
import { GetReportsQueries } from "@/types/report";
import { useQuery } from "@tanstack/react-query";

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
    enabled: !!queries?.workspaceId, // Only fetch if we have a workspaceId
  });
};

export default useGetReportsByWorkspace;
