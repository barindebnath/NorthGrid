"use client";

import { useState } from "react";
import { 
  BarChart, 
  Bar, 
  Cell, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  CartesianGrid
} from "recharts";
import { spotPrices, renewableMix } from "@/lib/data";
import { 
  TrendingDown, 
  Activity, 
  Info, 
  ShieldCheck, 
  Wind, 
  Flame, 
  BatteryCharging,
  Zap
} from "lucide-react";

export default function EnergyPage() {
  const [selectedBar, setSelectedBar] = useState<any>(null);

  // Colors mapping for Spot Price Monitor
  const getBarColor = (entry: any) => {
    if (entry.hour === "12:00") return "var(--accent-energy)"; // Current Price
    if (entry.type === "lowest") return "var(--accent-green)"; // Lowest
    if (entry.type === "peak") return "var(--accent-warning)"; // Peak
    return "var(--border-default)"; // Normal
  };

  // SVG parameters for circular Carbon Intensity gauge
  const radius = 40;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  // Let's set carbon intensity: 92 gCO2/kWh out of 300 max
  const maxIntensity = 300;
  const currentIntensity = 92;
  const strokeDashoffset = circumference - (currentIntensity / maxIntensity) * circumference;

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-textPrimary font-headline">Energy Intelligence</h2>
        <p className="text-textSecondary text-sm mt-1">Danish Grid (DK1 Region) real-time electricity and carbon tracking.</p>
      </div>

      {/* Primary Row: Spot Prices & Energy Mix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Spot Price Monitor */}
        <div className="lg:col-span-2 bg-surface border border-borderDefault rounded-2xl p-6 flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h4 className="text-sm font-bold text-textPrimary font-headline">Spot Price Monitor</h4>
              <p className="text-xs text-textSecondary mt-0.5">Hour-by-hour market rates (DKK/kWh)</p>
            </div>
            <div className="flex gap-2 text-[10px] font-bold text-textPrimary">
              <span className="flex items-center gap-1 bg-green/10 text-green px-2.5 py-1 rounded-full border border-green/10">
                <span className="w-1.5 h-1.5 rounded-full bg-green"></span> Lowest Rates
              </span>
              <span className="flex items-center gap-1 bg-energy/10 text-energy px-2.5 py-1 rounded-full border border-energy/10">
                <span className="w-1.5 h-1.5 rounded-full bg-energy"></span> Current (12:00)
              </span>
              <span className="flex items-center gap-1 bg-warning/10 text-warning px-2.5 py-1 rounded-full border border-warning/10">
                <span className="w-1.5 h-1.5 rounded-full bg-warning"></span> Peak Hours
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={spotPrices} 
                margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
                onMouseMove={(state: any) => {
                  if (state && state.activePayload && state.activePayload.length) {
                    setSelectedBar(state.activePayload[0].payload);
                  }
                }}
                onMouseLeave={() => setSelectedBar(null)}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" opacity={0.3} />
                <XAxis dataKey="hour" stroke="var(--text-secondary)" fontSize={10} className="font-mono" />
                <YAxis stroke="var(--text-secondary)" fontSize={10} className="font-mono" />
                <Tooltip 
                  cursor={{ fill: "rgba(255,255,255,0.02)" }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-surface border border-borderDefault p-3 rounded-xl shadow-xl text-xs space-y-1">
                          <p className="font-bold font-mono">{data.hour}</p>
                          <p className="text-textSecondary">Price: <span className="text-textPrimary font-bold font-mono">{data.price} DKK/kWh</span></p>
                          <p className="capitalize text-[10px] font-bold" style={{
                            color: data.hour === "12:00" ? "var(--accent-energy)" : data.type === "lowest" ? "var(--accent-green)" : data.type === "peak" ? "var(--accent-warning)" : "var(--text-secondary)"
                          }}>{data.type} Window</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="price" radius={[4, 4, 0, 0]}>
                  {spotPrices.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={getBarColor(entry)}
                      className="transition-all duration-150 cursor-pointer"
                      opacity={selectedBar && selectedBar.hour !== entry.hour ? 0.6 : 1}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Aggregations */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-borderDefault mt-6">
            <div className="p-3 bg-base rounded-xl border border-borderDefault">
              <p className="text-[10px] uppercase tracking-wider text-textSecondary font-bold">Average Price</p>
              <p className="text-base font-mono font-bold text-textPrimary mt-0.5">0.68 DKK</p>
            </div>
            <div className="p-3 bg-base rounded-xl border border-borderDefault">
              <p className="text-[10px] uppercase tracking-wider text-textSecondary font-bold">Lowest Window</p>
              <p className="text-base font-mono font-bold text-green mt-0.5">0.14 DKK</p>
            </div>
            <div className="p-3 bg-base rounded-xl border border-borderDefault">
              <p className="text-[10px] uppercase tracking-wider text-textSecondary font-bold">Next Peak</p>
              <p className="text-base font-mono font-bold text-warning mt-0.5">1.22 DKK</p>
            </div>
            <div className="p-3 bg-base rounded-xl border border-borderDefault">
              <p className="text-[10px] uppercase tracking-wider text-textSecondary font-bold">Grid Frequency</p>
              <p className="text-base font-mono font-bold text-textPrimary mt-0.5">50.12 Hz</p>
            </div>
          </div>
        </div>

        {/* Current Energy Mix */}
        <div className="bg-surface border border-borderDefault rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-bold text-textPrimary font-headline">Current Energy Mix</h4>
            <p className="text-xs text-textSecondary mt-0.5">Real-time matching proportion.</p>
          </div>

          <div className="relative w-40 h-40 mx-auto flex items-center justify-center my-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={renewableMix}
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {renewableMix.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-textPrimary font-mono">80%</span>
              <span className="text-[9px] uppercase tracking-widest text-green font-bold">Renewable</span>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            {renewableMix.map((source) => (
              <div key={source.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: source.color }}></span>
                  <span className="text-textSecondary">{source.name}</span>
                </div>
                <span className="font-mono font-bold text-textPrimary">{source.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Secondary Row: Carbon Gauge & Smart Optimization */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Carbon Intensity Gauge */}
        <div className="bg-surface border border-borderDefault rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-green/5 blur-[80px] rounded-full"></div>
          <h4 className="text-sm font-bold text-textPrimary font-headline mb-4">Carbon Intensity</h4>
          
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative w-32 h-32 shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background Ring */}
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  fill="transparent"
                  stroke="var(--border-default)"
                  strokeWidth={strokeWidth}
                  opacity={0.3}
                />
                {/* Colored Progress Ring */}
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  fill="transparent"
                  stroke="var(--accent-green)"
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-500"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-textPrimary font-mono">{currentIntensity}</span>
                <span className="text-[8px] uppercase font-bold text-textSecondary tracking-wider">gCO₂/kWh</span>
              </div>
            </div>

            <div className="flex-1 space-y-3 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 bg-green/10 text-green px-3 py-1 rounded-full text-xs font-bold border border-green/20">
                <ShieldCheck className="w-3.5 h-3.5" />
                LOW INTENSITY
              </div>
              <p className="text-xs text-textSecondary leading-relaxed">
                Current Danish grid production is <span className="text-textPrimary font-bold">34% cleaner</span> than the monthly average. It is an optimal window for running flexible machinery.
              </p>
            </div>
          </div>
        </div>

        {/* Smart Charging EV / Load Balancing */}
        <div className="bg-surface border border-borderDefault rounded-2xl p-6 flex flex-col justify-between">
          <h4 className="text-sm font-bold text-textPrimary font-headline mb-4">Smart Optimization</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-base rounded-xl border border-borderDefault flex flex-col justify-between group hover:border-energy/40 transition-colors">
              <div className="flex justify-between items-center text-energy">
                <Zap className="w-5 h-5 fill-current" />
                <span className="text-[8px] font-bold bg-energy/10 px-2 py-0.5 rounded-full">OPTIMAL</span>
              </div>
              <div className="mt-3">
                <p className="text-[10px] text-textSecondary uppercase font-bold">EV Charging Window</p>
                <p className="text-base font-bold text-textPrimary mt-0.5">02:00 — 05:30</p>
              </div>
              <div className="w-full bg-borderDefault h-1 rounded-full mt-3 overflow-hidden">
                <div className="bg-energy h-full w-4/5"></div>
              </div>
            </div>

            <div className="p-4 bg-base rounded-xl border border-borderDefault flex flex-col justify-between group hover:border-green/40 transition-colors">
              <div className="flex justify-between items-center text-green">
                <TrendingDown className="w-5 h-5" />
                <span className="text-[8px] font-bold bg-green/10 px-2 py-0.5 rounded-full">SAVINGS</span>
              </div>
              <div className="mt-3">
                <p className="text-[10px] text-textSecondary uppercase font-bold">Est. Monthly Savings</p>
                <p className="text-base font-bold text-textPrimary mt-0.5">840.50 DKK</p>
              </div>
              <p className="text-[9px] text-textSecondary mt-3">Calculated from load matching</p>
            </div>
          </div>

          <div className="p-3 bg-energy/5 border border-energy/10 rounded-xl flex items-center gap-3 mt-4 text-xs">
            <Activity className="w-5 h-5 text-energy shrink-0" />
            <div>
              <p className="font-bold text-textPrimary">Grid Health Score: Nominal</p>
              <p className="text-textSecondary text-[11px]">Grid frequency is balanced at 50.01 Hz. No pricing congestion predicted.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bento Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sustainability Cert Card */}
        <div className="bg-surface border border-borderDefault rounded-2xl p-5 flex items-start gap-4 hover:bg-elevated transition-colors cursor-pointer group">
          <div className="p-2 bg-green/10 text-green rounded-xl shrink-0 group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h5 className="text-xs font-bold text-textPrimary uppercase tracking-wider font-headline">Eco Matching Certificate</h5>
            <p className="text-xs text-textSecondary mt-1 leading-relaxed">
              HQ facility reached 90% wind match validation yesterday. ESG Tier 1 Certificate issued.
            </p>
          </div>
        </div>

        {/* Offshore Wind yields Card */}
        <div className="bg-surface border border-borderDefault rounded-2xl p-5 flex items-start gap-4 hover:bg-elevated transition-colors cursor-pointer group">
          <div className="p-2 bg-energy/10 text-energy rounded-xl shrink-0 group-hover:scale-105 transition-transform">
            <Wind className="w-5 h-5" />
          </div>
          <div>
            <h5 className="text-xs font-bold text-textPrimary uppercase tracking-wider font-headline">Wind Yield Prediction</h5>
            <p className="text-xs text-textSecondary mt-1 leading-relaxed">
              West Jutland offshore arrays expect 15% increase in matching yields. Low rates predicted.
            </p>
          </div>
        </div>

        {/* Load balancing Card */}
        <div className="bg-surface border border-borderDefault rounded-2xl p-5 flex items-start gap-4 hover:bg-elevated transition-colors cursor-pointer group">
          <div className="p-2 bg-warning/10 text-warning rounded-xl shrink-0 group-hover:scale-105 transition-transform">
            <BatteryCharging className="w-5 h-5" />
          </div>
          <div>
            <h5 className="text-xs font-bold text-textPrimary uppercase tracking-wider font-headline">Active Balancing Shift</h5>
            <p className="text-xs text-textSecondary mt-1 leading-relaxed">
              Smart scheduling moved 2.4 kW of storage tasks to off-peak periods in the last 6 hours.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
