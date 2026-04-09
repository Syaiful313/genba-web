"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Report } from "@/types/report";
import {
  AlertCircle,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
  User,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export function ReportPresentationModal({
  reports,
  isOpen,
  onClose,
  workspaceTitle,
}: {
  reports: Report[];
  isOpen: boolean;
  onClose: () => void;
  workspaceTitle?: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showThumbnails, setShowThumbnails] = useState(false);

  const next = useCallback(
    () => setCurrentIndex((prev) => (prev + 1) % reports.length),
    [reports.length],
  );
  const prev = useCallback(
    () =>
      setCurrentIndex((prev) => (prev - 1 + reports.length) % reports.length),
    [reports.length],
  );

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, next, prev, onClose]);

  // Reset index saat ditutup
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setCurrentIndex(0);
        setShowThumbnails(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (reports.length === 0) return null;
  const currentReport = reports[currentIndex];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      {/* 
        Override sm:max-w-sm dari dialog.tsx bawaan dengan sm:max-w-none 
        dan paksa width/height full screen 
      */}
      <DialogContent
        showCloseButton={false}
        className={cn(
          "fixed inset-0 z-100 flex flex-col gap-0 p-0 border-none bg-[#050505] overflow-hidden transition-all duration-500",
          "w-screen h-screen max-w-none sm:max-w-none rounded-none translate-x-0 translate-y-0 top-0 left-0",
        )}
      >
        <DialogTitle className="sr-only">
          Presentasi Laporan Profesional
        </DialogTitle>
        <DialogDescription className="sr-only">
          Mode presentasi hasil temuan Genba untuk {currentReport.title}
        </DialogDescription>

        {/* TOP BAR - Editorial Style */}
        <div className="relative z-30 h-14 md:h-20 flex items-center justify-between px-6 md:px-10 bg-linear-to-b from-black/80 to-transparent shrink-0">
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                <List className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-white font-bold text-sm md:text-lg tracking-tight uppercase truncate max-w-[150px] md:max-w-md">
                {workspaceTitle || "Genba Insight"}
              </h3>
            </div>
            <div className="hidden md:block w-px h-6 bg-white/10" />
            <div className="flex items-center gap-2 text-white/40 text-[10px] md:text-xs font-mono uppercase tracking-[0.2em]">
              <span className="text-blue-500 font-bold">
                {currentIndex + 1}
              </span>
              <span>/</span>
              <span>{reports.length} Reports</span>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowThumbnails(!showThumbnails)}
              className={cn(
                "hidden md:flex gap-2 text-white/50 hover:text-white hover:bg-white/10 rounded-full px-4 border border-transparent transition-all",
                showThumbnails && "bg-white/10 border-white/20 text-white",
              )}
            >
              <LayoutGrid className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Preview
              </span>
            </Button>

            <button
              onClick={onClose}
              className="p-2 md:p-3 rounded-full bg-white/5 hover:bg-white/20 text-white/50 hover:text-white transition-all transform hover:rotate-90 active:scale-90"
            >
              <X className="h-5 w-5 md:h-6 md:w-6" />
            </button>
          </div>
        </div>

        {/* MAIN STAGE */}
        <div className="relative z-10 flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden select-none">
          {/* IMAGE AREA - Large Center */}
          <div className="flex-1 relative flex items-center justify-center p-2 pb-28 md:p-6 md:pb-32 lg:p-10 lg:pb-36 overflow-hidden">
            {/* Dynamic Background Glow */}
            <div className="absolute inset-0 z-0 flex items-center justify-center opacity-20 pointer-events-none blur-[120px]">
              <div className="w-[60vw] h-[60vh] bg-blue-600/30 rounded-full animate-pulse" />
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prev}
              className="absolute left-4 md:left-10 z-20 group p-4 text-white/10 hover:text-white transition-all transform hover:-translate-x-2"
            >
              <div className="relative flex flex-col items-center">
                <ChevronLeft className="h-10 w-10 md:h-16 md:w-16 stroke-[1.5]" />
                <span className="absolute -bottom-6 text-[10px] font-bold opacity-0 group-hover:opacity-100 uppercase tracking-widest transition-opacity">
                  PREV
                </span>
              </div>
            </button>

            <div className="relative z-10 w-full h-full flex items-center justify-center p-2 group">
              {currentReport.photoUrl ? (
                <div className="relative w-full h-full flex items-center justify-center group/img">
                  <img
                    src={currentReport.photoUrl}
                    className="max-w-full max-h-full object-contain rounded-2xl shadow-[0_0_100px_rgba(0,0,0,0.8)] border border-white/5 select-none"
                    alt={currentReport.title}
                  />
                  <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-blue-500 rounded-tl-xl opacity-50 transition-all duration-300 group-hover/img:-translate-x-2 group-hover/img:-translate-y-2" />
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-blue-500 rounded-br-xl opacity-50 transition-all duration-300 group-hover/img:translate-x-2 group-hover/img:translate-y-2" />
                </div>
              ) : (
                <div className="w-56 h-56 md:w-64 md:h-64 rounded-[3rem] bg-white/1 border border-white/5 flex flex-col items-center justify-center text-white/5 space-y-4">
                  <AlertCircle className="h-16 w-16 md:h-20 md:w-20 stroke-[0.5]" />
                  <p className="font-bold tracking-[0.5em] text-[10px] md:text-xs">
                    NO DOCUMENTATION
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={next}
              className="absolute right-4 md:right-10 z-20 group p-4 text-white/10 hover:text-white transition-all transform hover:translate-x-2"
            >
              <div className="relative flex flex-col items-center">
                <ChevronRight className="h-10 w-10 md:h-16 md:w-16 stroke-[1.5]" />
                <span className="absolute -bottom-6 text-[10px] font-bold opacity-0 group-hover:opacity-100 uppercase tracking-widest transition-opacity">
                  NEXT
                </span>
              </div>
            </button>
          </div>

          {/* BOTTOM FLOATING CONTROL PANEL - Glassmorphism */}
          <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 w-[92vw] lg:w-[85vw] max-w-6xl z-30 pointer-events-none">
            <div className="bg-[#0f0f0f]/70 backdrop-blur-3xl border border-white/10 rounded-3xl p-4 md:p-5 lg:p-6 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] flex flex-col md:flex-row gap-4 lg:gap-8 items-start md:items-center pointer-events-auto transition-all duration-500 hover:bg-[#0f0f0f]/90">
              {/* Left: Heading & Context */}
              <div className="flex-1 min-w-0 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
                  </span>
                  <span className="text-blue-500 text-[9px] font-bold tracking-[0.2em] uppercase">
                    Observation Findings
                  </span>
                </div>
                <h2 className="text-lg md:text-xl lg:text-2xl font-extrabold text-white tracking-tight uppercase leading-none truncate md:line-clamp-1">
                  {currentReport.title}
                </h2>
                <p className="text-white/50 text-xs leading-relaxed line-clamp-1 font-medium">
                  {currentReport.description ||
                    "No additional metadata recorded for this entry."}
                </p>
              </div>

              {/* Right: Technical Metadata */}
              <div className="shrink-0 flex items-center gap-4 lg:gap-8 pl-0 md:pl-6 lg:pl-10 border-t md:border-t-0 md:border-l border-white/5 w-full md:w-auto pt-4 md:pt-0">
                <div className="flex items-center gap-3 group">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-xl bg-white/3 border border-white/5 flex items-center justify-center text-white/20 group-hover:text-blue-400 group-hover:bg-blue-400/10 transition-all duration-300">
                    <Briefcase className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[8px] lg:text-[9px] font-bold text-white/30 uppercase tracking-wider">
                      PIC Area
                    </span>
                    <span className="text-xs lg:text-sm text-white/90 font-bold tracking-tight truncate max-w-[100px]">
                      {currentReport.pic}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 group">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-xl bg-white/3 border border-white/5 flex items-center justify-center text-white/20 group-hover:text-blue-400 group-hover:bg-blue-400/10 transition-all duration-300">
                    <User className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[8px] lg:text-[9px] font-bold text-white/30 uppercase tracking-wider">
                      Recorded By
                    </span>
                    <span className="text-xs lg:text-sm text-white/90 font-bold tracking-tight truncate max-w-[100px]">
                      {currentReport.reporter?.firstName}
                    </span>
                    <span className="text-[8px] text-white/30 font-medium whitespace-nowrap">
                      {new Date(currentReport.createdAt).toLocaleDateString(
                        "id-ID",
                        { month: "short", day: "numeric" },
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM FILMSTRIP PREVIEW */}
        {showThumbnails && (
          <div className="h-24 md:h-32 bg-black/95 backdrop-blur-3xl border-t border-white/5 z-40 flex items-center justify-start md:justify-center gap-4 px-6 overflow-x-auto select-none no-scrollbar">
            {reports.map((report, idx) => (
              <button
                key={report.id}
                onClick={() => setCurrentIndex(idx)}
                className={cn(
                  "relative h-16 w-24 md:h-20 md:w-32 rounded-xl overflow-hidden border-2 transition-all shrink-0 group",
                  currentIndex === idx
                    ? "border-blue-600 scale-105 shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                    : "border-white/10 opacity-30 hover:opacity-100",
                )}
              >
                {report.photoUrl ? (
                  <img
                    src={report.photoUrl}
                    className="w-full h-full object-cover"
                    alt="prev"
                  />
                ) : (
                  <div className="w-full h-full bg-white/2 flex items-center justify-center text-[8px] font-bold text-white/20">
                    NO PIC
                  </div>
                )}
                <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="absolute bottom-1 right-2 text-white text-[10px] font-bold drop-shadow-md">
                  {idx + 1}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* PROGRESS BAR */}
        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-white/5 z-50">
          <div
            className="h-full bg-linear-to-r from-blue-700 via-blue-500 to-blue-300 shadow-[0_0_15px_rgba(37,99,235,0.6)] transition-all duration-700 ease-out"
            style={{ width: `${((currentIndex + 1) / reports.length) * 100}%` }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
