import { useState } from 'react';
import { useRole } from '../context/RoleContext';

export const HppCalculatorPage = () => {
  const { role } = useRole();

  // State for interactive HPP calculator
  const [totalCost, setTotalCost] = useState<number>(35000000);
  const [totalYield, setTotalYield] = useState<number>(45000);
  const [areaHa, setAreaHa] = useState<number>(2.0);
  const [marketPrice, setMarketPrice] = useState<number>(2800);

  const costPerHa = areaHa > 0 ? totalCost / areaHa : 0;
  const hppPerKg = totalYield > 0 ? totalCost / totalYield : 0;
  const marginPerKg = marketPrice - hppPerKg;
  const totalProjectedProfit = marginPerKg * totalYield;

  const hppData = [
    { cropName: 'Blok A1 - Anggur Impor Shine Muscat (1000m²)', areaHa: 0.1, totalCostRp: 15000000, totalYieldKg: 3500, costPerHaRp: 150000000, hppPerKgRp: 4285, marketPriceRp: 12000, marginRp: 7715 },
    { cropName: 'Blok A2 - Kelapa Sawit Tenera (2.0 Ha Jonggol)', areaHa: 2.0, totalCostRp: 35000000, totalYieldKg: 45000, costPerHaRp: 17500000, hppPerKgRp: 777, marketPriceRp: 2800, marginRp: 2023 },
    { cropName: 'Blok B1 - Melon Intanon Golden Sweet (5000m²)', areaHa: 0.5, totalCostRp: 18000000, totalYieldKg: 15000, costPerHaRp: 36000000, hppPerKgRp: 1200, marketPriceRp: 4500, marginRp: 3300 },
  ];

  return (
    <div className="w-100 space-y-4">
      {/* Header Banner */}
      <div className="card-box p-4 rounded-4 space-y-3">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
          <div>
            <span className="tmp-badge-card emerald mb-2 d-inline-block">
              <i className="ri-calculator-line me-1"></i> KALKULASI HARGA MODAL & KEUNTUNGAN KEBUN
            </span>
            <h2 className="font-weight-extrabold text-dark mb-1" style={{ fontSize: 18 }}>
              Kalkulator Harga Modal (HPP) & Keuntungan Panen
            </h2>
            <p className="text-secondary mb-0 font-weight-medium" style={{ fontSize: 13 }}>
              Simulasi perhitungan modal tanam per kilo, modal per hektar, dan estimasi keuntungan bersih hasil panen kebun
            </p>
          </div>
          <span className="badge bg-primary text-white px-3 py-2 rounded-pill font-weight-bold d-inline-flex align-items-center gap-1.5 shadow-sm" style={{ fontSize: 11 }}>
            <i className="ri-shield-user-line"></i> Hak Akses: {role}
          </span>
        </div>
      </div>

      {/* Interactive HPP Simulation Card */}
      <div className="card-box p-4 rounded-4 space-y-4">
        <div className="d-flex justify-content-between align-items-center pb-3 border-bottom">
          <div>
            <h4 className="font-weight-extrabold text-dark m-0 d-flex align-items-center gap-2" style={{ fontSize: 16 }}>
              <span className="corpox-icon-box emerald" style={{ width: 32, height: 32, fontSize: 16 }}>
                <i className="ri-functions-line"></i>
              </span>
              Simulator Perhitungan Modal & Estimasi Keuntungan Panen
            </h4>
            <p className="text-secondary mb-0 font-weight-medium mt-0.5" style={{ fontSize: 12 }}>
              Ubah angka di bawah untuk mensimulasikan HPP dan estimasi keuntungan hasil panen
            </p>
          </div>
          <span className="tmp-badge-card success">Simulasi Interaktif</span>
        </div>

        {/* Input Form Fields */}
        <div className="row g-3">
          <div className="col-12 col-md-3">
            <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12 }}>
              💰 Total Biaya Operasional (OPEX)
            </label>
            <div className="input-group">
              <span className="input-group-text bg-light text-muted font-weight-bold" style={{ fontSize: 12 }}>Rp</span>
              <input
                type="number"
                value={totalCost}
                onChange={(e) => setTotalCost(Number(e.target.value))}
                className="form-control p-2.5 bg-light border text-dark font-weight-bold"
                style={{ fontSize: 14 }}
              />
            </div>
            <span className="text-muted font-weight-medium d-block mt-1" style={{ fontSize: 11 }}>
              Total modal pupuk, upah, & bibit
            </span>
          </div>

          <div className="col-12 col-md-3">
            <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12 }}>
              📦 Total Estimasi Hasil Panen
            </label>
            <div className="input-group">
              <input
                type="number"
                value={totalYield}
                onChange={(e) => setTotalYield(Number(e.target.value))}
                className="form-control p-2.5 bg-light border text-dark font-weight-bold"
                style={{ fontSize: 14 }}
              />
              <span className="input-group-text bg-light text-muted font-weight-bold" style={{ fontSize: 12 }}>Kg</span>
            </div>
            <span className="text-muted font-weight-medium d-block mt-1" style={{ fontSize: 11 }}>
              Proyeksi total tonase panen
            </span>
          </div>

          <div className="col-12 col-md-3">
            <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12 }}>
              📏 Total Luas Lahan Tanam
            </label>
            <div className="input-group">
              <input
                type="number"
                step="0.1"
                value={areaHa}
                onChange={(e) => setAreaHa(Number(e.target.value))}
                className="form-control p-2.5 bg-light border text-dark font-weight-bold"
                style={{ fontSize: 14 }}
              />
              <span className="input-group-text bg-light text-muted font-weight-bold" style={{ fontSize: 12 }}>Hektar (Ha)</span>
            </div>
            <span className="text-muted font-weight-medium d-block mt-1" style={{ fontSize: 11 }}>
              Luas area lahan aktif
            </span>
          </div>

          <div className="col-12 col-md-3">
            <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12 }}>
              🏷️ Harga Jual Pasar Kebun
            </label>
            <div className="input-group">
              <span className="input-group-text bg-light text-muted font-weight-bold" style={{ fontSize: 12 }}>Rp</span>
              <input
                type="number"
                value={marketPrice}
                onChange={(e) => setMarketPrice(Number(e.target.value))}
                className="form-control p-2.5 bg-light border text-dark font-weight-bold"
                style={{ fontSize: 14 }}
              />
              <span className="input-group-text bg-light text-muted font-weight-bold" style={{ fontSize: 12 }}>/ Kg</span>
            </div>
            <span className="text-muted font-weight-medium d-block mt-1" style={{ fontSize: 11 }}>
              Harga kontrak jual ke pembeli
            </span>
          </div>
        </div>

        {/* Corpox Bento Result Cards */}
        <div className="row g-3 pt-2">
          <div className="col-12 col-sm-6 col-xl-3">
            <div className="p-3.5 rounded-3 border bg-light d-flex align-items-center justify-content-between h-100">
              <div>
                <span className="text-uppercase text-muted font-weight-bold d-block mb-1" style={{ fontSize: 11 }}>
                  Harga Modal Per Kilo (HPP)
                </span>
                <strong className="h4 font-weight-extrabold text-primary m-0" style={{ fontSize: 18 }}>
                  Rp {Math.round(hppPerKg).toLocaleString('id-ID')} / Kg
                </strong>
                <span className="d-block text-secondary font-weight-medium mt-1" style={{ fontSize: 11 }}>
                  Modal tanam per 1 Kg panen
                </span>
              </div>
              <div className="corpox-icon-box blue" style={{ width: 40, height: 40, fontSize: 18 }}>
                <i className="ri-price-tag-3-line"></i>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-xl-3">
            <div className="p-3.5 rounded-3 border bg-light d-flex align-items-center justify-content-between h-100">
              <div>
                <span className="text-uppercase text-muted font-weight-bold d-block mb-1" style={{ fontSize: 11 }}>
                  Modal Kerja Per Hektar
                </span>
                <strong className="h4 font-weight-extrabold text-dark m-0" style={{ fontSize: 18 }}>
                  Rp {Math.round(costPerHa).toLocaleString('id-ID')} / Ha
                </strong>
                <span className="d-block text-secondary font-weight-medium mt-1" style={{ fontSize: 11 }}>
                  Biaya pengolahan per Hektar
                </span>
              </div>
              <div className="corpox-icon-box amber" style={{ width: 40, height: 40, fontSize: 18 }}>
                <i className="ri-map-pin-2-line"></i>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-xl-3">
            <div className="p-3.5 rounded-3 border bg-light d-flex align-items-center justify-content-between h-100">
              <div>
                <span className="text-uppercase text-muted font-weight-bold d-block mb-1" style={{ fontSize: 11 }}>
                  Keuntungan Bersih Per Kilo
                </span>
                <strong className="h4 font-weight-extrabold text-success m-0" style={{ fontSize: 18 }}>
                  + Rp {Math.round(marginPerKg).toLocaleString('id-ID')} / Kg
                </strong>
                <span className="d-block text-success font-weight-bold mt-1" style={{ fontSize: 11 }}>
                  Margin bersih penjualan
                </span>
              </div>
              <div className="corpox-icon-box emerald" style={{ width: 40, height: 40, fontSize: 18 }}>
                <i className="ri-line-chart-line"></i>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-xl-3">
            <div className="p-3.5 rounded-3 border bg-light d-flex align-items-center justify-content-between h-100">
              <div>
                <span className="text-uppercase text-muted font-weight-bold d-block mb-1" style={{ fontSize: 11 }}>
                  Total Proyeksi Keuntungan
                </span>
                <strong className="h4 font-weight-extrabold text-success m-0" style={{ fontSize: 18 }}>
                  Rp {Math.round(totalProjectedProfit).toLocaleString('id-ID')}
                </strong>
                <span className="d-block text-success font-weight-bold mt-1" style={{ fontSize: 11 }}>
                  Estimasi Laba Bersih Panen
                </span>
              </div>
              <div className="corpox-icon-box emerald" style={{ width: 40, height: 40, fontSize: 18 }}>
                <i className="ri-money-dollar-circle-line"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Breakdown Table for All Land Blocks */}
      <div className="card-box p-4 rounded-4 space-y-4">
        <div className="d-flex justify-content-between align-items-center pb-3 border-bottom">
          <h4 className="font-weight-extrabold text-dark m-0 d-flex align-items-center gap-2" style={{ fontSize: 15 }}>
            <i className="ri-file-list-3-line text-success"></i> Rincian Harga Modal & Keuntungan Per Blok Kebun
          </h4>
          <span className="tmp-badge-card success">
            Analisis Rinci 3 Blok
          </span>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0" style={{ fontSize: 13 }}>
            <thead className="table-light">
              <tr>
                <th className="font-weight-bold text-dark">Lokasi Blok & Jenis Tanaman</th>
                <th className="font-weight-bold text-dark">Luas Lahan</th>
                <th className="font-weight-bold text-dark">Total Modal Biaya</th>
                <th className="font-weight-bold text-dark">Total Hasil Panen</th>
                <th className="font-weight-bold text-dark">Modal / Hektar</th>
                <th className="font-weight-bold text-dark">Modal Tanam / Kg (HPP)</th>
                <th className="font-weight-bold text-dark">Harga Jual / Kg</th>
                <th className="font-weight-bold text-dark">Keuntungan Bersih / Kg</th>
              </tr>
            </thead>
            <tbody>
              {hppData.map((hpp, idx) => (
                <tr key={idx}>
                  <td className="font-weight-bold text-dark">{hpp.cropName}</td>
                  <td><span className="badge bg-light text-dark border font-weight-bold">{hpp.areaHa} Ha</span></td>
                  <td className="text-danger font-weight-bold">Rp {hpp.totalCostRp.toLocaleString('id-ID')}</td>
                  <td className="font-weight-bold text-dark">{hpp.totalYieldKg.toLocaleString('id-ID')} Kg</td>
                  <td className="text-secondary">Rp {hpp.costPerHaRp.toLocaleString('id-ID')} / Ha</td>
                  <td><span className="badge bg-light text-dark border font-mono font-weight-bold">Rp {hpp.hppPerKgRp.toLocaleString('id-ID')} / Kg</span></td>
                  <td className="text-secondary">Rp {hpp.marketPriceRp.toLocaleString('id-ID')} / Kg</td>
                  <td className="text-success font-weight-extrabold" style={{ fontSize: 14 }}>
                    + Rp {hpp.marginRp.toLocaleString('id-ID')} / Kg
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
