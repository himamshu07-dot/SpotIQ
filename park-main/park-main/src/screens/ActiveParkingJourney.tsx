import React, { useState } from 'react';
import { ScreenId } from '../types.ts';
import { ParkingSlot } from '../utils/parkingRules.ts';

interface ActiveParkingJourneyProps {
  onNavigate: (screen: ScreenId) => void;
  selectedSlot: ParkingSlot;
}

export const ActiveParkingJourney: React.FC<ActiveParkingJourneyProps> = ({ onNavigate, selectedSlot }) => {
  const [isExtended, setIsExtended] = useState(false);
  const [gpsActive, setGpsActive] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleExtend = () => {
    setIsExtended(true);
    setToastMessage('Reservation Extended (+1h)! Updated window until 05:30 PM.');
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleStartGps = () => {
    setGpsActive(true);
    setToastMessage('Launching Real Google Maps GPS Navigation...');
    window.open('https://www.google.com/maps/dir/?api=1&destination=12.3051,76.6551&travelmode=driving', '_blank');
    setTimeout(() => {
      setToastMessage('Turn-by-turn active: Head South toward Palace South Gate.');
    }, 1500);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#101319] text-[#e1e2ea] relative pb-28">
      {/* Top Header */}
      <header className="sticky top-0 w-full z-40 bg-[#0b0e13]/85 backdrop-blur-xl border-b border-white/5">
        <div className="h-16 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Back to Confirmation"
              onClick={() => onNavigate('booking-confirmation')}
              className="w-11 h-11 rounded-full flex items-center justify-center bg-[#191c21] hover:bg-[#1d2025] text-[#e1e2ea] transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
            <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => onNavigate('journey')}>
              <div className="w-7 h-7 rounded-lg bg-[#00e5ff] flex items-center justify-center text-[#001f24] font-black text-xs">
                IQ
              </div>
              <h1 className="font-bold text-base text-[#e1e2ea]">Live Navigation</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onNavigate('driver-companion')}
              className="px-3 py-1 rounded-full bg-[#00e5ff]/20 text-[#00e5ff] font-bold text-xs border border-[#00e5ff]/30 flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[15px]">electric_bolt</span>
              <span>Companion</span>
            </button>
            <button
              type="button"
              aria-label="User Profile"
              onClick={() => onNavigate('my-bookings')}
              className="w-11 h-11 p-1 rounded-full flex items-center justify-center focus:outline-none hover:opacity-90 transition-opacity"
            >
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover ring-1 ring-[#849396]"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGRvsXIOJDp9oMBinPRaixXzHoRoqvLlDWpVZaGVVMADqRr-5vz_r82-reMEib9yUk2-4rT1nm6hbCRc1wb53Rz0hFcOf7yE4RCEPC_rxo9cHpK1YFjqH0P67Uu6BMD5SMo2vPADXeL7Kl7h0jcdlswANDcMh0axJAwekG6K47JBGz-Ghj93w4E-EC_elrw7Jh3bYvhR6EJpl3zXQuNFIqvh6LZlQx34b8kQWDwUjFU1dh0yGF4Ydf5w"
              />
            </button>
          </div>
        </div>
      </header>

      {/* Floating Feedback Toast */}
      {toastMessage && (
        <div className="fixed top-20 left-4 right-4 z-50 bg-[#1d2025] text-[#aff833] border border-[#aff833]/40 px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-bold animate-pulse">
          <span className="material-symbols-outlined text-[18px]">info</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Content Body */}
      <main className="flex-1 flex flex-col p-4 gap-4">
        {/* Live Status & Telemetry Header Banner */}
        <section className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#191c21] border border-white/5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#aff833] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#aff833]" />
              </span>
              <span className="text-[10px] uppercase font-black tracking-widest text-[#aff833]">
                ACTIVE TRIP • EN ROUTE TO PARKING
              </span>
            </div>
            <div className="flex items-center gap-1 text-[#bac9cc] text-xs font-semibold">
              <span className="material-symbols-outlined text-[16px] text-[#00e5ff]">sensors</span>
              <span>ANPR Synced</span>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black text-[#e1e2ea] tracking-tight">Palace South Gate Multi-Level</h2>
            <p className="text-xs text-[#bac9cc] mt-0.5">Near Amba Vilas Main Approach • Gate 3</p>
          </div>

          {/* ETA Metric Cards Strip */}
          <div className="grid grid-cols-2 gap-2 mt-1">
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#191c21] border border-white/5">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#00e5ff]/10 text-[#00e5ff]">
                <span className="material-symbols-outlined text-[22px]">schedule</span>
              </div>
              <div>
                <span className="text-[10px] text-[#849396] uppercase font-bold tracking-wider">Estimated Arrival</span>
                <p className="text-base font-black text-[#e1e2ea]">6 Mins</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#191c21] border border-white/5">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#aff833]/10 text-[#aff833]">
                <span className="material-symbols-outlined text-[22px]">near_me</span>
              </div>
              <div>
                <span className="text-[10px] text-[#849396] uppercase font-bold tracking-wider">Distance Remaining</span>
                <p className="text-base font-black text-[#e1e2ea]">1.4 km away</p>
              </div>
            </div>
          </div>
        </section>

        {/* Turn-by-Turn Arrival Guidance Map Card */}
        <section className="relative overflow-hidden rounded-2xl bg-[#191c21] shadow-xl border border-white/5">
          <div
            className="w-full h-44 bg-cover bg-center relative"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD1O_DeAFm94XP3no__hV7o99eD52BlTEkMwCwX-bVA3ip-PjEHry1M6YdLq4q0KqIrFlGu6jvrQ_LUEcvHThTJGg6Bg5pHvJMvCgHOrOwScsyuqDex8xGjwWUCcKgOhj6qeikqyqTPSS66CLbSChiCrRVCtzur8Sr4r0faGIIQ5RqLDTROno1fieQFxaydclALXnGpQdgn6xJ3hMlo9Tz9gyPZhvkxJPU6CpDWFjCYPJyPht3VB0lA_Q')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#191c21] via-[#191c21]/40 to-transparent" />
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-[#080B10]/90 backdrop-blur-md text-xs font-bold text-[#c3f5ff] flex items-center gap-1.5 shadow-sm border border-white/10">
                <span className="material-symbols-outlined text-[15px] text-[#00e5ff]">turn_right</span>
                In 350m: Turn Right
              </span>
              <span className="px-2 py-0.5 rounded bg-[#080B10]/80 text-[10px] font-extrabold text-[#aff833] uppercase tracking-wider border border-[#aff833]/30">
                LIVE GPS
              </span>
            </div>
            <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-[#e1e2ea] text-xs font-bold">
              <span className="material-symbols-outlined text-[#00e5ff]">navigation</span>
              <span>South Gate Parking Ingress • Ramp Level {selectedSlot.level}</span>
            </div>
          </div>

          {/* Quick Navigate Button inside turn card */}
          <div className="p-3 bg-[#1d2025]">
            <button
              type="button"
              id="gpsBtn"
              onClick={handleStartGps}
              className={`w-full h-13 rounded-full font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-[0.98] ${
                gpsActive
                  ? 'bg-[#aff833] text-[#223600]'
                  : 'bg-[#00e5ff] text-[#001f24] hover:brightness-110'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">
                {gpsActive ? 'check_circle' : 'turn_slight_right'}
              </span>
              <span>{gpsActive ? 'GPS Ingress Active (Follow Neon Arrows)' : 'Start Turn-by-Turn GPS Directions'}</span>
              <span className="material-symbols-outlined text-[18px]">north_east</span>
            </button>
          </div>
        </section>

        {/* Gate Access Digital Fast-Pass Card (Notched Ticket Design) */}
        <section className="relative bg-[#272a30] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
          {/* Card Header */}
          <div className="p-4 pb-3 flex items-center justify-between bg-[#1d2025] border-b border-white/5">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#00e5ff] text-[20px]">qr_code_scanner</span>
              <span className="font-black text-sm text-[#e1e2ea]">SpotIQ Fast-Pass</span>
            </div>
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-[#32353b] text-[#aff833]">
              BOOM BARRIER ANPR
            </span>
          </div>

          {/* Ticket Body */}
          <div className="p-5 flex flex-col items-center text-center">
            {/* Glowing Slot Identifier */}
            <div className="w-full flex items-center justify-center mb-4">
              <div className="px-4 py-1.5 rounded-full bg-[#080B10] flex items-center gap-2 border border-[#aff833]/30">
                <span className="material-symbols-outlined text-[#aff833] text-[18px]">local_parking</span>
                <span className="text-sm font-black text-[#aff833] tracking-wide">
                  SLOT {selectedSlot.code} • LEVEL {selectedSlot.level}
                </span>
              </div>
            </div>

            {/* QR Code Frame with Neon Glowing Corner Brackets */}
            <div className="relative p-5 bg-[#080B10] rounded-2xl shadow-inner flex items-center justify-center border border-white/5">
              {/* Cyber Corner Accents */}
              <span className="absolute top-2 left-2 w-3.5 h-3.5 rounded-tl-sm bg-[#00e5ff]" />
              <span className="absolute top-2 right-2 w-3.5 h-3.5 rounded-tr-sm bg-[#00e5ff]" />
              <span className="absolute bottom-2 left-2 w-3.5 h-3.5 rounded-bl-sm bg-[#00e5ff]" />
              <span className="absolute bottom-2 right-2 w-3.5 h-3.5 rounded-br-sm bg-[#00e5ff]" />

              {/* High-Contrast Vector QR Code Graphic */}
              <div className="relative w-44 h-44 bg-white rounded-xl p-2.5 flex items-center justify-center shadow-lg">
                <svg className="w-full h-full text-[#080B10]" fill="currentColor" viewBox="0 0 100 100">
                  <path d="M4 4h26v26H4V4zm6 6v14h14V10H10z" />
                  <path d="M12 12h10v10H12z" />
                  <path d="M70 4h26v26H70V4zm6 6v14h14V10H76z" />
                  <path d="M78 12h10v10H78z" />
                  <path d="M4 70h26v26H4V70zm6 6v14h14V76H10z" />
                  <path d="M12 78h10v10H12z" />
                  <path d="M38 6h6v6h-6zm10 4h8v8h-8zm10 0h6v6h-6zm-10 12h6v6h-6zm12 2h8v4h-8zm-22 8h8v6h-8zm24-12h8v6h-8zm6 10h8v8h-8zm-16 12h6v8h-6zm-8 4h8v6h-8zm-18 6h6v8h-6zm10 0h8v4h-8zm24 0h6v6h-6zm12 0h8v8h-8zm-30 8h6v8h-6zm12 4h8v6h-8zm14 0h8v8h-8zm-44 10h8v8h-8zm20 0h6v6h-6zm12 6h8v8h-8zm14-4h8v6h-8z" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="px-2 py-0.5 rounded-md bg-[#00e5ff] text-[#001f24] text-[9px] font-black shadow-md border border-white">
                    SCAN
                  </span>
                </div>
              </div>
            </div>

            {/* Token Reference & Vehicle Ingress Data */}
            <div className="mt-3 flex flex-col items-center">
              <span className="text-[10px] text-[#849396] uppercase font-bold tracking-widest">PASS IDENTIFIER</span>
              <span className="text-base font-black text-[#00e5ff] tracking-wider mt-0.5">SPQ-MY-89241</span>
              <div className="mt-2 px-3 py-1 rounded-full bg-[#191c21] border border-white/5 flex items-center gap-1.5 text-xs text-[#bac9cc]">
                <span className="material-symbols-outlined text-[16px] text-[#aff833]">camera</span>
                <span>
                  Auto-gate matched: <strong className="text-[#e1e2ea]">KA-09-EA-2091</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Ticket Perforated Divider */}
          <div className="relative w-full flex items-center px-4">
            <div className="w-4 h-8 rounded-r-full bg-[#101319] absolute -left-2" />
            <div className="w-full h-[1px] border-t border-dashed border-[#849396]/40" />
            <div className="w-4 h-8 rounded-l-full bg-[#101319] absolute -right-2" />
          </div>

          {/* Ticket Footer Guidance */}
          <div className="p-3.5 bg-[#1d2025] flex items-start gap-2.5 text-left text-xs text-[#bac9cc]">
            <span className="material-symbols-outlined text-[#00e5ff] text-[18px] shrink-0 mt-0.5">info</span>
            <p className="leading-relaxed">
              Show this QR code at barrier optical scanner, or approach within 2m for instant hands-free entry via automatic ANPR license plate recognition.
            </p>
          </div>
        </section>

        {/* Active Session Timer & Countdown Card */}
        <section className="p-4 rounded-2xl bg-[#191c21] border border-white/5 flex flex-col gap-2.5 shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#aff833] text-[20px]">timer</span>
              <span className="font-bold text-sm text-[#e1e2ea]">Reserved Window</span>
            </div>
            <span className="text-xs font-black text-[#aff833]">
              {isExtended ? '3 hrs remaining' : '2 hrs remaining'}
            </span>
          </div>

          <div className="flex items-center justify-between text-[#bac9cc] text-xs">
            <span>Entry: 02:30 PM</span>
            <span>Valid until: {isExtended ? '05:30 PM' : '04:30 PM'}</span>
          </div>

          {/* Live Dynamic Countdown Bar */}
          <div className="w-full h-2.5 rounded-full bg-[#272a30] overflow-hidden relative">
            <div
              className="h-full bg-[#aff833] rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(175,248,51,0.5)]"
              style={{ width: isExtended ? '92%' : '82%' }}
            />
          </div>

          <div className="flex items-center justify-between text-[10px] text-[#849396] uppercase font-bold tracking-wider">
            <span>RESERVATION CONFIRMED</span>
            <span>GRACE BUFFER +15M</span>
          </div>
        </section>

        {/* Interactive Action Controls (2-Column Buttons) */}
        <section className="grid grid-cols-2 gap-2">
          <button
            type="button"
            id="extendTimeBtn"
            onClick={handleExtend}
            className={`h-12 px-3 rounded-full font-bold text-xs flex items-center justify-center gap-1.5 transition-transform active:scale-[0.98] ${
              isExtended
                ? 'bg-[#aff833] text-[#223600]'
                : 'bg-[#272a30] hover:bg-[#32353b] text-[#00e5ff] border border-[#00e5ff]/30'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {isExtended ? 'done' : 'more_time'}
            </span>
            <span>{isExtended ? 'Extended (+1h)' : 'Extend Time (+1h)'}</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('my-bookings')}
            className="h-12 px-3 rounded-full bg-[#191c21] hover:bg-[#272a30] text-[#e1e2ea] font-bold text-xs flex items-center justify-center gap-1.5 border border-white/5 transition-transform active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[18px] text-[#00e5ff]">receipt_long</span>
            <span>View All Bookings</span>
          </button>
        </section>

        {/* Offline Readiness Pill */}
        <div className="p-3 rounded-full bg-[#080B10]/90 backdrop-blur-md flex items-center justify-between px-4 border border-white/5 shadow-xl">
          <div className="flex items-center gap-2 text-xs text-[#e1e2ea]">
            <span className="material-symbols-outlined text-[#aff833] text-[18px]">offline_pin</span>
            <span>Pass & Directions saved offline</span>
          </div>
          <button
            type="button"
            aria-label="Share Pass"
            onClick={() => {
              setToastMessage('Pass URL copied for driver companion display!');
              setTimeout(() => setToastMessage(null), 2000);
            }}
            className="w-8 h-8 rounded-full bg-[#191c21] flex items-center justify-center text-[#00e5ff]"
          >
            <span className="material-symbols-outlined text-[16px]">share</span>
          </button>
        </div>
      </main>
    </div>
  );
};
