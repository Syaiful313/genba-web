"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Report } from "@/types/report";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import {
  Calendar,
  User,
  MapPin,
  Briefcase,
  FileText,
  Clock,
} from "lucide-react";
import Image from "next/image";

interface ReportDetailModalProps {
  report: Report | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ReportDetailModal = ({
  report,
  isOpen,
  onClose,
}: ReportDetailModalProps) => {
  if (!report) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-0 overflow-hidden border-none shadow-2xl bg-background outline-none flex flex-col md:flex-row w-[95vw] md:w-full md:max-w-5xl h-auto md:h-[600px] rounded-2xl sm:max-w-none"
      >
        <DialogHeader className="sr-only">
          <DialogTitle>{report.title}</DialogTitle>
          <DialogDescription>Detail laporan temuan genba</DialogDescription>
        </DialogHeader>

        {/* Left Side: Photo Area - 60% Width */}
        <div className="relative w-full md:w-[60%] h-[250px] md:h-full bg-[#0a0a0a] flex items-center justify-center shrink-0">
          {report.photoUrl ? (
            <Image
              src={report.photoUrl}
              alt={report.title}
              fill
              className="object-contain"
              priority
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-muted-foreground/20 gap-3">
              <FileText className="h-16 w-16" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
                No Documentation
              </span>
            </div>
          )}
          <div className="absolute top-6 left-6">
            <Badge className="bg-primary/95 backdrop-blur-md text-white border-none px-4 py-1.5 font-bold shadow-xl tracking-wider text-[10px]">
              TEMUAN GENBA
            </Badge>
          </div>
        </div>

        {/* Right Side: Details Area - 40% Width */}
        <div className="flex-1 flex flex-col p-8 lg:p-10 bg-background min-w-0">
          <div className="flex-1 overflow-y-auto space-y-8 pr-2 custom-scrollbar">
            {/* Title & Date */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.3em]">
                <Clock className="h-3 w-3" />
                <span>Deep Observation</span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-black tracking-tight text-foreground leading-[1.1] uppercase wrap-break-word">
                {report.title}
              </h2>
              <div className="flex items-center gap-2 text-muted-foreground font-semibold text-sm">
                <Calendar className="h-4 w-4" />
                <span>
                  {format(new Date(report.createdAt), "EEEE, dd MMMM yyyy", {
                    locale: id,
                  })}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] opacity-50">
                Keterangan / Deskripsi
              </h4>
              <div className="text-sm md:text-base text-foreground/80 leading-relaxed bg-muted/30 p-5 rounded-2xl border border-muted-foreground/5 italic">
                "
                {report.description ||
                  "Tidak tersedia deskripsi tambahan untuk laporan ini."}
                "
              </div>
            </div>

            {/* Information List */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 group">
                <div className="p-3 rounded-2xl bg-muted/50 text-primary border border-transparent transition-all group-hover:bg-primary/10 group-hover:border-primary/20">
                  <Briefcase className="h-4 w-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest opacity-60">
                    Penanggung Jawab
                  </span>
                  <span className="text-sm font-black">
                    {report.pic || "Belum ditentukan"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="p-3 rounded-2xl bg-muted/50 text-primary border border-transparent transition-all group-hover:bg-primary/10 group-hover:border-primary/20">
                  <User className="h-4 w-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest opacity-60">
                    Dilaporkan Oleh
                  </span>
                  <span className="text-sm font-black uppercase">
                    {report.reporter
                      ? `${report.reporter.firstName} ${report.reporter.lastName || ""}`
                      : "-"}
                  </span>
                </div>
              </div>

              {report.workspace && (
                <div className="flex items-center gap-4 group">
                  <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20 transition-all">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest opacity-60">
                      Lokasi Kerja
                    </span>
                    <span className="text-sm font-black text-primary truncate">
                      {report.workspace.title}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-8 shrink-0">
            <button
              onClick={onClose}
              className="w-full bg-foreground text-background font-black py-4 rounded-2xl hover:opacity-90 transition-all active:scale-[0.98] cursor-pointer shadow-2xl shadow-foreground/10 uppercase text-xs tracking-[0.2em]"
            >
              Tutup Detail
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
