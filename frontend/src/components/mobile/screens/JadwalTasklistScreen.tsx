import React, { useState } from 'react';

interface JadwalTasklistScreenProps {
  onBack: () => void;
}

export const JadwalTasklistScreen: React.FC<JadwalTasklistScreenProps> = ({ onBack }) => {
  const [tasks, setTasks] = useState([
    {
      id: 'TSK-01',
      title: 'Penyiraman Drip Nutrisi AB Mix (Pagi)',
      block: 'Blok A1 (Melon Golden)',
      assignee: 'Kang Asep (Regu A)',
      time: '07:00 – 08:30 WIB',
      priority: 'Tinggi',
      status: 'Selesai',
      badgeColor: 'bg-emerald-100 text-emerald-800',
    },
    {
      id: 'TSK-02',
      title: 'Pewiwitan Tunas Air Ruas 1-8',
      block: 'Blok A2 (Melon Golden)',
      assignee: 'Pak Joko Sukardi & Tim',
      time: '08:30 – 11:30 WIB',
      priority: 'Sedang',
      status: 'Sedang Dikerjakan',
      badgeColor: 'bg-blue-100 text-blue-800',
    },
    {
      id: 'TSK-03',
      title: 'Aplikasi Hayati Bio-Trichoderma Batang',
      block: 'Blok B1 (Porang Super)',
      assignee: 'Pak Ujang (Regu B)',
      time: '15:30 – 17:00 WIB',
      priority: 'Tinggi',
      status: 'Menunggu Jam',
      badgeColor: 'bg-amber-100 text-amber-800',
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('Semprot Pupuk Kalsium Cair Organik');
  const [newBlock, setNewBlock] = useState('Blok C1 (Cabai Rawit Ori 212)');
  const [newAssignee, setNewAssignee] = useState('Mang Deden (Regu C)');
  const [newTime, setNewTime] = useState('07:30 – 09:30 WIB');
  const [newPriority, setNewPriority] = useState('Tinggi');

  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: t.status === 'Selesai' ? 'Sedang Dikerjakan' : 'Selesai' } : t))
    );
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask = {
      id: `TSK-0${tasks.length + 1}`,
      title: newTitle,
      block: newBlock,
      assignee: newAssignee,
      time: newTime,
      priority: newPriority,
      status: 'Menunggu Jam',
      badgeColor: 'bg-amber-100 text-amber-800',
    };
    setTasks([newTask, ...tasks]);
    setIsModalOpen(false);
    alert(`✅ Tugas "${newTitle}" berhasil diterbitkan untuk ${newAssignee}!`);
  };

  return (
    <div className="space-y-3.5 pb-6 animate-in fade-in duration-150 antialiased text-[#11231D]">
      {/* Back Button */}
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1.5 text-[12px] font-bold text-[#0F5545] hover:text-[#0B3B30] cursor-pointer"
      >
        <i className="ri-arrow-left-line text-sm"></i>
        <span>Kembali ke Menu & Modul</span>
      </button>

      {/* Header Banner */}
      <div className="bg-[#0B3B30] text-white rounded-[18px] p-4 shadow-md border border-[#14473B] flex items-center justify-between">
        <div>
          <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#C8E86B]">
            MANAJEMEN PENUGASAN HARIAN
          </span>
          <h1 className="text-[17px] font-black tracking-tight mt-0.5 m-0 text-white">
            Jadwal & Tasklist Kebun
          </h1>
          <p className="text-[11px] text-[#A3D9C9] m-0 mt-0.5">
            Instruksi kerja harian mandor & checklist penyelesaian
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="w-10 h-10 rounded-[12px] bg-[#C8E86B] text-[#08201A] flex items-center justify-center text-xl font-bold shadow-md hover:bg-[#b8d85c] cursor-pointer"
          title="Tambah Tugas Baru"
        >
          <i className="ri-add-line"></i>
        </button>
      </div>

      {/* Action Button: Buat Tugas Baru (Prominent) */}
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="w-full py-2.5 px-4 rounded-[12px] bg-[#0F5545] hover:bg-[#0B3B30] text-white text-[12.5px] font-extrabold flex items-center justify-center gap-2 shadow-sm cursor-pointer active:scale-98 transition-all"
      >
        <i className="ri-add-circle-fill text-base text-[#C8E86B]"></i>
        <span>+ Buat Penugasan Petani / Mandor Baru</span>
      </button>

      {/* Task List */}
      <div className="space-y-2.5">
        <div className="flex justify-between items-center px-0.5">
          <span className="text-[11px] font-black text-[#0B3B30] uppercase tracking-wider block">
            TUGAS HARI INI ({tasks.length} JADWAL)
          </span>
          <span className="text-[10px] text-[#6A7B73] font-bold">27 Agustus 2026</span>
        </div>

        <div className="space-y-2.5">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white rounded-[16px] p-3.5 border border-[#E2EAE5] shadow-[0_2px_8px_rgba(0,0,0,0.03)] space-y-2"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[9.5px] font-bold text-[#0F5545] bg-[#E8F3ED] px-2 py-0.5 rounded-full inline-block mb-1">
                    {task.id} • {task.block}
                  </span>
                  <h2 className="text-[13px] font-black text-[#11231D] m-0">
                    {task.title}
                  </h2>
                </div>
                <span className={`text-[9.5px] font-black px-2 py-0.5 rounded-full ${task.badgeColor}`}>
                  {task.status}
                </span>
              </div>

              <div className="bg-[#F8FAF8] p-2.5 rounded-[10px] border border-[#E8F0EB] text-[10.5px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-[#6A7B73]">⏰ Waktu Pelaksanaan:</span>
                  <strong className="text-[#11231D]">{task.time}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6A7B73]">👤 Personel Pelaksana:</span>
                  <strong className="text-[#0F5545]">{task.assignee}</strong>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => handleToggleTask(task.id)}
                className={`w-full py-1.5 rounded-[8px] text-[11px] font-bold cursor-pointer transition-colors ${
                  task.status === 'Selesai'
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    : 'bg-[#0F5545] text-white hover:bg-[#0B3B30]'
                }`}
              >
                {task.status === 'Selesai' ? '✓ Tugas Telah Selesai (Tandai Ulang)' : 'Tandai Selesai & Kirim Bukti'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ==================== MODAL BUAT TUGAS BARU (MOBILE) ==================== */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-[20px] p-4 shadow-2xl space-y-3.5 animate-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center border-b border-[#E8F0EB] pb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#0F5545] text-[#C8E86B] flex items-center justify-center font-bold text-sm">
                  <i className="ri-task-fill"></i>
                </div>
                <h3 className="text-[14px] font-black text-[#11231D] m-0">Tambah Tugas Baru</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-lg cursor-pointer"
              >
                <i className="ri-close-line"></i>
              </button>
            </div>

            <form onSubmit={handleAddTask} className="space-y-2.5 text-[11.5px]">
              <div>
                <label className="font-bold text-[#11231D] block mb-1">Judul Tugas / Pekerjaan:</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Contoh: Semprot Kalsium Cair"
                  className="w-full px-3 py-2 rounded-[10px] bg-[#F8FAF8] border border-[#D9E3DC] text-[12px] font-medium outline-none focus:border-[#0F5545]"
                />
              </div>

              <div>
                <label className="font-bold text-[#11231D] block mb-1">Lokasi Blok Kebun:</label>
                <select
                  value={newBlock}
                  onChange={(e) => setNewBlock(e.target.value)}
                  className="w-full px-3 py-2 rounded-[10px] bg-[#F8FAF8] border border-[#D9E3DC] text-[12px] font-medium outline-none focus:border-[#0F5545]"
                >
                  <option value="Blok A1 (Melon Golden)">Blok A1 (Melon Golden)</option>
                  <option value="Blok A2 (Melon Golden)">Blok A2 (Melon Golden)</option>
                  <option value="Blok B1 (Porang Super)">Blok B1 (Porang Super)</option>
                  <option value="Blok C1 (Cabai Rawit Ori 212)">Blok C1 (Cabai Rawit Ori 212)</option>
                  <option value="Blok D1 (Alpukat Miki)">Blok D1 (Alpukat Miki)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-[#11231D] block mb-1">Personel Eksekutor / Petani:</label>
                <select
                  value={newAssignee}
                  onChange={(e) => setNewAssignee(e.target.value)}
                  className="w-full px-3 py-2 rounded-[10px] bg-[#F8FAF8] border border-[#D9E3DC] text-[12px] font-medium outline-none focus:border-[#0F5545]"
                >
                  <option value="Kang Asep (Regu A)">Kang Asep (Regu A - Hortikultura)</option>
                  <option value="Pak Joko Sukardi (Kepala Kebun)">Pak Joko Sukardi (Kepala Kebun)</option>
                  <option value="Pak Ujang (Regu B)">Pak Ujang (Regu B - Porang)</option>
                  <option value="Mang Deden (Regu C)">Mang Deden (Regu C - Cabai)</option>
                  <option value="Kang Wawan (Regu A)">Kang Wawan (Regu A)</option>
                  <option value="Pak Sugeng (Regu D)">Pak Sugeng (Regu D)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-[#11231D] block mb-1">Waktu Kerja:</label>
                  <input
                    type="text"
                    required
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    placeholder="07:30 – 09:30 WIB"
                    className="w-full px-2.5 py-2 rounded-[10px] bg-[#F8FAF8] border border-[#D9E3DC] text-[11.5px] font-medium outline-none focus:border-[#0F5545]"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#11231D] block mb-1">Prioritas:</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-[10px] bg-[#F8FAF8] border border-[#D9E3DC] text-[11.5px] font-medium outline-none focus:border-[#0F5545]"
                  >
                    <option value="Tinggi">Tinggi (Kritis)</option>
                    <option value="Sedang">Sedang (Rutin)</option>
                    <option value="Rendah">Rendah</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-1/3 py-2 rounded-[10px] bg-gray-100 hover:bg-gray-200 text-[#11231D] font-bold text-[11.5px] cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2 rounded-[10px] bg-[#0F5545] hover:bg-[#0B3B30] text-white font-extrabold text-[11.5px] cursor-pointer shadow-sm"
                >
                  Terbitkan Tugas
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
