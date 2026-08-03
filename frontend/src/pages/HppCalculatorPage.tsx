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
      <div className="bg-white p-4 rounded-4 border shadow-sm d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
          <span className="badge bg-primary-subtle text-primary border border-primary px-2.5 py-1 rounded-pill uppercase font-weight-bold mb-1.5 d-inline-block" style={{ fontSize: 11 }}>
            <i className="ri-calculator-line me-1"></i> ANALISIS UNIT EKONOMIS & COSTING LEADING
          </span>
          <h2 className="font-weight-bold text-dark mb-1" style={{ fontSize: 18 }}>Kalkulasi HPP Lahan & Profitabilitas Panen</h2>
          <p className="text-secondary mb-0" style={{ fontSize: 13 }}>
            Analisis Harga Pokok Produksi (HPP/Kg & HPP/Ha), Margin Keuntungan Panen, & Simulasi Unit Ekonomis Lahan
          </p>
        </div>
        <span className="badge bg-primary text-white px-3 py-2 rounded-pill font-weight-bold d-inline-flex align-items-center gap-1.5 shadow-sm" style={{ fontSize: 11 }}>
          <i className="ri-shield-user-line"></i> Hak Akses: {role}
        </span>
      </div>

      {/* Interactive HPP Simulation Card */}
      <div className="bg-white p-4 rounded-4 border shadow-sm space-y-3">
        <h4 className="font-weight-bold text-dark m-0 d-flex align-items-center gap-2" style={{ fontSize: 15 }}>
          <i className="ri-functions-line text-success"></i> Simulator Harga Pokok Produksi (HPP) & Imbal Hasil
        </h4>

        <div className="row g-3 pt-1">
          <div className="col-12 col-md-3">
            <label className="font-weight-bold text-dark mb-1 d-block" style={{ fontSize: 12 }}>Total Biaya OPEX (Rp):</label>
            <input
              type="number"
              value={totalCost}
              onChange={(e) => setTotalCost(Number(e.target.value))}
              className="form-control p-2.5 bg-light border-0 rounded-3 font-weight-bold"
              style={{ fontSize: 13 }}
            />
          </div>
          <div className="col-12 col-md-3">
            <label className="font-weight-bold text-dark mb-1 d-block" style={{ fontSize: 12 }}>Total Hasil Panen (Kg):</label>
            <input
              type="number"
              value={totalYield}
              onChange={(e) => setTotalYield(Number(e.target.value))}
              className="form-control p-2.5 bg-light border-0 rounded-3 font-weight-bold"
              style={{ fontSize: 13 }}
            />
          </div>
          <div className="col-12 col-md-3">
            <label className="font-weight-bold text-dark mb-1 d-block" style={{ fontSize: 12 }}>Luas Lahan (Ha):</label>
            <input
              type="number"
              step="0.1"
              value={areaHa}
              onChange={(e) => setAreaHa(Number(e.target.value))}
              className="form-control p-2.5 bg-light border-0 rounded-3 font-weight-bold"
              style={{ fontSize: 13 }}
            />
          </div>
          <div className="col-12 col-md-3">
            <label className="font-weight-bold text-dark mb-1 d-block" style={{ fontSize: 12 }}>Harga Jual Pasar (Rp/Kg):</label>
            <input
              type="number"
              value={marketPrice}
              onChange={(e) => setMarketPrice(Number(e.target.value))}
              className="form-control p-2.5 bg-light border-0 rounded-3 font-weight-bold"
              style={{ fontSize: 13 }}
            />
          </div>
        </div>

        {/* Calculated Results Banner */}
        <div className="row g-3 bg-light p-3.5 rounded-3 border mt-2">
          <div className="col-12 col-md-3 text-center border-end">
            <span className="text-uppercase text-muted font-weight-bold d-block mb-1" style={{ fontSize: 11 }}>HPP Modal Per Kg</span>
            <strong className="h4 font-weight-extrabold text-primary m-0" style={{ fontSize: 18 }}>
              Rp {Math.round(hppPerKg).toLocaleString('id-ID')} / Kg
            </strong>
          </div>
          <div className="col-12 col-md-3 text-center border-end">
            <span className="text-uppercase text-muted font-weight-bold d-block mb-1" style={{ fontSize: 11 }}>Biaya Modal Per Hektar</span>
            <strong className="h4 font-weight-extrabold text-dark m-0" style={{ fontSize: 18 }}>
              Rp {Math.round(costPerHa).toLocaleString('id-ID')} / Ha
            </strong>
          </div>
          <div className="col-12 col-md-3 text-center border-end">
            <span className="text-uppercase text-muted font-weight-bold d-block mb-1" style={{ fontSize: 11 }}>Margin Keuntungan Per Kg</span>
            <strong className="h4 font-weight-extrabold text-success m-0" style={{ fontSize: 18 }}>
              + Rp {Math.round(marginPerKg).toLocaleString('id-ID')} / Kg
            </strong>
          </div>
          <div className="col-12 col-md-3 text-center">
            <span className="text-uppercase text-muted font-weight-bold d-block mb-1" style={{ fontSize: 11 }}>Proyeksi Laba Bersih Panen</span>
            <strong className="h4 font-weight-extrabold text-success m-0" style={{ fontSize: 18 }}>
              Rp {Math.round(totalProjectedProfit).toLocaleString('id-ID')}
            </strong>
          </div>
        </div>
      </div>

      {/* Breakdown Table for All Land Blocks */}
      <div className="bg-white rounded-4 border shadow-sm p-4 overflow-hidden space-y-3">
        <div className="d-flex justify-content-between align-items-center pb-3 border-bottom">
          <h4 className="font-weight-bold text-dark m-0 d-flex align-items-center gap-2" style={{ fontSize: 15 }}>
            <i className="ri-pie-chart-line text-primary"></i> Tabel Analisis HPP & Margin Panen Per Blok Kebun
          </h4>
          <span className="badge bg-light text-dark border font-weight-bold" style={{ fontSize: 11 }}>
            Verified Unit Economics
          </span>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0" style={{ fontSize: 13 }}>
            <thead className="table-light">
              <tr>
                <th>Komoditas Blok</th>
                <th>Luas (Ha)</th>
                <th>Total OPEX</th>
                <th>Total Panen (Kg)</th>
                <th>Biaya / Ha</th>
                <th>HPP Modal / Kg</th>
                <th>Harga Jual Pasar</th>
                <th>Margin Bersih / Kg</th>
              </tr>
            </thead>
            <tbody>
              {hppData.map((hpp, idx) => (
                <tr key={idx}>
                  <td className="font-weight-bold text-dark">{hpp.cropName}</td>
                  <td>{hpp.areaHa} Ha</td>
                  <td className="text-danger font-weight-bold">Rp {hpp.totalCostRp.toLocaleString('id-ID')}</td>
                  <td className="text-dark font-weight-bold">{hpp.totalYieldKg.toLocaleString('id-ID')} Kg</td>
                  <td>Rp {hpp.costPerHaRp.toLocaleString('id-ID')} / Ha</td>
                  <td><span className="badge bg-light text-dark border font-weight-bold" style={{ fontSize: 12 }}>Rp {hpp.hppPerKgRp.toLocaleString('id-ID')} / Kg</span></td>
                  <td className="text-dark font-weight-medium">Rp {hpp.marketPriceRp.toLocaleString('id-ID')} / Kg</td>
                  <td><strong className="text-success h6 font-weight-extrabold m-0">+ Rp {hpp.marginRp.toLocaleString('id-ID')} / Kg</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
