import { useRole } from '../context/RoleContext';

export const WeighbridgePage = () => {
  const { role } = useRole();

  const weighbridgeData = [
    { id: 'WB-001', ticketNo: 'TKG-2026-0801', landName: 'Blok A1 (Kebun Anggur Impor 1000m²)', truckNo: 'F 8812 BGR', brutoKg: 4500, tarraKg: 1500, nettoKg: 3000, grade: 'Mutu A', status: 'VERIFIED', buyer: 'PT Supermarket Fresh Nusantara' },
    { id: 'WB-002', ticketNo: 'TKG-2026-0802', landName: 'Blok A2 (Tanam Hibrida Utama 2 Ha)', truckNo: 'BM 9014 KR', brutoKg: 14200, tarraKg: 4200, nettoKg: 10000, grade: 'Mutu A', status: 'VERIFIED', buyer: 'PKS Agro Industrial Riau' },
    { id: 'WB-003', ticketNo: 'TKG-2026-0803', landName: 'Blok B1 (Melon Premium 5000m²)', truckNo: 'F 7721 BGR', brutoKg: 6500, tarraKg: 2100, nettoKg: 4400, grade: 'Mutu A', status: 'VERIFIED', buyer: 'PT Pangan Mandiri Bogor' },
  ];

  const handleExportTicket = (ticketNo: string) => {
    alert(`Mengunduh Bukti Slip Tiket Digital Timbangan PKS ${ticketNo} (PDF)...`);
  };

  return (
    <div className="w-100 space-y-4">
      {/* Header Banner */}
      <div className="bg-white p-4 rounded-4 border shadow-sm d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
          <span className="badge bg-warning-subtle text-warning border border-warning px-2.5 py-1 rounded-pill uppercase font-weight-bold mb-1.5 d-inline-block" style={{ fontSize: 11 }}>
            <i className="ri-scales-3-line me-1"></i> LOGISTIK & WEIGHBRIDGE DIGITAL PKS
          </span>
          <h2 className="font-weight-bold text-dark mb-1" style={{ fontSize: 18 }}>Tiket Timbangan Digital PKS & Verifikasi Hasil Panen</h2>
          <p className="text-secondary mb-0" style={{ fontSize: 13 }}>
            Pembuktian Fisik Berat Hasil Panen (Bruto, Tarra, Netto Kg), Mutu Grade, & Validasi Truk Pengangkut
          </p>
        </div>
        <span className="badge bg-primary text-white px-3 py-2 rounded-pill font-weight-bold d-inline-flex align-items-center gap-1.5 shadow-sm" style={{ fontSize: 11 }}>
          <i className="ri-shield-user-line"></i> Hak Akses: {role}
        </span>
      </div>

      {/* Summary KPI Cards */}
      <div className="row g-4">
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="bg-white p-4 rounded-4 border shadow-sm d-flex align-items-center justify-content-between h-100">
            <div>
              <span className="text-uppercase text-muted font-weight-bold d-block mb-1" style={{ fontSize: 11 }}>Total Tonase Netto</span>
              <strong className="h3 font-weight-extrabold text-dark m-0" style={{ fontSize: 20 }}>17.400 Kg</strong>
              <span className="d-block text-success font-weight-bold mt-1.5" style={{ fontSize: 12 }}>Terverifikasi Timbangan Digital</span>
            </div>
            <div style={{ width: 44, height: 44, backgroundColor: '#dcfce7', color: '#059669', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
              <i className="ri-scales-line"></i>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="bg-white p-4 rounded-4 border shadow-sm d-flex align-items-center justify-content-between h-100">
            <div>
              <span className="text-uppercase text-muted font-weight-bold d-block mb-1" style={{ fontSize: 11 }}>Total Truk Panen Masuk</span>
              <strong className="h3 font-weight-extrabold text-dark m-0" style={{ fontSize: 20 }}>3 Armada Truk</strong>
              <span className="d-block text-secondary font-weight-bold mt-1.5" style={{ fontSize: 12 }}>Surat Jalan Sah</span>
            </div>
            <div style={{ width: 44, height: 44, backgroundColor: '#dbeafe', color: '#2563eb', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
              <i className="ri-truck-line"></i>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="bg-white p-4 rounded-4 border shadow-sm d-flex align-items-center justify-content-between h-100">
            <div>
              <span className="text-uppercase text-muted font-weight-bold d-block mb-1" style={{ fontSize: 11 }}>Mutu Panen Grade A</span>
              <strong className="h3 font-weight-extrabold text-success m-0" style={{ fontSize: 20 }}>100.0%</strong>
              <span className="d-block text-success font-weight-bold mt-1.5" style={{ fontSize: 12 }}>Sesuai Standar Komersial</span>
            </div>
            <div style={{ width: 44, height: 44, backgroundColor: '#fef3c7', color: '#d97706', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
              <i className="ri-award-line"></i>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="bg-white p-4 rounded-4 border shadow-sm d-flex align-items-center justify-content-between h-100">
            <div>
              <span className="text-uppercase text-muted font-weight-bold d-block mb-1" style={{ fontSize: 11 }}>Status Kalibrasi Alat</span>
              <strong className="h3 font-weight-extrabold text-primary m-0" style={{ fontSize: 20 }}>VERIFIED TERA</strong>
              <span className="d-block text-secondary font-weight-bold mt-1.5" style={{ fontSize: 12 }}>Toleransi &lt; 0.5%</span>
            </div>
            <div style={{ width: 44, height: 44, backgroundColor: '#f1f5f9', color: '#475569', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
              <i className="ri-shield-check-line"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Main Weighbridge Table */}
      <div className="bg-white rounded-4 border shadow-sm p-4 overflow-hidden space-y-3">
        <div className="d-flex justify-content-between align-items-center pb-3 border-bottom">
          <h4 className="font-weight-bold text-dark m-0 d-flex align-items-center gap-2" style={{ fontSize: 15 }}>
            <i className="ri-scales-3-line text-warning"></i> Daftar Slip Tiket Timbangan PKS Terverifikasi
          </h4>
          <span className="badge bg-light text-dark border font-weight-bold" style={{ fontSize: 11 }}>
            Total Tiket: {weighbridgeData.length}
          </span>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0" style={{ fontSize: 13 }}>
            <thead className="table-light">
              <tr>
                <th>No Tiket PKS</th>
                <th>Blok Tanam & Komoditas</th>
                <th>No Plat Truk</th>
                <th>Berat Bruto</th>
                <th>Berat Tarra</th>
                <th>Berat Netto (Kg)</th>
                <th>Grade Mutu</th>
                <th>Pembeli (Buyer)</th>
                <th>Aksi Slip</th>
              </tr>
            </thead>
            <tbody>
              {weighbridgeData.map((wb) => (
                <tr key={wb.id}>
                  <td><strong className="text-primary font-mono">{wb.ticketNo}</strong></td>
                  <td className="font-weight-bold text-dark">{wb.landName}</td>
                  <td><span className="badge bg-light text-dark border font-mono font-weight-bold">{wb.truckNo}</span></td>
                  <td className="text-secondary">{wb.brutoKg.toLocaleString('id-ID')} Kg</td>
                  <td className="text-secondary">{wb.tarraKg.toLocaleString('id-ID')} Kg</td>
                  <td className="text-success font-weight-extrabold" style={{ fontSize: 14 }}>
                    {wb.nettoKg.toLocaleString('id-ID')} Kg
                  </td>
                  <td><span className="badge bg-success-subtle text-success border border-success font-weight-bold">{wb.grade}</span></td>
                  <td className="text-dark font-weight-medium">{wb.buyer}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleExportTicket(wb.ticketNo)}
                      className="btn btn-sm btn-outline-success font-weight-bold d-inline-flex align-items-center gap-1"
                      style={{ fontSize: 11 }}
                    >
                      <i className="ri-file-download-line"></i> CETAK TIKET
                    </button>
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
