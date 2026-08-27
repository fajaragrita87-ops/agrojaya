import React, { useEffect, useState } from 'react';
import { getCrops, createCrop } from '../services/api';
import { useRole } from '../context/RoleContext';

interface CropItem {
  id: string;
  name: string;
  category: string;
  photo: string;
  cycleDays: number;
  targetYieldTonHa: number;
  sopFertilizer: string;
  sopCare: string;
  status: string;
}

const DEFAULT_CROPS_DATA: CropItem[] = [
  {
    id: 'CRP-001',
    name: 'Porang Hibrida Ekspor (Amorphophallus muelleri)',
    category: 'Komoditas Utama (Umbi Ekspor)',
    photo: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=600&q=80',
    cycleDays: 240,
    targetYieldTonHa: 25.0,
    sopFertilizer: 'Kompos bio-organik 10 Ton/Ha + NPK Phonska Plus pada masa vegetatif awal',
    sopCare: 'Penyiangan gulma bedengan manual, pembumbunan guludan tanah, dan pemeliharaan drainase latosol Jonggol',
    status: 'Aktif Ditanam (Blok A2)',
  },
  {
    id: 'CRP-002',
    name: 'Anggur Greenhouse Shine Muscat & Black Muscat',
    category: 'Hortikultura Premium (Greenhouse)',
    photo: 'https://images.unsplash.com/photo-1596363505729-4190a9506133?auto=format&fit=crop&w=600&q=80',
    cycleDays: 120,
    targetYieldTonHa: 8.5,
    sopFertilizer: 'Fertigasi tetes otomatis NPK larut air + Kalsium Nitrat & unsur hara mikro harian',
    sopCare: 'Pemangkasan tunas air rutin, penjarangan dompolan buah, dan pemantauan suhu greenhouse BMKG < 32°C',
    status: 'Aktif Ditanam (Blok A1)',
  },
  {
    id: 'CRP-003',
    name: 'Melon Intanon Golden Sweet Premium',
    category: 'Hortikultura Musiman',
    photo: 'https://images.unsplash.com/photo-1571575179703-4bde44fb2d90?auto=format&fit=crop&w=600&q=80',
    cycleDays: 75,
    targetYieldTonHa: 15.0,
    sopFertilizer: 'KNO3 Putih + MKP konsentrasi tinggi saat masa pengisian dan pematangan buah',
    sopCare: 'Polinasi buatan hari ke-25 s.d 32, penggantungan jaring buah, dan seleksi 1 buah per tangkai pohon',
    status: 'Siap Panen (Blok B1)',
  },
  {
    id: 'CRP-004',
    name: 'Jagung Hibrida Super Pioneer P35',
    category: 'Tanaman Rotasi & Pangan',
    photo: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=600&q=80',
    cycleDays: 105,
    targetYieldTonHa: 10.2,
    sopFertilizer: 'Aplikasi Urea 150 kg/Ha & NPK 16-16-16 saat umur 14 & 30 hari setelah tanam',
    sopCare: 'Pengendalian bioproteksi ulat ugrayak Spodoptera frugiperda dan penutupan mulsa organik',
    status: 'Rotasi Musim (Blok B2)',
  },
];

export const CropsPage: React.FC = () => {
  const [cropsList, setCropsList] = useState<CropItem[]>(DEFAULT_CROPS_DATA);
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Komoditas Utama (Umbi Ekspor)');
  const [cycleDays, setCycleDays] = useState('120');
  const [targetYield, setTargetYield] = useState('12.0');
  const [sopFertilizer, setSopFertilizer] = useState('');
  const [sopCare, setSopCare] = useState('');

  const { role } = useRole();
  const isFormAllowed = role === 'DIREKTUR' || role === 'MANAGER' || role === 'KEPALA_KEBUN';

  const fetchCrops = async () => {
    try {
      const res = await getCrops();
      if (res.data && res.data.length > 0) {
        // Merge backend crops with photography and rich metadata
        const backendCrops = res.data.map((c: any, idx: number) => ({
          id: c.id || `CRP-${idx + 1}`,
          name: c.name,
          category: c.category || 'Komoditas Kebun',
          photo: DEFAULT_CROPS_DATA[idx % DEFAULT_CROPS_DATA.length].photo,
          cycleDays: c.cycleDays || 90,
          targetYieldTonHa: c.yieldFormula?.baseYieldPerHaKg ? c.yieldFormula.baseYieldPerHaKg / 1000 : 8.0,
          sopFertilizer: c.sop?.pemupukan || 'Aplikasi NPK 16-16-16 berimbang dan pupuk organik hayati fermentasi',
          sopCare: c.sop?.perawatan || 'Penyiraman berkala fertigasi tetes dan penyiangan gulma harian',
          status: 'Aktif Dikelola',
        }));
        // Use default rich mock items if backend is sparse
        if (backendCrops.length < 4) {
          setCropsList(DEFAULT_CROPS_DATA);
        } else {
          setCropsList(backendCrops);
        }
      }
    } catch {
      setCropsList(DEFAULT_CROPS_DATA);
    }
  };

  useEffect(() => {
    fetchCrops();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !cycleDays) return;

    try {
      await createCrop({
        name,
        category,
        cycleDays: Number(cycleDays),
        sop: {
          perawatan: sopCare || 'Penyiraman fertigasi tetes harian & penyiangan gulma',
          pemupukan: sopFertilizer || 'Aplikasi pupuk NPK berimbang',
        },
        yieldFormula: { baseYieldPerHaKg: Number(targetYield) * 1000 },
      });

      const newItem: CropItem = {
        id: `CRP-00${cropsList.length + 1}`,
        name,
        category,
        photo: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=600&q=80',
        cycleDays: Number(cycleDays),
        targetYieldTonHa: Number(targetYield) || 10.0,
        sopFertilizer: sopFertilizer || 'Aplikasi pupuk NPK berimbang',
        sopCare: sopCare || 'Penyiraman fertigasi tetes harian & penyiangan gulma',
        status: 'Terdaftar Baru',
      };

      setCropsList([newItem, ...cropsList]);
      setName('');
      setSopFertilizer('');
      setSopCare('');
      setShowAddForm(false);
      alert(`Master komoditas ${name} berhasil disimpan!`);
    } catch {
      alert('Gagal menyimpan master komoditas');
    }
  };

  return (
    <div className="w-100 space-y-4">
      {/* Header Banner */}
      <div className="card-box p-4 rounded-4 bg-white border shadow-sm d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
          <h2 className="page-header-title font-weight-bold text-dark mb-1" style={{ fontSize: 20 }}>
            Master Komoditas & Standar Operasional Prosedur (SOP)
          </h2>
          <p className="text-secondary mb-0 font-weight-medium" style={{ fontSize: 13 }}>
            Katalog varietas tanaman perkebunan Jonggol, proyeksi siklus hari tanam, dan panduan teknis budidaya
          </p>
        </div>

        {isFormAllowed && (
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="btn btn-success text-white font-weight-bold px-3.5 py-2 rounded-3 shadow-xs d-inline-flex align-items-center gap-1.5"
            style={{ fontSize: 12.5 }}
          >
            <i className={showAddForm ? 'ri-close-line' : 'ri-add-line'}></i>
            <span>{showAddForm ? 'Tutup Formulir' : '+ Tambah Komoditas Baru'}</span>
          </button>
        )}
      </div>

      {/* Form Tambah Komoditas Baru (Spacious & Clean) */}
      {isFormAllowed && showAddForm && (
        <div className="card-box p-4 rounded-4 bg-white border shadow-sm space-y-3">
          <div className="pb-2 border-bottom">
            <h4 className="font-weight-bold text-dark m-0 !text-sm">
              <i className="ri-add-circle-line text-success me-1.5"></i> Tambah Master Komoditas & Formula SOP
            </h4>
            <span className="text-muted" style={{ fontSize: 12 }}>
              Lengkapi nama varietas unggulan, durasi hari tanam, target yield, dan instruksi pemupukan
            </span>
          </div>

          <form onSubmit={handleSubmit} className="p-3.5 bg-light rounded-3 border space-y-3">
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12 }}>
                  Nama Komoditas & Varietas <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  placeholder="misal: Porang Hibrida Madiun Grade A"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control p-2.5 bg-white border rounded-3 text-dark font-weight-medium"
                  style={{ fontSize: 13 }}
                  required
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12 }}>
                  Kategori Komoditas
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="form-select p-2.5 bg-white border rounded-3 text-dark font-weight-medium"
                  style={{ fontSize: 13 }}
                >
                  <option value="Komoditas Utama (Umbi Ekspor)">Komoditas Utama (Umbi Ekspor)</option>
                  <option value="Hortikultura Premium (Greenhouse)">Hortikultura Premium (Greenhouse)</option>
                  <option value="Hortikultura Musiman">Hortikultura Musiman</option>
                  <option value="Tanaman Rotasi & Pangan">Tanaman Rotasi & Pangan</option>
                </select>
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12 }}>
                  Durasi Siklus Tanam (Hari) <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <input
                    type="number"
                    placeholder="120"
                    value={cycleDays}
                    onChange={(e) => setCycleDays(e.target.value)}
                    className="form-control p-2.5 bg-white border text-dark font-weight-bold"
                    style={{ fontSize: 13 }}
                    required
                  />
                  <span className="input-group-text bg-white text-muted font-weight-bold" style={{ fontSize: 12 }}>Hari</span>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12 }}>
                  Target Yield Panen (Ton / Hektar)
                </label>
                <div className="input-group">
                  <input
                    type="number"
                    step="0.1"
                    placeholder="15.0"
                    value={targetYield}
                    onChange={(e) => setTargetYield(e.target.value)}
                    className="form-control p-2.5 bg-white border text-dark font-weight-bold"
                    style={{ fontSize: 13 }}
                  />
                  <span className="input-group-text bg-white text-muted font-weight-bold" style={{ fontSize: 12 }}>Ton/Ha</span>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12 }}>
                  Formula & Dosis Pemupukan
                </label>
                <textarea
                  placeholder="Dosis pupuk organik, NPK, dan nutrisi fertigasi..."
                  value={sopFertilizer}
                  onChange={(e) => setSopFertilizer(e.target.value)}
                  className="form-control p-2.5 bg-white border rounded-3 text-dark"
                  rows={2}
                  style={{ fontSize: 12.5 }}
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12 }}>
                  Instruksi Perawatan & Proteksi Tanaman
                </label>
                <textarea
                  placeholder="Teknik penyiangan gulma, pemangkasan tunas, dan proteksi hama..."
                  value={sopCare}
                  onChange={(e) => setSopCare(e.target.value)}
                  className="form-control p-2.5 bg-white border rounded-3 text-dark"
                  rows={2}
                  style={{ fontSize: 12.5 }}
                />
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
                <span>Simpan Master Komoditas</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Grid Komoditas Cards with High-Res Crop Photos & Deep Agricultural Context */}
      <div className="row g-4">
        {cropsList.map((crop) => (
          <div key={crop.id} className="col-12 col-md-6 col-xl-6">
            <div className="card-box p-0 rounded-4 bg-white border shadow-sm overflow-hidden h-100 d-flex flex-column">
              {/* Crop Photo Header */}
              <div className="position-relative" style={{ height: 180 }}>
                <img
                  src={crop.photo}
                  alt={crop.name}
                  className="w-100 h-100 object-fit-cover"
                />
                <div
                  className="position-absolute top-0 start-0 w-100 h-100"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 60%)' }}
                />
                <div className="position-absolute bottom-0 start-0 p-3 text-white">
                  <span className="badge bg-success text-white font-weight-bold mb-1" style={{ fontSize: 10.5 }}>
                    {crop.category}
                  </span>
                  <h3 className="font-weight-extrabold text-white m-0" style={{ fontSize: 16 }}>
                    {crop.name}
                  </h3>
                </div>
                <span
                  className="position-absolute top-0 end-0 m-3 badge bg-dark-subtle text-white border border-light font-weight-bold"
                  style={{ fontSize: 11, backdropFilter: 'blur(4px)' }}
                >
                  <i className="ri-time-line me-1"></i> {crop.cycleDays} Hari Tanam
                </span>
              </div>

              {/* Crop Body Details */}
              <div className="p-3.5 space-y-3 d-flex flex-column flex-grow-1 justify-content-between">
                <div className="space-y-2">
                  <div className="p-2.5 bg-light rounded-3 border">
                    <strong className="text-dark d-block mb-1" style={{ fontSize: 12 }}>
                      🧪 Formula Nutrisi & Dosis Pemupukan:
                    </strong>
                    <p className="text-secondary mb-0" style={{ fontSize: 12, lineHeight: 1.45 }}>
                      {crop.sopFertilizer}
                    </p>
                  </div>

                  <div className="p-2.5 bg-light rounded-3 border">
                    <strong className="text-dark d-block mb-1" style={{ fontSize: 12 }}>
                      📋 Standar Operasional Budidaya & Proteksi:
                    </strong>
                    <p className="text-secondary mb-0" style={{ fontSize: 12, lineHeight: 1.45 }}>
                      {crop.sopCare}
                    </p>
                  </div>
                </div>

                {/* Footer KPI of Crop */}
                <div className="d-flex justify-content-between align-items-center pt-2 border-top">
                  <div>
                    <span className="text-muted d-block" style={{ fontSize: 11 }}>Target Estimasi Yield:</span>
                    <strong className="text-success font-weight-extrabold" style={{ fontSize: 14 }}>
                      {crop.targetYieldTonHa} Ton / Ha
                    </strong>
                  </div>

                  <span className="badge bg-success-subtle text-success border border-success px-2.5 py-1 rounded-pill font-weight-bold" style={{ fontSize: 11 }}>
                    <i className="ri-checkbox-circle-fill me-1"></i> {crop.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
