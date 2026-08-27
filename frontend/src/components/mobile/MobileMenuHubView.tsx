import React, { useState } from 'react';
import { useRole, type RoleType } from '../../context/RoleContext';
import { ServiceIconTile, type ServiceIconTileProps } from './ServiceIconTile';
import { ModuleBottomSheet } from './ModuleBottomSheet';
import { ApprovalListScreen } from './ApprovalListScreen';

interface MobileMenuHubViewProps {
  onSelectView: (viewId: string) => void;
}

interface RoleModuleItem extends Omit<ServiceIconTileProps, 'onClick'> {
  roles: RoleType[];
}

export const MobileMenuHubView: React.FC<MobileMenuHubViewProps> = ({ onSelectView }) => {
  const { role } = useRole();
  const [searchQuery, setSearchQuery] = useState('');
  const [isPOBottomSheetOpen, setIsPOBottomSheetOpen] = useState(false);
  const [isApprovalScreenOpen, setIsApprovalScreenOpen] = useState(false);

  // 1. FITUR UTAMA & EKSEKUTIF
  const mainFeatures: RoleModuleItem[] = [
    {
      id: 'dasbor',
      title: 'Dasbor',
      tileType: 'dasbor',
      gradientStyle: 'bg-gradient-to-b from-[#09483A] via-[#05352A] to-[#02241C]',
      shadowColor: 'shadow-[0_10px_22px_rgba(5,53,42,0.4),0_3px_6px_rgba(0,0,0,0.15)]',
      statusDot: { text: 'Live', dotColor: 'bg-[#43D854]' },
      roles: ['INVESTOR', 'DIREKTUR', 'MANAGER', 'KEPALA_KEBUN'],
    },
    {
      id: 'approval_po',
      title: 'Otorisasi PO',
      tileType: 'approval_po',
      gradientStyle: 'bg-gradient-to-b from-[#2EB886] via-[#20946B] to-[#147050]',
      shadowColor: 'shadow-[0_10px_22px_rgba(32,148,107,0.4),0_3px_6px_rgba(0,0,0,0.15)]',
      statusDot: { text: '2 Pending', dotColor: 'bg-[#FF9800]' },
      roles: ['INVESTOR', 'DIREKTUR', 'FINANCE', 'MANAGER'],
    },
    {
      id: 'tanya_ai',
      title: 'Konsultan AI',
      tileType: 'tanya_ai',
      gradientStyle: 'bg-gradient-to-b from-[#18B8A6] via-[#129485] to-[#0A6E62]',
      shadowColor: 'shadow-[0_10px_22px_rgba(18,148,133,0.4),0_3px_6px_rgba(0,0,0,0.15)]',
      statusDot: { text: 'AI', dotColor: 'bg-[#7C4DFF]' },
      roles: ['INVESTOR', 'DIREKTUR', 'FINANCE', 'MANAGER', 'KEPALA_KEBUN'],
    },
    {
      id: 'peta_gis',
      title: 'Peta GIS',
      tileType: 'peta_gis',
      gradientStyle: 'bg-gradient-to-b from-[#78CB8D] via-[#5FB876] to-[#439A59]',
      shadowColor: 'shadow-[0_10px_22px_rgba(95,184,118,0.38),0_3px_6px_rgba(0,0,0,0.12)]',
      roles: ['INVESTOR', 'DIREKTUR', 'MANAGER', 'KEPALA_KEBUN'],
    },
  ];

  // 2. KEUANGAN & MODAL
  const financeModules: RoleModuleItem[] = [
    {
      id: 'buku_kas',
      title: 'Arus Kas',
      tileType: 'buku_kas',
      gradientStyle: 'bg-gradient-to-b from-[#105F49] via-[#0B4A38] to-[#063326]',
      shadowColor: 'shadow-[0_10px_22px_rgba(11,74,56,0.4),0_3px_6px_rgba(0,0,0,0.15)]',
      roles: ['INVESTOR', 'DIREKTUR', 'FINANCE', 'MANAGER'],
    },
    {
      id: 'alokasi_modal',
      title: 'Alokasi Modal',
      tileType: 'alokasi_modal',
      gradientStyle: 'bg-gradient-to-b from-[#24A67B] via-[#198661] to-[#106649]',
      shadowColor: 'shadow-[0_10px_22px_rgba(25,134,97,0.4),0_3px_6px_rgba(0,0,0,0.15)]',
      roles: ['INVESTOR', 'DIREKTUR', 'FINANCE'],
    },
    {
      id: 'kalkulator',
      title: 'Kalkulator HPP',
      tileType: 'kalkulator',
      gradientStyle: 'bg-gradient-to-b from-[#16ACB0] via-[#0E8A8E] to-[#07686B]',
      shadowColor: 'shadow-[0_10px_22px_rgba(14,138,142,0.4),0_3px_6px_rgba(0,0,0,0.15)]',
      roles: ['INVESTOR', 'DIREKTUR', 'FINANCE', 'MANAGER'],
    },
    {
      id: 'laporan_audit',
      title: 'Laporan Audit',
      tileType: 'laporan_audit',
      gradientStyle: 'bg-gradient-to-b from-[#1FA892] via-[#148875] to-[#0A6657]',
      shadowColor: 'shadow-[0_10px_22px_rgba(20,136,117,0.4),0_3px_6px_rgba(0,0,0,0.15)]',
      roles: ['INVESTOR', 'DIREKTUR', 'FINANCE', 'MANAGER'],
    },
  ];

  // 3. OPERASIONAL & AGRONOMI KEBUN
  const opsModules: RoleModuleItem[] = [
    {
      id: 'siklus_lahan',
      title: 'Bukti 8 Tahap',
      tileType: 'siklus_lahan',
      gradientStyle: 'bg-gradient-to-b from-[#7CC78C] via-[#61B473] to-[#459657]',
      shadowColor: 'shadow-[0_10px_22px_rgba(97,180,115,0.38),0_3px_6px_rgba(0,0,0,0.12)]',
      roles: ['INVESTOR', 'DIREKTUR', 'MANAGER', 'KEPALA_KEBUN', 'PETANI'],
    },
    {
      id: 'ktp_sampel',
      title: 'KTP Sampel',
      tileType: 'ktp_sampel',
      gradientStyle: 'bg-gradient-to-b from-[#157E6B] via-[#0D5E4F] to-[#064237]',
      shadowColor: 'shadow-[0_10px_22px_rgba(13,94,79,0.4),0_3px_6px_rgba(0,0,0,0.15)]',
      statusDot: { text: 'QR Paspor', dotColor: 'bg-[#C8E86B]' },
      roles: ['INVESTOR', 'DIREKTUR', 'MANAGER', 'KEPALA_KEBUN', 'PETANI'],
    },
    {
      id: 'scan_daun',
      title: 'Scan Daun AI',
      tileType: 'scan_daun',
      gradientStyle: 'bg-gradient-to-b from-[#56CCA3] via-[#3EB88E] to-[#269E75]',
      shadowColor: 'shadow-[0_10px_22px_rgba(62,184,142,0.38),0_3px_6px_rgba(0,0,0,0.12)]',
      roles: ['INVESTOR', 'DIREKTUR', 'MANAGER', 'KEPALA_KEBUN', 'PETANI'],
    },
    {
      id: 'master_komoditas',
      title: 'Komoditas SOP',
      tileType: 'master_komoditas',
      gradientStyle: 'bg-gradient-to-b from-[#4EB87E] via-[#33995E] to-[#1E7843]',
      shadowColor: 'shadow-[0_10px_22px_rgba(51,153,94,0.38),0_3px_6px_rgba(0,0,0,0.12)]',
      roles: ['INVESTOR', 'DIREKTUR', 'MANAGER', 'KEPALA_KEBUN', 'PETANI'],
    },
    {
      id: 'gudang',
      title: 'Stok Gudang',
      tileType: 'gudang',
      gradientStyle: 'bg-gradient-to-b from-[#1B947E] via-[#127663] to-[#0A5748]',
      shadowColor: 'shadow-[0_10px_22px_rgba(18,118,99,0.4),0_3px_6px_rgba(0,0,0,0.15)]',
      roles: ['INVESTOR', 'DIREKTUR', 'MANAGER', 'KEPALA_KEBUN', 'FINANCE'],
    },
    {
      id: 'timbangan',
      title: 'Timbangan',
      tileType: 'timbangan',
      gradientStyle: 'bg-gradient-to-b from-[#74C58B] via-[#5AB073] to-[#3E9256]',
      shadowColor: 'shadow-[0_10px_22px_rgba(90,176,115,0.38),0_3px_6px_rgba(0,0,0,0.12)]',
      roles: ['INVESTOR', 'DIREKTUR', 'MANAGER', 'KEPALA_KEBUN', 'PETANI', 'FINANCE'],
    },
  ];

  // 4. SDM, TUGAS & TATA KELOLA
  const adminModules: RoleModuleItem[] = [
    {
      id: 'jadwal_tugas',
      title: 'Jadwal Tugas',
      tileType: 'jadwal_tugas',
      gradientStyle: 'bg-gradient-to-b from-[#18B8A6] via-[#118A7D] to-[#096359]',
      shadowColor: 'shadow-[0_10px_22px_rgba(17,138,125,0.4),0_3px_6px_rgba(0,0,0,0.15)]',
      roles: ['DIREKTUR', 'MANAGER', 'KEPALA_KEBUN', 'PETANI'],
    },
    {
      id: 'presensi_sdm',
      title: 'Presensi SDM',
      tileType: 'presensi_sdm',
      gradientStyle: 'bg-gradient-to-b from-[#2EB886] via-[#1E9468] to-[#12704E]',
      shadowColor: 'shadow-[0_10px_22px_rgba(30,148,104,0.4),0_3px_6px_rgba(0,0,0,0.15)]',
      roles: ['DIREKTUR', 'MANAGER', 'FINANCE', 'KEPALA_KEBUN', 'PETANI'],
    },
    {
      id: 'kelola_user',
      title: 'Kelola User',
      tileType: 'kelola_user',
      gradientStyle: 'bg-gradient-to-b from-[#09483A] via-[#05352A] to-[#02241C]',
      shadowColor: 'shadow-[0_10px_22px_rgba(5,53,42,0.4),0_3px_6px_rgba(0,0,0,0.15)]',
      roles: ['DIREKTUR', 'MANAGER'],
    },
  ];

  const handleTileClick = (id: string) => {
    if (id === 'approval_po') {
      setIsPOBottomSheetOpen(true);
    } else {
      onSelectView(id);
    }
  };

  const handleSubmenuSelect = (submenuId: string) => {
    setIsPOBottomSheetOpen(false);
    if (submenuId === 'pending_approval') {
      setIsApprovalScreenOpen(true);
    } else {
      onSelectView('approval_po');
    }
  };

  // RBAC + Search Filter
  const filterByRoleAndSearch = (list: RoleModuleItem[]) => {
    return list.filter((i) => {
      const matchRole = i.roles.includes(role);
      if (!matchRole) return false;
      if (!searchQuery.trim()) return true;
      return i.title.toLowerCase().includes(searchQuery.toLowerCase());
    });
  };

  const visibleMain = filterByRoleAndSearch(mainFeatures);
  const visibleFinance = filterByRoleAndSearch(financeModules);
  const visibleOps = filterByRoleAndSearch(opsModules);
  const visibleAdmin = filterByRoleAndSearch(adminModules);

  return (
    <div
      className="min-h-full bg-[#F8FAF7] text-[#11231D] space-y-4 px-1.5 pb-6 antialiased"
      style={{ fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      {/* Title & Subtitle */}
      <div className="pt-1.5">
        <h1 className="text-[25px] font-black text-[#11231D] tracking-[-0.03em] m-0 leading-tight">
          Menu & Modul
        </h1>
        <p className="text-[13px] font-normal text-[#5A6D63] m-0 mt-1 leading-snug">
          Semua kebutuhan AgroJaya dalam satu tempat
        </p>
      </div>

      {/* Modern Search Input */}
      <div className="relative pt-0.5">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#7D8F85]">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari fitur atau laporan..."
          className="w-full pl-10 pr-4 py-2.5 rounded-[12px] bg-white border border-[#D9E3DC] text-[13px] font-medium text-[#11231D] placeholder:text-[#8E9F97] placeholder:font-normal outline-none focus:border-[#0F5545] focus:ring-1 focus:ring-[#0F5545] shadow-[0_1px_4px_rgba(0,0,0,0.03)] transition-all"
        />
      </div>

      {/* SECTION 1: FITUR UTAMA */}
      {visibleMain.length > 0 && (
        <div className="space-y-2.5 pt-1">
          <span className="text-[11.5px] font-black text-[#0B3B30] uppercase tracking-[0.06em] block px-0.5">
            FITUR UTAMA & EKSEKUTIF
          </span>
          <div className="grid grid-cols-4 gap-y-3.5 gap-x-1.5">
            {visibleMain.map((item) => (
              <ServiceIconTile
                key={item.id}
                {...item}
                onClick={handleTileClick}
              />
            ))}
          </div>
        </div>
      )}

      {/* SECTION 2: KEUANGAN & MODAL */}
      {visibleFinance.length > 0 && (
        <div className="space-y-2.5 pt-1">
          <span className="text-[11.5px] font-black text-[#0B3B30] uppercase tracking-[0.06em] block px-0.5">
            KEUANGAN & MODAL
          </span>
          <div className="grid grid-cols-4 gap-y-3.5 gap-x-1.5">
            {visibleFinance.map((item) => (
              <ServiceIconTile
                key={item.id}
                {...item}
                onClick={handleTileClick}
              />
            ))}
          </div>
        </div>
      )}

      {/* SECTION 3: OPERASIONAL KEBUN */}
      {visibleOps.length > 0 && (
        <div className="space-y-2.5 pt-1">
          <span className="text-[11.5px] font-black text-[#0B3B30] uppercase tracking-[0.06em] block px-0.5">
            OPERASIONAL & AGRONOMI KEBUN
          </span>
          <div className="grid grid-cols-4 gap-y-3.5 gap-x-1.5">
            {visibleOps.map((item) => (
              <ServiceIconTile
                key={item.id}
                {...item}
                onClick={handleTileClick}
              />
            ))}
          </div>
        </div>
      )}

      {/* SECTION 4: SDM, TUGAS & TATA KELOLA */}
      {visibleAdmin.length > 0 && (
        <div className="space-y-2.5 pt-1">
          <span className="text-[11.5px] font-black text-[#0B3B30] uppercase tracking-[0.06em] block px-0.5">
            SDM, TUGAS & TATA KELOLA
          </span>
          <div className="grid grid-cols-4 gap-y-3.5 gap-x-1.5">
            {visibleAdmin.map((item) => (
              <ServiceIconTile
                key={item.id}
                {...item}
                onClick={handleTileClick}
              />
            ))}
          </div>
        </div>
      )}



      {/* ==================== MODULE BOTTOM SHEET (PROMPT 2) ==================== */}
      <ModuleBottomSheet
        isOpen={isPOBottomSheetOpen}
        onClose={() => setIsPOBottomSheetOpen(false)}
        onSelectSubmenu={handleSubmenuSelect}
      />

      {/* ==================== APPROVAL LIST DETAIL SCREEN (PROMPT 3) ==================== */}
      {isApprovalScreenOpen && (
        <ApprovalListScreen onBack={() => setIsApprovalScreenOpen(false)} />
      )}
    </div>
  );
};
