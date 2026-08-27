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
  gradientStyle: string;
  shadowColor: string;
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
  shadowColor,
  statusDot,
  onClick,
}) => {
  // Render custom vibrant 3D SVG illustrations
  const renderIconIllustration = () => {
    switch (tileType) {
      // 1. DASBOR (3D Pie Chart with pulled slice)
      case 'dasbor':
        return (
          <svg viewBox="0 0 36 36" className="w-[32px] h-[32px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]">
            {/* Main 3/4 circle */}
            <path
              d="M17 18 L17 4 A14 14 0 1 0 31 18 Z"
              fill="#FFFFFF"
            />
            {/* Popped Out Slice */}
            <path
              d="M20 15 L20 2 A14 14 0 0 1 33 15 Z"
              fill="#D8F5E1"
            />
          </svg>
        );

      // 2. OTORISASI PO (Shield with Checkmark)
      case 'approval_po':
        return (
          <svg viewBox="0 0 36 36" className="w-[30px] h-[30px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
            <path
              d="M18 3 L7 8 V16 C7 23.5 11.7 30.5 18 33 C24.3 30.5 29 23.5 29 16 V8 L18 3 Z"
              fill="rgba(255,255,255,0.18)"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <path
              d="M12 17.5 L16 21.5 L24 13.5"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );

      // 3. KONSULTAN AI (Radiant Sparkle Stars)
      case 'tanya_ai':
        return (
          <svg viewBox="0 0 36 36" className="w-[30px] h-[30px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]" fill="#FFFFFF">
            <path d="M15 4 C15 10.5 10.5 15 4 15 C10.5 15 15 19.5 15 26 C15 19.5 19.5 15 26 15 C19.5 15 15 10.5 15 4 Z" />
            <path d="M27 3 C27 6.5 24.5 9 21 9 C24.5 9 27 11.5 27 15 C27 11.5 29.5 9 33 9 C29.5 9 27 6.5 27 3 Z" />
            <path d="M28 22 C28 24.5 26 26.5 23.5 26.5 C26 26.5 28 28.5 28 31 C28 28.5 30 26.5 32.5 26.5 C30 26.5 28 24.5 28 22 Z" />
          </svg>
        );

      // 4. PETA GIS (Map Pin Location Marker)
      case 'peta_gis':
        return (
          <svg viewBox="0 0 36 36" className="w-[30px] h-[30px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
            <path
              d="M18 4 C11.5 4 6.5 9 6.5 15.5 C6.5 23.5 18 33 18 33 C18 33 29.5 23.5 29.5 15.5 C29.5 9 24.5 4 18 4 Z"
              fill="#FFFFFF"
            />
            <circle cx="18" cy="15.5" r="4.5" fill="#2E7D4E" />
          </svg>
        );

      // 5. ARUS KAS (Wallet / Purse)
      case 'buku_kas':
        return (
          <svg viewBox="0 0 36 36" className="w-[30px] h-[30px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
            <rect x="5" y="9" width="26" height="19" rx="4" fill="rgba(255,255,255,0.15)" stroke="#FFFFFF" strokeWidth="2.5" />
            <path d="M5 14 H31" stroke="#FFFFFF" strokeWidth="2" />
            <path d="M21 17 H29 C30.1 17 31 17.9 31 19 V23 C31 24.1 30.1 25 29 25 H21 C20 25 19 24.1 19 23 V19 C19 17.9 20 17 21 17 Z" fill="#FFFFFF" />
            <circle cx="25" cy="21" r="1.5" fill="#0C4A3A" />
          </svg>
        );

      // 6. ALOKASI MODAL (3D Stack of Rich Golden Coins)
      case 'alokasi_modal':
        return (
          <svg viewBox="0 0 36 36" className="w-[32px] h-[32px] drop-shadow-[0_2px_5px_rgba(0,0,0,0.25)]">
            {/* Left Coin Stack */}
            <ellipse cx="12" cy="19" rx="6.5" ry="3" fill="#FFDF59" stroke="#A87500" strokeWidth="0.8" />
            <path d="M5.5 19 V24 C5.5 25.6 8.4 27 12 27 C15.6 27 18.5 25.6 18.5 24 V19" fill="#F3B31B" stroke="#A87500" strokeWidth="0.8" />
            <ellipse cx="12" cy="14" rx="6.5" ry="3" fill="#FFEAA3" stroke="#A87500" strokeWidth="0.8" />
            <path d="M5.5 14 V19 C5.5 20.6 8.4 22 12 22 C15.6 22 18.5 20.6 18.5 19 V14" fill="#F3B31B" stroke="#A87500" strokeWidth="0.8" />
            <ellipse cx="12" cy="14" rx="6.5" ry="3" fill="#FFF4BD" stroke="#A87500" strokeWidth="0.8" />

            {/* Right Coin Stack (Taller & Brighter) */}
            <ellipse cx="23.5" cy="15" rx="6.5" ry="3" fill="#FFDF59" stroke="#A87500" strokeWidth="0.8" />
            <path d="M17 15 V20 C17 21.6 19.9 23 23.5 23 C27.1 23 30 21.6 30 20 V15" fill="#F3B31B" stroke="#A87500" strokeWidth="0.8" />
            <ellipse cx="23.5" cy="10" rx="6.5" ry="3" fill="#FFF4BD" stroke="#A87500" strokeWidth="0.8" />
            <path d="M17 10 V15 C17 16.6 19.9 18 23.5 18 C27.1 18 30 16.6 30 15 V10" fill="#F3B31B" stroke="#A87500" strokeWidth="0.8" />
            <ellipse cx="23.5" cy="10" rx="6.5" ry="3" fill="#FFFFF0" stroke="#A87500" strokeWidth="0.8" />
          </svg>
        );

      // 7. KALKULATOR HPP (Rounded Calculator)
      case 'kalkulator':
        return (
          <svg viewBox="0 0 36 36" className="w-[29px] h-[29px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
            <rect x="8" y="5" width="20" height="26" rx="5" fill="rgba(255,255,255,0.15)" stroke="#FFFFFF" strokeWidth="2.4" />
            {/* Screen */}
            <rect x="11.5" y="8.5" width="13" height="5" rx="1.5" fill="#FFFFFF" />
            {/* Button Dots */}
            <circle cx="13" cy="18" r="1.5" fill="#FFFFFF" />
            <circle cx="18" cy="18" r="1.5" fill="#FFFFFF" />
            <circle cx="23" cy="18" r="1.5" fill="#FFFFFF" />
            <circle cx="13" cy="24" r="1.5" fill="#FFFFFF" />
            <circle cx="18" cy="24" r="1.5" fill="#FFFFFF" />
            <circle cx="23" cy="24" r="1.5" fill="#FFFFFF" />
          </svg>
        );

      // 8. LAPORAN AUDIT (Document Sheet with Chart)
      case 'laporan_audit':
        return (
          <svg viewBox="0 0 36 36" className="w-[30px] h-[30px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
            <path
              d="M9 5 C9 3.9 9.9 3 11 3 H20 L27 10 V31 C27 32.1 26.1 33 25 33 H11 C9.9 33 9 32.1 9 31 Z"
              fill="#FFFFFF"
            />
            <path d="M20 3 V10 H27" fill="#B2E0D4" />
            <path d="M13 16 H23 M13 20 H23" stroke="#16806E" strokeWidth="2.2" strokeLinecap="round" />
            {/* Mini Chart */}
            <path
              d="M17 26.5 A2.5 2.5 0 0 1 14.5 24 A2.5 2.5 0 0 1 17 21.5 V26.5 Z"
              fill="#16806E"
            />
            <path
              d="M17.5 26.5 V21.5 A2.5 2.5 0 0 1 20 24 A2.5 2.5 0 0 1 17.5 26.5 Z"
              fill="#2FB888"
            />
          </svg>
        );

      // 9. BUKTI 8 TAHAP (Sprout Growing from Soil)
      case 'siklus_lahan':
        return (
          <svg viewBox="0 0 36 36" className="w-[31px] h-[31px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
            {/* Soil mound */}
            <path d="M7 28 C9 24.5 14 23.5 18 23.5 C22 23.5 27 24.5 29 28 Z" fill="#5C3D26" />
            {/* Stem */}
            <path d="M18 24 V11" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" />
            {/* Left Leaf */}
            <path d="M18 16 C12.5 16 9.5 11 9.5 6 C15 6 18 11 18 16 Z" fill="#FFFFFF" />
            {/* Right Leaf */}
            <path d="M18 14 C23.5 14 26.5 9 26.5 4 C21 4 18 9 18 14 Z" fill="#FFFFFF" />
          </svg>
        );

      // 10. SCAN DAUN AI (Leaf with Camera Scan Brackets)
      case 'scan_daun':
        return (
          <svg viewBox="0 0 36 36" className="w-[30px] h-[30px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
            <path d="M6 11 V7 C6 6.4 6.4 6 7 6 H11" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" fill="none" />
            <path d="M30 11 V7 C30 6.4 29.6 6 29 6 H25" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" fill="none" />
            <path d="M6 25 V29 C6 29.6 6.4 30 7 30 H11" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" fill="none" />
            <path d="M30 25 V29 C30 29.6 29.6 30 29 30 H25" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" fill="none" />
            <path
              d="M12 24 C12 24 12 13 23 12 C23 12 24 23 13 24 Z"
              fill="rgba(255,255,255,0.25)"
              stroke="#FFFFFF"
              strokeWidth="2.4"
            />
            <path d="M13 23 L20 16" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );

      // 11. STOK GUDANG (Warehouse Building with Storage Box)
      case 'gudang':
        return (
          <svg viewBox="0 0 36 36" className="w-[30px] h-[30px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
            <path
              d="M18 4 L6 11 V30 C6 30.6 6.4 31 7 31 H29 C29.6 31 30 30.6 30 30 V11 Z"
              fill="rgba(255,255,255,0.15)"
              stroke="#FFFFFF"
              strokeWidth="2.4"
              strokeLinejoin="round"
            />
            <path d="M12 31 V19 C12 18 13 17 14 17 H22 C23 17 24 18 24 19 V31" fill="#0C4F40" stroke="#FFFFFF" strokeWidth="2" />
            <rect x="15" y="21" width="6" height="6" rx="1.2" fill="#FFFFFF" />
          </svg>
        );

      // 12. TIMBANGAN (Mechanical Weighing Scale)
      case 'timbangan':
        return (
          <svg viewBox="0 0 36 36" className="w-[30px] h-[30px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
            <path d="M9 31 H27" stroke="#FFFFFF" strokeWidth="2.6" strokeLinecap="round" />
            <path d="M12 31 L14 18 H22 L24 31 Z" fill="#FFFFFF" />
            <circle cx="18" cy="24.5" r="4.5" fill="#388554" stroke="#FFFFFF" strokeWidth="1.6" />
            <path d="M18 24.5 L19.5 22.5" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M10 13 H26" stroke="#FFFFFF" strokeWidth="2.6" strokeLinecap="round" />
            <path d="M15 18 V13 M21 18 V13" stroke="#FFFFFF" strokeWidth="2" />
          </svg>
        );

      // 13. KTP SAMPEL (Tree Passport & QR Badge)
      case 'ktp_sampel':
        return (
          <svg viewBox="0 0 36 36" className="w-[30px] h-[30px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
            <rect x="6" y="5" width="24" height="26" rx="4" fill="rgba(255,255,255,0.15)" stroke="#FFFFFF" strokeWidth="2.2" />
            <rect x="10" y="9" width="7" height="7" rx="1.5" fill="#FFFFFF" />
            <rect x="19" y="9" width="7" height="7" rx="1.5" fill="#FFFFFF" />
            <rect x="10" y="18" width="7" height="7" rx="1.5" fill="#FFFFFF" />
            <path d="M19 18 H26 M19 22 H26 M19 25 H24" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );

      // 14. MASTER KOMODITAS (Seedling Leaf & Sun)
      case 'master_komoditas':
        return (
          <svg viewBox="0 0 36 36" className="w-[30px] h-[30px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
            <circle cx="18" cy="18" r="13" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="3 3" />
            <path d="M18 26 V14" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M18 19 C13 19 11 15 11 11 C15 11 18 15 18 19 Z" fill="#FFFFFF" />
            <path d="M18 17 C23 17 25 13 25 9 C21 9 18 13 18 17 Z" fill="#FFFFFF" />
          </svg>
        );

      // 15. JADWAL TASKLIST (Clipboard Checklist)
      case 'jadwal_tugas':
        return (
          <svg viewBox="0 0 36 36" className="w-[30px] h-[30px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
            <rect x="7" y="7" width="22" height="25" rx="3.5" fill="rgba(255,255,255,0.15)" stroke="#FFFFFF" strokeWidth="2.2" />
            <path d="M13 5 H23 V9 H13 Z" fill="#FFFFFF" rx="1" />
            <path d="M11 14 L13 16 L17 12" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M19 14 H24" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
            <path d="M11 21 L13 23 L17 19" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M19 21 H24" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );

      // 16. PRESENSI SDM (ID Badge & Calendar Check)
      case 'presensi_sdm':
        return (
          <svg viewBox="0 0 36 36" className="w-[30px] h-[30px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
            <rect x="6" y="7" width="24" height="24" rx="4" fill="rgba(255,255,255,0.15)" stroke="#FFFFFF" strokeWidth="2.2" />
            <circle cx="18" cy="15" r="4" fill="#FFFFFF" />
            <path d="M11 25 C11 21.5 14 20 18 20 C22 20 25 21.5 25 25" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        );

      // 17. KELOLA USER (Multi-User Shield / Gear)
      case 'kelola_user':
        return (
          <svg viewBox="0 0 36 36" className="w-[30px] h-[30px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
            <circle cx="14" cy="14" r="3.5" fill="#FFFFFF" />
            <path d="M8 24 C8 21 10.5 19.5 14 19.5 C17.5 19.5 20 21 20 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
            <circle cx="23" cy="13" r="2.8" fill="rgba(255,255,255,0.8)" />
            <path d="M21 19 C23.5 19 26 20.2 26 23" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <button
      type="button"
      onClick={() => onClick(id)}
      className="flex flex-col items-center justify-start text-center cursor-pointer group active:scale-95 transition-all select-none focus:outline-none w-full"
      style={{ minWidth: '44px', minHeight: '44px' }}
    >
      {/* 62px Squircle 3D Floating Tile with Vivid Rich Gradient */}
      <div
        className={`w-[62px] h-[62px] rounded-[20px] ${gradientStyle} ${shadowColor} flex items-center justify-center relative overflow-hidden border border-white/35 transition-all duration-150 group-hover:scale-105`}
      >
        {/* Saturated 3D Bevel Top Glaze */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/45 via-white/10 to-transparent pointer-events-none rounded-[20px]" />
        
        {/* Soft bottom rim for 3D curved depth */}
        <div className="absolute inset-x-0 bottom-0 h-2.5 bg-black/15 pointer-events-none rounded-b-[20px]" />

        {/* Center 3D Vector Icon */}
        <div className="relative z-10 flex items-center justify-center">
          {renderIconIllustration()}
        </div>
      </div>

      {/* Label Text */}
      <span className="text-[12px] font-extrabold text-[#0D261F] mt-2 leading-tight text-center tracking-tight line-clamp-1 group-hover:text-[#0B3B30]">
        {title}
      </span>

      {/* Status Dot */}
      {statusDot ? (
        <div className="flex items-center justify-center gap-1 mt-0.5">
          <span className={`w-1.5 h-1.5 rounded-full ${statusDot.dotColor} shadow-2xs`} />
          <span className="text-[9.5px] font-semibold text-[#5F6F67] leading-none">
            {statusDot.text}
          </span>
        </div>
      ) : (
        <div className="h-[14px]" />
      )}
    </button>
  );
};
