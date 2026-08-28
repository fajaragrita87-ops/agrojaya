import React from 'react';

interface StokGudangScreenProps {
  onBack?: () => void;
}

export const StokGudangScreen: React.FC<StokGudangScreenProps> = () => {
  const stockItems = [
    { name: 'Pupuk Hayati Organik NPK', category: 'Pupuk & Nutrisi', qty: '1.200 Kg', minQty: '500 Kg', status: 'Aman', percent: 85, color: '#0F5545' },
    { name: 'Nutrisi Konsentrat AB Mix Melon', category: 'Pupuk & Nutrisi', qty: '450 Liter', minQty: '200 L', status: 'Aman', percent: 75, color: '#1FB88B' },
    { name: 'Benih Golden Melon F1 Alisha', category: 'Benih Unggul', qty: '8.500 Butir', minQty: '2.000 Butir', status: 'Aman', percent: 90, color: '#3B82F6' },
    { name: 'Bio-Pestisida Nabati & Neem Oil', category: 'Proteksi Tanaman', qty: '65 Liter', minQty: '50 L', status: 'Perlu Reorder', percent: 35, color: '#F59E0B' },
    { name: 'Selang Drip Emitter Irigasi (16mm)', category: 'Peralatan & Hardware', qty: '12 Roll (2.400m)', minQty: '2 Roll', status: 'Cadangan Aman', percent: 95, color: '#6366F1' },
  ];

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
      <div className="bg-[#0B3B30] text-white rounded-[18px] p-4 shadow-md border border-[#14473B] flex items-center justify-between">
        <div>
          <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#C8E86B]">
            LOGISTIK & INVENTORI GUDANG
          </span>
          <h1 className="text-[17px] font-black tracking-tight mt-0.5 m-0 text-white">
            Stok Gudang Sentral Perkebunan
          </h1>
          <p className="text-[11px] text-[#A3D9C9] m-0 mt-0.5">
            Monitoring ketersediaan bahan baku, nutrisi, & benih
          </p>
        </div>
        <div className="w-10 h-10 rounded-[12px] bg-white/10 flex items-center justify-center text-xl text-[#C8E86B]">
          <i className="ri-store-2-fill"></i>
        </div>
      </div>

      {/* Stock Cards */}
      <div className="space-y-2">
        <span className="text-[11px] font-black text-[#0B3B30] uppercase tracking-wider block px-0.5">
          DAFTAR INVENTORI REAL-TIME
        </span>
        <div className="space-y-2">
          {stockItems.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[14px] p-3 border border-[#E2EAE5] shadow-[0_1px_4px_rgba(0,0,0,0.03)] space-y-2"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[9.5px] font-bold text-[#6A7B73] uppercase block">{item.category}</span>
                  <h2 className="text-[12.5px] font-bold text-[#11231D] m-0 leading-tight">
                    {item.name}
                  </h2>
                </div>
                <span
                  className={`text-[9px] font-black px-2 py-0.5 rounded-full ${
                    item.status === 'Perlu Reorder'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-[#E8F3ED] text-[#0F5545]'
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <div className="flex justify-between items-center text-[11px] text-[#55675E] pt-1">
                <span>Stok Riil: <strong className="text-[#0F5545] font-black">{item.qty}</strong></span>
                <span>Batas Minimum: <strong>{item.minQty}</strong></span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 rounded-full bg-[#E2EAE5] overflow-hidden">
                <div
                  style={{ width: `${item.percent}%`, backgroundColor: item.color }}
                  className="h-full rounded-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
