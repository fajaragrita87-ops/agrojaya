import React, { useEffect, useRef, useState } from 'react';

declare const L: any;

interface LandMarker {
  id: string;
  name: string;
  areaHa: number | string;
  soilType: string;
  latitude: number | string;
  longitude: number | string;
  status: string;
}

interface InteractiveGisMapProps {
  lands: LandMarker[];
  activeLat: string;
  activeLng: string;
  onCoordinatesChange: (lat: string, lng: string) => void;
}

export const InteractiveGisMap: React.FC<InteractiveGisMapProps> = ({
  lands,
  activeLat,
  activeLng,
  onCoordinatesChange,
}) => {
  const [viewMode, setViewMode] = useState<'denah' | 'satelit'>('denah');
  const [selectedBlockId, setSelectedBlockId] = useState<string>('blok-a1');

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const centerMarkerRef = useRef<any>(null);
  const blockMarkersGroupRef = useRef<any>(null);
  const tileLayerRef = useRef<any>(null);

  const JONGGOL_LAT = -6.4697;
  const JONGGOL_LNG = 107.0544;

  // Initialize Leaflet GIS Satellite Map (Only when viewMode is 'satelit')
  useEffect(() => {
    if (viewMode !== 'satelit') return;
    if (!mapContainerRef.current) return;

    // Dynamically inject Leaflet CSS if missing
    if (!document.getElementById('leaflet-css-fallback')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css-fallback';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    const checkAndInitMap = () => {
      if (typeof L === 'undefined') {
        setTimeout(checkAndInitMap, 200);
        return;
      }

      if (!mapInstanceRef.current && mapContainerRef.current) {
        let parsedLat = parseFloat(activeLat);
        let parsedLng = parseFloat(activeLng);

        if (isNaN(parsedLat) || parsedLat > 0) parsedLat = JONGGOL_LAT;
        if (isNaN(parsedLng) || parsedLng < 100) parsedLng = JONGGOL_LNG;

        const map = L.map(mapContainerRef.current, {
          center: [parsedLat, parsedLng],
          zoom: 15,
          zoomControl: true,
        });

        mapInstanceRef.current = map;

        // OpenStreetMap Standard Light Layer (Guaranteed 100% Bright)
        const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap & AgroJaya GIS Jonggol Bogor',
          maxZoom: 19,
        });

        osmLayer.addTo(map);
        tileLayerRef.current = osmLayer;

        // Center Pin
        const redIcon = L.icon({
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        });

        const marker = L.marker([parsedLat, parsedLng], { icon: redIcon, draggable: true }).addTo(map);
        marker.bindPopup('<b>Pusat GPS Kebun Jonggol</b><br>Lat: ' + parsedLat.toFixed(6) + ' • Lng: ' + parsedLng.toFixed(6));
        centerMarkerRef.current = marker;

        marker.on('dragend', () => {
          const pos = marker.getLatLng();
          onCoordinatesChange(pos.lat.toFixed(6), pos.lng.toFixed(6));
        });

        map.on('move', () => {
          const center = map.getCenter();
          marker.setLatLng(center);
          onCoordinatesChange(center.lat.toFixed(6), center.lng.toFixed(6));
        });

        blockMarkersGroupRef.current = L.layerGroup().addTo(map);

        // Render Land Markers
        lands.forEach((land, i) => {
          let lat = parseFloat(String(land.latitude));
          let lng = parseFloat(String(land.longitude));
          if (isNaN(lat) || lat > 0) lat = JONGGOL_LAT - i * 0.0015;
          if (isNaN(lng) || lng < 100) lng = JONGGOL_LNG + i * 0.0020;

          const greenIcon = L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
          });

          const m = L.marker([lat, lng], { icon: greenIcon });
          m.bindPopup(`<b>${land.name}</b><br>Luas: ${land.areaHa} Ha | Status: ${land.status}`);
          blockMarkersGroupRef.current.addLayer(m);
        });
      }
    };

    checkAndInitMap();
  }, [viewMode]);

  // Denah Site Plan Master Blocks Data
  const sitePlanBlocks = [
    {
      id: 'blok-a1',
      name: 'Blok A1 - Greenhouse Anggur Impor Shine Muscat',
      area: '1.000 m² (0.1 Ha)',
      crop: 'Anggur Impor Shine Muscat & Black Muscat',
      soil: 'Humus Organik Greenhouse',
      status: 'AKTIF (PERAWATAN VEGETATIF)',
      pH: '6.5 (Netral Ideal)',
      moisture: '78%',
      irrigation: 'Drip Irrigation Automatic Satelit',
      color: '#059669',
      bgColor: '#dcfce7',
      borderColor: '#10b981',
      coords: 'GPS Lat -6.4715, Long 107.0535',
      highlights: '12 Bedengan Olah • Naungan UV 14% • Sensor Fertigasi Presisi',
    },
    {
      id: 'blok-a2',
      name: 'Blok A2 - Lahan Tanam Hibrida Utama (Kelapa Sawit / Jagung)',
      area: '2.0 Hektar (20.000 m²)',
      crop: 'Sawit Tenera & Jagung Hibrida Pioneer',
      soil: 'Latosol Subur Jonggol Bogor',
      status: 'SEDANG BERJALAN (85% SIAP PANEN)',
      pH: '6.2 (Subur)',
      moisture: '82%',
      irrigation: 'Sprinkler Satelit & BMKG Rain Sensor',
      color: '#0284c7',
      bgColor: '#e0f2fe',
      borderColor: '#0284c7',
      coords: 'GPS Lat -6.4697, Long 107.0544',
      highlights: '272 Pohon Kelapa Sawit • 40 Saluran Drainase • Traktor Kubota Path',
    },
    {
      id: 'blok-b1',
      name: 'Blok B1 - Hortikultura Melon Premium Intanon Golden',
      area: '5.000 m² (0.5 Ha)',
      crop: 'Melon Intanon Golden Sweet Grade A',
      soil: 'Aluvial Organik Jonggol',
      status: 'PANEN RAYA MINGGU INI',
      pH: '6.8 (Sangat Subur)',
      moisture: '72%',
      irrigation: 'Fertigasi Nutrisi Tetes Drip',
      color: '#d97706',
      bgColor: '#fef3c7',
      borderColor: '#f59e0b',
      coords: 'GPS Lat -6.4680, Long 107.0560',
      highlights: 'Brix Manis 14.5° • Target Yield 15 Ton • Pembeli PKS PT Pangan Mandiri',
    },
    {
      id: 'blok-fac',
      name: 'Fasilitas Workshop, Machine Yard & Jembatan Timbang Digital',
      area: '2.000 m²',
      crop: 'Infrastruktur & Alat Berat',
      soil: 'Perkerasan Beton Industrial',
      status: 'OPERASIONAL 24 JAM',
      pH: 'N/A',
      moisture: 'N/A',
      irrigation: 'Stasiun Pengisian BBM Solar B35 Traktor',
      color: '#4b5563',
      bgColor: '#f3f4f6',
      borderColor: '#6b7280',
      coords: 'GPS Lat -6.4700, Long 107.0520',
      highlights: 'Timbangan Digital Truk 50 Ton • Garasi 3 Traktor Kubota • Office Ops',
    },
  ];

  const activeBlock = sitePlanBlocks.find((b) => b.id === selectedBlockId) || sitePlanBlocks[0];

  return (
    <div className="bg-white p-4 p-md-5 rounded-4 border shadow-sm space-y-4">
      {/* Header Info */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 pb-3 border-bottom">
        <div>
          <span className="badge bg-success-subtle text-success border border-success px-3 py-1 rounded-pill uppercase font-weight-bold mb-2 d-inline-block" style={{ fontSize: 12 }}>
            <i className="ri-layout-grid-line me-1"></i> DENAH INTERAKTIF & PETA GIS LAHAN JONGGOL
          </span>
          <h3 className="h4 font-weight-bold text-dark mb-1 !text-sm">
            Denah Layout Site Plan Kebun & Satelit GPS (2.0 Ha Jonggol, Bogor)
          </h3>
          <p className="text-secondary mb-0" style={{ fontSize: 13 }}>
            Visualisasi Denah Petak Lahan, Bedengan Organik, Greenhouse & Lokasi Jembatan Timbang PKS
          </p>
        </div>

        {/* Toggle Mode Buttons (Corpox Cards vs Blueprint vs Satelit GIS) */}
        <div className="d-flex align-items-center gap-2 bg-light p-1.5 rounded-3 border flex-wrap">
          <button
            onClick={() => setViewMode('denah')}
            className={`btn btn-sm font-weight-bold px-3 py-2 rounded-3 border-0 transition-all ${
              viewMode === 'denah' ? 'bg-success text-white shadow-xs' : 'text-secondary'
            }`}
            style={{ fontSize: 12 }}
          >
            <i className="ri-grid-fill me-1"></i> 🎴 Corpox Cards Site Plan (Desain Khusus)
          </button>
          <button
            onClick={() => setViewMode('satelit')}
            className={`btn btn-sm font-weight-bold px-3 py-2 rounded-3 border-0 transition-all ${
              viewMode === 'satelit' ? 'bg-success text-white shadow-xs' : 'text-secondary'
            }`}
            style={{ fontSize: 12 }}
          >
            <i className="ri-earth-line me-1"></i> 🛰️ Peta Satelit GIS (OpenStreetMap)
          </button>
        </div>
      </div>

      {/* MODE 1: DENAH SITE PLAN DESAIN KHUSUS CORPOX CARDS (SUPER BEAUTIFUL & HIGH IMPACT) */}
      {viewMode === 'denah' ? (
        <div className="space-y-4">
          <div className="d-flex justify-content-between align-items-center bg-white p-3 rounded-4 border shadow-xs">
            <div>
              <span className="badge bg-success-subtle text-success border border-success px-3 py-1 rounded-pill font-mono font-weight-bold" style={{ fontSize: 11 }}>
                📍 PEMETAAN PETAK LAHAN JONGGOL BOGOR (2.0 HA)
              </span>
              <strong className="d-block text-dark font-weight-bold mt-1" style={{ fontSize: 13 }}>
                Klik pada Kartu Blok Lahan di bawah untuk melihat rincian agronomi lengkap
              </strong>
            </div>
            <span className="badge bg-light text-dark border font-weight-bold" style={{ fontSize: 11 }}>
              4 Blok Terpetakan
            </span>
          </div>

          {/* Corpox 2x2 Grid Layout for Land Blocks */}
          <div className="row g-4">
            {sitePlanBlocks.map((block) => {
              const isSelected = selectedBlockId === block.id;
              return (
                <div key={block.id} className="col-12 col-md-6">
                  <div
                    onClick={() => setSelectedBlockId(block.id)}
                    className={`card-box bg-white rounded-4 border p-4 shadow-sm cursor-pointer transition-all position-relative overflow-hidden ${
                      isSelected ? 'border-2 shadow-md' : 'hover:shadow-md'
                    }`}
                    style={{
                      borderLeft: `6px solid ${block.color}`,
                      borderColor: isSelected ? block.color : '#e2e8f0',
                      backgroundColor: isSelected ? block.bgColor : '#ffffff',
                      transform: isSelected ? 'translateY(-2px)' : 'none',
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-start mb-2.5">
                      <span className="badge px-3 py-1.5 rounded-pill text-white font-weight-bold shadow-xs" style={{ backgroundColor: block.color, fontSize: 11 }}>
                        {block.id.toUpperCase()} • {block.area}
                      </span>
                      <span className={`badge ${isSelected ? 'bg-dark text-white' : 'bg-light text-dark border'} font-weight-bold px-2.5 py-1 rounded-pill`} style={{ fontSize: 10 }}>
                        {block.status}
                      </span>
                    </div>

                    <h4 className="font-weight-extrabold text-dark mb-1.5 !text-sm">{block.name}</h4>
                    <p className="text-secondary mb-3 font-weight-medium" style={{ fontSize: 12 }}>
                      📍 {block.coords} • <strong className="text-dark">"{block.crop}"</strong>
                    </p>

                    <div className="p-3 bg-white rounded-3 border space-y-1.5 shadow-xs" style={{ fontSize: 12 }}>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="text-muted font-weight-bold">Status Tanah:</span>
                        <strong className="text-dark">{block.soil} (pH {block.pH})</strong>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="text-muted font-weight-bold">Kelembaban & Irigasi:</span>
                        <strong className="text-success">{block.moisture} • {block.irrigation}</strong>
                      </div>
                      <div className="pt-1 border-top text-secondary font-weight-bold" style={{ fontSize: 11 }}>
                        ⚡ {block.highlights}
                      </div>
                    </div>

                    {isSelected && (
                      <div className="position-absolute bottom-0 end-0 p-2">
                        <span className="badge bg-success text-white rounded-circle shadow-xs" style={{ width: 22, height: 22, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                          <i className="ri-check-line"></i>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed Card for Clicked Block */}
          <div className="p-4 rounded-4 border shadow-sm space-y-3" style={{ backgroundColor: activeBlock.bgColor, borderColor: activeBlock.borderColor }}>
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">
              <div>
                <span className="badge px-3 py-1 rounded-pill font-weight-bold text-white mb-1" style={{ backgroundColor: activeBlock.color, fontSize: 11 }}>
                  INFORMASI DENAH BLOK TERPILIH
                </span>
                <h4 className="font-weight-extrabold text-dark m-0 !text-sm">{activeBlock.name}</h4>
                <span className="text-secondary font-mono" style={{ fontSize: 12 }}>📍 {activeBlock.coords}</span>
              </div>

              <span className="badge bg-white text-dark border font-weight-bold px-3 py-2 shadow-xs" style={{ fontSize: 12 }}>
                Status: {activeBlock.status}
              </span>
            </div>

            <div className="row g-3 pt-2 text-dark" style={{ fontSize: 13 }}>
              <div className="col-6 col-md-3">
                <span className="text-muted d-block font-weight-bold mb-1" style={{ fontSize: 11 }}>Luas Area:</span>
                <strong>{activeBlock.area}</strong>
              </div>
              <div className="col-6 col-md-3">
                <span className="text-muted d-block font-weight-bold mb-1" style={{ fontSize: 11 }}>Komoditas Tanam:</span>
                <strong>{activeBlock.crop}</strong>
              </div>
              <div className="col-6 col-md-3">
                <span className="text-muted d-block font-weight-bold mb-1" style={{ fontSize: 11 }}>Jenis & pH Tanah:</span>
                <strong>{activeBlock.soil} (pH {activeBlock.pH})</strong>
              </div>
              <div className="col-6 col-md-3">
                <span className="text-muted d-block font-weight-bold mb-1" style={{ fontSize: 11 }}>Sistem Irigasi:</span>
                <strong>{activeBlock.irrigation}</strong>
              </div>
            </div>

            <div className="p-3 bg-white rounded-3 border text-secondary" style={{ fontSize: 12 }}>
              <strong className="text-dark d-block mb-1">⚡ Rincian Fasilitas & Fitur Blok:</strong>
              {activeBlock.highlights}
            </div>
          </div>
        </div>
      ) : (
        /* MODE 2: LEAFLET SATELLITE GIS MAP */
        <div className="space-y-3">
          <div className="d-flex justify-content-between align-items-center bg-light p-3 rounded-3 border">
            <span className="badge bg-success text-white font-weight-bold px-3 py-1" style={{ fontSize: 11 }}>
              📍 LEAFLET GIS MAP (OpenStreetMap Bright Vector)
            </span>
            <span className="text-secondary font-mono" style={{ fontSize: 12 }}>
              Center: Lat <b>{activeLat}</b> • Lng <b>{activeLng}</b>
            </span>
          </div>

          <div
            ref={mapContainerRef}
            className="w-100 rounded-4 border shadow-sm"
            style={{ height: 460, minHeight: 400, zIndex: 1, backgroundColor: '#ffffff' }}
          ></div>
        </div>
      )}
    </div>
  );
};
