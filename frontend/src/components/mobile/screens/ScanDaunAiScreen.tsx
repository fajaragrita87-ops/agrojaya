import React, { useState, useEffect, useRef } from 'react';

interface ScanDaunAiScreenProps {
  onBack: () => void;
}

export const ScanDaunAiScreen: React.FC<ScanDaunAiScreenProps> = ({ onBack }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<{
    plant: string;
    health: string;
    disease: string;
    brixEst: string;
    advice: string;
  } | null>({
    plant: 'Melon Golden Alisha (Blok A2 - Bedeng 04)',
    health: '97.8% Sangat Sehat',
    disease: 'Tidak Terdeteksi Penyakit / Hama Kutu Kebul Nihil',
    brixEst: '13.8° – 14.5° Brix (Manis Premium)',
    advice: 'Lanjutkan fertigasi drip AB Mix 2.2 mS/cm jam 15:30. Siap panen 18 hari lagi.',
  });

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

  const handleSimulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScanResult({
        plant: 'Melon Golden Alisha (Blok B1 - Bedeng 12)',
        health: '96.2% Sehat (Defisiensi Mg Ringan)',
        disease: 'Bercak Daun Minor (<2% luas daun)',
        brixEst: '12.5° – 13.2° Brix',
        advice: 'Semprotkan pupuk daun MgSO4 (Magnesium Sulfat) 2 gr/Liter air besok pagi.',
      });
    }, 1200);
  };

  return (
    <div className="space-y-3.5 pb-6 animate-in fade-in duration-150 antialiased text-[#11231D]">
      {/* Back Button */}
      <button
        type="button"
        onClick={handleBack}
        className="flex items-center gap-1.5 text-[12px] font-bold text-[#0F5545] hover:text-[#0B3B30] cursor-pointer"
      >
        <i className="ri-arrow-left-line text-sm"></i>
        <span>Kembali ke Menu & Modul</span>
      </button>

      {/* AI Viewfinder Camera Box */}
      <div className="w-full h-56 rounded-[20px] bg-black text-white flex flex-col items-center justify-center p-4 relative overflow-hidden shadow-md border border-[#14473B]">
        {/* Live Video Element */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`absolute inset-0 w-full h-full object-cover ${isCameraActive ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* Camera Viewfinder Corners */}
        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#C8E86B] z-10"></div>
        <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#C8E86B] z-10"></div>
        <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#C8E86B] z-10"></div>
        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#C8E86B] z-10"></div>

        {/* Laser Scan Bar */}
        {isScanning && (
          <div className="absolute inset-x-6 top-1/2 h-0.5 bg-[#C8E86B] shadow-[0_0_15px_#C8E86B] animate-pulse z-20"></div>
        )}

        {/* Center Target */}
        {!isCameraActive && (
          <div className="relative z-10 text-center">
            <div className="w-14 h-14 rounded-full bg-white/10 border border-[#C8E86B]/40 flex items-center justify-center mx-auto mb-2 text-[#C8E86B] text-2xl animate-pulse">
              <i className="ri-leaf-fill"></i>
            </div>
            <span className="text-[12px] font-bold text-white block">
              {isScanning ? 'Menganalisis Klorofil & Pola Daun...' : 'Arahkan Kamera ke Permukaan Daun'}
            </span>
            <span className="text-[10px] text-[#A3D9C9] block mt-0.5">
              Model Vision AI: AgroVision v4.2 • Akurasi 99.1%
            </span>
            <button
              type="button"
              onClick={startCamera}
              className="mt-2 px-3 py-1 bg-white/15 hover:bg-white/25 rounded-full text-[10px] font-bold text-white border border-white/20 cursor-pointer"
            >
              📷 Buka Kamera Device
            </button>
          </div>
        )}

        {/* Scan Action Button */}
        <button
          type="button"
          onClick={handleSimulateScan}
          disabled={isScanning}
          className="absolute bottom-3 z-20 py-1.5 px-6 rounded-full bg-[#C8E86B] hover:bg-[#b8d85c] text-[#08201A] font-black text-[11.5px] cursor-pointer shadow-md active:scale-95 transition-all flex items-center gap-1.5"
        >
          <i className="ri-camera-lens-fill"></i>
          <span>{isScanning ? 'Memproses Diagnosa...' : '📸 Ambil Foto & Diagnosa AI'}</span>
        </button>
      </div>

      {/* Result Card */}
      {scanResult && (
        <div className="bg-white rounded-[16px] p-4 border border-[#E2EAE5] shadow-[0_2px_8px_rgba(0,0,0,0.03)] space-y-2.5">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[9.5px] font-bold text-[#0F5545] uppercase tracking-wider block">
                HASIL DIAGNOSTIK AI LAPANGAN
              </span>
              <h2 className="text-[13.5px] font-black text-[#11231D] m-0 mt-0.5">
                {scanResult.plant}
              </h2>
            </div>
            <span className="bg-[#E8F3ED] text-[#0F5545] text-[10px] font-black px-2 py-0.5 rounded-full">
              {scanResult.health}
            </span>
          </div>

          <div className="space-y-1.5 text-[11px] bg-[#F8FAF8] p-2.5 rounded-[12px] border border-[#E8F0EB]">
            <div>
              <span className="text-[#6A7B73] block">🔬 Deteksi Hama / Jamur:</span>
              <strong className="text-[#11231D]">{scanResult.disease}</strong>
            </div>
            <div className="border-t border-[#E2EAE5] pt-1 mt-1">
              <span className="text-[#6A7B73] block">🍯 Estimasi Kemanisan Buah (Brix):</span>
              <strong className="text-[#0F5545]">{scanResult.brixEst}</strong>
            </div>
            <div className="border-t border-[#E2EAE5] pt-1 mt-1">
              <span className="text-[#6A7B73] block">💡 Rekomendasi Tindakan Agronomis:</span>
              <strong className="text-[#2563EB]">{scanResult.advice}</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
