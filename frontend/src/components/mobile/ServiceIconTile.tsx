import React from 'react';

export interface ServiceIconTileProps {
  id: string;
  title: string;
  tileType:
    | 'dasbor'
    | 'approval_po'
    | 'tanya_ai'
    | 'peta_gis'
    | 'buku_kas'
    | 'alokasi_modal'
    | 'kalkulator'
    | 'laporan_audit'
    | 'siklus_lahan'
    | 'scan_daun'
    | 'gudang'
    | 'timbangan'
    | 'ktp_sampel'
    | 'master_komoditas'
    | 'jadwal_tugas'
    | 'presensi_sdm'
    | 'kelola_user';
  gradientStyle?: string;
  shadowColor?: string;
  glowColor?: string;
  statusDot?: {
    text: string;
    dotColor: string;
  };
  onClick: (id: string) => void;
}

export const ServiceIconTile: React.FC<ServiceIconTileProps> = ({
  id,
  title,
  tileType,
  gradientStyle,
  statusDot,
  onClick,
}) => {
  // Render high-contrast 3D vector icons in clean pure white with subtle accent highlights
  const renderIconIllustration = () => {
    switch (tileType) {
      // 1. DASBOR (3D Pie Chart)
      case 'dasbor':
        return (
          <svg viewBox="0 0 36 36" className="w-[30px] h-[30px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
            <path d="M17 18 L17 4 A14 14 0 1 0 31 18 Z" fill="#FFFFFF" />
            <path d="M20 15 L20 2 A14 14 0 0 1 33 15 Z" fill="#A7F3D0" />
          </svg>
        );

      // 2. OTORISASI PO (Shield with Checkmark)
      case 'approval_po':
        return (
          <svg viewBox="0 0 36 36" className="w-[28px] h-[28px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
            <path
              d="M18 3 L7 8 V16 C7 23.5 11.7 30.5 18 33 C24.3 30.5 29 23.5 29 16 V8 L18 3 Z"
              fill="rgba(255,255,255,0.2)"
              stroke="#FFFFFF"
              strokeWidth="2.4"
              strokeLinejoin="round"
            />
            <path
              d="M12 17.5 L16 21.5 L24 13.5"
              fill="none"
              stroke="#A7F3D0"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );

      // 3. KONSULTAN AI (Radiant Sparkle Stars)
      case 'tanya_ai':
        return (
          <svg viewBox="0 0 36 36" className="w-[28px] h-[28px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
            <path d="M15 4 C15 10.5 10.5 15 4 15 C10.5 15 15 19.5 15 26 C15 19.5 19.5 15 26 15 C19.5 15 15 10.5 15 4 Z" fill="#FFFFFF" />
            <path d="M27 3 C27 6.5 24.5 9 21 9 C24.5 9 27 11.5 27 15 C27 11.5 29.5 9 33 9 C29.5 9 27 6.5 27 3 Z" fill="#DDD6FE" />
            <path d="M28 22 C28 24.5 26 26.5 23.5 26.5 C26 26.5 28 28.5 28 31 C28 28.5 30 26.5 32.5 26.5 C30 26.5 28 24.5 28 22 Z" fill="#DDD6FE" />
          </svg>
        );

      // 4. PETA GIS (Location Pin)
      case 'peta_gis':
        return (
          <svg viewBox="0 0 36 36" className="w-[28px] h-[28px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
            <path
              d="M18 4 C11.5 4 6.5 9 6.5 15.5 C6.5 23.5 18 33 18 33 C18 33 29.5 23.5 29.5 15.5 C29.5 9 24.5 4 18 4 Z"
              fill="#FFFFFF"
            />
            <circle cx="18" cy="15.5" r="4.5" fill="#064E3B" />
          </svg>
        );

      // 5. ARUS KAS (Wallet)
      case 'buku_kas':
        return (
          <svg viewBox="0 0 36 36" className="w-[28px] h-[28px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
            <rect x="4" y="9" width="28" height="19" rx="4" fill="rgba(255,255,255,0.2)" stroke="#FFFFFF" strokeWidth="2.4" />
            <path d="M4 14 H32" stroke="#FFFFFF" strokeWidth="2" />
            <rect x="22" y="17" width="7" height="6" rx="2" fill="#FEF08A" />
            <circle cx="25.5" cy="20" r="1" fill="#064E3B" />
          </svg>
        );

      // 6. ALOKASI MODAL (Coins)
      case 'alokasi_modal':
        return (
          <svg viewBox="0 0 36 36" className="w-[28px] h-[28px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
            <ellipse cx="14" cy="12" rx="8" ry="4" fill="#FEF08A" stroke="#FFFFFF" strokeWidth="1.2" />
            <ellipse cx="14" cy="18" rx="8" ry="4" fill="#FDE047" stroke="#FFFFFF" strokeWidth="1.2" />
            <ellipse cx="14" cy="24" rx="8" ry="4" fill="#EAB308" stroke="#FFFFFF" strokeWidth="1.2" />
            <ellipse cx="23" cy="16" rx="7" ry="3.5" fill="#FEF08A" stroke="#FFFFFF" strokeWidth="1.2" />
            <ellipse cx="23" cy="22" rx="7" ry="3.5" fill="#FDE047" stroke="#FFFFFF" strokeWidth="1.2" />
          </svg>
        );

      // 7. KALKULATOR HPP
      case 'kalkulator':
        return (
          <svg viewBox="0 0 36 36" className="w-[28px] h-[28px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
            <rect x="7" y="5" width="22" height="26" rx="4.5" fill="rgba(255,255,255,0.2)" stroke="#FFFFFF" strokeWidth="2.2" />
            <rect x="11" y="9" width="14" height="6" rx="1.5" fill="#FFFFFF" />
            <circle cx="12.5" cy="20" r="1.8" fill="#C7D2FE" />
            <circle cx="18" cy="20" r="1.8" fill="#C7D2FE" />
            <circle cx="23.5" cy="20" r="1.8" fill="#C7D2FE" />
            <circle cx="12.5" cy="25.5" r="1.8" fill="#C7D2FE" />
            <circle cx="18" cy="25.5" r="1.8" fill="#C7D2FE" />
            <circle cx="23.5" cy="25.5" r="1.8" fill="#C7D2FE" />
          </svg>
        );

      // 8. LAPORAN AUDIT (Document)
      case 'laporan_audit':
        return (
          <svg viewBox="0 0 36 36" className="w-[28px] h-[28px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
            <path d="M9 6 C9 4.5 10 3.5 11.5 3.5 H21 L27 9.5 V30 C27 31.5 26 32.5 24.5 32.5 H11.5 C10 32.5 9 31.5 9 30 Z" fill="#FFFFFF" />
            <path d="M21 3.5 V9.5 H27" fill="rgba(0,0,0,0.2)" />
            <line x1="13" y1="15" x2="23" y2="15" stroke="#064E3B" strokeWidth="2" strokeLinecap="round" />
            <line x1="13" y1="20" x2="23" y2="20" stroke="#064E3B" strokeWidth="2" strokeLinecap="round" />
            <line x1="13" y1="25" x2="19" y2="25" stroke="#064E3B" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );

      // 9. SIKLUS LAHAN (Sprout)
      case 'siklus_lahan':
        return (
          <svg viewBox="0 0 36 36" className="w-[28px] h-[28px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
            <path d="M18 28 V15" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" />
            <path d="M18 17 C18 10 10 9 9 17 C15 17 18 17 18 17 Z" fill="#FFFFFF" />
            <path d="M18 15 C18 9 26 8 27 15 C21 15 18 15 18 15 Z" fill="#A7F3D0" />
            <path d="M7 29 C12 27 24 27 29 29" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        );

      // 10. KTP SAMPEL (Smart ID Card)
      case 'ktp_sampel':
        return (
          <svg viewBox="0 0 36 36" className="w-[28px] h-[28px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
            <rect x="5" y="7" width="26" height="22" rx="4" fill="rgba(255,255,255,0.2)" stroke="#FFFFFF" strokeWidth="2.2" />
            <rect x="9" y="11" width="8" height="8" rx="2" fill="#FFFFFF" />
            <line x1="20" y1="12" x2="27" y2="12" stroke="#A7F3D0" strokeWidth="2" strokeLinecap="round" />
            <line x1="20" y1="16" x2="27" y2="16" stroke="#A7F3D0" strokeWidth="2" strokeLinecap="round" />
            <line x1="9" y1="23" x2="27" y2="23" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );

      // 11. SCAN DAUN AI (Aperture)
      case 'scan_daun':
        return (
          <svg viewBox="0 0 36 36" className="w-[28px] h-[28px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
            <path d="M7 13 V8 H12" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M29 13 V8 H24" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M7 23 V28 H12" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M29 23 V28 H24" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M14 22 C14 15 22 14 22 22 C17 22 14 22 14 22 Z" fill="#BEF264" />
          </svg>
        );

      // 12. KOMODITAS SOP
      case 'master_komoditas':
        return (
          <svg viewBox="0 0 36 36" className="w-[28px] h-[28px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
            <circle cx="18" cy="18" r="13" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="3 2" fill="none" />
            <path d="M18 24 V13" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="18" cy="11" r="3.5" fill="#FED7AA" />
            <circle cx="13" cy="16" r="2.5" fill="#FFFFFF" />
            <circle cx="23" cy="16" r="2.5" fill="#FFFFFF" />
          </svg>
        );

      // 13. STOK GUDANG (Warehouse)
      case 'gudang':
        return (
          <svg viewBox="0 0 36 36" className="w-[28px] h-[28px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
            <path d="M6 14 L18 6 L30 14 V28 H6 Z" fill="rgba(255,255,255,0.2)" stroke="#FFFFFF" strokeWidth="2.2" strokeLinejoin="round" />
            <rect x="13" y="19" width="10" height="9" fill="#A5F3FC" rx="1.5" />
          </svg>
        );

      // 14. TIMBANGAN
      case 'timbangan':
        return (
          <svg viewBox="0 0 36 36" className="w-[28px] h-[28px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
            <path d="M18 6 V29" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M8 12 H28" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M8 12 L5 21 H11 Z" fill="#FFFFFF" />
            <path d="M28 12 L25 21 H31 Z" fill="#FFFFFF" />
            <path d="M12 29 H24" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        );

      // 15. JADWAL TUGAS
      case 'jadwal_tugas':
        return (
          <svg viewBox="0 0 36 36" className="w-[28px] h-[28px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
            <rect x="6" y="8" width="24" height="22" rx="4" fill="rgba(255,255,255,0.2)" stroke="#FFFFFF" strokeWidth="2.2" />
            <path d="M6 14 H30" stroke="#FFFFFF" strokeWidth="2" />
            <line x1="11" y1="5" x2="11" y2="9" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="25" y1="5" x2="25" y2="9" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="12" cy="19" r="1.5" fill="#FBCFE8" />
            <circle cx="18" cy="19" r="1.5" fill="#FBCFE8" />
            <circle cx="24" cy="19" r="1.5" fill="#FBCFE8" />
            <circle cx="12" cy="24" r="1.5" fill="#FFFFFF" />
            <circle cx="18" cy="24" r="1.5" fill="#FFFFFF" />
          </svg>
        );

      // 16. PRESENSI SDM
      case 'presensi_sdm':
        return (
          <svg viewBox="0 0 36 36" className="w-[28px] h-[28px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
            <circle cx="18" cy="11" r="5" fill="#FFFFFF" />
            <path d="M8 28 C8 22.5 12.5 19 18 19 C23.5 19 28 22.5 28 28" fill="#BAE6FD" />
          </svg>
        );

      // 17. KELOLA USER
      case 'kelola_user':
        return (
          <svg viewBox="0 0 36 36" className="w-[28px] h-[28px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
            <circle cx="15" cy="12" r="4.5" fill="#FFFFFF" />
            <path d="M6 27 C6 22 10 19 15 19 C17 19 19 19.5 20.5 20.5" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            <circle cx="26" cy="23" r="5.5" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" />
            <path d="M23.5 23 L25.5 25 L28.5 21" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        );

      default:
        return (
          <svg viewBox="0 0 36 36" className="w-[28px] h-[28px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
            <circle cx="18" cy="18" r="12" fill="#FFFFFF" />
          </svg>
        );
    }
  };

  const activeGradient =
    gradientStyle || 'bg-gradient-to-br from-[#065F46] via-[#047857] to-[#022C22]';

  return (
    <button
      type="button"
      onClick={() => onClick(id)}
      className="flex flex-col items-center justify-start text-center cursor-pointer group active:scale-95 transition-all select-none focus:outline-none w-full"
      style={{ minWidth: '44px', minHeight: '44px' }}
    >
      {/* 60px Dark Pine Glassmorphism Squircle Tile */}
      <div
        className={`w-[60px] h-[60px] rounded-[22px] ${activeGradient} flex items-center justify-center relative overflow-hidden border border-white/30 transition-all duration-150 group-hover:scale-105 group-hover:-translate-y-0.5`}
        style={{
          boxShadow:
            '0 10px 22px -5px rgba(2, 44, 34, 0.45), 0 2px 6px rgba(0,0,0,0.15), inset 0 1.5px 2px rgba(255, 255, 255, 0.55), inset 0 -1.5px 2px rgba(0, 0, 0, 0.25)',
        }}
      >
        {/* Crystal Glass Top Reflection Highlight */}
        <div className="absolute top-0 inset-x-0 h-[48%] bg-gradient-to-b from-white/40 via-white/10 to-transparent pointer-events-none rounded-t-[22px]" />
        
        {/* Deep Bottom Ambient Depth */}
        <div className="absolute inset-x-0 bottom-0 h-[25%] bg-gradient-to-t from-black/25 to-transparent pointer-events-none rounded-b-[22px]" />

        {/* Center High-Contrast Vector Icon */}
        <div className="relative z-10 flex items-center justify-center">
          {renderIconIllustration()}
        </div>
      </div>

      {/* Label Text */}
      <span className="text-[11.5px] font-bold text-[#0F241E] mt-1.5 leading-tight text-center tracking-tight line-clamp-1 group-hover:text-[#047857]">
        {title}
      </span>

      {/* Status Dot / Sub-badge */}
      {statusDot ? (
        <div className="flex items-center justify-center gap-1 mt-0.5">
          <span className={`w-1.5 h-1.5 rounded-full ${statusDot.dotColor} shadow-2xs`} />
          <span className="text-[9.5px] font-semibold text-[#5A6D63] leading-none">
            {statusDot.text}
          </span>
        </div>
      ) : (
        <div className="h-[12px]" />
      )}
    </button>
  );
};
