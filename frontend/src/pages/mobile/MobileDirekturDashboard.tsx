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
import { LiveFeedKebunScreen } from '../../components/mobile/screens/LiveFeedKebunScreen';
import { ApprovalListScreen } from '../../components/mobile/ApprovalListScreen';

import { useSmartFarmStore } from '../../store/smartFarmStore';
import { callLiveAI } from '../../services/aiService';

export const MobileDirekturDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    | 'menu_hub'
    | 'live_feed'
    | 'dasbor'
    | 'approval'
    | 'gis'
    | 'lahan'
    | 'ai'
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
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);

  const { purchaseOrders } = useSmartFarmStore();

  // AI State
  const [aiInput, setAiInput] = useState('');
  const [aiMessages, setAiMessages] = useState<{ sender: 'user' | 'ai'; text: string; time: string }[]>([
    {
      sender: 'ai',
      text: 'Selamat pagi, Pak Direktur. Dashboard eksekutif siap. Seluruh pengeluaran modal dan operasional terkontrol.',
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
      const res = await callLiveAI(query, historyForAI, 'DIREKTUR', 'Bapak Budi Santoso (Direktur Utama)');
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
          text: 'Maaf, terjadi gangguan jaringan. Silakan periksa koneksi atau API Key Anda.',
          time: timeStr,
        },
      ]);
    }
  };

  const handleSimulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScanResult('Vision AI: Daun Melon Blok A2 sehat (97.4%). Tidak ditemukan bercak atau hama.');
    }, 1000);
  };

  return (
    <div
      className="w-full h-full flex flex-col overflow-hidden bg-[#F4F7F5] text-[#17211E] relative"
      style={{ fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      {/* 1. Header Forest Emerald with Curved Corners & Subtle Batik/Botanical Silhouette Overlay */}
      <div className="w-full bg-gradient-to-r from-[#064E3B] via-[#047857] to-[#065F46] rounded-b-[26px] px-4 py-4 min-h-[76px] flex items-center justify-between flex-shrink-0 z-20 shadow-[0_12px_28px_-6px_rgba(6,78,59,0.38)] relative overflow-hidden border-b border-white/15 antialiased">
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.15]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 400 100"
          preserveAspectRatio="none"
        >
          <path d="M-20 60 Q 40 10, 100 40 T 220 20 T 340 50 T 440 20" fill="none" stroke="#C8E86B" strokeWidth="1.2" strokeDasharray="4 3" />
          <path d="M-10 85 Q 60 30, 140 70 T 280 40 T 420 80" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.8" />
          <path d="M320 -10 C340 30, 390 40, 420 10 C390 60, 330 50, 320 -10 Z" fill="#C8E86B" opacity="0.6" />
          <path d="M40 -15 C60 25, 110 35, 130 5 C100 45, 50 35, 40 -15 Z" fill="#A7F3D0" opacity="0.5" />
          <circle cx="360" cy="50" r="18" fill="none" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.4" strokeDasharray="2 2" />
          <circle cx="80" cy="20" r="14" fill="none" stroke="#C8E86B" strokeWidth="0.8" opacity="0.4" />
        </svg>

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
                DIREKTUR
              </span>
            </div>
            <span className="text-[9.5px] text-[#A7F3D0] font-medium tracking-wide mt-1 block">
              Komando Eksekutif Perkebunan
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 relative z-10">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-[10.5px] font-extrabold text-[#C8E86B] shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#C8E86B] animate-pulse"></span>
            <span>Live Sync</span>
          </span>
        </div>
      </div>

      {/* 2. Scrollable Body Content */}
      <div
        style={{
          WebkitOverflowScrolling: 'touch',
        }}
        className="flex-1 min-h-0 overflow-y-auto px-3.5 py-3 space-y-3"
      >
        {/* ==================== 1. TAB: DASBOR EKSEKUTIF ==================== */}
        {activeTab === 'dasbor' && (
          <div className="space-y-3 animate-in fade-in duration-150 pb-4">
            {/* Top Greeting */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#0F5545] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1FB88B] animate-pulse"></span>
                  Operasional Kebun Aktif
                </span>
                <h1 className="font-extrabold text-[15px] text-[#0B251E] tracking-tight mt-0.5 mb-0">
                  Selamat Pagi, Direktur Utama
                </h1>
              </div>
              <span className="text-[10px] font-extrabold text-[#0F5545] bg-[#E8F3ED] px-2 py-0.5 rounded-full border border-[#D0E5DA]">
                27 Agu 2026
              </span>
            </div>

            {/* 2x2 Clean Modular Card Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              {/* Card 1: Valuasi Aset */}
              <div className="bg-white rounded-[16px] p-3 border border-[#E2EAE5] shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex flex-col justify-between">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="w-6 h-6 rounded-[7px] bg-[#E8F3ED] text-[#0F5545] flex items-center justify-center text-xs">
                    <i className="ri-funds-box-line"></i>
                  </div>
                  <span className="text-[9px] font-bold text-[#0F5545] bg-[#E8F3ED] px-1.5 py-0.2 rounded-full">
                    +4,8%
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-medium text-[#64746D] block">Valuasi Aset Kebun</span>
                  <strong className="text-[16px] font-black text-[#0B251E] tracking-tight block mt-0.5 leading-tight">
                    Rp 3,10 M
                  </strong>
                  <span className="text-[8.5px] text-[#86968F] block mt-0.5">Jonggol 2.0 Hektar</span>
                </div>
              </div>

              {/* Card 2: Kas Operasional */}
              <div className="bg-white rounded-[16px] p-3 border border-[#E2EAE5] shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex flex-col justify-between">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="w-6 h-6 rounded-[7px] bg-[#EEF5FC] text-[#2563EB] flex items-center justify-center text-xs">
                    <i className="ri-wallet-3-line"></i>
                  </div>
                  <span className="text-[9px] font-bold text-[#2563EB] bg-[#EEF5FC] px-1.5 py-0.2 rounded-full">
                    Aman
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-medium text-[#64746D] block">Kas Operasional</span>
                  <strong className="text-[16px] font-black text-[#0B251E] tracking-tight block mt-0.5 leading-tight">
                    Rp 486,2 Jt
                  </strong>
                  <span className="text-[8.5px] text-[#86968F] block mt-0.5">Burn: Rp 168,4 Jt/bln</span>
                </div>
              </div>

              {/* Card 3: Otorisasi Belanja */}
              <div
                onClick={() => setActiveTab('approval')}
                className="bg-white rounded-[16px] p-3 border border-[#E2EAE5] shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex flex-col justify-between cursor-pointer hover:border-[#0F5545] transition-colors"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="w-6 h-6 rounded-[7px] bg-[#FAF5EE] text-[#D97706] flex items-center justify-center text-xs">
                    <i className="ri-shield-check-line"></i>
                  </div>
                  <span className="text-[9px] font-bold text-[#D97706] bg-[#FAF5EE] px-1.5 py-0.2 rounded-full">
                    Pending
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-medium text-[#64746D] block">Otorisasi Belanja</span>
                  <strong className="text-[16px] font-black text-[#0B251E] tracking-tight block mt-0.5 leading-tight">
                    {purchaseOrders.filter((p) => p.status === 'PENDING_DIREKTUR' || p.status === 'PENDING_FINANCE').length} Pengajuan
                  </strong>
                  <span className="text-[8.5px] text-[#D97706] font-bold block mt-0.5">
                    {purchaseOrders.filter((p) => p.status === 'PENDING_DIREKTUR').length > 0
                      ? 'Perlu Persetujuan Direktur >'
                      : 'Semua Berkas Terkelola >'}
                  </span>
                </div>
              </div>

              {/* Card 4: Satelit GIS */}
              <div
                onClick={() => setActiveTab('gis')}
                className="bg-white rounded-[16px] p-3 border border-[#E2EAE5] shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex flex-col justify-between cursor-pointer hover:border-[#0F5545] transition-colors"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="w-6 h-6 rounded-[7px] bg-[#E8F8F0] text-[#059669] flex items-center justify-center text-xs">
                    <i className="ri-earth-line"></i>
                  </div>
                  <span className="text-[9px] font-bold text-[#059669] bg-[#E8F8F0] px-1.5 py-0.2 rounded-full">
                    Satelit On
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-medium text-[#64746D] block">Satelit Jonggol</span>
                  <strong className="text-[16px] font-black text-[#0B251E] tracking-tight block mt-0.5 leading-tight">
                    12 Blok Aktif
                  </strong>
                  <span className="text-[8.5px] text-[#059669] font-bold block mt-0.5">pH 6.5 (Ideal) &gt;</span>
                </div>
              </div>
            </div>

            {/* Quick Action Row */}
            <div className="bg-white rounded-[16px] p-3.5 border border-[#E2EAE5] shadow-[0_2px_8px_rgba(0,0,0,0.03)] space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="font-extrabold text-[12.5px] text-[#0B251E] m-0">Otorisasi Belanja (Layer 2)</h2>
                <button
                  type="button"
                  onClick={() => setActiveTab('approval')}
                  className="text-[10.5px] font-bold text-[#0F5545] cursor-pointer"
                >
                  Semua ({purchaseOrders.length}) &gt;
                </button>
              </div>

              {(() => {
                const pendingDirekturPO = purchaseOrders.find((p) => p.status === 'PENDING_DIREKTUR');
                if (!pendingDirekturPO) {
                  return (
                    <div className="p-2.5 rounded-[12px] bg-[#E8F3ED] text-[#0F5545] font-extrabold text-[10.5px] text-center">
                      ✓ Tidak ada PO menunggu persetujuan Direktur
                    </div>
                  );
                }
                return (
                  <div className="p-2.5 rounded-[12px] bg-[#F8FAF8] border border-[#E2EAE5] flex items-center justify-between">
                    <div>
                      <strong className="text-[11.5px] text-[#0B251E] block">{pendingDirekturPO.id}: {pendingDirekturPO.title}</strong>
                      <span className="text-[10.5px] font-bold text-[#0F5545]">Rp {pendingDirekturPO.amount.toLocaleString('id-ID')}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab('approval')}
                      className="px-3 py-1.5 bg-[#0F5545] text-white font-extrabold text-[10.5px] rounded-[8px] cursor-pointer hover:bg-[#0B2F28] shadow-xs"
                    >
                      Setujui
                    </button>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* ==================== 2. APPROVAL ==================== */}
        {activeTab === 'approval' && (
          <ApprovalListScreen onBack={() => setActiveTab('menu_hub')} />
        )}

        {/* ==================== 3. GIS ==================== */}
        {activeTab === 'gis' && (
          <PetaGisMobileScreen onBack={() => setActiveTab('menu_hub')} />
        )}

        {/* ==================== 4. LAHAN ==================== */}
        {activeTab === 'lahan' && (
          <div className="space-y-2.5 animate-in fade-in duration-150 pb-4">
            <h2 className="font-extrabold text-[14px] text-[#0B251E] m-0">Siklus Lahan & Vision AI</h2>
            <div className="bg-[#0B251E] text-white rounded-[16px] p-3.5 text-center shadow-xs">
              <i className="ri-camera-lens-fill text-2xl text-[#C8E86B] mb-1 block"></i>
              <h3 className="font-bold text-[13px] mb-0.5">Diagnostik Daun Tanaman</h3>
              <p className="text-[10px] text-white/75 mb-2.5">Validasi visual kesehatan daun tanaman di kebun.</p>
              <button
                type="button"
                onClick={handleSimulateScan}
                disabled={isScanning}
                className="w-full py-2 bg-[#C8E86B] text-[#08201A] font-extrabold text-[11px] rounded-[8px] cursor-pointer hover:bg-[#b5d859]"
              >
                {isScanning ? '🔍 Menganalisis...' : '📸 Uji Scan Daun Lapangan'}
              </button>
            </div>
            {scanResult && (
              <div className="p-2.5 bg-white rounded-[12px] border border-[#0F5545] text-[11px] shadow-xs">
                <strong className="text-[#0F5545] block mb-0.5">✨ Hasil AI:</strong>
                <p className="m-0 text-[#0B251E]">{scanResult}</p>
              </div>
            )}
          </div>
        )}

        {/* ==================== 5. AI ==================== */}
        {activeTab === 'ai' && (
          <div className="space-y-2 animate-in fade-in duration-150 flex flex-col h-full pb-3">
            <h2 className="font-extrabold text-[14px] text-[#0B251E] m-0">Tanya AI Asisten Jaya</h2>
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
                placeholder="Ketik pertanyaan untuk AI Jaya..."
                className="flex-1 px-3 py-1.5 rounded-[10px] bg-white border border-[#E2EAE5] text-[11px] outline-none"
              />
              <button
                type="button"
                onClick={() => handleSendMessage()}
                className="px-3.5 py-1.5 rounded-[10px] bg-[#0F5545] text-white font-bold text-[11px] cursor-pointer"
              >
                Kirim
              </button>
            </div>
          </div>
        )}

        {/* ==================== 6. TAB: MENU HUB (CARD GRID SUPER APP) ==================== */}
        {activeTab === 'menu_hub' && (
          <MobileMenuHubView
            onSelectView={(viewId) => {
              if (viewId === 'live_feed') setActiveTab('live_feed');
              else if (viewId === 'dasbor') setActiveTab('dasbor');
              else if (viewId === 'approval_po') setActiveTab('approval');
              else if (viewId === 'tanya_ai') setActiveTab('ai');
              else if (viewId === 'peta_gis') setActiveTab('gis');
              else if (viewId === 'buku_kas') setActiveTab('dasbor');
              else if (viewId === 'alokasi_modal') setActiveTab('alokasi_modal');
              else if (viewId === 'kalkulator') setActiveTab('kalkulator');
              else if (viewId === 'laporan_audit') setActiveTab('laporan_audit');
              else if (viewId === 'siklus_lahan') setActiveTab('siklus_lahan');
              else if (viewId === 'ktp_sampel') setActiveTab('ktp_sampel');
              else if (viewId === 'scan_daun') setActiveTab('scan_daun');
              else if (viewId === 'gudang') setActiveTab('gudang');
              else if (viewId === 'timbangan') setActiveTab('timbangan');
              else if (viewId === 'master_komoditas') setActiveTab('master_komoditas');
              else if (viewId === 'jadwal_tugas') setActiveTab('jadwal_tugas');
              else if (viewId === 'presensi_sdm') setActiveTab('presensi_sdm');
              else if (viewId === 'kelola_user') setActiveTab('kelola_user');
              else if (viewId === 'ktp_pohon') setShowTreeScanner(true);
            }}
          />
        )}

        {/* ==================== 6B. TAB: LIVE FEED KEBUN (PENGGANTI WA) ==================== */}
        {activeTab === 'live_feed' && (
          <LiveFeedKebunScreen onBack={() => setActiveTab('menu_hub')} userRole="DIREKTUR" />
        )}

        {/* ==================== 7. TAB: ALOKASI MODAL ==================== */}
        {activeTab === 'alokasi_modal' && (
          <AlokasiModalScreen onBack={() => setActiveTab('menu_hub')} />
        )}

        {/* ==================== 8. TAB: KALKULATOR HPP ==================== */}
        {activeTab === 'kalkulator' && (
          <KalkulatorHppScreen onBack={() => setActiveTab('menu_hub')} />
        )}

        {/* ==================== 9. TAB: LAPORAN AUDIT ==================== */}
        {activeTab === 'laporan_audit' && (
          <LaporanAuditScreen onBack={() => setActiveTab('menu_hub')} />
        )}

        {/* ==================== 10. TAB: BUKTI 8 TAHAP ==================== */}
        {activeTab === 'siklus_lahan' && (
          <Bukti8TahapScreen onBack={() => setActiveTab('menu_hub')} />
        )}

        {/* ==================== 10B. TAB: KTP IDENTITAS POHON SAMPEL ==================== */}
        {activeTab === 'ktp_sampel' && (
          <KtpSampelScreen onBack={() => setActiveTab('menu_hub')} />
        )}

        {/* ==================== 11. TAB: SCAN DAUN AI ==================== */}
        {activeTab === 'scan_daun' && (
          <ScanDaunAiScreen onBack={() => setActiveTab('menu_hub')} />
        )}

        {/* ==================== 12. TAB: STOK GUDANG ==================== */}
        {activeTab === 'gudang' && (
          <StokGudangScreen onBack={() => setActiveTab('menu_hub')} />
        )}

        {/* ==================== 13. TAB: TIMBANGAN PANEN ==================== */}
        {activeTab === 'timbangan' && (
          <TimbanganPanenScreen onBack={() => setActiveTab('menu_hub')} />
        )}

        {/* ==================== 14. TAB: MASTER KOMODITAS ==================== */}
        {activeTab === 'master_komoditas' && (
          <MasterKomoditasScreen onBack={() => setActiveTab('menu_hub')} />
        )}

        {/* ==================== 15. TAB: JADWAL TASKLIST ==================== */}
        {activeTab === 'jadwal_tugas' && (
          <JadwalTasklistScreen onBack={() => setActiveTab('menu_hub')} />
        )}

        {/* ==================== 16. TAB: PRESENSI SDM ==================== */}
        {activeTab === 'presensi_sdm' && (
          <PresensiUpahScreen onBack={() => setActiveTab('menu_hub')} />
        )}

        {/* ==================== 17. TAB: KELOLA USER ==================== */}
        {activeTab === 'kelola_user' && (
          <KelolaUserScreen onBack={() => setActiveTab('menu_hub')} />
        )}
      </div>

      {/* 3. Bottom Navigation Bar: Menu Modul, Scan QR, Notifikasi, Profil */}
      <div
        style={{
          height: '62px',
          minHeight: '62px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          zIndex: 50,
          paddingBottom: 'env(safe-area-inset-bottom, 2px)',
        }}
        className="w-full bg-white border-t border-[#E2EAE5] px-2 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] flex-shrink-0"
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

        {/* 2. Scan QR Ajir */}
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
          if (viewId === 'dasbor') setActiveTab('dasbor');
          else if (viewId === 'approval_po') setActiveTab('approval');
          else if (viewId === 'peta_gis') setActiveTab('gis');
          else if (viewId === 'siklus_lahan' || viewId === 'scan_daun') setActiveTab('lahan');
          else if (viewId === 'tanya_ai') setActiveTab('ai');
          else if (viewId === 'ktp_pohon') setShowTreeScanner(true);
        }}
      />

      {/* KTP Pohon Barcode Scanner Modal */}
      <MobileTreeScannerModal
        isOpen={showTreeScanner}
        onClose={() => setShowTreeScanner(false)}
      />

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
