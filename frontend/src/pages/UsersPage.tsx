import React, { useEffect, useState } from 'react';
import { getUsers, createUser } from '../services/api';
import { useRole } from '../context/RoleContext';

export const UsersPage = () => {
  const { canManageUsers } = useRole();
  const [users, setUsers] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('PETANI');
  const [phone, setPhone] = useState('');

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
      fetchUsers();
    } catch (e) {
      console.error(e);
    }
  };

  const getRoleBadge = (roleName: string) => {
    switch (roleName) {
      case 'DIREKTUR':
        return <span className="badge bg-purple-subtle text-purple border border-purple px-2.5 py-1 font-weight-bold" style={{ fontSize: 11 }}>DIREKTUR</span>;
      case 'INVESTOR':
        return <span className="badge bg-blue-subtle text-blue border border-blue px-2.5 py-1 font-weight-bold" style={{ fontSize: 11 }}>INVESTOR</span>;
      case 'MANAGER':
        return <span className="badge bg-primary-subtle text-primary border border-primary px-2.5 py-1 font-weight-bold" style={{ fontSize: 11 }}>MANAJER</span>;
      case 'KEPALA_KEBUN':
        return <span className="badge bg-success-subtle text-success border border-success px-2.5 py-1 font-weight-bold" style={{ fontSize: 11 }}>KEPALA KEBUN</span>;
      default:
        return <span className="badge bg-light text-dark border px-2.5 py-1 font-weight-bold" style={{ fontSize: 11 }}>PETANI LAPANGAN</span>;
    }
  };

  return (
    <div className="w-100 space-y-4">
      {/* Header Banner */}
      <div className="bg-white p-4 rounded-4 border shadow-sm">
        <span className="badge bg-success-subtle text-success border border-success px-2.5 py-1 rounded-pill uppercase font-weight-bold mb-1.5 d-inline-block" style={{ fontSize: 11 }}>
          <i className="ri-user-settings-line me-1"></i> MANAJEMEN PENGGUNA & RBAC
        </span>
        <h2 className="font-weight-bold text-dark mb-1 !text-base">Manajemen SDM & Pengaturan Hak Akses User</h2>
        <p className="text-secondary mb-0" style={{ fontSize: 13 }}>
          Pengaturan Hak Akses Pengguna, Manajer, Kepala Kebun & Efisiensi OPEX Tenaga Kerja
        </p>
      </div>

      {/* Form User Baru */}
      {canManageUsers && (
        <div className="bg-white p-4 rounded-4 border shadow-sm space-y-3">
          <h4 className="font-weight-bold text-dark m-0 d-flex align-items-center gap-2 !text-sm">
            <i className="ri-user-add-line text-success"></i> Tambah Pengguna / Tenaga Kerja Baru
          </h4>
          <form onSubmit={handleSubmit} className="row g-3 pt-1">
            <div className="col-md-3">
              <input
                type="text"
                placeholder="Nama Lengkap"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control p-2.5 bg-light border-0 rounded-3"
                style={{ fontSize: 13 }}
                required
              />
            </div>
            <div className="col-md-3">
              <input
                type="email"
                placeholder="Email Akses"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control p-2.5 bg-light border-0 rounded-3"
                style={{ fontSize: 13 }}
                required
              />
            </div>
            <div className="col-md-2">
              <input
                type="text"
                placeholder="No. Telepon / WA"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-control p-2.5 bg-light border-0 rounded-3"
                style={{ fontSize: 13 }}
              />
            </div>
            <div className="col-md-2">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="form-select p-2.5 bg-light border-0 rounded-3 font-weight-bold"
                style={{ fontSize: 13 }}
              >
                <option value="PETANI">PETANI LAPANGAN</option>
                <option value="KEPALA_KEBUN">KEPALA KEBUN</option>
                <option value="MANAGER">MANAJER OPERASIONAL</option>
                <option value="DIREKTUR">DIREKTUR</option>
                <option value="INVESTOR">INVESTOR</option>
              </select>
            </div>
            <div className="col-md-2">
              <button type="submit" className="tmp-btn bg-success text-white font-weight-bold p-2.5 w-100 rounded-3 border-0 shadow-xs" style={{ fontSize: 13 }}>
                <i className="ri-save-line me-1"></i> Simpan User
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tabel SDM */}
      <div className="bg-white rounded-4 border shadow-sm overflow-hidden p-4">
        <div className="d-flex justify-content-between align-items-center pb-3 mb-3 border-bottom">
          <h4 className="font-weight-bold text-dark m-0 !text-sm">
            <i className="ri-team-line text-success me-2"></i> Daftar Anggota Direksi & SDM Lapangan Kebun
          </h4>
          <span className="badge bg-light text-dark border font-weight-bold" style={{ fontSize: 11 }}>
            Total User: {users.length}
          </span>
        </div>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0" style={{ fontSize: 13 }}>
            <thead className="table-light">
              <tr>
                <th>Nama Pengguna</th>
                <th>Email Akses</th>
                <th>No Telepon</th>
                <th>Peran / Hak Akses</th>
                <th>Efisiensi OPEX SDM</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <div style={{ width: 32, height: 32, backgroundColor: '#dcfce7', color: '#166534', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: 13 }}>
                        {u.name.substring(0, 1)}
                      </div>
                      <strong className="text-dark">{u.name}</strong>
                    </div>
                  </td>
                  <td className="text-secondary">{u.email}</td>
                  <td className="text-secondary">{u.phone || '-'}</td>
                  <td>{getRoleBadge(u.role)}</td>
                  <td>
                    <span className="badge bg-success-subtle text-success border border-success font-weight-bold" style={{ fontSize: 11 }}>
                      SLA 100% • Upah Rp 150rb/Hari
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
