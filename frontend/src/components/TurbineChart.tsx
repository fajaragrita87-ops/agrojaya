import React from 'react';

interface LineChartProps {
  title: string;
  subtitle: string;
  data: { label: string; value1: number; value2?: number }[];
  color1?: string;
  color2?: string;
  legend1?: string;
  legend2?: string;
}

export const TurbineLineChart: React.FC<LineChartProps> = ({
  title,
  subtitle,
  data,
  color1 = '#059669', // Emerald Green
  color2 = '#dc2626', // Crimson Red
  legend1 = 'Pendapatan (Revenue)',
  legend2 = 'Beban Biaya (Expense)',
}) => {
  const maxValue = Math.max(...data.map((d) => Math.max(d.value1, d.value2 || 0))) * 1.15 || 100;
  
  // Grid lines steps
  const gridSteps = [0, 0.25, 0.5, 0.75, 1];

  // Calculate SVG coordinates for points
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 500 + 60;
    const y1 = 200 - (d.value1 / maxValue) * 150;
    const y2 = 200 - ((d.value2 || 0) / maxValue) * 150;
    return { x, y1, y2, label: d.label, val1: d.value1, val2: d.value2 };
  });

  // Create smooth bezier curve path for series 1
  const createSmoothPath = (pts: { x: number; y: number }[]) => {
    if (pts.length < 2) return '';
    let path = `M ${pts[0].x},${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const curr = pts[i];
      const next = pts[i + 1];
      const cp1x = curr.x + (next.x - curr.x) / 2;
      const cp1y = curr.y;
      const cp2x = curr.x + (next.x - curr.x) / 2;
      const cp2y = next.y;
      path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${next.x},${next.y}`;
    }
    return path;
  };

  const path1 = createSmoothPath(points.map((p) => ({ x: p.x, y: p.y1 })));
  const path2 = createSmoothPath(points.map((p) => ({ x: p.x, y: p.y2 })));

  const firstPt = points[0];
  const lastPt = points[points.length - 1];
  const areaPath1 = `${path1} L ${lastPt.x},200 L ${firstPt.x},200 Z`;

  return (
    <div className="bg-white rounded-4 border shadow-sm overflow-hidden h-100">
      <div className="p-4 bg-light border-bottom d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">
        <div>
          <h5 className="font-weight-bold text-dark mb-1" style={{ fontSize: 15 }}>
            <i className="ri-line-chart-line text-success me-2"></i> {title}
          </h5>
          <p className="text-secondary mb-0" style={{ fontSize: 13 }}>{subtitle}</p>
        </div>
        <div className="d-flex gap-3 font-weight-bold" style={{ fontSize: 12 }}>
          <span className="d-flex align-items-center gap-1.5" style={{ color: color1 }}>
            <span className="rounded-circle d-inline-block" style={{ width: 10, height: 10, backgroundColor: color1 }}></span> {legend1}
          </span>
          {legend2 && (
            <span className="d-flex align-items-center gap-1.5" style={{ color: color2 }}>
              <span className="rounded-circle d-inline-block" style={{ width: 10, height: 10, backgroundColor: color2 }}></span> {legend2}
            </span>
          )}
        </div>
      </div>

      <div className="p-4">
        <svg viewBox="0 0 580 250" className="w-100" style={{ height: 250 }}>
          <defs>
            <linearGradient id="curveGradient1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color1} stopOpacity="0.3" />
              <stop offset="100%" stopColor={color1} stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines & Y-Axis Labels */}
          {gridSteps.map((ratio, idx) => {
            const y = 200 - ratio * 150;
            const valLabel = Math.round(ratio * maxValue);
            return (
              <g key={idx}>
                <line x1="50" y1={y} x2="560" y2={y} stroke="#e2e8f0" strokeDasharray="4 4" strokeWidth="1" />
                <text x="40" y={y + 4} textAnchor="end" fontFamily="sans-serif" fontSize="11" fontWeight="bold" fill="#64748b">
                  {valLabel}
                </text>
              </g>
            );
          })}

          {/* Smooth Area Fill Under Curve 1 */}
          <path d={areaPath1} fill="url(#chartGrad1)" />

          {/* Series 2 (Expenses Smooth Curve) */}
          {legend2 && (
            <path
              d={path2}
              fill="none"
              stroke={color2}
              strokeWidth="3"
              strokeDasharray="6 6"
            />
          )}

          {/* Series 1 (Revenue Smooth Bezier Curve) */}
          <path
            d={path1}
            fill="none"
            stroke={color1}
            strokeWidth="4"
          />

          {/* Data Points Nodes */}
          {points.map((p, i) => (
            <g key={i}>
              {legend2 && (
                <circle cx={p.x} cy={p.y2} r="5" fill="#ffffff" stroke={color2} strokeWidth="3" />
              )}
              <circle cx={p.x} cy={p.y1} r="6" fill="#ffffff" stroke={color1} strokeWidth="3.5" />
              <text x={p.x} y="235" textAnchor="middle" fontFamily="sans-serif" fontSize="12" fontWeight="bold" fill="#1e293b">
                {p.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
};

interface DonutChartProps {
  title: string;
  subtitle: string;
  data: { label: string; value: number; color: string }[];
}

export const TurbineDonutChart: React.FC<DonutChartProps> = ({ title, subtitle, data }) => {
  const total = data.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="bg-white rounded-4 border shadow-sm overflow-hidden h-100">
      <div className="p-4 bg-light border-bottom">
        <h5 className="font-weight-bold text-dark mb-1" style={{ fontSize: 15 }}>
          <i className="ri-pie-chart-line text-success me-2"></i> {title}
        </h5>
        <p className="text-secondary mb-0" style={{ fontSize: 13 }}>{subtitle}</p>
      </div>

      <div className="p-4 d-flex flex-column flex-md-row align-items-center justify-content-between gap-4">
        {/* Donut Graphic SVG */}
        <div className="position-relative shrink-0 d-flex align-items-center justify-center" style={{ width: 180, height: 180 }}>
          <svg viewBox="0 0 36 36" className="w-100 h-100" style={{ transform: 'rotate(-90deg)' }}>
            {data.reduce(
              (acc, item, i) => {
                const pct = (item.value / total) * 100;
                const strokeDasharray = `${pct} ${100 - pct}`;
                const strokeDashoffset = -acc.cumulative;
                acc.cumulative += pct;
                acc.elements.push(
                  <circle
                    key={i}
                    cx="18"
                    cy="18"
                    r="15.915"
                    fill="transparent"
                    stroke={item.color}
                    strokeWidth="4.5"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                  />
                );
                return acc;
              },
              { cumulative: 0, elements: [] as React.ReactNode[] }
            ).elements}
          </svg>
          <div className="position-absolute top-50 start-50 translate-middle text-center">
            <span className="d-block text-uppercase font-weight-bold text-muted" style={{ fontSize: 10 }}>Total OPEX</span>
            <strong className="h4 font-weight-extrabold text-dark m-0" style={{ fontSize: 18 }}>100%</strong>
          </div>
        </div>

        {/* Legend Box with Progress Bars */}
        <div className="w-100 space-y-2.5">
          {data.map((item, idx) => {
            const pct = Math.round((item.value / total) * 100);
            return (
              <div key={idx} className="p-2.5 rounded-3 bg-light border space-y-1">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-2">
                    <span className="rounded-2 shrink-0 d-inline-block" style={{ width: 12, height: 12, backgroundColor: item.color }}></span>
                    <span className="font-weight-bold text-dark" style={{ fontSize: 13 }}>{item.label}</span>
                  </div>
                  <span className="badge bg-white text-dark border font-weight-bold px-2 py-0.5" style={{ fontSize: 11 }}>{pct}%</span>
                </div>
                <div className="w-100 bg-white rounded-pill overflow-hidden border p-0.5" style={{ height: 8 }}>
                  <div className="h-100 rounded-pill" style={{ width: `${pct}%`, backgroundColor: item.color }}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

interface BarChartProps {
  title: string;
  subtitle: string;
  data: { label: string; value: number; color?: string }[];
}

export const TurbineBarChart: React.FC<BarChartProps> = ({ title, subtitle, data }) => {
  const maxValue = Math.max(...data.map((d) => d.value)) * 1.2 || 100;

  return (
    <div className="bg-white rounded-4 border shadow-sm overflow-hidden">
      <div className="p-4 bg-light border-bottom">
        <h5 className="font-weight-bold text-dark mb-1" style={{ fontSize: 15 }}>
          <i className="ri-bar-chart-2-line text-success me-2"></i> {title}
        </h5>
        <p className="text-secondary mb-0" style={{ fontSize: 13 }}>{subtitle}</p>
      </div>

      <div className="p-4 space-y-3">
        {data.map((item, idx) => {
          const widthPct = Math.min(100, Math.max(8, (item.value / maxValue) * 100));
          const barColor = item.color || '#059669';
          return (
            <div key={idx} className="space-y-1">
              <div className="d-flex justify-content-between align-items-center text-dark">
                <strong className="font-weight-bold" style={{ fontSize: 13 }}>{item.label}</strong>
                <span className="font-weight-bold text-success" style={{ fontSize: 14 }}>{item.value.toLocaleString('id-ID')} Kg</span>
              </div>
              <div className="w-100 bg-light rounded-pill overflow-hidden p-0.5 border" style={{ height: 14 }}>
                <div
                  className="h-100 rounded-pill transition-all"
                  style={{ width: `${widthPct}%`, backgroundColor: barColor }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
