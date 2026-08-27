import { PlantationLifecycleProgress } from '../components/PlantationLifecycleProgress';

export const PlantationLifecyclePage = () => {
  return (
    <div className="w-100 space-y-4">
      {/* Header Banner */}
      <div className="card-box p-4 rounded-4 bg-white border shadow-sm d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
          <h2 className="page-header-title font-weight-bold text-dark mb-1" style={{ fontSize: 20 }}>
            Siklus & Kesiapan Fisik Lahan (8 Tahap)
          </h2>
          <p className="text-secondary mb-0 font-weight-medium" style={{ fontSize: 13 }}>
            Transparansi pembuktian kesiapan lahan dari pembersihan tanah hingga panen & rotasi Jonggol
          </p>
        </div>
        <span className="badge bg-success text-white px-3 py-1.5 rounded-pill font-weight-bold d-inline-flex align-items-center gap-1.5 shadow-sm" style={{ fontSize: 11.5 }}>
          <i className="ri-shield-check-line"></i> Bukti Fisik Lapangan
        </span>
      </div>

      {/* Standalone Plantation Lifecycle Stepper & Controls */}
      <PlantationLifecycleProgress />
    </div>
  );
};
