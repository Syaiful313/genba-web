import { Creator } from "./user";

export interface Report {
  id: string;
  workspaceId: string;
  reporterId: string;
  title: string;
  description: string | null;
  photoUrl: string | null;
  pic: string;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  reporter?: Creator;
}
