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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedTree, setScannedTree] = useState<ScannedTree | null>(null);
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'ktp' | 'growth' | 'input_log'>('ktp');

  // Form State for Field Worker Maintenance Log
  const [formActionType, setFormActionType] = useState<MaintenanceLog['actionType']>('PEMUPUKAN');
  const [formActionName, setFormActionName] = useState('Aplikasi Pupuk Daun Mikro MgSO4');
  const [formMaterial, setFormMaterial] = useState('MgSO4 + Boron');
  const [formDose, setFormDose] = useState('2 gr / Liter air');
  const [formWorker, setFormWorker] = useState('Kang Asep (Petani)');
  const [formNotes, setFormNotes] = useState('Daun hijau segar, disemprot merata pagi hari.');

  const mockTrees: Record<string, ScannedTree> = {
    'SAMPLE-TR-A2-0841': {
      code: 'SAMPLE-TR-A2-0841',
      variety: 'Melon Golden Apollo F1',
      block: 'Blok A2 (Kebun Inti 2.0 Ha)',
      rowAjir: 'Baris 4 • Ajir #17 (Pohon Sampel #1)',
      plantingDate: '15 Juli 2026',
      ageDays: 43,
      phase: 'Fase 4: Pembesaran Buah & Netting',
      farmer: 'Kang Asep (Regu A)',
      mandor: 'Pak Joko',
      lastTreatment: 'Semprot Mikro MgSO4 & Boron',
      healthScore: 98.4,
      targetBrix: 'Brix 14.5° – 16.0°',
      estYieldKg: 2.4,
      gpsCoords: '-6.46972, 107.05831',
      gapCertificateNo: 'GAP-EXP-2026-0982 (0% Residu Kimia)',
      growthStory: [
        { stage: '1. Bibit 10cm', day: 1, date: '15 Jul', heightCm: 12, note: 'Bibit F1 ditanam di bedengan mulsa perak.', icon: 'ri-seedling-line' },
        { stage: '2. Vegetatif', day: 20, date: '04 Agu', heightCm: 68, note: 'Batang sulur merambat ajir, daun tebal.', icon: 'ri-plant-line' },
        { stage: '3. Berbunga', day: 32, date: '16 Agu', heightCm: 142, note: 'Polinasi manual bunga betina ruas 10.', icon: 'ri-contrast-drop-2-line' },
        { stage: '4. Pembesaran (Aktif)', day: 43, date: '27 Agu', heightCm: 188, note: 'Netting buah rapat, estimasi 2,4 Kg.', icon: 'ri-focus-3-line' },
        { stage: '5. Panen Manis', day: 60, date: '14 Sep', heightCm: 190, note: 'Target Brix 15°+ siap petik.', icon: 'ri-gift-line' },
      ],
      maintenanceLogs: [
        { id: 'LOG-001', date: '27 Agu 07:15', actionType: 'PENYIRAMAN', actionName: 'Irigasi Drip Pagi', material: 'Nutrisi AB Mix Organik', dose: '2.0 Liter (EC 2.2)', workerName: 'Kang Asep', notes: 'Tanah lembab optimal.' },
        { id: 'LOG-002', date: '26 Agu 16:30', actionType: 'PEMUPUKAN', actionName: 'Semprot Pupuk Mikro MgSO4', material: 'MgSO4 + Boron', dose: '2 gr / Liter', workerName: 'Kang Asep', notes: 'Daun hijau optimal.' },
        { id: 'LOG-003', date: '24 Agu 08:00', actionType: 'PRUNING', actionName: 'Pruning Cabang Air', material: 'Gunting Kebun Steril', dose: 'Sisa 1 Buah Utama', workerName: 'Pak Joko', notes: 'Pewiwitan tunas air ruas bawah.' },
      ],
    },
    'SAMPLE-TR-B1-0412': {
      code: 'SAMPLE-TR-B1-0412',
      variety: 'Porang Madiun Super',
      block: 'Blok B1 (Kebun Inti 2.0 Ha)',
      rowAjir: 'Baris 2 • Ajir #08 (Pohon Sampel #2)',
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
    'SAMPLE-TR-C1-0119': {
      code: 'SAMPLE-TR-C1-0119',
      variety: 'Cabai Rawit Ori 212',
      block: 'Blok C1 (Kebun Inti 2.0 Ha)',
      rowAjir: 'Baris 5 • Ajir #32 (Pohon Sampel #3)',
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
        setFormMaterial('Nutrisi AB Mix Organik');
        setFormDose('2.0 Liter / pohon');
        break;
      case 'PEMUPUKAN':
        setFormActionName('Pemupukan Daun Mikro MgSO4');
        setFormMaterial('MgSO4 + Boron');
        setFormDose('2 gr / Liter air');
        break;
      case 'PRUNING':
        setFormActionName('Pruning & Pewiwitan Tunas');
        setFormMaterial('Gunting Kebun Steril');
        setFormDose('Sisa 1 Buah Utama');
        break;
      case 'HAMA_PENYAKIT':
        setFormActionName('Pengendalian Hama / Sanitasi');
        setFormMaterial('Bio-Trichoderma sp.');
        setFormDose('5 ml / Liter air');
        break;
      case 'PENGUKURAN':
        setFormActionName('Pengukuran Dimensi Buah');
        setFormMaterial('Meteran & Caliper Digital');
        setFormDose('Diameter 14.2 cm');
        break;
      case 'UJI_BRIX':
        setFormActionName('Pengujian Kadar Gula (Brix)');
        setFormMaterial('Refraktometer Digital');
        setFormDose('Hasil: 14.5° Brix (Optimal)');
        break;
    }
  };

  const startCamera = async () => {
    try {
      setCameraError(null);
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setIsCameraActive(true);
      } else {
        setCameraError('Kamera tidak didukung pada peramban ini');
        setIsCameraActive(false);
      }
    } catch {
      setCameraError('Izin kamera belum aktif. Anda dapat memilih sampel ajir di bawah.');
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

  if (!isOpen) return null;

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
      setScannedTree(mockTrees[treeCode] || mockTrees['SAMPLE-TR-A2-0841']);
    }, 450);
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

    setActionSuccessMsg(`✅ Berhasil mencatat "${formActionName}" ke KTP Tanaman.`);
    setTimeout(() => setActionSuccessMsg(null), 3000);
    setActiveTab('growth');
  };

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col justify-end bg-black/85 backdrop-blur-md p-0 overflow-hidden text-[#11231D] animate-in fade-in duration-150">
      <div className="relative w-full max-w-[480px] mx-auto bg-[#F6FAF7] rounded-t-[28px] max-h-[94vh] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-200 border-t border-[#82C341]/30">
        
        {/* Header HUD Bar */}
        <div className="p-3.5 bg-[#061E18] text-white flex items-center justify-between border-b border-[#14473B] flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-[10px] bg-[#C8E86B] text-[#061E18] flex items-center justify-center font-black text-base shadow-sm">
              <i className="ri-qr-scan-2-line"></i>
            </div>
            <div>
              <div className="flex items-center gap-1.5 leading-none">
                <span className="font-black text-[12.5px] text-white">SCANNER PASPOR AJIR</span>
                <span className="bg-[#C8E86B]/20 text-[#C8E86B] text-[8px] font-black px-1.5 py-0.5 rounded border border-[#C8E86B]/30 tracking-wider">
                  {isCameraActive ? '🟢 SENSOR OPTIK AKTIF' : 'BIOLOGICAL ASSET'}
                </span>
              </div>
              <span className="text-[9px] text-[#A3D9C9] block mt-0.5 font-medium">
                Pindai Plat QR Bedengan & Input Log Lapangan
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold text-lg cursor-pointer transition-colors"
          >
            &times;
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5">
          
          {/* ==================== CAMERA HUD SCANNER VIEW ==================== */}
          {!scannedTree && (
            <div className="space-y-3 animate-in fade-in duration-150">
              
              {/* High-Tech Futuristic HUD Viewfinder */}
              <div className="relative h-72 rounded-[22px] bg-neutral-950 border-2 border-[#1FB88B]/40 flex flex-col items-center justify-center text-white overflow-hidden shadow-xl p-3 text-center">
                {/* Live Video */}
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className={`absolute inset-0 w-full h-full object-cover ${isCameraActive ? 'opacity-100' : 'opacity-0'}`}
                />

                {/* HUD Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

                {/* 4 Glowing Corner Brackets */}
                <div className="absolute top-4 left-4 w-7 h-7 border-t-2 border-l-2 border-[#C8E86B] drop-shadow-[0_0_8px_#C8E86B] z-10 pointer-events-none"></div>
                <div className="absolute top-4 right-4 w-7 h-7 border-t-2 border-r-2 border-[#C8E86B] drop-shadow-[0_0_8px_#C8E86B] z-10 pointer-events-none"></div>
                <div className="absolute bottom-4 left-4 w-7 h-7 border-b-2 border-l-2 border-[#C8E86B] drop-shadow-[0_0_8px_#C8E86B] z-10 pointer-events-none"></div>
                <div className="absolute bottom-4 right-4 w-7 h-7 border-b-2 border-r-2 border-[#C8E86B] drop-shadow-[0_0_8px_#C8E86B] z-10 pointer-events-none"></div>

                {/* Reticle & Sweeping Laser Line */}
                <div className="w-48 h-48 border border-white/20 rounded-[18px] flex items-center justify-center pointer-events-none relative z-10">
                  <div className="absolute inset-x-2 top-1/2 h-0.5 bg-gradient-to-r from-transparent via-[#C8E86B] to-transparent shadow-[0_0_16px_#C8E86B] animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-[#C8E86B] shadow-[0_0_8px_#C8E86B]"></div>
                </div>

                {/* Top HUD Telemetry Tags */}
                <div className="absolute top-3 inset-x-4 flex justify-between items-center text-[8.5px] font-mono text-[#C8E86B] z-20 pointer-events-none">
                  <span className="bg-black/60 px-2 py-0.5 rounded-full border border-[#C8E86B]/30 backdrop-blur-xs">
                    🎯 AUTO-FOCUS
                  </span>
                  <span className="bg-black/60 px-2 py-0.5 rounded-full border border-[#C8E86B]/30 backdrop-blur-xs">
                    📍 GPS: -6.46972, 107.05831
                  </span>
                </div>

                {/* Placeholder State when Camera isn't streamed */}
                {!isCameraActive && (
                  <div className="relative z-10 flex flex-col items-center px-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 border border-[#C8E86B]/30 flex items-center justify-center mb-2 text-[#C8E86B] text-2xl animate-pulse">
                      <i className="ri-qr-code-line"></i>
                    </div>
                    <strong className="text-[12px] text-white">Arahkan Kamera ke Barcode Ajir Sampel</strong>
                    <span className="text-[9.5px] text-[#A3D9C9] max-w-[240px] mt-0.5">
                      {cameraError || 'Pindai plat barcode di tiang ajir kebun untuk membuka KTP tanaman.'}
                    </span>
                  </div>
                )}

                {/* In-Viewfinder Camera Trigger Button */}
                <div className="absolute bottom-3.5 inset-x-4 z-20 flex justify-center items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleTriggerScan('SAMPLE-TR-A2-0841')}
                    disabled={isScanning}
                    className="py-2.5 px-6 rounded-full bg-[#C8E86B] hover:bg-[#b8d85c] text-[#061E18] font-black text-[12px] cursor-pointer shadow-lg active:scale-95 transition-all flex items-center gap-2"
                  >
                    <i className="ri-qr-scan-line text-sm"></i>
                    <span>{isScanning ? 'Membaca QR...' : '📸 Pindai Barcode Ajir'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="py-2.5 px-3.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white font-bold text-[11px] border border-white/30 cursor-pointer flex items-center gap-1.5 shadow-xs active:scale-95"
                  >
                    <i className="ri-image-add-line text-sm"></i>
                    <span>Galeri</span>
                  </button>
                </div>
              </div>

              {/* Hidden File Input for Native Camera / Image File */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={() => handleTriggerScan('SAMPLE-TR-A2-0841')}
              />

              {/* Verified Sample Plants Quick Selector (Clean Cards) */}
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#0F5545]">
                    SAMPEL AJIR TERVERIFIKASI GAP DI LAHAN:
                  </span>
                  <span className="text-[9px] font-bold text-[#5F6A65] bg-white px-2 py-0.5 rounded-full border border-[#DDE5DF]">
                    3 Sampel Aktif
                  </span>
                </div>

                <div className="space-y-2">
                  {/* Sample 1 */}
                  <div
                    onClick={() => handleTriggerScan('SAMPLE-TR-A2-0841')}
                    className="p-3 rounded-[16px] bg-white border border-[#E2EAE5] hover:border-[#0F5545] cursor-pointer shadow-2xs transition-all flex items-center justify-between gap-3 active:scale-[0.99]"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="w-10 h-10 rounded-[12px] bg-[#E8F1EA] text-[#0F5545] border border-[#0F5545]/15 flex items-center justify-center text-2xl shrink-0 shadow-2xs">
                        🍈
                      </div>
                      <div className="min-w-0 flex-1">
                        <strong className="text-[12px] font-black text-[#11231D] truncate block">
                          Melon Golden Apollo F1
                        </strong>
                        <span className="text-[9.5px] font-mono text-[#0F5545] font-bold block mt-0.5">
                          SAMPLE-TR-A2-0841 • <span className="text-[#5F6A65] font-sans">Blok A2 Ajir #17 (43 HST)</span>
                        </span>
                      </div>
                    </div>
                    <div className="shrink-0 text-right">
                      <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[#166534] block mb-0.5">
                        98.4% Sehat
                      </span>
                      <span className="text-[10px] font-black text-[#0F5545] flex items-center justify-end gap-0.5">
                        Buka KTP <i className="ri-arrow-right-s-line"></i>
                      </span>
                    </div>
                  </div>

                  {/* Sample 2 */}
                  <div
                    onClick={() => handleTriggerScan('SAMPLE-TR-B1-0412')}
                    className="p-3 rounded-[16px] bg-white border border-[#E2EAE5] hover:border-[#0F5545] cursor-pointer shadow-2xs transition-all flex items-center justify-between gap-3 active:scale-[0.99]"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="w-10 h-10 rounded-[12px] bg-[#E8F1EA] text-[#0F5545] border border-[#0F5545]/15 flex items-center justify-center text-2xl shrink-0 shadow-2xs">
                        🍠
                      </div>
                      <div className="min-w-0 flex-1">
                        <strong className="text-[12px] font-black text-[#11231D] truncate block">
                          Porang Madiun Super
                        </strong>
                        <span className="text-[9.5px] font-mono text-[#0F5545] font-bold block mt-0.5">
                          SAMPLE-TR-B1-0412 • <span className="text-[#5F6A65] font-sans">Blok B1 Ajir #08 (78 HST)</span>
                        </span>
                      </div>
                    </div>
                    <div className="shrink-0 text-right">
                      <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[#166534] block mb-0.5">
                        94.2% Sehat
                      </span>
                      <span className="text-[10px] font-black text-[#0F5545] flex items-center justify-end gap-0.5">
                        Buka KTP <i className="ri-arrow-right-s-line"></i>
                      </span>
                    </div>
                  </div>

                  {/* Sample 3 */}
                  <div
                    onClick={() => handleTriggerScan('SAMPLE-TR-C1-0119')}
                    className="p-3 rounded-[16px] bg-white border border-[#E2EAE5] hover:border-[#0F5545] cursor-pointer shadow-2xs transition-all flex items-center justify-between gap-3 active:scale-[0.99]"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="w-10 h-10 rounded-[12px] bg-[#E8F1EA] text-[#0F5545] border border-[#0F5545]/15 flex items-center justify-center text-2xl shrink-0 shadow-2xs">
                        🌶️
                      </div>
                      <div className="min-w-0 flex-1">
                        <strong className="text-[12px] font-black text-[#11231D] truncate block">
                          Cabai Rawit Ori 212
                        </strong>
                        <span className="text-[9.5px] font-mono text-[#0F5545] font-bold block mt-0.5">
                          SAMPLE-TR-C1-0119 • <span className="text-[#5F6A65] font-sans">Blok C1 Ajir #32 (57 HST)</span>
                        </span>
                      </div>
                    </div>
                    <div className="shrink-0 text-right">
                      <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[#166534] block mb-0.5">
                        96.0% Sehat
                      </span>
                      <span className="text-[10px] font-black text-[#0F5545] flex items-center justify-end gap-0.5">
                        Buka KTP <i className="ri-arrow-right-s-line"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================== DISPLAY KTP PASPOR DIGITAL ==================== */}
          {scannedTree && (
            <div className="space-y-3 animate-in fade-in duration-200">
              
              {actionSuccessMsg && (
                <div className="p-2.5 bg-[#E8F1EA] text-[#0F5545] rounded-[12px] text-[11px] font-bold text-center border border-[#0F5545]/20 animate-in fade-in">
                  {actionSuccessMsg}
                </div>
              )}

              {/* 3 Main Tabs */}
              <div className="grid grid-cols-3 gap-1 bg-[#E8EEEA] p-1 rounded-[14px]">
                <button
                  type="button"
                  onClick={() => setActiveTab('ktp')}
                  className={`py-2 text-[11px] font-black rounded-[11px] transition-all cursor-pointer flex items-center justify-center gap-1 ${
                    activeTab === 'ktp' ? 'bg-[#0F5545] text-white shadow-xs' : 'text-[#5F6A65]'
                  }`}
                >
                  <i className="ri-passport-line"></i>
                  <span>Paspor KTP</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('growth')}
                  className={`py-2 text-[11px] font-black rounded-[11px] transition-all cursor-pointer flex items-center justify-center gap-1 ${
                    activeTab === 'growth' ? 'bg-[#0F5545] text-white shadow-xs' : 'text-[#5F6A65]'
                  }`}
                >
                  <i className="ri-line-chart-line"></i>
                  <span>Siklus Tumbuh</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('input_log')}
                  className={`py-2 text-[11px] font-black rounded-[11px] transition-all cursor-pointer flex items-center justify-center gap-1 ${
                    activeTab === 'input_log' ? 'bg-[#0F5545] text-white shadow-xs' : 'text-[#5F6A65]'
                  }`}
                >
                  <i className="ri-edit-box-line"></i>
                  <span>Catat Rawat</span>
                </button>
              </div>

              {/* ==================== TAB 1: PASSPORT CARD VIEW ==================== */}
              {activeTab === 'ktp' && (
                <div className="space-y-3">
                  {/* Diplomatic Green-Gold Holographic Passport Card */}
                  <div className="bg-gradient-to-br from-[#061E18] via-[#09352A] to-[#041611] text-white rounded-[22px] p-4 shadow-xl border border-[#1FB88B]/40 relative overflow-hidden space-y-3">
                    
                    {/* Header with Title & QR */}
                    <div className="flex justify-between items-start gap-2 border-b border-white/15 pb-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="bg-[#C8E86B] text-[#061E18] text-[8.5px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider">
                            🛡️ PASPOR ASET BIOLOGIS
                          </span>
                          <span className="text-[9px] text-[#A7F3D0] font-bold">
                            ✓ GAP ORGANIK
                          </span>
                        </div>
                        <h1 className="text-[15.5px] font-black text-white m-0 leading-tight">
                          {scannedTree.variety}
                        </h1>
                        <span className="text-[10.5px] font-mono text-[#C8E86B] font-bold block mt-0.5">
                          {scannedTree.code}
                        </span>
                        <span className="text-[9.5px] text-[#A7F3D0] block mt-0.5">
                          {scannedTree.block} • {scannedTree.rowAjir}
                        </span>
                      </div>

                      {/* Dynamic QR Badge */}
                      <div className="bg-white p-1 rounded-[12px] shadow-md shrink-0 border border-white/40 text-center">
                        <DynamicQRCode value={scannedTree.code} size={54} bordered={false} />
                        <span className="text-[7.5px] font-mono font-black text-[#061E18] block mt-0.5">
                          PINDAI SAYA
                        </span>
                      </div>
                    </div>

                    {/* 4 Key KPI Tiles */}
                    <div className="grid grid-cols-2 gap-2 text-[10.5px]">
                      <div className="bg-white/10 backdrop-blur-xs p-2.5 rounded-[12px] border border-white/15">
                        <span className="text-[9px] text-[#A7F3D0] font-semibold block">📅 Umur & Fase:</span>
                        <strong className="text-[12px] font-black text-[#C8E86B] block mt-0.5">
                          {scannedTree.ageDays} HST
                        </strong>
                        <span className="text-[8.5px] text-white/80 block truncate mt-0.5">
                          {scannedTree.phase}
                        </span>
                      </div>

                      <div className="bg-white/10 backdrop-blur-xs p-2.5 rounded-[12px] border border-white/15">
                        <span className="text-[9px] text-[#A7F3D0] font-semibold block">📏 Ukuran & Bobot:</span>
                        <strong className="text-[12px] font-black text-white block mt-0.5">
                          Est. {scannedTree.estYieldKg} Kg/Pohon
                        </strong>
                        <span className="text-[8.5px] text-white/80 block truncate mt-0.5">
                          Tinggi: {scannedTree.growthStory[scannedTree.growthStory.length - 1]?.heightCm || 188} cm
                        </span>
                      </div>

                      <div className="bg-white/10 backdrop-blur-xs p-2.5 rounded-[12px] border border-white/15">
                        <span className="text-[9px] text-[#A7F3D0] font-semibold block">🍯 Est. Brix / Mutu:</span>
                        <strong className="text-[12px] font-black text-[#C8E86B] block mt-0.5">
                          {scannedTree.targetBrix}
                        </strong>
                        <span className="text-[8.5px] text-white/80 block truncate mt-0.5">
                          Standar Ekspor Grade A
                        </span>
                      </div>

                      <div className="bg-white/10 backdrop-blur-xs p-2.5 rounded-[12px] border border-white/15">
                        <span className="text-[9px] text-[#A7F3D0] font-semibold block">🩺 Skor Kesehatan:</span>
                        <strong className="text-[12px] font-black text-[#7AE3B6] block mt-0.5">
                          {scannedTree.healthScore}% Optimal
                        </strong>
                        <span className="text-[8.5px] text-white/80 block truncate mt-0.5">
                          PJ: {scannedTree.farmer}
                        </span>
                      </div>
                    </div>

                    {/* Biological Asset Valuation & Certification Footer */}
                    <div className="pt-2 border-t border-white/15 flex flex-col gap-1 text-[9px] text-[#A7F3D0]">
                      <div className="flex justify-between items-center">
                        <span>📍 GPS: <strong className="font-mono text-white">{scannedTree.gpsCoords}</strong></span>
                        <span className="bg-[#C8E86B]/20 text-[#C8E86B] px-2 py-0.5 rounded font-mono font-bold">
                          {scannedTree.gapCertificateNo.split(' ')[0]}
                        </span>
                      </div>
                      <div className="bg-black/30 p-2 rounded-[8px] flex justify-between items-center text-white border border-white/10 mt-1">
                        <span>💰 Valuasi Panen per Pohon:</span>
                        <strong className="text-[#C8E86B] font-black text-[10.5px]">
                          {scannedTree.variety.includes('Melon') ? 'Rp 60.000 (ROI +32%)' : scannedTree.variety.includes('Porang') ? 'Rp 70.000 (ROI +35%)' : 'Rp 48.000 (ROI +28%)'}
                        </strong>
                      </div>
                    </div>
                  </div>

                  {/* Scan Another Tree Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setScannedTree(null);
                      startCamera();
                    }}
                    className="w-full py-2.5 bg-[#FAFBF8] hover:bg-[#E8F1EA] text-[#0F5545] font-bold text-[11px] rounded-[14px] border border-[#DDE5DF] flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <i className="ri-qr-scan-2-line"></i>
                    <span>Pindai Barcode Ajir Lainnya</span>
                  </button>
                </div>
              )}

              {/* ==================== TAB 2: GROWTH TIMELAPSE & AUDIT TRAIL ==================== */}
              {activeTab === 'growth' && (
                <div className="space-y-3">
                  <div className="bg-white rounded-[18px] p-3.5 border border-[#E2EAE5] shadow-xs space-y-2.5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#0F5545] block">
                      5 TAHAP PERTUMBUHAN TANAMAN:
                    </span>

                    <div className="space-y-2">
                      {scannedTree.growthStory.map((story, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-[11px]">
                          <div className="w-6 h-6 rounded-full bg-[#E8F1EA] text-[#0F5545] border border-[#0F5545]/20 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                            {idx + 1}
                          </div>
                          <div className="flex-1 bg-[#F8FAF8] p-2 rounded-[10px] border border-[#E8F0EB]">
                            <div className="flex justify-between items-center">
                              <strong className="text-[#11231D]">{story.stage}</strong>
                              <span className="text-[9.5px] font-bold text-[#15803D]">{story.heightCm} cm</span>
                            </div>
                            <span className="text-[9.5px] text-[#5F6A65] block mt-0.5">{story.date} • {story.note}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Audit Trail Log Lapangan */}
                  <div className="bg-white rounded-[18px] p-3.5 border border-[#E2EAE5] shadow-xs space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#0F5545] block">
                      RIWAYAT LOG TINDAKAN MANDOR:
                    </span>
                    <div className="space-y-1.5">
                      {scannedTree.maintenanceLogs.map((log) => (
                        <div key={log.id} className="p-2 rounded-[10px] bg-[#F8FAF8] border border-[#E8F0EB] text-[10px]">
                          <div className="flex justify-between items-center">
                            <strong className="text-[#0F5545]">{log.actionName}</strong>
                            <span className="text-[9px] text-[#5F6A65]">{log.date}</span>
                          </div>
                          <span className="text-[#11231D] block mt-0.5">{log.material} ({log.dose})</span>
                          <span className="text-[#5F6A65] text-[9px] block">Petugas: {log.workerName}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ==================== TAB 3: CATAT TINDAKAN ==================== */}
              {activeTab === 'input_log' && (
                <div className="bg-white rounded-[18px] p-3.5 border border-[#E2EAE5] shadow-xs space-y-3">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#0F5545] block">
                    FORM CATAT TINDAKAN RAWAT POHON:
                  </span>

                  {/* Action Type Presets */}
                  <div className="grid grid-cols-3 gap-1.5">
                    {(['PENYIRAMAN', 'PEMUPUKAN', 'PRUNING', 'HAMA_PENYAKIT', 'PENGUKURAN', 'UJI_BRIX'] as const).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => handleActionTypeSelect(type)}
                        className={`py-2 px-1 rounded-[10px] text-[10px] font-bold border transition-all cursor-pointer ${
                          formActionType === type
                            ? 'bg-[#0F5545] text-white border-[#0F5545] shadow-xs'
                            : 'bg-[#F8FAF8] text-[#5F6A65] border-[#E8F0EB] hover:border-[#0F5545]'
                        }`}
                      >
                        {type === 'PENYIRAMAN' && '💧 Siram Drip'}
                        {type === 'PEMUPUKAN' && '🌿 Pemupukan'}
                        {type === 'PRUNING' && '✂️ Pruning'}
                        {type === 'HAMA_PENYAKIT' && '🛡️ Hama'}
                        {type === 'PENGUKURAN' && '📏 Ukur Buah'}
                        {type === 'UJI_BRIX' && '🍯 Tes Brix'}
                      </button>
                    ))}
                  </div>

                  <form onSubmit={handleSaveMobileLog} className="space-y-2.5 text-[11px]">
                    <div>
                      <label className="text-[10px] font-bold text-[#5F6A65] block mb-0.5">Nama Tindakan:</label>
                      <input
                        type="text"
                        value={formActionName}
                        onChange={(e) => setFormActionName(e.target.value)}
                        className="w-full p-2 bg-[#F8FAF8] border border-[#DDE5DF] rounded-[10px] font-bold text-[#11231D]"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] font-bold text-[#5F6A65] block mb-0.5">Bahan / Nutrisi:</label>
                        <input
                          type="text"
                          value={formMaterial}
                          onChange={(e) => setFormMaterial(e.target.value)}
                          className="w-full p-2 bg-[#F8FAF8] border border-[#DDE5DF] rounded-[10px]"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-[#5F6A65] block mb-0.5">Dosis / Ukuran:</label>
                        <input
                          type="text"
                          value={formDose}
                          onChange={(e) => setFormDose(e.target.value)}
                          className="w-full p-2 bg-[#F8FAF8] border border-[#DDE5DF] rounded-[10px]"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-[#5F6A65] block mb-0.5">Petugas Pelaksana:</label>
                      <input
                        type="text"
                        value={formWorker}
                        onChange={(e) => setFormWorker(e.target.value)}
                        className="w-full p-2 bg-[#F8FAF8] border border-[#DDE5DF] rounded-[10px] font-semibold"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-[#5F6A65] block mb-0.5">Catatan Tambahan:</label>
                      <textarea
                        value={formNotes}
                        onChange={(e) => setFormNotes(e.target.value)}
                        rows={2}
                        className="w-full p-2 bg-[#F8FAF8] border border-[#DDE5DF] rounded-[10px]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-[#0F5545] hover:bg-[#0B3B30] text-white font-black text-[12px] rounded-[12px] shadow-sm cursor-pointer transition-all"
                    >
                      💾 Simpan Log Tindakan ke KTP Tanaman
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
