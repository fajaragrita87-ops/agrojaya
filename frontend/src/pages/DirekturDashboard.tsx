import { useEffect } from 'react';
import { getDirekturDashboard } from '../services/api';
import { useRole } from '../context/RoleContext';
import { TurbineLineChart, TurbineDonutChart, TurbineBarChart } from '../components/TurbineChart';

export const DirekturDashboard = () => {
  const { role, userName } = useRole();

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

  const harvestYieldBarData = [
    { label: 'Blok A1 - Sawit Tenera (Panen)', value: 15000, color: '#059669' },
    { label: 'Blok A2 - Sawit Tenera (Perawatan)', value: 12000, color: '#10b981' },
    { label: 'Blok B1 - Jagung Hibrida (Tanam)', value: 8500, color: '#2563eb' },
    { label: 'Blok C1 - Anggur & Melon (Persiapan)', value: 5000, color: '#f59e0b' },
  ];

  return (
    <div className="w-100 space-y-4">
      {/* Header Banner */}
      <div className="bg-white p-4 p-md-5 rounded-4 border shadow-sm d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
          <span className="badge bg-success-subtle text-success border border-success px-3 py-1 rounded-pill uppercase font-weight-bold mb-2 d-inline-block" style={{ fontSize: 11 }}>
            <i className="ri-dashboard-3-line me-1"></i> PUSAT KONTROL EKSEKUTIF DIREKTUR UTAMA
          </span>
          <h2 className="h3 font-weight-extrabold text-dark mb-1">
            Indikator Kinerja Utama (KPI) Operasional & Strategis Kebun
          </h2>
          <p className="text-secondary mb-0 font-weight-medium" style={{ fontSize: 13 }}>
            Pusat Kendali Pengawasan Lahan, Realisasi OPEX, Persetujuan PO, & SLA Tim Lapangan ({userName} - {role})
          </p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <span className="badge bg-success text-white px-3 py-2 rounded-pill font-weight-bold d-inline-flex align-items-center gap-1.5 shadow-sm" style={{ fontSize: 12 }}>
            <i className="ri-checkbox-blank-circle-fill text-white animate-pulse" style={{ fontSize: 8 }}></i> GIS Satelit Aktif 24/7
          </span>
        </div>
      </div>

      {/* KPI DIREKTUR UTAMA GRID (6 Bento Cards - Clear & Explicit) */}
      <div className="row g-3">
        {/* KPI 1 */}
        <div className="col-12 col-sm-6 col-xl-4">
          <div className="card-box card-box-hover p-4 border bg-white h-100 rounded-4">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <span className="text-uppercase text-muted font-weight-bold" style={{ fontSize: 11, letterSpacing: '0.5px' }}>
                1. Total Lahan Terkelola
              </span>
              <div className="corpox-icon-box emerald" style={{ width: 38, height: 38, fontSize: 18 }}>
                <i className="ri-landscape-line"></i>
              </div>
            </div>
            <strong className="h3 font-weight-extrabold text-dark d-block mb-1" style={{ fontSize: 22 }}>
              2,0 Ha (12 Blok Kebun)
            </strong>
            <div className="progress mb-2" style={{ height: 6 }}>
              <div className="progress-bar bg-success" style={{ width: '100%' }}></div>
            </div>
            <span className="d-block text-success font-weight-bold" style={{ fontSize: 11 }}>
              <i className="ri-checkbox-circle-fill me-1"></i> 100% Terpetakan Geofencing GIS Satelit
            </span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="col-12 col-sm-6 col-xl-4">
          <div className="card-box card-box-hover p-4 border bg-white h-100 rounded-4">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <span className="text-uppercase text-muted font-weight-bold" style={{ fontSize: 11, letterSpacing: '0.5px' }}>
                2. Control Realisasi Budget OPEX
              </span>
              <div className="corpox-icon-box blue" style={{ width: 38, height: 38, fontSize: 18 }}>
                <i className="ri-wallet-3-line"></i>
              </div>
            </div>
            <strong className="h3 font-weight-extrabold text-dark d-block mb-1" style={{ fontSize: 22 }}>
              Rp 85 Jt / Rp 125 Jt
            </strong>
            <div className="progress mb-2" style={{ height: 6 }}>
              <div className="progress-bar bg-primary" style={{ width: '68%' }}></div>
            </div>
            <span className="d-block text-primary font-weight-bold" style={{ fontSize: 11 }}>
              <i className="ri-shield-check-line me-1"></i> 68% Penyerapan Budget (Efisiensi Tinggi)
            </span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="col-12 col-sm-6 col-xl-4">
          <div className="card-box card-box-hover p-4 border bg-white h-100 rounded-4">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <span className="text-uppercase text-muted font-weight-bold" style={{ fontSize: 11, letterSpacing: '0.5px' }}>
                3. Berkas Menunggu Approval Direktur
              </span>
              <div className="corpox-icon-box amber" style={{ width: 38, height: 38, fontSize: 18 }}>
                <i className="ri-error-warning-line"></i>
              </div>
            </div>
            <strong className="h3 font-weight-extrabold text-warning-emphasis d-block mb-1" style={{ fontSize: 22 }}>
              3 Dokumen PO / BAP
            </strong>
            <div className="progress mb-2" style={{ height: 6 }}>
              <div className="progress-bar bg-warning" style={{ width: '50%' }}></div>
            </div>
            <span className="d-block text-warning font-weight-bold" style={{ fontSize: 11 }}>
              <i className="ri-time-fill me-1"></i> Membutuhkan Persetujuan Tanda Tangan Direktur
            </span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="col-12 col-sm-6 col-xl-4">
          <div className="card-box card-box-hover p-4 border bg-white h-100 rounded-4">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <span className="text-uppercase text-muted font-weight-bold" style={{ fontSize: 11, letterSpacing: '0.5px' }}>
                4. Efisiensi Tenaga Kerja & Alat
              </span>
              <div className="corpox-icon-box emerald" style={{ width: 38, height: 38, fontSize: 18 }}>
                <i className="ri-user-follow-line"></i>
              </div>
            </div>
            <strong className="h3 font-weight-extrabold text-success d-block mb-1" style={{ fontSize: 22 }}>
              94.2% Efektivitas
            </strong>
            <div className="progress mb-2" style={{ height: 6 }}>
              <div className="progress-bar bg-success" style={{ width: '94.2%' }}></div>
            </div>
            <span className="d-block text-success font-weight-bold" style={{ fontSize: 11 }}>
              <i className="ri-check-double-line me-1"></i> Jam Kerja Petani & Traktor Optimal
            </span>
          </div>
        </div>

        {/* KPI 5 */}
        <div className="col-12 col-sm-6 col-xl-4">
          <div className="card-box card-box-hover p-4 border bg-white h-100 rounded-4">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <span className="text-uppercase text-muted font-weight-bold" style={{ fontSize: 11, letterSpacing: '0.5px' }}>
                5. Taksasi Yield Panen Bulan Ini
              </span>
              <div className="corpox-icon-box blue" style={{ width: 38, height: 38, fontSize: 18 }}>
                <i className="ri-plant-line"></i>
              </div>
            </div>
            <strong className="h3 font-weight-extrabold text-dark d-block mb-1" style={{ fontSize: 22 }}>
              40.500 Kg Hasil Kebun
            </strong>
            <div className="progress mb-2" style={{ height: 6 }}>
              <div className="progress-bar bg-primary" style={{ width: '85%' }}></div>
            </div>
            <span className="d-block text-primary font-weight-bold" style={{ fontSize: 11 }}>
              <i className="ri-truck-line me-1"></i> Siap Kirim Ke PKS & Pasar Induk
            </span>
          </div>
        </div>

        {/* KPI 6 */}
        <div className="col-12 col-sm-6 col-xl-4">
          <div className="card-box card-box-hover p-4 border bg-white h-100 rounded-4">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <span className="text-uppercase text-muted font-weight-bold" style={{ fontSize: 11, letterSpacing: '0.5px' }}>
                6. Tingkat Kepatuhan SLA Kebun
              </span>
              <div className="corpox-icon-box emerald" style={{ width: 38, height: 38, fontSize: 18 }}>
                <i className="ri-timer-flash-line"></i>
              </div>
            </div>
            <strong className="h3 font-weight-extrabold text-success d-block mb-1" style={{ fontSize: 22 }}>
              98.0% Tepat Waktu
            </strong>
            <div className="progress mb-2" style={{ height: 6 }}>
              <div className="progress-bar bg-success" style={{ width: '98%' }}></div>
            </div>
            <span className="d-block text-success font-weight-bold" style={{ fontSize: 11 }}>
              <i className="ri-shield-star-line me-1"></i> Zero Incident & Bebas Overbudget
            </span>
          </div>
        </div>
      </div>

      {/* Turbine Charts Section */}
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

      <div className="row g-4">
        <div className="col-12">
          <TurbineBarChart
            title="Taksasi & Realisasi Panen Per Blok Kebun (Kg)"
            subtitle="Hasil produksi fisik per blok komoditas AgroJaya Jonggol"
            data={harvestYieldBarData}
          />
        </div>
      </div>
    </div>
  );
};
