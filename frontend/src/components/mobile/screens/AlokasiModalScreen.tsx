import React from 'react';

interface AlokasiModalScreenProps {
  onBack?: () => void;
}

export const AlokasiModalScreen: React.FC<AlokasiModalScreenProps> = () => {
  const modalAllocations = [
    { category: 'Akuisisi & Land Clearing (2.0 Ha)', budget: 'Rp 875.000.000', percent: 35, color: '#0F5545', status: 'Realisasi 100%' },
    { category: 'Greenhouse & Irigasi Presisi Drip', budget: 'Rp 750.000.000', percent: 30, color: '#1FB88B', status: 'Realisasi 100%' },
    { category: 'Benih Unggul F1 & Pupuk Organik', budget: 'Rp 500.000.000', percent: 20, color: '#3B82F6', status: 'Terserap 78%' },
    { category: 'Cadangan Kas & Operasional', budget: 'Rp 375.000.000', percent: 15, color: '#F59E0B', status: 'Cadangan Aman' },
  ];

  const shareHolders = [
    { name: 'Konsorsium Investor Utama', share: '65.0%', value: 'Rp 1.625.000.000', returnEst: 'Rp 487.500.000 (30% ROI)' },
    { name: 'PT Smart Farm Nusantara (Pengelola)', share: '35.0%', value: 'Rp 875.000.000', returnEst: 'Bagi Hasil Kinerja' },
  ];

  return (
    <div
      className="space-y-3.5 pb-12 animate-in fade-in duration-150 antialiased text-[#11231D]"
      style={{ fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >

      {/* Header Card */}
      <div className="bg-gradient-to-br from-[#0B3B30] to-[#04201A] text-white rounded-[18px] p-4 shadow-md border border-[#14473B] relative overflow-hidden">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#C8E86B] block">
              STRUKTUR MODAL & KEPEMILIKAN
            </span>
            <h1 className="text-[20px] font-black tracking-tight mt-0.5 m-0 text-white">
              Rp 2.500.000.000
            </h1>
            <p className="text-[11px] text-[#A3D9C9] m-0 mt-0.5">
              Total Pagu Modal Sentra Perkebunan (100% Terdanai)
            </p>
          </div>
          <span className="bg-[#C8E86B]/20 border border-[#C8E86B]/40 text-[#C8E86B] text-[9.5px] font-extrabold px-2 py-0.5 rounded-full">
            Audited
          </span>
        </div>

        {/* Progress Bar Multi-Segment */}
        <div className="mt-3.5 pt-2 border-t border-white/10">
          <div className="flex justify-between text-[10px] text-[#A3D9C9] mb-1 font-semibold">
            <span>Alokasi Dana Proyek</span>
            <span>4 Pos Anggaran</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-white/10 flex overflow-hidden">
            <div style={{ width: '35%' }} className="bg-[#1FB88B]" title="Lahan 35%" />
            <div style={{ width: '30%' }} className="bg-[#3B82F6]" title="Greenhouse 30%" />
            <div style={{ width: '20%' }} className="bg-[#F59E0B]" title="Bibit & Pupuk 20%" />
            <div style={{ width: '15%' }} className="bg-[#C8E86B]" title="Cadangan Kas 15%" />
          </div>
        </div>
      </div>

      {/* Section 1: Rincian Pos Alokasi */}
      <div className="space-y-2">
        <span className="text-[11px] font-black text-[#0B3B30] uppercase tracking-wider block px-0.5">
          RINCIAN ALOKASI DANA PRODUKTIF
        </span>
        <div className="space-y-2">
          {modalAllocations.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[14px] p-3 border border-[#E2EAE5] shadow-[0_1px_4px_rgba(0,0,0,0.03)] flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-[10px] flex items-center justify-center font-bold text-xs text-white shadow-2xs"
                  style={{ backgroundColor: item.color }}
                >
                  {item.percent}%
                </div>
                <div>
                  <h2 className="text-[12px] font-bold text-[#11231D] leading-tight m-0">
                    {item.category}
                  </h2>
                  <span className="text-[10px] text-[#6A7B73]">{item.status}</span>
                </div>
              </div>
              <div className="text-right">
                <strong className="text-[12.5px] font-black text-[#0F5545] block">
                  {item.budget}
                </strong>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Struktur Kepemilikan Saham & Dividen */}
      <div className="space-y-2 pt-1">
        <span className="text-[11px] font-black text-[#0B3B30] uppercase tracking-wider block px-0.5">
          STRUKTUR KEPEMILIKAN & PROYEKSI DIVIDEN
        </span>
        <div className="space-y-2">
          {shareHolders.map((sh, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[14px] p-3 border border-[#E2EAE5] shadow-[0_1px_4px_rgba(0,0,0,0.03)] space-y-1.5"
            >
              <div className="flex justify-between items-center">
                <span className="text-[12px] font-extrabold text-[#11231D]">{sh.name}</span>
                <span className="text-[11px] font-black bg-[#E8F3ED] text-[#0F5545] px-2 py-0.5 rounded-full">
                  {sh.share}
                </span>
              </div>
              <div className="flex justify-between text-[11px] text-[#55675E] pt-1 border-t border-[#F0F5F2]">
                <span>Nilai Modal: <strong>{sh.value}</strong></span>
                <span className="text-[#0F5545] font-bold">{sh.returnEst}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
