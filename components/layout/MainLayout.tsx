"use client";

import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import MobileNav from "./MobileNav";
import { X, Check } from "lucide-react";
import { commuteStats } from "@/lib/data";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [isLogOpen, setIsLogOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Form states
  const [distance, setDistance] = useState("5");
  const [transportMode, setTransportMode] = useState("Cycling");
  const [loggedNotification, setLoggedNotification] = useState(false);

  // Load theme on startup
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const handleLogCommute = (e: React.FormEvent) => {
    e.preventDefault();

    const distNum = parseFloat(distance);
    if (isNaN(distNum) || distNum <= 0) return;

    // Retrieve selected transport stats
    const selectedMode = commuteStats.find((m) => m.name === transportMode);
    const co2SavedPerKm = selectedMode ? selectedMode.co2SavedPerKm : 0.15;
    const calculatedSaved = distNum * co2SavedPerKm;

    // Save to localStorage list
    const currentLogs = JSON.parse(localStorage.getItem("mobility_logs") || "[]");
    const newLog = {
      id: Date.now(),
      distance: distNum,
      transportMode,
      co2Saved: parseFloat(calculatedSaved.toFixed(2)),
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("mobility_logs", JSON.stringify([newLog, ...currentLogs]));

    // Dispatch custom event to notify listening pages (Dashboard/Mobility)
    window.dispatchEvent(new Event("commute-logged"));

    // Reset and close
    setDistance("5");
    setIsLogOpen(false);
    
    // Trigger temporary Toast confirmation
    setLoggedNotification(true);
    setTimeout(() => {
      setLoggedNotification(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-base text-textPrimary flex">
      {/* Persistent Sidebar */}
      <Sidebar onLogClick={() => setIsLogOpen(true)} />

      {/* Main Wrapper */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen pb-16 md:pb-0">
        <Header onMenuClick={() => setMobileMenuOpen(true)} />
        
        <main className="flex-1 w-full max-w-[1440px] mx-auto p-6">
          {children}
        </main>

        {/* Global Footer */}
        <footer className="p-6 border-t border-borderDefault bg-surface/30 mt-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 bg-energy/10 rounded flex items-center justify-center text-energy font-bold">
                N
              </span>
              <span className="font-headline font-bold uppercase tracking-tighter">NORTHGRID © 2026</span>
            </div>
            <div className="flex items-center gap-6 text-[10px] font-bold text-textSecondary tracking-widest uppercase">
              <a href="#" className="hover:text-energy transition-colors">Status</a>
              <a href="#" className="hover:text-energy transition-colors">Security</a>
              <a href="#" className="hover:text-energy transition-colors">API Docs</a>
              <a href="#" className="hover:text-energy transition-colors">Privacy</a>
            </div>
            <div className="text-[10px] text-textSecondary">
              Node: DK1 Copenhagen • v2.6.2-stable
            </div>
          </div>
        </footer>
      </div>

      {/* Mobile Sticky Navigation */}
      <MobileNav onLogClick={() => setIsLogOpen(true)} />

      {/* Slide-out Commute Logger Drawer */}
      {isLogOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="absolute inset-0" onClick={() => setIsLogOpen(false)}></div>
          
          <div className="relative w-full max-w-md bg-surface h-full shadow-2xl p-6 flex flex-col animate-in slide-in-from-right duration-200 border-l border-borderDefault">
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-borderDefault">
              <div>
                <h3 className="text-lg font-bold text-textPrimary font-headline">Log Sustainable Commute</h3>
                <p className="text-xs text-textSecondary mt-1">Record your transit to earn green energy balance.</p>
              </div>
              <button
                onClick={() => setIsLogOpen(false)}
                className="p-1 rounded-lg text-textSecondary hover:text-textPrimary hover:bg-elevated"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Log Form */}
            <form onSubmit={handleLogCommute} className="flex-1 flex flex-col justify-between py-6">
              <div className="space-y-6">
                {/* Distance */}
                <div className="space-y-2">
                  <label htmlFor="distance" className="text-xs font-bold text-textSecondary uppercase tracking-wider block">
                    Commute Distance (km)
                  </label>
                  <input
                    type="number"
                    id="distance"
                    step="0.1"
                    min="0.1"
                    required
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                    className="w-full bg-elevated border border-borderDefault rounded-xl px-4 py-3 text-textPrimary font-mono font-bold focus:outline-none focus:ring-2 focus:ring-energy/20 focus:border-energy"
                  />
                </div>

                {/* Transport Mode */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-textSecondary uppercase tracking-wider block mb-2">
                    Transport Mode
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {commuteStats.map((mode) => (
                      <button
                        key={mode.name}
                        type="button"
                        onClick={() => setTransportMode(mode.name)}
                        className={`flex flex-col items-center p-3 rounded-xl border text-center transition-all ${
                          transportMode === mode.name
                            ? "bg-energy/10 border-energy text-energy font-bold"
                            : "bg-surface border-borderDefault hover:bg-elevated text-textSecondary hover:text-textPrimary"
                        }`}
                      >
                        <span className="text-2xl mb-1">{mode.emoji}</span>
                        <span className="text-xs">{mode.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live Estimator Indicator */}
                {distance && parseFloat(distance) > 0 && (
                  <div className="p-4 bg-energy/5 border border-energy/15 rounded-xl text-center">
                    <p className="text-xs text-textSecondary">Carbon savings estimate</p>
                    <p className="text-xl font-bold text-energy font-mono mt-1">
                      +{(parseFloat(distance) * (commuteStats.find(m => m.name === transportMode)?.co2SavedPerKm || 0.15)).toFixed(2)} kg CO₂
                    </p>
                  </div>
                )}
              </div>

              {/* Submit Action */}
              <button
                type="submit"
                className="w-full bg-energy text-white font-bold py-3.5 rounded-xl hover:bg-energy/90 transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
              >
                Log Travel Activity
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Global Success Notification Toast */}
      {loggedNotification && (
        <div className="fixed top-20 right-6 z-50 bg-green/10 text-green border border-green/20 backdrop-blur px-5 py-3 rounded-xl flex items-center gap-3 shadow-lg animate-bounce">
          <div className="w-5 h-5 rounded-full bg-green text-white flex items-center justify-center">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <div>
            <p className="text-sm font-bold leading-none">Activity Logged</p>
            <p className="text-[10px] text-textSecondary mt-0.5">Metrics updated across platform views.</p>
          </div>
        </div>
      )}
    </div>
  );
}
