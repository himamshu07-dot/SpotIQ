export type SlotStatus = 'available' | 'occupied' | 'reserved' | 'selected';

export interface ParkingSlot {
  id: string;
  code: string;
  level: 'B1' | 'B2' | 'B3';
  status: SlotStatus;
  type: 'standard' | 'ev' | 'accessible' | 'valet';
  ratePerHour: number;
  vehiclePlate?: string;
  reservedUntil?: string;
  hasCharger?: boolean;
  chargerType?: string;
  pillarInfo?: string;
  distanceToLift?: string;
}

export interface FareCalculation {
  hours: number;
  baseRatePerHour: number;
  parkingFee: number;
  digitalConvenienceFee: number;
  guaranteedHoldFee: number;
  promoDiscount: number;
  totalPayable: number;
}

export function calculateParkingFee(baseRatePerHour: number, hours: number): number {
  if (hours <= 0) return 0;
  return baseRatePerHour * hours;
}

export function calculateTotalFare(
  hours: number,
  baseRatePerHour: number = 30,
  digitalConvenienceFee: number = 3.0,
  promoDiscount: number = 0
): FareCalculation {
  const parkingFee = calculateParkingFee(baseRatePerHour, hours);
  const guaranteedHoldFee = 0; // free promo
  const totalPayable = Math.max(0, parkingFee + digitalConvenienceFee + guaranteedHoldFee - promoDiscount);

  return {
    hours,
    baseRatePerHour,
    parkingFee,
    digitalConvenienceFee,
    guaranteedHoldFee,
    promoDiscount,
    totalPayable: Number(totalPayable.toFixed(2)),
  };
}

export function countAvailableSlots(slots: ParkingSlot[]): number {
  return slots.filter((slot) => slot.status === 'available').length;
}

export function countSlotsByStatus(slots: ParkingSlot[]) {
  return {
    available: slots.filter((s) => s.status === 'available').length,
    occupied: slots.filter((s) => s.status === 'occupied').length,
    reserved: slots.filter((s) => s.status === 'reserved').length,
    selected: slots.filter((s) => s.status === 'selected').length,
    total: slots.length,
  };
}

export function getStatusIndicatorDetails(status: SlotStatus) {
  switch (status) {
    case 'available':
      return {
        label: 'AVAILABLE',
        color: '#aff833',
        bgBadge: 'bg-[#aff833]/15 text-[#aff833] border-[#aff833]/30',
        dotColor: 'bg-[#aff833]',
        textLabel: 'text-[#aff833]',
        glow: 'shadow-[0_0_12px_rgba(175,248,51,0.4)]',
        isSelectable: true,
      };
    case 'selected':
      return {
        label: 'SELECTED',
        color: '#00e5ff',
        bgBadge: 'bg-[#00e5ff] text-[#001f24] border-[#00e5ff]',
        dotColor: 'bg-[#00e5ff]',
        textLabel: 'text-[#00e5ff]',
        glow: 'shadow-[0_0_20px_rgba(0,229,255,0.45)] ring-2 ring-[#00e5ff]',
        isSelectable: true,
      };
    case 'reserved':
      return {
        label: 'RESERVED',
        color: '#ffb300',
        bgBadge: 'bg-[#ffb300]/15 text-[#ffb300] border-[#ffb300]/30',
        dotColor: 'bg-[#ffb300]',
        textLabel: 'text-[#ffb300]',
        glow: '',
        isSelectable: false,
      };
    case 'occupied':
    default:
      return {
        label: 'OCCUPIED',
        color: '#ff5964',
        bgBadge: 'bg-[#ff5964]/15 text-[#ff5964] border-[#ff5964]/30',
        dotColor: 'bg-[#ff5964]',
        textLabel: 'text-[#ff5964]',
        glow: '',
        isSelectable: false,
      };
  }
}
