import React, { useState, useEffect, useRef } from 'react';
import { DynamicQRCode } from '../common/DynamicQRCode';

export interface GrowthStage {
  stage: string;
  day: number;
  date: string;
  heightCm: number;
  note: string;
  icon: string;
}

export interface MaintenanceLog {
  id: string;
  date: string;
  actionType: 'PENYIRAMAN' | 'PEMUPUKAN' | 'PRUNING' | 'HAMA_PENYAKIT' | 'PENGUKURAN' | 'UJI_BRIX';
  actionName: string;
  material: string;
  dose: string;
  workerName: string;
  notes: string;
}

export interface ScannedTree {
  code: string;
  variety: string;
  block: string;
  rowAjir: string;
  plantingDate: string;
  ageDays: number;
  phase: string;
  farmer: string;
  mandor: string;
  lastTreatment: string;
  healthScore: number;
  targetBrix: string;
  estYieldKg: number;
  gpsCoords: string;
  gapCertificateNo: string;
  growthStory: GrowthStage[];
  maintenanceLogs: MaintenanceLog[];
}

interface MobileTreeScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileTreeScannerModal: React.FC<MobileTreeScannerModalProps> = ({ isOpen, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedTree, setScannedTree] = useState<ScannedTree | null>(null);
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'ktp' | 'input_log' | 'riwayat_rawat' | 'timelapse' | 'sertifikat'>('ktp');
  const [selectedGrowthIdx, setSelectedGrowthIdx] = useState<number>(3);

  // Form State for Field Worker Maintenance Log
  const [formActionType, setFormActionType] = useState<MaintenanceLog['actionType']>('PEMUPUKAN');
  const [formActionName, setFormActionName] = useState('Aplikasi Pupuk Daun Mikro MgSO4');
  const [formMaterial, setFormMaterial] = useState('MgSO4 + Boron');
  const [formDose, setFormDose] = useState('2 gr / Liter air');
  const [formWorker, setFormWorker] = useState('Kang Asep (Petani)');
  const [formNotes, setFormNotes] = useState('Daun hijau segar, disemprot merata pagi hari.');

  if (!isOpen) return null;

  const mockTrees: Record<string, ScannedTree> = {
    'SAMPLE-JGL-A2-0842': {
      code: 'SAMPLE-JGL-A2-0842',
      variety: 'Melon Golden Apollo F1',
      block: 'Blok A2 (Jonggol 2.0 Ha)',
      rowAjir: 'Baris 4 • Ajir #18 (Sampel #1)',
      plantingDate: '15 Juli 2026',
      ageDays: 43,
      phase: 'Fase 4: Pembesaran Buah',
      farmer: 'Kang Asep (Regu A)',
      mandor: 'Pak Joko',
      lastTreatment: 'Semprot Mikro MgSO4 & Boron',
      healthScore: 97.8,
      targetBrix: 'Brix 14° – 16°',
      estYieldKg: 2.5,
      gpsCoords: '-6.46975, 107.05834',
      gapCertificateNo: 'GAP-EXP-2026-0982 (0% Residu Kimia)',
      growthStory: [
        { stage: '1. Bibit 10cm', day: 1, date: '15 Jul', heightCm: 12, note: 'Bibit F1 ditanam di bedengan mulsa perak.', icon: 'ri-seedling-line' },
        { stage: '2. Vegetatif', day: 20, date: '04 Agu', heightCm: 68, note: 'Batang sulur merambat ajir, daun tebal.', icon: 'ri-plant-line' },
        { stage: '3. Berbunga', day: 32, date: '16 Agu', heightCm: 142, note: 'Polinasi manual bunga betina ruas 10.', icon: 'ri-contrast-drop-2-line' },
        { stage: '4. Pembesaran (Aktif)', day: 43, date: '27 Agu', heightCm: 188, note: 'Netting buah rapat, berat 2,5 Kg.', icon: 'ri-focus-3-line' },
        { stage: '5. Panen Manis', day: 60, date: '14 Sep', heightCm: 190, note: 'Target Brix 15°+ siap panen.', icon: 'ri-gift-line' },
      ],
      maintenanceLogs: [
        { id: 'LOG-001', date: '27 Agu 07:15', actionType: 'PENYIRAMAN', actionName: 'Irigasi Drip Pagi', material: 'Nutrisi AB Mix Organik', dose: '2.0 Liter (EC 2.2)', workerName: 'Kang Asep', notes: 'Tanah lembab optimal.' },
        { id: 'LOG-002', date: '26 Agu 16:30', actionType: 'PEMUPUKAN', actionName: 'Semprot Pupuk Mikro MgSO4', material: 'MgSO4 + Boron', dose: '2 gr / Liter', workerName: 'Kang Asep', notes: 'Daun hijau optimal.' },
        { id: 'LOG-003', date: '24 Agu 08:00', actionType: 'PRUNING', actionName: 'Pruning Cabang Air', material: 'Gunting Kebun Steril', dose: 'Sisa 1 Buah Utama', workerName: 'Pak Joko', notes: 'Pewiwitan tunas air ruas bawah.' },
      ],
    },
    'SAMPLE-JGL-B1-0412': {
      code: 'SAMPLE-JGL-B1-0412',
      variety: 'Porang Madiun Super',
      block: 'Blok B1 (Jonggol 2.0 Ha)',
      rowAjir: 'Baris 2 • Ajir #08 (Sampel #2)',
      plantingDate: '10 Juni 2026',
      ageDays: 78,
      phase: 'Fase 5: Pembentukan Umbi',
      farmer: 'Pak Ujang (Regu B)',
      mandor: 'Pak Budi',
      lastTreatment: 'Aplikasi Kompos Trichoderma',
      healthScore: 94.2,
      targetBrix: 'Kadar Glukomanan 65%',
      estYieldKg: 3.8,
      gpsCoords: '-6.47012, 107.05910',
      gapCertificateNo: 'GAP-EXP-2026-0811 (Food Grade)',
      growthStory: [
        { stage: '1. Tanam Katak', day: 1, date: '10 Jun', heightCm: 8, note: 'Penanaman umbi katak dormansi pecah.', icon: 'ri-seedling-line' },
        { stage: '2. Tunas Daun', day: 30, date: '10 Jul', heightCm: 45, note: 'Tangkai tunggal melebar membentuk payung.', icon: 'ri-plant-line' },
        { stage: '3. Umbi Bawah', day: 78, date: '27 Agu', heightCm: 85, note: 'Katak cabang keluar, umbi utama membesar.', icon: 'ri-focus-3-line' },
      ],
      maintenanceLogs: [
        { id: 'LOG-005', date: '26 Agu 09:00', actionType: 'HAMA_PENYAKIT', actionName: 'Penyiangan Gulma & Sanitasi', material: 'Manual Cabut', dose: 'Bedengan 10 Meter', workerName: 'Pak Ujang', notes: 'Gulma dibersihkan.' },
      ],
    },
    'SAMPLE-JGL-C1-0119': {
      code: 'SAMPLE-JGL-C1-0119',
      variety: 'Cabai Rawit Ori 212',
      block: 'Blok C1 (Jonggol 2.0 Ha)',
      rowAjir: 'Baris 5 • Ajir #32 (Sampel #3)',
      plantingDate: '01 Juli 2026',
      ageDays: 57,
      phase: 'Fase 4: Pembungaan & Buah',
      farmer: 'Mang Deden (Regu C)',
      mandor: 'Pak Joko',
      lastTreatment: 'Kalsium Organik Anti Antraknosa',
      healthScore: 96.0,
      targetBrix: 'Pedas Grade A (SHU Tinggi)',
      estYieldKg: 1.2,
      gpsCoords: '-6.46890, 107.05412',
      gapCertificateNo: 'GAP-EXP-2026-0610 (Residu Rendah)',
      growthStory: [
        { stage: '1. Tanam Semai', day: 1, date: '01 Jul', heightCm: 15, note: 'Semai mulsa perak.', icon: 'ri-seedling-line' },
        { stage: '2. Cabang Y', day: 20, date: '20 Jul', heightCm: 40, note: 'Percabangan kokoh.', icon: 'ri-plant-line' },
        { stage: '3. Buah Lebat', day: 57, date: '27 Agu', heightCm: 95, note: 'Cabai mulai menguning dan lebat.', icon: 'ri-focus-3-line' },
      ],
      maintenanceLogs: [
        { id: 'LOG-006', date: '27 Agu 06:45', actionType: 'PEMUPUKAN', actionName: 'Semprot Kalsium Cair', material: 'Kalsium Organik', dose: '2 ml / L', workerName: 'Mang Deden', notes: 'Cegah busuk pantat buah.' },
      ],
    },
  };

  const handleActionTypeSelect = (type: MaintenanceLog['actionType']) => {
    setFormActionType(type);
    switch (type) {
      case 'PENYIRAMAN':
        setFormActionName('Penyiraman Irigasi Drip');
        setFormMaterial('Nutrisi AB Mix');
        setFormDose('2.0 Liter / pohon');
        break;
      case 'PEMUPUKAN':
        setFormActionName('Pemupukan Daun Mikro');
        setFormMaterial('MgSO4 + Boron');
        setFormDose('2 gr / Liter air');
        break;
      case 'PRUNING':
        setFormActionName('Pruning & Pewiwitan Tunas');
        setFormMaterial('Gunting Steril');
        setFormDose('Sisa 1 Buah Utama');
        break;
      case 'HAMA_PENYAKIT':
        setFormActionName('Pengendalian Hama / Sanitasi');
        setFormMaterial('Bio-Trichoderma');
        setFormDose('5 ml / Liter air');
        break;
      case 'PENGUKURAN':
        setFormActionName('Pengukuran Tinggi & Caliper');
        setFormMaterial('Meteran & Caliper');
        setFormDose('Tinggi 188 cm, Diameter 16 cm');
        break;
      case 'UJI_BRIX':
        setFormActionName('Pengujian Kadar Gula (Brix)');
        setFormMaterial('Refraktometer Digital');
        setFormDose('Brix 14.5° (Optimal)');
        break;
    }
  };

  const startCamera = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment', width: { ideal: 640 }, height: { ideal: 480 } },
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setIsCameraActive(true);
      }
    } catch {
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  useEffect(() => {
    if (isOpen && !scannedTree) {
      startCamera();
    }
    return () => {
      stopCamera();
    };
  }, [isOpen, scannedTree]);

  const handleClose = () => {
    stopCamera();
    onClose();
  };

  const handleTriggerScan = (treeCode: string) => {
    setIsScanning(true);
    setScannedTree(null);
    setActionSuccessMsg(null);
    setActiveTab('ktp');

    setTimeout(() => {
      setIsScanning(false);
      stopCamera();
      setScannedTree(mockTrees[treeCode] || mockTrees['SAMPLE-JGL-A2-0842']);
    }, 600);
  };

  const handleSaveMobileLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scannedTree) return;

    const now = new Date();
    const dateStr = `Hari Ini ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newLog: MaintenanceLog = {
      id: `LOG-${Date.now()}`,
      date: dateStr,
      actionType: formActionType,
      actionName: formActionName,
      material: formMaterial,
      dose: formDose,
      workerName: formWorker,
      notes: formNotes,
    };

    setScannedTree({
      ...scannedTree,
      lastTreatment: `${formActionName} (${dateStr})`,
      maintenanceLogs: [newLog, ...scannedTree.maintenanceLogs],
    });

    setActionSuccessMsg(`✅ Berhasil mencatat "${formActionName}" ke KTP Sampel.`);
    setTimeout(() => setActionSuccessMsg(null), 3000);
    setActiveTab('riwayat_rawat');
  };

  return (
    <div className="absolute inset-0 bg-black/80 z-50 flex flex-col justify-end p-0 backdrop-blur-xs text-[#17211E] animate-in fade-in duration-150">
      <div className="bg-[#FAFBF8] w-full rounded-t-[24px] max-h-[94%] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-200">
        {/* Header Bar */}
        <div className="p-3.5 bg-[#061E18] text-white flex items-center justify-between border-b border-[#14473B] flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-[7px] bg-[#C8E86B] text-[#061E18] flex items-center justify-center font-bold text-sm">
              <i className="ri-qr-scan-2-line"></i>
            </div>
            <div>
              <div className="flex items-center gap-1.5 leading-none">
                <span className="font-extrabold text-[12px] text-white">SCANNER KTP SAMPEL POHON</span>
                <span className="bg-[#C8E86B]/20 text-[#C8E86B] text-[8px] font-black px-1.5 py-0.2 rounded border border-[#C8E86B]/30">
                  {isCameraActive ? '📷 KAMERA AKTIF' : 'MONITORING'}
                </span>
              </div>
              <span className="text-[8.5px] text-[#A3D9C9]">Pindai Ajir & Input Log Perawatan Harian</span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="w-7 h-7 rounded-full bg-white/10 text-white flex items-center justify-center font-bold text-sm cursor-pointer hover:bg-white/20"
          >
            &times;
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {/* Scanner Viewfinder Box */}
          {!scannedTree && (
            <div className="space-y-3">
              <div className="relative h-52 rounded-[18px] bg-black border border-[#1C8361]/40 flex flex-col items-center justify-center text-white overflow-hidden shadow-inner p-4 text-center">
                {/* Live Video Element */}
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className={`absolute inset-0 w-full h-full object-cover ${isCameraActive ? 'opacity-100' : 'opacity-0'}`}
                />

                {/* Scanner Laser & Viewfinder Brackets */}
                <div className="absolute inset-x-8 top-6 bottom-6 border-2 border-dashed border-[#C8E86B] rounded-[16px] flex items-center justify-center pointer-events-none z-10">
                  <div className="w-full h-0.5 bg-[#C8E86B] shadow-[0_0_14px_#C8E86B] animate-pulse"></div>
                </div>

                {!isCameraActive && (
                  <div className="relative z-10 flex flex-col items-center">
                    <i className="ri-qr-code-line text-4xl text-[#C8E86B] mb-1"></i>
                    <strong className="text-[12px] text-white">Arahkan Kamera ke Barcode Ajir Sampel</strong>
                    <span className="text-[9.5px] text-[#A3D9C9] max-w-[210px] mt-0.5">
                      Pindai QR pohon sampel untuk input riwayat siram, pupuk, atau pruning.
                    </span>
                    <button
                      type="button"
                      onClick={startCamera}
                      className="mt-2.5 px-3 py-1 bg-white/15 hover:bg-white/25 rounded-full text-[10px] font-bold text-white border border-white/20 cursor-pointer"
                    >
                      📷 Buka Kamera Device
                    </button>
                  </div>
                )}
              </div>

              {/* Simulation Quick Scan Buttons with Real Dynamic QR Codes */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0F5545] block">
                  Simulasi Pindai Barcode Ajir Sampel:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleTriggerScan('SAMPLE-JGL-A2-0842')}
                    disabled={isScanning}
                    className="p-2 rounded-[12px] bg-white border border-[#DDE5DF] shadow-xs text-left cursor-pointer hover:border-[#0F5545] transition-all flex items-center gap-2"
                  >
                    <DynamicQRCode value="SAMPLE-JGL-A2-0842" size={34} />
                    <div>
                      <strong className="text-[11px] text-[#17211E] block leading-tight">Melon Sampel #1</strong>
                      <span className="text-[8.5px] text-[#5F6A65] font-mono block mt-0.5">A2 #18 (43 HST)</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleTriggerScan('SAMPLE-JGL-B1-0412')}
                    disabled={isScanning}
                    className="p-2 rounded-[12px] bg-white border border-[#DDE5DF] shadow-xs text-left cursor-pointer hover:border-[#0F5545] transition-all flex items-center gap-2"
                  >
                    <DynamicQRCode value="SAMPLE-JGL-B1-0412" size={34} />
                    <div>
                      <strong className="text-[11px] text-[#17211E] block leading-tight">Porang Sampel #2</strong>
                      <span className="text-[8.5px] text-[#5F6A65] font-mono block mt-0.5">B1 #08 (78 HST)</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleTriggerScan('SAMPLE-JGL-C1-0119')}
                    disabled={isScanning}
                    className="p-2 rounded-[12px] bg-white border border-[#DDE5DF] shadow-xs text-left cursor-pointer hover:border-[#0F5545] transition-all flex items-center gap-2 col-span-2"
                  >
                    <DynamicQRCode value="SAMPLE-JGL-C1-0119" size={34} />
                    <div>
                      <strong className="text-[11px] text-[#17211E] block leading-tight">Cabai Rawit Sampel #3</strong>
                      <span className="text-[8.5px] text-[#5F6A65] font-mono block mt-0.5">Blok C1 #32 • Buah Lebat (57 HST)</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ==================== DISPLAY KTP POHON SAMPEL ==================== */}
          {scannedTree && (
            <div className="space-y-2.5 animate-in fade-in duration-200">
              {actionSuccessMsg && (
                <div className="p-2 bg-[#E8F1EA] text-[#0F5545] rounded-[10px] text-[11px] font-extrabold text-center border border-[#0F5545]/20 animate-in fade-in">
                  {actionSuccessMsg}
                </div>
              )}

              {/* 5 Feature Sub-Tabs */}
              <div className="grid grid-cols-5 gap-1 bg-[#E8F3ED] p-1 rounded-[10px]">
                <button
                  type="button"
                  onClick={() => setActiveTab('ktp')}
                  className={`py-1 text-center rounded-[8px] font-bold text-[8.5px] transition-all ${
                    activeTab === 'ktp' ? 'bg-[#0F5545] text-white shadow-xs' : 'text-[#5F6A65]'
                  }`}
                >
                  🪪 KTP
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('input_log')}
                  className={`py-1 text-center rounded-[8px] font-bold text-[8.5px] transition-all ${
                    activeTab === 'input_log' ? 'bg-[#0F5545] text-white shadow-xs' : 'text-[#5F6A65]'
                  }`}
                >
                  📝 + Log
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('riwayat_rawat')}
                  className={`py-1 text-center rounded-[8px] font-bold text-[8.5px] transition-all ${
                    activeTab === 'riwayat_rawat' ? 'bg-[#0F5545] text-white shadow-xs' : 'text-[#5F6A65]'
                  }`}
                >
                  📋 Rawat
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('timelapse')}
                  className={`py-1 text-center rounded-[8px] font-bold text-[8.5px] transition-all ${
                    activeTab === 'timelapse' ? 'bg-[#0F5545] text-white shadow-xs' : 'text-[#5F6A65]'
                  }`}
                >
                  📸 Foto
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('sertifikat')}
                  className={`py-1 text-center rounded-[8px] font-bold text-[8.5px] transition-all ${
                    activeTab === 'sertifikat' ? 'bg-[#0F5545] text-white shadow-xs' : 'text-[#5F6A65]'
                  }`}
                >
                  📜 Mutu
                </button>
              </div>

              {/* TAB 1: KTP SAMPEL */}
              {activeTab === 'ktp' && (
                <div className="space-y-2.5 animate-in fade-in">
                  <div className="rounded-[16px] bg-gradient-to-br from-[#061E18] via-[#0A382E] to-[#0F4E40] text-white p-3.5 shadow-md border border-[#1C8361]/40">
                    <div className="flex items-center justify-between mb-2 pb-2 border-b border-white/15">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-[7px] bg-[#C8E86B] text-[#061E18] flex items-center justify-center font-black text-xs">
                          <i className="ri-leaf-fill"></i>
                        </div>
                        <div>
                          <strong className="text-[12px] text-white block leading-tight">PASPOR POHON SAMPEL</strong>
                          <span className="text-[8.5px] text-[#C8E86B] font-bold">MONITORING KEBUN</span>
                        </div>
                      </div>
                      <div className="bg-white rounded-[6px] p-0.5 shadow-xs">
                        <DynamicQRCode value={scannedTree.code} size={46} />
                      </div>
                    </div>

                    <div className="space-y-1 text-[10.5px]">
                      <div className="flex justify-between">
                        <span className="text-[#A3D9C9]">Kode Sampel:</span>
                        <strong className="text-white font-mono">{scannedTree.code}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#A3D9C9]">Varietas:</span>
                        <strong className="text-white">{scannedTree.variety}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#A3D9C9]">Lokasi / Ajir:</span>
                        <strong className="text-white">{scannedTree.block} ({scannedTree.rowAjir})</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#A3D9C9]">Tanggal Tanam:</span>
                        <strong className="text-white">{scannedTree.plantingDate}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#A3D9C9]">Usia Aktual (HST):</span>
                        <strong className="text-[#C8E86B]">{scannedTree.ageDays} HST • {scannedTree.phase}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#A3D9C9]">Petani / Mandor:</span>
                        <strong className="text-white">{scannedTree.farmer} • {scannedTree.mandor}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#A3D9C9]">Perawatan Terakhir:</span>
                        <strong className="text-white">{scannedTree.lastTreatment}</strong>
                      </div>
                    </div>

                    {/* 3 Metric Pills */}
                    <div className="grid grid-cols-3 gap-1.5 mt-2.5 pt-2 border-t border-white/15 text-center text-[9.5px]">
                      <div className="bg-white/10 p-1.5 rounded-[8px]">
                        <span className="block text-[#A3D9C9] text-[8px]">Kesehatan AI</span>
                        <strong className="text-white text-[10.5px]">{scannedTree.healthScore}% Sehat</strong>
                      </div>
                      <div className="bg-white/10 p-1.5 rounded-[8px]">
                        <span className="block text-[#A3D9C9] text-[8px]">Target Brix</span>
                        <strong className="text-[#C8E86B] text-[10.5px]">{scannedTree.targetBrix}</strong>
                      </div>
                      <div className="bg-white/10 p-1.5 rounded-[8px]">
                        <span className="block text-[#A3D9C9] text-[8px]">Est. Bobot</span>
                        <strong className="text-white text-[10.5px]">{scannedTree.estYieldKg} Kg</strong>
                      </div>
                    </div>
                  </div>

                  {/* Button to Open Quick Log */}
                  <button
                    type="button"
                    onClick={() => setActiveTab('input_log')}
                    className="w-full py-2.5 bg-[#0F5545] text-white font-extrabold text-[11px] rounded-[10px] flex items-center justify-center gap-1.5 cursor-pointer hover:bg-[#0B251E] shadow-sm"
                  >
                    <i className="ri-edit-box-line text-base"></i>
                    <span>+ Catat Tindakan Perawatan Pohon Ini</span>
                  </button>
                </div>
              )}

              {/* TAB 2: INPUT LOG DROPDOWN PERAWATAN */}
              {activeTab === 'input_log' && (
                <form onSubmit={handleSaveMobileLog} className="space-y-2.5 animate-in fade-in">
                  <div className="bg-white rounded-[16px] p-3 border border-[#DDE5DF] shadow-xs space-y-2">
                    <strong className="text-[11.5px] text-[#17211E] block">
                      📝 Pilih Tindakan Perawatan Lapangan:
                    </strong>

                    {/* Dropdown 1: Action Type */}
                    <div>
                      <label className="text-[9.5px] font-bold text-[#5F6A65] block mb-0.5">
                        1. Kategori Tindakan:
                      </label>
                      <select
                        value={formActionType}
                        onChange={(e) => handleActionTypeSelect(e.target.value as MaintenanceLog['actionType'])}
                        className="w-full p-2 bg-[#FAFBF8] border border-[#0F5545] rounded-[8px] text-[11px] font-extrabold text-[#0F5545] focus:outline-none"
                        required
                      >
                        <option value="PENYIRAMAN">💧 Penyiraman (Irigasi Drip / Kocor)</option>
                        <option value="PEMUPUKAN">🧪 Pemupukan (AB Mix / MgSO4 / NPK)</option>
                        <option value="PRUNING">✂️ Pruning / Wiwit Cabang Air</option>
                        <option value="HAMA_PENYAKIT">🐛 Sanitasi / Pengendalian Hama</option>
                        <option value="PENGUKURAN">📏 Pengukuran Tinggi & Caliper</option>
                        <option value="UJI_BRIX">🍬 Uji Kadar Kemanisan (Brix)</option>
                      </select>
                    </div>

                    {/* Input 2: Material / Pupuk */}
                    <div>
                      <label className="text-[9.5px] font-bold text-[#5F6A65] block mb-0.5">
                        2. Bahan / Nutrisi / Pupuk:
                      </label>
                      <input
                        type="text"
                        value={formMaterial}
                        onChange={(e) => setFormMaterial(e.target.value)}
                        placeholder="Contoh: AB Mix Organik / MgSO4"
                        className="w-full p-1.5 bg-[#FAFBF8] border border-[#DDE5DF] rounded-[8px] text-[11px] text-[#17211E]"
                        required
                      />
                    </div>

                    {/* Input 3: Dosis */}
                    <div>
                      <label className="text-[9.5px] font-bold text-[#5F6A65] block mb-0.5">
                        3. Dosis / Takaran:
                      </label>
                      <input
                        type="text"
                        value={formDose}
                        onChange={(e) => setFormDose(e.target.value)}
                        placeholder="Contoh: 2.0 Liter / pohon"
                        className="w-full p-1.5 bg-[#FAFBF8] border border-[#DDE5DF] rounded-[8px] text-[11px] text-[#17211E]"
                        required
                      />
                    </div>

                    {/* Input 4: Nama Pekerja */}
                    <div>
                      <label className="text-[9.5px] font-bold text-[#5F6A65] block mb-0.5">
                        4. Nama Pekerja / Mandor:
                      </label>
                      <input
                        type="text"
                        value={formWorker}
                        onChange={(e) => setFormWorker(e.target.value)}
                        className="w-full p-1.5 bg-[#FAFBF8] border border-[#DDE5DF] rounded-[8px] text-[11px] text-[#17211E]"
                        required
                      />
                    </div>

                    {/* Input 5: Catatan Pekerja */}
                    <div>
                      <label className="text-[9.5px] font-bold text-[#5F6A65] block mb-0.5">
                        5. Catatan Pengamatan Lapangan:
                      </label>
                      <input
                        type="text"
                        value={formNotes}
                        onChange={(e) => setFormNotes(e.target.value)}
                        placeholder="Contoh: Daun sehat, sulur kuat"
                        className="w-full p-1.5 bg-[#FAFBF8] border border-[#DDE5DF] rounded-[8px] text-[11px] text-[#17211E]"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex-1 py-2 bg-[#0F5545] text-white font-extrabold text-[11px] rounded-[10px] cursor-pointer hover:bg-[#0B251E] shadow-xs"
                    >
                      💾 Simpan Log ke KTP Pohon
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('ktp')}
                      className="px-3 py-2 border border-[#DDE5DF] text-[#5F6A65] font-bold text-[11px] rounded-[10px]"
                    >
                      Batal
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 3: RIWAYAT PERAWATAN LENGKAP */}
              {activeTab === 'riwayat_rawat' && (
                <div className="space-y-2 animate-in fade-in">
                  <div className="flex justify-between items-center">
                    <strong className="text-[11.5px] text-[#17211E]">📋 Riwayat Log Perawatan:</strong>
                    <button
                      type="button"
                      onClick={() => setActiveTab('input_log')}
                      className="text-[9.5px] font-bold text-[#0F5545] bg-[#E8F1EA] px-2 py-0.5 rounded"
                    >
                      + Tambah Log
                    </button>
                  </div>

                  <div className="space-y-1.5 text-[10px]">
                    {scannedTree.maintenanceLogs.map((log) => (
                      <div key={log.id} className="p-2 rounded-[10px] bg-white border border-[#DDE5DF] shadow-2xs space-y-0.5">
                        <div className="flex justify-between items-center">
                          <strong className="text-[#17211E] text-[11px]">{log.actionName}</strong>
                          <span className="font-bold text-[#0F5545] text-[9px]">{log.date}</span>
                        </div>
                        <div className="text-[#5F6A65] text-[9.5px]">
                          Bahan: <span className="font-bold text-[#17211E]">{log.material}</span> ({log.dose})
                        </div>
                        <div className="text-[9px] text-[#5F6A65] flex justify-between">
                          <span>Oleh: {log.workerName}</span>
                          <span className="italic">{log.notes}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: TIME-LAPSE PERTUMBUHAN */}
              {activeTab === 'timelapse' && (
                <div className="space-y-2 animate-in fade-in">
                  <div className="flex justify-between items-center">
                    <strong className="text-[11.5px] text-[#0B251E]">📸 Log Foto Time-Lapse</strong>
                    <span className="text-[9px] bg-[#E8F1EA] text-[#0F5545] font-bold px-1.5 py-0.5 rounded">
                      Tahap ke-{selectedGrowthIdx + 1}
                    </span>
                  </div>

                  <div className="flex gap-1 overflow-x-auto pb-1">
                    {scannedTree.growthStory.map((stg, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedGrowthIdx(i)}
                        className={`px-2 py-1 rounded-[8px] text-[9.5px] whitespace-nowrap font-bold flex-shrink-0 transition-all ${
                          selectedGrowthIdx === i
                            ? 'bg-[#0F5545] text-white shadow-xs'
                            : 'bg-white text-[#5F6A65] border border-[#DDE5DF]'
                        }`}
                      >
                        {stg.stage}
                      </button>
                    ))}
                  </div>

                  {scannedTree.growthStory[selectedGrowthIdx] && (
                    <div className="p-3 rounded-[14px] bg-white border border-[#DDE5DF] shadow-xs space-y-2">
                      <div className="h-28 rounded-[10px] bg-[#071915] text-white flex flex-col items-center justify-center p-2 text-center relative overflow-hidden">
                        <i className="ri-camera-fill text-2xl text-[#C8E86B] mb-0.5"></i>
                        <strong className="text-[11px]">{scannedTree.growthStory[selectedGrowthIdx].stage}</strong>
                        <span className="text-[8.5px] text-[#A3D9C9]">
                          Tinggi: {scannedTree.growthStory[selectedGrowthIdx].heightCm} cm • {scannedTree.growthStory[selectedGrowthIdx].date}
                        </span>
                      </div>
                      <p className="text-[10px] text-[#5F6A65] bg-[#FAFBF8] p-2 rounded-[8px] border border-[#DDE5DF] m-0">
                        {scannedTree.growthStory[selectedGrowthIdx].note}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 5: SERTIFIKAT MUTU & TRACEABILITY (CLEAN & NON-LEBAY) */}
              {activeTab === 'sertifikat' && (
                <div className="p-3 rounded-[14px] bg-white border border-[#DDE5DF] shadow-xs space-y-2.5 animate-in fade-in">
                  <div className="flex justify-between items-start border-b border-[#DDE5DF] pb-1.5">
                    <div>
                      <span className="text-[8px] font-bold text-[#5F6A65] uppercase tracking-wider block">
                        SMART FARM TRACEABILITY
                      </span>
                      <strong className="text-[11.5px] text-[#17211E] block">Sertifikat Asal-Usul Mutu</strong>
                      <span className="text-[8.5px] text-[#5F6A65]">No: CERT/JGL/2026/0982</span>
                    </div>
                    <span className="bg-[#E8F1EA] text-[#0F5545] text-[8px] font-extrabold px-1.5 py-0.5 rounded border border-[#0F5545]/20">
                      ✓ GAP 0% Residu
                    </span>
                  </div>

                  <div className="space-y-1 text-[10px]">
                    <div className="flex justify-between py-0.5 border-b border-[#FAFBF8]">
                      <span className="text-[#5F6A65]">Varietas:</span>
                      <strong className="text-[#17211E]">{scannedTree.variety}</strong>
                    </div>
                    <div className="flex justify-between py-0.5 border-b border-[#FAFBF8]">
                      <span className="text-[#5F6A65]">Asal Lahan:</span>
                      <strong className="text-[#17211E]">{scannedTree.block} ({scannedTree.rowAjir})</strong>
                    </div>
                    <div className="flex justify-between py-0.5 border-b border-[#FAFBF8]">
                      <span className="text-[#5F6A65]">Usia Panen:</span>
                      <strong className="text-[#0F5545]">{scannedTree.ageDays} HST</strong>
                    </div>
                    <div className="flex justify-between py-0.5 border-b border-[#FAFBF8]">
                      <span className="text-[#5F6A65]">Kadar Brix / Bobot:</span>
                      <strong className="text-[#17211E]">{scannedTree.targetBrix} • {scannedTree.estYieldKg} Kg</strong>
                    </div>
                    <div className="flex justify-between py-0.5">
                      <span className="text-[#5F6A65]">Standar Mutu:</span>
                      <strong className="text-[#17211E]">GAP • Aman Konsumsi</strong>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => alert(`Sertifikat Mutu Sampel ${scannedTree.code} siap diunduh.`)}
                    className="w-full py-1.5 bg-[#0F5545] text-white font-bold text-[10px] rounded-[8px] flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <i className="ri-download-2-line"></i>
                    <span>Unduh Salinan Dokumen Mutu</span>
                  </button>
                </div>
              )}

              {/* Reset Scan Button */}
              <button
                type="button"
                onClick={() => setScannedTree(null)}
                className="w-full py-1.5 bg-[#E8F1EA] text-[#0F5545] font-extrabold text-[11px] rounded-[8px] cursor-pointer hover:bg-[#d5e7db]"
              >
                🔄 Pindai Pohon Sampel Lainnya
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
