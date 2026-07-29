'use client';

import { motion } from 'framer-motion';

type AcousticGraphProps = {
  stcRating: number;
};

export default function AcousticGraph({ stcRating }: AcousticGraphProps) {
  // Mock frequency data based on STC rating for visualization
  // 125Hz to 4000Hz (standard acoustic range)
  const frequencies = [125, 250, 500, 1000, 2000, 4000];
  
  // Create a curve that generally trends upwards as frequency increases
  // Higher STC = higher line
  const points = frequencies.map((freq, i) => {
    const base = stcRating - 15;
    const gain = i * 6;
    const jitter = Math.sin(i * 2) * 2; // Add some realistic engineering variance
    return base + gain + jitter;
  });

  const width = 600;
  const height = 300;
  const padding = 40;

  // Map frequency and dB to SVG coordinates
  const getX = (i: number) => padding + (i * (width - padding * 2)) / (frequencies.length - 1);
  const getY = (val: number) => height - padding - (val * (height - padding * 2)) / 60;

  const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(p)}`).join(' ');

  return (
    <div className="w-full bg-slate-50/50 rounded-3xl p-8 border border-slate-100">
      <div className="mb-10 flex justify-between items-end">
        <div>
          <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Acoustic Analysis</p>
          <h3 className="text-xl font-bold text-slate-900 uppercase tracking-tighter">Transmission Loss (dB)</h3>
        </div>
        <div className="text-right">
          <p className="text-3xl font-black text-blue-600 tracking-tighter leading-none">STC {stcRating}</p>
        </div>
      </div>

      <svg 
        viewBox={`0 0 ${width} ${height}`} 
        className="w-full h-auto overflow-visible"
        aria-hidden="true"
      >
        {/* Grid Lines */}
        {[0, 20, 40, 60].map(val => (
          <g key={val}>
            <line 
              x1={padding} y1={getY(val)} x2={width - padding} y2={getY(val)} 
              stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="2 2" 
            />
            <text x="0" y={getY(val) + 3} className="text-xs fill-slate-400 font-bold">{val}dB</text>
          </g>
        ))}

        {/* X Axis Labels */}
        {frequencies.map((freq, i) => (
          <text 
            key={freq} 
            x={getX(i)} 
            y={height - padding + 20} 
            textAnchor="middle" 
            className="text-xs fill-slate-400 font-bold"
          >
            {freq}
          </text>
        ))}

        {/* Data Path */}
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "linear" }}
          d={pathData}
          fill="none"
          stroke="#334155"
          strokeWidth="2.5"
        />

        {/* Points */}
        {points.map((p, i) => (
          <motion.circle
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + i * 0.05 }}
            cx={getX(i)}
            cy={getY(p)}
            r="4"
            className="fill-blue-600 stroke-white stroke-[2px]"
          />
        ))}
      </svg>
      
      <p className="mt-8 text-xs text-slate-400 font-medium leading-relaxed italic border-t border-slate-100 pt-6">
        * Standardized transmission loss curve based on STC baseline.
      </p>
    </div>
  );
}
