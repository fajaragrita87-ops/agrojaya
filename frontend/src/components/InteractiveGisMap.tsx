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
  const [tileSource, setTileSource] = useState<'osm' | 'satellite'>('osm');
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const centerMarkerRef = useRef<any>(null);
  const blockMarkersGroupRef = useRef<any>(null);
  const currentTileLayerRef = useRef<any>(null);

  const JONGGOL_LAT = -6.4697;
  const JONGGOL_LNG = 107.0544;

  // Initialize and update Leaflet GIS Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (typeof L === 'undefined') {
      return;
    }

    if (!mapInstanceRef.current && mapContainerRef.current) {
      let parsedLat = parseFloat(activeLat);
      let parsedLng = parseFloat(activeLng);

      if (isNaN(parsedLat) || parsedLat > 0) parsedLat = JONGGOL_LAT;
      if (isNaN(parsedLng) || parsedLng < 100) parsedLng = JONGGOL_LNG;

      const map = L.map(mapContainerRef.current, {
        center: [parsedLat, parsedLng],
        zoom: 16,
        zoomControl: true,
      });

      mapInstanceRef.current = map;

      // Base tile layer
      const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap | Smart Farming Indonesia',
        maxZoom: 19,
      });

      osmLayer.addTo(map);
      currentTileLayerRef.current = osmLayer;

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
      marker.bindPopup(`<b>Pusat GPS Lahan Perkebunan</b><br>Lat: ${parsedLat.toFixed(6)}, Lng: ${parsedLng.toFixed(6)}`);
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
    }
  }, []);

  // Update Tile Source
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    if (currentTileLayerRef.current) {
      mapInstanceRef.current.removeLayer(currentTileLayerRef.current);
    }

    let newLayer: any;
    if (tileSource === 'satellite') {
      newLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '&copy; Esri World Imagery | Smart Farming GIS',
        maxZoom: 18,
      });
    } else {
      newLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap | Smart Farming Indonesia',
        maxZoom: 19,
      });
    }

    newLayer.addTo(mapInstanceRef.current);
    currentTileLayerRef.current = newLayer;
  }, [tileSource]);

  // Update Markers when lands change
  useEffect(() => {
    if (!mapInstanceRef.current || !blockMarkersGroupRef.current) return;

    blockMarkersGroupRef.current.clearLayers();

    const greenIcon = L.icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    lands.forEach((land, i) => {
      let lat = parseFloat(String(land.latitude));
      let lng = parseFloat(String(land.longitude));
      if (isNaN(lat) || lat > 0) lat = JONGGOL_LAT - i * 0.0015;
      if (isNaN(lng) || lng < 100) lng = JONGGOL_LNG + i * 0.0020;

      const m = L.marker([lat, lng], { icon: greenIcon });
      m.bindPopup(`<b>${land.name}</b><br>Luas: ${land.areaHa} Ha • Tanah: ${land.soilType}<br><span style="color: #059669; font-weight: bold;">Status: ${land.status}</span>`);
      blockMarkersGroupRef.current.addLayer(m);
    });
  }, [lands]);

  // Fly to coordinate when activeLat/Lng changed externally
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const lat = parseFloat(activeLat);
    const lng = parseFloat(activeLng);
    if (!isNaN(lat) && !isNaN(lng) && lat < 0 && lng > 100) {
      mapInstanceRef.current.flyTo([lat, lng], 17, { duration: 1.2 });
      if (centerMarkerRef.current) {
        centerMarkerRef.current.setLatLng([lat, lng]);
      }
    }
  }, [activeLat, activeLng]);

  return (
    <div className="card-box p-4 rounded-4 bg-white border shadow-sm space-y-3">
      {/* Map Control Bar */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 pb-2 border-bottom">
        <div className="d-flex align-items-center gap-2">
          <span className="text-muted font-weight-bold" style={{ fontSize: 12 }}>Koordinat Satelit:</span>
          <span className="badge bg-light text-dark border font-mono font-weight-bold" style={{ fontSize: 11.5 }}>
            Lat: {activeLat}, Lng: {activeLng}
          </span>
        </div>

        {/* Satellite vs OpenStreetMap Switcher */}
        <div className="d-flex align-items-center gap-1.5">
          <button
            onClick={() => setTileSource('osm')}
            className={`btn btn-sm px-3 py-1 rounded-pill font-weight-bold ${
              tileSource === 'osm' ? 'btn-success text-white' : 'btn-light border text-muted'
            }`}
            style={{ fontSize: 11.5 }}
          >
            <i className="ri-map-2-line me-1"></i> Peta Standar
          </button>
          <button
            onClick={() => setTileSource('satellite')}
            className={`btn btn-sm px-3 py-1 rounded-pill font-weight-bold ${
              tileSource === 'satellite' ? 'btn-success text-white' : 'btn-light border text-muted'
            }`}
            style={{ fontSize: 11.5 }}
          >
            <i className="ri-earth-line me-1"></i> Foto Satelit Udara
          </button>
        </div>
      </div>

      {/* Actual Interactive Map Container */}
      <div
        ref={mapContainerRef}
        className="w-100 rounded-3 border overflow-hidden"
        style={{ height: '460px', zIndex: 1 }}
      ></div>
    </div>
  );
};
