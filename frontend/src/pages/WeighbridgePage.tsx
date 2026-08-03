import { useRole } from '../context/RoleContext';

export const WeighbridgePage = () => {
  const { role } = useRole();

  const weighbridgeData = [
    { id: 'WB-001', ticketNo: 'TKG-2026-0801', landName: 'Blok A1 (Kebun Anggur Impor 1000m²)', truckNo: 'F 8812 BGR', brutoKg: 4500, tarraKg: 1500, nettoKg: 3000, grade: 'Mutu A', status: 'VERIFIED', buyer: 'PT Supermarket Fresh Nusantara' },
    { id: 'WB-002', ticketNo: 'TKG-2026-0802', landName: 'Blok A2 (Tanam Hibrida Utama 2 Ha)', truckNo: 'F 9014 BGR', brutoKg: 14200, tarraKg: 4200, nettoKg: 10000, grade: 'Mutu A', status: 'VERIFIED', buyer: 'PKS Agro Industrial Jawa Barat' },
    { id: 'WB-003', ticketNo: 'TKG-2026-0803', landName: 'Blok B1 (Melon Premium 5000m²)', truckNo: 'F 7721 BGR', brutoKg: 6500, tarraKg: 2100, nettoKg: 4400, grade: 'Mutu A', status: 'VERIFIED', buyer: 'PT Pangan Mandiri Bogor' },
  ];

  const handleExportTicket = (ticketNo: string) => {
    alert(`Mengunduh Bukti Slip Tiket Digital Timbangan PKS ${ticketNo} (PDF)...`);
  };

  return (
    <div className="w-100 space-y-4">
      {/* Header Banner */}
      <div className="card-box p-4 rounded-4 space-y-3">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
          <div>
            <span className="tmp-badge-card emerald mb-2 d-inline-block">
              <i className="ri-scales-3-line me-1"></i> LOGISTIK & TIMBANGAN DIGITAL KEBUN
            </span>
            <h2 className="font-weight-extrabold text-dark mb-1" style={{ fontSize: 18 }}>
              Pencatatan & Timbangan Digital Hasil Panen Kebun
            </h2>
            <p className="text-secondary mb-0 font-weight-medium" style={{ fontSize: 13 }}>
              Pencatatan resmi berat muatan panen (Berat Total Truk, Berat Truk Kosong, & Hasil Bersih Panen Murni)
            </p>
          </div>
          <span className="badge bg-primary text-white px-3 py-2 rounded-pill font-weight-bold d-inline-flex align-items-center gap-1.5 shadow-sm" style={{ fontSize: 11 }}>
            <i className="ri-shield-user-line"></i> Hak Akses: {role}
          </span>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="row g-4">
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card-box card-box-hover p-4 d-flex align-items-center justify-content-between h-100">
            <div>
              <span className="text-uppercase text-muted font-weight-bold d-block mb-1" style={{ fontSize: 11 }}>Total Berat Bersih Panen</span>
              <strong className="h3 font-weight-extrabold text-dark m-0" style={{ fontSize: 20 }}>17.400 Kg</strong>
              <span className="d-block text-success font-weight-bold mt-1.5" style={{ fontSize: 12 }}>
                <i className="ri-checkbox-circle-fill me-1"></i> Hasil Bersih Terverifikasi
              </span>
            </div>
            <div className="corpox-icon-box emerald">
              <i className="ri-scales-line"></i>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card-box card-box-hover p-4 d-flex align-items-center justify-content-between h-100">
            <div>
              <span className="text-uppercase text-muted font-weight-bold d-block mb-1" style={{ fontSize: 11 }}>Total Truk Pengangkut</span>
              <strong className="h3 font-weight-extrabold text-dark m-0" style={{ fontSize: 20 }}>3 Armada Truk</strong>
              <span className="d-block text-secondary font-weight-bold mt-1.5" style={{ fontSize: 12 }}>
                <i className="ri-file-text-line me-1"></i> Surat Jalan Resmi Sah
              </span>
            </div>
            <div className="corpox-icon-box blue">
              <i className="ri-truck-line"></i>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card-box card-box-hover p-4 d-flex align-items-center justify-content-between h-100">
            <div>
              <span className="text-uppercase text-muted font-weight-bold d-block mb-1" style={{ fontSize: 11 }}>Kualitas Panen (Grade A)</span>
              <strong className="h3 font-weight-extrabold text-success m-0" style={{ fontSize: 20 }}>100.0%</strong>
              <span className="d-block text-success font-weight-bold mt-1.5" style={{ fontSize: 12 }}>
                <i className="ri-award-line me-1"></i> Sesuai Standar Komersial
              </span>
            </div>
            <div className="corpox-icon-box amber">
              <i className="ri-award-fill"></i>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card-box card-box-hover p-4 d-flex align-items-center justify-content-between h-100">
            <div>
              <span className="text-uppercase text-muted font-weight-bold d-block mb-1" style={{ fontSize: 11 }}>Status Alat Timbangan</span>
              <strong className="h3 font-weight-extrabold text-primary m-0" style={{ fontSize: 18 }}>AKURAT & LULUS UJI</strong>
              <span className="d-block text-secondary font-weight-bold mt-1.5" style={{ fontSize: 12 }}>Toleransi Akurasi &lt; 0.5%</span>
            </div>
            <div className="corpox-icon-box blue">
              <i className="ri-shield-check-line"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Main Weighbridge Table */}
      <div className="card-box p-4 rounded-4 space-y-4">
        <div className="d-flex justify-content-between align-items-center pb-3 border-bottom">
          <h4 className="font-weight-extrabold text-dark m-0 d-flex align-items-center gap-2" style={{ fontSize: 15 }}>
            <i className="ri-file-list-3-line text-success"></i> Daftar Resi Tiket Timbangan Hasil Panen Kebun
          </h4>
          <span className="tmp-badge-card success">
            Total {weighbridgeData.length} Tiket Sah
          </span>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0" style={{ fontSize: 13 }}>
            <thead className="table-light">
              <tr>
                <th className="font-weight-bold text-dark">No. Resi Timbangan</th>
                <th className="font-weight-bold text-dark">Lokasi Lahan & Jenis Tanaman</th>
                <th className="font-weight-bold text-dark">Nomor Truk</th>
                <th className="font-weight-bold text-dark">Berat Total (Truk + Panen)</th>
                <th className="font-weight-bold text-dark">Berat Truk Kosong</th>
                <th className="font-weight-bold text-dark">Hasil Bersih Panen (Kg)</th>
                <th className="font-weight-bold text-dark">Kualitas Buah</th>
                <th className="font-weight-bold text-dark">Tujuan Pembeli / Pabrik</th>
                <th className="font-weight-bold text-dark">Cetak Tiket</th>
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
                      className="btn btn-sm btn-primary-gradient font-weight-bold d-inline-flex align-items-center gap-1"
                      style={{ fontSize: 11 }}
                    >
                      <i className="ri-file-download-line"></i> Cetak Slip
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
