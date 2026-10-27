import React from 'react';

interface MobilePhoneFrameProps {
  children: React.ReactNode;
  time?: string;
  className?: string;
  showBezel?: boolean;
}

export const MobilePhoneFrame: React.FC<MobilePhoneFrameProps> = ({
  children,
  time = '9:30 PM',
  className = '',
  showBezel = true,
}) => {
  // If showBezel is explicitly false, render clean fluid container
  if (!showBezel) {
    return <div className={`w-full max-w-md mx-auto min-h-screen flex flex-col ${className}`}>{children}</div>;
  }

  return (
    <>
      {/* On Real Mobile Devices (< 768px): Never show artificial phone chassis or fake status bar */}
      <div className="block md:hidden w-full min-h-[100dvh] flex flex-col bg-[#0c0e0d]">
        {children}
      </div>

      {/* On Desktop Displays (>= 768px): Show stylish iPhone/Hardware Frame for Mockup Presentations */}
      <div className={`hidden md:block relative mx-auto select-none ${className}`}>
        {/* Outer Phone Hardware Chasis */}
        <div className="relative w-full max-w-[395px] min-h-[790px] rounded-[48px] p-[10px] bg-gradient-to-b from-[#2a2f2b] via-[#141715] to-[#0a0c0b] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.08),inset_0_1px_2px_rgba(255,255,255,0.2)]">
          {/* Subtle metallic edge buttons on left & right */}
          <div className="absolute -left-[3px] top-[110px] w-[3px] h-[34px] bg-[#333a34] rounded-l-sm" />
          <div className="absolute -left-[3px] top-[160px] w-[3px] h-[48px] bg-[#333a34] rounded-l-sm" />
          <div className="absolute -left-[3px] top-[220px] w-[3px] h-[48px] bg-[#333a34] rounded-l-sm" />
          <div className="absolute -right-[3px] top-[140px] w-[3px] h-[65px] bg-[#333a34] rounded-r-sm" />

          {/* Inner Phone Screen Display */}
          <div className="relative w-full h-full min-h-[770px] rounded-[40px] bg-[#0c0e0d] text-[#e6ede8] overflow-hidden flex flex-col border border-white/5 shadow-inner">
            {/* iOS Style Top Status Bar */}
            <div className="pt-3 px-6 pb-1 flex items-center justify-between text-xs font-semibold text-white/90 z-30 shrink-0">
              {/* Clock */}
              <span className="tracking-tight text-[13px] font-medium">{time}</span>

              {/* Dynamic Island / Speaker Pill */}
              <div className="w-24 h-5 bg-black/90 rounded-full flex items-center justify-center gap-1.5 px-2 border border-white/10 shadow-sm">
                <div className="w-2.5 h-2.5 rounded-full bg-[#151916] border border-white/10 flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-[#00e5ff]/60" />
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-[#1b221d]" />
              </div>

              {/* Network, WiFi & Battery Indicators */}
              <div className="flex items-center gap-1.5 text-white/90">
                <div className="flex items-end gap-[1.5px] h-3">
                  <span className="w-[2.5px] h-1.5 bg-white rounded-[0.5px]" />
                  <span className="w-[2.5px] h-2 bg-white rounded-[0.5px]" />
                  <span className="w-[2.5px] h-2.5 bg-white rounded-[0.5px]" />
                  <span className="w-[2.5px] h-3 bg-white rounded-[0.5px]" />
                </div>
                <span className="material-symbols-outlined text-[14px]">wifi</span>
                <div className="flex items-center">
                  <div className="w-5 h-2.5 border border-white/80 rounded-[3px] p-[1px] flex items-center">
                    <div className="w-full h-full bg-white rounded-[1.5px]" />
                  </div>
                  <div className="w-[1.5px] h-1 bg-white/70 rounded-r-sm" />
                </div>
              </div>
            </div>

            {/* Screen Scrollable Body */}
            <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col relative z-20">
              {children}
            </div>

            {/* iOS Home Indicator Bar */}
            <div className="pt-2 pb-2.5 flex justify-center shrink-0 z-30 bg-gradient-to-t from-[#0c0e0d] to-transparent">
              <div className="w-32 h-1 bg-white/40 hover:bg-white/70 rounded-full transition-all" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
