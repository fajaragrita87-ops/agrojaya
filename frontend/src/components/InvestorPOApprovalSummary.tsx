import React, { useState, useEffect } from 'react';
import { getPurchases, updatePurchaseStatus } from '../services/api';
import type { PurchaseItem } from './PurchaseOrderInventoryShowcase';

export const InvestorPOApprovalSummary: React.FC = () => {
  const [poList, setPoList] = useState<PurchaseItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPOs = async () => {
    try {
      setLoading(true);
      const res = await getPurchases();
      setPoList(res.data);
    } catch (error) {
      console.error('Failed to load POs', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPOs();
    const handleSync = () => fetchPOs();
    window.addEventListener('agrojaya-po-updated', handleSync);
    return () => window.removeEventListener('agrojaya-po-updated', handleSync);
  }, []);

  // Filter POs waiting for Layer 3 Investor Approval
  const pendingInvestorPOs = poList.filter((po) => po.status === 'PENDING_INVESTOR');
  const approvedPOs = poList.filter((po) => po.status === 'APPROVED_WAITING_DISBURSEMENT' || po.status === 'DISBURSED');

  const handleApprovePO = async (id: string, poNumber: string) => {
    try {
      await updatePurchaseStatus(id, { status: 'APPROVED_WAITING_DISBURSEMENT' });
      alert(`Persetujuan Layer 3 Investor untuk Tiket ${poNumber} Berhasil Dikirimkan Ke Finance!`);
      fetchPOs();
      window.dispatchEvent(new Event('agrojaya-po-updated'));
    } catch (error) {
      alert('Gagal menyetujui PO');
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });
  };

  return (
    <div className="bg-white p-4 p-md-5 rounded-4 border shadow-sm space-y-4">
      {/* Header Info */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 pb-3 border-bottom">
        <div>
          <span className="badge bg-info-subtle text-info border border-info px-3 py-1 rounded-pill uppercase font-weight-bold mb-2 d-inline-block" style={{ fontSize: 11 }}>
            <i className="ri-shield-check-line me-1"></i> LOGIKA PERSETUJUAN INVESTOR (LAYER 3)
          </span>
          <h3 className="h4 font-weight-bold text-dark mb-1">
            Persetujuan Transparansi Alokasi Modal PO Operasional
          </h3>
          <p className="text-secondary mb-0" style={{ fontSize: 13 }}>
            Ringkasan Eksekutif Pengajuan PO yang Telah Diverifikasi Finance (Layer 1) & Diotorisasi Direktur (Layer 2)
          </p>
        </div>

        <div className="d-flex align-items-center gap-2">
          <span className="badge bg-warning text-dark font-weight-bold px-3 py-2 rounded-pill shadow-xs" style={{ fontSize: 12 }}>
            <i className="ri-time-line me-1"></i> {pendingInvestorPOs.length} Berkas Menunggu Persetujuan
          </span>
        </div>
      </div>

      {/* Pending Investor PO Cards (Clean, Simple 1-Click Approval) */}
      {loading && pendingInvestorPOs.length === 0 ? (
        <div className="p-4 text-center text-muted">Memuat data dari server...</div>
      ) : pendingInvestorPOs.length > 0 ? (
        <div className="space-y-3">
          {pendingInvestorPOs.map((po) => (
            <div key={po.id} className="p-4 rounded-4 border border-info bg-info-subtle d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 shadow-xs">
              <div className="space-y-1">
                <div className="d-flex align-items-center gap-2">
                  <span className="badge bg-info text-white font-mono font-weight-bold">{po.poNumber}</span>
                  <span className="badge bg-white text-dark border font-weight-bold">{po.category}</span>
                  <span className="badge bg-success text-white font-weight-bold" style={{ fontSize: 10 }}>✅ LAYER 1 & 2 DISERTAI AUDIT</span>
                </div>
                <h5 className="font-weight-extrabold text-dark m-0 mt-1" style={{ fontSize: 16 }}>{po.itemName}</h5>
                <p className="text-secondary mb-0" style={{ fontSize: 12 }}>
                  📍 Target Lahan: <b>{po.targetLand}</b> • Penggunaan: <i>"{po.usageDetails}"</i>
                </p>
                <small className="text-muted d-block" style={{ fontSize: 11 }}>
                  Pemohon: <b>{po.createdBy?.name || 'Manajer Ops'}</b> | Tgl Pakai: <b>{po.usageTargetDate}</b>
                </small>
              </div>

              <div className="text-end d-flex flex-column align-items-md-end gap-2">
                <strong className="h4 text-danger font-weight-extrabold m-0" style={{ fontSize: 20 }}>
                  Rp {po.totalPrice?.toLocaleString('id-ID')}
                </strong>
                <button
                  onClick={() => handleApprovePO(po.id, po.poNumber)}
                  className="btn btn-info text-white font-weight-bold px-4 py-2 rounded-3 shadow-sm d-inline-flex align-items-center gap-2"
                  style={{ fontSize: 13 }}
                >
                  <i className="ri-check-double-line"></i> Setujui Alokasi Modal (Layer 3)
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4 bg-success-subtle text-success rounded-4 border border-success d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-3">
            <i className="ri-checkbox-circle-fill h2 text-success m-0"></i>
            <div>
              <strong className="d-block text-success-emphasis" style={{ fontSize: 14 }}>Semua Pengajuan PO Modal Investasi Telah Disetujui!</strong>
              <span className="text-secondary" style={{ fontSize: 12 }}>Tidak ada berkas PO yang membutuhkan persetujuan investor saat ini. Ringkasan KPI modal dalam kondisi aman.</span>
            </div>
          </div>
          <span className="badge bg-success text-white font-weight-bold px-3 py-1.5 rounded-pill" style={{ fontSize: 11 }}>
            Status Kas: Aman
          </span>
        </div>
      )}

      {/* Audit Log Summary Table (Read-Only Executive Summary) */}
      <div className="pt-2">
        <h5 className="font-weight-bold text-dark mb-2" style={{ fontSize: 14 }}>
          <i className="ri-history-line me-1 text-secondary"></i> Riwayat Persetujuan Investor Terakhir ({approvedPOs.length} Disetujui)
        </h5>
        <div className="table-responsive">
          <table className="table table-sm table-hover align-middle mb-0" style={{ fontSize: 12 }}>
            <thead className="table-light">
              <tr>
                <th>No PO</th>
                <th>Pengadaan Barang</th>
                <th>Target Lahan</th>
                <th>Nominal OPEX</th>
                <th>Tanggal Disetujui</th>
                <th>Status Modal</th>
              </tr>
            </thead>
            <tbody>
              {approvedPOs.map((po) => (
                <tr key={po.id}>
                  <td><strong className="badge bg-light text-dark border font-mono">{po.poNumber}</strong></td>
                  <td className="font-weight-bold text-dark">{po.itemName}</td>
                  <td className="text-secondary">{po.targetLand}</td>
                  <td><strong className="text-success">Rp {po.totalPrice?.toLocaleString('id-ID')}</strong></td>
                  <td className="text-muted">{formatDate(po.investorApprovedAt)}</td>
                  <td>
                    <span className="badge bg-success-subtle text-success border border-success font-weight-bold">
                      {po.status === 'DISBURSED' ? '💵 DANA CAIR' : '✅ APPROVED'}
                    </span>
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
