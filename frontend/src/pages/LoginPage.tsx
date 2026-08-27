import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useRole, type RoleType, getDefaultPathForRole } from '../context/RoleContext';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { role, setRole } = useRole();

  const [selectedRole, setSelectedRole] = useState<RoleType>(role || 'FINANCE');
  const [email, setEmail] = useState('finance@smartfarm.id');
  const [password, setPassword] = useState('finance123');
  const [rememberDevice, setRememberDevice] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // All 6 Full Operational & Executive Roles
  const roleCards: { role: RoleType; label: string; email: string; pass: string; desc: string; icon: string }[] = [
    {
      role: 'INVESTOR',
      label: 'Pemodal / Investor',
      email: 'investor@smartfarm.id',
      pass: 'investor123',
      desc: 'Transparansi Modal & ROI',
      icon: 'ri-funds-box-line',
    },
    {
      role: 'DIREKTUR',
      label: 'Direktur Utama',
      email: 'direktur@smartfarm.id',
      pass: 'admin123',
      desc: 'Otorisasi & Kebijakan',
      icon: 'ri-vip-crown-line',
    },
    {
      role: 'FINANCE',
      label: 'Manajer Keuangan',
      email: 'finance@smartfarm.id',
      pass: 'finance123',
      desc: 'Verifikasi PO & Kas',
      icon: 'ri-wallet-3-line',
    },
    {
      role: 'MANAGER',
      label: 'Manajer Ops',
      email: 'manager@smartfarm.id',
      pass: 'manager123',
      desc: 'SLA Kebun & Produksi',
      icon: 'ri-building-2-line',
    },
    {
      role: 'KEPALA_KEBUN',
      label: 'Kepala Kebun',
      email: 'kepalakebun@smartfarm.id',
      pass: 'kebun123',
      desc: 'Agronomi & Tugas',
      icon: 'ri-plant-line',
    },
    {
      role: 'PETANI',
      label: 'Petani / Mandor',
      email: 'petani@smartfarm.id',
      pass: 'petani123',
      desc: 'Eksekusi & Scan QR',
      icon: 'ri-user-follow-line',
    },
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
    }, 400);
  };

  const activeRoleObj = roleCards.find((p) => p.role === selectedRole);

  return (
    <div
      className="min-h-screen w-full flex flex-col lg:flex-row bg-[#FBFBF6] selection:bg-[#0D5C47] selection:text-white"
      style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}
    >
      {/* =========================================================================
          KOLOM KIRI: Hero Image Bersih (Desktop: 52%, Mobile: Header Ringkas)
         ========================================================================= */}
      <div className="w-full lg:w-[50%] h-[160px] sm:h-[200px] lg:h-screen lg:sticky lg:top-0 relative overflow-hidden bg-[#072B20] flex-shrink-0">
        <img
          src="/assets/login/left_hero_bg.png"
          alt="Smart Farming Kebun"
          className="w-full h-full object-cover object-left-top"
        />
      </div>

      {/* =========================================================================
          KOLOM KANAN: Form Login Responsif (Selalu Bisa Di-scroll & Tidak Terpotong)
         ========================================================================= */}
      <div className="w-full lg:w-[50%] min-h-[calc(100vh-160px)] lg:min-h-screen flex flex-col justify-between p-4 sm:p-6 lg:p-10 xl:px-14 bg-[#FBFBF6] overflow-y-auto">
        {/* Top Header Navigation */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-[11px] font-bold text-[#1C8361] uppercase tracking-wider">
            Portal Akses Karyawan & Investor
          </span>
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#668177] hover:text-[#193E33] transition-colors"
          >
            <i className="ri-arrow-left-line"></i> Kembali
          </Link>
        </div>

        {/* Center Main Form Container */}
        <div className="w-full max-w-[420px] mx-auto my-auto py-2">
          {/* Ringkas Heading */}
          <div className="mb-3.5 text-left">
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#193E33] m-0">
              Masuk ke Ruang Kerja
            </h1>
            <p className="text-[12px] text-[#668177] mt-0.5">
              Pilih peran atau masukkan akun terdaftar Anda:
            </p>
          </div>

          {/* 6-Role Cards Selector (2-Column Grid) */}
          <div className="grid grid-cols-2 gap-1.5 mb-3">
            {roleCards.map((card) => {
              const isSelected = selectedRole === card.role;
              return (
                <button
                  key={card.role}
                  type="button"
                  onClick={() => handleRoleSelect(card.role, card.email, card.pass)}
                  className={`w-full p-2 rounded-[10px] text-left flex items-center justify-between transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? 'bg-[#EBF7F2] border-[1.5px] border-[#0D5C47] shadow-xs'
                      : 'bg-white border border-[#DFE8DF] hover:border-[#1C8361]/50 hover:bg-[#FAFDFB]'
                  }`}
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-[12px] ${
                        isSelected ? 'bg-[#0D5C47] text-white' : 'bg-[#EBF7F2] text-[#1C8361]'
                      }`}
                    >
                      <i className={card.icon}></i>
                    </div>
                    <div className="overflow-hidden">
                      <strong
                        className={`block text-[11px] leading-tight truncate ${
                          isSelected ? 'text-[#0D5C47] font-bold' : 'text-[#193E33] font-medium'
                        }`}
                      >
                        {card.label}
                      </strong>
                      <span className="block text-[9.5px] text-[#668177] truncate">
                        {card.desc}
                      </span>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="w-3.5 h-3.5 rounded-full bg-[#0D5C47] text-white flex items-center justify-center text-[9px] flex-shrink-0">
                      <i className="ri-check-line font-bold"></i>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-2.5 text-left">
            {/* Email Field */}
            <div>
              <label className="block text-[11.5px] font-bold text-[#193E33] mb-1">
                Email Akun
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3 flex items-center pointer-events-none text-[#668177]" style={{ zIndex: 10 }}>
                  <i className="ri-mail-line text-[14px]"></i>
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-[40px] rounded-[8px] border border-[#DFE8DF] bg-white text-[13px] text-[#193E33] font-medium focus:outline-none focus:border-[#0D5C47] focus:ring-1 focus:ring-[#0D5C47] transition-all"
                  style={{ paddingLeft: '38px', paddingRight: '14px' }}
                  placeholder="nama@smartfarm.id"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-[11.5px] font-bold text-[#193E33]">
                  Kata Sandi
                </label>
                <span
                  onClick={() => alert('Petunjuk pemulihan kata sandi telah dikirimkan ke email Anda.')}
                  className="text-[11px] font-semibold text-[#1C8361] hover:text-[#0D5C47] cursor-pointer transition-colors"
                >
                  Lupa sandi?
                </span>
              </div>
              <div className="relative flex items-center">
                <span className="absolute left-3 flex items-center pointer-events-none text-[#668177]" style={{ zIndex: 10 }}>
                  <i className="ri-lock-line text-[14px]"></i>
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-[40px] rounded-[8px] border border-[#DFE8DF] bg-white text-[13px] text-[#193E33] font-medium focus:outline-none focus:border-[#0D5C47] focus:ring-1 focus:ring-[#0D5C47] transition-all"
                  style={{ paddingLeft: '38px', paddingRight: '40px' }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  title={showPassword ? 'Sembunyikan sandi' : 'Lihat sandi'}
                  className="absolute right-3 flex items-center text-[#668177] hover:text-[#0D5C47] transition-colors cursor-pointer"
                  style={{ zIndex: 10 }}
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
                <span className="text-[11.5px] font-medium text-[#193E33]">
                  Ingat perangkat ini
                </span>
              </label>
              <span className="text-[11px] text-[#668177]">
                🔒 Terenkripsi SSL
              </span>
            </div>

            {/* Main Action CTA Button - GUARANTEED FULLY VISIBLE & CLICKABLE ON MOBILE */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-[44px] rounded-[10px] text-white font-bold text-[13.5px] flex items-center justify-center gap-2 shadow-sm transition-all duration-150 hover:-translate-y-[1px] active:scale-[0.98] mt-3 cursor-pointer"
              style={{
                backgroundColor: '#0D5C47',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#136E55')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0D5C47')}
            >
              {isLoading ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Menghubungkan...</span>
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
          <div className="flex items-center justify-center gap-1.5 mt-3 text-[10.5px] text-[#668177]">
            <i className="ri-shield-check-line text-[#1C8361]"></i>
            <span>Data terlindungi dengan sistem keamanan berbasis peran.</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center text-[10.5px] text-[#668177] mt-3 pt-2 border-t border-[#DFE8DF]/60">
          <span>&copy; 2026 Smart Farm Indonesia</span>
          <span className="font-semibold text-[#193E33]">ID / Indonesia</span>
        </div>
      </div>
    </div>
  );
};
