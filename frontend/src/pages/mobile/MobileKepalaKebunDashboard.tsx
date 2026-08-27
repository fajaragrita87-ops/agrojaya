import React, { useState } from 'react';
import { MobileDrawer } from '../../components/mobile/MobileDrawer';
import { MobileTreeScannerModal } from '../../components/mobile/MobileTreeScannerModal';
import { MobileMenuHubView } from '../../components/mobile/MobileMenuHubView';
import { MobileProfileSettingsModal } from '../../components/mobile/MobileProfileSettingsModal';
import { MobileNotificationsModal } from '../../components/mobile/MobileNotificationsModal';
import { PetaGisMobileScreen } from '../../components/mobile/screens/PetaGisMobileScreen';
import { Bukti8TahapScreen } from '../../components/mobile/screens/Bukti8TahapScreen';
import { ScanDaunAiScreen } from '../../components/mobile/screens/ScanDaunAiScreen';
import { MasterKomoditasScreen } from '../../components/mobile/screens/MasterKomoditasScreen';
import { StokGudangScreen } from '../../components/mobile/screens/StokGudangScreen';
import { TimbanganPanenScreen } from '../../components/mobile/screens/TimbanganPanenScreen';
import { JadwalTasklistScreen } from '../../components/mobile/screens/JadwalTasklistScreen';
import { PresensiUpahScreen } from '../../components/mobile/screens/PresensiUpahScreen';

export const MobileKepalaKebunDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    | 'menu_hub'
    | 'scan'
    | 'tanah'
    | 'sop'
    | 'presensi'
    | 'ai'
    | 'peta_gis'
    | 'siklus_lahan'
    | 'scan_daun'
    | 'master_komoditas'
    | 'gudang'
    | 'timbangan'
    | 'jadwal_tugas'
    | 'presensi_sdm'
  >('menu_hub');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showNotifModal, setShowNotifModal] = useState(false);
  const [showTreeScanner, setShowTreeScanner] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);

  const handleSimulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScanResult('Diagnostik AI: 96% Sehat (Defisiensi Mg ringan). Semprotkan pupuk MgSO4 2 gr/L besok pagi.');
    }, 1000);
  };

  return (
    <div
      className="w-full h-full flex flex-col justify-between overflow-hidden bg-[#F4F7F5] text-[#17211E]"
      style={{ fontFamily: "'Plus Jakarta Sans', 'Manrope', sans-serif" }}
    >
      {/* 1. Header forest green #0B3B30 */}
      <div
        style={{ height: '48px', minHeight: '48px' }}
        className="w-full bg-[#0B3B30] border-b border-[#14473B] px-3.5 flex items-center justify-between flex-shrink-0 z-20 shadow-xs antialiased"
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0F5545] to-[#1FB88B] border border-white/25 flex items-center justify-center text-[#C8E86B] shadow-xs">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2 stroke-linecap-round stroke-linejoin-round">
              <path d="M12 3C8 3 4 7 4 12c0 4 3 7 7 8 0-4 1-8 4-11 3-3 7-4 7-4s-1 4-4 7c-3 3-7 4-11 4" strokeWidth="1.75" />
              <path d="M4 17c3-1 6-1 9 1" strokeWidth="1.5" />
              <path d="M5 21c4-2 8-2 12 0" strokeWidth="1.5" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-extrabold text-[13.5px] tracking-tight text-white">AGROJAYA</span>
              <span className="bg-[#C8E86B] text-[#08201A] font-extrabold text-[8.5px] px-1.5 py-0.5 rounded-[4px] tracking-wider uppercase shadow-2xs">
                KEPALA KEBUN
              </span>
            </div>
            <span className="text-[8px] text-[#A3D9C9] font-bold tracking-widest uppercase mt-0.5 block">
              SUPERVISI AGRONOMI
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Live Sync Status Indicator */}
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-[10px] font-bold text-[#C8E86B]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8E86B] animate-pulse"></span>
            <span>Live Sync</span>
          </span>
        </div>
      </div>

      {/* 2. Scrollable Body */}
      <div className="flex-1 min-h-0 overflow-y-auto px-3 py-2.5 space-y-2.5 bg-[#F8FAF8] text-[#17211E]">
        {/* ==================== 1. SCAN DAUN ==================== */}
        {activeTab === 'scan' && (
          <div className="space-y-2.5 animate-in fade-in duration-150 pb-4">
            <div className="flex items-center justify-between pt-0.5">
              <div>
                <h1 className="font-extrabold text-[14px] text-[#17211E] tracking-tight m-0">
                  Scan Daun & Diagnosa Hama
                </h1>
                <p className="text-[10px] text-[#5F6A65] m-0">Kamera AI deteksi dini defisiensi nutrisi & kutu daun.</p>
              </div>
              <span className="bg-[#E8F1EA] text-[#0F5545] text-[9.5px] font-bold px-2 py-0.5 rounded">
                Live Sensor
              </span>
            </div>

            <div className="bg-[#0B2F28] text-white rounded-[16px] p-3.5 text-center shadow-xs border border-[#14473B]">
              <i className="ri-camera-lens-fill text-3xl text-[#C8E86B] mb-1.5 block"></i>
              <h2 className="font-extrabold text-[13px] mb-0.5">Kamera AI Vision Lapangan</h2>
              <p className="text-[10px] text-white/75 mb-3">
                Arahkan lensa kamera pada permukaan daun yang berbercak.
              </p>
              <button
                type="button"
                onClick={handleSimulateScan}
                disabled={isScanning}
                className="w-full py-2 bg-[#C8E86B] text-[#0B2F28] font-extrabold text-[11.5px] rounded-[10px] cursor-pointer hover:bg-[#b5d859] transition-all shadow-xs"
              >
                {isScanning ? '🔍 Menganalisis Spektrum...' : '📸 Ambil Foto Daun AI'}
              </button>
            </div>

            {scanResult && (
              <div className="p-3 bg-white rounded-[14px] border border-[#0F5545] shadow-xs space-y-1.5 animate-in fade-in">
                <div className="flex items-center gap-1.5 text-[#0F5545] font-extrabold text-[11px]">
                  <i className="ri-checkbox-circle-fill"></i>
                  <span>Hasil Rekomendasi Agronom AI</span>
                </div>
                <p className="text-[11px] text-[#17211E] m-0 leading-relaxed">{scanResult}</p>
              </div>
            )}
          </div>
        )}

        {/* ==================== 2. UJI TANAH ==================== */}
        {activeTab === 'tanah' && (
          <div className="space-y-2 animate-in fade-in duration-150 pb-4">
            <h2 className="font-extrabold text-[13.5px] text-[#17211E] m-0">Uji Fisik & Kimia Tanah</h2>
            <div className="p-3 bg-white rounded-[14px] border border-[#DDE5DF] shadow-xs space-y-2 text-[11px]">
              <div className="flex justify-between border-b pb-1">
                <span className="text-[#5F6A65]">pH Tanah Rata-rata:</span>
                <strong className="text-[#0F5545]">6.5 (Optimal)</strong>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="text-[#5F6A65]">Kelembaban Subsoil:</span>
                <strong>68% (Kapasitas Lapang)</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5F6A65]">Konduktivitas EC:</span>
                <strong>1.8 mS/cm</strong>
              </div>
            </div>
          </div>
        )}

        {/* ==================== 3. SOP ==================== */}
        {activeTab === 'sop' && (
          <div className="space-y-2 animate-in fade-in duration-150 pb-4">
            <h2 className="font-extrabold text-[13.5px] text-[#17211E] m-0">SOP Komoditas & Perawatan</h2>
            <div className="p-3 bg-white rounded-[14px] border border-[#DDE5DF] shadow-xs space-y-2 text-[11px]">
              <strong className="text-[#0F5545] block">Melon Golden Apollo (Fase Pembesaran):</strong>
              <div>💧 <strong>Irigasi:</strong> Kocor EC 2.2 sebanyak 2L/pohon tiap jam 07:00 & 15:30.</div>
              <div>✂️ <strong>Pruning:</strong> Wiwit tunas cabang liar, pertahankan daun bendera.</div>
            </div>
          </div>
        )}

        {/* ==================== 4. PRESENSI ==================== */}
        {activeTab === 'presensi' && (
          <div className="space-y-2 animate-in fade-in duration-150 pb-4">
            <h2 className="font-extrabold text-[13.5px] text-[#17211E] m-0">Presensi Petani & Mandor</h2>
            <div className="p-3 bg-white rounded-[14px] border border-[#DDE5DF] shadow-xs space-y-1.5 text-[11px]">
              <div className="flex justify-between">
                <span>Regu A (Jonggol Timur):</span>
                <strong className="text-[#0F5545]">7 / 7 Hadir</strong>
              </div>
              <div className="flex justify-between">
                <span>Regu B (Jonggol Barat):</span>
                <strong className="text-[#0F5545]">7 / 7 Hadir</strong>
              </div>
            </div>
          </div>
        )}

        {/* ==================== 5. AI KEBUN ==================== */}
        {activeTab === 'ai' && (
          <div className="space-y-2 animate-in fade-in duration-150 pb-4">
            <h2 className="font-extrabold text-[13.5px] text-[#17211E] m-0">Konsultasi Agronomi AI</h2>
            <div className="p-3 bg-white rounded-[14px] border border-[#DDE5DF] shadow-xs text-[11px]">
              Tanyakan rekomendasi dosis pupuk, cuaca, atau penanganan hama ke AI Jaya.
            </div>
          </div>
        )}

        {/* ==================== 6. MENU HUB (CARD GRID SUPER APP) ==================== */}
        {activeTab === 'menu_hub' && (
          <MobileMenuHubView
            onSelectView={(viewId) => {
              if (viewId === 'dasbor' || viewId === 'scan_daun') setActiveTab('scan_daun');
              else if (viewId === 'peta_gis') setActiveTab('peta_gis');
              else if (viewId === 'siklus_lahan') setActiveTab('siklus_lahan');
              else if (viewId === 'master_komoditas') setActiveTab('master_komoditas');
              else if (viewId === 'gudang') setActiveTab('gudang');
              else if (viewId === 'timbangan') setActiveTab('timbangan');
              else if (viewId === 'jadwal_tugas') setActiveTab('jadwal_tugas');
              else if (viewId === 'presensi_sdm') setActiveTab('presensi_sdm');
              else if (viewId === 'tanya_ai') setActiveTab('ai');
              else if (viewId === 'ktp_pohon' || viewId === 'ktp_sampel') setShowTreeScanner(true);
            }}
          />
        )}

        {/* ==================== 7. SCREENS ==================== */}
        {activeTab === 'peta_gis' && (
          <PetaGisMobileScreen onBack={() => setActiveTab('menu_hub')} />
        )}
        {activeTab === 'siklus_lahan' && (
          <Bukti8TahapScreen onBack={() => setActiveTab('menu_hub')} />
        )}
        {activeTab === 'scan_daun' && (
          <ScanDaunAiScreen onBack={() => setActiveTab('menu_hub')} />
        )}
        {activeTab === 'master_komoditas' && (
          <MasterKomoditasScreen onBack={() => setActiveTab('menu_hub')} />
        )}
        {activeTab === 'gudang' && (
          <StokGudangScreen onBack={() => setActiveTab('menu_hub')} />
        )}
        {activeTab === 'timbangan' && (
          <TimbanganPanenScreen onBack={() => setActiveTab('menu_hub')} />
        )}
        {activeTab === 'jadwal_tugas' && (
          <JadwalTasklistScreen onBack={() => setActiveTab('menu_hub')} />
        )}
        {activeTab === 'presensi_sdm' && (
          <PresensiUpahScreen onBack={() => setActiveTab('menu_hub')} />
        )}
      </div>
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
          if (viewId === 'scan_daun' || viewId === 'dasbor') setActiveTab('scan');
          else if (viewId === 'peta_gis') setActiveTab('tanah');
          else if (viewId === 'siklus_lahan') setActiveTab('sop');
          else if (viewId === 'sdm') setActiveTab('presensi');
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
          if (notifType === 'HARVEST' || notifType === 'MAINTENANCE') setShowTreeScanner(true);
          else if (notifType === 'ALERT') setActiveTab('tanah');
        }}
      />
    </div>
  );
};
