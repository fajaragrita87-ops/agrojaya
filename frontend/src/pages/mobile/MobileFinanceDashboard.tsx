import React, { useState } from 'react';
import { MobileMenuHubView } from '../../components/mobile/MobileMenuHubView';
import { AlokasiModalScreen } from '../../components/mobile/screens/AlokasiModalScreen';
import { KalkulatorHppScreen } from '../../components/mobile/screens/KalkulatorHppScreen';
import { LaporanAuditScreen } from '../../components/mobile/screens/LaporanAuditScreen';
import { StokGudangScreen } from '../../components/mobile/screens/StokGudangScreen';
import { TimbanganPanenScreen } from '../../components/mobile/screens/TimbanganPanenScreen';
import { PresensiUpahScreen } from '../../components/mobile/screens/PresensiUpahScreen';
import { KtpSampelScreen } from '../../components/mobile/screens/KtpSampelScreen';
import { JadwalTasklistScreen } from '../../components/mobile/screens/JadwalTasklistScreen';
import { ScanDaunAiScreen } from '../../components/mobile/screens/ScanDaunAiScreen';
import { Bukti8TahapScreen } from '../../components/mobile/screens/Bukti8TahapScreen';
import { PetaGisMobileScreen } from '../../components/mobile/screens/PetaGisMobileScreen';
import { MasterKomoditasScreen } from '../../components/mobile/screens/MasterKomoditasScreen';
import { KelolaUserScreen } from '../../components/mobile/screens/KelolaUserScreen';
import { LiveFeedKebunScreen } from '../../components/mobile/screens/LiveFeedKebunScreen';
import { ApprovalListScreen } from '../../components/mobile/ApprovalListScreen';

import { useSmartFarmStore } from '../../store/smartFarmStore';
import { callLiveAI } from '../../services/aiService';

type FinanceTab =
  | 'menu_hub'
  | 'live_feed'
  | 'kas'
  | 'verifikasi'
  | 'hpp'
  | 'payroll'
  | 'ai'
  | 'alokasi_modal'
  | 'laporan_audit'
  | 'gudang'
  | 'timbangan'
  | 'ktp_sampel'
  | 'jadwal_tugas'
  | 'scan_daun'
  | 'siklus_lahan'
  | 'peta_gis'
  | 'master_komoditas'
  | 'kelola_user';

export const MobileFinanceDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<FinanceTab>('menu_hub');

  const { purchaseOrders } = useSmartFarmStore();

  // AI State
  const [aiInput, setAiInput] = useState('');
  const [aiMessages, setAiMessages] = useState<{ sender: 'user' | 'ai'; text: string; time: string }[]>([
    {
      sender: 'ai',
      text: 'Halo Tim Keuangan. Sistem Jurnal & Kas Jonggol aktif. Siap membantu audit atau rekonsiliasi.',
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
      const res = await callLiveAI(query, historyForAI, 'FINANCE', 'Ibu Siti Rahmawati (Manajer Keuangan)');
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
          text: 'Maaf, terjadi gangguan jaringan saat memproses konsultasi keuangan. Silakan coba lagi.',
          time: timeStr,
        },
      ]);
    }
  };

  return (
    <div
      className="w-full h-full flex flex-col overflow-hidden bg-[#071915] text-[#FAFBF8] relative"
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
          <div className="w-10 h-10 rounded-[13px] bg-gradient-to-tr from-[#0F5545] to-[#1FB88B] border border-white/30 flex items-center justify-center text-[#C8E86B] shadow-xs text-lg">
            <i className="ri-wallet-3-fill"></i>
          </div>
          <div>
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-black text-[15px] tracking-tight text-white">SMART FARM</span>
              <span className="bg-[#C8E86B] text-[#064E3B] font-black text-[9px] px-2 py-0.5 rounded-[5px] tracking-wider uppercase shadow-xs">
                FINANCE
              </span>
            </div>
            <span className="text-[9.5px] text-[#A7F3D0] font-medium tracking-wide mt-1 block">
              Manajemen Keuangan & Arus Kas
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

      {/* 2. Scrollable Body */}
      <div
        style={{
          WebkitOverflowScrolling: 'touch',
        }}
        className="flex-1 min-h-0 overflow-y-auto px-3 py-2.5 space-y-2.5 bg-[#F8FAF8] text-[#17211E]"
      >
        
        {/* ==================== 1. BUKU KAS & ARUS KAS ==================== */}
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
                  Periksa Semua ({purchaseOrders.filter((p) => p.status === 'PENDING_FINANCE').length}) &gt;
                </button>
              </div>
              {(() => {
                const pendingFinancePO = purchaseOrders.find((p) => p.status === 'PENDING_FINANCE');
                if (!pendingFinancePO) {
                  return (
                    <div className="p-2 rounded-[8px] bg-[#E8F1EA] text-[#0F5545] font-bold text-[10.5px] text-center">
                      ✓ Semua pengajuan PO telah terverifikasi
                    </div>
                  );
                }
                return (
                  <div className="p-2 rounded-[8px] bg-[#F8FAF8] border border-[#DDE5DF] flex justify-between items-center text-[11px]">
                    <div>
                      <strong className="block text-[#17211E]">{pendingFinancePO.id}: {pendingFinancePO.title}</strong>
                      <span className="text-[#0F5545] font-bold">Rp {pendingFinancePO.amount.toLocaleString('id-ID')}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab('verifikasi')}
                      className="px-2.5 py-1 bg-[#0F5545] text-white rounded-[6px] font-bold text-[10px] cursor-pointer hover:bg-[#0B3B30]"
                    >
                      Validasi
                    </button>
                  </div>
                );
              })()}
            </div>

            {/* Riwayat Mutasi Buku Kas */}
            <div className="bg-white rounded-[12px] p-2.5 border border-[#DDE5DF] shadow-2xs space-y-1.5">
              <span className="font-extrabold text-[11.5px] text-[#17211E] block">Mutasi Kas Terakhir</span>
              
              <div className="p-2 rounded-[8px] bg-[#F8FAF8] border border-[#DDE5DF] flex justify-between items-center text-[11px]">
                <div>
                  <strong className="block text-[#17211E]">Penjualan Melon Batch 3 (Off-taker)</strong>
                  <span className="text-[9.5px] text-[#5F6A65]">Inflow Bank Mandiri • 26 Agu</span>
                </div>
                <strong className="text-[#0F5545]">+Rp 45.000.000</strong>
              </div>

              <div className="p-2 rounded-[8px] bg-[#F8FAF8] border border-[#DDE5DF] flex justify-between items-center text-[11px]">
                <div>
                  <strong className="block text-[#17211E]">Pembayaran Upah Mandor Regu A</strong>
                  <span className="text-[9.5px] text-[#5F6A65]">Outflow Kas Operasional • 25 Agu</span>
                </div>
                <strong className="text-[#B91C1C]">-Rp 7.500.000</strong>
              </div>
            </div>
          </div>
        )}

        {/* ==================== 2. VERIFIKASI PO LAYER 1 ==================== */}
        {activeTab === 'verifikasi' && (
          <ApprovalListScreen onBack={() => setActiveTab('menu_hub')} />
        )}

        {/* ==================== 3. KALKULATOR HPP ==================== */}
        {activeTab === 'hpp' && (
          <KalkulatorHppScreen onBack={() => setActiveTab('menu_hub')} />
        )}

        {/* ==================== 4. PAYROLL & UPAH ==================== */}
        {activeTab === 'payroll' && (
          <PresensiUpahScreen onBack={() => setActiveTab('menu_hub')} />
        )}

        {/* ==================== 5. AI KEUANGAN ==================== */}
        {activeTab === 'ai' && (
          <div className="space-y-2 animate-in fade-in duration-150 pb-4">
            <h2 className="font-extrabold text-[13.5px] text-[#17211E] m-0">Konsultan AI Finance</h2>
            
            <div className="h-48 overflow-y-auto space-y-1.5 p-2 bg-[#FAFBF8] rounded-[10px] border border-[#DDE5DF]">
              {aiMessages.map((m, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded-[8px] text-[10.5px] ${
                    m.sender === 'user' ? 'bg-[#0F5545] text-white ml-6' : 'bg-white text-[#17211E] mr-6 border border-[#DDE5DF]'
                  }`}
                >
                  <p className="m-0">{m.text}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-1">
              <input
                type="text"
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                placeholder="Tanyakan analisis HPP, kas, atau PO..."
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 px-2.5 py-1.5 rounded-[6px] border border-[#DDE5DF] text-[11px] bg-white text-[#17211E]"
              />
              <button
                type="button"
                onClick={() => handleSendMessage()}
                className="px-3 bg-[#0F5545] text-white font-bold text-[11px] rounded-[6px] cursor-pointer"
              >
                Kirim
              </button>
            </div>
          </div>
        )}

        {/* ==================== SCREENS MODUL TAMBAHAN FINANCE ==================== */}
        {activeTab === 'alokasi_modal' && (
          <AlokasiModalScreen onBack={() => setActiveTab('menu_hub')} />
        )}
        {activeTab === 'laporan_audit' && (
          <LaporanAuditScreen onBack={() => setActiveTab('menu_hub')} />
        )}
        {activeTab === 'gudang' && (
          <StokGudangScreen onBack={() => setActiveTab('menu_hub')} />
        )}
        {activeTab === 'timbangan' && (
          <TimbanganPanenScreen onBack={() => setActiveTab('menu_hub')} />
        )}
        {activeTab === 'ktp_sampel' && (
          <KtpSampelScreen onBack={() => setActiveTab('menu_hub')} />
        )}
        {activeTab === 'scan_daun' && (
          <ScanDaunAiScreen onBack={() => setActiveTab('menu_hub')} />
        )}
        {activeTab === 'siklus_lahan' && (
          <Bukti8TahapScreen onBack={() => setActiveTab('menu_hub')} />
        )}
        {activeTab === 'peta_gis' && (
          <PetaGisMobileScreen onBack={() => setActiveTab('menu_hub')} />
        )}
        {activeTab === 'master_komoditas' && (
          <MasterKomoditasScreen onBack={() => setActiveTab('menu_hub')} />
        )}
        {activeTab === 'kelola_user' && (
          <KelolaUserScreen onBack={() => setActiveTab('menu_hub')} />
        )}
        {activeTab === 'jadwal_tugas' && (
          <JadwalTasklistScreen onBack={() => setActiveTab('menu_hub')} />
        )}
        {activeTab === 'live_feed' && (
          <LiveFeedKebunScreen onBack={() => setActiveTab('menu_hub')} userRole="FINANCE" />
        )}

        {/* ==================== 6. MENU HUB SUPER APP ==================== */}
        {activeTab === 'menu_hub' && (
          <MobileMenuHubView
            onSelectView={(viewId) => {
              if (viewId === 'live_feed') setActiveTab('live_feed');
              else if (viewId === 'buku_kas' || viewId === 'dasbor') setActiveTab('kas');
              else if (viewId === 'approval_po') setActiveTab('verifikasi');
              else if (viewId === 'kalkulator') setActiveTab('hpp');
              else if (viewId === 'presensi_sdm') setActiveTab('payroll');
              else if (viewId === 'tanya_ai') setActiveTab('ai');
              else if (viewId === 'alokasi_modal') setActiveTab('alokasi_modal');
              else if (viewId === 'laporan_audit') setActiveTab('laporan_audit');
              else if (viewId === 'gudang') setActiveTab('gudang');
              else if (viewId === 'timbangan') setActiveTab('timbangan');
              else if (viewId === 'ktp_sampel') setActiveTab('ktp_sampel');
              else if (viewId === 'scan_daun') setActiveTab('scan_daun');
              else if (viewId === 'siklus_lahan') setActiveTab('siklus_lahan');
              else if (viewId === 'peta_gis') setActiveTab('peta_gis');
              else if (viewId === 'master_komoditas') setActiveTab('master_komoditas');
              else if (viewId === 'kelola_user') setActiveTab('kelola_user');
              else if (viewId === 'jadwal_tugas') setActiveTab('jadwal_tugas');
            }}
          />
        )}
      </div>

      {/* 3. Bottom Navigation Bar */}
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
        className="w-full bg-white border-t border-[#E2EAE5] px-1 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] flex-shrink-0"
      >
        {/* 1. Menu Hub Grid */}
        <button
          type="button"
          onClick={() => setActiveTab('menu_hub')}
          style={{ background: 'transparent', border: 'none', outline: 'none' }}
          className={`flex-1 flex flex-col items-center justify-center py-1 text-center cursor-pointer relative ${
            activeTab === 'menu_hub' ? 'text-[#0F5545]' : 'text-[#5F6A65]'
          }`}
        >
          <i className={`${activeTab === 'menu_hub' ? 'ri-apps-2-fill' : 'ri-apps-2-line'} text-[18px] leading-none mb-0.5`}></i>
          <span className={`text-[9px] ${activeTab === 'menu_hub' ? 'font-extrabold text-[#0F5545]' : 'font-medium'}`}>
            Menu
          </span>
          {activeTab === 'menu_hub' && (
            <span className="w-4 h-0.5 rounded-full bg-[#82C341] absolute bottom-0.5 shadow-xs"></span>
          )}
        </button>

        {/* 2. Buku Kas */}
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
            Arus Kas
          </span>
        </button>

        {/* 3. Verifikasi PO */}
        <button
          type="button"
          onClick={() => setActiveTab('verifikasi')}
          style={{ background: 'transparent', border: 'none', outline: 'none' }}
          className={`flex-1 flex flex-col items-center justify-center py-1 text-center cursor-pointer ${
            activeTab === 'verifikasi' ? 'text-[#0F5545]' : 'text-[#5F6A65]'
          }`}
        >
          <i className="ri-file-shield-fill text-[18px] leading-none mb-0.5"></i>
          <span className={`text-[9px] ${activeTab === 'verifikasi' ? 'font-extrabold text-[#0F5545]' : 'font-medium'}`}>
            Verifikasi
          </span>
        </button>

        {/* 4. Kalkulator HPP */}
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
            HPP
          </span>
        </button>

        {/* 5. AI Finance */}
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
    </div>
  );
};
