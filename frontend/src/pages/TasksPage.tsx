import { DailyTasklistCalendar } from '../components/DailyTasklistCalendar';
import { useRole } from '../context/RoleContext';

export const TasksPage = () => {
  const { role } = useRole();

  return (
    <div className="w-100 space-y-4">
      {/* Header Banner */}
      <div className="bg-white p-4 rounded-4 border shadow-sm d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
          <span className="badge bg-success-subtle text-success border border-success px-2.5 py-1 rounded-pill uppercase font-weight-bold mb-1.5 d-inline-block" style={{ fontSize: 11 }}>
            <i className="ri-task-line me-1"></i> MANAJEMEN PEKERJAAN & KALENDER SOP
          </span>
          <h2 className="page-header-title font-weight-bold text-dark mb-0">Jadwal Tasklist Operasional Harian & Instruksi SOP</h2>
          <p className="text-secondary mb-0" style={{ fontSize: 13 }}>
            Pemantauan Eksekusi Pekerjaan Kebun Setiap Hari, Check-in SLA Petani, & Pengingat SOP Kebun
          </p>
        </div>
        <span className="badge bg-primary text-white px-3 py-2 rounded-pill font-weight-bold d-inline-flex align-items-center gap-1.5 shadow-sm" style={{ fontSize: 11 }}>
          <i className="ri-shield-user-line"></i> Hak Akses: {role}
        </span>
      </div>

      {/* Main Daily Tasklist & Calendar Schedule Component */}
      <DailyTasklistCalendar />
    </div>
  );
};
