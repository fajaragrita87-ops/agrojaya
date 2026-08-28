import React from 'react';

export interface SubmenuItem {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  badge?: string;
}

interface ModuleBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSubmenu: (submenuId: string) => void;
}

export const ModuleBottomSheet: React.FC<ModuleBottomSheetProps> = ({
  isOpen,
  onClose,
  onSelectSubmenu,
}) => {
  if (!isOpen) return null;

  const submenus: SubmenuItem[] = [
    {
      id: 'pending_approval',
      title: 'Menunggu Persetujuan',
      subtitle: '2 pengajuan perlu ditinjau',
      icon: 'ri-time-line',
      badge: '2 Baru',
    },
    {
      id: 'history_approval',
      title: 'Riwayat Persetujuan',
      subtitle: 'Lihat keputusan sebelumnya',
      icon: 'ri-history-line',
    },
    {
      id: 'limit_approval',
      title: 'Batas Otorisasi',
      subtitle: 'Aturan dan limit approval',
      icon: 'ri-scales-line',
    },
    {
      id: 'docs_approval',
      title: 'Dokumen Pendukung',
      subtitle: 'Nota, invoice, dan bukti PO',
      icon: 'ri-file-text-line',
    },
  ];

  return (
    <div className="fixed inset-0 z-[9999] flex items-end justify-center overflow-hidden">
      {/* 55% Black Backdrop with blur */}
      <div
        className="absolute inset-0 bg-black/55 backdrop-blur-xs transition-opacity cursor-pointer animate-in fade-in duration-150"
        onClick={onClose}
      />

      {/* Slide-up 220ms White Bottom Sheet (Radius 28px) */}
      <div className="relative w-full max-w-[480px] mx-auto bg-white rounded-t-[28px] shadow-[0_-8px_30px_rgba(0,0,0,0.15)] flex flex-col z-10 animate-in slide-in-from-bottom duration-220 overflow-hidden pb-4">
        {/* Top Drag Handle */}
        <div className="w-full flex items-center justify-center pt-2.5 pb-1">
          <div className="w-10 h-1 rounded-full bg-[#DDE6DF]" />
        </div>

        {/* Sheet Header */}
        <div className="px-5 pt-2 pb-3.5 flex items-center justify-between border-b border-[#DDE6DF]">
          <div className="flex items-center gap-3">
            {/* Main Rounded-Square Gradient Tile (#0B3B30 -> #2A9D8F) */}
            <div className="w-12 h-12 rounded-[16px] bg-gradient-to-br from-[#0B3B30] to-[#2A9D8F] text-white flex items-center justify-center text-2xl shadow-sm border border-white/20">
              <i className="ri-shield-check-fill"></i>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-[15px] text-[#17211E] m-0 tracking-tight leading-tight">
                  Otorisasi Modal
                </h3>
                <span className="bg-[#FAF0E1] text-[#B66A0A] text-[9.5px] font-bold px-2 py-0.5 rounded-full border border-[#B66A0A]/20">
                  2 menunggu
                </span>
              </div>
              <p className="text-[11.5px] text-[#52615A] m-0 mt-0.5">
                Kelola persetujuan pengadaan modal
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-[#FAFBF7] hover:bg-[#E8F1EA] text-[#52615A] flex items-center justify-center text-base cursor-pointer"
          >
            &times;
          </button>
        </div>

        {/* 4 Menu Rows without Card Wrap */}
        <div className="px-4 py-1 divide-y divide-[#DDE6DF]">
          {submenus.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectSubmenu(item.id)}
              className="w-full h-[62px] min-h-[44px] flex items-center justify-between px-2 hover:bg-[#F8FAF7] active:bg-[#E8F1EA] rounded-[12px] transition-colors cursor-pointer text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-[10px] bg-[#E8F1EA] text-[#0F5545] flex items-center justify-center text-lg group-hover:bg-[#0F5545] group-hover:text-white transition-colors">
                  <i className={item.icon}></i>
                </div>
                <div>
                  <span className="block text-[13px] font-bold text-[#17211E] leading-tight group-hover:text-[#0F5545]">
                    {item.title}
                  </span>
                  <span className="block text-[11px] text-[#52615A] mt-0.5">
                    {item.subtitle}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                {item.badge && (
                  <span className="bg-[#C8E86B]/30 text-[#0B3B30] text-[9.5px] font-bold px-2 py-0.5 rounded-full border border-[#0B3B30]/15">
                    {item.badge}
                  </span>
                )}
                <i className="ri-arrow-right-s-line text-lg text-[#52615A] group-hover:translate-x-0.5 transition-transform"></i>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
