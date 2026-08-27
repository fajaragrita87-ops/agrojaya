import React from 'react';

interface MasterKomoditasScreenProps {
  onBack: () => void;
}

export const MasterKomoditasScreen: React.FC<MasterKomoditasScreenProps> = ({ onBack }) => {
  const komoditasList = [
    {
      id: 'KOM-01',
      name: 'Melon Golden Alisha F1',
      type: 'Hortikultura Premium',
      cycle: '65 – 70 Hari',
      brixTarget: '13.5° – 15.0° Brix',
      yieldEst: '15.0 – 18.0 Ton / Ha',
      priceEst: 'Rp 25.000 – Rp 30.000 / Kg',
      sop: 'Fertigasi drip AB Mix harian (EC 2.2, pH 6.2). Pewiwitan tunas air sisa 1 buah utama pada ruas 9-12.',
      status: 'Aktif di Blok A & B',
      badgeColor: 'bg-emerald-100 text-emerald-800',
    },
    {
      id: 'KOM-02',
      name: 'Cabai Rawit Ori 212',
      type: 'Sayuran Komersial',
      cycle: '85 – 90 Hari (Panen Berkala)',
      brixTarget: 'Tingkat Kepedasan Tinggi',
      yieldEst: '12.0 – 14.0 Ton / Ha',
      priceEst: 'Rp 35.000 – Rp 65.000 / Kg',
      sop: 'Penyemprotan hayati Trichoderma setiap 7 hari. Pemupukan susulan NPK 16-16-16 interval 10 hari.',
      status: 'Aktif di Blok C',
      badgeColor: 'bg-red-100 text-red-800',
    },
    {
      id: 'KOM-03',
      name: 'Porang Madiun Super (Amorphophallus)',
      type: 'Umbi Ekspor',
      cycle: '6 – 8 Bulan (1 Musim)',
      brixTarget: 'Kadar Glukomanan >55%',
      yieldEst: '25.0 – 30.0 Ton / Ha',
      priceEst: 'Rp 8.000 – Rp 12.000 / Kg (Basah)',
      sop: 'Bedengan tinggi 40 cm anti genangan. Naungan paranet 40% pada 2 bulan pertama.',
      status: 'Persiapan Blok D',
      badgeColor: 'bg-amber-100 text-amber-800',
    },
  ];

  return (
    <div className="space-y-3.5 pb-6 animate-in fade-in duration-150 antialiased text-[#11231D]">
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
      <div className="bg-[#0B3B30] text-white rounded-[18px] p-4 shadow-md border border-[#14473B] flex items-center justify-between">
        <div>
          <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#C8E86B]">
            DATABASE KOMODITAS & STANDAR OPERASIONAL
          </span>
          <h1 className="text-[17px] font-black tracking-tight mt-0.5 m-0 text-white">
            Master Komoditas & SOP
          </h1>
          <p className="text-[11px] text-[#A3D9C9] m-0 mt-0.5">
            Spesifikasi benih unggul, siklus tanam, & protokol agronomi
          </p>
        </div>
        <div className="w-10 h-10 rounded-[12px] bg-white/10 flex items-center justify-center text-xl text-[#C8E86B]">
          <i className="ri-seedling-fill"></i>
        </div>
      </div>

      {/* List Komoditas */}
      <div className="space-y-3">
        {komoditasList.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-[16px] p-3.5 border border-[#E2EAE5] shadow-[0_2px_8px_rgba(0,0,0,0.03)] space-y-2.5"
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[9.5px] font-bold text-[#0F5545] bg-[#E8F3ED] px-2 py-0.5 rounded-full inline-block mb-1">
                  {item.id} • {item.type}
                </span>
                <h2 className="text-[13.5px] font-black text-[#11231D] m-0">
                  {item.name}
                </h2>
              </div>
              <span className={`text-[9.5px] font-black px-2 py-0.5 rounded-full ${item.badgeColor}`}>
                {item.status}
              </span>
            </div>

            {/* Parameter Box */}
            <div className="grid grid-cols-2 gap-2 text-[10.5px] bg-[#F8FAF8] p-2.5 rounded-[12px] border border-[#E8F0EB]">
              <div>
                <span className="text-[#6A7B73] block">⏳ Siklus Tanam:</span>
                <strong className="text-[#11231D]">{item.cycle}</strong>
              </div>
              <div>
                <span className="text-[#6A7B73] block">🍯 Standar Kualitas:</span>
                <strong className="text-[#0F5545]">{item.brixTarget}</strong>
              </div>
              <div className="border-t border-[#E2EAE5] pt-1 mt-1">
                <span className="text-[#6A7B73] block">⚖️ Potensi Hasil:</span>
                <strong className="text-[#11231D]">{item.yieldEst}</strong>
              </div>
              <div className="border-t border-[#E2EAE5] pt-1 mt-1">
                <span className="text-[#6A7B73] block">💰 Harga Offtaker:</span>
                <strong className="text-[#2563EB]">{item.priceEst}</strong>
              </div>
            </div>

            {/* SOP Protocol */}
            <div className="bg-[#E8F3ED]/60 p-2.5 rounded-[10px] border border-[#D0E5DA] text-[11px]">
              <span className="font-extrabold text-[#0F5545] block mb-0.5">📋 Protokol SOP Singkat:</span>
              <p className="text-[#234B3E] m-0 leading-relaxed">{item.sop}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
