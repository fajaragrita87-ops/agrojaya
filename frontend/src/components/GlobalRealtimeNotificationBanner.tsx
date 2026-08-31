import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSmartFarmStore, type AppNotification } from '../store/smartFarmStore';
import { useRole } from '../context/RoleContext';

export const GlobalRealtimeNotificationBanner: React.FC = () => {
  const { activeToast, dismissToast, markNotificationRead } = useSmartFarmStore();
  const { role } = useRole();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [currentNotif, setCurrentNotif] = useState<AppNotification | null>(null);

  useEffect(() => {
    if (activeToast) {
      // Check if notification is relevant to current role
      const isTargetRole =
        !activeToast.targetRole ||
        activeToast.targetRole === 'ALL' ||
        activeToast.targetRole === role ||
        role === 'SUPERADMIN' ||
        (activeToast.targetRole === 'INVESTOR' && (role === 'INVESTOR' || role === 'DIREKTUR')) ||
        (activeToast.targetRole === 'DIREKTUR' && (role === 'DIREKTUR' || role === 'FINANCE'));

      if (isTargetRole) {
        setCurrentNotif(activeToast);
        setIsVisible(true);

        // Haptic feedback on mobile devices
        if (typeof window !== 'undefined' && 'vibrate' in navigator) {
          try {
            navigator.vibrate([40, 60, 40]);
          } catch {
            // ignore
          }
        }

        // Auto dismiss after 6 seconds
        const timer = setTimeout(() => {
          setIsVisible(false);
          setTimeout(() => dismissToast(), 300);
        }, 6000);

        return () => clearTimeout(timer);
      }
    } else {
      setIsVisible(false);
    }
  }, [activeToast, role, dismissToast]);

  if (!currentNotif || !isVisible) {
    return null;
  }

  const handleActionClick = () => {
    markNotificationRead(currentNotif.id);
    setIsVisible(false);
    dismissToast();
    if (currentNotif.actionUrl) {
      navigate(currentNotif.actionUrl);
    }
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'PO_CREATED':
        return 'ri-shopping-cart-2-fill text-amber-400';
      case 'PO_VERIFIED':
        return 'ri-shield-check-fill text-emerald-400';
      case 'PO_APPROVED':
        return 'ri-star-fill text-yellow-300';
      case 'PO_DISBURSED':
        return 'ri-money-dollar-circle-fill text-[#C8E86B]';
      case 'PHOTO_REPORT':
        return 'ri-camera-lens-fill text-emerald-400';
      case 'TASK_COMPLETED':
        return 'ri-checkbox-circle-fill text-[#C8E86B]';
      default:
        return 'ri-notification-3-fill text-[#C8E86B]';
    }
  };

  return (
    <div
      style={{ zIndex: 9999999 }}
      className="fixed top-3 inset-x-3 sm:inset-x-auto sm:right-5 sm:w-[420px] pointer-events-auto transition-all duration-300 transform animate-in slide-in-from-top-4"
    >
      <div className="bg-[#0B3B30] text-white rounded-[18px] p-3.5 shadow-[0_10px_35px_rgba(0,0,0,0.35)] border border-[#C8E86B]/40 flex items-start gap-3 backdrop-blur-md">
        {/* Glowing Icon Badge */}
        <div className="w-10 h-10 rounded-[12px] bg-white/15 border border-white/20 flex items-center justify-center text-xl shrink-0 shadow-inner">
          <i className={getIconForType(currentNotif.type)}></i>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1 mb-0.5">
            <div className="flex items-center gap-1.5 overflow-hidden">
              {currentNotif.badgeLabel && (
                <span className="bg-[#C8E86B] text-[#064E3B] text-[9px] font-black uppercase px-1.5 py-0.5 rounded-md shrink-0">
                  {currentNotif.badgeLabel}
                </span>
              )}
              <strong className="text-[12.5px] font-bold text-white truncate block">
                {currentNotif.title}
              </strong>
            </div>
            <span className="text-[9.5px] text-[#A3D9C9] shrink-0 font-medium">
              {currentNotif.timestamp}
            </span>
          </div>

          <p className="text-[11px] text-[#E2E8F0] leading-snug line-clamp-2 m-0 mb-2">
            {currentNotif.message}
          </p>

          {/* Action Row */}
          <div className="flex items-center gap-2 pt-1 border-t border-white/10">
            {currentNotif.actionUrl && (
              <button
                type="button"
                onClick={handleActionClick}
                className="px-2.5 py-1 rounded-[8px] bg-[#C8E86B] hover:bg-[#b9dc58] text-[#064E3B] font-black text-[10.5px] flex items-center gap-1 cursor-pointer transition-transform active:scale-95 shadow-xs"
              >
                <span>Lihat Detail</span>
                <i className="ri-arrow-right-line"></i>
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                setIsVisible(false);
                dismissToast();
              }}
              className="px-2 py-1 rounded-[8px] bg-white/10 hover:bg-white/20 text-white text-[10.5px] font-medium cursor-pointer"
            >
              Tutup
            </button>
          </div>
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={() => {
            setIsVisible(false);
            dismissToast();
          }}
          className="text-white/60 hover:text-white text-base leading-none cursor-pointer shrink-0"
        >
          &times;
        </button>
      </div>
    </div>
  );
};
