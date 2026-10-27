import { ParkingSlot } from './utils/parkingRules.ts';

export type ScreenId =
  | 'mobile-auth-showcase'
  | 'auth-driver'
  | 'auth-renter'
  | 'renter-dashboard'
  | 'journey'
  | 'slot-select'
  | 'parking-details'
  | 'booking-confirmation'
  | 'active-journey'
  | 'my-bookings'
  | 'driver-companion'
  | 'prototype-reel';

export interface Vehicle {
  id: string;
  name: string;
  plate: string;
  type: 'ev' | 'petrol' | 'diesel' | 'twowheeler';
  isDefault?: boolean;
}

export interface Booking {
  id: string;
  passId: string;
  facilityName: string;
  facilityAddress: string;
  slotCode: string;
  level: string;
  vehicle: Vehicle;
  startTime: string;
  endTime: string;
  durationHours: number;
  totalAmount: number;
  paymentMethod: string;
  status: 'active' | 'upcoming' | 'completed' | 'cancelled';
  dateLabel: string;
}

export interface Facility {
  id: string;
  name: string;
  location: string;
  address: string;
  ratePerHour: number;
  availableSpots: number;
  totalSpots: number;
  walkDistance: string;
  walkTime: string;
  levels: {
    name: string;
    levelKey: 'B1' | 'B2' | 'B3';
    total: number;
    available: number;
    description: string;
    recommended?: boolean;
    isFull?: boolean;
  }[];
  evChargersCount: number;
  amenities: string[];
}
