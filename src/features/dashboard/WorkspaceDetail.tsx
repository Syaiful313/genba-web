"use client";

// import { AppSidebar } from "@/components/AppSidebar";
// import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CreateReportModal } from "@/features/dashboard/components/CreateReportModal";
import { ReportPresentationModal } from "@/features/dashboard/components/ReportPresentationModal";
import { WorkspaceSiteHeader } from "@/features/dashboard/components/WorkspaceSiteHeader";
import useGetWorkspaceById from "@/hooks/api/workspace/useGetWorkspaceById";
import { ArrowLeft, Loader2, Play } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function WorkspaceDetail() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const [isPresentationOpen, setIsPresentationOpen] = useState(false);

  const {
    data: response,
    isLoading,
    isError,
    refetch,
  } = useGetWorkspaceById(id);
  const workspace = response?.data;
  const reports = workspace?.reports || [];

  return (
    <div className="flex min-h-screen flex-col bg-muted/20">
      {/* Sidebar temporarily disabled */}
      {/* <AppSidebar variant="inset" /> */}

      <WorkspaceSiteHeader workspaceTitle={workspace?.title} />

      <main className="flex-1">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="px-4 lg:px-8 max-w-[1600px] mx-auto w-full">
              <div className="flex flex-col gap-6">
                {isLoading ? (
                  <div className="flex h-64 items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                ) : isError || !workspace ? (
                  <div className="flex h-64 flex-col gap-4 items-center justify-center text-red-500">
                    <p>
                      Gagal mengambil detail workspace atau data tidak
                      ditemukan.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => router.back()}
                      className="cursor-pointer"
                    >
                      Kembali
                    </Button>
                  </div>
                ) : (
                  <>
                    <ReportPresentationModal
                      reports={reports}
                      isOpen={isPresentationOpen}
                      onClose={() => setIsPresentationOpen(false)}
                      workspaceTitle={workspace.title}
                    />
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => router.back()}
                          className="shrink-0 cursor-pointer"
                        >
                          <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <div className="min-w-0">
                          <h2 className="text-xl md:text-2xl font-bold tracking-tight break-words text-foreground">
                            {workspace.title}
                          </h2>
                          <p className="text-sm md:text-base text-muted-foreground">
                            {workspace.description ||
                              "Tidak ada deskripsi workspace."}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <Button
                          variant="outline"
                          onClick={() => setIsPresentationOpen(true)}
                          disabled={reports.length === 0}
                          className="flex gap-2 cursor-pointer border-blue-500/20 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                        >
                          <Play className="h-4 w-4 fill-current" />
                          Presentasi
                        </Button>
                        <div className="overflow-hidden">
                          <CreateReportModal
                            workspaceId={id}
                            onSuccess={() => refetch()}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4 mt-4">
                      <h3 className="text-xl font-semibold text-foreground">
                        Daftar Laporan (Reports)
                      </h3>
                      {reports.length === 0 ? (
                        <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed bg-background text-muted-foreground gap-2">
                          <p>Belum ada laporan di workspace ini.</p>
                        </div>
                      ) : (
                        <div className="rounded-md border bg-background overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="w-[50px] text-center border-r last:border-r-0">
                                  No.
                                </TableHead>
                                <TableHead className="border-r last:border-r-0">
                                  Foto
                                </TableHead>
                                <TableHead className="border-r last:border-r-0">
                                  Judul
                                </TableHead>
                                <TableHead className="border-r last:border-r-0">
                                  Deskripsi
                                </TableHead>
                                <TableHead className="border-r last:border-r-0">
                                  Reporter
                                </TableHead>
                                <TableHead className="border-r last:border-r-0">
                                  PIC
                                </TableHead>
                                <TableHead className="last:border-r-0">
                                  Tanggal
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {reports.map((report, index) => (
                                <TableRow key={report.id}>
                                  <TableCell className="text-center border-r last:border-r-0">
                                    {index + 1}
                                  </TableCell>
                                  <TableCell className="border-r last:border-r-0">
                                    {report.photoUrl ? (
                                      <div className="h-10 w-10 rounded-md overflow-hidden border">
                                        <img
                                          src={report.photoUrl}
                                          alt={report.title}
                                          className="h-full w-full object-cover"
                                        />
                                      </div>
                                    ) : (
                                      <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center text-[10px] text-muted-foreground">
                                        No Pic
                                      </div>
                                    )}
                                  </TableCell>
                                  <TableCell className="font-medium border-r last:border-r-0">
                                    {report.title}
                                  </TableCell>
                                  <TableCell
                                    className="text-muted-foreground max-w-[200px] truncate border-r last:border-r-0"
                                    title={report.description || ""}
                                  >
                                    {report.description || "-"}
                                  </TableCell>
                                  <TableCell className="border-r last:border-r-0">
                                    {report.reporter?.firstName}{" "}
                                    {report.reporter?.lastName}
                                  </TableCell>
                                  <TableCell className="border-r last:border-r-0">
                                    {report.pic}
                                  </TableCell>
                                  <TableCell className="whitespace-nowrap last:border-r-0">
                                    {new Date(
                                      report.createdAt,
                                    ).toLocaleDateString("id-ID")}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
