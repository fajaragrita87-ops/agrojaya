import { PlantationLifecycleProgress } from '../components/PlantationLifecycleProgress';
import { useRole } from '../context/RoleContext';

export const PlantationLifecyclePage = () => {
  const { role } = useRole();

  return (
    <div className="w-100 space-y-4">
      {/* Header Banner */}
      <div className="bg-white p-4 p-md-5 rounded-4 border shadow-sm d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
          <span className="badge bg-success-subtle text-success border border-success px-3 py-1 rounded-pill uppercase font-weight-bold mb-2 d-inline-block" style={{ fontSize: 11 }}>
            <i className="ri-plant-line me-1"></i> FASA TAHAPAN LAHAN JONGGOL BOGOR
          </span>
          <h2 className="page-header-title font-weight-extrabold text-dark mb-0">Siklus Pengolahan Lahan & Progres Fisik Kebun</h2>
          <p className="text-secondary mb-0" style={{ fontSize: 14 }}>
            Pemantauan Real-Time 8 Fasa Siklus Lahan: Pembukaan, Olah Tanah, Bedengan, Irigasi, Tanam, Perawatan, Panen & Rotasi (Mode {role})
          </p>
        </div>
        <span className="badge bg-success text-white px-3 py-2 rounded-pill font-weight-bold d-inline-flex align-items-center gap-1.5 shadow-sm" style={{ fontSize: 11 }}>
          <i className="ri-checkbox-circle-line"></i> Sync Real-Time Lintas Peran
        </span>
      </div>

      {/* Standalone Plantation Lifecycle Stepper & Controls */}
      <PlantationLifecycleProgress />
    </div>
  );
};
