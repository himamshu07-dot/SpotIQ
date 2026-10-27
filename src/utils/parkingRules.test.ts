import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateParkingFee,
  calculateTotalFare,
  countAvailableSlots,
  countSlotsByStatus,
  getStatusIndicatorDetails,
  ParkingSlot,
} from './parkingRules.ts';

test('calculateParkingFee calculates correctly for positive hours', () => {
  assert.equal(calculateParkingFee(30, 2), 60);
  assert.equal(calculateParkingFee(30, 1), 30);
  assert.equal(calculateParkingFee(30, 0), 0);
});

test('calculateTotalFare includes smart city convenience fee and discounts', () => {
  const fare = calculateTotalFare(2, 30, 3.0, 0);
  assert.equal(fare.parkingFee, 60);
  assert.equal(fare.digitalConvenienceFee, 3.0);
  assert.equal(fare.totalPayable, 63);
});

test('countAvailableSlots accurately counts only available bays', () => {
  const mockSlots: ParkingSlot[] = [
    { id: '1', code: 'B01', level: 'B2', status: 'occupied', type: 'standard', ratePerHour: 30 },
    { id: '2', code: 'B02', level: 'B2', status: 'occupied', type: 'standard', ratePerHour: 30 },
    { id: '3', code: 'B03', level: 'B2', status: 'available', type: 'standard', ratePerHour: 30 },
    { id: '4', code: 'B04', level: 'B2', status: 'selected', type: 'ev', ratePerHour: 30 },
    { id: '5', code: 'B05', level: 'B2', status: 'available', type: 'standard', ratePerHour: 30 },
    { id: '6', code: 'B06', level: 'B2', status: 'reserved', type: 'standard', ratePerHour: 30 },
  ];

  assert.equal(countAvailableSlots(mockSlots), 2);
  const counts = countSlotsByStatus(mockSlots);
  assert.equal(counts.available, 2);
  assert.equal(counts.occupied, 2);
  assert.equal(counts.reserved, 1);
  assert.equal(counts.selected, 1);
  assert.equal(counts.total, 6);
});

test('getStatusIndicatorDetails returns appropriate color indicators', () => {
  const avail = getStatusIndicatorDetails('available');
  assert.equal(avail.color, '#aff833');
  assert.equal(avail.isSelectable, true);

  const occ = getStatusIndicatorDetails('occupied');
  assert.equal(occ.color, '#ff5964');
  assert.equal(occ.isSelectable, false);

  const sel = getStatusIndicatorDetails('selected');
  assert.equal(sel.color, '#00e5ff');
  assert.equal(sel.isSelectable, true);

  const res = getStatusIndicatorDetails('reserved');
  assert.equal(res.color, '#ffb300');
  assert.equal(res.isSelectable, false);
});
