"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldContent, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import useCreateReport from "@/hooks/api/report/useCreateReport";
import { useFormik } from "formik";
import { Camera, Loader2, Plus, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";

interface CreateReportModalProps {
  workspaceId: string;
  onSuccess?: () => void;
}

const createReportSchema = Yup.object().shape({
  title: Yup.string()
    .required("Judul temuan wajib diisi")
    .min(3, "Minimal 3 karakter"),
  description: Yup.string().optional(),
  workspaceId: Yup.string().required(),
  photo: Yup.mixed().optional(),
});

export function CreateReportModal({
  workspaceId,
  onSuccess,
}: CreateReportModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: createReport, isPending: isCreating } = useCreateReport();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      workspaceId: workspaceId,
      photo: null as File | null,
    },
    validationSchema: createReportSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      createReport(
        {
          title: values.title,
          description: values.description,
          workspaceId: values.workspaceId,
          photo: values.photo || undefined,
        },
        {
          onSuccess: () => {
            toast.success("Laporan berhasil dibuat");
            setIsOpen(false);
            formik.resetForm();
            removeFile();
            if (onSuccess) onSuccess();
          },
          onError: (error: any) => {
            toast.error(
              error?.response?.data?.message || "Gagal membuat laporan",
            );
          },
        },
      );
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      formik.setFieldValue("photo", selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    }
  };

  const removeFile = () => {
    formik.setFieldValue("photo", null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto cursor-pointer">
          <Plus className="h-4 w-4 mr-2" />
          Tambah Laporan
        </Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Buat Laporan Baru</DialogTitle>
          <DialogDescription>
            Berikan detail temuan atau laporan untuk workspace ini.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 py-4">
          <Field>
            <FieldLabel htmlFor="title">Judul Laporan</FieldLabel>
            <FieldContent>
              <Input
                id="title"
                placeholder="Contoh: Lampu Rusak di Area A"
                {...formik.getFieldProps("title")}
                disabled={isCreating}
              />
              {formik.touched.title && formik.errors.title && (
                <FieldError>{formik.errors.title}</FieldError>
              )}
            </FieldContent>
          </Field>
          <Field>
            <FieldLabel htmlFor="description">Deskripsi</FieldLabel>
            <FieldContent>
              <textarea
                id="description"
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Jelaskan detail temuan..."
                {...formik.getFieldProps("description")}
                disabled={isCreating}
              />
              {formik.touched.description && formik.errors.description && (
                <FieldError>{formik.errors.description}</FieldError>
              )}
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel>Foto Temuan</FieldLabel>
            <FieldContent>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                disabled={isCreating}
              />

              {previewUrl ? (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden border bg-muted">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-contain"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 rounded-full size-8 shadow-lg cursor-pointer"
                    onClick={removeFile}
                    disabled={isCreating}
                  >
                    <X className="size-4" />
                  </Button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isCreating}
                  className="flex flex-col items-center justify-center w-full aspect-video rounded-lg border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 hover:bg-primary/5 transition-colors group disabled:opacity-50 cursor-pointer"
                >
                  <div className="flex flex-col items-center gap-2 text-muted-foreground group-hover:text-primary transition-colors">
                    <Camera className="size-8" />
                    <span className="text-sm font-medium">
                      Klik untuk upload foto
                    </span>
                  </div>
                </button>
              )}
              {formik.touched.photo && formik.errors.photo && (
                <FieldError>{formik.errors.photo as string}</FieldError>
              )}
            </FieldContent>
          </Field>

          <DialogFooter className="mt-4 gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isCreating}
              className="cursor-pointer"
            >
              Batal
            </Button>
            <Button type="submit" disabled={isCreating} className="cursor-pointer">
              {isCreating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                "Simpan Laporan"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
