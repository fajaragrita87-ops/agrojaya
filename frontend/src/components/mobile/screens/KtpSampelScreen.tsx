import React, { useState, useRef, useEffect, useCallback } from 'react';
import jsQR from 'jsqr';
import { DynamicQRCode } from '../../common/DynamicQRCode';
import { useSmartFarmStore, type TreeSample, type TreeLog } from '../../../store/smartFarmStore';

interface KtpSampelScreenProps {
  onBack?: () => void;
}

export const KtpSampelScreen: React.FC<KtpSampelScreenProps> = () => {
  const { treeSamples, addTreeLog } = useSmartFarmStore();

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  const [activeMainTab, setActiveMainTab] = useState<'scanner' | 'ktp_view'>('scanner');
  const [selectedTree, setSelectedTree] = useState<TreeSample>(treeSamples[0] || null);
  const [ktpSubTab, setKtpSubTab] = useState<'kpi' | 'growth' | 'logs' | 'add_log'>('kpi');

  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // Form State for Field Maintenance Log
  const [actionCategory, setActionCategory] = useState<'PENYIRAMAN' | 'PEMUPUKAN' | 'PRUNING' | 'HAMA'>('PEMUPUKAN');
  const [actionDetail, setActionDetail] = useState('Nutrisi AB Mix Khusus (EC 2.2, pH 6.2) 2.0L / pohon');
  const [workerName, setWorkerName] = useState('Kang Asep (Regu A)');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleDetectedCode = useCallback((codeText: string) => {
    if (navigator.vibrate) {
      try {
        navigator.vibrate(80);
      } catch {
        // ignore
      }
    }

    setIsScanning(true);
    // Find matching sample or fallback
    const matched = treeSamples.find(
      (t) => t.code.toLowerCase() === codeText.toLowerCase() || t.id.toLowerCase() === codeText.toLowerCase()
    );

    const targetTree = matched || treeSamples[0];
    setSelectedTree(targetTree);

    setTimeout(() => {
      setIsScanning(false);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      setIsCameraActive(false);
      setActiveMainTab('ktp_view');
      setKtpSubTab('kpi');
    }, 400);
  }, [treeSamples]);

  const tickScanner = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) {
      animFrameIdRef.current = requestAnimationFrame(tickScanner);
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });

      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: 'dontInvert',
        });

        if (code && code.data && code.data.trim().length > 0) {
          handleDetectedCode(code.data.trim());
          return;
        }
      }
    }

    animFrameIdRef.current = requestAnimationFrame(tickScanner);
  }, [handleDetectedCode]);

  const startCamera = async () => {
    try {
      setCameraError(null);
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'environment',
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.setAttribute('playsinline', 'true');
          videoRef.current.play().catch(() => {});
        }
        setIsCameraActive(true);
        animFrameIdRef.current = requestAnimationFrame(tickScanner);
      }
    } catch {
      setIsCameraActive(false);
      setCameraError('Izin kamera belum aktif. Pilih pohon dari daftar sampel di bawah.');
    }
  };

  const stopCamera = () => {
    if (animFrameIdRef.current) {
      cancelAnimationFrame(animFrameIdRef.current);
      animFrameIdRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  useEffect(() => {
    if (activeMainTab === 'scanner') {
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [activeMainTab]);

  const handleScanSample = (sample: TreeSample) => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      stopCamera();
      setSelectedTree(sample);
      setActiveMainTab('ktp_view');
      setKtpSubTab('kpi');
    }, 200);
  };

  const handleSaveLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTree) return;

    const timeStr = `Hari Ini ${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`;
    const newLog: TreeLog = {
      id: `LOG-${Date.now()}`,
      time: timeStr,
      action: actionCategory,
      detail: actionDetail,
      pic: workerName,
    };

    addTreeLog(selectedTree.code, newLog);
    setSuccessMsg(`✅ Berhasil mencatat "${actionCategory}" untuk ajir ${selectedTree.code}.`);
    setTimeout(() => setSuccessMsg(null), 3500);
    setKtpSubTab('logs');
  };

  const getCommodityEmoji = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('melon')) return '🍈';
    if (lower.includes('porang')) return '🥔';
    if (lower.includes('cabai') || lower.includes('cabe')) return '🌶️';
    if (lower.includes('alpukat')) return '🥑';
    return '🌿';
  };

  return (
    <div
      className="space-y-3 antialiased text-[#11231D]"
      style={{
        fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 88px)',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {/* Hidden Canvas for QR Code Frame Analysis */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Segmented Main Navigation Tabs */}
      <div className="bg-[#E8F1EA] p-1 rounded-[14px] flex items-center gap-1 shadow-2xs">
        <button
          type="button"
          onClick={() => setActiveMainTab('scanner')}
          className={`flex-1 py-2 rounded-[11px] text-[11.5px] font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeMainTab === 'scanner'
              ? 'bg-[#0F5545] text-white shadow-sm'
              : 'text-[#5F6A65] hover:text-[#0F5545]'
          }`}
        >
          <i className="ri-qr-scan-2-line text-sm"></i>
          <span>Pindai QR Ajir</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveMainTab('ktp_view')}
          className={`flex-1 py-2 rounded-[11px] text-[11.5px] font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeMainTab === 'ktp_view'
              ? 'bg-[#0F5545] text-white shadow-sm'
              : 'text-[#5F6A65] hover:text-[#0F5545]'
          }`}
        >
          <i className="ri-profile-line text-sm"></i>
          <span>KTP Tanaman</span>
        </button>
      </div>

      {/* ==================== 1. SCANNER VIEW ==================== */}
      {activeMainTab === 'scanner' && (
        <div className="space-y-3 animate-in fade-in duration-150">
          {/* High-Tech Futuristic HUD Viewfinder Box */}
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

            {/* Glowing Corner Brackets */}
            <div className="absolute top-4 left-4 w-7 h-7 border-t-2 border-l-2 border-[#C8E86B] drop-shadow-[0_0_8px_#C8E86B] z-10 pointer-events-none"></div>
            <div className="absolute top-4 right-4 w-7 h-7 border-t-2 border-r-2 border-[#C8E86B] drop-shadow-[0_0_8px_#C8E86B] z-10 pointer-events-none"></div>
            <div className="absolute bottom-4 left-4 w-7 h-7 border-b-2 border-l-2 border-[#C8E86B] drop-shadow-[0_0_8px_#C8E86B] z-10 pointer-events-none"></div>
            <div className="absolute bottom-4 right-4 w-7 h-7 border-b-2 border-r-2 border-[#C8E86B] drop-shadow-[0_0_8px_#C8E86B] z-10 pointer-events-none"></div>

            {/* Scan Reticle with Sweeping Laser */}
            <div className="w-44 h-44 border border-white/20 rounded-[18px] flex items-center justify-center pointer-events-none relative z-10">
              <div className="absolute inset-x-2 top-1/2 h-0.5 bg-gradient-to-r from-transparent via-[#C8E86B] to-transparent shadow-[0_0_16px_#C8E86B] animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-[#C8E86B] shadow-[0_0_8px_#C8E86B]"></div>
            </div>

            {/* Top HUD Telemetry Tags */}
            <div className="absolute top-3 inset-x-4 flex justify-between items-center text-[8.5px] font-mono text-[#C8E86B] z-20 pointer-events-none">
              <span className="bg-black/60 px-2 py-0.5 rounded-full border border-[#C8E86B]/30 backdrop-blur-xs">
                🎯 AUTO-SCANNER AKTIF
              </span>
              <span className="bg-black/60 px-2 py-0.5 rounded-full border border-[#C8E86B]/30 backdrop-blur-xs">
                📍 GPS TERKUNCI
              </span>
            </div>

            {!isCameraActive && (
              <div className="relative z-10 flex flex-col items-center px-4">
                <div className="w-12 h-12 rounded-full bg-white/10 border border-[#C8E86B]/30 flex items-center justify-center mb-2 text-[#C8E86B] text-2xl animate-pulse">
                  <i className="ri-qr-code-line"></i>
                </div>
                <strong className="text-[12px] text-white">Arahkan Kamera ke Barcode Ajir Sampel</strong>
                <span className="text-[9.5px] text-[#A3D9C9] max-w-[240px] mt-0.5">
                  {cameraError || 'Posisikan QR Code di dalam kotak untuk membuka KTP tanaman secara otomatis.'}
                </span>
              </div>
            )}

            {/* In-Camera Automatic Status Indicator (No manual buttons) */}
            <div className="absolute bottom-3.5 inset-x-4 z-20 flex justify-center">
              <div className="px-3.5 py-1.5 rounded-full bg-black/70 border border-[#C8E86B]/40 backdrop-blur-md flex items-center gap-2 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-[#C8E86B] animate-ping"></span>
                <span className="text-[11px] font-bold text-[#C8E86B]">
                  {isScanning ? 'Membaca QR...' : 'Mendeteksi Otomatis...'}
                </span>
              </div>
            </div>
          </div>

          {/* List of Detected Sample Plants on Farm */}
          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#0F5545]">
                DAFTAR AJIR SAMPEL PERKEBUNAN:
              </span>
              <span className="text-[9.5px] font-bold text-[#5F6A65] bg-white px-2 py-0.5 rounded-full border border-[#DDE5DF]">
                {treeSamples.length} Pohon Aktif
              </span>
            </div>

            <div className="space-y-2">
              {treeSamples.map((tree) => {
                const isCurrent = selectedTree?.id === tree.id;
                return (
                  <div
                    key={tree.id}
                    onClick={() => handleScanSample(tree)}
                    className={`p-3 rounded-[16px] border transition-all cursor-pointer flex items-center justify-between gap-3 shadow-xs ${
                      isCurrent
                        ? 'bg-gradient-to-r from-[#F0FDF4] to-[#E8F8EE] border-[#0F5545] ring-1 ring-[#0F5545]/20'
                        : 'bg-white border-[#E2EAE5] hover:border-[#0F5545]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="w-10 h-10 rounded-[12px] bg-[#E8F1EA] text-[#0F5545] border border-[#0F5545]/15 flex items-center justify-center text-2xl shrink-0 shadow-2xs">
                        {getCommodityEmoji(tree.variety)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <strong className="text-[12px] font-black text-[#11231D] truncate leading-tight">
                            {tree.variety}
                          </strong>
                        </div>
                        <span className="text-[9.5px] font-mono text-[#0F5545] font-bold block truncate mt-0.5">
                          {tree.code} • <span className="text-[#5F6A65] font-sans">{tree.locationDetail}</span>
                        </span>
                      </div>
                    </div>

                    <div className="text-right shrink-0 flex flex-col items-end gap-1">
                      <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[#166534] border border-[#166534]/15">
                        {tree.healthScore.split(' ')[0]} Sehat
                      </span>
                      <span className="text-[10px] font-extrabold text-[#0F5545] flex items-center gap-0.5">
                        Buka KTP <i className="ri-arrow-right-s-line"></i>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ==================== TAB 2: KTP PASPOR DIGITAL VIEW ==================== */}
      {activeMainTab === 'ktp_view' && selectedTree && (
        <div className="space-y-3 animate-in fade-in duration-150">
          {/* Main Passport Card */}
          <div className="bg-gradient-to-br from-[#061E18] via-[#09352A] to-[#041611] text-white rounded-[22px] p-4 shadow-xl border border-[#1FB88B]/40 relative overflow-hidden space-y-3.5">
            {/* Top Passport Header */}
            <div className="flex justify-between items-start gap-2 border-b border-white/15 pb-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="bg-[#C8E86B] text-[#061E18] text-[8.5px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider">
                    PASPOR DIGITAL POHON
                  </span>
                  <span className="text-[9px] text-[#A7F3D0] font-bold">
                    ✓ GAP Organik
                  </span>
                </div>
                <h1 className="text-[16px] font-black text-white m-0 leading-tight">
                  {selectedTree.variety}
                </h1>
                <span className="text-[10.5px] font-mono text-[#C8E86B] font-bold block mt-0.5">
                  {selectedTree.code}
                </span>
                <span className="text-[9.5px] text-[#A7F3D0] block mt-0.5">
                  {selectedTree.block} • {selectedTree.locationDetail}
                </span>
              </div>

              {/* QR Code Card Thumbnail */}
              <div className="bg-white p-1 rounded-[10px] shadow-md shrink-0 border border-white/40 text-center">
                <DynamicQRCode value={selectedTree.code} size={52} />
                <span className="text-[7.5px] font-mono font-black text-black block mt-0.5">
                  SCAN ME
                </span>
              </div>
            </div>

            {/* 4 Key KPI Tiles */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white/10 backdrop-blur-xs p-2.5 rounded-[12px] border border-white/15">
                <span className="text-[9px] text-[#A7F3D0] font-semibold block">📅 Umur & Fase:</span>
                <strong className="text-[12px] font-black text-[#C8E86B] block mt-0.5">
                  {selectedTree.ageHst}
                </strong>
                <span className="text-[8.5px] text-white/80 block truncate mt-0.5">
                  {selectedTree.phase}
                </span>
              </div>

              <div className="bg-white/10 backdrop-blur-xs p-2.5 rounded-[12px] border border-white/15">
                <span className="text-[9px] text-[#A7F3D0] font-semibold block">📏 Ukuran & Bobot:</span>
                <strong className="text-[12px] font-black text-white block mt-0.5">
                  {selectedTree.estWeight}
                </strong>
                <span className="text-[8.5px] text-white/80 block truncate mt-0.5">
                  Tinggi: {selectedTree.growthStory[selectedTree.growthStory.length - 1]?.height || 'Optimal'}
                </span>
              </div>

              <div className="bg-white/10 backdrop-blur-xs p-2.5 rounded-[12px] border border-white/15">
                <span className="text-[9px] text-[#A7F3D0] font-semibold block">🍯 Est. Brix / Mutu:</span>
                <strong className="text-[12px] font-black text-[#C8E86B] block mt-0.5">
                  {selectedTree.targetBrix}
                </strong>
                <span className="text-[8.5px] text-white/80 block truncate mt-0.5">
                  Standar Ekspor Grade A
                </span>
              </div>

              <div className="bg-white/10 backdrop-blur-xs p-2.5 rounded-[12px] border border-white/15">
                <span className="text-[9px] text-[#A7F3D0] font-semibold block">🩺 Skor Kesehatan:</span>
                <strong className="text-[12px] font-black text-[#7AE3B6] block mt-0.5">
                  {selectedTree.healthScore}
                </strong>
                <span className="text-[8.5px] text-white/80 block truncate mt-0.5">
                  PJ: {selectedTree.farmer}
                </span>
              </div>
            </div>

            {/* Biological Asset Valuation & Certification Footer */}
            <div className="pt-2 border-t border-white/15 flex flex-col gap-1 text-[9px] text-[#A7F3D0]">
              <div className="flex justify-between items-center">
                <span>📍 GPS: <strong className="font-mono text-white">{selectedTree.gpsCoords}</strong></span>
                <span className="bg-[#C8E86B]/20 text-[#C8E86B] px-2 py-0.5 rounded font-mono font-bold">
                  GAP-EXP-2026
                </span>
              </div>
              <div className="bg-black/30 p-2 rounded-[8px] flex justify-between items-center text-white border border-white/10 mt-1">
                <span>💰 Valuasi Panen per Pohon:</span>
                <strong className="text-[#C8E86B] font-black text-[10.5px]">
                  {selectedTree.variety.includes('Melon') ? 'Rp 60.000 (ROI +32%)' : selectedTree.variety.includes('Porang') ? 'Rp 70.000 (ROI +35%)' : 'Rp 48.000 (ROI +28%)'}
                </strong>
              </div>
            </div>
          </div>

          {/* Sub Navigation Inside Passport */}
          <div className="grid grid-cols-3 gap-1 bg-[#E8EEEA] p-1 rounded-[12px]">
            <button
              type="button"
              onClick={() => setKtpSubTab('growth')}
              className={`py-1.5 text-[10.5px] font-black rounded-[9px] transition-all cursor-pointer flex items-center justify-center gap-1 ${
                ktpSubTab === 'growth' ? 'bg-[#0F5545] text-white shadow-xs' : 'text-[#5F6A65]'
              }`}
            >
              <i className="ri-line-chart-line"></i>
              <span>Siklus (5)</span>
            </button>

            <button
              type="button"
              onClick={() => setKtpSubTab('logs')}
              className={`py-1.5 text-[10.5px] font-black rounded-[9px] transition-all cursor-pointer flex items-center justify-center gap-1 ${
                ktpSubTab === 'logs' ? 'bg-[#0F5545] text-white shadow-xs' : 'text-[#5F6A65]'
              }`}
            >
              <i className="ri-history-line"></i>
              <span>Riwayat</span>
            </button>

            <button
              type="button"
              onClick={() => setKtpSubTab('add_log')}
              className={`py-1.5 text-[10.5px] font-black rounded-[9px] transition-all cursor-pointer flex items-center justify-center gap-1 ${
                ktpSubTab === 'add_log' ? 'bg-[#0F5545] text-white shadow-xs' : 'text-[#5F6A65]'
              }`}
            >
              <i className="ri-add-circle-line"></i>
              <span>Catat Rawat</span>
            </button>
          </div>

          {successMsg && (
            <div className="p-2.5 bg-[#E8F1EA] text-[#0F5545] rounded-[12px] text-[11px] font-bold text-center border border-[#0F5545]/20 animate-in fade-in">
              {successMsg}
            </div>
          )}

          {/* SUBTAB 1: GROWTH STORY STEPPER */}
          {ktpSubTab === 'growth' && (
            <div className="bg-white rounded-[18px] p-3.5 border border-[#E2EAE5] shadow-xs space-y-3 animate-in fade-in">
              <span className="text-[11px] font-extrabold text-[#0F5545] uppercase tracking-wider block">
                🌱 5 TAHAP SIKLUS PERTUMBUHAN
              </span>
              
              <div className="space-y-3 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-[#E2EAE5]">
                {selectedTree.growthStory.map((st, idx) => {
                  const isDone = st.status.includes('Selesai');
                  const isActive = st.status.includes('Aktif');
                  return (
                    <div key={idx} className="relative flex items-start gap-3 pl-1">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] shrink-0 z-10 ${
                          isDone
                            ? 'bg-[#0F5545] text-white'
                            : isActive
                            ? 'bg-[#C8E86B] text-[#061E18] ring-4 ring-[#C8E86B]/30'
                            : 'bg-[#E2EAE5] text-[#5F6A65]'
                        }`}
                      >
                        {isDone ? '✓' : idx + 1}
                      </div>
                      <div className="flex-1 bg-[#F8FAF8] p-2.5 rounded-[12px] border border-[#E8F0EB]">
                        <div className="flex justify-between items-center">
                          <strong className="text-[11.5px] font-bold text-[#11231D]">
                            {st.stage}
                          </strong>
                          <span
                            className={`text-[9px] font-extrabold px-2 py-0.2 rounded-full ${
                              isActive
                                ? 'bg-[#DCFCE7] text-[#166534]'
                                : isDone
                                ? 'bg-[#E8F1EA] text-[#0F5545]'
                                : 'bg-[#FEF3C7] text-[#92400E]'
                            }`}
                          >
                            {st.status}
                          </span>
                        </div>
                        <div className="flex justify-between text-[10px] text-[#5F6A65] mt-1">
                          <span>📅 {st.date}</span>
                          <strong className="text-[#0F5545]">Tinggi: {st.height}</strong>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* SUBTAB 2: LOGS LIST */}
          {(ktpSubTab === 'logs' || ktpSubTab === 'kpi') && (
            <div className="bg-white rounded-[18px] p-3.5 border border-[#E2EAE5] shadow-xs space-y-2.5 animate-in fade-in">
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-extrabold text-[#0F5545] uppercase tracking-wider">
                  📋 RIWAYAT PERAWATAN AJIR INI
                </span>
                <button
                  type="button"
                  onClick={() => setKtpSubTab('add_log')}
                  className="text-[10px] font-bold text-[#0F5545] hover:underline cursor-pointer"
                >
                  + Tambah Log
                </button>
              </div>

              <div className="space-y-2">
                {selectedTree.recentLogs.map((log, idx) => (
                  <div key={idx} className="p-2.5 rounded-[12px] bg-[#F8FAF8] border border-[#E8F0EB] space-y-1">
                    <div className="flex justify-between items-center">
                      <strong className="text-[11px] font-bold text-[#11231D] flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#0F5545]"></span>
                        {log.action}
                      </strong>
                      <span className="text-[9.5px] text-[#0F5545] font-bold">{log.time}</span>
                    </div>
                    <p className="text-[10px] text-[#4B5563] m-0 leading-relaxed pl-3.5">
                      {log.detail}
                    </p>
                    <div className="text-[9px] text-[#6B7280] pl-3.5 pt-0.5">
                      Petugas: <strong className="text-[#11231D]">{log.pic}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUBTAB 3: FORM INPUT ACTION */}
          {ktpSubTab === 'add_log' && (
            <form onSubmit={handleSaveLog} className="bg-white rounded-[18px] p-3.5 border border-[#E2EAE5] shadow-xs space-y-3 animate-in fade-in">
              <span className="text-[11px] font-extrabold text-[#0F5545] uppercase tracking-wider block">
                ✍️ INPUT TINDAKAN PERAWATAN
              </span>

              {/* Action Buttons */}
              <div className="grid grid-cols-4 gap-1">
                {(['PENYIRAMAN', 'PEMUPUKAN', 'PRUNING', 'HAMA'] as const).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setActionCategory(cat);
                      if (cat === 'PENYIRAMAN') setActionDetail('Irigasi drip otomatis 1.5 Liter / polybag');
                      if (cat === 'PEMUPUKAN') setActionDetail('Nutrisi AB Mix Khusus (EC 2.2, pH 6.2) 2.0L');
                      if (cat === 'PRUNING') setActionDetail('Pembuangan tunas air liar & seleksi 1 buah utama');
                      if (cat === 'HAMA') setActionDetail('Semprot biopestisida nabati daun nimba & serai');
                    }}
                    className={`py-1.5 rounded-[8px] font-extrabold text-[9.5px] border cursor-pointer ${
                      actionCategory === cat
                        ? 'bg-[#0F5545] text-white border-[#0F5545]'
                        : 'bg-[#F8FAF8] text-[#5F6A65] border-[#DDE5DF]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div>
                <label className="text-[10px] font-bold text-[#5F6A65] block mb-1">
                  Detail Tindakan & Dosis:
                </label>
                <textarea
                  rows={2}
                  value={actionDetail}
                  onChange={(e) => setActionDetail(e.target.value)}
                  className="w-full p-2 rounded-[10px] border border-[#DDE5DF] text-[11px] font-medium outline-none focus:border-[#0F5545]"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-[#5F6A65] block mb-1">
                  Petugas Lapangan (Mandor / Petani):
                </label>
                <input
                  type="text"
                  value={workerName}
                  onChange={(e) => setWorkerName(e.target.value)}
                  className="w-full px-2.5 py-2 rounded-[10px] border border-[#DDE5DF] text-[11px] font-medium outline-none focus:border-[#0F5545]"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#0F5545] hover:bg-[#0B3B30] text-white font-black text-[11.5px] rounded-[10px] cursor-pointer shadow-xs active:scale-95 transition-transform"
              >
                Simpan Log Tindakan Pohon Ini
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};
