import { useEffect, useState } from 'react';
import { getFinancials } from '../services/api';
import { FinancialLedgerShowcase } from '../components/FinancialLedgerShowcase';

export const FinancialsPage = () => {
  const [financials, setFinancials] = useState<any[]>([]);

  const fetchData = async () => {
    try {
      const finRes = await getFinancials();
      setFinancials(finRes.data.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleExportPDF = () => {
    alert('Mengunduh Laporan Arus Kas & Jurnal Keuangan Terverifikasi Audit (PDF)...');
  };

  return (
    <div className="w-100 space-y-4">
      {/* Header Banner */}
      <div className="card-box p-4 rounded-4 bg-white border shadow-sm d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
          <h2 className="page-header-title font-weight-bold text-dark mb-1" style={{ fontSize: 20 }}>
            Keuangan & Jurnal Arus Kas Kebun
          </h2>
          <p className="text-secondary mb-0 font-weight-medium" style={{ fontSize: 13 }}>
            Pencatatan riil debit, kredit, biaya operasional, dan saldo kas perkebunan Jonggol
          </p>
        </div>
        <span className="badge bg-primary text-white px-3 py-1.5 rounded-pill font-weight-bold d-inline-flex align-items-center gap-1.5 shadow-sm" style={{ fontSize: 11.5 }}>
          <i className="ri-wallet-3-line"></i> Rekonsiliasi Otomatis
        </span>
      </div>

      {/* Standalone Financial Ledger Component */}
      <FinancialLedgerShowcase financials={financials} onExportPDF={handleExportPDF} />
    </div>
  );
};
