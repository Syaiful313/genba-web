import { Creator } from "./user";
import { Report } from "./report";

export interface Workspace {
  id: string;
  title: string;
  description: string | null;
  creatorId: string;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  creator: Creator;
  role?: string;
  reports?: Report[];
}
