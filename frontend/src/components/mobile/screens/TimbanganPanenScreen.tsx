import React from 'react';

interface TimbanganPanenScreenProps {
  onBack: () => void;
}

export const TimbanganPanenScreen: React.FC<TimbanganPanenScreenProps> = ({ onBack }) => {
  const harvestBatches = [
    {
      batchId: 'BATCH-JGL-2026-08A',
      crop: 'Golden Melon Alisha (Blok A1)',
      date: '26 Agu 2026 • 10:15 WIB',
      totalWeight: '2.450 Kg',
      brixAvg: '14.2° Brix (Super Sweet)',
      grades: { gradeA: '2.100 Kg (85%)', gradeB: '300 Kg (12%)', gradeC: '50 Kg (3%)' },
      offtaker: 'Super Indo & Hypermart (PO-OFF-902)',
      priceAvg: 'Rp 26.500 / Kg',
      grossRevenue: 'Rp 64.925.000',
    },
    {
      batchId: 'BATCH-JGL-2026-07B',
      crop: 'Golden Melon Alisha (Blok A2)',
      date: '20 Agu 2026 • 09:30 WIB',
      totalWeight: '3.950 Kg',
      brixAvg: '13.9° Brix',
      grades: { gradeA: '3.350 Kg (84%)', gradeB: '500 Kg (13%)', gradeC: '100 Kg (3%)' },
      offtaker: 'Pasar Induk Kramat Jati & Ekspor',
      priceAvg: 'Rp 25.000 / Kg',
      grossRevenue: 'Rp 98.750.000',
    },
  ];

  return (
    <div
      className="space-y-3.5 pb-6 animate-in fade-in duration-150 antialiased text-[#11231D]"
      style={{ fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      {/* Back Button */}
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1.5 text-[12px] font-bold text-[#0F5545] hover:text-[#0B3B30] cursor-pointer"
      >
        <i className="ri-arrow-left-line text-sm"></i>
        <span>Kembali ke Menu & Modul</span>
      </button>

      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#0F5545] to-[#04201A] text-white rounded-[18px] p-4 shadow-md border border-[#1FB88B]/30 relative overflow-hidden">
        <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#C8E86B]">
          TIMBANGAN DIGITAL & QUALITY GRADING
        </span>
        <h1 className="text-[20px] font-black tracking-tight mt-0.5 m-0 text-white">
          6.400 Kg Panen Terverifikasi
        </h1>
        <p className="text-[11px] text-[#A3D9C9] m-0 mt-0.5">
          Sensor timbangan otomatis terintegrasi Brix Refractometer
        </p>

        <div className="grid grid-cols-2 gap-2 mt-3 pt-2.5 border-t border-white/15">
          <div className="bg-white/10 rounded-[10px] p-2">
            <span className="text-[9px] text-[#A3D9C9] block">Rata-Rata Brix (Kemanisan)</span>
            <strong className="text-[14px] font-black text-[#C8E86B] block mt-0.5">
              14.1° Brix (Grade A+)
            </strong>
          </div>
          <div className="bg-white/10 rounded-[10px] p-2">
            <span className="text-[9px] text-[#A3D9C9] block">Total Omset Kotor Panen</span>
            <strong className="text-[14px] font-black text-white block mt-0.5">
              Rp 163,67 Jt
            </strong>
          </div>
        </div>
      </div>

      {/* Batch Records */}
      <div className="space-y-2.5">
        <span className="text-[11px] font-black text-[#0B3B30] uppercase tracking-wider block px-0.5">
          BATCH TIMBANGAN & DOKUMEN PENIMBANGAN
        </span>
        <div className="space-y-2.5">
          {harvestBatches.map((batch) => (
            <div
              key={batch.batchId}
              className="bg-white rounded-[16px] p-3.5 border border-[#E2EAE5] shadow-[0_2px_8px_rgba(0,0,0,0.03)] space-y-2"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[9.5px] font-bold text-[#0F5545] bg-[#E8F3ED] px-2 py-0.5 rounded-full inline-block mb-1">
                    {batch.batchId}
                  </span>
                  <h2 className="text-[13px] font-black text-[#11231D] m-0">
                    {batch.crop}
                  </h2>
                  <span className="text-[10px] text-[#6A7B73] block mt-0.5">{batch.date}</span>
                </div>
                <div className="text-right">
                  <span className="text-[13.5px] font-black text-[#0F5545] block">
                    {batch.totalWeight}
                  </span>
                  <span className="text-[10px] font-extrabold text-[#C8E86B] bg-[#0F5545] px-1.5 py-0.2 rounded">
                    {batch.brixAvg}
                  </span>
                </div>
              </div>

              {/* Breakdown Grades */}
              <div className="bg-[#F8FAF8] p-2.5 rounded-[12px] border border-[#E8F0EB] text-[10.5px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-[#6A7B73]">🏆 Grade A (Super Premium):</span>
                  <strong className="text-[#11231D]">{batch.grades.gradeA}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6A7B73]">🥈 Grade B (Pasar Retail):</span>
                  <strong className="text-[#11231D]">{batch.grades.gradeB}</strong>
                </div>
                <div className="flex justify-between border-t border-[#E2EAE5] pt-1 mt-1">
                  <span className="text-[#6A7B73]">🤝 Offtaker / Pembeli:</span>
                  <strong className="text-[#2563EB]">{batch.offtaker}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6A7B73]">💰 Nilai Transaksi:</span>
                  <strong className="text-[#0F5545]">{batch.grossRevenue} ({batch.priceAvg})</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
