import React, { useState } from 'react';
import { ScreenId } from '../types.ts';
import { ParkingSlot } from '../utils/parkingRules.ts';

interface UnifiedDriverCompanionProps {
  onNavigate: (screen: ScreenId) => void;
  selectedSlot: ParkingSlot;
}

export const UnifiedDriverCompanion: React.FC<UnifiedDriverCompanionProps> = ({
  onNavigate,
  selectedSlot,
}) => {
  const [openSections, setOpenSections] = useState({
    radar: true,
    telemetry: true,
    pass: true,
    billing: true,
    stays: false,
  });
  const [isExtended, setIsExtended] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const toggleSection = (key: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleExtend = () => {
    setIsExtended(true);
    setToastMessage('Reservation Extended (+1h)! Updated window until 05:30 PM (₹25 auto-debited).');
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#101319] text-[#e1e2ea] relative pb-24">
      {/* Top Header */}
      <header className="sticky top-0 w-full z-40 bg-[#0b0e13]/90 backdrop-blur-xl border-b border-white/5">
        <div className="h-16 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Back to Navigation"
              onClick={() => onNavigate('active-journey')}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-[#191c21] hover:bg-[#1d2025] text-[#e1e2ea] transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('journey')}>
              <div className="w-8 h-8 rounded-lg bg-[#00e5ff] flex items-center justify-center text-[#001f24] shadow-md">
                <span className="material-symbols-outlined text-[20px]">electric_bolt</span>
              </div>
              <div>
                <h1 className="font-black text-sm text-[#e1e2ea] flex items-center gap-1.5 leading-tight">
                  SpotIQ Companion
                  <span className="w-2 h-2 rounded-full bg-[#aff833] animate-pulse inline-block" />
                </h1>
                <p className="text-[10px] uppercase text-[#bac9cc] tracking-wider font-semibold">
                  Live Active Session
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Emergency Assistance"
              onClick={() => {
                setToastMessage('SpotIQ Emergency Dispatch alerted. Mysuru Palace security standby.');
                setTimeout(() => setToastMessage(null), 3000);
              }}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-[#272a30] hover:bg-[#32353b] text-[#00e5ff] border border-white/10"
            >
              <span className="material-symbols-outlined text-[19px]">sos</span>
            </button>
            <button
              type="button"
              aria-label="User Profile"
              onClick={() => onNavigate('my-bookings')}
              className="w-10 h-10 p-0.5 rounded-full flex items-center justify-center relative"
            >
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-[#00e5ff]/80"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGRvsXIOJDp9oMBinPRaixXzHoRoqvLlDWpVZaGVVMADqRr-5vz_r82-reMEib9yUk2-4rT1nm6hbCRc1wb53Rz0hFcOf7yE4RCEPC_rxo9cHpK1YFjqH0P67Uu6BMD5SMo2vPADXeL7Kl7h0jcdlswANDcMh0axJAwekG6K47JBGz-Ghj93w4E-EC_elrw7Jh3bYvhR6EJpl3zXQuNFIqvh6LZlQx34b8kQWDwUjFU1dh0yGF4Ydf5w"
              />
            </button>
          </div>
        </div>
      </header>

      {/* Floating Delight Toast */}
      {toastMessage && (
        <div className="fixed top-20 left-4 right-4 z-50 bg-[#1d2025] text-[#aff833] border border-[#aff833]/40 px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-bold animate-pulse">
          <span className="material-symbols-outlined text-[18px]">verified</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Companion Stream */}
      <main className="flex-1 flex flex-col p-4 gap-4">
        {/* Active Telemetry Status Strip */}
        <section className="bg-gradient-to-r from-[#272a30] via-[#1d2025] to-[#272a30] p-4 rounded-3xl border border-[#00e5ff]/20 shadow-xl relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-28 h-28 bg-[#00e5ff]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#aff833] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#aff833]" />
              </span>
              <span className="text-[10px] font-black text-[#aff833] uppercase tracking-widest">
                EN ROUTE • LIVE GUIDANCE
              </span>
            </div>
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#080B10]/80 border border-[#aff833]/30 text-[#aff833] text-[11px] font-bold">
              <span className="material-symbols-outlined text-[14px]">sensors</span>
              <span>ANPR Ready</span>
            </div>
          </div>

          <div className="mt-3 flex items-end justify-between">
            <div>
              <h2 className="text-xl font-black text-[#e1e2ea] tracking-tight">Palace South Gate</h2>
              <p className="text-xs text-[#bac9cc] flex items-center gap-1 mt-0.5">
                <span className="material-symbols-outlined text-[15px] text-[#00e5ff]">location_on</span>
                Amba Vilas Main Approach • Ramp Level {selectedSlot.level}
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-[#849396] uppercase font-bold tracking-wider">SPOTS OPEN</span>
              <p className="text-lg font-black text-[#aff833]">
                38 <span className="text-xs font-normal text-[#bac9cc]">/ 240</span>
              </p>
            </div>
          </div>

          {/* Compact Metric Bar */}
          <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-white/5">
            <div className="bg-[#0b0e13]/60 rounded-xl p-2.5 flex flex-col">
              <span className="text-[9px] uppercase font-bold text-[#849396]">ETA</span>
              <span className="text-sm font-bold text-[#00e5ff]">6 Mins</span>
            </div>
            <div className="bg-[#0b0e13]/60 rounded-xl p-2.5 flex flex-col">
              <span className="text-[9px] uppercase font-bold text-[#849396]">Distance</span>
              <span className="text-sm font-bold text-[#e1e2ea]">1.4 km</span>
            </div>
            <div className="bg-[#0b0e13]/60 rounded-xl p-2.5 flex flex-col">
              <span className="text-[9px] uppercase font-bold text-[#849396]">GPS Signal</span>
              <span className="text-sm font-bold text-[#aff833] flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">satellite_alt</span>
                Locked
              </span>
            </div>
          </div>
        </section>

        {/* DRAWER 1: Destination & Live Grid Radar */}
        <section className="bg-[#191c21] rounded-2xl border border-white/5 overflow-hidden shadow-lg">
          <div
            onClick={() => toggleSection('radar')}
            className="flex items-center justify-between p-3.5 cursor-pointer bg-[#1d2025]/70 hover:bg-[#1d2025] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00e5ff]/15 text-[#00e5ff] flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">radar</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-xs text-[#e1e2ea]">1. Live Grid Radar & Ingress</h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#aff833]/15 text-[#aff833] font-bold">
                    38 Spots
                  </span>
                </div>
                <p className="text-[11px] text-[#bac9cc]">Radar map, lane assist & turns</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#bac9cc]">
              {openSections.radar ? 'expand_less' : 'expand_more'}
            </span>
          </div>

          {openSections.radar && (
            <div className="p-3.5 pt-2 flex flex-col gap-3">
              <div className="relative overflow-hidden rounded-xl bg-[#0b0e13] h-44 border border-white/5">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD1O_DeAFm94XP3no__hV7o99eD52BlTEkMwCwX-bVA3ip-PjEHry1M6YdLq4q0KqIrFlGu6jvrQ_LUEcvHThTJGg6Bg5pHvJMvCgHOrOwScsyuqDex8xGjwWUCcKgOhj6qeikqyqTPSS66CLbSChiCrRVCtzur8Sr4r0faGIIQ5RqLDTROno1fieQFxaydclALXnGpQdgn6xJ3hMlo9Tz9gyPZhvkxJPU6CpDWFjCYPJyPht3VB0lA_Q')",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e13] via-[#0b0e13]/30 to-black/50" />
                </div>
                <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#080B10]/90 text-xs font-bold text-[#c3f5ff] flex items-center gap-1.5 shadow-md border border-[#00e5ff]/30">
                    <span className="material-symbols-outlined text-[16px] text-[#00e5ff]">turn_right</span>
                    In 350m: Turn Right onto Gate 3
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#080B10]/80 text-[10px] font-bold text-[#aff833] uppercase">
                    LIVE RADAR
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('active-journey')}
                className="w-full h-11 rounded-xl bg-[#00e5ff] text-[#001f24] font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-transform active:scale-[0.98]"
              >
                <span className="material-symbols-outlined text-[18px]">turn_slight_right</span>
                <span>Start Turn-by-Turn GPS Directions</span>
              </button>
            </div>
          )}
        </section>

        {/* DRAWER 2: Bay Telemetry & 3D Position */}
        <section className="bg-[#191c21] rounded-2xl border border-[#aff833]/30 overflow-hidden shadow-lg">
          <div
            onClick={() => toggleSection('telemetry')}
            className="flex items-center justify-between p-3.5 cursor-pointer bg-[#1d2025]/70 hover:bg-[#1d2025] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#aff833]/15 text-[#aff833] flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">view_in_ar</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-xs text-[#e1e2ea]">2. Bay Telemetry & 3D Position</h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#aff833] text-[#223600] font-extrabold uppercase">
                    SLOT {selectedSlot.code}
                  </span>
                </div>
                <p className="text-[11px] text-[#bac9cc]">
                  Level {selectedSlot.level}, Pillar 12, EV Ultra-Fast Ready
                </p>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#bac9cc]">
              {openSections.telemetry ? 'expand_less' : 'expand_more'}
            </span>
          </div>

          {openSections.telemetry && (
            <div className="p-3.5 pt-2 flex flex-col gap-3">
              <div className="p-3 bg-[#0b0e13] rounded-xl border border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#e1e2ea] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#aff833] text-[18px]">directions_car</span>
                    Floor Level {selectedSlot.level} • Zone Blue
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#1d2025] text-[10px] font-semibold text-[#00e5ff]">
                    Distance to Lift: 15m
                  </span>
                </div>

                {/* Bay Grid Simulation */}
                <div className="grid grid-cols-4 gap-2 py-2">
                  <div className="h-14 rounded-lg bg-[#281418]/60 border border-[#ff5964]/30 flex flex-col items-center justify-center text-[10px] text-[#ff5964]">
                    <span className="font-bold">B02</span>
                    <span className="text-[8px] uppercase">OCCUPIED</span>
                  </div>
                  <div className="h-14 rounded-lg bg-[#281418]/60 border border-[#ff5964]/30 flex flex-col items-center justify-center text-[10px] text-[#ff5964]">
                    <span className="font-bold">B03</span>
                    <span className="text-[8px] uppercase">OCCUPIED</span>
                  </div>
                  {/* Selected Slot Highlight */}
                  <div className="h-14 rounded-lg bg-[#00e5ff]/20 border-2 border-[#00e5ff] flex flex-col items-center justify-center text-[#00e5ff] font-bold shadow-[0_0_12px_rgba(0,229,255,0.4)]">
                    <span className="text-xs">{selectedSlot.code}</span>
                    <span className="text-[8px] tracking-tight bg-[#00e5ff] text-[#001f24] px-1.5 py-0.2 rounded-full font-black">
                      YOUR BAY
                    </span>
                  </div>
                  <div className="h-14 rounded-lg bg-[#191c21] border border-[#aff833]/40 flex flex-col items-center justify-center text-[10px] text-[#aff833]">
                    <span className="font-bold">B05</span>
                    <span className="text-[8px] uppercase">OPEN</span>
                  </div>
                </div>

                {/* Telemetry Specs */}
                <div className="grid grid-cols-3 gap-2 text-center mt-2 pt-2 border-t border-white/5">
                  <div className="p-2 rounded-lg bg-[#191c21] flex flex-col items-center">
                    <span className="material-symbols-outlined text-[#00e5ff] text-[18px]">ev_station</span>
                    <span className="text-[10px] font-bold text-[#e1e2ea] mt-0.5">60kW CCS2 EV</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#191c21] flex flex-col items-center">
                    <span className="material-symbols-outlined text-[#aff833] text-[18px]">elevator</span>
                    <span className="text-[10px] font-bold text-[#e1e2ea] mt-0.5">15m to Lift</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#191c21] flex flex-col items-center">
                    <span className="material-symbols-outlined text-[#00e5ff] text-[18px]">videocam</span>
                    <span className="text-[10px] font-bold text-[#e1e2ea] mt-0.5">Bay Cam #12</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* DRAWER 3: Active Gate Access Pass */}
        <section className="bg-[#191c21] rounded-2xl border border-[#00e5ff]/30 overflow-hidden shadow-lg">
          <div
            onClick={() => toggleSection('pass')}
            className="flex items-center justify-between p-3.5 cursor-pointer bg-[#1d2025]/70 hover:bg-[#1d2025] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00e5ff]/20 text-[#00e5ff] flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">qr_code_2</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-xs text-[#e1e2ea]">3. Gate Access Fast-Pass</h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#00e5ff] text-[#001f24] font-black uppercase">
                    AUTO BARRIER
                  </span>
                </div>
                <p className="text-[11px] text-[#bac9cc]">SPQ-MY-89241 • KA-09-EA-2091</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#bac9cc]">
              {openSections.pass ? 'expand_less' : 'expand_more'}
            </span>
          </div>

          {openSections.pass && (
            <div className="p-3.5 pt-2 flex flex-col items-center gap-3">
              <div className="w-full bg-[#0b0e13] rounded-xl p-4 flex flex-col items-center border border-white/5">
                <div className="p-3 bg-white rounded-xl shadow-lg">
                  <svg className="w-36 h-36 text-[#080B10]" fill="currentColor" viewBox="0 0 100 100">
                    <path d="M4 4h26v26H4V4zm6 6v14h14V10H10z" />
                    <path d="M12 12h10v10H12z" />
                    <path d="M70 4h26v26H70V4zm6 6v14h14V10H76z" />
                    <path d="M78 12h10v10H78z" />
                    <path d="M4 70h26v26H4V70zm6 6v14h14V76H10z" />
                    <path d="M12 78h10v10H12z" />
                    <path d="M40 6h8v8h-8zm12 0h6v6h-6zm-12 12h6v6h-6zm10 4h8v4h-8zm-6 8h8v6h-8zm24-12h8v6h-8zm6 10h8v8h-8zm-16 12h6v8h-6zm-8 4h8v6h-8zm-18 6h6v8h-6zm10 0h8v4h-8zm24 0h6v6h-6zm12 0h8v8h-8zm-30 8h6v8h-6zm12 4h8v6h-8zm14 0h8v8h-8zm-44 10h8v8h-8zm20 0h6v6h-6zm12 6h8v8h-8zm14-4h8v6h-8z" />
                  </svg>
                </div>
                <div className="mt-3 px-3 py-1 rounded-full bg-[#191c21] border border-white/5 flex items-center gap-1.5 text-xs text-[#bac9cc]">
                  <span className="material-symbols-outlined text-[16px] text-[#aff833]">camera_alt</span>
                  <span>
                    Boom Auto-Lift for: <strong className="text-[#e1e2ea]">KA-09-EA-2091</strong>
                  </span>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* DRAWER 4: Trip & Billing Timeline */}
        <section className="bg-[#191c21] rounded-2xl border border-white/5 overflow-hidden shadow-lg">
          <div
            onClick={() => toggleSection('billing')}
            className="flex items-center justify-between p-3.5 cursor-pointer bg-[#1d2025]/70 hover:bg-[#1d2025] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#aff833]/15 text-[#aff833] flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">payments</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-xs text-[#e1e2ea]">4. Trip & Billing Timeline</h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#aff833]/20 text-[#aff833] font-bold">
                    ₹63 Settled
                  </span>
                </div>
                <p className="text-[11px] text-[#bac9cc]">01h 14m remaining • UPI Autopay Active</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#bac9cc]">
              {openSections.billing ? 'expand_less' : 'expand_more'}
            </span>
          </div>

          {openSections.billing && (
            <div className="p-3.5 pt-2 flex flex-col gap-3">
              <div className="p-3 bg-[#0b0e13] rounded-xl border border-white/5 flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#e1e2ea]">Time Elapsed: 46 mins</span>
                  <span className="font-black text-[#aff833]">
                    {isExtended ? '02h 14m Remaining' : '01h 14m Remaining'}
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#272a30] overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#00e5ff] to-[#aff833] rounded-full"
                    style={{ width: isExtended ? '50%' : '38%' }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  id="extendStayBtn"
                  onClick={handleExtend}
                  className={`h-11 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-transform active:scale-[0.98] ${
                    isExtended
                      ? 'bg-[#aff833] text-[#223600]'
                      : 'bg-[#272a30] hover:bg-[#32353b] text-[#00e5ff] border border-[#00e5ff]/30'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">more_time</span>
                  <span>{isExtended ? 'Extended (+1h)' : 'Extend (+1h ₹25)'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('my-bookings')}
                  className="h-11 rounded-xl bg-[#272a30] hover:bg-[#32353b] text-[#e1e2ea] text-xs font-semibold flex items-center justify-center gap-1.5 border border-white/5"
                >
                  <span className="material-symbols-outlined text-[16px]">receipt_long</span>
                  <span>Tax Invoice</span>
                </button>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Floating Action Quick Dock */}
      <aside className="fixed bottom-20 left-4 right-4 z-40">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => onNavigate('active-journey')}
            className="flex-1 h-12 px-4 rounded-full bg-[#00e5ff] text-[#001f24] font-black text-xs flex items-center justify-center gap-2 shadow-2xl active:scale-95 transition-transform shadow-[#00e5ff]/30"
          >
            <span className="material-symbols-outlined text-[20px]">near_me</span>
            <span className="tracking-wide">Navigation HUD</span>
          </button>
          <button
            type="button"
            onClick={() => {
              toggleSection('pass');
              window.scrollTo({ top: 400, behavior: 'smooth' });
            }}
            className="h-12 px-4 rounded-full bg-[#aff833] text-[#223600] font-black text-xs flex items-center justify-center gap-2 shadow-2xl active:scale-95 transition-transform shadow-[#aff833]/30"
          >
            <span className="material-symbols-outlined text-[20px]">qr_code_scanner</span>
            <span className="tracking-wide">Boom Pass</span>
          </button>
        </div>
      </aside>
    </div>
  );
};
