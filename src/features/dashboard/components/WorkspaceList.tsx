"use client";

import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useGetWorkspaces from "@/hooks/api/workspace/useGetWorkspaces";
import { Workspace } from "@/types/workspace";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreateWorkspaceModal } from "./CreateWorkspaceModal";

export function WorkspaceList() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 10;

  const {
    data: workspacesResponse,
    isLoading,
    isError,
  } = useGetWorkspaces({ page, take: limit });

  const workspaces: Workspace[] = workspacesResponse?.data || [];
  const meta = workspacesResponse?.meta;
  const totalPages = meta?.totalPages || 1;

  // Render pagination items (simplified logic showing all pages)
  const renderPaginationItems = () => {
    const items = [];
    for (let i = 1; i <= totalPages; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            isActive={i === page}
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              setPage(i);
            }}
          >
            {i}
          </PaginationLink>
        </PaginationItem>,
      );
    }
    return items;
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="min-w-0">
            <h2 className="text-xl md:text-2xl font-bold tracking-tight wrap-break-word text-foreground">
              Daftar Workspace
            </h2>
            <p className="text-sm md:text-base text-muted-foreground">
              Kelola seluruh workspace dan proyek aktif Anda di sini.
            </p>
          </div>
        </div>

        <div className="w-full sm:w-auto overflow-hidden">
          <Button
            onClick={() => setIsModalOpen(true)}
            className="cursor-pointer w-full sm:w-auto"
          >
            <Plus className="mr-2 h-4 w-4" />
            Buat Workspace
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex h-32 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : isError ? (
        <div className="flex h-32 items-center justify-center text-red-500">
          Gagal memuat daftar workspace. Silakan coba lagi nanti.
        </div>
      ) : workspaces.length === 0 ? (
        <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed text-muted-foreground gap-2 mt-4">
          <p>Belum ada workspace yang dibuat.</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsModalOpen(true)}
            className="cursor-pointer"
          >
            Buat Sekarang
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px] text-center border-r last:border-r-0">
                    No.
                  </TableHead>
                  <TableHead className="border-r last:border-r-0">
                    Nama Workspace
                  </TableHead>
                  <TableHead className="border-r last:border-r-0">
                    Deskripsi
                  </TableHead>
                  <TableHead className="border-r last:border-r-0">
                    Role
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {workspaces.map((workspace, index) => {
                  const itemNumber = (page - 1) * limit + (index + 1);
                  return (
                    <TableRow
                      key={workspace.id}
                      className="cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => router.push(`/dashboard/${workspace.id}`)}
                    >
                      <TableCell className="text-center border-r last:border-r-0">
                        {itemNumber}
                      </TableCell>
                      <TableCell className="font-medium border-r last:border-r-0">
                        {workspace.title}
                      </TableCell>
                      <TableCell className="text-muted-foreground border-r last:border-r-0">
                        {workspace.description || "Tidak ada deskripsi"}
                      </TableCell>
                      <TableCell className="last:border-r-0">
                        {workspace.role ? workspace.role : "Owner"}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          <Pagination className="mt-2">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  className={`cursor-pointer ${page <= 1 ? "pointer-events-none opacity-50" : ""}`}
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault();
                    if (page > 1) setPage(page - 1);
                  }}
                />
              </PaginationItem>

              {renderPaginationItems()}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  className={`cursor-pointer ${page >= totalPages ? "pointer-events-none opacity-50" : ""}`}
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault();
                    if (page < totalPages) setPage(page + 1);
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      <CreateWorkspaceModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
}
