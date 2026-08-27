import React, { useEffect, useState } from 'react';
import { getUsers, createUser } from '../services/api';
import { useRole } from '../context/RoleContext';

export const UsersPage: React.FC = () => {
  const { canManageUsers } = useRole();
  const [users, setUsers] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('PETANI');
  const [phone, setPhone] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUser({ name, email, role, phone, password: 'password123' });
      setName('');
      setEmail('');
      setPhone('');
      setShowAddForm(false);
      fetchUsers();
      alert(`Berhasil menambahkan user baru: ${name}`);
    } catch (e) {
      console.error(e);
    }
  };

  const getRoleBadge = (roleName: string) => {
    switch (roleName) {
      case 'DIREKTUR':
        return <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">DIREKTUR</span>;
      case 'INVESTOR':
        return <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">INVESTOR</span>;
      case 'MANAGER':
        return <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">MANAJER</span>;
      case 'KEPALA_KEBUN':
        return <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">KEPALA KEBUN</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">PETANI LAPANGAN</span>;
    }
  };

  return (
    <div className="w-100 space-y-4">
      {/* Header Banner */}
      <div className="card-box p-4 rounded-4 bg-white border shadow-sm d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
          <h2 className="page-header-title font-weight-bold text-dark mb-1" style={{ fontSize: 20 }}>
            Manajemen Tenaga Kerja & Pengguna Sistem
          </h2>
          <p className="text-secondary mb-0 font-weight-medium" style={{ fontSize: 13 }}>
            Kelola data staf manajemen, mandor kepala kebun, hak akses RBAC, dan efisiensi tenaga kerja
          </p>
        </div>

        {canManageUsers && (
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="btn btn-success text-white font-weight-bold px-3.5 py-2 rounded-3 shadow-xs d-inline-flex align-items-center gap-1.5"
            style={{ fontSize: 12.5 }}
          >
            <i className={showAddForm ? 'ri-close-line' : 'ri-user-add-line'}></i>
            <span>{showAddForm ? 'Tutup Formulir' : '+ Tambah Tenaga Kerja'}</span>
          </button>
        )}
      </div>

      {/* Form User Baru */}
      {canManageUsers && showAddForm && (
        <div className="card-box p-4 rounded-4 bg-white border shadow-sm space-y-3">
          <div className="pb-2 border-bottom">
            <h4 className="font-weight-bold text-dark m-0" style={{ fontSize: 15 }}>
              <i className="ri-user-add-line text-success me-1.5"></i> Formulir Registrasi Karyawan / Pengguna Baru
            </h4>
            <p className="text-muted mb-0 mt-0.5" style={{ fontSize: 12.5 }}>
              Masukkan identitas personel dan tentukan peran otorisasi pada portal Smart Farming
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-3.5 bg-light rounded-3 border space-y-3">
            <div className="row g-3">
              <div className="col-12 col-md-3">
                <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12 }}>
                  Nama Lengkap <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Nama Lengkap"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control p-2.5 bg-white border rounded-3 text-dark font-weight-medium"
                  style={{ fontSize: 13 }}
                  required
                />
              </div>

              <div className="col-12 col-md-3">
                <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12 }}>
                  Email Akses <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  placeholder="user@smartfarming.id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control p-2.5 bg-white border rounded-3 text-dark font-weight-medium"
                  style={{ fontSize: 13 }}
                  required
                />
              </div>

              <div className="col-12 col-md-3">
                <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12 }}>
                  No. WhatsApp / Telepon
                </label>
                <input
                  type="text"
                  placeholder="0812-xxxx-xxxx"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-control p-2.5 bg-white border rounded-3 text-dark font-weight-medium"
                  style={{ fontSize: 13 }}
                />
              </div>

              <div className="col-12 col-md-3">
                <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12 }}>
                  Peran & Hak Akses (RBAC) <span className="text-danger">*</span>
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="form-select p-2.5 bg-white border rounded-3 font-weight-bold"
                  style={{ fontSize: 13 }}
                >
                  <option value="PETANI">Petani Lapangan</option>
                  <option value="KEPALA_KEBUN">Kepala Kebun</option>
                  <option value="MANAGER">Manajer Operasional</option>
                  <option value="FINANCE">Finance (Keuangan)</option>
                  <option value="DIREKTUR">Direktur Utama</option>
                  <option value="INVESTOR">Investor</option>
                </select>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2 pt-2 border-top">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="btn btn-light border font-weight-bold px-3 py-2 rounded-3"
                style={{ fontSize: 12.5 }}
              >
                Batal
              </button>
              <button
                type="submit"
                className="btn btn-success text-white font-weight-bold px-4 py-2 rounded-3 shadow-xs d-flex align-items-center gap-1.5"
                style={{ fontSize: 12.5 }}
              >
                <i className="ri-save-line"></i>
                <span>Simpan Pengguna</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tabel SDM */}
      <div className="card-box p-4 rounded-4 bg-white border shadow-sm space-y-3">
        <div className="d-flex justify-content-between align-items-center pb-2 border-bottom">
          <h4 className="font-weight-bold text-dark m-0" style={{ fontSize: 15 }}>
            <i className="ri-team-line text-success me-1.5"></i> Daftar Anggota Direksi & SDM Lapangan Kebun
          </h4>
          <span className="badge bg-light text-dark border font-weight-bold" style={{ fontSize: 11 }}>
            Total User: {users.length}
          </span>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0" style={{ fontSize: 13 }}>
            <thead>
              <tr>
                <th>NAMA PENGGUNA</th>
                <th>EMAIL AKSES</th>
                <th>NO. TELEPON</th>
                <th>PERAN & HAK AKSES</th>
                <th className="text-end">STATUS OPERASIONAL</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>
                    <div className="d-flex align-items-center gap-2.5">
                      <div style={{ width: 32, height: 32, backgroundColor: '#dcfce7', color: '#166534', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: 12 }}>
                        {u.name.substring(0, 1).toUpperCase()}
                      </div>
                      <strong className="text-slate-900 font-weight-bold" style={{ fontSize: 13.5 }}>{u.name}</strong>
                    </div>
                  </td>
                  <td className="text-slate-600 font-mono" style={{ fontSize: 12 }}>{u.email}</td>
                  <td className="text-slate-600 font-mono" style={{ fontSize: 12 }}>{u.phone || '-'}</td>
                  <td>{getRoleBadge(u.role)}</td>
                  <td className="text-end">
                    <span className="badge bg-success-subtle text-success border border-success font-weight-semibold" style={{ fontSize: 11 }}>
                      SLA 100% • Aktif
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
