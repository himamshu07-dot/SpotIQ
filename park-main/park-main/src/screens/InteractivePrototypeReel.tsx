import React, { useState } from 'react';
import { ScreenId } from '../types.ts';
import { ParkingSlot } from '../utils/parkingRules.ts';
import { SlotIndicator } from '../components/SlotIndicator.tsx';

interface InteractivePrototypeReelProps {
  onNavigate: (screen: ScreenId) => void;
  slots: ParkingSlot[];
  selectedSlot: ParkingSlot;
  onSelectSlot: (slot: ParkingSlot) => void;
  onToggleSlotStatus: (slotId: string) => void;
  availableCount: number;
}

export const InteractivePrototypeReel: React.FC<InteractivePrototypeReelProps> = ({
  onNavigate,
  slots,
  selectedSlot,
  onSelectSlot,
  onToggleSlotStatus,
  availableCount,
}) => {
  const [currentStage, setCurrentStage] = useState(3);
  const [showOverviewModal, setShowOverviewModal] = useState(false);

  const stageNames = [
    '',
    'Search & Map',
    'Facility Spec',
    'Bay Grid',
    'Check-in & Fare',
    'HUD & Pass',
    'Trip History',
  ];

  const currentSlots = slots.filter((s) => s.level === 'B2');
  const leftWingSlots = currentSlots.slice(0, 6);
  const rightWingSlots = currentSlots.slice(6, 12);

  const nextStage = () => {
    setCurrentStage((prev) => (prev < 6 ? prev + 1 : 1));
  };

  const prevStage = () => {
    setCurrentStage((prev) => (prev > 1 ? prev - 1 : 6));
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#101319] text-[#e1e2ea] relative pb-20">
      {/* Fixed Top Flow Bar */}
      <header className="sticky top-0 w-full z-40 bg-[#0b0e13]/90 backdrop-blur-xl border-b border-[#272a30]">
        <div className="h-14 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#00e5ff]/20 flex items-center justify-center text-[#00e5ff]">
              <span className="material-symbols-outlined text-[18px]">hub</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-[15px] tracking-tight text-[#e1e2ea]">SpotIQ</span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-black uppercase tracking-wider bg-[#aff833]/15 text-[#aff833]">
                  Flow Deck
                </span>
              </div>
              <p className="text-[11px] text-[#bac9cc] -mt-0.5">
                Stage {currentStage} of 6 • {stageNames[currentStage]}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#1d2025] text-[#bac9cc]">
              <span className="w-2 h-2 rounded-full bg-[#aff833] animate-pulse" />
              Mysuru Live
            </span>
            <button
              type="button"
              aria-label="Toggle Info"
              onClick={() => setShowOverviewModal(!showOverviewModal)}
              className="w-9 h-9 rounded-full flex items-center justify-center bg-[#1d2025] text-[#bac9cc] hover:text-[#e1e2ea]"
            >
              <span className="material-symbols-outlined text-[18px]">info</span>
            </button>
          </div>
        </div>

        {/* Scrollable Stage Pills */}
        <nav className="flex items-center gap-1.5 px-3 py-2 overflow-x-auto no-scrollbar border-t border-[#272a30]/40 bg-[#0b0e13]/70">
          {[
            { stage: 1, label: 'Map Search' },
            { stage: 2, label: 'Facility Spec' },
            { stage: 3, label: 'Bay Grid' },
            { stage: 4, label: 'Check-in & Fare' },
            { stage: 5, label: 'HUD & Pass' },
            { stage: 6, label: 'Trip History' },
          ].map(({ stage, label }) => {
            const isActive = currentStage === stage;
            return (
              <button
                key={stage}
                type="button"
                onClick={() => setCurrentStage(stage)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-tight transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#00e5ff] text-[#001f24] shadow-md shadow-[#00e5ff]/25 font-black'
                    : 'bg-[#1d2025] text-[#bac9cc] hover:text-[#e1e2ea]'
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                    isActive ? 'bg-[#001f24] text-[#00e5ff] font-extrabold' : 'bg-[#272a30]'
                  }`}
                >
                  {stage}
                </span>
                <span>{label}</span>
              </button>
            );
          })}
        </nav>
      </header>

      {/* Main Flow Content Body */}
      <main className="flex-1 flex flex-col p-4 gap-4">
        {/* STAGE 1: Search & Spatial Discovery */}
        {currentStage === 1 && (
          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#aff833] uppercase font-bold tracking-wider">
                  Phase 01 • Search & Spatial Discovery
                </span>
                <h2 className="text-xl font-black text-[#e1e2ea]">Smart Parking Explorer</h2>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#191c21] text-[#00e5ff] text-xs font-bold">
                12 Clusters
              </span>
            </div>

            <div className="relative w-full h-64 rounded-2xl bg-[#080B10] border border-white/5 overflow-hidden p-3 flex flex-col justify-between shadow-xl">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-60"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD1O_DeAFm94XP3no__hV7o99eD52BlTEkMwCwX-bVA3ip-PjEHry1M6YdLq4q0KqIrFlGu6jvrQ_LUEcvHThTJGg6Bg5pHvJMvCgHOrOwScsyuqDex8xGjwWUCcKgOhj6qeikqyqTPSS66CLbSChiCrRVCtzur8Sr4r0faGIIQ5RqLDTROno1fieQFxaydclALXnGpQdgn6xJ3hMlo9Tz9gyPZhvkxJPU6CpDWFjCYPJyPht3VB0lA_Q')",
                }}
              />
              <div className="relative z-10 bg-[#1d2025]/90 backdrop-blur-md rounded-full px-3 py-2 flex items-center gap-2 border border-white/10 shadow-lg">
                <span className="material-symbols-outlined text-[#00e5ff] text-[18px]">search</span>
                <span className="text-xs text-[#e1e2ea] flex-1 font-semibold">Mysuru Palace & D. Devaraj Urs Rd</span>
                <span className="material-symbols-outlined text-[#aff833] text-[18px]">tune</span>
              </div>

              <div className="relative z-10 flex items-center justify-center">
                <div
                  className="bg-[#00e5ff] text-[#001f24] px-3 py-1.5 rounded-full shadow-lg text-xs font-black flex items-center gap-1 cursor-pointer animate-bounce"
                  onClick={() => setCurrentStage(2)}
                >
                  <span className="material-symbols-outlined text-[14px]">bolt</span>
                  <span>Palace South ({availableCount + 33} Open)</span>
                </div>
              </div>

              <div className="relative z-10 flex items-center justify-between text-xs pt-2">
                <button
                  type="button"
                  className="bg-[#191c21] px-2.5 py-1 rounded-full text-[#bac9cc] flex items-center gap-1 border border-white/5"
                >
                  <span className="material-symbols-outlined text-[14px]">my_location</span>
                  Mysore Palace Gate 2 (450m)
                </button>
                <div className="flex items-center gap-1 text-[10px] text-[#aff833] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#aff833] animate-ping" />
                  <span>Telemetry Active</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setCurrentStage(2)}
              className="w-full h-12 rounded-full bg-[#00e5ff] text-[#001f24] font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Next: Inspect Facility Specs</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </section>
        )}

        {/* STAGE 2: Facility Telemetry */}
        {currentStage === 2 && (
          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#aff833] uppercase font-bold tracking-wider">
                  Phase 02 • Facility Telemetry
                </span>
                <h2 className="text-xl font-black text-[#e1e2ea]">Palace South Gate (B2 Wing)</h2>
              </div>
              <span className="px-2 py-0.5 rounded bg-[#aff833]/15 text-[#aff833] text-[10px] font-bold">
                Fast Gate ANPR
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-[#191c21] p-3 rounded-2xl border border-white/5">
                <div className="flex items-center gap-1.5 text-[#00e5ff] mb-1 font-bold">
                  <span className="material-symbols-outlined text-[18px]">ev_station</span>
                  <span>60kW CCS2 Fast</span>
                </div>
                <p className="text-[11px] text-[#bac9cc]">Fast charging bay on level B2</p>
              </div>
              <div className="bg-[#191c21] p-3 rounded-2xl border border-white/5">
                <div className="flex items-center gap-1.5 text-[#aff833] mb-1 font-bold">
                  <span className="material-symbols-outlined text-[18px]">height</span>
                  <span>2.4m Max Height</span>
                </div>
                <p className="text-[11px] text-[#bac9cc]">Full SUV clearance</p>
              </div>
            </div>

            {/* Level B2 Telemetry Card */}
            <div className="p-4 rounded-2xl bg-[#191c21] border border-[#00e5ff]/30 flex flex-col gap-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#e1e2ea] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#aff833]" />
                  Level B2 (EV & Covered Stalls)
                </span>
                <span className="text-[#aff833] font-bold">{availableCount + 21} Open Spots</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-[#101319] overflow-hidden">
                <div className="h-full bg-[#aff833] rounded-full" style={{ width: '68%' }} />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setCurrentStage(1)}
                className="w-1/3 py-3 rounded-full bg-[#191c21] text-[#e1e2ea] font-semibold text-xs border border-white/5"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setCurrentStage(3)}
                className="w-2/3 py-3 rounded-full bg-[#00e5ff] text-[#001f24] font-bold text-xs flex items-center justify-center gap-1 shadow-lg"
              >
                <span>Next: Choose Bay Grid</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </section>
        )}

        {/* STAGE 3: Interactive Bay Grid */}
        {currentStage === 3 && (
          <section className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#aff833] uppercase font-bold tracking-wider">
                  Phase 03 • Real-Time Bay Grid
                </span>
                <h2 className="text-xl font-black text-[#e1e2ea]">Pick Your Stall (Level B2)</h2>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#aff833]/15 text-[#aff833] text-xs font-bold">
                {availableCount} Available
              </span>
            </div>

            {/* Blueprint Grid */}
            <div className="relative bg-[#0b0e13] rounded-2xl p-3 border border-white/10 shadow-2xl">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  {leftWingSlots.map((slot) => (
                    <SlotIndicator
                      key={slot.id}
                      slot={slot}
                      isSelected={selectedSlot.code === slot.code}
                      onSelect={onSelectSlot}
                      onToggleStatus={onToggleSlotStatus}
                    />
                  ))}
                </div>
                <div className="flex flex-col gap-2">
                  {rightWingSlots.map((slot) => (
                    <SlotIndicator
                      key={slot.id}
                      slot={slot}
                      isSelected={selectedSlot.code === slot.code}
                      onSelect={onSelectSlot}
                      onToggleStatus={onToggleSlotStatus}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => setCurrentStage(2)}
                className="w-1/3 py-3 rounded-full bg-[#191c21] text-[#e1e2ea] font-semibold text-xs border border-white/5"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setCurrentStage(4)}
                className="w-2/3 py-3 rounded-full bg-[#00e5ff] text-[#001f24] font-black text-xs flex items-center justify-center gap-1 shadow-lg"
              >
                <span>Next: Confirm Fare & Check-in</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </section>
        )}

        {/* STAGE 4: Check-in & Fare */}
        {currentStage === 4 && (
          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#aff833] uppercase font-bold tracking-wider">
                  Phase 04 • Check-In & Checkout Lock
                </span>
                <h2 className="text-xl font-black text-[#e1e2ea]">Booking Confirmation</h2>
              </div>
              <span className="px-2 py-0.5 rounded bg-[#00e5ff]/20 text-[#00e5ff] text-[10px] font-bold">
                10:00 Hold Active
              </span>
            </div>

            {/* Vehicle Profile */}
            <div className="p-3.5 rounded-2xl bg-[#191c21] border border-white/5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#272a30] flex items-center justify-center text-[#00e5ff]">
                <span className="material-symbols-outlined text-[20px]">electric_car</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-xs text-[#e1e2ea]">Tata Nexon EV Max</h4>
                  <span className="text-[9px] bg-[#aff833]/15 text-[#aff833] px-1.5 py-0.2 rounded font-bold">
                    ANPR Linked
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#849396]">KA-09-ME-9021</span>
              </div>
            </div>

            {/* Itemized Fare */}
            <div className="p-4 rounded-2xl bg-[#191c21] border border-white/5 flex flex-col gap-2 text-xs">
              <div className="flex justify-between text-[#bac9cc]">
                <span>Slot B04 Base Fare (₹30 × 2 hrs)</span>
                <span className="text-[#e1e2ea] font-mono font-bold">₹60.00</span>
              </div>
              <div className="flex justify-between text-[#bac9cc]">
                <span>EV Fast Charging Bay Access</span>
                <span className="text-[#aff833] font-bold">FREE (Promo)</span>
              </div>
              <div className="flex justify-between text-[#bac9cc]">
                <span>Mysuru Smart City Platform Levy</span>
                <span className="text-[#e1e2ea] font-mono font-bold">₹3.00</span>
              </div>
              <div className="pt-2 border-t border-white/5 flex justify-between font-bold text-sm">
                <span className="text-[#e1e2ea]">Total Payable Amount</span>
                <span className="text-[#00e5ff] font-mono font-black text-base">₹63.00</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setCurrentStage(3)}
                className="w-1/3 py-3 rounded-full bg-[#191c21] text-[#e1e2ea] font-semibold text-xs border border-white/5"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setCurrentStage(5)}
                className="w-2/3 py-3 rounded-full bg-[#00e5ff] text-[#001f24] font-black text-xs flex items-center justify-center gap-1 shadow-lg"
              >
                <span>Authorize & Launch HUD (₹63)</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </section>
        )}

        {/* STAGE 5: HUD & Pass */}
        {currentStage === 5 && (
          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#aff833] uppercase font-bold tracking-wider">
                  Phase 05 • Active Session & Ingress HUD
                </span>
                <h2 className="text-xl font-black text-[#e1e2ea]">Live Guidance & QR Pass</h2>
              </div>
              <span className="px-2 py-0.5 rounded bg-[#aff833]/15 text-[#aff833] text-[10px] font-bold">
                Ingress Active
              </span>
            </div>

            {/* Turn-by-Turn Card */}
            <div className="p-4 rounded-2xl bg-[#191c21] border border-[#00e5ff]/30 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#00e5ff] text-[#001f24] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">turn_slight_right</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#00e5ff] font-bold uppercase">IN 35 METERS</span>
                  <p className="font-extrabold text-xs text-[#e1e2ea]">Turn right down Level B2 Spiral Ramp</p>
                </div>
              </div>
            </div>

            {/* Optical QR Pass */}
            <div className="p-4 rounded-2xl bg-[#0b0e13] border border-white/5 flex flex-col items-center gap-2 text-center">
              <span className="text-xs font-bold text-[#e1e2ea]">Optical Barrier Fast-Pass</span>
              <div className="p-3 bg-white rounded-xl shadow-lg my-1">
                <svg className="w-32 h-32 text-[#080B10]" fill="currentColor" viewBox="0 0 100 100">
                  <path d="M4 4h26v26H4V4zm6 6v14h14V10H10z" />
                  <path d="M70 4h26v26H70V4zm6 6v14h14V10H76z" />
                  <path d="M4 70h26v26H4V70zm6 6v14h14V76H10z" />
                  <path d="M38 10h10v10H38zm16 6h6v6h-6zm10 10h6v6h-6zm-30 20h8v8h-8zm16 4h10v6h-10zm12 12h8v8h-8zm-22 14h8v6h-8z" />
                </svg>
              </div>
              <span className="text-[11px] font-mono text-[#00e5ff] font-bold">SPIQ-B04-KA09-881</span>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setCurrentStage(4)}
                className="w-1/3 py-3 rounded-full bg-[#191c21] text-[#e1e2ea] font-semibold text-xs border border-white/5"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setCurrentStage(6)}
                className="w-2/3 py-3 rounded-full bg-[#00e5ff] text-[#001f24] font-black text-xs flex items-center justify-center gap-1 shadow-lg"
              >
                <span>View Trip History (Stage 6)</span>
                <span className="material-symbols-outlined text-[16px]">receipt_long</span>
              </button>
            </div>
          </section>
        )}

        {/* STAGE 6: Trip History */}
        {currentStage === 6 && (
          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#aff833] uppercase font-bold tracking-wider">
                  Phase 06 • Audit & Management
                </span>
                <h2 className="text-xl font-black text-[#e1e2ea]">My Bookings & History</h2>
              </div>
              <span className="px-2 py-0.5 rounded bg-[#191c21] text-[#bac9cc] text-[10px]">3 Records</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#191c21] border border-[#aff833]/40 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-[#aff833] uppercase tracking-wider flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#aff833] animate-pulse" />
                  Active Booking
                </span>
                <span className="font-mono text-xs text-[#00e5ff] font-bold">₹63.00</span>
              </div>
              <h4 className="font-bold text-sm text-[#e1e2ea]">Palace South Gate • Slot B04</h4>
              <p className="text-xs text-[#bac9cc]">Level B2 • Fast EV Charger 60kW</p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setCurrentStage(5)}
                className="w-1/3 py-3 rounded-full bg-[#191c21] text-[#e1e2ea] font-semibold text-xs border border-white/5"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setCurrentStage(1)}
                className="w-2/3 py-3 rounded-full bg-[#aff833] text-[#223600] font-black text-xs flex items-center justify-center gap-1 shadow-lg"
              >
                <span className="material-symbols-outlined text-[16px]">replay</span>
                <span>Restart Flow Deck</span>
              </button>
            </div>
          </section>
        )}
      </main>

      {/* Sticky Bottom Flow Bar */}
      <footer className="fixed bottom-0 inset-x-0 bg-[#080B10]/95 backdrop-blur-xl border-t border-[#272a30] px-4 py-2.5 z-40">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-[#bac9cc]">
            <span className="w-2 h-2 rounded-full bg-[#00e5ff] animate-pulse" />
            <span className="font-semibold">
              Active: Stage {currentStage} ({stageNames[currentStage]})
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={prevStage}
              className="px-3 py-1.5 rounded-full bg-[#191c21] text-[#e1e2ea] font-semibold hover:bg-[#272a30] transition-colors text-xs flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[14px]">arrow_back_ios</span>
              <span>Prev</span>
            </button>
            <button
              type="button"
              onClick={nextStage}
              className="px-3.5 py-1.5 rounded-full bg-[#00e5ff] text-[#001f24] font-black hover:brightness-110 text-xs flex items-center gap-1 shadow-md shadow-[#00e5ff]/20"
            >
              <span>Next</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward_ios</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Modal Overview Drawer */}
      {showOverviewModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-[#191c21] p-5 rounded-t-3xl sm:rounded-3xl w-full max-w-md border border-white/10 flex flex-col gap-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-[#e1e2ea] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#00e5ff]">route</span>
                SpotIQ End-to-End Master Reel
              </h3>
              <button
                type="button"
                onClick={() => setShowOverviewModal(false)}
                className="w-8 h-8 rounded-full bg-[#272a30] flex items-center justify-center text-[#bac9cc]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <p className="text-xs text-[#bac9cc]">
              Tap any stage below or step through using the top pills and action buttons:
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { stage: 1, title: '1. Map & Search', desc: 'Real-time occupancy map' },
                { stage: 2, title: '2. Facility Spec', desc: 'Clearance & EV details' },
                { stage: 3, title: '3. Bay Grid', desc: 'Interactive B01-B12 stalls' },
                { stage: 4, title: '4. Check-in & Fare', desc: 'ANPR + ₹63 calculation' },
                { stage: 5, title: '5. Active HUD', desc: 'Driveway navigation & QR' },
                { stage: 6, title: '6. History', desc: 'Pass audit & invoices' },
              ].map((item) => (
                <button
                  key={item.stage}
                  type="button"
                  onClick={() => {
                    setCurrentStage(item.stage);
                    setShowOverviewModal(false);
                  }}
                  className="p-2.5 rounded-xl bg-[#1d2025] hover:bg-[#272a30] text-left border border-white/5 hover:border-[#00e5ff]"
                >
                  <span className="font-bold text-[#00e5ff]">{item.title}</span>
                  <div className="text-[10px] text-[#849396]">{item.desc}</div>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setShowOverviewModal(false)}
              className="w-full py-3 rounded-full bg-[#00e5ff] text-[#001f24] font-black text-xs"
            >
              Return to Flow
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
