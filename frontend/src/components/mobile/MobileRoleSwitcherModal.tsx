import React from 'react';
import { useRole, type RoleType } from '../../context/RoleContext';
import { useNavigate } from 'react-router-dom';

interface MobileRoleSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileRoleSwitcherModal: React.FC<MobileRoleSwitcherModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { role, setRole } = useRole();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const rolesConfig: {
    id: RoleType;
    label: string;
    sublabel: string;
    icon: string;
    color: string;
    bgBadge: string;
  }[] = [
    {
      id: 'SUPERADMIN',
      label: 'Super Admin Master',
      sublabel: 'Akses penuh ke seluruh modul & gerbang otorisasi',
      icon: '👑',
      color: '#D97706',
      bgBadge: 'bg-amber-100 text-amber-900 border-amber-300',
    },
    {
      id: 'DIREKTUR',
      label: 'Direktur Utama',
      sublabel: 'Otorisasi Belanja Layer 2 & Dasbor Eksekutif',
      icon: '👔',
      color: '#0F5545',
      bgBadge: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    },
    {
      id: 'INVESTOR',
      label: 'Investor Utama',
      sublabel: 'Otorisasi Modal Layer 3 & Portofolio ROI 5D',
      icon: '💼',
      color: '#0B251E',
      bgBadge: 'bg-slate-100 text-slate-900 border-slate-300',
    },
    {
      id: 'FINANCE',
      label: 'Manajer Keuangan (Finance)',
      sublabel: 'Verifikasi Anggaran Layer 1 & Buku Kas Realtime',
      icon: '💵',
      color: '#0284C7',
      bgBadge: 'bg-sky-100 text-sky-900 border-sky-300',
    },
    {
      id: 'MANAGER',
      label: 'Manajer Operasional',
      sublabel: 'Pengajuan PO Baru, Tasklist, & Produksi Kebun',
      icon: '🚜',
      color: '#16A34A',
      bgBadge: 'bg-green-100 text-green-900 border-green-300',
    },
    {
      id: 'KEPALA_KEBUN',
      label: 'Kepala Kebun',
      sublabel: 'Supervisi Mandor Lapangan, Panen, & Stok Gudang',
      icon: '🤠',
      color: '#D97706',
      bgBadge: 'bg-amber-100 text-amber-900 border-amber-300',
    },
    {
      id: 'PETANI',
      label: 'Petani / Mandor Lapangan',
      sublabel: 'Presensi Kerja PWA, Live Feed Foto, & Scan QR',
      icon: '🌾',
      color: '#059669',
      bgBadge: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    },
  ];

  const handleSelectRole = (newRole: RoleType) => {
    setRole(newRole);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999999] flex items-center justify-center p-3.5 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Dialog Card */}
      <div
        className="relative w-full max-w-[440px] my-auto bg-[#FAFBF8] text-[#17211E] rounded-[24px] shadow-2xl flex flex-col z-10 border border-[#DDE5DF] overflow-hidden animate-in zoom-in-95 duration-150 max-h-[88dvh]"
        style={{ fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
      >
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-[#064E3B] via-[#047857] to-[#065F46] text-white flex items-center justify-between shrink-0 shadow-md">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-[10px] bg-white/15 border border-white/25 flex items-center justify-center text-xl">
              🔄
            </div>
            <div>
              <strong className="text-[14px] font-black text-white block leading-tight">
                Pilih Peran Pengguna
              </strong>
              <span className="text-[10px] text-[#C8E86B] font-semibold">
                Mode Aktif Sekarang: {rolesConfig.find((r) => r.id === role)?.label || role}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center cursor-pointer text-base transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Role List */}
        <div className="p-3.5 space-y-2 overflow-y-auto flex-1">
          <span className="text-[11px] font-bold text-[#5F6A65] uppercase tracking-wider block mb-1">
            Silakan pilih role untuk beralih tampilan:
          </span>

          {rolesConfig.map((r) => {
            const isSelected = role === r.id;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => handleSelectRole(r.id)}
                className={`w-full p-3 rounded-[14px] border text-left flex items-center justify-between gap-3 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#E8F1EA] border-[#0F5545] ring-2 ring-[#0F5545]/20 shadow-xs'
                    : 'bg-white border-[#DDE5DF] hover:bg-[#F8FAF8] hover:border-[#1FB88B]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-10 h-10 rounded-[12px] flex items-center justify-center text-xl shrink-0 shadow-2xs"
                    style={{ backgroundColor: `${r.color}15`, border: `1px solid ${r.color}30` }}
                  >
                    {r.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <strong className="text-[12.5px] font-bold text-[#17211E] truncate block">
                        {r.label}
                      </strong>
                      {isSelected && (
                        <span className="px-1.5 py-0.2 rounded-full bg-[#0F5545] text-white text-[8.5px] font-extrabold shrink-0">
                          Aktif
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-[#5F6A65] line-clamp-1 block mt-0.5">
                      {r.sublabel}
                    </span>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <i
                    className={`ri-arrow-right-s-line text-lg ${
                      isSelected ? 'text-[#0F5545] font-black' : 'text-[#8C9893]'
                    }`}
                  ></i>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer Actions: Kembali ke Login / Web Portal */}
        <div className="p-3 bg-[#F4F7F5] border-t border-[#DDE5DF] flex items-center justify-between gap-2 shrink-0">
          <button
            type="button"
            onClick={() => {
              onClose();
              navigate('/login');
            }}
            className="flex-1 py-2 px-3 rounded-[10px] bg-white border border-[#DDE5DF] text-[#B91C1C] hover:bg-red-50 text-[11.5px] font-extrabold flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs transition-colors"
          >
            <i className="ri-logout-box-r-line"></i>
            <span>Keluar ke Halaman Login</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="py-2 px-4 rounded-[10px] bg-[#0F5545] text-white hover:bg-[#0B3B30] text-[11.5px] font-extrabold cursor-pointer shadow-2xs transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
