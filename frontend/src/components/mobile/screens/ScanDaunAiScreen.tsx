import React, { useState, useEffect, useRef } from 'react';
import { useSmartFarmStore } from '../../../store/smartFarmStore';

interface ScanDaunAiScreenProps {
  onBack: () => void;
}

export const ScanDaunAiScreen: React.FC<ScanDaunAiScreenProps> = ({ onBack }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { plantScans, addPlantScan, addTreeLog } = useSmartFarmStore();

  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [selectedTreeCode, setSelectedTreeCode] = useState('SAMPLE-JGL-A2-0841');
  const [scanResult, setScanResult] = useState<{
    plant: string;
    health: string;
    disease: string;
    brixEst: string;
    advice: string;
  } | null>({
    plant: 'Melon Golden Apollo (Blok A2 - Bedeng 04)',
    health: '98.4% Sangat Sehat & Bebas Hama',
    disease: 'Tidak Terdeteksi Penyakit / Klorofil Optimal',
    brixEst: '14.2° – 15.5° Brix (Kualitas Ekspor Grade A)',
    advice: 'Lanjutkan fertigasi drip AB Mix 2.2 mS/cm jam 15:30. Siap panen 18 hari lagi.',
  });
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

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
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const handleBack = () => {
    stopCamera();
    onBack();
  };

  const handleCaptureOrUpload = (e?: React.ChangeEvent<HTMLInputElement>) => {
    let imgPreviewUrl: string | null = null;

    if (e && e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      imgPreviewUrl = URL.createObjectURL(file);
      setCapturedImage(imgPreviewUrl);
    } else if (isCameraActive && videoRef.current) {
      // Capture canvas snapshot from live video
      try {
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth || 400;
        canvas.height = videoRef.current.videoHeight || 300;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
          imgPreviewUrl = canvas.toDataURL('image/jpeg', 0.85);
          setCapturedImage(imgPreviewUrl);
        }
      } catch {
        // Fallback placeholder
        imgPreviewUrl = '/assets/login/left_hero_bg.png';
      }
    }

    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      const newResult = {
        plant:
          selectedTreeCode === 'SAMPLE-JGL-A2-0841'
            ? 'Melon Golden Apollo (Blok A2 - Bedeng 04)'
            : selectedTreeCode === 'SAMPLE-JGL-B1-0412'
            ? 'Porang Madiun Super (Blok B1 - Paranet 40%)'
            : 'Cabai Rawit Merah Ori 212 (Blok C1)',
        health: '97.6% Prima & Tervalidasi Vision AI',
        disease: 'Nihil Jamur Patogen / Bercak Daun < 1%',
        brixEst: selectedTreeCode === 'SAMPLE-JGL-A2-0841' ? '14.5° Brix' : 'Glukomanan 48%',
        advice: 'Kondisi tanaman optimal. Pertahankan kelembapan tanah bedengan 65% – 70%.',
      };
      setScanResult(newResult);

      // Persist to store
      addPlantScan({
        plantName: newResult.plant,
        plantCode: selectedTreeCode,
        imageUrl: imgPreviewUrl || undefined,
        healthScore: newResult.health,
        detectedIssue: newResult.disease,
        recommendation: newResult.advice,
        brixEst: newResult.brixEst,
        scannedBy: 'Petani / Mandor Lapangan',
      });

      addTreeLog(selectedTreeCode, {
        time: 'Hari ini ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
        action: 'Scan Tumbuhan Vision AI',
        detail: `Hasil: ${newResult.health}. ${newResult.advice}`,
        pic: 'Kang Asep (Regu A)',
      });

      setSaveSuccessMsg('✅ Hasil diagnosa berhasil dicatat ke Paspor Pohon Sampel & Feed AI!');
      setTimeout(() => setSaveSuccessMsg(null), 4000);
    }, 1200);
  };

  return (
    <div
      className="space-y-3 pb-6 animate-in fade-in duration-150 antialiased text-[#11231D]"
      style={{ fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      {/* Back Button */}
      <button
        type="button"
        onClick={handleBack}
        className="flex items-center gap-1.5 text-[12px] font-bold text-[#0F5545] hover:text-[#0B3B30] cursor-pointer"
      >
        <i className="ri-arrow-left-line text-sm"></i>
        <span>Kembali ke Menu & Modul</span>
      </button>

      {/* Target Tree Selector */}
      <div className="bg-white p-2.5 rounded-[12px] border border-[#E2EAE5] flex items-center justify-between shadow-2xs text-[11px]">
        <span className="font-bold text-[#0B3B30]">Pohon / Ajir Target:</span>
        <select
          value={selectedTreeCode}
          onChange={(e) => setSelectedTreeCode(e.target.value)}
          className="bg-[#F8FAF8] border border-[#D9E3DC] rounded-[8px] px-2.5 py-1 text-[11px] font-bold text-[#0F5545] outline-none cursor-pointer"
        >
          <option value="SAMPLE-JGL-A2-0841">🍈 Melon Apollo (Ajir #17)</option>
          <option value="SAMPLE-JGL-B1-0412">🥔 Porang Madiun (Ajir #08)</option>
          <option value="SAMPLE-JGL-C1-0199">🌶️ Cabai Rawit (Ajir #45)</option>
          <option value="SAMPLE-JGL-A3-0055">🥑 Alpukat Miki (Border #01)</option>
        </select>
      </div>

      {/* AI Viewfinder Camera Box */}
      <div className="w-full h-60 rounded-[20px] bg-black text-white flex flex-col items-center justify-center p-3 relative overflow-hidden shadow-md border border-[#14473B]">
        {/* Live Video or Captured Image */}
        {capturedImage ? (
          <img src={capturedImage} alt="Captured Plant" className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`absolute inset-0 w-full h-full object-cover ${isCameraActive ? 'opacity-100' : 'opacity-0'}`}
          />
        )}

        {/* Viewfinder Corners */}
        <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[#C8E86B] z-10 pointer-events-none"></div>
        <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-[#C8E86B] z-10 pointer-events-none"></div>
        <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-[#C8E86B] z-10 pointer-events-none"></div>
        <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-[#C8E86B] z-10 pointer-events-none"></div>

        {/* Laser Scan Bar Animation */}
        {isScanning && (
          <div className="absolute inset-x-4 top-1/2 h-0.5 bg-[#C8E86B] shadow-[0_0_16px_#C8E86B] animate-pulse z-20"></div>
        )}

        {/* Camera Center Target */}
        {!isCameraActive && !capturedImage && (
          <div className="relative z-10 text-center px-4">
            <div className="w-12 h-12 rounded-full bg-white/10 border border-[#C8E86B]/40 flex items-center justify-center mx-auto mb-1.5 text-[#C8E86B] text-xl animate-pulse">
              <i className="ri-leaf-fill"></i>
            </div>
            <span className="text-[11.5px] font-bold text-white block">
              {isScanning ? 'Menganalisis Klorofil & Pola Tumbuhan...' : 'Arahkan Kamera ke Tumbuhan'}
            </span>
            <span className="text-[9.5px] text-[#A3D9C9] block mt-0.5">
              Model Vision AI: AgroVision v4.2 • Akurasi 99.1%
            </span>
            <button
              type="button"
              onClick={startCamera}
              className="mt-2 px-3 py-1 bg-white/15 hover:bg-white/25 rounded-full text-[10px] font-bold text-white border border-white/20 cursor-pointer"
            >
              📷 Buka Kamera Live
            </button>
          </div>
        )}

        {/* Bottom Action Controls */}
        <div className="absolute bottom-2.5 inset-x-3 z-20 flex items-center justify-center gap-2">
          {/* Snap Photo Button */}
          <button
            type="button"
            onClick={() => handleCaptureOrUpload()}
            disabled={isScanning}
            className="py-1.5 px-4 rounded-full bg-[#C8E86B] hover:bg-[#b8d85c] text-[#08201A] font-black text-[11px] cursor-pointer shadow-md active:scale-95 transition-all flex items-center gap-1.5"
          >
            <i className="ri-camera-lens-fill text-sm"></i>
            <span>{isScanning ? 'Memproses AI...' : '📸 Ambil Foto & Diagnosa'}</span>
          </button>

          {/* Upload File Fallback */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="py-1.5 px-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-bold text-[10.5px] border border-white/30 cursor-pointer flex items-center gap-1"
          >
            <i className="ri-upload-2-line"></i>
            <span>Upload Foto</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={handleCaptureOrUpload}
          />
        </div>
      </div>

      {saveSuccessMsg && (
        <div className="p-2.5 bg-[#E8F1EA] text-[#0F5545] rounded-[10px] text-[11px] font-bold border border-[#0F5545]/20 animate-in fade-in">
          {saveSuccessMsg}
        </div>
      )}

      {/* Result Card */}
      {scanResult && (
        <div className="bg-white rounded-[16px] p-3.5 border border-[#E2EAE5] shadow-[0_2px_8px_rgba(0,0,0,0.03)] space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[9.5px] font-extrabold text-[#0F5545] uppercase tracking-wider block">
                HASIL DIAGNOSTIK VISION AI
              </span>
              <h2 className="text-[13px] font-bold text-[#11231D] m-0 mt-0.5">
                {scanResult.plant}
              </h2>
            </div>
            <span className="bg-[#E8F3ED] text-[#0F5545] text-[9.5px] font-black px-2 py-0.5 rounded-full">
              {scanResult.health.split(' ')[0]}
            </span>
          </div>

          <div className="space-y-1.5 text-[11px] bg-[#F8FAF8] p-2.5 rounded-[10px] border border-[#E8F0EB]">
            <div>
              <span className="text-[#6A7B73] text-[10px] block">🔬 Deteksi Hama / Jamur:</span>
              <strong className="text-[#11231D] font-semibold">{scanResult.disease}</strong>
            </div>
            <div className="border-t border-[#E2EAE5] pt-1">
              <span className="text-[#6A7B73] text-[10px] block">🍯 Estimasi Kemanisan Buah (Brix):</span>
              <strong className="text-[#0F5545] font-bold">{scanResult.brixEst}</strong>
            </div>
            <div className="border-t border-[#E2EAE5] pt-1">
              <span className="text-[#6A7B73] text-[10px] block">💡 Rekomendasi Tindakan Agronomis:</span>
              <strong className="text-[#047857] font-semibold">{scanResult.advice}</strong>
            </div>
          </div>
        </div>
      )}

      {/* Riwayat Scan Tumbuhan Terakhir dari Store */}
      <div className="bg-white rounded-[16px] p-3.5 border border-[#E2EAE5] shadow-[0_2px_8px_rgba(0,0,0,0.03)] space-y-2">
        <span className="text-[11px] font-extrabold text-[#0B3B30] uppercase tracking-wider block">
          📋 RIWAYAT SCAN TUMBUHAN TERVERIFIKASI
        </span>
        <div className="space-y-1.5">
          {plantScans.slice(0, 3).map((scan) => (
            <div key={scan.id} className="p-2.5 bg-[#F8FAF8] rounded-[10px] border border-[#E8F0EB] space-y-1 text-[11px]">
              <div className="flex justify-between items-center">
                <strong className="text-[11.5px] font-bold text-[#0F5545]">{scan.plantName}</strong>
                <span className="text-[9.5px] font-medium text-[#6A7B73]">{scan.timestamp}</span>
              </div>
              <p className="text-[#11231D] text-[10.5px] m-0">{scan.detectedIssue}</p>
              <div className="pt-0.5 flex justify-between items-center text-[9.5px] text-[#6A7B73]">
                <span>Pencatat: <strong>{scan.scannedBy}</strong></span>
                <span className="text-[#047857] font-bold">Brix: {scan.brixEst}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
