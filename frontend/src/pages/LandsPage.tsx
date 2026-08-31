import React, { useEffect, useState } from 'react';
import { getLands, createLand } from '../services/api';
import { useRole } from '../context/RoleContext';
import { InteractiveGisMap } from '../components/InteractiveGisMap';

export const LandsPage = () => {
  const [lands, setLands] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [areaHa, setAreaHa] = useState('');
  const [soilType, setSoilType] = useState('');
  const [latitude, setLatitude] = useState('-6.4697');
  const [longitude, setLongitude] = useState('107.0544');
  const [activeLat, setActiveLat] = useState('-6.4697');
  const [activeLng, setActiveLng] = useState('107.0544');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { role, canEdit } = useRole();

  const JONGGOL_LAT_BASE = -6.4697;
  const JONGGOL_LNG_BASE = 107.0544;

  const fetchLands = async () => {
    try {
      const res = await getLands();
      const loadedLands = res.data;
      const enriched = loadedLands.map((l: any, i: number) => {
        const rawLat = parseFloat(l.latitude);
        const rawLng = parseFloat(l.longitude);
        const isInvalidRiau = isNaN(rawLat) || rawLat > 0 || isNaN(rawLng) || rawLng < 100;
        return {
          ...l,
          latitude: isInvalidRiau ? (JONGGOL_LAT_BASE - i * 0.0015).toFixed(6) : l.latitude,
          longitude: isInvalidRiau ? (JONGGOL_LNG_BASE + i * 0.0020).toFixed(6) : l.longitude,
        };
      });
      setLands(enriched);
    } catch (e) {
      console.error(e);
      setLands([
        { id: '1', name: 'Blok A1 - Kebun Anggur Impor & Greenhouse (1000m²)', areaHa: 0.1, soilType: 'Humus Organik Greenhouse', latitude: '-6.471500', longitude: '107.053500', status: 'AKTIF' },
        { id: '2', name: 'Blok A2 - Tanam Hibrida Utama (2.0 Ha)', areaHa: 2.0, soilType: 'Latosol Subur Jonggol Bogor', latitude: '-6.469700', longitude: '107.054400', status: 'AKTIF' },
        { id: '3', name: 'Blok B1 - Hortikultura Melon Premium (5000m²)', areaHa: 0.5, soilType: 'Aluvial Organik Jonggol', latitude: '-6.468000', longitude: '107.056000', status: 'PANEN' },
      ]);
    }
  };

  useEffect(() => {
    fetchLands();
  }, []);

  const handleCoordinatesChange = (lat: string, lng: string) => {
    setActiveLat(lat);
    setActiveLng(lng);
    setLatitude(lat);
    setLongitude(lng);
  };

  const handleResetAllToJonggol = () => {
    const fixedLands = lands.map((l: any, i: number) => ({
      ...l,
      latitude: (JONGGOL_LAT_BASE - i * 0.0015).toFixed(6),
      longitude: (JONGGOL_LNG_BASE + i * 0.0020).toFixed(6),
    }));
    setLands(fixedLands);
    setActiveLat(JONGGOL_LAT_BASE.toFixed(6));
    setActiveLng(JONGGOL_LNG_BASE.toFixed(6));
    setLatitude(JONGGOL_LAT_BASE.toFixed(6));
    setLongitude(JONGGOL_LNG_BASE.toFixed(6));
    alert('Koordinat berhasil disinkronkan ke Jonggol, Bogor!');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canEdit || role === 'INVESTOR' || role === 'PETANI') return;
    try {
      await createLand({
        name,
        areaHa: Number(areaHa),
        soilType,
        latitude: activeLat || latitude,
        longitude: activeLng || longitude,
      });
      setName('');
      setAreaHa('');
      setSoilType('');
      fetchLands();
      alert('Blok lahan baru berhasil didaftarkan!');
    } catch (e) {
      console.error(e);
    }
  };

  const canCreateLand = role === 'DIREKTUR' || role === 'MANAGER';

  const totalHa = lands.reduce((acc, curr) => acc + (Number(curr.areaHa) || 0), 0);

  const filteredLands = lands.filter((l) => {
    const matchStatus = statusFilter === 'ALL' || l.status === statusFilter;
    const matchSearch = l.name.toLowerCase().includes(searchQuery.toLowerCase()) || l.soilType.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="w-100 space-y-4">
      {/* Header Banner */}
      <div className="card-box p-4 rounded-4 bg-white border shadow-sm d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
          <h2 className="page-header-title font-weight-bold text-dark mb-0" style={{ fontSize: 20 }}>
            Peta Satelit GIS & Blok Perkebunan
          </h2>
        </div>

        <button
          onClick={handleResetAllToJonggol}
          className="btn btn-warning text-dark font-weight-bold rounded-3 px-3 py-1.5 shadow-xs d-inline-flex align-items-center gap-1.5"
          style={{ fontSize: 12 }}
        >
          <i className="ri-refresh-line"></i>
          <span>Sinkron GPS Jonggol</span>
        </button>
      </div>

      {/* SUMMARY STATS (3 Metrik Bersih) */}
      <div className="row g-3">
        <div className="col-12 col-md-4">
          <div className="card-box p-3.5 border bg-white rounded-4 shadow-sm d-flex align-items-center justify-content-between">
            <div>
              <span className="text-uppercase text-muted font-weight-bold d-block" style={{ fontSize: 11 }}>Total Luas Lahan</span>
              <strong className="text-dark font-weight-extrabold d-block" style={{ fontSize: 20 }}>
                {totalHa.toFixed(1)} Hektar
              </strong>
              <span className="text-success font-weight-bold" style={{ fontSize: 11 }}>100% Hak Milik / HGU Legal</span>
            </div>
            <div className="corpox-icon-box emerald" style={{ width: 36, height: 36, fontSize: 18 }}>
              <i className="ri-landscape-line"></i>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card-box p-3.5 border bg-white rounded-4 shadow-sm d-flex align-items-center justify-content-between">
            <div>
              <span className="text-uppercase text-muted font-weight-bold d-block" style={{ fontSize: 11 }}>Jumlah Blok Terdaftar</span>
              <strong className="text-dark font-weight-extrabold d-block" style={{ fontSize: 20 }}>
                {lands.length} Blok Kebun
              </strong>
              <span className="text-primary font-weight-bold" style={{ fontSize: 11 }}>Zona A, B, & C</span>
            </div>
            <div className="corpox-icon-box blue" style={{ width: 36, height: 36, fontSize: 18 }}>
              <i className="ri-grid-line"></i>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card-box p-3.5 border bg-white rounded-4 shadow-sm d-flex align-items-center justify-content-between">
            <div>
              <span className="text-uppercase text-muted font-weight-bold d-block" style={{ fontSize: 11 }}>Status Geofencing Satelit</span>
              <strong className="text-success font-weight-extrabold d-block" style={{ fontSize: 20 }}>
                Aktif 24/7
              </strong>
              <span className="text-muted font-weight-medium" style={{ fontSize: 11 }}>Sinkron GPS BMKG</span>
            </div>
            <div className="corpox-icon-box emerald" style={{ width: 36, height: 36, fontSize: 18 }}>
              <i className="ri-satellite-line"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Block Focus Selector Pills */}
      <div className="card-box p-3 rounded-4 bg-white border shadow-sm d-flex flex-wrap align-items-center gap-2">
        <span className="text-muted font-weight-bold" style={{ fontSize: 11.5 }}>
          <i className="ri-focus-3-line text-success me-1"></i> Fokuskan Peta ke Blok:
        </span>
        {lands.map((land) => (
          <button
            key={land.id}
            onClick={() => handleCoordinatesChange(String(land.latitude), String(land.longitude))}
            className={`btn btn-sm px-3 py-1 rounded-pill font-weight-bold transition ${
              activeLat === String(land.latitude) && activeLng === String(land.longitude)
                ? 'btn-success text-white shadow-xs'
                : 'btn-light text-dark hover-bg-light border'
            }`}
            style={{ fontSize: 11.5 }}
          >
            {land.name.split(' - ')[0] || land.name}
          </button>
        ))}
      </div>

      {/* Interactive GIS Map (Leaflet) */}
      <InteractiveGisMap
        lands={lands}
        activeLat={activeLat}
        activeLng={activeLng}
        onCoordinatesChange={handleCoordinatesChange}
      />

      {/* Tabel Inventaris Blok Lahan */}
      <div className="card-box p-4 border bg-white rounded-4 shadow-sm space-y-3">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 pb-2 border-bottom">
          <div>
            <h4 className="font-weight-bold text-dark m-0 !text-sm">
              Inventaris Lahan & Koordinat Blok Kebun
            </h4>
          </div>
          <div className="d-flex align-items-center gap-2">
            <input
              type="text"
              placeholder="Cari nama blok / tanah..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-control form-control-sm p-2 rounded-3 bg-light border-0"
              style={{ width: '100%', maxWidth: '220px', fontSize: 12 }}
            />
            <div className="d-flex align-items-center gap-1">
              {['ALL', 'AKTIF', 'PANEN'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`btn btn-sm px-2.5 py-0.5 rounded-pill font-weight-bold ${
                    statusFilter === st ? 'btn-success text-white' : 'btn-outline-secondary'
                  }`}
                  style={{ fontSize: 11 }}
                >
                  {st === 'ALL' ? 'Semua' : st}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0" style={{ fontSize: 12.5 }}>
            <thead className="table-light">
              <tr style={{ fontSize: 11.5 }}>
                <th>NAMA BLOK LAHAN</th>
                <th>LUAS (HA)</th>
                <th>KARAKTERISTIK TANAH</th>
                <th>KOORDINAT GPS</th>
                <th>STATUS</th>
                <th className="text-center">AKSI PETA</th>
              </tr>
            </thead>
            <tbody>
              {filteredLands.map((land) => (
                <tr key={land.id}>
                  <td className="font-weight-bold text-dark">{land.name}</td>
                  <td>{land.areaHa} Ha</td>
                  <td className="text-secondary">{land.soilType}</td>
                  <td className="font-mono text-muted" style={{ fontSize: 11.5 }}>
                    {land.latitude}, {land.longitude}
                  </td>
                  <td>
                    <span className={`badge px-2.5 py-1 font-weight-bold rounded-pill ${land.status === 'AKTIF' || land.status === 'PANEN' ? 'bg-success text-white' : 'bg-warning text-dark'}`} style={{ fontSize: 10.5 }}>
                      {land.status}
                    </span>
                  </td>
                  <td className="text-center">
                    <button
                      onClick={() => handleCoordinatesChange(String(land.latitude), String(land.longitude))}
                      className="btn btn-outline-success font-weight-bold btn-sm rounded-2 py-0.5 px-2.5 d-inline-flex align-items-center gap-1"
                      style={{ fontSize: 11 }}
                    >
                      <i className="ri-focus-3-line"></i>
                      <span>Fokuskan Peta</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form Tambah Blok Lahan (Hanya Direktur & Manager) */}
      {canCreateLand && (
        <div className="card-box p-4 border bg-white rounded-4 shadow-sm space-y-3">
          <div className="pb-2 border-bottom">
            <h4 className="font-weight-bold text-dark m-0 !text-sm">
              <i className="ri-add-circle-line text-success me-1"></i> Tambah Blok Lahan Baru
            </h4>
          </div>
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-6">
              <label className="form-label font-weight-bold text-secondary mb-1" style={{ fontSize: 11 }}>Nama Blok Lahan</label>
              <input
                type="text"
                placeholder="misal: Blok C2 - Anggur Impor Shine Muscat"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control p-2 bg-light border-0 rounded-3"
                style={{ fontSize: 12.5 }}
                required
              />
            </div>
            <div className="col-md-3">
              <label className="form-label font-weight-bold text-secondary mb-1" style={{ fontSize: 11 }}>Luas (Hektar)</label>
              <input
                type="number"
                step="0.1"
                placeholder="1.5"
                value={areaHa}
                onChange={(e) => setAreaHa(e.target.value)}
                className="form-control p-2 bg-light border-0 rounded-3"
                style={{ fontSize: 12.5 }}
                required
              />
            </div>
            <div className="col-md-3">
              <label className="form-label font-weight-bold text-secondary mb-1" style={{ fontSize: 11 }}>Jenis Tanah</label>
              <input
                type="text"
                placeholder="misal: Latosol Subur / Humus"
                value={soilType}
                onChange={(e) => setSoilType(e.target.value)}
                className="form-control p-2 bg-light border-0 rounded-3"
                style={{ fontSize: 12.5 }}
                required
              />
            </div>
            <div className="col-md-3">
              <label className="form-label font-weight-bold text-secondary mb-1" style={{ fontSize: 11 }}>Latitude GPS</label>
              <input
                type="text"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                className="form-control p-2 bg-light border-0 rounded-3 font-mono font-weight-bold text-success"
                style={{ fontSize: 12.5 }}
                required
              />
            </div>
            <div className="col-md-3">
              <label className="form-label font-weight-bold text-secondary mb-1" style={{ fontSize: 11 }}>Longitude GPS</label>
              <input
                type="text"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                className="form-control p-2 bg-light border-0 rounded-3 font-mono font-weight-bold text-success"
                style={{ fontSize: 12.5 }}
                required
              />
            </div>
            <div className="col-md-6 d-flex align-items-end">
              <button type="submit" className="btn btn-success text-white font-weight-bold p-2 w-100 rounded-3 border-0 d-flex align-items-center justify-content-center gap-1.5 shadow-xs" style={{ fontSize: 12.5 }}>
                <i className="ri-save-line"></i> Simpan Blok Kebun Baru
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
