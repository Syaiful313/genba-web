"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import useGetReportsByWorkspace from "@/hooks/api/report/useGetReportsByWorkspace";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { FileText, MapPin, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ReportDetailModal } from "./ReportDetailModal";
import { Report } from "@/types/report";

export const ReportList = () => {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  
  const limit = 10;

  const { data, isLoading } = useGetReportsByWorkspace({
    page,
    take: limit,
  });

  const reports = data?.data || [];
  const meta = data?.meta;

  const handleOpenDetail = (report: Report) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="rounded-xl border bg-background/50 backdrop-blur-sm overflow-hidden border-none shadow-sm ring-1 ring-border">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-[60px]">No.</TableHead>
              <TableHead className="w-[80px]">Foto</TableHead>
              <TableHead>Judul Temuan</TableHead>
              <TableHead>PIC</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Workspace</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, i) => (
              <TableRow key={i}>
                <TableCell><Skeleton className="h-4 w-4" /></TableCell>
                <TableCell><Skeleton className="h-12 w-16 rounded" /></TableCell>
                <TableCell><Skeleton className="h-4 w-[200px]" /></TableCell>
                <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                <TableCell><Skeleton className="h-4 w-[120px]" /></TableCell>
                <TableCell><Skeleton className="h-8 w-8 ml-auto rounded-full" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (reports.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center border rounded-xl bg-background/50 h-[400px]">
        <div className="rounded-full bg-muted p-6 mb-4">
          <FileText className="h-10 w-10 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold">Belum ada laporan</h3>
        <p className="text-muted-foreground max-w-xs mx-auto">
          Kamu belum membuat laporan temuan apapun. Mulai buat laporan sekarang.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border bg-background/50 backdrop-blur-sm overflow-hidden shadow-sm ring-1 ring-border border-none">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[60px] text-center">No.</TableHead>
              <TableHead className="w-[80px]">Foto</TableHead>
              <TableHead className="min-w-[200px]">Judul Temuan</TableHead>
              <TableHead>PIC</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Workspace</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report, index) => (
              <TableRow key={report.id} className="group transition-colors hover:bg-muted/30">
                <TableCell className="text-center font-medium text-muted-foreground">
                  {((page - 1) * limit) + index + 1}.
                </TableCell>
                <TableCell>
                  <div 
                    onClick={() => handleOpenDetail(report)} 
                    className="relative h-12 w-16 overflow-hidden rounded-md border bg-muted shadow-sm cursor-pointer"
                  >
                    {report.photoUrl ? (
                      <Image
                        src={report.photoUrl}
                        alt={report.title}
                        fill
                        sizes="64px"
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <FileText className="h-5 w-5 text-muted-foreground/30" />
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-semibold text-foreground line-clamp-1">{report.title}</span>
                    <span className="text-xs text-muted-foreground line-clamp-1">{report.description || "Tanpa deskripsi"}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={`font-normal ${!report.pic ? 'text-muted-foreground/50 border-dashed' : 'border-muted-foreground/20'}`}>
                    {report.pic || "Belum ditentukan"}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {format(new Date(report.createdAt), "dd MMM yyyy", { locale: id })}
                </TableCell>
                <TableCell>
                  {report.workspace ? (
                    <div className="flex items-center gap-2 text-sm text-primary/80 font-medium">
                      <MapPin className="h-3.5 w-3.5" />
                      <span className="truncate max-w-[150px]">{report.workspace.title}</span>
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground/50">—</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleOpenDetail(report)}
                    className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary transition-all cursor-pointer"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      {meta && meta.totalPages > 1 && (
        <div className="flex items-center justify-between px-2 pt-2 pb-6">
          <p className="text-sm text-muted-foreground">
            Menampilkan <span className="font-medium">{(page - 1) * limit + 1}</span> sampai <span className="font-medium">{Math.min(page * limit, meta.total)}</span> dari <span className="font-medium">{meta.total}</span> data
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="h-9 w-9 p-0 cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-1">
               {[...Array(meta.totalPages)].map((_, i) => (
                 <Button
                    key={i + 1}
                    variant={page === i + 1 ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPage(i + 1)}
                    className="h-9 w-9 p-0 cursor-pointer"
                 >
                   {i + 1}
                 </Button>
               ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(p => Math.min(meta.totalPages, p + 1))}
              disabled={page === meta.totalPages}
              className="h-9 w-9 p-0 cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Modal Detail Report Baru */}
      <ReportDetailModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        report={selectedReport}
      />
    </div>
  );
};
