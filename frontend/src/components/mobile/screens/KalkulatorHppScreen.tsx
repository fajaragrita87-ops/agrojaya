import React, { useState } from 'react';

interface KalkulatorHppScreenProps {
  onBack?: () => void;
}

export const KalkulatorHppScreen: React.FC<KalkulatorHppScreenProps> = () => {
  const [luasLahan, setLuasLahan] = useState(2.0); // Ha
  const [targetTonPerHa, setTargetTonPerHa] = useState(15.0); // Ton/Ha
  const [hargaJualPerKg, setHargaJualPerKg] = useState(25000); // Rp/Kg Melon Golden F1

  // Scaled production costs per hectare
  const biayaBibitPupuk = Math.round(22500000 * luasLahan); // Rp 22.5 Jt / Ha
  const biayaTenagaKerja = Math.round(15000000 * luasLahan); // Rp 15 Jt / Ha
  const biayaIrigasiOps = Math.round(7500000 * luasLahan); // Rp 7.5 Jt / Ha

  // Calculations
  const totalPanenKg = luasLahan * targetTonPerHa * 1000;
  const totalBiayaProduksi = biayaBibitPupuk + biayaTenagaKerja + biayaIrigasiOps;
  const hppPerKg = totalPanenKg > 0 ? Math.round(totalBiayaProduksi / totalPanenKg) : 0;
  const estimasiOmset = totalPanenKg * hargaJualPerKg;
  const estimasiLabaBersih = estimasiOmset - totalBiayaProduksi;
  const estimasiRoi = totalBiayaProduksi > 0 ? Math.round((estimasiLabaBersih / totalBiayaProduksi) * 100) : 0;

  return (
    <div
      className="space-y-3.5 animate-in fade-in duration-150 antialiased text-[#11231D]"
      style={{
        fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 88px)',
        WebkitOverflowScrolling: 'touch',
      }}
    >

      {/* Result Highlight Card */}
      <div className="bg-gradient-to-br from-[#0F5545] to-[#062820] text-white rounded-[18px] p-4 shadow-md border border-[#1FB88B]/30 relative overflow-hidden">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#C8E86B]">
              HASIL KALKULASI HPP & ESTIMASI PROFIT
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-[24px] font-black text-white leading-none">
                Rp {hppPerKg.toLocaleString('id-ID')}
              </span>
              <span className="text-[12px] text-[#A3D9C9] font-semibold">/ Kg (HPP)</span>
            </div>
          </div>
          <span className="bg-[#C8E86B] text-[#08201A] text-[10.5px] font-black px-2.5 py-1 rounded-full shadow-xs">
            ROI +{estimasiRoi}%
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-3.5 pt-3 border-t border-white/15">
          <div className="bg-white/10 rounded-[10px] p-2">
            <span className="text-[9px] text-[#A3D9C9] block">Estimasi Omset Kotor</span>
            <strong className="text-[13px] font-extrabold text-white block mt-0.5">
              Rp {Math.round(estimasiOmset / 1000000)} Jt
            </strong>
          </div>
          <div className="bg-white/10 rounded-[10px] p-2">
            <span className="text-[9px] text-[#C8E86B] block">Estimasi Laba Bersih</span>
            <strong className="text-[13px] font-extrabold text-[#C8E86B] block mt-0.5">
              Rp {Math.round(estimasiLabaBersih / 1000000)} Jt
            </strong>
          </div>
        </div>
      </div>

      {/* Interactive Sliders & Inputs */}
      <div className="bg-white rounded-[16px] p-3.5 border border-[#E2EAE5] shadow-[0_1px_4px_rgba(0,0,0,0.03)] space-y-3.5">
        <span className="text-[11px] font-black text-[#0B3B30] uppercase tracking-wider block border-b border-[#F0F5F2] pb-1.5">
          PARAMETER PRODUKSI & PASAR
        </span>

        {/* Parameter 1: Luas Lahan */}
        <div className="space-y-1">
          <div className="flex justify-between text-[11.5px] font-bold">
            <span className="text-[#55675E]">Luas Lahan Tanam</span>
            <span className="text-[#0F5545]">{luasLahan.toFixed(1)} Hektar</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="10.0"
            step="0.5"
            value={luasLahan}
            onChange={(e) => setLuasLahan(parseFloat(e.target.value))}
            className="w-full accent-[#0F5545] cursor-pointer"
          />
        </div>

        {/* Parameter 2: Target Panen */}
        <div className="space-y-1">
          <div className="flex justify-between text-[11.5px] font-bold">
            <span className="text-[#55675E]">Target Panen per Hektar</span>
            <span className="text-[#0F5545]">{targetTonPerHa.toFixed(1)} Ton/Ha</span>
          </div>
          <input
            type="range"
            min="5.0"
            max="30.0"
            step="1.0"
            value={targetTonPerHa}
            onChange={(e) => setTargetTonPerHa(parseFloat(e.target.value))}
            className="w-full accent-[#0F5545] cursor-pointer"
          />
        </div>

        {/* Parameter 3: Harga Jual Pasaran */}
        <div className="space-y-1">
          <div className="flex justify-between text-[11.5px] font-bold">
            <span className="text-[#55675E]">Harga Jual Offtaker (Grade A)</span>
            <span className="text-[#0F5545]">Rp {hargaJualPerKg.toLocaleString('id-ID')} / Kg</span>
          </div>
          <input
            type="range"
            min="10000"
            max="50000"
            step="2500"
            value={hargaJualPerKg}
            onChange={(e) => setHargaJualPerKg(parseInt(e.target.value))}
            className="w-full accent-[#0F5545] cursor-pointer"
          />
        </div>

        {/* Parameter 4: Biaya Input */}
        <div className="pt-2 border-t border-[#F0F5F2] space-y-2">
          <span className="text-[10px] font-bold text-[#6A7B73] uppercase tracking-wider block">
            Rincian Biaya Siklus Panen (OPEX)
          </span>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-[#F8FAF8] rounded-[8px] p-1.5 border border-[#E2EAE5]">
              <span className="text-[9px] text-[#6A7B73] block">Bibit & Pupuk</span>
              <strong className="text-[11px] text-[#11231D]">45 Jt</strong>
            </div>
            <div className="bg-[#F8FAF8] rounded-[8px] p-1.5 border border-[#E2EAE5]">
              <span className="text-[9px] text-[#6A7B73] block">SDM & Mandor</span>
              <strong className="text-[11px] text-[#11231D]">30 Jt</strong>
            </div>
            <div className="bg-[#F8FAF8] rounded-[8px] p-1.5 border border-[#E2EAE5]">
              <span className="text-[9px] text-[#6A7B73] block">Irigasi & Listrik</span>
              <strong className="text-[11px] text-[#11231D]">15 Jt</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
