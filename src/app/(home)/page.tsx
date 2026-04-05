"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BarChart3,
  Building2,
  ClipboardCheck,
  Factory,
  ShieldCheck,
  Smartphone,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white dark:bg-[#020617] selection:bg-primary/10">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -z-10 h-[1000px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-primary/10 to-blue-500/5 blur-[120px]" />
      <div className="absolute bottom-0 right-0 -z-10 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-indigo-500/5 to-purple-500/5 blur-[100px]" />

      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-slate-200/50 bg-white/70 backdrop-blur-xl dark:border-slate-800/50 dark:bg-slate-950/70">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-12">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-lg shadow-primary/25 sm:h-10 sm:w-10 sm:rounded-xl">
              <ClipboardCheck className="h-5 w-5 text-primary-foreground sm:h-6 sm:w-6" />
            </div>
            <span className="text-xl font-black tracking-tighter text-slate-900 dark:text-white sm:text-2xl">
              GENBA
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              variant="ghost"
              className="hidden font-semibold text-slate-600 dark:text-slate-400 md:inline-flex"
            >
              Bantuan S.O.P
            </Button>
            <Button 
              asChild
              className="rounded-full px-4 py-2 text-xs font-bold shadow-lg shadow-primary/20 sm:px-6 sm:text-sm md:text-base cursor-pointer"
            >
              <Link href="/login">Masuk ke Sistem</Link>
            </Button>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative px-4 pt-24 pb-16 sm:px-6 lg:px-12 lg:pt-48 lg:pb-32">
          <div className="container mx-auto text-center">
            <div className="inline-flex animate-fade-in items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-[10px] font-semibold text-primary sm:px-4 sm:text-sm dark:bg-primary/10">
              <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary sm:h-2 sm:w-2"></span>
              </span>
              Sistem Digitalisasi Inspeksi Internal Pabrik
            </div>

            <h1 className="mt-6 text-3xl font-black tracking-tight text-slate-900 dark:text-white min-[375px]:text-4xl sm:mt-8 sm:text-6xl lg:text-7xl xl:text-8xl">
              Optimalkan{" "}
              <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                Standar Keamanan
              </span>{" "}
              & Operasional
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:mt-8 sm:text-xl dark:text-slate-400">
              Platform internal terpadu untuk pelaporan temuan, monitoring
              kawasan, dan audit lapangan. Memastikan setiap rona kerja
              terdokumentasi dengan presisi.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:mt-12 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-14 w-full rounded-2xl px-8 text-base font-bold shadow-2xl shadow-primary/30 transition-all hover:scale-105 active:scale-95 sm:h-16 sm:w-auto sm:px-10 sm:text-lg cursor-pointer"
              >
                <Link href="/login">
                  Mulai Inspeksi Area
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 w-full rounded-2xl px-8 text-base font-bold backdrop-blur-sm transition-all hover:bg-slate-50 sm:h-16 sm:w-auto sm:px-10 sm:text-lg dark:hover:bg-slate-900"
              >
                Panduan Penggunaan
              </Button>
            </div>

            {/* Internal Stats / Areas */}
            <div className="mt-16 flex flex-wrap justify-center gap-6 overflow-hidden opacity-50 grayscale sm:mt-20 sm:gap-12 dark:invert">
              <div className="flex items-center gap-2 text-sm font-bold sm:text-xl">
                <Factory className="h-4 w-4 sm:h-6 sm:w-6" /> AREA PRODUKSI
              </div>
              <div className="flex items-center gap-2 text-sm font-bold sm:text-xl">
                <Building2 className="h-4 w-4 sm:h-6 sm:w-6" /> LOGISTIK &
                GUDANG
              </div>
              <div className="flex items-center gap-2 text-sm font-bold sm:text-xl">
                <Users className="h-4 w-4 sm:h-6 sm:w-6" /> K3 & SAFETY
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section
          id="features"
          className="bg-slate-50 py-16 sm:py-24 dark:bg-slate-900/50"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-12">
            <div className="mb-12 text-center sm:mb-16">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white min-[375px]:text-3xl sm:text-4xl lg:text-5xl">
                Alur Kerja Digital yang Efisien
              </h2>
              <p className="mt-3 text-sm text-slate-600 sm:mt-4 sm:text-lg dark:text-slate-400">
                Memudahkan koordinasi antar departemen dalam menangani temuan di
                lapangan.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              <FeatureCard
                icon={<Smartphone className="h-8 w-8 text-blue-500" />}
                title="Akses Lapangan"
                desc="Lakukan pelaporan langsung dari lokasi temuan menggunakan perangkat mobile."
              />
              <FeatureCard
                icon={<Zap className="h-8 w-8 text-amber-500" />}
                title="Respon Cepat"
                desc="Notifikasi instan ke pihak terkait untuk penanganan temuan yang mendesak."
              />
              <FeatureCard
                icon={<BarChart3 className="h-8 w-8 text-emerald-500" />}
                title="Monitoring Real-time"
                desc="Pantau status setiap laporan dan progres perbaikan secara terpusat."
              />
              <FeatureCard
                icon={<ShieldCheck className="h-8 w-8 text-indigo-500" />}
                title="Data Terintegrasi"
                desc="Seluruh arsip laporan tersimpan aman untuk kebutuhan audit dan evaluasi K3."
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden py-24">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="relative rounded-[3rem] bg-slate-900 p-12 text-center dark:bg-primary/10 lg:p-24">
              <div className="absolute top-0 left-0 h-full w-full overflow-hidden rounded-[3rem]">
                <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
                <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
              </div>

              <div className="relative z-10">
                <h2 className="text-4xl font-black text-white sm:text-5xl lg:text-6xl">
                  Mulai Digitalisasi <br /> Laporan Sekarang
                </h2>
                <p className="mx-auto mt-6 max-w-xl text-lg text-slate-400">
                  Gunakan kredensial internal Anda untuk mengakses dashboard dan
                  mulai mendokumentasikan temuan.
                </p>
                <div className="mt-12 flex justify-center">
                  <Button
                    asChild
                    size="lg"
                    className="h-16 rounded-2xl px-12 text-xl font-bold shadow-2xl shadow-primary/40 transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <Link href="/login">Masuk ke Dashboard</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 py-12 dark:border-slate-800">
        <div className="container mx-auto px-6 text-center lg:px-12">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <ClipboardCheck className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-black text-slate-900 dark:text-white">
                GENBA
              </span>
            </div>
            <p className="text-sm text-slate-500">
              © 2026 Internal Factory Systems - IT Department.
            </p>
            <div className="flex gap-6 text-sm font-semibold text-slate-600 dark:text-slate-400">
              <Link href="#" className="hover:text-primary">
                S.O.P
              </Link>
              <Link href="#" className="hover:text-primary">
                Kebijakan Keamanan Data
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="group rounded-3xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 dark:border-slate-800 dark:bg-slate-900/50">
      <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 transition-colors group-hover:bg-primary/5 dark:bg-slate-800">
        {icon}
      </div>
      <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
        {title}
      </h3>
      <p className="leading-relaxed text-slate-600 dark:text-slate-400">
        {desc}
      </p>
    </div>
  );
}
