import React, { useState } from 'react';
import { DynamicQRCode } from '../components/common/DynamicQRCode';
import { useRole } from '../context/RoleContext';

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

export interface TreeData {
  id: string;
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
  status: 'OPTIMAL' | 'NEED_FERTILIZER' | 'PEST_ALERT' | 'READY_HARVEST';
  gapCertificateNo: string;
  growthStory: GrowthStage[];
  maintenanceLogs: MaintenanceLog[];
}

export const TreePassportPage: React.FC = () => {
  const { role } = useRole();
  const isExecutiveOrInvestor = role === 'DIREKTUR' || role === 'INVESTOR';

  const [trees, setTrees] = useState<TreeData[]>([
    {
      id: 'TR-001',
      code: 'SAMPLE-TR-A2-0841',
      variety: 'Melon Golden Apollo F1',
      block: 'Blok A2 (Sentra Kebun Inti)',
      rowAjir: 'Baris 4 • Ajir #17 (Pohon Sampel #1)',
      plantingDate: '2026-07-15',
      ageDays: 43,
      phase: 'Fase 4: Pembesaran Buah',
      farmer: 'Kang Asep (Regu A)',
      mandor: 'Pak Joko',
      lastTreatment: 'Pupuk Drip NPK 16-16-16 (25 Agu)',
      healthScore: 98.4,
      targetBrix: 'Brix 14° – 16°',
      estYieldKg: 2.4,
      gpsCoords: '-6.46972, 107.05831',
      status: 'OPTIMAL',
      gapCertificateNo: 'GAP-EXP-2026-0982 (0% Residu Kimia)',
      growthStory: [
        { stage: '1. Tanam Bibit', day: 1, date: '15 Jul 2026', heightCm: 12, note: 'Bibit F1 ditanam di bedengan dengan mulsa perak.', icon: 'ri-seedling-line' },
        { stage: '2. Fase Vegetatif', day: 20, date: '04 Agu 2026', heightCm: 65, note: 'Batang merambat ajir, daun hijau tua pekat.', icon: 'ri-plant-line' },
        { stage: '3. Berbunga & Polinasi', day: 32, date: '16 Agu 2026', heightCm: 140, note: 'Penyerbukan manual 100% sukses pada ruas ke-10.', icon: 'ri-contrast-drop-2-line' },
        { stage: '4. Pembesaran (Saat Ini)', day: 43, date: '27 Agu 2026', heightCm: 185, note: 'Netting buah mulai rapat, estimasi bobot 2,4 Kg.', icon: 'ri-focus-3-line' },
        { stage: '5. Panen Siap Petik', day: 60, date: '14 Sep 2026', heightCm: 190, note: 'Proyeksi kadar manis Brix 14°+ siap panen.', icon: 'ri-gift-line' },
      ],
      maintenanceLogs: [
        { id: 'LOG-001', date: '27 Agu 07:15', actionType: 'PENYIRAMAN', actionName: 'Irigasi Drip Pagi', material: 'Nutrisi AB Mix Organik', dose: '2.0 Liter (EC 2.2)', workerName: 'Kang Asep', notes: 'Tanah lembab optimal, daun segar bugar.' },
        { id: 'LOG-002', date: '25 Agu 16:00', actionType: 'PEMUPUKAN', actionName: 'Semprot Pupuk Daun Mikro', material: 'MgSO4 + Boron', dose: '2 gr / Liter air', workerName: 'Kang Asep', notes: 'Pencegahan defisiensi magnesium pada daun tua.' },
        { id: 'LOG-003', date: '20 Agu 08:00', actionType: 'PRUNING', actionName: 'Seleksi Buah & Pewiwitan', material: 'Gunting Steril 70% Alkohol', dose: '1 Buah Utama disisakan', workerName: 'Pak Joko', notes: 'Memotong tunas air liar ruas 1-8.' },
        { id: 'LOG-004', date: '15 Jul 07:00', actionType: 'PEMUPUKAN', actionName: 'Pemupukan Dasar Tanam', material: 'Kompos Hayati + Trichoderma', dose: '500 gr / lubang', workerName: 'Kang Asep', notes: 'Pencegahan jamur fusarium akar.' },
      ],
    },
    {
      id: 'TR-002',
      code: 'SAMPLE-TR-B1-0412',
      variety: 'Porang Madiun Super',
      block: 'Blok B1 (Sentra Kebun Inti)',
      rowAjir: 'Baris 2 • Ajir #08 (Pohon Sampel #2)',
      plantingDate: '2026-06-10',
      ageDays: 78,
      phase: 'Fase 5: Pembentukan Umbi',
      farmer: 'Pak Ujang (Regu B)',
      mandor: 'Pak Budi',
      lastTreatment: 'Aplikasi Kompos Trichoderma',
      healthScore: 94.2,
      targetBrix: 'Kadar Glukomanan 65%',
      estYieldKg: 3.8,
      gpsCoords: '-6.47012, 107.05910',
      status: 'OPTIMAL',
      gapCertificateNo: 'GAP-EXP-2026-0811 (Food Grade)',
      growthStory: [
        { stage: '1. Tanam Katak', day: 1, date: '10 Jun 2026', heightCm: 8, note: 'Penanaman umbi katak dormansi pecah.', icon: 'ri-seedling-line' },
        { stage: '2. Tunas Daun', day: 30, date: '10 Jul 2026', heightCm: 45, note: 'Tangkai tunggal melebar membentuk payung.', icon: 'ri-plant-line' },
        { stage: '3. Umbi Bawah', day: 78, date: '27 Agu 2026', heightCm: 85, note: 'Katak cabang keluar, umbi utama membesar.', icon: 'ri-focus-3-line' },
      ],
      maintenanceLogs: [
        { id: 'LOG-005', date: '26 Agu 09:00', actionType: 'HAMA_PENYAKIT', actionName: 'Penyiangan Gulma & Sanitasi', material: 'Manual Cabut Gulma', dose: 'Bedengan 10 Meter', workerName: 'Pak Ujang', notes: 'Gulma dibersihkan agar nutrisi umbi fokus.' },
        { id: 'LOG-006', date: '10 Jun 07:00', actionType: 'PEMUPUKAN', actionName: 'Aplikasi Pupuk Organik Hayati', material: 'Kompos Trichoderma', dose: '1 Kg / tanaman', workerName: 'Pak Ujang', notes: 'Awal penanaman katak.' },
      ],
    },
  ]);

  const [selectedBlockFilter, setSelectedBlockFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBatchPrintModal, setShowBatchPrintModal] = useState(false);

  // SEPARATE & DEDICATED MODALS (NO CONFUSING DUPLICATION)
  const [stickerPrintTree, setStickerPrintTree] = useState<TreeData | null>(null); // Modal 1: Cetak Label Fisik
  const [logInputTree, setLogInputTree] = useState<TreeData | null>(null);         // Modal 2: Form Catat Log Khusus Petani
  const [passportViewTree, setPassportViewTree] = useState<TreeData | null>(null); // Modal 3: KTP Digital & Sertifikat Mutu

  const [selectedGrowthStage, setSelectedGrowthStage] = useState<number>(3);
  const [activePassportTab, setActivePassportTab] = useState<'identitas' | 'riwayat_rawat' | 'timelapse' | 'sertifikat'>('identitas');

  // Quick Worker Log Input Form State
  const [formActionType, setFormActionType] = useState<MaintenanceLog['actionType']>('PEMUPUKAN');
  const [formActionName, setFormActionName] = useState('Aplikasi Pupuk Daun Mikro MgSO4');
  const [formMaterial, setFormMaterial] = useState('MgSO4 + Boron');
  const [formDose, setFormDose] = useState('2 gr / Liter');
  const [formWorker, setFormWorker] = useState('Kang Asep (Petani)');
  const [formNotes, setFormNotes] = useState('Kondisi daun sehat, disemprot merata pagi hari.');
  const [logSuccessNotice, setLogSuccessNotice] = useState<string | null>(null);

  const handleActionTypeChange = (type: MaintenanceLog['actionType']) => {
    setFormActionType(type);
    switch (type) {
      case 'PENYIRAMAN':
        setFormActionName('Penyiraman Irigasi Drip');
        setFormMaterial('Air Nutrisi AB Mix');
        setFormDose('2.0 Liter / pohon');
        break;
      case 'PEMUPUKAN':
        setFormActionName('Pemupukan Daun & Akar');
        setFormMaterial('MgSO4 + POC Hayati');
        setFormDose('2 gr / Liter air');
        break;
      case 'PRUNING':
        setFormActionName('Pruning Tunas Air / Pewiwitan');
        setFormMaterial('Gunting Kebun Steril');
        setFormDose('Sisa 1 Buah Utama');
        break;
      case 'HAMA_PENYAKIT':
        setFormActionName('Pengendalian Hama / Fungisida Nabati');
        setFormMaterial('Bio-Trichoderma & Ekstrak Mimba');
        setFormDose('5 ml / Liter air');
        break;
      case 'PENGUKURAN':
        setFormActionName('Pengukuran Tinggi & Diameter Buah');
        setFormMaterial('Meteran & Caliper Digital');
        setFormDose('Tinggi 188 cm, Diameter 16 cm');
        break;
      case 'UJI_BRIX':
        setFormActionName('Pengujian Kadar Gula (Brix)');
        setFormMaterial('Refraktometer Digital');
        setFormDose('Hasil: 14.5° Brix (Optimal)');
        break;
    }
  };

  const handleSaveWorkerLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!logInputTree) return;

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

    const updatedTrees = trees.map((t) => {
      if (t.id === logInputTree.id) {
        return {
          ...t,
          lastTreatment: `${formActionName} (${dateStr})`,
          maintenanceLogs: [newLog, ...t.maintenanceLogs],
        };
      }
      return t;
    });

    setTrees(updatedTrees);
    setLogSuccessNotice(`✅ Berhasil mencatat "${formActionName}" untuk sampel ${logInputTree.code}.`);
    setTimeout(() => {
      setLogSuccessNotice(null);
      setLogInputTree(null);
    }, 1500);
  };

  const filteredTrees = trees.filter((tree) => {
    const matchBlock = selectedBlockFilter === 'ALL' || tree.block.includes(selectedBlockFilter);
    const matchSearch =
      tree.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tree.variety.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tree.farmer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchBlock && matchSearch;
  });

  return (
    <div className="container-fluid py-4 px-md-4">
      {/* Header Banner */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <span className="badge bg-success-subtle text-success border border-success-subtle px-2.5 py-1 rounded-pill fw-bold text-uppercase" style={{ fontSize: '11px' }}>
              <i className="ri-qr-code-line me-1"></i> KTP Sampel Pohon Monitoring & Kontrol
            </span>
            <span className="badge bg-dark text-warning px-2 py-1 rounded-pill" style={{ fontSize: '10px' }}>
              SAMPLE TRACKING
            </span>
          </div>
          <h2 className="h4 fw-bolder text-dark mb-1">
            {isExecutiveOrInvestor ? 'Monitoring KTP Sampel Pohon Kebun' : 'KTP Sampel Pohon & Log Perawatan Petani'}
          </h2>
          <p className="text-muted small mb-0">
            {isExecutiveOrInvestor
              ? 'Pantau kembaran digital (digital twin) dari pohon sampel representatif, usia aktual HST, dan sertifikat mutu kebun.'
              : 'Barcode identitas sampel perwakilan pohon untuk mencatat riwayat tanam, usia aktual, dan log perawatan harian.'}
          </p>
        </div>

        <div className="d-flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setShowBatchPrintModal(true)}
            className="btn btn-outline-success d-flex align-items-center gap-1.5 fw-bold shadow-xs"
            style={{ fontSize: '13px' }}
          >
            <i className="ri-printer-fill"></i> Cetak Massal Label Ajir (Stiker Fisik)
          </button>
          {!isExecutiveOrInvestor && (
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="btn btn-success d-flex align-items-center gap-1.5 fw-bold shadow-sm"
              style={{ fontSize: '13px', backgroundColor: '#0F5545', borderColor: '#0F5545' }}
            >
              <i className="ri-add-circle-line"></i> Terbitkan ID Ajir Baru
            </button>
          )}
        </div>
      </div>

      {/* Table of Sample Trees */}
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
        <div className="p-3 border-bottom d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">
          <div className="d-flex gap-2 align-items-center">
            <span className="fw-bold text-dark small">Filter Blok:</span>
            <div className="btn-group btn-group-sm">
              {['ALL', 'Blok A', 'Blok B'].map((blk) => (
                <button
                  key={blk}
                  type="button"
                  onClick={() => setSelectedBlockFilter(blk)}
                  className={`btn ${selectedBlockFilter === blk ? 'btn-success' : 'btn-outline-secondary'} fw-bold`}
                  style={selectedBlockFilter === blk ? { backgroundColor: '#0F5545', borderColor: '#0F5545' } : {}}
                >
                  {blk === 'ALL' ? 'Semua Blok' : blk}
                </button>
              ))}
            </div>
          </div>

          <div className="input-group input-group-sm" style={{ maxWidth: '280px' }}>
            <span className="input-group-text bg-light border-end-0">
              <i className="ri-search-line text-muted"></i>
            </span>
            <input
              type="text"
              placeholder="Cari ID Sampel / Varietas / Petani..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-control bg-light border-start-0"
            />
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0" style={{ fontSize: '12.5px' }}>
            <thead className="table-light text-muted text-uppercase" style={{ fontSize: '10.5px' }}>
              <tr>
                <th className="ps-3">Stiker Barcode Ajir</th>
                <th>Varietas & Posisi Ajir</th>
                <th>Usia Aktual & Fase</th>
                <th>Petani & Mandor</th>
                <th>Perawatan Terakhir</th>
                <th>Kesehatan & Brix</th>
                <th className="text-end pe-3">Aksi Spesifik</th>
              </tr>
            </thead>
            <tbody>
              {filteredTrees.map((tree) => (
                <tr key={tree.id}>
                  <td className="ps-3">
                    <div className="d-flex align-items-center gap-2">
                      <div
                        onClick={() => setStickerPrintTree(tree)}
                        className="cursor-pointer transition-transform hover:scale-105 border p-1 rounded-2 bg-light text-center"
                        title="Klik untuk CETAK STIKER LABEL AJIR"
                      >
                        <DynamicQRCode value={tree.code} size={38} />
                      </div>
                      <div>
                        <strong className="d-block text-dark font-monospace" style={{ fontSize: '11.5px' }}>
                          {tree.code}
                        </strong>
                        <button
                          type="button"
                          onClick={() => setStickerPrintTree(tree)}
                          className="btn btn-link p-0 text-decoration-none text-muted"
                          style={{ fontSize: '10px' }}
                        >
                          <i className="ri-printer-line me-0.5"></i> Cetak Label Stiker
                        </button>
                      </div>
                    </div>
                  </td>
                  <td>
                    <strong className="d-block text-dark">{tree.variety}</strong>
                    <span className="badge bg-light text-secondary border" style={{ fontSize: '10px' }}>
                      {tree.block} • {tree.rowAjir}
                    </span>
                  </td>
                  <td>
                    <span className="fw-bold text-success">{tree.ageDays} HST</span>
                    <span className="text-muted d-block" style={{ fontSize: '10.5px' }}>
                      {tree.phase}
                    </span>
                  </td>
                  <td>
                    <span className="d-block fw-bold text-dark">{tree.farmer}</span>
                    <span className="text-muted" style={{ fontSize: '10.5px' }}>
                      Mandor: {tree.mandor}
                    </span>
                  </td>
                  <td>
                    <span className="text-dark fw-semibold d-block" style={{ fontSize: '11.5px' }}>
                      {tree.lastTreatment}
                    </span>
                    <span className="text-muted" style={{ fontSize: '10px' }}>
                      Total {tree.maintenanceLogs.length} Log Tindakan
                    </span>
                  </td>
                  <td>
                    <span className="badge bg-success-subtle text-success fw-bold d-block mb-0.5">
                      {tree.healthScore}% Optimal (AI)
                    </span>
                    <strong className="text-warning-emphasis" style={{ fontSize: '11px' }}>
                      {tree.targetBrix}
                    </strong>
                  </td>
                  <td className="text-end pe-3">
                    <div className="d-inline-flex gap-1.5 align-items-center">
                      {/* Tombol Catat Log: Khusus Operasional */}
                      {!isExecutiveOrInvestor && (
                        <button
                          type="button"
                          onClick={() => setLogInputTree(tree)}
                          className="btn btn-sm btn-success fw-bold d-inline-flex align-items-center gap-1 shadow-xs"
                          style={{ fontSize: '11px', backgroundColor: '#0F5545', borderColor: '#0F5545' }}
                        >
                          <i className="ri-edit-box-line"></i> + Catat Log
                        </button>
                      )}

                      {/* Tombol Buka KTP & Mutu: Terbuka untuk Semua (Terutama Direktur & Investor) */}
                      <button
                        type="button"
                        onClick={() => {
                          setPassportViewTree(tree);
                          setActivePassportTab('identitas');
                        }}
                        className="btn btn-sm btn-outline-success fw-bold d-inline-flex align-items-center gap-1"
                        style={{ fontSize: '11px' }}
                      >
                        <i className="ri-passport-line"></i> Buka KTP & Mutu
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: KHUSUS CETAK LABEL STIKER AJIR FISIK (PRINT PREVIEW) */}
      {/* ========================================================================= */}
      {stickerPrintTree && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1080 }}>
          <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '420px' }}>
            <div className="modal-content rounded-4 border-0 shadow-lg p-3 bg-light">
              <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3 bg-white p-2.5 rounded-3">
                <div>
                  <strong className="text-dark d-block">Pratinjau Plat Label Ajir Kebun</strong>
                  <span className="text-muted small" style={{ fontSize: '11px' }}>Ukuran standar stiker outdoor vinyl (70 x 100 mm)</span>
                </div>
                <button type="button" onClick={() => setStickerPrintTree(null)} className="btn-close"></button>
              </div>

              {/* Luxury Physical Sticker Tag */}
              <div className="bg-white border border-2 border-dark rounded-3 overflow-hidden shadow-sm p-0 position-relative text-dark">
                {/* Header Strip Dark Emerald */}
                <div className="bg-dark text-white p-2.5 d-flex justify-content-between align-items-center border-bottom border-warning">
                  <div className="d-flex align-items-center gap-2">
                    <div className="bg-success text-white rounded-2 px-1.5 py-0.5 fw-bolder font-monospace" style={{ fontSize: '11px' }}>
                      AGRO
                    </div>
                    <div>
                      <strong className="d-block text-uppercase text-white" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
                        AGROJAYA SMART PRECISION
                      </strong>
                      <span className="text-warning-emphasis d-block" style={{ fontSize: '8px' }}>
                        Biological Asset Tracking & Quality Assurance
                      </span>
                    </div>
                  </div>
                  <span className="badge bg-warning text-dark px-2 py-0.5 fw-bold" style={{ fontSize: '8px' }}>
                    GAP 0% RESIDU
                  </span>
                </div>

                {/* Body with QR Matrix */}
                <div className="p-3 bg-white">
                  <div className="d-flex align-items-center gap-3">
                    {/* QR Code Container */}
                    <div className="border border-2 border-dark p-1.5 rounded-3 bg-white text-center shadow-xs shrink-0">
                      <DynamicQRCode value={stickerPrintTree.code} size={100} bordered={false} />
                      <span className="d-block font-monospace fw-bolder text-dark mt-1" style={{ fontSize: '8px', letterSpacing: '0.5px' }}>
                        PINDAI QR KTP
                      </span>
                    </div>

                    {/* Meta Specifications */}
                    <div className="flex-1 text-start">
                      <span className="badge bg-dark text-warning font-monospace px-2 py-0.5 mb-1" style={{ fontSize: '10px' }}>
                        {stickerPrintTree.code}
                      </span>
                      <h6 className="fw-bolder text-dark mb-0 leading-tight" style={{ fontSize: '13px' }}>
                        {stickerPrintTree.variety}
                      </h6>
                      <span className="text-muted d-block" style={{ fontSize: '10px' }}>
                        {stickerPrintTree.block}
                      </span>
                      <span className="text-dark d-block fw-bold" style={{ fontSize: '10px' }}>
                        {stickerPrintTree.rowAjir}
                      </span>
                      <div className="mt-1 pt-1 border-top" style={{ fontSize: '9px' }}>
                        <span className="text-dark d-block"><strong>Tgl Tanam:</strong> {stickerPrintTree.plantingDate}</span>
                        <span className="text-success d-block"><strong>Target:</strong> {stickerPrintTree.targetBrix}</span>
                        <span className="text-muted font-monospace d-block">GPS: {stickerPrintTree.gpsCoords}</span>
                      </div>
                    </div>
                  </div>

                  {/* Worker & Certification Stamp */}
                  <div className="mt-2.5 pt-2 border-top border-dashed text-muted d-flex justify-content-between align-items-center" style={{ fontSize: '8.5px' }}>
                    <span>PJ: <strong className="text-dark">{stickerPrintTree.farmer}</strong></span>
                    <span>Mandor: <strong className="text-dark">{stickerPrintTree.mandor}</strong></span>
                    <span className="text-success font-monospace">GAP-EXP-2026</span>
                  </div>
                </div>

                {/* Footer Barcode Strip */}
                <div className="bg-light border-top py-1 px-3 d-flex justify-content-between align-items-center text-muted" style={{ fontSize: '7.5px' }}>
                  <span>PT SMART FARM NUSANTARA</span>
                  <span className="font-monospace">|||| | ||||| ||| ||||| ||</span>
                  <span>TAHAN AIR OUTDOOR</span>
                </div>
              </div>

              <div className="d-flex gap-2 mt-3">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="btn btn-success fw-bold flex-fill shadow-sm"
                  style={{ backgroundColor: '#0F5545' }}
                >
                  <i className="ri-printer-fill me-1"></i> Cetak Plat Label (Stiker)
                </button>
                <button type="button" onClick={() => setStickerPrintTree(null)} className="btn btn-outline-secondary">
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: KHUSUS FORM INPUT PERAWATAN PEKERJA (+ CATAT LOG) */}
      {/* ========================================================================= */}
      {logInputTree && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1080 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow-lg p-4 bg-white">
              <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
                <div>
                  <h6 className="fw-bold text-dark mb-0">📝 Form Catat Log Perawatan</h6>
                  <span className="text-muted small">Sampel: {logInputTree.code} ({logInputTree.variety})</span>
                </div>
                <button type="button" onClick={() => setLogInputTree(null)} className="btn-close"></button>
              </div>

              {logSuccessNotice && (
                <div className="alert alert-success py-2 px-3 mb-3 rounded-3" style={{ fontSize: '12px' }}>
                  {logSuccessNotice}
                </div>
              )}

              <form onSubmit={handleSaveWorkerLog} className="space-y-2.5">
                <div>
                  <label className="form-label small fw-bold">1. Pilih Jenis Tindakan:</label>
                  <select
                    value={formActionType}
                    onChange={(e) => handleActionTypeChange(e.target.value as MaintenanceLog['actionType'])}
                    className="form-select form-select-sm fw-bold border-success"
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

                <div>
                  <label className="form-label small fw-bold">2. Nama Tindakan:</label>
                  <input
                    type="text"
                    value={formActionName}
                    onChange={(e) => setFormActionName(e.target.value)}
                    className="form-control form-control-sm"
                    required
                  />
                </div>

                <div className="row g-2">
                  <div className="col-6">
                    <label className="form-label small fw-bold">3. Bahan / Pupuk:</label>
                    <input
                      type="text"
                      value={formMaterial}
                      onChange={(e) => setFormMaterial(e.target.value)}
                      className="form-control form-control-sm"
                      required
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label small fw-bold">4. Dosis / Takaran:</label>
                    <input
                      type="text"
                      value={formDose}
                      onChange={(e) => setFormDose(e.target.value)}
                      className="form-control form-control-sm"
                      required
                    />
                  </div>
                </div>

                <div className="row g-2">
                  <div className="col-6">
                    <label className="form-label small fw-bold">5. Nama Pekerja:</label>
                    <input
                      type="text"
                      value={formWorker}
                      onChange={(e) => setFormWorker(e.target.value)}
                      className="form-control form-control-sm"
                      required
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label small fw-bold">6. Catatan Lapangan:</label>
                    <input
                      type="text"
                      value={formNotes}
                      onChange={(e) => setFormNotes(e.target.value)}
                      className="form-control form-control-sm"
                    />
                  </div>
                </div>

                <div className="pt-3 d-flex gap-2">
                  <button
                    type="submit"
                    className="btn btn-success fw-bold flex-fill"
                    style={{ backgroundColor: '#0F5545' }}
                  >
                    💾 Simpan Log ke KTP Pohon
                  </button>
                  <button type="button" onClick={() => setLogInputTree(null)} className="btn btn-outline-secondary">
                    Batal
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: KHUSUS BUKA KTP DIGITAL, USIA HST, & SERTIFIKAT MUTU GAP */}
      {/* ========================================================================= */}
      {passportViewTree && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1070 }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content rounded-4 border-0 shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="p-3.5 bg-gradient-to-r text-white d-flex justify-content-between align-items-center" style={{ background: 'linear-gradient(135deg, #061E18 0%, #0A382E 50%, #0F4E40 100%)' }}>
                <div className="d-flex align-items-center gap-2.5">
                  <div className="w-9 h-9 rounded-2 bg-success text-white d-flex align-items-center justify-center font-bold">
                    <i className="ri-leaf-fill fs-5 text-warning"></i>
                  </div>
                  <div>
                    <h5 className="fw-black mb-0 text-white" style={{ letterSpacing: '0.5px' }}>
                      PASPOR POHON SAMPEL ({passportViewTree.code})
                    </h5>
                    <span className="badge bg-warning text-dark px-1.5 py-0.2" style={{ fontSize: '9px' }}>
                      AUDIT & MUTU KEBUN
                    </span>
                  </div>
                </div>
                <button type="button" onClick={() => setPassportViewTree(null)} className="btn-close btn-close-white"></button>
              </div>

              {/* Clean Tab Selector */}
              <div className="bg-light border-bottom px-3 pt-2 d-flex gap-2">
                <button
                  type="button"
                  onClick={() => setActivePassportTab('identitas')}
                  className={`btn btn-sm border-0 rounded-top-3 pb-2 fw-bold ${
                    activePassportTab === 'identitas' ? 'bg-white text-success border-bottom border-3 border-success shadow-xs' : 'text-muted'
                  }`}
                  style={{ fontSize: '11.5px' }}
                >
                  🪪 1. Data Paspor KTP
                </button>
                <button
                  type="button"
                  onClick={() => setActivePassportTab('riwayat_rawat')}
                  className={`btn btn-sm border-0 rounded-top-3 pb-2 fw-bold ${
                    activePassportTab === 'riwayat_rawat' ? 'bg-white text-success border-bottom border-3 border-success shadow-xs' : 'text-muted'
                  }`}
                  style={{ fontSize: '11.5px' }}
                >
                  📋 2. Riwayat Perawatan ({passportViewTree.maintenanceLogs.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActivePassportTab('timelapse')}
                  className={`btn btn-sm border-0 rounded-top-3 pb-2 fw-bold ${
                    activePassportTab === 'timelapse' ? 'bg-white text-success border-bottom border-3 border-success shadow-xs' : 'text-muted'
                  }`}
                  style={{ fontSize: '11.5px' }}
                >
                  📸 3. Time-Lapse Pertumbuhan
                </button>
                <button
                  type="button"
                  onClick={() => setActivePassportTab('sertifikat')}
                  className={`btn btn-sm border-0 rounded-top-3 pb-2 fw-bold ${
                    activePassportTab === 'sertifikat' ? 'bg-white text-success border-bottom border-3 border-success shadow-xs' : 'text-muted'
                  }`}
                  style={{ fontSize: '11.5px' }}
                >
                  📜 4. Sertifikat Mutu (Traceability)
                </button>
              </div>

              {/* Body Content */}
              <div className="modal-body p-4 bg-white" style={{ minHeight: '340px' }}>
                {/* 1. DATA PASPOR */}
                {activePassportTab === 'identitas' && (
                  <div className="row g-3 animate-in fade-in">
                    <div className="col-md-8 space-y-2">
                      <div className="p-3 bg-light rounded-4 border">
                        <div className="row g-2" style={{ fontSize: '12px' }}>
                          <div className="col-6">
                            <span className="text-muted d-block">Kode Sampel:</span>
                            <strong className="text-dark font-monospace">{passportViewTree.code}</strong>
                          </div>
                          <div className="col-6">
                            <span className="text-muted d-block">Varietas:</span>
                            <strong className="text-success">{passportViewTree.variety}</strong>
                          </div>
                          <div className="col-6">
                            <span className="text-muted d-block">Lokasi / Ajir:</span>
                            <strong>{passportViewTree.block} ({passportViewTree.rowAjir})</strong>
                          </div>
                          <div className="col-6">
                            <span className="text-muted d-block">Tanggal Tanam:</span>
                            <strong>{passportViewTree.plantingDate}</strong>
                          </div>
                          <div className="col-6">
                            <span className="text-muted d-block">Usia Aktual (HST):</span>
                            <strong className="text-success">{passportViewTree.ageDays} HST ({passportViewTree.phase})</strong>
                          </div>
                          <div className="col-6">
                            <span className="text-muted d-block">Petani & Mandor:</span>
                            <strong>{passportViewTree.farmer} • {passportViewTree.mandor}</strong>
                          </div>
                          <div className="col-6">
                            <span className="text-muted d-block">Target Kadar Gula:</span>
                            <strong className="text-warning-emphasis">{passportViewTree.targetBrix}</strong>
                          </div>
                          <div className="col-6">
                            <span className="text-muted d-block">Kesehatan AI:</span>
                            <strong className="text-success">✅ {passportViewTree.healthScore}% Optimal</strong>
                          </div>
                        </div>
                      </div>

                      <div className="d-flex gap-2">
                        <div className="p-2.5 rounded-3 bg-success-subtle text-success flex-fill text-center">
                          <span className="small d-block fw-semibold">Fase Pertumbuhan</span>
                          <strong className="fs-6">{passportViewTree.phase}</strong>
                        </div>
                        <div className="p-2.5 rounded-3 bg-warning-subtle text-warning-emphasis flex-fill text-center">
                          <span className="small d-block fw-semibold">Estimasi Bobot</span>
                          <strong className="fs-6">{passportViewTree.estYieldKg} Kg</strong>
                        </div>
                        <div className="p-2.5 rounded-3 bg-primary-subtle text-primary flex-fill text-center">
                          <span className="small d-block fw-semibold">Total Log Rawat</span>
                          <strong className="fs-6">{passportViewTree.maintenanceLogs.length} Catatan</strong>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-4 text-center d-flex flex-column align-items-center justify-content-center p-3 bg-light rounded-4 border">
                      <span className="text-muted small fw-bold mb-1">STIKER AJIR SAMPEL</span>
                      <DynamicQRCode value={passportViewTree.code} size={110} />
                      <span className="small text-muted font-monospace mt-1">{passportViewTree.code}</span>
                      <button
                        type="button"
                        onClick={() => setStickerPrintTree(passportViewTree)}
                        className="btn btn-sm btn-dark w-100 mt-2 fw-bold"
                        style={{ fontSize: '11px' }}
                      >
                        <i className="ri-printer-line me-1"></i> Format Cetak Stiker
                      </button>
                    </div>
                  </div>
                )}

                {/* 2. RIWAYAT PERAWATAN */}
                {activePassportTab === 'riwayat_rawat' && (
                  <div className="space-y-3 animate-in fade-in">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="fw-bold text-dark mb-0">📋 Riwayat Tindakan Perawatan</h6>
                        <span className="text-muted small">Log terverifikasi yang dicatat dari lapangan via scan QR.</span>
                      </div>
                    </div>

                    <div className="table-responsive">
                      <table className="table table-sm table-hover table-bordered align-middle mb-0" style={{ fontSize: '11.5px' }}>
                        <thead className="table-light">
                          <tr>
                            <th>Waktu Log</th>
                            <th>Kategori & Tindakan</th>
                            <th>Bahan / Nutrisi</th>
                            <th>Dosis</th>
                            <th>Eksekutor</th>
                            <th>Catatan</th>
                          </tr>
                        </thead>
                        <tbody>
                          {passportViewTree.maintenanceLogs.map((log) => (
                            <tr key={log.id}>
                              <td className="fw-bold font-monospace">{log.date}</td>
                              <td>
                                <strong className="text-dark d-block">{log.actionName}</strong>
                                <span className="badge bg-secondary-subtle text-secondary" style={{ fontSize: '9px' }}>
                                  {log.actionType}
                                </span>
                              </td>
                              <td>{log.material}</td>
                              <td className="text-success fw-bold">{log.dose}</td>
                              <td>{log.workerName}</td>
                              <td className="text-muted">{log.notes}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 3. TIME-LAPSE */}
                {activePassportTab === 'timelapse' && (
                  <div className="space-y-3 animate-in fade-in">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="fw-bold text-dark mb-0">📸 Log Foto Time-Lapse Pertumbuhan</h6>
                        <span className="text-muted small">Perkembangan bertahap dari bibit 10 cm sampai panen raya.</span>
                      </div>
                      <span className="badge bg-success-subtle text-success px-2 py-1">Fase 4 Aktif</span>
                    </div>

                    {/* Stepper Stage Selector */}
                    <div className="d-flex justify-content-between bg-light p-2 rounded-4 border">
                      {passportViewTree.growthStory.map((stage, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedGrowthStage(idx)}
                          className={`btn btn-sm text-center px-2 py-1.5 rounded-3 transition-all ${
                            selectedGrowthStage === idx ? 'bg-success text-white shadow-sm fw-bold' : 'text-muted'
                          }`}
                          style={{ fontSize: '11px' }}
                        >
                          <i className={`${stage.icon} d-block fs-5 mb-0.5`}></i>
                          <span>{stage.stage.split('.')[1] || stage.stage}</span>
                        </button>
                      ))}
                    </div>

                    {passportViewTree.growthStory[selectedGrowthStage] && (
                      <div className="p-3 bg-light rounded-4 border">
                        <div className="row align-items-center g-3">
                          <div className="col-md-5">
                            <div className="h-36 rounded-3 bg-dark text-white d-flex flex-column align-items-center justify-content-center p-3 text-center shadow-inner">
                              <i className="ri-camera-fill fs-1 text-warning mb-1"></i>
                              <strong className="small">{passportViewTree.growthStory[selectedGrowthStage].stage}</strong>
                              <span className="text-white-50" style={{ fontSize: '10px' }}>
                                Tinggi Fisik: {passportViewTree.growthStory[selectedGrowthStage].heightCm} cm
                              </span>
                            </div>
                          </div>
                          <div className="col-md-7 space-y-1.5" style={{ fontSize: '12px' }}>
                            <div className="d-flex justify-content-between border-bottom pb-1">
                              <span className="text-muted">Tanggal Log Foto:</span>
                              <strong>{passportViewTree.growthStory[selectedGrowthStage].date} ({passportViewTree.growthStory[selectedGrowthStage].day} HST)</strong>
                            </div>
                            <div className="d-flex justify-content-between border-bottom pb-1">
                              <span className="text-muted">Tinggi Batang:</span>
                              <strong className="text-success">{passportViewTree.growthStory[selectedGrowthStage].heightCm} cm</strong>
                            </div>
                            <div>
                              <span className="text-muted d-block">Catatan Mandor:</span>
                              <p className="text-dark bg-white p-2 rounded border mb-0 mt-1">
                                {passportViewTree.growthStory[selectedGrowthStage].note}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 4. SERTIFIKAT MUTU */}
                {activePassportTab === 'sertifikat' && (
                  <div className="p-4 bg-light rounded-4 border animate-in fade-in space-y-3">
                    <div className="d-flex justify-content-between align-items-start border-bottom pb-3">
                      <div>
                        <span className="text-muted text-uppercase fw-bold" style={{ fontSize: '9.5px', letterSpacing: '0.8px' }}>
                          AGROJAYA QUALITY & TRACEABILITY
                        </span>
                        <h5 className="fw-bold text-dark mb-0">Sertifikat Asal-Usul & Mutu Sampel</h5>
                        <span className="text-muted small">No. Registrasi: CERT/JGL/2026/0982-A2</span>
                      </div>
                      <div className="text-end">
                        <span className="badge bg-success-subtle text-success border border-success-subtle fw-bold px-2 py-1">
                          ✓ Lolos Uji GAP (0% Residu Kimia)
                        </span>
                      </div>
                    </div>

                    <div className="table-responsive bg-white rounded-3 border">
                      <table className="table table-sm table-borderless align-middle mb-0" style={{ fontSize: '11.5px' }}>
                        <tbody>
                          <tr className="border-bottom">
                            <td className="text-muted ps-3 py-2" style={{ width: '40%' }}>Komoditas & Varietas:</td>
                            <td className="fw-bold text-dark">{passportViewTree.variety}</td>
                          </tr>
                          <tr className="border-bottom">
                            <td className="text-muted ps-3 py-2">Asal Blok Lahan:</td>
                            <td className="fw-bold text-dark">{passportViewTree.block} ({passportViewTree.rowAjir})</td>
                          </tr>
                          <tr className="border-bottom">
                            <td className="text-muted ps-3 py-2">Titik Koordinat GPS:</td>
                            <td className="font-monospace text-muted">{passportViewTree.gpsCoords}</td>
                          </tr>
                          <tr className="border-bottom">
                            <td className="text-muted ps-3 py-2">Usia Aktual & Tanggal Tanam:</td>
                            <td className="text-success fw-bold">{passportViewTree.ageDays} HST (Ditanam {passportViewTree.plantingDate})</td>
                          </tr>
                          <tr className="border-bottom">
                            <td className="text-muted ps-3 py-2">Kadar Gula (°Brix) & Estimasi Bobot:</td>
                            <td className="text-dark fw-bold">{passportViewTree.targetBrix} • {passportViewTree.estYieldKg} Kg</td>
                          </tr>
                          <tr>
                            <td className="text-muted ps-3 py-2">Standar Pengawasan Agronomi:</td>
                            <td className="text-dark">Good Agricultural Practices (GAP) • Bebas Pestisida Berbahaya</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="d-flex justify-content-between align-items-center pt-2">
                      <div className="d-flex align-items-center gap-2">
                        <i className="ri-checkbox-circle-fill text-success fs-4"></i>
                        <div>
                          <span className="fw-bold text-dark d-block" style={{ fontSize: '11px' }}>Sistem Audit AgroJaya Terverifikasi</span>
                          <span className="text-muted" style={{ fontSize: '10px' }}>Dokumen sah untuk keperluan pelaporan & pembeli (*off-taker*).</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => alert(`Sertifikat Mutu ${passportViewTree.code} siap diunduh dalam format resmi.`)}
                        className="btn btn-sm btn-outline-dark fw-bold"
                        style={{ fontSize: '11px' }}
                      >
                        <i className="ri-download-2-line me-1"></i> Unduh PDF
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="modal-footer bg-light border-0 py-2.5 d-flex justify-content-between">
                <span className="text-muted" style={{ fontSize: '11px' }}>
                  GPS: {passportViewTree.gpsCoords} • KTP Pohon Sampel Lapangan
                </span>
                <button type="button" onClick={() => setPassportViewTree(null)} className="btn btn-sm btn-outline-secondary">
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Tambah Pohon Sampel Baru */}
      {showAddModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1070 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow-lg p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold mb-0">Pasang KTP Sampel Pohon Baru</h5>
                <button type="button" onClick={() => setShowAddModal(false)} className="btn-close"></button>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const newCode = `SAMPLE-JGL-A2-08${Math.floor(40 + Math.random() * 50)}`;
                  const newTree: TreeData = {
                    id: `TR-00${trees.length + 1}`,
                    code: newCode,
                    variety: 'Melon Golden Apollo F1',
                    block: 'Blok A2 (Jonggol)',
                    rowAjir: 'Baris 5 • Ajir #01 (Sampel Baru)',
                    plantingDate: '2026-08-27',
                    ageDays: 1,
                    phase: 'Fase 1: Tanam Bibit',
                    farmer: 'Kang Asep (Regu A)',
                    mandor: 'Pak Joko',
                    lastTreatment: 'Pemasangan QR Sampel & Tanam Bibit',
                    healthScore: 99.0,
                    targetBrix: 'Brix 14° – 16°',
                    estYieldKg: 2.5,
                    gpsCoords: '-6.46980, 107.05840',
                    status: 'OPTIMAL',
                    gapCertificateNo: 'GAP-EXP-2026-0999 (0% Residu)',
                    growthStory: [
                      { stage: '1. Tanam Bibit', day: 1, date: '27 Agu 2026', heightCm: 10, note: 'Bibit unggul 10 cm dipasang ajir & QR code.', icon: 'ri-seedling-line' }
                    ],
                    maintenanceLogs: [
                      { id: `LOG-${Date.now()}`, date: 'Hari Ini', actionType: 'PEMUPUKAN', actionName: 'Pemupukan Dasar Lubang Tanam', material: 'Kompos Hayati Trichoderma', dose: '500 gr', workerName: 'Kang Asep', notes: 'Awal penanaman.' }
                    ]
                  };
                  setTrees([newTree, ...trees]);
                  setShowAddModal(false);
                  setPassportViewTree(newTree);
                  setActivePassportTab('identitas');
                }}
                className="space-y-3"
              >
                <div>
                  <label className="form-label small fw-bold">Varietas Tanaman:</label>
                  <input type="text" defaultValue="Melon Golden Apollo F1" className="form-control form-control-sm" required />
                </div>
                <div className="row g-2">
                  <div className="col-6">
                    <label className="form-label small fw-bold">Blok Kebun:</label>
                    <input type="text" defaultValue="Blok A2 (Sentra Kebun Inti 2.0 Ha)" className="form-control form-control-sm" required />
                  </div>
                  <div className="col-6">
                    <label className="form-label small fw-bold">Nomor Baris / Ajir Sampel:</label>
                    <input type="text" defaultValue="Baris 5 • Ajir #01" className="form-control form-control-sm" required />
                  </div>
                </div>
                <div className="row g-2">
                  <div className="col-6">
                    <label className="form-label small fw-bold">Petani Perawat:</label>
                    <input type="text" defaultValue="Kang Asep (Regu A)" className="form-control form-control-sm" required />
                  </div>
                  <div className="col-6">
                    <label className="form-label small fw-bold">Mandor Penanggung Jawab:</label>
                    <input type="text" defaultValue="Pak Joko" className="form-control form-control-sm" required />
                  </div>
                </div>
                <div className="pt-2 d-flex gap-2">
                  <button type="submit" className="btn btn-success fw-bold flex-fill" style={{ backgroundColor: '#0F5545' }}>
                    Simpan & Generate Barcode Sampel
                  </button>
                  <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-outline-secondary">
                    Batal
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 4: CETAK MASSAL LABEL BARCODE AJIR (BATCH PRINTING SHEET) */}
      {/* ========================================================================= */}
      {showBatchPrintModal && (
        <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
          <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content rounded-4 border-0 shadow-lg">
              <div className="modal-header border-0 bg-dark text-white py-3 px-4 d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2">
                  <div className="w-8 h-8 rounded-circle bg-success text-white d-flex align-items-center justify-center fw-bold">
                    <i className="ri-printer-line"></i>
                  </div>
                  <div>
                    <h5 className="modal-title fw-bold mb-0 text-white" style={{ fontSize: '15px' }}>
                      Cetak Massal Plat Label Barcode Ajir ({trees.length} Pohon Sampel)
                    </h5>
                    <span className="text-success-subtle small" style={{ fontSize: '11px' }}>
                      Siap cetak stiker outdoor vinyl / label PVC tahan air untuk tiang ajir bedengan
                    </span>
                  </div>
                </div>
                <div className="d-flex gap-2 align-items-center">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="btn btn-sm btn-success fw-bold px-3 d-flex align-items-center gap-1.5"
                    style={{ backgroundColor: '#82C341', color: '#0F5545', borderColor: '#82C341' }}
                  >
                    <i className="ri-printer-fill"></i> Cetak / Print Dokumen
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowBatchPrintModal(false)}
                    className="btn-close btn-close-white"
                  ></button>
                </div>
              </div>

              <div className="modal-body p-4 bg-light">
                <div className="alert alert-info border-0 rounded-3 mb-3 d-flex align-items-center gap-2 small">
                  <i className="ri-information-fill fs-5 text-info"></i>
                  <div>
                    <strong>Petunjuk Teknis Mandor:</strong> Tempelkan stiker ini pada plat akrilik atau tiang bambu ajir pada ketinggian 120 cm dari permukaan tanah agar mudah dipindai menggunakan smartphone oleh petani atau mandor lapangan.
                  </div>
                </div>

                {/* Print Sheet Grid */}
                <div className="row g-3">
                  {trees.map((tree) => (
                    <div key={tree.id} className="col-12 col-md-6 col-lg-4">
                      <div className="bg-white border border-2 border-dark rounded-3 overflow-hidden shadow-sm p-0 position-relative text-dark">
                        {/* Header Strip Dark Emerald */}
                        <div className="bg-dark text-white p-2 d-flex justify-content-between align-items-center border-bottom border-warning">
                          <div className="d-flex align-items-center gap-1.5">
                            <div className="bg-success text-white rounded-1 px-1.5 py-0.2 fw-bolder font-monospace" style={{ fontSize: '9.5px' }}>
                              AGRO
                            </div>
                            <div>
                              <strong className="d-block text-uppercase text-white" style={{ fontSize: '9.5px', letterSpacing: '0.4px' }}>
                                AGROJAYA SMART PRECISION
                              </strong>
                              <span className="text-warning-emphasis d-block" style={{ fontSize: '7.5px' }}>
                                Biological Asset Tracking & GAP
                              </span>
                            </div>
                          </div>
                          <span className="badge bg-warning text-dark px-1.5 py-0.5 fw-bold" style={{ fontSize: '7.5px' }}>
                            GAP 0% RESIDU
                          </span>
                        </div>

                        {/* Body with QR Matrix */}
                        <div className="p-2.5 bg-white">
                          <div className="d-flex align-items-center gap-2.5">
                            {/* QR Code Container */}
                            <div className="border border-2 border-dark p-1 rounded-2 bg-white text-center shadow-xs shrink-0">
                              <DynamicQRCode value={tree.code} size={82} bordered={false} />
                              <span className="d-block font-monospace fw-bolder text-dark mt-0.5" style={{ fontSize: '7.5px', letterSpacing: '0.3px' }}>
                                PINDAI SAYA
                              </span>
                            </div>

                            {/* Meta Specifications */}
                            <div className="flex-1 text-start min-w-0">
                              <span className="badge bg-dark text-warning font-monospace px-1.5 py-0.2 mb-0.5" style={{ fontSize: '9px' }}>
                                {tree.code}
                              </span>
                              <h6 className="fw-bolder text-dark mb-0 leading-tight text-truncate" style={{ fontSize: '11.5px' }}>
                                {tree.variety}
                              </h6>
                              <span className="text-muted d-block text-truncate" style={{ fontSize: '9px' }}>
                                {tree.block}
                              </span>
                              <span className="text-dark d-block fw-bold text-truncate" style={{ fontSize: '9px' }}>
                                {tree.rowAjir}
                              </span>
                              <div className="mt-1 pt-1 border-top" style={{ fontSize: '8px' }}>
                                <span className="text-dark d-block"><strong>Tanam:</strong> {tree.plantingDate}</span>
                                <span className="text-success d-block text-truncate"><strong>Target:</strong> {tree.targetBrix}</span>
                                <span className="text-muted font-monospace d-block text-truncate">GPS: {tree.gpsCoords}</span>
                              </div>
                            </div>
                          </div>

                          {/* Worker & Certification Stamp */}
                          <div className="mt-2 pt-1.5 border-top border-dashed text-muted d-flex justify-content-between align-items-center" style={{ fontSize: '7.5px' }}>
                            <span>PJ: <strong className="text-dark">{tree.farmer}</strong></span>
                            <span>Mandor: <strong className="text-dark">{tree.mandor}</strong></span>
                            <span className="text-success font-monospace">GAP-EXP-2026</span>
                          </div>
                        </div>

                        {/* Footer Barcode Strip */}
                        <div className="bg-light border-top py-0.5 px-2.5 d-flex justify-content-between align-items-center text-muted" style={{ fontSize: '7px' }}>
                          <span>PT SMART FARM NUSANTARA</span>
                          <span className="font-monospace">|||| | ||||| ||| ||</span>
                          <span>TAHAN AIR OUTDOOR</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="modal-footer border-0 bg-white py-2 px-4 d-flex justify-content-between">
                <span className="text-muted small">
                  Format layout kompatibel dengan kertas stiker A4 (Label Tom & Jerry / Vinyl Outdoor).
                </span>
                <button
                  type="button"
                  onClick={() => setShowBatchPrintModal(false)}
                  className="btn btn-sm btn-secondary fw-bold"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
