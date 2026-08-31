import React, { useState } from 'react';
import { useSmartFarmStore } from '../../../store/smartFarmStore';

interface StokGudangScreenProps {
  onBack?: () => void;
}

export const StokGudangScreen: React.FC<StokGudangScreenProps> = () => {
  const { inventory, adjustStock } = useSmartFarmStore();
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const handleStockChange = (id: string, name: string, change: number) => {
    adjustStock(id, change);
    const actionName = change > 0 ? `+${change}` : `${change}`;
    setSuccessToast(`✅ Stok ${name} disesuaikan (${actionName}) & tersinkron ke Web!`);
    setTimeout(() => setSuccessToast(null), 3000);
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
      {/* Toast */}
      {successToast && (
        <div className="p-3 bg-[#064E3B] text-white rounded-[14px] text-[12px] font-bold border border-[#C8E86B]/40 shadow-lg flex items-center gap-2 animate-in slide-in-from-top duration-200">
          <i className="ri-checkbox-circle-fill text-[#C8E86B] text-base shrink-0"></i>
          <span>{successToast}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-[#0B3B30] text-white rounded-[18px] p-4 shadow-md border border-[#14473B] flex items-center justify-between">
        <div>
          <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#C8E86B]">
            LOGISTIK & INVENTORI GUDANG
          </span>
          <h1 className="text-[17px] font-black tracking-tight mt-0.5 m-0 text-white">
            Stok Gudang Sentral Perkebunan
          </h1>
        </div>
        <div className="w-10 h-10 rounded-[12px] bg-white/10 flex items-center justify-center text-xl text-[#C8E86B]">
          <i className="ri-store-2-fill"></i>
        </div>
      </div>

      {/* Stock Cards */}
      <div className="space-y-2">
        <div className="flex justify-between items-center px-0.5">
          <span className="text-[11px] font-black text-[#0B3B30] uppercase tracking-wider block">
            DAFTAR INVENTORI REAL-TIME ({inventory.length} ITEM)
          </span>
          <span className="text-[10px] font-bold text-[#0F5545] bg-[#E8F3ED] px-2 py-0.5 rounded-full">
            Live Sync Web
          </span>
        </div>

        <div className="space-y-2">
          {inventory.map((item) => {
            const percent = Math.min(100, Math.round((item.stock / Math.max(item.minStock * 2, item.stock)) * 100));
            return (
              <div
                key={item.id}
                className="bg-white rounded-[14px] p-3 border border-[#E2EAE5] shadow-[0_1px_4px_rgba(0,0,0,0.03)] space-y-2"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[9.5px] font-bold text-[#6A7B73] uppercase block">{item.category} • {item.location}</span>
                    <h2 className="text-[12.5px] font-bold text-[#11231D] m-0 leading-tight">
                      {item.name}
                    </h2>
                  </div>
                  <span
                    className={`text-[9px] font-black px-2 py-0.5 rounded-full ${
                      item.status === 'Kritis'
                        ? 'bg-red-100 text-red-800'
                        : item.status === 'Menipis'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-[#E8F3ED] text-[#0F5545]'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="flex justify-between items-center text-[11px] text-[#55675E] pt-1">
                  <span>Stok: <strong className="text-[#0F5545] font-black">{item.stock} {item.unit}</strong></span>
                  <span>Min: <strong>{item.minStock} {item.unit}</strong></span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1.5 rounded-full bg-[#E2EAE5] overflow-hidden">
                  <div
                    style={{ width: `${percent}%` }}
                    className={`h-full rounded-full ${
                      item.status === 'Kritis'
                        ? 'bg-red-500'
                        : item.status === 'Menipis'
                        ? 'bg-amber-500'
                        : 'bg-[#1FB88B]'
                    }`}
                  />
                </div>

                {/* Interactive Stock Controls */}
                <div className="flex items-center justify-end gap-2 pt-1 border-t border-[#F0F5F2]">
                  <span className="text-[10px] text-[#6A7B73] font-medium mr-auto">Sesuaikan Fisik:</span>
                  <button
                    type="button"
                    onClick={() => handleStockChange(item.id, item.name, -5)}
                    className="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-[10px] font-bold rounded-[6px] cursor-pointer"
                    title="Pakai 5"
                  >
                    -5 {item.unit}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStockChange(item.id, item.name, 10)}
                    className="px-2.5 py-1 bg-[#E8F3ED] hover:bg-[#D4EADE] text-[#0F5545] text-[10px] font-black rounded-[6px] cursor-pointer border border-[#0F5545]/20"
                    title="Tambah 10"
                  >
                    +10 {item.unit}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
