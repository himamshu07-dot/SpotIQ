import React from 'react';
import { ParkingSlot, getStatusIndicatorDetails } from '../utils/parkingRules.ts';

interface SlotIndicatorProps {
  slot: ParkingSlot;
  isSelected?: boolean;
  onSelect?: (slot: ParkingSlot) => void;
  onToggleStatus?: (slotId: string) => void;
  variant?: 'card' | 'badge' | 'compact';
  showSensorPulse?: boolean;
}

export const SlotIndicator: React.FC<SlotIndicatorProps> = ({
  slot,
  isSelected = false,
  onSelect,
  onToggleStatus,
  variant = 'card',
  showSensorPulse = true,
}) => {
  const currentStatus = isSelected ? 'selected' : slot.status;
  const meta = getStatusIndicatorDetails(currentStatus);

  if (variant === 'badge') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border transition-all ${meta.bgBadge}`}
      >
        <span className={`w-2 h-2 rounded-full ${meta.dotColor} ${slot.status === 'available' ? 'animate-pulse' : ''}`} />
        <span>{slot.code}</span>
        <span className="text-[10px] opacity-90 uppercase font-semibold">• {meta.label}</span>
      </span>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="flex items-center justify-between p-2 rounded-lg bg-[#191c21] border border-white/5">
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${meta.dotColor} ${meta.glow}`} />
          <span className="font-bold text-sm text-[#e1e2ea]">{slot.code}</span>
          <span className="text-xs text-[#bac9cc]">
            {slot.type === 'ev' ? '⚡ EV Fast' : slot.type === 'accessible' ? '♿ Accessible' : 'Standard'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-bold ${meta.textLabel}`}>{meta.label}</span>
          {slot.status === 'occupied' && slot.vehiclePlate && (
            <span className="text-[10px] text-[#849396] font-mono">{slot.vehiclePlate}</span>
          )}
          {slot.status === 'available' && (
            <span className="text-xs text-[#e1e2ea] font-semibold">₹{slot.ratePerHour}/hr</span>
          )}
        </div>
      </div>
    );
  }

  // Full Stall Card (used on the parking deck / bay grid)
  const isAvailable = slot.status === 'available';
  const isOccupied = slot.status === 'occupied';
  const isReserved = slot.status === 'reserved';

  return (
    <div
      role="button"
      tabIndex={isAvailable || isSelected ? 0 : -1}
      aria-label={`Parking Slot ${slot.code}, ${meta.label}${slot.type === 'ev' ? ', EV charging available' : ''}`}
      onClick={() => {
        if ((isAvailable || isSelected) && onSelect) {
          onSelect(slot);
        }
      }}
      className={`relative h-24 rounded-2xl p-2.5 flex flex-col justify-between text-left transition-all select-none ${
        isSelected
          ? 'bg-[#272a30] border-2 border-[#00e5ff] shadow-[0_0_24px_rgba(0,229,255,0.35)] scale-[1.02] cursor-pointer'
          : isAvailable
          ? 'bg-[#191c21] hover:bg-[#1d2025] border border-[#aff833]/40 shadow-sm hover:border-[#aff833] cursor-pointer active:scale-[0.98]'
          : isReserved
          ? 'bg-[#2D2311]/70 border border-[#ffb300]/30 opacity-80 cursor-not-allowed'
          : 'bg-[#281418]/70 border border-[#ff5964]/30 opacity-85 cursor-not-allowed'
      }`}
    >
      {/* Top Banner Indicator */}
      {isSelected ? (
        <div className="absolute -top-2 right-2 px-2 py-0.5 rounded-full bg-[#00e5ff] text-[#001f24] font-bold text-[9px] flex items-center gap-0.5 shadow-md">
          <span className="material-symbols-outlined text-[11px]">bolt</span>
          <span>SELECTED</span>
        </div>
      ) : (
        <div className="absolute -top-1.5 right-2 flex items-center gap-1">
          {showSensorPulse && isAvailable && (
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#aff833] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#aff833]"></span>
            </span>
          )}
        </div>
      )}

      {/* Header: Slot Code + Real-time Visual Status Indicator Dot/Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-black tracking-tight ${
              isSelected ? 'text-[#00e5ff] text-base' : isAvailable ? 'text-[#aff833] text-sm' : 'text-[#e1e2ea] text-sm'
            }`}
          >
            {slot.code}
          </span>
          {/* Visual Indicator LED Dot */}
          <span
            className={`w-2.5 h-2.5 rounded-full ${meta.dotColor} ${
              isAvailable ? 'shadow-[0_0_8px_#aff833]' : isOccupied ? 'shadow-[0_0_8px_#ff5964]' : ''
            }`}
            title={`Status: ${meta.label}`}
          />
        </div>

        {/* Feature Icon */}
        <div className="flex items-center gap-1">
          {slot.type === 'ev' && (
            <span
              className="material-symbols-outlined text-[#00e5ff] text-[16px]"
              title="60kW DC Fast EV Charger"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              electric_car
            </span>
          )}
          {slot.type === 'accessible' && (
            <span className="material-symbols-outlined text-[#00e5ff] text-[16px]" title="Wheelchair Accessible">
              accessible
            </span>
          )}
          {isAvailable && (
            <span className="material-symbols-outlined text-[#aff833] text-[16px]">
              check_circle
            </span>
          )}
          {isOccupied && (
            <span className="material-symbols-outlined text-[#ff5964] text-[16px]">
              directions_car
            </span>
          )}
          {isReserved && (
            <span className="material-symbols-outlined text-[#ffb300] text-[16px]">
              schedule
            </span>
          )}
        </div>
      </div>

      {/* Middle: Status Pill or Tag */}
      <div className="my-0.5">
        {isSelected ? (
          <div className="bg-[#00e5ff]/20 px-2 py-0.5 rounded text-[10px] text-[#00e5ff] font-bold flex items-center gap-1 w-fit">
            <span>⚡ 60kW EV Fast</span>
          </div>
        ) : isAvailable ? (
          <div className="flex items-center gap-1">
            <span className="text-[10px] font-bold text-[#aff833] tracking-wider uppercase">
              ● VACANT
            </span>
          </div>
        ) : isOccupied ? (
          <div className="flex flex-col">
            <span className="text-[9px] font-bold text-[#ff5964] px-1.5 py-0.2 rounded bg-[#ff5964]/10 w-fit">
              OCCUPIED
            </span>
            <span className="text-[9px] text-[#bac9cc] truncate font-mono mt-0.5">
              {slot.vehiclePlate || 'ANPR Active'}
            </span>
          </div>
        ) : (
          <div className="flex flex-col">
            <span className="text-[9px] font-bold text-[#ffb300] px-1.5 py-0.2 rounded bg-[#ffb300]/10 w-fit">
              RESERVED
            </span>
            <span className="text-[9px] text-[#849396] truncate mt-0.5">
              {slot.reservedUntil || 'Hold active'}
            </span>
          </div>
        )}
      </div>

      {/* Footer: Pricing or Stall Spec */}
      <div className="flex items-center justify-between text-[11px] pt-0.5 border-t border-white/5">
        <span className="font-bold text-[#e1e2ea]">
          ₹{slot.ratePerHour}
          <span className="text-[9px] font-normal text-[#849396]">/hr</span>
        </span>
        <span className="text-[9px] text-[#849396] uppercase font-semibold">
          {slot.pillarInfo ? slot.pillarInfo.split('•')[0] : 'Covered'}
        </span>
      </div>

      {/* Quick Test Status Switcher (for evaluating real-time availability changes) */}
      {onToggleStatus && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleStatus(slot.id);
          }}
          title="Simulate IoT sensor toggle (Vacant <-> Occupied)"
          className="absolute -bottom-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#32353b] hover:bg-[#36393f] text-[#bac9cc] flex items-center justify-center text-[10px] border border-white/10 opacity-70 hover:opacity-100 transition-opacity"
        >
          <span className="material-symbols-outlined text-[11px]">sync</span>
        </button>
      )}
    </div>
  );
};
