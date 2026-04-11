import { Creator } from "./user";

export interface Report {
  id: string;
  workspaceId: string | null;
  reporterId: string;
  title: string;
  description: string | null;
  photoUrl: string | null;
  pic: string | null;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  reporter?: Creator;
  workspace?: {
    id: string;
    title: string;
  };
}
