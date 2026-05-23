"use client";

import { useState, useEffect } from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { commuteStats } from "@/lib/data";
import { 
  Car, 
  Leaf, 
  TrendingUp, 
  Trash2, 
  PlusCircle,
  Calendar,
  Layers,
  Milestone
} from "lucide-react";

// Mock weekly stacked bar chart data (Distance logged in km by mode)
const weeklyCommuteData = [
  { day: "Mon", Cycling: 120, Train: 340, EV: 210, Walking: 30, Bus: 80 },
  { day: "Tue", Cycling: 150, Train: 320, EV: 230, Walking: 45, Bus: 70 },
  { day: "Wed", Cycling: 180, Train: 290, EV: 240, Walking: 50, Bus: 90 },
  { day: "Thu", Cycling: 160, Train: 310, EV: 190, Walking: 40, Bus: 60 },
  { day: "Fri", Cycling: 140, Train: 330, EV: 250, Walking: 35, Bus: 100 }
];

export default function MobilityPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [distance, setDistance] = useState("5");
  const [transportMode, setTransportMode] = useState("Cycling");

  // Load logs on mount
  useEffect(() => {
    loadLogs();
    window.addEventListener("commute-logged", loadLogs);
    return () => {
      window.removeEventListener("commute-logged", loadLogs);
    };
  }, []);

  const loadLogs = () => {
    const saved = JSON.parse(localStorage.getItem("mobility_logs") || "[]");
    setLogs(saved);
  };

  const handleInlineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const distNum = parseFloat(distance);
    if (isNaN(distNum) || distNum <= 0) return;

    const selectedMode = commuteStats.find((m) => m.name === transportMode);
    const co2SavedPerKm = selectedMode ? selectedMode.co2SavedPerKm : 0.15;
    const calculatedSaved = distNum * co2SavedPerKm;

    const newLog = {
      id: Date.now(),
      distance: distNum,
      transportMode,
      co2Saved: parseFloat(calculatedSaved.toFixed(2)),
      createdAt: new Date().toISOString(),
    };

    const updated = [newLog, ...logs];
    localStorage.setItem("mobility_logs", JSON.stringify(updated));
    setLogs(updated);

    // Notify other active views
    window.dispatchEvent(new Event("commute-logged"));

    // Reset input
    setDistance("5");
  };

  const handleDeleteLog = (id: number) => {
    const updated = logs.filter((log) => log.id !== id);
    localStorage.setItem("mobility_logs", JSON.stringify(updated));
    setLogs(updated);
    
    // Notify other active views
    window.dispatchEvent(new Event("commute-logged"));
  };

  // Dynamic statistics
  const totalUserSaved = logs.reduce((sum, log) => sum + log.co2Saved, 0);
  const totalUserDistance = logs.reduce((sum, log) => sum + log.distance, 0);

  // Grouped transport distribution mix
  const distributionData = [
    { name: "Cycling", value: 340 + logs.filter(l => l.transportMode === "Cycling").reduce((s, l) => s + l.distance, 0), color: "#22c55e" },
    { name: "Train", value: 1610 + logs.filter(l => l.transportMode === "Train / Metro").reduce((s, l) => s + l.distance, 0), color: "#60a5fa" },
    { name: "EV", value: 1120 + logs.filter(l => l.transportMode === "Electric Vehicle (EV)").reduce((s, l) => s + l.distance, 0), color: "#38bdf8" },
    { name: "Walking", value: 200 + logs.filter(l => l.transportMode === "Walking").reduce((s, l) => s + l.distance, 0), color: "#4ade80" },
    { name: "Public Bus", value: 370 + logs.filter(l => l.transportMode === "Public Bus").reduce((s, l) => s + l.distance, 0), color: "#a78bfa" }
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-textPrimary font-headline">Mobility & Commutes</h2>
        <p className="text-textSecondary text-sm mt-1">Log carbon-aware travel behaviors to analyze scope 3 reductions.</p>
      </div>

      {/* Primary KPI row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-surface border border-borderDefault p-5 rounded-2xl flex flex-col justify-between">
          <div>
            <p className="text-textSecondary text-xs font-medium">Logged Save Balance</p>
            <h3 className="text-2xl font-bold font-mono text-green mt-1">
              +{totalUserSaved.toFixed(1)} kg CO₂
            </h3>
          </div>
          <p className="text-[10px] text-textSecondary mt-3">From your logged sustainable transits</p>
        </div>
        
        <div className="bg-surface border border-borderDefault p-5 rounded-2xl flex flex-col justify-between">
          <div>
            <p className="text-textSecondary text-xs font-medium">Total Commute Logs</p>
            <h3 className="text-2xl font-bold font-mono text-textPrimary mt-1">
              {logs.length} entries
            </h3>
          </div>
          <p className="text-[10px] text-textSecondary mt-3">Dynamic record entries in system memory</p>
        </div>

        <div className="bg-surface border border-borderDefault p-5 rounded-2xl flex flex-col justify-between">
          <div>
            <p className="text-textSecondary text-xs font-medium">Total logged distance</p>
            <h3 className="text-2xl font-bold font-mono text-energy mt-1">
              {totalUserDistance.toFixed(1)} km
            </h3>
          </div>
          <p className="text-[10px] text-textSecondary mt-3">Equivalent travel scope measured</p>
        </div>
      </div>

      {/* Main split grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Logging Form and Active Log Feed */}
        <div className="lg:col-span-1 space-y-6">
          {/* Quick logger card */}
          <div className="bg-surface border border-borderDefault rounded-2xl p-5">
            <h4 className="text-sm font-bold text-textPrimary font-headline mb-4 flex items-center gap-2">
              <PlusCircle className="w-4 h-4 text-energy" /> Log Travel Entry
            </h4>
            
            <form onSubmit={handleInlineSubmit} className="space-y-4">
              <div className="space-y-1">
                <label htmlFor="inline-distance" className="text-[10px] uppercase font-bold text-textSecondary font-mono block">
                  Distance (km)
                </label>
                <input
                  type="number"
                  id="inline-distance"
                  step="0.1"
                  min="0.1"
                  required
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  className="w-full bg-base border border-borderDefault rounded-xl px-3 py-2 text-sm font-mono text-textPrimary focus:outline-none focus:ring-1 focus:ring-energy"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-textSecondary font-mono block mb-1">
                  Transit Mode
                </label>
                <select
                  value={transportMode}
                  onChange={(e) => setTransportMode(e.target.value)}
                  className="w-full bg-base border border-borderDefault rounded-xl px-3 py-2 text-sm text-textPrimary focus:outline-none focus:ring-1 focus:ring-energy"
                >
                  {commuteStats.map((item) => (
                    <option key={item.name} value={item.name}>
                      {item.emoji} {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-energy hover:bg-energy/90 text-white rounded-xl py-2.5 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Save Entry</span>
              </button>
            </form>
          </div>

          {/* Activity Log list */}
          <div className="bg-surface border border-borderDefault rounded-2xl p-5 flex flex-col min-h-64 justify-between">
            <div>
              <h4 className="text-sm font-bold text-textPrimary font-headline mb-4">Logged Commutes</h4>
              {logs.length === 0 ? (
                <div className="text-center py-12 text-textSecondary space-y-2">
                  <Leaf className="w-8 h-8 mx-auto stroke-1" />
                  <p className="text-xs">No commutes logged yet.</p>
                  <p className="text-[10px] text-textSecondary/70 max-w-[200px] mx-auto leading-relaxed">
                    Start logging commutes to unlock organization insights.
                  </p>
                </div>
              ) : (
                <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                  {logs.map((log) => {
                    const modePreset = commuteStats.find((m) => m.name === log.transportMode);
                    return (
                      <div 
                        key={log.id} 
                        className="flex items-center justify-between p-3 rounded-xl bg-base border border-borderDefault group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{modePreset?.emoji || "🚗"}</span>
                          <div>
                            <p className="text-xs font-bold text-textPrimary">{log.transportMode}</p>
                            <p className="text-[9px] text-textSecondary font-mono">{log.distance} km • +{log.co2Saved} kg saved</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteLog(log.id)}
                          className="p-1 rounded text-textSecondary hover:text-danger hover:bg-danger/10 opacity-0 group-hover:opacity-100 transition-all"
                          aria-label="Delete entry"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            
            {logs.length > 0 && (
              <div className="text-center pt-4 border-t border-borderDefault mt-4">
                <button
                  onClick={() => {
                    localStorage.removeItem("mobility_logs");
                    loadLogs();
                    window.dispatchEvent(new Event("commute-logged"));
                  }}
                  className="text-[10px] font-bold text-textSecondary hover:text-danger uppercase tracking-wider"
                >
                  Clear All History
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Recharts Visualization Panels */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stacked Bar Commute Trend Chart */}
          <div className="bg-surface border border-borderDefault rounded-2xl p-6 flex flex-col justify-between">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h4 className="text-sm font-bold text-textPrimary font-headline">Weekly Commute Trends</h4>
                <p className="text-xs text-textSecondary mt-0.5">Total transit distance (km) by transportation category</p>
              </div>
              <Calendar className="w-4 h-4 text-textSecondary" />
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyCommuteData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" opacity={0.3} />
                  <XAxis dataKey="day" stroke="var(--text-secondary)" fontSize={10} />
                  <YAxis stroke="var(--text-secondary)" fontSize={10} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "var(--bg-surface)", 
                      borderColor: "var(--border-default)", 
                      borderRadius: "12px",
                      color: "var(--text-primary)" 
                    }} 
                  />
                  <Bar dataKey="Cycling" stackId="a" fill="#22c55e" />
                  <Bar dataKey="Train" stackId="a" fill="#60a5fa" />
                  <Bar dataKey="EV" stackId="a" fill="#38bdf8" />
                  <Bar dataKey="Walking" stackId="a" fill="#4ade80" />
                  <Bar dataKey="Bus" stackId="a" fill="#a78bfa" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Mode Mix Donut and Goals */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Transport mix pie */}
            <div className="bg-surface border border-borderDefault rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-bold text-textPrimary font-headline">Transport Mix Share</h4>
                <p className="text-xs text-textSecondary mt-0.5">Total aggregated scope km proportions</p>
              </div>
              
              <div className="h-44 relative my-3">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={distributionData}
                      innerRadius={45}
                      outerRadius={65}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {distributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-bold font-mono">Scope 3</span>
                  <span className="text-[8px] uppercase text-textSecondary font-bold mt-0.5">Commutes</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[10px]">
                {distributionData.map(entry => (
                  <div key={entry.name} className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: entry.color }}></span>
                    <span className="text-textSecondary truncate">{entry.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Streaks and ESG details */}
            <div className="bg-surface border border-borderDefault rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-bold text-textPrimary font-headline">Sustainability Streak</h4>
                <p className="text-xs text-textSecondary mt-0.5">Active commute milestones</p>
              </div>

              <div className="py-4 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green/10 text-green rounded-xl flex items-center justify-center font-bold">
                    🔥
                  </div>
                  <div>
                    <p className="text-xs font-bold text-textPrimary">Green Travel Streak</p>
                    <p className="text-[10px] text-textSecondary">5 consecutive commute logs</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-energy/10 text-energy rounded-xl flex items-center justify-center">
                    <Milestone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-textPrimary">ESG Benchmark Target</p>
                    <p className="text-[10px] text-textSecondary">Target 75% active participation (Current: 81%)</p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-base rounded-xl border border-borderDefault text-[10px] text-textSecondary flex items-center gap-2">
                <Leaf className="w-4 h-4 text-green" />
                <span>Commuters saved over 1.2 tons of CO₂ this week!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
