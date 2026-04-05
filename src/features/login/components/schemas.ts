import * as Yup from "yup";
import YupPassword from "yup-password";

YupPassword(Yup); // Extend Yup with password validation methods

export const loginSchema = Yup.object().shape({
  nik: Yup.string()
    .required("NIK wajib diisi")
    .min(5, "NIK minimal 5 karakter"),
  password: Yup.string()
    .password() // Basic password validation from yup-password
    .required("Kata sandi wajib diisi")
    .min(8, "Kata sandi minimal 8 karakter"),
});
