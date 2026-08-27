import React, { useState } from 'react';
import { MobileDrawer } from '../../components/mobile/MobileDrawer';

export const MobileFinanceDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'kas' | 'verifikasi' | 'hpp' | 'payroll' | 'ai'>('kas');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [verifiedPOs, setVerifiedPOs] = useState<string[]>(['PO-024']);
  const [showPOModal, setShowPOModal] = useState<string | null>(null);

  // AI State
  const [aiInput, setAiInput] = useState('');
  const [aiMessages, setAiMessages] = useState<{ sender: 'user' | 'ai'; text: string; time: string }[]>([
    {
      sender: 'ai',
      text: 'Halo Tim Keuangan. Sistem Jurnal & Kas Jonggol aktif. Siap membantu audit atau rekonsiliasi.',
      time: '09:41',
    },
  ]);

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || aiInput;
    if (!query.trim()) return;

    const newMsg = { sender: 'user' as const, text: query, time: '09:42' };
    setAiMessages((prev) => [...prev, newMsg]);
    setAiInput('');

    setTimeout(() => {
      let reply = 'Audit Keuangan: Data mutasi dan faktur pajak terverifikasi valid.';
      const q = query.toLowerCase();
      if (q.includes('po') || q.includes('tagihan') || q.includes('verifikasi')) {
        reply = 'Verifikasi PO-026: Pupuk Hayati Rp 28,5 Jt sesuai pagu bulanan dan faktur pajak lengkap.';
      } else if (q.includes('hpp') || q.includes('margin') || q.includes('harga')) {
        reply = 'Kalkulasi HPP: Rata-rata HPP Melon Golden Jonggol Rp 9.200/Kg (margin off-taker 58,2%).';
      } else if (q.includes('payroll') || q.includes('gaji') || q.includes('mandor')) {
        reply = 'Payroll: Upah borongan 14 pekerja kebun minggu ini Rp 14.200.000 (Presensi GPS 100%).';
      }

      setAiMessages((prev) => [...prev, { sender: 'ai', text: reply, time: '09:42' }]);
    }, 500);
  };

  const handleVerifyPO = (poId: string) => {
    setVerifiedPOs([...verifiedPOs, poId]);
    setShowPOModal(null);
  };

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
            <i className="ri-wallet-3-fill"></i>
          </div>
          <div>
            <span className="font-extrabold text-[11.5px] tracking-tight text-white block leading-none">
              AGROJAYA <span className="text-[#C8E86B] font-bold text-[8.5px] ml-1">FINANCE</span>
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
        {/* ==================== 1. BUKU KAS ==================== */}
        {activeTab === 'kas' && (
          <div className="space-y-2.5 animate-in fade-in duration-150 pb-4">
            <div className="flex items-center justify-between pt-0.5">
              <div>
                <h1 className="font-extrabold text-[14px] text-[#17211E] tracking-tight m-0">
                  Buku Kas & Jurnal Keuangan
                </h1>
                <p className="text-[10px] text-[#5F6A65] m-0">Rekonsiliasi Kas Mandiri • Real-Time</p>
              </div>
              <span className="text-[9.5px] font-semibold text-[#5F6A65] bg-white px-2 py-0.5 rounded border border-[#DDE5DF]">
                27 Agu
              </span>
            </div>

            {/* Compact Hero Card */}
            <div className="bg-gradient-to-br from-[#061E18] to-[#0A382E] text-white rounded-[14px] p-3 shadow-md border border-[#1C8361]/30">
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-[10px] text-[#A3D9C9] font-medium">Saldo Kas Tersedia</span>
                <span className="text-[9px] font-extrabold text-[#C8E86B] bg-white/10 px-1.5 py-0.2 rounded-full">
                  Liquid
                </span>
              </div>
              <strong className="text-[20px] font-black text-white leading-tight tracking-tight block">
                Rp 486.250.000
              </strong>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/15 text-[10px]">
                <span className="text-[#C8E86B] font-bold">Inflow: +Rp 85,4 Jt</span>
                <span className="text-[#FF9D93] font-bold">Outflow: -Rp 42,1 Jt</span>
              </div>
            </div>

            {/* Verifikasi Quick Card */}
            <div className="bg-white rounded-[12px] p-2.5 border border-[#DDE5DF] shadow-2xs">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-extrabold text-[11.5px] text-[#17211E]">Verifikasi Faktur (Layer 1)</span>
                <button
                  type="button"
                  onClick={() => setActiveTab('verifikasi')}
                  className="text-[10px] font-bold text-[#0F5545] cursor-pointer"
                >
                  Periksa &gt;
                </button>
              </div>
              <div className="p-2 rounded-[8px] bg-[#F8FAF8] border border-[#DDE5DF] flex justify-between items-center text-[11px]">
                <div>
                  <strong className="block text-[#17211E]">PO-026: Pupuk Hayati</strong>
                  <span className="text-[#0F5545] font-bold">Rp 28.500.000</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPOModal('PO-026')}
                  className="px-2.5 py-1 bg-[#0F5545] text-white font-bold text-[10px] rounded-[6px] cursor-pointer"
                >
                  Verifikasi
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== 2. VERIFIKASI TAGIHAN ==================== */}
        {activeTab === 'verifikasi' && (
          <div className="space-y-2 animate-in fade-in duration-150 pb-4">
            <h2 className="font-extrabold text-[13.5px] text-[#17211E] m-0">Verifikasi Faktur Layer 1</h2>
            <div className="p-2.5 rounded-[12px] bg-white border border-[#DDE5DF] shadow-2xs space-y-1.5">
              <div className="flex justify-between items-start">
                <div>
                  <span className="bg-[#0B2F28] text-white text-[8.5px] px-1.5 py-0.2 rounded font-bold">PO-026</span>
                  <h3 className="font-bold text-[12px] text-[#17211E] mt-0.5 mb-0">Pupuk Hayati Organik & Drip</h3>
                  <span className="text-[10px] text-[#5F6A65]">Vendor: PT Agro Mitra</span>
                </div>
                <strong className="text-[12.5px] font-extrabold text-[#0F5545]">Rp 28,5 Jt</strong>
              </div>
              {verifiedPOs.includes('PO-026') ? (
                <div className="p-1.5 bg-[#E8F1EA] rounded-[6px] text-[10.5px] font-bold text-[#0F5545] text-center">
                  ✅ Terverifikasi (Diteruskan ke Direktur)
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowPOModal('PO-026')}
                  className="w-full py-1.5 bg-[#0F5545] text-white font-bold text-[11px] rounded-[6px] cursor-pointer"
                >
                  Validasi Faktur
                </button>
              )}
            </div>
          </div>
        )}

        {/* ==================== 3. KALKULATOR HPP ==================== */}
        {activeTab === 'hpp' && (
          <div className="space-y-2 animate-in fade-in duration-150 pb-4">
            <h2 className="font-extrabold text-[13.5px] text-[#17211E] m-0">Kalkulator HPP & Margin</h2>
            <div className="bg-white rounded-[12px] p-3 border border-[#DDE5DF] shadow-2xs space-y-1.5 text-[11px]">
              <div className="flex justify-between"><span>Biaya Bibit & Pupuk:</span><strong>Rp 4.200 / Kg</strong></div>
              <div className="flex justify-between"><span>Tenaga Kerja:</span><strong>Rp 3.100 / Kg</strong></div>
              <div className="flex justify-between"><span>Overhead:</span><strong>Rp 1.900 / Kg</strong></div>
              <div className="flex justify-between border-t border-[#DDE5DF] pt-1.5 font-bold text-[#0F5545] text-[12px]">
                <span>HPP Rata-rata:</span>
                <strong>Rp 9.200 / Kg</strong>
              </div>
              <div className="p-1.5 bg-[#E8F1EA] rounded-[6px] text-[#0F5545] font-bold text-center text-[10.5px]">
                Kontrak Off-taker: Rp 22.000 / Kg (Margin 58.2%)
              </div>
            </div>
          </div>
        )}

        {/* ==================== 4. PAYROLL PETANI ==================== */}
        {activeTab === 'payroll' && (
          <div className="space-y-2 animate-in fade-in duration-150 pb-4">
            <h2 className="font-extrabold text-[13.5px] text-[#17211E] m-0">Rekap Payroll Mandor</h2>
            <div className="p-2.5 rounded-[12px] bg-white border border-[#DDE5DF] shadow-2xs flex justify-between items-center text-[11.5px]">
              <div>
                <strong className="block text-[#17211E]">Mandor Regu A (Pak Joko)</strong>
                <span className="text-[10px] text-[#5F6A65]">14 Hari Kerja • 100% Selesai</span>
              </div>
              <span className="font-bold text-[#0F5545]">Rp 3.500.000</span>
            </div>
          </div>
        )}

        {/* ==================== 5. AI FINANCE ==================== */}
        {activeTab === 'ai' && (
          <div className="space-y-2 animate-in fade-in duration-150 flex flex-col h-full pb-3">
            <h2 className="font-extrabold text-[13.5px] text-[#17211E] m-0">Tanya AI Finance</h2>
            <div className="space-y-1.5 bg-[#F6F8F6] rounded-[12px] p-2.5 border border-[#DDE5DF] min-h-[190px] max-h-[240px] overflow-y-auto">
              {aiMessages.map((msg, idx) => (
                <div key={idx} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`max-w-[85%] rounded-[10px] p-2 text-[11px] ${
                      msg.sender === 'user' ? 'bg-[#0F5545] text-white' : 'bg-white text-[#17211E] border border-[#DDE5DF]'
                    }`}
                  >
                    <p className="m-0 leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-1 pt-0.5">
              <input
                type="text"
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Tanyakan analisis keuangan..."
                className="flex-1 px-2.5 py-1.5 rounded-[8px] bg-white border border-[#DDE5DF] text-[11px] outline-none"
              />
              <button
                type="button"
                onClick={() => handleSendMessage()}
                className="px-3 py-1.5 rounded-[8px] bg-[#0F5545] text-white font-bold text-[11px] cursor-pointer"
              >
                Kirim
              </button>
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
          onClick={() => setActiveTab('kas')}
          style={{ background: 'transparent', border: 'none', outline: 'none' }}
          className={`flex-1 flex flex-col items-center justify-center py-1 text-center cursor-pointer ${
            activeTab === 'kas' ? 'text-[#0F5545]' : 'text-[#5F6A65]'
          }`}
        >
          <i className="ri-wallet-3-fill text-[18px] leading-none mb-0.5"></i>
          <span className={`text-[9px] ${activeTab === 'kas' ? 'font-extrabold text-[#0F5545]' : 'font-medium'}`}>
            Buku Kas
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('verifikasi')}
          style={{ background: 'transparent', border: 'none', outline: 'none' }}
          className={`flex-1 flex flex-col items-center justify-center py-1 text-center cursor-pointer ${
            activeTab === 'verifikasi' ? 'text-[#0F5545]' : 'text-[#5F6A65]'
          }`}
        >
          <i className="ri-checkbox-circle-fill text-[18px] leading-none mb-0.5"></i>
          <span className={`text-[9px] ${activeTab === 'verifikasi' ? 'font-extrabold text-[#0F5545]' : 'font-medium'}`}>
            Verifikasi
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('hpp')}
          style={{ background: 'transparent', border: 'none', outline: 'none' }}
          className={`flex-1 flex flex-col items-center justify-center py-1 text-center cursor-pointer ${
            activeTab === 'hpp' ? 'text-[#0F5545]' : 'text-[#5F6A65]'
          }`}
        >
          <i className="ri-calculator-fill text-[18px] leading-none mb-0.5"></i>
          <span className={`text-[9px] ${activeTab === 'hpp' ? 'font-extrabold text-[#0F5545]' : 'font-medium'}`}>
            Kalkulator
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('payroll')}
          style={{ background: 'transparent', border: 'none', outline: 'none' }}
          className={`flex-1 flex flex-col items-center justify-center py-1 text-center cursor-pointer ${
            activeTab === 'payroll' ? 'text-[#0F5545]' : 'text-[#5F6A65]'
          }`}
        >
          <i className="ri-user-follow-fill text-[18px] leading-none mb-0.5"></i>
          <span className={`text-[9px] ${activeTab === 'payroll' ? 'font-extrabold text-[#0F5545]' : 'font-medium'}`}>
            Payroll
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
            AI Finance
          </span>
        </button>
      </div>

      {/* Drawer */}
      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSelectView={(viewId) => {
          if (viewId === 'buku_kas' || viewId === 'dasbor') setActiveTab('kas');
          else if (viewId === 'approval_po') setActiveTab('verifikasi');
          else if (viewId === 'kalkulator') setActiveTab('hpp');
          else if (viewId === 'sdm') setActiveTab('payroll');
          else if (viewId === 'tanya_ai') setActiveTab('ai');
        }}
      />

      {/* Modal */}
      {showPOModal && (
        <div className="absolute inset-0 bg-black/70 z-50 flex items-end justify-center p-0 backdrop-blur-xs">
          <div className="bg-white w-full rounded-t-[18px] p-3.5 animate-in slide-in-from-bottom duration-150">
            <h3 className="font-extrabold text-[13px] text-[#17211E] mb-1">Verifikasi {showPOModal}</h3>
            <p className="text-[11px] text-[#5F6A65] mb-2.5">
              Pagu Anggaran: <strong className="text-[#0F5545]">Rp 30 Jt (Sesuai)</strong>.
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleVerifyPO(showPOModal)}
                className="flex-1 py-2 bg-[#0F5545] text-white font-bold text-[11.5px] rounded-[8px] cursor-pointer"
              >
                Validasi & Teruskan
              </button>
              <button
                type="button"
                onClick={() => setShowPOModal(null)}
                className="px-3 py-2 border border-[#DDE5DF] text-[#5F6A65] font-bold text-[11.5px] rounded-[8px] cursor-pointer"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
