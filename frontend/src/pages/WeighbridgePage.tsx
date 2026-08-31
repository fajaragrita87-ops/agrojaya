import React from 'react';

export const WeighbridgePage: React.FC = () => {
  const weighbridgeData = [
    {
      id: 'WB-001',
      ticketNo: 'TKG-2026-0801',
      landName: 'Blok A1 (Kebun Anggur Impor 1000m²)',
      truckNo: 'F 8812 BGR',
      brutoKg: 4500,
      tarraKg: 1500,
      nettoKg: 3000,
      grade: 'Mutu A (Ekspor)',
      status: 'VERIFIED',
      buyer: 'PT Supermarket Fresh Nusantara',
    },
    {
      id: 'WB-002',
      ticketNo: 'TKG-2026-0802',
      landName: 'Blok A2 (Tanam Hibrida Utama 2 Ha)',
      truckNo: 'F 9014 BGR',
      brutoKg: 14200,
      tarraKg: 4200,
      nettoKg: 10000,
      grade: 'Mutu A (Grade 1)',
      status: 'VERIFIED',
      buyer: 'PKS Agro Industrial Jawa Barat',
    },
    {
      id: 'WB-003',
      ticketNo: 'TKG-2026-0803',
      landName: 'Blok B1 (Melon Premium 5000m²)',
      truckNo: 'F 7721 BGR',
      brutoKg: 6500,
      tarraKg: 2100,
      nettoKg: 4400,
      grade: 'Mutu A (Super)',
      status: 'VERIFIED',
      buyer: 'PT Pangan Mandiri Bogor',
    },
  ];

  const handleExportTicket = (ticketNo: string) => {
    alert(`Mengunduh Bukti Slip Tiket Digital Timbangan PKS ${ticketNo} (PDF)...`);
  };

  const totalNetto = weighbridgeData.reduce((acc, curr) => acc + curr.nettoKg, 0);

  return (
    <div className="w-100 space-y-4">
      {/* Header Banner */}
      <div className="card-box p-4 rounded-4 bg-white border shadow-sm d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
          <h2 className="page-header-title font-weight-bold text-dark mb-0" style={{ fontSize: 20 }}>
            Pencatatan & Jembatan Timbang Digital Hasil Panen
          </h2>
        </div>
        <span className="badge bg-success text-white px-3 py-1.5 rounded-pill font-weight-bold d-inline-flex align-items-center gap-1.5 shadow-sm" style={{ fontSize: 11.5 }}>
          <i className="ri-scales-3-line"></i> Kalibrasi Timbangan Valid
        </span>
      </div>

      {/* Summary KPI Cards */}
      <div className="row g-3">
        <div className="col-12 col-sm-6 col-xl-4">
          <div className="card-box p-3.5 border bg-white rounded-4 shadow-sm h-100 d-flex justify-content-between align-items-center">
            <div>
              <span className="text-uppercase text-muted font-weight-bold d-block" style={{ fontSize: 11 }}>Total Berat Bersih Panen</span>
              <strong className="text-dark font-weight-bold d-block my-0.5" style={{ fontSize: 20 }}>
                {totalNetto.toLocaleString('id-ID')} Kg
              </strong>
              <span className="text-success font-weight-medium" style={{ fontSize: 11 }}>Hasil Bersih Terverifikasi</span>
            </div>
            <div className="corpox-icon-box emerald" style={{ width: 38, height: 38, fontSize: 18 }}>
              <i className="ri-scales-line"></i>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-4">
          <div className="card-box p-3.5 border bg-white rounded-4 shadow-sm h-100 d-flex justify-content-between align-items-center">
            <div>
              <span className="text-uppercase text-muted font-weight-bold d-block" style={{ fontSize: 11 }}>Total Truk Pengangkut</span>
              <strong className="text-dark font-weight-bold d-block my-0.5" style={{ fontSize: 20 }}>
                {weighbridgeData.length} Armada Truk
              </strong>
              <span className="text-primary font-weight-medium" style={{ fontSize: 11 }}>Surat Jalan Resmi Terbit</span>
            </div>
            <div className="corpox-icon-box blue" style={{ width: 38, height: 38, fontSize: 18 }}>
              <i className="ri-truck-line"></i>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-4">
          <div className="card-box p-3.5 border bg-white rounded-4 shadow-sm h-100 d-flex justify-content-between align-items-center">
            <div>
              <span className="text-uppercase text-muted font-weight-bold d-block" style={{ fontSize: 11 }}>Kualitas Sortasi Panen</span>
              <strong className="text-success font-weight-bold d-block my-0.5" style={{ fontSize: 20 }}>Grade A (100%)</strong>
              <span className="text-muted font-weight-medium" style={{ fontSize: 11 }}>Lolos Uji Standar Buyer Offtaker</span>
            </div>
            <div className="corpox-icon-box emerald" style={{ width: 38, height: 38, fontSize: 18 }}>
              <i className="ri-medal-line"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="card-box p-4 rounded-4 bg-white border shadow-sm space-y-3">
        <div className="d-flex justify-content-between align-items-center pb-2 border-bottom">
          <h4 className="font-weight-bold text-dark m-0" style={{ fontSize: 15 }}>
            <i className="ri-file-list-3-line text-success me-1.5"></i> Register Tiket Timbangan & Surat Jalan Panen
          </h4>
          <span className="badge bg-light text-dark border font-weight-bold" style={{ fontSize: 11 }}>
            Total Tiket: {weighbridgeData.length}
          </span>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0" style={{ fontSize: 13 }}>
            <thead>
              <tr>
                <th>NO. TIKET & LOKASI</th>
                <th>ARMADA TRUK</th>
                <th>BERAT KOTOR (BRUTO)</th>
                <th>BERAT TARA</th>
                <th>BERAT BERSIH (NETTO)</th>
                <th>KUALITAS & OFFTAKER</th>
                <th className="text-end">SLIP TIKET</th>
              </tr>
            </thead>
            <tbody>
              {weighbridgeData.map((wb) => (
                <tr key={wb.id}>
                  <td>
                    <div>
                      <strong className="text-slate-900 d-block font-mono font-weight-bold" style={{ fontSize: 12.5 }}>{wb.ticketNo}</strong>
                      <span className="text-muted" style={{ fontSize: 11 }}>{wb.landName}</span>
                    </div>
                  </td>
                  <td>
                    <span className="px-2 py-0.5 rounded text-xs font-semibold bg-slate-100 text-slate-800 border">
                      🚛 {wb.truckNo}
                    </span>
                  </td>
                  <td className="text-slate-600">{wb.brutoKg.toLocaleString('id-ID')} Kg</td>
                  <td className="text-muted">{wb.tarraKg.toLocaleString('id-ID')} Kg</td>
                  <td>
                    <strong className="text-success font-weight-bold" style={{ fontSize: 13.5 }}>
                      {wb.nettoKg.toLocaleString('id-ID')} Kg
                    </strong>
                  </td>
                  <td>
                    <strong className="d-block text-slate-900 font-weight-medium" style={{ fontSize: 12.5 }}>{wb.grade}</strong>
                    <span className="text-muted" style={{ fontSize: 11 }}>{wb.buyer}</span>
                  </td>
                  <td className="text-end">
                    <button
                      onClick={() => handleExportTicket(wb.ticketNo)}
                      className="btn btn-sm btn-outline-success font-weight-bold px-2.5 py-1 rounded-2 d-inline-flex align-items-center gap-1 shadow-xs"
                      style={{ fontSize: 11 }}
                    >
                      <i className="ri-download-cloud-line"></i>
                      <span>Unduh Slip</span>
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
