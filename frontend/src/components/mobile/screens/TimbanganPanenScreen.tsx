import React, { useState } from 'react';
import { useSmartFarmStore } from '../../../store/smartFarmStore';

interface TimbanganPanenScreenProps {
  onBack?: () => void;
}

export const TimbanganPanenScreen: React.FC<TimbanganPanenScreenProps> = () => {
  const { weighbridgeSlips, addWeighbridgeSlip } = useSmartFarmStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [commodity, setCommodity] = useState('Golden Melon Alisha');
  const [blockOrigin, setBlockOrigin] = useState('Blok A (Sentra)');
  const [truckNo, setTruckNo] = useState('F 8892 AG');
  const [driver, setDriver] = useState('Pak Joko');
  const [bruto, setBruto] = useState('4200');
  const [tarra, setTarra] = useState('1800');
  const [grade, setGrade] = useState<'Grade A' | 'Grade B' | 'Grade C'>('Grade A');
  const [buyer, setBuyer] = useState('Super Indo & Ekspor');
  const [pricePerKg, setPricePerKg] = useState('26000');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Dynamic calculations
  const totalNettoKg = weighbridgeSlips.reduce((sum, s) => sum + s.netto, 0);
  const totalGrossRevenue = weighbridgeSlips.reduce((sum, s) => sum + s.totalValue, 0);

  const handleSaveWeighbridgeSlip = (e: React.FormEvent) => {
    e.preventDefault();
    const b = parseFloat(bruto) || 0;
    const t = parseFloat(tarra) || 0;
    const netto = Math.max(0, b - t);
    const p = parseFloat(pricePerKg) || 25000;
    const totalValue = netto * p;
    const now = new Date();
    const dateStr = now.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

    addWeighbridgeSlip({
      slipNo: `SLIP-WB-${Date.now().toString().slice(-4)}`,
      date: `${dateStr} • ${timeStr} WIB`,
      truckNo: truckNo.trim() || 'F 8892 AG',
      driver: driver.trim() || 'Pak Joko',
      commodity,
      blockOrigin,
      bruto: b,
      tarra: t,
      netto,
      grade,
      buyer: buyer.trim() || 'Pasar Induk',
      pricePerKg: p,
      totalValue,
    });

    setSuccessToast(`✅ Slip Timbangan ${netto.toLocaleString('id-ID')} Kg berhasil disimpan & tersambung ke Web!`);
    setIsAddModalOpen(false);
    setTimeout(() => setSuccessToast(null), 4000);
  };

  return (
    <div
      className="space-y-3.5 animate-in fade-in duration-150 antialiased text-[#11231D]"
      style={{
        fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 88px)',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {/* Toast */}
      {successToast && (
        <div className="p-3 bg-[#064E3B] text-white rounded-[14px] text-[12px] font-bold border border-[#C8E86B]/40 shadow-lg flex items-center gap-2 animate-in slide-in-from-top duration-200">
          <i className="ri-checkbox-circle-fill text-[#C8E86B] text-base shrink-0"></i>
          <span>{successToast}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#0F5545] to-[#04201A] text-white rounded-[18px] p-4 shadow-md border border-[#1FB88B]/30 relative overflow-hidden">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#C8E86B]">
              TIMBANGAN DIGITAL & QUALITY GRADING
            </span>
            <h1 className="text-[20px] font-black tracking-tight mt-0.5 m-0 text-white">
              {totalNettoKg.toLocaleString('id-ID')} Kg Panen Terverifikasi
            </h1>
          </div>
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="w-8 h-8 rounded-full bg-[#C8E86B] text-[#08201A] flex items-center justify-center text-base font-bold shadow-md hover:bg-[#b8d85c] cursor-pointer shrink-0"
            title="Catat Timbangan Baru"
          >
            <i className="ri-add-line"></i>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-3 pt-2.5 border-t border-white/15">
          <div className="bg-white/10 rounded-[10px] p-2">
            <span className="text-[9px] text-[#A3D9C9] block">Total Slip Masuk</span>
            <strong className="text-[14px] font-black text-[#C8E86B] block mt-0.5">
              {weighbridgeSlips.length} Transaksi Timbang
            </strong>
          </div>
          <div className="bg-white/10 rounded-[10px] p-2">
            <span className="text-[9px] text-[#A3D9C9] block">Total Omset Kotor Panen</span>
            <strong className="text-[14px] font-black text-white block mt-0.5">
              Rp {(totalGrossRevenue / 1e6).toFixed(1)} Jt
            </strong>
          </div>
        </div>
      </div>

      {/* Batch Records */}
      <div className="space-y-2.5">
        <div className="flex justify-between items-center px-0.5">
          <span className="text-[11px] font-black text-[#0B3B30] uppercase tracking-wider block">
            BATCH TIMBANGAN & DOKUMEN PENIMBANGAN
          </span>
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="text-[10px] font-bold text-[#0F5545] bg-[#E8F3ED] px-2 py-0.5 rounded-full border border-[#0F5545]/20 cursor-pointer"
          >
            + Timbang Baru
          </button>
        </div>

        <div className="space-y-2.5">
          {weighbridgeSlips.map((batch) => (
            <div
              key={batch.id}
              className="bg-white rounded-[16px] p-3.5 border border-[#E2EAE5] shadow-[0_2px_8px_rgba(0,0,0,0.03)] space-y-2"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[9.5px] font-bold text-[#0F5545] bg-[#E8F3ED] px-2 py-0.5 rounded-full inline-block mb-1">
                    {batch.slipNo}
                  </span>
                  <h2 className="text-[13px] font-black text-[#11231D] m-0">
                    {batch.commodity} ({batch.blockOrigin})
                  </h2>
                  <span className="text-[10px] text-[#6A7B73] block mt-0.5">{batch.date}</span>
                </div>
                <div className="text-right">
                  <span className="text-[13.5px] font-black text-[#0F5545] block">
                    {batch.netto.toLocaleString('id-ID')} Kg
                  </span>
                  <span className="text-[10px] font-extrabold text-[#C8E86B] bg-[#0F5545] px-1.5 py-0.2 rounded">
                    {batch.grade}
                  </span>
                </div>
              </div>

              {/* Breakdown Details */}
              <div className="bg-[#F8FAF8] p-2.5 rounded-[12px] border border-[#E8F0EB] text-[10.5px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-[#6A7B73]">🚛 Armada & Supir:</span>
                  <strong className="text-[#11231D]">{batch.truckNo} ({batch.driver})</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6A7B73]">⚖️ Bruto / Tara / Netto:</span>
                  <strong className="text-[#11231D]">{batch.bruto} - {batch.tarra} = {batch.netto} Kg</strong>
                </div>
                <div className="flex justify-between border-t border-[#E2EAE5] pt-1 mt-1">
                  <span className="text-[#6A7B73]">🤝 Offtaker / Pembeli:</span>
                  <strong className="text-[#2563EB]">{batch.buyer}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6A7B73]">💰 Nilai Transaksi:</span>
                  <strong className="text-[#0F5545]">Rp {batch.totalValue.toLocaleString('id-ID')} (@ Rp {batch.pricePerKg.toLocaleString('id-ID')}/Kg)</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Weighbridge Slip Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[20px] w-full max-w-sm p-4 space-y-3.5 shadow-2xl border border-[#E2EAE5] animate-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <div>
                <span className="text-[10px] font-black text-[#0F5545] uppercase">Input Timbangan</span>
                <h3 className="text-[15px] font-black text-[#11231D] m-0">Catat Penimbangan Panen</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveWeighbridgeSlip} className="space-y-2.5 text-[11.5px]">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-[#5F6A65] block mb-1">Komoditas:</label>
                  <input
                    type="text"
                    required
                    value={commodity}
                    onChange={(e) => setCommodity(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-[10px] border border-[#DDE5DF] font-medium outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-[#5F6A65] block mb-1">Asal Blok:</label>
                  <input
                    type="text"
                    required
                    value={blockOrigin}
                    onChange={(e) => setBlockOrigin(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-[10px] border border-[#DDE5DF] font-medium outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-[#5F6A65] block mb-1">No. Plat Truk:</label>
                  <input
                    type="text"
                    required
                    value={truckNo}
                    onChange={(e) => setTruckNo(e.target.value)}
                    placeholder="F 8892 AG"
                    className="w-full px-2.5 py-1.5 rounded-[10px] border border-[#DDE5DF] font-medium outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-[#5F6A65] block mb-1">Nama Supir / Pengemudi:</label>
                  <input
                    type="text"
                    required
                    value={driver}
                    onChange={(e) => setDriver(e.target.value)}
                    placeholder="Pak Joko"
                    className="w-full px-2.5 py-1.5 rounded-[10px] border border-[#DDE5DF] font-medium outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-[#5F6A65] block mb-1">Bruto (Kg):</label>
                  <input
                    type="number"
                    required
                    value={bruto}
                    onChange={(e) => setBruto(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-[10px] border border-[#DDE5DF] font-bold outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-[#5F6A65] block mb-1">Tara (Kg):</label>
                  <input
                    type="number"
                    required
                    value={tarra}
                    onChange={(e) => setTarra(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-[10px] border border-[#DDE5DF] font-bold outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-[#5F6A65] block mb-1">Grade Kualitas:</label>
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value as any)}
                    className="w-full px-2 py-1.5 rounded-[10px] border border-[#DDE5DF] font-bold outline-none"
                  >
                    <option value="Grade A">Grade A (Super Premium)</option>
                    <option value="Grade B">Grade B (Retail Pasar)</option>
                    <option value="Grade C">Grade C (Olahan Industri)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-[#5F6A65] block mb-1">Harga / Kg (Rp):</label>
                  <input
                    type="number"
                    required
                    value={pricePerKg}
                    onChange={(e) => setPricePerKg(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-[10px] border border-[#DDE5DF] font-bold outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-[#5F6A65] block mb-1">Offtaker / Pembeli:</label>
                <input
                  type="text"
                  required
                  value={buyer}
                  onChange={(e) => setBuyer(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-[10px] border border-[#DDE5DF] font-medium outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#0F5545] hover:bg-[#0B3B30] text-white font-black text-[12px] rounded-[10px] shadow-md cursor-pointer active:scale-95 transition-transform"
                >
                  Simpan Slip & Terbitkan Tiket Timbang
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
