"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { LogOutIcon, UserIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

interface WorkspaceSiteHeaderProps {
  workspaceTitle?: string;
}

export function WorkspaceSiteHeader({
  workspaceTitle,
}: WorkspaceSiteHeaderProps) {
  const { data: session } = useSession();
  const rawUser = session?.user as any;
  const user = rawUser?.user || rawUser;

  const fullName = user
    ? `${user.firstName || ""} ${user.lastName || ""}`.trim() || "User Name"
    : "User Name";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/60 shadow-xs">
      <div className="flex h-16 items-center justify-between px-4 lg:px-8 max-w-[1600px] mx-auto w-full">
        {/* Sisi Kiri: Sidebar Trigger & Breadcrumb */}
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex items-center gap-2 px-2">
            <span className="text-sm font-medium text-muted-foreground/80">
              Dashboard
            </span>
            <span className="text-muted-foreground/40 text-xs">/</span>
            <span className="text-sm font-semibold text-foreground truncate max-w-[200px]">
              {workspaceTitle || "Workspace"}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
