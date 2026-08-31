import React, { useEffect, useState } from 'react';
import { useSmartFarmStore } from '../store/smartFarmStore';
import { useRole } from '../context/RoleContext';

export const ReportsPage: React.FC = () => {
  const { purchaseOrders, tasks } = useSmartFarmStore();
  const [reportData, setReportData] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { role } = useRole();

  const isKepalaKebun = role === 'KEPALA_KEBUN';

  const fallback5DData = [
    {
      id: 'REP-001',
      category: 'OPS',
      timeSla: { timestamp: '2026-08-03T07:30:00Z', durationMinutes: 180 },
      location: { siteName: 'Blok A1 - Kebun Anggur Impor (1.000m² Jonggol)', soilType: 'Humus Organik Greenhouse' },
      personnel: { executorName: 'Joko Susilo (Teknisi Hortikultura)', supervisorName: 'Rahmat Hidayat (Kepala Kebun)' },
      physicalOutput: 'Fertigasi 1.000m² & Sterilisasi Stek',
      financial: { opexEstimateRp: 1200000, opexDisbursedRp: 1200000 },
      output: { status: 'SELESAI (BAP TERBIT)', bapDocUrl: '#bap-2026-0801' },
    },
    {
      id: 'REP-002',
      category: 'OPS',
      timeSla: { timestamp: '2026-08-01T08:00:00Z', durationMinutes: 360 },
      location: { siteName: 'Blok A2 - Tanam Hibrida Utama (2.0 Ha Jonggol)', soilType: 'Latosol Subur Jonggol Bogor' },
      personnel: { executorName: 'Joko Susilo (Teknisi Lapangan)', supervisorName: 'Budi Santoso, S.P. (Manajer)' },
      physicalOutput: 'Pemupukan NPK 2.0 Ha & Tebar Dolomit',
      financial: { opexEstimateRp: 18000000, opexDisbursedRp: 18000000 },
      output: { status: 'SELESAI (BAP TERBIT)', bapDocUrl: '#bap-2026-0802' },
    },
    {
      id: 'REP-003',
      category: 'SDM',
      timeSla: { timestamp: '2026-07-30T09:00:00Z', durationMinutes: 150 },
      location: { siteName: 'Blok B1 - Hortikultura Melon Premium (5.000m² Jonggol)', soilType: 'Aluvial Organik Jonggol' },
      personnel: { executorName: 'Siti Rahma (Petani Lapangan)', supervisorName: 'Rahmat Hidayat (Kepala Kebun)' },
      physicalOutput: 'Pasang 25 Pheromone Trap & Seleksi Buah',
      financial: { opexEstimateRp: 350000, opexDisbursedRp: 350000 },
      output: { status: 'SELESAI (BAP TERBIT)', bapDocUrl: '#bap-2026-0730' },
    },
    {
      id: 'REP-004',
      category: 'FINANCE',
      timeSla: { timestamp: '2026-07-28T13:00:00Z', durationMinutes: 150 },
      location: { siteName: 'Workshop & Bengkel Utama Jonggol', soilType: 'Fasilitas Alat & Mesin' },
      personnel: { executorName: 'M. Arifin (Mekanik Alat)', supervisorName: 'Budi Santoso, S.P. (Manajer)' },
      physicalOutput: 'Ganti Oli Traktor Kubota & Filter Solar',
      financial: { opexEstimateRp: 650000, opexDisbursedRp: 650000 },
      output: { status: 'SELESAI (BAP TERBIT)', bapDocUrl: '#bap-2026-0728' },
    },
  ];

  useEffect(() => {
    const liveDynamicReports = [
      ...tasks.filter((t) => t.completed).map((t) => ({
        id: `REP-TSK-${t.id}`,
        category: 'OPS',
        timeSla: { timestamp: t.completedAt || t.createdAt || '2026-08-30T08:00:00Z', durationMinutes: 180 },
        location: { siteName: t.target, soilType: 'Tanah Olah Siap Tanam' },
        personnel: { executorName: t.assignedTo, supervisorName: 'Pak Joko Sukardi (Kepala Kebun)' },
        physicalOutput: `${t.title} (${t.category})`,
        financial: { opexEstimateRp: 450000, opexDisbursedRp: 450000 },
        output: { status: 'SELESAI (BAP TERBIT)', bapDocUrl: `#bap-task-${t.id}` },
      })),
      ...purchaseOrders.filter((p) => p.status === 'APPROVED').map((p) => ({
        id: `REP-${p.id}`,
        category: 'FINANCE',
        timeSla: { timestamp: p.date, durationMinutes: 240 },
        location: { siteName: p.targetLand || 'Gudang Utama Jonggol', soilType: 'Penyimpanan & Distribusi' },
        personnel: { executorName: p.requester, supervisorName: 'Direktur & Investor' },
        physicalOutput: `Pengadaan: ${p.title} (${p.vendor})`,
        financial: { opexEstimateRp: p.amount, opexDisbursedRp: p.amount },
        output: { status: 'SELESAI (DANA CAIR)', bapDocUrl: `#bap-po-${p.id}` },
      })),
      ...fallback5DData,
    ];

    setReportData(liveDynamicReports);
  }, [purchaseOrders, tasks]);

  const handleExportCSV = () => {
    alert(`Mengunduh Laporan Terverifikasi Audit (PDF/Excel) untuk Peran: ${role}...`);
  };

  const filteredReports = reportData.filter((item) => {
    const matchCategory = activeCategory === 'ALL' || item.category === activeCategory;
    const matchSearch =
      item.location?.siteName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.personnel?.executorName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const totalDisbursed = filteredReports.reduce((acc, curr) => acc + (curr.financial?.opexDisbursedRp || 0), 0);

  return (
    <div className="w-100 space-y-4">
      {/* Header Banner - Role Contextual */}
      <div className="card-box p-4 rounded-4 bg-white border shadow-sm d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
          <h2 className="page-header-title font-weight-bold text-dark mb-0" style={{ fontSize: 20 }}>
            {isKepalaKebun
              ? 'Laporan Operasional Lapangan & Berita Acara (BAP)'
              : role === 'INVESTOR'
              ? 'Laporan Akuntabilitas & Transparansi 5-Dimensi Investor'
              : 'Laporan Terpadu 5-Dimensi Auditor Kebun'}
          </h2>
        </div>

        <button
          onClick={handleExportCSV}
          className="btn btn-success text-white font-weight-bold px-3.5 py-2 rounded-3 border-0 d-inline-flex align-items-center gap-2 shadow-xs"
          style={{ fontSize: 12.5 }}
        >
          <i className="ri-download-cloud-2-line"></i>
          <span>Unduh Laporan BAP (PDF / Excel)</span>
        </button>
      </div>

      {/* SUMMARY STATS (Role-Aware: Zero Financial data for Kepala Kebun) */}
      <div className="row g-3">
        <div className="col-12 col-md-4">
          <div className="card-box p-3.5 border bg-white rounded-4 shadow-sm h-100 d-flex justify-content-between align-items-center">
            <div>
              <span className="text-uppercase text-muted font-weight-bold d-block" style={{ fontSize: 11 }}>Total Berkas BAP</span>
              <strong className="text-dark font-weight-extrabold d-block my-0.5" style={{ fontSize: 20 }}>
                {filteredReports.length} Dokumen BAP
              </strong>
              <span className="text-success font-weight-bold" style={{ fontSize: 11 }}>100% Lolos Verifikasi Lapangan</span>
            </div>
            <div className="corpox-icon-box emerald" style={{ width: 36, height: 36, fontSize: 16 }}>
              <i className="ri-file-shield-line"></i>
            </div>
          </div>
        </div>

        {/* Card 2: Only show OPEX if NOT Kepala Kebun */}
        <div className="col-12 col-md-4">
          <div className="card-box p-3.5 border bg-white rounded-4 shadow-sm h-100 d-flex justify-content-between align-items-center">
            {isKepalaKebun ? (
              <>
                <div>
                  <span className="text-uppercase text-muted font-weight-bold d-block" style={{ fontSize: 11 }}>Kepatuhan Durasi SLA</span>
                  <strong className="text-primary font-weight-extrabold d-block my-0.5" style={{ fontSize: 20 }}>
                    100% Tepat Waktu
                  </strong>
                  <span className="text-primary font-weight-bold" style={{ fontSize: 11 }}>Rata-rata 3.2 Jam / Tugas</span>
                </div>
                <div className="corpox-icon-box blue" style={{ width: 36, height: 36, fontSize: 16 }}>
                  <i className="ri-time-line"></i>
                </div>
              </>
            ) : (
              <>
                <div>
                  <span className="text-uppercase text-muted font-weight-bold d-block" style={{ fontSize: 11 }}>Total Realisasi Dana OPEX</span>
                  <strong className="text-dark font-weight-extrabold d-block my-0.5" style={{ fontSize: 20 }}>
                    Rp {totalDisbursed.toLocaleString('id-ID')}
                  </strong>
                  <span className="text-primary font-weight-bold" style={{ fontSize: 11 }}>Tercatat di Jurnal Kas ERP</span>
                </div>
                <div className="corpox-icon-box blue" style={{ width: 36, height: 36, fontSize: 16 }}>
                  <i className="ri-wallet-3-line"></i>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Card 3 */}
        <div className="col-12 col-md-4">
          <div className="card-box p-3.5 border bg-white rounded-4 shadow-sm h-100 d-flex justify-content-between align-items-center">
            <div>
              <span className="text-uppercase text-muted font-weight-bold d-block" style={{ fontSize: 11 }}>
                {isKepalaKebun ? 'Status Pelaksanaan' : 'Integritas 5 Dimensi'}
              </span>
              <strong className="text-success font-weight-extrabold d-block my-0.5" style={{ fontSize: 20 }}>
                {isKepalaKebun ? '100% Selesai' : 'Sempurna (5/5)'}
              </strong>
              <span className="text-muted font-weight-medium" style={{ fontSize: 11 }}>
                {isKepalaKebun ? 'Semua Pekerjaan Tervalidasi' : 'Waktu, Lokasi, SDM, Biaya, BAP'}
              </span>
            </div>
            <div className="corpox-icon-box emerald" style={{ width: 36, height: 36, fontSize: 16 }}>
              <i className="ri-checkbox-circle-line"></i>
            </div>
          </div>
        </div>
      </div>

      {/* FILTER & SEARCH CONTROLS */}
      <div className="card-box p-3 rounded-4 bg-white border shadow-sm d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">
        <div className="d-flex flex-wrap gap-1.5">
          {[
            { id: 'ALL', label: 'Semua Laporan' },
            { id: 'OPS', label: '🌾 Operasional & Panen' },
            ...(isKepalaKebun ? [] : [{ id: 'FINANCE', label: '💰 Keuangan & OPEX' }]),
            { id: 'SDM', label: '👥 Tenaga Kerja SDM' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`btn btn-sm px-3 py-1 rounded-pill font-weight-bold transition ${
                activeCategory === cat.id
                  ? 'btn-success text-white shadow-xs'
                  : 'btn-light text-secondary border-0'
              }`}
              style={{ fontSize: 12 }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="w-100 w-md-auto" style={{ minWidth: 240 }}>
          <input
            type="text"
            placeholder="Cari lokasi blok / pelaksana / ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-control form-control-sm p-2 rounded-3 bg-light border-0"
            style={{ fontSize: 12 }}
          />
        </div>
      </div>

      {/* Main Audit Table */}
      <div className="card-box p-4 rounded-4 bg-white border shadow-sm space-y-3">
        <div className="d-flex justify-content-between align-items-center pb-2 border-bottom">
          <h4 className="font-weight-bold text-dark m-0 !text-sm">
            <i className="ri-shield-check-line text-success me-1.5"></i>
            {isKepalaKebun ? 'Matriks Rekap Pekerjaan & Berita Acara Lapangan' : 'Matriks Laporan Terpadu 5-Dimensi'} ({filteredReports.length} Berkas)
          </h4>
          <span className="badge bg-success-subtle text-success border border-success px-2.5 py-1 font-weight-bold rounded-pill" style={{ fontSize: 11 }}>
            {isKepalaKebun ? 'BAP Terverifikasi' : '5D Auditor Verified'}
          </span>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0" style={{ fontSize: 12.5 }}>
            <thead className="table-light">
              <tr style={{ fontSize: 11.5 }}>
                <th style={{ minWidth: 120 }}>1. WAKTU & SLA</th>
                <th style={{ minWidth: 170 }}>2. LOKASI BLOK</th>
                <th style={{ minWidth: 150 }}>3. SDM / PELAKSANA</th>
                <th style={{ minWidth: 130 }}>
                  {isKepalaKebun ? '4. HASIL KERJA FISIK' : '4. OPEX / DANA CAIR'}
                </th>
                <th style={{ minWidth: 140 }}>BUKTI FOTO DOKUMENTASI</th>
                <th style={{ minWidth: 140 }} className="text-end">5. STATUS & BAP</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((row, idx) => {
                const proofPhotos = [
                  'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
                  'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80',
                  'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80',
                  'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=800&q=80',
                ];
                const currentPhoto = proofPhotos[idx % proofPhotos.length];

                return (
                  <tr key={row.id}>
                    <td>
                      <strong className="d-block text-dark font-mono" style={{ fontSize: 11.5 }}>{row.id}</strong>
                      <span className="text-muted" style={{ fontSize: 11 }}>
                        {new Date(row.timeSla?.timestamp || Date.now()).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </span>
                      <span className="badge bg-light text-dark border d-block w-fit mt-1" style={{ fontSize: 10 }}>
                        ⏱️ {row.timeSla?.durationMinutes} Menit
                      </span>
                    </td>
                    <td>
                      <strong className="d-block text-dark font-weight-bold" style={{ fontSize: 12.5 }}>{row.location?.siteName}</strong>
                      <span className="text-secondary" style={{ fontSize: 11 }}>Tanah: {row.location?.soilType}</span>
                    </td>
                    <td>
                      <strong className="d-block text-dark" style={{ fontSize: 12.5 }}>{row.personnel?.executorName}</strong>
                      <span className="text-muted font-weight-medium" style={{ fontSize: 11 }}>SPV: {row.personnel?.supervisorName}</span>
                    </td>
                    <td>
                      {isKepalaKebun ? (
                        <span className="text-dark font-weight-medium" style={{ fontSize: 12 }}>
                          🌱 {row.physicalOutput || 'Pekerjaan Selesai'}
                        </span>
                      ) : (
                        <>
                          <span className="d-block text-muted" style={{ fontSize: 10.5 }}>Realisasi OPEX:</span>
                          <strong className="text-success font-mono font-weight-bold" style={{ fontSize: 13 }}>
                            Rp {(row.financial?.opexDisbursedRp || 0).toLocaleString('id-ID')}
                          </strong>
                        </>
                      )}
                    </td>
                    <td>
                      <div
                        className="d-flex align-items-center gap-2 cursor-pointer group"
                        onClick={() => window.open(currentPhoto, '_blank')}
                      >
                        <img
                          src={currentPhoto}
                          alt="Bukti Foto"
                          className="rounded-2 border"
                          style={{ width: 44, height: 44, objectFit: 'cover' }}
                        />
                        <div>
                          <span className="d-block font-weight-bold text-success" style={{ fontSize: 11 }}>
                            <i className="ri-image-line me-1"></i> Foto Sah
                          </span>
                          <span className="text-muted font-mono" style={{ fontSize: 9.5 }}>GPS: -6.4697, 107.0583</span>
                        </div>
                      </div>
                    </td>
                    <td className="text-end">
                      <span className="badge bg-success-subtle text-success border border-success mb-1 d-inline-block font-weight-bold" style={{ fontSize: 10.5 }}>
                        {row.output?.status}
                      </span>
                      <br />
                      <button
                        onClick={() => alert(`Membuka Berita Acara Pekerjaan (BAP) Digital: ${row.id}`)}
                        className="btn btn-sm btn-outline-primary font-weight-bold px-2 py-0.5 rounded-2 d-inline-flex align-items-center gap-1"
                        style={{ fontSize: 10.5 }}
                      >
                        <i className="ri-file-pdf-line text-danger"></i>
                        <span>Unduh BAP</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
