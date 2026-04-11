"use client";

import useAxios from "@/hooks/useAxios";
import { Report } from "@/types/report";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface UpdateReportPayload {
  pic: string;
}

const useUpdateReport = (reportId: string) => {
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateReportPayload) => {
      const { data } = await axiosInstance.patch<{
        message: string;
        report: Report;
      }>(`/reports/${reportId}`, payload);
      return data;
    },
    onSuccess: () => {
      // Invalidate reports query to reflect updated data
      queryClient.invalidateQueries({ queryKey: ["reports"] });
    },
  });
};

export default useUpdateReport;
