import React, { useState } from 'react';
import { MobileMenuHubView } from '../../components/mobile/MobileMenuHubView';
import { PetaGisMobileScreen } from '../../components/mobile/screens/PetaGisMobileScreen';
import { KtpSampelScreen } from '../../components/mobile/screens/KtpSampelScreen';
import { Bukti8TahapScreen } from '../../components/mobile/screens/Bukti8TahapScreen';
import { StokGudangScreen } from '../../components/mobile/screens/StokGudangScreen';
import { KalkulatorHppScreen } from '../../components/mobile/screens/KalkulatorHppScreen';
import { LaporanAuditScreen } from '../../components/mobile/screens/LaporanAuditScreen';
import { MasterKomoditasScreen } from '../../components/mobile/screens/MasterKomoditasScreen';
import { JadwalTasklistScreen } from '../../components/mobile/screens/JadwalTasklistScreen';
import { PresensiUpahScreen } from '../../components/mobile/screens/PresensiUpahScreen';
import { TimbanganPanenScreen } from '../../components/mobile/screens/TimbanganPanenScreen';
import { ScanDaunAiScreen } from '../../components/mobile/screens/ScanDaunAiScreen';
import { AlokasiModalScreen } from '../../components/mobile/screens/AlokasiModalScreen';
import { KelolaUserScreen } from '../../components/mobile/screens/KelolaUserScreen';
import { MobileTreeScannerModal } from '../../components/mobile/MobileTreeScannerModal';
import { ApprovalListScreen } from '../../components/mobile/ApprovalListScreen';
import { MobileRoleSwitcherModal } from '../../components/mobile/MobileRoleSwitcherModal';
import { useSmartFarmStore } from '../../store/smartFarmStore';
import { callLiveAI } from '../../services/aiService';

type ManagerTab =
  | 'menu_hub'
  | 'tasklist'
  | 'po'
  | 'gudang'
  | 'timbangan'
  | 'ai'
  | 'peta_gis'
  | 'ktp_sampel'
  | 'siklus_lahan'
  | 'kalkulator'
  | 'laporan_audit'
  | 'master_komoditas'
  | 'jadwal_tugas'
  | 'presensi_sdm'
  | 'scan_daun'
  | 'alokasi_modal'
  | 'kelola_user';

export const MobileManagerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ManagerTab>('menu_hub');
  const [showTreeScanner, setShowTreeScanner] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);

  // Store integration
  const { tasks, toggleTask } = useSmartFarmStore();

  // AI Chat Messages State for Manager
  const [aiInput, setAiInput] = useState('');
  const [aiMessages, setAiMessages] = useState<{ sender: 'user' | 'ai'; text: string; time: string }[]>([
    {
      sender: 'ai',
      text: 'Selamat pagi, Pak Irfan (Manajer Ops). Dashboard operasional kebun Jonggol aktif. SLA mandor 92%.',
      time: '08:00',
    },
  ]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || aiInput;
    if (!query.trim()) return;

    const timeStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    const newMsg = { sender: 'user' as const, text: query, time: timeStr };
    setAiMessages((prev) => [...prev, newMsg]);
    setAiInput('');

    const historyForAI = aiMessages.map((m) => ({
      role: m.sender === 'user' ? ('user' as const) : ('assistant' as const),
      content: m.text,
    }));

    try {
      const res = await callLiveAI(query, historyForAI, 'MANAGER', 'Irfan Maulana (Manajer Ops)');
      setAiMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: res.text,
          time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch {
      setAiMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: 'Maaf, terjadi gangguan jaringan. Silakan periksa koneksi atau API Key Anda.',
          time: timeStr,
        },
      ]);
    }
  };

  return (
    <div
      className="w-full h-full flex flex-col overflow-hidden bg-[#071915] text-[#FAFBF8] relative"
      style={{ fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      {/* 1. Header Forest Emerald with Curved Corners & Subtle Batik/Botanical Silhouette Overlay */}
      <div className="w-full bg-gradient-to-r from-[#064E3B] via-[#047857] to-[#065F46] rounded-b-[26px] px-4 py-4 min-h-[76px] flex items-center justify-between flex-shrink-0 z-20 shadow-[0_12px_28px_-6px_rgba(6,78,59,0.38)] relative overflow-hidden border-b border-white/15 antialiased">
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.15]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 400 100"
          preserveAspectRatio="none"
        >
          <path d="M-20 60 Q 40 10, 100 40 T 220 20 T 340 50 T 440 20" fill="none" stroke="#C8E86B" strokeWidth="1.2" strokeDasharray="4 3" />
          <path d="M-10 85 Q 60 30, 140 70 T 280 40 T 420 80" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.8" />
          <path d="M320 -10 C340 30, 390 40, 420 10 C390 60, 330 50, 320 -10 Z" fill="#C8E86B" opacity="0.6" />
          <path d="M40 -15 C60 25, 110 35, 130 5 C100 45, 50 35, 40 -15 Z" fill="#A7F3D0" opacity="0.5" />
          <circle cx="360" cy="50" r="18" fill="none" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.4" strokeDasharray="2 2" />
          <circle cx="80" cy="20" r="14" fill="none" stroke="#C8E86B" strokeWidth="0.8" opacity="0.4" />
        </svg>

        <div className="flex items-center gap-2.5 relative z-10">
          <div className="w-10 h-10 rounded-[13px] bg-gradient-to-tr from-[#0F5545] to-[#1FB88B] border border-white/30 flex items-center justify-center text-[#C8E86B] shadow-xs text-lg">
            <i className="ri-building-2-fill"></i>
          </div>
          <div>
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-black text-[15px] tracking-tight text-white">SMART FARM</span>
              <span className="bg-[#C8E86B] text-[#064E3B] font-black text-[9px] px-2 py-0.5 rounded-[5px] tracking-wider uppercase shadow-xs">
                MANAJER OPS
              </span>
            </div>
            <span className="text-[9.5px] text-[#A7F3D0] font-medium tracking-wide mt-1 block">
              Operasional Lahan & Produksi
            </span>
          </div>
        </div>

        {/* Live Status Pill & Ganti Role Button */}
        <div className="flex items-center gap-2 relative z-10">
          <button
            type="button"
            onClick={() => setShowRoleModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/25 text-[11px] font-extrabold text-[#C8E86B] shadow-xs cursor-pointer transition-colors"
            title="Pilih dan Ganti Peran Pengguna"
          >
            <i className="ri-user-shared-line text-xs"></i>
            <span>Ganti Role</span>
          </button>
        </div>
      </div>

      {/* 2. Scrollable Body */}
      <div
        style={{
          WebkitOverflowScrolling: 'touch',
        }}
        className="flex-1 min-h-0 overflow-y-auto px-3 py-2.5 space-y-2.5 bg-[#F8FAF8] text-[#17211E]"
      >
        
        {/* ==================== 1. TASKLIST ==================== */}
        {activeTab === 'tasklist' && (
          <div className="space-y-2.5 animate-in fade-in duration-150 pb-4">
            <div className="flex items-center justify-between gap-2 pt-0.5">
              <div className="min-w-0 flex-1">
                <h1 className="font-extrabold text-[14px] text-[#17211E] tracking-tight m-0">
                  Tasklist Mandor
                </h1>
                <p className="text-[10.5px] text-[#4B5563] m-0 font-medium">
                  {tasks.filter((t) => t.completed).length} dari {tasks.length} Selesai Dikerjakan
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('jadwal_tugas')}
                className="text-[10.5px] font-extrabold px-3 py-1.5 rounded-[8px] bg-[#0F5545] hover:bg-[#0B3B30] text-white cursor-pointer shrink-0 shadow-xs active:scale-95 transition-all"
              >
                + Buat Tugas
              </button>
            </div>

            <div className="space-y-2">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`p-2.5 rounded-[12px] border transition-all cursor-pointer space-y-1.5 ${
                    task.completed
                      ? 'bg-[#F0FDF4] border-[#86EFAC]'
                      : 'bg-white border-[#DDE5DF] shadow-2xs hover:border-[#0F5545]'
                  }`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <strong
                      className={`text-[12px] font-bold leading-snug ${
                        task.completed ? 'text-[#1F2937] line-through decoration-[#059669]' : 'text-[#11231D]'
                      }`}
                    >
                      {task.title}
                    </strong>
                    <span
                      className={`font-bold text-[9.5px] px-2 py-0.5 rounded-full shrink-0 ${
                        task.completed ? 'bg-[#DCFCE7] text-[#166534]' : 'bg-[#FAF5EE] text-[#D68B21]'
                      }`}
                    >
                      {task.completed ? '✓ Selesai' : 'Berjalan'}
                    </span>
                  </div>
                  <p className="text-[10.5px] text-[#374151] font-medium m-0">
                    Pelaksana: <strong className="text-[#11231D] font-bold">{task.assignedTo}</strong> • {task.target}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== 2. AJUKAN & TRACKING PO ==================== */}
        {activeTab === 'po' && (
          <ApprovalListScreen onBack={() => setActiveTab('menu_hub')} />
        )}

        {/* ==================== 3. GUDANG ==================== */}
        {activeTab === 'gudang' && (
          <StokGudangScreen onBack={() => setActiveTab('menu_hub')} />
        )}

        {/* ==================== 4. TIMBANGAN ==================== */}
        {activeTab === 'timbangan' && (
          <TimbanganPanenScreen onBack={() => setActiveTab('menu_hub')} />
        )}

        {/* ==================== 5. AI OPS ==================== */}
        {activeTab === 'ai' && (
          <div className="space-y-2 animate-in fade-in duration-150 pb-4">
            <h2 className="font-extrabold text-[13.5px] text-[#17211E] m-0">AI Asisten Operasional</h2>
            
            <div className="h-44 overflow-y-auto space-y-1.5 p-2 bg-[#FAFBF8] rounded-[10px] border border-[#DDE5DF]">
              {aiMessages.map((m, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded-[8px] text-[10.5px] ${
                    m.sender === 'user' ? 'bg-[#0F5545] text-white ml-6' : 'bg-white text-[#17211E] mr-6 border border-[#DDE5DF]'
                  }`}
                >
                  <p className="m-0">{m.text}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-1">
              <input
                type="text"
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                placeholder="Tanyakan SLA mandor, stok pupuk, jadwal panen..."
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 px-2.5 py-1.5 rounded-[6px] border border-[#DDE5DF] text-[11px] bg-white text-[#17211E]"
              />
              <button
                type="button"
                onClick={() => handleSendMessage()}
                className="px-3 bg-[#0F5545] text-white font-bold text-[11px] rounded-[6px] cursor-pointer"
              >
                Kirim
              </button>
            </div>
          </div>
        )}

        {/* ==================== SCREEN MODUL LAINNYA ==================== */}
        {activeTab === 'peta_gis' && (
          <PetaGisMobileScreen onBack={() => setActiveTab('menu_hub')} />
        )}
        {activeTab === 'ktp_sampel' && (
          <KtpSampelScreen onBack={() => setActiveTab('menu_hub')} />
        )}
        {activeTab === 'siklus_lahan' && (
          <Bukti8TahapScreen onBack={() => setActiveTab('menu_hub')} />
        )}
        {activeTab === 'kalkulator' && (
          <KalkulatorHppScreen onBack={() => setActiveTab('menu_hub')} />
        )}
        {activeTab === 'laporan_audit' && (
          <LaporanAuditScreen onBack={() => setActiveTab('menu_hub')} />
        )}
        {activeTab === 'master_komoditas' && (
          <MasterKomoditasScreen onBack={() => setActiveTab('menu_hub')} />
        )}
        {activeTab === 'jadwal_tugas' && (
          <JadwalTasklistScreen onBack={() => setActiveTab('menu_hub')} />
        )}
        {activeTab === 'presensi_sdm' && (
          <PresensiUpahScreen onBack={() => setActiveTab('menu_hub')} />
        )}
        {activeTab === 'scan_daun' && (
          <ScanDaunAiScreen onBack={() => setActiveTab('menu_hub')} />
        )}
        {activeTab === 'alokasi_modal' && (
          <AlokasiModalScreen onBack={() => setActiveTab('menu_hub')} />
        )}
        {activeTab === 'kelola_user' && (
          <KelolaUserScreen onBack={() => setActiveTab('menu_hub')} />
        )}

        {/* ==================== 6. MENU HUB SUPER APP ==================== */}
        {activeTab === 'menu_hub' && (
          <MobileMenuHubView
            onSelectView={(viewId) => {
              if (viewId === 'dasbor' || viewId === 'jadwal_tugas') setActiveTab('jadwal_tugas');
              else if (viewId === 'approval_po') setActiveTab('po');
              else if (viewId === 'peta_gis') setActiveTab('peta_gis');
              else if (viewId === 'ktp_sampel') setActiveTab('ktp_sampel');
              else if (viewId === 'siklus_lahan') setActiveTab('siklus_lahan');
              else if (viewId === 'gudang') setActiveTab('gudang');
              else if (viewId === 'timbangan') setActiveTab('timbangan');
              else if (viewId === 'kalkulator') setActiveTab('kalkulator');
              else if (viewId === 'laporan_audit') setActiveTab('laporan_audit');
              else if (viewId === 'master_komoditas') setActiveTab('master_komoditas');
              else if (viewId === 'presensi_sdm') setActiveTab('presensi_sdm');
              else if (viewId === 'scan_daun') setActiveTab('scan_daun');
              else if (viewId === 'alokasi_modal' || viewId === 'buku_kas') setActiveTab('alokasi_modal');
              else if (viewId === 'tanya_ai') setActiveTab('ai');
              else if (viewId === 'kelola_user') setActiveTab('kelola_user');
              else if (viewId === 'ktp_pohon') setShowTreeScanner(true);
            }}
          />
        )}
      </div>

      {/* 3. Sleek Bottom Nav */}
      <div
        style={{
          height: '62px',
          minHeight: '62px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          zIndex: 50,
          paddingBottom: 'env(safe-area-inset-bottom, 2px)',
        }}
        className="w-full bg-white border-t border-[#E2EAE5] px-1 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] flex-shrink-0"
      >
        {/* 1. Menu Hub Grid */}
        <button
          type="button"
          onClick={() => setActiveTab('menu_hub')}
          style={{ background: 'transparent', border: 'none', outline: 'none' }}
          className={`flex-1 flex flex-col items-center justify-center py-1 text-center cursor-pointer relative ${
            activeTab === 'menu_hub' ? 'text-[#0F5545]' : 'text-[#5F6A65]'
          }`}
        >
          <i className={`${activeTab === 'menu_hub' ? 'ri-apps-2-fill' : 'ri-apps-2-line'} text-[18px] leading-none mb-0.5`}></i>
          <span className={`text-[9px] ${activeTab === 'menu_hub' ? 'font-extrabold text-[#0F5545]' : 'font-medium'}`}>
            Menu
          </span>
          {activeTab === 'menu_hub' && (
            <span className="w-4 h-0.5 rounded-full bg-[#82C341] absolute bottom-0.5 shadow-xs"></span>
          )}
        </button>

        {/* 2. Tasklist */}
        <button
          type="button"
          onClick={() => setActiveTab('tasklist')}
          style={{ background: 'transparent', border: 'none', outline: 'none' }}
          className={`flex-1 flex flex-col items-center justify-center py-1 text-center cursor-pointer ${
            activeTab === 'tasklist' ? 'text-[#0F5545]' : 'text-[#5F6A65]'
          }`}
        >
          <i className="ri-task-fill text-[18px] leading-none mb-0.5"></i>
          <span className={`text-[9px] ${activeTab === 'tasklist' ? 'font-extrabold text-[#0F5545]' : 'font-medium'}`}>
            Tasklist
          </span>
        </button>

        {/* 3. Pengajuan PO */}
        <button
          type="button"
          onClick={() => setActiveTab('po')}
          style={{ background: 'transparent', border: 'none', outline: 'none' }}
          className={`flex-1 flex flex-col items-center justify-center py-1 text-center cursor-pointer ${
            activeTab === 'po' ? 'text-[#0F5545]' : 'text-[#5F6A65]'
          }`}
        >
          <i className="ri-shopping-cart-2-fill text-[18px] leading-none mb-0.5"></i>
          <span className={`text-[9px] ${activeTab === 'po' ? 'font-extrabold text-[#0F5545]' : 'font-medium'}`}>
            Ajukan PO
          </span>
        </button>

        {/* 4. Gudang */}
        <button
          type="button"
          onClick={() => setActiveTab('gudang')}
          style={{ background: 'transparent', border: 'none', outline: 'none' }}
          className={`flex-1 flex flex-col items-center justify-center py-1 text-center cursor-pointer ${
            activeTab === 'gudang' ? 'text-[#0F5545]' : 'text-[#5F6A65]'
          }`}
        >
          <i className="ri-archive-fill text-[18px] leading-none mb-0.5"></i>
          <span className={`text-[9px] ${activeTab === 'gudang' ? 'font-extrabold text-[#0F5545]' : 'font-medium'}`}>
            Gudang
          </span>
        </button>

        {/* 5. Timbangan */}
        <button
          type="button"
          onClick={() => setActiveTab('timbangan')}
          style={{ background: 'transparent', border: 'none', outline: 'none' }}
          className={`flex-1 flex flex-col items-center justify-center py-1 text-center cursor-pointer ${
            activeTab === 'timbangan' ? 'text-[#0F5545]' : 'text-[#5F6A65]'
          }`}
        >
          <i className="ri-scales-3-fill text-[18px] leading-none mb-0.5"></i>
          <span className={`text-[9px] ${activeTab === 'timbangan' ? 'font-extrabold text-[#0F5545]' : 'font-medium'}`}>
            Timbangan
          </span>
        </button>
      </div>

      {/* Full Modal Scanner Camera */}
      <MobileTreeScannerModal
        isOpen={showTreeScanner}
        onClose={() => setShowTreeScanner(false)}
      />

      {/* Role Switcher Modal */}
      <MobileRoleSwitcherModal
        isOpen={showRoleModal}
        onClose={() => setShowRoleModal(false)}
      />
    </div>
  );
};
