import React, { useState } from 'react';
import { ScreenId } from '../types.ts';
import { ParkingSlot } from '../utils/parkingRules.ts';

interface ConnectedJourneyFlowProps {
  onNavigate: (screen: ScreenId) => void;
  slots: ParkingSlot[];
  availableSlotsCount: number;
}

interface ParkingFacility {
  id: string;
  name: string;
  shortName: string;
  address: string;
  ratePerHour: number;
  availableCount: number;
  totalCount: number;
  walkDistance: string;
  walkTime: string;
  lat: number;
  lng: number;
  status: 'selected' | 'available' | 'full';
  amenities: string[];
}

export const ConnectedJourneyFlow: React.FC<ConnectedJourneyFlowProps> = ({
  onNavigate,
  availableSlotsCount,
}) => {
  const [activeFilter, setActiveFilter] = useState<'closest' | 'ev' | 'covered' | 'lowest'>('closest');
  const [searchQuery, setSearchQuery] = useState('Mysore Palace East Gate');
  const [selectedFacilityId, setSelectedFacilityId] = useState<string>('palace-mlcp');
  const [mapLayer, setMapLayer] = useState<'m' | 'k'>('m'); // 'm' = Roadmap, 'k' = Satellite
  const [zoomLevel, setZoomLevel] = useState<number>(16);
  const [isNavigatingLive, setIsNavigatingLive] = useState<boolean>(false);
  const [gpsToast, setGpsToast] = useState<string | null>(null);

  // List of real Mysuru Smart City Parking Facilities with real GPS coordinates
  const facilities: ParkingFacility[] = [
    {
      id: 'palace-mlcp',
      name: 'Palace South Gate MLCP',
      shortName: 'Palace MLCP',
      address: 'Bangalore-Nilgiri Rd, Agrahara, Chamrajpura, Mysuru',
      ratePerHour: 30,
      availableCount: availableSlotsCount + 33,
      totalCount: 120,
      walkDistance: '180m',
      walkTime: '3 min walk',
      lat: 12.3051,
      lng: 76.6551,
      status: 'selected',
      amenities: ['Covered Multi-Level', '4x 60kW DC Fast EV', '24/7 CCTV & Valet'],
    },
    {
      id: 'devaraja-underground',
      name: 'Devaraja Market Underground Bay',
      shortName: 'Devaraja Bay',
      address: 'Sayyaji Rao Rd, Devaraja Mohalla, Mysuru',
      ratePerHour: 20,
      availableCount: 14,
      totalCount: 50,
      walkDistance: '420m',
      walkTime: '6 min walk',
      lat: 12.3094,
      lng: 76.6515,
      status: 'available',
      amenities: ['Underground Secure', 'CCTV Monitored', 'Two-Wheeler Zone'],
    },
    {
      id: 'suburban-bus-stand',
      name: 'Suburban Bus Stand Bay Plaza',
      shortName: 'Suburban Plaza',
      address: 'Bangalore-Nilgiri Rd, Lashkar Mohalla, Mysuru',
      ratePerHour: 40,
      availableCount: 22,
      totalCount: 80,
      walkDistance: '550m',
      walkTime: '8 min walk',
      lat: 12.3115,
      lng: 76.6578,
      status: 'available',
      amenities: ['Transit Hub Ingress', 'FASTag Enabled', 'Car Wash Bay'],
    },
    {
      id: 'chamundi-ingress',
      name: 'Chamundi Hill Foot Ingress',
      shortName: 'Chamundi Bay',
      address: 'Chamundi Hill Rd, Siddhartha Layout, Mysuru',
      ratePerHour: 25,
      availableCount: 0,
      totalCount: 60,
      walkDistance: '1.2km',
      walkTime: '15 min walk',
      lat: 12.2980,
      lng: 76.6660,
      status: 'full',
      amenities: ['Open Lot', 'Tourist Shuttle Hub', 'EV Charging Spot'],
    },
  ];

  const activeFacility = facilities.find((f) => f.id === selectedFacilityId) || facilities[0];

  // Real Google Maps Live Embed URL
  const googleMapsEmbedUrl = `https://maps.google.com/maps?q=${activeFacility.lat},${activeFacility.lng}+(${encodeURIComponent(
    activeFacility.name
  )})&t=${mapLayer}&z=${zoomLevel}&ie=UTF8&iwloc=&output=embed`;

  // Start Real Google Maps Turn-by-Turn GPS Navigation
  const handleStartGoogleMapsNavigation = (facility: ParkingFacility) => {
    setIsNavigatingLive(true);
    setGpsToast(`Launching Google Maps GPS to ${facility.name}...`);

    // Universal Google Maps Driving Navigation Link
    // Opens native Google Maps app on Android / iOS with voice guidance, or desktop directions tab
    const gmapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${facility.lat},${facility.lng}&travelmode=driving`;
    window.open(gmapsUrl, '_blank', 'noopener,noreferrer');

    setTimeout(() => {
      setGpsToast(null);
    }, 4000);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // Search facility match or open map query
    const queryLower = searchQuery.toLowerCase();
    const match = facilities.find(
      (f) =>
        f.name.toLowerCase().includes(queryLower) ||
        f.shortName.toLowerCase().includes(queryLower) ||
        f.address.toLowerCase().includes(queryLower)
    );

    if (match) {
      setSelectedFacilityId(match.id);
      setGpsToast(`Located: ${match.name}`);
    } else {
      setSelectedFacilityId('palace-mlcp');
      setGpsToast(`Searching Google Maps for "${searchQuery}" in Mysuru...`);
    }

    setTimeout(() => setGpsToast(null), 3000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#080B10] text-[#e1e2ea] relative pb-20">
      {/* Toast Notification */}
      {gpsToast && (
        <div className="fixed top-16 left-4 right-4 max-w-md mx-auto z-50 p-3 rounded-2xl bg-[#001f24]/95 text-[#00e5ff] border border-[#00e5ff]/50 shadow-2xl backdrop-blur-xl flex items-center justify-between text-xs font-bold animate-slide-down">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-[#00e5ff] animate-spin">navigation</span>
            <span>{gpsToast}</span>
          </div>
          <button type="button" onClick={() => setGpsToast(null)} className="opacity-70 p-1">
            ✕
          </button>
        </div>
      )}

      {/* Fixed Header */}
      <header className="sticky top-0 w-full z-40 bg-[#080B10]/95 backdrop-blur-xl border-b border-[#272a30]/60 shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
        <div className="h-16 px-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex items-center gap-1.5 cursor-pointer shrink-0" onClick={() => onNavigate('journey')}>
              <div className="w-8 h-8 rounded-xl bg-[#00e5ff] flex items-center justify-center text-[#001f24] font-black text-sm shadow-[0_0_12px_rgba(0,229,255,0.4)]">
                IQ
              </div>
              <span className="font-extrabold text-base tracking-tight text-[#e1e2ea]">SpotIQ</span>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('parking-details')}
              className="flex items-center gap-1 min-h-[38px] px-2.5 py-1 rounded-full bg-[#191c21] hover:bg-[#1d2025] transition-colors text-left border border-white/5 truncate"
            >
              <span className="material-symbols-outlined text-[#00e5ff] text-[17px] shrink-0">near_me</span>
              <div className="flex flex-col min-w-0">
                <span className="text-[9px] text-[#bac9cc] uppercase tracking-wider font-bold truncate">Palace Hub</span>
                <span className="text-[12px] text-[#e1e2ea] font-semibold flex items-center gap-0.5 leading-tight truncate">
                  Mysuru, KA
                  <span className="material-symbols-outlined text-[14px] text-[#bac9cc]">keyboard_arrow_down</span>
                </span>
              </div>
            </button>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              aria-label="Notifications"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-[#191c21] hover:bg-[#1d2025] text-[#e1e2ea] transition-colors relative border border-white/5"
            >
              <span className="material-symbols-outlined text-[19px]">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#aff833] ring-2 ring-[#080B10]" />
            </button>
            <button
              type="button"
              aria-label="User Profile"
              onClick={() => onNavigate('auth-driver')}
              title="Driver Account / Sign In"
              className="w-9 h-9 p-0.5 rounded-full flex items-center justify-center focus:outline-none hover:opacity-90 transition-opacity"
            >
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-[#00e5ff]/50"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGRvsXIOJDp9oMBinPRaixXzHoRoqvLlDWpVZaGVVMADqRr-5vz_r82-reMEib9yUk2-4rT1nm6hbCRc1wb53Rz0hFcOf7yE4RCEPC_rxo9cHpK1YFjqH0P67Uu6BMD5SMo2vPADXeL7Kl7h0jcdlswANDcMh0axJAwekG6K47JBGz-Ghj93w4E-EC_elrw7Jh3bYvhR6EJpl3zXQuNFIqvh6LZlQx34b8kQWDwUjFU1dh0yGF4Ydf5w"
              />
            </button>
          </div>
        </div>

        {/* Stepper Switcher Bar */}
        <div className="w-full bg-[#080B10]/95 backdrop-blur-md px-3 py-2 border-b border-[#272a30]/40 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 min-w-max">
            <button
              type="button"
              onClick={() => onNavigate('journey')}
              className="px-3 py-1.5 rounded-full text-[11px] font-bold flex items-center gap-1.5 transition-all bg-[#00e5ff] text-[#001f24] shadow-[0_0_12px_rgba(0,229,255,0.45)]"
            >
              <span className="w-4 h-4 rounded-full bg-[#080B10] text-[#00e5ff] flex items-center justify-center text-[10px] font-extrabold">1</span>
              <span>Discover & Map</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('parking-details')}
              className="px-3 py-1.5 rounded-full text-[11px] font-semibold flex items-center gap-1.5 transition-all bg-[#191c21] text-[#bac9cc] hover:text-[#e1e2ea] border border-white/5"
            >
              <span className="w-4 h-4 rounded-full bg-[#272a30] text-[#bac9cc] flex items-center justify-center text-[10px]">2</span>
              <span>Spot Details</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('slot-select')}
              className="px-3 py-1.5 rounded-full text-[11px] font-semibold flex items-center gap-1.5 transition-all bg-[#191c21] text-[#bac9cc] hover:text-[#e1e2ea] border border-white/5"
            >
              <span className="w-4 h-4 rounded-full bg-[#272a30] text-[#bac9cc] flex items-center justify-center text-[10px]">3</span>
              <span>Slot B04</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('booking-confirmation')}
              className="px-3 py-1.5 rounded-full text-[11px] font-semibold flex items-center gap-1.5 transition-all bg-[#191c21] text-[#bac9cc] hover:text-[#e1e2ea] border border-white/5"
            >
              <span className="w-4 h-4 rounded-full bg-[#272a30] text-[#bac9cc] flex items-center justify-center text-[10px]">4</span>
              <span>Confirm & Pay</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('active-journey')}
              className="px-3 py-1.5 rounded-full text-[11px] font-semibold flex items-center gap-1.5 transition-all bg-[#191c21] text-[#bac9cc] hover:text-[#e1e2ea] border border-white/5"
            >
              <span className="w-4 h-4 rounded-full bg-[#272a30] text-[#bac9cc] flex items-center justify-center text-[10px]">5</span>
              <span>Fast-Pass</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('my-bookings')}
              className="px-3 py-1.5 rounded-full text-[11px] font-semibold flex items-center gap-1.5 transition-all bg-[#191c21] text-[#bac9cc] hover:text-[#e1e2ea] border border-white/5"
            >
              <span className="w-4 h-4 rounded-full bg-[#272a30] text-[#bac9cc] flex items-center justify-center text-[10px]">6</span>
              <span>Bookings</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative w-full">
        {/* Top Search & Filter Bar */}
        <div className="px-4 pt-3 pb-2 w-full z-20 flex flex-col gap-2">
          {/* Interactive Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="w-full bg-[#272a30]/95 backdrop-blur-xl rounded-full shadow-[0_12px_32px_rgba(0,0,0,0.65)] p-1.5 flex items-center justify-between border border-white/10"
          >
            <div className="flex items-center gap-2 pl-2 flex-1 min-w-0">
              <span
                className="material-symbols-outlined text-[#00e5ff] text-[22px] shrink-0"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                search
              </span>
              <div className="flex flex-col min-w-0 flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Where to park in Mysuru?"
                  className="bg-transparent text-[#e1e2ea] text-sm font-semibold placeholder:text-[#849396] focus:outline-none w-full truncate"
                />
                <div className="flex items-center gap-1 text-[#bac9cc] text-[10px] uppercase font-bold tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#aff833] shrink-0 animate-ping" />
                  <span className="truncate">Mysuru Smart City Live Grid • Google Maps</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0 pr-1">
              <button
                type="submit"
                aria-label="Search destination"
                className="w-9 h-9 rounded-full bg-[#00e5ff] text-[#001f24] flex items-center justify-center shadow-[0_0_14px_rgba(0,229,255,0.4)] active:scale-95 transition-transform font-bold"
              >
                <span className="material-symbols-outlined text-[19px]">navigation</span>
              </button>
            </div>
          </form>

          {/* Quick Location Indicator Pill */}
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#191c21]/90 backdrop-blur-md shadow-md border border-white/5">
              <span className="material-symbols-outlined text-[#aff833] text-[16px]">fmd_good</span>
              <span className="text-xs font-semibold text-[#e1e2ea]">{activeFacility.name}</span>
              <span className="text-[#849396] text-[10px]">•</span>
              <span className="text-[10px] text-[#aff833] font-bold uppercase">GPS Active</span>
            </div>
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#080B10]/90 backdrop-blur-md shadow-sm border border-[#aff833]/30">
              <span className="w-2 h-2 rounded-full bg-[#aff833] animate-pulse" />
              <span className="text-[10px] text-[#aff833] font-extrabold uppercase tracking-wider">
                {activeFacility.availableCount} SPOTS OPEN
              </span>
            </div>
          </div>
        </div>

        {/* Live Turn-by-Turn GPS HUD Banner (Active during navigation) */}
        {isNavigatingLive && (
          <div className="mx-4 mb-2 p-3 rounded-2xl bg-[#001f24] border border-[#00e5ff]/50 shadow-[0_0_24px_rgba(0,229,255,0.3)] flex items-center justify-between z-30 animate-slide-down">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-[#00e5ff] text-[#001f24] flex items-center justify-center font-bold shrink-0 shadow-md">
                <span className="material-symbols-outlined text-[24px]">turn_left</span>
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-extrabold text-[#00e5ff] truncate">
                  In 50m, Turn Left onto Palace South Gate
                </p>
                <p className="text-[10px] text-[#bac9cc] flex items-center gap-1">
                  <span>{activeFacility.walkDistance} • 2 mins</span>
                  <span>•</span>
                  <span className="text-[#aff833] font-semibold">Speed 25 km/h</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => handleStartGoogleMapsNavigation(activeFacility)}
                title="Open in native Google Maps"
                className="px-2.5 py-1.5 rounded-xl bg-[#00e5ff]/20 text-[#00e5ff] hover:bg-[#00e5ff]/30 text-[10px] font-bold border border-[#00e5ff]/40 flex items-center gap-1"
              >
                <span>Google Maps</span>
                <span className="material-symbols-outlined text-[13px]">open_in_new</span>
              </button>
              <button
                type="button"
                onClick={() => setIsNavigatingLive(false)}
                className="w-7 h-7 rounded-full bg-black/40 text-white/70 hover:text-white flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* REAL GOOGLE MAP CANVAS */}
        <div className="relative w-full h-[380px] -mt-1 overflow-hidden bg-[#080B10]">
          {/* Real Google Map Live Iframe */}
          <iframe
            title="Google Maps - Mysuru Smart Parking"
            src={googleMapsEmbedUrl}
            className="w-full h-full border-0 brightness-[0.9] contrast-[1.1]"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />

          {/* Floating Map Floating Tools (Top Right) */}
          <div className="absolute right-3 top-3 flex flex-col gap-2 z-20">
            {/* Recenter GPS */}
            <button
              type="button"
              onClick={() => {
                setSelectedFacilityId('palace-mlcp');
                setZoomLevel(16);
                setGpsToast('Centered on Mysore Palace South Gate MLCP');
                setTimeout(() => setGpsToast(null), 2500);
              }}
              title="Recenter Map to Palace MLCP"
              className="w-10 h-10 rounded-full bg-[#101319]/90 backdrop-blur-md text-[#00e5ff] flex items-center justify-center shadow-xl active:scale-95 transition-all border border-white/10"
            >
              <span className="material-symbols-outlined text-[20px]">my_location</span>
            </button>

            {/* Toggle Roadmap vs Satellite */}
            <button
              type="button"
              onClick={() => {
                const nextLayer = mapLayer === 'm' ? 'k' : 'm';
                setMapLayer(nextLayer);
                setGpsToast(`Map View: ${nextLayer === 'k' ? 'Satellite Imagery' : 'Street Roadmap'}`);
                setTimeout(() => setGpsToast(null), 2000);
              }}
              title="Toggle Street Map / Satellite Layer"
              className="w-10 h-10 rounded-full bg-[#101319]/90 backdrop-blur-md text-[#aff833] flex items-center justify-center shadow-xl active:scale-95 transition-all border border-white/10"
            >
              <span className="material-symbols-outlined text-[20px]">
                {mapLayer === 'm' ? 'satellite_alt' : 'map'}
              </span>
            </button>

            {/* Zoom In */}
            <button
              type="button"
              onClick={() => setZoomLevel((prev) => Math.min(prev + 1, 19))}
              title="Zoom In"
              className="w-10 h-10 rounded-full bg-[#101319]/90 backdrop-blur-md text-white flex items-center justify-center shadow-xl active:scale-95 transition-all border border-white/10 font-bold text-lg"
            >
              +
            </button>

            {/* Zoom Out */}
            <button
              type="button"
              onClick={() => setZoomLevel((prev) => Math.max(prev - 1, 13))}
              title="Zoom Out"
              className="w-10 h-10 rounded-full bg-[#101319]/90 backdrop-blur-md text-white flex items-center justify-center shadow-xl active:scale-95 transition-all border border-white/10 font-bold text-lg"
            >
              −
            </button>

            {/* Open Direct Google Maps Navigation */}
            <button
              type="button"
              onClick={() => handleStartGoogleMapsNavigation(activeFacility)}
              title="Launch Google Maps App Directions"
              className="w-10 h-10 rounded-full bg-[#00e5ff] text-[#001f24] flex items-center justify-center shadow-[0_0_16px_rgba(0,229,255,0.4)] active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[20px]">directions</span>
            </button>
          </div>

          {/* Floating Interactive Spot Selector Pills (Overlaid on bottom of Map Canvas) */}
          <div className="absolute left-2 right-2 bottom-3 z-20 flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {facilities.map((fac) => {
              const isSelected = fac.id === activeFacility.id;
              const isFull = fac.status === 'full';

              return (
                <button
                  key={fac.id}
                  type="button"
                  onClick={() => setSelectedFacilityId(fac.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shrink-0 backdrop-blur-xl shadow-lg transition-all active:scale-95 border ${
                    isSelected
                      ? 'bg-[#001f24]/95 text-[#00e5ff] border-[#00e5ff] shadow-[0_0_14px_rgba(0,229,255,0.4)]'
                      : isFull
                      ? 'bg-[#281418]/90 text-[#ff5964] border-[#ff5964]/40'
                      : 'bg-[#101319]/90 text-white/90 border-white/10 hover:border-white/30'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isSelected
                        ? 'bg-[#00e5ff] animate-ping'
                        : isFull
                        ? 'bg-[#ff5964]'
                        : 'bg-[#aff833]'
                    }`}
                  />
                  <span>{fac.shortName}</span>
                  <span className="text-[10px] text-white/50">•</span>
                  <span className={isSelected ? 'text-[#aff833]' : 'text-white/70'}>
                    {isFull ? 'FULL' : `₹${fac.ratePerHour}`}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Sheet Details & Parking Cards */}
        <div className="relative z-30 -mt-2 rounded-t-3xl bg-[#080B10] shadow-[0_-16px_36px_rgba(0,0,0,0.7)] pt-3 px-4 pb-8 flex flex-col border-t border-[#272a30]/60">
          <div className="w-full flex justify-center pb-2">
            <div className="w-12 h-1.5 rounded-full bg-[#32353b]" />
          </div>

          <div className="flex items-center justify-between pt-1 pb-2">
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-lg text-[#e1e2ea] tracking-tight">Parking near you</h2>
              <span className="px-2 py-0.5 rounded-full bg-[#272a30] text-[#00e5ff] text-[10px] font-extrabold uppercase">
                4 available
              </span>
            </div>
            <span className="text-[10px] text-[#849396] uppercase tracking-wider font-semibold">Mysuru Central</span>
          </div>

          {/* Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 pt-0.5">
            <button
              type="button"
              onClick={() => setActiveFilter('closest')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-all ${
                activeFilter === 'closest'
                  ? 'bg-[#00e5ff] text-[#001f24] shadow-[0_0_12px_rgba(0,229,255,0.35)] font-bold'
                  : 'bg-[#272a30] text-[#e1e2ea] hover:bg-[#32353b] border border-white/5'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                near_me
              </span>
              Closest first
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('ev')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-all ${
                activeFilter === 'ev'
                  ? 'bg-[#00e5ff] text-[#001f24] shadow-[0_0_12px_rgba(0,229,255,0.35)] font-bold'
                  : 'bg-[#272a30] text-[#e1e2ea] hover:bg-[#32353b] border border-white/5'
              }`}
            >
              <span className="material-symbols-outlined text-[16px] text-[#aff833]">bolt</span>
              EV Fast Charging
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('covered')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-all ${
                activeFilter === 'covered'
                  ? 'bg-[#00e5ff] text-[#001f24] shadow-[0_0_12px_rgba(0,229,255,0.35)] font-bold'
                  : 'bg-[#272a30] text-[#e1e2ea] hover:bg-[#32353b] border border-white/5'
              }`}
            >
              <span className="material-symbols-outlined text-[16px] text-[#849396]">roofing</span>
              Covered Roof
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('lowest')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-all ${
                activeFilter === 'lowest'
                  ? 'bg-[#00e5ff] text-[#001f24] shadow-[0_0_12px_rgba(0,229,255,0.35)] font-bold'
                  : 'bg-[#272a30] text-[#e1e2ea] hover:bg-[#32353b] border border-white/5'
              }`}
            >
              <span className="material-symbols-outlined text-[16px] text-[#849396]">payments</span>
              Lowest Price
            </button>
          </div>

          {/* Primary Selected Parking Facility Card */}
          <div className="mt-1 rounded-2xl bg-[#1d2025] p-4 flex flex-col gap-3 shadow-lg shadow-black/50 relative overflow-hidden border border-white/10">
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#00e5ff]/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-start justify-between gap-3 relative">
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-[#32353b] flex items-center justify-center shrink-0 border border-white/5">
                  <span className="material-symbols-outlined text-[#00e5ff] text-[26px]">garage</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-base text-[#e1e2ea] truncate">{activeFacility.name}</h3>
                    <span
                      className="material-symbols-outlined text-[#aff833] text-[16px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      verified
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5 text-[#bac9cc] text-xs">
                    <span className="flex items-center gap-0.5 text-[#00e5ff] font-semibold">
                      <span className="material-symbols-outlined text-[14px]">directions_walk</span>
                      {activeFacility.walkDistance} • {activeFacility.walkTime}
                    </span>
                    <span>•</span>
                    <span className="text-[#bac9cc] truncate">{activeFacility.address}</span>
                  </div>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-2xl leading-tight text-[#00e5ff] font-extrabold">₹{activeFacility.ratePerHour}</div>
                <div className="text-[10px] text-[#849396] uppercase tracking-wider font-semibold">Per Hour</div>
              </div>
            </div>

            {/* Availability Meter with Real-Time Indicator */}
            <div className="flex flex-col gap-1.5 bg-[#080B10]/70 p-3 rounded-xl border border-white/5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#e1e2ea] flex items-center gap-1.5">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      activeFacility.availableCount > 0 ? 'bg-[#aff833] animate-pulse' : 'bg-[#ff5964]'
                    }`}
                  />
                  <span className="font-extrabold text-[#aff833]">{activeFacility.availableCount} stalls open</span>
                  <span className="text-[#849396]">of {activeFacility.totalCount} total</span>
                </span>
                <span className="text-[#849396] text-[10px] uppercase font-bold">
                  {activeFacility.availableCount > 0 ? 'Live Telemetry' : 'Lot Full'}
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#32353b] overflow-hidden flex">
                <div
                  className="h-full bg-[#aff833] rounded-full shadow-[0_0_8px_rgba(175,248,51,0.6)] transition-all duration-500"
                  style={{
                    width: `${Math.min(
                      100,
                      Math.max(10, (activeFacility.availableCount / activeFacility.totalCount) * 100)
                    )}%`,
                  }}
                />
              </div>
            </div>

            {/* Key Amenities */}
            <div className="flex items-center gap-2 flex-wrap">
              {activeFacility.amenities.map((amenity, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-full bg-[#32353b] text-[10px] font-bold text-[#e1e2ea] flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[13px] text-[#00e5ff]">check_circle</span>
                  {amenity}
                </span>
              ))}
            </div>

            {/* DUAL ACTION BUTTONS: Real Turn-by-Turn GPS Navigation + Book Slot */}
            <div className="grid grid-cols-2 gap-2 mt-1">
              {/* Button 1: Start Real Google Maps Navigation */}
              <button
                type="button"
                onClick={() => handleStartGoogleMapsNavigation(activeFacility)}
                className="h-13 rounded-full bg-[#272a30] hover:bg-[#32353b] text-[#00e5ff] border border-[#00e5ff]/30 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">directions</span>
                <span>Start Navigation</span>
              </button>

              {/* Button 2: Choose Slot & Book */}
              <button
                type="button"
                onClick={() => onNavigate('slot-select')}
                className="h-13 rounded-full bg-[#00e5ff] text-[#001f24] font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(0,229,255,0.4)] active:scale-[0.98] transition-all hover:brightness-110 cursor-pointer"
              >
                <span>Select Bay Slots</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* List of other nearby spots (Tapping switches the active Google Map location!) */}
          <div className="mt-3 flex flex-col gap-2">
            <span className="text-[11px] font-bold text-[#849396] uppercase tracking-wider px-1">
              Other Parking Bays in Mysuru
            </span>

            {facilities
              .filter((f) => f.id !== activeFacility.id)
              .map((facility) => {
                const isFull = facility.status === 'full';

                return (
                  <div
                    key={facility.id}
                    onClick={() => {
                      setSelectedFacilityId(facility.id);
                      setGpsToast(`Map focused on ${facility.name}`);
                      setTimeout(() => setGpsToast(null), 2000);
                    }}
                    className="rounded-xl bg-[#191c21] p-3 flex items-center justify-between gap-3 active:scale-[0.99] transition-transform cursor-pointer hover:bg-[#1d2025] border border-white/5"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                          isFull ? 'bg-[#ff5964]/20 text-[#ff5964]' : 'bg-[#272a30] text-[#aff833]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          {isFull ? 'block' : 'local_parking'}
                        </span>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <h4 className="font-bold text-sm text-[#e1e2ea] truncate">{facility.name}</h4>
                        <div className="flex items-center gap-2 text-[#bac9cc] text-xs">
                          <span>{facility.walkDistance} • {facility.walkTime}</span>
                          <span>•</span>
                          <span className={isFull ? 'text-[#ff5964]' : 'text-[#aff833] font-semibold'}>
                            {isFull ? 'Lot Full' : `${facility.availableCount} spots left`}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <div className="text-right">
                        <div className="text-sm font-bold text-[#e1e2ea]">
                          ₹{facility.ratePerHour}
                          <span className="text-[10px] text-[#849396] font-normal">/hr</span>
                        </div>
                        <span
                          className={`text-[10px] font-bold uppercase ${
                            isFull ? 'text-[#ff5964]' : 'text-[#aff833]'
                          }`}
                        >
                          {isFull ? 'Full' : 'Open'}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStartGoogleMapsNavigation(facility);
                        }}
                        title="Navigate to this location in Google Maps"
                        className="w-8 h-8 rounded-full bg-[#272a30] hover:bg-[#32353b] text-[#00e5ff] flex items-center justify-center border border-white/5"
                      >
                        <span className="material-symbols-outlined text-[16px]">navigation</span>
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>

          <div className="mt-4 flex items-center justify-center gap-1.5 text-[#bac9cc] text-[10px] font-bold uppercase tracking-wider opacity-75">
            <span className="w-1.5 h-1.5 rounded-full bg-[#aff833] animate-pulse" />
            <span>Connected to Google Maps & Mysuru Smart City IoT Sensors</span>
          </div>
        </div>
      </main>
    </div>
  );
};
