import { PaginationQueries } from "./pagination";

export interface Report {
  id: string;
  workspaceId: string;
  reporterId: string;
  title: string;
  description: string | null;
  photoUrl: string | null;
  status: "PENDING" | "REVIEWED" | "FIXED" | "CLOSED";
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  reporter?: Creator;
}

export interface Creator {
  firstName: string;
  lastName: string;
  position: string;
}

export interface Workspace {
  id: string;
  title: string;
  description: string | null;
  creatorId: string;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  creator: Creator;
  role?: string; // Optional if you have explicit roles later
  reports?: Report[]; // Included when fetching by ID
}

export interface GetWorkspacesQueries extends PaginationQueries {
  search?: string;
}
