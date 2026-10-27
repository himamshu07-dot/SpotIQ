import React, { useState } from 'react';
import { ScreenId, Vehicle } from '../types.ts';
import { ParkingSlot, calculateTotalFare } from '../utils/parkingRules.ts';
import { INITIAL_VEHICLES } from '../data/mockData.ts';

interface BookingConfirmationProps {
  onNavigate: (screen: ScreenId) => void;
  selectedSlot: ParkingSlot;
  durationHours: number;
  onConfirmBooking: (vehicle: Vehicle, total: number) => void;
}

export const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  onNavigate,
  selectedSlot,
  durationHours,
  onConfirmBooking,
}) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>(INITIAL_VEHICLES);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>(INITIAL_VEHICLES[0]);
  const [isChangingVehicle, setIsChangingVehicle] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'fastag'>('upi');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fare = calculateTotalFare(durationHours, selectedSlot.ratePerHour || 30, 3.0, 0);

  const handleConfirm = () => {
    setIsSubmitting(true);
    setToastMessage(`Locking Slot ${selectedSlot.code}...`);

    setTimeout(() => {
      onConfirmBooking(selectedVehicle, fare.totalPayable);
      setIsSubmitting(false);
      onNavigate('active-journey');
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#101319] text-[#e1e2ea] relative pb-10">
      {/* Top Header */}
      <header className="sticky top-0 w-full z-40 bg-[#0b0e13]/85 backdrop-blur-xl border-b border-white/5">
        <div className="h-16 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Back to Slot Selection"
              onClick={() => onNavigate('slot-select')}
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
        <div className="fixed top-20 left-4 right-4 z-50 bg-[#00e5ff] text-[#001f24] px-4 py-2.5 rounded-xl shadow-xl flex items-center justify-between font-bold text-xs animate-bounce">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Main Content Body */}
      <main className="flex-1 flex flex-col p-4 gap-4">
        {/* Step Progress & Sub-Navigation Indicator */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="inline-flex h-2 w-7 rounded-full bg-[#00e5ff]" />
            <span className="inline-flex h-2 w-7 rounded-full bg-[#00e5ff]" />
            <span className="inline-flex h-2 w-7 rounded-full bg-[#00e5ff] shadow-[0_0_8px_rgba(0,229,255,0.7)] animate-pulse" />
          </div>
          <span className="bg-[#272a30] px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider text-[#00e5ff]">
            Step 3 of 3
          </span>
        </div>

        {/* Facility & Slot Hero Showcase Card */}
        <div className="relative bg-[#272a30] rounded-2xl p-4 shadow-xl overflow-hidden border border-white/5">
          <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#00e5ff]/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-start gap-3">
            <div className="w-1.5 h-16 bg-[#00e5ff] rounded-full shadow-[0_0_12px_rgba(0,229,255,0.5)] shrink-0 self-stretch" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-[10px] text-[#aff833] uppercase font-extrabold tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#aff833] animate-ping" />
                  Live Sensor Verified
                </span>
                <span className="text-xs text-[#bac9cc] flex items-center gap-1 font-semibold">
                  <span className="material-symbols-outlined text-[16px] text-[#00e5ff]">directions_car</span>
                  Level {selectedSlot.level}
                </span>
              </div>
              <h2 className="text-xl font-black text-[#e1e2ea] truncate">Palace South Gate</h2>
              <p className="text-xs text-[#bac9cc] flex items-center gap-1 mt-0.5">
                <span className="material-symbols-outlined text-[15px] text-[#849396]">location_on</span>
                Bangalore-Nilgiri Rd, Agrahara, Mysuru
              </p>
            </div>
          </div>

          {/* Slot Live Status Pill */}
          <div className="mt-3 bg-[#080B10] p-3 rounded-xl flex items-center justify-between border border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#272a30] flex flex-col items-center justify-center text-[#00e5ff] border border-[#00e5ff]/30">
                <span className="text-[9px] uppercase font-bold text-[#849396] leading-none">Stall</span>
                <span className="text-lg font-black text-[#00e5ff] leading-none mt-0.5">{selectedSlot.code}</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm text-[#e1e2ea]">Slot {selectedSlot.code}</span>
                  {selectedSlot.type === 'ev' && (
                    <span className="bg-[#aff833]/20 text-[#aff833] px-1.5 py-0.2 rounded-full text-[9px] font-extrabold uppercase">
                      EV Enabled
                    </span>
                  )}
                </div>
                <span className="text-xs text-[#bac9cc]">
                  {selectedSlot.pillarInfo || 'Underground Covered • Pillar 14'}
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#00e5ff] text-[24px]">electric_bolt</span>
          </div>
        </div>

        {/* Reservation Schedule & Space Allocation */}
        <section className="bg-[#1d2025] rounded-2xl p-4 shadow-md flex flex-col gap-3 border border-white/5">
          <div className="flex items-center justify-between pb-1">
            <span className="font-bold text-sm text-[#e1e2ea] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#00e5ff] text-[18px]">calendar_today</span>
              Timing & Space Allocation
            </span>
            <span className="bg-[#aff833]/15 text-[#aff833] text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase border border-[#aff833]/30">
              Guaranteed Hold
            </span>
          </div>

          {/* Target Arrival & Duration */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#191c21] p-3 rounded-xl flex flex-col gap-0.5 border border-white/5">
              <span className="text-[10px] text-[#849396] uppercase font-bold tracking-wider">Target Arrival</span>
              <span className="font-bold text-sm text-[#e1e2ea]">Today, 02:30 PM</span>
              <span className="text-xs text-[#aff833] flex items-center gap-1 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#aff833] animate-pulse" />
                in 15 mins
              </span>
            </div>
            <div className="bg-[#191c21] p-3 rounded-xl flex flex-col gap-0.5 border border-white/5">
              <span className="text-[10px] text-[#849396] uppercase font-bold tracking-wider">Total Duration</span>
              <span className="font-bold text-sm text-[#e1e2ea]">
                {durationHours} {durationHours === 1 ? 'Hour' : 'Hours'}
              </span>
              <span className="text-xs text-[#bac9cc]">Until 04:30 PM</span>
            </div>
          </div>

          {/* Vehicle Selector Card */}
          <div className="bg-[#191c21] p-3 rounded-xl flex items-center justify-between border border-white/5">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-full bg-[#272a30] flex items-center justify-center text-[#00e5ff] shrink-0">
                <span className="material-symbols-outlined text-[20px]">directions_car</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-xs text-[#e1e2ea] truncate">{selectedVehicle.name}</span>
                <span className="text-xs text-[#00e5ff] font-mono tracking-wider font-semibold">
                  {selectedVehicle.plate}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsChangingVehicle(!isChangingVehicle)}
              className="px-3 py-1 rounded-full bg-[#32353b] hover:bg-[#36393f] text-[#00e5ff] text-xs font-semibold active:scale-95 transition-all"
            >
              {isChangingVehicle ? 'Done' : 'Change'}
            </button>
          </div>

          {/* Vehicle Selection Drawer */}
          {isChangingVehicle && (
            <div className="flex flex-col gap-1.5 pt-1">
              <span className="text-[10px] text-[#849396] uppercase font-bold tracking-wider">Select Saved Vehicle</span>
              {vehicles.map((v) => (
                <div
                  key={v.id}
                  onClick={() => {
                    setSelectedVehicle(v);
                    setIsChangingVehicle(false);
                    setToastMessage(`Vehicle switched to ${v.name}`);
                    setTimeout(() => setToastMessage(null), 2000);
                  }}
                  className={`p-2.5 rounded-xl cursor-pointer flex justify-between items-center transition-all ${
                    v.id === selectedVehicle.id
                      ? 'bg-[#00e5ff]/15 border border-[#00e5ff]'
                      : 'bg-[#191c21] hover:bg-[#272a30] border border-white/5'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#e1e2ea]">{v.name}</span>
                    <span className="text-[11px] text-[#849396] font-mono">{v.plate}</span>
                  </div>
                  {v.id === selectedVehicle.id && (
                    <span className="material-symbols-outlined text-[#00e5ff] text-[18px]">check</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Fare Breakdown Card */}
        <section className="bg-[#1d2025] rounded-2xl p-4 shadow-md flex flex-col gap-3 border border-white/5">
          <div className="flex items-center justify-between pb-1">
            <span className="font-bold text-sm text-[#e1e2ea] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#00e5ff] text-[18px]">receipt_long</span>
              Fare Breakdown
            </span>
            <span className="text-[10px] text-[#bac9cc] uppercase font-semibold">Mysuru Smart City Tariff</span>
          </div>

          <div className="flex flex-col gap-2 text-xs">
            <div className="flex items-center justify-between text-[#bac9cc]">
              <span>Parking Fee ({durationHours} hrs @ ₹{selectedSlot.ratePerHour}/hr)</span>
              <span className="font-bold text-[#e1e2ea]">₹{fare.parkingFee.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-[#bac9cc]">
              <span className="flex items-center gap-1">
                Smart City Digital Convenience
                <span className="material-symbols-outlined text-[13px] text-[#849396]" title="Automated barrier telemetry">info</span>
              </span>
              <span className="font-bold text-[#e1e2ea]">₹{fare.digitalConvenienceFee.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-[#bac9cc]">
              <span className="flex items-center gap-1">
                SpotIQ Guaranteed Space Hold
                <span className="bg-[#aff833]/20 text-[#aff833] text-[9px] font-extrabold px-1 rounded uppercase">PROMO</span>
              </span>
              <span className="font-bold text-[#aff833]">FREE (₹0.00)</span>
            </div>
          </div>

          {/* Total Payable Block */}
          <div className="bg-[#191c21] p-3 rounded-xl flex items-center justify-between border border-white/5">
            <div className="flex flex-col">
              <span className="text-[10px] text-[#849396] uppercase font-bold tracking-wider">Total Payable Amount</span>
              <span className="text-[10px] text-[#bac9cc]">Inclusive of all municipal taxes</span>
            </div>
            <span className="text-2xl font-black text-[#00e5ff] tracking-tight">₹{fare.totalPayable.toFixed(2)}</span>
          </div>

          {/* Payment Method Selector */}
          <div className="bg-[#191c21] p-3 rounded-xl flex items-center justify-between border border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#32353b] flex items-center justify-center text-[#00e5ff] font-bold">
                <span className="material-symbols-outlined text-[20px]">bolt</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#e1e2ea]">UPI / Google Pay</span>
                <span className="text-[11px] text-[#849396]">Linked account •••• 4291</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setToastMessage('Switched to default backup: Paytm FASTag (•••• 8820)');
                setTimeout(() => setToastMessage(null), 2500);
              }}
              className="px-3 py-1 rounded-full bg-[#32353b] hover:bg-[#36393f] text-[#00e5ff] text-xs font-semibold"
            >
              Change
            </button>
          </div>
        </section>

        {/* Frictionless Gate Access Guidelines */}
        <div className="bg-[#191c21] rounded-2xl p-4 flex gap-3 items-start border border-white/5">
          <div className="w-9 h-9 rounded-full bg-[#00e5ff]/15 flex items-center justify-center text-[#00e5ff] shrink-0 mt-0.5">
            <span className="material-symbols-outlined text-[20px]">sensor_occupied</span>
          </div>
          <div className="flex flex-col gap-0.5 text-xs">
            <h3 className="font-bold text-[#e1e2ea]">Frictionless Gate Access</h3>
            <p className="text-[#bac9cc] leading-relaxed">
              Instant ANPR camera scanning or digital QR scan at gate boom barrier.{' '}
              <span className="text-[#e1e2ea] font-semibold">15-minute complimentary grace period</span> for entry and exit maneuvers.
            </p>
          </div>
        </div>

        {/* Assurance Badges */}
        <div className="grid grid-cols-3 gap-2 text-center py-1">
          <div className="flex flex-col items-center gap-1">
            <span className="material-symbols-outlined text-[#aff833] text-[20px]">security</span>
            <span className="text-[10px] text-[#bac9cc] uppercase font-semibold">CCTV Monitored</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="material-symbols-outlined text-[#00e5ff] text-[20px]">offline_bolt</span>
            <span className="text-[10px] text-[#bac9cc] uppercase font-semibold">Instant Check-In</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="material-symbols-outlined text-[#aff833] text-[20px]">cancel_schedule_send</span>
            <span className="text-[10px] text-[#bac9cc] uppercase font-semibold">Flexible Cancel</span>
          </div>
        </div>

        {/* Action Confirmation Area (Integrated in natural order, one under the other) */}
        <section className="mt-3 p-4 rounded-2xl bg-[#191c21] border border-[#00e5ff]/30 shadow-xl flex flex-col items-center gap-2">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleConfirm}
            className="w-full h-13 bg-[#00e5ff] hover:brightness-110 text-[#001f24] font-black text-sm rounded-full flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(0,229,255,0.4)] active:scale-98 transition-all cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <span className="material-symbols-outlined text-[20px] animate-spin">refresh</span>
                <span>Locking Slot {selectedSlot.code}...</span>
              </>
            ) : (
              <>
                <span>Confirm & Hold Spot (₹{fare.totalPayable.toFixed(0)})</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </>
            )}
          </button>
          <p className="text-[11px] text-[#bac9cc] text-center flex items-center justify-center gap-1 pt-0.5">
            <span className="material-symbols-outlined text-[15px] text-[#aff833]" style={{ fontVariationSettings: "'FILL' 1" }}>
              verified
            </span>
            <span>100% Guaranteed Spot • Free cancel up to 10m before arrival</span>
          </p>
        </section>
      </main>
    </div>
  );
};
