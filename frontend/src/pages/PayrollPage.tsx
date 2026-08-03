import { useEffect, useState } from 'react';
import { getAttendances, checkInAttendance, checkOutAttendance, getPayrollSummary } from '../services/api';
import { useRole } from '../context/RoleContext';

export const PayrollPage = () => {
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
    } catch (e) {
      console.error(e);
    }
  };

  const handleCheckOut = async (id: string) => {
    try {
      await checkOutAttendance(id);
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-100 space-y-4">
      {/* Header Banner */}
      <div className="bg-white p-4 rounded-4 border shadow-sm d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
          <span className="badge bg-success-subtle text-success border border-success px-2.5 py-1 rounded-pill uppercase font-weight-bold mb-1.5 d-inline-block" style={{ fontSize: 11 }}>
            <i className="ri-calendar-check-line me-1"></i> MODUL PRESENSI & PAYROLL
          </span>
          <h2 className="font-weight-bold text-dark mb-1 !text-base">Payroll & Presensi PWA SDM Lapangan</h2>
          <p className="text-secondary mb-0" style={{ fontSize: 13 }}>
            Sistem Check-in Presensi Berbasis GPS Satelit & Kalkulasi Upah Harian Otomatis
          </p>
        </div>
        <span className="badge bg-success text-white px-3 py-2 rounded-pill font-weight-bold d-inline-flex align-items-center gap-1.5 shadow-sm" style={{ fontSize: 11 }}>
          <i className="ri-smartphone-line"></i> PWA Check-In Aktif
        </span>
      </div>

      {/* PWA Check-In Card Widget */}
      {!isReadOnly && (
        <div className="bg-white p-4 rounded-4 border shadow-sm space-y-3">
          <h4 className="font-weight-bold text-dark m-0 d-flex align-items-center gap-2 !text-sm">
            <i className="ri-map-pin-user-line text-success"></i> Form Check-In PWA (Simulasi Petani Lapangan)
          </h4>
          <div className="row g-3 pt-1">
            <div className="col-md-5">
              <label className="form-label font-weight-bold text-secondary mb-1" style={{ fontSize: 11 }}>Lokasi Site (Koordinat GPS)</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="form-control p-2.5 bg-light border-0 rounded-3"
                style={{ fontSize: 13 }}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label font-weight-bold text-secondary mb-1" style={{ fontSize: 11 }}>Standar Upah Harian (Rp)</label>
              <input
                type="number"
                value={dailyWage}
                onChange={(e) => setDailyWage(e.target.value)}
                className="form-control p-2.5 bg-light border-0 rounded-3"
                style={{ fontSize: 13 }}
              />
            </div>
            <div className="col-md-3 d-flex align-items-end">
              <button
                onClick={handleCheckIn}
                className="tmp-btn bg-success text-white font-weight-bold p-2.5 w-100 rounded-3 border-0 d-flex align-items-center justify-content-center gap-2 shadow-xs"
                style={{ fontSize: 13 }}
              >
                <i className="ri-time-line"></i> Check-In Sekarang
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Audit Log Absensi 5-Dimensi */}
      <div className="bg-white rounded-4 border shadow-sm overflow-hidden p-4">
        <div className="d-flex justify-content-between align-items-center pb-3 mb-3 border-bottom">
          <h4 className="font-weight-bold text-dark m-0 !text-sm">
            <i className="ri-history-line text-success me-2"></i> Log Presensi Harian 5-Dimensi (Auditor Verified)
          </h4>
          <span className="badge bg-light text-dark border px-2.5 py-1 font-weight-bold" style={{ fontSize: 11 }}>
            Total Log: {attendances.length}
          </span>
        </div>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0" style={{ fontSize: 13 }}>
            <thead className="table-light">
              <tr>
                <th>1. Waktu & SLA (Check-In/Out)</th>
                <th>2. Lokasi GPS Satelit</th>
                <th>3. Personel Lapangan</th>
                <th>4. Finansial Upah</th>
                <th>5. Output & Status</th>
              </tr>
            </thead>
            <tbody>
              {attendances.map((att) => (
                <tr key={att.id}>
                  <td>
                    <strong className="d-block text-dark">In: {new Date(att.checkIn).toLocaleTimeString('id-ID')}</strong>
                    <span className="text-muted" style={{ fontSize: 11 }}>
                      Out: {att.checkOut ? new Date(att.checkOut).toLocaleTimeString('id-ID') : 'Belum Check-Out'}
                    </span>
                  </td>
                  <td className="text-dark font-weight-bold">{att.location || 'Blok Kebun Utama'}</td>
                  <td className="font-weight-bold text-dark">{att.userName || 'Petani Kebun'}</td>
                  <td className="font-weight-bold text-success">Rp {Number(att.dailyWage).toLocaleString('id-ID')}</td>
                  <td>
                    {att.status === 'PRESENT' ? (
                      !isReadOnly ? (
                        <button
                          onClick={() => handleCheckOut(att.id)}
                          className="btn btn-warning text-dark font-weight-bold btn-sm rounded-3 py-1 px-3"
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
                      <span className="badge bg-success text-white font-weight-bold" style={{ fontSize: 11 }}>
                        TERVERIFIKASI AUDITOR
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
      <div className="bg-white p-4 rounded-4 border shadow-sm space-y-3">
        <h4 className="font-weight-bold text-dark m-0 !text-sm">
          <i className="ri-coins-line text-success me-2"></i> Rekapitulasi Upah & Payroll Per Role Pekerja
        </h4>
        <div className="row g-3 pt-1">
          {payrollSummary.map((item, idx) => (
            <div key={idx} className="col-12 col-md-4">
              <div className="p-3 bg-light rounded-3 border space-y-1">
                <div className="d-flex justify-content-between align-items-center">
                  <span className="font-weight-bold text-dark" style={{ fontSize: 13 }}>{item.role}</span>
                  <span className="badge bg-success-subtle text-success border border-success font-weight-bold" style={{ fontSize: 10 }}>
                    {item.status}
                  </span>
                </div>
                <div className="font-weight-bold text-success !text-sm">Rp {item.totalPayroll.toLocaleString('id-ID')}</div>
                <span className="text-secondary d-block" style={{ fontSize: 11 }}>
                  {item.totalWorkers} Pekerja • {item.totalHoursWorked} Jam Kerja
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
