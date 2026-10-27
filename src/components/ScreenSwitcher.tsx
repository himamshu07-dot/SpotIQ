import React, { useState } from 'react';
import { ScreenId } from '../types.ts';

interface ScreenSwitcherProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  onSimulateSensorChange?: () => void;
  availableCount: number;
  totalCount: number;
}

const SCREENS: { id: ScreenId; label: string; number: number; icon: string; category?: string }[] = [
  { id: 'auth-driver', label: '1. Driver Mobile Sign In', number: 1, icon: 'directions_car', category: 'Auth' },
  { id: 'auth-renter', label: '2. Space Host Sign In', number: 2, icon: 'garage', category: 'Auth' },
  { id: 'journey', label: '3. Connected Journey Map', number: 3, icon: 'map', category: 'Driver' },
  { id: 'slot-select', label: '4. Select Parking Slot', number: 4, icon: 'grid_view', category: 'Driver' },
  { id: 'parking-details', label: '5. Parking Facility Details', number: 5, icon: 'info', category: 'Driver' },
  { id: 'booking-confirmation', label: '6. Booking Confirmation & Pay', number: 6, icon: 'receipt_long', category: 'Driver' },
  { id: 'active-journey', label: '7. Active Parking Journey / FastPass', number: 7, icon: 'navigation', category: 'Driver' },
  { id: 'my-bookings', label: '8. My Bookings & Passes', number: 8, icon: 'confirmation_number', category: 'Driver' },
  { id: 'renter-dashboard', label: '9. Space Host (Renter) Portal', number: 9, icon: 'domain', category: 'Renter' },
  { id: 'driver-companion', label: '10. Unified Driver Companion', number: 10, icon: 'electric_bolt', category: 'Driver' },
  { id: 'mobile-auth-showcase', label: '11. Showcase Trio (Web Mockup)', number: 11, icon: 'smartphone', category: 'Web Mockup' },
  { id: 'prototype-reel', label: '12. Interactive Prototype Reel', number: 12, icon: 'hub', category: 'Reel' },
];

export const ScreenSwitcher: React.FC<ScreenSwitcherProps> = ({
  currentScreen,
  onNavigate,
  onSimulateSensorChange,
  availableCount,
  totalCount,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentItem = SCREENS.find((s) => s.id === currentScreen) || SCREENS[0];

  return (
    <>
      {/* 1. DESKTOP VIEW: Persistent Top Banner Bar */}
      <div className="hidden sm:block w-full z-50 bg-[#080B10] border-b border-[#272a30] text-xs">
        <div className="px-3 py-1.5 flex items-center justify-between gap-2 bg-[#101319]/90 backdrop-blur-md">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="w-2 h-2 rounded-full bg-[#aff833] animate-pulse shrink-0" />
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#191c21] hover:bg-[#272a30] text-[#e1e2ea] border border-white/10 transition-colors font-medium truncate cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-[#00e5ff]">{currentItem.icon}</span>
              <span className="truncate font-semibold">{currentItem.label}</span>
              <span className="material-symbols-outlined text-[14px] text-[#849396]">
                {isOpen ? 'expand_less' : 'expand_more'}
              </span>
            </button>
          </div>

          {/* Real-time Indicator Telemetry + Sensor Simulator */}
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#191c21] border border-white/5">
              <span className="w-2 h-2 rounded-full bg-[#aff833] shadow-[0_0_6px_#aff833]" />
              <span className="text-[#aff833] font-bold text-[11px]">{availableCount}</span>
              <span className="text-[#849396] text-[10px]">/ {totalCount} free</span>
            </div>

            {onSimulateSensorChange && (
              <button
                type="button"
                onClick={onSimulateSensorChange}
                title="Simulate Real-Time Ultrasonic Sensor updates in Mysuru Palace MLCP"
                className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#aff833]/15 text-[#aff833] hover:bg-[#aff833]/25 border border-[#aff833]/30 transition-all font-semibold active:scale-95 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[14px] animate-spin">sensors</span>
                <span className="text-[10px] uppercase font-bold tracking-wider">Simulate Sensor</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="px-2 py-1 rounded-md bg-[#272a30] text-[#00e5ff] font-semibold text-[11px] hover:bg-[#32353b] cursor-pointer"
            >
              {isOpen ? 'Close' : 'All Screens (12)'}
            </button>
          </div>
        </div>
      </div>

      {/* 2. MOBILE VIEW: Floating Quick Navigator Pill (Unobtrusive & Clean like Ola/Uber) */}
      <div className="sm:hidden fixed top-3 right-3 z-50 flex items-center gap-1.5 pointer-events-auto">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#101319]/90 border border-white/15 text-white shadow-xl backdrop-blur-xl text-xs active:scale-95 transition-all"
        >
          <span className="w-2 h-2 rounded-full bg-[#aff833] animate-pulse" />
          <span className="text-[11px] font-bold text-[#00e5ff]">{currentItem.number}/12</span>
          <span className="material-symbols-outlined text-[14px] text-white/60">grid_view</span>
        </button>
      </div>

      {/* 3. MODAL / DRAWER: Expanded Screen Switcher Tray */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex flex-col justify-end sm:justify-start sm:relative sm:bg-transparent sm:backdrop-blur-none"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-h-[85vh] sm:max-h-none overflow-y-auto bg-[#0b0e13] border-t sm:border-b border-[#272a30] p-4 sm:p-3 shadow-2xl rounded-t-3xl sm:rounded-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Drawer Handle and Header */}
            <div className="flex sm:hidden items-center justify-between pb-3 mb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#aff833] shadow-[0_0_8px_#aff833]" />
                <span className="font-extrabold text-sm text-white">SpotIQ Screen Navigator</span>
              </div>
              <div className="flex items-center gap-2">
                {onSimulateSensorChange && (
                  <button
                    type="button"
                    onClick={onSimulateSensorChange}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#aff833]/20 text-[#aff833] text-[11px] font-bold border border-[#aff833]/40"
                  >
                    <span className="material-symbols-outlined text-[13px]">sensors</span>
                    <span>IoT Pulse</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#191c21] flex items-center justify-center text-white"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>
            </div>

            {/* Screen Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {SCREENS.map((screen) => {
                const isActive = screen.id === currentScreen;
                return (
                  <button
                    key={screen.id}
                    type="button"
                    onClick={() => {
                      onNavigate(screen.id);
                      setIsOpen(false);
                    }}
                    className={`flex items-center gap-2 p-2.5 rounded-xl text-left transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#00e5ff]/20 border border-[#00e5ff] text-[#00e5ff] shadow-[0_0_14px_rgba(0,229,255,0.3)]'
                        : 'bg-[#191c21] hover:bg-[#272a30] border border-white/5 text-[#bac9cc] hover:text-[#e1e2ea]'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                        isActive ? 'bg-[#00e5ff] text-[#001f24] font-bold' : 'bg-[#272a30] text-[#bac9cc]'
                      }`}
                    >
                      <span className="text-[11px] font-bold">{screen.number}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-[11px] truncate">{screen.label.replace(/^\d+\.\s*/, '')}</p>
                      <span className="text-[9px] text-[#849396] uppercase">{screen.id}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
