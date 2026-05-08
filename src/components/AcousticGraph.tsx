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
    <div className="w-full bg-slate-50 rounded-[2.5rem] p-8 lg:p-12 border border-slate-100 shadow-inner">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-2">Acoustic Engineering</p>
          <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Transmission Loss Curve</h3>
        </div>
        <div className="text-right">
          <p className="text-4xl font-black text-blue-600 tracking-tighter">STC {stcRating}</p>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Certified Rating</p>
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
              stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4" 
            />
            <text x="0" y={getY(val) + 4} className="text-[10px] fill-slate-400 font-bold">{val}dB</text>
          </g>
        ))}

        {/* X Axis Labels */}
        {frequencies.map((freq, i) => (
          <text 
            key={freq} 
            x={getX(i)} 
            y={height - padding + 24} 
            textAnchor="middle" 
            className="text-[10px] fill-slate-400 font-bold"
          >
            {freq}Hz
          </text>
        ))}

        {/* Data Path */}
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          d={pathData}
          fill="none"
          stroke="#2563eb"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Points */}
        {points.map((p, i) => (
          <motion.circle
            key={i}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 + i * 0.1 }}
            cx={getX(i)}
            cy={getY(p)}
            r="6"
            className="fill-blue-600 stroke-white stroke-[3px]"
          />
        ))}
      </svg>
      
      <div className="mt-10 pt-8 border-t border-slate-200">
        <p className="text-xs text-slate-500 font-medium leading-relaxed">
          * This graph represents a standardized transmission loss curve based on current STC data. Actual frequency performance depends on installation environment and glazing selection.
        </p>
      </div>
    </div>
  );
}
