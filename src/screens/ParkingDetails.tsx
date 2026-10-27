import React, { useState } from 'react';
import { ScreenId } from '../types.ts';
import { PALACE_FACILITY } from '../data/mockData.ts';

interface ParkingDetailsProps {
  onNavigate: (screen: ScreenId) => void;
  availableCount: number;
}

export const ParkingDetails: React.FC<ParkingDetailsProps> = ({ onNavigate, availableCount }) => {
  const [bookmarked, setBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#101319] text-[#e1e2ea] relative pb-10">
      {/* Top Header */}
      <header className="sticky top-0 w-full z-40 bg-[#0b0e13]/85 backdrop-blur-xl border-b border-white/5">
        <div className="h-16 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Back to Map"
              onClick={() => onNavigate('journey')}
              className="w-11 h-11 rounded-full flex items-center justify-center bg-[#191c21] hover:bg-[#1d2025] text-[#e1e2ea] transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
            <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => onNavigate('journey')}>
              <div className="w-7 h-7 rounded-lg bg-[#00e5ff] flex items-center justify-center text-[#001f24] font-black text-xs">
                IQ
              </div>
              <h1 className="font-bold text-base text-[#e1e2ea]">Spot Details</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Share Spot"
              onClick={handleShare}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-[#191c21] hover:bg-[#1d2025] text-[#e1e2ea] border border-white/5 transition-colors relative"
            >
              <span className="material-symbols-outlined text-[18px]">share</span>
              {copied && (
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-[#00e5ff] text-[#001f24] text-[9px] font-bold">
                  Copied!
                </span>
              )}
            </button>
            <button
              type="button"
              aria-label="Bookmark"
              onClick={() => setBookmarked(!bookmarked)}
              className={`w-10 h-10 rounded-full flex items-center justify-center border transition-colors ${
                bookmarked
                  ? 'bg-[#00e5ff] text-[#001f24] border-[#00e5ff]'
                  : 'bg-[#191c21] hover:bg-[#1d2025] text-[#e1e2ea] border-white/5'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {bookmarked ? 'bookmark_added' : 'bookmark_border'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="flex-1 flex flex-col p-4 gap-4">
        {/* Navigation Quick Breadcrumb */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => onNavigate('journey')}
            className="flex items-center gap-1 text-xs text-[#00e5ff] font-semibold hover:underline"
          >
            <span className="material-symbols-outlined text-[14px]">arrow_back</span>
            Back to Discover & Map
          </button>
          <span className="text-[10px] text-[#aff833] font-extrabold uppercase tracking-wider flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#aff833] animate-pulse" />
            Live Sensors Synced
          </span>
        </div>

        {/* Facility Hero Banner with Real Google Map */}
        <div className="relative rounded-3xl overflow-hidden bg-[#191c21] border border-white/10 shadow-2xl">
          {/* Real Google Map Embed */}
          <div className="relative h-52 w-full overflow-hidden bg-[#080B10]">
            <iframe
              title="Google Map Palace South Gate MLCP"
              src="https://maps.google.com/maps?q=12.3051,76.6551+(Palace+South+Gate+MLCP)&t=m&z=16&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0 brightness-[0.88] contrast-[1.1]"
              loading="lazy"
            />
            <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#080B10]/90 backdrop-blur-md border border-white/10 text-xs">
              <span className="w-2 h-2 rounded-full bg-[#aff833] animate-ping" />
              <span className="text-[#aff833] font-bold">Open 24/7</span>
              <span className="text-[#849396]">•</span>
              <span className="text-[#e1e2ea]">Google Maps Live</span>
            </div>
            <button
              type="button"
              onClick={() => window.open('https://www.google.com/maps/dir/?api=1&destination=12.3051,76.6551&travelmode=driving', '_blank')}
              className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#00e5ff] text-[#001f24] font-black text-xs shadow-md shadow-[#00e5ff]/30 flex items-center gap-1 active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px]">directions</span>
              <span>Navigate</span>
            </button>
          </div>

          {/* Venue Info Showcase */}
          <div className="p-4 -mt-6 relative z-10 bg-[#191c21] rounded-t-3xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-black text-[#e1e2ea] tracking-tight">{PALACE_FACILITY.name}</h2>
                <p className="text-xs text-[#bac9cc] mt-1 flex items-start gap-1">
                  <span className="material-symbols-outlined text-[#00e5ff] text-[16px] shrink-0 mt-0.5">location_on</span>
                  <span>{PALACE_FACILITY.address}</span>
                </p>
              </div>
            </div>

            {/* Quick Stats Ribbon (3-Column) */}
            <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-white/5">
              <div className="bg-[#1d2025] p-2.5 rounded-xl flex flex-col items-center justify-center text-center">
                <span className="material-symbols-outlined text-[#00e5ff] text-[18px]">payments</span>
                <span className="text-sm font-extrabold text-[#e1e2ea] mt-1">₹30/hr</span>
                <span className="text-[10px] text-[#849396]">First 3 hrs flat</span>
              </div>
              <div className="bg-[#1d2025] p-2.5 rounded-xl flex flex-col items-center justify-center text-center">
                <span className="material-symbols-outlined text-[#aff833] text-[18px]">directions_walk</span>
                <span className="text-sm font-extrabold text-[#e1e2ea] mt-1">180m</span>
                <span className="text-[10px] text-[#849396]">3 min walk to gate</span>
              </div>
              <div className="bg-[#1d2025] p-2.5 rounded-xl flex flex-col items-center justify-center text-center">
                <span className="material-symbols-outlined text-[#00e5ff] text-[18px]">height</span>
                <span className="text-sm font-extrabold text-[#e1e2ea] mt-1">2.4m Max</span>
                <span className="text-[10px] text-[#849396]">Multi-level covered</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Level Telemetry */}
        <section className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-[#e1e2ea] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#00e5ff] text-[18px]">layers</span>
              Live Level Telemetry
            </h3>
            <span className="text-[10px] text-[#bac9cc]">Real-Time Ultrasonic Sensors</span>
          </div>

          <div className="flex flex-col gap-2">
            {PALACE_FACILITY.levels.map((lvl) => {
              const occupancyPct = Math.round(((lvl.total - lvl.available) / lvl.total) * 100);
              return (
                <div
                  key={lvl.levelKey}
                  onClick={() => onNavigate('slot-select')}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col gap-2 ${
                    lvl.recommended
                      ? 'bg-[#1d2025] border-[#00e5ff]/40 shadow-[0_0_16px_rgba(0,229,255,0.15)] hover:border-[#00e5ff]'
                      : lvl.isFull
                      ? 'bg-[#191c21] border-[#ff5964]/20 opacity-70'
                      : 'bg-[#191c21] border-white/5 hover:border-white/15'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black ${
                          lvl.recommended ? 'bg-[#00e5ff] text-[#001f24]' : 'bg-[#272a30] text-[#e1e2ea]'
                        }`}
                      >
                        {lvl.levelKey}
                      </span>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-bold text-xs text-[#e1e2ea]">{lvl.name}</h4>
                          {lvl.recommended && (
                            <span className="px-1.5 py-0.2 rounded-full bg-[#00e5ff]/20 text-[#00e5ff] text-[9px] font-extrabold">
                              RECOMMENDED
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-[#849396]">{lvl.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {lvl.isFull ? (
                        <span className="px-2 py-0.5 rounded-full bg-[#ff5964]/15 text-[#ff5964] text-[10px] font-black uppercase">
                          FULL
                        </span>
                      ) : (
                        <span className="text-xs font-black text-[#aff833]">
                          {lvl.levelKey === 'B2' ? availableCount + 21 : lvl.available} / {lvl.total} spots
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Level Occupancy Bar */}
                  <div className="w-full h-1.5 rounded-full bg-[#101319] overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        lvl.isFull ? 'bg-[#ff5964]' : lvl.recommended ? 'bg-[#aff833]' : 'bg-[#00e5ff]'
                      }`}
                      style={{ width: `${occupancyPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Facility Photo Gallery */}
        <section className="flex flex-col gap-2">
          <h3 className="font-extrabold text-sm uppercase tracking-wider text-[#e1e2ea] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#00e5ff] text-[18px]">photo_library</span>
            Facility Gallery
          </h3>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="relative rounded-xl overflow-hidden aspect-video bg-[#191c21] border border-white/5">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6oG4Bd0gksdAbjTapytMoFwC0hftuAqaS_eZXGI-Eio9XhNFgl7vv8FYWr0T0UuNn8SaTxFvawwniNz2mGRv1UEPQiEZnO-8Juxh4dYiiPInIgR5cuuiyBo28hLfdsMeGttqAnk8Kmt1mnGi-YzIAAJ4RdI4lcFCxCCM8bmP1vh_K6wVX7Htzt0rVXT50fEPJ60m8wsEC-I45c6_RiQZxhE_HN7rEM4Abh1NWsyUji7-K9KRj-6GaOA"
                alt="Indoor Garage Bay"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-md bg-[#080B10]/80 text-[10px] font-semibold text-[#e1e2ea]">
                Covered Decks
              </span>
            </div>
            <div className="relative rounded-xl overflow-hidden aspect-video bg-[#191c21] border border-white/5">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3c3HAdj8SA3OFT3ERLsXBMbFIjKwgmvd7MFMY-jVZ19k4MS6-yXyzIIkP8lp8DiKntdUy4nULXe3FD3hq6nOr97z18RylKua270HGcRH6XdOQ0FZ2nQp3PZSfgbDtgjysYpDlgk8-0P5RlXuVqDmqAx0EMprSboMeHuu31AslFSlT6v8XAygRBcxH0TOZs7SIwTNu8lNulkVX9p_9opnUguqwRQqfS0ntN2Faf_Cgq_KPSaouhwiVOQ"
                alt="EV Chargers"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-md bg-[#080B10]/80 text-[10px] font-semibold text-[#00e5ff]">
                6x EV Hub
              </span>
            </div>
          </div>
        </section>

        {/* Amenities & Security */}
        <section className="p-4 rounded-2xl bg-[#191c21] border border-white/5 flex flex-col gap-3">
          <h3 className="font-extrabold text-sm uppercase tracking-wider text-[#e1e2ea]">Key Amenities & Protocols</h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {PALACE_FACILITY.amenities.map((amenity, i) => (
              <div key={i} className="flex items-center gap-1.5 text-[#bac9cc]">
                <span className="material-symbols-outlined text-[#aff833] text-[16px]">check_circle</span>
                <span className="truncate">{amenity}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Fast Entry Guidelines */}
        <div className="p-3.5 rounded-2xl bg-[#00e5ff]/10 border border-[#00e5ff]/20 flex items-start gap-3">
          <span className="material-symbols-outlined text-[#00e5ff] text-[22px] shrink-0">speed</span>
          <div className="text-xs">
            <h4 className="font-bold text-[#00e5ff]">Contactless Boom Barrier Entry</h4>
            <p className="text-[#bac9cc] mt-0.5 leading-relaxed">
              License plate cameras (ANPR) scan automatically on arrival. Or present digital QR Fast-Pass on your mobile screen.
            </p>
          </div>
        </div>

        {/* Standard Rate & Choose Slot CTA (Integrated naturally at the bottom, one under the other) */}
        <section className="mt-2 p-4 rounded-2xl bg-[#191c21] border border-[#00e5ff]/30 shadow-xl flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] text-[#849396] uppercase font-bold tracking-wider">STANDARD RATE</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-[#00e5ff]">₹30</span>
                <span className="text-xs text-[#bac9cc]">/ hour</span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-[#aff833]/15 text-[#aff833] text-[10px] font-bold border border-[#aff833]/30">
              Level B2 Recommended
            </span>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('slot-select')}
            className="w-full h-12 rounded-full bg-[#00e5ff] text-[#001f24] font-extrabold text-sm flex items-center justify-center gap-2 shadow-[0_4px_24px_rgba(0,229,255,0.4)] active:scale-[0.98] transition-all hover:brightness-110 cursor-pointer"
          >
            <span>Choose a Parking Slot</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </section>
      </main>
    </div>
  );
};
