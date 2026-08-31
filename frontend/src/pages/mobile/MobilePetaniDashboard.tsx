import React, { useState } from 'react';
import { MobileTreeScannerModal } from '../../components/mobile/MobileTreeScannerModal';
import { DynamicQRCode } from '../../components/common/DynamicQRCode';
import { MobileMenuHubView } from '../../components/mobile/MobileMenuHubView';
import { MobileProfileSettingsModal } from '../../components/mobile/MobileProfileSettingsModal';
import { MobileNotificationsModal } from '../../components/mobile/MobileNotificationsModal';
import { KtpSampelScreen } from '../../components/mobile/screens/KtpSampelScreen';
import { Bukti8TahapScreen } from '../../components/mobile/screens/Bukti8TahapScreen';
import { TimbanganPanenScreen } from '../../components/mobile/screens/TimbanganPanenScreen';
import { ScanDaunAiScreen } from '../../components/mobile/screens/ScanDaunAiScreen';
import { LiveFeedKebunScreen } from '../../components/mobile/screens/LiveFeedKebunScreen';
import { AlokasiModalScreen } from '../../components/mobile/screens/AlokasiModalScreen';
import { KalkulatorHppScreen } from '../../components/mobile/screens/KalkulatorHppScreen';
import { LaporanAuditScreen } from '../../components/mobile/screens/LaporanAuditScreen';
import { StokGudangScreen } from '../../components/mobile/screens/StokGudangScreen';
import { PetaGisMobileScreen } from '../../components/mobile/screens/PetaGisMobileScreen';
import { KelolaUserScreen } from '../../components/mobile/screens/KelolaUserScreen';
import { MobileRoleSwitcherModal } from '../../components/mobile/MobileRoleSwitcherModal';

import { useSmartFarmStore } from '../../store/smartFarmStore';

type PetaniTab =
  | 'menu_hub'
  | 'live_feed'
  | 'tugas'
  | 'sop'
  | 'scan_ktp'
  | 'ktp_sampel'
  | 'scan_daun'
  | 'absen'
  | 'siklus_lahan'
  | 'timbangan'
  | 'alokasi_modal'
  | 'kalkulator'
  | 'laporan_audit'
  | 'gudang'
  | 'peta_gis'
  | 'kelola_user';

export const MobilePetaniDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PetaniTab>('menu_hub');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showNotifModal, setShowNotifModal] = useState(false);
  const [showTreeScanner, setShowTreeScanner] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);

  // Global store
  const { tasks, toggleTask, addTreeLog, toggleAttendance, attendanceRecords } = useSmartFarmStore();

  const isCheckedIn = attendanceRecords.some((r) => r.workerName.includes('Asep'));

  // Quick Dropdown Maintenance State on Petani Screen
  const [selectedTreeCode, setSelectedTreeCode] = useState('SAMPLE-JGL-A2-0841');
  const [actionCategory, setActionCategory] = useState<'PENYIRAMAN' | 'PEMUPUKAN' | 'PRUNING' | 'HAMA'>('PENYIRAMAN');
  const [materialUsed, setMaterialUsed] = useState('Nutrisi AB Mix Organik (2L)');
  const [petaniNote, setPetaniNote] = useState('Kondisi daun hijau segar, tanah lembab optimal.');
  const [quickSuccessMsg, setQuickSuccessMsg] = useState<string | null>(null);

  // SOP Selected Commodity Tab
  const [selectedSOPCommodity, setSelectedSOPCommodity] = useState<'MELON' | 'PORANG' | 'CABAI'>('MELON');

  const [petaniLogs, setPetaniLogs] = useState([
    { id: '1', time: '07:15 WIB', tree: 'SAMPLE-JGL-A2-0841 (Melon A2)', action: 'Penyiraman Drip 2L Selesai', note: 'Irigasi pagi hari' },
    { id: '2', time: 'Kemarin 16:30', tree: 'SAMPLE-JGL-B1-0412 (Porang B1)', action: 'Pemupukan Kompos Trichoderma', note: 'Aplikasi pangkal batang' },
  ]);

  const handleToggleTask = (taskId: string) => {
    toggleTask(taskId);
  };

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
      tree: selectedTreeCode === 'SAMPLE-JGL-A2-0841' ? 'SAMPLE-JGL-A2-0841 (Melon A2)' : 'SAMPLE-JGL-B1-0412 (Porang B1)',
      action: `${actionCategory}: ${materialUsed}`,
      note: petaniNote,
    };

    setPetaniLogs([newEntry, ...petaniLogs]);

    // Persist directly to store so it appears in Tree Passport and Kepala Kebun feeds
    addTreeLog(selectedTreeCode, {
      time: `Hari ini ${timeStr}`,
      action: `${actionCategory}: ${materialUsed}`,
      detail: petaniNote,
      pic: 'Kang Asep (Regu A)',
    });

    setQuickSuccessMsg(`✅ Berhasil mencatat "${actionCategory}" untuk pohon ${selectedTreeCode}.`);
    setTimeout(() => setQuickSuccessMsg(null), 3000);
  };

  const handleToggleCheckIn = () => {
    toggleAttendance('Kang Asep Sunandar', 'Petani Lapangan', 'Kebun Jonggol Blok A2');
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
                PETANI / MANDOR
              </span>
            </div>
            <span className="text-[9.5px] text-[#A7F3D0] font-medium tracking-wide mt-1 block">
              Operasional Lapangan & Presensi
            </span>
          </div>
        </div>

        {/* Live Status Pill & Ganti Role Button */}
        <div className="flex items-center gap-2 relative z-10">
          <button
            type="button"
            onClick={() => setShowRoleModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/25 text-[11px] font-extrabold text-[#C8E86B] shadow-xs cursor-pointer transition-colors"
            title="Pilih dan Ganti Peran Pengguna"
          >
            <i className="ri-user-shared-line text-xs"></i>
            <span>Ganti Role</span>
          </button>
        </div>
      </div>

      {/* 2. Scrollable Body */}
      <div
        style={{
          WebkitOverflowScrolling: 'touch',
        }}
        className="flex-1 min-h-0 overflow-y-auto px-3 py-2.5 space-y-2.5 bg-[#F8FAF8] text-[#17211E]"
      >
        
        {/* ==================== 1. TUGAS HARIAN & TASKLIST ==================== */}
        {activeTab === 'tugas' && (
          <div className="space-y-3 animate-in fade-in duration-150 pb-4">
            <div className="flex items-center justify-between pt-0.5">
              <div>
                <h1 className="font-extrabold text-[14px] text-[#17211E] tracking-tight m-0">
                  Tugas Harian Mandor
                </h1>
                <p className="text-[10px] text-[#5F6A65] m-0">Jadwal kerja harian kebun Blok A & B.</p>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E8F5EE] text-[#047857] border border-[#047857]/20">
                {tasks.filter(t => t.completed).length} / {tasks.length} Selesai
              </span>
            </div>

            {/* Task list items */}
            <div className="space-y-2">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => handleToggleTask(task.id)}
                  className={`p-3 rounded-[12px] border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    task.completed
                      ? 'bg-[#F0FDF4] border-[#86EFAC] text-[#166534]'
                      : 'bg-white border-[#DDE5DF] hover:border-[#047857] shadow-2xs'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 transition-colors ${
                        task.completed ? 'bg-[#166534] text-white' : 'border-2 border-[#8A9B92] text-transparent'
                      }`}
                    >
                      ✓
                    </div>
                    <div>
                      <strong className={`block text-[12px] leading-tight ${task.completed ? 'line-through text-[#4B7C59]' : 'text-[#17211E]'}`}>
                        {task.title}
                      </strong>
                      <span className="text-[10px] text-[#5F6A65] block mt-0.5">
                        {task.target} • <span className="font-semibold text-[#047857]">{task.time}</span>
                      </span>
                    </div>
                  </div>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${task.completed ? 'bg-[#DCFCE7] text-[#166534]' : 'bg-[#FEF3C7] text-[#92400E]'}`}>
                    {task.completed ? 'SELESAI' : 'PROSES'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== 2. MASTER KOMODITAS & SOP ==================== */}
        {activeTab === 'sop' && (
          <div className="space-y-3 animate-in fade-in duration-150 pb-4">
            <div className="pt-0.5">
              <h1 className="font-extrabold text-[14px] text-[#17211E] tracking-tight m-0">
                SOP Komoditas & Dosis Perawatan
              </h1>
              <p className="text-[10px] text-[#5F6A65] m-0">Panduan standar baku operasional agronomi perkebunan.</p>
            </div>

            {/* Commodity Selector Tabs */}
            <div className="grid grid-cols-3 gap-1.5 bg-[#E8EEEA] p-1 rounded-[10px]">
              <button
                type="button"
                onClick={() => setSelectedSOPCommodity('MELON')}
                className={`py-1.5 text-[11px] font-bold rounded-[8px] transition-all cursor-pointer ${
                  selectedSOPCommodity === 'MELON' ? 'bg-[#047857] text-white shadow-xs' : 'text-[#5A6D63]'
                }`}
              >
                🍈 Melon Apollo
              </button>
              <button
                type="button"
                onClick={() => setSelectedSOPCommodity('PORANG')}
                className={`py-1.5 text-[11px] font-bold rounded-[8px] transition-all cursor-pointer ${
                  selectedSOPCommodity === 'PORANG' ? 'bg-[#047857] text-white shadow-xs' : 'text-[#5A6D63]'
                }`}
              >
                🥔 Porang Super
              </button>
              <button
                type="button"
                onClick={() => setSelectedSOPCommodity('CABAI')}
                className={`py-1.5 text-[11px] font-bold rounded-[8px] transition-all cursor-pointer ${
                  selectedSOPCommodity === 'CABAI' ? 'bg-[#047857] text-white shadow-xs' : 'text-[#5A6D63]'
                }`}
              >
                🌶️ Cabai Rawit
              </button>
            </div>

            {/* SOP Details Card */}
            {selectedSOPCommodity === 'MELON' && (
              <div className="space-y-2">
                <div className="p-3 bg-white rounded-[12px] border border-[#DDE5DF] shadow-2xs space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-extrabold text-[#047857]">1. Pengolahan Tanah & Bedengan</span>
                    <span className="text-[9px] font-bold bg-[#E8F5EE] text-[#047857] px-1.5 py-0.5 rounded">H-14 HST</span>
                  </div>
                  <p className="text-[10px] text-[#4B5E55] m-0">
                    Dolomit 150 kg/ha, pupuk kandang matang 2 ton/ha, pH tanah target: 6.2 - 6.8. Pasang plastik mulsa perak hitam.
                  </p>
                </div>

                <div className="p-3 bg-white rounded-[12px] border border-[#DDE5DF] shadow-2xs space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-extrabold text-[#047857]">2. Dosis Drip Irigasi AB Mix</span>
                    <span className="text-[9px] font-bold bg-[#E8F5EE] text-[#047857] px-1.5 py-0.5 rounded">H+1 s.d H+55 HST</span>
                  </div>
                  <p className="text-[10px] text-[#4B5E55] m-0">
                    EC Vegetatif: 1.5 - 1.8 mS/cm. EC Generatif (Pembesaran Buah): 2.2 - 2.5 mS/cm. Siram 2x sehari (07:30 & 15:30 WIB).
                  </p>
                </div>

                <div className="p-3 bg-white rounded-[12px] border border-[#DDE5DF] shadow-2xs space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-extrabold text-[#047857]">3. Standar Kualitas Panen</span>
                    <span className="text-[9px] font-bold bg-[#FEF3C7] text-[#92400E] px-1.5 py-0.5 rounded">H+65 s.d H+70 HST</span>
                  </div>
                  <p className="text-[10px] text-[#4B5E55] m-0">
                    Jaring net terbentuk 90%, aroma harum khas keluar, kadar kemanisan Brix minimum 13.5%, berat ideal 1.5 - 2.2 kg/buah.
                  </p>
                </div>
              </div>
            )}

            {selectedSOPCommodity === 'PORANG' && (
              <div className="space-y-2">
                <div className="p-3 bg-white rounded-[12px] border border-[#DDE5DF] shadow-2xs space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-extrabold text-[#047857]">1. Pemilihan Bibit Katak Super</span>
                    <span className="text-[9px] font-bold bg-[#E8F5EE] text-[#047857] px-1.5 py-0.5 rounded">Pra-Tanam</span>
                  </div>
                  <p className="text-[10px] text-[#4B5E55] m-0">
                    Katak dorman berat 50-100 gram/biji. Rendam larutan fungisida hayati Trichoderma 15 menit sebelum masuk polybag.
                  </p>
                </div>
                <div className="p-3 bg-white rounded-[12px] border border-[#DDE5DF] shadow-2xs space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-extrabold text-[#047857]">2. Pemupukan Organik & Aerasi</span>
                    <span className="text-[9px] font-bold bg-[#E8F5EE] text-[#047857] px-1.5 py-0.5 rounded">Bulan 1 s.d 4</span>
                  </div>
                  <p className="text-[10px] text-[#4B5E55] m-0">
                    Aplikasi kascing & guano 200 gr/pohon tiap 30 hari. Jaga drainase tanah agar tidak tergenang air (mencegah busuk umbi).
                  </p>
                </div>
              </div>
            )}

            {selectedSOPCommodity === 'CABAI' && (
              <div className="space-y-2">
                <div className="p-3 bg-white rounded-[12px] border border-[#DDE5DF] shadow-2xs space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-extrabold text-[#047857]">1. Pengendalian Hama Kutu Daun & Thrips</span>
                    <span className="text-[9px] font-bold bg-[#E8F5EE] text-[#047857] px-1.5 py-0.5 rounded">Rutin Mingguan</span>
                  </div>
                  <p className="text-[10px] text-[#4B5E55] m-0">
                    Semprot ekstrak daun mimba + minyak sereh wangi (5 ml/L). Pasang sticky trap kuning 40 titik per hektar.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==================== 3. SCAN KTP POHON ==================== */}
        {activeTab === 'scan_ktp' && (
          <div className="space-y-3 animate-in fade-in duration-150 pb-4">
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
                      {selectedTreeCode === 'SAMPLE-TR-A2-0842' ? 'Melon Apollo (Ajir #18)' : 'Porang Super (Ajir #08)'}
                    </strong>
                    <span className="text-[9.5px] text-[#A3D9C9] font-mono">{selectedTreeCode}</span>
                  </div>
                </div>
                <select
                  value={selectedTreeCode}
                  onChange={(e) => setSelectedTreeCode(e.target.value)}
                  className="bg-black/30 border border-white/20 rounded-[6px] text-[10px] text-white px-2 py-1 outline-none"
                >
                  <option value="SAMPLE-TR-A2-0842">Pohon Melon A2</option>
                  <option value="SAMPLE-TR-B1-0412">Pohon Porang B1</option>
                </select>
              </div>

              <div className="grid grid-cols-3 gap-1.5 text-center text-[10px]">
                <div className="bg-white/5 p-1 rounded-[6px]">
                  <span className="text-[#A3D9C9] block">Fase</span>
                  <strong className="text-[#C8E86B]">Generatif</strong>
                </div>
                <div className="bg-white/5 p-1 rounded-[6px]">
                  <span className="text-[#A3D9C9] block">Diameter</span>
                  <strong className="text-[#C8E86B]">14.2 cm</strong>
                </div>
                <div className="bg-white/5 p-1 rounded-[6px]">
                  <span className="text-[#A3D9C9] block">Brix Est.</span>
                  <strong className="text-[#C8E86B]">12.4%</strong>
                </div>
              </div>
            </div>

            {/* Form Input Perawatan */}
            <form onSubmit={handleSavePetaniLog} className="bg-white rounded-[14px] p-3 border border-[#DDE5DF] shadow-xs space-y-2 text-[11px]">
              <strong className="text-[12px] text-[#17211E] block">Catat Tindakan Lapangan</strong>
              
              <div className="grid grid-cols-4 gap-1">
                {(['PENYIRAMAN', 'PEMUPUKAN', 'PRUNING', 'HAMA'] as const).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleCategoryChange(cat)}
                    className={`py-1 rounded-[6px] font-bold text-[9.5px] border cursor-pointer ${
                      actionCategory === cat ? 'bg-[#0F5545] text-white border-[#0F5545]' : 'bg-[#FAFBF8] text-[#5F6A65] border-[#DDE5DF]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div>
                <label className="text-[10px] text-[#5F6A65] block mb-0.5">Dosis / Bahan Digunakan:</label>
                <input
                  type="text"
                  value={materialUsed}
                  onChange={(e) => setMaterialUsed(e.target.value)}
                  className="w-full px-2 py-1.5 rounded-[6px] border border-[#DDE5DF] text-[11px] font-medium"
                />
              </div>

              <div>
                <label className="text-[10px] text-[#5F6A65] block mb-0.5">Catatan Mandor:</label>
                <input
                  type="text"
                  value={petaniNote}
                  onChange={(e) => setPetaniNote(e.target.value)}
                  className="w-full px-2 py-1.5 rounded-[6px] border border-[#DDE5DF] text-[11px]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-[#0F5545] text-white font-extrabold text-[11.5px] rounded-[8px] shadow-xs cursor-pointer hover:bg-[#0B251E]"
              >
                Simpan Log Perawatan
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

        {/* ==================== 4. SCAN DAUN AI (DIAGNOSA PENYAKIT) ==================== */}
        {activeTab === 'scan_daun' && (
          <ScanDaunAiScreen onBack={() => setActiveTab('menu_hub')} />
        )}

        {/* ==================== 5. PRESENSI ABSEN ==================== */}
        {activeTab === 'absen' && (
          <div className="space-y-2.5 animate-in fade-in duration-150 pb-4">
            <div className="pt-0.5">
              <h1 className="font-extrabold text-[13.5px] text-[#17211E] tracking-tight m-0">
                Presensi Mandor / Petani
              </h1>
              <p className="text-[10px] text-[#5F6A65] m-0">Sentra Kebun Blok A • Regu A</p>
            </div>

            <div className="bg-white rounded-[14px] p-3 border border-[#DDE5DF] shadow-2xs text-center space-y-2">
              <button
                type="button"
                onClick={handleToggleCheckIn}
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

        {/* ==================== SCREEN MODUL TAMBAHAN PETANI / MANDOR ==================== */}
        {activeTab === 'live_feed' && (
          <LiveFeedKebunScreen onBack={() => setActiveTab('menu_hub')} userRole="PETANI" />
        )}
        {activeTab === 'ktp_sampel' && (
          <KtpSampelScreen onBack={() => setActiveTab('menu_hub')} />
        )}
        {activeTab === 'siklus_lahan' && (
          <Bukti8TahapScreen onBack={() => setActiveTab('menu_hub')} />
        )}
        {activeTab === 'timbangan' && (
          <TimbanganPanenScreen onBack={() => setActiveTab('menu_hub')} />
        )}
        {activeTab === 'alokasi_modal' && (
          <AlokasiModalScreen onBack={() => setActiveTab('menu_hub')} />
        )}
        {activeTab === 'kalkulator' && (
          <KalkulatorHppScreen onBack={() => setActiveTab('menu_hub')} />
        )}
        {activeTab === 'laporan_audit' && (
          <LaporanAuditScreen onBack={() => setActiveTab('menu_hub')} />
        )}
        {activeTab === 'gudang' && (
          <StokGudangScreen onBack={() => setActiveTab('menu_hub')} />
        )}
        {activeTab === 'peta_gis' && (
          <PetaGisMobileScreen onBack={() => setActiveTab('menu_hub')} />
        )}
        {activeTab === 'kelola_user' && (
          <KelolaUserScreen onBack={() => setActiveTab('menu_hub')} />
        )}

        {/* ==================== 6. MENU HUB (CARD GRID SUPER APP) ==================== */}
        {activeTab === 'menu_hub' && (
          <MobileMenuHubView
            onSelectView={(viewId) => {
              if (viewId === 'live_feed') setActiveTab('live_feed');
              else if (viewId === 'ktp_sampel') setActiveTab('ktp_sampel');
              else if (viewId === 'scan_daun') setActiveTab('scan_daun');
              else if (viewId === 'presensi_sdm') setActiveTab('absen');
              else if (viewId === 'jadwal_tugas') setActiveTab('tugas');
              else if (viewId === 'master_komoditas') setActiveTab('sop');
              else if (viewId === 'siklus_lahan') setActiveTab('siklus_lahan');
              else if (viewId === 'timbangan') setActiveTab('timbangan');
              else if (viewId === 'alokasi_modal' || viewId === 'buku_kas') setActiveTab('alokasi_modal');
              else if (viewId === 'kalkulator') setActiveTab('kalkulator');
              else if (viewId === 'laporan_audit') setActiveTab('laporan_audit');
              else if (viewId === 'gudang') setActiveTab('gudang');
              else if (viewId === 'peta_gis') setActiveTab('peta_gis');
              else if (viewId === 'kelola_user') setActiveTab('kelola_user');
              else if (viewId === 'ktp_pohon') setShowTreeScanner(true);
              else if (viewId === 'dasbor') setActiveTab('tugas');
            }}
          />
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
        {/* 1. Menu Modul (Super App Grid) */}
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

        {/* 2. Tugas Harian */}
        <button
          type="button"
          onClick={() => setActiveTab('tugas')}
          style={{ background: 'transparent', border: 'none', outline: 'none' }}
          className={`flex-1 flex flex-col items-center justify-center py-1 text-center cursor-pointer ${
            activeTab === 'tugas' ? 'text-[#0F5545]' : 'text-[#64746D]'
          }`}
        >
          <i className="ri-task-line text-[20px] leading-none mb-0.5"></i>
          <span className={`text-[9.5px] ${activeTab === 'tugas' ? 'font-bold text-[#0F5545]' : 'font-medium'}`}>
            Tugas
          </span>
        </button>

        {/* 3. SOP Komoditas */}
        <button
          type="button"
          onClick={() => setActiveTab('sop')}
          style={{ background: 'transparent', border: 'none', outline: 'none' }}
          className={`flex-1 flex flex-col items-center justify-center py-1 text-center cursor-pointer ${
            activeTab === 'sop' ? 'text-[#0F5545]' : 'text-[#64746D]'
          }`}
        >
          <i className="ri-plant-line text-[20px] leading-none mb-0.5"></i>
          <span className={`text-[9.5px] ${activeTab === 'sop' ? 'font-bold text-[#0F5545]' : 'font-medium'}`}>
            SOP
          </span>
        </button>

        {/* 4. Scan QR */}
        <button
          type="button"
          onClick={() => setShowTreeScanner(true)}
          style={{ background: 'transparent', border: 'none', outline: 'none' }}
          className="flex-1 flex flex-col items-center justify-center py-1 text-center cursor-pointer text-[#5F6F67] hover:text-[#0F5545]"
        >
          <i className="ri-qr-scan-2-line text-[20px] leading-none mb-0.5 text-[#0F5545]"></i>
          <span className="text-[9.5px] font-bold text-[#0F5545]">
            Scan QR
          </span>
        </button>

        {/* 5. Profil */}
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

      {/* Role Switcher Modal */}
      <MobileRoleSwitcherModal
        isOpen={showRoleModal}
        onClose={() => setShowRoleModal(false)}
      />
    </div>
  );
};
