import React, { useState } from 'react';
import { useRole } from '../context/RoleContext';
import { Link } from 'react-router-dom';

export const KepalaKebunDashboard: React.FC = () => {
  const { userName } = useRole();

  // Mock pending daily field activities submitted by farmers
  const [farmerActivities, setFarmerActivities] = useState([
    {
      id: 'ACT-001',
      farmerName: 'Sutrisno',
      block: 'Blok A1 - Greenhouse Anggur',
      activity: 'Penyiraman Irigasi Tetes & Pengecekan Nozzle Drip',
      time: '08:30 WIB',
      photo: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=400&q=80',
      status: 'PENDING',
    },
    {
      id: 'ACT-002',
      farmerName: 'Bambang Irawan',
      block: 'Blok A2 - Lahan Porang Hibrida',
      activity: 'Penyiangan Gulma Bedengan 1-12 & Pembumbunan',
      time: '09:15 WIB',
      photo: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=400&q=80',
      status: 'PENDING',
    },
    {
      id: 'ACT-003',
      farmerName: 'Agus Riyadi',
      block: 'Blok B1 - Kebun Melon Intanon',
      activity: 'Pemangkasan Tunas Air & Pemasangan Ajir Bambu',
      time: '10:00 WIB',
      photo: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=400&q=80',
      status: 'PENDING',
    },
    {
      id: 'ACT-004',
      farmerName: 'Dedi Kurniawan',
      block: 'Gudang & Jalur Irigasi Utama',
      activity: 'Pengecekan Filter Pompa Induk & Toren Air Nutrisi',
      time: '11:20 WIB',
      photo: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=400&q=80',
      status: 'VERIFIED',
    },
  ]);

  const handleVerifyActivity = (id: string) => {
    setFarmerActivities((prev) =>
      prev.map((act) => (act.id === id ? { ...act, status: 'VERIFIED' } : act))
    );
    alert('Laporan aktivitas kerja petani berhasil diverifikasi!');
  };

  const pendingCount = farmerActivities.filter((a) => a.status === 'PENDING').length;

  return (
    <div className="w-100 space-y-4">
      {/* Header Banner Kepala Kebun */}
      <div className="card-box p-4 rounded-4 bg-white border shadow-sm d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
          <span className="badge bg-success-subtle text-success border border-success px-2.5 py-1 rounded-pill uppercase font-weight-bold mb-1.5 d-inline-block" style={{ fontSize: 11 }}>
            <i className="ri-shield-user-line me-1"></i> PENGAWASAN LAPANGAN & BUDIDAYA KEBUN
          </span>
          <h2 className="page-header-title font-weight-bold text-dark mb-0" style={{ fontSize: 20 }}>
            Dasbor Supervisi Lapangan — {userName}
          </h2>
        </div>

        <div className="d-flex align-items-center gap-2">
          <Link
            to="/plantation-lifecycle"
            className="btn btn-success text-white font-weight-bold px-3 py-2 rounded-3 shadow-xs d-inline-flex align-items-center gap-1.5"
            style={{ fontSize: 12 }}
          >
            <i className="ri-plant-line"></i>
            <span>Update Progres 8 Tahap Lahan</span>
          </Link>
        </div>
      </div>

      {/* 4 KPI Operasional Lapangan (NO Financial Leakage) */}
      <div className="row g-3">
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card-box p-3.5 border bg-white rounded-4 shadow-sm h-100">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <span className="text-uppercase text-muted font-weight-bold" style={{ fontSize: 10.5 }}>Blok Terkelola</span>
              <div className="corpox-icon-box emerald" style={{ width: 34, height: 34, fontSize: 16 }}>
                <i className="ri-landscape-line"></i>
              </div>
            </div>
            <strong className="text-dark font-weight-extrabold d-block" style={{ fontSize: 20 }}>
              3 Blok Aktif (2.6 Ha)
            </strong>
            <span className="text-success font-weight-bold" style={{ fontSize: 11 }}>
              <i className="ri-check-line me-0.5"></i> Blok A1, A2, & B1 Terpantau
            </span>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card-box p-3.5 border bg-white rounded-4 shadow-sm h-100">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <span className="text-uppercase text-muted font-weight-bold" style={{ fontSize: 10.5 }}>Kehadiran Petani</span>
              <div className="corpox-icon-box blue" style={{ width: 34, height: 34, fontSize: 16 }}>
                <i className="ri-team-line"></i>
              </div>
            </div>
            <strong className="text-dark font-weight-extrabold d-block" style={{ fontSize: 20 }}>
              14 / 15 Hadir (93%)
            </strong>
            <span className="text-primary font-weight-bold" style={{ fontSize: 11 }}>
              <i className="ri-user-follow-line me-0.5"></i> 1 Orang Izin Sakit
            </span>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card-box p-3.5 border bg-white rounded-4 shadow-sm h-100">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <span className="text-uppercase text-muted font-weight-bold" style={{ fontSize: 10.5 }}>Verifikasi Laporan</span>
              <div className="corpox-icon-box amber" style={{ width: 34, height: 34, fontSize: 16 }}>
                <i className="ri-file-list-3-line"></i>
              </div>
            </div>
            <strong className="text-warning-emphasis font-weight-extrabold d-block" style={{ fontSize: 20 }}>
              {pendingCount} Laporan Pending
            </strong>
            <span className="text-warning-emphasis font-weight-bold" style={{ fontSize: 11 }}>
              <i className="ri-time-line me-0.5"></i> Butuh Validasi Mandor
            </span>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card-box p-3.5 border bg-white rounded-4 shadow-sm h-100">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <span className="text-uppercase text-muted font-weight-bold" style={{ fontSize: 10.5 }}>Kondisi Tanaman</span>
              <div className="corpox-icon-box emerald" style={{ width: 34, height: 34, fontSize: 16 }}>
                <i className="ri-heart-pulse-line"></i>
              </div>
            </div>
            <strong className="text-success font-weight-extrabold d-block" style={{ fontSize: 20 }}>
              98.5% Sehat
            </strong>
            <span className="text-muted font-weight-medium" style={{ fontSize: 11 }}>
              <i className="ri-sun-cloudy-line me-0.5"></i> BMKG: 29°C Cerah Berawan
            </span>
          </div>
        </div>
      </div>

      {/* Row 2: Status Petak Lahan & Jadwal Rutin Hari Ini */}
      <div className="row g-4">
        {/* Status Blok Kebun */}
        <div className="col-12 col-lg-7">
          <div className="card-box p-4 rounded-4 bg-white border shadow-sm space-y-3 h-100">
            <div className="d-flex justify-content-between align-items-center pb-2 border-bottom">
              <h4 className="font-weight-bold text-dark m-0 !text-sm">
                <i className="ri-grid-fill text-success me-1.5"></i> Kondisi & Aktivitas Per Blok Kebun
              </h4>
              <Link to="/lands" className="btn btn-sm btn-outline-secondary font-weight-bold rounded-2" style={{ fontSize: 11 }}>
                Buka Peta Satelit
              </Link>
            </div>

            <div className="space-y-2.5">
              {[
                {
                  code: 'Blok A1 (Greenhouse)',
                  crop: 'Anggur Impor Shine Muscat',
                  soil: 'Humus Organik (pH 6.5)',
                  moisture: '78%',
                  phase: 'Fase Vegetatif & Pengecekan Sulur',
                  status: 'OPTIMAL',
                },
                {
                  code: 'Blok A2 (Lahan Terbuka)',
                  crop: 'Porang Hibrida Unggul (2.0 Ha)',
                  soil: 'Latosol Subur (pH 6.2)',
                  moisture: '82%',
                  phase: 'Pembesaran Umbi & Fertigasi Organik',
                  status: 'OPTIMAL',
                },
                {
                  code: 'Blok B1 (Kebun Hortikultura)',
                  crop: 'Melon Intanon Golden Sweet (0.5 Ha)',
                  soil: 'Aluvial Jonggol (pH 6.8)',
                  moisture: '72%',
                  phase: 'Pemasakan Buah (Brix 14.5°) — Panen Minggu Ini',
                  status: 'SIAP PANEN',
                },
              ].map((b, idx) => (
                <div key={idx} className="p-3 rounded-3 border bg-light d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">
                  <div>
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <strong className="text-dark" style={{ fontSize: 13 }}>{b.code}</strong>
                      <span className="badge bg-success-subtle text-success border border-success font-weight-bold" style={{ fontSize: 10 }}>{b.crop}</span>
                    </div>
                    <p className="text-secondary mb-0" style={{ fontSize: 12 }}>
                      🌱 {b.phase} • 🧪 {b.soil} • 💧 Kelembapan: <b>{b.moisture}</b>
                    </p>
                  </div>

                  <span className={`badge px-2.5 py-1 font-weight-bold rounded-pill ${b.status === 'SIAP PANEN' ? 'bg-warning text-dark' : 'bg-success text-white'}`} style={{ fontSize: 10.5 }}>
                    {b.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Jadwal Penyiraman & Fertigasi Hari Ini */}
        <div className="col-12 col-lg-5">
          <div className="card-box p-4 rounded-4 bg-white border shadow-sm space-y-3 h-100">
            <div className="d-flex justify-content-between align-items-center pb-2 border-bottom">
              <h4 className="font-weight-bold text-dark m-0 !text-sm">
                <i className="ri-alarm-line text-primary me-1.5"></i> Jadwal Kerja & Fertigasi Hari Ini
              </h4>
              <span className="badge bg-light text-muted border font-weight-bold" style={{ fontSize: 11 }}>27 Agu 2026</span>
            </div>

            <div className="space-y-2">
              <div className="p-2.5 rounded-3 border bg-success-subtle border-success-subtle d-flex align-items-center gap-2.5">
                <i className="ri-checkbox-circle-fill text-success" style={{ fontSize: 18 }}></i>
                <div>
                  <strong className="d-block text-dark" style={{ fontSize: 12 }}>07:00 - 08:30 WIB: Fertigasi Pagi Blok A1 & A2</strong>
                  <span className="text-success font-weight-medium" style={{ fontSize: 11 }}>Selesai • 1.200 Liter Nutrisi Terdistribusi</span>
                </div>
              </div>

              <div className="p-2.5 rounded-3 border bg-light d-flex align-items-center gap-2.5">
                <i className="ri-time-line text-warning" style={{ fontSize: 18 }}></i>
                <div>
                  <strong className="d-block text-dark" style={{ fontSize: 12 }}>13:30 - 15:00 WIB: Penyiangan Gulma Blok B1</strong>
                  <span className="text-secondary" style={{ fontSize: 11 }}>Sedang Berjalan • Petani: Bambang & Agus</span>
                </div>
              </div>

              <div className="p-2.5 rounded-3 border bg-light d-flex align-items-center gap-2.5">
                <i className="ri-time-line text-muted" style={{ fontSize: 18 }}></i>
                <div>
                  <strong className="d-block text-dark" style={{ fontSize: 12 }}>16:30 - 17:15 WIB: Fertigasi Sore & Cek Drainase</strong>
                  <span className="text-muted" style={{ fontSize: 11 }}>Dijadwalkan • Persiapan antisipasi hujan sore</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Verifikasi Laporan Harian Petani */}
      <div className="card-box p-4 rounded-4 bg-white border shadow-sm space-y-3">
        <div className="d-flex justify-content-between align-items-center pb-2 border-bottom">
          <div>
            <h4 className="font-weight-bold text-dark m-0 !text-sm">
              <i className="ri-checkbox-multiple-line text-success me-1.5"></i> Verifikasi Laporan Aktivitas Harian Petani
            </h4>
            <span className="text-muted" style={{ fontSize: 12 }}>
              Tinjau foto dokumentasi dan validasi pelaksanaan tugas petani di lapangan
            </span>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0" style={{ fontSize: 12.5 }}>
            <thead className="table-light">
              <tr style={{ fontSize: 11.5 }}>
                <th>FOTO BUKTI</th>
                <th>PETANI</th>
                <th>LOKASI BLOK</th>
                <th>AKTIVITAS DIKERJAKAN</th>
                <th>JAM INPUT</th>
                <th>STATUS</th>
                <th className="text-end">AKSI VERIFIKASI</th>
              </tr>
            </thead>
            <tbody>
              {farmerActivities.map((act) => (
                <tr key={act.id}>
                  <td style={{ width: 60 }}>
                    <img
                      src={act.photo}
                      alt={act.activity}
                      className="rounded-2 border object-fit-cover"
                      style={{ width: 48, height: 48 }}
                    />
                  </td>
                  <td>
                    <strong className="text-dark d-block">{act.farmerName}</strong>
                    <span className="text-muted font-mono" style={{ fontSize: 10.5 }}>{act.id}</span>
                  </td>
                  <td className="text-secondary font-weight-medium">{act.block}</td>
                  <td className="text-dark">{act.activity}</td>
                  <td className="text-muted font-mono">{act.time}</td>
                  <td>
                    <span className={`badge px-2.5 py-1 font-weight-bold rounded-pill ${act.status === 'VERIFIED' ? 'bg-success text-white' : 'bg-warning text-dark'}`} style={{ fontSize: 10.5 }}>
                      {act.status === 'VERIFIED' ? 'TERVERIFIKASI' : 'MENUNGGU VERIFIKASI'}
                    </span>
                  </td>
                  <td className="text-end">
                    {act.status === 'PENDING' ? (
                      <button
                        onClick={() => handleVerifyActivity(act.id)}
                        className="btn btn-sm btn-success text-white font-weight-bold px-3 py-1 rounded-2 shadow-xs d-inline-flex align-items-center gap-1"
                        style={{ fontSize: 11.5 }}
                      >
                        <i className="ri-check-line"></i>
                        <span>Validasi</span>
                      </button>
                    ) : (
                      <span className="text-success font-weight-bold d-inline-flex align-items-center gap-1" style={{ fontSize: 11.5 }}>
                        <i className="ri-checkbox-circle-fill"></i> Tervalidasi
                      </span>
                    )}
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
