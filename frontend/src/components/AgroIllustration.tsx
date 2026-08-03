import React from 'react';

export interface AgroIllustrationProps {
  type: 'land_clearing' | 'tillage_plowing' | 'soil_fermentation' | 'seedling_planting' | 'fertigation_maintenance' | 'harvest_grading' | 'weighbridge_scale' | 'crop_rotation';
  height?: number | string;
  className?: string;
}

export const AgroIllustration: React.FC<AgroIllustrationProps> = ({ type, height = 320, className = '' }) => {
  switch (type) {
    case 'land_clearing':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height={height} className={className}>
          <defs>
            <linearGradient id="skyGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#bae6fd" />
              <stop offset="100%" stopColor="#f0f9ff" />
            </linearGradient>
            <linearGradient id="soilGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#78350f" />
              <stop offset="100%" stopColor="#27272a" />
            </linearGradient>
          </defs>
          <rect width="800" height="280" fill="url(#skyGrad1)" />
          <circle cx="680" cy="90" r="50" fill="#f59e0b" opacity="0.9" />
          <path d="M 0 250 Q 200 150 400 230 T 800 210 L 800 300 L 0 300 Z" fill="#047857" opacity="0.3" />
          <rect y="280" width="800" height="220" fill="url(#soilGrad1)" />
          <path d="M 0 330 Q 200 310 400 335 T 800 320" stroke="#92400e" strokeWidth="8" fill="none" opacity="0.6" />
          <path d="M 0 380 Q 200 360 400 385 T 800 370" stroke="#78350f" strokeWidth="10" fill="none" opacity="0.7" />
          <g transform="translate(480, 240)">
            <rect x="20" y="40" width="140" height="55" rx="8" fill="#f59e0b" stroke="#b45309" strokeWidth="3" />
            <rect x="50" y="10" width="70" height="40" rx="4" fill="#1e293b" />
            <rect x="55" y="15" width="60" height="25" rx="2" fill="#38bdf8" opacity="0.8" />
            <rect x="10" y="85" width="160" height="30" rx="15" fill="#334155" />
            <circle cx="35" cy="100" r="10" fill="#94a3b8" />
            <circle cx="70" cy="100" r="10" fill="#94a3b8" />
            <circle cx="105" cy="100" r="10" fill="#94a3b8" />
            <circle cx="140" cy="100" r="10" fill="#94a3b8" />
            <path d="M -15 60 L 20 60 L 20 105 L -20 100 Z" fill="#64748b" stroke="#334155" strokeWidth="2" />
          </g>
          <g transform="translate(20, 160)">
            <ellipse cx="40" cy="80" rx="35" ry="55" fill="#16a34a" />
            <ellipse cx="90" cy="70" rx="45" ry="65" fill="#15803d" />
            <rect x="35" y="130" width="10" height="40" fill="#78350f" />
            <rect x="85" y="125" width="12" height="45" fill="#78350f" />
          </g>
          <rect x="30" y="30" width="340" height="60" rx="12" fill="#ffffff" opacity="0.95" stroke="#059669" strokeWidth="2" />
          <text x="50" y="55" fontFamily="sans-serif" fontWeight="bold" fontSize="16" fill="#0f172a">TAHAP 1: PEMBUKAAN LAHAN</text>
          <text x="50" y="75" fontFamily="sans-serif" fontSize="12" fill="#059669">Land Clearing & Pembersihan Semak Tropis</text>
        </svg>
      );

    case 'tillage_plowing':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height={height} className={className}>
          <defs>
            <linearGradient id="skyGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#bae6fd" />
              <stop offset="100%" stopColor="#f0f9ff" />
            </linearGradient>
          </defs>
          <rect width="800" height="260" fill="url(#skyGrad2)" />
          <rect y="250" width="800" height="250" fill="#92400e" />
          <path d="M -20 280 Q 200 260 400 285 T 820 270" stroke="#78350f" strokeWidth="35" fill="none" />
          <path d="M -20 350 Q 200 330 400 355 T 820 340" stroke="#78350f" strokeWidth="35" fill="none" />
          <path d="M -20 420 Q 200 400 400 425 T 820 410" stroke="#78350f" strokeWidth="35" fill="none" />
          <g transform="translate(420, 180)">
            <rect x="40" y="50" width="160" height="60" rx="10" fill="#2563eb" stroke="#1d4ed8" strokeWidth="3" />
            <rect x="80" y="10" width="80" height="45" rx="5" fill="#1e293b" />
            <rect x="85" y="15" width="70" height="30" rx="3" fill="#93c5fd" opacity="0.8" />
            <circle cx="65" cy="115" r="30" fill="#0f172a" stroke="#475569" strokeWidth="4" />
            <circle cx="175" cy="115" r="45" fill="#0f172a" stroke="#475569" strokeWidth="6" />
            <path d="M 0 130 L -40 160 L -10 160 Z" fill="#64748b" stroke="#334155" strokeWidth="3" />
          </g>
          <rect x="30" y="30" width="370" height="60" rx="12" fill="#ffffff" opacity="0.95" stroke="#2563eb" strokeWidth="2" />
          <text x="50" y="55" fontFamily="sans-serif" fontWeight="bold" fontSize="16" fill="#0f172a">TAHAP 2: PENGGARAPAN TANAH</text>
          <text x="50" y="75" fontFamily="sans-serif" fontSize="12" fill="#2563eb">Penggemburan & Pembajakan Bedengan Subur</text>
        </svg>
      );

    case 'soil_fermentation':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height={height} className={className}>
          <rect width="800" height="260" fill="#ecfdf5" />
          <rect y="250" width="800" height="250" fill="#451a03" />
          <ellipse cx="250" cy="270" rx="180" ry="25" fill="#d97706" opacity="0.8" />
          <ellipse cx="580" cy="285" rx="160" ry="22" fill="#d97706" opacity="0.8" />
          <circle cx="200" cy="220" r="18" fill="#10b981" opacity="0.5" />
          <circle cx="240" cy="180" r="28" fill="#10b981" opacity="0.4" />
          <circle cx="560" cy="210" r="22" fill="#10b981" opacity="0.5" />
          <g transform="translate(340, 200)">
            <rect width="120" height="150" rx="10" fill="#ffffff" stroke="#059669" strokeWidth="3" />
            <rect x="15" y="20" width="90" height="40" fill="#10b981" rx="4" />
            <text x="32" y="45" fontFamily="sans-serif" fontWeight="bold" fontSize="14" fill="#ffffff">KOMPOS</text>
            <text x="25" y="90" fontFamily="sans-serif" fontWeight="bold" fontSize="11" fill="#047857">BIO-ORGANIK</text>
            <text x="28" y="115" fontFamily="sans-serif" fontSize="10" fill="#64748b">FERMENTASI</text>
          </g>
          <rect x="30" y="30" width="370" height="60" rx="12" fill="#ffffff" opacity="0.95" stroke="#059669" strokeWidth="2" />
          <text x="50" y="55" fontFamily="sans-serif" fontWeight="bold" fontSize="16" fill="#0f172a">TAHAP 3: FERMENTASI TANAH</text>
          <text x="50" y="75" fontFamily="sans-serif" fontSize="12" fill="#059669">Pengayaan Kapur Dolomit & Bio-Pupuk</text>
        </svg>
      );

    case 'seedling_planting':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height={height} className={className}>
          <rect width="800" height="270" fill="#bfdbfe" />
          <rect y="260" width="800" height="240" fill="#78350f" />
          <g transform="translate(120, 240)">
            <path d="M 30 60 Q 10 20 0 0 Q 30 10 30 60 Z" fill="#22c55e" />
            <path d="M 30 60 Q 50 20 60 0 Q 30 10 30 60 Z" fill="#15803d" />
          </g>
          <g transform="translate(360, 210)">
            <path d="M 40 80 Q 10 20 0 0 Q 40 10 40 80 Z" fill="#22c55e" />
            <path d="M 40 80 Q 70 20 80 0 Q 40 10 40 80 Z" fill="#15803d" />
            <rect x="20" y="75" width="40" height="35" rx="4" fill="#1e293b" />
          </g>
          <g transform="translate(620, 240)">
            <path d="M 30 60 Q 10 20 0 0 Q 30 10 30 60 Z" fill="#22c55e" />
            <path d="M 30 60 Q 50 20 60 0 Q 30 10 30 60 Z" fill="#15803d" />
          </g>
          <rect x="30" y="30" width="390" height="60" rx="12" fill="#ffffff" opacity="0.95" stroke="#059669" strokeWidth="2" />
          <text x="50" y="55" fontFamily="sans-serif" fontWeight="bold" fontSize="16" fill="#0f172a">TAHAP 4: PENANAMAN BIBIT UNGGUL</text>
          <text x="50" y="75" fontFamily="sans-serif" fontSize="12" fill="#059669">Penanaman Varietas Sertifikasi Perkebunan Indonesia</text>
        </svg>
      );

    case 'fertigation_maintenance':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height={height} className={className}>
          <rect width="800" height="260" fill="#e0f2fe" />
          <rect y="250" width="800" height="250" fill="#451a03" />
          <path d="M 0 320 L 800 320" stroke="#0284c7" strokeWidth="12" />
          <g transform="translate(180, 190)">
            <path d="M 40 80 Q 10 20 0 -10 Q 40 10 40 80 Z" fill="#16a34a" />
            <path d="M 40 80 Q 70 20 80 -10 Q 40 10 40 80 Z" fill="#15803d" />
          </g>
          <g transform="translate(480, 170)">
            <path d="M 50 100 Q 10 20 0 -20 Q 50 10 50 100 Z" fill="#16a34a" />
            <path d="M 50 100 Q 90 20 100 -20 Q 50 10 50 100 Z" fill="#15803d" />
          </g>
          <rect x="30" y="30" width="370" height="60" rx="12" fill="#ffffff" opacity="0.95" stroke="#0284c7" strokeWidth="2" />
          <text x="50" y="55" fontFamily="sans-serif" fontWeight="bold" fontSize="16" fill="#0f172a">TAHAP 5: FERTIGASI & BMKG LIVE</text>
          <text x="50" y="75" fontFamily="sans-serif" fontSize="12" fill="#0284c7">Pemupukan NPK Presisi & Irigasi Drip Sensor</text>
        </svg>
      );

    case 'harvest_grading':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height={height} className={className}>
          <rect width="800" height="270" fill="#fef3c7" />
          <rect y="260" width="800" height="240" fill="#78350f" />
          <g transform="translate(150, 240)">
            <ellipse cx="60" cy="50" rx="55" ry="40" fill="#d97706" />
            <circle cx="35" cy="40" r="12" fill="#b45309" />
            <circle cx="65" cy="35" r="14" fill="#b45309" />
            <circle cx="85" cy="55" r="13" fill="#b45309" />
          </g>
          <g transform="translate(450, 220)">
            <ellipse cx="70" cy="60" rx="65" ry="45" fill="#ea580c" />
            <circle cx="45" cy="45" r="14" fill="#c2410c" />
            <circle cx="75" cy="40" r="16" fill="#c2410c" />
            <circle cx="95" cy="65" r="15" fill="#c2410c" />
          </g>
          <rect x="30" y="30" width="370" height="60" rx="12" fill="#ffffff" opacity="0.95" stroke="#d97706" strokeWidth="2" />
          <text x="50" y="55" fontFamily="sans-serif" fontWeight="bold" fontSize="16" fill="#0f172a">TAHAP 6: PANEN RAYA & GRADING</text>
          <text x="50" y="75" fontFamily="sans-serif" fontSize="12" fill="#d97706">Sortir Kualitas Grade A/B/C Standar PKS</text>
        </svg>
      );

    case 'weighbridge_scale':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height={height} className={className}>
          <rect width="800" height="260" fill="#e2e8f0" />
          <rect y="250" width="800" height="250" fill="#334155" />
          <rect x="100" y="240" width="600" height="30" rx="4" fill="#64748b" stroke="#0f172a" strokeWidth="3" />
          <g transform="translate(240, 120)">
            <rect x="60" y="40" width="220" height="85" rx="8" fill="#dc2626" />
            <rect x="220" y="20" width="90" height="105" rx="10" fill="#1d4ed8" />
            <rect x="230" y="30" width="70" height="40" rx="4" fill="#93c5fd" />
            <circle cx="110" cy="125" r="25" fill="#0f172a" />
            <circle cx="200" cy="125" r="25" fill="#0f172a" />
            <circle cx="280" cy="125" r="25" fill="#0f172a" />
          </g>
          <g transform="translate(60, 100)">
            <rect width="140" height="70" rx="8" fill="#0f172a" stroke="#22c55e" strokeWidth="3" />
            <text x="18" y="45" fontFamily="monospace" fontWeight="bold" fontSize="22" fill="#22c55e">24.850 KG</text>
          </g>
          <rect x="30" y="30" width="380" height="60" rx="12" fill="#ffffff" opacity="0.95" stroke="#16a34a" strokeWidth="2" />
          <text x="50" y="55" fontFamily="sans-serif" fontWeight="bold" fontSize="16" fill="#0f172a">TAHAP 7: TIMBANGAN DIGITAL PKS</text>
          <text x="50" y="75" fontFamily="sans-serif" fontSize="12" fill="#16a34a">Timbangan Truk Digital Anti-Tamper</text>
        </svg>
      );

    case 'crop_rotation':
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height={height} className={className}>
          <rect width="800" height="260" fill="#ecfdf5" />
          <rect y="250" width="800" height="250" fill="#78350f" />
          <path d="M 400 130 A 150 150 0 1 1 399 130" stroke="#059669" strokeWidth="12" fill="none" strokeDasharray="25 15" />
          <g transform="translate(360, 200)">
            <circle cx="40" cy="40" r="35" fill="#10b981" />
            <path d="M 25 40 L 55 40 M 40 25 L 40 55" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
          </g>
          <rect x="30" y="30" width="370" height="60" rx="12" fill="#ffffff" opacity="0.95" stroke="#059669" strokeWidth="2" />
          <text x="50" y="55" fontFamily="sans-serif" fontWeight="bold" fontSize="16" fill="#0f172a">TAHAP 8: ROTASI TANAMAN</text>
          <text x="50" y="75" fontFamily="sans-serif" fontSize="12" fill="#059669">Pergantian Komoditas & Sustainable Recovery</text>
        </svg>
      );
  }
};
