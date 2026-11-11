import React from 'react';

export const ThreeCanvas: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Deep Obsidian Base */}
      <div className="absolute inset-0 bg-[#05070B]" />

      {/* Smooth, elegant ambient blurred light orbs - NO dots, NO particles, NO clutter */}
      <div className="absolute -top-[20%] left-[15%] w-[650px] h-[650px] rounded-full bg-emerald-500/10 blur-[140px] animate-pulse-slow" />
      <div className="absolute top-[35%] -right-[10%] w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[160px] animate-pulse-slow" />
      <div className="absolute -bottom-[20%] left-[30%] w-[700px] h-[700px] rounded-full bg-teal-500/8 blur-[180px]" />

      {/* Subtle fine grid overlay for tech feel with deep vignette */}
      <div 
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
          backgroundSize: '64px 64px'
        }}
      />

      {/* Vignette mask to keep edges smooth */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#05070B]/50 to-[#05070B]" />
    </div>
  );
};
