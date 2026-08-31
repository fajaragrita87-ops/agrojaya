import { useEffect, useState } from 'react';
import { getInvestorDashboard } from '../services/api';
import { useSmartFarmStore } from '../store/smartFarmStore';
import { TurbineLineChart, TurbineDonutChart, TurbineBarChart } from '../components/TurbineChart';
import { LiveFieldFeedHub } from '../components/LiveFieldFeedHub';

export const InvestorDashboard = () => {
  const { purchaseOrders, authorizePOByInvestor } = useSmartFarmStore();
  const [auditFilter, setAuditFilter] = useState<string>('ALL');

  useEffect(() => {
    getInvestorDashboard().catch(console.error);
  }, []);

  const roiChartData = [
    { label: 'Feb 2026', value1: 1800, value2: 1500 },
    { label: 'Mar 2026', value1: 2100, value2: 1800 },
    { label: 'Apr 2026', value1: 2350, value2: 2000 },
    { label: 'Mei 2026', value1: 2600, value2: 2200 },
    { label: 'Jun 2026', value1: 2900, value2: 2500 },
    { label: 'Jul 2026', value1: 3100, value2: 2500 },
  ];

  const portfolioDonutData = [
    { label: 'Porang (Komoditas Utama Ekspor)', value: 45, color: '#059669' },
    { label: 'Jagung Hibrida Pangan (Blok B1-B2)', value: 30, color: '#2563eb' },
    { label: 'Anggur & Melon Impor (Blok C1-D1)', value: 25, color: '#f59e0b' },
  ];

  const burnRateBarData = [
    { label: 'Upah Harian Petani Lapangan', value: 42000000, color: '#059669' },
    { label: 'Pengadaan Pupuk NPK & Kapur Dolomit', value: 28000000, color: '#2563eb' },
    { label: 'Perawatan Traktor & Irigasi Satelit', value: 15000000, color: '#f59e0b' },
  ];

  // Live POs waiting for Investor Approval (Layer 3)
  const pendingInvestorPOs = purchaseOrders.filter((p) => p.status === 'PENDING_INVESTOR');

  const rawOpexAuditDetails = [
    ...purchaseOrders
      .filter((p) => p.status === 'APPROVED' || p.status === 'PENDING_INVESTOR' || p.status === 'PENDING_DIREKTUR')
      .map((p) => ({
        category: `${p.title} (${p.category})`,
        tag: p.category.toUpperCase().includes('PUPUK') ? 'PUPUK' : p.category.toUpperCase().includes('BIBIT') ? 'SDM' : 'ALAT',
        nominal: p.amount,
        personInCharge: p.requester,
        status: p.status === 'APPROVED' ? 'TERBAYAR (SLA 100%)' : p.status === 'PENDING_INVESTOR' ? 'MENUNGGU INVESTOR (LAYER 3)' : 'VERIFIKASI DIREKSI',
        bapLink: `BAP-${p.id}`,
        date: p.date,
      })),
    {
      category: 'Upah Harian Petani Lapangan',
      tag: 'SDM',
      nominal: 42000000,
      personInCharge: 'Budi Santoso, S.P.',
      status: 'TERBAYAR (SLA 100%)',
      bapLink: 'BAP-OPEX-2026-08',
      date: '03 Aug 2026'
    },
    {
      category: 'Pengadaan Pupuk NPK & Kapur Dolomit',
      tag: 'PUPUK',
      nominal: 28000000,
      personInCharge: 'Ahmad Hidayat',
      status: 'VERIFIKASI AUDITOR',
      bapLink: 'BAP-PUPUK-2026-07',
      date: '01 Aug 2026'
    },
  ];

  const opexAuditDetails = auditFilter === 'ALL'
    ? rawOpexAuditDetails
    : rawOpexAuditDetails.filter(d => d.tag === auditFilter);

  return (
    <div className="w-100 space-y-4">
      {/* Header Banner */}
      <div className="bg-white p-4 rounded-4 border shadow-sm d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
          <span className="badge bg-primary-subtle text-primary border border-primary px-3 py-1 rounded-pill uppercase font-weight-bold mb-2 d-inline-block" style={{ fontSize: 11 }}>
            <i className="ri-funds-box-line me-1"></i> PORTAL TRANSPARANSI PORTOFOLIO INVESTOR
          </span>
          <h2 className="page-header-title font-weight-extrabold text-dark mb-0" style={{ fontSize: 20, letterSpacing: '-0.3px' }}>
            Dasbor Valuasi Portofolio & Tingkat Pengembalian Modal (ROI)
          </h2>
          <p className="text-secondary mb-0 font-weight-medium" style={{ fontSize: 13 }}>
            Laporan Akuntabilitas Finansial, Pertumbuhan Nilai Proyek, Keamanan Modal, & Realisasi Burn Rate Kebun Smart Farming Jonggol
          </p>
        </div>
        <span className="badge bg-success text-white px-3.5 py-2 rounded-pill font-weight-bold d-inline-flex align-items-center gap-1.5 shadow-sm" style={{ fontSize: 12 }}>
          <i className="ri-shield-check-fill text-white"></i> Terverifikasi Auditor 5D
        </span>
      </div>

      {/* TOP 4 VITAL INVESTOR CARDS */}
      <div className="row g-3">
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card-box card-box-hover p-3.5 border bg-white h-100 rounded-4">
            <div className="d-flex justify-content-between align-items-center mb-1.5">
              <span className="text-uppercase text-muted font-weight-bold" style={{ fontSize: 10.5, letterSpacing: '0.5px' }}>
                Modal Disetor
              </span>
              <div className="corpox-icon-box blue" style={{ width: 34, height: 34, fontSize: 16 }}>
                <i className="ri-bank-card-line"></i>
              </div>
            </div>
            <strong className="kpi-value font-weight-extrabold text-dark d-block mb-1" style={{ fontSize: 19 }}>
              Rp 2.500.000.000
            </strong>
            <span className="d-block text-success font-weight-bold" style={{ fontSize: 11 }}>
              <i className="ri-checkbox-circle-fill me-1"></i> 100% Terealisasi Ke Lahan
            </span>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card-box card-box-hover p-3.5 border bg-white h-100 rounded-4">
            <div className="d-flex justify-content-between align-items-center mb-1.5">
              <span className="text-uppercase text-muted font-weight-bold" style={{ fontSize: 10.5, letterSpacing: '0.5px' }}>
                Valuasi Portofolio
              </span>
              <div className="corpox-icon-box emerald" style={{ width: 34, height: 34, fontSize: 16 }}>
                <i className="ri-line-chart-line"></i>
              </div>
            </div>
            <strong className="kpi-value font-weight-extrabold text-success d-block mb-1" style={{ fontSize: 19 }}>
              Rp 3.100.000.000
            </strong>
            <span className="d-block text-success font-weight-bold" style={{ fontSize: 11 }}>
              <i className="ri-arrow-up-circle-fill me-1"></i> +24.0% Capital Gain
            </span>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card-box card-box-hover p-3.5 border bg-white h-100 rounded-4">
            <div className="d-flex justify-content-between align-items-center mb-1.5">
              <span className="text-uppercase text-muted font-weight-bold" style={{ fontSize: 10.5, letterSpacing: '0.5px' }}>
                Keamanan Modal (LTV)
              </span>
              <div className="corpox-icon-box emerald" style={{ width: 34, height: 34, fontSize: 16 }}>
                <i className="ri-shield-user-line"></i>
              </div>
            </div>
            <strong className="kpi-value font-weight-extrabold text-dark d-block mb-1" style={{ fontSize: 19 }}>
              88.5% Aman
            </strong>
            <span className="d-block text-secondary font-weight-bold" style={{ fontSize: 11 }}>
              <i className="ri-map-pin-2-fill text-success me-1"></i> Hak Fisik Lahan 2.0 Ha
            </span>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card-box card-box-hover p-3.5 border bg-white h-100 rounded-4">
            <div className="d-flex justify-content-between align-items-center mb-1.5">
              <span className="text-uppercase text-muted font-weight-bold" style={{ fontSize: 10.5, letterSpacing: '0.5px' }}>
                Waktu Balik Modal (ROI)
              </span>
              <div className="corpox-icon-box amber" style={{ width: 34, height: 34, fontSize: 16 }}>
                <i className="ri-calendar-check-line"></i>
              </div>
            </div>
            <strong className="kpi-value font-weight-extrabold text-primary d-block mb-1" style={{ fontSize: 19 }}>
              14 Bulan (Panen Ke-2)
            </strong>
            <span className="d-block text-primary font-weight-bold" style={{ fontSize: 11 }}>
              <i className="ri-check-double-fill me-1"></i> Sesuai Master Plan Bisnis
            </span>
          </div>
        </div>
      </div>

      {/* CHARTS SECTION */}
      <div className="row g-4">
        <div className="col-12 col-lg-8">
          <TurbineLineChart
            title="Proyeksi Pertumbuhan Valuasi Portofolio (Juta Rp)"
            subtitle="Perbandingan nilai modal disetor vs akumulasi nilai panen & aset tanah"
            data={roiChartData}
            color1="#059669"
            color2="#2563eb"
          />
        </div>
        <div className="col-12 col-lg-4">
          <TurbineDonutChart
            title="Alokasi Portofolio Komoditas Kebun"
            subtitle="Diversifikasi risiko per jenis tanaman"
            data={portfolioDonutData}
          />
        </div>
      </div>

      <div className="row g-4">
        <div className="col-12">
          <TurbineBarChart
            title="Realisasi Dana Operasional (Burn Rate) Terverifikasi"
            subtitle="Transparansi arus kas riil pengeluaran operasional di kebun Jonggol"
            data={burnRateBarData}
          />
        </div>
      </div>

      {/* 4.5. PENDING INVESTOR PO AUTHORIZATION (LAYER 3) */}
      {pendingInvestorPOs.length > 0 && (
        <div className="card-box p-4 border border-warning bg-warning-subtle rounded-4 shadow-sm space-y-3">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <span className="badge bg-warning text-dark font-weight-bold px-2.5 py-1 rounded-pill mb-1 d-inline-block">
                ⚠️ PERLU OTORISASI INVESTOR (LAYER 3)
              </span>
              <h3 className="h6 font-weight-bold text-dark mb-0">
                Pengajuan Belanja Telah Disetujui Direktur - Menunggu Persetujuan Modal Investor
              </h3>
            </div>
            <span className="badge bg-dark text-white font-weight-bold px-3 py-1.5 rounded-pill">
              {pendingInvestorPOs.length} Dokumen
            </span>
          </div>

          <div className="space-y-2">
            {pendingInvestorPOs.map((po) => (
              <div key={po.id} className="p-3 bg-white rounded-3 border d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                <div>
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <span className="badge bg-dark text-white font-mono">{po.id}</span>
                    <span className="badge bg-success-subtle text-success border border-success">{po.category}</span>
                    <span className="text-muted" style={{ fontSize: 11 }}>Oleh: {po.requester}</span>
                  </div>
                  <strong className="text-dark d-block" style={{ fontSize: 13.5 }}>{po.title}</strong>
                  <span className="text-secondary" style={{ fontSize: 11.5 }}>{po.notes}</span>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <strong className="text-success font-weight-extrabold" style={{ fontSize: 16 }}>
                    Rp {po.amount.toLocaleString('id-ID')}
                  </strong>
                  <button
                    onClick={() => authorizePOByInvestor(po.id, 'Disetujui Investor Utama')}
                    className="btn btn-sm btn-success font-weight-bold px-3 py-1.5 rounded-2 shadow-xs cursor-pointer d-flex align-items-center gap-1"
                    style={{ fontSize: 12 }}
                  >
                    <i className="ri-checkbox-circle-fill"></i>
                    <span>Sahkan & Setujui</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5D AUDIT TABLE WITH CATEGORY FILTER */}
      <div className="card-box p-4 border bg-white rounded-4 shadow-sm">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-3">
          <div>
            <h3 className="h6 font-weight-bold text-dark mb-0">Tabel Audit Penyerapan Dana Investasi (5-Dimensi Auditor)</h3>
            <span className="text-muted font-weight-medium" style={{ fontSize: 12 }}>
              Memenuhi standar: Waktu, Lokasi, Personel Penanggung Jawab, Nominal Riil, dan Tautan Berita Acara (BAP)
            </span>
          </div>
          <div className="d-flex align-items-center gap-1.5">
            <span className="text-muted font-weight-bold" style={{ fontSize: 11 }}>Filter Kategori:</span>
            {[
              { id: 'ALL', label: 'Semua' },
              { id: 'SDM', label: 'SDM' },
              { id: 'PUPUK', label: 'Pupuk' },
              { id: 'ALAT', label: 'Alat & Irigasi' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setAuditFilter(item.id)}
                className={`btn btn-sm px-2.5 py-1 rounded-pill font-weight-bold ${
                  auditFilter === item.id ? 'btn-success text-white' : 'btn-outline-secondary'
                }`}
                style={{ fontSize: 11 }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr style={{ fontSize: 11.5 }}>
                <th className="font-weight-bold text-muted">KATEGORI PENGELUARAN</th>
                <th className="font-weight-bold text-muted">TANGGAL REALISASI</th>
                <th className="font-weight-bold text-muted">PENANGGUNG JAWAB</th>
                <th className="font-weight-bold text-muted">NOMINAL (RP)</th>
                <th className="font-weight-bold text-muted">STATUS AUDIT</th>
                <th className="font-weight-bold text-muted text-end">BERITA ACARA (BAP)</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: 12.5 }}>
              {opexAuditDetails.map((detail, index) => (
                <tr key={index}>
                  <td className="font-weight-bold text-dark">{detail.category}</td>
                  <td className="text-secondary">{detail.date}</td>
                  <td className="font-weight-medium text-dark">{detail.personInCharge}</td>
                  <td className="font-weight-bold text-success">
                    Rp {detail.nominal.toLocaleString('id-ID')}
                  </td>
                  <td>
                    <span className="badge bg-success-subtle text-success border border-success px-2.5 py-1 rounded-pill font-weight-bold" style={{ fontSize: 11 }}>
                      {detail.status}
                    </span>
                  </td>
                  <td className="text-end">
                    <button
                      onClick={() => alert(`Mengunduh Berkas Digital Terverifikasi: ${detail.bapLink}.pdf`)}
                      className="btn btn-sm btn-outline-primary font-weight-bold px-2.5 py-1 rounded-2 d-inline-flex align-items-center gap-1"
                      style={{ fontSize: 11 }}
                    >
                      <i className="ri-file-pdf-line text-danger"></i>
                      <span>{detail.bapLink}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. LIVE FIELD FEED TRANSPARANSI INVESTOR (BUKTI FOTO DARI LAPANGAN) */}
      <div className="card-box p-4 border bg-white rounded-4 shadow-sm">
        <div className="mb-3">
          <span className="badge bg-success-subtle text-success border border-success px-3 py-1 rounded-pill uppercase font-weight-bold mb-1.5 d-inline-block" style={{ fontSize: 11 }}>
            <i className="ri-broadcast-line me-1"></i> UPDATE LANGSUNG DARI KEBUN (LIVE FEED)
          </span>
          <h3 className="h6 font-weight-bold text-dark mb-0">Laporan Situasi Lahan & Dokumentasi Foto Lapangan Real-Time</h3>
          <span className="text-muted font-weight-medium" style={{ fontSize: 12 }}>
            Pantau foto pembukaan tanah, realisasi pembelian barang PO, bibit, dan aktivitas petani langsung dari smartphone mandor
          </span>
        </div>
        <LiveFieldFeedHub
          currentUserRole="INVESTOR"
          currentUserName="H. Surya Pratama (Investor Utama)"
        />
      </div>
    </div>
  );
};
