import React, { useState } from 'react';

interface Bukti8TahapScreenProps {
  onBack: () => void;
}

export const Bukti8TahapScreen: React.FC<Bukti8TahapScreenProps> = ({ onBack }) => {
  const [selectedTahap, setSelectedTahap] = useState<number>(8);

  const tahapanList = [
    {
      id: 1,
      name: 'Pembersihan Lahan & Land Clearing',
      date: '12 Mei 2026',
      gps: '-6.5892, 107.0541 (Jonggol)',
      pic: 'Mandor Sukardi & Tim Traktor',
      status: '100% Selesai',
      desc: 'Pembersihan gulma, alang-alang, dan perataan kontur elevasi tanah 2.0 Ha.',
      photoPlaceholder: '🚜 Foto Alat Berat & Lahan Bersih',
    },
    {
      id: 2,
      name: 'Pengolahan Tanah & Bajak Rotavator',
      date: '20 Mei 2026',
      gps: '-6.5894, 107.0544',
      pic: 'Operator Traktor Kubota',
      status: '100% Selesai',
      desc: 'Pembajakan tanah sedalam 30 cm untuk aerasi oksigen dan kegemburan struktur tanah.',
      photoPlaceholder: '🌱 Foto Tanah Gembur Bertekstur',
    },
    {
      id: 3,
      name: 'Aplikasi Kapur Dolomit & Pembenah pH',
      date: '28 Mei 2026',
      gps: '-6.5891, 107.0542',
      pic: 'Agronomis Ahmad Fauzi',
      status: '100% Selesai',
      desc: 'Penaburan dolomit 2 Ton/Ha untuk menaikkan pH tanah dari 5.2 menjadi 6.5 (Ideal).',
      photoPlaceholder: '🧪 Foto Uji pH Tanah & Tabur Dolomit',
    },
    {
      id: 4,
      name: 'Pembuatan Bedengan & Parit Drainase',
      date: '05 Jun 2026',
      gps: '-6.5895, 107.0547',
      pic: 'Tim Lapangan Blok A & B',
      status: '100% Selesai',
      desc: 'Pembuatan 48 bedengan (Lebar 110 cm, Tinggi 35 cm) dengan parit anti-genangan.',
      photoPlaceholder: '📏 Foto Bedengan Presisi Rapi',
    },
    {
      id: 5,
      name: 'Pemasangan Mulsa Plastik Hitam Perak',
      date: '14 Jun 2026',
      gps: '-6.5893, 107.0543',
      pic: 'Petani Terampil Jonggol',
      status: '100% Selesai',
      desc: 'Pemasangan mulsa reflektor cahaya untuk mencegah gulma dan menjaga kelembaban akar.',
      photoPlaceholder: '✨ Foto Mulsa Mengkilap & Ajir',
    },
    {
      id: 6,
      name: 'Instalasi Pipa Irigasi Tetes Presisi',
      date: '22 Jun 2026',
      gps: '-6.5896, 107.0548',
      pic: 'Teknisi Hidrolik Irigasi',
      status: '100% Selesai',
      desc: 'Pemasangan selang drip emitter 2 L/jam terhubung otomatis ke tangki nutrisi IoT.',
      photoPlaceholder: '💧 Foto Uji Emisi Tetesan Air',
    },
    {
      id: 7,
      name: 'Penanaman Bibit Unggul Golden Melon F1',
      date: '02 Jul 2026',
      gps: '-6.5892, 107.0541',
      pic: 'Kepala Kebun & 14 Mandor',
      status: '100% Selesai',
      desc: 'Transplanting 8.500 bibit melon bersertifikasi sehat dengan perakaran kokoh.',
      photoPlaceholder: '🌿 Foto Bibit Tumbuh Hijau Sehat',
    },
    {
      id: 8,
      name: 'Perawatan Harian & Telemetri IoT',
      date: 'Hari Ini (Sedang Berjalan)',
      gps: '-6.5894, 107.0545',
      pic: 'Sistem Otomasi & Mandor Harian',
      status: 'Aktif (84% Menuju Panen)',
      desc: 'Penyiraman nutrisi drip terukur, pewiwitan tunas air, dan sensor kelembaban tanah 72%.',
      photoPlaceholder: '🍈 Foto Buah Melon Mulai Membesar',
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
          TRANSPARANSI KESIAPAN FISIK LAHAN
        </span>
        <h1 className="text-[17px] font-black tracking-tight mt-0.5 m-0 text-white">
          Bukti 8 Tahap Pengolahan Lahan
        </h1>
        <p className="text-[11px] text-[#A3D9C9] m-0 mt-0.5">
          Verifikasi nyata dari land clearing hingga pembuahan siap panen
        </p>

        {/* Progress Tracker */}
        <div className="mt-3 pt-2.5 border-t border-white/15 flex items-center justify-between text-[10px] text-[#C8E86B] font-bold">
          <span>Progres Siklus: 8 dari 8 Tahap</span>
          <span className="bg-[#C8E86B] text-[#08201A] px-2 py-0.5 rounded-full text-[9px] font-black">
            Lahan Siap 100%
          </span>
        </div>
      </div>

      {/* 8-Stage Interactive Horizontal Pill Selector */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {tahapanList.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setSelectedTahap(t.id)}
            className={`px-3 py-1.5 rounded-full text-[11px] font-extrabold whitespace-nowrap cursor-pointer transition-all ${
              selectedTahap === t.id
                ? 'bg-[#0F5545] text-white shadow-xs'
                : 'bg-white text-[#55675E] border border-[#D9E3DC]'
            }`}
          >
            Tahap {t.id}
          </button>
        ))}
      </div>

      {/* Detail Active Tahap Card */}
      {(() => {
        const activeT = tahapanList.find((t) => t.id === selectedTahap) || tahapanList[7];
        return (
          <div className="bg-white rounded-[16px] p-4 border border-[#E2EAE5] shadow-[0_2px_8px_rgba(0,0,0,0.03)] space-y-3">
            {/* Visual Photo Simulation */}
            <div className="w-full h-36 rounded-[12px] bg-gradient-to-br from-[#1E5646] to-[#0A2E24] text-white flex flex-col items-center justify-center p-3 text-center border border-[#14473B] relative overflow-hidden">
              <span className="text-2xl mb-1">📸</span>
              <strong className="text-[12.5px] font-bold text-[#C8E86B]">{activeT.photoPlaceholder}</strong>
              <span className="text-[9.5px] text-[#A3D9C9] mt-1">Watermark GPS: {activeT.gps} • {activeT.date}</span>
              <span className="absolute top-2 right-2 bg-black/40 backdrop-blur-xs text-white text-[8.5px] font-semibold px-2 py-0.5 rounded-full border border-white/20">
                Verified Foto
              </span>
            </div>

            {/* Tahap Info */}
            <div>
              <div className="flex justify-between items-start">
                <h2 className="text-[14px] font-black text-[#11231D] m-0">
                  Tahap {activeT.id}: {activeT.name}
                </h2>
                <span className="bg-[#E8F3ED] text-[#0F5545] text-[9.5px] font-black px-2 py-0.5 rounded-full">
                  {activeT.status}
                </span>
              </div>
              <p className="text-[11.5px] text-[#55675E] mt-1.5 leading-relaxed">
                {activeT.desc}
              </p>
            </div>

            {/* Field Meta Grid */}
            <div className="grid grid-cols-2 gap-2 text-[10.5px] bg-[#F8FAF8] p-2.5 rounded-[10px] border border-[#E8F0EB]">
              <div>
                <span className="text-[#6A7B73] block">📅 Tanggal Eksekusi:</span>
                <strong className="text-[#11231D]">{activeT.date}</strong>
              </div>
              <div>
                <span className="text-[#6A7B73] block">👤 Penanggung Jawab:</span>
                <strong className="text-[#11231D]">{activeT.pic}</strong>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};
