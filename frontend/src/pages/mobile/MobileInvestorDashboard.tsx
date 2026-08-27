import React, { useState } from 'react';
import { MobileDrawer } from '../../components/mobile/MobileDrawer';
import { MobileTreeScannerModal } from '../../components/mobile/MobileTreeScannerModal';
import { MobileMenuHubView } from '../../components/mobile/MobileMenuHubView';
import { MobileProfileSettingsModal } from '../../components/mobile/MobileProfileSettingsModal';
import { MobileNotificationsModal } from '../../components/mobile/MobileNotificationsModal';
import { PetaGisMobileScreen } from '../../components/mobile/screens/PetaGisMobileScreen';
import { KtpSampelScreen } from '../../components/mobile/screens/KtpSampelScreen';
import { AlokasiModalScreen } from '../../components/mobile/screens/AlokasiModalScreen';
import { KalkulatorHppScreen } from '../../components/mobile/screens/KalkulatorHppScreen';
import { LaporanAuditScreen } from '../../components/mobile/screens/LaporanAuditScreen';
import { Bukti8TahapScreen } from '../../components/mobile/screens/Bukti8TahapScreen';
import { ScanDaunAiScreen } from '../../components/mobile/screens/ScanDaunAiScreen';
import { StokGudangScreen } from '../../components/mobile/screens/StokGudangScreen';
import { TimbanganPanenScreen } from '../../components/mobile/screens/TimbanganPanenScreen';
import { MasterKomoditasScreen } from '../../components/mobile/screens/MasterKomoditasScreen';
import { JadwalTasklistScreen } from '../../components/mobile/screens/JadwalTasklistScreen';
import { PresensiUpahScreen } from '../../components/mobile/screens/PresensiUpahScreen';
import { KelolaUserScreen } from '../../components/mobile/screens/KelolaUserScreen';
import { callLiveAI } from '../../services/aiService';

import { useSmartFarmStore } from '../../store/smartFarmStore';

export const MobileInvestorDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    | 'menu_hub'
    | 'portofolio'
    | 'approval'
    | 'fisik_gis'
    | 'arus_kas'
    | 'ai_konsultan'
    | 'alokasi_modal'
    | 'kalkulator'
    | 'laporan_audit'
    | 'siklus_lahan'
    | 'ktp_sampel'
    | 'scan_daun'
    | 'gudang'
    | 'timbangan'
    | 'master_komoditas'
    | 'jadwal_tugas'
    | 'presensi_sdm'
    | 'kelola_user'
  >('menu_hub');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showNotifModal, setShowNotifModal] = useState(false);
  const [showTreeScanner, setShowTreeScanner] = useState(false);
  const [showPOModal, setShowPOModal] = useState<string | null>(null);

  const { purchaseOrders, authorizePOByInvestor } = useSmartFarmStore();

  // AI Chat Messages State for Investor
  const [aiInput, setAiInput] = useState('');
  const [aiMessages, setAiMessages] = useState<{ sender: 'user' | 'ai'; text: string; time: string }[]>([
    {
      sender: 'ai',
      text: 'Selamat datang, Bapak Investor. Data modal & valuasi fisik Jonggol (2.0 Ha) terverifikasi independen real-time.',
      time: '09:41',
    },
  ]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || aiInput;
    if (!query.trim()) return;

    const timeStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    const newMsg = { sender: 'user' as const, text: query, time: timeStr };
    setAiMessages((prev) => [...prev, newMsg]);
    setAiInput('');

    const historyForAI = aiMessages.map((m) => ({
      role: m.sender === 'user' ? ('user' as const) : ('assistant' as const),
      content: m.text,
    }));

    try {
      const res = await callLiveAI(query, historyForAI, 'INVESTOR', 'Bapak Hendrawan Kusuma (Investor)');
      setAiMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: res.text,
          time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch {
      setAiMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: 'Maaf, terjadi kendala saat memproses konsultasi AI. Silakan coba sesaat lagi.',
          time: timeStr,
        },
      ]);
    }
  };

  const handleApprovePO = (poId: string) => {
    authorizePOByInvestor(poId);
    setShowPOModal(null);
  };

  return (
    <div
      className="w-full h-full flex flex-col overflow-hidden bg-[#F4F7F5] text-[#17211E] relative"
      style={{ fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      {/* 1. Header Forest Emerald with Curved Corners & Subtle Batik/Botanical Silhouette Overlay */}
      <div className="w-full bg-gradient-to-r from-[#064E3B] via-[#047857] to-[#065F46] rounded-b-[26px] px-4 py-4 min-h-[76px] flex items-center justify-between flex-shrink-0 z-20 shadow-[0_12px_28px_-6px_rgba(6,78,59,0.38)] relative overflow-hidden border-b border-white/15 antialiased">
        {/* Subtle Batik & Botanical Leaf Veins Silhouette Background Overlay */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.15]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 400 100"
          preserveAspectRatio="none"
        >
          <path
            d="M-20 60 Q 40 10, 100 40 T 220 20 T 340 50 T 440 20"
            fill="none"
            stroke="#C8E86B"
            strokeWidth="1.2"
            strokeDasharray="4 3"
          />
          <path
            d="M-10 85 Q 60 30, 140 70 T 280 40 T 420 80"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1"
            opacity="0.8"
          />
          <path
            d="M320 -10 C340 30, 390 40, 420 10 C390 60, 330 50, 320 -10 Z"
            fill="#C8E86B"
            opacity="0.6"
          />
          <path
            d="M40 -15 C60 25, 110 35, 130 5 C100 45, 50 35, 40 -15 Z"
            fill="#A7F3D0"
            opacity="0.5"
          />
          <circle cx="360" cy="50" r="18" fill="none" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.4" strokeDasharray="2 2" />
          <circle cx="80" cy="20" r="14" fill="none" stroke="#C8E86B" strokeWidth="0.8" opacity="0.4" />
        </svg>

        {/* Brand & Role Identity */}
        <div className="flex items-center gap-2.5 relative z-10">
          <div className="w-10 h-10 rounded-[13px] bg-gradient-to-tr from-[#0F5545] to-[#1FB88B] border border-white/30 flex items-center justify-center text-[#C8E86B] shadow-xs">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2 stroke-linecap-round stroke-linejoin-round">
              <path d="M12 3C8 3 4 7 4 12c0 4 3 7 7 8 0-4 1-8 4-11 3-3 7-4 7-4s-1 4-4 7c-3 3-7 4-11 4" strokeWidth="1.75" />
              <path d="M4 17c3-1 6-1 9 1" strokeWidth="1.5" />
              <path d="M5 21c4-2 8-2 12 0" strokeWidth="1.5" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-black text-[15px] tracking-tight text-white">SMART FARM</span>
              <span className="bg-[#C8E86B] text-[#064E3B] font-black text-[9px] px-2 py-0.5 rounded-[5px] tracking-wider uppercase shadow-xs">
                INVESTOR
              </span>
            </div>
            <span className="text-[9.5px] text-[#A7F3D0] font-medium tracking-wide mt-1 block">
              Transparansi & Kinerja Kebun
            </span>
          </div>
        </div>

        {/* Live Status Pill */}
        <div className="flex items-center gap-1.5 relative z-10">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-[10.5px] font-extrabold text-[#C8E86B] shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#C8E86B] animate-pulse"></span>
            <span>Live Sync</span>
          </span>
        </div>
      </div>

      {/* 2. Scrollable Body Content */}
      <div className="flex-1 min-h-0 overflow-y-auto px-3.5 py-3 space-y-3">
        {/* ==================== 1. TAB: PORTOFOLIO ==================== */}
        {activeTab === 'portofolio' && (
          <div className="space-y-3 animate-in fade-in duration-150 pb-4">
            {/* Back to Menu Hub Button */}
            <button
              type="button"
              onClick={() => setActiveTab('menu_hub')}
              className="flex items-center gap-1.5 text-[11.5px] font-bold text-[#0F5545] hover:text-[#0B3B30] cursor-pointer"
            >
              <i className="ri-arrow-left-line"></i>
              <span>Kembali ke Menu & Modul</span>
            </button>

            {/* Top Greeting & Live Badge */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#0F5545] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1FB88B] animate-pulse"></span>
                  Kebun Jonggol 2.0 Ha • Audited
                </span>
                <h1 className="font-extrabold text-[15px] text-[#0B251E] tracking-tight mt-0.5 mb-0">
                  Ringkasan Portofolio (Dasbor)
                </h1>
              </div>
              <span className="text-[10px] font-extrabold text-[#0F5545] bg-[#E8F3ED] px-2 py-0.5 rounded-full border border-[#D0E5DA]">
                27 Agu 2026
              </span>
            </div>

            {/* 2x2 Clean Modular Card Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              {/* Card 1: Valuasi Total */}
              <div className="bg-white rounded-[16px] p-3 border border-[#E2EAE5] shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex flex-col justify-between relative overflow-hidden">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="w-6 h-6 rounded-[7px] bg-[#E8F3ED] text-[#0F5545] flex items-center justify-center text-xs">
                    <i className="ri-funds-box-line"></i>
                  </div>
                  <span className="text-[9px] font-bold text-[#0F5545] bg-[#E8F3ED] px-1.5 py-0.2 rounded-full">
                    +24%
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-medium text-[#64746D] block">Valuasi Aset Proyek</span>
                  <strong className="text-[16px] font-black text-[#0B251E] tracking-tight block mt-0.5 leading-tight">
                    Rp 3,10 M
                  </strong>
                  <span className="text-[8.5px] text-[#86968F] block mt-0.5">Modal: Rp 2,50 M (Aman)</span>
                </div>
              </div>

              {/* Card 2: Kas Cair */}
              <div className="bg-white rounded-[16px] p-3 border border-[#E2EAE5] shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex flex-col justify-between">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="w-6 h-6 rounded-[7px] bg-[#EEF5FC] text-[#2563EB] flex items-center justify-center text-xs">
                    <i className="ri-wallet-3-line"></i>
                  </div>
                  <span className="text-[9px] font-bold text-[#2563EB] bg-[#EEF5FC] px-1.5 py-0.2 rounded-full">
                    Liquid
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-medium text-[#64746D] block">Cadangan Kas Cair</span>
                  <strong className="text-[16px] font-black text-[#0B251E] tracking-tight block mt-0.5 leading-tight">
                    Rp 486,2 Jt
                  </strong>
                  <span className="text-[8.5px] text-[#86968F] block mt-0.5">Bank Mandiri Escrow</span>
                </div>
              </div>

              {/* Card 3: Estimasi ROI */}
              <div className="bg-white rounded-[16px] p-3 border border-[#E2EAE5] shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex flex-col justify-between">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="w-6 h-6 rounded-[7px] bg-[#FAF5EE] text-[#D97706] flex items-center justify-center text-xs">
                    <i className="ri-line-chart-line"></i>
                  </div>
                  <span className="text-[9px] font-bold text-[#D97706] bg-[#FAF5EE] px-1.5 py-0.2 rounded-full">
                    Panen Raya
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-medium text-[#64746D] block">Estimasi ROI Proyek</span>
                  <strong className="text-[16px] font-black text-[#0B251E] tracking-tight block mt-0.5 leading-tight">
                    28% – 32%
                  </strong>
                  <span className="text-[8.5px] text-[#86968F] block mt-0.5">18 Hari Menuju Panen</span>
                </div>
              </div>

              {/* Card 4: Fisik Lahan */}
              <div
                onClick={() => setActiveTab('fisik_gis')}
                className="bg-white rounded-[16px] p-3 border border-[#E2EAE5] shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex flex-col justify-between cursor-pointer hover:border-[#0F5545] transition-colors"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="w-6 h-6 rounded-[7px] bg-[#E8F8F0] text-[#059669] flex items-center justify-center text-xs">
                    <i className="ri-earth-line"></i>
                  </div>
                  <span className="text-[9px] font-bold text-[#059669] bg-[#E8F8F0] px-1.5 py-0.2 rounded-full">
                    pH 6.5
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-medium text-[#64746D] block">Blok Produktif</span>
                  <strong className="text-[16px] font-black text-[#0B251E] tracking-tight block mt-0.5 leading-tight">
                    12 / 15 Blok
                  </strong>
                  <span className="text-[8.5px] text-[#059669] font-bold block mt-0.5">Lihat Peta Satelit &gt;</span>
                </div>
              </div>
            </div>

            {/* Otorisasi Belanja Modal Card (Compact Elegance) */}
            <div className="bg-white rounded-[16px] p-3.5 border border-[#E2EAE5] shadow-[0_2px_8px_rgba(0,0,0,0.03)] space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                  <h2 className="font-extrabold text-[12.5px] text-[#0B251E] m-0">Otorisasi Modal (Layer 3)</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('approval')}
                  className="text-[10.5px] font-bold text-[#0F5545] cursor-pointer"
                >
                  Semua (2) &gt;
                </button>
              </div>

              <div className="p-2.5 rounded-[12px] bg-[#F8FAF8] border border-[#E2EAE5] flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="bg-[#0B2F28] text-white text-[8.5px] font-black px-1.5 py-0.2 rounded-xs">PO-026</span>
                    <strong className="text-[11.5px] text-[#0B251E]">Pupuk Hayati Organik</strong>
                  </div>
                  <span className="text-[10.5px] font-bold text-[#0F5545] block mt-0.5">
                    Rp 28.500.000 <span className="text-[8.5px] text-[#64746D] font-normal">• Disahkan Direktur</span>
                  </span>
                </div>
                {purchaseOrders.find((p) => p.id === 'PO-026')?.status === 'APPROVED' ? (
                  <span className="px-2 py-1 rounded-[8px] bg-[#E8F3ED] text-[#0F5545] font-extrabold text-[9.5px]">
                    ✅ Disetujui
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowPOModal('PO-026')}
                    className="px-3 py-1.5 bg-[#0F5545] text-white font-extrabold text-[10.5px] rounded-[8px] cursor-pointer hover:bg-[#0B2F28] shadow-xs"
                  >
                    Otorisasi
                  </button>
                )}
              </div>
            </div>

            {/* Siklus Lahan 8 Tahap Stepper Card */}
            <div
              onClick={() => setActiveTab('fisik_gis')}
              className="bg-white rounded-[16px] p-3.5 border border-[#E2EAE5] shadow-[0_2px_8px_rgba(0,0,0,0.03)] space-y-2 cursor-pointer hover:border-[#0F5545] transition-colors"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-extrabold text-[12.5px] text-[#0B251E] m-0">Progres Fisik Lahan</h2>
                <span className="text-[10.5px] font-bold text-[#0F5545]">Kamera &gt;</span>
              </div>
              <div className="grid grid-cols-5 gap-1 text-center text-[8.5px]">
                <div className="bg-[#E8F3ED] p-1.5 rounded-[8px] text-[#0F5545] font-extrabold">1. Clearing ✔</div>
                <div className="bg-[#E8F3ED] p-1.5 rounded-[8px] text-[#0F5545] font-extrabold">2. Olah ✔</div>
                <div className="bg-[#E8F3ED] p-1.5 rounded-[8px] text-[#0F5545] font-extrabold">3. Tanam ✔</div>
                <div className="bg-[#0B251E] p-1.5 rounded-[8px] text-[#C8E86B] font-extrabold">4. Rawat</div>
                <div className="bg-[#F4F7F5] p-1.5 rounded-[8px] text-[#86968F] font-bold">5. Panen</div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== 2. TAB: OTORISASI MODAL ==================== */}
        {activeTab === 'approval' && (
          <div className="space-y-2.5 animate-in fade-in duration-150 pb-4">
            {/* Back to Menu Hub Button */}
            <button
              type="button"
              onClick={() => setActiveTab('menu_hub')}
              className="flex items-center gap-1.5 text-[11.5px] font-bold text-[#0F5545] hover:text-[#0B3B30] cursor-pointer"
            >
              <i className="ri-arrow-left-line"></i>
              <span>Kembali ke Menu & Modul</span>
            </button>

            <div>
              <span className="text-[9.5px] font-extrabold text-[#0F5545] uppercase tracking-wider">
                🛡️ Hak Veto Pengeluaran Modal
              </span>
              <h2 className="font-extrabold text-[14px] text-[#0B251E] tracking-tight mt-0.5 mb-0">
                Persetujuan Pencairan Dana
              </h2>
            </div>

            <div className="p-3 bg-white rounded-[16px] border border-[#E2EAE5] shadow-[0_2px_8px_rgba(0,0,0,0.03)] space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <span className="bg-[#0B251E] text-white text-[8.5px] px-1.5 py-0.2 rounded-xs font-bold">PO-026</span>
                  <h3 className="font-bold text-[12px] text-[#0B251E] mt-0.5 mb-0">Pupuk Hayati Organik & Drip</h3>
                  <span className="text-[9.5px] text-[#64746D]">Vendor: PT Agro Mitra • Kebun Jonggol Blok A2</span>
                </div>
                <strong className="text-[13px] font-black text-[#0F5545]">Rp 28,5 Jt</strong>
              </div>
              {purchaseOrders.find((p) => p.id === 'PO-026')?.status === 'APPROVED' ? (
                <div className="p-2 bg-[#E8F3ED] rounded-[8px] text-[10.5px] font-extrabold text-[#0F5545] text-center">
                  ✅ Dana Disetujui Investor
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowPOModal('PO-026')}
                  className="w-full py-2 bg-[#0F5545] text-white font-extrabold text-[11px] rounded-[8px] cursor-pointer hover:bg-[#0B251E] shadow-xs"
                >
                  Otorisasi Pencairan Dana
                </button>
              )}
            </div>

            <div className="p-3 bg-white rounded-[16px] border border-[#E2EAE5] shadow-[0_2px_8px_rgba(0,0,0,0.03)] space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <span className="bg-[#0B251E] text-white text-[8.5px] px-1.5 py-0.2 rounded-xs font-bold">PO-027</span>
                  <h3 className="font-bold text-[12px] text-[#0B251E] mt-0.5 mb-0">Material Greenhouse Baja B3</h3>
                  <span className="text-[9.5px] text-[#64746D]">Vendor: CV Surya Konstruksi Mandiri</span>
                </div>
                <strong className="text-[13px] font-black text-[#0F5545]">Rp 41,2 Jt</strong>
              </div>
              {purchaseOrders.find((p) => p.id === 'PO-027')?.status === 'APPROVED' ? (
                <div className="p-2 bg-[#E8F3ED] rounded-[8px] text-[10.5px] font-extrabold text-[#0F5545] text-center">
                  ✅ Dana Disetujui Investor
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowPOModal('PO-027')}
                  className="w-full py-2 bg-[#0F5545] text-white font-extrabold text-[11px] rounded-[8px] cursor-pointer hover:bg-[#0B251E] shadow-xs"
                >
                  Otorisasi Pencairan Dana
                </button>
              )}
            </div>
          </div>
        )}

        {/* ==================== 3. TAB: FISIK & GIS ==================== */}
        {activeTab === 'fisik_gis' && (
          <PetaGisMobileScreen onBack={() => setActiveTab('menu_hub')} />
        )}

        {/* ==================== 4. TAB: ARUS KAS ==================== */}
        {activeTab === 'arus_kas' && (
          <div className="space-y-2.5 animate-in fade-in duration-150 pb-4">
            {/* Back to Menu Hub Button */}
            <button
              type="button"
              onClick={() => setActiveTab('menu_hub')}
              className="flex items-center gap-1.5 text-[11.5px] font-bold text-[#0F5545] hover:text-[#0B3B30] cursor-pointer"
            >
              <i className="ri-arrow-left-line"></i>
              <span>Kembali ke Menu & Modul</span>
            </button>

            <h2 className="font-extrabold text-[14px] text-[#0B251E] m-0">Arus Kas & Transparansi Modal</h2>
            
            <div className="bg-white rounded-[16px] p-3.5 border border-[#E2EAE5] shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
              <span className="text-[10px] text-[#64746D] font-medium">Cadangan Kas Cair Operasional</span>
              <strong className="block text-[20px] font-black text-[#0B251E] leading-tight mt-0.5">
                Rp 486.250.000
              </strong>
              <div className="flex gap-2 mt-2 text-[9.5px]">
                <span className="bg-[#E8F3ED] text-[#0F5545] font-extrabold px-2 py-0.5 rounded-full">
                  Inflow Modal: Rp 2,58 M
                </span>
                <span className="bg-[#FDF2F0] text-[#A23B2A] font-extrabold px-2 py-0.5 rounded-full">
                  Realisasi: Rp 168,4 Jt
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ==================== 5. TAB: AI KONSULTAN ==================== */}
        {activeTab === 'ai_konsultan' && (
          <div className="space-y-2 animate-in fade-in duration-150 flex flex-col h-full pb-3">
            {/* Back to Menu Hub Button */}
            <button
              type="button"
              onClick={() => setActiveTab('menu_hub')}
              className="flex items-center gap-1.5 text-[11.5px] font-bold text-[#0F5545] hover:text-[#0B3B30] cursor-pointer"
            >
              <i className="ri-arrow-left-line"></i>
              <span>Kembali ke Menu & Modul</span>
            </button>

            <h2 className="font-extrabold text-[14px] text-[#0B251E] m-0">Tanya AI Konsultan Portofolio</h2>
            
            <div className="flex flex-wrap gap-1">
              <button
                type="button"
                onClick={() => handleSendMessage('Berapa estimasi ROI dan proyeksi dividen panen raya?')}
                className="px-2.5 py-1 rounded-full bg-[#E8F3ED] text-[#0F5545] text-[9.5px] font-bold border border-[#0F5545]/20 cursor-pointer"
              >
                📈 Estimasi ROI
              </button>
              <button
                type="button"
                onClick={() => handleSendMessage('Bagaimana tingkat keamanan modal dan valuasi fisik kebun?')}
                className="px-2.5 py-1 rounded-full bg-[#FAF5EE] text-[#D97706] text-[9.5px] font-bold border border-[#D97706]/20 cursor-pointer"
              >
                🛡️ Keamanan Modal
              </button>
            </div>

            <div className="space-y-1.5 bg-white rounded-[14px] p-2.5 border border-[#E2EAE5] min-h-[190px] max-h-[240px] overflow-y-auto">
              {aiMessages.map((msg, idx) => (
                <div key={idx} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`max-w-[85%] rounded-[12px] p-2 text-[11px] ${
                      msg.sender === 'user' ? 'bg-[#0F5545] text-white' : 'bg-[#F4F7F5] text-[#0B251E] border border-[#E2EAE5]'
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
                placeholder="Tanyakan analisis portofolio..."
                className="flex-1 px-3 py-1.5 rounded-[10px] bg-white border border-[#E2EAE5] text-[11px] outline-none"
              />
              <button
                type="button"
                onClick={() => handleSendMessage()}
                className="px-3.5 py-1.5 rounded-[10px] bg-[#0F5545] text-white font-bold text-[11px] cursor-pointer hover:bg-[#0B251E]"
              >
                Kirim
              </button>
            </div>
          </div>
        )}

        {/* ==================== 5. TAB: MENU HUB (CARD GRID SUPER APP) ==================== */}
        {activeTab === 'menu_hub' && (
          <MobileMenuHubView
            onSelectView={(viewId) => {
              if (viewId === 'dasbor') setActiveTab('portofolio');
              else if (viewId === 'approval_po') setActiveTab('approval');
              else if (viewId === 'tanya_ai') setActiveTab('ai_konsultan');
              else if (viewId === 'peta_gis') setActiveTab('fisik_gis');
              else if (viewId === 'buku_kas') setActiveTab('arus_kas');
              else if (viewId === 'alokasi_modal') setActiveTab('alokasi_modal');
              else if (viewId === 'kalkulator') setActiveTab('kalkulator');
              else if (viewId === 'laporan_audit') setActiveTab('laporan_audit');
              else if (viewId === 'siklus_lahan') setActiveTab('siklus_lahan');
              else if (viewId === 'ktp_sampel') setActiveTab('ktp_sampel');
              else if (viewId === 'scan_daun') setActiveTab('scan_daun');
              else if (viewId === 'master_komoditas') setActiveTab('master_komoditas');
              else if (viewId === 'gudang') setActiveTab('gudang');
              else if (viewId === 'timbangan') setActiveTab('timbangan');
              else if (viewId === 'jadwal_tugas') setActiveTab('jadwal_tugas');
              else if (viewId === 'presensi_sdm') setActiveTab('presensi_sdm');
              else if (viewId === 'kelola_user') setActiveTab('kelola_user');
              else if (viewId === 'ktp_pohon') setShowTreeScanner(true);
            }}
          />
        )}

        {/* ==================== 6. TAB: ALOKASI MODAL ==================== */}
        {activeTab === 'alokasi_modal' && (
          <AlokasiModalScreen onBack={() => setActiveTab('menu_hub')} />
        )}

        {/* ==================== 7. TAB: KALKULATOR HPP ==================== */}
        {activeTab === 'kalkulator' && (
          <KalkulatorHppScreen onBack={() => setActiveTab('menu_hub')} />
        )}

        {/* ==================== 8. TAB: LAPORAN AUDIT ==================== */}
        {activeTab === 'laporan_audit' && (
          <LaporanAuditScreen onBack={() => setActiveTab('menu_hub')} />
        )}

        {/* ==================== 9. TAB: BUKTI 8 TAHAP ==================== */}
        {activeTab === 'siklus_lahan' && (
          <Bukti8TahapScreen onBack={() => setActiveTab('menu_hub')} />
        )}

        {/* ==================== 9B. TAB: KTP IDENTITAS POHON SAMPEL ==================== */}
        {activeTab === 'ktp_sampel' && (
          <KtpSampelScreen onBack={() => setActiveTab('menu_hub')} />
        )}

        {/* ==================== 10. TAB: SCAN DAUN AI ==================== */}
        {activeTab === 'scan_daun' && (
          <ScanDaunAiScreen onBack={() => setActiveTab('menu_hub')} />
        )}

        {/* ==================== 11. TAB: STOK GUDANG ==================== */}
        {activeTab === 'gudang' && (
          <StokGudangScreen onBack={() => setActiveTab('menu_hub')} />
        )}

        {/* ==================== 12. TAB: TIMBANGAN PANEN ==================== */}
        {activeTab === 'timbangan' && (
          <TimbanganPanenScreen onBack={() => setActiveTab('menu_hub')} />
        )}

        {/* ==================== 13. TAB: MASTER KOMODITAS ==================== */}
        {activeTab === 'master_komoditas' && (
          <MasterKomoditasScreen onBack={() => setActiveTab('menu_hub')} />
        )}

        {/* ==================== 14. TAB: JADWAL TASKLIST ==================== */}
        {activeTab === 'jadwal_tugas' && (
          <JadwalTasklistScreen onBack={() => setActiveTab('menu_hub')} />
        )}

        {/* ==================== 15. TAB: PRESENSI SDM ==================== */}
        {activeTab === 'presensi_sdm' && (
          <PresensiUpahScreen onBack={() => setActiveTab('menu_hub')} />
        )}

        {/* ==================== 16. TAB: KELOLA USER ==================== */}
        {activeTab === 'kelola_user' && (
          <KelolaUserScreen onBack={() => setActiveTab('menu_hub')} />
        )}
      </div>

      {/* 3. Bottom Navigation Bar: Menu Modul, Scan QR, Notifikasi, Profil */}
      <div
        style={{
          height: '56px',
          minHeight: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          zIndex: 50,
        }}
        className="w-full bg-white border-t border-[#E2EAE5] px-2 shadow-[0_-2px_12px_rgba(0,0,0,0.04)] flex-shrink-0"
      >
        {/* 1. Menu Modul (Super App 12-Icon Grid) */}
        <button
          type="button"
          onClick={() => setActiveTab('menu_hub')}
          style={{ background: 'transparent', border: 'none', outline: 'none' }}
          className={`flex-1 flex flex-col items-center justify-center py-1 text-center cursor-pointer relative ${
            activeTab === 'menu_hub' ? 'text-[#0F5545]' : 'text-[#64746D]'
          }`}
        >
          <i className={`${activeTab === 'menu_hub' ? 'ri-apps-2-fill' : 'ri-apps-2-line'} text-[20px] leading-none mb-0.5`}></i>
          <span className={`text-[9.5px] ${activeTab === 'menu_hub' ? 'font-black text-[#0F5545]' : 'font-medium'}`}>
            Menu
          </span>
          {activeTab === 'menu_hub' && (
            <span className="w-5 h-1 rounded-full bg-[#82C341] absolute bottom-0.5 shadow-xs"></span>
          )}
        </button>

        {/* 2. Scan QR Ajir (Tautan Menu Tambahan QR Scan) */}
        <button
          type="button"
          onClick={() => setShowTreeScanner(true)}
          style={{ background: 'transparent', border: 'none', outline: 'none' }}
          className="flex-1 flex flex-col items-center justify-center py-1 text-center cursor-pointer text-[#5F6F67] hover:text-[#0F5545] active:scale-95 transition-transform"
        >
          <i className="ri-qr-scan-2-line text-[20px] leading-none mb-0.5 text-[#0F5545]"></i>
          <span className="text-[9.5px] font-bold text-[#0F5545]">
            Scan QR
          </span>
        </button>

        {/* 3. Notifikasi */}
        <button
          type="button"
          onClick={() => setShowNotifModal(true)}
          style={{ background: 'transparent', border: 'none', outline: 'none' }}
          className="flex-1 flex flex-col items-center justify-center py-1 text-center cursor-pointer text-[#5F6F67] hover:text-[#0F5545]"
        >
          <i className="ri-notification-3-line text-[20px] leading-none mb-0.5"></i>
          <span className="text-[9.5px] font-medium text-[#5F6F67]">
            Notifikasi
          </span>
        </button>

        {/* 4. Profil */}
        <button
          type="button"
          onClick={() => setShowProfileModal(true)}
          style={{ background: 'transparent', border: 'none', outline: 'none' }}
          className="flex-1 flex flex-col items-center justify-center py-1 text-center cursor-pointer text-[#5F6F67] hover:text-[#0F5545]"
        >
          <i className="ri-user-3-line text-[20px] leading-none mb-0.5"></i>
          <span className="text-[9.5px] font-medium text-[#5F6F67]">
            Profil
          </span>
        </button>
      </div>

      {/* Drawer */}
      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSelectView={(viewId) => {
          if (viewId === 'dasbor') setActiveTab('portofolio');
          else if (viewId === 'approval_po') setActiveTab('approval');
          else if (viewId === 'siklus_lahan' || viewId === 'peta_gis') setActiveTab('fisik_gis');
          else if (viewId === 'buku_kas' || viewId === 'kalkulator') setActiveTab('arus_kas');
          else if (viewId === 'tanya_ai') setActiveTab('ai_konsultan');
          else if (viewId === 'ktp_pohon') setShowTreeScanner(true);
        }}
      />

      {/* KTP Pohon Barcode Scanner Modal */}
      <MobileTreeScannerModal
        isOpen={showTreeScanner}
        onClose={() => setShowTreeScanner(false)}
      />

      {/* Modal */}
      {showPOModal && (
        <div className="absolute inset-0 bg-black/70 z-50 flex items-end justify-center p-0 backdrop-blur-xs">
          <div className="bg-white w-full rounded-t-[20px] p-4 animate-in slide-in-from-bottom duration-150">
            <div className="flex justify-between items-center mb-1.5">
              <span className="badge bg-[#0B251E] text-[#C8E86B] font-bold px-2 py-0.5 rounded text-[9.5px]">
                Otorisasi {showPOModal}
              </span>
              <button
                type="button"
                onClick={() => setShowPOModal(null)}
                className="text-[#64746D] hover:text-[#0B251E] text-lg font-bold cursor-pointer"
              >
                &times;
              </button>
            </div>
            <h3 className="font-extrabold text-[13px] text-[#0B251E] mb-1">
              Pengesahan Pencairan Modal {showPOModal}
            </h3>
            <p className="text-[11px] text-[#64746D] mb-2.5">
              Nilai: <strong className="text-[#0F5545]">{showPOModal === 'PO-026' ? 'Rp 28.500.000' : 'Rp 41.200.000'}</strong> (Disahkan Direktur).
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleApprovePO(showPOModal)}
                className="flex-1 py-2 bg-[#0F5545] text-white font-extrabold text-[11.5px] rounded-[8px] cursor-pointer hover:bg-[#0B251E]"
              >
                Setujui Pencairan Dana
              </button>
              <button
                type="button"
                onClick={() => setShowPOModal(null)}
                className="px-3 py-2 border border-[#E2EAE5] text-[#64746D] font-bold text-[11.5px] rounded-[8px] cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile & Settings Modal */}
      <MobileProfileSettingsModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
      />

      {/* Notifications Modal */}
      <MobileNotificationsModal
        isOpen={showNotifModal}
        onClose={() => setShowNotifModal(false)}
        onSelectAction={(notifType) => {
          if (notifType === 'PO') setActiveTab('approval');
          else if (notifType === 'HARVEST' || notifType === 'MAINTENANCE') setShowTreeScanner(true);
        }}
      />
    </div>
  );
};
