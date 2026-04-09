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
        {/* Sisi Kiri: Branding & Breadcrumb */}
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="relative size-6">
              <Image
                src="/logo.png"
                alt="Genba Logo"
                fill
                sizes="24px"
                className="object-contain"
              />
            </div>
            <span className="text-xl font-bold tracking-tight">Genba</span>
          </Link>
        </div>

        {/* Sisi Kanan: User Profile Logout */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end text-right leading-tight mr-1">
            <span className="text-base font-medium text-foreground">
              {fullName}
            </span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-9 w-9 rounded-full border border-border/40 hover:bg-muted p-0"
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/5 text-primary">
                    <UserIcon className="size-6" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-60 mt-2 p-0 overflow-hidden"
              align="end"
              forceMount
            >
              <DropdownMenuLabel className="font-normal p-0">
                <div className="flex flex-col">
                  {/* Bagian Nama */}
                  <div className="px-4 py-3">
                    <p className="text-sm font-semibold leading-none text-foreground">
                      {fullName}
                    </p>
                  </div>
                  {/* Pembatas NIK */}
                  <div className="px-4 py-2 border-t bg-muted/30">
                    <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                      NIK: {user?.nik || "-"}
                    </p>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="my-0" />
              <DropdownMenuItem
                className="flex justify-center items-center cursor-pointer gap-2 py-2.5 focus:bg-muted font-medium transition-colors"
                onClick={() => signOut({ callbackUrl: "/login" })}
              >
                <LogOutIcon className="size-4" />
                <span>Logout Account</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
