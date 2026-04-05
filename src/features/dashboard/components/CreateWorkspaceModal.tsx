import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import useCreateWorkspace from "@/hooks/api/workspace/useCreateWorkspace";
import { useFormik } from "formik";
import { Loader2 } from "lucide-react";
import * as Yup from "yup";

interface CreateWorkspaceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const createWorkspaceSchema = Yup.object().shape({
  title: Yup.string()
    .required("Judul workspace wajib diisi")
    .min(3, "Minimal 3 karakter"),
  description: Yup.string().optional(),
});

export function CreateWorkspaceModal({ open, onOpenChange }: CreateWorkspaceModalProps) {
  const { mutate: createWorkspace, isPending } = useCreateWorkspace();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: createWorkspaceSchema,
    onSubmit: (values) => {
      createWorkspace(values, {
        onSuccess: () => {
          formik.resetForm();
          onOpenChange(false);
        },
      });
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Buat Workspace Baru</DialogTitle>
          <DialogDescription>
            Masukkan detail workspace yang akan dibuat. Klik simpan jika sudah selesai.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit}>
          <FieldGroup className="py-4">
            <Field className="grid gap-2">
              <FieldLabel htmlFor="title">Judul Workspace</FieldLabel>
              <Input
                id="title"
                placeholder="Misal: Pabrik A"
                {...formik.getFieldProps("title")}
                disabled={isPending}
              />
              {formik.touched.title && formik.errors.title && (
                <FieldError>{formik.errors.title}</FieldError>
              )}
            </Field>

            <Field className="grid gap-2">
              <FieldLabel htmlFor="description">Deskripsi (Opsional)</FieldLabel>
              <Input
                id="description"
                placeholder="Deskripsi singkat mengenai workspace"
                {...formik.getFieldProps("description")}
                disabled={isPending}
              />
              {formik.touched.description && formik.errors.description && (
                <FieldError>{formik.errors.description}</FieldError>
              )}
            </Field>
          </FieldGroup>

          <DialogFooter className="mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Batal
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Simpan
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
