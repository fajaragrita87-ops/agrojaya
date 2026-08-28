import React, { useEffect, useRef, useState } from 'react';

declare const L: any;

interface PetaGisMobileScreenProps {
  onBack?: () => void;
}

export const PetaGisMobileScreen: React.FC<PetaGisMobileScreenProps> = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [activeLayer, setActiveLayer] = useState<'satellite' | 'street' | 'ndvi'>('satellite');
  const [selectedBlock, setSelectedBlock] = useState<'A' | 'B' | 'C'>('A');

  const blocks = [
    {
      id: 'A',
      name: 'Blok A (Melon Golden F1)',
      area: '8.500 m²',
      crop: 'Golden Melon Alisha (8.500 Pohon)',
      ph: '6.5 (Ideal)',
      moisture: '72%',
      temp: '27.8°C',
      brix: '14.2° Brix',
      lat: -6.4697,
      lng: 107.0544,
      status: 'Fase Pembuahan (Siap Panen 18 Hari)',
      color: '#1FB88B',
    },
    {
      id: 'B',
      name: 'Blok B (Porang Super)',
      area: '6.500 m²',
      crop: 'Porang Madiun (Amorphophallus)',
      ph: '6.2 (Baik)',
      moisture: '76%',
      temp: '26.9°C',
      brix: 'Glukomanan 58%',
      lat: -6.4705,
      lng: 107.0552,
      status: 'Pertumbuhan Vegetatif Aktif',
      color: '#3B82F6',
    },
    {
      id: 'C',
      name: 'Blok C (Greenhouse & Nursery)',
      area: '5.000 m²',
      crop: 'Nursery Bibit F1 & Cabai Ori',
      ph: '6.6 (Optimal)',
      moisture: '68%',
      temp: '28.4°C',
      brix: 'Standar F1 Bersertifikat',
      lat: -6.4688,
      lng: 107.0538,
      status: 'Irigasi Presisi Otomatis',
      color: '#F59E0B',
    },
  ];

  const currentBlock = blocks.find((b) => b.id === selectedBlock) || blocks[0];

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Check if Leaflet is available globally
    if (typeof L !== 'undefined') {
      if (!mapInstanceRef.current) {
        const map = L.map(mapContainerRef.current, {
          center: [-6.4697, 107.0544],
          zoom: 16,
          zoomControl: false,
        });

        // Add Google/Esri World Imagery Satellite Tile Layer
        const satLayer = L.tileLayer(
          'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          {
            attribution: 'Esri Satellite &copy; Smart Farming GIS',
            maxZoom: 19,
          }
        );
        satLayer.addTo(map);

        // Add markers for all blocks
        blocks.forEach((b) => {
          const marker = L.circleMarker([b.lat, b.lng], {
            radius: 9,
            fillColor: b.color,
            color: '#FFFFFF',
            weight: 2.5,
            opacity: 1,
            fillOpacity: 0.9,
          });

          marker.bindPopup(`
            <div style="font-family: sans-serif; font-size: 11px;">
              <strong style="color: #0F5545;">${b.name}</strong><br/>
              <span>${b.crop}</span><br/>
              <span style="font-weight: bold; color: #1FB88B;">pH ${b.ph} • ${b.moisture}</span>
            </div>
          `);

          marker.addTo(map);
        });

        mapInstanceRef.current = map;
      }
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const handleSelectBlock = (blockId: 'A' | 'B' | 'C') => {
    setSelectedBlock(blockId);
    const target = blocks.find((b) => b.id === blockId);
    if (target && mapInstanceRef.current) {
      mapInstanceRef.current.setView([target.lat, target.lng], 17, { animate: true });
    }
  };

  return (
    <div
      className="space-y-3.5 animate-in fade-in duration-150 antialiased text-[#11231D]"
      style={{
        fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 88px)',
        WebkitOverflowScrolling: 'touch',
      }}
    >

      {/* Header Banner */}
      <div className="bg-[#0B3B30] text-white rounded-[18px] p-3.5 shadow-md border border-[#14473B] flex items-center justify-between">
        <div>
          <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#C8E86B]">
            PETA SATELIT & TELEMETRI IOT
          </span>
          <h1 className="text-[17px] font-black tracking-tight mt-0.5 m-0 text-white">
            GIS Sentra Kebun Terpadu (2.0 Ha)
          </h1>
          <p className="text-[11px] text-[#A3D9C9] m-0 mt-0.5">
            GPS: -6.4697, 107.0544 • Sensor Tanah Terverifikasi
          </p>
        </div>
        <div className="w-9 h-9 rounded-[10px] bg-white/10 flex items-center justify-center text-lg text-[#C8E86B]">
          <i className="ri-map-pin-2-fill"></i>
        </div>
      </div>

      {/* Interactive Map Container */}
      <div className="relative w-full h-64 rounded-[18px] overflow-hidden shadow-md border border-[#D9E3DC] bg-[#071915]">
        {/* Leaflet Map DOM Element */}
        <div ref={mapContainerRef} className="w-full h-full z-0" />

        {/* Fallback Graphic if Leaflet is loading/unavailable */}
        <div className="absolute top-2 left-2 z-10 bg-black/60 backdrop-blur-xs text-white text-[9.5px] px-2.5 py-1 rounded-full border border-white/20 flex items-center gap-1.5 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#1FB88B] animate-pulse"></span>
          <span>Satelit Esri Live • Resolusi 0.3m</span>
        </div>

        {/* Layer Switcher */}
        <div className="absolute top-2 right-2 z-10 flex gap-1 bg-black/60 backdrop-blur-xs p-0.5 rounded-full border border-white/20 shadow-sm">
          <button
            type="button"
            onClick={() => setActiveLayer('satellite')}
            className={`px-2 py-0.5 text-[9px] font-bold rounded-full cursor-pointer transition-all ${
              activeLayer === 'satellite' ? 'bg-[#C8E86B] text-[#08201A]' : 'text-white/80'
            }`}
          >
            Satelit
          </button>
          <button
            type="button"
            onClick={() => setActiveLayer('ndvi')}
            className={`px-2 py-0.5 text-[9px] font-bold rounded-full cursor-pointer transition-all ${
              activeLayer === 'ndvi' ? 'bg-[#C8E86B] text-[#08201A]' : 'text-white/80'
            }`}
          >
            NDVI
          </button>
        </div>
      </div>

      {/* Block Selector Tabs */}
      <div className="flex gap-1.5 bg-[#E8F3ED] p-1 rounded-[12px]">
        {blocks.map((b) => (
          <button
            key={b.id}
            type="button"
            onClick={() => handleSelectBlock(b.id as 'A' | 'B' | 'C')}
            className={`flex-1 py-1.5 text-[11px] font-black rounded-[9px] cursor-pointer transition-all ${
              selectedBlock === b.id
                ? 'bg-[#0F5545] text-white shadow-xs'
                : 'text-[#0F5545] hover:bg-[#D8ECE0]'
            }`}
          >
            Blok {b.id}
          </button>
        ))}
      </div>

      {/* Active Block Live Telemetry Card */}
      <div className="bg-white rounded-[16px] p-3.5 border border-[#E2EAE5] shadow-[0_2px_8px_rgba(0,0,0,0.03)] space-y-2.5">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[9.5px] font-bold text-[#0F5545] bg-[#E8F3ED] px-2 py-0.5 rounded-full inline-block mb-1">
              Luas: {currentBlock.area}
            </span>
            <h2 className="text-[14px] font-black text-[#11231D] m-0">
              {currentBlock.name}
            </h2>
            <span className="text-[11px] text-[#55675E] block mt-0.5">{currentBlock.crop}</span>
          </div>
          <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black px-2 py-0.5 rounded-full">
            Online
          </span>
        </div>

        {/* 4 Sensor Telemetry Badges */}
        <div className="grid grid-cols-4 gap-1.5 text-center text-[10.5px]">
          <div className="bg-[#F8FAF8] p-1.5 rounded-[8px] border border-[#E8F0EB]">
            <span className="text-[9px] text-[#6A7B73] block">pH Tanah</span>
            <strong className="text-[#0F5545] text-[11px]">{currentBlock.ph}</strong>
          </div>
          <div className="bg-[#F8FAF8] p-1.5 rounded-[8px] border border-[#E8F0EB]">
            <span className="text-[9px] text-[#6A7B73] block">Kelembaban</span>
            <strong className="text-[#2563EB] text-[11px]">{currentBlock.moisture}</strong>
          </div>
          <div className="bg-[#F8FAF8] p-1.5 rounded-[8px] border border-[#E8F0EB]">
            <span className="text-[9px] text-[#6A7B73] block">Suhu Tanah</span>
            <strong className="text-[#F59E0B] text-[11px]">{currentBlock.temp}</strong>
          </div>
          <div className="bg-[#F8FAF8] p-1.5 rounded-[8px] border border-[#E8F0EB]">
            <span className="text-[9px] text-[#6A7B73] block">Brix / Mutu</span>
            <strong className="text-[#7C3AED] text-[11px]">{currentBlock.brix}</strong>
          </div>
        </div>

        <div className="bg-[#E8F3ED]/60 p-2 rounded-[8px] text-[10.5px] text-[#234B3E] font-semibold flex items-center gap-1.5">
          <i className="ri-checkbox-circle-fill text-[#0F5545]"></i>
          <span>Status: {currentBlock.status}</span>
        </div>
      </div>
    </div>
  );
};
