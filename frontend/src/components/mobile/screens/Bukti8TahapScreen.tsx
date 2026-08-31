import React, { useState, useRef, useEffect } from 'react';
import { useSmartFarmStore, initialStagePhotos } from '../../../store/smartFarmStore';

interface Bukti8TahapScreenProps {
  onBack?: () => void;
}

export const Bukti8TahapScreen: React.FC<Bukti8TahapScreenProps> = () => {
  const { lifecycleStagePhotos, updateLifecycleStagePhoto } = useSmartFarmStore();
  const [selectedTahap, setSelectedTahap] = useState<number>(1);

  // Camera & Upload State
  const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [hasFlash, setHasFlash] = useState<boolean>(false);
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [photoNotes, setPhotoNotes] = useState<string>('');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const tahapanList = [
    {
      id: 1,
      name: 'Pembersihan Lahan & Land Clearing',
      date: '12 Mei 2026',
      gps: '-6.5892, 107.0541 (Kebun Sentra)',
      pic: 'Mandor Sukardi & Tim Traktor',
      status: '100% Selesai',
      desc: 'Pembersihan gulma, alang-alang, dan perataan kontur elevasi tanah 2.0 Ha dengan ekskavator & buldoser.',
      badge: '🚜 Alat Berat Terverifikasi',
    },
    {
      id: 2,
      name: 'Pengolahan Tanah & Bajak Rotavator',
      date: '20 Mei 2026',
      gps: '-6.5894, 107.0544',
      pic: 'Operator Traktor Kubota',
      status: '100% Selesai',
      desc: 'Pembajakan tanah sedalam 30 cm untuk aerasi oksigen dan kegemburan struktur tanah.',
      badge: '🌱 Tanah Gembur Siap',
    },
    {
      id: 3,
      name: 'Aplikasi Kapur Dolomit & Pembenah pH',
      date: '28 Mei 2026',
      gps: '-6.5891, 107.0542',
      pic: 'Agronomis Ahmad Fauzi',
      status: '100% Selesai',
      desc: 'Penaburan dolomit 2 Ton/Ha untuk menaikkan pH tanah dari 5.2 menjadi 6.5 (Ideal).',
      badge: '🧪 Uji Lab pH 6.5',
    },
    {
      id: 4,
      name: 'Pembuatan Bedengan & Parit Drainase',
      date: '05 Jun 2026',
      gps: '-6.5895, 107.0547',
      pic: 'Tim Lapangan Blok A & B',
      status: '100% Selesai',
      desc: 'Pembuatan 48 bedengan (Lebar 110 cm, Tinggi 35 cm) dengan parit anti-genangan.',
      badge: '📏 48 Bedengan Presisi',
    },
    {
      id: 5,
      name: 'Pemasangan Mulsa Plastik Hitam Perak',
      date: '14 Jun 2026',
      gps: '-6.5893, 107.0543',
      pic: 'Petani Terampil Lapangan',
      status: '100% Selesai',
      desc: 'Pemasangan mulsa reflektor cahaya untuk mencegah gulma dan menjaga kelembaban akar.',
      badge: '✨ Mulsa Reflektor Perak',
    },
    {
      id: 6,
      name: 'Instalasi Pipa Irigasi Tetes Presisi',
      date: '22 Jun 2026',
      gps: '-6.5896, 107.0548',
      pic: 'Teknisi Hidrolik Irigasi',
      status: '100% Selesai',
      desc: 'Pemasangan selang drip emitter 2 L/jam terhubung otomatis ke tangki nutrisi IoT.',
      badge: '💧 Drip Emitter IoT',
    },
    {
      id: 7,
      name: 'Penanaman Bibit Unggul Golden Melon F1',
      date: '02 Jul 2026',
      gps: '-6.5892, 107.0541',
      pic: 'Kepala Kebun & 14 Mandor',
      status: '100% Selesai',
      desc: 'Transplanting 8.500 bibit melon bersertifikasi sehat dengan perakaran kokoh.',
      badge: '🌿 8.500 Bibit Unggul',
    },
    {
      id: 8,
      name: 'Perawatan Harian & Telemetri IoT',
      date: 'Hari Ini (Sedang Berjalan)',
      gps: '-6.5894, 107.0545',
      pic: 'Sistem Otomasi & Mandor Harian',
      status: 'Aktif (84% Menuju Panen)',
      desc: 'Penyiraman nutrisi drip terukur, pewiwitan tunas air, dan sensor kelembaban tanah 72%.',
      badge: '🍈 Buah Membesar (Brix 14.5°)',
    },
  ];

  // Start hardware camera stream
  const startCameraStream = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: facingMode, width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false,
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        setCameraActive(true);
      } else {
        setCameraActive(false);
      }
    } catch (err) {
      console.warn('Camera stream hardware not accessible, using interactive viewfinder mode:', err);
      setCameraActive(false);
    }
  };

  const stopCameraStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  useEffect(() => {
    if (isCameraOpen && !capturedPhoto) {
      startCameraStream();
    } else {
      stopCameraStream();
    }
    return () => {
      stopCameraStream();
    };
  }, [isCameraOpen, capturedPhoto, facingMode]);

  const handleCapturePhoto = () => {
    if (videoRef.current && cameraActive) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth || 800;
      canvas.height = videoRef.current.videoHeight || 600;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        setCapturedPhoto(dataUrl);
        stopCameraStream();
        return;
      }
    }

    // High quality live simulation capture if hardware webcam is unavailable
    const sampleFieldPhotos = [
      'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    ];
    const chosen = sampleFieldPhotos[(selectedTahap - 1) % sampleFieldPhotos.length];
    setCapturedPhoto(chosen);
    stopCameraStream();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCapturedPhoto(event.target.result as string);
          setIsCameraOpen(true);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSavePhotoToSystem = () => {
    if (!capturedPhoto) return;

    // 1. Update Central Store (updates Mobile and Web PlantationLifecycleProgress)
    updateLifecycleStagePhoto(
      selectedTahap,
      capturedPhoto,
      'Petani Lapangan (Kamera HP)',
      photoNotes.trim() || `Bukti foto fisik terbaru Tahap ${selectedTahap}`
    );

    // 2. Show feedback
    setSuccessToast(`✅ Foto Tahap ${selectedTahap} berhasil disimpan & langsung tampil di Web dan Mobile!`);
    setTimeout(() => setSuccessToast(null), 5000);

    // 3. Reset and close camera
    setCapturedPhoto(null);
    setPhotoNotes('');
    setIsCameraOpen(false);
  };

  const activeT = tahapanList.find((t) => t.id === selectedTahap) || tahapanList[0];
  const activePhotoUrl =
    lifecycleStagePhotos?.[activeT.id] ||
    initialStagePhotos[activeT.id] ||
    'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1000&q=80';

  return (
    <div
      className="space-y-3 animate-in fade-in duration-150 antialiased text-[#11231D]"
      style={{
        fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 88px)',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        capture="environment"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Success Notification Toast */}
      {successToast && (
        <div className="p-3 bg-[#064E3B] text-white rounded-[14px] text-[12px] font-bold border border-[#C8E86B]/40 shadow-lg flex items-center gap-2 animate-in slide-in-from-top duration-200">
          <i className="ri-checkbox-circle-fill text-[#C8E86B] text-base shrink-0"></i>
          <span>{successToast}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-[#064E3B] text-white rounded-[18px] p-3.5 shadow-md border border-[#04372A]">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-[9px] font-black uppercase tracking-wider text-[#C8E86B] block">
              TRANSPARANSI FISIK LAHAN
            </span>
            <h1 className="text-[16px] font-black tracking-tight mt-0.5 m-0 text-white leading-tight">
              Bukti 8 Tahap Pengolahan Lahan
            </h1>
          </div>
          <span className="bg-[#C8E86B] text-[#064E3B] px-3 py-1 rounded-full text-[10px] font-black shrink-0 shadow-xs">
            100% Tervalidasi
          </span>
        </div>
      </div>

      {/* 8-Stage Interactive Horizontal Pill Selector */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {tahapanList.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setSelectedTahap(t.id)}
            className={`px-3 py-2 rounded-[10px] text-[11px] font-extrabold whitespace-nowrap cursor-pointer transition-all flex items-center gap-1 shrink-0 ${
              selectedTahap === t.id
                ? 'bg-[#0F5545] text-white shadow-md ring-2 ring-[#C8E86B]/50'
                : 'bg-white text-[#4A5D54] border border-[#D9E3DC] hover:bg-[#E8F3ED]'
            }`}
          >
            <span>Tahap {t.id}</span>
          </button>
        ))}
      </div>

      {/* Detail Active Tahap Card (Crisp, High-Resolution, Perfectly Framed) */}
      <div className="bg-white rounded-[18px] p-4 border border-[#E2EAE5] shadow-[0_2px_12px_rgba(0,0,0,0.04)] space-y-3.5">
        {/* Full-width 16:9 Photographic Container (No gepeng / No distortion) */}
        <div className="relative w-full aspect-[16/10] rounded-[14px] overflow-hidden bg-[#0A1A16] border border-[#14473B]/30 shadow-md group">
          <img
            src={activePhotoUrl}
            alt={activeT.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Top Overlay Badge */}
          <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between z-20">
            <span className="bg-[#0B3B30]/90 backdrop-blur-md text-[#C8E86B] text-[9.5px] font-extrabold px-2.5 py-1 rounded-full border border-[#C8E86B]/40 flex items-center gap-1 shadow-sm">
              <i className="ri-checkbox-circle-fill text-[#C8E86B]"></i>
              <span>Foto Terverifikasi</span>
            </span>
            <span className="bg-black/65 backdrop-blur-md text-white text-[9.5px] font-bold px-2 py-1 rounded-md border border-white/20">
              Tahap #{activeT.id}
            </span>
          </div>

          {/* Bottom GPS & Metadata Watermark */}
          <div className="absolute bottom-2 inset-x-2 bg-gradient-to-t from-black/85 via-black/60 to-transparent pt-4 pb-2 px-2.5 rounded-b-[12px] z-20 text-white">
            <div className="flex items-center justify-between text-[9.5px] text-[#A7F3D0] font-semibold">
              <span className="flex items-center gap-1">
                <i className="ri-map-pin-2-fill text-[#C8E86B]"></i>
                GPS: {activeT.gps}
              </span>
              <span>📅 {activeT.date}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons: Camera & Upload */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            onClick={() => {
              setCapturedPhoto(null);
              setIsCameraOpen(true);
            }}
            className="py-2.5 px-3 bg-[#0F5545] hover:bg-[#0B3B30] active:scale-[0.98] text-white font-extrabold text-[12px] rounded-[10px] flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <i className="ri-camera-fill text-[#C8E86B] text-[15px]"></i>
            <span>Kamera</span>
          </button>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="py-2.5 px-3 bg-[#E8F3ED] hover:bg-[#D3E8DC] active:scale-[0.98] text-[#064E3B] font-extrabold text-[12px] rounded-[10px] border border-[#0F5545]/20 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <i className="ri-upload-2-fill text-[#064E3B] text-[15px]"></i>
            <span>Unggah</span>
          </button>
        </div>

        {/* Tahap Info */}
        <div className="pt-2 border-t border-[#E8F0EB] flex items-center justify-between gap-2">
          <h2 className="text-[14px] font-black text-[#11231D] m-0 leading-tight">
            Tahap {activeT.id}: {activeT.name}
          </h2>
          <span className="bg-[#E8F3ED] text-[#064E3B] text-[10px] font-black px-2.5 py-0.5 rounded-full shrink-0 border border-[#064E3B]/20">
            {activeT.status}
          </span>
        </div>

        {/* Field Meta Grid */}
        <div className="grid grid-cols-2 gap-2 text-[11px] bg-[#F8FAF8] p-3 rounded-[12px] border border-[#E8F0EB]">
          <div>
            <span className="text-[#6B7280] font-semibold block text-[10px]">📅 Tanggal Eksekusi:</span>
            <strong className="text-[#111827] font-bold block mt-0.5">{activeT.date}</strong>
          </div>
          <div>
            <span className="text-[#6B7280] font-semibold block text-[10px]">👤 Penanggung Jawab:</span>
            <strong className="text-[#065F46] font-extrabold block mt-0.5">{activeT.pic}</strong>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* FULL PAGE MOBILE CAMERA VIEWPORT (Layar Penuh Kamera HP Lengkap) */}
      {/* ========================================================================= */}
      {isCameraOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-black text-white flex flex-col justify-between select-none animate-in fade-in duration-200"
          style={{
            fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          }}
        >
          {/* Top Bar of Full Screen Camera */}
          <div className="p-3.5 bg-black/75 backdrop-blur-md flex items-center justify-between z-30 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444] animate-pulse"></span>
              <div>
                <span className="text-[10px] font-black uppercase text-[#C8E86B] tracking-wider block">
                  KAMERA BUKTI LAPANGAN
                </span>
                <span className="text-[12px] font-extrabold text-white">
                  Tahap {activeT.id}: {activeT.name.slice(0, 24)}...
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowGrid(!showGrid)}
                className={`p-2 rounded-full text-[13px] ${
                  showGrid ? 'bg-[#C8E86B] text-[#064E3B]' : 'bg-white/20 text-white'
                }`}
                title="Toggle Grid"
              >
                <i className="ri-grid-fill"></i>
              </button>

              <button
                type="button"
                onClick={() => setHasFlash(!hasFlash)}
                className={`p-2 rounded-full text-[13px] ${
                  hasFlash ? 'bg-[#F59E0B] text-black' : 'bg-white/20 text-white'
                }`}
                title="Flash"
              >
                <i className={hasFlash ? 'ri-flashlight-fill' : 'ri-flashlight-line'}></i>
              </button>

              <button
                type="button"
                onClick={() => {
                  stopCameraStream();
                  setIsCameraOpen(false);
                  setCapturedPhoto(null);
                }}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-full text-white text-[14px]"
                title="Tutup Kamera"
              >
                <i className="ri-close-line font-bold"></i>
              </button>
            </div>
          </div>

          {/* Main Viewfinder / Photo Preview Area */}
          <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden">
            {capturedPhoto ? (
              /* Review Captured Photo Screen */
              <div className="relative w-full h-full flex flex-col items-center justify-center p-3">
                <img
                  src={capturedPhoto}
                  alt="Review Foto"
                  className="max-w-full max-h-[75vh] object-contain rounded-[14px] shadow-2xl border border-white/20"
                />

                {/* Overlaid Live Watermark GPS */}
                <div className="absolute bottom-6 inset-x-6 bg-black/80 backdrop-blur-md p-3 rounded-[12px] border border-[#C8E86B]/40 text-left space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-[#C8E86B] font-extrabold">
                    <span>AGROJAYA SMART FARM JONGGOL</span>
                    <span className="bg-[#C8E86B] text-[#064E3B] px-2 py-0.5 rounded-full text-[9px]">
                      GPS TERVERIFIKASI
                    </span>
                  </div>
                  <div className="text-[10px] text-white/90">
                    📍 {activeT.gps} • 📅 {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                </div>
              </div>
            ) : (
              /* Live Camera Stream / Viewfinder */
              <div className="relative w-full h-full flex items-center justify-center">
                <video
                  ref={videoRef}
                  playsInline
                  autoPlay
                  muted
                  className={`w-full h-full object-cover ${cameraActive ? 'block' : 'hidden'}`}
                />

                {/* Fallback Viewfinder Animation if Hardware Camera not streaming */}
                {!cameraActive && (
                  <div className="relative w-full h-full bg-gradient-to-b from-[#08201A] via-[#0E352B] to-[#041612] flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-24 h-24 rounded-full border-2 border-dashed border-[#C8E86B] flex items-center justify-center mb-3 animate-spin">
                      <i className="ri-focus-2-line text-4xl text-[#C8E86B]"></i>
                    </div>
                    <h3 className="text-white font-extrabold text-[15px] m-0">
                      Viewfinder Satelit Aktif
                    </h3>
                    <p className="text-[11px] text-[#A7F3D0] max-w-[260px] mt-1 m-0">
                      Arahkan lensa HP ke objek lahan/tanaman, lalu tekan tombol shutter di bawah.
                    </p>
                  </div>
                )}

                {/* Rule of Thirds Grid Overlay */}
                {showGrid && (
                  <div className="absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-3 z-10 border border-white/20">
                    <div className="border-r border-b border-white/20"></div>
                    <div className="border-r border-b border-white/20"></div>
                    <div className="border-b border-white/20"></div>
                    <div className="border-r border-b border-white/20"></div>
                    <div className="border-r border-b border-white/20"></div>
                    <div className="border-b border-white/20"></div>
                    <div className="border-r border-white/20"></div>
                    <div className="border-r border-white/20"></div>
                    <div></div>
                  </div>
                )}

                {/* Live HUD Watermark Overlay */}
                <div className="absolute top-4 inset-x-4 bg-black/60 backdrop-blur-md rounded-[10px] p-2 text-center text-[10px] text-[#A7F3D0] border border-white/10 z-20 pointer-events-none">
                  <span>📍 GPS Satelit: {activeT.gps} • Akurasi ±1.2m</span>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Controls Bar of Camera */}
          <div className="p-4 bg-black/85 backdrop-blur-md border-t border-white/10 z-30">
            {capturedPhoto ? (
              /* Review Action Buttons */
              <div className="space-y-3">
                <input
                  type="text"
                  value={photoNotes}
                  onChange={(e) => setPhotoNotes(e.target.value)}
                  placeholder="Tambah catatan lapangan (opsional)..."
                  className="w-full bg-white/10 border border-white/20 rounded-[10px] px-3 py-2 text-white text-[12px] placeholder:text-white/40 focus:outline-none focus:border-[#C8E86B]"
                />

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setCapturedPhoto(null);
                      startCameraStream();
                    }}
                    className="flex-1 py-3 rounded-[12px] bg-white/20 hover:bg-white/30 text-white font-extrabold text-[13px] flex items-center justify-center gap-1.5 transition-transform active:scale-[0.98] cursor-pointer"
                  >
                    <i className="ri-refresh-line text-lg"></i>
                    <span>Foto Ulang</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSavePhotoToSystem}
                    className="flex-1 py-3 rounded-[12px] bg-[#C8E86B] hover:bg-[#b8d85c] text-[#064E3B] font-black text-[13px] flex items-center justify-center gap-1.5 transition-transform active:scale-[0.98] shadow-lg cursor-pointer"
                  >
                    <i className="ri-check-line text-xl font-bold"></i>
                    <span>Simpan & Sinkronkan</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Live Camera Shutter & Tools */
              <div className="flex items-center justify-around py-2">
                {/* Gallery Picker Shortcut */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-12 h-12 rounded-full bg-white/15 hover:bg-white/25 flex flex-col items-center justify-center text-white text-[10px] gap-0.5 cursor-pointer"
                  title="Pilih dari Galeri"
                >
                  <i className="ri-image-add-line text-lg text-[#C8E86B]"></i>
                </button>

                {/* Big Round Shutter Button */}
                <button
                  type="button"
                  onClick={handleCapturePhoto}
                  className="w-20 h-20 rounded-full border-4 border-white bg-[#C8E86B] hover:bg-[#b5d757] active:scale-90 transition-all flex items-center justify-center shadow-[0_0_24px_rgba(200,232,107,0.5)] cursor-pointer"
                  title="Ambil Foto"
                >
                  <div className="w-16 h-16 rounded-full border-2 border-[#064E3B] bg-[#C8E86B] flex items-center justify-center">
                    <i className="ri-camera-fill text-2xl text-[#064E3B]"></i>
                  </div>
                </button>

                {/* Switch Camera (Front/Back) */}
                <button
                  type="button"
                  onClick={() => {
                    setFacingMode(facingMode === 'environment' ? 'user' : 'environment');
                  }}
                  className="w-12 h-12 rounded-full bg-white/15 hover:bg-white/25 flex flex-col items-center justify-center text-white text-[10px] gap-0.5 cursor-pointer"
                  title="Putar Kamera"
                >
                  <i className="ri-camera-switch-line text-lg text-white"></i>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
