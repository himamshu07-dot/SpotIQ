import React, { useState } from 'react';
import { ScreenId } from '../types.ts';
import { GlowingOrb } from '../components/GlowingOrb.tsx';

export type UserRole = 'driver' | 'renter';
export type AuthView = 'signin' | 'register' | 'forgot' | 'otp';

interface AuthScreenProps {
  initialRole?: UserRole;
  initialView?: AuthView;
  onNavigate: (screen: ScreenId) => void;
  onLoginSuccess?: (user: { name: string; email: string; role: UserRole }) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  initialRole = 'driver',
  initialView = 'signin',
  onNavigate,
  onLoginSuccess,
}) => {
  const [role, setRole] = useState<UserRole>(initialRole);
  const [view, setView] = useState<AuthView>(initialView);

  // Form states
  const [fullName, setFullName] = useState(role === 'driver' ? 'Alex Smith' : 'Sarah Jenkins');
  const [email, setEmail] = useState(role === 'driver' ? 'driver.alex@gmail.com' : 'space.host@gmail.com');
  const [password, setPassword] = useState('@Sn123hsn#');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Host/Renter specific fields
  const [propertyTitle, setPropertyTitle] = useState('Central Mysuru Secure Bay');
  const [hourlyRate, setHourlyRate] = useState('40');
  const [spaceType, setSpaceType] = useState<'driveway' | 'covered' | 'garage'>('driveway');

  // Forgot password OTP code state
  const [otpCode, setOtpCode] = useState(['4', '8', '2', '', '']);
  const [codeSent, setCodeSent] = useState(false);
  const [authSuccessMsg, setAuthSuccessMsg] = useState<string | null>(null);

  // Quick fill demo credentials
  const handleQuickDemo = (targetRole: UserRole) => {
    setRole(targetRole);
    if (targetRole === 'driver') {
      setFullName('Alex Smith');
      setEmail('driver.alex@gmail.com');
      setPassword('@Driver2026#');
    } else {
      setFullName('Mysuru Space Host');
      setEmail('space.host@mysuru.in');
      setPassword('@Renter2026#');
      setPropertyTitle('Palace Road Private Bay #3');
      setHourlyRate('50');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (view === 'forgot') {
      setCodeSent(true);
      setView('otp');
      return;
    }

    if (view === 'otp') {
      setAuthSuccessMsg('Code verified successfully! Welcome back.');
      setTimeout(() => {
        if (onLoginSuccess) {
          onLoginSuccess({ name: fullName || 'User', email, role });
        }
        if (role === 'renter') {
          onNavigate('renter-dashboard');
        } else {
          onNavigate('journey');
        }
      }, 1000);
      return;
    }

    // Sign in or Register success
    const welcome =
      view === 'register'
        ? `Account registered as ${role === 'driver' ? 'Driver' : 'Space Renter/Host'}!`
        : `Signed in as ${role === 'driver' ? 'Driver' : 'Space Provider'}!`;

    setAuthSuccessMsg(welcome);

    setTimeout(() => {
      if (onLoginSuccess) {
        onLoginSuccess({ name: fullName || 'Alex Smith', email, role });
      }
      if (role === 'renter') {
        onNavigate('renter-dashboard');
      } else {
        onNavigate('journey');
      }
    }, 900);
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-6 pt-3 pb-6 text-[#e6ede8] relative overflow-hidden bg-[#0c0e0d]">
      
      {/* Background ambient radial dots / grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'radial-gradient(#aff833 0.75px, transparent 0.75px)',
          backgroundSize: '18px 18px',
        }}
      />

      {/* Subtle top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-44 bg-[#aff833]/10 blur-[70px] pointer-events-none" />

      {/* Screen Header Row: Back button, Role Selector Badge & Sync/Toggle */}
      <div className="relative z-10 flex items-center justify-between pt-1 pb-2">
        {/* Circular Back Button (Matching Image) */}
        <button
          type="button"
          onClick={() => {
            if (view === 'otp') setView('forgot');
            else if (view === 'forgot' || view === 'register') setView('signin');
            else onNavigate('journey');
          }}
          aria-label="Back"
          className="w-10 h-10 rounded-full bg-[#171a18] hover:bg-[#232924] active:scale-95 border border-white/10 flex items-center justify-center transition-all shadow-md group"
        >
          <span className="material-symbols-outlined text-[20px] text-white/90 group-hover:-translate-x-0.5 transition-transform">
            arrow_back
          </span>
        </button>

        {/* Dedicated Role Switcher Pill (Driver vs Space Renter) */}
        <div className="flex items-center p-1 bg-[#151916] rounded-full border border-white/10 shadow-inner">
          <button
            type="button"
            onClick={() => handleQuickDemo('driver')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${
              role === 'driver'
                ? 'bg-[#d4ff32] text-[#0b0e0c] shadow-[0_0_12px_rgba(212,255,50,0.4)]'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">directions_car</span>
            <span>Driver</span>
          </button>

          <button
            type="button"
            onClick={() => handleQuickDemo('renter')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${
              role === 'renter'
                ? 'bg-[#00e5ff] text-[#001f24] shadow-[0_0_12px_rgba(0,229,255,0.4)]'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">garage</span>
            <span>Space Host</span>
          </button>
        </div>

        {/* Circular Refresh / Quick Demo Fill Button (Matching Image) */}
        <button
          type="button"
          onClick={() => handleQuickDemo(role === 'driver' ? 'renter' : 'driver')}
          title="Toggle Driver/Renter demo preset"
          className="w-10 h-10 rounded-full bg-[#171a18] hover:bg-[#232924] active:scale-95 border border-white/10 flex items-center justify-center transition-all shadow-md"
        >
          <span className="material-symbols-outlined text-[18px] text-white/80 animate-[spin_12s_linear_infinite]">
            sync
          </span>
        </button>
      </div>

      {/* Center Hero: 3D Glowing Orb & Headings */}
      <div className="relative z-10 flex flex-col items-center text-center mt-2 mb-4">
        {/* Glowing 3D Orb Logo (as in mockup image) */}
        <div className="mb-3">
          <GlowingOrb size={82} role={role} />
        </div>

        {/* Dynamic Badge for Driver vs Space Host */}
        <div className="mb-1">
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest ${
              role === 'driver'
                ? 'bg-[#d4ff32]/15 text-[#d4ff32] border border-[#d4ff32]/30'
                : 'bg-[#00e5ff]/15 text-[#00e5ff] border border-[#00e5ff]/30'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
            {role === 'driver' ? 'Driver Portal' : 'Parking Space Host'}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-black tracking-tight text-white">
          {view === 'signin' && 'Welcome Back!'}
          {view === 'register' && 'Create Your Account?'}
          {view === 'forgot' && 'Forgot Password?'}
          {view === 'otp' && 'Enter Verification Code'}
        </h1>

        {/* Subtitle */}
        <p className="text-[12px] text-white/60 max-w-[280px] mt-1.5 leading-relaxed">
          {view === 'signin' &&
            (role === 'driver'
              ? 'Sign in to access smart, personalized parking and live bay tracking.'
              : 'Sign in to monitor your rented parking spaces, rates & bookings.')}
          {view === 'register' &&
            (role === 'driver'
              ? 'Create your account to explore exciting parking spots and seamless bookings.'
              : 'Register to list your driveway, garage or parking bay and start earning.')}
          {view === 'forgot' &&
            "Enter your email and we'll send a 5-digit verification code instantly."}
          {view === 'otp' &&
            `Enter the 5-digit verification code sent to ${email}`}
        </p>

        {/* Live feedback toast */}
        {authSuccessMsg && (
          <div className="mt-3 px-3 py-1.5 rounded-xl bg-lime-950/80 border border-[#d4ff32] text-[#d4ff32] text-xs font-bold animate-bounce shadow-lg">
            ✓ {authSuccessMsg}
          </div>
        )}
      </div>

      {/* Main Authentication Form */}
      <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-3.5 flex-1 justify-center">
        {/* Full Name field (Register only) */}
        {view === 'register' && (
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-semibold text-white/70">
              Full Name<span className="text-[#aff833]">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Alex Smith"
                className="w-full h-11 px-3.5 bg-[#141715] border border-white/10 rounded-2xl text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#d4ff32] focus:ring-1 focus:ring-[#d4ff32] transition-all"
              />
              <span className="material-symbols-outlined absolute right-3 top-3 text-[18px] text-white/30">
                person
              </span>
            </div>
          </div>
        )}

        {/* Host Specific registration extras (If Space Provider registering) */}
        {view === 'register' && role === 'renter' && (
          <div className="p-3 bg-[#161a17] border border-white/10 rounded-2xl flex flex-col gap-2.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#00e5ff]">Parking Bay Setup</span>
              <span className="text-[10px] text-white/50">Space Provider</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-white/60">Space Type</label>
                <select
                  value={spaceType}
                  onChange={(e) => setSpaceType(e.target.value as any)}
                  className="w-full h-8 px-2 bg-[#0d0f0e] border border-white/10 rounded-xl text-[11px] text-white focus:outline-none"
                >
                  <option value="driveway">Driveway</option>
                  <option value="covered">Covered Bay</option>
                  <option value="garage">Locked Garage</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] text-white/60">Hourly Rate (₹)</label>
                <input
                  type="number"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                  className="w-full h-8 px-2 bg-[#0d0f0e] border border-white/10 rounded-xl text-[11px] text-white focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Email Address field */}
        {view !== 'otp' && (
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-semibold text-white/70">
              Email address<span className="text-[#aff833]">*</span>
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                className="w-full h-11 px-3.5 bg-[#141715] border border-white/10 rounded-2xl text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#d4ff32] focus:ring-1 focus:ring-[#d4ff32] transition-all"
              />
              <span className="material-symbols-outlined absolute right-3 top-3 text-[18px] text-white/30">
                mail
              </span>
            </div>
          </div>
        )}

        {/* Password field (Sign in & Register) */}
        {(view === 'signin' || view === 'register') && (
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-semibold text-white/70">
              Password<span className="text-[#aff833]">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="@Sn123hsn#"
                className="w-full h-11 px-3.5 pr-10 bg-[#141715] border border-white/10 rounded-2xl text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#d4ff32] focus:ring-1 focus:ring-[#d4ff32] transition-all font-mono"
              />
              {/* Show/Hide Password Eye Button (as in image) */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-white/40 hover:text-white transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {showPassword ? 'visibility' : 'visibility_off'}
                </span>
              </button>
            </div>
          </div>
        )}

        {/* 5-Digit OTP Verification Box (Forgot Password step 2) */}
        {view === 'otp' && (
          <div className="flex flex-col gap-2 my-2">
            <label className="text-[11px] font-semibold text-white/70 text-center">
              Enter 5-Digit Security PIN
            </label>
            <div className="flex items-center justify-center gap-2">
              {[0, 1, 2, 3, 4].map((idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength={1}
                  value={otpCode[idx] || ''}
                  onChange={(e) => {
                    const next = [...otpCode];
                    next[idx] = e.target.value;
                    setOtpCode(next);
                  }}
                  className="w-11 h-12 text-center text-lg font-black bg-[#141715] border border-white/20 focus:border-[#d4ff32] rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-[#d4ff32]"
                />
              ))}
            </div>
            <div className="text-center mt-1">
              <button
                type="button"
                onClick={() => setCodeSent(true)}
                className="text-[11px] text-[#aff833] hover:underline"
              >
                Resend code in 45s
              </button>
            </div>
          </div>
        )}

        {/* "Remember me" and "Forgot Password?" row (Sign in only, as in image) */}
        {view === 'signin' && (
          <div className="flex items-center justify-between text-xs pt-0.5">
            <label className="flex items-center gap-2 cursor-pointer select-none text-white/70 hover:text-white">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded-md bg-[#141715] border border-white/20 checked:bg-[#d4ff32] checked:border-[#d4ff32] accent-[#d4ff32] transition-all cursor-pointer"
              />
              <span className="text-[12px]">Remember me</span>
            </label>

            <button
              type="button"
              onClick={() => setView('forgot')}
              className="text-[12px] text-white/60 hover:text-[#d4ff32] transition-colors"
            >
              Forgot Password?
            </button>
          </div>
        )}

        {/* PRIMARY ACTION BUTTON (Fluorescent Lime with Wand/Sparkle icon as in image) */}
        <button
          type="submit"
          className="w-full h-12 mt-1 rounded-2xl bg-[#d4ff32] hover:bg-[#c2ed2b] active:scale-[0.98] text-[#0c0e0d] font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-[0_0_24px_rgba(212,255,50,0.35)]"
        >
          {/* Wand / Sparkle Icon (as visible in reference image) */}
          <span className="material-symbols-outlined text-[19px]">auto_awesome</span>
          <span>
            {view === 'signin' && 'Sign in'}
            {view === 'register' && 'Register'}
            {view === 'forgot' && 'Send Code'}
            {view === 'otp' && 'Verify & Continue'}
          </span>
        </button>

        {/* Social Authentication: Divider & Google/Apple buttons (Sign in & Register) */}
        {(view === 'signin' || view === 'register') && (
          <div className="flex flex-col gap-3 mt-2">
            {/* "Or continue with" divider (as in image) */}
            <div className="relative flex items-center justify-center my-0.5">
              <div className="w-full border-t border-white/10" />
              <span className="absolute bg-[#0c0e0d] px-3 text-[11px] text-white/50">
                Or continue with
              </span>
            </div>

            {/* Social Pill Buttons (as in image) */}
            <div className="grid grid-cols-2 gap-2.5">
              {/* Google Button */}
              <button
                type="button"
                onClick={() => {
                  setAuthSuccessMsg('Google connected!');
                  setTimeout(() => {
                    if (onLoginSuccess) {
                      onLoginSuccess({ name: 'Google User', email: 'user@google.com', role });
                    }
                    if (role === 'renter') onNavigate('renter-dashboard');
                    else onNavigate('journey');
                  }, 800);
                }}
                className="h-11 rounded-2xl bg-[#151815] hover:bg-[#1f241f] border border-white/10 hover:border-white/20 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                {/* Official Google G Logo SVG */}
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8s.2-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
                  />
                </svg>
                <span>Google</span>
              </button>

              {/* Apple Button */}
              <button
                type="button"
                onClick={() => {
                  setAuthSuccessMsg('Apple connected!');
                  setTimeout(() => {
                    if (onLoginSuccess) {
                      onLoginSuccess({ name: 'Apple User', email: 'user@icloud.com', role });
                    }
                    if (role === 'renter') onNavigate('renter-dashboard');
                    else onNavigate('journey');
                  }, 800);
                }}
                className="h-11 rounded-2xl bg-[#151815] hover:bg-[#1f241f] border border-white/10 hover:border-white/20 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                {/* Official Apple Logo SVG */}
                <svg className="w-4 h-4 fill-white" viewBox="0 0 170 170">
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.69-7.85-12-14.43-5.65-8.6-10.09-18.42-13.32-29.46-3.23-11.05-4.85-21.78-4.85-32.2 0-14.54 3.73-26.65 11.19-36.32 7.46-9.67 16.89-14.61 28.28-14.81 5.25.1 11.06 1.54 17.43 4.3 6.36 2.76 10.5 4.23 12.42 4.41 1.57-.27 5.92-1.78 13.06-4.52 7.14-2.73 13.1-4.01 17.88-3.83 13.57.8 24.38 5.76 32.43 14.87-11.96 7.23-17.84 17.06-17.65 29.5.19 9.87 3.98 18.06 11.37 24.58 7.39 6.51 16.14 10.23 26.25 11.16-2.22 6.83-5.04 14.07-8.46 21.72zM119.22 31.84c0-7.39 2.63-14.4 7.89-21.03 5.26-6.63 11.98-10.57 20.16-11.81.22 1.09.33 2.18.33 3.27 0 7.39-2.79 14.49-8.37 21.3-5.58 6.81-12.39 10.74-20.43 11.79-.11-1.09-.16-2.26-.16-3.52z" />
                </svg>
                <span>Apple</span>
              </button>
            </div>
          </div>
        )}
      </form>

      {/* Screen Bottom Toggle Link (as in image) */}
      <div className="relative z-10 pt-4 text-center">
        {view === 'signin' && (
          <p className="text-[12px] text-white/60">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => setView('register')}
              className="font-bold text-white hover:text-[#d4ff32] transition-colors underline-offset-2 hover:underline"
            >
              Sign up
            </button>
          </p>
        )}

        {view === 'register' && (
          <p className="text-[12px] text-white/60">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => setView('signin')}
              className="font-bold text-white hover:text-[#d4ff32] transition-colors underline-offset-2 hover:underline"
            >
              Sign in
            </button>
          </p>
        )}

        {(view === 'forgot' || view === 'otp') && (
          <p className="text-[12px] text-white/60">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => setView('signin')}
              className="font-bold text-white hover:text-[#d4ff32] transition-colors underline-offset-2 hover:underline"
            >
              Sign in
            </button>
          </p>
        )}
      </div>
    </div>
  );
};
