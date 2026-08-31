import React, { useState } from 'react';
import { useSmartFarmStore, type FieldReportCategory } from '../store/smartFarmStore';
import type { RoleType } from '../context/RoleContext';

interface LiveFieldFeedHubProps {
  currentUserRole?: RoleType | 'MANDOR';
  currentUserName?: string;
  className?: string;
  defaultFilterCategory?: FieldReportCategory | 'ALL';
}

export const LiveFieldFeedHub: React.FC<LiveFieldFeedHubProps> = ({
  currentUserRole = 'SUPERADMIN',
  currentUserName = 'Dr. Hendra Gunawan (Direktur Utama)',
  className = '',
  defaultFilterCategory = 'ALL',
}) => {
  const { fieldPosts, addFieldReportPost, addPostComment, likePost } = useSmartFarmStore();

  // Filters
  const [selectedCategory, setSelectedCategory] = useState<FieldReportCategory | 'ALL'>(defaultFilterCategory);
  const [selectedBlock, setSelectedBlock] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Form State
  const [showComposer, setShowComposer] = useState<boolean>(false);
  const [authorName, setAuthorName] = useState<string>(
    currentUserRole === 'PETANI'
      ? 'Kang Asep Sunandar'
      : currentUserRole === 'KEPALA_KEBUN'
      ? 'Pak Joko Sukardi'
      : currentUserRole === 'MANDOR'
      ? 'Irfan Maulana'
      : currentUserName.split(' ')[0] + ' ' + (currentUserName.split(' ')[1] || '')
  );
  const [formCategory, setFormCategory] = useState<FieldReportCategory>('PEMBUKAAN_LAHAN');
  const [formBlock, setFormBlock] = useState<string>('Blok A Sentra Jonggol (2.0 Ha)');
  const [formCaption, setFormCaption] = useState<string>('');
  const [photoUrlInput, setPhotoUrlInput] = useState<string>('');
  const [formPhotos, setFormPhotos] = useState<string[]>([
    'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=900&q=80',
  ]);
  const [isBeforeAfter, setIsBeforeAfter] = useState<boolean>(false);
  const [beforePhoto, setBeforePhoto] = useState<string>(
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80'
  );
  const [beforeLabel, setBeforeLabel] = useState<string>('Kondisi Awal (Semak Belukar)');
  const [afterPhoto, setAfterPhoto] = useState<string>(
    'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80'
  );
  const [afterLabel, setAfterLabel] = useState<string>('Setelah Land Clearing 100%');

  // Comment input per post
  const [commentInputs, setCommentInputs] = useState<{ [postId: string]: string }>({});

  // Lightbox modal for photo inspection
  const [lightboxImage, setLightboxImage] = useState<{
    url: string;
    caption: string;
    author: string;
    timestamp: string;
    location: string;
  } | null>(null);

  // Filter logic
  const filteredPosts = fieldPosts.filter((post) => {
    const matchCategory = selectedCategory === 'ALL' || post.category === selectedCategory;
    const matchBlock = selectedBlock === 'ALL' || post.blockTarget.toLowerCase().includes(selectedBlock.toLowerCase());
    const matchSearch =
      searchQuery.trim() === '' ||
      post.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.authorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.blockTarget.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchBlock && matchSearch;
  });

  const handleAddPhoto = () => {
    if (photoUrlInput.trim()) {
      setFormPhotos([...formPhotos, photoUrlInput.trim()]);
      setPhotoUrlInput('');
    }
  };

  const handleRemovePhoto = (index: number) => {
    setFormPhotos(formPhotos.filter((_, i) => i !== index));
  };

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formCaption.trim()) return;

    const categoryLabels: Record<FieldReportCategory, string> = {
      PEMBUKAAN_LAHAN: 'Pembukaan & Land Clearing Lahan',
      OLAH_TANAH: 'Pengolahan Tanah & Bedengan',
      PENANAMAN: 'Penanaman & Paspor Pohon QR',
      PEMUPUKAN: 'Aplikasi Pemupukan & Nutrisi Drip',
      PROTEKSI_HAMA: 'Proteksi Hama & AI Scan Tanaman',
      PENGAIRAN: 'Irigasi & Tata Kelola Air',
      PANEN: 'Uji Kemanisan & Timbangan Panen',
      KENDALA_CUACA: 'Monitoring Cuaca & Kendala Lapangan',
      LOGISTIK_PO: 'Realisasi Belanja PO & Aplikasi Lahan',
    };

    const roleMap: Record<string, 'PETANI' | 'MANDOR' | 'KEPALA_KEBUN' | 'DIREKTUR' | 'FINANCE'> = {
      PETANI: 'PETANI',
      MANDOR: 'MANDOR',
      KEPALA_KEBUN: 'KEPALA_KEBUN',
      DIREKTUR: 'DIREKTUR',
      FINANCE: 'FINANCE',
      INVESTOR: 'DIREKTUR',
    };

    const role = roleMap[currentUserRole] || 'MANDOR';

    addFieldReportPost({
      authorName: authorName.trim() || 'Tim Lapangan',
      authorRole: role,
      authorAvatar:
        role === 'PETANI'
          ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'
          : role === 'KEPALA_KEBUN'
          ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80'
          : 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&q=80',
      category: formCategory,
      categoryLabel: categoryLabels[formCategory],
      blockTarget: formBlock,
      caption: formCaption.trim(),
      photoUrls: formPhotos.length > 0 ? formPhotos : ['https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=900&q=80'],
      beforeAfter: isBeforeAfter
        ? {
            beforePhoto,
            beforeLabel,
            afterPhoto,
            afterLabel,
          }
        : undefined,
      gpsLocation: 'Kebun Jonggol Inti (-6.4697, 107.0583)',
      coordinates: { lat: -6.4697, lng: 107.0583 },
    });

    // Reset form
    setFormCaption('');
    setFormPhotos([]);
    setIsBeforeAfter(false);
    setShowComposer(false);
  };

  const handleCommentSubmit = (postId: string) => {
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;

    addPostComment(postId, {
      authorName: currentUserName,
      authorRole: currentUserRole,
      authorAvatar:
        currentUserRole === 'DIREKTUR'
          ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'
          : currentUserRole === 'INVESTOR'
          ? 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80'
          : currentUserRole === 'KEPALA_KEBUN'
          ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80'
          : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      text: text.trim(),
    });

    setCommentInputs({ ...commentInputs, [postId]: '' });
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'DIREKTUR':
        return <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-purple-100 text-purple-800 border border-purple-200">🏛️ Direksi Pusat</span>;
      case 'INVESTOR':
        return <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-amber-100 text-amber-900 border border-amber-300">💰 Investor</span>;
      case 'FINANCE':
        return <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 border border-blue-200">💼 Keuangan</span>;
      case 'KEPALA_KEBUN':
        return <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">👨‍🌾 Kepala Kebun</span>;
      case 'MANDOR':
        return <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-teal-100 text-teal-800 border border-teal-200">📋 Mandor Lapangan</span>;
      case 'PETANI':
      default:
        return <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-green-100 text-green-800 border border-green-200">🌱 Petani</span>;
    }
  };

  const getCategoryBadge = (category: FieldReportCategory) => {
    switch (category) {
      case 'PEMBUKAAN_LAHAN':
        return <span className="px-2.5 py-1 text-xs font-medium rounded-lg bg-[#E8F1EA] text-[#064E3B] border border-[#064E3B]/20">🚜 Pembukaan Lahan</span>;
      case 'OLAH_TANAH':
        return <span className="px-2.5 py-1 text-xs font-medium rounded-lg bg-amber-50 text-amber-800 border border-amber-200">🌾 Olah Tanah & Bedengan</span>;
      case 'PENANAMAN':
        return <span className="px-2.5 py-1 text-xs font-medium rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">🌱 Tanam & Paspor Pohon</span>;
      case 'PEMUPUKAN':
        return <span className="px-2.5 py-1 text-xs font-medium rounded-lg bg-blue-50 text-blue-800 border border-blue-200">💧 Pemupukan Drip</span>;
      case 'PROTEKSI_HAMA':
        return <span className="px-2.5 py-1 text-xs font-medium rounded-lg bg-rose-50 text-rose-800 border border-rose-200">🛡️ Proteksi & Hama AI</span>;
      case 'LOGISTIK_PO':
        return <span className="px-2.5 py-1 text-xs font-medium rounded-lg bg-indigo-50 text-indigo-800 border border-indigo-200">📦 Realisasi Belanja PO</span>;
      case 'PANEN':
        return <span className="px-2.5 py-1 text-xs font-medium rounded-lg bg-amber-100 text-amber-900 border border-amber-300">🍈 Panen & Timbangan</span>;
      case 'KENDALA_CUACA':
      default:
        return <span className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 text-slate-800 border border-slate-200">⛈️ Cuaca & Drainase</span>;
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header Banner - Pengganti Grup WA */}
      <div className="bg-gradient-to-r from-[#064E3B] via-[#0B2F28] to-[#147A63] rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 to-transparent pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-0.5 text-xs font-bold uppercase tracking-wider rounded-full bg-[#C8E86B] text-[#064E3B]">
                ⚡ Live Field Feed Dispatcher
              </span>
              <span className="text-xs text-white/80 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Real-time Terhubung Kebun ↔ Kantor
              </span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight">
              Pusat Pelaporan Situasi Kebun & Transparansi Visual
            </h2>
            <p className="text-sm text-white/80 mt-1 max-w-2xl">
              Menggantikan grup WhatsApp yang tercecer: Setiap foto pembukaan lahan, realisasi barang PO, progres tanam, dan kondisi cuaca terdokumentasi terstruktur, ber-GPS, dan bisa langsung didiskusikan dengan Direksi & Investor.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowComposer(!showComposer)}
              className="px-4 py-2.5 bg-[#C8E86B] hover:bg-[#b8d85b] text-[#064E3B] font-semibold text-sm rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              {showComposer ? 'Tutup Form Laporan' : 'Kirim Laporan Lapangan'}
            </button>
          </div>
        </div>
      </div>

      {/* Composer Section (Form Buat Laporan) */}
      {showComposer && (
        <div className="bg-white rounded-2xl p-6 border border-[#DDE5DF] shadow-md animate-in fade-in duration-300">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#064E3B] text-white flex items-center justify-center font-bold text-base">
                📷
              </div>
              <div>
                <h3 className="font-bold text-[#17211E] text-base">Buat Laporan Situasi Lapangan Baru</h3>
                <p className="text-xs text-[#5F6A65]">Laporan akan langsung terkirim ke Feed Direksi, Manajer Keuangan, dan Investor</p>
              </div>
            </div>
            {getRoleBadge(currentUserRole)}
          </div>

          <form onSubmit={handleSubmitPost} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#17211E] mb-1">Nama Pelapor di Lapangan</label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#064E3B] bg-gray-50"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#17211E] mb-1">Kategori Laporan</label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value as FieldReportCategory)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#064E3B] bg-white font-medium"
                >
                  <option value="PEMBUKAAN_LAHAN">🚜 Pembukaan & Land Clearing Lahan</option>
                  <option value="OLAH_TANAH">🌾 Olah Tanah & Pembuatan Bedengan</option>
                  <option value="PENANAMAN">🌱 Penanaman & Paspor Pohon QR</option>
                  <option value="PEMUPUKAN">💧 Aplikasi Pemupukan & Irigasi</option>
                  <option value="PROTEKSI_HAMA">🛡️ Proteksi Hama & AI Scan Daun</option>
                  <option value="LOGISTIK_PO">📦 Realisasi Belanja PO & Aplikasi Lahan</option>
                  <option value="PANEN">🍈 Uji Kemanisan & Timbangan Panen</option>
                  <option value="KENDALA_CUACA">⛈️ Cuaca & Drainase Saluran Air</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#17211E] mb-1">Target Blok Lahan</label>
                <select
                  value={formBlock}
                  onChange={(e) => setFormBlock(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#064E3B] bg-white"
                >
                  <option value="Blok A Sentra Jonggol (2.0 Ha)">Blok A Sentra Jonggol (2.0 Ha - Melon)</option>
                  <option value="Blok B1 (Kebun Porang Super)">Blok B1 (Kebun Porang Super 1.5 Ha)</option>
                  <option value="Blok B2 (Porang Madiun)">Blok B2 (Porang Madiun 1.0 Ha)</option>
                  <option value="Blok C1 (Lahan Cabai Rawit)">Blok C1 (Persiapan Lahan Cabai 1.0 Ha)</option>
                  <option value="Gudang Logistik Kebun">Gudang Logistik & Pos Timbang Kebun</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#17211E] mb-1">
                Keterangan Situasi Lapangan (Catatan Progres)
              </label>
              <textarea
                rows={3}
                value={formCaption}
                onChange={(e) => setFormCaption(e.target.value)}
                placeholder="Deskripsikan kondisi lapangan: luas yang sudah dikerjakan, alat yang dipakai, dosis pupuk, kendala cuaca, atau barang PO yang sudah diaplikasikan..."
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#064E3B]"
                required
              />
            </div>

            {/* Before vs After Comparison Switch */}
            <div className="bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-200/60">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-[#064E3B]">Sertakan Perbandingan Sebelum vs Sesudah (Before & After)?</span>
                  <span className="text-xs text-gray-500">(Sangat cocok untuk bukti Land Clearing / Olah Tanah)</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsBeforeAfter(!isBeforeAfter)}
                  className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ${
                    isBeforeAfter ? 'bg-[#064E3B]' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                      isBeforeAfter ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {isBeforeAfter && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 pt-3 border-t border-emerald-200/50">
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-gray-700">Foto SEBELUM (Before Photo URL)</label>
                    <input
                      type="text"
                      value={beforePhoto}
                      onChange={(e) => setBeforePhoto(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-gray-300 bg-white"
                      placeholder="https://..."
                    />
                    <input
                      type="text"
                      value={beforeLabel}
                      onChange={(e) => setBeforeLabel(e.target.value)}
                      className="w-full px-3 py-1 text-xs rounded-lg border border-gray-200 bg-gray-50 text-gray-600"
                      placeholder="Label Sebelum, misal: Semak Belukar Awal"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-gray-700">Foto SESUDAH (After Photo URL)</label>
                    <input
                      type="text"
                      value={afterPhoto}
                      onChange={(e) => setAfterPhoto(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-gray-300 bg-white"
                      placeholder="https://..."
                    />
                    <input
                      type="text"
                      value={afterLabel}
                      onChange={(e) => setAfterLabel(e.target.value)}
                      className="w-full px-3 py-1 text-xs rounded-lg border border-gray-200 bg-gray-50 text-gray-600"
                      placeholder="Label Sesudah, misal: Lahan Bersih Siap Bedengan"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Photo Attachment Section */}
            <div>
              <label className="block text-xs font-semibold text-[#17211E] mb-1">
                Bukti Foto Lapangan (Tambahkan URL Foto Dokumentasi)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={photoUrlInput}
                  onChange={(e) => setPhotoUrlInput(e.target.value)}
                  placeholder="Paste URL foto dokumentasi lapangan (https://...)"
                  className="flex-1 px-3 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#064E3B]"
                />
                <button
                  type="button"
                  onClick={handleAddPhoto}
                  className="px-4 py-2 bg-[#064E3B] text-white text-xs font-semibold rounded-xl hover:bg-[#053d2e] cursor-pointer"
                >
                  + Tambah Foto
                </button>
              </div>

              {formPhotos.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                  {formPhotos.map((url, idx) => (
                    <div key={idx} className="relative group rounded-xl overflow-hidden border border-gray-200 h-28 bg-gray-100">
                      <img src={url} alt={`Bukti ${idx + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemovePhoto(idx)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-80 group-hover:opacity-100 cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setShowComposer(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-[#064E3B] hover:bg-[#043d2e] text-white font-semibold text-sm rounded-xl shadow cursor-pointer flex items-center gap-2"
              >
                <span>🚀 Terbitkan Laporan ke Feed</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filter Toolbar */}
      <div className="bg-white rounded-2xl p-4 border border-[#DDE5DF] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full text-xs font-medium">
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === 'ALL'
                ? 'bg-[#064E3B] text-white font-semibold shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Semua Feed ({fieldPosts.length})
          </button>
          <button
            onClick={() => setSelectedCategory('PEMBUKAAN_LAHAN')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === 'PEMBUKAAN_LAHAN'
                ? 'bg-[#064E3B] text-white font-semibold'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            🚜 Pembukaan Lahan
          </button>
          <button
            onClick={() => setSelectedCategory('LOGISTIK_PO')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === 'LOGISTIK_PO'
                ? 'bg-[#064E3B] text-white font-semibold'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            📦 Realisasi PO & Belanja
          </button>
          <button
            onClick={() => setSelectedCategory('PENANAMAN')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === 'PENANAMAN'
                ? 'bg-[#064E3B] text-white font-semibold'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            🌱 Tanam & Paspor Pohon
          </button>
          <button
            onClick={() => setSelectedCategory('PANEN')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === 'PANEN'
                ? 'bg-[#064E3B] text-white font-semibold'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            🍈 Panen & Timbangan
          </button>
        </div>

        {/* Search & Block Selector */}
        <div className="flex items-center gap-3">
          <select
            value={selectedBlock}
            onChange={(e) => setSelectedBlock(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-[#064E3B]"
          >
            <option value="ALL">Semua Blok Lahan</option>
            <option value="Blok A">Blok A (Melon)</option>
            <option value="Blok B">Blok B (Porang)</option>
            <option value="Blok C">Blok C (Cabai)</option>
            <option value="Gudang">Gudang & Timbangan</option>
          </select>

          <div className="relative">
            <input
              type="text"
              placeholder="Cari laporan / nama..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[#064E3B] w-40 md:w-48 bg-gray-50"
            />
            <svg
              className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Feed Stream Cards */}
      <div className="space-y-6">
        {filteredPosts.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-gray-300">
            <div className="text-4xl mb-3">📡</div>
            <h4 className="font-bold text-gray-800 text-base">Belum Ada Laporan pada Kategori Ini</h4>
            <p className="text-xs text-gray-500 mt-1 max-w-md mx-auto">
              Semua aktivitas pembukaan lahan, PO, dan tanam yang diinput tim lapangan akan muncul di sini secara real-time.
            </p>
          </div>
        ) : (
          filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl border border-[#DDE5DF] shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              {/* Post Header */}
              <div className="p-5 pb-3 flex items-start justify-between border-b border-gray-50">
                <div className="flex items-center gap-3">
                  <img
                    src={post.authorAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'}
                    alt={post.authorName}
                    className="w-11 h-11 rounded-full object-cover border-2 border-emerald-500/30 shadow-sm"
                  />
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-bold text-[#17211E] text-sm">{post.authorName}</h4>
                      {getRoleBadge(post.authorRole)}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#5F6A65] mt-0.5">
                      <span>🕒 {post.timestamp}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 font-medium text-emerald-800">
                        📍 {post.gpsLocation}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1.5">
                  {getCategoryBadge(post.category)}
                  <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-md">
                    {post.blockTarget}
                  </span>
                </div>
              </div>

              {/* Post Body Caption */}
              <div className="p-5 pt-3">
                <p className="text-sm text-[#17211E] leading-relaxed whitespace-pre-line font-normal">
                  {post.caption}
                </p>

                {/* Related PO Reference Box if applicable */}
                {post.relatedPoId && (
                  <div className="mt-3 p-3 bg-blue-50/70 rounded-xl border border-blue-200/70 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-blue-900">📦 Terkait Pengadaan:</span>
                      <span className="px-2 py-0.5 bg-blue-600 text-white rounded font-mono font-bold text-[11px]">
                        {post.relatedPoId}
                      </span>
                    </div>
                    <span className="text-blue-700 font-medium">Bukti Kedatangan & Aplikasi Fisik Terverifikasi</span>
                  </div>
                )}

                {/* Before vs After Side-by-Side View */}
                {post.beforeAfter && (
                  <div className="mt-4 bg-emerald-900/5 p-3.5 rounded-2xl border border-emerald-200">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold text-[#064E3B] uppercase tracking-wider">
                        🔄 Perbandingan Sebelum & Sesudah (Ground Truth Verification)
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="relative rounded-xl overflow-hidden border border-gray-300 group">
                        <img
                          src={post.beforeAfter.beforePhoto}
                          alt="Sebelum"
                          className="w-full h-48 object-cover cursor-pointer group-hover:scale-105 transition-transform duration-300"
                          onClick={() =>
                            setLightboxImage({
                              url: post.beforeAfter!.beforePhoto,
                              caption: post.beforeAfter!.beforeLabel,
                              author: post.authorName,
                              timestamp: post.timestamp,
                              location: post.gpsLocation,
                            })
                          }
                        />
                        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow">
                          SEBELUM: {post.beforeAfter.beforeLabel}
                        </div>
                      </div>

                      <div className="relative rounded-xl overflow-hidden border border-emerald-500 group">
                        <img
                          src={post.beforeAfter.afterPhoto}
                          alt="Sesudah"
                          className="w-full h-48 object-cover cursor-pointer group-hover:scale-105 transition-transform duration-300"
                          onClick={() =>
                            setLightboxImage({
                              url: post.beforeAfter!.afterPhoto,
                              caption: post.beforeAfter!.afterLabel,
                              author: post.authorName,
                              timestamp: post.timestamp,
                              location: post.gpsLocation,
                            })
                          }
                        />
                        <div className="absolute top-2 left-2 bg-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow">
                          SESUDAH: {post.beforeAfter.afterLabel}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Regular Photo Gallery */}
                {!post.beforeAfter && post.photoUrls && post.photoUrls.length > 0 && (
                  <div
                    className={`mt-4 grid gap-3 ${
                      post.photoUrls.length === 1 ? 'grid-cols-1' : post.photoUrls.length === 2 ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-3'
                    }`}
                  >
                    {post.photoUrls.map((url, idx) => (
                      <div
                        key={idx}
                        className="relative rounded-xl overflow-hidden border border-gray-200 group bg-gray-100 h-52 cursor-pointer"
                        onClick={() =>
                          setLightboxImage({
                            url,
                            caption: post.caption,
                            author: post.authorName,
                            timestamp: post.timestamp,
                            location: post.gpsLocation,
                          })
                        }
                      >
                        <img
                          src={url}
                          alt={`Foto Dokumentasi ${idx + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                          <span className="text-white text-xs font-medium flex items-center gap-1">
                            🔍 Klik untuk Memperbesar Foto
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Interaction Footer (Likes & Reply Counter) */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => likePost(post.id)}
                      className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                        post.isLiked
                          ? 'bg-emerald-50 text-[#064E3B] font-bold'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <span>{post.isLiked ? '💚' : '🤍'}</span>
                      <span>{post.likesCount} Mengapresiasi</span>
                    </button>

                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      💬 {post.comments.length} Diskusi / Komentar
                    </span>
                  </div>

                  <span className="text-[11px] text-gray-400 font-mono">ID: {post.id}</span>
                </div>
              </div>

              {/* Comments / Thread Section (Replacing WA Group Chat) */}
              <div className="bg-[#FAFBF8] p-5 pt-3 border-t border-gray-100 space-y-3">
                {post.comments.length > 0 && (
                  <div className="space-y-2.5">
                    {post.comments.map((comment) => (
                      <div key={comment.id} className="flex items-start gap-3 bg-white p-3 rounded-xl border border-gray-200/70 shadow-2xs">
                        <img
                          src={comment.authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'}
                          alt={comment.authorName}
                          className="w-8 h-8 rounded-full object-cover border border-gray-200 flex-shrink-0"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-xs text-[#17211E]">{comment.authorName}</span>
                            {getRoleBadge(comment.authorRole)}
                            <span className="text-[11px] text-gray-400 ml-auto">{comment.timestamp}</span>
                          </div>
                          <p className="text-xs text-[#2A3B34] mt-1 leading-relaxed">{comment.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reply Input Box */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    value={commentInputs[post.id] || ''}
                    onChange={(e) =>
                      setCommentInputs({ ...commentInputs, [post.id]: e.target.value })
                    }
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleCommentSubmit(post.id);
                    }}
                    placeholder={`Tulis tanggapan atau instruksi langsung sebagai ${currentUserName}...`}
                    className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-[#064E3B]"
                  />
                  <button
                    onClick={() => handleCommentSubmit(post.id)}
                    className="px-4 py-2 bg-[#064E3B] hover:bg-[#043d2e] text-white text-xs font-semibold rounded-xl transition-all shadow-sm cursor-pointer"
                  >
                    Kirim Balasan
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Fullscreen Lightbox Modal for Photo Inspection */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4 backdrop-blur-xs animate-in fade-in"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 bg-[#064E3B] text-white flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm">Inspeksi Bukti Foto Resolusi Penuh</h4>
                <p className="text-xs text-white/80">
                  Pelapor: {lightboxImage.author} • {lightboxImage.timestamp} • {lightboxImage.location}
                </p>
              </div>
              <button
                onClick={() => setLightboxImage(null)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 bg-black/95 flex items-center justify-center p-2 overflow-auto">
              <img
                src={lightboxImage.url}
                alt="Zoomed Proof"
                className="max-h-[70vh] max-w-full object-contain rounded-lg shadow-md"
              />
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between text-xs text-gray-700">
              <span className="font-medium">{lightboxImage.caption}</span>
              <a
                href={lightboxImage.url}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 bg-[#064E3B] text-white rounded-lg font-semibold hover:bg-[#053d2e]"
              >
                Unduh / Buka Asli
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
