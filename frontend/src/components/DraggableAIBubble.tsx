import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useRole } from '../context/RoleContext';
import { callLiveAI, type AIMessage } from '../services/aiService';

interface ChatMessage {
  sender: 'ai' | 'user';
  text: string;
  timestamp?: Date;
  source?: 'gemini' | 'groq' | 'local';
}

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
    const greeting = `Halo Bapak/Ibu **${userName || 'Pengguna'}** (${role})! Saya **Jaya**, Asisten Cerdas Agronomi & Akuntabilitas Investasi Smart Farming Jonggol (2.0 Ha).\n\nSaya siap membantu analisis seputar:\n• 🌱 **Kondisi Tanaman & SOP Tanam** (Porang Ekspor, Anggur, Melon, Jagung)\n• 📊 **Progres 8 Tahap Siklus Lahan** & Uji Kesuburan Tanah\n• 💰 **Transparansi OPEX, HPP, & Proyeksi ROI Modal**\n• 📋 **Laporan Audit Terpadu 5-Dimensi & BAP Digital**\n\nAda yang ingin Anda ketahui terkait kebun hari ini?`;
    setMessages([{ sender: 'ai', text: greeting, timestamp: new Date(), source: 'gemini' }]);
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

  // Send message to secure backend AI engine
  const executeSendMessage = async (queryText: string) => {
    if (!queryText.trim() || isThinking) return;

    const userMsg: ChatMessage = { sender: 'user', text: queryText, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsThinking(true);

    const historyForAI: AIMessage[] = messages.map((m) => ({
      role: m.sender === 'user' ? 'user' : 'model',
      content: m.text,
    }));

    try {
      const response = await callLiveAI(queryText, historyForAI, role || 'DIREKTUR', userName || 'Pengguna');
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: response.text, timestamp: new Date(), source: response.source },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: 'Terjadi kendala jaringan saat menghubungkan ke AI Engine. Namun data kebun tetap aman terpantau.',
          timestamp: new Date(),
          source: 'local',
        },
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    executeSendMessage(input);
  };

  const renderMessageText = (text: string) => {
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
            boxShadow: isDragging ? '0 8px 32px rgba(5,150,105,0.6)' : '0 4px 20px rgba(5,150,105,0.5)',
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
          <span
            style={{
              position: 'absolute',
              inset: -6,
              borderRadius: '50%',
              border: '2px solid rgba(16,185,129,0.5)',
              animation: 'pulse-ring 2s infinite ease-out',
            }}
          />
          <i className="ri-robot-2-line" style={{ fontSize: 30, pointerEvents: 'none' }} />

          {/* Notification dot */}
          {hasNewMessage && (
            <span
              style={{
                position: 'absolute',
                top: 2,
                right: 2,
                width: 14,
                height: 14,
                background: '#ef4444',
                borderRadius: '50%',
                border: '2px solid white',
                animation: 'blink 1.5s infinite',
              }}
            />
          )}
        </div>
      )}

      {/* ====================== CHAT PANEL ====================== */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            width: 420,
            height: 580,
            borderRadius: 24,
            zIndex: 9999,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
            border: '1px solid rgba(5,150,105,0.2)',
            animation: 'slideUpIn 0.25s ease-out',
            background: '#ffffff',
          }}
        >
          {/* Header */}
          <div
            style={{
              background: 'linear-gradient(135deg, #065f46 0%, #059669 60%, #10b981 100%)',
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <i className="ri-robot-2-fill" style={{ fontSize: 22, color: 'white' }} />
              </div>
              <div>
                <div style={{ color: 'white', fontWeight: 700, fontSize: 15, lineHeight: 1.2 }}>
                  Jaya • AI Smart Farming
                </div>
                <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: 11, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span>🟢 AI Server Aktif</span>
                  <span>• {role}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'rgba(255,255,255,0.15)',
                border: 'none',
                cursor: 'pointer',
                width: 32,
                height: 32,
                borderRadius: '50%',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
                transition: 'background 0.2s',
              }}
            >
              <i className="ri-close-line" />
            </button>
          </div>

          {/* Chat Body */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '14px',
              background: '#f8faf9',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  alignItems: 'flex-end',
                  gap: 8,
                }}
              >
                {msg.sender === 'ai' && (
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #059669, #10b981)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <i className="ri-robot-2-fill" style={{ fontSize: 14, color: 'white' }} />
                  </div>
                )}
                <div
                  style={{
                    maxWidth: '85%',
                    padding: '10px 14px',
                    lineHeight: 1.55,
                    fontSize: 12.5,
                    borderRadius: msg.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    background: msg.sender === 'user' ? 'linear-gradient(135deg, #059669, #047857)' : 'white',
                    color: msg.sender === 'user' ? 'white' : '#1f2937',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    border: msg.sender === 'user' ? 'none' : '1px solid #e5e7eb',
                  }}
                >
                  {renderMessageText(msg.text)}
                </div>
              </div>
            ))}

            {/* Thinking animation */}
            {isThinking && (
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #059669, #10b981)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <i className="ri-robot-2-fill" style={{ fontSize: 14, color: 'white' }} />
                </div>
                <div
                  style={{
                    padding: '10px 16px',
                    borderRadius: '18px 18px 18px 4px',
                    background: 'white',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    display: 'flex',
                    gap: 5,
                    alignItems: 'center',
                  }}
                >
                  {[0, 0.2, 0.4].map((delay, i) => (
                    <span
                      key={i}
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: '#10b981',
                        display: 'inline-block',
                        animation: `dotBounce 1.2s ${delay}s infinite ease-in-out`,
                      }}
                    />
                  ))}
                  <span className="text-muted ms-2" style={{ fontSize: 11 }}>
                    Sedang menganalisis data kebun...
                  </span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Suggestions */}
          <div
            style={{
              padding: '6px 12px 0',
              background: '#f8faf9',
              display: 'flex',
              gap: 6,
              overflowX: 'auto',
              flexShrink: 0,
            }}
          >
            {['Status panen Porang?', 'Realisasi OPEX & Modal?', 'Kondisi tanah & pupuk?', 'Laporan Audit 5D'].map((q) => (
              <button
                key={q}
                onClick={() => executeSendMessage(q)}
                style={{
                  background: 'white',
                  border: '1px solid #d1fae5',
                  color: '#059669',
                  borderRadius: 20,
                  padding: '4px 10px',
                  fontSize: 11,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  fontWeight: 600,
                  flexShrink: 0,
                  transition: 'all 0.15s',
                }}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div style={{ padding: '8px 12px 12px', background: '#f8faf9', flexShrink: 0 }}>
            <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tanya Jaya seputar agronomi, lahan, & keuangan..."
                style={{
                  flex: 1,
                  padding: '9px 14px',
                  borderRadius: 24,
                  border: '1.5px solid #d1fae5',
                  background: 'white',
                  fontSize: 12.5,
                  outline: 'none',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                }}
              />
              <button
                type="submit"
                disabled={isThinking || !input.trim()}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  border: 'none',
                  background: 'linear-gradient(135deg, #059669, #047857)',
                  color: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  opacity: isThinking || !input.trim() ? 0.5 : 1,
                  transition: 'opacity 0.2s',
                }}
              >
                <i className="ri-send-plane-fill" style={{ fontSize: 16 }} />
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
