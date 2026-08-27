import React, { useState } from 'react';
import { MobileDrawer } from '../../components/mobile/MobileDrawer';
import { MobileTreeScannerModal } from '../../components/mobile/MobileTreeScannerModal';
import { DynamicQRCode } from '../../components/common/DynamicQRCode';
import { MobileMenuHubView } from '../../components/mobile/MobileMenuHubView';
import { MobileProfileSettingsModal } from '../../components/mobile/MobileProfileSettingsModal';
import { MobileNotificationsModal } from '../../components/mobile/MobileNotificationsModal';

export const MobilePetaniDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'absen' | 'scan_ktp' | 'scan_daun' | 'tugas' | 'menu_hub'>('menu_hub');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showNotifModal, setShowNotifModal] = useState(false);
  const [showTreeScanner, setShowTreeScanner] = useState(false);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isScanningDaun, setIsScanningDaun] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);

  // Quick Dropdown Maintenance State on Petani Screen
  const [selectedTreeCode, setSelectedTreeCode] = useState('SAMPLE-JGL-A2-0842');
  const [actionCategory, setActionCategory] = useState<'PENYIRAMAN' | 'PEMUPUKAN' | 'PRUNING' | 'HAMA'>('PENYIRAMAN');
  const [materialUsed, setMaterialUsed] = useState('Nutrisi AB Mix Organik (2L)');
  const [petaniNote, setPetaniNote] = useState('Kondisi daun hijau segar, tanah lembab optimal.');
  const [quickSuccessMsg, setQuickSuccessMsg] = useState<string | null>(null);

  const [petaniLogs, setPetaniLogs] = useState([
    { id: '1', time: '07:15 WIB', tree: 'SAMPLE-JGL-A2-0842 (Melon A2)', action: 'Penyiraman Drip 2L Selesai', note: 'Irigasi pagi hari' },
    { id: '2', time: 'Kemarin 16:30', tree: 'SAMPLE-JGL-B1-0412 (Porang B1)', action: 'Pemupukan Kompos Trichoderma', note: 'Aplikasi pangkal batang' },
  ]);

  const handleCategoryChange = (cat: 'PENYIRAMAN' | 'PEMUPUKAN' | 'PRUNING' | 'HAMA') => {
    setActionCategory(cat);
    if (cat === 'PENYIRAMAN') setMaterialUsed('Nutrisi AB Mix Organik (2 Liter / pohon)');
    else if (cat === 'PEMUPUKAN') setMaterialUsed('Pupuk Daun MgSO4 + Boron (2 gr / Liter)');
    else if (cat === 'PRUNING') setMaterialUsed('Pewiwitan Tunas Air (Sisa 1 Buah Utama)');
    else if (cat === 'HAMA') setMaterialUsed('Bio-Trichoderma Hayati (5 ml / Liter)');
  };

  const handleSavePetaniLog = (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} WIB`;
    const newEntry = {
      id: String(Date.now()),
      time: `Hari Ini ${timeStr}`,
      tree: selectedTreeCode === 'SAMPLE-JGL-A2-0842' ? 'SAMPLE-JGL-A2-0842 (Melon A2)' : 'SAMPLE-JGL-B1-0412 (Porang B1)',
      action: `${actionCategory}: ${materialUsed}`,
      note: petaniNote,
    };

    setPetaniLogs([newEntry, ...petaniLogs]);
    setQuickSuccessMsg(`✅ Berhasil mencatat "${actionCategory}" untuk pohon ${selectedTreeCode}.`);
    setTimeout(() => setQuickSuccessMsg(null), 3000);
  };

  const handleSimulateScanDaun = () => {
    setIsScanningDaun(true);
    setTimeout(() => {
      setIsScanningDaun(false);
      setScanResult('Foto Daun Selesai: 98% Sehat & Subur. Lanjutkan penyiraman nutrisi drip jam 15:30.');
    }, 900);
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
                PETANI / MANDOR
              </span>
            </div>
            <span className="text-[8px] text-[#A3D9C9] font-bold tracking-widest uppercase mt-0.5 block">
              OPERASIONAL LAPANGAN
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
        {/* ==================== 1. SCAN KTP POHON ==================== */}
        {activeTab === 'scan_ktp' && (
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
            <div className="flex items-center justify-between pt-0.5">
              <div>
                <h1 className="font-extrabold text-[13.5px] text-[#17211E] tracking-tight m-0">
                  Scan KTP Ajir & Input Perawatan
                </h1>
                <p className="text-[10px] text-[#5F6A65] m-0">Pindai barcode pohon sampel untuk input log harian.</p>
              </div>
              <button
                type="button"
                onClick={() => setShowTreeScanner(true)}
                className="px-2.5 py-1.5 bg-[#0F5545] text-white rounded-[8px] text-[10.5px] font-bold flex items-center gap-1 shadow-xs cursor-pointer hover:bg-[#0B251E]"
              >
                <i className="ri-qr-scan-2-line"></i>
                <span>Buka Kamera</span>
              </button>
            </div>

            {quickSuccessMsg && (
              <div className="p-2 bg-[#E8F1EA] text-[#0F5545] rounded-[10px] text-[11px] font-extrabold text-center border border-[#0F5545]/20 animate-in fade-in">
                {quickSuccessMsg}
              </div>
            )}

            {/* Quick Tree Sample Card */}
            <div className="p-3 bg-gradient-to-br from-[#061E18] to-[#0A382E] text-white rounded-[16px] shadow-sm border border-[#1C8361]/30 space-y-2">
              <div className="flex justify-between items-center border-b border-white/15 pb-1.5">
                <div className="flex items-center gap-2">
                  <div className="bg-white rounded-[6px] p-0.5 shadow-xs">
                    <DynamicQRCode value={selectedTreeCode} size={38} />
                  </div>
                  <div>
                    <strong className="text-[12px] text-white block leading-tight">
                      {selectedTreeCode === 'SAMPLE-JGL-A2-0842' ? 'Melon Apollo (Ajir #18)' : 'Porang Super (Ajir #08)'}
                    </strong>
                    <span className="text-[9px] text-[#C8E86B] font-mono">{selectedTreeCode}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedTreeCode(selectedTreeCode === 'SAMPLE-JGL-A2-0842' ? 'SAMPLE-JGL-B1-0412' : 'SAMPLE-JGL-A2-0842')}
                  className="px-2 py-1 bg-white/10 hover:bg-white/20 text-[#C8E86B] text-[9.5px] font-bold rounded-[6px] cursor-pointer"
                >
                  Ganti Sampel ⟳
                </button>
              </div>

              <div className="grid grid-cols-3 gap-1 text-center text-[9.5px]">
                <div className="bg-white/10 p-1.5 rounded-[8px]">
                  <span className="block text-[#A3D9C9] text-[8px]">Usia Aktual</span>
                  <strong className="text-white">{selectedTreeCode === 'SAMPLE-JGL-A2-0842' ? '43 HST' : '78 HST'}</strong>
                </div>
                <div className="bg-white/10 p-1.5 rounded-[8px]">
                  <span className="block text-[#A3D9C9] text-[8px]">Kesehatan AI</span>
                  <strong className="text-[#C8E86B]">98% Optimal</strong>
                </div>
                <div className="bg-white/10 p-1.5 rounded-[8px]">
                  <span className="block text-[#A3D9C9] text-[8px]">Target Manis</span>
                  <strong className="text-white">{selectedTreeCode === 'SAMPLE-JGL-A2-0842' ? 'Brix 14.5°' : 'Kadar 65%'}</strong>
                </div>
              </div>
            </div>

            {/* Quick Dropdown Form on Petani Screen */}
            <form onSubmit={handleSavePetaniLog} className="bg-white rounded-[16px] p-3 border border-[#DDE5DF] shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <strong className="text-[11.5px] text-[#17211E]">📝 Catat Tindakan Hari Ini:</strong>
                <span className="text-[9px] text-[#0F5545] font-bold bg-[#E8F1EA] px-1.5 py-0.5 rounded">
                  Kang Asep (Petani)
                </span>
              </div>

              {/* 1. Dropdown Tindakan */}
              <div>
                <label className="text-[9.5px] font-bold text-[#5F6A65] block mb-0.5">
                  1. Pilih Jenis Perawatan:
                </label>
                <select
                  value={actionCategory}
                  onChange={(e) => handleCategoryChange(e.target.value as any)}
                  className="w-full p-2 bg-[#FAFBF8] border border-[#0F5545] rounded-[8px] text-[11px] font-extrabold text-[#0F5545] focus:outline-none"
                  required
                >
                  <option value="PENYIRAMAN">💧 Penyiraman (Irigasi Drip / Kocor)</option>
                  <option value="PEMUPUKAN">🧪 Pemupukan (AB Mix / MgSO4 / NPK)</option>
                  <option value="PRUNING">✂️ Pruning & Pewiwitan Tunas Air</option>
                  <option value="HAMA">🐛 Sanitasi & Pengendalian Hama / Jamur</option>
                </select>
              </div>

              {/* 2. Bahan & Dosis */}
              <div>
                <label className="text-[9.5px] font-bold text-[#5F6A65] block mb-0.5">
                  2. Bahan / Nutrisi / Takaran yang Dipakai:
                </label>
                <input
                  type="text"
                  value={materialUsed}
                  onChange={(e) => setMaterialUsed(e.target.value)}
                  className="w-full p-1.5 bg-[#FAFBF8] border border-[#DDE5DF] rounded-[8px] text-[11px] text-[#17211E]"
                  required
                />
              </div>

              {/* 3. Catatan Lapangan */}
              <div>
                <label className="text-[9.5px] font-bold text-[#5F6A65] block mb-0.5">
                  3. Catatan Kondisi Tanaman:
                </label>
                <input
                  type="text"
                  value={petaniNote}
                  onChange={(e) => setPetaniNote(e.target.value)}
                  className="w-full p-1.5 bg-[#FAFBF8] border border-[#DDE5DF] rounded-[8px] text-[11px] text-[#17211E]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-[#0F5545] text-white font-extrabold text-[11px] rounded-[10px] cursor-pointer hover:bg-[#0B251E] shadow-xs flex items-center justify-center gap-1.5"
              >
                <i className="ri-save-line"></i>
                <span>Simpan Log Perawatan ke KTP Pohon</span>
              </button>
            </form>

            {/* Riwayat Log Mandor Hari Ini */}
            <div className="bg-white rounded-[14px] p-3 border border-[#DDE5DF] shadow-xs space-y-1.5">
              <strong className="text-[11px] text-[#17211E] block">Riwayat Pengerjaan Hari Ini:</strong>
              <div className="space-y-1 text-[10px]">
                {petaniLogs.map((log) => (
                  <div key={log.id} className="p-2 rounded-[8px] bg-[#FAFBF8] border border-[#DDE5DF]">
                    <div className="flex justify-between items-center">
                      <strong className="text-[#17211E]">{log.action}</strong>
                      <span className="text-[#0F5545] font-bold text-[9px]">{log.time}</span>
                    </div>
                    <div className="text-[9px] text-[#5F6A65] mt-0.5">
                      Pohon: <span className="font-mono text-[#17211E]">{log.tree}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================== 2. SCAN DAUN AI (DIAGNOSA PENYAKIT) ==================== */}
        {activeTab === 'scan_daun' && (
          <div className="space-y-2.5 animate-in fade-in duration-150 pb-4">
            <h2 className="font-extrabold text-[13.5px] text-[#17211E] m-0">Diagnosa Daun & Vision AI</h2>
            <div className="bg-[#0B2F28] text-white rounded-[14px] p-3 text-center shadow-xs">
              <i className="ri-camera-lens-fill text-2xl text-[#C8E86B] mb-1 block"></i>
              <h3 className="font-bold text-[12px] mb-0.5">Kamera Deteksi Hama Lapangan</h3>
              <p className="text-[9.5px] text-white/75 mb-2">Arahkan foto ke daun yang menguning atau bercak.</p>
              <button
                type="button"
                onClick={handleSimulateScanDaun}
                disabled={isScanningDaun}
                className="w-full py-2 bg-[#C8E86B] text-[#0B2F28] font-extrabold text-[11px] rounded-[8px] cursor-pointer hover:bg-[#b5d859]"
              >
                {isScanningDaun ? '🔍 Menganalisis Daun...' : '📸 Ambil Foto Daun AI'}
              </button>
            </div>

            {scanResult && (
              <div className="p-2.5 bg-white rounded-[10px] border border-[#0F5545] text-[11px] shadow-2xs">
                <p className="m-0 text-[#17211E]">{scanResult}</p>
              </div>
            )}
          </div>
        )}

        {/* ==================== 3. PRESENSI ABSEN ==================== */}
        {activeTab === 'absen' && (
          <div className="space-y-2.5 animate-in fade-in duration-150 pb-4">
            <div className="pt-0.5">
              <h1 className="font-extrabold text-[13.5px] text-[#17211E] tracking-tight m-0">
                Presensi Mandor / Petani
              </h1>
              <p className="text-[10px] text-[#5F6A65] m-0">Kebun Jonggol Blok A • Regu A</p>
            </div>

            <div className="bg-white rounded-[14px] p-3 border border-[#DDE5DF] shadow-2xs text-center space-y-2">
              <button
                type="button"
                onClick={() => setIsCheckedIn(!isCheckedIn)}
                className={`w-24 h-24 mx-auto rounded-full font-black text-[12px] flex flex-col items-center justify-center shadow-md transition-all cursor-pointer ${
                  isCheckedIn
                    ? 'bg-[#0F5545] text-white ring-3 ring-[#7AE3B6]/50'
                    : 'bg-gradient-to-br from-[#0B2F28] to-[#0A4334] text-[#C8E86B] active:scale-95'
                }`}
              >
                <i className={`${isCheckedIn ? 'ri-checkbox-circle-fill text-2xl' : 'ri-fingerprint-fill text-2xl'} mb-0.5`}></i>
                <span>{isCheckedIn ? 'HADIR' : 'CHECK-IN'}</span>
              </button>
              <p className="text-[10px] text-[#5F6A65] m-0">
                {isCheckedIn ? 'Presensi GPS tercatat sah di Jonggol.' : 'Sentuh tombol untuk absen masuk.'}
              </p>
            </div>
          </div>
        )}

        {/* ==================== 4. TUGAS & SOP ==================== */}
        {activeTab === 'tugas' && (
          <div className="space-y-2 animate-in fade-in duration-150 pb-4">
            <h2 className="font-extrabold text-[13.5px] text-[#17211E] m-0">Tugas Harian Petani</h2>
            <div className="p-2.5 bg-white rounded-[12px] border border-[#DDE5DF] shadow-2xs flex items-center justify-between text-[11.5px]">
              <div>
                <strong className="block text-[#17211E]">Penyiraman Drip Blok A1 - A2</strong>
                <span className="text-[10px] text-[#5F6A65]">Target: 400 Lubang Tanam</span>
              </div>
              <span className="bg-[#E8F1EA] text-[#0F5545] font-bold px-2 py-0.5 rounded text-[9.5px]">
                Selesai
              </span>
            </div>
            <div className="p-2.5 bg-white rounded-[12px] border border-[#DDE5DF] shadow-2xs flex items-center justify-between text-[11.5px]">
              <div>
                <strong className="block text-[#17211E]">Cek KTP Sampel Ajir #18</strong>
                <span className="text-[10px] text-[#5F6A65]">Ukur diameter buah melon</span>
              </div>
              <span className="bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded text-[9.5px]">
                Pending
              </span>
            </div>
          </div>
        )}
        {/* ==================== 5. MENU HUB (CARD GRID SUPER APP) ==================== */}
        {activeTab === 'menu_hub' && (
          <MobileMenuHubView
            onSelectView={(viewId) => {
              if (viewId === 'ktp_pohon') setActiveTab('scan_ktp');
              else if (viewId === 'scan_daun') setActiveTab('scan_daun');
              else if (viewId === 'sdm' || viewId === 'dasbor') setActiveTab('absen');
              else if (viewId === 'tasklist' || viewId === 'siklus_lahan') setActiveTab('tugas');
            }}
          />
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
          if (viewId === 'ktp_pohon') setActiveTab('scan_ktp');
          else if (viewId === 'scan_daun') setActiveTab('scan_daun');
          else if (viewId === 'sdm' || viewId === 'dasbor') setActiveTab('absen');
          else if (viewId === 'tasklist' || viewId === 'siklus_lahan') setActiveTab('tugas');
        }}
      />

      {/* Full Modal Scanner Camera */}
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
        }}
      />
    </div>
  );
};
