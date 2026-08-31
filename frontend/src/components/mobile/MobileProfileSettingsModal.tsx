import React, { useState } from 'react';
import { useRole, type RoleType } from '../../context/RoleContext';

interface MobileProfileSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileProfileSettingsModal: React.FC<MobileProfileSettingsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { role, setRole } = useRole();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [gpsSyncEnabled, setGpsSyncEnabled] = useState(true);
  const [saveSuccessNotice, setSaveSuccessNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  const roleDetails: Record<RoleType, { name: string; email: string; phone: string; badge: string; avatarColor: string }> = {
    SUPERADMIN: {
      name: 'Super Admin Master',
      email: 'superadmin@agrojaya.com',
      phone: '+62 811-9999-0000',
      badge: 'Super Admin (Master Gerbang)',
      avatarColor: 'bg-amber-600',
    },
    DIREKTUR: {
      name: 'Budi Santoso, S.P., M.M.',
      email: 'direksi@agrojaya.co.id',
      phone: '+62 811-920-8800',
      badge: 'Direktur Utama',
      avatarColor: 'bg-emerald-700',
    },
    INVESTOR: {
      name: 'Hendrawan Kusuma',
      email: 'hendrawan.investor@agrojaya.com',
      phone: '+62 812-8899-7711',
      badge: 'Investor Utama Proyek',
      avatarColor: 'bg-[#0B251E]',
    },
    FINANCE: {
      name: 'Siti Rahmawati, S.E., Ak.',
      email: 'finance@agrojaya.co.id',
      phone: '+62 813-2211-4433',
      badge: 'Manajer Keuangan',
      avatarColor: 'bg-teal-700',
    },
    MANAGER: {
      name: 'Ir. Agus Wijaya',
      email: 'ops.manager@agrojaya.co.id',
      phone: '+62 812-3344-5566',
      badge: 'Manajer Operasional Kebun',
      avatarColor: 'bg-emerald-800',
    },
    KEPALA_KEBUN: {
      name: 'Supardi Hartono (Mandor 1)',
      email: 'supardi.kebun@agrojaya.co.id',
      phone: '+62 857-1122-3344',
      badge: 'Kepala Kebun Jonggol',
      avatarColor: 'bg-green-700',
    },
    PETANI: {
      name: 'Kang Asep Sudrajat',
      email: 'asep.mandor@agrojaya.co.id',
      phone: '+62 878-9900-1122',
      badge: 'Mandor / Petani Regu A',
      avatarColor: 'bg-emerald-900',
    },
  };

  const current = roleDetails[role] || roleDetails.INVESTOR;

  const handleSaveSettings = () => {
    setSaveSuccessNotice('✅ Pengaturan profil & preferensi berhasil disimpan.');
    setTimeout(() => {
      setSaveSuccessNotice(null);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-end justify-center overflow-hidden">
      {/* Frosted Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-xs transition-opacity cursor-pointer animate-in fade-in duration-150"
        onClick={onClose}
      ></div>

      {/* Profile & Settings Card Sheet */}
      <div className="relative w-full max-w-[480px] mx-auto max-h-[92vh] bg-[#FAFBF8] text-[#17211E] rounded-t-[24px] shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-bottom duration-200 border-t border-[#DDE5DF] overflow-hidden">
        {/* Header Bar */}
        <div className="p-3.5 bg-gradient-to-r from-[#061E18] via-[#0A382E] to-[#0F4E40] text-white flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <i className="ri-user-settings-fill text-[#C8E86B] text-lg"></i>
            <div>
              <strong className="text-[12.5px] text-white block leading-tight">Profil & Pengaturan Akun</strong>
              <span className="text-[8.5px] text-[#A3D9C9]">Smart Farm Suite</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-base transition-colors cursor-pointer"
          >
            &times;
          </button>
        </div>

        {/* Scrollable Body Content */}
        <div
          style={{
            flex: 1,
            minHeight: 0,
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
          }}
          className="p-3.5 space-y-3"
        >
          {saveSuccessNotice && (
            <div className="p-2 bg-[#E8F1EA] text-[#0F5545] rounded-[10px] text-[11px] font-bold text-center border border-[#0F5545]/20 animate-in fade-in">
              {saveSuccessNotice}
            </div>
          )}

          {/* User Card */}
          <div className="p-3.5 rounded-[16px] bg-white border border-[#DDE5DF] shadow-xs flex items-center gap-3">
            <div className={`w-12 h-12 rounded-full ${current.avatarColor} text-[#C8E86B] font-black text-sm flex items-center justify-center shadow-xs border-2 border-white flex-shrink-0`}>
              {role.substring(0, 2)}
            </div>
            <div className="overflow-hidden flex-1">
              <span className="text-[8.5px] font-extrabold bg-[#E8F1EA] text-[#0F5545] px-1.5 py-0.2 rounded-full inline-block mb-0.5">
                {current.badge}
              </span>
              <h3 className="font-black text-[13.5px] text-[#17211E] m-0 truncate leading-tight">
                {current.name}
              </h3>
              <span className="text-[10px] text-[#5F6A65] block truncate mt-0.5">
                {current.email} • {current.phone}
              </span>
            </div>
          </div>

          {/* Site & System Info */}
          <div className="p-3 rounded-[14px] bg-white border border-[#DDE5DF] shadow-xs space-y-1.5 text-[11px]">
            <strong className="text-[11px] text-[#17211E] block mb-1">📍 Lokasi Penugasan & Otoritas:</strong>
            <div className="flex justify-between py-1 border-b border-[#FAFBF8]">
              <span className="text-[#5F6A65]">Perkebunan:</span>
              <strong className="text-[#0F5545]">Kebun Inti Jonggol (2.0 Ha)</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-[#FAFBF8]">
              <span className="text-[#5F6A65]">Status Akses:</span>
              <span className="bg-[#E8F1EA] text-[#0F5545] font-bold px-1.5 py-0.2 rounded text-[9.5px]">
                Aktif & Terverifikasi
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-[#5F6A65]">Versi Aplikasi:</span>
              <span className="font-mono text-[#5F6A65] text-[10px]">v2.4.0 (Enterprise Build)</span>
            </div>
          </div>

          {/* Quick Settings Toggles */}
          <div className="p-3 rounded-[14px] bg-white border border-[#DDE5DF] shadow-xs space-y-2 text-[11px]">
            <strong className="text-[11px] text-[#17211E] block mb-1">⚙️ Preferensi Notifikasi & Sensor:</strong>

            <div className="flex items-center justify-between py-1 border-b border-[#FAFBF8]">
              <div>
                <span className="font-bold text-[#17211E] block">Notifikasi PO & Panen</span>
                <span className="text-[9.5px] text-[#5F6A65]">Pemberitahuan instan saat PO diajukan</span>
              </div>
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={(e) => setNotificationsEnabled(e.target.checked)}
                className="w-4 h-4 accent-[#0F5545] cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between py-1">
              <div>
                <span className="font-bold text-[#17211E] block">Sinkronisasi Geotagging GPS</span>
                <span className="text-[9.5px] text-[#5F6A65]">Verifikasi koordinat saat scan QR ajir</span>
              </div>
              <input
                type="checkbox"
                checked={gpsSyncEnabled}
                onChange={(e) => setGpsSyncEnabled(e.target.checked)}
                className="w-4 h-4 accent-[#0F5545] cursor-pointer"
              />
            </div>
          </div>

          {/* System AI Status */}
          <div className="p-3 rounded-[14px] bg-white border border-[#DDE5DF] shadow-xs flex items-center justify-between text-[11px]">
            <div>
              <strong className="text-[11px] text-[#17211E] block">🧠 Server AI AgroVision & Gemini:</strong>
              <span className="text-[9.5px] text-[#5F6A65]">Otomatis terhubung ke cloud sistem</span>
            </div>
            <span className="bg-[#E8F1EA] text-[#0F5545] font-bold px-2 py-0.5 rounded text-[9.5px] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"></span>
              <span>Aktif</span>
            </span>
          </div>

          {/* Role Switcher (Simulasi Cepat) */}
          <div className="p-3 rounded-[14px] bg-white border border-[#DDE5DF] shadow-xs space-y-1.5">
            <strong className="text-[11px] text-[#17211E] block">🔄 Ganti Mode Pengguna:</strong>
            <div className="grid grid-cols-3 gap-1.5">
              {(['DIREKTUR', 'INVESTOR', 'FINANCE', 'MANAGER', 'KEPALA_KEBUN', 'PETANI'] as RoleType[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => {
                    setRole(r);
                    setSaveSuccessNotice(`Beralih ke mode ${r}.`);
                    setTimeout(() => {
                      setSaveSuccessNotice(null);
                      onClose();
                    }, 800);
                  }}
                  className={`py-1.5 px-1 text-center rounded-[8px] font-bold text-[9.5px] border transition-all cursor-pointer ${
                    role === r
                      ? 'bg-[#0F5545] text-white border-[#0F5545] shadow-xs'
                      : 'bg-[#FAFBF8] text-[#5F6A65] border-[#DDE5DF] hover:border-[#0F5545]'
                  }`}
                >
                  {r.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div
          style={{
            paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 12px)',
          }}
          className="p-3 bg-white border-t border-[#DDE5DF] flex gap-2 shrink-0"
        >
          <button
            type="button"
            onClick={handleSaveSettings}
            className="flex-1 py-2 bg-[#0F5545] text-white font-extrabold text-[11px] rounded-[10px] cursor-pointer hover:bg-[#0B251E] shadow-xs flex items-center justify-center gap-1.5"
          >
            <i className="ri-save-line"></i>
            <span>Simpan Pengaturan</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-[#DDE5DF] text-[#5F6A65] font-bold text-[11px] rounded-[10px] cursor-pointer hover:bg-slate-50"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
