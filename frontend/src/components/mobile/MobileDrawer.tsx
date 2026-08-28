import React, { useState } from 'react';
import { useRole, type RoleType } from '../../context/RoleContext';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectView?: (viewId: string) => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  onSelectView,
}) => {
  const { role } = useRole();
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const roleNameMap: Record<RoleType, { name: string; title: string; avatarBg: string }> = {
    DIREKTUR: { name: 'Direktur Utama', title: 'Executive Management', avatarBg: 'bg-emerald-600' },
    INVESTOR: { name: 'Investor Utama', title: 'Portofolio & Akuntabilitas Modal', avatarBg: 'bg-[#0B251E]' },
    FINANCE: { name: 'Manajer Keuangan', title: 'Financial Controller & Kas', avatarBg: 'bg-teal-700' },
    MANAGER: { name: 'Manajer Operasional', title: 'Operations & Site Leader', avatarBg: 'bg-emerald-800' },
    KEPALA_KEBUN: { name: 'Kepala Kebun', title: 'Agronomy & Field Supervisor', avatarBg: 'bg-green-700' },
    PETANI: { name: 'Petani / Mandor Lapangan', title: 'Field Crew & Perawatan Ajir', avatarBg: 'bg-emerald-900' },
  };

  const { name: userName, title: userTitle } = roleNameMap[role] || {
    name: 'Pengguna AgroJaya',
    title: 'Smart Farming ERP',
    avatarBg: 'bg-[#0F5545]',
  };

  interface ModuleItem {
    id: string;
    title: string;
    desc: string;
    icon: string;
    iconColor: string;
    iconBg: string;
    badge?: string;
    badgeColor?: string;
    category: 'UTAMA' | 'FINANSIAL' | 'AGRONOMI';
    roles: RoleType[];
  }

  const allModules: ModuleItem[] = [
    // 1. FITUR UTAMA & SMART AI
    {
      id: 'dasbor',
      title: 'Dasbor Eksekutif',
      desc: 'Valuasi & KPI Utama',
      icon: 'ri-dashboard-3-fill',
      iconColor: 'text-[#0F5545]',
      iconBg: 'bg-[#E8F1EA]',
      badge: 'Live',
      badgeColor: 'bg-[#C8E86B] text-[#061E18]',
      category: 'UTAMA',
      roles: ['DIREKTUR', 'INVESTOR', 'FINANCE', 'MANAGER', 'KEPALA_KEBUN', 'PETANI'],
    },
    {
      id: 'ktp_pohon',
      title: 'KTP Sampel Pohon',
      desc: 'Scan Ajir & Perawatan',
      icon: 'ri-qr-code-line',
      iconColor: 'text-emerald-600',
      iconBg: 'bg-emerald-50',
      badge: 'Barcode',
      badgeColor: 'bg-[#061E18] text-[#C8E86B]',
      category: 'UTAMA',
      roles: ['DIREKTUR', 'INVESTOR', 'FINANCE', 'MANAGER', 'KEPALA_KEBUN', 'PETANI'],
    },
    {
      id: 'tanya_ai',
      title: 'Konsultan AI Jaya',
      desc: 'Tanya Jawab Pintar',
      icon: 'ri-sparkling-fill',
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-50',
      badge: 'AI Smart',
      badgeColor: 'bg-purple-100 text-purple-800',
      category: 'UTAMA',
      roles: ['DIREKTUR', 'INVESTOR', 'FINANCE', 'MANAGER', 'KEPALA_KEBUN', 'PETANI'],
    },
    {
      id: 'peta_gis',
      title: 'Peta Satelit GIS',
      desc: 'Tracking 2.0 Ha & pH',
      icon: 'ri-map-pin-2-fill',
      iconColor: 'text-teal-600',
      iconBg: 'bg-teal-50',
      category: 'UTAMA',
      roles: ['DIREKTUR', 'INVESTOR', 'MANAGER', 'KEPALA_KEBUN'],
    },
    {
      id: 'scan_daun',
      title: 'Diagnosa Daun AI',
      desc: 'Vision AI Hama & Sakit',
      icon: 'ri-camera-lens-fill',
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-50',
      badge: '98% Akurat',
      badgeColor: 'bg-blue-100 text-blue-800',
      category: 'UTAMA',
      roles: ['DIREKTUR', 'INVESTOR', 'FINANCE', 'MANAGER', 'KEPALA_KEBUN', 'PETANI'],
    },
    {
      id: 'approval_po',
      title: 'Otorisasi PO',
      desc: 'Approval Belanja Modal',
      icon: 'ri-shield-check-fill',
      iconColor: 'text-amber-600',
      iconBg: 'bg-amber-50',
      badge: '2 Pending',
      badgeColor: 'bg-amber-500 text-white',
      category: 'UTAMA',
      roles: ['DIREKTUR', 'INVESTOR', 'FINANCE', 'MANAGER'],
    },

    // 2. FINANSIAL & AKUNTANSI
    {
      id: 'buku_kas',
      title: 'Buku Kas & Mutasi',
      desc: 'Jurnal Arus Kas Masuk/Keluar',
      icon: 'ri-wallet-3-fill',
      iconColor: 'text-emerald-700',
      iconBg: 'bg-emerald-50',
      badge: 'Rp 486 Jt',
      badgeColor: 'bg-emerald-100 text-emerald-900',
      category: 'FINANSIAL',
      roles: ['DIREKTUR', 'INVESTOR', 'FINANCE'],
    },
    {
      id: 'kalkulator',
      title: 'Kalkulator HPP',
      desc: 'HPP Rp 9.200/Kg & Margin BEP',
      icon: 'ri-calculator-fill',
      iconColor: 'text-amber-700',
      iconBg: 'bg-amber-50',
      category: 'FINANSIAL',
      roles: ['DIREKTUR', 'INVESTOR', 'FINANCE', 'MANAGER'],
    },
    {
      id: 'sdm',
      title: 'Presensi & Upah',
      desc: 'Absensi GPS & Upah Borongan',
      icon: 'ri-user-follow-fill',
      iconColor: 'text-indigo-600',
      iconBg: 'bg-indigo-50',
      badge: '14 Hadir',
      badgeColor: 'bg-indigo-100 text-indigo-900',
      category: 'FINANSIAL',
      roles: ['DIREKTUR', 'FINANCE', 'MANAGER', 'KEPALA_KEBUN', 'PETANI'],
    },

    // 3. AGRONOMI & KEBUN
    {
      id: 'siklus_lahan',
      title: 'Siklus Fisik Lahan',
      desc: 'Dokumentasi 8 Fase Tanah',
      icon: 'ri-plant-fill',
      iconColor: 'text-green-700',
      iconBg: 'bg-green-50',
      badge: 'Fase 4',
      badgeColor: 'bg-green-100 text-green-900',
      category: 'AGRONOMI',
      roles: ['DIREKTUR', 'INVESTOR', 'MANAGER', 'KEPALA_KEBUN', 'PETANI'],
    },
    {
      id: 'gudang',
      title: 'Stok Gudang',
      desc: 'Safety Stock Pupuk & Benih',
      icon: 'ri-archive-fill',
      iconColor: 'text-slate-700',
      iconBg: 'bg-slate-100',
      category: 'AGRONOMI',
      roles: ['DIREKTUR', 'INVESTOR', 'FINANCE', 'MANAGER', 'KEPALA_KEBUN'],
    },
    {
      id: 'timbangan',
      title: 'Jembatan Timbang',
      desc: 'Slip Timbangan Truk Panen',
      icon: 'ri-scales-3-fill',
      iconColor: 'text-cyan-700',
      iconBg: 'bg-cyan-50',
      category: 'AGRONOMI',
      roles: ['DIREKTUR', 'INVESTOR', 'FINANCE', 'MANAGER'],
    },
    {
      id: 'tasklist',
      title: 'Jadwal Tasklist',
      desc: 'SOP & Target Harian Kebun',
      icon: 'ri-calendar-event-fill',
      iconColor: 'text-orange-600',
      iconBg: 'bg-orange-50',
      category: 'AGRONOMI',
      roles: ['DIREKTUR', 'MANAGER', 'KEPALA_KEBUN', 'PETANI'],
    },
  ];

  const permittedModules = allModules.filter(
    (m) =>
      m.roles.includes(role) &&
      (m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.desc.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleModuleClick = (id: string) => {
    if (onSelectView) {
      onSelectView(id);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-xs transition-opacity cursor-pointer animate-in fade-in duration-150"
        onClick={onClose}
      ></div>

      {/* Super App Card Dashboard Drawer */}
      <div
        style={{ width: '345px', maxWidth: '92%' }}
        className="relative h-full bg-[#F4F7F5] text-[#17211E] shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-left duration-200 border-r border-[#DDE5DF]"
      >
        {/* 1. Header Profile & Status Card */}
        <div className="p-3.5 bg-gradient-to-br from-[#061E18] via-[#0A382E] to-[#0F4E40] text-white flex-shrink-0 shadow-md">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-[8px] bg-[#C8E86B] text-[#0A382E] flex items-center justify-center text-base font-black shadow-sm">
                <i className="ri-leaf-line"></i>
              </div>
              <div>
                <span className="block font-extrabold text-[12px] tracking-[0.5px] uppercase text-white leading-none">
                  AGROJAYA MENU HUB
                </span>
                <span className="block text-[8px] font-bold text-[#C8E86B] uppercase tracking-[1px] mt-0.5">
                  MODULAR APP DASHBOARD
                </span>
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

          {/* User Information Chip */}
          <div className="flex items-center gap-2.5 bg-white/10 p-2 rounded-[10px] border border-white/15">
            <div className="w-8 h-8 rounded-full bg-[#C8E86B] text-[#0A382E] font-black text-[12px] flex items-center justify-center shadow-xs">
              {role.substring(0, 2)}
            </div>
            <div className="overflow-hidden flex-1">
              <h4 className="font-extrabold text-[12px] text-white truncate m-0 leading-tight">
                {userName}
              </h4>
              <span className="text-[10px] text-[#C8E86B] font-semibold block truncate">
                {userTitle}
              </span>
            </div>
          </div>
        </div>

        {/* 2. Live Module Search Bar */}
        <div className="px-3 pt-2.5 pb-1 flex-shrink-0 bg-[#F4F7F5]">
          <div className="relative">
            <i className="ri-search-line absolute left-3 top-2.5 text-[#5F6A65] text-xs"></i>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari modul atau menu..."
              className="w-full pl-8 pr-3 py-1.5 rounded-[10px] bg-white border border-[#DDE5DF] text-[11px] text-[#17211E] placeholder:text-[#5F6A65]/70 outline-none focus:border-[#0F5545] shadow-xs"
            />
          </div>
        </div>

        {/* 3. MODULAR 2-COLUMN CARD GRID DASHBOARD */}
        <div className="flex-1 min-h-0 overflow-y-auto px-3 py-2 space-y-3">
          {/* SECTION 1: UTAMA & AI */}
          <div>
            <div className="flex items-center gap-1.5 mb-1.5 px-0.5">
              <i className="ri-star-smile-fill text-amber-500 text-xs"></i>
              <span className="text-[9.5px] font-extrabold text-[#0F5545] uppercase tracking-wider">
                Fitur Utama & AI
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {permittedModules
                .filter((m) => m.category === 'UTAMA')
                .map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleModuleClick(item.id)}
                    className="p-2.5 rounded-[14px] bg-white border border-[#DDE5DF] shadow-xs flex flex-col justify-between text-left hover:border-[#0F5545] hover:shadow-sm transition-all cursor-pointer active:scale-95 group relative overflow-hidden"
                  >
                    <div className="flex items-start justify-between w-full">
                      <div className={`w-8 h-8 rounded-[10px] ${item.iconBg} ${item.iconColor} flex items-center justify-center text-lg shadow-2xs group-hover:scale-105 transition-transform`}>
                        <i className={item.icon}></i>
                      </div>
                      {item.badge && (
                        <span className={`text-[7.5px] font-extrabold px-1.5 py-0.2 rounded-full ${item.badgeColor}`}>
                          {item.badge}
                        </span>
                      )}
                    </div>

                    <div className="mt-2">
                      <strong className="block text-[11.5px] text-[#17211E] group-hover:text-[#0F5545] leading-tight font-extrabold">
                        {item.title}
                      </strong>
                      <span className="block text-[8.5px] text-[#5F6A65] leading-tight mt-0.5 truncate">
                        {item.desc}
                      </span>
                    </div>
                  </button>
                ))}
            </div>
          </div>

          {/* SECTION 2: FINANSIAL & INVESTASI */}
          {permittedModules.some((m) => m.category === 'FINANSIAL') && (
            <div>
              <div className="flex items-center gap-1.5 mb-1.5 px-0.5">
                <i className="ri-wallet-3-fill text-emerald-600 text-xs"></i>
                <span className="text-[9.5px] font-extrabold text-[#0F5545] uppercase tracking-wider">
                  Finansial & Modal
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {permittedModules
                  .filter((m) => m.category === 'FINANSIAL')
                  .map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleModuleClick(item.id)}
                      className="p-2.5 rounded-[14px] bg-white border border-[#DDE5DF] shadow-xs flex flex-col justify-between text-left hover:border-[#0F5545] hover:shadow-sm transition-all cursor-pointer active:scale-95 group relative overflow-hidden"
                    >
                      <div className="flex items-start justify-between w-full">
                        <div className={`w-8 h-8 rounded-[10px] ${item.iconBg} ${item.iconColor} flex items-center justify-center text-lg shadow-2xs group-hover:scale-105 transition-transform`}>
                          <i className={item.icon}></i>
                        </div>
                        {item.badge && (
                          <span className={`text-[7.5px] font-extrabold px-1.5 py-0.2 rounded-full ${item.badgeColor}`}>
                            {item.badge}
                          </span>
                        )}
                      </div>

                      <div className="mt-2">
                        <strong className="block text-[11.5px] text-[#17211E] group-hover:text-[#0F5545] leading-tight font-extrabold">
                          {item.title}
                        </strong>
                        <span className="block text-[8.5px] text-[#5F6A65] leading-tight mt-0.5 truncate">
                          {item.desc}
                        </span>
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* SECTION 3: AGRONOMI & KEBUN */}
          {permittedModules.some((m) => m.category === 'AGRONOMI') && (
            <div>
              <div className="flex items-center gap-1.5 mb-1.5 px-0.5">
                <i className="ri-plant-fill text-green-600 text-xs"></i>
                <span className="text-[9.5px] font-extrabold text-[#0F5545] uppercase tracking-wider">
                  Agronomi & Lapangan
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {permittedModules
                  .filter((m) => m.category === 'AGRONOMI')
                  .map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleModuleClick(item.id)}
                      className="p-2.5 rounded-[14px] bg-white border border-[#DDE5DF] shadow-xs flex flex-col justify-between text-left hover:border-[#0F5545] hover:shadow-sm transition-all cursor-pointer active:scale-95 group relative overflow-hidden"
                    >
                      <div className="flex items-start justify-between w-full">
                        <div className={`w-8 h-8 rounded-[10px] ${item.iconBg} ${item.iconColor} flex items-center justify-center text-lg shadow-2xs group-hover:scale-105 transition-transform`}>
                          <i className={item.icon}></i>
                        </div>
                        {item.badge && (
                          <span className={`text-[7.5px] font-extrabold px-1.5 py-0.2 rounded-full ${item.badgeColor}`}>
                            {item.badge}
                          </span>
                        )}
                      </div>

                      <div className="mt-2">
                        <strong className="block text-[11.5px] text-[#17211E] group-hover:text-[#0F5545] leading-tight font-extrabold">
                          {item.title}
                        </strong>
                        <span className="block text-[8.5px] text-[#5F6A65] leading-tight mt-0.5 truncate">
                          {item.desc}
                        </span>
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* 4. Bottom Quick AI Consultation Bar */}
        <div className="p-2.5 bg-white border-t border-[#DDE5DF] flex-shrink-0">
          <button
            type="button"
            onClick={() => handleModuleClick('tanya_ai')}
            className="w-full py-2 bg-gradient-to-r from-[#061E18] to-[#0F4E40] text-white rounded-[10px] text-[11px] font-extrabold flex items-center justify-between px-3 cursor-pointer shadow-xs hover:opacity-95"
          >
            <div className="flex items-center gap-1.5">
              <i className="ri-sparkling-fill text-[#C8E86B]"></i>
              <span>Konsultasi AI Jaya</span>
            </div>
            <span className="text-[9.5px] text-[#C8E86B] font-bold">Tanya Sekarang &rsaquo;</span>
          </button>
        </div>
      </div>
    </div>
  );
};
