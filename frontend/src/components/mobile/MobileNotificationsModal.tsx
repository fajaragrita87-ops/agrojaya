import React, { useState } from 'react';

interface NotificationItem {
  id: string;
  title: string;
  desc: string;
  time: string;
  type: 'PO' | 'HARVEST' | 'MAINTENANCE' | 'ALERT';
  unread: boolean;
  icon: string;
  iconBg: string;
  iconColor: string;
}

interface MobileNotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAction?: (notifType: string) => void;
}

export const MobileNotificationsModal: React.FC<MobileNotificationsModalProps> = ({
  isOpen,
  onClose,
  onSelectAction,
}) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'NT-01',
      title: 'Otorisasi PO-026 Mendesak',
      desc: 'Pengadaan Pupuk Daun Hayati MgSO4 (Rp 28.500.000) butuh tanda tangan Anda.',
      time: '10 mnt lalu',
      type: 'PO',
      unread: true,
      icon: 'ri-shield-check-fill',
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-700',
    },
    {
      id: 'NT-02',
      title: 'Kadar Brix Melon Capai 14.5°',
      desc: 'Pohon Sampel A2 #18 teruji manis optimal. Siap panen 18 hari lagi.',
      time: '45 mnt lalu',
      type: 'HARVEST',
      unread: true,
      icon: 'ri-sparkling-fill',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-700',
    },
    {
      id: 'NT-03',
      title: 'Log Irigasi Pagi Selesai',
      desc: 'Mandor Joko telah memindai QR ajir & mengocor nutrisi 2L/pohon di Blok A1.',
      time: '2 jam lalu',
      type: 'MAINTENANCE',
      unread: false,
      icon: 'ri-drop-fill',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-700',
    },
    {
      id: 'NT-04',
      title: 'Sensor pH Tanah Normal (6.5)',
      desc: 'Telemetri IoT Kebun Jonggol 2.0 Ha mencatat kondisi tanah stabil.',
      time: '07:00 WIB',
      type: 'ALERT',
      unread: false,
      icon: 'ri-earth-fill',
      iconBg: 'bg-teal-100',
      iconColor: 'text-teal-700',
    },
  ]);

  if (!isOpen) return null;

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, unread: false })));
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <div className="fixed inset-0 z-[9999] flex items-end justify-center overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-xs transition-opacity cursor-pointer animate-in fade-in duration-150"
        onClick={onClose}
      ></div>

      {/* Notification Sheet */}
      <div className="relative w-full max-w-[480px] mx-auto max-h-[85vh] bg-[#FAFBF8] text-[#17211E] rounded-t-[24px] shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-bottom duration-200 border-t border-[#DDE5DF] overflow-hidden">
        {/* Header */}
        <div className="p-3.5 bg-gradient-to-r from-[#061E18] via-[#0A382E] to-[#0F4E40] text-white flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <div className="relative">
              <i className="ri-notification-3-fill text-[#C8E86B] text-lg"></i>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              )}
            </div>
            <div>
              <strong className="text-[12.5px] text-white block leading-tight">Pusat Notifikasi</strong>
              <span className="text-[8.5px] text-[#A3D9C9]">{unreadCount} pesan belum dibaca</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllAsRead}
                className="text-[9.5px] text-[#C8E86B] hover:underline font-bold"
              >
                Tandai Dibaca
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-base transition-colors cursor-pointer"
            >
              &times;
            </button>
          </div>
        </div>

        {/* List of Notifications */}
        <div className="p-3.5 overflow-y-auto space-y-2 flex-1">
          {notifications.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                if (onSelectAction) onSelectAction(item.type);
                onClose();
              }}
              className={`p-3 rounded-[14px] border transition-all cursor-pointer flex gap-2.5 items-start ${
                item.unread
                  ? 'bg-white border-[#0F5545] shadow-xs ring-1 ring-[#0F5545]/20'
                  : 'bg-[#FAFBF8] border-[#DDE5DF] hover:bg-white'
              }`}
            >
              <div className={`w-8 h-8 rounded-[10px] ${item.iconBg} ${item.iconColor} flex items-center justify-center text-base flex-shrink-0 mt-0.5 shadow-2xs`}>
                <i className={item.icon}></i>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                  <strong className="text-[11.5px] text-[#17211E] truncate block">{item.title}</strong>
                  <span className="text-[8.5px] text-[#5F6A65] flex-shrink-0 ml-1 font-medium">{item.time}</span>
                </div>
                <p className="text-[10px] text-[#5F6A65] m-0 leading-relaxed line-clamp-2">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-2.5 bg-white border-t border-[#DDE5DF] text-center">
          <span className="text-[10px] text-[#5F6A65]">
            🔔 Notifikasi otomatis diperbarui secara *real-time* dari sensor kebun.
          </span>
        </div>
      </div>
    </div>
  );
};
