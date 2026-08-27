import React, { useEffect, useState } from 'react';
import { getAttendances, checkInAttendance, checkOutAttendance, getPayrollSummary } from '../services/api';
import { useRole } from '../context/RoleContext';

export const PayrollPage: React.FC = () => {
  const { isReadOnly } = useRole();
  const [attendances, setAttendances] = useState<any[]>([]);
  const [payrollSummary, setPayrollSummary] = useState<any[]>([]);
  const [location, setLocation] = useState('Blok A1 - GPS Lat 0.507, Long 101.447');
  const [dailyWage, setDailyWage] = useState('150000');

  const fetchData = async () => {
    try {
      const attRes = await getAttendances();
      setAttendances(attRes.data.data);
      const payRes = await getPayrollSummary();
      setPayrollSummary(payRes.data.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCheckIn = async () => {
    try {
      await checkInAttendance({ userId: 'usr-2', location, dailyWage: Number(dailyWage) });
      fetchData();
      alert('Presensi Masuk (Check-In) berhasil dicatat!');
    } catch (e) {
      console.error(e);
    }
  };

  const handleCheckOut = async (id: string) => {
    try {
      await checkOutAttendance(id);
      fetchData();
      alert('Presensi Keluar (Check-Out) berhasil dicatat!');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-100 space-y-4">
      {/* Header Banner */}
      <div className="card-box p-4 rounded-4 bg-white border shadow-sm d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
          <h2 className="page-header-title font-weight-bold text-dark mb-1" style={{ fontSize: 20 }}>
            Presensi & Penggajian SDM Lapangan
          </h2>
          <p className="text-secondary mb-0 font-weight-medium" style={{ fontSize: 13 }}>
            Pencatatan absensi berbasis GPS satelit dan rekapitulasi upah kerja harian petani Jonggol
          </p>
        </div>
        <span className="badge bg-success text-white px-3 py-1.5 rounded-pill font-weight-bold d-inline-flex align-items-center gap-1.5 shadow-sm" style={{ fontSize: 11.5 }}>
          <i className="ri-map-pin-user-line"></i> Geofencing GPS Aktif
        </span>
      </div>

      {/* PWA Check-In Card Widget (Only for non-read-only) */}
      {!isReadOnly && (
        <div className="card-box p-4 rounded-4 bg-white border shadow-sm space-y-3">
          <div className="pb-2 border-bottom">
            <h4 className="font-weight-bold text-dark m-0" style={{ fontSize: 15 }}>
              <i className="ri-fingerprint-line text-success me-1.5"></i> Formulir Presensi Check-In Harian
            </h4>
            <p className="text-muted mb-0 mt-0.5" style={{ fontSize: 12.5 }}>
              Simulasi presensi digital petani berbasis koordinat GPS lokasi petak kebun
            </p>
          </div>

          <div className="row g-3 pt-1">
            <div className="col-12 col-md-5">
              <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12 }}>
                Lokasi Site & Koordinat GPS Lahan
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="form-control p-2.5 bg-light border rounded-3 text-dark font-weight-medium"
                style={{ fontSize: 13 }}
              />
            </div>

            <div className="col-12 col-md-4">
              <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12 }}>
                Standar Upah Harian (Rp)
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light text-muted font-weight-bold" style={{ fontSize: 12 }}>Rp</span>
                <input
                  type="number"
                  value={dailyWage}
                  onChange={(e) => setDailyWage(e.target.value)}
                  className="form-control p-2.5 bg-white border text-dark font-weight-bold"
                  style={{ fontSize: 13 }}
                />
              </div>
            </div>

            <div className="col-12 col-md-3 d-flex align-items-end">
              <button
                onClick={handleCheckIn}
                className="btn btn-success text-white font-weight-bold p-2.5 w-100 rounded-3 shadow-xs d-flex align-items-center justify-content-center gap-1.5"
                style={{ height: 42, fontSize: 13 }}
              >
                <i className="ri-time-line"></i>
                <span>Check-In Sekarang</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Audit Log Absensi 5-Dimensi */}
      <div className="card-box p-4 rounded-4 bg-white border shadow-sm space-y-3">
        <div className="d-flex justify-content-between align-items-center pb-2 border-bottom">
          <h4 className="font-weight-bold text-dark m-0" style={{ fontSize: 15 }}>
            <i className="ri-history-line text-success me-1.5"></i> Log Presensi & Durasi Kerja SDM Kebun
          </h4>
          <span className="badge bg-light text-dark border font-weight-bold" style={{ fontSize: 11 }}>
            Total Log: {attendances.length}
          </span>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0" style={{ fontSize: 13 }}>
            <thead>
              <tr>
                <th>1. WAKTU & SLA (MASUK/KELUAR)</th>
                <th>2. LOKASI GPS SATELIT</th>
                <th>3. PERSONEL LAPANGAN</th>
                <th>4. BESARAN UPAH</th>
                <th className="text-end">5. STATUS & AKSI</th>
              </tr>
            </thead>
            <tbody>
              {attendances.map((att) => (
                <tr key={att.id}>
                  <td>
                    <strong className="d-block text-slate-900 font-weight-bold">
                      In: {new Date(att.checkIn).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
                    </strong>
                    <span className="text-muted" style={{ fontSize: 11 }}>
                      Out: {att.checkOut ? `${new Date(att.checkOut).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB` : 'Belum Check-Out'}
                    </span>
                  </td>
                  <td className="text-slate-700 font-weight-medium">{att.location || 'Blok Kebun Utama'}</td>
                  <td className="font-weight-bold text-slate-900">{att.userName || 'Petani Kebun'}</td>
                  <td className="font-weight-bold text-success">
                    Rp {Number(att.dailyWage).toLocaleString('id-ID')}
                  </td>
                  <td className="text-end">
                    {att.status === 'PRESENT' ? (
                      !isReadOnly ? (
                        <button
                          onClick={() => handleCheckOut(att.id)}
                          className="btn btn-warning text-dark font-weight-bold btn-sm rounded-3 py-1 px-3 shadow-xs"
                          style={{ fontSize: 11 }}
                        >
                          <i className="ri-logout-box-r-line me-1"></i> Check-Out Sekarang
                        </button>
                      ) : (
                        <span className="badge bg-warning text-dark font-weight-bold" style={{ fontSize: 11 }}>
                          DALAM PROSES
                        </span>
                      )
                    ) : (
                      <span className="badge bg-success-subtle text-success border border-success font-weight-bold" style={{ fontSize: 11 }}>
                        TERVERIFIKASI
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rekapitulasi Payroll Per Role */}
      <div className="card-box p-4 rounded-4 bg-white border shadow-sm space-y-3">
        <h4 className="font-weight-bold text-dark m-0" style={{ fontSize: 15 }}>
          <i className="ri-coins-line text-success me-1.5"></i> Rekapitulasi Alokasi Upah SDM Per Bidang Tugas
        </h4>

        <div className="row g-3 pt-1">
          {payrollSummary.map((item, idx) => (
            <div key={idx} className="col-12 col-md-4">
              <div className="p-3 bg-light rounded-3 border space-y-1">
                <div className="d-flex justify-content-between align-items-center">
                  <span className="font-weight-bold text-dark" style={{ fontSize: 13 }}>{item.role}</span>
                  <span className="badge bg-success text-white font-weight-bold" style={{ fontSize: 10 }}>
                    {item.status}
                  </span>
                </div>
                <div className="font-weight-bold text-success" style={{ fontSize: 16 }}>
                  Rp {item.totalPayroll.toLocaleString('id-ID')}
                </div>
                <span className="text-secondary d-block" style={{ fontSize: 11.5 }}>
                  {item.totalWorkers} Pekerja • {item.totalHoursWorked} Jam Kerja Tercatat
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
