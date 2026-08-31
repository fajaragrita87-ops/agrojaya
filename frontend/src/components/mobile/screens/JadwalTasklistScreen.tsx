import React, { useState } from 'react';
import { useSmartFarmStore } from '../../../store/smartFarmStore';

interface JadwalTasklistScreenProps {
  onBack?: () => void;
}

export const JadwalTasklistScreen: React.FC<JadwalTasklistScreenProps> = () => {
  const { tasks, addTask, toggleTask } = useSmartFarmStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('Penyiraman Drip Kalium & NPK Susulan');
  const [newBlock, setNewBlock] = useState('Blok A2 (Melon Golden Apollo)');
  const [newAssignee, setNewAssignee] = useState('Kang Asep (Regu A)');
  const [newTime, setNewTime] = useState('08:00 – 10:30 WIB');
  const [newCategory, setNewCategory] = useState<'Irigasi' | 'Agronomi' | 'Monitoring' | 'Proteksi' | 'Panen' | 'Olah Lahan'>('Irigasi');
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    addTask({
      title: newTitle,
      target: newBlock,
      assignedTo: newAssignee,
      time: newTime,
      category: newCategory,
      role: 'PETANI',
    });
    setIsModalOpen(false);
    setFeedbackMsg(`✅ Tugas "${newTitle}" berhasil diterbitkan untuk ${newAssignee}!`);
    setTimeout(() => setFeedbackMsg(null), 4000);
  };

  return (
    <div
      className="space-y-3 animate-in fade-in duration-150 antialiased text-[#11231D]"
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
            MANAJEMEN PENUGASAN HARIAN
          </span>
          <h1 className="text-[16px] font-black tracking-tight mt-0.5 m-0 text-white">
            Jadwal & Tasklist Kebun
          </h1>
        </div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="w-9 h-9 rounded-[10px] bg-[#C8E86B] text-[#08201A] flex items-center justify-center text-lg font-bold shadow-md hover:bg-[#b8d85c] cursor-pointer"
          title="Tambah Tugas Baru"
        >
          <i className="ri-add-line"></i>
        </button>
      </div>

      {feedbackMsg && (
        <div className="p-2.5 bg-[#E8F1EA] text-[#0F5545] rounded-[10px] text-[11px] font-bold border border-[#0F5545]/20 animate-in fade-in">
          {feedbackMsg}
        </div>
      )}

      {/* Action Button: Buat Tugas Baru */}
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="w-full py-2 px-4 rounded-[12px] bg-[#0F5545] hover:bg-[#0B3B30] text-white text-[12px] font-bold flex items-center justify-center gap-2 shadow-sm cursor-pointer active:scale-98 transition-all"
      >
        <i className="ri-add-circle-fill text-base text-[#C8E86B]"></i>
        <span>+ Terbitkan Penugasan Mandor Baru</span>
      </button>

      {/* Task List */}
      <div className="space-y-2.5">
        <div className="flex justify-between items-center px-0.5">
          <span className="text-[11px] font-extrabold text-[#0B3B30] uppercase tracking-wider block">
            DAFTAR TUGAS AKTIF ({tasks.length} JADWAL)
          </span>
          <span className="text-[10px] text-[#6A7B73] font-semibold">Live Sync</span>
        </div>

        <div className="space-y-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`rounded-[14px] p-3 border transition-all ${
                task.completed
                  ? 'bg-[#F0FDF4] border-[#86EFAC] shadow-2xs'
                  : 'bg-white border-[#E2EAE5] shadow-[0_2px_8px_rgba(0,0,0,0.03)]'
              } space-y-1.5`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[9px] font-bold text-[#0F5545] bg-[#E8F3ED] px-2 py-0.5 rounded-full inline-block mb-0.5">
                    {task.id} • {task.category}
                  </span>
                  <h2 className={`text-[12.5px] font-bold m-0 ${task.completed ? 'text-[#15803D] line-through' : 'text-[#11231D]'}`}>
                    {task.title}
                  </h2>
                  <p className="text-[10px] text-[#55675E] m-0 mt-0.5">{task.target}</p>
                </div>
                <span
                  className={`text-[9px] font-black px-2 py-0.5 rounded-full ${
                    task.completed ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {task.completed ? '✓ Selesai' : 'Pending'}
                </span>
              </div>

              <div className="bg-[#F8FAF8] p-2 rounded-[8px] border border-[#E8F0EB] text-[10px] space-y-0.5">
                <div className="flex justify-between">
                  <span className="text-[#6A7B73]">⏰ Waktu:</span>
                  <strong className="text-[#11231D]">{task.time}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6A7B73]">👤 Petani:</span>
                  <strong className="text-[#0F5545]">{task.assignedTo}</strong>
                </div>
                {task.completedAt && (
                  <div className="flex justify-between text-[#047857]">
                    <span>Selesai jam:</span>
                    <strong>{task.completedAt}</strong>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => toggleTask(task.id)}
                className={`w-full py-1.5 rounded-[8px] text-[10.5px] font-bold cursor-pointer transition-colors ${
                  task.completed
                    ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    : 'bg-[#0F5545] text-white hover:bg-[#0B3B30]'
                }`}
              >
                {task.completed ? '✓ Telah Selesai (Batal)' : 'Tandai Selesai & Lapor'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ==================== MODAL BUAT TUGAS BARU ==================== */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 z-[9999] flex items-center justify-center p-4 backdrop-blur-xs">
          <div
            style={{
              maxHeight: '88dvh',
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch',
            }}
            className="bg-white w-full max-w-sm rounded-[20px] p-4 shadow-2xl space-y-3 animate-in zoom-in-95 duration-150"
          >
            <div className="flex justify-between items-center border-b border-[#E8F0EB] pb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#0F5545] text-[#C8E86B] flex items-center justify-center font-bold text-sm">
                  <i className="ri-task-fill"></i>
                </div>
                <h3 className="text-[13.5px] font-extrabold text-[#11231D] m-0">
                  Buat Penugasan Kebun
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-[#6A7B73] hover:text-[#11231D] text-lg font-bold cursor-pointer"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleAddTask} className="space-y-2.5 text-[11px]">
              <div>
                <label className="block font-bold text-[#11231D] mb-1">
                  Nama Tugas / Instruksi Kerja:
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-[8px] border border-[#D9E3DC] text-[11px] font-medium"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-[#11231D] mb-1">
                  Lokasi Target Blok & Komoditas:
                </label>
                <input
                  type="text"
                  value={newBlock}
                  onChange={(e) => setNewBlock(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-[8px] border border-[#D9E3DC] text-[11px] font-medium"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-[#11231D] mb-1">
                    Petani / Regu:
                  </label>
                  <select
                    value={newAssignee}
                    onChange={(e) => setNewAssignee(e.target.value)}
                    className="w-full px-2 py-1.5 rounded-[8px] border border-[#D9E3DC] text-[10.5px] font-medium bg-white"
                  >
                    <option value="Kang Asep (Regu A)">Kang Asep (Regu A)</option>
                    <option value="Pak Sugeng (Regu B)">Pak Sugeng (Regu B)</option>
                    <option value="Mang Deden (Regu C)">Mang Deden (Regu C)</option>
                    <option value="Kang Wawan (Regu A)">Kang Wawan (Regu A)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#11231D] mb-1">
                    Kategori:
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-2 py-1.5 rounded-[8px] border border-[#D9E3DC] text-[10.5px] font-medium bg-white"
                  >
                    <option value="Irigasi">Irigasi</option>
                    <option value="Agronomi">Agronomi</option>
                    <option value="Monitoring">Monitoring</option>
                    <option value="Proteksi">Proteksi</option>
                    <option value="Panen">Panen</option>
                    <option value="Olah Lahan">Olah Lahan</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#11231D] mb-1">
                  Target Jam Pengerjaan:
                </label>
                <input
                  type="text"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-[8px] border border-[#D9E3DC] text-[11px] font-medium"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2 bg-[#0F5545] hover:bg-[#0B3B30] text-white font-extrabold text-[11.5px] rounded-[8px] cursor-pointer shadow-sm"
                >
                  Terbitkan Tugas
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-2 border border-[#D9E3DC] text-[#6A7B73] font-bold text-[11px] rounded-[8px] cursor-pointer"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
