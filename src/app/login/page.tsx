"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import { useUserSession, UserRole } from "@/context/user-session-context";
import {
  User,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Check,
  X,
  HelpCircle,
  Building2,
  Mail,
  Phone,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useUserSession();

  // Active Role Tab (Mitra Kawasan vs Admin Pengelola)
  const [selectedRole, setSelectedRole] = useState<UserRole>("regional_partner");
  const [username, setUsername] = useState("operator.subang@symbion.id");
  const [password, setPassword] = useState("IndustrialSymbiosis2026!");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Modals for interactive actions
  const [modalType, setModalType] = useState<"none" | "support" | "forgot" | "register">("none");
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [regCompany, setRegCompany] = useState("");
  const [regEmail, setRegEmail] = useState("");

  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role);
    if (role === "regional_partner") {
      setUsername("operator.subang@symbion.id");
      setPassword("IndustrialSymbiosis2026!");
    } else {
      setUsername("admin.estate@symbion.id");
      setPassword("MasterCluster2026!");
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Call login with chosen role and inputted username/email
    login(selectedRole, username);

    if (typeof window !== "undefined") {
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
    }

    setTimeout(() => {
      setIsLoading(false);
      router.push("/");
    }, 450);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterSuccess(true);
    if (typeof window !== "undefined") {
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.5 } });
    }
    setTimeout(() => {
      setRegisterSuccess(false);
      setModalType("none");
      setRegCompany("");
      setRegEmail("");
    }, 2000);
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-slate-50/90 text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden">
      {/* Background decorative eco circular ambient glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-32 w-[28rem] h-[28rem] bg-emerald-200/25 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 w-80 h-80 bg-teal-100/30 rounded-full blur-2xl" />
        {/* Soft dot grid pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />
      </div>

      {/* ================================================================= */}
      {/* Full-Bleed Top Header Bar (Edge-to-Edge with Status & Support)    */}
      {/* ================================================================= */}
      <header className="relative z-10 w-full px-6 sm:px-10 lg:px-12 py-5 sm:py-6 flex items-center justify-between border-b border-slate-200/50 bg-white/40 backdrop-blur-xs">
        {/* Official Brand Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 flex items-center justify-center shrink-0">
            <Image
              src="/images/symbion-logo.png"
              alt="Symbion Official Logo"
              width={36}
              height={36}
              className="object-contain"
              priority
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-[20px] text-slate-900 tracking-tight leading-none">
              Symbion
            </span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-[#2c7a4b] border border-emerald-200 uppercase tracking-wider">
              PLATFORM
            </span>
          </div>
        </div>

        {/* Right Status & Support Links */}
        <div className="flex items-center gap-3 sm:gap-5 text-xs font-medium">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-xs border border-slate-200 text-slate-700 shadow-2xs font-mono text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Sistem Berjalan Normal (v2.4)</span>
          </div>

          <button
            type="button"
            onClick={() => setModalType("support")}
            className="hover:text-[#2c7a4b] text-slate-600 transition-colors font-semibold flex items-center gap-1.5 cursor-pointer text-xs"
          >
            <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
            <span>Bantuan &amp; Kontak</span>
          </button>
        </div>
      </header>

      {/* ================================================================= */}
      {/* Main Login Card Section (Harmonized Width & Proportional Layout)  */}
      {/* ================================================================= */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 py-4 sm:py-8">
        <div className="w-full max-w-[1040px] bg-white rounded-2xl sm:rounded-3xl shadow-[0_24px_60px_-15px_rgba(8,97,53,0.12),0_2px_8px_rgba(0,0,0,0.04)] border border-slate-200/90 overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[580px]">
          {/* ------------------------------------------------------------- */}
          {/* Left Column: Form & Full-Width Role Switcher                  */}
          {/* ------------------------------------------------------------- */}
          <div className="md:col-span-7 p-7 sm:p-10 lg:p-12 flex flex-col justify-between">
            <div>
              {/* Title & Brief Greeting */}
              <div className="mb-5">
                <h1 className="text-[26px] sm:text-[28px] font-extrabold text-slate-900 tracking-tight leading-tight">
                  Selamat Datang
                </h1>
                <p className="text-[13px] text-slate-500 mt-1.5 leading-relaxed max-w-[46ch]">
                  Masuk ke akun Anda untuk memantau sirkularitas kawasan dan mengelola data limbah industri.
                </p>
              </div>

              {/* Full-Width Role Switcher (Aligned with Form Inputs) */}
              <div className="w-full grid grid-cols-2 p-1 bg-slate-100/90 rounded-xl my-5 border border-slate-200/80 gap-1 text-xs">
                <button
                  type="button"
                  onClick={() => handleRoleChange("regional_partner")}
                  className={cn(
                    "py-2 px-3 rounded-lg font-bold transition-all text-center cursor-pointer text-[12px]",
                    selectedRole === "regional_partner"
                      ? "bg-white text-[#2c7a4b] shadow-xs"
                      : "text-slate-500 hover:text-slate-800"
                  )}
                >
                  Mitra Kawasan &amp; User
                </button>
                <button
                  type="button"
                  onClick={() => handleRoleChange("estate_administrator")}
                  className={cn(
                    "py-2 px-3 rounded-lg font-bold transition-all text-center cursor-pointer text-[12px]",
                    selectedRole === "estate_administrator"
                      ? "bg-white text-[#2c7a4b] shadow-xs"
                      : "text-slate-500 hover:text-slate-800"
                  )}
                >
                  Admin Pengelola
                </button>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {/* ID / Email Input */}
                <div>
                  <label
                    htmlFor="username_id"
                    className="block text-[11px] font-mono font-bold text-slate-700 uppercase tracking-wider mb-1.5"
                  >
                    ID PENGGUNA ATAU EMAIL <span className="text-emerald-600">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      id="username_id"
                      name="username_id"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="operator.subang@symbion.id"
                      required
                      className="w-full pl-10 pr-4 py-2.5 h-11 text-[13.5px] bg-slate-50/70 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-[#2c7a4b] transition-all text-slate-900 placeholder-slate-400 font-sans"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="password"
                      className="block text-[11px] font-mono font-bold text-slate-700 uppercase tracking-wider"
                    >
                      KATA SANDI <span className="text-emerald-600">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setModalType("forgot")}
                      className="text-xs text-[#2c7a4b] hover:text-[#23613c] hover:underline font-semibold cursor-pointer"
                    >
                      Lupa kata sandi?
                    </button>
                  </div>
                  <div className="relative flex items-center">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      required
                      className="w-full pl-10 pr-10 py-2.5 h-11 text-[13.5px] bg-slate-50/70 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-[#2c7a4b] transition-all text-slate-900 font-sans"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                      title={showPassword ? "Hide password" : "Show password"}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me Checkbox */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-[#2c7a4b] border-slate-300 rounded focus:ring-emerald-500 focus:ring-offset-0 cursor-pointer accent-[#2c7a4b]"
                    />
                    <span className="text-xs text-slate-600 font-medium">
                      Ingat akun ini di perangkat ini
                    </span>
                  </label>
                </div>

                {/* Submit CTA Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-3 py-3 px-4 h-12 rounded-xl bg-gradient-to-r from-[#2c7a4b] to-[#23613c] hover:from-[#23613c] hover:to-[#1a4a2d] active:scale-[0.99] text-white font-bold text-[14px] shadow-md shadow-emerald-900/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                >
                  {isLoading ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      <span>Memverifikasi Akses...</span>
                    </span>
                  ) : (
                    <>
                      <span>Masuk ke Dashboard</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Registration Help Footer */}
            <div className="mt-8 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
              <span>Pabrik belum terdaftar di kawasan?</span>
              <button
                type="button"
                onClick={() => setModalType("register")}
                className="font-bold text-[#2c7a4b] hover:text-[#23613c] hover:underline cursor-pointer"
              >
                Ajukan Akses Mitra Baru
              </button>
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* Right Column: Brand Showcase with New Official Logo           */}
          {/* ------------------------------------------------------------- */}
          <div className="md:col-span-5 bg-gradient-to-br from-[#072416] via-[#0e3b25] to-[#092215] p-7 sm:p-9 lg:p-10 text-white flex flex-col justify-between relative overflow-hidden">
            {/* Ambient background glows */}
            <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-emerald-400/15 blur-3xl pointer-events-none" />
            <div className="absolute -left-12 -bottom-12 w-52 h-52 rounded-full bg-teal-400/15 blur-3xl pointer-events-none" />

            <div className="relative z-10">
              {/* Logo Inside Side Banner */}
              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-12 h-12 rounded-xl bg-white/10 p-1.5 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-xs shrink-0">
                  <Image
                    src="/images/symbion-logo.png"
                    alt="Symbion Emblem"
                    width={38}
                    height={38}
                    className="object-contain"
                    priority
                  />
                </div>
                <div>
                  <p className="font-bold text-[16px] tracking-tight text-white leading-tight">
                    Symbion Platform
                  </p>
                  <p className="text-[11.5px] text-emerald-300/80 mt-0.5 font-medium">
                    Kawasan Industri Ramah Lingkungan
                  </p>
                </div>
              </div>

              {/* Pitch & Value Props */}
              <div className="space-y-3.5">
                <h2 className="text-[19px] sm:text-[21px] font-bold leading-snug text-white">
                  Pusat Kolaborasi Energi Bersih &amp; Ekonomi Sirkular
                </h2>
                <p className="text-[12.5px] text-emerald-100/80 leading-relaxed font-sans mt-2.5">
                  Platform terpadu untuk menghubungkan produsen limbah organik industri dengan fasilitas energi terbarukan, menciptakan nilai tambah nyata dan penurunan emisi karbon.
                </p>

                {/* 3 Key Value Checkpoints */}
                <div className="pt-4 space-y-3.5">
                  <div className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/25 border border-emerald-400/40 text-emerald-300 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <div className="text-xs">
                      <p className="font-bold text-white leading-tight text-[13px]">
                        Dua Tampilan Sesuai Kebutuhan
                      </p>
                      <p className="text-[11.5px] text-emerald-100/75 leading-relaxed mt-0.5">
                        Ringkasan Eksekutif ramah awam untuk manajemen, dan Portal Kelola Data untuk operator pabrik.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/25 border border-emerald-400/40 text-emerald-300 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <div className="text-xs">
                      <p className="font-bold text-white leading-tight text-[13px]">
                        Perhitungan Otomatis Potensi Profit
                      </p>
                      <p className="text-[11.5px] text-emerald-100/75 leading-relaxed mt-0.5">
                        Estimasi langsung pendapatan listrik PLN dan pengurangan CO₂ dari data limbah yang dimasukkan.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/25 border border-emerald-400/40 text-emerald-300 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <div className="text-xs">
                      <p className="font-bold text-white leading-tight text-[13px]">
                        Data Aman &amp; Terverifikasi
                      </p>
                      <p className="text-[11.5px] text-emerald-100/75 leading-relaxed mt-0.5">
                        Kerahasiaan formula produksi dan kuantitas limbah terenkripsi sesuai standar kawasan industri.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Badge at Bottom Right Panel */}
            <div className="relative z-10 pt-5 mt-6 border-t border-white/10 flex items-center justify-between text-[11px] text-emerald-200/80 font-mono">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-medium">Enkripsi 256-bit SSL</span>
              </div>
              <span className="text-emerald-300/70 text-[10.5px]">
                Subang - Cirebon Cluster
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* ================================================================= */}
      {/* Full-Bleed Minimal Footer (Edge-to-Edge Container)                */}
      {/* ================================================================= */}
      <footer className="relative z-10 w-full px-6 sm:px-10 lg:px-12 py-4 sm:py-5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 border-t border-slate-200/60 bg-white/40 backdrop-blur-xs mt-auto">
        <p>© 2025 Symbion Industrial Ecology Platform. Hak Cipta Dilindungi.</p>
        <div className="flex items-center gap-5 mt-2 sm:mt-0 font-medium">
          <button
            type="button"
            onClick={() => setModalType("support")}
            className="hover:text-slate-600 transition-colors cursor-pointer"
          >
            Kebijakan Privasi
          </button>
          <button
            type="button"
            onClick={() => setModalType("support")}
            className="hover:text-slate-600 transition-colors cursor-pointer"
          >
            Syarat Layanan
          </button>
          <button
            type="button"
            onClick={() => setModalType("support")}
            className="hover:text-slate-600 transition-colors cursor-pointer"
          >
            Pusat Bantuan
          </button>
        </div>
      </footer>

      {/* ================================================================= */}
      {/* Interactive Support Modal ("Bantuan & Kontak")                     */}
      {/* ================================================================= */}
      {modalType === "support" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#2c7a4b] flex items-center justify-center border border-emerald-200">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-slate-900">Bantuan &amp; Kontak</h3>
                  <p className="text-[11px] text-slate-500">Departemen Teknik Industri, IPB University</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setModalType("none")}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-[12.5px] text-slate-600">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#2c7a4b]" />
                  <span>Tim Peneliti Symbion v2.0</span>
                </div>
                <p className="text-[11.5px] text-slate-500">
                  Didukung oleh Department of Industrial Systems Engineering, IPB University untuk kompetisi I-SINERGIE Malaysia 2026.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-slate-700">
                  <Mail className="w-4 h-4 text-[#2c7a4b]" />
                  <span>Email: <strong className="font-mono text-slate-900">symbion@apps.ipb.ac.id</strong></span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Phone className="w-4 h-4 text-[#2c7a4b]" />
                  <span>Hotline Kawasan: <strong className="font-mono text-slate-900">+62 251 8622-642</strong></span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setModalType("none")}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* Interactive Forgot Password Modal                                 */}
      {/* ================================================================= */}
      {modalType === "forgot" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-[15px] font-bold text-slate-900">Pemulihan Kata Sandi</h3>
              <button
                type="button"
                onClick={() => setModalType("none")}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[12.5px] text-slate-600 leading-relaxed">
              Dalam mode demonstrasi kompetisi, Anda dapat langsung menggunakan kredensial default untuk mengakses sistem:
            </p>

            <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-[12px] space-y-2 text-emerald-950 font-mono">
              <div>
                <span className="text-emerald-700 font-bold block">1. Mitra Kawasan:</span>
                <span>User: operator.subang@symbion.id</span><br />
                <span>Pass: IndustrialSymbiosis2026!</span>
              </div>
              <div className="pt-1.5 border-t border-emerald-200/60">
                <span className="text-emerald-700 font-bold block">2. Admin Pengelola:</span>
                <span>User: admin.estate@symbion.id</span><br />
                <span>Pass: MasterCluster2026!</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setModalType("none");
                handleRoleChange(selectedRole);
              }}
              className="w-full py-2.5 rounded-xl bg-[#2c7a4b] text-white text-xs font-bold hover:bg-[#23613c] transition-colors"
            >
              Terapkan Kredensial Otomatis
            </button>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* Interactive Registration Modal ("Ajukan Akses Mitra Baru")         */}
      {/* ================================================================= */}
      {modalType === "register" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-[15px] font-bold text-slate-900">Pengajuan Akses Mitra Baru</h3>
                <p className="text-[11.5px] text-slate-500">Integrasi pabrik baru ke kawasan industri ramah lingkungan</p>
              </div>
              <button
                type="button"
                onClick={() => setModalType("none")}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {registerSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-xs">
                  <Check className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div className="font-bold text-emerald-950 text-[13.5px]">Pengajuan Berhasil Dikirim!</div>
                <p className="text-[12px] text-emerald-800">
                  Tim Estate Administrator akan memverifikasi profil industri dan aliran limbah Anda.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-3 text-[12px]">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nama Perusahaan / Pabrik *</label>
                  <input
                    type="text"
                    required
                    value={regCompany}
                    onChange={(e) => setRegCompany(e.target.value)}
                    placeholder="Contoh: PT Sawit Subang Makmur"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:border-[#2c7a4b] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email Koordinator *</label>
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="nama@perusahaan.co.id"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:border-[#2c7a4b] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Jenis Limbah Utama</label>
                  <input
                    type="text"
                    placeholder="Contoh: POME, EFB, Bagasse, Fly Ash"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:border-[#2c7a4b] focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-[#2c7a4b] hover:bg-[#23613c] text-white text-xs font-bold transition-colors shadow-xs"
                  >
                    Kirim Permohonan Akses
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
