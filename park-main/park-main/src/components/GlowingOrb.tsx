import React from 'react';

interface GlowingOrbProps {
  size?: number;
  role?: 'driver' | 'renter';
}

export const GlowingOrb: React.FC<GlowingOrbProps> = ({ size = 84, role = 'driver' }) => {
  const isRenter = role === 'renter';
  const primaryGlow = isRenter ? '#00e5ff' : '#d4ff32';
  const secondaryGlow = isRenter ? '#00b4d8' : '#70e000';

  return (
    <div className="relative flex items-center justify-center select-none" style={{ width: size, height: size }}>
      {/* Ambient background particle aura */}
      <div
        className="absolute inset-0 rounded-full blur-2xl opacity-60 animate-pulse"
        style={{
          background: `radial-gradient(circle, ${primaryGlow} 0%, ${secondaryGlow} 50%, transparent 80%)`,
        }}
      />

      {/* Subtle particle dot grid circle */}
      <div className="absolute -inset-4 rounded-full border border-lime-500/10 opacity-40 animate-[spin_20s_linear_infinite]">
        <div className="w-1.5 h-1.5 rounded-full bg-lime-400 absolute top-0 left-1/2 -translate-x-1/2 shadow-[0_0_8px_#d4ff32]" />
        <div className="w-1 h-1 rounded-full bg-lime-300 absolute bottom-2 right-2 opacity-60" />
      </div>

      {/* 3D Glassy Sphere */}
      <div
        className="relative rounded-full shadow-2xl overflow-hidden border border-white/20 transition-transform duration-300 hover:scale-105"
        style={{
          width: size,
          height: size,
          background: isRenter
            ? 'radial-gradient(circle at 35% 30%, #00e5ff 0%, #0077b6 40%, #03045e 75%, #010a12 100%)'
            : 'radial-gradient(circle at 35% 30%, #d4ff32 0%, #38b000 35%, #004b23 70%, #041409 100%)',
          boxShadow: `0 0 28px ${isRenter ? 'rgba(0,229,255,0.45)' : 'rgba(212,255,50,0.45)'}, inset 0 0 15px rgba(255,255,255,0.35)`,
        }}
      >
        {/* Specular highlight glint */}
        <div
          className="absolute rounded-full opacity-85"
          style={{
            top: '12%',
            left: '20%',
            width: '32%',
            height: '24%',
            background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.2) 60%, transparent 100%)',
            transform: 'rotate(-25deg)',
          }}
        />

        {/* Inner energy core swirling pattern */}
        <div
          className="absolute inset-0 opacity-40 mix-blend-overlay"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, #ffffff 5%, transparent 60%)`,
          }}
        />

        {/* Center icon watermark (Car for Driver, Parking P for Renter) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-85">
          <span className="material-symbols-outlined text-white text-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {isRenter ? 'local_parking' : 'directions_car'}
          </span>
        </div>
      </div>
    </div>
  );
};
