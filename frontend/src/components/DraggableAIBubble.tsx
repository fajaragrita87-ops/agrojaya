import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useRole } from '../context/RoleContext';

interface ChatMessage {
  sender: 'ai' | 'user';
  text: string;
  timestamp?: Date;
}

// ============================================================
// JAYA AI KNOWLEDGE BASE — Berisi pengetahuan penuh tentang
// seluruh modul dan data konteks proyek AgroJaya.
// ============================================================
const AGROJAYA_KNOWLEDGE = {
  kebun: {
    lokasi: 'Jonggol, Kabupaten Bogor, Jawa Barat',
    luas: '2.0 Hektar',
    blok: ['Blok A1-A2 (Porang Ekspor - Komoditas Utama, 1.0 Ha)', 'Blok B1-B2 (Jagung Hibrida, 0.5 Ha)', 'Blok C1 (Anggur & Melon, 0.5 Ha)'],
    statusTanah: 'pH 6.2 (Normal), Nitrogen Rendah, Fosfor Cukup, Kalium Baik',
    cuaca: 'Prediksi hujan sore ini. Suhu rata-rata 28°C.',
    komoditasUtama: 'Porang kualitas ekspor (kadar glukomanan tinggi). Ini adalah core business dari AgroJaya.'
  },
  keuangan: {
    modalInvestasi: 'Rp 2.500.000.000',
    opexBulanIni: 'Rp 85.000.000',
    budgetMaks: 'Rp 100.000.000',
    efisiensi: '15% Under Budget',
    roidDiproyeksi: '30% per siklus panen umbi Porang',
    kasAktif: 'Rp 120.000.000',
    pendingPO: '2 PO benih Porang katak senilai Rp 12.000.000 menunggu pencairan',
  },
  panen: {
    estimasiBuah: '180 Ton Umbi Porang Basah (Blok Utama)',
    estimasiBulan: 'Q3 2026',
    hargaJual: 'Rp 6.000/kg (Basah) - Ekspor Jepang/Tiongkok',
    estimasiPendapatan: 'Mencapai Rp 1.080.000.000 dari Porang saja',
    kondisiTanaman: '98% KTP Pohon status Sangat Sehat, pembesaran umbi optimal',
  },
  sdm: {
    totalPetani: '15 orang',
    presensiHariIni: '14 dari 15 hadir',
    kepalaMandor: 'Pak Joko Santoso',
    tugasHariIni: 'Pembersihan gulma Blok Porang A1 & Pengecekan Drainase',
  },
  investor: {
    statusInvestasi: 'ON-TRACK — Sangat Aman. Fokus utama pada panen Porang berjalan sesuai jadwal.',
    realisasiPenanaman: '100% dari target',
    laporan: 'Tersedia di menu Laporan Audit 5D pada aplikasi',
    jadwalPanen: '15 hari lagi, estimasi pendapatan Rp 60 Juta',
  },
};

// ============================================================
// JAYA BRAIN — Mesin penalaran berbasis keyword
// ============================================================
const jayaBrain = (text: string, role: string): string => {
  const t = text.toLowerCase();
  const kb = AGROJAYA_KNOWLEDGE;

  // --- Pertanyaan tentang identitas Jaya ---
  if (t.includes('siapa') || t.includes('kamu') || t.includes('namamu') || t.includes('jaya')) {
    return `Perkenalkan, saya Jaya — Asisten AI Eksklusif AgroJaya. Saya dirancang untuk membantu semua lini operasional kebun, mulai dari analisis tanah, pemantauan keuangan, hingga laporan khusus untuk investor. Dengan saya, semua informasi penting ada di ujung jari Anda.`;
  }

  // --- Pertanyaan tentang lokasi / kebun ---
  if (t.includes('lokasi') || t.includes('kebun') || t.includes('lahan') || t.includes('di mana') || t.includes('blok')) {
    return `Kebun AgroJaya berlokasi di **${kb.kebun.lokasi}**, seluas **${kb.kebun.luas}**. Terbagi menjadi 3 blok produktif:\n• ${kb.kebun.blok.join('\n• ')}\n\nSemua blok terpantau aktif hari ini. ${kb.kebun.cuaca} Ada yang ingin Bapak/Ibu periksa lebih detail?`;
  }

  // --- Pertanyaan tentang tanah / pupuk / pH ---
  if (t.includes('tanah') || t.includes('ph') || t.includes('pupuk') || t.includes('nitrogen') || t.includes('hama') || t.includes('penyakit')) {
    return `Berdasarkan data sensor IoT terakhir, kondisi tanah AgroJaya: **${kb.kebun.statusTanah}**.\n\nRekomendasi saya: Lakukan aplikasi pupuk NPK 2kg/bedengan di Blok A2 minggu ini untuk mengatasi defisiensi Nitrogen. KTP Pohon tidak mendeteksi serangan hama aktif. Kesehatan tanaman saat ini **${kb.panen.kondisiTanaman}**.`;
  }

  // --- Pertanyaan tentang keuangan ---
  if (t.includes('keuangan') || t.includes('uang') || t.includes('kas') || t.includes('modal') || t.includes('budget') || t.includes('opex') || t.includes('biaya') || t.includes('pendapatan')) {
    if (role === 'INVESTOR') {
      return `Laporan keuangan untuk Bapak/Ibu Investor:\n• Modal Investasi Total: **${kb.keuangan.modalInvestasi}**\n• Kas Aktif: **${kb.keuangan.kasAktif}**\n• OPEX Bulan Ini: **${kb.keuangan.opexBulanIni}** (${kb.keuangan.efisiensi})\n• ROI Proyeksi: **${kb.keuangan.roidDiproyeksi}**\n\nArus kas sangat sehat. Estimasi pendapatan panen berikutnya **${kb.panen.estimasiPendapatan}**. Investasi Bapak/Ibu aman dan produktif.`;
    }
    return `Laporan keuangan terkini:\n• OPEX bulan ini: **${kb.keuangan.opexBulanIni}** dari batas **${kb.keuangan.budgetMaks}** — efisiensi **${kb.keuangan.efisiensi}** 🟢\n• Kas aktif: **${kb.keuangan.kasAktif}**\n• Catatan: ${kb.keuangan.pendingPO}.\n\nLaporan lengkap tersedia di modul **Keuangan & Arus Kas** pada sidebar. Ingin saya buatkan ringkasan PDF-nya?`;
  }

  // --- Pertanyaan tentang investasi / ROI ---
  if (t.includes('investasi') || t.includes('roi') || t.includes('return') || t.includes('keuntungan') || t.includes('profit')) {
    return `Status investasi AgroJaya: **${kb.investor.statusInvestasi}**.\n\nRealisasi penanaman: **${kb.investor.realisasiPenanaman}**. Proyeksi ROI mencapai **${kb.keuangan.roidDiproyeksi}**, jauh di atas rata-rata industri pertanian (13-15%). Panen berikutnya dalam **${kb.investor.jadwalPanen}**.`;
  }

  // --- Pertanyaan tentang panen ---
  if (t.includes('panen') || t.includes('hasil') || t.includes('produksi') || t.includes('ton') || t.includes('jual')) {
    return `Proyeksi panen terbaru dari sistem:\n• Estimasi hasil: **${kb.panen.estimasiBuah}**\n• Jadwal: **${kb.panen.estimasiBulan}**\n• Harga pasar: **${kb.panen.hargaJual}**\n• Estimasi pendapatan: **${kb.panen.estimasiPendapatan}**\n• Kondisi tanaman: ${kb.panen.kondisiTanaman}\n\nSemua indikator panen sangat baik. Ada hal lain yang perlu saya siapkan?`;
  }

  // --- Pertanyaan tentang SDM / petani / presensi ---
  if (t.includes('petani') || t.includes('sdm') || t.includes('karyawan') || t.includes('presensi') || t.includes('absen') || t.includes('mandor')) {
    return `Data SDM hari ini:\n• Total petani aktif: **${kb.sdm.totalPetani}**\n• Presensi hari ini: **${kb.sdm.presensiHariIni}**\n• Kepala Mandor: **${kb.sdm.kepalaMandor}**\n• Tugas hari ini: ${kb.sdm.tugasHariIni}\n\nDetail presensi dan penggajian bisa dilihat di modul **Presensi Petani** pada sidebar.`;
  }

  // --- Pertanyaan tentang laporan ---
  if (t.includes('laporan') || t.includes('audit') || t.includes('report')) {
    return `Saya memiliki akses ke seluruh laporan 5-Dimensi AgroJaya:\n1. ⏱️ **Waktu & Durasi** — Tiket, check-in/out, SLA\n2. 📍 **Lokasi** — Site & blok aktif\n3. 👤 **Personel** — Pelapor, PIC, teknisi\n4. 💰 **Finansial** — OPEX, realisasi, dana cair\n5. ✅ **Output** — Status, BAP, catatan\n\nLaporan audit bulan ini berstatus **AMAN** 🟢. Buka menu **Laporan Audit 5D** di sidebar untuk detail lengkap.`;
  }

  // --- Pertanyaan tentang cuaca ---
  if (t.includes('cuaca') || t.includes('hujan') || t.includes('suhu') || t.includes('iklim')) {
    return `Pembaruan cuaca untuk ${kb.kebun.lokasi}: **${kb.kebun.cuaca}** Saya sarankan Bapak mengarahkan petani untuk memastikan drainase di Blok A1 tidak tersumbat sebelum hujan turun. Proteksi tanaman cabai muda sangat penting saat curah hujan tinggi.`;
  }

  // --- Default intelligent fallback ---
  return `Pertanyaan bagus! Saya, Jaya, dapat membantu Bapak/Ibu menganalisis hal-hal berikut dari seluruh modul AgroJaya:\n\n🌱 **Tanah & Tanaman** — kondisi pH, pupuk, hama, KTP Pohon\n💰 **Keuangan** — OPEX, arus kas, ROI\n🍅 **Panen** — estimasi produksi & pendapatan\n👷 **SDM** — presensi & tugas petani\n📋 **Laporan** — audit 5-dimensi\n\nSilakan ajukan pertanyaan spesifik, saya siap membantu!`;
};

// ============================================================
// ROLE-BASED GREETING GENERATOR
// ============================================================
const generateGreeting = (role: string, userName: string): string => {
  const hour = new Date().getHours();
  const waktu = hour < 11 ? 'pagi' : hour < 15 ? 'siang' : hour < 19 ? 'sore' : 'malam';
  const kb = AGROJAYA_KNOWLEDGE;

  const greetings: Record<string, string> = {
    DIREKTUR: `Selamat ${waktu}, Bapak Direktur **${userName}**. Saya Jaya, asisten pribadi Bapak.\n\nIzinkan saya menyampaikan **Summary AgroJaya hari ini**:\n\n🌿 Lahan ${kb.kebun.lokasi} (${kb.kebun.luas}) beroperasi normal tanpa kendala berarti.\n💰 Serapan OPEX bulan ini Rp 45 Juta — **${kb.keuangan.efisiensi}** dari budget maks.\n🍅 Proyeksi panen Cabai Merah dalam 15 hari: **${kb.panen.estimasiBuah}** (Est. Pendapatan ${kb.panen.estimasiPendapatan}).\n👷 ${kb.sdm.presensiHariIni} aktif di lapangan hari ini.\n\nAda hal lain yang ingin Bapak ketahui? Saya siap memeriksa dan menganalisis semua laporan pada aplikasi ini untuk Bapak.`,

    INVESTOR: `Selamat ${waktu}, Bapak/Ibu **${userName}**. Saya Jaya, asisten pintar eksklusif AgroJaya.\n\nSaya dengan bangga menyampaikan bahwa **investasi Bapak/Ibu berstatus ON-TRACK dan sangat aman**.\n\n✅ Realisasi penanaman: ${kb.investor.realisasiPenanaman}\n💰 Proyeksi ROI: **${kb.keuangan.roidDiproyeksi}**\n🌾 Panen berikutnya: ${kb.investor.jadwalPanen}\n📊 Arus kas aktif: ${kb.keuangan.kasAktif}\n\nAda hal lain yang ingin Bapak/Ibu ketahui tentang progres proyek? Saya dapat menarik seluruh laporan pertanggungjawaban dari aplikasi ini secara real-time.`,

    FINANCE: `Selamat ${waktu}, Tim Keuangan **${userName}**. Saya Jaya, asisten virtual AgroJaya.\n\nLaporan keuangan singkat hari ini:\n💰 Arus kas: STABIL\n⚠️ ${kb.keuangan.pendingPO}\n📉 Pengeluaran minggu ini: efisien\n\nAda hal lain yang ingin Anda lacak? Saya bisa membantu memeriksa seluruh data pengeluaran dan laporan pada aplikasi ini.`,

    KEPALA_KEBUN: `Selamat ${waktu}, Bapak **${userName}**. Saya Jaya, asisten AI operasional Bapak.\n\nFokus lapangan hari ini:\n🌧️ **${kb.kebun.cuaca}** — Pastikan drainase Blok A1 aman sebelum hujan!\n👷 Tugas hari ini: ${kb.sdm.tugasHariIni}\n🌱 KTP Pohon menunjukkan **tidak ada serangan hama** aktif.\n\nAda hal lain yang ingin Bapak ketahui? Saya bisa menarik data agronomi dan presensi petani dari seluruh sistem.`,

    MANAGER: `Selamat ${waktu}, Bapak **${userName}**. Saya Jaya, asisten AI AgroJaya.\n\nRingkasan manajerial hari ini:\n📦 OPEX bulan ini: ${kb.keuangan.opexBulanIni} (${kb.keuangan.efisiensi})\n👷 SDM: ${kb.sdm.presensiHariIni}\n🍅 Panen: ${kb.panen.estimasiBuah} dalam ${kb.panen.estimasiBulan}\n\nSaya siap membantu analisis dari semua modul. Apa yang ingin Bapak tinjau?`,
  };

  return greetings[role] ?? `Selamat ${waktu}, **${userName}**! Saya Jaya, asisten cerdas AgroJaya. Ada hal yang bisa saya bantu analisa hari ini? Saya bisa mengakses seluruh laporan di aplikasi ini.`;
};

// ============================================================
// KOMPONEN UTAMA
// ============================================================
export const DraggableAIBubble = () => {
  const { role, userName } = useRole();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(true);

  // Dragging state
  const [position, setPosition] = useState({ x: window.innerWidth - 80, y: window.innerHeight - 100 });
  const [isDragging, setIsDragging] = useState(false);
  const hasDragged = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Initial greeting
  useEffect(() => {
    const greeting = generateGreeting(role || 'DEFAULT', userName || 'Pengguna');
    setMessages([{ sender: 'ai', text: greeting, timestamp: new Date() }]);
  }, [role, userName]);

  // Auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  // When opening, clear notification dot
  useEffect(() => {
    if (isOpen) setHasNewMessage(false);
  }, [isOpen]);

  // Drag logic
  const handleMouseDown = (e: React.MouseEvent) => {
    hasDragged.current = false;
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX - position.x, y: e.clientY - position.y };
    e.preventDefault();
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    hasDragged.current = true;
    const newX = Math.max(0, Math.min(window.innerWidth - 64, e.clientX - dragStartRef.current.x));
    const newY = Math.max(0, Math.min(window.innerHeight - 64, e.clientY - dragStartRef.current.y));
    setPosition({ x: newX, y: newY });
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleBubbleClick = () => {
    if (!hasDragged.current) setIsOpen(true);
  };

  // Send message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isThinking) return;

    const userMsg: ChatMessage = { sender: 'user', text: input, timestamp: new Date() };
    const currentInput = input;
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsThinking(true);

    setTimeout(() => {
      const response = jayaBrain(currentInput, role || '');
      setMessages(prev => [...prev, { sender: 'ai', text: response, timestamp: new Date() }]);
      setIsThinking(false);
    }, 1200 + Math.random() * 600);
  };

  const renderMessageText = (text: string) => {
    // Render bold **text** and newlines
    return text.split('\n').map((line, i) => {
      const parts = line.split(/\*\*(.*?)\*\*/g);
      return (
        <React.Fragment key={i}>
          {parts.map((part, j) =>
            j % 2 === 1 ? <strong key={j}>{part}</strong> : <span key={j}>{part}</span>
          )}
          {i < text.split('\n').length - 1 && <br />}
        </React.Fragment>
      );
    });
  };

  return (
    <>
      {/* ====================== DRAGGABLE BUBBLE ====================== */}
      {!isOpen && (
        <div
          onMouseDown={handleMouseDown}
          onClick={handleBubbleClick}
          style={{
            position: 'fixed',
            left: position.x,
            top: position.y,
            width: 60,
            height: 60,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #059669 0%, #10b981 50%, #047857 100%)',
            boxShadow: isDragging
              ? '0 8px 32px rgba(5,150,105,0.6)'
              : '0 4px 20px rgba(5,150,105,0.5)',
            zIndex: 9999,
            cursor: isDragging ? 'grabbing' : 'grab',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            transition: isDragging ? 'none' : 'box-shadow 0.2s ease, transform 0.1s ease',
            userSelect: 'none',
          }}
        >
          {/* Pulse ring animation */}
          <span style={{
            position: 'absolute', inset: -6, borderRadius: '50%',
            border: '2px solid rgba(16,185,129,0.5)',
            animation: 'pulse-ring 2s infinite ease-out',
          }} />
          <i className="ri-robot-2-line" style={{ fontSize: 30, pointerEvents: 'none' }} />

          {/* Notification dot */}
          {hasNewMessage && (
            <span style={{
              position: 'absolute', top: 2, right: 2, width: 14, height: 14,
              background: '#ef4444', borderRadius: '50%', border: '2px solid white',
              animation: 'blink 1.5s infinite',
            }} />
          )}
        </div>
      )}

      {/* ====================== CHAT PANEL ====================== */}
      {isOpen && (
        <div style={{
          position: 'fixed', bottom: 20, right: 20, width: 400, height: 560,
          borderRadius: 24, zIndex: 9999, overflow: 'hidden',
          display: 'flex', flexDirection: 'column',
          boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
          border: '1px solid rgba(5,150,105,0.2)',
          animation: 'slideUpIn 0.25s ease-out',
        }}>
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #065f46 0%, #059669 60%, #10b981 100%)',
            padding: '14px 16px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexShrink: 0,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 40, height: 40, borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <i className="ri-robot-2-fill" style={{ fontSize: 22, color: 'white' }} />
              </div>
              <div>
                <div style={{ color: 'white', fontWeight: 700, fontSize: 15, lineHeight: 1.2 }}>Jaya</div>
                <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 11 }}>
                  AI Asisten AgroJaya • {role}
                  <span style={{
                    display: 'inline-block', width: 7, height: 7, borderRadius: '50%',
                    background: '#6ee7b7', marginLeft: 5, verticalAlign: 'middle',
                    boxShadow: '0 0 5px #6ee7b7',
                  }} />
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer',
                width: 32, height: 32, borderRadius: '50%', color: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, transition: 'background 0.2s',
              }}
            >
              <i className="ri-close-line" />
            </button>
          </div>

          {/* Chat Body */}
          <div style={{
            flex: 1, overflowY: 'auto', padding: '16px 14px',
            background: '#f8faf9',
            display: 'flex', flexDirection: 'column', gap: 12,
          }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{
                display: 'flex',
                justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                alignItems: 'flex-end', gap: 8,
              }}>
                {msg.sender === 'ai' && (
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #059669, #10b981)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <i className="ri-robot-2-fill" style={{ fontSize: 14, color: 'white' }} />
                  </div>
                )}
                <div style={{
                  maxWidth: '82%', padding: '10px 13px', lineHeight: 1.55, fontSize: 13,
                  borderRadius: msg.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  background: msg.sender === 'user'
                    ? 'linear-gradient(135deg, #059669, #047857)'
                    : 'white',
                  color: msg.sender === 'user' ? 'white' : '#1f2937',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                }}>
                  {renderMessageText(msg.text)}
                </div>
              </div>
            ))}

            {/* Thinking animation */}
            {isThinking && (
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #059669, #10b981)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <i className="ri-robot-2-fill" style={{ fontSize: 14, color: 'white' }} />
                </div>
                <div style={{
                  padding: '10px 16px', borderRadius: '18px 18px 18px 4px',
                  background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  display: 'flex', gap: 5, alignItems: 'center',
                }}>
                  {[0, 0.2, 0.4].map((delay, i) => (
                    <span key={i} style={{
                      width: 8, height: 8, borderRadius: '50%',
                      background: '#10b981',
                      display: 'inline-block',
                      animation: `dotBounce 1.2s ${delay}s infinite ease-in-out`,
                    }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Suggestions */}
          <div style={{
            padding: '8px 14px 0', background: '#f8faf9',
            display: 'flex', gap: 6, overflowX: 'auto', flexShrink: 0,
          }}>
            {['Status panen?', 'Cek keuangan', 'Kondisi tanah', 'Laporan hari ini'].map(q => (
              <button
                key={q}
                onClick={() => {
                  setInput(q);
                  setTimeout(() => {
                    const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
                    const userMsg: ChatMessage = { sender: 'user', text: q, timestamp: new Date() };
                    setMessages(prev => [...prev, userMsg]);
                    setInput('');
                    setIsThinking(true);
                    setTimeout(() => {
                      const response = jayaBrain(q, role || '');
                      setMessages(prev => [...prev, { sender: 'ai', text: response, timestamp: new Date() }]);
                      setIsThinking(false);
                    }, 1200);
                  }, 0);
                }}
                style={{
                  background: 'white', border: '1px solid #d1fae5', color: '#059669',
                  borderRadius: 20, padding: '4px 12px', fontSize: 11, whiteSpace: 'nowrap',
                  cursor: 'pointer', fontWeight: 600, flexShrink: 0,
                  transition: 'all 0.15s',
                }}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div style={{ padding: '10px 14px 14px', background: '#f8faf9', flexShrink: 0 }}>
            <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Tanya Jaya apa saja tentang kebun..."
                style={{
                  flex: 1, padding: '10px 16px', borderRadius: 24,
                  border: '1.5px solid #d1fae5', background: 'white',
                  fontSize: 13, outline: 'none',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                }}
              />
              <button
                type="submit"
                disabled={isThinking || !input.trim()}
                style={{
                  width: 40, height: 40, borderRadius: '50%', border: 'none',
                  background: 'linear-gradient(135deg, #059669, #047857)',
                  color: 'white', cursor: 'pointer', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  opacity: (isThinking || !input.trim()) ? 0.5 : 1,
                  transition: 'opacity 0.2s',
                }}
              >
                <i className="ri-send-plane-fill" style={{ fontSize: 18 }} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Keyframe Animations */}
      <style>{`
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.8; }
          70% { transform: scale(1.4); opacity: 0; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes dotBounce {
          0%, 80%, 100% { transform: scale(0.7); opacity: 0.4; }
          40% { transform: scale(1.1); opacity: 1; }
        }
        @keyframes slideUpIn {
          from { opacity: 0; transform: translateY(20px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </>
  );
};
