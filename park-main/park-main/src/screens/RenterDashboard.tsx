import React, { useState } from 'react';
import { ScreenId } from '../types.ts';

interface RenterDashboardProps {
  onNavigate: (screen: ScreenId) => void;
  userName?: string;
}

interface HostedSpace {
  id: string;
  name: string;
  type: 'Driveway' | 'Covered Garage' | 'Basement Bay' | 'Commercial Lot';
  address: string;
  hourlyRate: number;
  isOnline: boolean;
  sensorStatus: 'available' | 'occupied';
  currentOccupant?: {
    driverName: string;
    vehicleModel: string;
    plateNumber: string;
    startedAt: string;
    until: string;
  };
  totalEarnings: number;
  hasEvCharger: boolean;
}

const INITIAL_HOSTED_SPACES: HostedSpace[] = [
  {
    id: 'space-1',
    name: 'Palace South Gate Driveway Bay A',
    type: 'Driveway',
    address: 'Near Mysuru Palace South Gate, Bangalore-Nilgiri Rd',
    hourlyRate: 50,
    isOnline: true,
    sensorStatus: 'occupied',
    currentOccupant: {
      driverName: 'Priya Sharma',
      vehicleModel: 'Hyundai Ioniq 5 (EV)',
      plateNumber: 'KA-09-EA-2091',
      startedAt: '01:30 PM',
      until: '03:30 PM',
    },
    totalEarnings: 4250,
    hasEvCharger: true,
  },
  {
    id: 'space-2',
    name: 'Chamundi View Covered Bay B',
    type: 'Covered Garage',
    address: '14th Cross, Ramanuja Road, Mysuru',
    hourlyRate: 40,
    isOnline: true,
    sensorStatus: 'available',
    totalEarnings: 3100,
    hasEvCharger: false,
  },
  {
    id: 'space-3',
    name: 'Gokulam Secure Parking Port C',
    type: 'Basement Bay',
    address: '3rd Stage Gokulam, near Yoga Shala',
    hourlyRate: 60,
    isOnline: true,
    sensorStatus: 'available',
    totalEarnings: 5800,
    hasEvCharger: true,
  },
];

export const RenterDashboard: React.FC<RenterDashboardProps> = ({
  onNavigate,
  userName = 'Sarah Jenkins',
}) => {
  const [spaces, setSpaces] = useState<HostedSpace[]>(INITIAL_HOSTED_SPACES);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSpaceName, setNewSpaceName] = useState('');
  const [newSpaceRate, setNewSpaceRate] = useState('45');
  const [newSpaceType, setNewSpaceType] = useState<HostedSpace['type']>('Driveway');
  const [newSpaceAddress, setNewSpaceAddress] = useState('VV Mohalla, Mysuru');
  const [newHasEv, setNewHasEv] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Toggle parking space online/offline for bookings
  const handleToggleOnline = (id: string) => {
    setSpaces((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const nextState = !s.isOnline;
          showToast(`Spot "${s.name}" is now ${nextState ? 'ONLINE for rent' : 'PAUSED'}`);
          return { ...s, isOnline: nextState };
        }
        return s;
      })
    );
  };

  // Simulate IoT ground sensor state toggle (vacant <-> occupied)
  const handleToggleSensor = (id: string) => {
    setSpaces((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const isNowOccupied = s.sensorStatus === 'available';
          const updatedOccupant = isNowOccupied
            ? {
                driverName: 'Rahul V.',
                vehicleModel: 'Tata Nexon EV',
                plateNumber: 'KA-09-RT-8842',
                startedAt: 'Just Now',
                until: 'In 2 hours',
              }
            : undefined;

          showToast(
            isNowOccupied
              ? `Sensor: Vehicle parked at ${s.name} (OCCUPIED)`
              : `Sensor: Vehicle departed from ${s.name} (VACANT)`
          );

          return {
            ...s,
            sensorStatus: isNowOccupied ? 'occupied' : 'available',
            currentOccupant: updatedOccupant,
          };
        }
        return s;
      })
    );
  };

  // Add new space listing
  const handleAddSpace = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSpaceName.trim()) return;

    const newEntry: HostedSpace = {
      id: `space-${Date.now()}`,
      name: newSpaceName,
      type: newSpaceType,
      address: newSpaceAddress,
      hourlyRate: Number(newSpaceRate) || 40,
      isOnline: true,
      sensorStatus: 'available',
      totalEarnings: 0,
      hasEvCharger: newHasEv,
    };

    setSpaces((prev) => [newEntry, ...prev]);
    setShowAddModal(false);
    setNewSpaceName('');
    showToast(`Successfully listed new parking spot: "${newEntry.name}"!`);
  };

  const totalEarningsAll = spaces.reduce((acc, s) => acc + s.totalEarnings, 0);
  const activeCount = spaces.filter((s) => s.sensorStatus === 'occupied').length;
  const availableCount = spaces.filter((s) => s.sensorStatus === 'available' && s.isOnline).length;

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#080B10] text-[#e1e2ea] pb-28">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 left-4 right-4 max-w-md mx-auto z-50 p-3 rounded-2xl bg-[#121f00]/95 backdrop-blur-md text-[#aff833] border border-[#aff833]/40 shadow-xl flex items-center justify-between text-xs font-bold animate-slide-down">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#aff833] animate-ping shrink-0" />
            <span className="truncate">{toastMessage}</span>
          </div>
          <button type="button" onClick={() => setToastMessage(null)} className="text-current opacity-70 p-1">
            ✕
          </button>
        </div>
      )}

      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-[#0d1017]/95 backdrop-blur-md border-b border-[#272a30] px-4 py-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-[#00e5ff]/15 border border-[#00e5ff]/30 flex items-center justify-center text-[#00e5ff] shrink-0">
              <span className="material-symbols-outlined text-[22px]">garage</span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h1 className="font-extrabold text-sm text-white truncate">Host Portal</h1>
                <span className="px-2 py-0.5 rounded-full bg-[#00e5ff]/15 text-[#00e5ff] text-[9px] font-black uppercase tracking-wider">
                  Live
                </span>
              </div>
              <p className="text-[11px] text-[#849396] truncate">{userName} • Mysuru, KA</p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Quick Switch to Driver Mode */}
            <button
              type="button"
              onClick={() => onNavigate('journey')}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-[#191c21] hover:bg-[#272a30] text-xs font-semibold text-[#aff833] border border-[#aff833]/30 transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-[15px]">directions_car</span>
              <span className="text-[11px] font-bold">Driver</span>
            </button>

            {/* Logout to Auth Screen */}
            <button
              type="button"
              onClick={() => onNavigate('auth-renter')}
              title="Sign Out / Switch Account"
              className="w-8 h-8 rounded-full bg-[#191c21] hover:bg-[#272a30] flex items-center justify-center text-white/70 hover:text-white border border-white/5"
            >
              <span className="material-symbols-outlined text-[16px]">logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Scrollable Content */}
      <main className="flex-1 w-full px-4 pt-4 flex flex-col gap-5">
        {/* Metric Cards: Clean 2x2 Grid */}
        <section className="grid grid-cols-2 gap-2.5">
          {/* Card 1: Total Revenue */}
          <div className="p-3.5 rounded-2xl bg-[#101319] border border-white/5 shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[#849396]">
              <span className="text-[11px] font-semibold">Monthly Revenue</span>
              <span className="material-symbols-outlined text-[17px] text-[#aff833]">payments</span>
            </div>
            <div className="mt-2">
              <span className="text-xl font-black text-white">₹{totalEarningsAll.toLocaleString()}</span>
              <div className="flex items-center gap-1 text-[10px] text-[#aff833] font-semibold mt-0.5">
                <span className="material-symbols-outlined text-[13px]">trending_up</span>
                <span>+22% this week</span>
              </div>
            </div>
          </div>

          {/* Card 2: Vacant Spots for Rent */}
          <div className="p-3.5 rounded-2xl bg-[#101319] border border-white/5 shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[#849396]">
              <span className="text-[11px] font-semibold">Free Spots</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#aff833] shadow-[0_0_8px_#aff833]" />
            </div>
            <div className="mt-2">
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-black text-[#aff833]">{availableCount}</span>
                <span className="text-[11px] text-[#849396]">/ {spaces.length} online</span>
              </div>
              <p className="text-[10px] text-[#849396] mt-0.5">Ready for booking</p>
            </div>
          </div>

          {/* Card 3: Currently Occupied */}
          <div className="p-3.5 rounded-2xl bg-[#101319] border border-white/5 shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[#849396]">
              <span className="text-[11px] font-semibold">Active Parkers</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5964] shadow-[0_0_8px_#ff5964]" />
            </div>
            <div className="mt-2">
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-black text-[#ff5964]">{activeCount}</span>
                <span className="text-[11px] text-[#849396]">cars parked</span>
              </div>
              <p className="text-[10px] text-[#849396] mt-0.5">Earning ₹130/hr</p>
            </div>
          </div>

          {/* Card 4: Host Quality Rating */}
          <div className="p-3.5 rounded-2xl bg-[#101319] border border-white/5 shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[#849396]">
              <span className="text-[11px] font-semibold">Reputation</span>
              <span className="material-symbols-outlined text-[17px] text-[#ffb703]">star</span>
            </div>
            <div className="mt-2">
              <span className="text-xl font-black text-white">4.95 ★</span>
              <p className="text-[10px] text-[#849396] mt-0.5">48 driver reviews</p>
            </div>
          </div>
        </section>

        {/* Action Header: List of Hosted Parking Spaces */}
        <div className="flex items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-white">My Listed Bays</h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#191c21] text-[#00e5ff] border border-white/5">
                {spaces.length} Spots
              </span>
            </div>
            <p className="text-[11px] text-[#849396] mt-0.5">
              Live IoT telemetry & space control
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#d4ff32] hover:bg-[#c2ed2b] text-[#0c0e0d] font-bold text-xs shadow-md transition-all active:scale-95 shrink-0"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            <span>Add Space</span>
          </button>
        </div>

        {/* Parking Spaces Cards: Full Width Stack (Organized, No Squishing!) */}
        <section className="flex flex-col gap-3.5">
          {spaces.map((space) => {
            const isOccupied = space.sensorStatus === 'occupied';

            return (
              <div
                key={space.id}
                className={`rounded-2xl p-4 bg-[#101319] border transition-all flex flex-col gap-3 shadow-lg ${
                  isOccupied
                    ? 'border-[#ff5964]/40'
                    : 'border-[#aff833]/30'
                }`}
              >
                {/* Spot Header: Icon, Name, Type & Live Status Badge */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        isOccupied
                          ? 'bg-[#ff5964]/20 text-[#ff5964]'
                          : 'bg-[#aff833]/20 text-[#aff833]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {isOccupied ? 'directions_car' : 'local_parking'}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-sm text-white truncate leading-tight">
                        {space.name}
                      </h3>
                      <span className="inline-block px-1.5 py-0.2 rounded bg-white/5 text-[10px] text-[#849396] font-medium mt-0.5">
                        {space.type}
                      </span>
                    </div>
                  </div>

                  {/* Status Indicator Badge */}
                  <div
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider shrink-0 border ${
                      isOccupied
                        ? 'bg-[#281418] text-[#ff5964] border-[#ff5964]/40 shadow-[0_0_8px_rgba(255,89,100,0.2)]'
                        : 'bg-[#121f00] text-[#aff833] border-[#aff833]/40 shadow-[0_0_8px_rgba(175,248,51,0.2)]'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isOccupied ? 'bg-[#ff5964]' : 'bg-[#aff833] animate-ping'
                      }`}
                    />
                    <span>{isOccupied ? 'Occupied' : 'Vacant'}</span>
                  </div>
                </div>

                {/* Address Line */}
                <p className="text-xs text-[#bac9cc] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[15px] text-[#00e5ff] shrink-0">location_on</span>
                  <span className="truncate">{space.address}</span>
                </p>

                {/* Rate & Feature Badges */}
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <div className="flex items-baseline gap-1">
                    <span className="text-base font-black text-white">₹{space.hourlyRate}</span>
                    <span className="text-[11px] text-[#849396]">/ hour</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {space.hasEvCharger && (
                      <span className="px-2 py-0.5 rounded-md bg-[#00e5ff]/15 text-[#00e5ff] text-[10px] font-bold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[12px]">electric_bolt</span>
                        EV Ready
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded-md bg-white/5 text-white/70 text-[10px] font-medium">
                      CCTV 24/7
                    </span>
                  </div>
                </div>

                {/* Current Driver / Occupancy Box */}
                {isOccupied && space.currentOccupant ? (
                  <div className="p-3 rounded-xl bg-[#191c21] border border-white/5 flex flex-col gap-2 text-xs">
                    <div className="flex items-center justify-between text-[11px] text-[#ff5964] font-bold">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px]">person</span>
                        Active Parker
                      </span>
                      <span className="flex items-center gap-1 font-mono">
                        <span className="material-symbols-outlined text-[13px]">schedule</span>
                        Until {space.currentOccupant.until}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-bold text-white truncate">{space.currentOccupant.driverName}</p>
                        <p className="text-[10px] text-[#849396] truncate">{space.currentOccupant.vehicleModel}</p>
                      </div>
                      <span className="px-2 py-1 rounded-md bg-[#0c0e0d] text-[#00e5ff] font-mono text-[11px] font-bold border border-white/10 shrink-0">
                        {space.currentOccupant.plateNumber}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="p-2.5 rounded-xl bg-[#121f00]/40 border border-[#aff833]/20 flex items-center justify-between text-xs">
                    <span className="text-[#aff833] font-semibold text-[11px] flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">check_circle</span>
                      Ready for Drivers
                    </span>
                    <span className="text-[10px] text-white/60">Live on Smart City Network</span>
                  </div>
                )}

                {/* Control Action Buttons (Clean 2-Column Row with generous touch targets) */}
                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => handleToggleSensor(space.id)}
                    className="h-9 px-3 rounded-xl bg-[#1d2025] hover:bg-[#272a30] text-[11px] font-bold text-white/90 flex items-center justify-center gap-1.5 border border-white/5 transition-all active:scale-95"
                  >
                    <span className="material-symbols-outlined text-[15px] text-[#aff833]">sensors</span>
                    <span>Toggle Sensor</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleToggleOnline(space.id)}
                    className={`h-9 px-3 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 ${
                      space.isOnline
                        ? 'bg-[#d4ff32]/20 text-[#d4ff32] border border-[#d4ff32]/40'
                        : 'bg-red-500/20 text-red-400 border border-red-500/40'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[15px]">
                      {space.isOnline ? 'check_circle' : 'pause_circle'}
                    </span>
                    <span>{space.isOnline ? 'Accepting Rent' : 'Paused'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </section>

        {/* Live Payout & Earnings Summary Card */}
        <section className="p-4 rounded-2xl bg-gradient-to-br from-[#141c14] to-[#0d1618] border border-white/10 flex flex-col gap-3 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#d4ff32]/20 text-[#d4ff32] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">account_balance_wallet</span>
            </div>
            <div className="min-w-0">
              <h3 className="font-extrabold text-white text-sm">Direct UPI Instant Payout</h3>
              <p className="text-[11px] text-[#849396] truncate">
                Balance: <span className="font-bold text-white">₹{totalEarningsAll}</span> • Linked to{' '}
                <span className="font-mono text-[#00e5ff]">host@okaxis</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => showToast('Payout request of ₹' + totalEarningsAll + ' initiated to host@okaxis!')}
            className="w-full h-11 rounded-xl bg-[#d4ff32] hover:bg-[#c2ed2b] text-[#0c0e0d] font-black text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[17px]">currency_rupee</span>
            <span>Request Instant Payout</span>
          </button>
        </section>
      </main>

      {/* Add New Space Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-3xl bg-[#101319] border border-white/10 p-5 flex flex-col gap-4 shadow-2xl animate-scale-up">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#d4ff32] text-[20px]">add_circle</span>
                <h3 className="font-bold text-sm text-white">List Parking Bay</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSpace} className="flex flex-col gap-3 text-xs">
              <div>
                <label className="text-white/70 font-semibold mb-1 block">Bay / Driveway Title</label>
                <input
                  type="text"
                  required
                  value={newSpaceName}
                  onChange={(e) => setNewSpaceName(e.target.value)}
                  placeholder="e.g. Nazarbad Covered Bay"
                  className="w-full h-10 px-3 bg-[#191c21] border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#d4ff32]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-white/70 font-semibold mb-1 block">Space Type</label>
                  <select
                    value={newSpaceType}
                    onChange={(e) => setNewSpaceType(e.target.value as any)}
                    className="w-full h-10 px-2 bg-[#191c21] border border-white/10 rounded-xl text-white focus:outline-none"
                  >
                    <option value="Driveway">Driveway</option>
                    <option value="Covered Garage">Covered Garage</option>
                    <option value="Basement Bay">Basement Bay</option>
                    <option value="Commercial Lot">Commercial Lot</option>
                  </select>
                </div>

                <div>
                  <label className="text-white/70 font-semibold mb-1 block">Hourly Rate (₹)</label>
                  <input
                    type="number"
                    required
                    value={newSpaceRate}
                    onChange={(e) => setNewSpaceRate(e.target.value)}
                    className="w-full h-10 px-3 bg-[#191c21] border border-white/10 rounded-xl text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-white/70 font-semibold mb-1 block">Address / Landmark</label>
                <input
                  type="text"
                  required
                  value={newSpaceAddress}
                  onChange={(e) => setNewSpaceAddress(e.target.value)}
                  placeholder="Street name in Mysuru"
                  className="w-full h-10 px-3 bg-[#191c21] border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#d4ff32]"
                />
              </div>

              <label className="flex items-center gap-2 mt-1 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={newHasEv}
                  onChange={(e) => setNewHasEv(e.target.checked)}
                  className="w-4 h-4 rounded bg-[#191c21] border-white/20 accent-[#00e5ff]"
                />
                <span className="text-white/80">Has EV Charger (AC Fast 7.4kW)</span>
              </label>

              <div className="flex items-center justify-end gap-2 mt-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#d4ff32] hover:bg-[#c2ed2b] text-[#0c0e0d] font-black shadow-md"
                >
                  Publish Spot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
