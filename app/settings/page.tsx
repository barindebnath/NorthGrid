"use client";

import { useState, useEffect } from "react";
import { 
  Settings, 
  User, 
  Building, 
  Sun, 
  Moon, 
  Check, 
  Globe, 
  Sliders 
} from "lucide-react";

export default function SettingsPage() {
  // Theme state
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  
  // User Profile parameters
  const [userName, setUserName] = useState("Erik Larsson");
  const [region, setRegion] = useState("DK1");
  const [batteryCap, setBatteryCap] = useState("75");

  // Organization parameters
  const [orgName, setOrgName] = useState("NorthGrid HQ");
  const [co2Target, setCo2Target] = useState("5000");

  // Toast confirm state
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    // Initial theme load
    const savedTheme = (localStorage.getItem("theme") as "light" | "dark") || "dark";
    setTheme(savedTheme);

    // Initial parameters load
    setUserName(localStorage.getItem("user_name") || "Erik Larsson");
    setRegion(localStorage.getItem("user_region") || "DK1");
    setBatteryCap(localStorage.getItem("user_battery_capacity") || "75");
    setOrgName(localStorage.getItem("org_name") || "NorthGrid HQ");
    setCo2Target(localStorage.getItem("org_co2_target") || "5000");
  }, []);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();

    localStorage.setItem("user_name", userName);
    localStorage.setItem("user_region", region);
    localStorage.setItem("user_battery_capacity", batteryCap);
    localStorage.setItem("org_name", orgName);
    localStorage.setItem("org_co2_target", co2Target);

    // Show Toast
    setToastMessage("Settings saved successfully!");
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleThemeChange = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-textPrimary font-headline">Preferences & Control</h2>
        <p className="text-textSecondary text-sm mt-1">Configure profile settings, regional grid matching options, and organization targets.</p>
      </div>

      <form onSubmit={handleSaveSettings} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Visual Theme Preference */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-surface border border-borderDefault rounded-2xl p-5">
            <h4 className="text-sm font-bold text-textPrimary font-headline mb-4 flex items-center gap-2">
              <Sun className="w-4 h-4 text-energy" /> Appearance Theme
            </h4>
            
            <p className="text-xs text-textSecondary mb-4">
              Toggle the user interface theme environment to suit your desktop lighting preferences.
            </p>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleThemeChange("dark")}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl border text-xs font-bold transition-all ${
                  theme === "dark" 
                    ? "bg-energy/10 border-energy text-energy" 
                    : "bg-base border-borderDefault hover:bg-elevated text-textSecondary"
                }`}
              >
                <Moon className="w-4 h-4" />
                Dark Theme
              </button>
              <button
                type="button"
                onClick={() => handleThemeChange("light")}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl border text-xs font-bold transition-all ${
                  theme === "light" 
                    ? "bg-energy/10 border-energy text-energy" 
                    : "bg-base border-borderDefault hover:bg-elevated text-textSecondary"
                }`}
              >
                <Sun className="w-4 h-4" />
                Light Theme
              </button>
            </div>
          </div>

          <div className="bg-surface border border-borderDefault rounded-2xl p-5">
            <h4 className="text-sm font-bold text-textPrimary font-headline mb-4 flex items-center gap-2">
              <Globe className="w-4 h-4 text-energy" /> Regional Nodes
            </h4>
            <div className="space-y-3 text-xs text-textSecondary">
              <div className="flex justify-between items-center py-2 border-b border-borderDefault/50">
                <span>Primary Pricing Node</span>
                <span className="font-mono text-textPrimary font-bold">{region} Region</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-borderDefault/50">
                <span>Offshore Wind Array</span>
                <span className="text-textPrimary font-bold">DK1 - Horns Rev 3</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span>CSRD Validation</span>
                <span className="text-green font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green"></span> Active
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Columns: Profile and Target Parameters */}
        <div className="lg:col-span-2 space-y-6">
          {/* Form parameters */}
          <div className="bg-surface border border-borderDefault rounded-2xl p-6 space-y-6">
            
            {/* User details section */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-textPrimary font-headline border-b border-borderDefault/70 pb-2 flex items-center gap-2">
                <User className="w-4 h-4 text-energy" /> User Profile Settings
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="user-name" className="text-[10px] uppercase font-bold text-textSecondary font-mono block">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="user-name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full bg-base border border-borderDefault rounded-xl px-3 py-2 text-xs text-textPrimary focus:outline-none focus:ring-1 focus:ring-energy"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="grid-region" className="text-[10px] uppercase font-bold text-textSecondary font-mono block">
                    Grid Region Zone
                  </label>
                  <select
                    id="grid-region"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full bg-base border border-borderDefault rounded-xl px-3 py-2 text-xs text-textPrimary focus:outline-none focus:ring-1 focus:ring-energy"
                  >
                    <option value="DK1">DK1 (West Denmark / Jutland)</option>
                    <option value="DK2">DK2 (East Denmark / Copenhagen)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label htmlFor="battery-cap" className="text-[10px] uppercase font-bold text-textSecondary font-mono block">
                    EV Battery Capacity (kWh)
                  </label>
                  <input
                    type="number"
                    id="battery-cap"
                    value={batteryCap}
                    onChange={(e) => setBatteryCap(e.target.value)}
                    className="w-full bg-base border border-borderDefault rounded-xl px-3 py-2 text-xs font-mono text-textPrimary focus:outline-none focus:ring-1 focus:ring-energy"
                  />
                </div>
              </div>
            </div>

            {/* Org details section */}
            <div className="space-y-4 pt-4">
              <h4 className="text-sm font-bold text-textPrimary font-headline border-b border-borderDefault/70 pb-2 flex items-center gap-2">
                <Building className="w-4 h-4 text-energy" /> Organization Benchmarks
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="org-name" className="text-[10px] uppercase font-bold text-textSecondary font-mono block">
                    Organization Name
                  </label>
                  <input
                    type="text"
                    id="org-name"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    className="w-full bg-base border border-borderDefault rounded-xl px-3 py-2 text-xs text-textPrimary focus:outline-none focus:ring-1 focus:ring-energy"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="co2-target" className="text-[10px] uppercase font-bold text-textSecondary font-mono block">
                    Monthly carbon target (kg CO₂)
                  </label>
                  <input
                    type="number"
                    id="co2-target"
                    value={co2Target}
                    onChange={(e) => setCo2Target(e.target.value)}
                    className="w-full bg-base border border-borderDefault rounded-xl px-3 py-2 text-xs font-mono text-textPrimary focus:outline-none focus:ring-1 focus:ring-energy"
                  />
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex justify-end pt-4 border-t border-borderDefault/70">
              <button
                type="submit"
                className="bg-energy hover:bg-energy/90 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-colors flex items-center gap-1.5 active:scale-98"
              >
                <Check className="w-4 h-4" />
                Save Preferences
              </button>
            </div>

          </div>
        </div>

      </form>

      {/* Local Toast validation popup */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-green/10 text-green border border-green/20 backdrop-blur px-5 py-3 rounded-xl flex items-center gap-3 shadow-lg animate-bounce">
          <div className="w-5 h-5 rounded-full bg-green text-white flex items-center justify-center">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <div>
            <p className="text-sm font-bold leading-none">{toastMessage}</p>
            <p className="text-[10px] text-textSecondary mt-0.5">Parameters updated in local storage memory.</p>
          </div>
        </div>
      )}
    </div>
  );
}
