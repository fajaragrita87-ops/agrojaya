import React, { useState, useRef } from 'react';
import { useSmartFarmStore, type FieldReportCategory } from '../../../store/smartFarmStore';

interface LiveFeedKebunScreenProps {
  onBack?: () => void;
  userRole?: 'PETANI' | 'MANDOR' | 'KEPALA_KEBUN' | 'DIREKTUR' | 'FINANCE' | 'INVESTOR';
}

export const LiveFeedKebunScreen: React.FC<LiveFeedKebunScreenProps> = ({
  onBack,
  userRole = 'PETANI',
}) => {
  const { fieldPosts, addFieldReportPost, addPostComment, likePost } = useSmartFarmStore();

  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const [activeCategory, setActiveCategory] = useState<FieldReportCategory | 'ALL'>('ALL');
  const [showModalNewPost, setShowModalNewPost] = useState(false);

  // Form states
  const [categoryInput, setCategoryInput] = useState<FieldReportCategory>('PEMBUKAAN_LAHAN');
  const [blockInput, setBlockInput] = useState('Blok A Sentra Jonggol');
  const [captionInput, setCaptionInput] = useState('');
  const [photoInput, setPhotoInput] = useState(
    'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80'
  );
  const [isBeforeAfter, setIsBeforeAfter] = useState(false);
  const [beforeUrl, setBeforeUrl] = useState('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80');
  const [afterUrl, setAfterUrl] = useState('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80');

  const handlePhotoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setPhotoInput(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Comment input per post
  const [commentText, setCommentText] = useState<{ [postId: string]: string }>({});

  // Lightbox
  const [activePhotoZoom, setActivePhotoZoom] = useState<string | null>(null);

  const filteredPosts = fieldPosts.filter((p) => {
    if (activeCategory === 'ALL') return true;
    return p.category === activeCategory;
  });

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!captionInput.trim()) return;

    const categoryLabels: Record<FieldReportCategory, string> = {
      PEMBUKAAN_LAHAN: 'Pembukaan & Land Clearing Lahan',
      OLAH_TANAH: 'Pengolahan Tanah & Bedengan',
      PENANAMAN: 'Penanaman & Paspor Pohon QR',
      PEMUPUKAN: 'Aplikasi Pemupukan & Irigasi',
      PROTEKSI_HAMA: 'Proteksi Hama & AI Scan Tanaman',
      PENGAIRAN: 'Irigasi & Tata Kelola Air',
      PANEN: 'Uji Kemanisan & Timbangan Panen',
      KENDALA_CUACA: 'Monitoring Cuaca & Kendala Lapangan',
      LOGISTIK_PO: 'Realisasi Belanja PO & Aplikasi Lahan',
    };

    const authorName =
      userRole === 'PETANI'
        ? 'Kang Asep Sunandar'
        : userRole === 'KEPALA_KEBUN'
        ? 'Pak Joko Sukardi'
        : userRole === 'MANDOR'
        ? 'Irfan Maulana'
        : userRole === 'INVESTOR'
        ? 'Bambang Soediro (Investor)'
        : 'Dr. Hendra Gunawan (Direktur)';

    const role =
      userRole === 'PETANI'
        ? 'PETANI'
        : userRole === 'KEPALA_KEBUN'
        ? 'KEPALA_KEBUN'
        : userRole === 'MANDOR'
        ? 'MANDOR'
        : 'DIREKTUR';

    addFieldReportPost({
      authorName,
      authorRole: role,
      authorAvatar:
        role === 'PETANI'
          ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'
          : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      category: categoryInput,
      categoryLabel: categoryLabels[categoryInput],
      blockTarget: blockInput,
      caption: captionInput.trim(),
      photoUrls: [photoInput],
      beforeAfter: isBeforeAfter
        ? {
            beforePhoto: beforeUrl,
            beforeLabel: 'Kondisi Awal (Semak Belukar)',
            afterPhoto: afterUrl,
            afterLabel: 'Setelah Land Clearing Selesai',
          }
        : undefined,
      gpsLocation: 'Kebun Jonggol Inti (-6.4697, 107.0583)',
      coordinates: { lat: -6.4697, lng: 107.0583 },
    });

    setCaptionInput('');
    setShowModalNewPost(false);
  };

  const handleSendComment = (postId: string) => {
    const text = commentText[postId];
    if (!text || !text.trim()) return;

    const authorName =
      userRole === 'PETANI'
        ? 'Kang Asep (Petani)'
        : userRole === 'KEPALA_KEBUN'
        ? 'Pak Joko (Kepala Kebun)'
        : userRole === 'INVESTOR'
        ? 'Bambang Soediro (Investor)'
        : 'Dr. Hendra Gunawan (Direktur)';

    addPostComment(postId, {
      authorName,
      authorRole: userRole,
      authorAvatar:
        userRole === 'PETANI'
          ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'
          : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      text: text.trim(),
    });

    setCommentText({ ...commentText, [postId]: '' });
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#F4F7F5] overflow-y-auto pb-24 text-[#17211E]">
      {/* Header Sticky */}
      <div className="sticky top-0 z-30 bg-[#064E3B] text-white px-4 py-3 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {onBack && (
            <button
              onClick={onBack}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer text-white"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          <h1 className="font-extrabold text-[16px] text-white m-0 tracking-tight">
            Live Feed Lapangan
          </h1>
        </div>

        <button
          onClick={() => setShowModalNewPost(true)}
          className="px-3 py-1.5 bg-[#C8E86B] text-[#064E3B] font-extrabold text-[11.5px] rounded-[10px] shadow-sm cursor-pointer flex items-center gap-1.5 active:scale-95 transition-all"
        >
          <i className="ri-camera-fill text-sm"></i>
          <span>Lapor Foto</span>
        </button>
      </div>

      {/* Category Pills Slider */}
      <div className="px-3 py-2 bg-white border-b border-gray-200 flex items-center gap-1.5 overflow-x-auto text-xs no-scrollbar">
        <button
          onClick={() => setActiveCategory('ALL')}
          className={`px-3 py-1 rounded-full whitespace-nowrap font-medium transition-all ${
            activeCategory === 'ALL'
              ? 'bg-[#064E3B] text-white shadow-xs'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          Semua ({fieldPosts.length})
        </button>
        <button
          onClick={() => setActiveCategory('PEMBUKAAN_LAHAN')}
          className={`px-3 py-1 rounded-full whitespace-nowrap font-medium transition-all ${
            activeCategory === 'PEMBUKAAN_LAHAN'
              ? 'bg-[#064E3B] text-white shadow-xs'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          🚜 Pembukaan Lahan
        </button>
        <button
          onClick={() => setActiveCategory('LOGISTIK_PO')}
          className={`px-3 py-1 rounded-full whitespace-nowrap font-medium transition-all ${
            activeCategory === 'LOGISTIK_PO'
              ? 'bg-[#064E3B] text-white shadow-xs'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          📦 Realisasi PO
        </button>
        <button
          onClick={() => setActiveCategory('PENANAMAN')}
          className={`px-3 py-1 rounded-full whitespace-nowrap font-medium transition-all ${
            activeCategory === 'PENANAMAN'
              ? 'bg-[#064E3B] text-white shadow-xs'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          🌱 Tanam & QR
        </button>
        <button
          onClick={() => setActiveCategory('PANEN')}
          className={`px-3 py-1 rounded-full whitespace-nowrap font-medium transition-all ${
            activeCategory === 'PANEN'
              ? 'bg-[#064E3B] text-white shadow-xs'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          🍈 Panen
        </button>
      </div>

      {/* Feed Post List */}
      <div className="p-3 space-y-4">
        {filteredPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            {/* Header Post */}
            <div className="p-3.5 pb-2 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src={post.authorAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'}
                  alt={post.authorName}
                  className="w-10 h-10 rounded-full object-cover border border-emerald-500/30"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs text-[#17211E]">{post.authorName}</span>
                    <span className="text-[10px] px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded font-semibold">
                      {post.authorRole}
                    </span>
                  </div>
                  <div className="text-[10px] text-gray-500 flex items-center gap-1 mt-0.5">
                    <span>🕒 {post.timestamp}</span>
                    <span>•</span>
                    <span className="text-emerald-700 font-medium">📍 {post.blockTarget}</span>
                  </div>
                </div>
              </div>

              <span className="text-[10px] font-semibold bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
                {post.category === 'PEMBUKAAN_LAHAN'
                  ? '🚜 Olah Lahan'
                  : post.category === 'LOGISTIK_PO'
                  ? '📦 Belanja PO'
                  : post.category === 'PENANAMAN'
                  ? '🌱 Tanam'
                  : '🍈 Panen'}
              </span>
            </div>

            {/* Caption */}
            <div className="px-3.5 py-1">
              <p className="text-xs text-[#17211E] leading-relaxed whitespace-pre-line">{post.caption}</p>
            </div>

            {/* PO Tag if linked */}
            {post.relatedPoId && (
              <div className="mx-3.5 my-1.5 px-2.5 py-1.5 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between text-[11px]">
                <span className="font-bold text-blue-900">📦 Realisasi {post.relatedPoId}</span>
                <span className="text-blue-700 font-medium">Barang Tiba & Dipakai</span>
              </div>
            )}

            {/* Photos (Before-After or Gallery) */}
            {post.beforeAfter ? (
              <div className="px-3.5 py-2 grid grid-cols-2 gap-2">
                <div
                  className="relative rounded-xl overflow-hidden border border-gray-300 h-36 bg-gray-100 cursor-pointer"
                  onClick={() => setActivePhotoZoom(post.beforeAfter!.beforePhoto)}
                >
                  <img
                    src={post.beforeAfter.beforePhoto}
                    alt="Sebelum"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-1.5 left-1.5 bg-red-600/90 text-white text-[9px] font-bold px-2 py-0.5 rounded">
                    SEBELUM
                  </div>
                </div>

                <div
                  className="relative rounded-xl overflow-hidden border border-emerald-500 h-36 bg-gray-100 cursor-pointer"
                  onClick={() => setActivePhotoZoom(post.beforeAfter!.afterPhoto)}
                >
                  <img
                    src={post.beforeAfter.afterPhoto}
                    alt="Sesudah"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-1.5 left-1.5 bg-emerald-600/90 text-white text-[9px] font-bold px-2 py-0.5 rounded">
                    SESUDAH
                  </div>
                </div>
              </div>
            ) : (
              post.photoUrls &&
              post.photoUrls.length > 0 && (
                <div className="px-3.5 py-2">
                  <div
                    className="rounded-xl overflow-hidden border border-gray-200 h-48 bg-gray-100 relative cursor-pointer"
                    onClick={() => setActivePhotoZoom(post.photoUrls[0])}
                  >
                    <img src={post.photoUrls[0]} alt="Foto Laporan" className="w-full h-full object-cover" />
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded flex items-center gap-1 font-mono">
                      <span>📍 {post.gpsLocation.split('(')[0]}</span>
                    </div>
                  </div>
                </div>
              )
            )}

            {/* Interaction Bar */}
            <div className="px-3.5 py-2 border-t border-gray-100 flex items-center justify-between text-xs">
              <button
                onClick={() => likePost(post.id)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-colors ${
                  post.isLiked ? 'bg-emerald-50 text-[#064E3B] font-bold' : 'text-gray-600'
                }`}
              >
                <span>{post.isLiked ? '💚' : '🤍'}</span>
                <span>{post.likesCount} Suka</span>
              </button>

              <span className="text-[11px] text-gray-500">💬 {post.comments.length} Diskusi Direksi</span>
            </div>

            {/* Comments List */}
            {post.comments.length > 0 && (
              <div className="bg-gray-50/70 px-3.5 py-2 border-t border-gray-100 space-y-2">
                {post.comments.map((c) => (
                  <div key={c.id} className="bg-white p-2 rounded-xl border border-gray-200/80 text-[11px]">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#064E3B]">{c.authorName}</span>
                      <span className="text-[10px] text-gray-400">{c.timestamp}</span>
                    </div>
                    <p className="text-gray-700 mt-0.5 leading-snug">{c.text}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Quick Comment Input */}
            <div className="p-2.5 bg-gray-50 border-t border-gray-100 flex items-center gap-2">
              <input
                type="text"
                placeholder="Balas laporan ini..."
                value={commentText[post.id] || ''}
                onChange={(e) => setCommentText({ ...commentText, [post.id]: e.target.value })}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendComment(post.id);
                }}
                className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-[#064E3B]"
              />
              <button
                onClick={() => handleSendComment(post.id)}
                className="px-3 py-1.5 bg-[#064E3B] text-white text-xs font-semibold rounded-xl active:scale-95"
              >
                Kirim
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Buat Laporan Baru */}
      {showModalNewPost && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-3.5 backdrop-blur-xs animate-in fade-in overflow-y-auto">
          <div className="bg-white w-full max-w-sm sm:max-w-lg rounded-[22px] p-4 max-h-[88dvh] overflow-y-auto space-y-4 shadow-2xl my-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">📸</span>
                <h3 className="font-bold text-sm text-[#17211E]">Kirim Foto Situasi Lapangan</h3>
              </div>
              <button
                onClick={() => setShowModalNewPost(false)}
                className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Kategori Laporan</label>
                <select
                  value={categoryInput}
                  onChange={(e) => setCategoryInput(e.target.value as FieldReportCategory)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 font-medium"
                >
                  <option value="PEMBUKAAN_LAHAN">🚜 Pembukaan & Land Clearing Lahan</option>
                  <option value="OLAH_TANAH">🌾 Olah Tanah & Bedengan</option>
                  <option value="PENANAMAN">🌱 Penanaman & Paspor Pohon</option>
                  <option value="PEMUPUKAN">💧 Aplikasi Pemupukan & Drip</option>
                  <option value="PROTEKSI_HAMA">🛡️ Proteksi Hama & AI Scan</option>
                  <option value="LOGISTIK_PO">📦 Realisasi Belanja PO & Gudang</option>
                  <option value="PANEN">🍈 Panen & Timbangan</option>
                  <option value="KENDALA_CUACA">⛈️ Cuaca & Drainase</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Target Blok Kebun</label>
                <input
                  type="text"
                  value={blockInput}
                  onChange={(e) => setBlockInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-white"
                  placeholder="Contoh: Blok A2 Greenhouse Melon"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Keterangan / Catatan Pekerjaan</label>
                <textarea
                  rows={3}
                  value={captionInput}
                  onChange={(e) => setCaptionInput(e.target.value)}
                  placeholder="Tuliskan detail pekerjaan: luas bedengan, dosis pupuk, kendala lapangan..."
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-white"
                  required
                />
              </div>

              {/* Mode Before vs After */}
              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#064E3B]">Sertakan Foto Sebelum & Sesudah?</span>
                  <input
                    type="checkbox"
                    checked={isBeforeAfter}
                    onChange={(e) => setIsBeforeAfter(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded"
                  />
                </div>
                {isBeforeAfter && (
                  <div className="space-y-2 mt-2 pt-2 border-t border-emerald-200">
                    <div>
                      <span className="text-[10px] text-gray-600 font-semibold">Foto SEBELUM (URL)</span>
                      <input
                        type="text"
                        value={beforeUrl}
                        onChange={(e) => setBeforeUrl(e.target.value)}
                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-gray-300 bg-white mt-0.5"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-600 font-semibold">Foto SESUDAH (URL)</span>
                      <input
                        type="text"
                        value={afterUrl}
                        onChange={(e) => setAfterUrl(e.target.value)}
                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-gray-300 bg-white mt-0.5"
                      />
                    </div>
                  </div>
                )}
              </div>

              {!isBeforeAfter && (
                <div className="space-y-2">
                  <label className="block font-semibold mb-1">Pilih Sumber Foto:</label>
                  
                  {/* 2 Pilihan: Kamera Langsung & Galeri */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => cameraInputRef.current?.click()}
                      className="py-2.5 px-2 rounded-xl bg-[#0F5545] hover:bg-[#0B3B30] text-white font-extrabold text-[11px] flex items-center justify-center gap-1.5 shadow-sm cursor-pointer active:scale-95 transition-all"
                    >
                      <i className="ri-camera-fill text-sm text-[#C8E86B]"></i>
                      <span>Kamera Langsung</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => galleryInputRef.current?.click()}
                      className="py-2.5 px-2 rounded-xl bg-white border border-[#DDE5DF] hover:border-[#0F5545] text-[#11231D] font-extrabold text-[11px] flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer active:scale-95 transition-all"
                    >
                      <i className="ri-image-add-line text-sm text-[#0F5545]"></i>
                      <span>Pilih dari Galeri</span>
                    </button>
                  </div>

                  {/* Hidden Input Files */}
                  <input
                    ref={cameraInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={handlePhotoFileChange}
                  />
                  <input
                    ref={galleryInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoFileChange}
                  />

                  {/* Preview Foto */}
                  <div className="mt-2 rounded-xl overflow-hidden h-32 border border-gray-200 bg-gray-100 relative">
                    <img src={photoInput} alt="Preview Foto" className="w-full h-full object-cover" />
                    <span className="absolute bottom-1.5 right-1.5 bg-black/60 text-white text-[9px] px-2 py-0.5 rounded font-mono">
                      Foto Siap Terbit
                    </span>
                  </div>
                </div>
              )}

              <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-200 text-[11px] text-gray-600 flex items-center gap-2">
                <span>📍</span>
                <span>GPS Terkunci: <strong>Kebun Jonggol Inti (-6.4697, 107.0583)</strong></span>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModalNewPost(false)}
                  className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#064E3B] text-white rounded-xl font-bold shadow-md active:scale-95"
                >
                  🚀 Terbitkan Foto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lightbox Zoom Mobile */}
      {activePhotoZoom && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-2 animate-in fade-in"
          onClick={() => setActivePhotoZoom(null)}
        >
          <div className="w-full flex justify-end p-2">
            <button
              onClick={() => setActivePhotoZoom(null)}
              className="w-9 h-9 rounded-full bg-white/20 text-white font-bold flex items-center justify-center"
            >
              ✕
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center w-full">
            <img src={activePhotoZoom} alt="Zoomed" className="max-w-full max-h-[80vh] object-contain rounded-lg" />
          </div>
        </div>
      )}
    </div>
  );
};
