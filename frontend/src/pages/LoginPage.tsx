import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useRole, type RoleType, getDefaultPathForRole } from '../context/RoleContext';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { role, setRole } = useRole();

  const [selectedRole, setSelectedRole] = useState<RoleType>(role || 'FINANCE');
  const [email, setEmail] = useState('finance@agrojaya.com');
  const [password, setPassword] = useState('finance123');
  const [rememberDevice, setRememberDevice] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // 4 Primary Roles exactly matched from the Reference Design
  const roleCards: { role: RoleType; label: string; email: string; pass: string; desc: string }[] = [
    {
      role: 'DIREKTUR',
      label: 'Direktur Utama',
      email: 'direktur@agrojaya.com',
      pass: 'admin123',
      desc: 'Akses penuh',
    },
    {
      role: 'FINANCE',
      label: 'Manajer Keuangan',
      email: 'finance@agrojaya.com',
      pass: 'finance123',
      desc: 'Keuangan & laporan',
    },
    {
      role: 'MANAGER',
      label: 'Manajer Operasional',
      email: 'manager@agrojaya.com',
      pass: 'manager123',
      desc: 'SLA & produksi',
    },
    {
      role: 'KEPALA_KEBUN',
      label: 'Kepala Kebun',
      email: 'kepalakebun@agrojaya.com',
      pass: 'kebun123',
      desc: 'Agronomi & sensor',
    },
  ];

  // Secondary roles available via quick selector
  const secondaryRoles: { role: RoleType; label: string; email: string; pass: string }[] = [
    { role: 'INVESTOR', label: 'Pemodal / Investor', email: 'investor@agrojaya.com', pass: 'investor123' },
    { role: 'PETANI', label: 'Mandor / Petani', email: 'petani@agrojaya.com', pass: 'petani123' },
  ];

  const handleRoleSelect = (r: RoleType, em: string, pass: string) => {
    setSelectedRole(r);
    setEmail(em);
    setPassword(pass);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setRole(selectedRole);
      setIsLoading(false);
      const targetPath = getDefaultPathForRole(selectedRole);
      navigate(targetPath);
    }, 450);
  };

  const activeRoleObj =
    roleCards.find((p) => p.role === selectedRole) ||
    secondaryRoles.find((p) => p.role === selectedRole);

  return (
    <div
      className="h-screen w-screen max-h-screen overflow-hidden flex flex-col lg:flex-row bg-[#FBFBF6] selection:bg-[#0D5C47] selection:text-white"
      style={{ fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, sans-serif" }}
    >
      {/* =========================================================================
          KOLOM KIRI: 56% Desktop (100% Visual Asli Bersih dari Gambar Referensi)
          Terkunci pas di layar tanpa scroll (h-full overflow-hidden)
         ========================================================================= */}
      <div className="w-full lg:w-[56%] h-[320px] lg:h-full relative overflow-hidden bg-[#072B20] flex-shrink-0">
        <img
          src="/assets/login/left_hero_clean.png"
          alt="Smart Farming Indonesia Hero"
          className="w-full h-full object-cover object-left"
        />
      </div>

      {/* =========================================================================
          KOLOM KANAN: 44% Desktop
          Form Ruang Kerja Interaktif Pas 1 Layar Penuh Tanpa Scroll
         ========================================================================= */}
      <div className="w-full lg:w-[44%] h-full overflow-hidden flex flex-col justify-between p-5 sm:p-6 lg:p-8 xl:px-12 xl:py-6 bg-[#FBFBF6] z-10">
        {/* Top Header Link */}
        <div className="flex justify-end items-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#668177] hover:text-[#193E33] transition-colors"
          >
            <i className="ri-arrow-left-line"></i> Kembali ke beranda
          </Link>
        </div>

        {/* Center Main Form Container (max-w-[456px]) */}
        <div className="w-full max-w-[440px] mx-auto my-auto py-1">
          {/* Overline & Heading */}
          <div className="mb-3 text-left">
            <span
              className="block font-bold text-[10.5px] tracking-[1.2px] uppercase mb-0.5"
              style={{ color: '#1C8361' }}
            >
              SATU AKSES UNTUK SELURUH MODUL
            </span>
            <h2
              className="text-[28px] sm:text-[32px] leading-tight tracking-[-0.5px] text-[#193E33] mb-1"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }}
            >
              Masuk ke ruang kerja Anda.
            </h2>
            <p className="text-[12.5px] text-[#668177] leading-relaxed">
              Gunakan kredensial Anda untuk melanjutkan ke Portal ERP Smart Farming.
            </p>
          </div>

          {/* 4-Role Cards Selector (2-Column Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2.5">
            {roleCards.map((card) => {
              const isSelected = selectedRole === card.role;
              return (
                <button
                  key={card.role}
                  type="button"
                  onClick={() => handleRoleSelect(card.role, card.email, card.pass)}
                  className={`w-full p-2 rounded-[8px] text-left flex items-center justify-between transition-all duration-200 ${
                    isSelected
                      ? 'bg-[#F1FAF4] border-[1.5px] border-[#0D5C47] shadow-xs'
                      : 'bg-white border border-[#DFE8DF] hover:border-[#1C8361]/50 hover:bg-[#FAFDFB]'
                  }`}
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-[13px] ${
                        isSelected ? 'bg-[#D6EFE3] text-[#0D5C47]' : 'bg-[#F1FAF4] text-[#668177]'
                      }`}
                    >
                      <i className="ri-leaf-line"></i>
                    </div>
                    <div className="overflow-hidden">
                      <strong
                        className={`block text-[12px] leading-tight truncate ${
                          isSelected ? 'text-[#193E33] font-bold' : 'text-[#193E33] font-medium'
                        }`}
                      >
                        {card.label}
                      </strong>
                      <span className="block text-[10.5px] text-[#668177] truncate mt-0.5">
                        {card.desc}
                      </span>
                    </div>
                  </div>

                  {isSelected && (
                    <div
                      className="w-[16px] h-[16px] rounded-full flex items-center justify-center text-white text-[10px] flex-shrink-0"
                      style={{ backgroundColor: '#0D5C47' }}
                    >
                      <i className="ri-check-line font-bold"></i>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick toggle for Investor & Petani */}
          <div className="flex items-center justify-end gap-2 mb-2.5 text-[11px] text-[#668177]">
            <span>Peran Lainnya:</span>
            {secondaryRoles.map((s) => (
              <button
                key={s.role}
                type="button"
                onClick={() => handleRoleSelect(s.role, s.email, s.pass)}
                className={`px-2 py-0.5 rounded text-[10.5px] font-semibold transition-colors ${
                  selectedRole === s.role
                    ? 'bg-[#0D5C47] text-white'
                    : 'bg-[#DFE8DF]/60 text-[#193E33] hover:bg-[#DFE8DF]'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-2.5 text-left">
            {/* Email Field */}
            <div>
              <label className="block text-[11.5px] font-semibold text-[#193E33] mb-1">
                Email akun
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3 flex items-center pointer-events-none text-[#668177]">
                  <i className="ri-mail-line text-[14px]"></i>
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-[40px] rounded-[8px] border border-[#DFE8DF] bg-white pl-9 pr-3.5 text-[13px] text-[#193E33] font-medium focus:outline-none focus:border-[#0D5C47] focus:ring-1 focus:ring-[#0D5C47] transition-all"
                  placeholder="finance@agrojaya.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-[11.5px] font-semibold text-[#193E33]">
                  Kata sandi
                </label>
                <span className="text-[11px] font-semibold text-[#1C8361] hover:text-[#0D5C47] cursor-pointer transition-colors">
                  Lupa kata sandi?
                </span>
              </div>
              <div className="relative flex items-center">
                <span className="absolute left-3 flex items-center pointer-events-none text-[#668177]">
                  <i className="ri-lock-line text-[14px]"></i>
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-[40px] rounded-[8px] border border-[#DFE8DF] bg-white pl-9 pr-10 text-[13px] text-[#193E33] font-medium focus:outline-none focus:border-[#0D5C47] focus:ring-1 focus:ring-[#0D5C47] transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  title={showPassword ? 'Sembunyikan sandi' : 'Lihat sandi'}
                  className="absolute right-3 flex items-center text-[#668177] hover:text-[#0D5C47] transition-colors"
                >
                  <i className={showPassword ? 'ri-eye-off-line text-[#1C8361]' : 'ri-eye-line'}></i>
                </button>
              </div>
            </div>

            {/* Checkbox & Help Link */}
            <div className="flex justify-between items-center pt-0.5">
              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberDevice}
                  onChange={(e) => setRememberDevice(e.target.checked)}
                  className="w-3.5 h-3.5 rounded border-[#DFE8DF] text-[#0D5C47] focus:ring-[#0D5C47] cursor-pointer"
                  style={{ accentColor: '#0D5C47' }}
                />
                <span className="text-[12px] font-medium text-[#193E33]">
                  Ingat perangkat ini
                </span>
              </label>
              <span className="text-[11.5px] font-semibold text-[#1C8361] hover:text-[#0D5C47] cursor-pointer transition-colors">
                Butuh bantuan?
              </span>
            </div>

            {/* Main Full-Width Action CTA Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-[42px] rounded-[8px] text-white font-semibold text-[13px] flex items-center justify-center gap-2 shadow-xs transition-all duration-200 hover:-translate-y-[1px] active:scale-[0.98] mt-2.5"
              style={{
                backgroundColor: '#0D5C47',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#136E55')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0D5C47')}
            >
              {isLoading ? (
                <>
                  <span className="inline-block w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Menghubungkan ke Portal...</span>
                </>
              ) : (
                <>
                  <span>Masuk sebagai {activeRoleObj?.label || 'Pengguna'}</span>
                  <i className="ri-arrow-right-line text-[14px]"></i>
                </>
              )}
            </button>
          </form>

          {/* Security Note */}
          <div className="flex items-center justify-center gap-1.5 mt-2.5 text-[11px] text-[#668177]">
            <i className="ri-shield-check-line text-[#1C8361] text-[13px]"></i>
            <span>Data Anda dilindungi dengan autentikasi terenkripsi.</span>
          </div>
        </div>

        {/* Right Column Footer */}
        <div className="flex justify-between items-center text-[11px] text-[#668177]">
          <span>&copy; 2026 Smart Farming Indonesia</span>
          <span className="cursor-pointer hover:text-[#193E33] transition-colors font-medium">ID⌄</span>
        </div>
      </div>
    </div>
  );
};
