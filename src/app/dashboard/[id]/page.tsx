import WorkspaceDetail from "@/features/dashboard/WorkspaceDetail";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function WorkspaceDetailPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return <WorkspaceDetail />;
}
