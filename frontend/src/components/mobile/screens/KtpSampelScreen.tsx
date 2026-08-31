import React, { useState } from 'react';
import { DynamicQRCode } from '../../common/DynamicQRCode';
import { useSmartFarmStore, type TreeSample, type TreeLog } from '../../../store/smartFarmStore';

interface KtpSampelScreenProps {
  onBack?: () => void;
}

export const KtpSampelScreen: React.FC<KtpSampelScreenProps> = () => {
  const { treeSamples, addTreeLog } = useSmartFarmStore();

  const [selectedTreeCode, setSelectedTreeCode] = useState<string>(treeSamples[0]?.code || 'SAMPLE-TR-A2-0841');
  const [ktpSubTab, setKtpSubTab] = useState<'kpi' | 'growth' | 'logs' | 'add_log'>('kpi');
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  // Form State for Field Maintenance Log
  const [actionCategory, setActionCategory] = useState<'PENYIRAMAN' | 'PEMUPUKAN' | 'PRUNING' | 'HAMA'>('PEMUPUKAN');
  const [actionDetail, setActionDetail] = useState('Nutrisi AB Mix Khusus (EC 2.2, pH 6.2) 2.0L / pohon');
  const [workerName, setWorkerName] = useState('Kang Asep (Regu A)');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const activeTree: TreeSample =
    treeSamples.find((t) => t.code === selectedTreeCode || t.id === selectedTreeCode) || treeSamples[0];

  const handleSaveLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTree) return;

    const timeStr = `Hari Ini ${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`;
    const newLog: TreeLog = {
      id: `LOG-${Date.now()}`,
      time: timeStr,
      action: actionCategory,
      detail: actionDetail,
      pic: workerName,
    };

    addTreeLog(activeTree.code, newLog);
    setSuccessMsg(`✅ Berhasil mencatat "${actionCategory}" untuk ajir ${activeTree.code}.`);
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
      className="space-y-3.5 animate-in fade-in duration-150 antialiased text-[#11231D]"
      style={{
        fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 88px)',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {/* Header Banner */}
      <div className="bg-[#0B3B30] text-white rounded-[18px] p-4 shadow-md border border-[#14473B] flex items-center justify-between">
        <div>
          <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#C8E86B]">
            DOKUMEN PASPOR DIGITAL TANAMAN
          </span>
          <h1 className="text-[17px] font-black tracking-tight mt-0.5 m-0 text-white">
            KTP Pohon & Ajir Sampel
          </h1>
        </div>
        <div className="bg-[#C8E86B] text-[#08201A] text-[9.5px] font-black px-2.5 py-1 rounded-full shadow-xs">
          {treeSamples.length} Ajir Terdaftar
        </div>
      </div>

      {/* Main Passport Card */}
      {activeTree && (
        <div className="space-y-3">
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
                <h2 className="text-[16px] font-black text-white m-0 leading-tight">
                  {activeTree.variety}
                </h2>
                <span className="text-[10.5px] font-mono text-[#C8E86B] font-bold block mt-0.5">
                  {activeTree.code}
                </span>
                <span className="text-[9.5px] text-[#A7F3D0] block mt-0.5">
                  {activeTree.block} • {activeTree.locationDetail}
                </span>
              </div>

              {/* QR Code Card Thumbnail (Click to open Full Modal) */}
              <button
                type="button"
                onClick={() => setIsQrModalOpen(true)}
                className="bg-white p-1.5 rounded-[12px] shadow-lg shrink-0 border border-white/50 text-center hover:scale-105 transition-transform cursor-pointer"
                title="Perbesar QR Code Penuh"
              >
                <DynamicQRCode value={activeTree.code} size={58} />
                <span className="text-[8px] font-mono font-black text-black block mt-0.5 flex items-center justify-center gap-0.5">
                  <i className="ri-zoom-in-line text-[9px]"></i> PERBESAR
                </span>
              </button>
            </div>

            {/* 4 Key KPI Tiles */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white/10 backdrop-blur-xs p-2.5 rounded-[12px] border border-white/20">
                <span className="text-[10px] text-[#C8E86B] font-bold block">📅 Umur & Fase:</span>
                <strong className="text-[13px] font-black text-white block mt-0.5">
                  {activeTree.ageHst}
                </strong>
                <span className="text-[9.5px] text-[#E2E8F0] block truncate mt-0.5 font-medium">
                  {activeTree.phase}
                </span>
              </div>

              <div className="bg-white/10 backdrop-blur-xs p-2.5 rounded-[12px] border border-white/20">
                <span className="text-[10px] text-[#C8E86B] font-bold block">📏 Ukuran & Bobot:</span>
                <strong className="text-[13px] font-black text-white block mt-0.5">
                  {activeTree.estWeight}
                </strong>
                <span className="text-[9.5px] text-[#E2E8F0] block truncate mt-0.5 font-medium">
                  Tinggi: {activeTree.growthStory[activeTree.growthStory.length - 1]?.height || 'Optimal'}
                </span>
              </div>

              <div className="bg-white/10 backdrop-blur-xs p-2.5 rounded-[12px] border border-white/20">
                <span className="text-[10px] text-[#C8E86B] font-bold block">🍯 Target Mutu / Brix:</span>
                <strong className="text-[13px] font-black text-white block mt-0.5">
                  {activeTree.targetBrix}
                </strong>
                <span className="text-[9.5px] text-[#E2E8F0] block truncate mt-0.5 font-medium">
                  Standar Ekspor Grade A
                </span>
              </div>

              <div className="bg-white/10 backdrop-blur-xs p-2.5 rounded-[12px] border border-white/20">
                <span className="text-[10px] text-[#C8E86B] font-bold block">🩺 Skor Kesehatan:</span>
                <strong className="text-[13px] font-black text-[#A7F3D0] block mt-0.5">
                  {activeTree.healthScore}
                </strong>
                <span className="text-[9.5px] text-[#E2E8F0] block truncate mt-0.5 font-medium">
                  PJ: {activeTree.farmer}
                </span>
              </div>
            </div>

            {/* Sub-Tabs Selector with High-Contrast Bright Buttons */}
            <div className="flex gap-1.5 bg-black/40 p-1.5 rounded-[14px] border border-white/20">
              {[
                { id: 'kpi', label: 'Metrik KPI', icon: 'ri-dashboard-line' },
                { id: 'growth', label: 'Tumbuh', icon: 'ri-plant-line' },
                { id: 'logs', label: `Log (${activeTree.recentLogs.length})`, icon: 'ri-file-list-3-line' },
                { id: 'add_log', label: '+ Catat', icon: 'ri-add-circle-line' },
              ].map((st) => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => setKtpSubTab(st.id as any)}
                  className={`flex-1 py-2 rounded-[10px] text-[10.5px] font-black transition-all flex items-center justify-center gap-1 cursor-pointer ${
                    ktpSubTab === st.id
                      ? 'bg-[#C8E86B] text-[#061E18] shadow-md ring-1 ring-white/60'
                      : 'bg-white/15 hover:bg-white/25 text-white'
                  }`}
                >
                  <i className={`${st.icon} text-[12px]`}></i>
                  <span>{st.label}</span>
                </button>
              ))}
            </div>

            {/* Sub-Tab 1: Growth Timeline */}
            {ktpSubTab === 'growth' && (
              <div className="bg-white p-3.5 rounded-[18px] text-[#11231D] space-y-2.5">
                <span className="text-[10px] font-black uppercase text-[#0F5545] tracking-wider block">
                  TIMELINE FASE PERTUMBUHAN AJIR
                </span>
                <div className="space-y-2">
                  {activeTree.growthStory.map((g, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded-[10px] bg-[#F8FAF8] border border-[#E8F0EB] text-[11px]">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#0F5545] text-white text-[9px] font-black flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <div>
                          <strong className="text-[#11231D] block leading-tight">{g.stage}</strong>
                          <span className="text-[9.5px] text-[#5F6A65]">{g.date} • Tinggi: {g.height}</span>
                        </div>
                      </div>
                      <span className="bg-[#E8F3ED] text-[#064E3B] text-[9.5px] font-bold px-2 py-0.5 rounded-full">
                        {g.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sub-Tab 2: Maintenance Logs */}
            {ktpSubTab === 'logs' && (
              <div className="bg-white p-3.5 rounded-[18px] text-[#11231D] space-y-2.5">
                <span className="text-[10px] font-black uppercase text-[#0F5545] tracking-wider block">
                  RIWAYAT TINDAKAN & PERAWATAN TERAKHIR
                </span>
                <div className="space-y-2">
                  {activeTree.recentLogs.map((log) => (
                    <div key={log.id} className="p-2.5 rounded-[12px] bg-[#F8FAF8] border border-[#E8F0EB] text-[11px] space-y-1">
                      <div className="flex justify-between items-center text-[10px]">
                        <strong className="text-[#0F5545] font-black">{log.action}</strong>
                        <span className="text-[#5F6A65]">{log.time}</span>
                      </div>
                      <p className="text-[#374151] m-0 leading-relaxed font-medium">{log.detail}</p>
                      <span className="text-[9.5px] text-[#6B7280] block">Petugas: {log.pic}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sub-Tab 3: Add Maintenance Action */}
            {ktpSubTab === 'add_log' && (
              <form onSubmit={handleSaveLog} className="bg-white p-4 rounded-[18px] text-[#11231D] space-y-3">
                <span className="text-[10.5px] font-black uppercase text-[#0F5545] tracking-wider block">
                  CATAT PERAWATAN BARU PADA AJIR INI
                </span>

                {successMsg && (
                  <div className="p-2.5 bg-[#E8F8EE] text-[#0F5545] rounded-[10px] text-[11px] font-bold border border-[#0F5545]/20">
                    {successMsg}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-1.5">
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
                      className={`py-2 rounded-[10px] font-extrabold text-[10px] border cursor-pointer ${
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
                  <label className="text-[9.5px] font-bold text-[#5F6A65] block mb-1">
                    Detail Tindakan & Dosis:
                  </label>
                  <textarea
                    rows={2}
                    value={actionDetail}
                    onChange={(e) => setActionDetail(e.target.value)}
                    className="w-full p-2.5 rounded-[10px] border border-[#DDE5DF] text-[11.5px] outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="text-[9.5px] font-bold text-[#5F6A65] block mb-1">
                    Petugas / Mandor:
                  </label>
                  <input
                    type="text"
                    value={workerName}
                    onChange={(e) => setWorkerName(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-[10px] border border-[#DDE5DF] text-[11px] outline-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#0F5545] hover:bg-[#0B3B30] text-white font-black text-[12px] rounded-[10px] cursor-pointer shadow-md"
                >
                  Simpan Log Tindakan Pohon Ini
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* List of Sample Trees (Selector) */}
      <div className="space-y-2 pt-1">
        <div className="flex justify-between items-center px-1">
          <span className="text-[11px] font-black uppercase tracking-wider text-[#0F5545]">
            PILIH AJIR SAMPEL PERKEBUNAN:
          </span>
          <span className="text-[9.5px] font-bold text-[#5F6A65] bg-white px-2 py-0.5 rounded-full border border-[#DDE5DF]">
            {treeSamples.length} Pohon Aktif
          </span>
        </div>

        <div className="space-y-2">
          {treeSamples.map((tree) => {
            const isCurrent = activeTree?.code === tree.code;
            return (
              <div
                key={tree.id}
                onClick={() => {
                  setSelectedTreeCode(tree.code);
                  setKtpSubTab('kpi');
                }}
                className={`p-3 rounded-[16px] border transition-all cursor-pointer flex items-center justify-between gap-3 shadow-xs active:scale-[0.99] ${
                  isCurrent
                    ? 'bg-gradient-to-r from-[#F0FDF4] to-[#E8F8EE] border-[#0F5545] ring-2 ring-[#0F5545]/20 shadow-sm'
                    : 'bg-white border-[#E2EAE5] hover:border-[#0F5545]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-10 h-10 rounded-[12px] bg-[#E8F1EA] text-[#0F5545] border border-[#0F5545]/15 flex items-center justify-center text-2xl shrink-0 shadow-2xs">
                    {getCommodityEmoji(tree.variety)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <strong className="text-[12.5px] font-black text-[#11231D] truncate leading-tight">
                        {tree.variety}
                      </strong>
                    </div>
                    <span className="text-[10px] font-mono text-[#0F5545] font-bold block truncate mt-0.5">
                      {tree.code} • <span className="text-[#5F6A65] font-sans">{tree.locationDetail}</span>
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0 flex flex-col items-end gap-1">
                  <span className="text-[9.5px] font-extrabold px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[#166534] border border-[#166534]/15">
                    {tree.healthScore.split(' ')[0]} Sehat
                  </span>
                  <span className={`text-[10.5px] font-extrabold flex items-center gap-0.5 ${isCurrent ? 'text-[#0F5545]' : 'text-[#6A7B73]'}`}>
                    {isCurrent ? '✓ Sedang Dibuka' : 'Buka KTP →'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FULL UNCOMPRESSED QR PASSPORT MODAL (Resolusi Penuh Tanpa Kompresi) */}
      {isQrModalOpen && activeTree && (
        <div className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 select-none animate-in fade-in duration-200">
          <div className="bg-white rounded-[26px] p-5 max-w-sm w-full shadow-2xl border border-white/20 text-center space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <div className="text-left">
                <span className="text-[9.5px] font-black tracking-wider uppercase text-[#0F5545]">
                  PASPOR DIGITAL POHON RESMI
                </span>
                <h3 className="text-[14px] font-black text-[#11231D] m-0">
                  {activeTree.variety}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsQrModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center text-sm font-bold cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Uncompressed High-Definition QR Code */}
            <div className="p-3 bg-white rounded-[18px] border-2 border-[#0F5545] shadow-inner inline-block">
              <DynamicQRCode value={activeTree.code} size={220} />
            </div>

            <div className="space-y-1 bg-[#F8FAF8] p-3 rounded-[14px] border border-[#E2EAE5] text-left text-[11px]">
              <div className="flex justify-between">
                <span className="text-[#5F6A65]">Kode Ajir:</span>
                <strong className="font-mono text-[#0F5545]">{activeTree.code}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5F6A65]">Lokasi Kebun:</span>
                <strong className="text-[#11231D]">{activeTree.block}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5F6A65]">Sertifikat GAP:</span>
                <strong className="font-mono text-[#11231D]">{activeTree.certNo}</strong>
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  alert(`✅ QR Code untuk ${activeTree.code} siap dicetak.`);
                  setIsQrModalOpen(false);
                }}
                className="flex-1 py-2.5 rounded-[12px] bg-[#0F5545] hover:bg-[#0B3B30] text-white font-black text-[12px] flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
              >
                <i className="ri-printer-line text-base"></i>
                <span>Cetak QR Ajir</span>
              </button>
              <button
                type="button"
                onClick={() => setIsQrModalOpen(false)}
                className="px-4 py-2.5 rounded-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-[12px] cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
