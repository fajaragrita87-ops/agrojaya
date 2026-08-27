import { useState } from 'react';

export const HppCalculatorPage = () => {

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
    { cropName: 'Blok A2 - Porang (2.0 Ha Jonggol)', areaHa: 2.0, totalCostRp: 35000000, totalYieldKg: 45000, costPerHaRp: 17500000, hppPerKgRp: 777, marketPriceRp: 2800, marginRp: 2023 },
    { cropName: 'Blok B1 - Melon Intanon Golden Sweet (5000m²)', areaHa: 0.5, totalCostRp: 18000000, totalYieldKg: 15000, costPerHaRp: 36000000, hppPerKgRp: 1200, marketPriceRp: 4500, marginRp: 3300 },
  ];

  return (
    <div className="w-100 space-y-4">
      {/* Header Banner */}
      <div className="card-box p-4 rounded-4 bg-white border shadow-sm d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
          <h2 className="page-header-title font-weight-bold text-dark mb-1" style={{ fontSize: 20 }}>
            Kalkulator Harga Pokok Produksi (HPP) & Margin Panen
          </h2>
          <p className="text-secondary mb-0 font-weight-medium" style={{ fontSize: 13 }}>
            Simulasi perhitungan modal tanam per kilogram, biaya per hektar, dan estimasi laba bersih hasil panen Jonggol
          </p>
        </div>
        <span className="badge bg-success text-white px-3 py-1.5 rounded-pill font-weight-bold d-inline-flex align-items-center gap-1.5 shadow-sm" style={{ fontSize: 11.5 }}>
          <i className="ri-calculator-line"></i> Model HPP Presisi
        </span>
      </div>

      {/* Simulator Section */}
      <div className="card-box p-4 rounded-4 space-y-4 bg-white border shadow-sm">
        <div className="d-flex justify-content-between align-items-center pb-2 border-bottom">
          <div>
            <h4 className="font-weight-bold text-dark m-0 !text-sm">
              Parameter Biaya & Taksasi Panen
            </h4>
            <p className="text-muted mb-0" style={{ fontSize: 12 }}>
              Sesuaikan nilai di bawah untuk mensimulasikan HPP dan estimasi laba
            </p>
          </div>
          <span className="badge bg-success-subtle text-success border border-success font-weight-bold" style={{ fontSize: 11 }}>
            Live Calculation
          </span>
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
          </div>

          <div className="col-12 col-md-3">
            <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12 }}>
              📐 Luas Lahan Terkelola
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
              <span className="input-group-text bg-light text-muted font-weight-bold" style={{ fontSize: 12 }}>Ha</span>
            </div>
          </div>

          <div className="col-12 col-md-3">
            <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12 }}>
              🏷️ Harga Jual Pasar / Offtaker
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
              <span className="input-group-text bg-light text-muted font-weight-bold" style={{ fontSize: 12 }}>/Kg</span>
            </div>
          </div>
        </div>

        {/* Calculated Output Bento Cards */}
        <div className="row g-3 pt-2">
          <div className="col-12 col-md-3">
            <div className="p-3.5 bg-light rounded-4 border">
              <span className="text-muted font-weight-bold d-block" style={{ fontSize: 11 }}>Biaya Tanam Per Hektar</span>
              <strong className="text-dark font-weight-extrabold d-block my-1" style={{ fontSize: 18 }}>
                Rp {Math.round(costPerHa).toLocaleString('id-ID')} / Ha
              </strong>
              <span className="text-secondary" style={{ fontSize: 11 }}>Total OPEX dibagi luas lahan</span>
            </div>
          </div>

          <div className="col-12 col-md-3">
            <div className="p-3.5 bg-success-subtle rounded-4 border border-success">
              <span className="text-success font-weight-bold d-block" style={{ fontSize: 11 }}>Harga Pokok (HPP) Per Kg</span>
              <strong className="text-success font-weight-extrabold d-block my-1" style={{ fontSize: 18 }}>
                Rp {Math.round(hppPerKg).toLocaleString('id-ID')} / Kg
              </strong>
              <span className="text-success font-weight-medium" style={{ fontSize: 11 }}>Batas modal minimum produksi</span>
            </div>
          </div>

          <div className="col-12 col-md-3">
            <div className="p-3.5 bg-primary-subtle rounded-4 border border-primary">
              <span className="text-primary font-weight-bold d-block" style={{ fontSize: 11 }}>Margin Keuntungan Bersih</span>
              <strong className="text-primary font-weight-extrabold d-block my-1" style={{ fontSize: 18 }}>
                Rp {Math.round(marginPerKg).toLocaleString('id-ID')} / Kg
              </strong>
              <span className="text-primary font-weight-medium" style={{ fontSize: 11 }}>
                {hppPerKg > 0 ? `+${Math.round((marginPerKg / hppPerKg) * 100)}% Markup` : '0%'}
              </span>
            </div>
          </div>

          <div className="col-12 col-md-3">
            <div className="p-3.5 bg-warning-subtle rounded-4 border border-warning">
              <span className="text-warning-emphasis font-weight-bold d-block" style={{ fontSize: 11 }}>Total Estimasi Laba Bersih</span>
              <strong className="text-warning-emphasis font-weight-extrabold d-block my-1" style={{ fontSize: 18 }}>
                Rp {Math.round(totalProjectedProfit).toLocaleString('id-ID')}
              </strong>
              <span className="text-secondary font-weight-medium" style={{ fontSize: 11 }}>Potensi pendapatan bersih panen</span>
            </div>
          </div>
        </div>
      </div>

      {/* Benchmark Matrix Section */}
      <div className="card-box p-4 rounded-4 bg-white border shadow-sm">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="font-weight-bold text-dark m-0 !text-sm">
            <i className="ri-table-line text-success me-2"></i> Matriks Komparasi HPP & Profitabilitas Antar Blok Kebun
          </h4>
          <span className="badge bg-light text-dark border font-weight-bold" style={{ fontSize: 11 }}>
            Tahun 2026
          </span>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0" style={{ fontSize: 13 }}>
            <thead className="table-light">
              <tr style={{ fontSize: 11.5 }}>
                <th className="font-weight-bold text-muted">KOMODITAS & BLOK</th>
                <th className="font-weight-bold text-muted">LUAS</th>
                <th className="font-weight-bold text-muted">TOTAL BIAYA</th>
                <th className="font-weight-bold text-muted">YIELD (KG)</th>
                <th className="font-weight-bold text-muted">HPP / KG</th>
                <th className="font-weight-bold text-muted">HARGA JUAL</th>
                <th className="font-weight-bold text-muted text-end">MARGIN LABA</th>
              </tr>
            </thead>
            <tbody>
              {hppData.map((row, idx) => (
                <tr key={idx}>
                  <td className="font-weight-bold text-dark">{row.cropName}</td>
                  <td>{row.areaHa} Ha</td>
                  <td>Rp {row.totalCostRp.toLocaleString('id-ID')}</td>
                  <td>{row.totalYieldKg.toLocaleString('id-ID')} Kg</td>
                  <td className="font-weight-bold text-success">Rp {row.hppPerKgRp.toLocaleString('id-ID')}</td>
                  <td>Rp {row.marketPriceRp.toLocaleString('id-ID')}</td>
                  <td className="text-end font-weight-extrabold text-primary">
                    +Rp {row.marginRp.toLocaleString('id-ID')} / Kg
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
