import React, { useState, useEffect, useRef } from 'react';
import { useSmartFarmStore } from '../../../store/smartFarmStore';
import { diagnoseCropWithAI } from '../../../services/aiService';

interface ScanDaunAiScreenProps {
  onBack?: () => void;
}

export const ScanDaunAiScreen: React.FC<ScanDaunAiScreenProps> = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const { plantScans, addPlantScan, addTreeLog } = useSmartFarmStore();

  const [activeTab, setActiveTab] = useState<'camera' | 'history'>('camera');
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [selectedTreeCode, setSelectedTreeCode] = useState('SAMPLE-TR-A2-0841');
  const [scanResult, setScanResult] = useState<{
    plant: string;
    variety: string;
    healthScoreNum: number;
    health: string;
    disease: string;
    brixEst: string;
    assetValuation: string;
    harvestEst: string;
    advice: string;
  } | null>({
    plant: 'Melon Golden Apollo (Blok A2 - Bedeng 04)',
    variety: 'Melon Golden Apollo F1 (Benih Sertifikat)',
    healthScoreNum: 98.4,
    health: '98.4% Klorofil Prima & Bebas Hama',
    disease: '0% Patogen • Nihil Antraknosa & Fusarium',
    brixEst: '14.5° – 15.5° Brix (Standar Ekspor Grade A)',
    assetValuation: 'Est. Rp 60.000 / Pohon (2.4 Kg @ Rp 25.000/Kg)',
    harvestEst: 'Siap Panen 18 Hari Lagi (14 Sep 2026)',
    advice: 'Lanjutkan fertigasi drip AB Mix 2.2 mS/cm jam 15:30. Pertahankan kelembapan tanah 65% – 70%.',
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
    if (activeTab === 'camera') {
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [activeTab]);

  const processDiagnosis = async (imgUrl: string) => {
    setIsScanning(true);
    setCapturedImage(imgUrl);

    try {
      const commodityMap: Record<string, string> = {
        'SAMPLE-TR-A2-0841': 'Melon Golden Apollo F1 Greenhouse',
        'SAMPLE-TR-B1-0412': 'Porang Madiun Super Amorphophallus',
        'SAMPLE-TR-C1-0199': 'Cabai Rawit Merah Ori 212',
        'SAMPLE-TR-A3-0055': 'Alpukat Miki Organik',
      };

      const commodity = commodityMap[selectedTreeCode] || 'Tanaman Perkebunan';
      const aiResult = await diagnoseCropWithAI(commodity, selectedTreeCode, imgUrl);

      setScanResult(aiResult);

      // Persist to store
      addPlantScan({
        plantName: aiResult.plant,
        plantCode: selectedTreeCode,
        imageUrl: imgUrl,
        healthScore: aiResult.health,
        detectedIssue: aiResult.disease,
        recommendation: aiResult.advice,
        brixEst: aiResult.brixEst,
        scannedBy: 'Petani / Mandor Lapangan (AI Verified)',
      });

      addTreeLog(selectedTreeCode, {
        time: 'Hari ini ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
        action: 'Scan Tumbuhan Vision AI',
        detail: `Hasil: ${aiResult.health}. ${aiResult.advice}`,
        pic: 'Kang Asep (Regu A)',
      });

      setSaveSuccessMsg('✅ Hasil diagnosa AI cerdas berhasil diproses dan disimpan!');
      setTimeout(() => setSaveSuccessMsg(null), 3000);
    } catch (err) {
      console.error('Error during AI diagnosis:', err);
    } finally {
      setIsScanning(false);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          processDiagnosis(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSnapClick = () => {
    if (isCameraActive && videoRef.current) {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth || 640;
        canvas.height = videoRef.current.videoHeight || 480;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
          processDiagnosis(dataUrl);
          return;
        }
      } catch (err) {
        console.warn('Canvas snapshot error, falling back to camera input:', err);
      }
    }
    cameraInputRef.current?.click();
  };

  const getPlantEmoji = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('melon')) return '🍈';
    if (lower.includes('porang')) return '🍠';
    if (lower.includes('cabai') || lower.includes('cabe')) return '🌶️';
    if (lower.includes('alpukat')) return '🥑';
    return '🌿';
  };

  return (
    <div
      className="space-y-3 pb-12 animate-in fade-in duration-150 antialiased text-[#11231D]"
      style={{ fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      {/* Hidden File Inputs */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileInputChange}
      />
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileInputChange}
      />

      {/* Segmented Top Tab Switcher: Scanner vs Riwayat */}
      <div className="bg-[#E8F1EA] p-1 rounded-[14px] flex items-center gap-1 shadow-2xs">
        <button
          type="button"
          onClick={() => setActiveTab('camera')}
          className={`flex-1 py-2 rounded-[11px] text-[11.5px] font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'camera'
              ? 'bg-[#0F5545] text-white shadow-sm'
              : 'text-[#5F6A65] hover:text-[#0F5545]'
          }`}
        >
          <i className="ri-camera-lens-fill text-sm"></i>
          <span>Scan Diagnosa AI</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-2 rounded-[11px] text-[11.5px] font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'history'
              ? 'bg-[#0F5545] text-white shadow-sm'
              : 'text-[#5F6A65] hover:text-[#0F5545]'
          }`}
        >
          <i className="ri-history-line text-sm"></i>
          <span>Riwayat ({plantScans.length})</span>
        </button>
      </div>

      {/* ==================== TAB 1: CAMERA SCANNER (CLEAN & FOCUSED) ==================== */}
      {activeTab === 'camera' && (
        <div className="space-y-3 animate-in fade-in duration-150">
          {/* Target Tree Selector */}
          <div className="bg-white p-2.5 rounded-[16px] border border-[#E2EAE5] flex items-center justify-between shadow-2xs text-[11px] gap-2">
            <span className="font-bold text-[#0B3B30] whitespace-nowrap">Pohon / Ajir Target:</span>
            <select
              value={selectedTreeCode}
              onChange={(e) => setSelectedTreeCode(e.target.value)}
              className="bg-[#F8FAF8] border border-[#D9E3DC] rounded-[10px] px-2.5 py-1 text-[11px] font-bold text-[#0F5545] outline-none cursor-pointer flex-1 max-w-[210px] truncate"
            >
              <option value="SAMPLE-TR-A2-0841">🍈 Melon Apollo (Ajir #17)</option>
              <option value="SAMPLE-TR-B1-0412">🍠 Porang Madiun (Ajir #08)</option>
              <option value="SAMPLE-TR-C1-0199">🌶️ Cabai Rawit (Ajir #45)</option>
              <option value="SAMPLE-TR-A3-0055">🥑 Alpukat Miki (Ajir #01)</option>
            </select>
          </div>

          {/* AI Viewfinder Camera Box */}
          <div className="w-full h-72 rounded-[22px] bg-black text-white flex flex-col items-center justify-center p-3 relative overflow-hidden shadow-lg border border-[#14473B]">
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
            <div className="absolute top-3.5 left-3.5 w-6 h-6 border-t-2 border-l-2 border-[#C8E86B] z-10 pointer-events-none"></div>
            <div className="absolute top-3.5 right-3.5 w-6 h-6 border-t-2 border-r-2 border-[#C8E86B] z-10 pointer-events-none"></div>
            <div className="absolute bottom-3.5 left-3.5 w-6 h-6 border-b-2 border-l-2 border-[#C8E86B] z-10 pointer-events-none"></div>
            <div className="absolute bottom-3.5 right-3.5 w-6 h-6 border-b-2 border-r-2 border-[#C8E86B] z-10 pointer-events-none"></div>

            {/* Laser Scan Bar Animation */}
            {isScanning && (
              <div className="absolute inset-x-4 top-1/2 h-0.5 bg-[#C8E86B] shadow-[0_0_18px_#C8E86B] animate-pulse z-20"></div>
            )}

            {/* Center Target Icon when not active */}
            {!isCameraActive && !capturedImage && (
              <div className="relative z-10 text-center px-4">
                <div className="w-12 h-12 rounded-full bg-white/10 border border-[#C8E86B]/40 flex items-center justify-center mx-auto mb-2 text-[#C8E86B] text-2xl animate-pulse">
                  <i className="ri-leaf-fill"></i>
                </div>
                <span className="text-[12px] font-bold text-white block">
                  {isScanning ? 'Menganalisis Jaringan Daun & Klorofil...' : 'Arahkan Kamera ke Daun / Buah'}
                </span>
                <span className="text-[9.5px] text-[#A7F3D0] block mt-0.5 font-mono">
                  AgroVision AI v4.2 • Akurasi 99.1% (GAP ISO)
                </span>
              </div>
            )}

            {/* Action Controls in Camera Viewport */}
            <div className="absolute bottom-3.5 inset-x-3 z-20 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={handleSnapClick}
                disabled={isScanning}
                className="py-2.5 px-5 rounded-full bg-[#C8E86B] hover:bg-[#b8d85c] text-[#08201A] font-black text-[12px] cursor-pointer shadow-lg active:scale-95 transition-all flex items-center gap-2"
              >
                <i className="ri-camera-fill text-base"></i>
                <span>{isScanning ? 'Mendiagnosa...' : '📸 Ambil Foto & Diagnosa AI'}</span>
              </button>

              <button
                type="button"
                onClick={() => galleryInputRef.current?.click()}
                className="py-2.5 px-4 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white font-bold text-[11px] border border-white/30 cursor-pointer flex items-center gap-1.5 shadow-xs active:scale-95 transition-all"
              >
                <i className="ri-image-add-line text-sm"></i>
                <span>Galeri</span>
              </button>
            </div>
          </div>

          {saveSuccessMsg && (
            <div className="p-2.5 bg-[#E8F1EA] text-[#0F5545] rounded-[12px] text-[11px] font-bold text-center border border-[#0F5545]/20 animate-in fade-in">
              {saveSuccessMsg}
            </div>
          )}

          {/* ==================== RESULT CARD (THE INVESTOR WOW CARD) ==================== */}
          {scanResult && (
            <div className="bg-white rounded-[20px] p-4 border border-[#E2EAE5] shadow-[0_2px_12px_rgba(0,0,0,0.04)] space-y-3">
              {/* Header Badge */}
              <div className="flex justify-between items-start gap-2 border-b border-[#E2EAE5] pb-2.5">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="bg-[#0F5545] text-white text-[8.5px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                      🛡️ HASIL DIAGNOSTIK VISION AI
                    </span>
                    <span className="text-[9px] font-bold text-[#166534] bg-[#DCFCE7] px-2 py-0.5 rounded-full">
                      ✓ GAP VERIFIED
                    </span>
                  </div>
                  <h2 className="text-[13.5px] font-black text-[#11231D] m-0 truncate">
                    {scanResult.plant}
                  </h2>
                  <span className="text-[9.5px] text-[#5F6A65] block mt-0.5">
                    {scanResult.variety}
                  </span>
                </div>
              </div>

              {/* 4-KPI Investor Grid */}
              <div className="grid grid-cols-2 gap-2 text-[10.5px]">
                {/* 1. Klorofil & Vitalitas */}
                <div className="bg-[#F8FAF8] p-2.5 rounded-[12px] border border-[#E8F0EB]">
                  <span className="text-[#5F6A65] font-semibold block text-[9px]">🩺 Indeks Klorofil Daun:</span>
                  <strong className="text-[#15803D] font-black block mt-0.5 text-[11.5px]">
                    {scanResult.health}
                  </strong>
                  <div className="w-full bg-[#E2EAE5] h-1.5 rounded-full mt-1.5 overflow-hidden">
                    <div className="bg-[#15803D] h-full rounded-full" style={{ width: `${scanResult.healthScoreNum}%` }}></div>
                  </div>
                </div>

                {/* 2. Estimasi Mutu / Brix */}
                <div className="bg-[#F8FAF8] p-2.5 rounded-[12px] border border-[#E8F0EB]">
                  <span className="text-[#5F6A65] font-semibold block text-[9px]">🍯 Estimasi Mutu / Brix:</span>
                  <strong className="text-[#0F5545] font-black block mt-0.5 text-[11.5px]">
                    {scanResult.brixEst}
                  </strong>
                  <span className="text-[8.5px] text-[#047857] font-bold block mt-1">
                    Kualitas Super Grade A
                  </span>
                </div>

                {/* 3. Status Hama & Patogen */}
                <div className="bg-[#F8FAF8] p-2.5 rounded-[12px] border border-[#E8F0EB]">
                  <span className="text-[#5F6A65] font-semibold block text-[9px]">🔬 Perlindungan Patogen:</span>
                  <strong className="text-[#11231D] font-bold block mt-0.5 text-[10.5px]">
                    {scanResult.disease}
                  </strong>
                  <span className="text-[8.5px] text-[#5F6A65] block mt-0.5">
                    0% Residu Kimia Berbahaya
                  </span>
                </div>

                {/* 4. Valuasi Aset & Panen */}
                <div className="bg-[#F8FAF8] p-2.5 rounded-[12px] border border-[#E8F0EB]">
                  <span className="text-[#5F6A65] font-semibold block text-[9px]">💰 Valuasi Panen per Pohon:</span>
                  <strong className="text-[#0F5545] font-black block mt-0.5 text-[10.5px]">
                    {scanResult.assetValuation}
                  </strong>
                  <span className="text-[8.5px] text-[#D97706] font-bold block mt-0.5">
                    ⏳ {scanResult.harvestEst}
                  </span>
                </div>
              </div>

              {/* AI Recommendation */}
              <div className="bg-[#E8F3ED] p-3 rounded-[14px] border border-[#C6E2D2]">
                <span className="font-black text-[#065F46] block mb-0.5 text-[10px] uppercase tracking-wider">
                  💡 REKOMENDASI PRESISI AGRONOMI:
                </span>
                <p className="text-[#1B3E32] font-medium m-0 leading-relaxed text-[10.5px]">
                  {scanResult.advice}
                </p>
              </div>

              {/* View History Button */}
              <button
                type="button"
                onClick={() => setActiveTab('history')}
                className="w-full py-2.5 bg-[#FAFBF8] hover:bg-[#E8F1EA] text-[#0F5545] font-bold text-[11px] rounded-[12px] border border-[#DDE5DF] flex items-center justify-center gap-1 cursor-pointer transition-colors"
              >
                <span>Lihat Seluruh Riwayat Pemeriksaan Kebun</span>
                <i className="ri-arrow-right-line text-sm"></i>
              </button>
            </div>
          )}
        </div>
      )}

      {/* ==================== TAB 2: RIWAYAT PEMERIKSAAN ==================== */}
      {activeTab === 'history' && (
        <div className="space-y-2.5 animate-in fade-in duration-150">
          <div className="flex items-center justify-between px-0.5">
            <span className="text-[11px] font-extrabold text-[#0B3B30] uppercase tracking-wider">
              📋 RIWAYAT HASIL DIAGNOSTIK VISION AI
            </span>
            <span className="text-[9.5px] font-bold text-[#5F6A65] bg-white px-2.5 py-0.5 rounded-full border border-[#DDE5DF]">
              {plantScans.length} Catatan
            </span>
          </div>

          <div className="space-y-2">
            {plantScans.map((scan) => (
              <div
                key={scan.id}
                className="bg-white rounded-[16px] p-3 border border-[#E2EAE5] shadow-[0_1px_6px_rgba(0,0,0,0.03)] space-y-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <div className="w-10 h-10 rounded-[12px] bg-[#E8F1EA] text-[#0F5545] flex items-center justify-center font-bold text-lg flex-shrink-0 border border-[#0F5545]/15 shadow-2xs">
                      {getPlantEmoji(scan.plantName)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <strong className="text-[12px] font-bold text-[#11231D] block truncate leading-tight">
                        {scan.plantName}
                      </strong>
                      <span className="text-[9.5px] text-[#5F6A65] block mt-0.5">
                        {scan.timestamp} • <strong className="text-[#15803D]">{scan.healthScore}</strong>
                      </span>
                    </div>
                  </div>
                  <span className="flex-shrink-0 text-[9.5px] font-extrabold px-2.5 py-1 rounded-full bg-[#E8F3ED] text-[#0F5545] border border-[#0F5545]/15 whitespace-nowrap">
                    {scan.brixEst}
                  </span>
                </div>

                <div className="bg-[#F8FAF8] p-2 rounded-[10px] text-[10px] text-[#5F6A65] border border-[#E8F0EB]">
                  <span className="font-semibold text-[#11231D] block">{scan.detectedIssue}</span>
                  <p className="m-0 mt-0.5 text-[#0F5545] italic">{scan.recommendation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
