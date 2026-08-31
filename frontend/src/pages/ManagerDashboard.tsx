import React from 'react';
import { useRole } from '../context/RoleContext';
import { Link } from 'react-router-dom';
import { TurbineBarChart } from '../components/TurbineChart';

export const ManagerDashboard: React.FC = () => {
  const { userName } = useRole();

  // Yield harvest data per block for operations manager
  const harvestYieldData = [
    { label: 'Blok A1 (Anggur)', value: 3500 },
    { label: 'Blok A2 (Porang)', value: 45000 },
    { label: 'Blok B1 (Melon)', value: 15000 },
  ];

  return (
    <div className="w-100 space-y-4">
      {/* Header Banner Manajer Operasional */}
      <div className="card-box p-4 rounded-4 bg-white border shadow-sm d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
          <span className="badge bg-primary-subtle text-primary border border-primary px-2.5 py-1 rounded-pill uppercase font-weight-bold mb-1.5 d-inline-block" style={{ fontSize: 11 }}>
            <i className="ri-dashboard-3-line me-1"></i> MANAJEMEN OPERASIONAL KEBUN & LOGISTIK
          </span>
          <h2 className="page-header-title font-weight-bold text-dark mb-0" style={{ fontSize: 20 }}>
            Dasbor Operasional — {userName}
          </h2>
        </div>

        <div className="d-flex align-items-center gap-2">
          <Link
            to="/po-transparency"
            className="btn btn-primary text-white font-weight-bold px-3 py-2 rounded-3 shadow-xs d-inline-flex align-items-center gap-1.5"
            style={{ fontSize: 12 }}
          >
            <i className="ri-file-add-line"></i>
            <span>Buat Pengajuan PO Baru</span>
          </Link>
        </div>
      </div>

      {/* 4 KPI Manajer Operasional */}
      <div className="row g-3">
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card-box p-3.5 border bg-white rounded-4 shadow-sm h-100">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <span className="text-uppercase text-muted font-weight-bold" style={{ fontSize: 10.5 }}>Taksasi Hasil Panen</span>
              <div className="corpox-icon-box emerald" style={{ width: 34, height: 34, fontSize: 16 }}>
                <i className="ri-plant-line"></i>
              </div>
            </div>
            <strong className="text-dark font-weight-extrabold d-block" style={{ fontSize: 20 }}>
              63.500 Kg
            </strong>
            <span className="text-success font-weight-bold" style={{ fontSize: 11 }}>
              <i className="ri-arrow-up-line me-0.5"></i> Target Tercapai 94%
            </span>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card-box p-3.5 border bg-white rounded-4 shadow-sm h-100">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <span className="text-uppercase text-muted font-weight-bold" style={{ fontSize: 10.5 }}>Tenaga Kerja Aktif</span>
              <div className="corpox-icon-box blue" style={{ width: 34, height: 34, fontSize: 16 }}>
                <i className="ri-group-line"></i>
              </div>
            </div>
            <strong className="text-dark font-weight-extrabold d-block" style={{ fontSize: 20 }}>
              15 Personel
            </strong>
            <span className="text-primary font-weight-bold" style={{ fontSize: 11 }}>
              <i className="ri-calendar-check-line me-0.5"></i> 14 Hadir Hari Ini (93%)
            </span>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card-box p-3.5 border bg-white rounded-4 shadow-sm h-100">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <span className="text-uppercase text-muted font-weight-bold" style={{ fontSize: 10.5 }}>Stok Gudang Kritis</span>
              <div className="corpox-icon-box red" style={{ width: 34, height: 34, fontSize: 16 }}>
                <i className="ri-alert-line"></i>
              </div>
            </div>
            <strong className="text-danger font-weight-extrabold d-block" style={{ fontSize: 20 }}>
              2 Item Menipis
            </strong>
            <span className="text-danger font-weight-bold" style={{ fontSize: 11 }}>
              <i className="ri-error-warning-line me-0.5"></i> Dolomit & Biopestisida
            </span>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card-box p-3.5 border bg-white rounded-4 shadow-sm h-100">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <span className="text-uppercase text-muted font-weight-bold" style={{ fontSize: 10.5 }}>Pengajuan PO Belanja</span>
              <div className="corpox-icon-box amber" style={{ width: 34, height: 34, fontSize: 16 }}>
                <i className="ri-file-shield-line"></i>
              </div>
            </div>
            <strong className="text-warning-emphasis font-weight-extrabold d-block" style={{ fontSize: 20 }}>
              1 PO Menunggu
            </strong>
            <span className="text-warning-emphasis font-weight-bold" style={{ fontSize: 11 }}>
              <i className="ri-time-line me-0.5"></i> Review Finance & Direksi
            </span>
          </div>
        </div>
      </div>

      {/* Row 2: Yield Chart & Ringkasan Stok Gudang */}
      <div className="row g-4">
        <div className="col-12 col-lg-7">
          <div className="card-box p-4 rounded-4 bg-white border shadow-sm h-100">
            <TurbineBarChart
              title="Taksasi Hasil Panen Per Blok Komoditas (Kg)"
              subtitle="Target estimasi tonase hasil panen yang siap didistribusikan ke offtaker"
              data={harvestYieldData}
            />
          </div>
        </div>

        <div className="col-12 col-lg-5">
          <div className="card-box p-4 rounded-4 bg-white border shadow-sm space-y-3 h-100">
            <div className="d-flex justify-content-between align-items-center pb-2 border-bottom">
              <h4 className="font-weight-bold text-dark m-0 !text-sm">
                <i className="ri-archive-line text-primary me-1.5"></i> Status Bahan Baku Gudang Utama
              </h4>
              <Link to="/inventory" className="btn btn-sm btn-outline-secondary font-weight-bold rounded-2" style={{ fontSize: 11 }}>
                Lihat Gudang
              </Link>
            </div>

            <div className="space-y-2.5">
              {[
                { name: 'Pupuk NPK 16-16-16 High Grade', stock: '1.850 Kg', min: '300 Kg', status: 'AMAN' },
                { name: 'Bibit Porang Sertifikasi BSM', stock: '450 Batang', min: '100 Batang', status: 'AMAN' },
                { name: 'BBM Solar B35 Traktor Kubota', stock: '680 Liter', min: '200 Liter', status: 'AMAN' },
                { name: 'Biopestisida Trikoderma', stock: '35 Liter', min: '50 Liter', status: 'MENIPIS' },
                { name: 'Kapur Dolomit Netralisasi pH', stock: '80 Kg', min: '500 Kg', status: 'KRITIS' },
              ].map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-3 border bg-light d-flex justify-content-between align-items-center">
                  <div>
                    <strong className="text-dark d-block" style={{ fontSize: 12.5 }}>{item.name}</strong>
                    <span className="text-muted" style={{ fontSize: 11 }}>Sisa: <b>{item.stock}</b> (Min: {item.min})</span>
                  </div>
                  <span className={`badge px-2 py-0.5 rounded-pill font-weight-bold ${item.status === 'AMAN' ? 'bg-success text-white' : item.status === 'MENIPIS' ? 'bg-warning text-dark' : 'bg-danger text-white'}`} style={{ fontSize: 10 }}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Logistik Pengiriman Panen ke Timbangan PKS */}
      <div className="card-box p-4 rounded-4 bg-white border shadow-sm space-y-3">
        <div className="d-flex justify-content-between align-items-center pb-2 border-bottom">
          <div>
            <h4 className="font-weight-bold text-dark m-0 !text-sm">
              <i className="ri-truck-line text-success me-1.5"></i> Logistik Pengiriman & Tiket Timbangan Hasil Panen
            </h4>
            <span className="text-muted" style={{ fontSize: 12 }}>
              Riwayat tonase netto kendaraan angkut hasil kebun Jonggol
            </span>
          </div>
          <Link to="/weighbridge" className="btn btn-sm btn-outline-success font-weight-bold rounded-2" style={{ fontSize: 11.5 }}>
            Buka Jembatan Timbang
          </Link>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0" style={{ fontSize: 12.5 }}>
            <thead className="table-light">
              <tr style={{ fontSize: 11.5 }}>
                <th>NO. TIKET</th>
                <th>KOMODITAS</th>
                <th>ASAL BLOK</th>
                <th>SUPIR & PLAT NO.</th>
                <th>BERAT BRUTO</th>
                <th>BERAT TARRA</th>
                <th>TONASE NETTO</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {[
                { ticket: 'WB-2026-0801', crop: 'Porang Basah Grade A', block: 'Blok A2', driver: 'Yanto (B 9182 TDA)', bruto: '8.450 Kg', tarra: '3.200 Kg', netto: '5.250 Kg', status: 'SELESAI TIMBANG' },
                { ticket: 'WB-2026-0728', crop: 'Jagung Hibrida Pioneer', block: 'Blok B1', driver: 'Agus (F 8821 KK)', bruto: '6.800 Kg', tarra: '3.100 Kg', netto: '3.700 Kg', status: 'SELESAI TIMBANG' },
                { ticket: 'WB-2026-0720', crop: 'Melon Intanon Golden', block: 'Blok B1', driver: 'Hendro (B 9012 BB)', bruto: '5.100 Kg', tarra: '2.900 Kg', netto: '2.200 Kg', status: 'SELESAI TIMBANG' },
              ].map((row, idx) => (
                <tr key={idx}>
                  <td><span className="badge bg-light text-dark border font-mono">{row.ticket}</span></td>
                  <td className="font-weight-bold text-dark">{row.crop}</td>
                  <td className="text-secondary">{row.block}</td>
                  <td className="text-dark">{row.driver}</td>
                  <td className="font-mono text-muted">{row.bruto}</td>
                  <td className="font-mono text-muted">{row.tarra}</td>
                  <td className="font-weight-bold text-success font-mono">{row.netto}</td>
                  <td>
                    <span className="badge bg-success-subtle text-success border border-success font-weight-bold" style={{ fontSize: 10.5 }}>
                      {row.status}
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
