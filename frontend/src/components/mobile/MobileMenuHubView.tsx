import React, { useState } from 'react';
import { useRole, type RoleType } from '../../context/RoleContext';
import { ServiceIconTile, type ServiceIconTileProps } from './ServiceIconTile';
import { ModuleBottomSheet } from './ModuleBottomSheet';
import { ApprovalListScreen } from './ApprovalListScreen';
import { MobileRoleSwitcherModal } from './MobileRoleSwitcherModal';

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
  const [showRoleModal, setShowRoleModal] = useState(false);

  // 1. FITUR UTAMA & EKSEKUTIF (Deep Forest Emerald Glass)
  const mainFeatures: RoleModuleItem[] = [
    {
      id: 'live_feed',
      title: 'Feed Lapangan (WA)',
      tileType: 'live_feed',
      gradientStyle: 'bg-gradient-to-br from-[#065F46] via-[#047857] to-[#15803D]',
      statusDot: { text: 'Feed Live', dotColor: 'bg-[#C8E86B]' },
      roles: ['INVESTOR', 'DIREKTUR', 'FINANCE', 'MANAGER', 'KEPALA_KEBUN', 'PETANI'],
    },
    {
      id: 'dasbor',
      title: 'Dasbor',
      tileType: 'dasbor',
      gradientStyle: 'bg-gradient-to-br from-[#065F46] via-[#047857] to-[#022C22]',
      statusDot: { text: 'Live', dotColor: 'bg-[#22C55E]' },
      roles: ['INVESTOR', 'DIREKTUR', 'MANAGER', 'KEPALA_KEBUN'],
    },
    {
      id: 'approval_po',
      title: 'Otorisasi PO',
      tileType: 'approval_po',
      gradientStyle: 'bg-gradient-to-br from-[#059669] via-[#047857] to-[#064E3B]',
      statusDot: { text: '2 Pending', dotColor: 'bg-[#F59E0B]' },
      roles: ['INVESTOR', 'DIREKTUR', 'FINANCE', 'MANAGER'],
    },
    {
      id: 'tanya_ai',
      title: 'Konsultan AI',
      tileType: 'tanya_ai',
      gradientStyle: 'bg-gradient-to-br from-[#065F46] via-[#047857] to-[#3B0764]',
      statusDot: { text: 'AI', dotColor: 'bg-[#A855F7]' },
      roles: ['INVESTOR', 'DIREKTUR', 'FINANCE', 'MANAGER', 'KEPALA_KEBUN'],
    },
    {
      id: 'peta_gis',
      title: 'Peta GIS',
      tileType: 'peta_gis',
      gradientStyle: 'bg-gradient-to-br from-[#065F46] via-[#047857] to-[#075985]',
      roles: ['INVESTOR', 'DIREKTUR', 'MANAGER', 'KEPALA_KEBUN'],
    },
  ];

  // 2. KEUANGAN & MODAL (Deep Forest Emerald with Warm Gold & Amber accents)
  const financeModules: RoleModuleItem[] = [
    {
      id: 'buku_kas',
      title: 'Arus Kas',
      tileType: 'buku_kas',
      gradientStyle: 'bg-gradient-to-br from-[#065F46] via-[#047857] to-[#064E3B]',
      roles: ['INVESTOR', 'DIREKTUR', 'FINANCE', 'MANAGER'],
    },
    {
      id: 'alokasi_modal',
      title: 'Alokasi Modal',
      tileType: 'alokasi_modal',
      gradientStyle: 'bg-gradient-to-br from-[#065F46] via-[#047857] to-[#78350F]',
      roles: ['INVESTOR', 'DIREKTUR', 'FINANCE'],
    },
    {
      id: 'kalkulator',
      title: 'Kalkulator HPP',
      tileType: 'kalkulator',
      gradientStyle: 'bg-gradient-to-br from-[#065F46] via-[#047857] to-[#1E1B4B]',
      roles: ['INVESTOR', 'DIREKTUR', 'FINANCE', 'MANAGER'],
    },
    {
      id: 'laporan_audit',
      title: 'Laporan Audit',
      tileType: 'laporan_audit',
      gradientStyle: 'bg-gradient-to-br from-[#065F46] via-[#047857] to-[#831843]',
      roles: ['INVESTOR', 'DIREKTUR', 'FINANCE', 'MANAGER'],
    },
  ];

  // 3. OPERASIONAL & AGRONOMI KEBUN (Deep Forest Pine & Botanical Green)
  const opsModules: RoleModuleItem[] = [
    {
      id: 'siklus_lahan',
      title: 'Bukti 8 Tahap',
      tileType: 'siklus_lahan',
      gradientStyle: 'bg-gradient-to-br from-[#065F46] via-[#047857] to-[#022C22]',
      roles: ['INVESTOR', 'DIREKTUR', 'MANAGER', 'KEPALA_KEBUN', 'PETANI'],
    },
    {
      id: 'ktp_sampel',
      title: 'KTP Sampel',
      tileType: 'ktp_sampel',
      gradientStyle: 'bg-gradient-to-br from-[#065F46] via-[#047857] to-[#1E1B4B]',
      statusDot: { text: 'QR Paspor', dotColor: 'bg-[#C8E86B]' },
      roles: ['INVESTOR', 'DIREKTUR', 'MANAGER', 'KEPALA_KEBUN', 'PETANI'],
    },
    {
      id: 'scan_daun',
      title: 'Scan Daun & Buah',
      tileType: 'scan_daun',
      gradientStyle: 'bg-gradient-to-br from-[#059669] via-[#047857] to-[#365314]',
      roles: ['INVESTOR', 'DIREKTUR', 'MANAGER', 'KEPALA_KEBUN', 'PETANI'],
    },
    {
      id: 'master_komoditas',
      title: 'Komoditas SOP',
      tileType: 'master_komoditas',
      gradientStyle: 'bg-gradient-to-br from-[#065F46] via-[#047857] to-[#7C2D12]',
      roles: ['INVESTOR', 'DIREKTUR', 'MANAGER', 'KEPALA_KEBUN', 'PETANI'],
    },
    {
      id: 'gudang',
      title: 'Stok Gudang',
      tileType: 'gudang',
      gradientStyle: 'bg-gradient-to-br from-[#065F46] via-[#047857] to-[#164E63]',
      roles: ['INVESTOR', 'DIREKTUR', 'MANAGER', 'KEPALA_KEBUN', 'FINANCE'],
    },
    {
      id: 'timbangan',
      title: 'Timbangan',
      tileType: 'timbangan',
      gradientStyle: 'bg-gradient-to-br from-[#065F46] via-[#047857] to-[#0F172A]',
      roles: ['INVESTOR', 'DIREKTUR', 'MANAGER', 'KEPALA_KEBUN', 'PETANI', 'FINANCE'],
    },
  ];

  // 4. SDM, TUGAS & TATA KELOLA
  const adminModules: RoleModuleItem[] = [
    {
      id: 'jadwal_tugas',
      title: 'Jadwal Tugas',
      tileType: 'jadwal_tugas',
      gradientStyle: 'bg-gradient-to-br from-[#065F46] via-[#047857] to-[#701A75]',
      roles: ['DIREKTUR', 'MANAGER', 'KEPALA_KEBUN', 'PETANI'],
    },
    {
      id: 'presensi_sdm',
      title: 'Presensi SDM',
      tileType: 'presensi_sdm',
      gradientStyle: 'bg-gradient-to-br from-[#065F46] via-[#047857] to-[#075985]',
      roles: ['DIREKTUR', 'MANAGER', 'FINANCE', 'KEPALA_KEBUN', 'PETANI'],
    },
    {
      id: 'kelola_user',
      title: 'Kelola User',
      tileType: 'kelola_user',
      gradientStyle: 'bg-gradient-to-br from-[#065F46] via-[#047857] to-[#0F172A]',
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
      className="min-h-full bg-[#FAFBF8] text-[#11231D] space-y-4 px-2 pb-6 antialiased"
      style={{ fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      {/* Header Section (Compact Title Only) */}
      <div className="pt-0.5">
        <h2 className="text-[13px] font-bold text-[#11231D] m-0 leading-tight">
          Menu & Layanan
        </h2>
      </div>

      {/* Compact Global Search Input */}
      <div className="relative flex items-center">
        <span className="absolute left-2.5 flex items-center pointer-events-none text-[#5A6D63]" style={{ zIndex: 5 }}>
          <i className="ri-search-2-line text-[13px]"></i>
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari modul atau laporan..."
          style={{ paddingLeft: '30px', paddingRight: '28px', height: '34px', fontSize: '11.5px' }}
          className="w-full bg-white text-[#11231D] placeholder-[#8A9B92] rounded-[10px] font-medium border border-[#DDE5DF] shadow-2xs focus:outline-none focus:border-[#047857] focus:ring-1 focus:ring-[#047857] transition-all"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="absolute right-2 text-[#8A9B92] hover:text-[#11231D] p-1 flex items-center cursor-pointer"
            style={{ zIndex: 5 }}
          >
            <i className="ri-close-circle-fill text-[13px]"></i>
          </button>
        )}
      </div>

      {/* SECTION 1: Fitur Utama & Eksekutif */}
      {visibleMain.length > 0 && (
        <section className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold text-[#11231D] tracking-wider uppercase">
              FITUR UTAMA & EKSEKUTIF
            </span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {visibleMain.map((item) => (
              <ServiceIconTile key={item.id} {...item} onClick={handleTileClick} />
            ))}
          </div>
        </section>
      )}

      {/* SECTION 2: Keuangan & Modal */}
      {visibleFinance.length > 0 && (
        <section className="space-y-2 pt-1 border-t border-[#E8EEEA]">
          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] font-extrabold text-[#11231D] tracking-wider uppercase">
              KEUANGAN & MODAL
            </span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {visibleFinance.map((item) => (
              <ServiceIconTile key={item.id} {...item} onClick={handleTileClick} />
            ))}
          </div>
        </section>
      )}

      {/* SECTION 3: Operasional & Agronomi Kebun */}
      {visibleOps.length > 0 && (
        <section className="space-y-2 pt-1 border-t border-[#E8EEEA]">
          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] font-extrabold text-[#11231D] tracking-wider uppercase">
              OPERASIONAL & AGRONOMI KEBUN
            </span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {visibleOps.map((item) => (
              <ServiceIconTile key={item.id} {...item} onClick={handleTileClick} />
            ))}
          </div>
        </section>
      )}

      {/* SECTION 4: SDM & Tata Kelola */}
      {visibleAdmin.length > 0 && (
        <section className="space-y-2 pt-1 border-t border-[#E8EEEA]">
          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] font-extrabold text-[#11231D] tracking-wider uppercase">
              SDM & TATA KELOLA
            </span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {visibleAdmin.map((item) => (
              <ServiceIconTile key={item.id} {...item} onClick={handleTileClick} />
            ))}
          </div>
        </section>
      )}

      {/* SECTION 5: Akses & Peran Pengguna */}
      <section className="space-y-2 pt-2 border-t border-[#E8EEEA] pb-2">
        <button
          type="button"
          onClick={() => setShowRoleModal(true)}
          className="w-full p-3 rounded-[14px] bg-gradient-to-r from-[#064E3B] to-[#047857] text-white flex items-center justify-between shadow-md cursor-pointer hover:brightness-105 transition-all"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-[8px] bg-white/20 flex items-center justify-center text-base">
              🔄
            </div>
            <div className="text-left">
              <strong className="text-[12px] font-bold block leading-tight">Ganti Peran / Role Pengguna</strong>
              <span className="text-[9.5px] text-[#A7F3D0]">Role saat ini: {role} (Beralih role cepat)</span>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-[6px] bg-[#C8E86B] text-[#064E3B] text-[10px] font-black uppercase shadow-xs">
            Pilih Role &gt;
          </span>
        </button>
      </section>

      {/* PO Bottom Sheet */}
      <ModuleBottomSheet
        isOpen={isPOBottomSheetOpen}
        onClose={() => setIsPOBottomSheetOpen(false)}
        onSelectSubmenu={handleSubmenuSelect}
      />

      {/* Full-Screen Approval Screen Modal */}
      {isApprovalScreenOpen && (
        <ApprovalListScreen onBack={() => setIsApprovalScreenOpen(false)} />
      )}

      {/* Role Switcher Modal */}
      <MobileRoleSwitcherModal
        isOpen={showRoleModal}
        onClose={() => setShowRoleModal(false)}
      />
    </div>
  );
};
