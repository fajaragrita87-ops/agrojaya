import React, { useState } from 'react';
import { useSmartFarmStore } from '../../../store/smartFarmStore';

interface AlokasiModalScreenProps {
  onBack?: () => void;
}

export const AlokasiModalScreen: React.FC<AlokasiModalScreenProps> = () => {
  const { purchaseOrders, createPO } = useSmartFarmStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [poTitle, setPoTitle] = useState('');
  const [poCategory, setPoCategory] = useState<'Saprotan' | 'Bibit' | 'Pupuk' | 'Infrastruktur' | 'Alsintan'>('Pupuk');
  const [poAmount, setPoAmount] = useState('25000000');
  const [poVendor, setPoVendor] = useState('CV Agro Sentosa Mandiri');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Dynamic calculation from PO Store
  const totalApprovedPO = purchaseOrders
    .filter((p) => p.status === 'APPROVED' || p.status === 'PENDING_INVESTOR')
    .reduce((sum, p) => sum + p.amount, 0);

  const saprotanPO = purchaseOrders
    .filter((p) => (p.category === 'Saprotan' || p.category === 'Pupuk' || p.category === 'Bibit') && (p.status === 'APPROVED' || p.status === 'PENDING_INVESTOR'))
    .reduce((sum, p) => sum + p.amount, 0);

  const infraPO = purchaseOrders
    .filter((p) => (p.category === 'Infrastruktur' || p.category === 'Alsintan') && (p.status === 'APPROVED' || p.status === 'PENDING_INVESTOR'))
    .reduce((sum, p) => sum + p.amount, 0);

  const totalPagu = 2500000000;
  const landClearingBudget = 875000000;
  const greenhouseBudget = 750000000;
  const bibitPupukBudget = 500000000;
  const cadanganBudget = 375000000;

  const realisasiBibitPupuk = Math.min(bibitPupukBudget, 390000000 + saprotanPO);
  const realisasiGreenhouse = Math.min(greenhouseBudget, 750000000 + infraPO);
  const realisasiLahan = landClearingBudget;
  const sisaKasCadangan = Math.max(0, totalPagu - (realisasiLahan + realisasiGreenhouse + realisasiBibitPupuk));

  const percentLahan = Math.round((realisasiLahan / totalPagu) * 100);
  const percentGreenhouse = Math.round((realisasiGreenhouse / totalPagu) * 100);
  const percentBibitPupuk = Math.round((realisasiBibitPupuk / totalPagu) * 100);
  const percentCadangan = Math.max(0, 100 - (percentLahan + percentGreenhouse + percentBibitPupuk));

  const modalAllocations = [
    {
      category: 'Akuisisi & Land Clearing (2.0 Ha)',
      budget: `Rp ${realisasiLahan.toLocaleString('id-ID')}`,
      pagu: 'Rp 875 Jt',
      percent: percentLahan,
      color: '#0F5545',
      status: 'Realisasi 100% (Selesai)',
    },
    {
      category: 'Greenhouse & Irigasi Presisi Drip',
      budget: `Rp ${realisasiGreenhouse.toLocaleString('id-ID')}`,
      pagu: 'Rp 750 Jt',
      percent: percentGreenhouse,
      color: '#1FB88B',
      status: infraPO > 0 ? `Realisasi +PO Rp ${(infraPO / 1e6).toFixed(1)} Jt` : 'Realisasi 100%',
    },
    {
      category: 'Benih Unggul F1 & Pupuk Organik',
      budget: `Rp ${realisasiBibitPupuk.toLocaleString('id-ID')}`,
      pagu: 'Rp 500 Jt',
      percent: percentBibitPupuk,
      color: '#3B82F6',
      status: `Terserap ${Math.round((realisasiBibitPupuk / bibitPupukBudget) * 100)}% (${purchaseOrders.length} Transaksi)`,
    },
    {
      category: 'Cadangan Kas & Operasional',
      budget: `Rp ${sisaKasCadangan.toLocaleString('id-ID')}`,
      pagu: `Rp ${(cadanganBudget / 1e6).toFixed(0)} Jt`,
      percent: percentCadangan,
      color: '#F59E0B',
      status: 'Cadangan Kas Likuid Aman',
    },
  ];

  const shareHolders = [
    {
      name: 'Konsorsium Investor Utama',
      share: '65.0%',
      value: `Rp ${(totalPagu * 0.65).toLocaleString('id-ID')}`,
      returnEst: `Rp ${(totalPagu * 0.65 * 0.3).toLocaleString('id-ID')} (30% ROI)`,
    },
    {
      name: 'PT Smart Farm Nusantara (Pengelola)',
      share: '35.0%',
      value: `Rp ${(totalPagu * 0.35).toLocaleString('id-ID')}`,
      returnEst: 'Bagi Hasil Kinerja Kebun',
    },
  ];

  const handleCreateNewAllocation = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(poAmount) || 10000000;
    createPO({
      title: poTitle.trim() || 'Pengadaan Tambahan Nutrisi Kebun',
      vendor: poVendor.trim() || 'Distributor Saprotan Agro',
      amount: amountNum,
      category: poCategory,
      requester: 'Manajer Operasional Lapangan',
      targetLand: 'Sentra Kebun Jonggol (2.0 Ha)',
      notes: 'Alokasi pengadaan modal operasional diajukan via Mobile App',
      proformaPhoto: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    });

    setSuccessToast(`✅ Pengajuan Alokasi PO Rp ${amountNum.toLocaleString('id-ID')} berhasil dibuat & tersambung ke Web!`);
    setIsAddModalOpen(false);
    setPoTitle('');
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

      {/* Header Card */}
      <div className="bg-gradient-to-br from-[#0B3B30] to-[#04201A] text-white rounded-[18px] p-4 shadow-md border border-[#14473B] relative overflow-hidden">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#C8E86B] block">
              STRUKTUR MODAL & KEPEMILIKAN
            </span>
            <h1 className="text-[20px] font-black tracking-tight mt-0.5 m-0 text-white">
              Rp {totalPagu.toLocaleString('id-ID')}
            </h1>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="bg-[#C8E86B]/20 border border-[#C8E86B]/40 text-[#C8E86B] text-[9.5px] font-extrabold px-2.5 py-1 rounded-full">
              100% Terdanai
            </span>
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="w-7 h-7 rounded-full bg-[#C8E86B] text-[#08201A] flex items-center justify-center text-sm font-bold shadow-sm hover:bg-[#b8d85c] cursor-pointer"
              title="Tambah Alokasi PO"
            >
              <i className="ri-add-line"></i>
            </button>
          </div>
        </div>

        {/* Progress Bar Multi-Segment */}
        <div className="mt-3.5 pt-2 border-t border-white/10">
          <div className="flex justify-between text-[10px] text-[#A3D9C9] mb-1 font-semibold">
            <span>Alokasi Terhubung ({purchaseOrders.length} PO Riil)</span>
            <span>Total Realisasi: Rp {(totalApprovedPO / 1e6).toFixed(0)} Jt</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-white/10 flex overflow-hidden">
            <div style={{ width: `${percentLahan}%` }} className="bg-[#1FB88B]" title={`Lahan ${percentLahan}%`} />
            <div style={{ width: `${percentGreenhouse}%` }} className="bg-[#3B82F6]" title={`Greenhouse ${percentGreenhouse}%`} />
            <div style={{ width: `${percentBibitPupuk}%` }} className="bg-[#F59E0B]" title={`Bibit/Pupuk ${percentBibitPupuk}%`} />
            <div style={{ width: `${percentCadangan}%` }} className="bg-[#C8E86B]" title={`Cadangan ${percentCadangan}%`} />
          </div>
        </div>
      </div>

      {/* Section 1: Rincian Pos Alokasi */}
      <div className="space-y-2">
        <div className="flex justify-between items-center px-0.5">
          <span className="text-[11px] font-black text-[#0B3B30] uppercase tracking-wider block">
            RINCIAN ALOKASI DANA PRODUKTIF
          </span>
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="text-[10px] font-bold text-[#0F5545] bg-[#E8F3ED] px-2 py-0.5 rounded-full border border-[#0F5545]/20 cursor-pointer"
          >
            + Alokasi Baru
          </button>
        </div>

        <div className="space-y-2">
          {modalAllocations.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[14px] p-3 border border-[#E2EAE5] shadow-[0_1px_4px_rgba(0,0,0,0.03)] flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-[10px] flex items-center justify-center font-bold text-xs text-white shadow-2xs shrink-0"
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
                <span className="text-[9px] text-[#8C9E95]">Pagu: {item.pagu}</span>
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

      {/* Add Allocation / PO Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-xs flex items-center justify-center p-3.5 overflow-y-auto">
          <div className="bg-white rounded-[20px] w-full max-w-sm p-4 space-y-3.5 shadow-2xl border border-[#E2EAE5] animate-in zoom-in-95 duration-150 max-h-[88dvh] overflow-y-auto my-auto">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100 sticky top-0 bg-white z-10">
              <div>
                <span className="text-[10px] font-black text-[#0F5545] uppercase">Input Pengadaan</span>
                <h3 className="text-[15px] font-black text-[#11231D] m-0">Tambah Alokasi Belanja PO</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateNewAllocation} className="space-y-2.5 text-[11.5px]">
              <div>
                <label className="text-[10.5px] font-bold text-[#5F6A65] block mb-1">Nama Barang / Pengadaan:</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Pupuk Organik NPK 50 Karung"
                  value={poTitle}
                  onChange={(e) => setPoTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-[10px] border border-[#DDE5DF] font-medium outline-none focus:border-[#0F5545]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10.5px] font-bold text-[#5F6A65] block mb-1">Kategori Pos:</label>
                  <select
                    value={poCategory}
                    onChange={(e) => setPoCategory(e.target.value as any)}
                    className="w-full px-2.5 py-2 rounded-[10px] border border-[#DDE5DF] font-bold outline-none"
                  >
                    <option value="Pupuk">Pupuk & Nutrisi</option>
                    <option value="Bibit">Bibit Unggul</option>
                    <option value="Saprotan">Saprotan</option>
                    <option value="Infrastruktur">Infrastruktur/Drip</option>
                    <option value="Alsintan">Alsintan</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10.5px] font-bold text-[#5F6A65] block mb-1">Nominal (Rp):</label>
                  <input
                    type="number"
                    required
                    value={poAmount}
                    onChange={(e) => setPoAmount(e.target.value)}
                    className="w-full px-3 py-2 rounded-[10px] border border-[#DDE5DF] font-bold outline-none focus:border-[#0F5545]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10.5px] font-bold text-[#5F6A65] block mb-1">Vendor / Toko Penyedia:</label>
                <input
                  type="text"
                  required
                  value={poVendor}
                  onChange={(e) => setPoVendor(e.target.value)}
                  className="w-full px-3 py-2 rounded-[10px] border border-[#DDE5DF] font-medium outline-none focus:border-[#0F5545]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#0F5545] hover:bg-[#0B3B30] text-white font-black text-[12px] rounded-[10px] shadow-md cursor-pointer active:scale-95 transition-transform"
                >
                  Ajukan Alokasi Modal & Terbitkan PO
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
