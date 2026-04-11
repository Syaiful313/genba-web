"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/60 shadow-xs">
      <div className="flex h-16 items-center justify-between px-4 lg:px-8 max-w-[1600px] mx-auto w-full">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="px-2">
            <span className="text-sm font-semibold text-foreground">
              Dashboard
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
