import React, { useEffect, useState } from 'react';
import { getCrops, createCrop } from '../services/api';
import { useRole } from '../context/RoleContext';

export const CropsPage = () => {
  const [crops, setCrops] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [cycleDays, setCycleDays] = useState('90');
  const { role, canEdit } = useRole();

  const fetchCrops = async () => {
    try {
      const res = await getCrops();
      setCrops(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchCrops();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canEdit || role === 'PETANI') return;
    try {
      await createCrop({
        name,
        cycleDays: Number(cycleDays),
        sop: { perawatan: 'Pemupukan NPK, Penyiraman Harian, Pengendalian Hama' },
        yieldFormula: { baseYieldPerHaKg: 5000 }
      });
      setName('');
      fetchCrops();
    } catch (e) {
      console.error(e);
    }
  };

  const isFormAllowed = role === 'DIREKTUR' || role === 'MANAGER';

  return (
    <div className="w-100 space-y-4">
      {/* Header Banner */}
      <div className="bg-white p-4 rounded-4 border shadow-sm d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
          <span className="badge bg-success-subtle text-success border border-success px-2.5 py-1 rounded-pill uppercase font-weight-bold mb-1.5 d-inline-block" style={{ fontSize: 11 }}>
            <i className="ri-plant-line me-1"></i> MASTER DATA KOMODITAS & SOP
          </span>
          <h2 className="font-weight-bold text-dark mb-1 !text-base">Master Data Komoditas & SOP Perawatan Kebun</h2>
          <p className="text-secondary mb-0" style={{ fontSize: 13 }}>
            Katalog Standar Operasional Prosedur (SOP) & Proyeksi Siklus Panen Tanaman Kebun
          </p>
        </div>
        <span className="badge bg-primary text-white px-3 py-2 rounded-pill font-weight-bold d-inline-flex align-items-center gap-1.5 shadow-sm" style={{ fontSize: 11 }}>
          <i className="ri-shield-user-line"></i> Hak Akses: {role}
        </span>
      </div>

      {/* Form Tambah Komoditas (Corpox UI Form Styling) */}
      {isFormAllowed && (
        <div className="card-box p-4 rounded-4 space-y-4">
          <div className="d-flex justify-content-between align-items-center pb-2 border-bottom">
            <div>
              <h4 className="font-weight-extrabold text-dark m-0 d-flex align-items-center gap-2 !text-sm">
                <span className="corpox-icon-box emerald" style={{ width: 32, height: 32, fontSize: 16 }}>
                  <i className="ri-add-circle-line"></i>
                </span>
                Tambah Master Komoditas & SOP Tanam Baru
              </h4>
              <p className="text-secondary mb-0 font-weight-medium mt-0.5" style={{ fontSize: 12 }}>
                Lengkapi rincian nama komoditas, durasi siklus hari tanam, dan instruksi SOP perawatan.
              </p>
            </div>
            <span className="tmp-badge-card success">Form SOP</span>
          </div>

          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-5">
              <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12 }}>
                🏷️ Nama Komoditas Tanam <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                placeholder="Contoh: Kelapa Sawit Tenera, Melon Intanon"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control p-2.5 bg-light border rounded-3 text-dark font-weight-medium"
                style={{ fontSize: 13 }}
                required
              />
              <span className="text-muted font-weight-medium d-block mt-1" style={{ fontSize: 11 }}>
                * Masukkan varietas hibrida atau komoditas unggulan
              </span>
            </div>

            <div className="col-md-4">
              <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12 }}>
                ⏱️ Durasi Siklus Tanam (Hari) <span className="text-danger">*</span>
              </label>
              <div className="input-group">
                <input
                  type="number"
                  placeholder="Contoh: 90"
                  value={cycleDays}
                  onChange={(e) => setCycleDays(e.target.value)}
                  className="form-control p-2.5 bg-light border text-dark font-weight-medium"
                  style={{ fontSize: 13 }}
                  required
                />
                <span className="input-group-text bg-light text-muted font-weight-bold" style={{ fontSize: 12 }}>Hari</span>
              </div>
              <span className="text-muted font-weight-medium d-block mt-1" style={{ fontSize: 11 }}>
                * Est. durasi dari tanam bibit hingga panen raya
              </span>
            </div>

            <div className="col-md-3 d-flex align-items-end">
              <button type="submit" className="btn btn-primary-gradient font-weight-bold p-2.5 w-100 rounded-3 shadow-xs d-flex align-items-center justify-content-center gap-2" style={{ height: 42, fontSize: 13 }}>
                <i className="ri-save-line !text-sm"></i> Simpan SOP Komoditas
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Grid Komoditas */}
      <div className="row g-4">
        {crops.length === 0 ? (
          <div className="col-12 text-center text-muted p-5 bg-white rounded-4 border shadow-sm" style={{ fontSize: 14 }}>
            Belum ada master komoditas terdaftar.
          </div>
        ) : (
          crops.map((crop) => (
            <div key={crop.id} className="col-12 col-md-4">
              <div className="bg-white p-4 rounded-4 border shadow-sm space-y-3 h-100">
                <div className="d-flex justify-content-between align-items-start">
                  <h4 className="font-weight-bold text-dark m-0 d-flex align-items-center gap-2 !text-sm">
                    <i className="ri-leaf-fill text-success"></i> {crop.name}
                  </h4>
                  <span className="badge bg-success-subtle text-success border border-success px-2.5 py-1 font-weight-bold" style={{ fontSize: 11 }}>
                    {crop.cycleDays} Hari Tanam
                  </span>
                </div>
                <div className="p-3 bg-light rounded-3 border space-y-1" style={{ fontSize: 13 }}>
                  <p className="font-weight-bold text-dark mb-1">📋 SOP Perawatan Kebun:</p>
                  <p className="text-secondary leading-relaxed mb-0">
                    {crop.sop?.perawatan || 'Pemupukan NPK 14 hari sekali, penyiraman berkala, dan penyiangan gulma harian.'}
                  </p>
                </div>
                <div className="d-flex justify-content-between align-items-center text-muted pt-1" style={{ fontSize: 11 }}>
                  <span>Target Yield: 5 Ton / Ha</span>
                  <span className="text-success font-weight-bold">Formula Aktif</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
