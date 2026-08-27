import React, { useState } from 'react';
import { MobileDrawer } from '../../components/mobile/MobileDrawer';

export const MobileManagerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tasklist' | 'po' | 'gudang' | 'timbangan' | 'ai'>('tasklist');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div
      className="w-full h-full flex flex-col justify-between overflow-hidden bg-[#071915] text-[#FAFBF8]"
      style={{ fontFamily: "'Manrope', sans-serif" }}
    >
      {/* 1. Sleek Compact Header */}
      <div
        style={{ height: '46px', minHeight: '46px' }}
        className="w-full bg-[#071E19] border-b border-[#14473B] px-3 flex items-center justify-between flex-shrink-0 z-20 shadow-xs"
      >
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-[7px] bg-[#C8E86B] text-[#051C16] flex items-center justify-center font-black text-sm shadow-xs">
            <i className="ri-building-2-fill"></i>
          </div>
          <div>
            <span className="font-extrabold text-[11.5px] tracking-tight text-white block leading-none">
              AGROJAYA <span className="text-[#C8E86B] font-bold text-[8.5px] ml-1">MANAJER OPS</span>
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsDrawerOpen(true)}
          className="px-2 py-1 rounded-[6px] bg-white/10 hover:bg-white/20 text-[10.5px] font-bold text-white flex items-center gap-1 cursor-pointer transition-colors"
        >
          <i className="ri-menu-3-line"></i>
          <span>Menu</span>
        </button>
      </div>

      {/* 2. Scrollable Body */}
      <div className="flex-1 min-h-0 overflow-y-auto px-3 py-2.5 space-y-2.5 bg-[#F8FAF8] text-[#17211E]">
        {/* ==================== 1. TASKLIST ==================== */}
        {activeTab === 'tasklist' && (
          <div className="space-y-2.5 animate-in fade-in duration-150 pb-4">
            <div className="flex items-center justify-between pt-0.5">
              <div>
                <h1 className="font-extrabold text-[14px] text-[#17211E] tracking-tight m-0">
                  Tasklist Mandor Lapangan
                </h1>
                <p className="text-[10px] text-[#5F6A65] m-0">SLA Tim Kebun: 92%</p>
              </div>
              <span className="text-[9.5px] font-semibold text-[#5F6A65] bg-white px-2 py-0.5 rounded border border-[#DDE5DF]">
                27 Agu
              </span>
            </div>

            <div className="p-2.5 bg-white rounded-[12px] border border-[#DDE5DF] shadow-2xs space-y-1">
              <div className="flex justify-between items-center">
                <strong className="text-[12px] text-[#17211E]">Blok A1: Pemupukan Drip NPK</strong>
                <span className="bg-[#E8F1EA] text-[#0F5545] font-bold text-[9.5px] px-1.5 py-0.2 rounded">
                  92% Selesai
                </span>
              </div>
              <p className="text-[10px] text-[#5F6A65] m-0">Mandor: Pak Joko (8 Petani) • 400 Lubang</p>
            </div>

            <div className="p-2.5 bg-white rounded-[12px] border border-[#DDE5DF] shadow-2xs space-y-1">
              <div className="flex justify-between items-center">
                <strong className="text-[12px] text-[#17211E]">Blok B2: Pemasangan Ajir Bambu</strong>
                <span className="bg-[#FAF5EE] text-[#D68B21] font-bold text-[9.5px] px-1.5 py-0.2 rounded">
                  Berjalan
                </span>
              </div>
              <p className="text-[10px] text-[#5F6A65] m-0">Mandor: Pak Budi (6 Petani) • 250 Batang</p>
            </div>
          </div>
        )}

        {/* ==================== 2. AJUKAN PO ==================== */}
        {activeTab === 'po' && (
          <div className="space-y-2 animate-in fade-in duration-150 pb-4">
            <h2 className="font-extrabold text-[13.5px] text-[#17211E] m-0">Pengajuan Belanja (PO)</h2>
            <div className="p-3 bg-white rounded-[12px] border border-[#DDE5DF] shadow-2xs space-y-2 text-[11px]">
              <div>
                <label className="block font-bold text-[#17211E] mb-1">Nama Kebutuhan</label>
                <input
                  type="text"
                  defaultValue="Pupuk Mikro MgSO4 & NPK (10 Sak)"
                  className="w-full px-2.5 py-1.5 rounded-[6px] border border-[#DDE5DF] text-[11px]"
                />
              </div>
              <div>
                <label className="block font-bold text-[#17211E] mb-1">Estimasi Biaya</label>
                <input
                  type="text"
                  defaultValue="Rp 4.500.000"
                  className="w-full px-2.5 py-1.5 rounded-[6px] border border-[#DDE5DF] text-[11px]"
                />
              </div>
              {isSubmitted ? (
                <div className="p-1.5 bg-[#E8F1EA] text-[#0F5545] rounded-[6px] text-[10.5px] font-bold text-center">
                  ✅ Berhasil Diajukan ke Keuangan
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsSubmitted(true)}
                  className="w-full py-2 bg-[#0F5545] text-white font-bold text-[11px] rounded-[6px] cursor-pointer"
                >
                  Kirim Pengajuan
                </button>
              )}
            </div>
          </div>
        )}

        {/* ==================== 3. GUDANG ==================== */}
        {activeTab === 'gudang' && (
          <div className="space-y-2 animate-in fade-in duration-150 pb-4">
            <h2 className="font-extrabold text-[13.5px] text-[#17211E] m-0">Stok Gudang Jonggol</h2>
            <div className="bg-white rounded-[12px] p-3 border border-[#DDE5DF] shadow-2xs space-y-2 text-[11px]">
              <div className="flex justify-between"><span>Pupuk NPK 16-16-16:</span><strong className="text-[#0F5545]">45 Sak (Aman)</strong></div>
              <div className="flex justify-between"><span>Benih Melon Golden:</span><strong className="text-[#0F5545]">12 Pack (Aman)</strong></div>
              <div className="flex justify-between"><span>Pestisida Nabati:</span><strong className="text-[#D68B21]">4 Botol (Restock)</strong></div>
            </div>
          </div>
        )}

        {/* ==================== 4. TIMBANGAN ==================== */}
        {activeTab === 'timbangan' && (
          <div className="space-y-2 animate-in fade-in duration-150 pb-4">
            <h2 className="font-extrabold text-[13.5px] text-[#17211E] m-0">Jembatan Timbang PKS</h2>
            <div className="p-2.5 bg-white rounded-[12px] border border-[#DDE5DF] shadow-2xs space-y-1">
              <div className="flex justify-between">
                <span className="badge bg-[#0B2F28] text-white text-[8.5px] px-1.5 py-0.2 rounded font-bold">SLIP-WB-092</span>
                <strong className="text-[13px] font-bold text-[#0F5545]">Netto: 8.420 Kg</strong>
              </div>
              <span className="text-[10px] text-[#5F6A65]">Truk B 9182 JYR • Melon Golden Grade A</span>
            </div>
          </div>
        )}

        {/* ==================== 5. AI OPS ==================== */}
        {activeTab === 'ai' && (
          <div className="space-y-2 animate-in fade-in duration-150 pb-4">
            <h2 className="font-extrabold text-[13.5px] text-[#17211E] m-0">AI Asisten Operasional</h2>
            <div className="p-2.5 bg-white rounded-[12px] border border-[#DDE5DF] shadow-2xs text-[11px] space-y-1.5">
              <div>💡 <strong>SLA Tips:</strong> Tambah 2 orang di Blok B2 untuk pemasangan ajir sebelum hujan.</div>
              <div>📦 <strong>Restock:</strong> Pesan pupuk MgSO4 3 hari sebelum fase pembuahan.</div>
            </div>
          </div>
        )}
      </div>

      {/* 3. Sleek Bottom Nav (Height: 54px) */}
      <div
        style={{
          height: '54px',
          minHeight: '54px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          zIndex: 50,
        }}
        className="w-full bg-white border-t border-[#DDE5DF] px-1 shadow-md flex-shrink-0"
      >
        <button
          type="button"
          onClick={() => setActiveTab('tasklist')}
          style={{ background: 'transparent', border: 'none', outline: 'none' }}
          className={`flex-1 flex flex-col items-center justify-center py-1 text-center cursor-pointer ${
            activeTab === 'tasklist' ? 'text-[#0F5545]' : 'text-[#5F6A65]'
          }`}
        >
          <i className="ri-task-fill text-[18px] leading-none mb-0.5"></i>
          <span className={`text-[9px] ${activeTab === 'tasklist' ? 'font-extrabold text-[#0F5545]' : 'font-medium'}`}>
            Tasklist
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('po')}
          style={{ background: 'transparent', border: 'none', outline: 'none' }}
          className={`flex-1 flex flex-col items-center justify-center py-1 text-center cursor-pointer ${
            activeTab === 'po' ? 'text-[#0F5545]' : 'text-[#5F6A65]'
          }`}
        >
          <i className="ri-shopping-cart-2-fill text-[18px] leading-none mb-0.5"></i>
          <span className={`text-[9px] ${activeTab === 'po' ? 'font-extrabold text-[#0F5545]' : 'font-medium'}`}>
            Ajukan PO
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('gudang')}
          style={{ background: 'transparent', border: 'none', outline: 'none' }}
          className={`flex-1 flex flex-col items-center justify-center py-1 text-center cursor-pointer ${
            activeTab === 'gudang' ? 'text-[#0F5545]' : 'text-[#5F6A65]'
          }`}
        >
          <i className="ri-archive-fill text-[18px] leading-none mb-0.5"></i>
          <span className={`text-[9px] ${activeTab === 'gudang' ? 'font-extrabold text-[#0F5545]' : 'font-medium'}`}>
            Gudang
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('timbangan')}
          style={{ background: 'transparent', border: 'none', outline: 'none' }}
          className={`flex-1 flex flex-col items-center justify-center py-1 text-center cursor-pointer ${
            activeTab === 'timbangan' ? 'text-[#0F5545]' : 'text-[#5F6A65]'
          }`}
        >
          <i className="ri-scales-3-fill text-[18px] leading-none mb-0.5"></i>
          <span className={`text-[9px] ${activeTab === 'timbangan' ? 'font-extrabold text-[#0F5545]' : 'font-medium'}`}>
            Timbangan
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('ai')}
          style={{ background: 'transparent', border: 'none', outline: 'none' }}
          className={`flex-1 flex flex-col items-center justify-center py-1 text-center cursor-pointer ${
            activeTab === 'ai' ? 'text-[#0F5545]' : 'text-[#5F6A65]'
          }`}
        >
          <i className="ri-sparkling-fill text-[18px] leading-none mb-0.5"></i>
          <span className={`text-[9px] ${activeTab === 'ai' ? 'font-extrabold text-[#0F5545]' : 'font-medium'}`}>
            AI Ops
          </span>
        </button>
      </div>

      {/* Drawer */}
      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSelectView={(viewId) => {
          if (viewId === 'tasklist' || viewId === 'dasbor') setActiveTab('tasklist');
          else if (viewId === 'approval_po') setActiveTab('po');
          else if (viewId === 'gudang') setActiveTab('gudang');
          else if (viewId === 'timbangan') setActiveTab('timbangan');
          else if (viewId === 'tanya_ai') setActiveTab('ai');
        }}
      />
    </div>
  );
};
