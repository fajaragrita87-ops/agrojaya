import React, { useState, useRef, useEffect } from 'react';
import { DynamicQRCode } from '../../common/DynamicQRCode';
import { useSmartFarmStore, type TreeSample, type TreeLog } from '../../../store/smartFarmStore';

interface KtpSampelScreenProps {
  onBack?: () => void;
}

export const KtpSampelScreen: React.FC<KtpSampelScreenProps> = ({ onBack }) => {
  const { treeSamples, addTreeLog } = useSmartFarmStore();

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [selectedTree, setSelectedTree] = useState<TreeSample | null>(null);
  const [activeTab, setActiveTab] = useState<'ktp' | 'input_log' | 'riwayat'>('ktp');

  // Form State for Field Maintenance Log
  const [actionCategory, setActionCategory] = useState('PEMUPUKAN');
  const [actionDetail, setActionDetail] = useState('Semprot Pupuk Mikro MgSO4 & Boron (2 gr/L)');
  const [workerName, setWorkerName] = useState('Kang Asep (Regu A)');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

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
    return () => {
      stopCamera();
    };
  }, []);

  const handleScanSample = (sample: TreeSample) => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      stopCamera();
      setSelectedTree(sample);
      setActiveTab('ktp');
    }, 500);
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
    setSuccessMsg(`✅ Berhasil mencatat "${actionCategory}" untuk pohon ${selectedTree.code}.`);
    setTimeout(() => setSuccessMsg(null), 3500);
    setActiveTab('riwayat');
  };

  return (
    <div
      className="space-y-3 pb-6 animate-in fade-in duration-150 antialiased text-[#11231D]"
      style={{ fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      {/* Hidden File Input for Native Camera QR capture */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={() => handleScanSample(treeSamples[0])}
      />

      {/* Back Button */}
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-[11.5px] font-bold text-[#0F5545] hover:text-[#0B3B30] cursor-pointer"
        >
          <i className="ri-arrow-left-line text-sm"></i>
          <span>Kembali ke Menu Utama</span>
        </button>
      )}

      {/* Header Info */}
      <div className="bg-gradient-to-r from-[#064E3B] via-[#047857] to-[#065F46] rounded-[20px] p-4 text-white shadow-md border border-white/15 relative overflow-hidden">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[9px] font-black uppercase tracking-wider text-[#C8E86B] block">
              SCANNER LAPANGAN & KTP PASPOR DIGITAL
            </span>
            <h1 className="text-[15.5px] font-black tracking-tight mt-0.5 m-0 text-white leading-tight">
              Pindai QR Barcode Ajir Pohon
            </h1>
            <p className="text-[10px] text-[#A7F3D0] m-0 mt-0.5">
              Pindai ajir di bedengan untuk membuka KTP identitas dan mencatat perawatan harian
            </p>
          </div>
          <span className="bg-[#C8E86B] text-[#064E3B] px-2.5 py-0.5 rounded-full text-[9px] font-black shrink-0 shadow-xs">
            IoT Live Sync
          </span>
        </div>
      </div>

      {/* Scanner Viewfinder Box */}
      <div className="relative h-56 rounded-[20px] bg-black border border-[#14473B] flex flex-col items-center justify-center text-white overflow-hidden shadow-lg p-3 text-center">
        {/* Live Video */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`absolute inset-0 w-full h-full object-cover ${isCameraActive ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* Laser Viewfinder Animation */}
        <div className="absolute inset-x-8 top-6 bottom-6 border-2 border-dashed border-[#C8E86B] rounded-[16px] flex items-center justify-center pointer-events-none z-10">
          {isScanning ? (
            <div className="w-full h-0.5 bg-[#C8E86B] shadow-[0_0_16px_#C8E86B] animate-pulse"></div>
          ) : (
            <span className="text-[9.5px] text-[#C8E86B] font-black bg-black/60 px-2 py-0.5 rounded-full backdrop-blur-xs">
              Area Scan Barcode QR
            </span>
          )}
        </div>

        {!isCameraActive && (
          <div className="relative z-10 flex flex-col items-center px-4">
            <div className="w-11 h-11 rounded-full bg-white/10 border border-[#C8E86B]/40 flex items-center justify-center mb-1 text-[#C8E86B] text-xl">
              <i className="ri-qr-code-line"></i>
            </div>
            <strong className="text-[12px] text-white">Arahkan Kamera ke Ajir Bedengan</strong>
            <span className="text-[9px] text-[#A7F3D0] max-w-[240px] mt-0.5">
              Tekan tombol kamera untuk memindai plat QR fisik yang tertempel di tiang ajir
            </span>
            <div className="flex gap-2 mt-2.5">
              <button
                type="button"
                onClick={startCamera}
                className="px-3.5 py-1.5 bg-white/15 hover:bg-white/25 rounded-full text-[10px] font-bold text-white border border-white/20 cursor-pointer shadow-xs"
              >
                📷 Buka Kamera Live
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3.5 py-1.5 bg-[#C8E86B] hover:bg-[#b8d85c] rounded-full text-[10px] font-black text-[#061E18] cursor-pointer shadow-xs"
              >
                📸 Ambil Foto QR
              </button>
            </div>
          </div>
        )}

        {isCameraActive && (
          <div className="absolute bottom-2.5 inset-x-4 z-20 flex justify-center">
            <button
              type="button"
              onClick={() => handleScanSample(treeSamples[0])}
              className="px-4 py-1.5 rounded-full bg-[#C8E86B] text-[#061E18] text-[11px] font-black shadow-lg cursor-pointer flex items-center gap-1.5 active:scale-95 transition-transform"
            >
              <i className="ri-qr-scan-line text-sm"></i>
              <span>Pindai Barcode Sekarang</span>
            </button>
          </div>
        )}
      </div>

      {/* Quick Select Detected Ajir Pins */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center px-0.5">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#0F5545]">
            AJIR SAMPEL TERDETEKSI DI LAHAN:
          </span>
          <span className="text-[9px] font-bold text-[#6A7B73]">
            {treeSamples.length} Pohon Aktif
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {treeSamples.map((tree) => (
            <button
              key={tree.id}
              type="button"
              onClick={() => handleScanSample(tree)}
              className="p-2.5 rounded-[14px] bg-white border border-[#D9E3DC] shadow-xs text-left cursor-pointer hover:border-[#0F5545] transition-all flex items-center gap-2 hover:bg-[#F8FAF8]"
            >
              <div className="w-10 h-10 rounded-[10px] bg-[#E8F3ED] border border-[#C6E2D2] flex items-center justify-center text-xl shrink-0">
                {tree.icon}
              </div>
              <div className="min-w-0 flex-1">
                <strong className="text-[11px] font-black text-[#11231D] block truncate leading-tight">
                  {tree.name}
                </strong>
                <span className="text-[8.5px] font-mono text-[#0F5545] font-bold block truncate mt-0.5">
                  {tree.code}
                </span>
                <span className="text-[8px] text-[#6A7B73] block truncate">
                  {tree.locationDetail}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ==================== POP-UP MODAL KTP PASPOR DIGITAL ==================== */}
      {selectedTree && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex flex-col justify-end p-0 animate-in fade-in duration-150">
          <div className="bg-[#FAFBF8] w-full rounded-t-[26px] max-h-[92%] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-200 border-t border-[#C8E86B]/30">
            {/* Header Modal */}
            <div className="p-3.5 bg-gradient-to-r from-[#061E18] via-[#0A382E] to-[#0F4E40] text-white flex items-center justify-between shadow-xs flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-[8px] bg-[#C8E86B] text-[#061E18] flex items-center justify-center font-black text-sm">
                  <i className="ri-shield-check-fill"></i>
                </div>
                <div>
                  <span className="text-[8px] font-black uppercase tracking-widest text-[#C8E86B] block">
                    PASPOR DIGITAL TERVERIFIKASI
                  </span>
                  <strong className="text-[12.5px] text-white block leading-tight">
                    {selectedTree.name} ({selectedTree.variety})
                  </strong>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTree(null)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold text-base transition-colors cursor-pointer"
              >
                &times;
              </button>
            </div>

            {/* Sub Tabs Inside Passport Modal */}
            <div className="flex border-b border-[#E2EAE5] bg-white px-3 pt-2 gap-2 flex-shrink-0">
              <button
                type="button"
                onClick={() => setActiveTab('ktp')}
                className={`pb-2 text-[11px] font-black cursor-pointer border-b-2 transition-all ${
                  activeTab === 'ktp'
                    ? 'border-[#0F5545] text-[#0F5545]'
                    : 'border-transparent text-[#6A7B73] hover:text-[#0F5545]'
                }`}
              >
                💳 KTP Pintar
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('input_log')}
                className={`pb-2 text-[11px] font-black cursor-pointer border-b-2 transition-all ${
                  activeTab === 'input_log'
                    ? 'border-[#0F5545] text-[#0F5545]'
                    : 'border-transparent text-[#6A7B73] hover:text-[#0F5545]'
                }`}
              >
                📝 Catat Perawatan HST
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('riwayat')}
                className={`pb-2 text-[11px] font-black cursor-pointer border-b-2 transition-all ${
                  activeTab === 'riwayat'
                    ? 'border-[#0F5545] text-[#0F5545]'
                    : 'border-transparent text-[#6A7B73] hover:text-[#0F5545]'
                }`}
              >
                📜 Riwayat Rawat ({selectedTree.recentLogs?.length || 0})
              </button>
            </div>

            {/* Scrollable Modal Body */}
            <div className="p-3.5 overflow-y-auto space-y-3 flex-1 text-[#11231D]">
              {successMsg && (
                <div className="p-2.5 bg-[#E8F1EA] text-[#0F5545] rounded-[10px] text-[11px] font-bold border border-[#0F5545]/20 animate-in fade-in">
                  {successMsg}
                </div>
              )}

              {/* TAB 1: KARTU TANDA POHON PASPOR */}
              {activeTab === 'ktp' && (
                <div className="space-y-3">
                  <div
                    className="rounded-[22px] p-4 text-white shadow-xl relative overflow-hidden space-y-3 border border-white/20"
                    style={{
                      background: 'linear-gradient(145deg, #072B22 0%, #0B4436 45%, #05221B 100%)',
                    }}
                  >
                    <div className="flex justify-between items-start border-b border-white/15 pb-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-[8px] bg-[#C8E86B] text-[#08201A] flex items-center justify-center font-black text-base shadow-xs">
                          <i className="ri-shield-check-fill"></i>
                        </div>
                        <div>
                          <span className="text-[8px] font-black uppercase tracking-widest text-[#C8E86B] block">
                            REPUBLIK INDONESIA • SMART FARM ERP
                          </span>
                          <h2 className="text-[13px] font-black tracking-tight m-0 text-white leading-tight">
                            KARTU IDENTITAS POHON SAMPEL
                          </h2>
                          <span className="text-[8.5px] text-[#A7F3D0] font-mono font-semibold block mt-0.5">
                            Kode Ajir: <strong className="text-white">{selectedTree.code}</strong>
                          </span>
                        </div>
                      </div>
                      <span className="text-[8.5px] font-black px-2 py-0.5 rounded-full bg-[#C8E86B] text-[#08201A] uppercase">
                        TERVERIFIKASI
                      </span>
                    </div>

                    <div className="grid grid-cols-12 gap-3 items-center">
                      <div className="col-span-4 bg-white p-2 rounded-[14px] shadow-md flex flex-col items-center justify-center border border-white/30 shrink-0">
                        <DynamicQRCode value={`https://agrojaya.id/tree/${selectedTree.code}`} size={76} />
                        <span className="text-[8px] font-black text-[#08201A] mt-1 text-center leading-none">
                          PIN AJIR #{selectedTree.locationDetail.split('#')[1]?.split(' ')[0] || '17'}
                        </span>
                      </div>

                      <div className="col-span-8 space-y-1 text-[10.5px]">
                        <div>
                          <span className="text-[#C8E86B] font-extrabold text-[8.5px] block uppercase">
                            Varietas Komoditas:
                          </span>
                          <strong className="text-[12.5px] font-black text-white block leading-snug">
                            {selectedTree.variety}
                          </strong>
                        </div>
                        <div className="grid grid-cols-2 gap-1 pt-0.5">
                          <div>
                            <span className="text-[#A7F3D0] text-[8px] block">📍 Lokasi Blok:</span>
                            <span className="text-white font-bold text-[10px] block">{selectedTree.block}</span>
                          </div>
                          <div>
                            <span className="text-[#A7F3D0] text-[8px] block">⏳ Umur Tanaman:</span>
                            <span className="text-[#C8E86B] font-extrabold text-[10px] block">{selectedTree.ageHst}</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-1 pt-0.5">
                          <div>
                            <span className="text-[#A7F3D0] text-[8px] block">👨‍🌾 Petani Binaan:</span>
                            <span className="text-white font-bold text-[9.5px] block">{selectedTree.farmer}</span>
                          </div>
                          <div>
                            <span className="text-[#A7F3D0] text-[8px] block">🛰️ GPS Ajir:</span>
                            <span className="text-white font-mono text-[8.5px] block">{selectedTree.gpsCoords}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 3 Telemetry Metrics */}
                    <div className="grid grid-cols-3 gap-2 pt-1 border-t border-white/15">
                      <div className="bg-white/10 backdrop-blur-xs rounded-[10px] p-2 text-center border border-white/10">
                        <span className="text-[8px] text-[#A7F3D0] font-semibold block">Skor Sehat</span>
                        <strong className="text-[12px] text-[#C8E86B] font-black block mt-0.5">{selectedTree.healthScore}</strong>
                      </div>
                      <div className="bg-white/10 backdrop-blur-xs rounded-[10px] p-2 text-center border border-white/10">
                        <span className="text-[8px] text-[#A7F3D0] font-semibold block">Taksasi Brix</span>
                        <strong className="text-[12px] text-[#C8E86B] font-black block mt-0.5">{selectedTree.targetBrix}</strong>
                      </div>
                      <div className="bg-white/10 backdrop-blur-xs rounded-[10px] p-2 text-center border border-white/10">
                        <span className="text-[8px] text-[#A7F3D0] font-semibold block">Est. Bobot</span>
                        <strong className="text-[12px] text-[#C8E86B] font-black block mt-0.5">{selectedTree.estWeight}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Button Action to input log */}
                  <button
                    type="button"
                    onClick={() => setActiveTab('input_log')}
                    className="w-full py-2.5 bg-[#0F5545] hover:bg-[#0B3B30] text-white font-black text-[11.5px] rounded-[12px] shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <i className="ri-edit-line"></i>
                    <span>Catat Tindakan Perawatan Baru untuk Ajir Ini</span>
                  </button>
                </div>
              )}

              {/* TAB 2: INPUT LOG PERAWATAN */}
              {activeTab === 'input_log' && (
                <form onSubmit={handleSaveLog} className="space-y-3 bg-white p-3.5 rounded-[16px] border border-[#D9E3DC] shadow-xs">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#0F5545] block">
                    FORM INPUT TINDAKAN PERAWATAN (HST):
                  </span>

                  <div>
                    <label className="text-[10.5px] font-bold text-[#11231D] block mb-1">
                      Kategori Tindakan:
                    </label>
                    <select
                      value={actionCategory}
                      onChange={(e) => setActionCategory(e.target.value)}
                      className="w-full bg-[#F8FAF8] border border-[#D9E3DC] rounded-[8px] px-2.5 py-1.5 text-[11px] font-bold text-[#0F5545] outline-none"
                    >
                      <option value="PENYIRAMAN">💧 Penyiraman Drip & Fertigasi AB Mix</option>
                      <option value="PEMUPUKAN">🌱 Aplikasi Pupuk Mikro MgSO4 + Boron</option>
                      <option value="PRUNING">✂️ Pewiwitan Tunas Air & Pruning</option>
                      <option value="UJI_BRIX">🍯 Uji Refraktometer Brix Buah</option>
                      <option value="PENGENDALIAN_HAMA">🛡️ Aplikasi Agen Hayati Trichoderma</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10.5px] font-bold text-[#11231D] block mb-1">
                      Detail Tindakan / Dosis Bahan:
                    </label>
                    <input
                      type="text"
                      value={actionDetail}
                      onChange={(e) => setActionDetail(e.target.value)}
                      placeholder="Contoh: Dosis 2 gr/L, disiram jam 07:15..."
                      className="w-full bg-[#F8FAF8] border border-[#D9E3DC] rounded-[8px] px-2.5 py-1.5 text-[11px] text-[#11231D] outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10.5px] font-bold text-[#11231D] block mb-1">
                      Petani / Mandor Eksekutor:
                    </label>
                    <input
                      type="text"
                      value={workerName}
                      onChange={(e) => setWorkerName(e.target.value)}
                      className="w-full bg-[#F8FAF8] border border-[#D9E3DC] rounded-[8px] px-2.5 py-1.5 text-[11px] text-[#11231D] outline-none font-semibold"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 bg-[#C8E86B] hover:bg-[#b8d85c] text-[#061E18] font-black text-[11.5px] rounded-[10px] cursor-pointer shadow-xs flex items-center justify-center gap-1 mt-2"
                  >
                    <i className="ri-save-line"></i>
                    <span>Simpan Log & Perbarui QR Code Real-Time</span>
                  </button>
                </form>
              )}

              {/* TAB 3: RIWAYAT RAWAT */}
              {activeTab === 'riwayat' && (
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#0F5545] block">
                    TIMELINE PERAWATAN TERVALIDASI:
                  </span>
                  <div className="space-y-1.5">
                    {selectedTree.recentLogs?.map((log, idx) => (
                      <div
                        key={log.id || idx}
                        className="p-2.5 bg-white rounded-[12px] border border-[#D9E3DC] shadow-2xs space-y-1"
                      >
                        <div className="flex justify-between items-center text-[10px]">
                          <span className="bg-[#E8F3ED] text-[#0F5545] font-black px-2 py-0.5 rounded-full">
                            {log.action}
                          </span>
                          <span className="text-[#6A7B73] font-medium">{log.time}</span>
                        </div>
                        <p className="text-[11px] text-[#11231D] font-bold m-0 leading-tight">
                          {log.detail}
                        </p>
                        <span className="text-[9.5px] text-[#0F5545] font-semibold block">
                          Eksekutor: {log.pic}
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
    </div>
  );
};
