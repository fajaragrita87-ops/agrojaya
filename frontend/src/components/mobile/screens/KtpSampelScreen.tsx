import React, { useState } from 'react';
import { DynamicQRCode } from '../../common/DynamicQRCode';
import { useSmartFarmStore } from '../../../store/smartFarmStore';

interface KtpSampelScreenProps {
  onBack?: () => void;
}

export const KtpSampelScreen: React.FC<KtpSampelScreenProps> = () => {
  const { treeSamples } = useSmartFarmStore();
  const [selectedSample, setSelectedSample] = useState<string>('TR-001');

  const sampleTrees = treeSamples;
  const activeTree = sampleTrees.find((t) => t.id === selectedSample) || sampleTrees[0];

  return (
    <div
      className="space-y-3 pb-6 animate-in fade-in duration-150 antialiased text-[#11231D]"
      style={{ fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      {/* Selector Tab Pohon Sampel (Pills Horizontal) */}
      <div className="space-y-1">
        <div className="flex justify-between items-center px-0.5">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#0F5545]">
            PILIH POHON SAMPEL MONITORING:
          </span>
          <span className="text-[9.5px] font-bold text-[#6A7B73]">
            {sampleTrees.length} Pohon Terdaftar
          </span>
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {sampleTrees.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setSelectedSample(t.id)}
              className={`px-3 py-1.5 text-[10.5px] font-extrabold rounded-[10px] cursor-pointer whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                selectedSample === t.id
                  ? 'bg-[#0F5545] text-white shadow-sm ring-2 ring-[#C8E86B]/50'
                  : 'bg-white text-[#4A5D54] border border-[#D9E3DC] hover:bg-[#E8F3ED]'
              }`}
            >
              <span>{t.tabLabel}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ==================== KARTU TANDA POHON (SMART ID CARD) ==================== */}
      <div
        className="rounded-[22px] p-4 text-white shadow-xl relative overflow-hidden space-y-3 transition-all duration-300 border border-white/20"
        style={{
          background: 'linear-gradient(145deg, #072B22 0%, #0B4436 45%, #05221B 100%)',
        }}
      >
        {/* Subtle Watermark Icon */}
        <div className="absolute -right-4 -bottom-4 text-white/[0.04] text-[130px] pointer-events-none select-none font-black leading-none">
          <i className="ri-qr-code-line"></i>
        </div>

        {/* 1. Header KTP */}
        <div className="flex justify-between items-start border-b border-white/15 pb-2.5 relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-[10px] bg-[#C8E86B] text-[#08201A] flex items-center justify-center font-black text-lg shadow-xs shrink-0">
              <i className="ri-shield-check-fill"></i>
            </div>
            <div>
              <span className="text-[8.5px] font-black uppercase tracking-widest text-[#C8E86B] block">
                REPUBLIK INDONESIA • SMART FARM ERP
              </span>
              <h1 className="text-[13.5px] font-black tracking-tight m-0 text-white leading-tight">
                KARTU IDENTITAS POHON SAMPEL
              </h1>
              <span className="text-[9px] text-[#A7F3D0] font-mono font-semibold block mt-0.5">
                Kode Ajir: <strong className="text-white">{activeTree.code}</strong>
              </span>
            </div>
          </div>
          <span className="text-[8.5px] font-black px-2 py-0.5 rounded-full bg-[#C8E86B] text-[#08201A] shadow-xs shrink-0 tracking-wide uppercase">
            TERVERIFIKASI
          </span>
        </div>

        {/* 2. QR Code & Main Identity Details */}
        <div className="grid grid-cols-12 gap-3 items-center relative z-10">
          {/* QR Code Container */}
          <div className="col-span-4 bg-white p-2 rounded-[14px] shadow-md flex flex-col items-center justify-center border border-white/30 shrink-0">
            <DynamicQRCode value={`https://agrojaya.id/tree/${activeTree.code}`} size={76} />
            <span className="text-[8.5px] font-black text-[#08201A] mt-1 text-center leading-none">
              PIN AJIR #{activeTree.locationDetail.split('#')[1]?.split(' ')[0] || '17'}
            </span>
          </div>

          {/* Details Column */}
          <div className="col-span-8 space-y-1.5 text-[11px]">
            <div>
              <span className="text-[#C8E86B] font-extrabold text-[9px] block uppercase tracking-wider">
                Varietas Komoditas:
              </span>
              <strong className="text-[13px] font-black text-white block mt-0.5 leading-snug">
                {activeTree.variety}
              </strong>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px] pt-0.5">
              <div>
                <span className="text-[#A7F3D0] font-bold text-[9px] block">Lokasi Blok:</span>
                <span className="font-extrabold text-white text-[10.5px] block mt-0.5">
                  {activeTree.block.split(' ')[0]} {activeTree.block.split(' ')[1]}
                </span>
              </div>
              <div>
                <span className="text-[#A7F3D0] font-bold text-[9px] block">Umur Tanam:</span>
                <span className="font-extrabold text-[#C8E86B] text-[10.5px] block mt-0.5">
                  {activeTree.ageHst}
                </span>
              </div>
            </div>

            <div className="pt-0.5">
              <span className="text-[#A7F3D0] font-bold text-[9px] block">GPS Geotag:</span>
              <span className="font-mono text-[9.5px] font-bold text-white block mt-0.5">
                {activeTree.gpsCoords}
              </span>
            </div>
          </div>
        </div>

        {/* 3. Three Core Metric Badges */}
        <div className="grid grid-cols-3 gap-1.5 text-center bg-black/35 p-2 rounded-[12px] backdrop-blur-md border border-white/20 relative z-10">
          <div>
            <span className="text-[#D1FAE5] text-[9px] font-extrabold block">Kesehatan</span>
            <strong className="text-[13px] font-black text-[#C8E86B] block mt-0.5">
              {activeTree.healthScore.split(' ')[0]}
            </strong>
          </div>
          <div className="border-x border-white/15">
            <span className="text-[#D1FAE5] text-[9px] font-extrabold block">Kualitas / Mutu</span>
            <strong className="text-white text-[13px] font-black block mt-0.5">
              {activeTree.targetBrix.split(' ')[0]}
            </strong>
          </div>
          <div>
            <span className="text-[#D1FAE5] text-[9px] font-extrabold block">Est. Hasil</span>
            <strong className="text-[13px] font-black text-[#C8E86B] block mt-0.5">
              {activeTree.estWeight.split(' ')[0]} {activeTree.estWeight.split(' ')[1]}
            </strong>
          </div>
        </div>

        {/* 4. Footer Petani & Mandor */}
        <div className="pt-2 border-t border-white/15 flex justify-between items-center text-[10px] relative z-10">
          <span>
            <span className="text-[#A7F3D0] font-bold">Petani: </span>
            <strong className="text-white font-black">{activeTree.farmer}</strong>
          </span>
          <span>
            <span className="text-[#A7F3D0] font-bold">Mandor: </span>
            <strong className="text-white font-black">{activeTree.mandor}</strong>
          </span>
        </div>
      </div>

      {/* ==================== RIWAYAT PERTUMBUHAN (GROWTH STORY) ==================== */}
      <div className="bg-white rounded-[16px] p-3.5 border border-[#E2EAE5] shadow-[0_2px_8px_rgba(0,0,0,0.03)] space-y-2">
        <span className="text-[11px] font-extrabold text-[#0B3B30] uppercase tracking-wider block">
          📈 TAHAP PERTUMBUHAN — {activeTree.variety.toUpperCase()}
        </span>
        <div className="space-y-1.5">
          {activeTree.growthStory.map((s, idx) => (
            <div key={idx} className="flex items-center justify-between text-[11px] p-2 bg-[#F8FAF8] rounded-[10px] border border-[#E8F0EB]">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#0F5545] text-white font-black text-[9.5px] flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <div>
                  <strong className="text-[11.5px] font-bold text-[#11231D] block">{s.stage}</strong>
                  <span className="text-[10px] font-medium text-[#6A7B73]">{s.date} • Tinggi: {s.height}</span>
                </div>
              </div>
              <span
                className={`text-[9.5px] font-extrabold px-2 py-0.5 rounded-full ${
                  s.status.includes('Aktif')
                    ? 'bg-emerald-100 text-emerald-800'
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
      <div className="bg-white rounded-[16px] p-3.5 border border-[#E2EAE5] shadow-[0_2px_8px_rgba(0,0,0,0.03)] space-y-2">
        <span className="text-[11px] font-extrabold text-[#0B3B30] uppercase tracking-wider block">
          🛠️ LOG PERAWATAN & PEMUPUKAN HARIAN
        </span>
        <div className="space-y-1.5">
          {activeTree.recentLogs.map((log, idx) => (
            <div key={idx} className="p-2.5 bg-[#F8FAF8] rounded-[10px] border border-[#E8F0EB] space-y-1 text-[11px]">
              <div className="flex justify-between items-center">
                <strong className="text-[11.5px] font-bold text-[#0F5545]">{log.action}</strong>
                <span className="text-[10px] font-medium text-[#6A7B73]">{log.time}</span>
              </div>
              <p className="text-[#11231D] text-[10.5px] font-medium m-0 leading-normal">{log.detail}</p>
              <div className="pt-0.5 flex items-center justify-between text-[9.5px] text-[#6A7B73]">
                <span>Pelaksana: <strong className="text-[#11231D] font-semibold">{log.pic}</strong></span>
                <span className="text-[#047857] font-semibold flex items-center gap-0.5">
                  <i className="ri-checkbox-circle-fill text-[11px]"></i> Terverifikasi
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
