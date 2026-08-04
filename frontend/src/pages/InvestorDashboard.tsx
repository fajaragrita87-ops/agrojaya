import { useEffect } from 'react';
import { getInvestorDashboard } from '../services/api';
import { TurbineLineChart, TurbineDonutChart, TurbineBarChart } from '../components/TurbineChart';
import { PlantationLifecycleProgress } from '../components/PlantationLifecycleProgress';
import { InvestorPOApprovalSummary } from '../components/InvestorPOApprovalSummary';

export const InvestorDashboard = () => {
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

  const opexAuditDetails = [
    {
      category: 'Upah Harian Petani Lapangan',
      nominal: 42000000,
      personInCharge: 'Budi Santoso, S.P.',
      status: 'TERBAYAR (SLA 100%)',
      bapLink: 'BAP-OPEX-2026-08',
      date: '03 Aug 2026'
    },
    {
      category: 'Pengadaan Pupuk NPK & Kapur Dolomit',
      nominal: 28000000,
      personInCharge: 'Ahmad Hidayat',
      status: 'VERIFIKASI AUDITOR',
      bapLink: 'BAP-PUPUK-2026-07',
      date: '01 Aug 2026'
    },
    {
      category: 'Perawatan Traktor & Irigasi Satelit',
      nominal: 15000000,
      personInCharge: 'Rahmat Hidayat',
      status: 'REVISI SELESAI',
      bapLink: 'BAP-ALAT-2026-06',
      date: '28 Jul 2026'
    }
  ];

  return (
    <div className="w-100 space-y-4">
      {/* Header Banner */}
      <div className="bg-white p-4 rounded-4 border shadow-sm d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
          <span className="badge bg-primary-subtle text-primary border border-primary px-3 py-1 rounded-pill uppercase font-weight-bold mb-2 d-inline-block" style={{ fontSize: 11 }}>
            <i className="ri-funds-box-line me-1"></i> PORTAL TRANSPARANSI PORTOFOLIO INVESTOR
          </span>
          <h2 className="page-header-title font-weight-extrabold text-dark mb-0" style={{ fontSize: 20, letterSpacing: '-0.3px' }}>
            Indikator Kinerja Utama (KPI) & Valuasi Portofolio Investasi
          </h2>
          <p className="text-secondary mb-0 font-weight-medium" style={{ fontSize: 13 }}>
            Laporan Akuntabilitas Finansial, Keamanan Modal, Kesiapan Fisik Lahan, & ROI Perkebunan AgroJaya Jonggol
          </p>
        </div>
        <span className="badge bg-success text-white px-3.5 py-2 rounded-pill font-weight-bold d-inline-flex align-items-center gap-1.5 shadow-sm" style={{ fontSize: 12 }}>
          <i className="ri-shield-check-fill text-white"></i> Terverifikasi Auditor 5D
        </span>
      </div>

      {/* KPI INVESTOR GRID (6 Bento Cards) */}
      <div className="row g-3">
        {/* KPI 1 */}
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card-box card-box-hover p-4 border bg-white h-100 rounded-4">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <span className="text-uppercase text-muted font-weight-bold" style={{ fontSize: 11, letterSpacing: '0.5px' }}>
                1. Modal Investasi Disetor
              </span>
              <div className="corpox-icon-box blue" style={{ width: 38, height: 38, fontSize: 18 }}>
                <i className="ri-bank-card-line"></i>
              </div>
            </div>
            <strong className="kpi-value font-weight-extrabold text-dark d-block mb-1">
              Rp 2.500.000.000
            </strong>
            <div className="progress mb-2" style={{ height: 6 }}>
              <div className="progress-bar bg-primary" style={{ width: '100%' }}></div>
            </div>
            <span className="d-block text-success font-weight-bold" style={{ fontSize: 11 }}>
              <i className="ri-checkbox-circle-fill me-1"></i> 100% Modal Disetor Terrealisasi Ke Lahan
            </span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card-box card-box-hover p-4 border bg-white h-100 rounded-4">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <span className="text-uppercase text-muted font-weight-bold" style={{ fontSize: 11, letterSpacing: '0.5px' }}>
                2. Estimasi Valuasi Portofolio
              </span>
              <div className="corpox-icon-box emerald" style={{ width: 38, height: 38, fontSize: 18 }}>
                <i className="ri-line-chart-line"></i>
              </div>
            </div>
            <strong className="kpi-value font-weight-extrabold text-success d-block mb-1">
              Rp 3.100.000.000
            </strong>
            <div className="progress mb-2" style={{ height: 6 }}>
              <div className="progress-bar bg-success" style={{ width: '124%' }}></div>
            </div>
            <span className="d-block text-success font-weight-bold" style={{ fontSize: 11 }}>
              <i className="ri-arrow-up-circle-fill me-1"></i> +24.0% Pertumbuhan Bersih (Capital Gain)
            </span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card-box card-box-hover p-4 border bg-white h-100 rounded-4">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <span className="text-uppercase text-muted font-weight-bold" style={{ fontSize: 11, letterSpacing: '0.5px' }}>
                3. Tingkat Keamanan Modal (LTV Ratio)
              </span>
              <div className="corpox-icon-box emerald" style={{ width: 38, height: 38, fontSize: 18 }}>
                <i className="ri-shield-user-line"></i>
              </div>
            </div>
            <strong className="kpi-value font-weight-extrabold text-dark d-block mb-1">
              88.5% Aman
            </strong>
            <div className="progress mb-2" style={{ height: 6 }}>
              <div className="progress-bar bg-success" style={{ width: '88.5%' }}></div>
            </div>
            <span className="d-block text-secondary font-weight-bold" style={{ fontSize: 11 }}>
              <i className="ri-map-pin-2-fill text-success me-1"></i> Dijamin Sertifikat Hak Fisik Lahan 2.0 Ha
            </span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card-box card-box-hover p-4 border bg-white h-100 rounded-4">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <span className="text-uppercase text-muted font-weight-bold" style={{ fontSize: 11, letterSpacing: '0.5px' }}>
                4. Kesiapan Fisik Perkebunan
              </span>
              <div className="corpox-icon-box amber" style={{ width: 38, height: 38, fontSize: 18 }}>
                <i className="ri-landscape-line"></i>
              </div>
            </div>
            <strong className="kpi-value font-weight-extrabold text-primary d-block mb-1">
              65.0% Siap Tanam/Panen
            </strong>
            <div className="progress mb-2" style={{ height: 6 }}>
              <div className="progress-bar bg-info" style={{ width: '65%' }}></div>
            </div>
            <span className="d-block text-primary font-weight-bold" style={{ fontSize: 11 }}>
              <i className="ri-time-fill me-1"></i> Tahap 4 & 5 Berjalan (Penanaman & Perawatan)
            </span>
          </div>
        </div>

        {/* KPI 5 */}
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card-box card-box-hover p-4 border bg-white h-100 rounded-4">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <span className="text-uppercase text-muted font-weight-bold" style={{ fontSize: 11, letterSpacing: '0.5px' }}>
                5. Biaya Operasional (Burn Rate)
              </span>
              <div className="corpox-icon-box amber" style={{ width: 38, height: 38, fontSize: 18 }}>
                <i className="ri-fire-line"></i>
              </div>
            </div>
            <strong className="kpi-value font-weight-extrabold text-dark d-block mb-1">
              Rp 85.000.000 / Bln
            </strong>
            <div className="progress mb-2" style={{ height: 6 }}>
              <div className="progress-bar bg-warning" style={{ width: '68%' }}></div>
            </div>
            <span className="d-block text-success font-weight-bold" style={{ fontSize: 11 }}>
              <i className="ri-check-line me-1"></i> Hemat 12% Dari Anggaran Maksimum Prospektus
            </span>
          </div>
        </div>

        {/* KPI 6 */}
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card-box card-box-hover p-4 border bg-white h-100 rounded-4">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <span className="text-uppercase text-muted font-weight-bold" style={{ fontSize: 11, letterSpacing: '0.5px' }}>
                6. Proyeksi Panen & Yield Q3
              </span>
              <div className="corpox-icon-box emerald" style={{ width: 38, height: 38, fontSize: 18 }}>
                <i className="ri-store-2-line"></i>
              </div>
            </div>
            <strong className="kpi-value font-weight-extrabold text-dark d-block mb-1">
              180.000 Kg Komoditas
            </strong>
            <div className="progress mb-2" style={{ height: 6 }}>
              <div className="progress-bar bg-success" style={{ width: '92%' }}></div>
            </div>
            <span className="d-block text-success font-weight-bold" style={{ fontSize: 11 }}>
              <i className="ri-check-double-fill me-1"></i> Target Yield Porang & Jagung Terpenuhi
            </span>
          </div>
        </div>

        {/* KPI 7 */}
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card-box card-box-hover p-4 border bg-white h-100 rounded-4">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <span className="text-uppercase text-muted font-weight-bold" style={{ fontSize: 11, letterSpacing: '0.5px' }}>
                7. Sisa Kas Aktif (Runway)
              </span>
              <div className="corpox-icon-box amber" style={{ width: 38, height: 38, fontSize: 18 }}>
                <i className="ri-wallet-3-line"></i>
              </div>
            </div>
            <strong className="kpi-value font-weight-extrabold text-warning d-block mb-1">
              Rp 120.000.000
            </strong>
            <div className="progress mb-2" style={{ height: 6 }}>
              <div className="progress-bar bg-warning" style={{ width: '100%' }}></div>
            </div>
            <span className="d-block text-warning font-weight-bold" style={{ fontSize: 11 }}>
              <i className="ri-shield-check-fill me-1"></i> Aman Hingga Panen Berikutnya
            </span>
          </div>
        </div>

        {/* KPI 8 */}
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card-box card-box-hover p-4 border bg-white h-100 rounded-4">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <span className="text-uppercase text-muted font-weight-bold" style={{ fontSize: 11, letterSpacing: '0.5px' }}>
                8. Waktu Balik Modal (ROI)
              </span>
              <div className="corpox-icon-box red" style={{ width: 38, height: 38, fontSize: 18 }}>
                <i className="ri-line-chart-line"></i>
              </div>
            </div>
            <strong className="kpi-value font-weight-extrabold text-danger d-block mb-1">
              18 Bulan
            </strong>
            <div className="progress mb-2" style={{ height: 6 }}>
              <div className="progress-bar bg-danger" style={{ width: '45%' }}></div>
            </div>
            <span className="d-block text-danger font-weight-bold" style={{ fontSize: 11 }}>
              <i className="ri-calendar-check-line me-1"></i> Proyeksi Siklus Panen Ke-3
            </span>
          </div>
        </div>
      </div>

      {/* Tahapan Kesiapan Lahan Stepper */}
      <PlantationLifecycleProgress />

      {/* Turbine UI Charts Section */}
      <div className="row g-4">
        <div className="col-12 col-lg-6">
          <TurbineLineChart
            title="Pertumbuhan Valuasi & Return Investasi (Juta Rp)"
            subtitle="Tren kenaikan valuasi portofolio disetor vs pertumbuhan nilai riil 6 bulan"
            data={roiChartData}
            color1="#059669"
            color2="#2563eb"
          />
        </div>
        <div className="col-12 col-lg-6">
          <TurbineDonutChart
            title="Alokasi Portofolio Per Komoditas"
            subtitle="Distribusi alokasi dana investasi per komoditas perkebunan"
            data={portfolioDonutData}
          />
        </div>
      </div>

      {/* Perfectly Balanced Row (Zero Whitespace) */}
      <div className="row g-4">
        <div className="col-12 col-lg-6">
          <div className="space-y-4">
            <TurbineBarChart
              title="Rincian Pengeluaran OPEX Kebun Utama"
              subtitle="Biaya operasional bulanan realisasi lapangan"
              data={burnRateBarData}
            />

            {/* Audit Details Table under Bar Chart to balance height with PO approval card */}
            <div className="bg-white p-4 rounded-4 border shadow-sm">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="font-weight-bold text-dark m-0" style={{ fontSize: 14 }}>
                  <i className="ri-file-list-3-line text-success me-1"></i> Audit Rincian OPEX Per Kategori (Auditor 5D)
                </h6>
                <span className="tmp-badge-card success" style={{ fontSize: 10 }}>EFISIENSI 12%</span>
              </div>
              <div className="table-responsive">
                <table className="table table-hover table-sm border align-middle m-0" style={{ fontSize: 12 }}>
                  <thead className="table-light">
                    <tr>
                      <th>Kategori OPEX</th>
                      <th className="text-end">Nominal</th>
                      <th>PJ Lapangan</th>
                      <th>Status Audit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {opexAuditDetails.map((det, i) => (
                      <tr key={i}>
                        <td className="font-weight-bold text-dark">{det.category}</td>
                        <td className="text-end font-weight-bold text-success">
                          Rp {det.nominal.toLocaleString('id-ID')}
                        </td>
                        <td>{det.personInCharge}</td>
                        <td>
                          <span className="badge bg-success-subtle text-success border border-success px-2 py-0.5" style={{ fontSize: 10 }}>
                            {det.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <InvestorPOApprovalSummary />
        </div>
      </div>
    </div>
  );
};
