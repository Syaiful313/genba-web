"use client";

import { AppSidebar } from "@/components/AppSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ReportSiteHeader } from "./components/ReportSiteHeader";
import { ReportList } from "./components/ReportList";
import { CreateReportModal } from "../dashboard/components/CreateReportModal";

export default function ReportPage() {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <div className="flex min-h-screen flex-col bg-muted/20">
          <ReportSiteHeader />

          <main className="flex-1">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <div className="px-4 lg:px-8 max-w-[1600px] mx-auto w-full">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                      <h1 className="text-3xl font-bold tracking-tight">
                        Semua Laporan
                      </h1>
                      <p className="text-muted-foreground mt-1">
                        Daftar seluruh laporan temuan dari berbagai workspace.
                      </p>
                    </div>
                    <div>
                      <CreateReportModal />
                    </div>
                  </div>

                  <ReportList />
                </div>
              </div>
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
