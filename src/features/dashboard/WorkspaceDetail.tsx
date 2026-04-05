"use client";

import { AppSidebar } from "@/components/AppSidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CreateReportModal } from "@/features/dashboard/components/CreateReportModal";
import { SiteHeader } from "@/features/dashboard/components/SiteHeader";
import useGetWorkspaceById from "@/hooks/api/workspace/useGetWorkspaceById";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

export default function WorkspaceDetail() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const {
    data: response,
    isLoading,
    isError,
    refetch,
  } = useGetWorkspaceById(id);
  const workspace = response?.data;
  const reports = workspace?.reports || [];

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
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
                      <Button variant="outline" onClick={() => router.back()}>
                        Kembali
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => router.back()}
                          >
                            <ArrowLeft className="h-4 w-4" />
                          </Button>
                          <div>
                            <h2 className="text-2xl font-bold tracking-tight">
                              {workspace.title}
                            </h2>
                            <p className="text-muted-foreground">
                              {workspace.description ||
                                "Tidak ada deskripsi workspace."}
                            </p>
                          </div>
                        </div>

                        <CreateReportModal
                          workspaceId={id}
                          onSuccess={() => refetch()}
                        />
                      </div>

                      <div className="flex flex-col gap-4 mt-4">
                        <h3 className="text-xl font-semibold">
                          Daftar Laporan (Reports)
                        </h3>
                        {reports.length === 0 ? (
                          <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed text-muted-foreground gap-2">
                            <p>Belum ada laporan di workspace ini.</p>
                          </div>
                        ) : (
                          <div className="rounded-md border overflow-x-auto">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead className="w-[50px] text-center">
                                    No.
                                  </TableHead>
                                  <TableHead>Foto</TableHead>
                                  <TableHead>Judul</TableHead>
                                  <TableHead>Deskripsi</TableHead>
                                  <TableHead>Reporter</TableHead>
                                  <TableHead>Status</TableHead>
                                  <TableHead>Tanggal</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {reports.map((report, index) => (
                                  <TableRow key={report.id}>
                                    <TableCell className="text-center">
                                      {index + 1}
                                    </TableCell>
                                    <TableCell>
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
                                    <TableCell className="font-medium">
                                      {report.title}
                                    </TableCell>
                                    <TableCell
                                      className="text-muted-foreground max-w-[200px] truncate"
                                      title={report.description || ""}
                                    >
                                      {report.description || "-"}
                                    </TableCell>
                                    <TableCell>
                                      {report.reporter?.firstName}{" "}
                                      {report.reporter?.lastName}
                                    </TableCell>
                                    <TableCell>
                                      <Badge
                                        variant={
                                          report.status === "CLOSED" ||
                                          report.status === "FIXED"
                                            ? "default"
                                            : "secondary"
                                        }
                                      >
                                        {report.status}
                                      </Badge>
                                    </TableCell>
                                    <TableCell className="whitespace-nowrap">
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
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
