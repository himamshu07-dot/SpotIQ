import React, { useState } from 'react';
import { ScreenId } from '../types.ts';
import { MobilePhoneFrame } from '../components/MobilePhoneFrame.tsx';
import { AuthScreen, UserRole } from './AuthScreen.tsx';

interface MobileAuthShowcaseProps {
  onNavigate: (screen: ScreenId) => void;
  onLoginSuccess?: (user: { name: string; email: string; role: UserRole }) => void;
}

export const MobileAuthShowcase: React.FC<MobileAuthShowcaseProps> = ({
  onNavigate,
  onLoginSuccess,
}) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('driver');
  const [activePreset, setActivePreset] = useState<'all' | 'signin' | 'register' | 'forgot'>('all');
  const [showToast, setShowToast] = useState(true);

  return (
    <div className="min-h-screen bg-[#070908] text-[#e6ede8] relative overflow-hidden flex flex-col justify-between py-6 px-4">
      {/* Background Watermark Text matching reference image */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0 text-center w-full">
        <h1 className="text-[10vw] font-black uppercase tracking-widest text-white/[0.03] leading-none whitespace-nowrap">
          SPOTIQ PARKING
        </h1>
        <p className="text-[3vw] font-bold text-lime-400/[0.02] tracking-[0.3em] uppercase">
          CONNECTED DRIVER & HOST ECOSYSTEM
        </p>
      </div>

      {/* Top Banner Row: Pill Notification matching reference image */}
      <div className="relative z-30 flex flex-col items-center justify-center gap-3">
        {showToast && (
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/95 text-[#0c0e0d] shadow-2xl backdrop-blur-md text-xs font-bold animate-slide-down">
            <span className="w-4 h-4 rounded-full bg-[#1da750] text-white flex items-center justify-center text-[10px]">
              ✓
            </span>
            <span>Added to Favorites</span>
            <button
              type="button"
              onClick={() => setShowToast(false)}
              className="px-2 py-0.5 rounded-md bg-black/5 hover:bg-black/10 text-xs font-semibold text-black"
            >
              View
            </button>
          </div>
        )}

        {/* Showcase Controller Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 bg-[#121513]/90 border border-white/10 p-2 rounded-2xl backdrop-blur-xl shadow-2xl">
          {/* Role Filter: Driver vs Space Renter */}
          <div className="flex items-center p-1 bg-[#0c0e0d] rounded-xl border border-white/10">
            <button
              type="button"
              onClick={() => setSelectedRole('driver')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedRole === 'driver'
                  ? 'bg-[#d4ff32] text-[#0b0e0c] shadow-[0_0_12px_rgba(212,255,50,0.35)]'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">directions_car</span>
              <span>Driver Pages</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedRole('renter')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedRole === 'renter'
                  ? 'bg-[#00e5ff] text-[#001f24] shadow-[0_0_12px_rgba(0,229,255,0.35)]'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">garage</span>
              <span>Space Renter Pages</span>
            </button>
          </div>

          {/* View Single or All 3 Screens */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setActivePreset('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activePreset === 'all'
                  ? 'bg-[#1e231f] text-white border border-white/20'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              Trio Mockup (3 Phones)
            </button>
            <button
              type="button"
              onClick={() => setActivePreset('signin')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activePreset === 'signin'
                  ? 'bg-[#1e231f] text-white border border-white/20'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              1. Sign In
            </button>
            <button
              type="button"
              onClick={() => setActivePreset('register')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activePreset === 'register'
                  ? 'bg-[#1e231f] text-white border border-white/20'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              2. Register
            </button>
            <button
              type="button"
              onClick={() => setActivePreset('forgot')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activePreset === 'forgot'
                  ? 'bg-[#1e231f] text-white border border-white/20'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              3. Forgot Password
            </button>
          </div>

          {/* Direct navigation to Renter Dashboard */}
          {selectedRole === 'renter' && (
            <button
              type="button"
              onClick={() => onNavigate('renter-dashboard')}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#00e5ff]/20 text-[#00e5ff] hover:bg-[#00e5ff]/30 border border-[#00e5ff]/40 text-xs font-bold transition-all"
            >
              <span>Open Host Portal</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Multi-Screen Mockup Viewport */}
      <div className="relative z-10 flex-1 flex items-center justify-center py-8">
        <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-8 max-w-[1380px] mx-auto w-full">
          
          {/* SCREEN 1: Welcome Back (Sign In) */}
          {(activePreset === 'all' || activePreset === 'signin') && (
            <div className="flex flex-col items-center">
              <div className="mb-2 text-center">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#d4ff32]">
                  Screen 1 • Sign In
                </span>
                <p className="text-[10px] text-white/50">
                  {selectedRole === 'driver' ? 'Driver Login' : 'Space Renter (Host) Login'}
                </p>
              </div>
              <MobilePhoneFrame time="9:30 PM">
                <AuthScreen
                  initialRole={selectedRole}
                  initialView="signin"
                  onNavigate={onNavigate}
                  onLoginSuccess={onLoginSuccess}
                />
              </MobilePhoneFrame>
            </div>
          )}

          {/* SCREEN 2: Create Your Account? (Register) */}
          {(activePreset === 'all' || activePreset === 'register') && (
            <div className="flex flex-col items-center">
              <div className="mb-2 text-center">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#d4ff32]">
                  Screen 2 • Create Account
                </span>
                <p className="text-[10px] text-white/50">
                  {selectedRole === 'driver' ? 'Driver Registration' : 'Space Host Setup'}
                </p>
              </div>
              <MobilePhoneFrame time="9:30 PM">
                <AuthScreen
                  initialRole={selectedRole}
                  initialView="register"
                  onNavigate={onNavigate}
                  onLoginSuccess={onLoginSuccess}
                />
              </MobilePhoneFrame>
            </div>
          )}

          {/* SCREEN 3: Forgot Password? */}
          {(activePreset === 'all' || activePreset === 'forgot') && (
            <div className="flex flex-col items-center">
              <div className="mb-2 text-center">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#d4ff32]">
                  Screen 3 • Forgot Password
                </span>
                <p className="text-[10px] text-white/50">OTP Verification Code Flow</p>
              </div>
              <MobilePhoneFrame time="9:30 PM">
                <AuthScreen
                  initialRole={selectedRole}
                  initialView="forgot"
                  onNavigate={onNavigate}
                  onLoginSuccess={onLoginSuccess}
                />
              </MobilePhoneFrame>
            </div>
          )}

        </div>
      </div>

      {/* Footer Info */}
      <div className="relative z-20 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 pt-4 border-t border-white/5 max-w-5xl mx-auto w-full gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#aff833]" />
          <span>Pixel-Accurate Mobile Application Layout with Neon Buttons & 3D Glowing Orb</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('journey')}
            className="text-white hover:text-[#d4ff32] underline-offset-2 hover:underline"
          >
            Go to Driver Navigation →
          </button>
          <button
            type="button"
            onClick={() => onNavigate('renter-dashboard')}
            className="text-white hover:text-[#00e5ff] underline-offset-2 hover:underline"
          >
            Go to Space Provider Portal →
          </button>
        </div>
      </div>
    </div>
  );
};
