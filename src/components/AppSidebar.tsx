"use client";

import { NavMain } from "@/components/NavMain";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CommandIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  UserIcon,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import * as React from "react";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: <LayoutDashboardIcon />,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  const rawUser = session?.user as any;
  const user = rawUser?.user || rawUser;

  const fullName = user
    ? `${user.firstName || ""} ${user.lastName || ""}`.trim() || "User Name"
    : "User Name";

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="#">
                <CommandIcon className="size-5!" />
                <span className="text-base font-semibold">Genba</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            {isLoading ? (
              <SidebarMenuButton
                size="lg"
                disabled
                className="flex items-center gap-3 py-3 h-auto"
              >
                <Skeleton className="size-10 rounded-lg" />
                <div className="flex flex-col gap-2 flex-1 overflow-hidden">
                  <Skeleton className="h-4 w-3/4 rounded" />
                  <Skeleton className="h-3 w-1/2 rounded" />
                </div>
              </SidebarMenuButton>
            ) : (
              <SidebarMenuButton
                size="lg"
                className="flex items-center gap-3 py-3 h-auto hover:bg-sidebar-accent/50 data-[state=open]:bg-sidebar-accent transition-all"
              >
                <Avatar className="size-10 rounded-lg">
                  <AvatarImage src="" alt={fullName} />
                  <AvatarFallback className="rounded-lg bg-primary/10 text-primary">
                    <UserIcon className="size-5" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start text-left leading-tight ml-1">
                  <span className="truncate font-semibold text-base text-sidebar-foreground">
                    {fullName}
                  </span>
                  <span className="truncate text-xs text-muted-foreground uppercase tracking-tight">
                    {user?.nik || "NIK"}
                  </span>
                </div>
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="flex justify-center hover:cursor-pointer gap-2 transition-all mt-2 font-medium border border-sidebar-border shadow-sm rounded-xl hover:bg-sidebar-accent/50"
            >
              <LogOutIcon className="size-5" />
              <span className="text-base">Logout Account</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
