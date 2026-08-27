import React, { useState } from 'react';
import { MobileInvestorDashboard } from './MobileInvestorDashboard';
import { MobileFinanceDashboard } from './MobileFinanceDashboard';
import { MobileDirekturDashboard } from './MobileDirekturDashboard';
import { MobileManagerDashboard } from './MobileManagerDashboard';
import { MobileKepalaKebunDashboard } from './MobileKepalaKebunDashboard';
import { MobilePetaniDashboard } from './MobilePetaniDashboard';
import { Link } from 'react-router-dom';
import { useRole, type RoleType } from '../../context/RoleContext';

export const MobilePreviewWrapper: React.FC = () => {
  const { role, setRole } = useRole();
  const [activeScreen, setActiveScreen] = useState<RoleType>(role || 'INVESTOR');
  const [deviceFrame, setDeviceFrame] = useState<boolean>(true);

  const handleRoleSelect = (r: RoleType) => {
    setActiveScreen(r);
    setRole(r);
  };

  const renderActiveScreen = () => {
    switch (activeScreen) {
      case 'DIREKTUR':
        return <MobileDirekturDashboard />;
      case 'INVESTOR':
        return <MobileInvestorDashboard />;
      case 'FINANCE':
        return <MobileFinanceDashboard />;
      case 'MANAGER':
        return <MobileManagerDashboard />;
      case 'KEPALA_KEBUN':
        return <MobileKepalaKebunDashboard />;
      case 'PETANI':
        return <MobilePetaniDashboard />;
      default:
        return <MobileInvestorDashboard />;
    }
  };

  const rolesConfig: { id: RoleType; label: string; icon: string }[] = [
    { id: 'DIREKTUR', label: 'Direktur Utama', icon: '👑' },
    { id: 'INVESTOR', label: 'Investor', icon: '💼' },
    { id: 'FINANCE', label: 'Finance', icon: '💵' },
    { id: 'MANAGER', label: 'Manajer Ops', icon: '👔' },
    { id: 'KEPALA_KEBUN', label: 'Kepala Kebun', icon: '🤠' },
    { id: 'PETANI', label: 'Petani Lapangan', icon: '🚜' },
  ];

  return (
    <div
      className="min-h-screen w-full bg-[#0A1412] text-white flex flex-col items-center justify-start py-4 px-3"
      style={{ fontFamily: "'Manrope', sans-serif" }}
    >
      {/* Top Header & Role Switcher Bar */}
      <div className="w-full max-w-[840px] bg-[#0E2822] border border-[#1C8361]/40 rounded-[18px] p-3.5 mb-4 shadow-xl flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[12px] font-bold flex items-center gap-1.5 transition-colors"
          >
            <i className="ri-arrow-left-line"></i>
            <span>Kembali ke Web</span>
          </Link>
          <div>
            <h2 className="font-bold text-[14px] text-white m-0 leading-tight">
              Simulator Mobile AgroJaya
            </h2>
            <span className="text-[11px] text-[#7AE3B6]">
              Mode Aktif: {rolesConfig.find((r) => r.id === activeScreen)?.label}
            </span>
          </div>
        </div>

        {/* Clear, Bright Role Switcher Pills */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 bg-[#071915] p-1.5 rounded-[12px] border border-white/10">
          {rolesConfig.map((r) => {
            const isSelected = activeScreen === r.id;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => handleRoleSelect(r.id)}
                className={`px-3 py-1.5 rounded-[8px] text-[12px] font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#1C8361] text-white shadow-md ring-2 ring-[#7AE3B6]/50'
                    : 'bg-[#12312A] text-white/90 hover:bg-[#1B4239] hover:text-white border border-white/10'
                }`}
              >
                <span>{r.icon}</span>
                <span>{r.label}</span>
              </button>
            );
          })}
        </div>

        {/* Frame Toggle */}
        <button
          type="button"
          onClick={() => setDeviceFrame(!deviceFrame)}
          className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[12px] font-semibold flex items-center gap-1.5 cursor-pointer"
        >
          <i className="ri-smartphone-line"></i>
          <span>{deviceFrame ? 'Frame: ON' : 'Frame: OFF'}</span>
        </button>
      </div>

      {/* Mobile Device Frame */}
      {deviceFrame ? (
        <div
          style={{ width: '400px', height: '740px', maxHeight: '88vh' }}
          className="relative rounded-[48px] bg-[#0A1A16] border-[7px] border-[#2C4A41] shadow-[0_30px_70px_rgba(0,0,0,0.9)] flex flex-col justify-between overflow-hidden"
        >
          {/* Smartphone Status Bar */}
          <div
            style={{ height: '32px', minHeight: '32px' }}
            className="w-full px-6 bg-[#FAFBF8] text-[#17211E] rounded-t-[38px] flex justify-between items-center text-[11px] font-extrabold border-b border-[#DDE5DF] flex-shrink-0 z-30 select-none"
          >
            <span>09:41</span>
            <div className="w-20 h-3.5 rounded-full bg-[#17211E] mx-auto"></div>
            <div className="flex items-center gap-1 text-[12px]">
              <i className="ri-wifi-line"></i>
              <i className="ri-battery-fill text-[#0F5545]"></i>
            </div>
          </div>

          {/* Screen Content Window */}
          <div className="w-full flex-1 min-h-0 rounded-b-[38px] overflow-hidden relative bg-[#FAFBF8] flex flex-col">
            {renderActiveScreen()}
          </div>
        </div>
      ) : (
        <div
          style={{ width: '400px', height: '740px', maxHeight: '88vh' }}
          className="rounded-[20px] shadow-2xl overflow-hidden bg-[#FAFBF8] text-[#17211E] border border-[#DDE5DF] flex flex-col"
        >
          {renderActiveScreen()}
        </div>
      )}
    </div>
  );
};
