import { PaginationQueries } from "./pagination";
import { Report } from "./workspace";

export interface GetReportsQueries extends PaginationQueries {
  workspaceId?: string;
  search?: string;
  status?: string;
}

export interface CreateReportPayload {
  title: string;
  description?: string;
  workspaceId: string;
  photo?: File;
}
