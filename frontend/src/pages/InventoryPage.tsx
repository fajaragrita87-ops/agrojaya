import { RawMaterialsInventoryShowcase } from '../components/RawMaterialsInventoryShowcase';
import { useRole } from '../context/RoleContext';

export const InventoryPage = () => {
  const { role } = useRole();

  return (
    <div className="w-100 space-y-4">
      {/* Header Banner */}
      <div className="card-box p-4 rounded-4 space-y-3">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
          <div>
            <span className="tmp-badge-card emerald mb-2 d-inline-block">
              <i className="ri-archive-line me-1"></i> LOGISTIK & GUDANG BAHAN BAKU
            </span>
            <h2 className="page-header-title font-weight-bold text-dark mb-0">
              Buku Register Stok Bahan Baku & Logistik Perkebunan
            </h2>
            <p className="text-secondary mb-0 font-weight-medium" style={{ fontSize: 13 }}>
              Pencatatan persediaan fisik pupuk, bibit unggul, biopestisida, BBM traktor, dan inventaris peralatan kebun (Mode Akses: {role})
            </p>
          </div>
          <span className="badge bg-success text-white px-3 py-2 rounded-pill font-weight-bold d-inline-flex align-items-center gap-1.5 shadow-sm" style={{ fontSize: 11 }}>
            <i className="ri-checkbox-circle-line"></i> Terintegrasi Gudang Jonggol
          </span>
        </div>
      </div>

      {/* Dedicated Raw Materials & Stock Inventory Showcase */}
      <RawMaterialsInventoryShowcase />
    </div>
  );
};
