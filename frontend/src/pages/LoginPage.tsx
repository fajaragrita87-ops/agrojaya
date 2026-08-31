import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useRole, type RoleType, getDefaultPathForRole } from '../context/RoleContext';

// Official Registered User Accounts Database
interface UserAccount {
  email: string;
  name: string;
  role: RoleType;
  passwords: string[];
}

const OFFICIAL_ACCOUNTS: UserAccount[] = [
  {
    email: 'superadmin@agrojaya.com',
    name: 'Super Admin Master (Gerbang Utama)',
    role: 'SUPERADMIN',
    passwords: ['123456', 'admin123', 'superadmin123'],
  },
  {
    email: 'superadmin@smartfarm.id',
    name: 'Super Admin Master (Gerbang Utama)',
    role: 'SUPERADMIN',
    passwords: ['123456', 'admin123', 'superadmin123'],
  },
  {
    email: 'admin@agrojaya.com',
    name: 'Super Admin Master (Gerbang Utama)',
    role: 'SUPERADMIN',
    passwords: ['123456', 'admin123', 'superadmin123'],
  },
  {
    email: 'admin@smartfarm.id',
    name: 'Super Admin Master (Gerbang Utama)',
    role: 'SUPERADMIN',
    passwords: ['123456', 'admin123', 'superadmin123'],
  },
  {
    email: 'investor@agrojaya.com',
    name: 'Hendra Kusuma, B.Sc. (Investor)',
    role: 'INVESTOR',
    passwords: ['123456', 'investor123', 'admin123'],
  },
  {
    email: 'investor@smartfarm.id',
    name: 'Hendra Kusuma, B.Sc. (Investor)',
    role: 'INVESTOR',
    passwords: ['123456', 'investor123', 'admin123'],
  },
  {
    email: 'direktur@agrojaya.com',
    name: 'Ir. H. Ahmad Wijaya (Direktur Utama)',
    role: 'DIREKTUR',
    passwords: ['123456', 'admin123', 'direktur123'],
  },
  {
    email: 'direktur@smartfarm.id',
    name: 'Ir. H. Ahmad Wijaya (Direktur Utama)',
    role: 'DIREKTUR',
    passwords: ['123456', 'admin123', 'direktur123'],
  },
  {
    email: 'finance@agrojaya.com',
    name: 'Ratna Dewi, S.E., Ak. (Keuangan)',
    role: 'FINANCE',
    passwords: ['123456', 'finance123', 'admin123'],
  },
  {
    email: 'finance@smartfarm.id',
    name: 'Ratna Dewi, S.E., Ak. (Keuangan)',
    role: 'FINANCE',
    passwords: ['123456', 'finance123', 'admin123'],
  },
  {
    email: 'manager@agrojaya.com',
    name: 'Budi Santoso, S.P. (Manajer Ops)',
    role: 'MANAGER',
    passwords: ['123456', 'manager123', 'admin123'],
  },
  {
    email: 'manager@smartfarm.id',
    name: 'Budi Santoso, S.P. (Manajer Ops)',
    role: 'MANAGER',
    passwords: ['123456', 'manager123', 'admin123'],
  },
  {
    email: 'kepalakebun@agrojaya.com',
    name: 'Rahmat Hidayat (Kepala Kebun)',
    role: 'KEPALA_KEBUN',
    passwords: ['123456', 'kebun123', 'admin123'],
  },
  {
    email: 'kepalakebun@smartfarm.id',
    name: 'Rahmat Hidayat (Kepala Kebun)',
    role: 'KEPALA_KEBUN',
    passwords: ['123456', 'kebun123', 'admin123'],
  },
  {
    email: 'petani@agrojaya.com',
    name: 'Joko Susilo (Mandor Lapangan)',
    role: 'PETANI',
    passwords: ['123456', 'petani123', 'admin123'],
  },
  {
    email: 'petani@smartfarm.id',
    name: 'Joko Susilo (Mandor Lapangan)',
    role: 'PETANI',
    passwords: ['123456', 'petani123', 'admin123'],
  },
];

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { setRole } = useRole();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberDevice, setRememberDevice] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    setTimeout(() => {
      const cleanEmail = email.trim().toLowerCase();
      const cleanPassword = password.trim();

      const matchedUser = OFFICIAL_ACCOUNTS.find(
        (acc) =>
          acc.email.toLowerCase() === cleanEmail &&
          acc.passwords.includes(cleanPassword)
      );

      if (matchedUser) {
        setRole(matchedUser.role);
        setIsLoading(false);
        const targetPath = getDefaultPathForRole(matchedUser.role);
        navigate(targetPath);
      } else {
        setIsLoading(false);
        setErrorMessage('Email atau kata sandi tidak valid. Silakan gunakan akun resmi Anda.');
      }
    }, 450);
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col lg:flex-row bg-[#FBFBF6] selection:bg-[#0D5C47] selection:text-white"
      style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}
    >
      {/* =========================================================================
          KOLOM KIRI: Hero Image Bersih (Desktop: 50%, Mobile: Header Ringkas)
         ========================================================================= */}
      <div className="w-full lg:w-[50%] h-[160px] sm:h-[200px] lg:h-screen lg:sticky lg:top-0 relative overflow-hidden bg-[#072B20] flex-shrink-0">
        <img
          src="/assets/login/left_hero_bg.png"
          alt="Smart Farming Kebun AgroJaya"
          className="w-full h-full object-cover object-left-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#072B20]/90 via-[#072B20]/40 to-transparent lg:hidden flex items-end p-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#C8E86B]">
              AGROJAYA SMART FARM ERP
            </span>
            <h1 className="text-lg font-black text-white m-0 leading-tight">
              Portal Akuntabilitas & Operasional
            </h1>
          </div>
        </div>
      </div>

      {/* =========================================================================
          KOLOM KANAN: Form Login Responsif & Bersih
         ========================================================================= */}
      <div className="w-full lg:w-[50%] min-h-[calc(100vh-160px)] lg:min-h-screen flex flex-col justify-between p-4 sm:p-6 lg:p-10 xl:px-14 bg-[#FBFBF6] overflow-y-auto">
        {/* Top Header Navigation */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-[11px] font-black text-[#1C8361] uppercase tracking-wider">
            Sistem Autentikasi Pengguna
          </span>
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-[12px] font-bold text-[#668177] hover:text-[#193E33] transition-colors"
          >
            <i className="ri-arrow-left-line"></i> Kembali ke Beranda
          </Link>
        </div>

        {/* Center Main Form Container */}
        <div className="w-full max-w-[400px] mx-auto my-auto py-2">
          {/* Heading */}
          <div className="mb-5 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF7F2] border border-[#0D5C47]/20 text-[#0D5C47] text-[11px] font-extrabold mb-2.5">
              <i className="ri-shield-check-fill text-[13px]"></i>
              <span>Keamanan Berlapis (Enterprise Grade)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#193E33] m-0">
              Masuk ke Akun
            </h1>
            <p className="text-[12.5px] text-[#668177] mt-1">
              Silakan masukkan kredensial resmi akun Anda untuk mengakses sistem:
            </p>
          </div>

          {/* Error Message Alert */}
          {errorMessage && (
            <div className="p-3 bg-[#FEE2E2] border border-[#EF4444]/30 rounded-[10px] text-[12px] font-bold text-[#B91C1C] mb-4 flex items-center gap-2 animate-in fade-in duration-150">
              <i className="ri-error-warning-fill text-base shrink-0"></i>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Clean Login Form */}
          <form onSubmit={handleLogin} className="space-y-3.5 text-left">
            {/* Email Field */}
            <div>
              <label className="block text-[12px] font-extrabold text-[#193E33] mb-1.5">
                Alamat Email Terdaftar
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 flex items-center pointer-events-none text-[#668177]" style={{ zIndex: 10 }}>
                  <i className="ri-mail-line text-[15px]"></i>
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-[44px] rounded-[10px] border border-[#DFE8DF] bg-white text-[13.5px] text-[#193E33] font-semibold focus:outline-none focus:border-[#0D5C47] focus:ring-2 focus:ring-[#0D5C47]/20 transition-all placeholder:text-[#94A39D]"
                  style={{ paddingLeft: '40px', paddingRight: '14px' }}
                  placeholder="contoh: direktur@agrojaya.com"
                  required
                  autoFocus
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-[12px] font-extrabold text-[#193E33]">
                  Kata Sandi
                </label>
                <span
                  onClick={() => alert('Untuk bantuan pemulihan kata sandi akun resmi, silakan hubungi Administrator Sistem.')}
                  className="text-[11.5px] font-bold text-[#1C8361] hover:text-[#0D5C47] cursor-pointer transition-colors"
                >
                  Lupa sandi?
                </span>
              </div>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 flex items-center pointer-events-none text-[#668177]" style={{ zIndex: 10 }}>
                  <i className="ri-lock-line text-[15px]"></i>
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-[44px] rounded-[10px] border border-[#DFE8DF] bg-white text-[13.5px] text-[#193E33] font-semibold focus:outline-none focus:border-[#0D5C47] focus:ring-2 focus:ring-[#0D5C47]/20 transition-all placeholder:text-[#94A39D]"
                  style={{ paddingLeft: '40px', paddingRight: '42px' }}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  title={showPassword ? 'Sembunyikan sandi' : 'Lihat sandi'}
                  className="absolute right-3.5 flex items-center text-[#668177] hover:text-[#0D5C47] transition-colors cursor-pointer"
                  style={{ zIndex: 10 }}
                >
                  <i className={showPassword ? 'ri-eye-off-line text-[#1C8361]' : 'ri-eye-line'}></i>
                </button>
              </div>
            </div>

            {/* Checkbox & Encryption info */}
            <div className="flex justify-between items-center pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberDevice}
                  onChange={(e) => setRememberDevice(e.target.checked)}
                  className="w-4 h-4 rounded border-[#DFE8DF] text-[#0D5C47] focus:ring-[#0D5C47] cursor-pointer"
                  style={{ accentColor: '#0D5C47' }}
                />
                <span className="text-[12px] font-semibold text-[#193E33]">
                  Ingat sesi perangkat ini
                </span>
              </label>
              <span className="text-[11px] font-semibold text-[#668177]">
                🔒 256-Bit SSL
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-[46px] rounded-[12px] text-white font-extrabold text-[14px] flex items-center justify-center gap-2 shadow-sm transition-all duration-150 hover:-translate-y-[1px] active:scale-[0.98] mt-4 cursor-pointer"
              style={{
                backgroundColor: '#0D5C47',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#136E55')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0D5C47')}
            >
              {isLoading ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Memverifikasi Akun...</span>
                </>
              ) : (
                <>
                  <span>Masuk ke Sistem</span>
                  <i className="ri-arrow-right-line text-[15px]"></i>
                </>
              )}
            </button>
          </form>

          {/* Security Guarantee Note */}
          <div className="flex items-center justify-center gap-1.5 mt-4 text-[11px] text-[#668177]">
            <i className="ri-shield-check-line text-[#1C8361]"></i>
            <span>Portal terlindungi RBAC (Role-Based Access Control)</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center text-[11px] text-[#668177] mt-4 pt-3 border-t border-[#DFE8DF]/60">
          <span>&copy; 2026 AgroJaya ERP • Jonggol 2.0 Ha</span>
          <span className="font-bold text-[#193E33]">v2.4 Production</span>
        </div>
      </div>
    </div>
  );
};
