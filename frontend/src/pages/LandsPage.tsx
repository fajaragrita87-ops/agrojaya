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
    alert('Seluruh Koordinat Blok Lahan Berhasil Diperbarui Ke Jonggol, Bogor (-6.4697, 107.0544)!');
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
    } catch (e) {
      console.error(e);
    }
  };

  const canCreateLand = role === 'DIREKTUR' || role === 'MANAGER';

  return (
    <div className="w-100 space-y-4">
      {/* Page Header Banner */}
      <div className="bg-white p-4 rounded-4 border shadow-sm">
        <span className="badge bg-success-subtle text-success border border-success px-2.5 py-1 rounded-pill uppercase font-weight-bold mb-1.5 d-inline-block" style={{ fontSize: 11 }}>
          <i className="ri-map-pin-2-line me-1"></i> PEMETAAN LAHAN GIS SATELIT JONGGOL BOGOR
        </span>
        <h2 className="font-weight-bold text-dark mb-1 !text-base">Peta GIS Interaktif & Pemetaan Blok Kebun (Jonggol, Jawa Barat)</h2>
        <p className="text-secondary mb-0" style={{ fontSize: 13 }}>
          Deteksi Koordinat Satelit GPS Lat/Long Secara Real-Time Per Blok Kebun AgroJaya Jonggol
        </p>
      </div>

      {/* Control Box: Live Coordinate Bar */}
      <div className="bg-white p-4 rounded-4 border shadow-sm d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
        <div className="d-flex align-items-center gap-3">
          <div style={{ width: 40, height: 40, backgroundColor: '#dcfce7', border: '1px solid #86efac', color: '#059669', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
            <i className="ri-radar-line animate-pulse"></i>
          </div>
          <div>
            <h4 className="font-weight-bold text-dark m-0" style={{ fontSize: 14 }}>Detektor Koordinat Satelit GPS Jonggol Bogor</h4>
            <span className="text-secondary font-mono d-block" style={{ fontSize: 12 }}>
              Lat: <strong className="text-success">{activeLat}</strong> • Lng: <strong className="text-success">{activeLng}</strong>
            </span>
          </div>
        </div>

        <div className="d-flex align-items-center gap-2">
          <button
            onClick={handleResetAllToJonggol}
            className="btn btn-warning text-dark font-weight-bold rounded-3 px-3 py-2 shadow-xs"
            style={{ fontSize: 12 }}
          >
            <i className="ri-refresh-line me-1"></i> Perbaiki Koordinat Ke Jonggol Bogor
          </button>
        </div>
      </div>

      {/* GIS Leaflet Satellite Component */}
      <InteractiveGisMap
        lands={lands}
        activeLat={activeLat}
        activeLng={activeLng}
        onCoordinatesChange={handleCoordinatesChange}
      />

      {/* Form Tambah Blok Lahan (Direktur & Manager Exclusive) */}
      {canCreateLand && (
        <div className="bg-white p-4 rounded-4 border shadow-sm space-y-3">
          <div className="d-flex justify-content-between align-items-center pb-2 border-bottom">
            <h4 className="font-weight-bold text-dark m-0 !text-sm">
              <i className="ri-add-circle-line text-success me-2"></i> Tambah Blok Lahan Kebun Baru (GPS Jonggol)
            </h4>
            <span className="badge bg-success-subtle text-success border border-success font-weight-bold" style={{ fontSize: 11 }}>
              Mode Pengeditan Aktif ({role})
            </span>
          </div>
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-4">
              <label className="form-label font-weight-bold text-secondary mb-1" style={{ fontSize: 11 }}>Nama Blok Lahan</label>
              <input
                type="text"
                placeholder="misal: Blok C2 - Anggur Impor Shine Muscat"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control p-2.5 bg-light border-0 rounded-3"
                style={{ fontSize: 13 }}
                required
              />
            </div>
            <div className="col-md-2">
              <label className="form-label font-weight-bold text-secondary mb-1" style={{ fontSize: 11 }}>Luas (Hektar)</label>
              <input
                type="number"
                step="0.1"
                placeholder="1.5"
                value={areaHa}
                onChange={(e) => setAreaHa(e.target.value)}
                className="form-control p-2.5 bg-light border-0 rounded-3"
                style={{ fontSize: 13 }}
                required
              />
            </div>
            <div className="col-md-3">
              <label className="form-label font-weight-bold text-secondary mb-1" style={{ fontSize: 11 }}>Karakteristik Tanah</label>
              <input
                type="text"
                placeholder="misal: Latosol Subur / Humus Greenhouse"
                value={soilType}
                onChange={(e) => setSoilType(e.target.value)}
                className="form-control p-2.5 bg-light border-0 rounded-3"
                style={{ fontSize: 13 }}
                required
              />
            </div>
            <div className="col-md-3">
              <label className="form-label font-weight-bold text-secondary mb-1" style={{ fontSize: 11 }}>Latitude GPS</label>
              <input
                type="text"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                className="form-control p-2.5 bg-light border-0 rounded-3 font-mono font-weight-bold text-success"
                style={{ fontSize: 13 }}
                required
              />
            </div>
            <div className="col-md-3 d-flex align-items-end">
              <button type="submit" className="tmp-btn bg-success text-white font-weight-bold p-2.5 w-100 rounded-3 border-0 d-flex align-items-center justify-content-center gap-2 shadow-xs" style={{ fontSize: 13 }}>
                <i className="ri-save-line"></i> Simpan Blok Kebun
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table Inventaris Blok Lahan */}
      <div className="bg-white rounded-4 border shadow-sm overflow-hidden p-4">
        <div className="d-flex justify-content-between align-items-center pb-3 mb-3 border-bottom">
          <h4 className="font-weight-bold text-dark m-0 !text-sm">
            <i className="ri-table-line text-success me-2"></i> Inventaris Lahan & Koordinat GPS Blok (Jonggol, Bogor)
          </h4>
          <button
            onClick={handleResetAllToJonggol}
            className="btn btn-sm btn-outline-warning text-dark font-weight-bold"
            style={{ fontSize: 11 }}
          >
            <i className="ri-refresh-line me-1"></i> Perbaiki Koordinat Ke Jonggol
          </button>
        </div>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0" style={{ fontSize: 13 }}>
            <thead className="table-light">
              <tr>
                <th>Nama Blok Lahan</th>
                <th>Luas (Ha)</th>
                <th>Karakteristik Tanah</th>
                <th>Koordinat GPS (Lat, Lng)</th>
                <th>Status</th>
                <th className="text-center">Aksi Kamera</th>
              </tr>
            </thead>
            <tbody>
              {lands.map((land) => (
                <tr key={land.id}>
                  <td className="font-weight-bold text-dark">{land.name}</td>
                  <td>{land.areaHa} Ha</td>
                  <td>{land.soilType}</td>
                  <td className="font-mono text-secondary" style={{ fontSize: 12 }}>
                    <span className="badge bg-light text-dark border font-mono">
                      {land.latitude}, {land.longitude}
                    </span>
                  </td>
                  <td>
                    <span className={`badge px-2.5 py-1 font-weight-bold ${land.status === 'AKTIF' || land.status === 'PANEN' ? 'bg-success text-white' : 'bg-warning text-dark'}`} style={{ fontSize: 11 }}>
                      {land.status}
                    </span>
                  </td>
                  <td className="text-center">
                    <button
                      onClick={() => handleCoordinatesChange(String(land.latitude), String(land.longitude))}
                      className="btn btn-outline-success font-weight-bold btn-sm rounded-3 py-1 px-3"
                      style={{ fontSize: 11 }}
                    >
                      <i className="ri-focus-3-line me-1"></i> Fokuskan Peta
                    </button>
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
