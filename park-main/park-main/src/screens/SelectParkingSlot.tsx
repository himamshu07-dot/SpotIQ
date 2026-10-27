import React, { useState } from 'react';
import { ScreenId } from '../types.ts';
import { ParkingSlot, calculateParkingFee } from '../utils/parkingRules.ts';
import { SlotIndicator } from '../components/SlotIndicator.tsx';

interface SelectParkingSlotProps {
  onNavigate: (screen: ScreenId) => void;
  slots: ParkingSlot[];
  selectedSlot: ParkingSlot;
  onSelectSlot: (slot: ParkingSlot) => void;
  onToggleSlotStatus: (slotId: string) => void;
  durationHours: number;
  onUpdateDuration: (hours: number) => void;
  activeLevel: 'B1' | 'B2' | 'B3';
  onChangeLevel: (level: 'B1' | 'B2' | 'B3') => void;
}

export const SelectParkingSlot: React.FC<SelectParkingSlotProps> = ({
  onNavigate,
  slots,
  selectedSlot,
  onSelectSlot,
  onToggleSlotStatus,
  durationHours,
  onUpdateDuration,
  activeLevel,
  onChangeLevel,
}) => {
  const currentSlots = slots.filter((s) => s.level === activeLevel);
  const openSlotsCount = currentSlots.filter((s) => s.status === 'available').length;
  const totalCost = calculateParkingFee(selectedSlot.ratePerHour || 30, durationHours);

  // Divide into left wing (B01-B06) and right wing (B07-B12)
  const leftWingSlots = currentSlots.slice(0, Math.ceil(currentSlots.length / 2));
  const rightWingSlots = currentSlots.slice(Math.ceil(currentSlots.length / 2));

  return (
    <div className="flex flex-col min-h-screen bg-[#101319] text-[#e1e2ea] relative pb-10">
      {/* Top App Header */}
      <header className="sticky top-0 w-full z-40 bg-[#0b0e13]/85 backdrop-blur-xl shadow-[0_1px_12px_rgba(0,0,0,0.5)] border-b border-white/5">
        <div className="h-16 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Go Back"
              onClick={() => onNavigate('parking-details')}
              className="w-11 h-11 rounded-full flex items-center justify-center bg-[#191c21] hover:bg-[#1d2025] text-[#e1e2ea] transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
            <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => onNavigate('journey')}>
              <div className="w-7 h-7 rounded-lg bg-[#00e5ff] flex items-center justify-center text-[#001f24] font-black text-xs">
                IQ
              </div>
              <h1 className="font-bold text-base text-[#e1e2ea] truncate">Spot Details</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
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

      {/* Sub-Header & Level Selector */}
      <section className="px-4 pt-3 pb-2 bg-[#191c21] flex flex-col gap-2 border-b border-white/5">
        <div className="flex items-center justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[#00e5ff] text-[18px]">near_me</span>
              <h2 className="font-bold text-base text-[#e1e2ea] truncate">Palace South Gate</h2>
            </div>
            <p className="text-xs text-[#bac9cc] flex items-center gap-1 mt-0.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#aff833] animate-pulse" />
              Level {activeLevel} • Closest to Elevator 2 & EV Wing
            </p>
          </div>
          <div className="flex items-center gap-1 bg-[#1d2025] px-2.5 py-1 rounded-full border border-white/5">
            <span className="material-symbols-outlined text-[#aff833] text-[16px]">local_parking</span>
            <span className="text-xs font-bold text-[#aff833]">{openSlotsCount} Open</span>
          </div>
        </div>

        {/* Segmented Level Switcher */}
        <div className="grid grid-cols-3 gap-1 p-1 bg-[#1d2025] rounded-full" role="tablist">
          {(['B1', 'B2', 'B3'] as const).map((lvl) => {
            const isSelected = activeLevel === lvl;
            return (
              <button
                key={lvl}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => onChangeLevel(lvl)}
                className={`py-1.5 rounded-full text-xs transition-all font-semibold flex items-center justify-center gap-1 ${
                  isSelected
                    ? 'bg-[#00e5ff] text-[#001f24] font-extrabold shadow-md shadow-[#00e5ff]/20'
                    : 'text-[#bac9cc] hover:text-[#e1e2ea]'
                }`}
              >
                <span>Level {lvl}</span>
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#001f24]" />}
              </button>
            );
          })}
        </div>
      </section>

      {/* Real-Time Color-Coded Status Legend */}
      <section className="px-4 py-2 bg-[#101319] border-b border-white/5">
        <div className="flex items-center justify-between overflow-x-auto py-1 gap-2 no-scrollbar">
          <div className="flex items-center gap-1.5 shrink-0 px-2.5 py-1 rounded-full bg-[#191c21] border border-[#aff833]/20">
            <span className="w-2.5 h-2.5 rounded-full bg-[#aff833] shadow-[0_0_6px_#aff833]" />
            <span className="text-[10px] uppercase font-bold text-[#aff833]">AVAILABLE</span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0 px-2.5 py-1 rounded-full bg-[#191c21] border border-[#00e5ff]/30">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00e5ff] shadow-[0_0_6px_#00e5ff]" />
            <span className="text-[10px] uppercase font-bold text-[#00e5ff]">SELECTED</span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0 px-2.5 py-1 rounded-full bg-[#191c21] border border-[#ffb300]/20">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffb300]" />
            <span className="text-[10px] uppercase font-bold text-[#ffb300]">RESERVED</span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0 px-2.5 py-1 rounded-full bg-[#191c21] border border-[#ff5964]/20">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5964]" />
            <span className="text-[10px] uppercase font-bold text-[#ff5964]">OCCUPIED</span>
          </div>
        </div>
      </section>

      {/* Driveway & Interactive Bay Grid Blueprint */}
      <main className="px-4 py-3 flex-1">
        {/* Directional Header */}
        <div className="flex items-center justify-between mb-2 px-1 text-[11px] text-[#bac9cc] font-semibold">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px] text-[#00e5ff]">north</span>
            RAMP INGRESS
          </span>
          <span>SPEED LIMIT: 10 KM/H</span>
          <span className="flex items-center gap-1 text-[#aff833]">
            LOBBY EAST
            <span className="material-symbols-outlined text-[14px]">east</span>
          </span>
        </div>

        {/* Parking Floor Visual Canvas */}
        <div className="relative bg-[#0b0e13] rounded-2xl p-3 overflow-hidden shadow-2xl border border-white/10">
          {/* Ambient Lane Glow */}
          <div className="absolute inset-x-1/2 -translate-x-1/2 top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-[#00e5ff]/[0.05] to-transparent pointer-events-none" />

          {/* Driveway Center striping */}
          <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-8 flex flex-col items-center justify-around pointer-events-none opacity-40">
            <span className="material-symbols-outlined text-[#00e5ff] text-[18px]">keyboard_double_arrow_up</span>
            <div className="w-0.5 h-6 bg-[#32353b]" />
            <span className="text-[9px] tracking-widest text-[#bac9cc] -rotate-90 py-4 uppercase font-bold select-none">
              Driveway
            </span>
            <div className="w-0.5 h-6 bg-[#32353b]" />
            <span className="material-symbols-outlined text-[#00e5ff] text-[18px]">keyboard_double_arrow_up</span>
          </div>

          {/* Left & Right Stalls Columns */}
          <div className="grid grid-cols-2 gap-6 relative z-10">
            {/* Left Wing Stalls */}
            <div className="flex flex-col gap-2.5">
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

            {/* Right Wing Stalls */}
            <div className="flex flex-col gap-2.5">
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
      </main>

      {/* Selected Slot Summary & Continue Action (Integrated naturally at the bottom after all slots) */}
      <section className="w-full bg-[#101319] border-t border-[#272a30]/80 px-4 pt-5 pb-10 mt-6 shadow-2xl">
        <div className="max-w-md mx-auto flex flex-col gap-3">
          {/* Top Row: Slot Info & Amenities */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-11 h-11 rounded-full bg-[#00e5ff] text-[#001f24] flex items-center justify-center font-black text-base shadow-md shadow-[#00e5ff]/20">
                {selectedSlot.code}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm text-[#e1e2ea]">
                    Slot {selectedSlot.code} • Level {selectedSlot.level}
                  </h3>
                  {selectedSlot.type === 'ev' && (
                    <span className="px-2 py-0.5 rounded-full bg-[#00e5ff]/20 text-[#00e5ff] text-[10px] font-extrabold uppercase">
                      ⚡ EV EQUIPPED
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#bac9cc] flex items-center gap-1 mt-0.5">
                  <span className="material-symbols-outlined text-[#00e5ff] text-[14px]">elevator</span>
                  {selectedSlot.distanceToLift || '15m from Lift Lobby • Covered Pillar Spot'}
                </p>
              </div>
            </div>
          </div>

          {/* Center Metric: Stepper Pill & Breakdown */}
          <div className="flex items-center justify-between bg-[#191c21] p-2.5 rounded-xl border border-white/5">
            <div className="flex flex-col">
              <span className="text-[10px] text-[#bac9cc] uppercase font-bold tracking-wider">PARKING DURATION</span>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center bg-[#1d2025] rounded-full p-0.5 border border-white/5">
                  <button
                    type="button"
                    aria-label="Decrease Duration"
                    onClick={() => {
                      if (durationHours > 1) onUpdateDuration(durationHours - 1);
                    }}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[#e1e2ea] hover:bg-[#272a30] transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">remove</span>
                  </button>
                  <span className="px-3 text-xs font-bold text-[#c3f5ff]">
                    {durationHours} {durationHours === 1 ? 'Hour' : 'Hours'}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase Duration"
                    onClick={() => {
                      if (durationHours < 12) onUpdateDuration(durationHours + 1);
                    }}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[#e1e2ea] hover:bg-[#272a30] transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">add</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="text-right flex flex-col justify-center">
              <span className="text-[10px] text-[#bac9cc] uppercase font-bold tracking-wider">TOTAL ESTIMATE</span>
              <span className="text-xl text-[#aff833] font-black">₹{totalCost}</span>
              <span className="text-[10px] text-[#bac9cc]">
                ₹{selectedSlot.ratePerHour} × {durationHours} {durationHours === 1 ? 'hr' : 'hrs'}
              </span>
            </div>
          </div>

          {/* Primary Action CTA */}
          <button
            type="button"
            onClick={() => onNavigate('booking-confirmation')}
            className="w-full h-13 rounded-full bg-[#00e5ff] text-[#001f24] font-extrabold text-sm flex items-center justify-center gap-2 shadow-[0_4px_24px_rgba(0,229,255,0.35)] active:scale-[0.98] transition-all hover:brightness-110 cursor-pointer"
          >
            <span>Continue to Booking (₹{totalCost})</span>
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>

          {/* Trust & Hold Assurance */}
          <div className="flex items-center justify-center gap-1.5 pt-0.5">
            <span className="material-symbols-outlined text-[#aff833] text-[14px]">timer</span>
            <p className="text-[11px] text-[#bac9cc]">
              Slot {selectedSlot.code} held for <span className="text-[#aff833] font-bold">10:00 mins</span> upon clicking Continue
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
