import { useEffect, useState } from 'react';
import { getInvestorDashboard } from '../services/api';
import { TurbineLineChart, TurbineDonutChart, TurbineBarChart } from '../components/TurbineChart';
import { PlantationLifecycleProgress } from '../components/PlantationLifecycleProgress';

export const InvestorDashboard = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getInvestorDashboard().then((res) => setData(res.data)).catch(console.error);
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
    { label: 'Kelapa Sawit (Blok A1-A2)', value: 45, color: '#059669' },
    { label: 'Jagung Hibrida (Blok B1-B2)', value: 30, color: '#2563eb' },
    { label: 'Anggur & Melon (Blok C1-D1)', value: 25, color: '#f59e0b' },
  ];

  const burnRateBarData = [
    { label: 'Upah Harian Petani Lapangan', value: 42000000, color: '#059669' },
    { label: 'Pengadaan Pupuk NPK & Kapur Dolomit', value: 28000000, color: '#2563eb' },
    { label: 'Perawatan Traktor & Irigasi Satelit', value: 15000000, color: '#f59e0b' },
  ];

  return (
    <div className="w-100 space-y-4">
      {/* Header Banner */}
      <div className="bg-white p-4 rounded-4 border shadow-sm d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
          <span className="badge bg-primary-subtle text-primary border border-primary px-2.5 py-1 rounded-pill uppercase font-weight-bold mb-1.5 d-inline-block" style={{ fontSize: 11 }}>
            <i className="ri-funds-box-line me-1"></i> DASBOR PORTOFOLIO INVESTOR
          </span>
          <h2 className="font-weight-bold text-dark mb-1" style={{ fontSize: 18 }}>Portal Transparansi Investasi & Valuasi Kebun</h2>
          <p className="text-secondary mb-0" style={{ fontSize: 13 }}>
            Ringkasan Eksekutif Valuasi, Kesiapan Fisik Lahan, & Proyeksi Return Investasi AgroJaya
          </p>
        </div>
        <span className="badge bg-primary text-white px-3 py-2 rounded-pill font-weight-bold d-inline-flex align-items-center gap-1.5 shadow-sm" style={{ fontSize: 11 }}>
          <i className="ri-lock-line"></i> Akses Khusus Investor (Read-Only)
        </span>
      </div>

      {/* Financial Macro Metrics */}
      <div className="row g-4">
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="bg-white p-4 rounded-4 border shadow-sm d-flex align-items-center justify-content-between h-100">
            <div>
              <span className="text-uppercase text-muted font-weight-bold d-block mb-1" style={{ fontSize: 11 }}>Total Modal Disetor</span>
              <strong className="h3 font-weight-extrabold text-dark m-0" style={{ fontSize: 20 }}>Rp 2.5 M</strong>
              <span className="d-block text-secondary font-weight-bold mt-1.5" style={{ fontSize: 12 }}>Alokasi Modal Kerja Lahan</span>
            </div>
            <div style={{ width: 44, height: 44, backgroundColor: '#dbeafe', color: '#2563eb', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
              <i className="ri-bank-card-line"></i>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="bg-white p-4 rounded-4 border shadow-sm d-flex align-items-center justify-content-between h-100">
            <div>
              <span className="text-uppercase text-muted font-weight-bold d-block mb-1" style={{ fontSize: 11 }}>Estimasi Valuasi Portofolio</span>
              <strong className="h3 font-weight-extrabold text-success m-0" style={{ fontSize: 20 }}>Rp 3.1 M</strong>
              <span className="d-block text-success font-weight-bold mt-1.5" style={{ fontSize: 12 }}>
                <i className="ri-arrow-up-line me-1"></i> +24.0% Net Growth
              </span>
            </div>
            <div style={{ width: 44, height: 44, backgroundColor: '#dcfce7', color: '#059669', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
              <i className="ri-line-chart-line"></i>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="bg-white p-4 rounded-4 border shadow-sm d-flex align-items-center justify-content-between h-100">
            <div>
              <span className="text-uppercase text-muted font-weight-bold d-block mb-1" style={{ fontSize: 11 }}>Biaya Operasional (Burn Rate)</span>
              <strong className="h3 font-weight-extrabold text-dark m-0" style={{ fontSize: 20 }}>Rp 85 M / Bkn</strong>
              <span className="d-block text-secondary font-weight-bold mt-1.5" style={{ fontSize: 12 }}>Sesuai Prospektus Investasi</span>
            </div>
            <div style={{ width: 44, height: 44, backgroundColor: '#f1f5f9', color: '#475569', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
              <i className="ri-fire-line"></i>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="bg-white p-4 rounded-4 border shadow-sm d-flex align-items-center justify-content-between h-100">
            <div>
              <span className="text-uppercase text-muted font-weight-bold d-block mb-1" style={{ fontSize: 11 }}>Proyeksi Hasil Panen Q3</span>
              <strong className="h3 font-weight-extrabold text-dark m-0" style={{ fontSize: 20 }}>180.000 Kg</strong>
              <span className="d-block text-success font-weight-bold mt-1.5" style={{ fontSize: 12 }}>Target Yield Terpenuhi</span>
            </div>
            <div style={{ width: 44, height: 44, backgroundColor: '#fef3c7', color: '#d97706', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
              <i className="ri-store-2-line"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Investor Dedicated Physical Readiness & Plantation Lifecycle Progress Stepper */}
      <PlantationLifecycleProgress />

      {/* Turbine UI Charts Section (Investor Mode) */}
      <div className="row g-4">
        <div className="col-12 col-lg-6">
          <TurbineLineChart
            title="Pertumbuhan Valuasi & Return Investasi (Juta Rp)"
            subtitle="Tren kenaikan valuasi portofolio disetor vs pertumbuhan nilai riil 6 bulan"
            data={roiChartData}
            color1="#059669"
            color2="#2563eb"
            legend1="Valuasi Riil"
            legend2="Modal Disetor"
          />
        </div>

        <div className="col-12 col-lg-6">
          <TurbineDonutChart
            title="Alokasi Kapital Investasi Per Komoditas (%)"
            subtitle="Distribusi persentase modal yang disebar pada blok tanam"
            data={portfolioDonutData}
          />
        </div>
      </div>

      <TurbineBarChart
        title="Breakdown Pengeluaran Bulanan (Monthly Burn Rate - Rp)"
        subtitle="Analisis efisiensi biaya operasional bulanan kebun"
        data={burnRateBarData}
      />

      {/* Portfolio Summary Table (Macro Land Allocation) */}
      <div className="bg-white rounded-4 border shadow-sm p-4 overflow-hidden">
        <div className="d-flex justify-content-between align-items-center pb-3 mb-3 border-bottom">
          <h4 className="font-weight-bold text-dark m-0 d-flex align-items-center gap-2" style={{ fontSize: 15 }}>
            <i className="ri-pie-chart-2-line text-primary"></i> Alokasi & Performa Portofolio Lahan Investasi
          </h4>
          <span className="badge bg-light text-dark border font-weight-bold" style={{ fontSize: 11 }}>Read-Only Verified</span>
        </div>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0" style={{ fontSize: 13 }}>
            <thead className="table-light">
              <tr>
                <th>Proyek Lahan</th>
                <th>Luas (Ha)</th>
                <th>Kapital Disetor</th>
                <th>Proyeksi Pendapatan Panen</th>
                <th>Status Operasional</th>
              </tr>
            </thead>
            <tbody>
              {data?.portfolioSummary?.map((item: any, idx: number) => (
                <tr key={idx}>
                  <td className="font-weight-bold text-dark">{item.landName}</td>
                  <td className="text-secondary">{item.areaHa} Ha</td>
                  <td className="text-dark font-weight-bold">Rp {item.investedCapital.toLocaleString('id-ID')}</td>
                  <td className="text-success font-weight-bold">Rp {item.projectedRevenue.toLocaleString('id-ID')}</td>
                  <td>
                    <span className="badge bg-success text-white font-weight-bold" style={{ fontSize: 11 }}>
                      {item.status}
                    </span>
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
