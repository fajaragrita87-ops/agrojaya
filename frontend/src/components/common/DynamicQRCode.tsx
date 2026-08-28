import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';

interface DynamicQRCodeProps {
  value: string;
  size?: number;
  className?: string;
  darkColor?: string;
  lightColor?: string;
  showText?: boolean;
  bordered?: boolean;
}

export const DynamicQRCode: React.FC<DynamicQRCodeProps> = ({
  value,
  size = 120,
  className = '',
  darkColor = '#061E18',
  lightColor = '#FFFFFF',
  showText = false,
  bordered = true,
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  useEffect(() => {
    let isMounted = true;
    if (value) {
      QRCode.toDataURL(value, {
        width: size * 3, // 3x for ultra-sharp retina display
        margin: 1,
        color: {
          dark: darkColor,
          light: lightColor,
        },
        errorCorrectionLevel: 'H', // High error correction for fast scan
      })
        .then((url) => {
          if (isMounted) setQrDataUrl(url);
        })
        .catch((err) => {
          console.error('Error generating QR code:', err);
        });
    }
    return () => {
      isMounted = false;
    };
  }, [value, size, darkColor, lightColor]);

  if (!qrDataUrl) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`flex items-center justify-center bg-gray-100 rounded-xl text-gray-400 text-xs animate-pulse ${className}`}
      >
        <i className="ri-loader-4-line animate-spin text-lg text-[#0F5545]"></i>
      </div>
    );
  }

  return (
    <div className={`inline-flex flex-col items-center justify-center ${className}`}>
      <div
        className={`relative overflow-hidden ${
          bordered
            ? 'p-1.5 bg-white rounded-[14px] shadow-sm border border-[#D9E3DC] ring-1 ring-black/5'
            : 'bg-white rounded-lg p-0.5'
        }`}
      >
        <img
          src={qrDataUrl}
          alt={`QR Code ${value}`}
          style={{ width: size, height: size, imageRendering: 'pixelated' }}
          className="block object-contain rounded-[8px]"
        />
      </div>
      {showText && (
        <span className="text-[9.5px] font-mono font-black text-[#0F5545] mt-1 tracking-tight">
          {value}
        </span>
      )}
    </div>
  );
};
