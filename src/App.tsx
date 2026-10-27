/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ScreenId, Booking, Vehicle } from './types.ts';
import {
  ParkingSlot,
  countAvailableSlots,
} from './utils/parkingRules.ts';
import {
  INITIAL_SLOTS_B1,
  INITIAL_SLOTS_B2,
  INITIAL_SLOTS_B3,
  INITIAL_BOOKINGS,
  INITIAL_VEHICLES,
} from './data/mockData.ts';
import { MobileBottomNav } from './components/MobileBottomNav.tsx';
import { MobileAuthShowcase } from './screens/MobileAuthShowcase.tsx';
import { AuthScreen, UserRole } from './screens/AuthScreen.tsx';
import { RenterDashboard } from './screens/RenterDashboard.tsx';
import { ConnectedJourneyFlow } from './screens/ConnectedJourneyFlow.tsx';
import { SelectParkingSlot } from './screens/SelectParkingSlot.tsx';
import { ParkingDetails } from './screens/ParkingDetails.tsx';
import { BookingConfirmation } from './screens/BookingConfirmation.tsx';
import { ActiveParkingJourney } from './screens/ActiveParkingJourney.tsx';
import { MyBookings } from './screens/MyBookings.tsx';
import { UnifiedDriverCompanion } from './screens/UnifiedDriverCompanion.tsx';
import { InteractivePrototypeReel } from './screens/InteractivePrototypeReel.tsx';

export default function App() {
  // Directly opens into the Native Mobile Sign-In Page (just like Ola, Uber, Rapido)
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('auth-driver');
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; role: UserRole } | null>({
    name: 'Alex Smith',
    email: 'driver.alex@gmail.com',
    role: 'driver',
  });
  const [activeLevel, setActiveLevel] = useState<'B1' | 'B2' | 'B3'>('B2');
  const [allSlots, setAllSlots] = useState<ParkingSlot[]>([
    ...INITIAL_SLOTS_B1,
    ...INITIAL_SLOTS_B2,
    ...INITIAL_SLOTS_B3,
  ]);
  const [durationHours, setDurationHours] = useState<number>(2);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [liveToast, setLiveToast] = useState<{ message: string; type: 'available' | 'occupied' } | null>(null);

  // Selected slot (defaults to B04)
  const defaultB04 =
    allSlots.find((s) => s.code === 'B04') ||
    allSlots.find((s) => s.status === 'selected') ||
    allSlots[0];
  const [selectedSlot, setSelectedSlot] = useState<ParkingSlot>(defaultB04);

  // Level-filtered slots
  const levelSlots = allSlots.filter((s) => s.level === activeLevel);
  const availableCount = countAvailableSlots(levelSlots);

  // Real-Time Sensor Telemetry Simulation Trigger
  const handleSimulateSensorChange = () => {
    // Pick a candidate slot on the active level that isn't the currently selected slot
    const candidates = levelSlots.filter((s) => s.code !== selectedSlot.code);
    if (candidates.length === 0) return;

    const randomIndex = Math.floor(Math.random() * candidates.length);
    const targetSlot = candidates[randomIndex];
    const willBeAvailable = targetSlot.status !== 'available';

    const newStatus = willBeAvailable ? 'available' : 'occupied';
    const plate = willBeAvailable ? undefined : `KA-09-RT-${Math.floor(1000 + Math.random() * 9000)}`;

    setAllSlots((prev) =>
      prev.map((slot) => {
        if (slot.id === targetSlot.id) {
          return {
            ...slot,
            status: newStatus,
            vehiclePlate: plate,
          };
        }
        return slot;
      })
    );

    setLiveToast({
      message: willBeAvailable
        ? `IoT Sensor: Slot ${targetSlot.code} (Level ${targetSlot.level}) is now VACANT (Green Indicator)`
        : `IoT Sensor: Vehicle parked at Slot ${targetSlot.code} - now OCCUPIED (Red Indicator)`,
      type: willBeAvailable ? 'available' : 'occupied',
    });

    setTimeout(() => {
      setLiveToast(null);
    }, 3800);
  };

  // Direct slot status toggle (for testing/evaluating green/red indicator)
  const handleToggleSlotStatus = (slotId: string) => {
    setAllSlots((prev) =>
      prev.map((slot) => {
        if (slot.id === slotId) {
          const nextStatus = slot.status === 'available' ? 'occupied' : 'available';
          const plate = nextStatus === 'occupied' ? 'KA-09-EA-2091' : undefined;
          return {
            ...slot,
            status: nextStatus,
            vehiclePlate: plate,
          };
        }
        return slot;
      })
    );
  };

  const handleSelectSlot = (slot: ParkingSlot) => {
    setSelectedSlot(slot);
    setAllSlots((prev) =>
      prev.map((s) => {
        if (s.id === slot.id) {
          return { ...s, status: 'selected' };
        }
        if (s.status === 'selected') {
          return { ...s, status: 'available' };
        }
        return s;
      })
    );
  };

  const handleConfirmBooking = (vehicle: Vehicle, total: number) => {
    const newBooking: Booking = {
      id: `book-${Date.now()}`,
      passId: 'SPQ-MY-89241',
      facilityName: 'Palace South Gate Multi-Level',
      facilityAddress: 'Bangalore-Nilgiri Rd, Mysuru',
      slotCode: selectedSlot.code,
      level: `Level ${selectedSlot.level}`,
      vehicle,
      startTime: 'Today, 02:30 PM',
      endTime: '04:30 PM',
      durationHours,
      totalAmount: total,
      paymentMethod: 'UPI / Google Pay',
      status: 'active',
      dateLabel: 'Today',
    };
    setBookings((prev) => [newBooking, ...prev]);
  };

  // Smooth scroll to top when switching screens
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentScreen]);

  return (
    <div className="flex flex-col min-h-[100dvh] bg-[#080B10] text-[#e1e2ea] antialiased selection:bg-[#00e5ff] selection:text-[#001f24] touch-scroll">
      {/* Real-time Sensor Feedback Toast */}
      {liveToast && (
        <div
          className={`fixed top-4 left-4 right-4 max-w-md mx-auto z-50 p-3 rounded-2xl shadow-2xl flex items-center justify-between border text-xs font-bold transition-all duration-300 backdrop-blur-xl animate-slide-down ${
            liveToast.type === 'available'
              ? 'bg-[#121f00]/95 text-[#aff833] border-[#aff833]/50 shadow-[0_0_20px_rgba(175,248,51,0.3)]'
              : 'bg-[#281418]/95 text-[#ff5964] border-[#ff5964]/50 shadow-[0_0_20px_rgba(255,89,100,0.3)]'
          }`}
        >
          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                liveToast.type === 'available' ? 'bg-[#aff833] animate-ping' : 'bg-[#ff5964]'
              }`}
            />
            <span>{liveToast.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setLiveToast(null)}
            className="p-1 hover:opacity-75 text-current"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* Screen Render Viewport (Constrained to max-w-md on desktop to mimic real phone; 100% full-screen on mobile) */}
      <div className={`flex-1 flex flex-col w-full ${currentScreen === 'mobile-auth-showcase' || currentScreen === 'prototype-reel' ? 'max-w-none' : 'max-w-md mx-auto shadow-2xl border-x border-white/5'} min-h-[100dvh] relative bg-[#080B10]`}>
        {/* Web Mockup Trio Presentation Screen (Kept for desktop showcase) */}
        {currentScreen === 'mobile-auth-showcase' && (
          <MobileAuthShowcase
            onNavigate={setCurrentScreen}
            onLoginSuccess={(user) => {
              setCurrentUser(user);
              if (user.role === 'renter') setCurrentScreen('renter-dashboard');
              else setCurrentScreen('journey');
            }}
          />
        )}

        {/* 1. Driver Mobile Sign In (Full Screen Native Experience) */}
        {currentScreen === 'auth-driver' && (
          <div className="w-full flex-1 flex flex-col bg-[#0c0e0d]">
            <AuthScreen
              initialRole="driver"
              initialView="signin"
              onNavigate={setCurrentScreen}
              onLoginSuccess={(user) => {
                setCurrentUser(user);
                setCurrentScreen('journey');
              }}
            />
          </div>
        )}

        {/* 2. Space Host (Renter) Mobile Sign In (Full Screen Native Experience) */}
        {currentScreen === 'auth-renter' && (
          <div className="w-full flex-1 flex flex-col bg-[#0c0e0d]">
            <AuthScreen
              initialRole="renter"
              initialView="signin"
              onNavigate={setCurrentScreen}
              onLoginSuccess={(user) => {
                setCurrentUser(user);
                setCurrentScreen('renter-dashboard');
              }}
            />
          </div>
        )}

        {/* 3. Space Host / Renter Portal Dashboard */}
        {currentScreen === 'renter-dashboard' && (
          <RenterDashboard
            onNavigate={setCurrentScreen}
            userName={currentUser?.name || 'Sarah Jenkins'}
          />
        )}

        {/* 4. Connected Journey & Map (Ola/Uber Style Map Experience) */}
        {currentScreen === 'journey' && (
          <ConnectedJourneyFlow
            onNavigate={setCurrentScreen}
            slots={levelSlots}
            availableSlotsCount={availableCount}
          />
        )}

        {/* 5. Select Parking Slot Floor Plan */}
        {currentScreen === 'slot-select' && (
          <SelectParkingSlot
            onNavigate={setCurrentScreen}
            slots={allSlots}
            selectedSlot={selectedSlot}
            onSelectSlot={handleSelectSlot}
            onToggleSlotStatus={handleToggleSlotStatus}
            durationHours={durationHours}
            onUpdateDuration={setDurationHours}
            activeLevel={activeLevel}
            onChangeLevel={setActiveLevel}
          />
        )}

        {/* 6. Facility Parking Details */}
        {currentScreen === 'parking-details' && (
          <ParkingDetails
            onNavigate={setCurrentScreen}
            availableCount={availableCount}
          />
        )}

        {/* 7. Fast Checkout & Booking Confirmation */}
        {currentScreen === 'booking-confirmation' && (
          <BookingConfirmation
            onNavigate={setCurrentScreen}
            selectedSlot={selectedSlot}
            durationHours={durationHours}
            onConfirmBooking={handleConfirmBooking}
          />
        )}

        {/* 8. Active Parking Journey & FastPass */}
        {currentScreen === 'active-journey' && (
          <ActiveParkingJourney
            onNavigate={setCurrentScreen}
            selectedSlot={selectedSlot}
          />
        )}

        {/* 9. My Bookings & Historical Receipts */}
        {currentScreen === 'my-bookings' && (
          <MyBookings
            onNavigate={setCurrentScreen}
            bookings={bookings}
          />
        )}

        {/* 10. Unified Driver Telemetry Companion */}
        {currentScreen === 'driver-companion' && (
          <UnifiedDriverCompanion
            onNavigate={setCurrentScreen}
            selectedSlot={selectedSlot}
          />
        )}

        {/* 11. Interactive Prototype Reel */}
        {currentScreen === 'prototype-reel' && (
          <InteractivePrototypeReel
            onNavigate={setCurrentScreen}
            slots={allSlots}
            selectedSlot={selectedSlot}
            onSelectSlot={handleSelectSlot}
            onToggleSlotStatus={handleToggleSlotStatus}
            availableCount={availableCount}
          />
        )}

        {/* Persistent Native Mobile Bottom Navigation Bar (Ola / Uber / Rapido Experience) */}
        {currentScreen !== 'mobile-auth-showcase' &&
          currentScreen !== 'auth-driver' &&
          currentScreen !== 'auth-renter' &&
          currentScreen !== 'parking-details' &&
          currentScreen !== 'slot-select' &&
          currentScreen !== 'booking-confirmation' &&
          currentScreen !== 'prototype-reel' && (
            <MobileBottomNav
              currentScreen={currentScreen}
              onNavigate={setCurrentScreen}
              activeBookingsCount={bookings.filter((b) => b.status === 'active').length}
            />
          )}
      </div>
    </div>
  );
}
