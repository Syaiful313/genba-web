"use client";

import useAxios from "@/hooks/useAxios";
import { Report } from "@/types/report";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface CreateReportPayload {
  title: string;
  description?: string;
  workspaceId: string;
  photo?: File;
  pic: string;
}

const useCreateReport = () => {
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateReportPayload) => {
      const formData = new FormData();
      formData.append("title", payload.title);
      formData.append("workspaceId", payload.workspaceId);
      formData.append("pic", payload.pic);
      
      if (payload.description) {
        formData.append("description", payload.description);
      }
      
      if (payload.photo) {
        formData.append("photo", payload.photo);
      } else if ((payload as any).photoUrl) {
        // Fallback if passing string URL directly just in case
        formData.append("photoUrl", (payload as any).photoUrl);
      }

      const { data } = await axiosInstance.post<Report>("/reports", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    },
    onSuccess: () => {
      // Invalidate both workspaces and reports queries to reflect new data
      queryClient.invalidateQueries({ queryKey: ["reports"] });
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
    },
  });
};

export default useCreateReport;
