import React, { useState } from 'react';
import { ScreenId, Booking } from '../types.ts';
import { INITIAL_BOOKINGS } from '../data/mockData.ts';

interface MyBookingsProps {
  onNavigate: (screen: ScreenId) => void;
  bookings?: Booking[];
}

export const MyBookings: React.FC<MyBookingsProps> = ({ onNavigate, bookings = INITIAL_BOOKINGS }) => {
  const [activeTab, setActiveTab] = useState<'active' | 'upcoming' | 'completed' | 'cancelled'>('active');
  const [searchFilter, setSearchFilter] = useState('');
  const [showQrModal, setShowQrModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const activeBooking = bookings.find((b) => b.status === 'active') || bookings[0];

  const handleAction = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#101319] text-[#e1e2ea] relative pb-24">
      {/* Fixed Top Header */}
      <header className="sticky top-0 w-full z-40 bg-[#0b0e13]/85 backdrop-blur-xl border-b border-white/5">
        <div className="h-16 px-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => onNavigate('journey')}>
              <div className="w-8 h-8 rounded-xl bg-[#00e5ff] flex items-center justify-center text-[#001f24] font-black text-sm">
                IQ
              </div>
              <span className="font-extrabold text-base tracking-tight text-[#e1e2ea]">SpotIQ</span>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('journey')}
              className="flex items-center gap-1 min-h-[40px] px-2.5 py-1 rounded-full bg-[#191c21] hover:bg-[#1d2025] transition-colors text-left border border-white/5"
            >
              <span className="material-symbols-outlined text-[#00e5ff] text-[18px]">near_me</span>
              <div className="flex flex-col">
                <span className="text-[9px] text-[#bac9cc] uppercase tracking-wider font-bold">City Location</span>
                <span className="text-[13px] text-[#e1e2ea] font-semibold flex items-center gap-0.5 leading-tight">
                  Mysuru, KA
                  <span className="material-symbols-outlined text-[15px] text-[#bac9cc]">keyboard_arrow_down</span>
                </span>
              </div>
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              aria-label="Notifications"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#191c21] hover:bg-[#1d2025] text-[#e1e2ea] transition-colors relative border border-white/5"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#aff833] ring-2 ring-[#080B10]" />
            </button>
            <button
              type="button"
              aria-label="User Profile"
              className="w-10 h-10 p-0.5 rounded-full flex items-center justify-center focus:outline-none hover:opacity-90 transition-opacity"
            >
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-[#00e5ff]/50"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGRvsXIOJDp9oMBinPRaixXzHoRoqvLlDWpVZaGVVMADqRr-5vz_r82-reMEib9yUk2-4rT1nm6hbCRc1wb53Rz0hFcOf7yE4RCEPC_rxo9cHpK1YFjqH0P67Uu6BMD5SMo2vPADXeL7Kl7h0jcdlswANDcMh0axJAwekG6K47JBGz-Ghj93w4E-EC_elrw7Jh3bYvhR6EJpl3zXQuNFIqvh6LZlQx34b8kQWDwUjFU1dh0yGF4Ydf5w"
              />
            </button>
          </div>
        </div>
      </header>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-4 right-4 z-50 bg-[#1d2025] text-[#00e5ff] border border-[#00e5ff]/40 px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-bold animate-pulse">
          <span className="material-symbols-outlined text-[18px]">verified</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Content Body */}
      <main className="flex-1 flex flex-col p-4 gap-4">
        {/* Title Console Banner */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-extrabold tracking-wider text-[#00e5ff]">TRIP CONSOLE</span>
              <h1 className="text-2xl font-black text-[#e1e2ea] tracking-tight">My Bookings</h1>
            </div>
            <button
              type="button"
              onClick={() => handleAction('SpotIQ Support 24/7 Helpline: 1800-425-SPQI')}
              className="w-10 h-10 rounded-full bg-[#191c21] flex items-center justify-center text-[#e1e2ea] hover:bg-[#272a30] transition-colors border border-white/5"
            >
              <span className="material-symbols-outlined text-[20px]">help_outline</span>
            </button>
          </div>
          <p className="text-xs text-[#bac9cc]">
            Manage ongoing parking authorizations, active gate passes, and billing.
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex items-center w-full h-12 px-4 rounded-full bg-[#191c21] border border-white/5 shadow-sm">
          <span className="material-symbols-outlined text-[#00e5ff] text-[20px] mr-2">search</span>
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search past parking spots, slots, receipts..."
            className="w-full bg-transparent text-[#e1e2ea] placeholder-[#849396] text-xs focus:outline-none"
          />
          <button type="button" aria-label="Filter" className="text-[#849396] hover:text-[#e1e2ea]">
            <span className="material-symbols-outlined text-[18px]">tune</span>
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <button
            type="button"
            onClick={() => setActiveTab('active')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 ${
              activeTab === 'active'
                ? 'bg-[#00e5ff] text-[#001f24] shadow-md shadow-[#00e5ff]/20'
                : 'bg-[#191c21] text-[#bac9cc] hover:text-[#e1e2ea]'
            }`}
          >
            <span>Active</span>
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                activeTab === 'active' ? 'bg-[#001f24] text-[#00e5ff]' : 'bg-[#272a30] text-[#bac9cc]'
              }`}
            >
              1
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('upcoming')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 ${
              activeTab === 'upcoming'
                ? 'bg-[#00e5ff] text-[#001f24] shadow-md shadow-[#00e5ff]/20'
                : 'bg-[#191c21] text-[#bac9cc] hover:text-[#e1e2ea]'
            }`}
          >
            <span>Upcoming</span>
            <span className="w-5 h-5 rounded-full bg-[#272a30] text-[#bac9cc] flex items-center justify-center text-[10px]">
              1
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('completed')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 ${
              activeTab === 'completed'
                ? 'bg-[#00e5ff] text-[#001f24] shadow-md shadow-[#00e5ff]/20'
                : 'bg-[#191c21] text-[#bac9cc] hover:text-[#e1e2ea]'
            }`}
          >
            <span>Completed</span>
            <span className="px-1.5 py-0.2 rounded-full bg-[#272a30] text-[#bac9cc] text-[10px]">14</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('cancelled')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 ${
              activeTab === 'cancelled'
                ? 'bg-[#00e5ff] text-[#001f24] shadow-md shadow-[#00e5ff]/20'
                : 'bg-[#191c21] text-[#bac9cc] hover:text-[#e1e2ea]'
            }`}
          >
            <span>Cancelled</span>
            <span className="w-5 h-5 rounded-full bg-[#272a30] text-[#bac9cc] flex items-center justify-center text-[10px]">
              0
            </span>
          </button>
        </div>

        {/* Primary Active Booking Card */}
        <div className="relative rounded-2xl bg-[#191c21] shadow-xl overflow-hidden border border-[#aff833]/30">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00e5ff]/10 via-transparent to-[#aff833]/5 pointer-events-none" />

          <div className="p-4 flex flex-col gap-3 relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#101319] border border-[#aff833]/30 shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-[#aff833] animate-pulse shadow-[0_0_8px_#aff833]" />
                <span className="text-[10px] font-black text-[#aff833] tracking-widest uppercase">ACTIVE NOW</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-[#00e5ff] font-bold bg-[#1d2025] px-2.5 py-1 rounded-full border border-white/5">
                <span className="material-symbols-outlined text-[15px]">timer</span>
                <span>01h 14m left</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-14 h-14 rounded-xl bg-[#272a30] overflow-hidden shrink-0 border border-white/5">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmQwf7NbO6OGemcISQnOhA1_hwNlQ6qJxO86oKDa3x0S1cTt0SmIWpcsxEkyZ6_YDAgMwuWlspbhnNGOe5yq5zuBVPmphucrpfVwggqVBDQGs3RkQNt4DYn1_5EMKnl7CqlOXwmOOUA6EjKjH8D_t-nv6HUkuayXIerEdANAXoOkY7WpixlZCewZLUo6FhsnznAhMDJazKl02sYctHn932muTLWWgGKqaeSQe6yiqgSxHfHSB9oX2ZXw"
                  alt="Multi-level building"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <h2 className="font-bold text-sm text-[#e1e2ea] truncate">{activeBooking.facilityName}</h2>
                <p className="text-xs text-[#bac9cc] truncate">{activeBooking.facilityAddress}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-extrabold text-[#00e5ff] bg-[#00e5ff]/20 px-2 py-0.5 rounded uppercase">
                    {activeBooking.slotCode}
                  </span>
                  <span className="text-xs text-[#849396]">• {activeBooking.level}</span>
                </div>
              </div>
            </div>

            {/* Schedule & Tariff Grid */}
            <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-[#1d2025] border border-white/5 text-xs">
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] text-[#849396] uppercase font-bold tracking-wider">Permit Window</span>
                <span className="font-semibold text-[#e1e2ea] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[#00e5ff] text-[14px]">schedule</span>
                  {activeBooking.startTime} – {activeBooking.endTime}
                </span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] text-[#849396] uppercase font-bold tracking-wider">Tariff Settled</span>
                <span className="font-extrabold text-[#aff833] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span>
                  ₹{activeBooking.totalAmount.toFixed(2)} (UPI Paid)
                </span>
              </div>
            </div>

            {/* Interactive Pass Actions */}
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                id="view-qr-trigger"
                onClick={() => setShowQrModal(!showQrModal)}
                className="flex-1 h-12 rounded-full bg-[#00e5ff] text-[#001f24] font-extrabold text-xs flex items-center justify-center gap-2 shadow-md hover:brightness-110 active:scale-[0.98] transition-transform"
              >
                <span className="material-symbols-outlined text-[20px]">qr_code_scanner</span>
                <span>{showQrModal ? 'Hide FastPass' : 'View Live Pass & QR'}</span>
              </button>
              <button
                type="button"
                aria-label="Get Turn-by-Turn Navigation"
                onClick={() => onNavigate('active-journey')}
                className="h-12 w-12 rounded-full bg-[#272a30] hover:bg-[#32353b] text-[#00e5ff] flex items-center justify-center active:scale-95 transition-transform border border-white/5"
              >
                <span className="material-symbols-outlined text-[20px]">directions</span>
              </button>
            </div>
          </div>
        </div>

        {/* QR Code Inspection Modal / Expandable View */}
        {showQrModal && (
          <div className="p-4 rounded-2xl bg-[#1d2025] border border-[#00e5ff]/40 shadow-2xl flex flex-col gap-3">
            <div className="flex items-center justify-between pb-1">
              <div>
                <span className="text-[10px] text-[#00e5ff] font-extrabold uppercase">Smart Barrier Scanner</span>
                <h3 className="font-bold text-sm text-[#e1e2ea]">Digital Gate Authorization</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowQrModal(false)}
                className="w-8 h-8 rounded-full bg-[#272a30] flex items-center justify-center text-[#bac9cc] hover:text-[#e1e2ea]"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>

            <div className="flex flex-col items-center justify-center py-2 gap-2">
              <div className="p-4 rounded-2xl bg-white flex items-center justify-center shadow-inner">
                <svg className="w-40 h-40 text-[#080B10]" fill="currentColor" viewBox="0 0 100 100">
                  <path d="M0 0h30v30H0zm6 6v18h18V6zm4 4h10v10H10zm60-10h30v30H70zm6 6v18h18V6zm4 4h10v10H80zM0 70h30v30H0zm6 6v18h18V76zm4 4h10v10H10zm45-66h5v15h-5zm10 5h10v5H65zm-25 5h10v10H40zm15 10h10v5H55zm-15 15h5v20h-5zm20 5h10v5H60zm10 5h5v10h-5zm5-15h15v5H75zm10 10h10v15H85zm-30 5h10v10H55zm15 10h10v5H70zm-25 0h5v10h-5zm-5-10h10v5H40z" />
                </svg>
              </div>
              <span className="text-[10px] font-bold text-[#bac9cc] tracking-wider uppercase">
                Scan at Entrance Barrier • Pass ID: SPQ-MY-89241
              </span>
            </div>
          </div>
        )}

        {/* Scheduled Ahead Section */}
        <section className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#849396] uppercase font-bold tracking-wider">Scheduled Ahead</span>
            <span className="text-[10px] text-[#bac9cc]">Automated Check-in Enabled</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#191c21] border border-white/5 shadow-md flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-[#1d2025] text-[#ffc1c0] text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ffc1c0]" />
                Confirmed • Tomorrow
              </span>
              <span className="text-[10px] text-[#849396]">FastTag Linked</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#272a30] overflow-hidden shrink-0 border border-white/5">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkKA0cxus6UqIpLBt6poxK8xyUZAsgRsPYoIEe6udzMM5thDOWPyavAv3a9zL-tZEZelRP9uDJGQt9gzNwUSZFCSaMlydMQyiqnuRDUpdj0a3NwiH-3J7zdWc_kps3RP3GyWFfwjznUfzLuVyNtIBitIFwG3bGyHYwWQaoGiMLxkGv6Nj5PaN6uW-0VmoonafqWQNdBJoz-O1u-Jt8ZOQ3zbS5MapwTrlyUnlDLeBxGP4qEXwJeXMIzA"
                  alt="Devaraja Market"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <h3 className="font-bold text-xs text-[#e1e2ea] truncate">Devaraja Market Underground</h3>
                <p className="text-xs text-[#bac9cc]">Slot A12 • Standard Car Stall</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-1 text-[#bac9cc] text-xs">
                <span className="material-symbols-outlined text-[#849396] text-[16px]">calendar_today</span>
                <span>Tomorrow, 10:00 AM – 12:00 PM</span>
              </div>
              <button
                type="button"
                onClick={() => handleAction('Scheduled details opened.')}
                className="h-8 px-3 rounded-full bg-[#272a30] text-[#00e5ff] text-xs font-semibold hover:bg-[#32353b]"
              >
                Manage Details
              </button>
            </div>
          </div>
        </section>

        {/* Completed Stays Section */}
        <section className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#849396] uppercase font-bold tracking-wider">Completed Stays</span>
            <button
              type="button"
              onClick={() => handleAction('Tax invoices compiled and exported to PDF!')}
              className="text-[10px] text-[#00e5ff] font-bold uppercase hover:underline"
            >
              Export All (PDF)
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {[
              {
                title: 'Sayyaji Rao Commercial Plaza',
                date: '18 Oct',
                slot: 'Slot C08',
                amount: '₹40.00',
              },
              {
                title: 'Chamundi Hill Viewpoint Lot',
                date: '12 Oct',
                slot: 'Slot P02',
                amount: '₹20.00',
              },
              {
                title: 'KRS Road Railway Station Hub',
                date: '04 Oct',
                slot: 'Slot EV-03',
                amount: '₹85.00',
              },
            ].map((stay, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-[#191c21] flex items-center justify-between border border-white/5"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-[#272a30] flex items-center justify-center shrink-0 text-[#aff833]">
                    <span className="material-symbols-outlined text-[20px]">check_circle</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <h4 className="font-bold text-xs text-[#e1e2ea] truncate">{stay.title}</h4>
                    <div className="flex items-center gap-1.5 text-[#bac9cc] text-xs">
                      <span>{stay.date}</span>
                      <span>•</span>
                      <span>{stay.slot}</span>
                      <span>•</span>
                      <span className="font-extrabold text-[#e1e2ea]">{stay.amount}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    aria-label="Download Receipt"
                    onClick={() => handleAction(`Tax invoice for ${stay.title} downloaded!`)}
                    className="w-9 h-9 rounded-full bg-[#1d2025] hover:bg-[#272a30] flex items-center justify-center text-[#bac9cc] hover:text-[#e1e2ea] transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">receipt_long</span>
                  </button>
                  <button
                    type="button"
                    aria-label="Rebook spot"
                    onClick={() => onNavigate('slot-select')}
                    className="w-9 h-9 rounded-full bg-[#1d2025] hover:bg-[#272a30] flex items-center justify-center text-[#00e5ff] transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">replay</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* BLE Security Callout */}
        <div className="p-3.5 rounded-2xl bg-[#191c21] flex items-center gap-3 border border-white/5">
          <span className="material-symbols-outlined text-[#00e5ff] text-[20px] shrink-0">shield_lock</span>
          <p className="text-xs text-[#bac9cc]">
            Mysuru Smart City digital parking passes are cryptographically authorized via BLE sensors at boom gates.
          </p>
        </div>
      </main>
    </div>
  );
};
