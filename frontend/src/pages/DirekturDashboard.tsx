import { useEffect, useState } from 'react';
import { getDirekturDashboard, getLands, getFinancials } from '../services/api';
import { useRole } from '../context/RoleContext';
import { TurbineLineChart, TurbineDonutChart, TurbineBarChart } from '../components/TurbineChart';
import { InteractiveGisMap } from '../components/InteractiveGisMap';
import { FinancialLedgerShowcase } from '../components/FinancialLedgerShowcase';
import { PurchaseOrderInventoryShowcase } from '../components/PurchaseOrderInventoryShowcase';
import { DailyTasklistCalendar } from '../components/DailyTasklistCalendar';

export const DirekturDashboard = () => {
  const [data, setData] = useState<any>(null);
  const [lands, setLands] = useState<any[]>([]);
  const [financials, setFinancials] = useState<any[]>([]);
  const [activeLat, setActiveLat] = useState('-6.4697');
  const [activeLng, setActiveLng] = useState('107.0544');
  const { role } = useRole();

  useEffect(() => {
    getDirekturDashboard().then((res) => setData(res.data)).catch(console.error);
    getLands()
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setLands(res.data);
          if (res.data[0].latitude) {
            setActiveLat(String(res.data[0].latitude));
            setActiveLng(String(res.data[0].longitude));
          }
        } else {
          setLands([
            { id: '1', name: 'Blok A1 - Kebun Anggur Impor & Greenhouse (1000m²)', areaHa: 0.1, soilType: 'Humus Organik Greenhouse', latitude: '-6.4715', longitude: '107.0535', status: 'AKTIF' },
            { id: '2', name: 'Blok A2 - Tanam Hibrida Utama (2.0 Ha)', areaHa: 2.0, soilType: 'Latosol Subur Jonggol Bogor', latitude: '-6.4697', longitude: '107.0544', status: 'AKTIF' },
            { id: '3', name: 'Blok B1 - Hortikultura Melon Premium (5000m²)', areaHa: 0.5, soilType: 'Aluvial Organik Jonggol', latitude: '-6.4680', longitude: '107.0560', status: 'PANEN' },
          ]);
        }
      })
      .catch((e) => {
        console.error(e);
        setLands([
          { id: '1', name: 'Blok A1 - Kebun Anggur Impor & Greenhouse (1000m²)', areaHa: 0.1, soilType: 'Humus Organik Greenhouse', latitude: '-6.4715', longitude: '107.0535', status: 'AKTIF' },
          { id: '2', name: 'Blok A2 - Tanam Hibrida Utama (2.0 Ha)', areaHa: 2.0, soilType: 'Latosol Subur Jonggol Bogor', latitude: '-6.4697', longitude: '107.0544', status: 'AKTIF' },
          { id: '3', name: 'Blok B1 - Hortikultura Melon Premium (5000m²)', areaHa: 0.5, soilType: 'Aluvial Organik Jonggol', latitude: '-6.4680', longitude: '107.0560', status: 'PANEN' },
        ]);
      });
    getFinancials()
      .then((res) => {
        if (res.data && res.data.data) {
          setFinancials(res.data.data);
        }
      })
      .catch(console.error);
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

  const handleExportPDF = () => {
    alert('Mengunduh Laporan Terpadu 5-Dimensi Auditor & Laporan Keuangan Investor (PDF)...');
  };

  return (
    <div className="w-100 space-y-4">
      {/* Header Banner (Corpox Solar Style) */}
      <div className="bg-white p-4 p-md-5 rounded-4 border shadow-sm d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
          <span className="badge bg-success-subtle text-success border border-success px-3 py-1 rounded-pill uppercase font-weight-bold mb-2 d-inline-block" style={{ fontSize: 11 }}>
            <i className="ri-dashboard-3-line me-1"></i> PUSAT KONTROL UTAMA
          </span>
          <h2 className="h3 font-weight-bold text-dark mb-1">Dasbor Operasional & Strategis Kebun</h2>
          <p className="text-secondary mb-0" style={{ fontSize: 14 }}>
            Pusat Kontrol Operasional & Ringkasan Eksekutif Perkebunan AgroJaya (Mode {role})
          </p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <span className="badge bg-success text-white px-3 py-2 rounded-pill font-weight-bold d-inline-flex align-items-center gap-1.5 shadow-sm" style={{ fontSize: 12 }}>
            <i className="ri-checkbox-blank-circle-fill text-white animate-pulse" style={{ fontSize: 8 }}></i> Terhubung Satelit GIS Kebun
          </span>
        </div>
      </div>

      {/* Corpox Stat Box Widgets (4 Cards Full Width) */}
      <div className="row g-4">
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="bg-white p-4 rounded-4 border shadow-sm d-flex align-items-center justify-content-between h-100">
            <div>
              <span className="text-uppercase text-muted font-weight-bold d-block mb-1" style={{ fontSize: 11 }}>Total Lahan / Blok</span>
              <strong className="h3 font-weight-extrabold text-dark m-0">{data?.metrics?.totalLands || 12} Blok</strong>
              <span className="d-block text-success font-weight-bold mt-1.5" style={{ fontSize: 12 }}>
                <i className="ri-arrow-up-line me-1"></i> 100% Terintegrasi Satelit GIS
              </span>
            </div>
            <div style={{ width: 48, height: 48, backgroundColor: '#dcfce7', color: '#059669', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
              <i className="ri-landscape-line"></i>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="bg-white p-4 rounded-4 border shadow-sm d-flex align-items-center justify-content-between h-100">
            <div>
              <span className="text-uppercase text-muted font-weight-bold d-block mb-1" style={{ fontSize: 11 }}>Siklus Tanam Aktif</span>
              <strong className="h3 font-weight-extrabold text-dark m-0">{data?.metrics?.activeCycles || 5} Siklus</strong>
              <span className="d-block text-primary font-weight-bold mt-1.5" style={{ fontSize: 12 }}>
                <i className="ri-calendar-event-line me-1"></i> Estimasi Panen Bulan Ini
              </span>
            </div>
            <div style={{ width: 48, height: 48, backgroundColor: '#dbeafe', color: '#2563eb', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
              <i className="ri-plant-line"></i>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="bg-white p-4 rounded-4 border shadow-sm d-flex align-items-center justify-content-between h-100">
            <div>
              <span className="text-uppercase text-muted font-weight-bold d-block mb-1" style={{ fontSize: 11 }}>Anggaran OPEX Bulanan</span>
              <strong className="h3 font-weight-extrabold text-dark m-0">Rp 125M</strong>
              <span className="d-block text-success font-weight-bold mt-1.5" style={{ fontSize: 12 }}>
                <i className="ri-check-double-line me-1"></i> Sesuai Anggaran Prospektus
              </span>
            </div>
            <div style={{ width: 48, height: 48, backgroundColor: '#e0e7ff', color: '#4f46e5', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
              <i className="ri-wallet-3-line"></i>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="bg-white p-4 rounded-4 border shadow-sm d-flex align-items-center justify-content-between h-100">
            <div>
              <span className="text-uppercase text-muted font-weight-bold d-block mb-1" style={{ fontSize: 11 }}>Persetujuan Menunggu</span>
              <strong className="h3 font-weight-extrabold text-warning-emphasis m-0">{data?.metrics?.pendingApprovalsCount || 3} Berkas</strong>
              <span className="d-block text-warning font-weight-bold mt-1.5" style={{ fontSize: 12 }}>
                <i className="ri-time-line me-1"></i> Membutuhkan Tindakan
              </span>
            </div>
            <div style={{ width: 48, height: 48, backgroundColor: '#fef3c7', color: '#d97706', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
              <i className="ri-error-warning-line"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Corpox Charts Section */}
      <div className="row g-4">
        <div className="col-lg-6">
          <TurbineLineChart
            title="Perkembangan Kinerja Keuangan Kebun (Juta Rp)"
            subtitle="Tren perbandingan Pendapatan vs Beban Biaya Operasional"
            data={executiveFinancialChartData}
            color1="#059669"
            color2="#dc2626"
            legend1="Pendapatan (Revenue)"
            legend2="Beban Biaya (Expense)"
          />
        </div>

        <div className="col-lg-6">
          <TurbineDonutChart
            title="Struktur Alokasi Biaya Operasional (OPEX)"
            subtitle="Persentase pembagian anggaran operasional perkebunan"
            data={opexBreakdownDonutData}
          />
        </div>
      </div>

      <TurbineBarChart
        title="Proyeksi & Hasil Panen Per Blok Kebun (Kg)"
        subtitle="Analisis volume hasil panen komoditas per blok lahan"
        data={harvestYieldBarData}
      />

      {/* GIS Satelit Google Maps Live */}
      <div className="bg-white p-4 p-md-5 rounded-4 border shadow-sm space-y-3">
        <div className="d-flex justify-content-between align-items-center pb-3 border-bottom">
          <h4 className="font-weight-bold text-dark m-0" style={{ fontSize: 18 }}>
            <i className="ri-map-pin-2-line text-success me-2"></i> Peta Satelit GIS Kebun & Pemetaan Blok (Google Maps Live)
          </h4>
          <span className="badge bg-success-subtle text-success border border-success px-3 py-1 font-weight-bold">
            Pemetaan Lahan Aktif ({lands.length} Blok)
          </span>
        </div>
        <InteractiveGisMap
          lands={lands}
          activeLat={activeLat}
          activeLng={activeLng}
          onCoordinatesChange={(lat, lng) => {
            setActiveLat(lat);
            setActiveLng(lng);
          }}
        />
      </div>

      {/* Daily Tasklist & Calendar Schedule with Mandatory SOP Reminders */}
      <DailyTasklistCalendar />

      {/* Inventaris Kebun & Log Pengajuan Purchase Order (PO) */}
      <PurchaseOrderInventoryShowcase />

      {/* Modern Executive Financial Ledger Showcase */}
      <FinancialLedgerShowcase financials={financials} onExportPDF={handleExportPDF} />
    </div>
  );
};
