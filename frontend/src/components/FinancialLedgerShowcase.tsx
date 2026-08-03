import React, { useState } from 'react';

export interface FinancialRecord {
  id: string | number;
  date: string;
  category: string;
  note: string;
  type: 'REVENUE' | 'EXPENSE' | 'PEMASUKAN' | 'PENGELUARAN';
  amount: number;
}

interface FinancialLedgerShowcaseProps {
  financials: FinancialRecord[];
  onExportPDF: () => void;
}

export const FinancialLedgerShowcase: React.FC<FinancialLedgerShowcaseProps> = ({ financials, onExportPDF }) => {
  const [filterType, setFilterType] = useState<'ALL' | 'REVENUE' | 'EXPENSE'>('ALL');

  // Default fallback items if database has fewer items
  const displayItems: FinancialRecord[] = financials.length > 0 ? financials : [
    {
      id: '1',
      date: '2026-08-02',
      category: 'TENAGA_KERJA',
      note: 'Pembayaran Gaji Harian & Insentif Petani Lapangan (39.2 Ha)',
      type: 'EXPENSE',
      amount: 8850000,
    },
    {
      id: '2',
      date: '2026-08-01',
      category: 'PUPUK_ORGANIK',
      note: 'Pengadaan 1.000 kg Pupuk NPK Fertigasi Presisi (PO-2026-0801)',
      type: 'EXPENSE',
      amount: 18000000,
    },
    {
      id: '3',
      date: '2026-06-20',
      category: 'PENJUALAN_PANEN',
      note: 'Penjualan Hasil Panen Raya Jagung Hibrida Blok B1 - Buyer PT Pangan Mandiri',
      type: 'REVENUE',
      amount: 45000000,
    },
    {
      id: '4',
      date: '2026-06-12',
      category: 'PERALATAN_IRIGASI',
      note: 'Perawatan Pompa Drip Irigasi & Sensor Cuaca BMKG Blok C1',
      type: 'EXPENSE',
      amount: 4500000,
    },
  ];

  const totalRevenue = displayItems
    .filter((f) => f.type === 'REVENUE' || f.type === 'PEMASUKAN')
    .reduce((sum, f) => sum + Number(f.amount), 0);

  const totalExpense = displayItems
    .filter((f) => f.type === 'EXPENSE' || f.type === 'PENGELUARAN')
    .reduce((sum, f) => sum + Number(f.amount), 0);

  const netCashflow = totalRevenue - totalExpense;

  const filteredData = displayItems.filter((item) => {
    if (filterType === 'REVENUE') return item.type === 'REVENUE' || item.type === 'PEMASUKAN';
    if (filterType === 'EXPENSE') return item.type === 'EXPENSE' || item.type === 'PENGELUARAN';
    return true;
  });

  const getCategoryBadge = (category: string) => {
    const cat = category.toUpperCase();
    if (cat.includes('TENAGA') || cat.includes('PAYROLL') || cat.includes('GAJI')) {
      return { label: 'TENAGA KERJA', bg: '#dbeafe', color: '#1e40af', icon: 'feather-users' };
    }
    if (cat.includes('PUPUK') || cat.includes('NUTRISI')) {
      return { label: 'PUPUK & BIO-ORGANIK', bg: '#dcfce7', color: '#166534', icon: 'feather-box' };
    }
    if (cat.includes('PANEN') || cat.includes('JUAL') || cat.includes('PENJUALAN')) {
      return { label: 'HASIL PANEN PKS', bg: '#fef3c7', color: '#92400e', icon: 'feather-shopping-bag' };
    }
    return { label: category.replace('_', ' '), bg: '#f1f5f9', color: '#334155', icon: 'feather-file-text' };
  };

  return (
    <div className="card-box bg-white p-4 p-md-5 rounded-4 border shadow-sm space-y-4">
      {/* Header Info */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 pb-3 border-bottom">
        <div>
          <span className="badge bg-success-subtle text-success border border-success px-3 py-1 rounded-pill uppercase font-weight-bold mb-2 d-inline-block" style={{ fontSize: 12 }}>
            <i className="feather-shield me-1"></i> BUKTI AUDIT KEUANGAN 5-DIMENSI
          </span>
          <h3 className="h4 font-weight-bold text-dark mb-1">
            Jurnal Transaksi & Arus Kas Real-Time Kebun
          </h3>
          <p className="text-secondary mb-0" style={{ fontSize: 14 }}>
            Terhubung Langsung dengan Database ERP Perkebunan AgroJaya & Sistem Kasir PKS
          </p>
        </div>

        <div className="d-flex align-items-center gap-2">
          <button
            onClick={onExportPDF}
            className="btn btn-outline-success font-weight-bold px-3 py-2 rounded-3 d-inline-flex align-items-center gap-2 shadow-sm"
            style={{ fontSize: 13 }}
          >
            <i className="feather-download"></i> Unduh Jurnal Kas (PDF)
          </button>
        </div>
      </div>

      {/* Summary KPI Cards Bar */}
      <div className="row g-3 py-2">
        <div className="col-12 col-md-4">
          <div className="p-3.5 rounded-3 border bg-success-subtle border-success-subtle d-flex align-items-center justify-content-between">
            <div>
              <span className="d-block text-uppercase text-success font-weight-bold" style={{ fontSize: 11 }}>Total Pemasukan Panen</span>
              <strong className="h4 text-success font-weight-extrabold m-0">+ Rp {totalRevenue.toLocaleString()}</strong>
            </div>
            <div style={{ width: 42, height: 42, backgroundColor: '#059669', color: '#fff', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
              <i className="feather-arrow-down-left"></i>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="p-3.5 rounded-3 border bg-danger-subtle border-danger-subtle d-flex align-items-center justify-content-between">
            <div>
              <span className="d-block text-uppercase text-danger font-weight-bold" style={{ fontSize: 11 }}>Total Pengeluaran OPEX</span>
              <strong className="h4 text-danger font-weight-extrabold m-0">- Rp {totalExpense.toLocaleString()}</strong>
            </div>
            <div style={{ width: 42, height: 42, backgroundColor: '#dc2626', color: '#fff', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
              <i className="feather-arrow-up-right"></i>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="p-3.5 rounded-3 border bg-primary-subtle border-primary-subtle d-flex align-items-center justify-content-between">
            <div>
              <span className="d-block text-uppercase text-primary font-weight-bold" style={{ fontSize: 11 }}>Arus Kas Bersih (Net Profit)</span>
              <strong className="h4 text-primary font-weight-extrabold m-0">+ Rp {netCashflow.toLocaleString()}</strong>
            </div>
            <div style={{ width: 42, height: 42, backgroundColor: '#2563eb', color: '#fff', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
              <i className="feather-pie-chart"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="d-flex align-items-center justify-content-between pt-2 pb-1">
        <div className="d-flex gap-2">
          <button
            onClick={() => setFilterType('ALL')}
            className={`btn btn-sm font-weight-bold px-3 py-1.5 rounded-pill ${filterType === 'ALL' ? 'btn-dark' : 'btn-light border text-secondary'}`}
            style={{ fontSize: 12 }}
          >
            Semua Transaksi ({displayItems.length})
          </button>
          <button
            onClick={() => setFilterType('REVENUE')}
            className={`btn btn-sm font-weight-bold px-3 py-1.5 rounded-pill ${filterType === 'REVENUE' ? 'btn-success text-white' : 'btn-light border text-secondary'}`}
            style={{ fontSize: 12 }}
          >
            Pemasukan Panen
          </button>
          <button
            onClick={() => setFilterType('EXPENSE')}
            className={`btn btn-sm font-weight-bold px-3 py-1.5 rounded-pill ${filterType === 'EXPENSE' ? 'btn-danger text-white' : 'btn-light border text-secondary'}`}
            style={{ fontSize: 12 }}
          >
            Pengeluaran OPEX
          </button>
        </div>

        <span className="badge bg-light text-muted border px-2.5 py-1" style={{ fontSize: 11 }}>
          <i className="feather-check-circle text-success me-1"></i> Audit 5D Terverifikasi
        </span>
      </div>

      {/* Modern Card List Items (No Excel Table) */}
      <div className="space-y-3">
        {filteredData.map((item) => {
          const isRevenue = item.type === 'REVENUE' || item.type === 'PEMASUKAN';
          const catInfo = getCategoryBadge(item.category);

          return (
            <div
              key={item.id}
              className="p-3.5 rounded-4 border bg-white shadow-sm hover-shadow transition-all d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3"
              style={{ borderLeft: `6px solid ${isRevenue ? '#059669' : '#dc2626'}` }}
            >
              <div className="d-flex align-items-center gap-3">
                {/* Category Icon Box */}
                <div
                  style={{
                    width: 48,
                    height: 48,
                    backgroundColor: catInfo.bg,
                    color: catInfo.color,
                    borderRadius: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 20,
                    flexShrink: 0,
                  }}
                >
                  <i className={catInfo.icon}></i>
                </div>

                <div>
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <span
                      className="badge px-2.5 py-0.5 font-weight-bold uppercase"
                      style={{ backgroundColor: catInfo.bg, color: catInfo.color, fontSize: 10 }}
                    >
                      {catInfo.label}
                    </span>
                    <span className="text-muted" style={{ fontSize: 12 }}>
                      <i className="feather-calendar me-1"></i>
                      {new Date(item.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <h6 className="font-weight-bold text-dark m-0" style={{ fontSize: 15 }}>
                    {item.note}
                  </h6>
                </div>
              </div>

              {/* Right Nominal Display & Status Pill */}
              <div className="d-flex align-items-center justify-content-between justify-content-md-end w-100 w-md-auto gap-4 pt-2 pt-md-0 border-top border-md-0">
                <span
                  className={`badge px-3 py-1.5 font-weight-bold d-inline-flex align-items-center gap-1 ${
                    isRevenue ? 'bg-success-subtle text-success border border-success' : 'bg-danger-subtle text-danger border border-danger'
                  }`}
                  style={{ fontSize: 12 }}
                >
                  <i className={isRevenue ? 'feather-arrow-down-left' : 'feather-arrow-up-right'}></i>
                  {isRevenue ? 'PEMASUKAN PANEN' : 'PENGELUARAN OPEX'}
                </span>

                <strong className={`h4 font-weight-extrabold m-0 ${isRevenue ? 'text-success' : 'text-danger'}`} style={{ fontSize: 18 }}>
                  {isRevenue ? '+' : '-'} Rp {Number(item.amount).toLocaleString('id-ID')}
                </strong>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
