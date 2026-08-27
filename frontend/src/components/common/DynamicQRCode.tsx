import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';

interface DynamicQRCodeProps {
  value: string;
  size?: number;
  className?: string;
  darkColor?: string;
  lightColor?: string;
  showText?: boolean;
}

export const DynamicQRCode: React.FC<DynamicQRCodeProps> = ({
  value,
  size = 120,
  className = '',
  darkColor = '#061E18',
  lightColor = '#FFFFFF',
  showText = false,
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  useEffect(() => {
    let isMounted = true;
    if (value) {
      QRCode.toDataURL(value, {
        width: size * 2, // 2x for retina crisp sharpness
        margin: 1,
        color: {
          dark: darkColor,
          light: lightColor,
        },
        errorCorrectionLevel: 'M',
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
        className={`flex items-center justify-center bg-gray-100 rounded text-gray-400 text-xs animate-pulse ${className}`}
      >
        <i className="ri-loader-4-line animate-spin text-lg"></i>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <img
        src={qrDataUrl}
        alt={`QR Code ${value}`}
        style={{ width: size, height: size, imageRendering: 'pixelated' }}
        className="rounded shadow-2xs border border-gray-200 bg-white p-1 object-contain"
      />
      {showText && (
        <span className="text-[10px] font-mono font-bold text-gray-700 mt-1 tracking-tight">
          {value}
        </span>
      )}
    </div>
  );
};
