import { useEffect, useState } from 'react';
import { getDirekturDashboard } from '../services/api';
import { useRole } from '../context/RoleContext';
import { TurbineLineChart, TurbineDonutChart, TurbineBarChart } from '../components/TurbineChart';

export const DirekturDashboard = () => {
  useRole();
  const [selectedBlock, setSelectedBlock] = useState<string>('ALL');

  useEffect(() => {
    getDirekturDashboard().catch(console.error);
  }, []);

  const executiveFinancialChartData = [
    { label: 'Feb 2026', value1: 18, value2: 12 },
    { label: 'Mar 2026', value1: 24, value2: 15 },
    { label: 'Apr 2026', value1: 30, value2: 18 },
    { label: 'Mei 2026', value1: 38, value2: 22 },
    { label: 'Jun 2026', value1: 45, value2: 25 },
    { label: 'Jul 2026', value1: 52, value2: 28 },
  ];

  const opexBreakdownDonutData = [
    { label: 'Pengadaan Pupuk & Pestisida', value: 35, color: '#059669' },
    { label: 'Upah Tenaga Kerja Petani', value: 40, color: '#2563eb' },
    { label: 'Pembelian Bibit Unggul', value: 15, color: '#f59e0b' },
    { label: 'Perawatan Alat & Mesin', value: 10, color: '#8b5cf6' },
  ];

  const rawHarvestYieldBarData = [
    { id: 'A1', label: 'Blok A1 - Porang (Panen)', value: 15000, color: '#059669' },
    { id: 'A2', label: 'Blok A2 - Porang (Perawatan)', value: 12000, color: '#10b981' },
    { id: 'B1', label: 'Blok B1 - Jagung Hibrida (Tanam)', value: 8500, color: '#2563eb' },
    { id: 'C1', label: 'Blok C1 - Anggur & Melon (Persiapan)', value: 5000, color: '#f59e0b' },
  ];

  const harvestYieldBarData = selectedBlock === 'ALL'
    ? rawHarvestYieldBarData
    : rawHarvestYieldBarData.filter(item => item.id === selectedBlock);

  const pendingApprovals = [
    { id: 'PO-2026-081', type: 'Purchase Order', title: 'Pengadaan Pupuk NPK Mutiara 5 Ton (Blok A1 & A2)', amount: 'Rp 45.000.000', requester: 'Ahmad Hidayat (Manajer)', priority: 'Tinggi', date: '27 Aug 2026' },
    { id: 'BAP-2026-042', type: 'Berita Acara', title: 'BAP Penyelesaian Olah Tanah & Bajak Traktor Blok B1 (0.5 Ha)', amount: 'Rp 12.500.000', requester: 'Budi Santoso (Kepala Kebun)', priority: 'Normal', date: '26 Aug 2026' },
    { id: 'PO-2026-084', type: 'Purchase Order', title: 'Bibit Porang Katak Super Jumbo 1.200 Kg', amount: 'Rp 27.500.000', requester: 'Ahmad Hidayat (Manajer)', priority: 'Tinggi', date: '25 Aug 2026' },
  ];

  return (
    <div className="w-100 space-y-4">
      {/* Header Banner */}
      <div className="bg-white p-4 p-md-5 rounded-4 border shadow-sm d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
          <span className="badge bg-success-subtle text-success border border-success px-3 py-1 rounded-pill uppercase font-weight-bold mb-2 d-inline-block" style={{ fontSize: 11 }}>
            <i className="ri-dashboard-3-line me-1"></i> PUSAT KONTROL EKSEKUTIF DIREKTUR UTAMA
          </span>
          <h2 className="page-header-title font-weight-extrabold text-dark mb-0">
            Dasbor Strategis & Indikator Kinerja Kebun
          </h2>
          <p className="text-muted mb-0 font-weight-medium" style={{ fontSize: 13 }}>
            Monitoring multi-dimensi efisiensi operasional, finansial real-time, dan tata kelola Smart Farming Jonggol
          </p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <span className="badge bg-success text-white px-3 py-2 rounded-pill font-weight-bold d-inline-flex align-items-center gap-1.5 shadow-sm" style={{ fontSize: 12 }}>
            <i className="ri-checkbox-blank-circle-fill text-white animate-pulse" style={{ fontSize: 8 }}></i> GIS Satelit Aktif 24/7
          </span>
        </div>
      </div>

      {/* TOP 4 VITAL METRICS STRIP */}
      <div className="row g-3">
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card-box card-box-hover p-3.5 border bg-white h-100 rounded-4">
            <div className="d-flex justify-content-between align-items-center mb-1.5">
              <span className="text-uppercase text-muted font-weight-bold" style={{ fontSize: 10.5, letterSpacing: '0.5px' }}>
                Lahan Terkelola
              </span>
              <div className="corpox-icon-box emerald" style={{ width: 34, height: 34, fontSize: 16 }}>
                <i className="ri-landscape-line"></i>
              </div>
            </div>
            <strong className="kpi-value font-weight-extrabold text-dark d-block mb-1" style={{ fontSize: 20 }}>
              2,0 Ha
            </strong>
            <span className="d-block text-success font-weight-bold" style={{ fontSize: 11 }}>
              <i className="ri-checkbox-circle-fill me-1"></i> 12 Blok Geofencing GIS
            </span>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card-box card-box-hover p-3.5 border bg-white h-100 rounded-4">
            <div className="d-flex justify-content-between align-items-center mb-1.5">
              <span className="text-uppercase text-muted font-weight-bold" style={{ fontSize: 10.5, letterSpacing: '0.5px' }}>
                Realisasi OPEX
              </span>
              <div className="corpox-icon-box blue" style={{ width: 34, height: 34, fontSize: 16 }}>
                <i className="ri-wallet-3-line"></i>
              </div>
            </div>
            <strong className="kpi-value font-weight-extrabold text-dark d-block mb-1" style={{ fontSize: 20 }}>
              Rp 85 Jt / 125 Jt
            </strong>
            <span className="d-block text-primary font-weight-bold" style={{ fontSize: 11 }}>
              <i className="ri-shield-check-line me-1"></i> 68% (Hemat 32%)
            </span>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card-box card-box-hover p-3.5 border bg-white h-100 rounded-4">
            <div className="d-flex justify-content-between align-items-center mb-1.5">
              <span className="text-uppercase text-muted font-weight-bold" style={{ fontSize: 10.5, letterSpacing: '0.5px' }}>
                Taksasi Yield Panen
              </span>
              <div className="corpox-icon-box emerald" style={{ width: 34, height: 34, fontSize: 16 }}>
                <i className="ri-plant-line"></i>
              </div>
            </div>
            <strong className="kpi-value font-weight-extrabold text-dark d-block mb-1" style={{ fontSize: 20 }}>
              40.500 Kg
            </strong>
            <span className="d-block text-success font-weight-bold" style={{ fontSize: 11 }}>
              <i className="ri-truck-line me-1"></i> Siap Distribusi Pasar
            </span>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card-box card-box-hover p-3.5 border bg-white h-100 rounded-4">
            <div className="d-flex justify-content-between align-items-center mb-1.5">
              <span className="text-uppercase text-muted font-weight-bold" style={{ fontSize: 10.5, letterSpacing: '0.5px' }}>
                Kepatuhan SLA Kebun
              </span>
              <div className="corpox-icon-box amber" style={{ width: 34, height: 34, fontSize: 16 }}>
                <i className="ri-time-line"></i>
              </div>
            </div>
            <strong className="kpi-value font-weight-extrabold text-success d-block mb-1" style={{ fontSize: 20 }}>
              98.0% Tepat Waktu
            </strong>
            <span className="d-block text-warning font-weight-bold" style={{ fontSize: 11 }}>
              <i className="ri-error-warning-fill me-1"></i> 3 Berkas Butuh Approval
            </span>
          </div>
        </div>
      </div>

      {/* CHARTS SECTION */}
      <div className="row g-4">
        <div className="col-12 col-lg-8">
          <TurbineLineChart
            title="Tren Eksekutif Pendapatan vs OPEX Bulanan (Juta Rp)"
            subtitle="Ringkasan arus kas riil pengeluaran operasional vs potensi pendapatan"
            data={executiveFinancialChartData}
            color1="#059669"
            color2="#2563eb"
          />
        </div>
        <div className="col-12 col-lg-4">
          <TurbineDonutChart
            title="Komposisi Pengeluaran OPEX"
            subtitle="Persentase alokasi dana per kategori operasional"
            data={opexBreakdownDonutData}
          />
        </div>
      </div>

      {/* YIELD BAR CHART WITH FILTER */}
      <div className="card-box p-4 border bg-white rounded-4 shadow-sm space-y-3">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">
          <div>
            <h4 className="h6 font-weight-bold text-dark mb-0">Taksasi & Realisasi Panen Per Blok Kebun (Kg)</h4>
            <span className="text-muted" style={{ fontSize: 12 }}>Hasil produksi fisik per blok komoditas Smart Farming Jonggol</span>
          </div>
          <div className="d-flex align-items-center gap-1.5">
            <span className="text-muted font-weight-bold" style={{ fontSize: 11 }}>Filter Blok:</span>
            {['ALL', 'A1', 'A2', 'B1', 'C1'].map((b) => (
              <button
                key={b}
                onClick={() => setSelectedBlock(b)}
                className={`btn btn-sm px-2.5 py-1 rounded-pill font-weight-bold ${
                  selectedBlock === b ? 'btn-success text-white' : 'btn-outline-secondary'
                }`}
                style={{ fontSize: 11 }}
              >
                {b === 'ALL' ? 'Semua Blok' : `Blok ${b}`}
              </button>
            ))}
          </div>
        </div>

        <TurbineBarChart
          title=""
          subtitle=""
          data={harvestYieldBarData}
          unitPrefix=""
          unitSuffix="Kg"
        />
      </div>

      {/* DOKUMEN MENUNGGU APPROVAL DIREKTUR */}
      <div className="card-box p-4 border bg-white rounded-4 shadow-sm">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h3 className="h6 font-weight-bold text-dark mb-0">Dokumen Menunggu Otorisasi Tanda Tangan Direktur</h3>
            <span className="text-muted" style={{ fontSize: 12 }}>Persetujuan 3-Level (Manajer Operasional → Finance → Direktur)</span>
          </div>
          <span className="badge bg-warning text-dark font-weight-bold px-2.5 py-1.5 rounded-pill" style={{ fontSize: 11 }}>
            3 Berkas Pending
          </span>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr style={{ fontSize: 11.5 }}>
                <th className="font-weight-bold text-muted">KODE DOKUMEN</th>
                <th className="font-weight-bold text-muted">JENIS</th>
                <th className="font-weight-bold text-muted">URAIAN PEKERJAAN / BARANG</th>
                <th className="font-weight-bold text-muted">NOMINAL</th>
                <th className="font-weight-bold text-muted">PEMOHON</th>
                <th className="font-weight-bold text-muted text-end">AKSI CEPAT</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: 12.5 }}>
              {pendingApprovals.map((doc) => (
                <tr key={doc.id}>
                  <td className="font-weight-bold text-dark font-mono">{doc.id}</td>
                  <td>
                    <span className="badge bg-primary-subtle text-primary border border-primary px-2 py-0.5 rounded-pill font-weight-bold" style={{ fontSize: 10.5 }}>
                      {doc.type}
                    </span>
                  </td>
                  <td>
                    <strong className="text-dark d-block">{doc.title}</strong>
                    <span className="text-muted font-weight-medium" style={{ fontSize: 11 }}>Tanggal: {doc.date}</span>
                  </td>
                  <td className="font-weight-bold text-dark">{doc.amount}</td>
                  <td className="text-secondary font-weight-medium">{doc.requester}</td>
                  <td className="text-end">
                    <div className="d-inline-flex gap-1.5">
                      <button
                        onClick={() => alert(`Dokumen ${doc.id} Berhasil Disetujui oleh Direktur Utama!`)}
                        className="btn btn-sm btn-success font-weight-bold px-2.5 py-1 rounded-2 shadow-xs"
                        style={{ fontSize: 11 }}
                      >
                        <i className="ri-check-line me-1"></i> Setujui
                      </button>
                      <button
                        onClick={() => alert(`Dokumen ${doc.id} Dikembalikan untuk Revisi.`)}
                        className="btn btn-sm btn-outline-danger font-weight-bold px-2.5 py-1 rounded-2"
                        style={{ fontSize: 11 }}
                      >
                        Tolak
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
