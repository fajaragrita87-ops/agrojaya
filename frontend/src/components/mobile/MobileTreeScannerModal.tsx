import React, { useState, useEffect, useRef, useCallback } from 'react';
import jsQR from 'jsqr';
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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);

  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isTorchOn, setIsTorchOn] = useState(false);
  const [hasTorch, setHasTorch] = useState(false);
  const [scannedTree, setScannedTree] = useState<ScannedTree | null>(null);
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'ktp' | 'growth' | 'input_log'>('ktp');
  const [showSampleDrawer, setShowSampleDrawer] = useState(false);
  const [scanFeedback, setScanFeedback] = useState<string | null>(null);

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

  const createDynamicTree = (code: string): ScannedTree => {
    const isMelon = code.toLowerCase().includes('melon') || code.includes('A2') || code.includes('A1');
    const isPorang = code.toLowerCase().includes('porang') || code.includes('B1') || code.includes('B2');
    const isCabai = code.toLowerCase().includes('cabe') || code.toLowerCase().includes('cabai') || code.includes('C1');

    return {
      code,
      variety: isMelon
        ? 'Melon Golden Apollo F1'
        : isPorang
        ? 'Porang Madiun Super'
        : isCabai
        ? 'Cabai Rawit Ori 212'
        : 'Alpukat Miki Organik',
      block: isMelon ? 'Blok A2 (Kebun Inti 2.0 Ha)' : isPorang ? 'Blok B1' : isCabai ? 'Blok C1' : 'Blok A3',
      rowAjir: `Baris 3 • Ajir #${Math.floor(Math.random() * 50) + 1}`,
      plantingDate: '15 Juli 2026',
      ageDays: 43,
      phase: isMelon ? 'Fase 4: Pembesaran Buah & Netting' : 'Fase 3: Pertumbuhan Aktif',
      farmer: 'Kang Asep (Regu Lapangan)',
      mandor: 'Pak Joko (Mandor Utama)',
      lastTreatment: 'Aplikasi Fertigasi Organik & PHT',
      healthScore: 97.8,
      targetBrix: isMelon ? 'Brix 14.5° – 16.0°' : 'Standar Mutu Grade A',
      estYieldKg: isMelon ? 2.4 : isPorang ? 3.5 : 1.5,
      gpsCoords: '-6.46972, 107.05831',
      gapCertificateNo: 'GAP-EXP-2026-0982 (0% Residu Kimia)',
      growthStory: [
        { stage: '1. Bibit Tanam', day: 1, date: '15 Jul', heightCm: 12, note: 'Tanam bibit unggul bersertifikat.', icon: 'ri-seedling-line' },
        { stage: '2. Fase Vegetatif', day: 20, date: '04 Agu', heightCm: 68, note: 'Sulur merambat ajir kokoh.', icon: 'ri-plant-line' },
        { stage: '3. Fase Berbunga', day: 32, date: '16 Agu', heightCm: 142, note: 'Polinasi bunga ruas optimal.', icon: 'ri-contrast-drop-2-line' },
        { stage: '4. Pembesaran (Aktif)', day: 43, date: '27 Agu', heightCm: 188, note: 'Pertumbuhan buah maksimal.', icon: 'ri-focus-3-line' },
        { stage: '5. Panen Manis', day: 60, date: '14 Sep', heightCm: 190, note: 'Proyeksi panen Grade A.', icon: 'ri-gift-line' },
      ],
      maintenanceLogs: [
        { id: `LOG-${Date.now()}`, date: 'Hari Ini 07:30', actionType: 'PENYIRAMAN', actionName: 'Irigasi Drip Nutrisi', material: 'AB Mix Organik', dose: '2.0 L', workerName: 'Kang Asep', notes: 'Tanah lembab optimal.' },
      ],
    };
  };

  const handleDetectedQRCode = useCallback((rawCode: string) => {
    if (!rawCode || rawCode.trim().length === 0) return;

    let cleanCode = rawCode.trim();
    // Parse URL if encoded as URL (e.g. https://domain.com/tree/SAMPLE-TR-A2-0841)
    if (cleanCode.includes('code=')) {
      const match = cleanCode.match(/code=([^&]+)/);
      if (match) cleanCode = decodeURIComponent(match[1]);
    } else if (cleanCode.includes('/')) {
      const parts = cleanCode.split('/');
      const lastPart = parts[parts.length - 1];
      if (lastPart && lastPart.length >= 3) {
        cleanCode = lastPart;
      }
    }

    // Sound/Vibrate haptic feedback
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate([80, 40, 80]);
      } catch {}
    }

    setScanFeedback(`✨ QR Terdeteksi: ${cleanCode}`);

    // Stop scanning loop & camera
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }
    stopCamera();

    setTimeout(() => {
      setScanFeedback(null);
      const tree = mockTrees[cleanCode] || createDynamicTree(cleanCode);
      setScannedTree(tree);
      setActiveTab('ktp');
      setActionSuccessMsg(`✅ Berhasil membuka Paspor Ajir: ${tree.code}`);
      setTimeout(() => setActionSuccessMsg(null), 3500);
    }, 400);
  }, []);

  // Continuous Frame Analysis Loop using jsQR
  const scanVideoFrame = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) {
      animationFrameId.current = requestAnimationFrame(scanVideoFrame);
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    if (video.readyState === video.HAVE_ENOUGH_DATA && ctx) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert',
      });

      if (code && code.data && code.data.trim().length > 0) {
        handleDetectedQRCode(code.data);
        return; // Stop animation loop
      }
    }

    animationFrameId.current = requestAnimationFrame(scanVideoFrame);
  }, [handleDetectedQRCode]);

  const startCamera = async () => {
    try {
      setCameraError(null);
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: 'environment' },
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        });
        streamRef.current = stream;

        // Check if torch is supported
        const track = stream.getVideoTracks()[0];
        if (track) {
          const capabilities: any = track.getCapabilities ? track.getCapabilities() : {};
          if (capabilities && capabilities.torch) {
            setHasTorch(true);
          }
        }

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.setAttribute('playsinline', 'true');
          await videoRef.current.play();
        }
        setIsCameraActive(true);

        // Start scanning loop
        if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = requestAnimationFrame(scanVideoFrame);
      } else {
        setCameraError('Kamera tidak didukung pada peramban ini.');
        setIsCameraActive(false);
      }
    } catch (err: any) {
      console.warn('Camera access error:', err);
      setCameraError('Izin kamera belum aktif. Gunakan tombol Galeri atau pilih sampel di bawah.');
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
    setIsTorchOn(false);
  };

  const toggleTorch = async () => {
    if (!streamRef.current) return;
    const track = streamRef.current.getVideoTracks()[0];
    if (track && hasTorch) {
      try {
        const nextTorch = !isTorchOn;
        await (track as any).applyConstraints({
          advanced: [{ torch: nextTorch }],
        });
        setIsTorchOn(nextTorch);
      } catch (e) {
        console.warn('Torch toggle failed:', e);
      }
    }
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
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100dvh',
        zIndex: 999999,
        backgroundColor: '#000000',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
      className="font-sans select-none animate-in fade-in duration-150"
    >
      {/* Hidden processing canvas for jsQR continuous analysis */}
      <canvas ref={canvasRef} className="hidden" />

      {/* ========================================================================= */}
      {/* 1. FULL-SCREEN CAMERA SCANNER VIEW (Active when no tree is selected) */}
      {/* ========================================================================= */}
      {!scannedTree && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
          }}
        >
          {/* Live Full-Screen Video Background */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 1,
            }}
            className={`transition-opacity duration-300 ${isCameraActive ? 'opacity-100' : 'opacity-0'}`}
          />

          {/* Vignette Overlay */}
          <div
            style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none' }}
            className="bg-black/35"
          />

          {/* Foreground Scanner UI Layer */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              height: '100%',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            {/* TOP HUD BAR */}
            <div
              style={{
                paddingTop: 'calc(env(safe-area-inset-top, 0px) + 12px)',
                paddingBottom: '12px',
                paddingLeft: '16px',
                paddingRight: '16px',
              }}
              className="bg-gradient-to-b from-black/90 via-black/50 to-transparent flex items-center justify-between z-20 shrink-0"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-[12px] bg-[#C8E86B] text-[#061E18] flex items-center justify-center font-black text-lg shadow-md">
                  <i className="ri-qr-scan-2-line"></i>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 leading-tight">
                    <span className="font-black text-[13px] text-white tracking-wide">SCANNER PASPOR AJIR</span>
                    <span className="bg-[#C8E86B]/20 text-[#C8E86B] text-[8.5px] font-black px-2 py-0.5 rounded-full border border-[#C8E86B]/40 animate-pulse">
                      ⚡ AUTO-SCAN
                    </span>
                  </div>
                  <span className="text-[9.5px] text-[#A3D9C9] block font-medium mt-0.5">
                    Arahkan kamera ke QR Code tiang ajir
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {hasTorch && (
                  <button
                    type="button"
                    onClick={toggleTorch}
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all shadow-md ${
                      isTorchOn ? 'bg-[#C8E86B] text-[#061E18]' : 'bg-black/60 text-white border border-white/20'
                    }`}
                  >
                    <i className={isTorchOn ? 'ri-flashlight-fill' : 'ri-flashlight-line'}></i>
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleClose}
                  className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center font-bold text-xl cursor-pointer transition-colors backdrop-blur-md shadow-md"
                >
                  &times;
                </button>
              </div>
            </div>

            {/* CENTER SCANNING RETICLE / VIEWFINDER */}
            <div className="flex-1 flex flex-col items-center justify-center p-4 z-20">
              {/* High-Tech Glowing Box */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 border border-white/30 rounded-[28px] flex items-center justify-center shadow-[0_0_0_9999px_rgba(0,0,0,0.60)]">
                {/* 4 Glowing Corner Brackets */}
                <div className="absolute -top-1 -left-1 w-9 h-9 border-t-4 border-l-4 border-[#C8E86B] rounded-tl-[16px] drop-shadow-[0_0_12px_#C8E86B]"></div>
                <div className="absolute -top-1 -right-1 w-9 h-9 border-t-4 border-r-4 border-[#C8E86B] rounded-tr-[16px] drop-shadow-[0_0_12px_#C8E86B]"></div>
                <div className="absolute -bottom-1 -left-1 w-9 h-9 border-b-4 border-l-4 border-[#C8E86B] rounded-bl-[16px] drop-shadow-[0_0_12px_#C8E86B]"></div>
                <div className="absolute -bottom-1 -right-1 w-9 h-9 border-b-4 border-r-4 border-[#C8E86B] rounded-br-[16px] drop-shadow-[0_0_12px_#C8E86B]"></div>

                {/* Sweeping Laser Line Animation */}
                <div className="absolute inset-x-2 h-0.5 bg-gradient-to-r from-transparent via-[#C8E86B] to-transparent shadow-[0_0_20px_#C8E86B] animate-[bounce_2s_infinite]"></div>

                {/* Center Dot Target */}
                <div className="w-2.5 h-2.5 rounded-full bg-[#C8E86B] shadow-[0_0_10px_#C8E86B]"></div>

                {/* Scan Feedback Popup */}
                {scanFeedback && (
                  <div className="absolute inset-0 bg-[#061E18]/95 rounded-[28px] flex flex-col items-center justify-center p-4 text-center border-2 border-[#C8E86B] animate-in zoom-in-95 duration-150">
                    <i className="ri-checkbox-circle-fill text-4xl text-[#C8E86B] mb-2 animate-bounce"></i>
                    <span className="text-[13px] font-black text-white">{scanFeedback}</span>
                    <span className="text-[10.5px] text-[#A3D9C9] mt-1">Membuka Paspor Digital...</span>
                  </div>
                )}
              </div>

              {/* Instruction Tip */}
              <div className="mt-4 px-4 py-1.5 rounded-full bg-black/70 border border-white/20 backdrop-blur-md text-[11px] font-bold text-[#C8E86B] flex items-center gap-1.5 shadow-md">
                <i className="ri-focus-3-line text-[#C8E86B]"></i>
                <span>Posisikan QR Code di dalam kotak hijau</span>
              </div>

              {cameraError && (
                <div className="mt-3 max-w-[280px] p-2 bg-red-950/80 border border-red-500/40 rounded-[12px] text-center text-red-200 text-[10px]">
                  {cameraError}
                </div>
              )}
            </div>

            {/* BOTTOM CONTROLS & QUICK SELECTOR */}
            <div
              style={{
                paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 16px)',
                paddingTop: '12px',
                paddingLeft: '16px',
                paddingRight: '16px',
              }}
              className="bg-gradient-to-t from-black/95 via-black/70 to-transparent flex flex-col items-center gap-2.5 z-20 shrink-0"
            >
              {/* Auto-Scan Status Indicator & Sample Quick Picker */}
              <div className="w-full flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C8E86B] animate-ping"></span>
                  <span className="text-[11px] font-bold text-[#C8E86B]">Mendeteksi Otomatis...</span>
                </div>

                <button
                  type="button"
                  onClick={() => setShowSampleDrawer(!showSampleDrawer)}
                  className="py-2 px-3.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold text-[11px] flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all shadow-md"
                >
                  <i className="ri-list-check-3 text-[#C8E86B]"></i>
                  <span>Sampel Lahan</span>
                </button>
              </div>

              {/* Quick Sample Selector Drawer (if expanded) */}
              {showSampleDrawer && (
                <div className="w-full p-3 bg-[#061E18]/95 border border-[#14473B] rounded-[20px] backdrop-blur-md space-y-2 animate-in slide-in-from-bottom duration-150">
                  <div className="flex justify-between items-center px-1">
                    <span className="text-[9.5px] font-black uppercase tracking-wider text-[#C8E86B]">
                      SAMPEL POHON TERSEDIA DI LAHAN:
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowSampleDrawer(false)}
                      className="text-[9.5px] text-white/60 hover:text-white cursor-pointer"
                    >
                      Tutup
                    </button>
                  </div>

                  <div className="space-y-1.5 max-h-44 overflow-y-auto">
                    {Object.values(mockTrees).map((tree) => (
                      <div
                        key={tree.code}
                        onClick={() => handleDetectedQRCode(tree.code)}
                        className="p-2.5 rounded-[12px] bg-white/10 hover:bg-white/20 border border-white/10 cursor-pointer flex items-center justify-between gap-2 active:scale-98 transition-all"
                      >
                        <div className="min-w-0 flex-1">
                          <strong className="text-[11.5px] font-black text-white block truncate">
                            {tree.variety}
                          </strong>
                          <span className="text-[9px] font-mono text-[#C8E86B] block">
                            {tree.code} • {tree.block}
                          </span>
                        </div>
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#C8E86B]/20 text-[#C8E86B] border border-[#C8E86B]/30 shrink-0">
                          Buka KTP ➔
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. FULL-SCREEN KTP PASPOR DIGITAL & AUDIT TRAIL VIEW */}
      {/* ========================================================================= */}
      {scannedTree && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#F6FAF7',
            color: '#11231D',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            zIndex: 50,
          }}
        >
          {/* Header Bar */}
          <div
            style={{
              paddingTop: 'calc(env(safe-area-inset-top, 0px) + 10px)',
              paddingBottom: '10px',
              paddingLeft: '14px',
              paddingRight: '14px',
            }}
            className="bg-[#061E18] text-white flex items-center justify-between border-b border-[#14473B] shrink-0 shadow-md"
          >
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setScannedTree(null);
                  startCamera();
                }}
                className="px-2.5 py-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center gap-1.5 font-bold text-[11px] cursor-pointer transition-colors"
                title="Pindai Ulang"
              >
                <i className="ri-camera-line text-sm text-[#C8E86B]"></i>
                <span>Scan Lagi</span>
              </button>

              <div>
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="font-black text-[13px] text-white">PASPOR DIGITAL AJIR</span>
                  <span className="bg-[#C8E86B]/20 text-[#C8E86B] text-[8px] font-black px-1.5 py-0.5 rounded border border-[#C8E86B]/30 tracking-wider">
                    TERVERIFIKASI
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#C8E86B] block mt-0.5 font-bold">
                  {scannedTree.code}
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

          {/* Action Success Alert */}
          {actionSuccessMsg && (
            <div className="p-2.5 bg-[#E8F1EA] text-[#0F5545] text-[11px] font-bold text-center border-b border-[#0F5545]/20 animate-in fade-in shrink-0">
              {actionSuccessMsg}
            </div>
          )}

          {/* 3 Main View Tabs */}
          <div className="p-2.5 bg-white border-b border-[#E2EAE5] shrink-0">
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
          </div>

          {/* Scrollable Content Body */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch',
              minHeight: 0,
              paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 40px)',
            }}
            className="p-4 space-y-3.5"
          >
            
            {/* ==================== TAB 1: PASPOR KTP CARD ==================== */}
            {activeTab === 'ktp' && (
              <div className="space-y-3">
                {/* Diplomatic Green-Gold Holographic Passport Card */}
                <div className="bg-gradient-to-br from-[#061E18] via-[#09352A] to-[#041611] text-white rounded-[24px] p-4.5 shadow-xl border border-[#1FB88B]/40 relative overflow-hidden space-y-3.5">
                  
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
                      <h1 className="text-[16px] font-black text-white m-0 leading-tight">
                        {scannedTree.variety}
                      </h1>
                      <span className="text-[11px] font-mono text-[#C8E86B] font-bold block mt-0.5">
                        {scannedTree.code}
                      </span>
                      <span className="text-[9.5px] text-[#A7F3D0] block mt-0.5">
                        {scannedTree.block} • {scannedTree.rowAjir}
                      </span>
                    </div>

                    {/* Dynamic QR Badge */}
                    <div className="bg-white p-1 rounded-[12px] shadow-md shrink-0 border border-white/40 text-center">
                      <DynamicQRCode value={scannedTree.code} size={58} bordered={false} />
                      <span className="text-[7.5px] font-mono font-black text-[#061E18] block mt-0.5">
                        PASPOR
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

                  {/* Valuation & Certification Footer */}
                  <div className="pt-2.5 border-t border-white/15 flex flex-col gap-1 text-[9px] text-[#A7F3D0]">
                    <div className="flex justify-between items-center">
                      <span>📍 GPS: <strong className="font-mono text-white">{scannedTree.gpsCoords}</strong></span>
                      <span className="bg-[#C8E86B]/20 text-[#C8E86B] px-2 py-0.5 rounded font-mono font-bold">
                        {scannedTree.gapCertificateNo.split(' ')[0]}
                      </span>
                    </div>
                    <div className="bg-black/30 p-2.5 rounded-[10px] flex justify-between items-center text-white border border-white/10 mt-1">
                      <span>💰 Valuasi Panen per Pohon:</span>
                      <strong className="text-[#C8E86B] font-black text-[11px]">
                        {scannedTree.variety.includes('Melon')
                          ? 'Rp 60.000 (ROI +32%)'
                          : scannedTree.variety.includes('Porang')
                          ? 'Rp 70.000 (ROI +35%)'
                          : 'Rp 48.000 (ROI +28%)'}
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
                  className="w-full py-3 bg-white hover:bg-[#E8F1EA] text-[#0F5545] font-black text-[12px] rounded-[16px] border border-[#DDE5DF] flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-98 transition-all"
                >
                  <i className="ri-qr-scan-2-line text-lg"></i>
                  <span>Pindai QR Barcode Ajir Lainnya</span>
                </button>
              </div>
            )}

            {/* ==================== TAB 2: GROWTH TIMELAPSE & AUDIT TRAIL ==================== */}
            {activeTab === 'growth' && (
              <div className="space-y-3">
                <div className="bg-white rounded-[20px] p-4 border border-[#E2EAE5] shadow-xs space-y-2.5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#0F5545] block">
                    5 TAHAP PERTUMBUHAN TANAMAN:
                  </span>

                  <div className="space-y-2">
                    {scannedTree.growthStory.map((story, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-[11px]">
                        <div className="w-6 h-6 rounded-full bg-[#E8F1EA] text-[#0F5545] border border-[#0F5545]/20 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                          {idx + 1}
                        </div>
                        <div className="flex-1 bg-[#F8FAF8] p-2.5 rounded-[12px] border border-[#E8F0EB]">
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
                <div className="bg-white rounded-[20px] p-4 border border-[#E2EAE5] shadow-xs space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#0F5545] block">
                    RIWAYAT LOG TINDAKAN MANDOR:
                  </span>
                  <div className="space-y-1.5">
                    {scannedTree.maintenanceLogs.map((log) => (
                      <div key={log.id} className="p-2.5 rounded-[12px] bg-[#F8FAF8] border border-[#E8F0EB] text-[10.5px]">
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
              <div className="bg-white rounded-[20px] p-4 border border-[#E2EAE5] shadow-xs space-y-3">
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
                      className="w-full p-2.5 bg-[#F8FAF8] border border-[#DDE5DF] rounded-[10px] font-bold text-[#11231D]"
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
                        className="w-full p-2.5 bg-[#F8FAF8] border border-[#DDE5DF] rounded-[10px]"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-[#5F6A65] block mb-0.5">Dosis / Ukuran:</label>
                      <input
                        type="text"
                        value={formDose}
                        onChange={(e) => setFormDose(e.target.value)}
                        className="w-full p-2.5 bg-[#F8FAF8] border border-[#DDE5DF] rounded-[10px]"
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
                      className="w-full p-2.5 bg-[#F8FAF8] border border-[#DDE5DF] rounded-[10px] font-semibold"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-[#5F6A65] block mb-0.5">Catatan Tambahan:</label>
                    <textarea
                      value={formNotes}
                      onChange={(e) => setFormNotes(e.target.value)}
                      rows={2}
                      className="w-full p-2.5 bg-[#F8FAF8] border border-[#DDE5DF] rounded-[10px]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#0F5545] hover:bg-[#0B3B30] text-white font-black text-[12.5px] rounded-[14px] shadow-md cursor-pointer transition-all active:scale-98"
                  >
                    💾 Simpan Log Tindakan ke KTP Tanaman
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
