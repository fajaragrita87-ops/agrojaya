import React, { useState } from 'react';

interface Bukti8TahapScreenProps {
  onBack?: () => void;
}

export const Bukti8TahapScreen: React.FC<Bukti8TahapScreenProps> = () => {
  const [selectedTahap, setSelectedTahap] = useState<number>(8);

  const tahapanList = [
    {
      id: 1,
      name: 'Pembersihan Lahan & Land Clearing',
      date: '12 Mei 2026',
      gps: '-6.5892, 107.0541 (Kebun Sentra)',
      pic: 'Mandor Sukardi & Tim Traktor',
      status: '100% Selesai',
      desc: 'Pembersihan gulma, alang-alang, dan perataan kontur elevasi tanah 2.0 Ha dengan ekskavator & buldoser.',
      image: '/illustrations/land_clearing.svg',
      badge: '🚜 Alat Berat Terverifikasi',
    },
    {
      id: 2,
      name: 'Pengolahan Tanah & Bajak Rotavator',
      date: '20 Mei 2026',
      gps: '-6.5894, 107.0544',
      pic: 'Operator Traktor Kubota',
      status: '100% Selesai',
      desc: 'Pembajakan tanah sedalam 30 cm untuk aerasi oksigen dan kegemburan struktur tanah.',
      image: '/illustrations/tillage_plowing.svg',
      badge: '🌱 Tanah Gembur Siap',
    },
    {
      id: 3,
      name: 'Aplikasi Kapur Dolomit & Pembenah pH',
      date: '28 Mei 2026',
      gps: '-6.5891, 107.0542',
      pic: 'Agronomis Ahmad Fauzi',
      status: '100% Selesai',
      desc: 'Penaburan dolomit 2 Ton/Ha untuk menaikkan pH tanah dari 5.2 menjadi 6.5 (Ideal).',
      image: '/illustrations/soil_fermentation.svg',
      badge: '🧪 Uji Lab pH 6.5',
    },
    {
      id: 4,
      name: 'Pembuatan Bedengan & Parit Drainase',
      date: '05 Jun 2026',
      gps: '-6.5895, 107.0547',
      pic: 'Tim Lapangan Blok A & B',
      status: '100% Selesai',
      desc: 'Pembuatan 48 bedengan (Lebar 110 cm, Tinggi 35 cm) dengan parit anti-genangan.',
      image: '/illustrations/seedling_planting.svg',
      badge: '📏 48 Bedengan Presisi',
    },
    {
      id: 5,
      name: 'Pemasangan Mulsa Plastik Hitam Perak',
      date: '14 Jun 2026',
      gps: '-6.5893, 107.0543',
      pic: 'Petani Terampil Lapangan',
      status: '100% Selesai',
      desc: 'Pemasangan mulsa reflektor cahaya untuk mencegah gulma dan menjaga kelembaban akar.',
      image: '/illustrations/seedling_planting.svg',
      badge: '✨ Mulsa Reflektor Perak',
    },
    {
      id: 6,
      name: 'Instalasi Pipa Irigasi Tetes Presisi',
      date: '22 Jun 2026',
      gps: '-6.5896, 107.0548',
      pic: 'Teknisi Hidrolik Irigasi',
      status: '100% Selesai',
      desc: 'Pemasangan selang drip emitter 2 L/jam terhubung otomatis ke tangki nutrisi IoT.',
      image: '/illustrations/fertigation_maintenance.svg',
      badge: '💧 Drip Emitter IoT',
    },
    {
      id: 7,
      name: 'Penanaman Bibit Unggul Golden Melon F1',
      date: '02 Jul 2026',
      gps: '-6.5892, 107.0541',
      pic: 'Kepala Kebun & 14 Mandor',
      status: '100% Selesai',
      desc: 'Transplanting 8.500 bibit melon bersertifikasi sehat dengan perakaran kokoh.',
      image: '/illustrations/crop_rotation.svg',
      badge: '🌿 8.500 Bibit Unggul',
    },
    {
      id: 8,
      name: 'Perawatan Harian & Telemetri IoT',
      date: 'Hari Ini (Sedang Berjalan)',
      gps: '-6.5894, 107.0545',
      pic: 'Sistem Otomasi & Mandor Harian',
      status: 'Aktif (84% Menuju Panen)',
      desc: 'Penyiraman nutrisi drip terukur, pewiwitan tunas air, dan sensor kelembaban tanah 72%.',
      image: '/illustrations/harvest_grading.svg',
      badge: '🍈 Buah Membesar (Brix 14.5°)',
    },
  ];

  return (
    <div
      className="space-y-3 pb-12 animate-in fade-in duration-150 antialiased text-[#11231D]"
      style={{ fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >

      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#064E3B] via-[#047857] to-[#022C22] text-white rounded-[20px] p-4 shadow-lg border border-white/15 relative overflow-hidden">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[9px] font-black uppercase tracking-wider text-[#C8E86B] block">
              TRANSPARANSI KESIAPAN FISIK LAHAN
            </span>
            <h1 className="text-[16px] font-black tracking-tight mt-0.5 m-0 text-white leading-tight">
              Bukti 8 Tahap Pengolahan Lahan
            </h1>
            <p className="text-[10.5px] text-[#A7F3D0] m-0 mt-0.5 font-medium">
              Verifikasi nyata dari land clearing hingga pembuahan siap panen
            </p>
          </div>
          <span className="bg-[#C8E86B] text-[#064E3B] px-2.5 py-0.5 rounded-full text-[9px] font-black shrink-0 shadow-xs">
            100% Tervalidasi
          </span>
        </div>

        {/* Progress Tracker */}
        <div className="mt-3 pt-2 border-t border-white/15 flex items-center justify-between text-[10px] text-[#D1FAE5] font-bold">
          <span>Progres Siklus: 8 dari 8 Tahap Selesai</span>
          <span className="text-[#C8E86B] font-extrabold">Lahan Siap 100%</span>
        </div>
      </div>

      {/* 8-Stage Interactive Horizontal Pill Selector */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {tahapanList.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setSelectedTahap(t.id)}
            className={`px-3 py-1.5 rounded-[10px] text-[10.5px] font-extrabold whitespace-nowrap cursor-pointer transition-all flex items-center gap-1 shrink-0 ${
              selectedTahap === t.id
                ? 'bg-[#0F5545] text-white shadow-xs ring-2 ring-[#C8E86B]/40'
                : 'bg-white text-[#4A5D54] border border-[#D9E3DC] hover:bg-[#E8F3ED]'
            }`}
          >
            <span>Tahap {t.id}</span>
          </button>
        ))}
      </div>

      {/* Detail Active Tahap Card */}
      {(() => {
        const activeT = tahapanList.find((t) => t.id === selectedTahap) || tahapanList[7];
        return (
          <div className="bg-white rounded-[18px] p-4 border border-[#E2EAE5] shadow-[0_2px_12px_rgba(0,0,0,0.04)] space-y-3">
            {/* Visual Photo Card with Image & Watermark */}
            <div className="w-full h-44 rounded-[14px] bg-gradient-to-br from-[#062820] via-[#0B4436] to-[#041D16] text-white flex flex-col items-center justify-center p-3 text-center border border-[#14473B] relative overflow-hidden shadow-inner">
              {/* Illustration Image */}
              <img
                src={activeT.image}
                alt={activeT.name}
                className="w-24 h-24 object-contain mb-1 drop-shadow-md relative z-10"
              />

              {/* Verified Badge */}
              <span className="absolute top-2.5 right-2.5 bg-black/50 backdrop-blur-md text-[#C8E86B] text-[9px] font-extrabold px-2.5 py-0.5 rounded-full border border-[#C8E86B]/30 flex items-center gap-1 z-20">
                <i className="ri-checkbox-circle-fill text-[11px] text-[#C8E86B]"></i>
                <span>Foto Terverifikasi</span>
              </span>

              {/* Watermark GPS & Timestamp */}
              <div className="absolute bottom-2 inset-x-2 bg-black/60 backdrop-blur-md rounded-[8px] py-1 px-2 text-center text-[9px] text-[#A7F3D0] border border-white/10 z-20">
                <span>📍 GPS: {activeT.gps} • 📅 {activeT.date}</span>
              </div>
            </div>

            {/* Tahap Info */}
            <div className="space-y-1">
              <div className="flex justify-between items-start gap-2">
                <h2 className="text-[13.5px] font-black text-[#11231D] m-0 leading-tight">
                  Tahap {activeT.id}: {activeT.name}
                </h2>
                <span className="bg-[#E8F3ED] text-[#064E3B] text-[9.5px] font-black px-2 py-0.5 rounded-full shrink-0">
                  {activeT.status}
                </span>
              </div>
              <p className="text-[11px] text-[#374151] font-medium leading-relaxed m-0 pt-1">
                {activeT.desc}
              </p>
            </div>

            {/* Field Meta Grid */}
            <div className="grid grid-cols-2 gap-2 text-[10.5px] bg-[#F8FAF8] p-2.5 rounded-[12px] border border-[#E8F0EB]">
              <div>
                <span className="text-[#4B5563] font-semibold block text-[10px]">📅 Tanggal Eksekusi:</span>
                <strong className="text-[#111827] font-bold block mt-0.5">{activeT.date}</strong>
              </div>
              <div>
                <span className="text-[#4B5563] font-semibold block text-[10px]">👤 Penanggung Jawab:</span>
                <strong className="text-[#065F46] font-extrabold block mt-0.5">{activeT.pic}</strong>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};
