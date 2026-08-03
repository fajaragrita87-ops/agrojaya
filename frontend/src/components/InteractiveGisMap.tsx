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
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const centerMarkerRef = useRef<any>(null);
  const blockMarkersGroupRef = useRef<any>(null);
  const [mapType, setMapType] = useState<'google_sat' | 'google_hybrid' | 'google_streets' | 'esri'>('google_hybrid');
  const [searchQuery, setSearchQuery] = useState('');

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (typeof L === 'undefined') return;

    if (!mapInstanceRef.current) {
      const lat = parseFloat(activeLat) || 0.507067;
      const lng = parseFloat(activeLng) || 101.447771;

      const map = L.map(mapContainerRef.current, {
        center: [lat, lng],
        zoom: 15,
        zoomControl: true,
      });

      mapInstanceRef.current = map;

      // Default Tile: Google Hybrid (Satellite + Labels)
      const googleHybrid = L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
        attribution: '&copy; Google Maps Satellite & AgroJaya GIS',
        maxZoom: 20,
      });

      googleHybrid.addTo(map);

      // Center Pin Marker
      const redIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });

      const marker = L.marker([lat, lng], { icon: redIcon, draggable: true }).addTo(map);
      marker.bindPopup('<b>Google Maps Focus Pin</b><br>Seret marker untuk ubah lokasi GPS');
      centerMarkerRef.current = marker;

      // Event: Marker Dragged
      marker.on('dragend', () => {
        const pos = marker.getLatLng();
        onCoordinatesChange(pos.lat.toFixed(6), pos.lng.toFixed(6));
      });

      // Event: Map Moved / Dragged / Zoomed (Real-time Lat/Long detect)
      map.on('move', () => {
        const center = map.getCenter();
        marker.setLatLng(center);
        onCoordinatesChange(center.lat.toFixed(6), center.lng.toFixed(6));
      });

      // Event: Map Clicked
      map.on('click', (e: any) => {
        const { lat, lng } = e.latlng;
        marker.setLatLng([lat, lng]);
        onCoordinatesChange(lat.toFixed(6), lng.toFixed(6));
      });

      blockMarkersGroupRef.current = L.layerGroup().addTo(map);
    }
  }, []);

  // Update Tile Layer on Type Toggle
  useEffect(() => {
    if (!mapInstanceRef.current || typeof L === 'undefined') return;
    const map = mapInstanceRef.current;

    map.eachLayer((layer: any) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });

    if (mapType === 'google_sat') {
      L.tileLayer('https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
        attribution: '&copy; Google Maps Satellite HD',
        maxZoom: 20,
      }).addTo(map);
    } else if (mapType === 'google_hybrid') {
      L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
        attribution: '&copy; Google Maps Hybrid (Satellite + Labels)',
        maxZoom: 20,
      }).addTo(map);
    } else if (mapType === 'google_streets') {
      L.tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        attribution: '&copy; Google Maps Terrain & Streets',
        maxZoom: 20,
      }).addTo(map);
    } else {
      L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        { attribution: '&copy; Esri World Imagery', maxZoom: 19 }
      ).addTo(map);
    }
  }, [mapType]);

  // Update Center Position when activeLat / activeLng changes from external control
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const lat = parseFloat(activeLat);
    const lng = parseFloat(activeLng);
    if (!isNaN(lat) && !isNaN(lng)) {
      const currentCenter = mapInstanceRef.current.getCenter();
      if (Math.abs(currentCenter.lat - lat) > 0.0001 || Math.abs(currentCenter.lng - lng) > 0.0001) {
        mapInstanceRef.current.setView([lat, lng], mapInstanceRef.current.getZoom(), { animate: true });
        if (centerMarkerRef.current) {
          centerMarkerRef.current.setLatLng([lat, lng]);
        }
      }
    }
  }, [activeLat, activeLng]);

  // Render Markers for Plantation Blocks
  useEffect(() => {
    if (!mapInstanceRef.current || !blockMarkersGroupRef.current || typeof L === 'undefined') return;

    blockMarkersGroupRef.current.clearLayers();

    const greenIcon = L.icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    const validCoords: [number, number][] = [];

    lands.forEach((l) => {
      const lat = parseFloat(String(l.latitude));
      const lng = parseFloat(String(l.longitude));
      if (!isNaN(lat) && !isNaN(lng)) {
        validCoords.push([lat, lng]);
        const m = L.marker([lat, lng], { icon: greenIcon });
        m.bindPopup(`
          <div style="font-family: sans-serif; font-size: 12px; min-width: 180px;">
            <b style="color: #059669; font-size: 13px;">${l.name}</b><br/>
            <span style="color: #475569;">Lokasi: <b>Jonggol, Bogor</b></span><br/>
            <span>Luas: <b>${l.areaHa} Ha</b></span><br/>
            <span>Tanah: <b>${l.soilType}</b></span><br/>
            <span>Status: <b style="color: #059669;">${l.status}</b></span>
          </div>
        `);
        blockMarkersGroupRef.current.addLayer(m);
      }
    });

    if (validCoords.length > 0 && mapInstanceRef.current) {
      try {
        const bounds = L.latLngBounds(validCoords);
        mapInstanceRef.current.fitBounds(bounds, { padding: [40, 40], maxZoom: 16 });
      } catch (e) {
        console.error(e);
      }
    }
  }, [lands]);

  // Handle Location Search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;

    // Check if query is lat,lng format
    const parts = searchQuery.split(',');
    if (parts.length === 2) {
      const lat = parseFloat(parts[0].trim());
      const lng = parseFloat(parts[1].trim());
      if (!isNaN(lat) && !isNaN(lng)) {
        onCoordinatesChange(lat.toFixed(6), lng.toFixed(6));
        return;
      }
    }

    // Geocoding query via Nominatim
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`)
      .then((res) => res.json())
      .then((results) => {
        if (results && results.length > 0) {
          const first = results[0];
          onCoordinatesChange(parseFloat(first.lat).toFixed(6), parseFloat(first.lon).toFixed(6));
        } else {
          alert(`Lokasi "${searchQuery}" tidak ditemukan. Coba ketik "Pekanbaru" atau koordinat.`);
        }
      })
      .catch(console.error);
  };

  return (
    <div className="space-y-3">
      {/* Map Control Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
        {/* Map Mode Switcher */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-bold text-slate-700 mr-1 flex items-center gap-1">
            <i className="ri-google-fill text-emerald-600 text-sm"></i> Google GIS:
          </span>
          <button
            type="button"
            onClick={() => setMapType('google_hybrid')}
            className={`px-2.5 py-1 text-xs font-bold rounded-md transition ${
              mapType === 'google_hybrid'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <i className="ri-earth-line mr-1"></i> Google Hibrida
          </button>
          <button
            type="button"
            onClick={() => setMapType('google_sat')}
            className={`px-2.5 py-1 text-xs font-bold rounded-md transition ${
              mapType === 'google_sat'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <i className="ri-[#4285F4] ri-global-line mr-1"></i> Google Satelit HD
          </button>
          <button
            type="button"
            onClick={() => setMapType('google_streets')}
            className={`px-2.5 py-1 text-xs font-bold rounded-md transition ${
              mapType === 'google_streets'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <i className="ri-map-2-line mr-1"></i> Google Peta Jalan
          </button>
          <button
            type="button"
            onClick={() => setMapType('esri')}
            className={`px-2.5 py-1 text-xs font-bold rounded-md transition ${
              mapType === 'esri'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <i className="ri-road-map-line mr-1"></i> Esri World
          </button>
        </div>

        {/* Search Location Input */}
        <form onSubmit={handleSearch} className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <input
              type="text"
              placeholder="Cari lokasi kebun / ketik Lat, Lng..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-1.5 pl-8 pr-3 bg-white border border-slate-300 rounded-lg text-xs outline-none focus:border-emerald-600 transition"
            />
            <i className="ri-search-line absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
          </div>
          <button
            type="submit"
            className="px-3 py-1.5 bg-emerald-600 text-white font-semibold text-xs rounded-lg hover:bg-emerald-700 transition shadow-xs"
          >
            Cari
          </button>
        </form>
      </div>

      {/* Leaflet Map Div */}
      <div className="relative w-full h-[480px] rounded-xl overflow-hidden border border-slate-300 shadow-inner">
        <div ref={mapContainerRef} className="w-full h-full z-10" />

        {/* Floating Indicator */}
        <div className="absolute bottom-3 left-3 z-[400] bg-white/90 backdrop-blur-xs border border-black/10 px-3 py-1.5 rounded-lg shadow-sm text-[11px] font-mono font-bold text-slate-800 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          <span>GPS Live: {activeLat}, {activeLng}</span>
        </div>
      </div>
    </div>
  );
};
