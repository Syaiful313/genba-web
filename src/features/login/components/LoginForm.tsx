"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useFormik } from "formik";
import { loginSchema } from "./schemas";
import useLogin from "@/hooks/api/auth/useLogin";
import Image from "next/image";


export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: login, isPending } = useLogin();

  const formik = useFormik({
    initialValues: {
      nik: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      login(values);
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={formik.handleSubmit}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center mb-4">
            <div className="relative flex size-10 items-center justify-center overflow-hidden rounded-xl mb-2">
              <Image
                src="/logo.png"
                alt="Genba Logo"
                fill
                sizes="40px"
                className="object-contain"
                priority
              />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">
              Masuk ke Sistem Genba
            </h1>
            <p className="text-sm text-muted-foreground">
              Gunakan NIK dan kata sandi internal Anda
            </p>
          </div>
          <Field className="grid gap-2">
            <FieldLabel htmlFor="nik">NIK (Nomor Induk Karyawan)</FieldLabel>
            <Input
              id="nik"
              type="text"
              placeholder="Masukkan NIK Anda"
              className="h-11"
              {...formik.getFieldProps("nik")}
              disabled={isPending}
            />
            {formik.touched.nik && formik.errors.nik && (
              <FieldError>{formik.errors.nik}</FieldError>
            )}
          </Field>
          <Field className="grid gap-2">
            <FieldLabel htmlFor="password">Kata Sandi</FieldLabel>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan kata sandi"
                className="h-11 pr-10"
                {...formik.getFieldProps("password")}
                disabled={isPending}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-0 flex h-full items-center px-3 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={
                  showPassword ? "Sembunyikan sandi" : "Tampilkan sandi"
                }
                disabled={isPending}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <FieldError>{formik.errors.password}</FieldError>
            )}
          </Field>
          <Field className="mt-2">
            <Button
              type="submit"
              className="w-full h-11 text-base font-bold"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Masuk...
                </>
              ) : (
                "Masuk Sekarang"
              )}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
