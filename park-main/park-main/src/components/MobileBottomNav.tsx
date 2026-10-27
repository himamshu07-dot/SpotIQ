import React from 'react';
import { ScreenId } from '../types.ts';

interface MobileBottomNavProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  activeBookingsCount?: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentScreen,
  onNavigate,
  activeBookingsCount = 1,
}) => {
  const navItems: {
    id: ScreenId;
    label: string;
    icon: string;
    matchScreens: ScreenId[];
    badge?: number;
  }[] = [
    {
      id: 'journey',
      label: 'Explore',
      icon: 'map',
      matchScreens: ['journey', 'parking-details'],
    },
    {
      id: 'slot-select',
      label: 'Slots',
      icon: 'grid_view',
      matchScreens: ['slot-select'],
    },
    {
      id: 'active-journey',
      label: 'FastPass',
      icon: 'qr_code_2',
      matchScreens: ['active-journey', 'booking-confirmation', 'driver-companion'],
    },
    {
      id: 'my-bookings',
      label: 'Bookings',
      icon: 'confirmation_number',
      matchScreens: ['my-bookings'],
      badge: activeBookingsCount,
    },
    {
      id: 'renter-dashboard',
      label: 'Host Bay',
      icon: 'garage',
      matchScreens: ['renter-dashboard'],
    },
    {
      id: 'auth-driver',
      label: 'Account',
      icon: 'account_circle',
      matchScreens: ['auth-driver', 'auth-renter'],
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none">
      <div className="w-full max-w-md mx-auto pointer-events-auto">
        <div className="bg-[#0c0e0d]/95 backdrop-blur-2xl border-t border-white/10 shadow-[0_-10px_30px_rgba(0,0,0,0.8)] pb-[max(env(safe-area-inset-bottom),10px)] pt-2 px-2">
          <div className="flex items-center justify-around">
            {navItems.map((item) => {
              const isActive = item.matchScreens.includes(currentScreen);

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  className={`flex-1 flex flex-col items-center justify-center min-h-[46px] relative py-1 rounded-xl transition-all active:scale-95 ${
                    isActive ? 'text-[#00e5ff]' : 'text-white/60 hover:text-white/90'
                  }`}
                >
                  <div className="relative flex items-center justify-center">
                    <span
                      className={`material-symbols-outlined text-[22px] transition-transform ${
                        isActive ? 'scale-110' : ''
                      }`}
                      style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      {item.icon}
                    </span>

                    {/* Badge */}
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="absolute -top-1 -right-2 px-1.5 py-0.2 rounded-full bg-[#aff833] text-[#0c0e0d] text-[9px] font-black leading-tight shadow-sm">
                        {item.badge}
                      </span>
                    )}

                    {/* Active Glow Dot */}
                    {isActive && (
                      <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-[#00e5ff] shadow-[0_0_8px_#00e5ff]" />
                    )}
                  </div>

                  <span
                    className={`text-[10px] tracking-tight mt-1 leading-none ${
                      isActive ? 'font-bold text-[#00e5ff]' : 'font-medium text-white/60'
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};
