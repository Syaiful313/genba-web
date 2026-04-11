import { AppSidebar } from "@/components/AppSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SiteHeader } from "@/features/dashboard/components/SiteHeader";
import { WorkspaceList } from "./components/WorkspaceList";

export default function DashboardPage() {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <div className="flex min-h-screen flex-col bg-muted/20">
          <SiteHeader />

          <main className="flex-1">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <div className="px-4 lg:px-8 max-w-[1600px] mx-auto w-full">
                  <WorkspaceList />
                </div>
              </div>
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
