import React, { useState } from 'react';
import { DynamicQRCode } from '../../common/DynamicQRCode';

interface KtpSampelScreenProps {
  onBack: () => void;
}

export const KtpSampelScreen: React.FC<KtpSampelScreenProps> = ({ onBack }) => {
  const [selectedSample, setSelectedSample] = useState<'TR-001' | 'TR-002' | 'TR-003' | 'TR-004' | 'TR-005'>('TR-001');

  const sampleTrees = [
    {
      id: 'TR-001',
      code: 'SAMPLE-JGL-A2-0841',
      tabLabel: '🍈 Melon Golden',
      name: 'Pohon Sampel #1 — Melon Golden Apollo',
      variety: 'Melon Golden Apollo F1',
      category: 'Hortikultura Buah Eksklusif',
      block: 'Blok A2 (Jonggol Inti 2.0 Ha)',
      locationDetail: 'Baris 4 • Ajir #17 (Greenhouse A2)',
      plantingDate: '15 Juli 2026',
      ageHst: '43 Hari (HST)',
      phase: 'Fase 4: Pembesaran Buah & Netting',
      healthScore: '98.4% (Sangat Sehat)',
      targetBrix: '14.5° – 16.0° Brix',
      estWeight: '2.4 Kg / Buah',
      gpsCoords: '-6.46972, 107.05831',
      farmer: 'Kang Asep (Regu A)',
      mandor: 'Pak Joko Sukardi',
      certNo: 'GAP-EXP-2026-0982 (0% Residu Kimia)',
      cardBg: 'from-[#0B3B30] via-[#09483A] to-[#04241C]',
      accentColor: '#C8E86B',
      borderColor: 'border-[#C8E86B]/40',
      icon: 'ri-focus-3-fill',
      growthStory: [
        { stage: '1. Tanam Bibit F1 (Polibag)', date: '15 Jul 2026', height: '12 cm', status: 'Selesai' },
        { stage: '2. Fase Vegetatif & Sulur Ajir', date: '04 Agu 2026', height: '65 cm', status: 'Selesai' },
        { stage: '3. Polinasi Manual Ruas 10', date: '16 Agu 2026', height: '140 cm', status: 'Selesai' },
        { stage: '4. Pembesaran Buah & Netting', date: '27 Agu 2026', height: '185 cm', status: 'Aktif (Saat Ini)' },
        { stage: '5. Panen Manis (Target Brix 15°)', date: '14 Sep 2026', height: '190 cm', status: 'Estimasi 18 Hari' },
      ],
      recentLogs: [
        { time: 'Hari ini 07:15', action: 'Irigasi Drip Nutrisi Pagi', detail: 'Nutrisi AB Mix Khusus Melon (EC 2.2, pH 6.2) 2.0L', pic: 'Kang Asep' },
        { time: '25 Agu 16:00', action: 'Semprot Pupuk Daun Mikro', detail: 'MgSO4 + Boron 2 gr/L (Cegah defisiensi magnesium daun)', pic: 'Kang Asep' },
        { time: '20 Agu 08:00', action: 'Pruning Seleksi Buah', detail: 'Menyisakan 1 buah utama ruas 11, potong tunas air liar', pic: 'Pak Joko' },
        { time: '15 Jul 07:00', action: 'Tanam & Pemasangan Barcode', detail: 'Bedengan mulsa perak, penanaman bibit sertifikat F1', pic: 'Kang Asep' },
      ],
    },
    {
      id: 'TR-002',
      code: 'SAMPLE-JGL-B1-0412',
      tabLabel: '🥔 Porang Madiun',
      name: 'Pohon Sampel #2 — Porang Madiun Super',
      variety: 'Porang Madiun Super (Amorphophallus)',
      category: 'Umbi Komersial Ekspor',
      block: 'Blok B1 (Jonggol Inti 2.0 Ha)',
      locationDetail: 'Baris 2 • Ajir #08 (Naungan Paranet 40%)',
      plantingDate: '10 Juni 2026',
      ageHst: '78 Hari (HST)',
      phase: 'Fase 5: Pembesaran Umbi Primer',
      healthScore: '94.2% (Optimal)',
      targetBrix: 'Glukomanan >65%',
      estWeight: '3.8 Kg / Umbi',
      gpsCoords: '-6.47012, 107.05910',
      farmer: 'Pak Ujang (Regu B)',
      mandor: 'Pak Budi Santoso',
      certNo: 'GAP-EXP-2026-0814 (Organik Ekspor)',
      cardBg: 'from-[#1B3B2B] via-[#124E38] to-[#0A3022]',
      accentColor: '#7ED957',
      borderColor: 'border-[#7ED957]/40',
      icon: 'ri-plant-fill',
      growthStory: [
        { stage: '1. Tanam Katak Super (50gr)', date: '10 Jun 2026', height: '10 cm', status: 'Selesai' },
        { stage: '2. Tunas Tangkai Daun Ke-1', date: '02 Jul 2026', height: '45 cm', status: 'Selesai' },
        { stage: '3. Percabangan Daun Payung', date: '25 Jul 2026', height: '90 cm', status: 'Selesai' },
        { stage: '4. Akumulasi Glukomanan Umbi', date: '27 Agu 2026', height: '120 cm', status: 'Aktif (Saat Ini)' },
        { stage: '5. Dormansi & Panen Umbi', date: '15 Nov 2026', height: '130 cm', status: 'Estimasi Musim Panen' },
      ],
      recentLogs: [
        { time: '26 Agu 08:30', action: 'Penimbunan Tanah Bedengan', detail: 'Aplikasi kompos hayati matang + Trichoderma 500 gr', pic: 'Pak Ujang' },
        { time: '18 Agu 07:00', action: 'Sanitasi Gulma', detail: 'Pembersihan gulma manual sekitar kanopi tangkai', pic: 'Pak Ujang' },
        { time: '10 Jun 07:00', action: 'Penanaman Katak & GPS Tag', detail: 'Katak porang grade super 1 kg isi 20 butir', pic: 'Pak Ujang' },
      ],
    },
    {
      id: 'TR-003',
      code: 'SAMPLE-JGL-C1-0119',
      tabLabel: '🌶️ Cabai Ori 212',
      name: 'Pohon Sampel #3 — Cabai Rawit Ori 212',
      variety: 'Cabai Rawit Unggul Ori 212',
      category: 'Sayuran Komersial Pasar Induk',
      block: 'Blok C1 (Jonggol Inti 2.0 Ha)',
      locationDetail: 'Baris 5 • Ajir #32 (Bedengan Mulsa)',
      plantingDate: '01 Juli 2026',
      ageHst: '57 Hari (HST)',
      phase: 'Fase 4: Pembungaan & Pembuahan Lebat',
      healthScore: '96.0% (Tahan Antraknosa)',
      targetBrix: 'Tingkat Pedas Grade A (SHU Tinggi)',
      estWeight: '1.2 Kg / Pohon',
      gpsCoords: '-6.46890, 107.05412',
      farmer: 'Mang Deden (Regu C)',
      mandor: 'Pak Joko Sukardi',
      certNo: 'GAP-EXP-2026-0610 (Bebas Residu Berbahaya)',
      cardBg: 'from-[#3B1B1B] via-[#4A201A] to-[#250C0C]',
      accentColor: '#FF6B6B',
      borderColor: 'border-[#FF6B6B]/40',
      icon: 'ri-fire-fill',
      growthStory: [
        { stage: '1. Pindah Tanam Semai', date: '01 Jul 2026', height: '15 cm', status: 'Selesai' },
        { stage: '2. Percabangan Huruf Y', date: '20 Jul 2026', height: '40 cm', status: 'Selesai' },
        { stage: '3. Muncul Bunga Serempak', date: '10 Agu 2026', height: '75 cm', status: 'Selesai' },
        { stage: '4. Pembentukan Buah Lebat', date: '27 Agu 2026', height: '95 cm', status: 'Aktif (Saat Ini)' },
        { stage: '5. Petik Pertama (Panen Rutin)', date: '10 Sep 2026', height: '105 cm', status: 'Estimasi 14 Hari' },
      ],
      recentLogs: [
        { time: '27 Agu 06:45', action: 'Aplikasi Kalsium Organik', detail: 'Semprot pupuk kalsium cair cegah busuk ujung buah (BER)', pic: 'Mang Deden' },
        { time: '22 Agu 15:30', action: 'Irigasi Pupuk NPK Susulan', detail: 'Kocor NPK 16-16-16 dosis 5 gr per lubang tanam', pic: 'Mang Deden' },
      ],
    },
    {
      id: 'TR-004',
      code: 'SAMPLE-JGL-A3-0504',
      tabLabel: '🍉 Semangka Inul',
      name: 'Pohon Sampel #4 — Semangka Inul Non-Biji',
      variety: 'Semangka Kuning Inul Super Sweet F1',
      category: 'Hortikultura Buah Premium',
      block: 'Blok A3 (Jonggol Inti 2.0 Ha)',
      locationDetail: 'Baris 3 • Ajir #12 (Hamparan Mulsa)',
      plantingDate: '20 Juli 2026',
      ageHst: '38 Hari (HST)',
      phase: 'Fase 3: Pembesaran Buah & Jaring',
      healthScore: '99.1% (Sangat Prima)',
      targetBrix: '12.8° – 13.5° Brix',
      estWeight: '4.5 Kg / Buah',
      gpsCoords: '-6.46950, 107.05780',
      farmer: 'Kang Wawan (Regu A)',
      mandor: 'Pak Joko Sukardi',
      certNo: 'GAP-EXP-2026-0504 (Sertifikasi Prima 1)',
      cardBg: 'from-[#0C3530] via-[#104840] to-[#06201B]',
      accentColor: '#FFE600',
      borderColor: 'border-[#FFE600]/40',
      icon: 'ri-sun-fill',
      growthStory: [
        { stage: '1. Tanam Bibit Sambung F1', date: '20 Jul 2026', height: '10 cm', status: 'Selesai' },
        { stage: '2. Pemanjangan Sulur Utama', date: '05 Agu 2026', height: '80 cm', status: 'Selesai' },
        { stage: '3. Polinasi Bunga Betina Ke-3', date: '18 Agu 2026', height: '150 cm', status: 'Selesai' },
        { stage: '4. Pembesaran Buah (Berat 2.8 Kg)', date: '27 Agu 2026', height: '210 cm', status: 'Aktif (Saat Ini)' },
        { stage: '5. Panen Manis Renyah', date: '18 Sep 2026', height: '220 cm', status: 'Estimasi 22 Hari' },
      ],
      recentLogs: [
        { time: '27 Agu 08:00', action: 'Pemberian Alas Buah', detail: 'Pemasangan tatakan styrofoam agar kulit buah kuning mulus', pic: 'Kang Wawan' },
        { time: '24 Agu 07:00', action: 'Irigasi Drip Kalium Tinggi', detail: 'Pemberian pupuk KNO3 putih untuk mendongkrak kadar gula', pic: 'Kang Wawan' },
      ],
    },
    {
      id: 'TR-005',
      code: 'SAMPLE-JGL-D1-0028',
      tabLabel: '🥑 Alpukat Miki',
      name: 'Pohon Sampel #5 — Alpukat Miki Super',
      variety: 'Alpukat Miki Unggul Dataran Rendah',
      category: 'Tanaman Buah Keras / Perennial',
      block: 'Blok D1 (Jonggol Inti 2.0 Ha)',
      locationDetail: 'Baris 1 • Titik Pohon #03 (Batas Kebun)',
      plantingDate: '15 April 2026',
      ageHst: '134 Hari (Bulan ke-4)',
      phase: 'Fase 2: Pembentukan Cabang Primer & Tajuk',
      healthScore: '97.5% (Kokoh Bebas Ulat)',
      targetBrix: 'Kadar Lemak Nabati Sehat >22%',
      estWeight: '18.0 Kg / Pohon (Tahun ke-2)',
      gpsCoords: '-6.47120, 107.06010',
      farmer: 'Pak Sugeng (Regu D)',
      mandor: 'Pak Budi Santoso',
      certNo: 'GAP-EXP-2026-0028 (Bibit Sambung Pucuk BPTP)',
      cardBg: 'from-[#233512] via-[#2F4A18] to-[#18260B]',
      accentColor: '#B8E986',
      borderColor: 'border-[#B8E986]/40',
      icon: 'ri-seedling-fill',
      growthStory: [
        { stage: '1. Tanam Bibit Sambung Pucuk', date: '15 Apr 2026', height: '70 cm', status: 'Selesai' },
        { stage: '2. Trubus Tunas Daun Merah', date: '20 Mei 2026', height: '95 cm', status: 'Selesai' },
        { stage: '3. Pemangkasan Bentuk Kanopi', date: '10 Jul 2026', height: '130 cm', status: 'Selesai' },
        { stage: '4. Pengokohan Batang Utama', date: '27 Agu 2026', height: '165 cm', status: 'Aktif (Saat Ini)' },
        { stage: '5. Muncul Bunga Perdana', date: '15 Feb 2027', height: '240 cm', status: 'Proyeksi Tahun Depan' },
      ],
      recentLogs: [
        { time: '26 Agu 10:00', action: 'Aplikasi Pupuk Kandang Kambing', detail: 'Pemberian 10 Kg pupuk kandang fermentasi melingkar kanopi', pic: 'Pak Sugeng' },
        { time: '12 Agu 08:00', action: 'Pengikatan Batang Penyangga', detail: 'Penyangga bambu anti terpaan angin kencang Jonggol', pic: 'Pak Sugeng' },
      ],
    },
  ];

  const activeTree = sampleTrees.find((t) => t.id === selectedSample) || sampleTrees[0];

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

      {/* Selector Tab 5 Pohon Sampel Berbeda */}
      <div>
        <span className="text-[10px] font-black uppercase tracking-wider text-[#0F5545] block mb-1.5 px-0.5">
          PILIH POHON SAMPEL MONITORING:
        </span>
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {sampleTrees.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setSelectedSample(t.id as any)}
              className={`px-3 py-1.5 text-[10.5px] font-black rounded-[10px] cursor-pointer whitespace-nowrap transition-all flex items-center gap-1 shrink-0 ${
                selectedSample === t.id
                  ? 'bg-[#0F5545] text-white shadow-sm scale-102'
                  : 'bg-white text-[#4A5D54] border border-[#D9E3DC] hover:bg-[#E8F3ED]'
              }`}
            >
              <span>{t.tabLabel}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ==================== KTP IDENTITAS POHON SAMPEL (CARD FORMAT) ==================== */}
      <div className={`bg-gradient-to-br ${activeTree.cardBg} text-white rounded-[20px] p-4 shadow-lg border-2 ${activeTree.borderColor} relative overflow-hidden space-y-3.5 transition-all duration-300`}>
        {/* Watermark Logo Background */}
        <div className="absolute -right-6 -bottom-6 text-white/5 text-[140px] pointer-events-none select-none font-black leading-none">
          <i className="ri-qr-code-line"></i>
        </div>

        {/* Header KTP */}
        <div className="flex justify-between items-start border-b border-white/15 pb-3">
          <div className="flex items-center gap-2.5">
            <div
              className="w-10 h-10 rounded-[12px] flex items-center justify-center font-black text-xl shadow-xs"
              style={{ backgroundColor: activeTree.accentColor, color: '#08201A' }}
            >
              <i className={activeTree.icon}></i>
            </div>
            <div>
              <span className="text-[9px] font-black uppercase tracking-widest block" style={{ color: activeTree.accentColor }}>
                REPUBLIK INDONESIA • AGROJAYA ERP
              </span>
              <h1 className="text-[14.5px] font-black tracking-tight m-0 text-white leading-tight">
                KARTU IDENTITAS POHON SAMPEL
              </h1>
              <span className="text-[9.5px] text-[#A3D9C9] font-semibold block mt-0.5">
                Kode Ajir: {activeTree.code}
              </span>
            </div>
          </div>
          <span
            className="text-[9px] font-black px-2 py-0.5 rounded-full shadow-2xs"
            style={{ backgroundColor: activeTree.accentColor, color: '#08201A' }}
          >
            TERVERIFIKASI
          </span>
        </div>

        {/* Barcode & Info Grid */}
        <div className="grid grid-cols-12 gap-3 items-center">
          {/* QR Code Container */}
          <div className="col-span-4 bg-white p-2 rounded-[14px] shadow-sm flex flex-col items-center justify-center">
            <DynamicQRCode value={`https://agrojaya.id/tree/${activeTree.code}`} size={74} />
            <span className="text-[8px] font-black text-[#0B3B30] mt-1 text-center leading-none">
              PIN AJIR #{activeTree.locationDetail.split('#')[1]?.split(' ')[0] || '17'}
            </span>
          </div>

          {/* Identity Fields */}
          <div className="col-span-8 space-y-1.5 text-[11px]">
            <div>
              <span className="text-white/60 text-[9px] block leading-none">Varietas Komoditas:</span>
              <strong className="text-[12.5px] font-black block mt-0.5" style={{ color: activeTree.accentColor }}>
                {activeTree.variety}
              </strong>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[10px] text-white/90">
              <div>
                <span className="text-white/60 text-[9px] block leading-none">Lokasi Blok:</span>
                <span className="font-bold">{activeTree.block.split(' ')[0]} {activeTree.block.split(' ')[1]}</span>
              </div>
              <div>
                <span className="text-white/60 text-[9px] block leading-none">Umur Tanam:</span>
                <span className="font-bold" style={{ color: activeTree.accentColor }}>{activeTree.ageHst}</span>
              </div>
            </div>
            <div className="text-[10px] text-white/80">
              <span className="text-white/60 text-[9px] block leading-none">GPS Geotag:</span>
              <span className="font-mono text-[9.5px]">{activeTree.gpsCoords}</span>
            </div>
          </div>
        </div>

        {/* 3 Metric Badges */}
        <div className="grid grid-cols-3 gap-1.5 text-center bg-white/10 p-2 rounded-[12px] backdrop-blur-xs border border-white/10 text-[10.5px]">
          <div>
            <span className="text-white/70 text-[9px] block">Kesehatan</span>
            <strong className="text-[11.5px] font-black" style={{ color: activeTree.accentColor }}>
              {activeTree.healthScore.split(' ')[0]}
            </strong>
          </div>
          <div>
            <span className="text-white/70 text-[9px] block">Kualitas / Mutu</span>
            <strong className="text-white text-[11.5px] font-black">{activeTree.targetBrix.split(' ')[0]}</strong>
          </div>
          <div>
            <span className="text-white/70 text-[9px] block">Est. Hasil</span>
            <strong className="text-[11.5px] font-black" style={{ color: activeTree.accentColor }}>
              {activeTree.estWeight.split(' ')[0]} {activeTree.estWeight.split(' ')[1]}
            </strong>
          </div>
        </div>

        {/* Petani & Mandor Footer */}
        <div className="pt-2 border-t border-white/15 flex justify-between items-center text-[10px] text-white/80">
          <span>Petani: <strong className="text-white">{activeTree.farmer}</strong></span>
          <span>Mandor: <strong className="text-white">{activeTree.mandor}</strong></span>
        </div>
      </div>

      {/* ==================== RIWAYAT PERTUMBUHAN (GROWTH STORY) ==================== */}
      <div className="bg-white rounded-[16px] p-3.5 border border-[#E2EAE5] shadow-[0_2px_8px_rgba(0,0,0,0.03)] space-y-2.5">
        <span className="text-[11px] font-black text-[#0B3B30] uppercase tracking-wider block">
          📈 TAHAP PERTUMBUHAN — {activeTree.variety.toUpperCase()}
        </span>
        <div className="space-y-2">
          {activeTree.growthStory.map((s, idx) => (
            <div key={idx} className="flex items-center justify-between text-[11px] p-2 bg-[#F8FAF8] rounded-[10px] border border-[#E8F0EB]">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#0F5545] text-white font-black text-[9.5px] flex items-center justify-center">
                  {idx + 1}
                </span>
                <div>
                  <strong className="text-[#11231D] block">{s.stage}</strong>
                  <span className="text-[9.5px] text-[#6A7B73]">{s.date} • Ukuran: {s.height}</span>
                </div>
              </div>
              <span
                className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full ${
                  s.status.includes('Aktif')
                    ? 'bg-emerald-100 text-emerald-800 animate-pulse'
                    : s.status.includes('Selesai')
                    ? 'bg-gray-100 text-gray-700'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {s.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ==================== LOG PERAWATAN TERBARU ==================== */}
      <div className="bg-white rounded-[16px] p-3.5 border border-[#E2EAE5] shadow-[0_2px_8px_rgba(0,0,0,0.03)] space-y-2.5">
        <span className="text-[11px] font-black text-[#0B3B30] uppercase tracking-wider block">
          🛠️ LOG PERAWATAN & PEMUPUKAN HARIAN
        </span>
        <div className="space-y-2">
          {activeTree.recentLogs.map((log, idx) => (
            <div key={idx} className="p-2.5 bg-[#F8FAF8] rounded-[10px] border border-[#E8F0EB] space-y-1 text-[11px]">
              <div className="flex justify-between items-start">
                <strong className="text-[#0F5545]">{log.action}</strong>
                <span className="text-[9.5px] text-[#6A7B73]">{log.time}</span>
              </div>
              <p className="text-[#334D43] text-[10.5px] m-0 leading-tight">{log.detail}</p>
              <span className="text-[9.5px] text-[#55675E] block pt-0.5">Pelaksana: <strong>{log.pic}</strong></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
